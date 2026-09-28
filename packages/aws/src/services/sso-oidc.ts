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
  sdkId: "SSO OIDC",
  target: "AWSSSOOIDCService",
  version: "2019-06-10",
  sigv4: "sso-oauth",
  protocol: restJson1Protocol,
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
              return e(
                `https://oidc-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://oidc.${Region}.amazonaws.com`);
              }
              return e(
                `https://oidc-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://oidc.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://oidc.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessDeniedException",
    ["BadRequestError", "AuthError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly reason?: AccessDeniedExceptionReason;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class AuthorizationPendingException
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationPendingException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class ExpiredTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExpiredTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class InvalidClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClientException",
    ["AuthError"],
    { status: 401 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class InvalidClientMetadataException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClientMetadataException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class InvalidGrantException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidGrantException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class InvalidRedirectUriException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRedirectUriException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly reason?: InvalidRequestExceptionReason;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class InvalidRequestRegionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestRegionException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly endpoint?: string;
    readonly region?: string;
    readonly message?: string;
  }> {}
export class InvalidScopeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidScopeException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class SlowDownException
  extends /*@__PURE__*/ TE.TaggedError(
    "SlowDownException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthorizedClientException",
    ["BadRequestError", "AuthError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export class UnsupportedGrantTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedGrantTypeException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly error?: string;
    readonly error_description?: string;
    readonly message?: string;
  }> {}
export type ClientId = string;
export type ClientSecret = string | redacted.Redacted<string>;
export type GrantType = string;
export type DeviceCode = string;
export type AuthCode = string;
export type RefreshToken = string | redacted.Redacted<string>;
export type Scope = string;
export type Scopes = string[];
export type URI = string;
export type CodeVerifier = string | redacted.Redacted<string>;
export interface CreateTokenRequest {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  grantType: string;
  deviceCode?: string;
  code?: string;
  refreshToken?: string | redacted.Redacted<string>;
  scope?: string[];
  redirectUri?: string;
  codeVerifier?: string | redacted.Redacted<string>;
}
export type AccessToken = string | redacted.Redacted<string>;
export type TokenType = string;
export type ExpirationInSeconds = number;
export type IdToken = string | redacted.Redacted<string>;
export interface CreateTokenResponse {
  accessToken?: string | redacted.Redacted<string>;
  tokenType?: string;
  expiresIn?: number;
  refreshToken?: string | redacted.Redacted<string>;
  idToken?: string | redacted.Redacted<string>;
}
export type Assertion = string | redacted.Redacted<string>;
export type SubjectToken = string | redacted.Redacted<string>;
export type TokenTypeURI = string;
export interface CreateTokenWithIAMRequest {
  clientId: string;
  grantType: string;
  code?: string;
  refreshToken?: string | redacted.Redacted<string>;
  assertion?: string | redacted.Redacted<string>;
  scope?: string[];
  redirectUri?: string;
  subjectToken?: string | redacted.Redacted<string>;
  subjectTokenType?: string;
  requestedTokenType?: string;
  codeVerifier?: string | redacted.Redacted<string>;
}
export type IdentityContext = string;
export interface AwsAdditionalDetails {
  identityContext?: string;
}
export interface CreateTokenWithIAMResponse {
  accessToken?: string | redacted.Redacted<string>;
  tokenType?: string;
  expiresIn?: number;
  refreshToken?: string | redacted.Redacted<string>;
  idToken?: string | redacted.Redacted<string>;
  issuedTokenType?: string;
  scope?: string[];
  awsAdditionalDetails?: AwsAdditionalDetails;
}
export type ClientName = string;
export type ClientType = string;
export type RedirectUris = string[];
export type GrantTypes = string[];
export type ArnType = string;
export interface RegisterClientRequest {
  clientName: string;
  clientType: string;
  scopes?: string[];
  redirectUris?: string[];
  grantTypes?: string[];
  issuerUrl?: string;
  entitledApplicationArn?: string;
}
export type LongTimeStampType = number;
export interface RegisterClientResponse {
  clientId?: string;
  clientSecret?: string | redacted.Redacted<string>;
  clientIdIssuedAt?: number;
  clientSecretExpiresAt?: number;
  authorizationEndpoint?: string;
  tokenEndpoint?: string;
}
export interface StartDeviceAuthorizationRequest {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  startUrl: string;
}
export type UserCode = string;
export type IntervalInSeconds = number;
export interface StartDeviceAuthorizationResponse {
  deviceCode?: string;
  userCode?: string;
  verificationUri?: string;
  verificationUriComplete?: string;
  expiresIn?: number;
  interval?: number;
}
export type AccessDeniedExceptionReason =
  | "KMS_AccessDeniedException"
  | (string & {});
export type ErrorDescription = string;
export type InvalidRequestExceptionReason =
  | "KMS_NotFoundException"
  | "KMS_InvalidKeyUsageException"
  | "KMS_InvalidStateException"
  | "KMS_DisabledException"
  | (string & {});
export type Location = string;
export type Region = string;
export type CreateTokenError =
  | AccessDeniedException
  | AuthorizationPendingException
  | ExpiredTokenException
  | InternalServerException
  | InvalidClientException
  | InvalidGrantException
  | InvalidRequestException
  | InvalidScopeException
  | SlowDownException
  | UnauthorizedClientException
  | UnsupportedGrantTypeException
  | CommonErrors;
/**
 * Creates and returns access and refresh tokens for clients that are authenticated using
 * client secrets. The access token can be used to fetch short-lived credentials for the assigned
 * AWS accounts or to access application APIs using `bearer` authentication.
 */
export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CreateTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /token",
    input: {
      clientId: 0,
      clientSecret: 0,
      grantType: 0,
      deviceCode: 0,
      code: 0,
      refreshToken: 0,
      scope: 0,
      redirectUri: 0,
      codeVerifier: 0,
    },
    output: {
      accessToken: D.secret,
      refreshToken: D.secret,
      idToken: D.secret,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    AuthorizationPendingException,
    ExpiredTokenException,
    InternalServerException,
    InvalidClientException,
    InvalidGrantException,
    InvalidRequestException,
    InvalidScopeException,
    SlowDownException,
    UnauthorizedClientException,
    UnsupportedGrantTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateToken",
})) as any;

export type CreateTokenWithIAMError =
  | AccessDeniedException
  | AuthorizationPendingException
  | ExpiredTokenException
  | InternalServerException
  | InvalidClientException
  | InvalidGrantException
  | InvalidRequestException
  | InvalidRequestRegionException
  | InvalidScopeException
  | SlowDownException
  | UnauthorizedClientException
  | UnsupportedGrantTypeException
  | CommonErrors;
/**
 * Creates and returns access and refresh tokens for authorized client applications that are
 * authenticated using any IAM entity, such as a service
 * role or user. These tokens might contain defined scopes that specify permissions such as `read:profile` or `write:data`. Through downscoping, you can use the scopes parameter to request tokens with reduced permissions compared to the original client application's permissions or, if applicable, the refresh token's scopes. The access token can be used to fetch short-lived credentials for the assigned
 * Amazon Web Services accounts or to access application APIs using `bearer` authentication.
 *
 * This API is used with Signature Version 4. For more information, see Amazon Web Services Signature
 * Version 4 for API Requests.
 */
export const createTokenWithIAM: API.OperationMethod<
  CreateTokenWithIAMRequest,
  CreateTokenWithIAMResponse,
  CreateTokenWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /token?aws_iam=t",
    input: {
      clientId: 0,
      grantType: 0,
      code: 0,
      refreshToken: 0,
      assertion: 0,
      scope: 0,
      redirectUri: 0,
      subjectToken: 0,
      subjectTokenType: 0,
      requestedTokenType: 0,
      codeVerifier: 0,
    },
    output: {
      accessToken: D.secret,
      refreshToken: D.secret,
      idToken: D.secret,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    AuthorizationPendingException,
    ExpiredTokenException,
    InternalServerException,
    InvalidClientException,
    InvalidGrantException,
    InvalidRequestException,
    InvalidRequestRegionException,
    InvalidScopeException,
    SlowDownException,
    UnauthorizedClientException,
    UnsupportedGrantTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTokenWithIAM",
})) as any;

export type RegisterClientError =
  | InternalServerException
  | InvalidClientMetadataException
  | InvalidRedirectUriException
  | InvalidRequestException
  | InvalidScopeException
  | SlowDownException
  | UnsupportedGrantTypeException
  | CommonErrors;
/**
 * Registers a public client with IAM Identity Center. This allows clients to perform authorization using
 * the authorization code grant with Proof Key for Code Exchange (PKCE) or the device
 * code grant.
 */
export const registerClient: API.OperationMethod<
  RegisterClientRequest,
  RegisterClientResponse,
  RegisterClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /client/register",
    input: {
      clientName: 0,
      clientType: 0,
      scopes: 0,
      redirectUris: 0,
      grantTypes: 0,
      issuerUrl: 0,
      entitledApplicationArn: 0,
    },
    output: { clientSecret: D.secret },
    body: true,
  },
  errors: [
    InternalServerException,
    InvalidClientMetadataException,
    InvalidRedirectUriException,
    InvalidRequestException,
    InvalidScopeException,
    SlowDownException,
    UnsupportedGrantTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterClient",
})) as any;

export type StartDeviceAuthorizationError =
  | InternalServerException
  | InvalidClientException
  | InvalidRequestException
  | SlowDownException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Initiates device authorization by requesting a pair of verification codes from the
 * authorization service.
 */
export const startDeviceAuthorization: API.OperationMethod<
  StartDeviceAuthorizationRequest,
  StartDeviceAuthorizationResponse,
  StartDeviceAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /device_authorization",
    input: { clientId: 0, clientSecret: 0, startUrl: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    InvalidClientException,
    InvalidRequestException,
    SlowDownException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeviceAuthorization",
})) as any;
