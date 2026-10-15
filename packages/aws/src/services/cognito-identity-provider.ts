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
const ns = /*@__PURE__*/ T.XmlNamespace("http://cognito-idp.amazonaws.com/doc/2016-04-18/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Cognito Identity Provider",
  serviceShapeName: "AWSCognitoIdentityProviderService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cognito-idp" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-04-18");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
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
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cognito-idp.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cognito-idp.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AliasExistsException
  extends /*@__PURE__*/ S.TaggedError<AliasExistsException>()(
    "AliasExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CodeDeliveryFailureException
  extends /*@__PURE__*/ S.TaggedError<CodeDeliveryFailureException>()(
    "CodeDeliveryFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CodeMismatchException
  extends /*@__PURE__*/ S.TaggedError<CodeMismatchException>()(
    "CodeMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DeviceKeyExistsException
  extends /*@__PURE__*/ S.TaggedError<DeviceKeyExistsException>()(
    "DeviceKeyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DuplicateProviderException
  extends /*@__PURE__*/ S.TaggedError<DuplicateProviderException>()(
    "DuplicateProviderException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class EnableSoftwareTokenMFAException
  extends /*@__PURE__*/ S.TaggedError<EnableSoftwareTokenMFAException>()(
    "EnableSoftwareTokenMFAException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ExpiredCodeException
  extends /*@__PURE__*/ S.TaggedError<ExpiredCodeException>()(
    "ExpiredCodeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class FeatureUnavailableInTierException
  extends /*@__PURE__*/ S.TaggedError<FeatureUnavailableInTierException>()(
    "FeatureUnavailableInTierException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GroupExistsException
  extends /*@__PURE__*/ S.TaggedError<GroupExistsException>()(
    "GroupExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()("InternalErrorException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()("InternalServerException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidEmailRoleAccessPolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidEmailRoleAccessPolicyException>()(
    "InvalidEmailRoleAccessPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidLambdaResponseException
  extends /*@__PURE__*/ S.TaggedError<InvalidLambdaResponseException>()(
    "InvalidLambdaResponseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidOAuthFlowException
  extends /*@__PURE__*/ S.TaggedError<InvalidOAuthFlowException>()(
    "InvalidOAuthFlowException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reasonCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidPasswordException
  extends /*@__PURE__*/ S.TaggedError<InvalidPasswordException>()(
    "InvalidPasswordException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSmsRoleAccessPolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidSmsRoleAccessPolicyException>()(
    "InvalidSmsRoleAccessPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSmsRoleTrustRelationshipException
  extends /*@__PURE__*/ S.TaggedError<InvalidSmsRoleTrustRelationshipException>()(
    "InvalidSmsRoleTrustRelationshipException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidUserPoolConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidUserPoolConfigurationException>()(
    "InvalidUserPoolConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ManagedLoginBrandingExistsException
  extends /*@__PURE__*/ S.TaggedError<ManagedLoginBrandingExistsException>()(
    "ManagedLoginBrandingExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MFAMethodNotFoundException
  extends /*@__PURE__*/ S.TaggedError<MFAMethodNotFoundException>()(
    "MFAMethodNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class OperationNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<OperationNotEnabledException>()(
    "OperationNotEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PasswordHistoryPolicyViolationException
  extends /*@__PURE__*/ S.TaggedError<PasswordHistoryPolicyViolationException>()(
    "PasswordHistoryPolicyViolationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PasswordResetRequiredException
  extends /*@__PURE__*/ S.TaggedError<PasswordResetRequiredException>()(
    "PasswordResetRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PreconditionNotMetException
  extends /*@__PURE__*/ S.TaggedError<PreconditionNotMetException>()(
    "PreconditionNotMetException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RefreshTokenReuseException
  extends /*@__PURE__*/ S.TaggedError<RefreshTokenReuseException>()(
    "RefreshTokenReuseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ScopeDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ScopeDoesNotExistException>()(
    "ScopeDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class SoftwareTokenMFANotFoundException
  extends /*@__PURE__*/ S.TaggedError<SoftwareTokenMFANotFoundException>()(
    "SoftwareTokenMFANotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TermsExistsException
  extends /*@__PURE__*/ S.TaggedError<TermsExistsException>()(
    "TermsExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TierChangeNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<TierChangeNotAllowedException>()(
    "TierChangeNotAllowedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class TooManyFailedAttemptsException
  extends /*@__PURE__*/ S.TaggedError<TooManyFailedAttemptsException>()(
    "TooManyFailedAttemptsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnexpectedLambdaException
  extends /*@__PURE__*/ S.TaggedError<UnexpectedLambdaException>()(
    "UnexpectedLambdaException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedIdentityProviderException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedIdentityProviderException>()(
    "UnsupportedIdentityProviderException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedTokenTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedTokenTypeException>()(
    "UnsupportedTokenTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedUserStateException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedUserStateException>()(
    "UnsupportedUserStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserImportInProgressException
  extends /*@__PURE__*/ S.TaggedError<UserImportInProgressException>()(
    "UserImportInProgressException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserLambdaValidationException
  extends /*@__PURE__*/ S.TaggedError<UserLambdaValidationException>()(
    "UserLambdaValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UsernameExistsException
  extends /*@__PURE__*/ S.TaggedError<UsernameExistsException>()(
    "UsernameExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserNotConfirmedException
  extends /*@__PURE__*/ S.TaggedError<UserNotConfirmedException>()(
    "UserNotConfirmedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserNotFoundException
  extends /*@__PURE__*/ S.TaggedError<UserNotFoundException>()(
    "UserNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UserPoolAddOnNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<UserPoolAddOnNotEnabledException>()(
    "UserPoolAddOnNotEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserPoolTaggingException
  extends /*@__PURE__*/ S.TaggedError<UserPoolTaggingException>()(
    "UserPoolTaggingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnChallengeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnChallengeNotFoundException>()(
    "WebAuthnChallengeNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnClientMismatchException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnClientMismatchException>()(
    "WebAuthnClientMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnConfigurationMissingException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnConfigurationMissingException>()(
    "WebAuthnConfigurationMissingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnCredentialNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnCredentialNotSupportedException>()(
    "WebAuthnCredentialNotSupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnNotEnabledException>()(
    "WebAuthnNotEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnOriginNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnOriginNotAllowedException>()(
    "WebAuthnOriginNotAllowedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnRelyingPartyMismatchException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnRelyingPartyMismatchException>()(
    "WebAuthnRelyingPartyMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type UserPoolIdType = string;
export type CustomAttributeNameType = string;
export type AttributeDataType = "String" | "Number" | "DateTime" | "Boolean" | (string & {});
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
export type RiskDecisionType = "NoRisk" | "AccountTakeover" | "Block" | (string & {});
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
  AvailableChallenges?: ChallengeNameType[];
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
export type DeviceRememberedStatusType = "remembered" | "not_remembered" | (string & {});
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
export type AcrMappingKeyType = string;
export type AcrValueType = string;
export type AcrMappingType = { [key: string]: string | undefined };
export interface CreateIdentityProviderRequest {
  UserPoolId: string;
  ProviderName: string;
  ProviderType: IdentityProviderTypeType;
  ProviderDetails: { [key: string]: string | undefined };
  AttributeMapping?: { [key: string]: string | undefined };
  IdpIdentifiers?: string[];
  AcrMapping?: { [key: string]: string | undefined };
}
export interface IdentityProviderType {
  UserPoolId?: string;
  ProviderName?: string;
  ProviderType?: IdentityProviderTypeType;
  ProviderDetails?: { [key: string]: string | undefined };
  AttributeMapping?: { [key: string]: string | undefined };
  IdpIdentifiers?: string[];
  AcrMapping?: { [key: string]: string | undefined };
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
export type AssetExtensionType = "ICO" | "JPEG" | "PNG" | "SVG" | "WEBP" | (string & {});
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
export type PreTokenGenerationLambdaVersionType = "V1_0" | "V2_0" | "V3_0" | (string & {});
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
export type AliasAttributeType = "phone_number" | "email" | "preferred_username" | (string & {});
export type AliasAttributesListType = AliasAttributeType[];
export type UsernameAttributeType = "phone_number" | "email" | (string & {});
export type UsernameAttributesListType = UsernameAttributeType[];
export type SmsVerificationMessageType = string;
export type EmailVerificationMessageType = string;
export type EmailVerificationSubjectType = string;
export type EmailVerificationMessageByLinkType = string;
export type EmailVerificationSubjectByLinkType = string;
export type DefaultEmailOptionType = "CONFIRM_WITH_LINK" | "CONFIRM_WITH_CODE" | (string & {});
export interface VerificationMessageTemplateType {
  SmsMessage?: string;
  EmailMessage?: string;
  EmailSubject?: string;
  EmailMessageByLink?: string;
  EmailSubjectByLink?: string;
  DefaultEmailOption?: DefaultEmailOptionType;
}
export type UserPoolMfaType = "OFF" | "ON" | "OPTIONAL" | (string & {});
export type AttributesRequireVerificationBeforeUpdateType = VerifiedAttributeType[];
export interface UserAttributeUpdateSettingsType {
  AttributesRequireVerificationBeforeUpdate?: VerifiedAttributeType[];
}
export interface DeviceConfigurationType {
  ChallengeRequiredOnNewDevice?: boolean;
  DeviceOnlyRememberedOnUserPrompt?: boolean;
}
export type EmailAddressType = string;
export type EmailSendingAccountType = "COGNITO_DEFAULT" | "DEVELOPER" | (string & {});
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
export type AdvancedSecurityModeType = "OFF" | "AUDIT" | "ENFORCED" | (string & {});
export type AdvancedSecurityEnabledModeType = "AUDIT" | "ENFORCED" | (string & {});
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
export type EncryptionKeyType = "AWS_OWNED_KEY" | "CUSTOMER_MANAGED_KEY" | (string & {});
export type EncryptionKeyArnType = string;
export interface KeyConfigurationType {
  KeyType?: EncryptionKeyType;
  KmsKeyArn?: string;
}
export type IssuerType = "ORIGINAL" | "UPDATED" | (string & {});
export interface IssuerConfigurationType {
  Type?: IssuerType;
}
export type AcrLevelKeyType = string;
export interface AcrLevelConfigType {
  AcrValue: string;
}
export type AcrConfigurationType = { [key: string]: AcrLevelConfigType | undefined };
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
  AcrConfiguration?: { [key: string]: AcrLevelConfigType | undefined };
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
  AcrConfiguration?: { [key: string]: AcrLevelConfigType | undefined };
}
export interface CreateUserPoolResponse {
  UserPool?: UserPoolType;
}
export type ClientNameType = string;
export type GenerateSecret = boolean;
export type RefreshTokenValidityType = number;
export type AccessTokenValidityType = number;
export type IdTokenValidityType = number;
export type TimeUnitsType = "seconds" | "minutes" | "hours" | "days" | (string & {});
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
export type OAuthFlowType = "code" | "implicit" | "client_credentials" | (string & {});
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
export type PreventUserExistenceErrorTypes = "LEGACY" | "ENABLED" | (string & {});
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
export type SecurityPolicyType = "TLS_V1" | "TLS_V1_2_2021" | "TLS_V1_3_2025" | (string & {});
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
export type ReplicaStatusType = "CREATING" | "ACTIVE" | "INACTIVE" | "DELETING" | (string & {});
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
export type EventFilterType = "SIGN_IN" | "PASSWORD_CHANGE" | "SIGN_UP" | (string & {});
export type EventFiltersType = EventFilterType[];
export type CompromisedCredentialsEventActionType = "BLOCK" | "NO_ACTION" | (string & {});
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
export type EventSourceName = "userNotification" | "userAuthEvents" | (string & {});
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
export type WebAuthnCredentialDescriptionListType = WebAuthnCredentialDescription[];
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
  AvailableChallenges?: ChallengeNameType[];
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
  AcrMapping?: { [key: string]: string | undefined };
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
  AcrConfiguration?: { [key: string]: AcrLevelConfigType | undefined };
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
export type VerifySoftwareTokenResponseType = "SUCCESS" | "ERROR" | (string & {});
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
  input: __S(3520, __c110, 0) as any as S.Schema<AddCustomAttributesRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AddCustomAttributesResponse>,
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
}));

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
  input: __S(3616, __c113, 0) as any as S.Schema<AddUserPoolClientSecretRequest>,
  output: __S(3617, __c113, 1) as any as S.Schema<AddUserPoolClientSecretResponse>,
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
}));

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
  input: __S(3680, __c115, 0) as any as S.Schema<AdminAddUserToGroupRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminAddUserToGroupResponse>,
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
}));

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
  input: __S(3712, __c116, 0) as any as S.Schema<AdminConfirmSignUpRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminConfirmSignUpResponse>,
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
}));

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
  input: __S(3776, __c118, 0) as any as S.Schema<AdminCreateUserRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<AdminCreateUserResponse>,
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
}));

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
  input: __S(3936, __c123, 0) as any as S.Schema<AdminDeleteSoftwareTokenRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminDeleteSoftwareTokenResponse>,
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
}));

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
  input: __S(3968, __c124, 0) as any as S.Schema<AdminDeleteUserRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminDeleteUserResponse>,
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
}));

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
  input: __S(4000, __c125, 0) as any as S.Schema<AdminDeleteUserAttributesRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminDeleteUserAttributesResponse>,
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
}));

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
  input: __S(4064, __c127, 0) as any as S.Schema<AdminDisableProviderForUserRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminDisableProviderForUserResponse>,
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
}));

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
  input: __S(4128, __c129, 0) as any as S.Schema<AdminDisableUserRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminDisableUserResponse>,
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
}));

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
  input: __S(4160, __c130, 0) as any as S.Schema<AdminEnableUserRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminEnableUserResponse>,
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
}));

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
  input: __S(4192, __c131, 0) as any as S.Schema<AdminForgetDeviceRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminForgetDeviceResponse>,
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
}));

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
  input: __S(4224, __c132, 0) as any as S.Schema<AdminGetDeviceRequest>,
  output: __S(4256, __c133, 0) as any as S.Schema<AdminGetDeviceResponse>,
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
}));

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
  input: __S(4320, __c135, 0) as any as S.Schema<AdminGetUserRequest>,
  output: __S(4321, __c135, 1) as any as S.Schema<AdminGetUserResponse>,
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
}));

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
  input: __S(4352, __c136, 0) as any as S.Schema<AdminGetUserAuthFactorsRequest>,
  output: __S(4384, __c137, 0) as any as S.Schema<AdminGetUserAuthFactorsResponse>,
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
}));

