import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Signin", serviceShapeName: "Signin" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "signin" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-01-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
      authSchemes: [{ name: "sigv4", signingName: "signin", signingRegion: `${_0}` }],
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
          return e(`https://signin.${Region}.api.amazonwebservices.com.cn`, _p0(Region), {});
        }
        return e(
          `https://signin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          _p0(Region),
          {},
        );
      }
    }
    if (IsOAuthEndpoint != null && IsOAuthEndpoint === true && UseFIPS === true) {
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
        return e(`https://${Region}.signin.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
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
              return e(`https://signin-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://signin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://signin.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://{R}.signin.aws.amazon.com","properties":{},"headers":{}}',
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
  prefix: "Signin",
  service: "Signin",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidGrantException
  extends /*@__PURE__*/ S.TaggedError<InvalidGrantException>()(
    "InvalidGrantException",
    {
      error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidScopeException
  extends /*@__PURE__*/ S.TaggedError<InvalidScopeException>()(
    "InvalidScopeException",
    {
      error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyRequestsError
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsError>()(
    "TooManyRequestsError",
    {
      error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      error: /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "OAuth2ErrorCode" }),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientCredentialsGrantType = string;
export type Resource = string;
export type TokenDuration = number;
export interface CreateBearerTokenRequest {
  grantType: string;
  resource: string;
  durationSeconds?: number | undefined;
}
export type OAuthAccessToken = string | redacted.Redacted<string>;
export type BearerTokenType = string;
export type BearerTokenExpiresIn = number;
export interface CreateBearerTokenResponse {
  accessToken: string | redacted.Redacted<string>;
  tokenType: string;
  expiresIn: number;
}
export type ClientId = string;
export type GrantType = string;
export type AuthorizationCode = string;
export type RedirectUri = string;
export type CodeVerifier = string;
export type RefreshToken = string | redacted.Redacted<string>;
export interface CreateOAuth2TokenRequestBody {
  clientId: string;
  grantType: string;
  code?: string | undefined;
  redirectUri?: string | undefined;
  codeVerifier?: string | undefined;
  refreshToken?: string | redacted.Redacted<string> | undefined;
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
  idToken?: string | undefined;
}
export interface CreateOAuth2TokenResponse {
  tokenOutput: CreateOAuth2TokenResponseBody;
}
export interface CreateOAuth2TokenWithIAMRequest {
  grantType: string;
  resource: string;
}
export type TokenExpiresIn = number;
export interface CreateOAuth2TokenWithIAMResponse {
  accessToken: string | redacted.Redacted<string>;
  tokenType: string;
  expiresIn: number;
}
export type TokenExchangeGrantType = string;
export type SubjectToken = string | redacted.Redacted<string>;
export type SubjectTokenType = string;
export type Scope = string;
export interface CreateOAuth2TokenWithTokenExchangeRequest {
  grantType: string;
  subjectToken?: string | redacted.Redacted<string> | undefined;
  subjectTokenType?: string | undefined;
  resource?: string | undefined;
  scope?: string | undefined;
}
export type IssuedOAuthAccessTokenType = string;
export interface CreateOAuth2TokenWithTokenExchangeResponse {
  accessToken: string | redacted.Redacted<string>;
  issuedTokenType?: string | undefined;
  tokenType: string;
  expiresIn: number;
}
export type TargetId = string;
export interface DeleteConsoleAuthorizationConfigurationInput {
  targetId?: string | undefined;
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
  clientToken?: string | undefined;
}
export interface DeleteResourcePermissionStatementOutput {}
export interface GetConsoleAuthorizationConfigurationInput {
  targetId?: string | undefined;
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
export type ConditionBlock = { [key: string]: { [key: string]: string[] | undefined } | undefined };
export interface PolicyStatement {
  effect?: string | undefined;
  principal?: { [key: string]: string | undefined } | undefined;
  action?: string[] | undefined;
  resource?: string | undefined;
  condition?: { [key: string]: { [key: string]: string[] | undefined } | undefined } | undefined;
}
export type PolicyStatements = PolicyStatement[];
export interface SigninResourceBasedPolicy {
  version?: string | undefined;
  statement?: PolicyStatement[] | undefined;
}
export interface GetResourcePolicyOutput {
  signinResourceBasedPolicy: SigninResourceBasedPolicy;
}
export type IntrospectionToken = string | redacted.Redacted<string>;
export type TokenTypeHint = string;
export interface IntrospectOAuth2TokenWithIAMRequest {
  token: string | redacted.Redacted<string>;
  tokenTypeHint?: string | undefined;
}
export type IntrospectedTokenType = string;
export type AccountId = string;
export interface IntrospectOAuth2TokenWithIAMResponse {
  active: boolean;
  clientId?: string | undefined;
  userId?: string | undefined;
  tokenType?: string | undefined;
  exp?: number | undefined;
  iat?: number | undefined;
  nbf?: number | undefined;
  sub?: string | undefined;
  aud?: string | undefined;
  iss?: string | undefined;
  jti?: string | undefined;
  accountId?: string | undefined;
  signinSession?: string | undefined;
  resource?: string | undefined;
}
export type ConsolePermissionMaxResults = number;
export type NextToken = string;
export interface ListResourcePermissionStatementsInput {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface PermissionStatementSummary {
  sid: string;
  condition?: { [key: string]: { [key: string]: string[] | undefined } | undefined } | undefined;
}
export type PermissionStatementSummaries = PermissionStatementSummary[];
export interface ListResourcePermissionStatementsOutput {
  permissionStatements: PermissionStatementSummary[];
  nextToken?: string | undefined;
}
export interface PutConsoleAuthorizationConfigurationInput {
  targetId?: string | undefined;
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
  sourceVpc?: string | undefined;
  signinSourceVpce?: string | undefined;
  consoleSourceVpce?: string | undefined;
  vpcSourceIp?: string | undefined;
  sourceIp?: string | undefined;
  requestedRegion?: string | undefined;
  excludedPrincipal?: string | undefined;
  clientToken?: string | undefined;
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
  | "unsupported_grant_type"
  | "invalid_request"
  | "invalid_grant"
  | "invalid_scope"
  | "invalid_target"
  | "rate_exceeded"
  | "service_unavailable"
  | (string & {});
export type CreateBearerTokenError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Creates a bearer token that represents your IAM credentials and can be used to access a supported AWS service. By default, the token is valid for 12 hours.
 */
export const createBearerToken: API.OperationMethod<
  CreateBearerTokenRequest & RegionInput,
  CreateBearerTokenResponse,
  CreateBearerTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateBearerTokenRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateBearerTokenResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBearerToken",
  telemetry: TELEMETRY,
  span: "CreateBearerToken",
}));

export type CreateOAuth2TokenError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Exchanges an authorization code or refresh token for an OAuth 2.0 access token and refresh token.
 */
export const createOAuth2Token: API.OperationMethod<
  CreateOAuth2TokenRequest & RegionInput,
  CreateOAuth2TokenResponse,
  CreateOAuth2TokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(17, __c2, 1) as any as S.Schema<CreateOAuth2TokenRequest>,
  output: __S(20, __c2, 4) as any as S.Schema<CreateOAuth2TokenResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOAuth2Token",
  telemetry: TELEMETRY,
  span: "CreateOAuth2Token",
}));

export type CreateOAuth2TokenWithIAMError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Exchanges client credentials for an OAuth 2.0 access token scoped to a resource, which you can use to access AWS services from applications.
 */
export const createOAuth2TokenWithIAM: API.OperationMethod<
  CreateOAuth2TokenWithIAMRequest & RegionInput,
  CreateOAuth2TokenWithIAMResponse,
  CreateOAuth2TokenWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CreateOAuth2TokenWithIAMRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateOAuth2TokenWithIAMResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOAuth2TokenWithIAM",
  telemetry: TELEMETRY,
  span: "CreateOAuth2TokenWithIAM",
}));

export type CreateOAuth2TokenWithTokenExchangeError =
  | InternalServerException
  | InvalidGrantException
  | InvalidScopeException
  | ServiceUnavailableException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Exchanges a supported token for an OAuth 2.0 access token scoped to a resource, which you can use to access AWS services from applications.
 */
export const createOAuth2TokenWithTokenExchange: API.OperationMethod<
  CreateOAuth2TokenWithTokenExchangeRequest & RegionInput,
  CreateOAuth2TokenWithTokenExchangeResponse,
  CreateOAuth2TokenWithTokenExchangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<CreateOAuth2TokenWithTokenExchangeRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<CreateOAuth2TokenWithTokenExchangeResponse>,
  errors: [
    InternalServerException,
    InvalidGrantException,
    InvalidScopeException,
    ServiceUnavailableException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOAuth2TokenWithTokenExchange",
  telemetry: TELEMETRY,
  span: "CreateOAuth2TokenWithTokenExchange",
}));

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
  DeleteConsoleAuthorizationConfigurationInput & RegionInput,
  DeleteConsoleAuthorizationConfigurationOutput,
  DeleteConsoleAuthorizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DeleteConsoleAuthorizationConfigurationInput>,
  output: __S(48, __c6, 0) as any as S.Schema<DeleteConsoleAuthorizationConfigurationOutput>,
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
  telemetry: TELEMETRY,
  span: "DeleteConsoleAuthorizationConfiguration",
}));

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
  DeleteResourcePermissionStatementInput & RegionInput,
  DeleteResourcePermissionStatementOutput,
  DeleteResourcePermissionStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DeleteResourcePermissionStatementInput>,
  output: __S(64, __c8, 0) as any as S.Schema<DeleteResourcePermissionStatementOutput>,
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
  telemetry: TELEMETRY,
  span: "DeleteResourcePermissionStatement",
}));

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
  GetConsoleAuthorizationConfigurationInput & RegionInput,
  GetConsoleAuthorizationConfigurationOutput,
  GetConsoleAuthorizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<GetConsoleAuthorizationConfigurationInput>,
  output: __S(48, __c6, 0) as any as S.Schema<GetConsoleAuthorizationConfigurationOutput>,
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
  telemetry: TELEMETRY,
  span: "GetConsoleAuthorizationConfiguration",
}));

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
  GetResourcePolicyInput & RegionInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetResourcePolicyInput>,
  output: __S(85, __c10, 5) as any as S.Schema<GetResourcePolicyOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
  telemetry: TELEMETRY,
  span: "GetResourcePolicy",
}));

export type IntrospectOAuth2TokenWithIAMError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Inspects the metadata and active state of an OAuth 2.0 access token or refresh token.
 *
 * Implements RFC 7662 OAuth 2.0 Token Introspection over a SigV4-authenticated
 * endpoint. Returns the claims associated with a token issued by AWS Sign-In.
 */
export const introspectOAuth2TokenWithIAM: API.OperationMethod<
  IntrospectOAuth2TokenWithIAMRequest & RegionInput,
  IntrospectOAuth2TokenWithIAMResponse,
  IntrospectOAuth2TokenWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<IntrospectOAuth2TokenWithIAMRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<IntrospectOAuth2TokenWithIAMResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IntrospectOAuth2TokenWithIAM",
  telemetry: TELEMETRY,
  span: "IntrospectOAuth2TokenWithIAM",
}));

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
  ListResourcePermissionStatementsInput & RegionInput,
  ListResourcePermissionStatementsOutput,
  ListResourcePermissionStatementsError,
  Credentials | HttpClient.HttpClient,
  PermissionStatementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<ListResourcePermissionStatementsInput>,
  output: __S(107, __c13, 3) as any as S.Schema<ListResourcePermissionStatementsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListResourcePermissionStatements",
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
  PutConsoleAuthorizationConfigurationInput & RegionInput,
  PutConsoleAuthorizationConfigurationOutput,
  PutConsoleAuthorizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<PutConsoleAuthorizationConfigurationInput>,
  output: __S(48, __c6, 0) as any as S.Schema<PutConsoleAuthorizationConfigurationOutput>,
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
  telemetry: TELEMETRY,
  span: "PutConsoleAuthorizationConfiguration",
}));

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
  PutResourcePermissionStatementInput & RegionInput,
  PutResourcePermissionStatementOutput,
  PutResourcePermissionStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<PutResourcePermissionStatementInput>,
  output: __S(121, __c15, 1) as any as S.Schema<PutResourcePermissionStatementOutput>,
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
  telemetry: TELEMETRY,
  span: "PutResourcePermissionStatement",
}));

export type RevokeOAuth2TokenWithIAMError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Revokes an OAuth 2.0 refresh token and its associated token chain.
 */
export const revokeOAuth2TokenWithIAM: API.OperationMethod<
  RevokeOAuth2TokenWithIAMRequest & RegionInput,
  RevokeOAuth2TokenWithIAMResponse,
  RevokeOAuth2TokenWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<RevokeOAuth2TokenWithIAMRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<RevokeOAuth2TokenWithIAMResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeOAuth2TokenWithIAM",
  telemetry: TELEMETRY,
  span: "RevokeOAuth2TokenWithIAM",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ grantType: S.String, resource: S.String, durationSeconds: S.optional(S.Number) })
          .pipe(S.encodeKeys({ grantType: "grant_type", durationSeconds: "duration" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/token?x-amz-token-request-type=bearer" }),
              svc,
              auth,
              proto,
              ver,
              rules,
              T.StaticContextParams({ IsOAuthEndpoint: { value: true } }),
            ),
          ),
      ).annotate({ identifier: "CreateBearerTokenRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accessToken: SensitiveString, tokenType: S.String, expiresIn: S.Number }).pipe(
          S.encodeKeys({
            accessToken: "access_token",
            tokenType: "token_type",
            expiresIn: "expires_in",
          }),
        ),
      ).annotate({ identifier: "CreateBearerTokenResponse" });
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
          redirectUri: S.optional(S.String),
          codeVerifier: S.optional(S.String),
          refreshToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CreateOAuth2TokenRequestBody" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          tokenInput: __S(16, __c2, 0)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CreateOAuth2TokenRequestBody" }),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/token" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ IsControlPlane: { value: false } }),
          ),
        ),
      ).annotate({ identifier: "CreateOAuth2TokenRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ accessKeyId: S.String, secretAccessKey: S.String, sessionToken: S.String }),
      ).annotate({ identifier: "AccessToken" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          accessToken: __S(18, __c2, 2),
          tokenType: S.String,
          expiresIn: S.Number,
          refreshToken: SensitiveString,
          idToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateOAuth2TokenResponseBody" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          tokenOutput: __S(19, __c2, 3)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CreateOAuth2TokenResponseBody" }),
        }),
      ).annotate({ identifier: "CreateOAuth2TokenResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ grantType: S.String, resource: S.String })
          .pipe(S.encodeKeys({ grantType: "grant_type" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/token?x-amz-client-auth-method=iam" }),
              svc,
              auth,
              proto,
              ver,
              rules,
              T.StaticContextParams({ IsOAuthEndpoint: { value: true } }),
            ),
          ),
      ).annotate({ identifier: "CreateOAuth2TokenWithIAMRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          grantType: S.String,
          subjectToken: S.optional(SensitiveString),
          subjectTokenType: S.optional(S.String),
          resource: S.optional(S.String),
          scope: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              grantType: "grant_type",
              subjectToken: "subject_token",
              subjectTokenType: "subject_token_type",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/token?x-amz-oauth-token-method=token-exchange" }),
              svc,
              auth,
              proto,
              ver,
              rules,
              T.StaticContextParams({ IsOAuthEndpoint: { value: true } }),
            ),
          ),
      ).annotate({ identifier: "CreateOAuth2TokenWithTokenExchangeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accessToken: SensitiveString,
          issuedTokenType: S.optional(S.String),
          tokenType: S.String,
          expiresIn: S.Number,
        }).pipe(
          S.encodeKeys({
            accessToken: "access_token",
            issuedTokenType: "issued_token_type",
            tokenType: "token_type",
            expiresIn: "expires_in",
          }),
        ),
      ).annotate({ identifier: "CreateOAuth2TokenWithTokenExchangeResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-console-authorization-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ IsControlPlane: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteConsoleAuthorizationConfigurationInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetId: S.String, scope: S.String, consoleAuthorizationEnabled: S.Boolean }),
      ).annotate({ identifier: "DeleteConsoleAuthorizationConfigurationOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          statementId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-resource-permission-statement" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ IsControlPlane: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePermissionStatementInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteResourcePermissionStatementOutput",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-console-authorization-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ IsControlPlane: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetConsoleAuthorizationConfigurationInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-resource-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ IsControlPlane: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyInput" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          effect: S.optional(S.String),
          principal: S.optional(__S(81, __c10, 1)),
          action: S.optional(__S(88, __c11, 0)),
          resource: S.optional(S.String),
          condition: S.optional(__S(90, __c11, 2)),
        }).pipe(
          S.encodeKeys({
            effect: "Effect",
            principal: "Principal",
            action: "Action",
            resource: "Resource",
            condition: "Condition",
          }),
        ),
      ).annotate({ identifier: "PolicyStatement" });
    case 3:
      return S.Array(__S(82, __c10, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ version: S.optional(S.String), statement: S.optional(__S(83, __c10, 3)) }).pipe(
          S.encodeKeys({ version: "Version", statement: "Statement" }),
        ),
      ).annotate({ identifier: "SigninResourceBasedPolicy" });
    case 5:
      return S.suspend(() => S.Struct({ signinResourceBasedPolicy: __S(84, __c10, 4) })).annotate({
        identifier: "GetResourcePolicyOutput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(88, __c11, 0).pipe(S.optional));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(89, __c11, 1).pipe(S.optional));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ token: SensitiveString, tokenTypeHint: S.optional(S.String) })
          .pipe(S.encodeKeys({ tokenTypeHint: "token_type_hint" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/introspect?x-amz-client-auth-method=iam" }),
              svc,
              auth,
              proto,
              ver,
              rules,
              T.StaticContextParams({ IsOAuthEndpoint: { value: true } }),
            ),
          ),
      ).annotate({ identifier: "IntrospectOAuth2TokenWithIAMRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          active: S.Boolean,
          clientId: S.optional(S.String),
          userId: S.optional(S.String),
          tokenType: S.optional(S.String),
          exp: S.optional(S.Number),
          iat: S.optional(S.Number),
          nbf: S.optional(S.Number),
          sub: S.optional(S.String),
          aud: S.optional(S.String),
          iss: S.optional(S.String),
          jti: S.optional(S.String),
          accountId: S.optional(S.String),
          signinSession: S.optional(S.String),
          resource: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            clientId: "client_id",
            userId: "user_id",
            tokenType: "token_type",
            accountId: "account_id",
            signinSession: "signin_session",
          }),
        ),
      ).annotate({ identifier: "IntrospectOAuth2TokenWithIAMResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-resource-permission-statements" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ IsControlPlane: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListResourcePermissionStatementsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ sid: S.String, condition: S.optional(__S(90, __c11, 2)) }),
      ).annotate({ identifier: "PermissionStatementSummary" });
    case 2:
      return S.Array(__S(105, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ permissionStatements: __S(106, __c13, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResourcePermissionStatementsOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/put-console-authorization-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ IsControlPlane: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutConsoleAuthorizationConfigurationInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceVpc: S.optional(S.String),
          signinSourceVpce: S.optional(S.String),
          consoleSourceVpce: S.optional(S.String),
          vpcSourceIp: S.optional(S.String),
          sourceIp: S.optional(S.String),
          requestedRegion: S.optional(S.String),
          excludedPrincipal: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/put-resource-permission-statement" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ IsControlPlane: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutResourcePermissionStatementInput" });
    case 1:
      return S.suspend(() => S.Struct({ statementId: S.String })).annotate({
        identifier: "PutResourcePermissionStatementOutput",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ token: SensitiveString }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/revoke?x-amz-client-auth-method=iam" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ IsOAuthEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "RevokeOAuth2TokenWithIAMRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
