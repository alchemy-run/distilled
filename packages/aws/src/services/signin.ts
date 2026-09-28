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
  sdkId: "Signin",
  target: "Signin",
  version: "2023-01-01",
  sigv4: "signin",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const {
      UseDualStack = false,
      UseFIPS = false,
      Endpoint,
      Region,
      IsControlPlane,
      IsOAuthEndpoint,
    } = p;
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
        { name: "sigv4", signingName: "signin", signingRegion: `${_0}` },
      ],
    });
    {
      const PartitionResult = _.partition(Region);
      if (
        IsControlPlane != null &&
        IsControlPlane === true &&
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false
      ) {
        if (_.getAttr(PartitionResult, "name") === "aws") {
          return e(`https://signin.${Region}.api.aws`, _p0(Region), {});
        }
        if (_.getAttr(PartitionResult, "name") === "aws-cn") {
          return e(
            `https://signin.${Region}.api.amazonwebservices.com.cn`,
            _p0(Region),
            {},
          );
        }
        return e(
          `https://signin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          _p0(Region),
          {},
        );
      }
    }
    if (
      IsOAuthEndpoint != null &&
      IsOAuthEndpoint === true &&
      UseFIPS === true
    ) {
      return err(
        "FIPS endpoints are not supported for OAuth operations. Disable FIPS or use a non-OAuth operation.",
      );
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        IsOAuthEndpoint != null &&
        IsOAuthEndpoint === true &&
        Region != null &&
        !(Endpoint != null) &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws"
      ) {
        return e(`https://${Region}.oauth.signin.aws`, _p0(Region), {});
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === false &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws"
      ) {
        return e(`https://${Region}.signin.aws.amazon.com`);
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === false &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws-cn"
      ) {
        return e(`https://${Region}.signin.amazonaws.cn`);
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === false &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws-us-gov"
      ) {
        return e(`https://${Region}.signin.amazonaws-us-gov.com`);
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === false &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws-iso"
      ) {
        return e(`https://${Region}.signin.c2shome.ic.gov`);
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === false &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws-iso-b"
      ) {
        return e(`https://${Region}.signin.sc2shome.sgov.gov`);
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === false &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws-iso-f"
      ) {
        return e(`https://${Region}.signin.csphome.hci.ic.gov`);
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === false &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws-iso-e"
      ) {
        return e(`https://${Region}.signin.csphome.adc-e.uk`);
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === false &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws-eusc"
      ) {
        return e(`https://${Region}.signin.amazonaws-eusc.eu`);
      }
    }
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === true &&
      UseDualStack === false &&
      Region === "us-gov-west-1"
    ) {
      return e("https://signin-fips.amazonaws-us-gov.com");
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === true &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws-us-gov"
      ) {
        return e(`https://${Region}.signin-fips.amazonaws-us-gov.com`);
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        !(Endpoint != null) &&
        UseFIPS === false &&
        UseDualStack === false &&
        PartitionResult != null &&
        PartitionResult !== false
      ) {
        return e(
          `https://${Region}.signin.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(`https://${Region}.signin.aws.amazon.com`);
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(`https://${Region}.signin.amazonaws.cn`);
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(`https://${Region}.signin.amazonaws-us-gov.com`);
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://signin-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://signin-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://signin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://signin.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly error: OAuth2ErrorCode;
    readonly message: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly error: OAuth2ErrorCode; readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly error: OAuth2ErrorCode; readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly error: OAuth2ErrorCode; readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly error: OAuth2ErrorCode; readonly message: string }> {}
export class TooManyRequestsError
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsError",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly error: OAuth2ErrorCode; readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly error: OAuth2ErrorCode; readonly message: string }> {}
export type ClientId = string;
export type GrantType = string;
export type AuthorizationCode = string;
export type RedirectUri = string;
export type CodeVerifier = string;
export type RefreshToken = string | redacted.Redacted<string>;
export interface CreateOAuth2TokenRequestBody {
  clientId: string;
  grantType: string;
  code?: string;
  redirectUri?: string;
  codeVerifier?: string;
  refreshToken?: string | redacted.Redacted<string>;
}
export interface CreateOAuth2TokenRequest {
  tokenInput: CreateOAuth2TokenRequestBody;
}
export interface AccessToken {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}
export type TokenType = string;
export type ExpiresIn = number;
export type IdToken = string;
export interface CreateOAuth2TokenResponseBody {
  accessToken: AccessToken;
  tokenType: string;
  expiresIn: number;
  refreshToken: string | redacted.Redacted<string>;
  idToken?: string;
}
export interface CreateOAuth2TokenResponse {
  tokenOutput: CreateOAuth2TokenResponseBody;
}
export type ClientCredentialsGrantType = string;
export interface CreateOAuth2TokenWithIAMRequest {
  grantType: string;
  resource: string;
}
export type OAuthAccessToken = string | redacted.Redacted<string>;
export type BearerTokenType = string;
export type TokenExpiresIn = number;
export interface CreateOAuth2TokenWithIAMResponse {
  accessToken: string | redacted.Redacted<string>;
  tokenType: string;
  expiresIn: number;
}
export type TargetId = string;
export interface DeleteConsoleAuthorizationConfigurationInput {
  targetId?: string;
}
export interface DeleteConsoleAuthorizationConfigurationOutput {
  targetId: string;
  scope: string;
  consoleAuthorizationEnabled: boolean;
}
export type StatementId = string;
export type ClientToken = string;
export interface DeleteResourcePermissionStatementInput {
  statementId: string;
  clientToken?: string;
}
export interface DeleteResourcePermissionStatementOutput {}
export interface GetConsoleAuthorizationConfigurationInput {
  targetId?: string;
}
export interface GetConsoleAuthorizationConfigurationOutput {
  targetId: string;
  scope: string;
  consoleAuthorizationEnabled: boolean;
}
export interface GetResourcePolicyInput {}
export type Principal = { [key: string]: string | undefined };
export type PolicyActions = string[];
export type ConditionType = string;
export type ConditionValues = string[];
export type Condition = { [key: string]: string[] | undefined };
export type ConditionBlock = {
  [key: string]: { [key: string]: string[] | undefined } | undefined;
};
export interface PolicyStatement {
  effect?: string;
  principal?: { [key: string]: string | undefined };
  action?: string[];
  resource?: string;
  condition?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
}
export type PolicyStatements = PolicyStatement[];
export interface SigninResourceBasedPolicy {
  version?: string;
  statement?: PolicyStatement[];
}
export interface GetResourcePolicyOutput {
  signinResourceBasedPolicy: SigninResourceBasedPolicy;
}
export type IntrospectionToken = string | redacted.Redacted<string>;
export type TokenTypeHint = string;
export interface IntrospectOAuth2TokenWithIAMRequest {
  token: string | redacted.Redacted<string>;
  tokenTypeHint?: string;
}
export type IntrospectedTokenType = string;
export type AccountId = string;
export interface IntrospectOAuth2TokenWithIAMResponse {
  active: boolean;
  clientId?: string;
  userId?: string;
  tokenType?: string;
  exp?: number;
  iat?: number;
  nbf?: number;
  sub?: string;
  aud?: string;
  iss?: string;
  jti?: string;
  accountId?: string;
  signinSession?: string;
  resource?: string;
}
export type ConsolePermissionMaxResults = number;
export type NextToken = string;
export interface ListResourcePermissionStatementsInput {
  maxResults?: number;
  nextToken?: string;
}
export interface PermissionStatementSummary {
  sid: string;
  condition?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
}
export type PermissionStatementSummaries = PermissionStatementSummary[];
export interface ListResourcePermissionStatementsOutput {
  permissionStatements: PermissionStatementSummary[];
  nextToken?: string;
}
export interface PutConsoleAuthorizationConfigurationInput {
  targetId?: string;
}
export interface PutConsoleAuthorizationConfigurationOutput {
  targetId: string;
  scope: string;
  consoleAuthorizationEnabled: boolean;
}
export type SourceVpc = string;
export type SourceVpce = string;
export type VpcSourceIp = string;
export type SourceIp = string;
export type RequestedRegion = string;
export type ExcludedPrincipal = string;
export interface PutResourcePermissionStatementInput {
  sourceVpc?: string;
  signinSourceVpce?: string;
  consoleSourceVpce?: string;
  vpcSourceIp?: string;
  sourceIp?: string;
  requestedRegion?: string;
  excludedPrincipal?: string;
  clientToken?: string;
}
export interface PutResourcePermissionStatementOutput {
  statementId: string;
}
export type RevocationToken = string | redacted.Redacted<string>;
export interface RevokeOAuth2TokenWithIAMRequest {
  token: string | redacted.Redacted<string>;
}
export interface RevokeOAuth2TokenWithIAMResponse {}
export type OAuth2ErrorCode =
  | "TOKEN_EXPIRED"
  | "USER_CREDENTIALS_CHANGED"
  | "INSUFFICIENT_PERMISSIONS"
  | "AUTHCODE_EXPIRED"
  | "server_error"
  | "INVALID_REQUEST"
  | "RESOURCE_NOT_FOUND"
  | "CONFLICT"
  | "SERVICE_QUOTA_EXCEEDED"
  | (string & {});
export type CreateOAuth2TokenError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * CreateOAuth2Token API
 *
 * Path: /v1/token
 * Request Method: POST
 * Content-Type: application/json or application/x-www-form-urlencoded
 *
 * This API implements OAuth 2.0 flows for AWS Sign-In CLI clients, supporting both:
 * 1. Authorization code redemption (grant_type=authorization_code) - NOT idempotent
 * 2. Token refresh (grant_type=refresh_token) - Idempotent within token validity window
 *
 * The operation behavior is determined by the grant_type parameter in the request body:
 *
 * **Authorization Code Flow (NOT Idempotent):**
 * - JSON or form-encoded body with client_id, grant_type=authorization_code, code, redirect_uri, code_verifier
 * - Returns access_token, token_type, expires_in, refresh_token, and id_token
 * - Each authorization code can only be used ONCE for security (prevents replay attacks)
 *
 * **Token Refresh Flow (Idempotent):**
 * - JSON or form-encoded body with client_id, grant_type=refresh_token, refresh_token
 * - Returns access_token, token_type, expires_in, and refresh_token (no id_token)
 * - Multiple calls with same refresh_token return consistent results within validity window
 *
 * Authentication and authorization:
 * - Confidential clients: sigv4 signing required with signin:ExchangeToken permissions
 * - CLI clients (public): authn/authz skipped based on client_id & grant_type
 *
 * Note: This operation cannot be marked as @idempotent because it handles both idempotent
 * (token refresh) and non-idempotent (auth code redemption) flows in a single endpoint.
 */
export const createOAuth2Token: API.OperationMethod<
  CreateOAuth2TokenRequest,
  CreateOAuth2TokenResponse,
  CreateOAuth2TokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/token",
    input: {
      tokenInput: D.m({
        payload: true,
        shape: {
          clientId: 0,
          grantType: 0,
          code: 0,
          redirectUri: 0,
          codeVerifier: 0,
          refreshToken: 0,
        },
      }),
    },
    output: {
      tokenOutput: D.m({ payload: true, shape: { refreshToken: D.secret } }),
    },
    staticContext: { IsControlPlane: { value: false } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOAuth2Token",
})) as any;