export type AdminInitiateAuthError =
  | FeatureUnavailableInTierException
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
  input: __S(4416, __c138, 0) as any as S.Schema<AdminInitiateAuthRequest>,
  output: __S(4512, __c141, 0) as any as S.Schema<AdminInitiateAuthResponse>,
  errors: [
    FeatureUnavailableInTierException,
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
}));

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
  input: __S(4576, __c143, 0) as any as S.Schema<AdminLinkProviderForUserRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminLinkProviderForUserResponse>,
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
}));

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
  input: __S(4608, __c144, 0) as any as S.Schema<AdminListDevicesRequest>,
  output: __S(4641, __c145, 1) as any as S.Schema<AdminListDevicesResponse>,
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
}));

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
  input: __S(4672, __c146, 0) as any as S.Schema<AdminListGroupsForUserRequest>,
  output: __S(4705, __c147, 1) as any as S.Schema<AdminListGroupsForUserResponse>,
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
  input: __S(4768, __c149, 0) as any as S.Schema<AdminListUserAuthEventsRequest>,
  output: __S(4776, __c149, 8) as any as S.Schema<AdminListUserAuthEventsResponse>,
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
  input: __S(4800, __c150, 0) as any as S.Schema<AdminRemoveUserFromGroupRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminRemoveUserFromGroupResponse>,
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
}));

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
 * Begins the password reset process. Sets the requested user's account into a
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
  input: __S(4832, __c151, 0) as any as S.Schema<AdminResetUserPasswordRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminResetUserPasswordResponse>,
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
}));

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
  input: __S(4864, __c152, 0) as any as S.Schema<AdminRespondToAuthChallengeRequest>,
  output: __S(4512, __c141, 0) as any as S.Schema<AdminRespondToAuthChallengeResponse>,
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
}));

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
  input: __S(4896, __c153, 0) as any as S.Schema<AdminSetUserMFAPreferenceRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminSetUserMFAPreferenceResponse>,
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
}));

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
  input: __S(4992, __c156, 0) as any as S.Schema<AdminSetUserPasswordRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminSetUserPasswordResponse>,
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
}));

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
  input: __S(5024, __c157, 0) as any as S.Schema<AdminSetUserSettingsRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminSetUserSettingsResponse>,
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
}));

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
  input: __S(5056, __c158, 0) as any as S.Schema<AdminUpdateAuthEventFeedbackRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminUpdateAuthEventFeedbackResponse>,
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
}));

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
  input: __S(5088, __c159, 0) as any as S.Schema<AdminUpdateDeviceStatusRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminUpdateDeviceStatusResponse>,
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
}));

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
  input: __S(5120, __c160, 0) as any as S.Schema<AdminUpdateUserAttributesRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminUpdateUserAttributesResponse>,
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
}));

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
  input: __S(5152, __c161, 0) as any as S.Schema<AdminUserGlobalSignOutRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<AdminUserGlobalSignOutResponse>,
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
}));

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
  input: __S(5184, __c162, 0) as any as S.Schema<AssociateSoftwareTokenRequest>,
  output: __S(5185, __c162, 1) as any as S.Schema<AssociateSoftwareTokenResponse>,
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
}));

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
  input: __S(5216, __c163, 0) as any as S.Schema<ChangePasswordRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<ChangePasswordResponse>,
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
}));

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
  input: __S(5248, __c164, 0) as any as S.Schema<CompleteWebAuthnRegistrationRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<CompleteWebAuthnRegistrationResponse>,
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
}));

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
  input: __S(5281, __c165, 1) as any as S.Schema<ConfirmDeviceRequest>,
  output: __S(5282, __c165, 2) as any as S.Schema<ConfirmDeviceResponse>,
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
}));

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
  input: __S(5312, __c166, 0) as any as S.Schema<ConfirmForgotPasswordRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<ConfirmForgotPasswordResponse>,
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
}));

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
  input: __S(5376, __c168, 0) as any as S.Schema<ConfirmSignUpRequest>,
  output: __S(5377, __c168, 1) as any as S.Schema<ConfirmSignUpResponse>,
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
}));

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
  input: __S(5408, __c169, 0) as any as S.Schema<CreateGroupRequest>,
  output: __S(5440, __c170, 0) as any as S.Schema<CreateGroupResponse>,
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
}));

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
  input: __S(5472, __c171, 0) as any as S.Schema<CreateIdentityProviderRequest>,
  output: __S(5505, __c172, 1) as any as S.Schema<CreateIdentityProviderResponse>,
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
}));

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
  input: __S(5536, __c173, 0) as any as S.Schema<CreateManagedLoginBrandingRequest>,
  output: __S(5571, __c174, 3) as any as S.Schema<CreateManagedLoginBrandingResponse>,
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
}));

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
  input: __S(5600, __c175, 0) as any as S.Schema<CreateResourceServerRequest>,
  output: __S(5664, __c177, 0) as any as S.Schema<CreateResourceServerResponse>,
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
}));

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
  input: __S(5696, __c178, 0) as any as S.Schema<CreateTermsRequest>,
  output: __S(5729, __c179, 1) as any as S.Schema<CreateTermsResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateUserImportJobRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<CreateUserImportJobResponse>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<CreateUserPoolRequest>,
  output: __S(130, __c4, 2) as any as S.Schema<CreateUserPoolResponse>,
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
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<CreateUserPoolClientRequest>,
  output: __S(292, __c9, 4) as any as S.Schema<CreateUserPoolClientResponse>,
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
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<CreateUserPoolDomainRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<CreateUserPoolDomainResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<CreateUserPoolReplicaRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<CreateUserPoolReplicaResponse>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteGroupRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteGroupResponse>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<DeleteIdentityProviderRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteIdentityProviderResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<DeleteManagedLoginBrandingRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteManagedLoginBrandingResponse>,
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
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<DeleteResourceServerRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteResourceServerResponse>,
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
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<DeleteTermsRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteTermsResponse>,
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
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteUserResponse>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<DeleteUserAttributesRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteUserAttributesResponse>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<DeleteUserPoolRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteUserPoolResponse>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<DeleteUserPoolClientRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteUserPoolClientResponse>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DeleteUserPoolClientSecretRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteUserPoolClientSecretResponse>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DeleteUserPoolDomainRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteUserPoolDomainResponse>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<DeleteUserPoolReplicaRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<DeleteUserPoolReplicaResponse>,
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
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<DeleteWebAuthnCredentialRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<DeleteWebAuthnCredentialResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<DescribeIdentityProviderRequest>,
  output: __S(5505, __c172, 1) as any as S.Schema<DescribeIdentityProviderResponse>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<DescribeManagedLoginBrandingRequest>,
  output: __S(5571, __c174, 3) as any as S.Schema<DescribeManagedLoginBrandingResponse>,
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
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<DescribeManagedLoginBrandingByClientRequest>,
  output: __S(5571, __c174, 3) as any as S.Schema<DescribeManagedLoginBrandingByClientResponse>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<DescribeResourceServerRequest>,
  output: __S(5664, __c177, 0) as any as S.Schema<DescribeResourceServerResponse>,
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
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<DescribeRiskConfigurationRequest>,
  output: __S(1097, __c34, 9) as any as S.Schema<DescribeRiskConfigurationResponse>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<DescribeTermsRequest>,
  output: __S(5729, __c179, 1) as any as S.Schema<DescribeTermsResponse>,
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
}));

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
 * `cognito-idp:DescribeTermsByClient` Identity and Access Management (IAM) permission. An IAM
 * policy that denies `cognito-idp:DescribeTerms` also denies requests to
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
  input: __S(1152, __c36, 0) as any as S.Schema<DescribeTermsByClientRequest>,
  output: __S(5729, __c179, 1) as any as S.Schema<DescribeTermsByClientResponse>,
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
}));

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
  input: __S(1184, __c37, 0) as any as S.Schema<DescribeUserImportJobRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DescribeUserImportJobResponse>,
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
}));

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
  input: __S(1216, __c38, 0) as any as S.Schema<DescribeUserPoolRequest>,
  output: __S(130, __c4, 2) as any as S.Schema<DescribeUserPoolResponse>,
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
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<DescribeUserPoolClientRequest>,
  output: __S(292, __c9, 4) as any as S.Schema<DescribeUserPoolClientResponse>,
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
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<DescribeUserPoolDomainRequest>,
  output: __S(1282, __c40, 2) as any as S.Schema<DescribeUserPoolDomainResponse>,
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
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<ForgetDeviceRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<ForgetDeviceResponse>,
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
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<ForgotPasswordRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<ForgotPasswordResponse>,
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
}));

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
 * to your resource servers.
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
  input: __S(1440, __c45, 0) as any as S.Schema<GetClientTokenRequest>,
  output: __S(1442, __c45, 2) as any as S.Schema<GetClientTokenResponse>,
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
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<GetCSVHeaderRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<GetCSVHeaderResponse>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<GetDeviceRequest>,
  output: __S(4256, __c133, 0) as any as S.Schema<GetDeviceResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<GetGroupRequest>,
  output: __S(5440, __c170, 0) as any as S.Schema<GetGroupResponse>,
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
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<GetIdentityProviderByIdentifierRequest>,
  output: __S(5505, __c172, 1) as any as S.Schema<GetIdentityProviderByIdentifierResponse>,
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
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<GetLogDeliveryConfigurationRequest>,
  output: __S(1638, __c51, 6) as any as S.Schema<GetLogDeliveryConfigurationResponse>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<GetProvisionedLimitRequest>,
  output: __S(1698, __c53, 2) as any as S.Schema<GetProvisionedLimitResponse>,
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
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<GetSigningCertificateRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<GetSigningCertificateResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    OperationNotEnabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningCertificate",
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<GetTokensFromRefreshTokenRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<GetTokensFromRefreshTokenResponse>,
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
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<GetUICustomizationRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<GetUICustomizationResponse>,
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
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<GetUserRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<GetUserResponse>,
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
}));

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
  input: __S(1888, __c59, 0) as any as S.Schema<GetUserAttributeVerificationCodeRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<GetUserAttributeVerificationCodeResponse>,
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
}));

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
  input: __S(1920, __c60, 0) as any as S.Schema<GetUserAuthFactorsRequest>,
  output: __S(4384, __c137, 0) as any as S.Schema<GetUserAuthFactorsResponse>,
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
}));

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
  input: __S(1952, __c61, 0) as any as S.Schema<GetUserPoolMfaConfigRequest>,
  output: __S(1987, __c62, 3) as any as S.Schema<GetUserPoolMfaConfigResponse>,
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
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<GlobalSignOutRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<GlobalSignOutResponse>,
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
}));

