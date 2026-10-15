import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://cognito-identity.amazonaws.com/doc/2014-06-30/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Cognito Identity",
  serviceShapeName: "AWSCognitoIdentityService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cognito-identity" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-06-30");
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
              return e("https://cognito-identity-fips.us-east-1.amazonaws.com");
            }
            if (Region === "us-east-2") {
              return e("https://cognito-identity-fips.us-east-2.amazonaws.com");
            }
            if (Region === "us-west-1") {
              return e("https://cognito-identity-fips.us-west-1.amazonaws.com");
            }
            if (Region === "us-west-2") {
              return e("https://cognito-identity-fips.us-west-2.amazonaws.com");
            }
            return e(
              `https://cognito-identity-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cognito-identity-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://cognito-identity.${Region}.amazonaws.com`);
            }
            return e(
              `https://cognito-identity.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cognito-identity.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cognito-identity.{R}.{D}","properties":{},"headers":{}}');

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DeveloperUserAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<DeveloperUserAlreadyRegisteredException>()(
    "DeveloperUserAlreadyRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ExternalServiceException
  extends /*@__PURE__*/ S.TaggedError<ExternalServiceException>()(
    "ExternalServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()("InternalErrorException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withServerError) {}
export class InvalidIdentityPoolConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidIdentityPoolConfigurationException>()(
    "InvalidIdentityPoolConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type IdentityPoolName = string;
export type IdentityPoolUnauthenticated = boolean;
export type ClassicFlow = boolean;
export type IdentityProviderName = string;
export type IdentityProviderId = string;
export type IdentityProviders = { [key: string]: string | undefined };
export type DeveloperProviderName = string;
export type ARNString = string;
export type OIDCProviderList = string[];
export type CognitoIdentityProviderName = string;
export type CognitoIdentityProviderClientId = string;
export type CognitoIdentityProviderTokenCheck = boolean;
export interface CognitoIdentityProvider {
  ProviderName?: string;
  ClientId?: string;
  ServerSideTokenCheck?: boolean;
}
export type CognitoIdentityProviderList = CognitoIdentityProvider[];
export type SAMLProviderList = string[];
export type TagKeysType = string;
export type TagValueType = string;
export type IdentityPoolTagsType = { [key: string]: string | undefined };
export interface CreateIdentityPoolInput {
  IdentityPoolName: string;
  AllowUnauthenticatedIdentities: boolean;
  AllowClassicFlow?: boolean;
  SupportedLoginProviders?: { [key: string]: string | undefined };
  DeveloperProviderName?: string;
  OpenIdConnectProviderARNs?: string[];
  CognitoIdentityProviders?: CognitoIdentityProvider[];
  SamlProviderARNs?: string[];
  IdentityPoolTags?: { [key: string]: string | undefined };
}
export type IdentityPoolId = string;
export interface IdentityPool {
  IdentityPoolId: string;
  IdentityPoolName: string;
  AllowUnauthenticatedIdentities: boolean;
  AllowClassicFlow?: boolean;
  SupportedLoginProviders?: { [key: string]: string | undefined };
  DeveloperProviderName?: string;
  OpenIdConnectProviderARNs?: string[];
  CognitoIdentityProviders?: CognitoIdentityProvider[];
  SamlProviderARNs?: string[];
  IdentityPoolTags?: { [key: string]: string | undefined };
}
export type IdentityId = string;
export type IdentityIdList = string[];
export interface DeleteIdentitiesInput {
  IdentityIdsToDelete: string[];
}
export type ErrorCode = "AccessDenied" | "InternalServerError" | (string & {});
export interface UnprocessedIdentityId {
  IdentityId?: string;
  ErrorCode?: ErrorCode;
}
export type UnprocessedIdentityIdList = UnprocessedIdentityId[];
export interface DeleteIdentitiesResponse {
  UnprocessedIdentityIds?: UnprocessedIdentityId[];
}
export interface DeleteIdentityPoolInput {
  IdentityPoolId: string;
}
export interface DeleteIdentityPoolResponse {}
export interface DescribeIdentityInput {
  IdentityId: string;
}
export type LoginsList = string[];
export interface IdentityDescription {
  IdentityId?: string;
  Logins?: string[];
  CreationDate?: Date;
  LastModifiedDate?: Date;
}
export interface DescribeIdentityPoolInput {
  IdentityPoolId: string;
}
export type IdentityProviderToken = string | redacted.Redacted<string>;
export type LoginsMap = { [key: string]: string | redacted.Redacted<string> | undefined };
export interface GetCredentialsForIdentityInput {
  IdentityId: string;
  Logins?: { [key: string]: string | redacted.Redacted<string> | undefined };
  CustomRoleArn?: string;
}
export type AccessKeyString = string;
export type SecretKeyString = string | redacted.Redacted<string>;
export type SessionTokenString = string;
export interface Credentials {
  AccessKeyId?: string;
  SecretKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export interface GetCredentialsForIdentityResponse {
  IdentityId?: string;
  Credentials?: Credentials;
}
export type AccountId = string;
export interface GetIdInput {
  AccountId?: string;
  IdentityPoolId: string;
  Logins?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export interface GetIdResponse {
  IdentityId?: string;
}
export interface GetIdentityPoolRolesInput {
  IdentityPoolId: string;
}
export type RoleType = string;
export type RolesMap = { [key: string]: string | undefined };
export type RoleMappingType = "Token" | "Rules" | (string & {});
export type AmbiguousRoleResolutionType = "AuthenticatedRole" | "Deny" | (string & {});
export type ClaimName = string;
export type MappingRuleMatchType =
  | "Equals"
  | "Contains"
  | "StartsWith"
  | "NotEqual"
  | (string & {});
export type ClaimValue = string;
export interface MappingRule {
  Claim: string;
  MatchType: MappingRuleMatchType;
  Value: string;
  RoleARN: string;
}
export type MappingRulesList = MappingRule[];
export interface RulesConfigurationType {
  Rules: MappingRule[];
}
export interface RoleMapping {
  Type: RoleMappingType;
  AmbiguousRoleResolution?: AmbiguousRoleResolutionType;
  RulesConfiguration?: RulesConfigurationType;
}
export type RoleMappingMap = { [key: string]: RoleMapping | undefined };
export interface GetIdentityPoolRolesResponse {
  IdentityPoolId?: string;
  Roles?: { [key: string]: string | undefined };
  RoleMappings?: { [key: string]: RoleMapping | undefined };
}
export interface GetOpenIdTokenInput {
  IdentityId: string;
  Logins?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type OIDCToken = string | redacted.Redacted<string>;
export interface GetOpenIdTokenResponse {
  IdentityId?: string;
  Token?: string | redacted.Redacted<string>;
}
export type PrincipalTagID = string;
export type PrincipalTagValue = string;
export type PrincipalTags = { [key: string]: string | undefined };
export type TokenDuration = number;
export interface GetOpenIdTokenForDeveloperIdentityInput {
  IdentityPoolId: string;
  IdentityId?: string;
  Logins: { [key: string]: string | redacted.Redacted<string> | undefined };
  PrincipalTags?: { [key: string]: string | undefined };
  TokenDuration?: number;
}
export interface GetOpenIdTokenForDeveloperIdentityResponse {
  IdentityId?: string;
  Token?: string | redacted.Redacted<string>;
}
export interface GetPrincipalTagAttributeMapInput {
  IdentityPoolId: string;
  IdentityProviderName: string;
}
export type UseDefaults = boolean;
export interface GetPrincipalTagAttributeMapResponse {
  IdentityPoolId?: string;
  IdentityProviderName?: string;
  UseDefaults?: boolean;
  PrincipalTags?: { [key: string]: string | undefined };
}
export type QueryLimit = number;
export type PaginationKey = string;
export type HideDisabled = boolean;
export interface ListIdentitiesInput {
  IdentityPoolId: string;
  MaxResults: number;
  NextToken?: string;
  HideDisabled?: boolean;
}
export type IdentitiesList = IdentityDescription[];
export interface ListIdentitiesResponse {
  IdentityPoolId?: string;
  Identities?: IdentityDescription[];
  NextToken?: string;
}
export interface ListIdentityPoolsInput {
  MaxResults: number;
  NextToken?: string;
}
export interface IdentityPoolShortDescription {
  IdentityPoolId?: string;
  IdentityPoolName?: string;
}
export type IdentityPoolsList = IdentityPoolShortDescription[];
export interface ListIdentityPoolsResponse {
  IdentityPools?: IdentityPoolShortDescription[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export type DeveloperUserIdentifier = string;
export interface LookupDeveloperIdentityInput {
  IdentityPoolId: string;
  IdentityId?: string;
  DeveloperUserIdentifier?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type DeveloperUserIdentifierList = string[];
export interface LookupDeveloperIdentityResponse {
  IdentityId?: string;
  DeveloperUserIdentifierList?: string[];
  NextToken?: string;
}
export interface MergeDeveloperIdentitiesInput {
  SourceUserIdentifier: string;
  DestinationUserIdentifier: string;
  DeveloperProviderName: string;
  IdentityPoolId: string;
}
export interface MergeDeveloperIdentitiesResponse {
  IdentityId?: string;
}
export interface SetIdentityPoolRolesInput {
  IdentityPoolId: string;
  Roles: { [key: string]: string | undefined };
  RoleMappings?: { [key: string]: RoleMapping | undefined };
}
export interface SetIdentityPoolRolesResponse {}
export interface SetPrincipalTagAttributeMapInput {
  IdentityPoolId: string;
  IdentityProviderName: string;
  UseDefaults?: boolean;
  PrincipalTags?: { [key: string]: string | undefined };
}
export interface SetPrincipalTagAttributeMapResponse {
  IdentityPoolId?: string;
  IdentityProviderName?: string;
  UseDefaults?: boolean;
  PrincipalTags?: { [key: string]: string | undefined };
}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UnlinkDeveloperIdentityInput {
  IdentityId: string;
  IdentityPoolId: string;
  DeveloperProviderName: string;
  DeveloperUserIdentifier: string;
}
export interface UnlinkDeveloperIdentityResponse {}
export interface UnlinkIdentityInput {
  IdentityId: string;
  Logins: { [key: string]: string | redacted.Redacted<string> | undefined };
  LoginsToRemove: string[];
}
export interface UnlinkIdentityResponse {}
export type IdentityPoolTagsListType = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type CreateIdentityPoolError =
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | ResourceConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new identity pool. The identity pool is a store of user identity
 * information that is specific to your Amazon Web Services account. The keys for
 * `SupportedLoginProviders` are as follows:
 *
 * - Facebook: `graph.facebook.com`
 *
 * - Google: `accounts.google.com`
 *
 * - Sign in With Apple: `appleid.apple.com`
 *
 * - Amazon: `www.amazon.com`
 *
 * - Twitter: `api.twitter.com`
 *
 * - Digits: `www.digits.com`
 *
 * If you don't provide a value for a parameter, Amazon Cognito sets it to its default value.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const createIdentityPool: API.OperationMethod<
  CreateIdentityPoolInput,
  IdentityPool,
  CreateIdentityPoolError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateIdentityPoolInput>,
  output: __S(26, __c3, 2) as any as S.Schema<IdentityPool>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    ResourceConflictException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentityPool",
}));

export type DeleteIdentitiesError =
  | InternalErrorException
  | InvalidParameterException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes identities from an identity pool. You can specify a list of 1-60 identities
 * that you want to delete.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const deleteIdentities: API.OperationMethod<
  DeleteIdentitiesInput,
  DeleteIdentitiesResponse,
  DeleteIdentitiesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DeleteIdentitiesInput>,
  output: __S(35, __c4, 3) as any as S.Schema<DeleteIdentitiesResponse>,
  errors: [InternalErrorException, InvalidParameterException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentities",
}));

export type DeleteIdentityPoolError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an identity pool. Once a pool is deleted, users will not be able to
 * authenticate with the pool.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const deleteIdentityPool: API.OperationMethod<
  DeleteIdentityPoolInput,
  DeleteIdentityPoolResponse,
  DeleteIdentityPoolError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DeleteIdentityPoolInput>,
  output: __S(48, __c6, 0) as any as S.Schema<DeleteIdentityPoolResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityPool",
}));

export type DescribeIdentityError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns metadata related to the given identity, including when the identity was
 * created and any associated linked logins.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const describeIdentity: API.OperationMethod<
  DescribeIdentityInput,
  IdentityDescription,
  DescribeIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DescribeIdentityInput>,
  output: __S(64, __c8, 0) as any as S.Schema<IdentityDescription>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentity",
}));

export type DescribeIdentityPoolError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a particular identity pool, including the pool name, ID
 * description, creation date, and current number of users.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const describeIdentityPool: API.OperationMethod<
  DescribeIdentityPoolInput,
  IdentityPool,
  DescribeIdentityPoolError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DescribeIdentityPoolInput>,
  output: __S(26, __c3, 2) as any as S.Schema<IdentityPool>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityPool",
}));

export type GetCredentialsForIdentityError =
  | ExternalServiceException
  | InternalErrorException
  | InvalidIdentityPoolConfigurationException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns credentials for the provided identity ID. Any provided logins will be
 * validated against supported login providers. If the token is for
 * `cognito-identity.amazonaws.com`, it will be passed through to Security Token Service with the appropriate role for the token.
 *
 * This is a public API. You do not need any credentials to call this API.
 */
export const getCredentialsForIdentity: API.OperationMethod<
  GetCredentialsForIdentityInput,
  GetCredentialsForIdentityResponse,
  GetCredentialsForIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetCredentialsForIdentityInput>,
  output: __S(82, __c10, 2) as any as S.Schema<GetCredentialsForIdentityResponse>,
  errors: [
    ExternalServiceException,
    InternalErrorException,
    InvalidIdentityPoolConfigurationException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredentialsForIdentity",
}));

export type GetIdError =
  | ExternalServiceException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Generates (or retrieves) IdentityID. Supplying multiple logins will create an
 * implicit linked account.
 *
 * This is a public API. You do not need any credentials to call this API.
 */
export const getId: API.OperationMethod<
  GetIdInput,
  GetIdResponse,
  GetIdError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GetIdInput>,
  output: __S(104, __c13, 0) as any as S.Schema<GetIdResponse>,
  errors: [
    ExternalServiceException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetId",
}));

export type GetIdentityPoolRolesError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the roles for an identity pool.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const getIdentityPoolRoles: API.OperationMethod<
  GetIdentityPoolRolesInput,
  GetIdentityPoolRolesResponse,
  GetIdentityPoolRolesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetIdentityPoolRolesInput>,
  output: __S(113, __c14, 1) as any as S.Schema<GetIdentityPoolRolesResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityPoolRoles",
}));

export type GetOpenIdTokenError =
  | ExternalServiceException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an OpenID token, using a known Cognito ID. This known Cognito ID is returned by
 * GetId. You can optionally add additional logins for the identity.
 * Supplying multiple logins creates an implicit link.
 *
 * The OpenID token is valid for 10 minutes.
 *
 * This is a public API. You do not need any credentials to call this API.
 */
export const getOpenIdToken: API.OperationMethod<
  GetOpenIdTokenInput,
  GetOpenIdTokenResponse,
  GetOpenIdTokenError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<GetOpenIdTokenInput>,
  output: __S(136, __c17, 0) as any as S.Schema<GetOpenIdTokenResponse>,
  errors: [
    ExternalServiceException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpenIdToken",
}));

export type GetOpenIdTokenForDeveloperIdentityError =
  | DeveloperUserAlreadyRegisteredException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Registers (or retrieves) a Cognito `IdentityId` and an OpenID Connect
 * token for a user authenticated by your backend authentication process. Supplying multiple
 * logins will create an implicit linked account. You can only specify one developer provider
 * as part of the `Logins` map, which is linked to the identity pool. The developer
 * provider is the "domain" by which Cognito will refer to your users.
 *
 * You can use `GetOpenIdTokenForDeveloperIdentity` to create a new identity
 * and to link new logins (that is, user credentials issued by a public provider or developer
 * provider) to an existing identity. When you want to create a new identity, the
 * `IdentityId` should be null. When you want to associate a new login with an
 * existing authenticated/unauthenticated identity, you can do so by providing the existing
 * `IdentityId`. This API will create the identity in the specified
 * `IdentityPoolId`.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const getOpenIdTokenForDeveloperIdentity: API.OperationMethod<
  GetOpenIdTokenForDeveloperIdentityInput,
  GetOpenIdTokenForDeveloperIdentityResponse,
  GetOpenIdTokenForDeveloperIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<GetOpenIdTokenForDeveloperIdentityInput>,
  output: __S(136, __c17, 0) as any as S.Schema<GetOpenIdTokenForDeveloperIdentityResponse>,
  errors: [
    DeveloperUserAlreadyRegisteredException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpenIdTokenForDeveloperIdentity",
}));

export type GetPrincipalTagAttributeMapError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Use `GetPrincipalTagAttributeMap` to list all mappings between
 * `PrincipalTags` and user attributes.
 */
export const getPrincipalTagAttributeMap: API.OperationMethod<
  GetPrincipalTagAttributeMapInput,
  GetPrincipalTagAttributeMapResponse,
  GetPrincipalTagAttributeMapError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<GetPrincipalTagAttributeMapInput>,
  output: __S(160, __c20, 0) as any as S.Schema<GetPrincipalTagAttributeMapResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrincipalTagAttributeMap",
}));

export type ListIdentitiesError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the identities in an identity pool.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const listIdentities: API.OperationMethod<
  ListIdentitiesInput,
  ListIdentitiesResponse,
  ListIdentitiesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<ListIdentitiesInput>,
  output: __S(170, __c21, 2) as any as S.Schema<ListIdentitiesResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentities",
}));

export type ListIdentityPoolsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the Cognito identity pools registered for your account.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const listIdentityPools: API.PaginatedOperationMethod<
  ListIdentityPoolsInput,
  ListIdentityPoolsResponse,
  ListIdentityPoolsError,
  Creds | HttpClient.HttpClient,
  IdentityPoolShortDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<ListIdentityPoolsInput>,
  output: __S(179, __c22, 3) as any as S.Schema<ListIdentityPoolsResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityPools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IdentityPools",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags that are assigned to an Amazon Cognito identity pool.
 *
 * A tag is a label that you can apply to identity pools to categorize and manage them in
 * different ways, such as by purpose, owner, environment, or other criteria.
 *
 * You can use this action up to 10 times per second, per account.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(185, __c23, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type LookupDeveloperIdentityError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the `IdentityID` associated with a
 * `DeveloperUserIdentifier` or the list of `DeveloperUserIdentifier`
 * values associated with an `IdentityId` for an existing identity. Either
 * `IdentityID` or `DeveloperUserIdentifier` must not be null. If you
 * supply only one of these values, the other value will be searched in the database and
 * returned as a part of the response. If you supply both,
 * `DeveloperUserIdentifier` will be matched against `IdentityID`. If
 * the values are verified against the database, the response returns both values and is the
 * same as the request. Otherwise, a `ResourceConflictException` is
 * thrown.
 *
 * `LookupDeveloperIdentity` is intended for low-throughput control plane
 * operations: for example, to enable customer service to locate an identity ID by username.
 * If you are using it for higher-volume operations such as user authentication, your requests
 * are likely to be throttled. GetOpenIdTokenForDeveloperIdentity is a
 * better option for higher-volume operations for user authentication.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const lookupDeveloperIdentity: API.OperationMethod<
  LookupDeveloperIdentityInput,
  LookupDeveloperIdentityResponse,
  LookupDeveloperIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<LookupDeveloperIdentityInput>,
  output: __S(193, __c24, 1) as any as S.Schema<LookupDeveloperIdentityResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LookupDeveloperIdentity",
}));

export type MergeDeveloperIdentitiesError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Merges two users having different `IdentityId`s, existing in the same
 * identity pool, and identified by the same developer provider. You can use this action to
 * request that discrete users be merged and identified as a single user in the Cognito
 * environment. Cognito associates the given source user (`SourceUserIdentifier`)
 * with the `IdentityId` of the `DestinationUserIdentifier`. Only
 * developer-authenticated users can be merged. If the users to be merged are associated with
 * the same public provider, but as two different users, an exception will be
 * thrown.
 *
 * The number of linked logins is limited to 20. So, the number of linked logins for the
 * source user, `SourceUserIdentifier`, and the destination user,
 * `DestinationUserIdentifier`, together should not be larger than 20.
 * Otherwise, an exception will be thrown.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const mergeDeveloperIdentities: API.OperationMethod<
  MergeDeveloperIdentitiesInput,
  MergeDeveloperIdentitiesResponse,
  MergeDeveloperIdentitiesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<MergeDeveloperIdentitiesInput>,
  output: __S(104, __c13, 0) as any as S.Schema<MergeDeveloperIdentitiesResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeDeveloperIdentities",
}));

export type SetIdentityPoolRolesError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the roles for an identity pool. These roles are used when making calls to GetCredentialsForIdentity action.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const setIdentityPoolRoles: API.OperationMethod<
  SetIdentityPoolRolesInput,
  SetIdentityPoolRolesResponse,
  SetIdentityPoolRolesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<SetIdentityPoolRolesInput>,
  output: __S(48, __c6, 0) as any as S.Schema<SetIdentityPoolRolesResponse>,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityPoolRoles",
}));

export type SetPrincipalTagAttributeMapError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * You can use this operation to use default (username and clientID) attribute or custom
 * attribute mappings.
 */
export const setPrincipalTagAttributeMap: API.OperationMethod<
  SetPrincipalTagAttributeMapInput,
  SetPrincipalTagAttributeMapResponse,
  SetPrincipalTagAttributeMapError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<SetPrincipalTagAttributeMapInput>,
  output: __S(160, __c20, 0) as any as S.Schema<SetPrincipalTagAttributeMapResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetPrincipalTagAttributeMap",
}));

export type TagResourceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Assigns a set of tags to the specified Amazon Cognito identity pool. A tag is a label
 * that you can use to categorize and manage identity pools in different ways, such as by
 * purpose, owner, environment, or other criteria.
 *
 * Each tag consists of a key and value, both of which you define. A key is a general
 * category for more specific values. For example, if you have two versions of an identity
 * pool, one for testing and another for production, you might assign an
 * `Environment` tag key to both identity pools. The value of this key might be
 * `Test` for one identity pool and `Production` for the
 * other.
 *
 * Tags are useful for cost tracking and access control. You can activate your tags so that
 * they appear on the Billing and Cost Management console, where you can track the costs
 * associated with your identity pools. In an IAM policy, you can constrain
 * permissions for identity pools based on specific tags or tag values.
 *
 * You can use this action up to 5 times per second, per account. An identity pool can have
 * as many as 50 tags.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<TagResourceInput>,
  output: __S(48, __c6, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UnlinkDeveloperIdentityError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Unlinks a `DeveloperUserIdentifier` from an existing identity. Unlinked
 * developer users will be considered new identities next time they are seen. If, for a given
 * Cognito identity, you remove all federated identities as well as the developer user
 * identifier, the Cognito identity becomes inaccessible.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const unlinkDeveloperIdentity: API.OperationMethod<
  UnlinkDeveloperIdentityInput,
  UnlinkDeveloperIdentityResponse,
  UnlinkDeveloperIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<UnlinkDeveloperIdentityInput>,
  output: __S(48, __c6, 0) as any as S.Schema<UnlinkDeveloperIdentityResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnlinkDeveloperIdentity",
}));

export type UnlinkIdentityError =
  | ExternalServiceException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Unlinks a federated identity from an existing account. Unlinked logins will be
 * considered new identities next time they are seen. Removing the last linked login will make
 * this identity inaccessible.
 *
 * This is a public API. You do not need any credentials to call this API.
 */
export const unlinkIdentity: API.OperationMethod<
  UnlinkIdentityInput,
  UnlinkIdentityResponse,
  UnlinkIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<UnlinkIdentityInput>,
  output: __S(48, __c6, 0) as any as S.Schema<UnlinkIdentityResponse>,
  errors: [
    ExternalServiceException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnlinkIdentity",
}));

export type UntagResourceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified tags from the specified Amazon Cognito identity pool. You can use
 * this action up to 5 times per second, per account
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(48, __c6, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateIdentityPoolError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | ResourceConflictException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an identity pool.
 *
 * If you don't provide a value for a parameter, Amazon Cognito sets it to its default value.
 *
 * You must use Amazon Web Services developer credentials to call this
 * operation.
 */
export const updateIdentityPool: API.OperationMethod<
  IdentityPool,
  IdentityPool,
  UpdateIdentityPoolError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(26, __c3, 2) as any as S.Schema<IdentityPool>,
  output: __S(26, __c3, 2) as any as S.Schema<IdentityPool>,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    ResourceConflictException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityPool",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolName: S.String,
          AllowUnauthenticatedIdentities: S.Boolean,
          AllowClassicFlow: S.optional(S.Boolean),
          SupportedLoginProviders: S.optional(__S(16, __c2, 0)),
          DeveloperProviderName: S.optional(S.String),
          OpenIdConnectProviderARNs: S.optional(__S(8, __c1, 0)),
          CognitoIdentityProviders: S.optional(__S(25, __c3, 1)),
          SamlProviderARNs: S.optional(__S(8, __c1, 0)),
          IdentityPoolTags: S.optional(__S(16, __c2, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIdentityPoolInput" });
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
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProviderName: S.optional(S.String),
          ClientId: S.optional(S.String),
          ServerSideTokenCheck: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CognitoIdentityProvider" });
    case 1:
      return S.Array(__S(24, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String,
          IdentityPoolName: S.String,
          AllowUnauthenticatedIdentities: S.Boolean,
          AllowClassicFlow: S.optional(S.Boolean),
          SupportedLoginProviders: S.optional(__S(16, __c2, 0)),
          DeveloperProviderName: S.optional(S.String),
          OpenIdConnectProviderARNs: S.optional(__S(8, __c1, 0)),
          CognitoIdentityProviders: S.optional(__S(25, __c3, 1)),
          SamlProviderARNs: S.optional(__S(8, __c1, 0)),
          IdentityPoolTags: S.optional(__S(16, __c2, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "IdentityPool" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityIdsToDelete: __S(8, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIdentitiesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IdentityId: S.optional(S.String), ErrorCode: S.optional(S.String) }),
      ).annotate({ identifier: "UnprocessedIdentityId" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ UnprocessedIdentityIds: S.optional(__S(34, __c4, 2)) }).pipe(ns),
      ).annotate({ identifier: "DeleteIdentitiesResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIdentityPoolInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteIdentityPoolResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeIdentityInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityId: S.optional(S.String),
          Logins: S.optional(__S(8, __c1, 0)),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "IdentityDescription" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeIdentityPoolInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityId: S.String,
          Logins: S.optional(__S(88, __c11, 0)),
          CustomRoleArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCredentialsForIdentityInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessKeyId: S.optional(S.String),
          SecretKey: S.optional(SensitiveString),
          SessionToken: S.optional(SensitiveString),
          Expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Credentials" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IdentityId: S.optional(S.String),
          Credentials: S.optional(__S(81, __c10, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetCredentialsForIdentityResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          IdentityPoolId: S.String,
          Logins: S.optional(__S(88, __c11, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetIdInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IdentityId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetIdResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentityPoolRolesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.optional(S.String),
          Roles: S.optional(__S(16, __c2, 0)),
          RoleMappings: S.optional(__S(124, __c15, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "GetIdentityPoolRolesResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Claim: S.String, MatchType: S.String, Value: S.String, RoleARN: S.String }),
      ).annotate({ identifier: "MappingRule" });
    case 1:
      return S.Array(__S(120, __c15, 0));
    case 2:
      return S.suspend(() => S.Struct({ Rules: __S(121, __c15, 1) })).annotate({
        identifier: "RulesConfigurationType",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          AmbiguousRoleResolution: S.optional(S.String),
          RulesConfiguration: S.optional(__S(122, __c15, 2)),
        }),
      ).annotate({ identifier: "RoleMapping" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(123, __c15, 3).pipe(S.optional));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityId: S.String, Logins: S.optional(__S(88, __c11, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOpenIdTokenInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityId: S.optional(S.String), Token: S.optional(SensitiveString) }).pipe(ns),
      ).annotate({ identifier: "GetOpenIdTokenResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String,
          IdentityId: S.optional(S.String),
          Logins: __S(88, __c11, 0),
          PrincipalTags: S.optional(__S(16, __c2, 0)),
          TokenDuration: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetOpenIdTokenForDeveloperIdentityInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.String, IdentityProviderName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPrincipalTagAttributeMapInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.optional(S.String),
          IdentityProviderName: S.optional(S.String),
          UseDefaults: S.optional(S.Boolean),
          PrincipalTags: S.optional(__S(16, __c2, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetPrincipalTagAttributeMapResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String,
          MaxResults: S.Number,
          NextToken: S.optional(S.String),
          HideDisabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIdentitiesInput" });
    case 1:
      return S.Array(__S(64, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.optional(S.String),
          Identities: S.optional(__S(169, __c21, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListIdentitiesResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.Number, NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIdentityPoolsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IdentityPoolId: S.optional(S.String), IdentityPoolName: S.optional(S.String) }),
      ).annotate({ identifier: "IdentityPoolShortDescription" });
    case 2:
      return S.Array(__S(177, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IdentityPools: S.optional(__S(178, __c22, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListIdentityPoolsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(16, __c2, 0)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String,
          IdentityId: S.optional(S.String),
          DeveloperUserIdentifier: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "LookupDeveloperIdentityInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityId: S.optional(S.String),
          DeveloperUserIdentifierList: S.optional(__S(8, __c1, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "LookupDeveloperIdentityResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceUserIdentifier: S.String,
          DestinationUserIdentifier: S.String,
          DeveloperProviderName: S.String,
          IdentityPoolId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "MergeDeveloperIdentitiesInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String,
          Roles: __S(16, __c2, 0),
          RoleMappings: S.optional(__S(124, __c15, 4)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetIdentityPoolRolesInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.String,
          IdentityProviderName: S.String,
          UseDefaults: S.optional(S.Boolean),
          PrincipalTags: S.optional(__S(16, __c2, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetPrincipalTagAttributeMapInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(16, __c2, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityId: S.String,
          IdentityPoolId: S.String,
          DeveloperProviderName: S.String,
          DeveloperUserIdentifier: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UnlinkDeveloperIdentityInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityId: S.String,
          Logins: __S(88, __c11, 0),
          LoginsToRemove: __S(8, __c1, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UnlinkIdentityInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(8, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