export type CreateOAuth2TokenWithIAMError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to exchange client credentials for an OAuth 2.0 access token
 * scoped to a resource that can be used to access AWS services from applications
 */
export const createOAuth2TokenWithIAM: API.OperationMethod<
  CreateOAuth2TokenWithIAMRequest,
  CreateOAuth2TokenWithIAMResponse,
  CreateOAuth2TokenWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/token?x-amz-client-auth-method=iam",
    input: { grantType: D.m({ wire: "grant_type" }), resource: 0 },
    output: {
      accessToken: D.m({ wire: "access_token", shape: D.secret }),
      tokenType: D.m({ wire: "token_type" }),
      expiresIn: D.m({ wire: "expires_in" }),
    },
    staticContext: { IsOAuthEndpoint: { value: true } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOAuth2TokenWithIAM",
})) as any;

export type DeleteConsoleAuthorizationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Delete console authorization configuration with automatic scope detection
 */
export const deleteConsoleAuthorizationConfiguration: API.OperationMethod<
  DeleteConsoleAuthorizationConfigurationInput,
  DeleteConsoleAuthorizationConfigurationOutput,
  DeleteConsoleAuthorizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-console-authorization-configuration",
    input: { targetId: 0 },
    staticContext: { IsControlPlane: { value: true } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConsoleAuthorizationConfiguration",
})) as any;

export type DeleteResourcePermissionStatementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Remove a permission statement from the account's SignIn resource-based policy
 */
export const deleteResourcePermissionStatement: API.OperationMethod<
  DeleteResourcePermissionStatementInput,
  DeleteResourcePermissionStatementOutput,
  DeleteResourcePermissionStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-resource-permission-statement",
    input: { statementId: 0, clientToken: D.m({ idempotency: true }) },
    staticContext: { IsControlPlane: { value: true } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePermissionStatement",
})) as any;

export type GetConsoleAuthorizationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Get console authorization configuration with automatic scope detection
 */
export const getConsoleAuthorizationConfiguration: API.OperationMethod<
  GetConsoleAuthorizationConfigurationInput,
  GetConsoleAuthorizationConfigurationOutput,
  GetConsoleAuthorizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-console-authorization-configuration",
    input: { targetId: 0 },
    staticContext: { IsControlPlane: { value: true } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConsoleAuthorizationConfiguration",
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | CommonErrors;
/**
 * Retrieve the account's consolidated SignIn resource-based policy
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-resource-policy",
    input: {},
    output: {
      signinResourceBasedPolicy: {
        version: D.m({ wire: "Version" }),
        statement: D.m({
          wire: "Statement",
          shape: D.list({
            effect: D.m({ wire: "Effect" }),
            principal: D.m({ wire: "Principal" }),
            action: D.m({ wire: "Action" }),
            resource: D.m({ wire: "Resource" }),
            condition: D.m({ wire: "Condition" }),
          }),
        }),
      },
    },
    staticContext: { IsControlPlane: { value: true } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type IntrospectOAuth2TokenWithIAMError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to inspect the metadata and state of an OAuth 2.0
 * access token or refresh token
 *
 * Implements RFC 7662 OAuth 2.0 Token Introspection over a SigV4-authenticated
 * endpoint. Inspects the metadata of an access_token or refresh_token issued
 * by AWS Sign-In and returns the claims associated with it.
 *
 * Inactive token semantics (RFC 7662 §2.2): when the supplied token is
 * unknown, expired, revoked, malformed, or owned by a different account,
 * the response body is exactly { "active": false } with all other claims
 * omitted.
 */
export const introspectOAuth2TokenWithIAM: API.OperationMethod<
  IntrospectOAuth2TokenWithIAMRequest,
  IntrospectOAuth2TokenWithIAMResponse,
  IntrospectOAuth2TokenWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/introspect?x-amz-client-auth-method=iam",
    input: { token: 0, tokenTypeHint: D.m({ wire: "token_type_hint" }) },
    output: {
      clientId: D.m({ wire: "client_id" }),
      userId: D.m({ wire: "user_id" }),
      tokenType: D.m({ wire: "token_type" }),
      accountId: D.m({ wire: "account_id" }),
      signinSession: D.m({ wire: "signin_session" }),
    },
    staticContext: { IsOAuthEndpoint: { value: true } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IntrospectOAuth2TokenWithIAM",
})) as any;