export type InitiateAuthError =
  | FeatureUnavailableInTierException
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
  input: __S(2048, __c64, 0) as any as S.Schema<InitiateAuthRequest>,
  output: __S(4512, __c141, 0) as any as S.Schema<InitiateAuthResponse>,
  errors: [
    FeatureUnavailableInTierException,
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
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<ListDevicesRequest>,
  output: __S(4641, __c145, 1) as any as S.Schema<ListDevicesResponse>,
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
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<ListGroupsRequest>,
  output: __S(4705, __c147, 1) as any as S.Schema<ListGroupsResponse>,
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
  input: __S(2144, __c67, 0) as any as S.Schema<ListIdentityProvidersRequest>,
  output: __S(2147, __c67, 3) as any as S.Schema<ListIdentityProvidersResponse>,
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
  input: __S(2176, __c68, 0) as any as S.Schema<ListResourceServersRequest>,
  output: __S(2178, __c68, 2) as any as S.Schema<ListResourceServersResponse>,
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
  input: __S(2208, __c69, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2209, __c69, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<ListTermsRequest>,
  output: __S(2243, __c70, 3) as any as S.Schema<ListTermsResponse>,
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
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<ListUserImportJobsRequest>,
  output: __S(2274, __c71, 2) as any as S.Schema<ListUserImportJobsResponse>,
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
}));

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
  input: __S(2304, __c72, 0) as any as S.Schema<ListUserPoolClientsRequest>,
  output: __S(2307, __c72, 3) as any as S.Schema<ListUserPoolClientsResponse>,
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
  input: __S(2336, __c73, 0) as any as S.Schema<ListUserPoolClientSecretsRequest>,
  output: __S(2338, __c73, 2) as any as S.Schema<ListUserPoolClientSecretsResponse>,
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
}));

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
  input: __S(2368, __c74, 0) as any as S.Schema<ListUserPoolReplicasRequest>,
  output: __S(2370, __c74, 2) as any as S.Schema<ListUserPoolReplicasResponse>,
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
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<ListUserPoolsRequest>,
  output: __S(2403, __c75, 3) as any as S.Schema<ListUserPoolsResponse>,
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
  input: __S(2432, __c76, 0) as any as S.Schema<ListUsersRequest>,
  output: __S(2433, __c76, 1) as any as S.Schema<ListUsersResponse>,
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
  input: __S(2496, __c78, 0) as any as S.Schema<ListUsersInGroupRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<ListUsersInGroupResponse>,
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
  input: __S(2528, __c79, 0) as any as S.Schema<ListWebAuthnCredentialsRequest>,
  output: __S(2531, __c79, 3) as any as S.Schema<ListWebAuthnCredentialsResponse>,
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
}));

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
  input: __S(2560, __c80, 0) as any as S.Schema<ResendConfirmationCodeRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<ResendConfirmationCodeResponse>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<RespondToAuthChallengeRequest>,
  output: __S(4512, __c141, 0) as any as S.Schema<RespondToAuthChallengeResponse>,
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
}));

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
  input: __S(2624, __c82, 0) as any as S.Schema<RevokeTokenRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<RevokeTokenResponse>,
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
}));

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
  input: __S(2656, __c83, 0) as any as S.Schema<SetLogDeliveryConfigurationRequest>,
  output: __S(1638, __c51, 6) as any as S.Schema<SetLogDeliveryConfigurationResponse>,
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
}));

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
  input: __S(2688, __c84, 0) as any as S.Schema<SetRiskConfigurationRequest>,
  output: __S(1097, __c34, 9) as any as S.Schema<SetRiskConfigurationResponse>,
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
}));

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
  input: __S(2720, __c85, 0) as any as S.Schema<SetUICustomizationRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<SetUICustomizationResponse>,
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
}));

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
  input: __S(2752, __c86, 0) as any as S.Schema<SetUserMFAPreferenceRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<SetUserMFAPreferenceResponse>,
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
}));

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
  input: __S(2784, __c87, 0) as any as S.Schema<SetUserPoolMfaConfigRequest>,
  output: __S(1987, __c62, 3) as any as S.Schema<SetUserPoolMfaConfigResponse>,
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
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<SetUserSettingsRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<SetUserSettingsResponse>,
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
}));

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
  input: __S(2848, __c89, 0) as any as S.Schema<SignUpRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<SignUpResponse>,
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
}));

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
  input: __S(2880, __c90, 0) as any as S.Schema<StartUserImportJobRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<StartUserImportJobResponse>,
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
}));

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
  input: __S(2912, __c91, 0) as any as S.Schema<StartWebAuthnRegistrationRequest>,
  output: __S(2913, __c91, 1) as any as S.Schema<StartWebAuthnRegistrationResponse>,
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
}));

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
  input: __S(2944, __c92, 0) as any as S.Schema<StopUserImportJobRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<StopUserImportJobResponse>,
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
}));

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
  input: __S(2976, __c93, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(3008, __c94, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(3040, __c95, 0) as any as S.Schema<UpdateAuthEventFeedbackRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<UpdateAuthEventFeedbackResponse>,
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
}));

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
  input: __S(3072, __c96, 0) as any as S.Schema<UpdateDeviceStatusRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<UpdateDeviceStatusResponse>,
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
}));

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
  input: __S(3104, __c97, 0) as any as S.Schema<UpdateGroupRequest>,
  output: __S(5440, __c170, 0) as any as S.Schema<UpdateGroupResponse>,
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
}));

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
  input: __S(3136, __c98, 0) as any as S.Schema<UpdateIdentityProviderRequest>,
  output: __S(5505, __c172, 1) as any as S.Schema<UpdateIdentityProviderResponse>,
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
}));

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
  input: __S(3168, __c99, 0) as any as S.Schema<UpdateManagedLoginBrandingRequest>,
  output: __S(5571, __c174, 3) as any as S.Schema<UpdateManagedLoginBrandingResponse>,
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
}));

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
  input: __S(3200, __c100, 0) as any as S.Schema<UpdateProvisionedLimitRequest>,
  output: __S(1698, __c53, 2) as any as S.Schema<UpdateProvisionedLimitResponse>,
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
}));

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
  input: __S(3232, __c101, 0) as any as S.Schema<UpdateResourceServerRequest>,
  output: __S(5664, __c177, 0) as any as S.Schema<UpdateResourceServerResponse>,
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
}));

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
  input: __S(3264, __c102, 0) as any as S.Schema<UpdateTermsRequest>,
  output: __S(5729, __c179, 1) as any as S.Schema<UpdateTermsResponse>,
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
}));

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
  input: __S(3296, __c103, 0) as any as S.Schema<UpdateUserAttributesRequest>,
  output: __S(3298, __c103, 2) as any as S.Schema<UpdateUserAttributesResponse>,
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
}));

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
  input: __S(3328, __c104, 0) as any as S.Schema<UpdateUserPoolRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<UpdateUserPoolResponse>,
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
}));

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
  input: __S(3360, __c105, 0) as any as S.Schema<UpdateUserPoolClientRequest>,
  output: __S(292, __c9, 4) as any as S.Schema<UpdateUserPoolClientResponse>,
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
}));

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
  input: __S(3392, __c106, 0) as any as S.Schema<UpdateUserPoolDomainRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<UpdateUserPoolDomainResponse>,
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
}));

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
  input: __S(3424, __c107, 0) as any as S.Schema<UpdateUserPoolReplicaRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<UpdateUserPoolReplicaResponse>,
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
}));

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
  input: __S(3456, __c108, 0) as any as S.Schema<VerifySoftwareTokenRequest>,
  output: __S(3457, __c108, 1) as any as S.Schema<VerifySoftwareTokenResponse>,
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
}));

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
  input: __S(3488, __c109, 0) as any as S.Schema<VerifyUserAttributeRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<VerifyUserAttributeResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.String,
          UserPoolId: S.String,
          CloudWatchLogsRoleArn: S.String,
          PasswordHashingAlgorithm: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserImportJobRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String),
          JobId: S.optional(S.String),
          UserPoolId: S.optional(S.String),
          PreSignedUrl: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          CloudWatchLogsRoleArn: S.optional(S.String),
          ImportedUsers: S.optional(S.Number),
          SkippedUsers: S.optional(S.Number),
          FailedUsers: S.optional(S.Number),
          CompletionMessage: S.optional(S.String),
          PasswordHashingAlgorithm: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserImportJobType" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserImportJob: S.optional(__S(32, __c1, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateUserImportJobResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolName: S.String,
          Policies: S.optional(__S(226, __c7, 2)),
          DeletionProtection: S.optional(S.String),
          LambdaConfig: S.optional(__S(193, __c6, 1)),
          AutoVerifiedAttributes: S.optional(__S(3904, __c122, 0)),
          AliasAttributes: S.optional(__S(3904, __c122, 0)),
          UsernameAttributes: S.optional(__S(3904, __c122, 0)),
          SmsVerificationMessage: S.optional(S.String),
          EmailVerificationMessage: S.optional(S.String),
          EmailVerificationSubject: S.optional(S.String),
          VerificationMessageTemplate: S.optional(__S(227, __c7, 3)),
          SmsAuthenticationMessage: S.optional(S.String),
          MfaConfiguration: S.optional(S.String),
          UserAttributeUpdateSettings: S.optional(__S(228, __c7, 4)),
          DeviceConfiguration: S.optional(__S(229, __c7, 5)),
          EmailConfiguration: S.optional(__S(230, __c7, 6)),
          SmsConfiguration: S.optional(__S(161, __c5, 1)),
          UserPoolTags: S.optional(__S(3744, __c117, 0)),
          AdminCreateUserConfig: S.optional(__S(232, __c7, 8)),
          Schema: S.optional(__S(3555, __c111, 3)),
          UserPoolAddOns: S.optional(__S(234, __c7, 10)),
          UsernameConfiguration: S.optional(__S(128, __c4, 0)),
          AccountRecoverySetting: S.optional(__S(237, __c7, 13)),
          UserPoolTier: S.optional(S.String),
          KeyConfiguration: S.optional(__S(238, __c7, 14)),
          IssuerConfiguration: S.optional(__S(239, __c7, 15)),
          AcrConfiguration: S.optional(__S(241, __c7, 17)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserPoolRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CaseSensitive: S.Boolean })).annotate({
        identifier: "UsernameConfigurationType",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Policies: S.optional(__S(226, __c7, 2)),
          DeletionProtection: S.optional(S.String),
          LambdaConfig: S.optional(__S(193, __c6, 1)),
          Status: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SchemaAttributes: S.optional(__S(3555, __c111, 3)),
          AutoVerifiedAttributes: S.optional(__S(3904, __c122, 0)),
          AliasAttributes: S.optional(__S(3904, __c122, 0)),
          UsernameAttributes: S.optional(__S(3904, __c122, 0)),
          SmsVerificationMessage: S.optional(S.String),
          EmailVerificationMessage: S.optional(S.String),
          EmailVerificationSubject: S.optional(S.String),
          VerificationMessageTemplate: S.optional(__S(227, __c7, 3)),
          SmsAuthenticationMessage: S.optional(S.String),
          UserAttributeUpdateSettings: S.optional(__S(228, __c7, 4)),
          MfaConfiguration: S.optional(S.String),
          DeviceConfiguration: S.optional(__S(229, __c7, 5)),
          EstimatedNumberOfUsers: S.optional(S.Number),
          EmailConfiguration: S.optional(__S(230, __c7, 6)),
          SmsConfiguration: S.optional(__S(161, __c5, 1)),
          UserPoolTags: S.optional(__S(3744, __c117, 0)),
          SmsConfigurationFailure: S.optional(S.String),
          EmailConfigurationFailure: S.optional(S.String),
          Domain: S.optional(S.String),
          CustomDomain: S.optional(S.String),
          AdminCreateUserConfig: S.optional(__S(232, __c7, 8)),
          UserPoolAddOns: S.optional(__S(234, __c7, 10)),
          UsernameConfiguration: S.optional(__S(128, __c4, 0)),
          Arn: S.optional(S.String),
          AccountRecoverySetting: S.optional(__S(237, __c7, 13)),
          UserPoolTier: S.optional(S.String),
          KeyConfiguration: S.optional(__S(238, __c7, 14)),
          IssuerConfiguration: S.optional(__S(239, __c7, 15)),
          AcrConfiguration: S.optional(__S(241, __c7, 17)),
        }),
      ).annotate({ identifier: "UserPoolType" });
    case 2:
      return S.suspend(() =>
        S.Struct({ UserPool: S.optional(__S(129, __c4, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateUserPoolResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CallerArn: S.String,
          ExternalId: S.optional(S.String),
          OriginationIdentity: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          InEntityId: S.optional(S.String),
          InTemplateId: S.optional(S.String),
          Region: S.optional(S.String),
        }),
      ).annotate({ identifier: "EumsSmsConfigurationType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SnsCallerArn: S.optional(S.String),
          ExternalId: S.optional(S.String),
          SnsRegion: S.optional(S.String),
          EumsSms: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "SmsConfigurationType" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LambdaVersion: S.String, LambdaArn: S.String })).annotate({
        identifier: "PreTokenGenerationVersionConfigType",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PreSignUp: S.optional(S.String),
          CustomMessage: S.optional(S.String),
          PostConfirmation: S.optional(S.String),
          PreAuthentication: S.optional(S.String),
          PostAuthentication: S.optional(S.String),
          DefineAuthChallenge: S.optional(S.String),
          CreateAuthChallenge: S.optional(S.String),
          VerifyAuthChallengeResponse: S.optional(S.String),
          PreTokenGeneration: S.optional(S.String),
          UserMigration: S.optional(S.String),
          PreTokenGenerationConfig: S.optional(__S(192, __c6, 0)),
          CustomSMSSender: S.optional(__S(192, __c6, 0)),
          CustomEmailSender: S.optional(__S(192, __c6, 0)),
          KMSKeyID: S.optional(S.String),
          InboundFederation: S.optional(__S(192, __c6, 0)),
        }),
      ).annotate({ identifier: "LambdaConfigType" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MinimumLength: S.optional(S.Number),
          RequireUppercase: S.optional(S.Boolean),
          RequireLowercase: S.optional(S.Boolean),
          RequireNumbers: S.optional(S.Boolean),
          RequireSymbols: S.optional(S.Boolean),
          PasswordHistorySize: S.optional(S.Number),
          TemporaryPasswordValidityDays: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PasswordPolicyType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AllowedFirstAuthFactors: S.optional(__S(3904, __c122, 0)) }),
      ).annotate({ identifier: "SignInPolicyType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          PasswordPolicy: S.optional(__S(224, __c7, 0)),
          SignInPolicy: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "UserPoolPolicyType" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SmsMessage: S.optional(S.String),
          EmailMessage: S.optional(S.String),
          EmailSubject: S.optional(S.String),
          EmailMessageByLink: S.optional(S.String),
          EmailSubjectByLink: S.optional(S.String),
          DefaultEmailOption: S.optional(S.String),
        }),
      ).annotate({ identifier: "VerificationMessageTemplateType" });
    case 4:
      return S.suspend(() =>
        S.Struct({ AttributesRequireVerificationBeforeUpdate: S.optional(__S(3904, __c122, 0)) }),
      ).annotate({ identifier: "UserAttributeUpdateSettingsType" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ChallengeRequiredOnNewDevice: S.optional(S.Boolean),
          DeviceOnlyRememberedOnUserPrompt: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeviceConfigurationType" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          SourceArn: S.optional(S.String),
          ReplyToEmailAddress: S.optional(S.String),
          EmailSendingAccount: S.optional(S.String),
          From: S.optional(S.String),
          ConfigurationSet: S.optional(S.String),
        }),
      ).annotate({ identifier: "EmailConfigurationType" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          SMSMessage: S.optional(S.String),
          EmailMessage: S.optional(S.String),
          EmailSubject: S.optional(S.String),
        }),
      ).annotate({ identifier: "MessageTemplateType" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          AllowAdminCreateUserOnly: S.optional(S.Boolean),
          UnusedAccountValidityDays: S.optional(S.Number),
          InviteMessageTemplate: S.optional(__S(231, __c7, 7)),
        }),
      ).annotate({ identifier: "AdminCreateUserConfigType" });
    case 9:
      return S.suspend(() => S.Struct({ CustomAuthMode: S.optional(S.String) })).annotate({
        identifier: "AdvancedSecurityAdditionalFlowsType",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AdvancedSecurityMode: S.String,
          AdvancedSecurityAdditionalFlows: S.optional(__S(233, __c7, 9)),
        }),
      ).annotate({ identifier: "UserPoolAddOnsType" });
    case 11:
      return S.suspend(() => S.Struct({ Priority: S.Number, Name: S.String })).annotate({
        identifier: "RecoveryOptionType",
      });
    case 12:
      return S.Array(__S(235, __c7, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ RecoveryMechanisms: S.optional(__S(236, __c7, 12)) }),
      ).annotate({ identifier: "AccountRecoverySettingType" });
    case 14:
      return S.suspend(() =>
        S.Struct({ KeyType: S.optional(S.String), KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "KeyConfigurationType" });
    case 15:
      return S.suspend(() => S.Struct({ Type: S.optional(S.String) })).annotate({
        identifier: "IssuerConfigurationType",
      });
    case 16:
      return S.suspend(() => S.Struct({ AcrValue: S.String })).annotate({
        identifier: "AcrLevelConfigType",
      });
    case 17:
      return S.Record(S.String, /*@__PURE__*/ __S(240, __c7, 16).pipe(S.optional));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientName: S.String,
          GenerateSecret: S.optional(S.Boolean),
          ClientSecret: S.optional(SensitiveString),
          RefreshTokenValidity: S.optional(S.Number),
          AccessTokenValidity: S.optional(S.Number),
          IdTokenValidity: S.optional(S.Number),
          TokenValidityUnits: S.optional(__S(288, __c9, 0)),
          ReadAttributes: S.optional(__S(4032, __c126, 0)),
          WriteAttributes: S.optional(__S(4032, __c126, 0)),
          ExplicitAuthFlows: S.optional(__S(3904, __c122, 0)),
          SupportedIdentityProviders: S.optional(__S(4032, __c126, 0)),
          CallbackURLs: S.optional(__S(4032, __c126, 0)),
          LogoutURLs: S.optional(__S(4032, __c126, 0)),
          DefaultRedirectURI: S.optional(S.String),
          AllowedOAuthFlows: S.optional(__S(3904, __c122, 0)),
          AllowedOAuthScopes: S.optional(__S(4032, __c126, 0)),
          AllowedOAuthFlowsUserPoolClient: S.optional(S.Boolean),
          AnalyticsConfiguration: S.optional(__S(289, __c9, 1)),
          PreventUserExistenceErrors: S.optional(S.String),
          EnableTokenRevocation: S.optional(S.Boolean),
          EnablePropagateAdditionalUserContextData: S.optional(S.Boolean),
          AuthSessionValidity: S.optional(S.Number),
          RefreshTokenRotation: S.optional(__S(290, __c9, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserPoolClientRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessToken: S.optional(S.String),
          IdToken: S.optional(S.String),
          RefreshToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "TokenValidityUnitsType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ExternalId: S.optional(S.String),
          UserDataShared: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AnalyticsConfigurationType" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Feature: S.String, RetryGracePeriodSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "RefreshTokenRotationType" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.optional(S.String),
          ClientName: S.optional(S.String),
          ClientId: S.optional(SensitiveString),
          ClientSecret: S.optional(SensitiveString),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RefreshTokenValidity: S.optional(S.Number),
          AccessTokenValidity: S.optional(S.Number),
          IdTokenValidity: S.optional(S.Number),
          TokenValidityUnits: S.optional(__S(288, __c9, 0)),
          ReadAttributes: S.optional(__S(4032, __c126, 0)),
          WriteAttributes: S.optional(__S(4032, __c126, 0)),
          ExplicitAuthFlows: S.optional(__S(3904, __c122, 0)),
          SupportedIdentityProviders: S.optional(__S(4032, __c126, 0)),
          CallbackURLs: S.optional(__S(4032, __c126, 0)),
          LogoutURLs: S.optional(__S(4032, __c126, 0)),
          DefaultRedirectURI: S.optional(S.String),
          AllowedOAuthFlows: S.optional(__S(3904, __c122, 0)),
          AllowedOAuthScopes: S.optional(__S(4032, __c126, 0)),
          AllowedOAuthFlowsUserPoolClient: S.optional(S.Boolean),
          AnalyticsConfiguration: S.optional(__S(289, __c9, 1)),
          PreventUserExistenceErrors: S.optional(S.String),
          EnableTokenRevocation: S.optional(S.Boolean),
          EnablePropagateAdditionalUserContextData: S.optional(S.Boolean),
          AuthSessionValidity: S.optional(S.Number),
          RefreshTokenRotation: S.optional(__S(290, __c9, 2)),
        }),
      ).annotate({ identifier: "UserPoolClientType" });
    case 4:
      return S.suspend(() =>
        S.Struct({ UserPoolClient: S.optional(__S(291, __c9, 3)) }).pipe(ns),
      ).annotate({ identifier: "CreateUserPoolClientResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Domain: S.String,
          UserPoolId: S.String,
          ManagedLoginVersion: S.optional(S.Number),
          CustomDomainConfig: S.optional(__S(352, __c11, 0)),
          Routing: S.optional(__S(354, __c11, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserPoolDomainRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.String, SecurityPolicy: S.optional(S.String) }),
      ).annotate({ identifier: "CustomDomainConfigType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SecondaryRegion: S.String, PrimaryRoute53HealthCheckId: S.String }),
      ).annotate({ identifier: "FailoverType" });
    case 2:
      return S.suspend(() => S.Struct({ Failover: S.optional(__S(353, __c11, 1)) })).annotate({
        identifier: "RoutingType",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ManagedLoginVersion: S.optional(S.Number),
          CloudFrontDomain: S.optional(S.String),
          Routing: S.optional(__S(354, __c11, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateUserPoolDomainResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          RegionName: S.String,
          UserPoolTags: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserPoolReplicaRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegionName: S.optional(S.String),
          Status: S.optional(S.String),
          Role: S.optional(S.String),
          UserPoolArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserPoolReplicaType" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolReplica: S.optional(__S(448, __c14, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateUserPoolReplicaResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupName: S.String, UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGroupRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, ProviderName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIdentityProviderRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ManagedLoginBrandingId: S.String, UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteManagedLoginBrandingRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Identifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourceServerRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TermsId: S.String, UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTermsRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserAttributeNames: __S(4032, __c126, 0), AccessToken: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserAttributesRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserPoolRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, ClientId: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserPoolClientRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: SensitiveString,
          ClientSecretId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteUserPoolClientSecretRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Domain: S.String, UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserPoolDomainRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, RegionName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserPoolReplicaRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: SensitiveString, CredentialId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWebAuthnCredentialRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, ProviderName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeIdentityProviderRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ManagedLoginBrandingId: S.String,
          ReturnMergedResources: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeManagedLoginBrandingRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: SensitiveString,
          ReturnMergedResources: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeManagedLoginBrandingByClientRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Identifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeResourceServerRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, ClientId: S.optional(SensitiveString) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRiskConfigurationRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EventAction: S.String })).annotate({
        identifier: "CompromisedCredentialsActionsType",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventFilter: S.optional(__S(3904, __c122, 0)), Actions: __S(1088, __c34, 0) }),
      ).annotate({ identifier: "CompromisedCredentialsRiskConfigurationType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Subject: S.String,
          HtmlBody: S.optional(S.String),
          TextBody: S.optional(S.String),
        }),
      ).annotate({ identifier: "NotifyEmailType" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          From: S.optional(S.String),
          ReplyTo: S.optional(S.String),
          SourceArn: S.String,
          BlockEmail: S.optional(__S(1090, __c34, 2)),
          NoActionEmail: S.optional(__S(1090, __c34, 2)),
          MfaEmail: S.optional(__S(1090, __c34, 2)),
        }),
      ).annotate({ identifier: "NotifyConfigurationType" });
    case 4:
      return S.suspend(() => S.Struct({ Notify: S.Boolean, EventAction: S.String })).annotate({
        identifier: "AccountTakeoverActionType",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          LowAction: S.optional(__S(1092, __c34, 4)),
          MediumAction: S.optional(__S(1092, __c34, 4)),
          HighAction: S.optional(__S(1092, __c34, 4)),
        }),
      ).annotate({ identifier: "AccountTakeoverActionsType" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          NotifyConfiguration: S.optional(__S(1091, __c34, 3)),
          Actions: __S(1093, __c34, 5),
        }),
      ).annotate({ identifier: "AccountTakeoverRiskConfigurationType" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          BlockedIPRangeList: S.optional(__S(4032, __c126, 0)),
          SkippedIPRangeList: S.optional(__S(4032, __c126, 0)),
        }),
      ).annotate({ identifier: "RiskExceptionConfigurationType" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.optional(S.String),
          ClientId: S.optional(SensitiveString),
          CompromisedCredentialsRiskConfiguration: S.optional(__S(1089, __c34, 1)),
          AccountTakeoverRiskConfiguration: S.optional(__S(1094, __c34, 6)),
          RiskExceptionConfiguration: S.optional(__S(1095, __c34, 7)),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RiskConfigurationType" });
    case 9:
      return S.suspend(() =>
        S.Struct({ RiskConfiguration: __S(1096, __c34, 8) }).pipe(ns),
      ).annotate({ identifier: "DescribeRiskConfigurationResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TermsId: S.String, UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTermsRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClientId: SensitiveString, UserPoolId: S.String, TermsName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTermsByClientRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, JobId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeUserImportJobRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeUserPoolRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, ClientId: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeUserPoolClientRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Domain: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeUserPoolDomainRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.optional(S.String),
          AWSAccountId: S.optional(S.String),
          Domain: S.optional(S.String),
          S3Bucket: S.optional(S.String),
          CloudFrontDistribution: S.optional(S.String),
          Version: S.optional(S.String),
          Status: S.optional(S.String),
          CustomDomainConfig: S.optional(__S(352, __c11, 0)),
          ManagedLoginVersion: S.optional(S.Number),
          Routing: S.optional(__S(354, __c11, 2)),
        }),
      ).annotate({ identifier: "DomainDescriptionType" });
    case 2:
      return S.suspend(() =>
        S.Struct({ DomainDescription: S.optional(__S(1281, __c40, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeUserPoolDomainResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: S.optional(SensitiveString), DeviceKey: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ForgetDeviceRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientId: SensitiveString,
          SecretHash: S.optional(SensitiveString),
          UserContextData: S.optional(__S(5344, __c167, 0)),
          Username: SensitiveString,
          AnalyticsMetadata: S.optional(__S(4544, __c142, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ForgotPasswordRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CodeDeliveryDetails: S.optional(__S(1408, __c44, 0)) }).pipe(ns),
      ).annotate({ identifier: "ForgotPasswordResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(S.String),
          DeliveryMedium: S.optional(S.String),
          AttributeName: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeDeliveryDetailsType" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientId: SensitiveString,
          Secret: SensitiveString,
          Scopes: S.optional(__S(4032, __c126, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetClientTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessToken: S.optional(SensitiveString),
          ExpiresIn: S.optional(S.Number),
          TokenType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClientAuthenticationResultType" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ClientAuthenticationResult: S.optional(__S(1441, __c45, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetClientTokenResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCSVHeaderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.optional(S.String),
          CSVHeader: S.optional(__S(4032, __c126, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetCSVHeaderResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeviceKey: S.String, AccessToken: S.optional(SensitiveString) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeviceRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupName: S.String, UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGroupRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, IdpIdentifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentityProviderByIdentifierRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLogDeliveryConfigurationRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LogGroupArn: S.optional(S.String) })).annotate({
        identifier: "CloudWatchLogsConfigurationType",
      });
    case 1:
      return S.suspend(() => S.Struct({ BucketArn: S.optional(S.String) })).annotate({
        identifier: "S3ConfigurationType",
      });
    case 2:
      return S.suspend(() => S.Struct({ StreamArn: S.optional(S.String) })).annotate({
        identifier: "FirehoseConfigurationType",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          LogLevel: S.String,
          EventSource: S.String,
          CloudWatchLogsConfiguration: S.optional(__S(1632, __c51, 0)),
          S3Configuration: S.optional(__S(1633, __c51, 1)),
          FirehoseConfiguration: S.optional(__S(1634, __c51, 2)),
        }),
      ).annotate({ identifier: "LogConfigurationType" });
    case 4:
      return S.Array(__S(1635, __c51, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, LogConfigurations: __S(1636, __c51, 4) }),
      ).annotate({ identifier: "LogDeliveryConfigurationType" });
    case 6:
      return S.suspend(() =>
        S.Struct({ LogDeliveryConfiguration: S.optional(__S(1637, __c51, 5)) }).pipe(ns),
      ).annotate({ identifier: "GetLogDeliveryConfigurationResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LimitDefinition: __S(1696, __c53, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProvisionedLimitRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LimitClass: S.String, Attributes: __S(3744, __c117, 0) }),
      ).annotate({ identifier: "LimitDefinitionType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LimitDefinition: __S(1696, __c53, 0),
          ProvisionedLimitValue: S.Number,
          FreeLimitValue: S.Number,
        }),
      ).annotate({ identifier: "LimitType" });
    case 2:
      return S.suspend(() => S.Struct({ Limit: __S(1697, __c53, 1) }).pipe(ns)).annotate({
        identifier: "GetProvisionedLimitResponse",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSigningCertificateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Certificate: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetSigningCertificateResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RefreshToken: SensitiveString,
          ClientId: SensitiveString,
          ClientSecret: S.optional(SensitiveString),
          DeviceKey: S.optional(S.String),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTokensFromRefreshTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AuthenticationResult: S.optional(__S(4481, __c140, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetTokensFromRefreshTokenResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, ClientId: S.optional(SensitiveString) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUICustomizationRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.optional(S.String),
          ClientId: S.optional(SensitiveString),
          ImageUrl: S.optional(S.String),
          CSS: S.optional(S.String),
          CSSVersion: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UICustomizationType" });
    case 1:
      return S.suspend(() => S.Struct({ UICustomization: __S(1824, __c57, 0) }).pipe(ns)).annotate({
        identifier: "GetUICustomizationResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Username: SensitiveString,
          UserAttributes: __S(3841, __c120, 1),
          MFAOptions: S.optional(__S(3873, __c121, 1)),
          PreferredMfaSetting: S.optional(S.String),
          UserMFASettingList: S.optional(__S(4032, __c126, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetUserResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessToken: SensitiveString,
          AttributeName: S.String,
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetUserAttributeVerificationCodeRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUserAuthFactorsRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUserPoolMfaConfigRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SmsAuthenticationMessage: S.optional(S.String),
          SmsConfiguration: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "SmsMfaConfigType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Message: S.optional(S.String), Subject: S.optional(S.String) }),
      ).annotate({ identifier: "EmailMfaConfigType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RelyingPartyId: S.optional(S.String),
          UserVerification: S.optional(S.String),
          FactorConfiguration: S.optional(S.String),
        }),
      ).annotate({ identifier: "WebAuthnConfigurationType" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SmsMfaConfiguration: S.optional(__S(1984, __c62, 0)),
          SoftwareTokenMfaConfiguration: S.optional(__S(4928, __c154, 0)),
          EmailMfaConfiguration: S.optional(__S(1985, __c62, 1)),
          MfaConfiguration: S.optional(S.String),
          WebAuthnConfiguration: S.optional(__S(1986, __c62, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "GetUserPoolMfaConfigResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GlobalSignOutRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthFlow: S.String,
          AuthParameters: S.optional(__S(3744, __c117, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
          ClientId: SensitiveString,
          AnalyticsMetadata: S.optional(__S(4544, __c142, 0)),
          UserContextData: S.optional(__S(5344, __c167, 0)),
          Session: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "InitiateAuthRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessToken: SensitiveString,
          Limit: S.optional(S.Number),
          PaginationToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDevicesRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGroupsRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIdentityProvidersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProviderName: S.optional(S.String),
          ProviderType: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProviderDescription" });
    case 2:
      return S.Array(__S(2145, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Providers: __S(2146, __c67, 2), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListIdentityProvidersResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourceServersRequest" });
    case 1:
      return S.Array(__S(5634, __c176, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ ResourceServers: __S(2177, __c68, 1), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListResourceServersResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(3744, __c117, 0)) }).pipe(ns),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTermsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TermsId: S.String,
          TermsName: S.String,
          Enforcement: S.String,
          CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastModifiedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "TermsDescriptionType" });
    case 2:
      return S.Array(__S(2241, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Terms: __S(2242, __c70, 2), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListTermsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          MaxResults: S.Number,
          PaginationToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUserImportJobsRequest" });
    case 1:
      return S.Array(__S(32, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          UserImportJobs: S.optional(__S(2273, __c71, 1)),
          PaginationToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListUserImportJobsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUserPoolClientsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientId: S.optional(SensitiveString),
          UserPoolId: S.optional(S.String),
          ClientName: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserPoolClientDescription" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          UserPoolClients: S.optional(__S(2306, __c72, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListUserPoolClientsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: SensitiveString,
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUserPoolClientSecretsRequest" });
    case 1:
      return S.Array(__S(3648, __c114, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClientSecrets: S.optional(__S(2337, __c73, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListUserPoolClientSecretsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListUserPoolReplicasRequest" });
    case 1:
      return S.Array(__S(448, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          UserPoolReplicas: S.optional(__S(2369, __c74, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListUserPoolReplicasResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.Number }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListUserPoolsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          LambdaConfig: S.optional(__S(193, __c6, 1)),
          Status: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReplicaRegions: S.optional(__S(4032, __c126, 0)),
        }),
      ).annotate({ identifier: "UserPoolDescriptionType" });
    case 2:
      return S.Array(__S(2401, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          UserPools: S.optional(__S(2402, __c75, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListUserPoolsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          AttributesToGet: S.optional(__S(4032, __c126, 0)),
          Limit: S.optional(S.Number),
          PaginationToken: S.optional(S.String),
          Filter: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Users: S.optional(__S(2464, __c77, 0)),
          PaginationToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListUsersResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(3808, __c119, 0));
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          GroupName: S.String,
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUsersInGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Users: S.optional(__S(2464, __c77, 0)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListUsersInGroupResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessToken: SensitiveString,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListWebAuthnCredentialsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CredentialId: S.String,
          FriendlyCredentialName: S.String,
          RelyingPartyId: S.String,
          AuthenticatorAttachment: S.optional(S.String),
          AuthenticatorTransports: __S(4032, __c126, 0),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "WebAuthnCredentialDescription" });
    case 2:
      return S.Array(__S(2529, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Credentials: __S(2530, __c79, 2), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListWebAuthnCredentialsResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientId: SensitiveString,
          SecretHash: S.optional(SensitiveString),
          UserContextData: S.optional(__S(5344, __c167, 0)),
          Username: SensitiveString,
          AnalyticsMetadata: S.optional(__S(4544, __c142, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResendConfirmationCodeRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientId: SensitiveString,
          ChallengeName: S.String,
          Session: S.optional(SensitiveString),
          ChallengeResponses: S.optional(__S(3744, __c117, 0)),
          AnalyticsMetadata: S.optional(__S(4544, __c142, 0)),
          UserContextData: S.optional(__S(5344, __c167, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RespondToAuthChallengeRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Token: SensitiveString,
          ClientId: SensitiveString,
          ClientSecret: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RevokeTokenRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, LogConfigurations: __S(1636, __c51, 4) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetLogDeliveryConfigurationRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: S.optional(SensitiveString),
          CompromisedCredentialsRiskConfiguration: S.optional(__S(1089, __c34, 1)),
          AccountTakeoverRiskConfiguration: S.optional(__S(1094, __c34, 6)),
          RiskExceptionConfiguration: S.optional(__S(1095, __c34, 7)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetRiskConfigurationRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: S.optional(SensitiveString),
          CSS: S.optional(S.String),
          ImageFile: S.optional(T.Blob),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetUICustomizationRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SMSMfaSettings: S.optional(__S(4960, __c155, 0)),
          SoftwareTokenMfaSettings: S.optional(__S(4960, __c155, 0)),
          EmailMfaSettings: S.optional(__S(4960, __c155, 0)),
          WebAuthnMfaSettings: S.optional(__S(4928, __c154, 0)),
          AccessToken: SensitiveString,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetUserMFAPreferenceRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          SmsMfaConfiguration: S.optional(__S(1984, __c62, 0)),
          SoftwareTokenMfaConfiguration: S.optional(__S(4928, __c154, 0)),
          EmailMfaConfiguration: S.optional(__S(1985, __c62, 1)),
          MfaConfiguration: S.optional(S.String),
          WebAuthnConfiguration: S.optional(__S(1986, __c62, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetUserPoolMfaConfigRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: SensitiveString, MFAOptions: __S(3873, __c121, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetUserSettingsRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientId: SensitiveString,
          SecretHash: S.optional(SensitiveString),
          Username: SensitiveString,
          Password: S.optional(SensitiveString),
          UserAttributes: S.optional(__S(3841, __c120, 1)),
          ValidationData: S.optional(__S(3841, __c120, 1)),
          AnalyticsMetadata: S.optional(__S(4544, __c142, 0)),
          UserContextData: S.optional(__S(5344, __c167, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SignUpRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserConfirmed: S.Boolean,
          CodeDeliveryDetails: S.optional(__S(1408, __c44, 0)),
          UserSub: S.String,
          Session: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "SignUpResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, JobId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartUserImportJobRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartWebAuthnRegistrationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ CredentialCreationOptions: S.Any }).pipe(ns)).annotate({
        identifier: "StartWebAuthnRegistrationResponse",
      });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, JobId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopUserImportJobRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(3744, __c117, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(4032, __c126, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          EventId: S.String,
          FeedbackToken: SensitiveString,
          FeedbackValue: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAuthEventFeedbackRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessToken: SensitiveString,
          DeviceKey: S.String,
          DeviceRememberedStatus: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDeviceStatusRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.String,
          UserPoolId: S.String,
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Precedence: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGroupRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ProviderName: S.String,
          ProviderDetails: S.optional(__S(3744, __c117, 0)),
          AttributeMapping: S.optional(__S(3744, __c117, 0)),
          IdpIdentifiers: S.optional(__S(4032, __c126, 0)),
          AcrMapping: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateIdentityProviderRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.optional(S.String),
          ManagedLoginBrandingId: S.optional(S.String),
          UseCognitoProvidedValues: S.optional(S.Boolean),
          Settings: S.optional(S.Any),
          Assets: S.optional(__S(5569, __c174, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateManagedLoginBrandingRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LimitDefinition: __S(1696, __c53, 0), RequestedLimitValue: S.Number }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateProvisionedLimitRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Identifier: S.String,
          Name: S.String,
          Scopes: S.optional(__S(5633, __c176, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateResourceServerRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TermsId: S.String,
          UserPoolId: S.String,
          TermsName: S.optional(S.String),
          TermsSource: S.optional(S.String),
          Enforcement: S.optional(S.String),
          Links: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTermsRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserAttributes: __S(3841, __c120, 1),
          AccessToken: SensitiveString,
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUserAttributesRequest" });
    case 1:
      return S.Array(__S(1408, __c44, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ CodeDeliveryDetailsList: S.optional(__S(3297, __c103, 1)) }).pipe(ns),
      ).annotate({ identifier: "UpdateUserAttributesResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Policies: S.optional(__S(226, __c7, 2)),
          DeletionProtection: S.optional(S.String),
          LambdaConfig: S.optional(__S(193, __c6, 1)),
          AutoVerifiedAttributes: S.optional(__S(3904, __c122, 0)),
          SmsVerificationMessage: S.optional(S.String),
          EmailVerificationMessage: S.optional(S.String),
          EmailVerificationSubject: S.optional(S.String),
          VerificationMessageTemplate: S.optional(__S(227, __c7, 3)),
          SmsAuthenticationMessage: S.optional(S.String),
          UserAttributeUpdateSettings: S.optional(__S(228, __c7, 4)),
          MfaConfiguration: S.optional(S.String),
          DeviceConfiguration: S.optional(__S(229, __c7, 5)),
          EmailConfiguration: S.optional(__S(230, __c7, 6)),
          SmsConfiguration: S.optional(__S(161, __c5, 1)),
          UserPoolTags: S.optional(__S(3744, __c117, 0)),
          AdminCreateUserConfig: S.optional(__S(232, __c7, 8)),
          UserPoolAddOns: S.optional(__S(234, __c7, 10)),
          AccountRecoverySetting: S.optional(__S(237, __c7, 13)),
          PoolName: S.optional(S.String),
          UserPoolTier: S.optional(S.String),
          KeyConfiguration: S.optional(__S(238, __c7, 14)),
          IssuerConfiguration: S.optional(__S(239, __c7, 15)),
          AcrConfiguration: S.optional(__S(241, __c7, 17)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUserPoolRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: SensitiveString,
          ClientName: S.optional(S.String),
          RefreshTokenValidity: S.optional(S.Number),
          AccessTokenValidity: S.optional(S.Number),
          IdTokenValidity: S.optional(S.Number),
          TokenValidityUnits: S.optional(__S(288, __c9, 0)),
          ReadAttributes: S.optional(__S(4032, __c126, 0)),
          WriteAttributes: S.optional(__S(4032, __c126, 0)),
          ExplicitAuthFlows: S.optional(__S(3904, __c122, 0)),
          SupportedIdentityProviders: S.optional(__S(4032, __c126, 0)),
          CallbackURLs: S.optional(__S(4032, __c126, 0)),
          LogoutURLs: S.optional(__S(4032, __c126, 0)),
          DefaultRedirectURI: S.optional(S.String),
          AllowedOAuthFlows: S.optional(__S(3904, __c122, 0)),
          AllowedOAuthScopes: S.optional(__S(4032, __c126, 0)),
          AllowedOAuthFlowsUserPoolClient: S.optional(S.Boolean),
          AnalyticsConfiguration: S.optional(__S(289, __c9, 1)),
          PreventUserExistenceErrors: S.optional(S.String),
          EnableTokenRevocation: S.optional(S.Boolean),
          EnablePropagateAdditionalUserContextData: S.optional(S.Boolean),
          AuthSessionValidity: S.optional(S.Number),
          RefreshTokenRotation: S.optional(__S(290, __c9, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUserPoolClientRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Domain: S.String,
          UserPoolId: S.String,
          ManagedLoginVersion: S.optional(S.Number),
          CustomDomainConfig: S.optional(__S(352, __c11, 0)),
          Routing: S.optional(__S(354, __c11, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUserPoolDomainRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, RegionName: S.String, Status: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateUserPoolReplicaRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessToken: S.optional(SensitiveString),
          Session: S.optional(SensitiveString),
          UserCode: SensitiveString,
          FriendlyDeviceName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "VerifySoftwareTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), Session: S.optional(SensitiveString) }).pipe(ns),
      ).annotate({ identifier: "VerifySoftwareTokenResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: SensitiveString, AttributeName: S.String, Code: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifyUserAttributeRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, CustomAttributes: __S(3555, __c111, 3) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddCustomAttributesRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MinValue: S.optional(S.String), MaxValue: S.optional(S.String) }),
      ).annotate({ identifier: "NumberAttributeConstraintsType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MinLength: S.optional(S.String), MaxLength: S.optional(S.String) }),
      ).annotate({ identifier: "StringAttributeConstraintsType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          AttributeDataType: S.optional(S.String),
          DeveloperOnlyAttribute: S.optional(S.Boolean),
          Mutable: S.optional(S.Boolean),
          Required: S.optional(S.Boolean),
          NumberAttributeConstraints: S.optional(__S(3552, __c111, 0)),
          StringAttributeConstraints: S.optional(__S(3553, __c111, 1)),
        }),
      ).annotate({ identifier: "SchemaAttributeType" });
    case 3:
      return S.Array(__S(3554, __c111, 2));
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddCustomAttributesResponse",
      });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: SensitiveString,
          ClientSecret: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddUserPoolClientSecretRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClientSecretDescriptor: S.optional(__S(3648, __c114, 0)) }).pipe(ns),
      ).annotate({ identifier: "AddUserPoolClientSecretResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientSecretId: S.optional(S.String),
          ClientSecretValue: S.optional(SensitiveString),
          ClientSecretCreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ClientSecretDescriptorType" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString, GroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminAddUserToGroupRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminConfirmSignUpRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          UserAttributes: S.optional(__S(3841, __c120, 1)),
          ValidationData: S.optional(__S(3841, __c120, 1)),
          TemporaryPassword: S.optional(SensitiveString),
          ForceAliasCreation: S.optional(S.Boolean),
          MessageAction: S.optional(S.String),
          DesiredDeliveryMediums: S.optional(__S(3904, __c122, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminCreateUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ User: S.optional(__S(3808, __c119, 0)) }).pipe(ns),
      ).annotate({ identifier: "AdminCreateUserResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Username: S.optional(SensitiveString),
          Attributes: S.optional(__S(3841, __c120, 1)),
          UserCreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UserLastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Enabled: S.optional(S.Boolean),
          UserStatus: S.optional(S.String),
          MFAOptions: S.optional(__S(3873, __c121, 1)),
        }),
      ).annotate({ identifier: "UserType" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Value: S.optional(SensitiveString) }),
      ).annotate({ identifier: "AttributeType" });
    case 1:
      return S.Array(__S(3840, __c120, 0));
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryMedium: S.optional(S.String), AttributeName: S.optional(S.String) }),
      ).annotate({ identifier: "MFAOptionType" });
    case 1:
      return S.Array(__S(3872, __c121, 0));
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminDeleteSoftwareTokenRequest" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminDeleteUserRequest" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          UserAttributeNames: __S(4032, __c126, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminDeleteUserAttributesRequest" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, User: __S(4096, __c128, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminDisableProviderForUserRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProviderName: S.optional(S.String),
          ProviderAttributeName: S.optional(S.String),
          ProviderAttributeValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProviderUserIdentifierType" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminDisableUserRequest" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminEnableUserRequest" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString, DeviceKey: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminForgetDeviceRequest" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeviceKey: S.String, UserPoolId: S.String, Username: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminGetDeviceRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Device: __S(4288, __c134, 0) }).pipe(ns)).annotate({
        identifier: "AdminGetDeviceResponse",
      });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceKey: S.optional(S.String),
          DeviceAttributes: S.optional(__S(3841, __c120, 1)),
          DeviceCreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeviceLastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeviceLastAuthenticatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeviceType" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminGetUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Username: SensitiveString,
          UserAttributes: S.optional(__S(3841, __c120, 1)),
          UserCreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UserLastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Enabled: S.optional(S.Boolean),
          UserStatus: S.optional(S.String),
          MFAOptions: S.optional(__S(3873, __c121, 1)),
          PreferredMfaSetting: S.optional(S.String),
          UserMFASettingList: S.optional(__S(4032, __c126, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "AdminGetUserResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminGetUserAuthFactorsRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Username: SensitiveString,
          PreferredMfaSetting: S.optional(S.String),
          UserMFASettingList: S.optional(__S(4032, __c126, 0)),
          ConfiguredUserAuthFactors: S.optional(__S(3904, __c122, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "AdminGetUserAuthFactorsResponse" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: SensitiveString,
          AuthFlow: S.String,
          AuthParameters: S.optional(__S(3744, __c117, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
          AnalyticsMetadata: S.optional(__S(4544, __c142, 0)),
          ContextData: S.optional(__S(4450, __c139, 2)),
          Session: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminInitiateAuthRequest" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ headerName: S.optional(S.String), headerValue: S.optional(S.String) }),
      ).annotate({ identifier: "HttpHeader" });
    case 1:
      return S.Array(__S(4448, __c139, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IpAddress: S.String,
          ServerName: S.String,
          ServerPath: S.String,
          HttpHeaders: __S(4449, __c139, 1),
          EncodedData: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContextDataType" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeviceKey: S.optional(S.String), DeviceGroupKey: S.optional(S.String) }),
      ).annotate({ identifier: "NewDeviceMetadataType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessToken: S.optional(SensitiveString),
          ExpiresIn: S.optional(S.Number),
          TokenType: S.optional(S.String),
          RefreshToken: S.optional(SensitiveString),
          IdToken: S.optional(SensitiveString),
          NewDeviceMetadata: S.optional(__S(4480, __c140, 0)),
        }),
      ).annotate({ identifier: "AuthenticationResultType" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChallengeName: S.optional(S.String),
          Session: S.optional(SensitiveString),
          ChallengeParameters: S.optional(__S(3744, __c117, 0)),
          AuthenticationResult: S.optional(__S(4481, __c140, 1)),
          AvailableChallenges: S.optional(__S(3904, __c122, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "AdminInitiateAuthResponse" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AnalyticsEndpointId: S.optional(S.String) })).annotate({
        identifier: "AnalyticsMetadataType",
      });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          DestinationUser: __S(4096, __c128, 0),
          SourceUser: __S(4096, __c128, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminLinkProviderForUserRequest" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          Limit: S.optional(S.Number),
          PaginationToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminListDevicesRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(4288, __c134, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Devices: S.optional(__S(4640, __c145, 0)),
          PaginationToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AdminListDevicesResponse" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Username: SensitiveString,
          UserPoolId: S.String,
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminListGroupsForUserRequest" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(4736, __c148, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Groups: S.optional(__S(4704, __c147, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AdminListGroupsForUserResponse" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          UserPoolId: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Precedence: S.optional(S.Number),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GroupType" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminListUserAuthEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RiskDecision: S.optional(S.String),
          RiskLevel: S.optional(S.String),
          CompromisedCredentialsDetected: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EventRiskType" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ChallengeName: S.optional(S.String), ChallengeResponse: S.optional(S.String) }),
      ).annotate({ identifier: "ChallengeResponseType" });
    case 3:
      return S.Array(__S(4770, __c149, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          IpAddress: S.optional(S.String),
          DeviceName: S.optional(S.String),
          Timezone: S.optional(S.String),
          City: S.optional(S.String),
          Country: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventContextDataType" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          FeedbackValue: S.String,
          Provider: S.String,
          FeedbackDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EventFeedbackType" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          EventId: S.optional(S.String),
          EventType: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventResponse: S.optional(S.String),
          EventRisk: S.optional(__S(4769, __c149, 1)),
          ChallengeResponses: S.optional(__S(4771, __c149, 3)),
          EventContextData: S.optional(__S(4772, __c149, 4)),
          EventFeedback: S.optional(__S(4773, __c149, 5)),
        }),
      ).annotate({ identifier: "AuthEventType" });
    case 7:
      return S.Array(__S(4774, __c149, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          AuthEvents: S.optional(__S(4775, __c149, 7)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AdminListUserAuthEventsResponse" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString, GroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminRemoveUserFromGroupRequest" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminResetUserPasswordRequest" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: SensitiveString,
          ChallengeName: S.String,
          ChallengeResponses: S.optional(__S(3744, __c117, 0)),
          Session: S.optional(SensitiveString),
          AnalyticsMetadata: S.optional(__S(4544, __c142, 0)),
          ContextData: S.optional(__S(4450, __c139, 2)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminRespondToAuthChallengeRequest" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SMSMfaSettings: S.optional(__S(4960, __c155, 0)),
          SoftwareTokenMfaSettings: S.optional(__S(4960, __c155, 0)),
          EmailMfaSettings: S.optional(__S(4960, __c155, 0)),
          WebAuthnMfaSettings: S.optional(__S(4928, __c154, 0)),
          Username: SensitiveString,
          UserPoolId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminSetUserMFAPreferenceRequest" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "WebAuthnMfaSettingsType",
      });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), PreferredMfa: S.optional(S.Boolean) }),
      ).annotate({ identifier: "SMSMfaSettingsType" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          Password: SensitiveString,
          Permanent: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminSetUserPasswordRequest" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          MFAOptions: __S(3873, __c121, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminSetUserSettingsRequest" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          EventId: S.String,
          FeedbackValue: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminUpdateAuthEventFeedbackRequest" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          DeviceKey: S.String,
          DeviceRememberedStatus: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminUpdateDeviceStatusRequest" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Username: SensitiveString,
          UserAttributes: __S(3841, __c120, 1),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AdminUpdateUserAttributesRequest" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AdminUserGlobalSignOutRequest" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessToken: S.optional(SensitiveString),
          Session: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateSoftwareTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SecretCode: S.optional(SensitiveString),
          Session: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "AssociateSoftwareTokenResponse" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PreviousPassword: S.optional(SensitiveString),
          ProposedPassword: SensitiveString,
          AccessToken: SensitiveString,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ChangePasswordRequest" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessToken: SensitiveString, Credential: S.Any }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CompleteWebAuthnRegistrationRequest" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PasswordVerifier: S.optional(S.String), Salt: S.optional(S.String) }),
      ).annotate({ identifier: "DeviceSecretVerifierConfigType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessToken: SensitiveString,
          DeviceKey: S.String,
          DeviceSecretVerifierConfig: S.optional(__S(5280, __c165, 0)),
          DeviceName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ConfirmDeviceRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ UserConfirmationNecessary: S.optional(S.Boolean) }).pipe(ns),
      ).annotate({ identifier: "ConfirmDeviceResponse" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientId: SensitiveString,
          SecretHash: S.optional(SensitiveString),
          Username: SensitiveString,
          ConfirmationCode: S.String,
          Password: SensitiveString,
          AnalyticsMetadata: S.optional(__S(4544, __c142, 0)),
          UserContextData: S.optional(__S(5344, __c167, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ConfirmForgotPasswordRequest" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IpAddress: S.optional(S.String), EncodedData: S.optional(S.String) }),
      ).annotate({ identifier: "UserContextDataType" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientId: SensitiveString,
          SecretHash: S.optional(SensitiveString),
          Username: SensitiveString,
          ConfirmationCode: S.String,
          ForceAliasCreation: S.optional(S.Boolean),
          AnalyticsMetadata: S.optional(__S(4544, __c142, 0)),
          UserContextData: S.optional(__S(5344, __c167, 0)),
          ClientMetadata: S.optional(__S(3744, __c117, 0)),
          Session: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ConfirmSignUpRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Session: S.optional(SensitiveString) }).pipe(ns)).annotate({
        identifier: "ConfirmSignUpResponse",
      });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.String,
          UserPoolId: S.String,
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Precedence: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGroupRequest" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Group: S.optional(__S(4736, __c148, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateGroupResponse" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ProviderName: S.String,
          ProviderType: S.String,
          ProviderDetails: __S(3744, __c117, 0),
          AttributeMapping: S.optional(__S(3744, __c117, 0)),
          IdpIdentifiers: S.optional(__S(4032, __c126, 0)),
          AcrMapping: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIdentityProviderRequest" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.optional(S.String),
          ProviderName: S.optional(S.String),
          ProviderType: S.optional(S.String),
          ProviderDetails: S.optional(__S(3744, __c117, 0)),
          AttributeMapping: S.optional(__S(3744, __c117, 0)),
          IdpIdentifiers: S.optional(__S(4032, __c126, 0)),
          AcrMapping: S.optional(__S(3744, __c117, 0)),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "IdentityProviderType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IdentityProvider: __S(5504, __c172, 0) }).pipe(ns),
      ).annotate({ identifier: "CreateIdentityProviderResponse" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: SensitiveString,
          UseCognitoProvidedValues: S.optional(S.Boolean),
          Settings: S.optional(S.Any),
          Assets: S.optional(__S(5569, __c174, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateManagedLoginBrandingRequest" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Category: S.String,
          ColorMode: S.String,
          Extension: S.String,
          Bytes: S.optional(T.Blob),
          ResourceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssetType" });
    case 1:
      return S.Array(__S(5568, __c174, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ManagedLoginBrandingId: S.optional(S.String),
          UserPoolId: S.optional(S.String),
          UseCognitoProvidedValues: S.optional(S.Boolean),
          Settings: S.optional(S.Any),
          Assets: S.optional(__S(5569, __c174, 1)),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ManagedLoginBrandingType" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ManagedLoginBranding: S.optional(__S(5570, __c174, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateManagedLoginBrandingResponse" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          Identifier: S.String,
          Name: S.String,
          Scopes: S.optional(__S(5633, __c176, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateResourceServerRequest" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScopeName: S.String, ScopeDescription: S.String }),
      ).annotate({ identifier: "ResourceServerScopeType" });
    case 1:
      return S.Array(__S(5632, __c176, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.optional(S.String),
          Identifier: S.optional(S.String),
          Name: S.optional(S.String),
          Scopes: S.optional(__S(5633, __c176, 1)),
        }),
      ).annotate({ identifier: "ResourceServerType" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceServer: __S(5634, __c176, 2) }).pipe(ns)).annotate({
        identifier: "CreateResourceServerResponse",
      });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserPoolId: S.String,
          ClientId: SensitiveString,
          TermsName: S.String,
          TermsSource: S.String,
          Enforcement: S.String,
          Links: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTermsRequest" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TermsId: S.String,
          UserPoolId: S.String,
          ClientId: SensitiveString,
          TermsName: S.String,
          TermsSource: S.String,
          Enforcement: S.String,
          Links: __S(3744, __c117, 0),
          CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastModifiedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "TermsType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Terms: S.optional(__S(5728, __c179, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateTermsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
