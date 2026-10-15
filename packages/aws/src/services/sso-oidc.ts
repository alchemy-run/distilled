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
  sdkId: "SSO OIDC",
  serviceShapeName: "AWSSSOOIDCService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sso-oauth" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-06-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
            return e(`https://oidc-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://oidc.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://oidc.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://oidc.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "AccessDeniedExceptionReason",
        }),
      ),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class AuthorizationPendingException
  extends /*@__PURE__*/ S.TaggedError<AuthorizationPendingException>()(
    "AuthorizationPendingException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ExpiredTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredTokenException>()(
    "ExpiredTokenException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidClientException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientException>()(
    "InvalidClientException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class InvalidClientMetadataException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientMetadataException>()(
    "InvalidClientMetadataException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidGrantException
  extends /*@__PURE__*/ S.TaggedError<InvalidGrantException>()(
    "InvalidGrantException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRedirectUriException
  extends /*@__PURE__*/ S.TaggedError<InvalidRedirectUriException>()(
    "InvalidRedirectUriException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "InvalidRequestExceptionReason",
        }),
      ),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestRegionException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestRegionException>()(
    "InvalidRequestRegionException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      endpoint: /*@__PURE__*/ S.optional(S.String),
      region: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidScopeException
  extends /*@__PURE__*/ S.TaggedError<InvalidScopeException>()(
    "InvalidScopeException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class SlowDownException
  extends /*@__PURE__*/ S.TaggedError<SlowDownException>()(
    "SlowDownException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedClientException>()(
    "UnauthorizedClientException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class UnsupportedGrantTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedGrantTypeException>()(
    "UnsupportedGrantTypeException",
    {
      error: /*@__PURE__*/ S.optional(S.String),
      error_description: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type AccessDeniedExceptionReason = "KMS_AccessDeniedException" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<CreateTokenRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateTokenResponse>,
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
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<CreateTokenWithIAMRequest>,
  output: __S(10, __c2, 2) as any as S.Schema<CreateTokenWithIAMResponse>,
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
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<RegisterClientRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<RegisterClientResponse>,
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
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<StartDeviceAuthorizationRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<StartDeviceAuthorizationResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientId: S.String,
          clientSecret: SensitiveString,
          grantType: S.String,
          deviceCode: S.optional(S.String),
          code: S.optional(S.String),
          refreshToken: S.optional(SensitiveString),
          scope: S.optional(__S(4, __c1, 0)),
          redirectUri: S.optional(S.String),
          codeVerifier: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/token" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accessToken: S.optional(SensitiveString),
          tokenType: S.optional(S.String),
          expiresIn: S.optional(S.Number),
          refreshToken: S.optional(SensitiveString),
          idToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CreateTokenResponse" });
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
      return S.suspend(() =>
        S.Struct({
          clientId: S.String,
          grantType: S.String,
          code: S.optional(S.String),
          refreshToken: S.optional(SensitiveString),
          assertion: S.optional(SensitiveString),
          scope: S.optional(__S(4, __c1, 0)),
          redirectUri: S.optional(S.String),
          subjectToken: S.optional(SensitiveString),
          subjectTokenType: S.optional(S.String),
          requestedTokenType: S.optional(S.String),
          codeVerifier: S.optional(SensitiveString),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/token?aws_iam=t" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTokenWithIAMRequest" });
    case 1:
      return S.suspend(() => S.Struct({ identityContext: S.optional(S.String) })).annotate({
        identifier: "AwsAdditionalDetails",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          accessToken: S.optional(SensitiveString),
          tokenType: S.optional(S.String),
          expiresIn: S.optional(S.Number),
          refreshToken: S.optional(SensitiveString),
          idToken: S.optional(SensitiveString),
          issuedTokenType: S.optional(S.String),
          scope: S.optional(__S(4, __c1, 0)),
          awsAdditionalDetails: S.optional(__S(9, __c2, 1)),
        }),
      ).annotate({ identifier: "CreateTokenWithIAMResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientName: S.String,
          clientType: S.String,
          scopes: S.optional(__S(4, __c1, 0)),
          redirectUris: S.optional(__S(4, __c1, 0)),
          grantTypes: S.optional(__S(4, __c1, 0)),
          issuerUrl: S.optional(S.String),
          entitledApplicationArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/client/register" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterClientRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clientId: S.optional(S.String),
          clientSecret: S.optional(SensitiveString),
          clientIdIssuedAt: S.optional(S.Number),
          clientSecretExpiresAt: S.optional(S.Number),
          authorizationEndpoint: S.optional(S.String),
          tokenEndpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegisterClientResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clientId: S.String, clientSecret: SensitiveString, startUrl: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/device_authorization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDeviceAuthorizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          deviceCode: S.optional(S.String),
          userCode: S.optional(S.String),
          verificationUri: S.optional(S.String),
          verificationUriComplete: S.optional(S.String),
          expiresIn: S.optional(S.Number),
          interval: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StartDeviceAuthorizationResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