export type ListResourcePermissionStatementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Retrieve all permission statements in the account's SignIn resource-based policy
 */
export const listResourcePermissionStatements: API.PaginatedOperationMethod<
  ListResourcePermissionStatementsInput,
  ListResourcePermissionStatementsOutput,
  ListResourcePermissionStatementsError,
  Credentials | HttpClient.HttpClient,
  PermissionStatementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-resource-permission-statements",
    input: { maxResults: 0, nextToken: 0 },
    staticContext: { IsControlPlane: { value: true } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcePermissionStatements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "permissionStatements",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutConsoleAuthorizationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Enable console authorization configuration with automatic scope detection
 */
export const putConsoleAuthorizationConfiguration: API.OperationMethod<
  PutConsoleAuthorizationConfigurationInput,
  PutConsoleAuthorizationConfigurationOutput,
  PutConsoleAuthorizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /put-console-authorization-configuration",
    input: { targetId: 0 },
    staticContext: { IsControlPlane: { value: true } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConsoleAuthorizationConfiguration",
})) as any;

export type PutResourcePermissionStatementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Create a permission statement in the account's SignIn resource-based policy
 */
export const putResourcePermissionStatement: API.OperationMethod<
  PutResourcePermissionStatementInput,
  PutResourcePermissionStatementOutput,
  PutResourcePermissionStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /put-resource-permission-statement",
    input: {
      sourceVpc: 0,
      signinSourceVpce: 0,
      consoleSourceVpce: 0,
      vpcSourceIp: 0,
      sourceIp: 0,
      requestedRegion: 0,
      excludedPrincipal: 0,
      clientToken: D.m({ idempotency: true }),
    },
    staticContext: { IsControlPlane: { value: true } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePermissionStatement",
})) as any;

export type RevokeOAuth2TokenWithIAMError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to revoke an OAuth 2.0 refresh token and its associated refresh tokens
 *
 * Revokes a refresh_token issued by AWS Sign-In, invalidating the entire token
 * chain so that the refresh_token can no longer be used to mint new access_tokens.
 *
 * Idempotency: revoking an already-revoked, expired, or otherwise invalid token
 * still returns 200 OK with an empty body. Only the refresh_token type is accepted.
 */
export const revokeOAuth2TokenWithIAM: API.OperationMethod<
  RevokeOAuth2TokenWithIAMRequest,
  RevokeOAuth2TokenWithIAMResponse,
  RevokeOAuth2TokenWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/revoke?x-amz-client-auth-method=iam",
    input: { token: 0 },
    staticContext: { IsOAuthEndpoint: { value: true } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeOAuth2TokenWithIAM",
})) as any;
