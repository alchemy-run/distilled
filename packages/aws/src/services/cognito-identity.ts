import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Cognito Identity",
  target: "AWSCognitoIdentityService",
  version: "2014-06-30",
  sigv4: "cognito-identity",
  protocol: awsJson1_1Protocol,
  xmlns: "http://cognito-identity.amazonaws.com/doc/2014-06-30/",
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
                return e(
                  "https://cognito-identity-fips.us-east-1.amazonaws.com",
                );
              }
              if (Region === "us-east-2") {
                return e(
                  "https://cognito-identity-fips.us-east-2.amazonaws.com",
                );
              }
              if (Region === "us-west-1") {
                return e(
                  "https://cognito-identity-fips.us-west-1.amazonaws.com",
                );
              }
              if (Region === "us-west-2") {
                return e(
                  "https://cognito-identity-fips.us-west-2.amazonaws.com",
                );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
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
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cognito-identity.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DeveloperUserAlreadyRegisteredException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeveloperUserAlreadyRegisteredException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ExternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExternalServiceException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalErrorException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class InvalidIdentityPoolConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidIdentityPoolConfigurationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotAuthorizedException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotAuthorizedException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class ResourceConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
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
export type LoginsMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
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
export type AmbiguousRoleResolutionType =
  | "AuthenticatedRole"
  | "Deny"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: {
      IdentityPoolName: 0,
      AllowUnauthenticatedIdentities: 0,
      AllowClassicFlow: 0,
      SupportedLoginProviders: 0,
      DeveloperProviderName: 0,
      OpenIdConnectProviderARNs: 0,
      CognitoIdentityProviders: D.list(i_CognitoIdentityProvider),
      SamlProviderARNs: 0,
      IdentityPoolTags: 0,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { IdentityIdsToDelete: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentities",
})) as any;

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
  descriptor: { service: svc, input: { IdentityPoolId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { IdentityId: 0 },
    output: { CreationDate: D.ts, LastModifiedDate: D.ts },
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
  operationName: "DescribeIdentity",
})) as any;

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
  descriptor: { service: svc, input: { IdentityPoolId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { IdentityId: 0, Logins: 0, CustomRoleArn: 0 },
    output: {
      Credentials: {
        SecretKey: D.secret,
        SessionToken: D.secret,
        Expiration: D.ts,
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { AccountId: 0, IdentityPoolId: 0, Logins: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { IdentityPoolId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { IdentityId: 0, Logins: 0 },
    output: { Token: D.secret },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IdentityPoolId: 0,
      IdentityId: 0,
      Logins: 0,
      PrincipalTags: 0,
      TokenDuration: 0,
    },
    output: { Token: D.secret },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { IdentityPoolId: 0, IdentityProviderName: 0 },
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
  operationName: "GetPrincipalTagAttributeMap",
})) as any;

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
  descriptor: {
    service: svc,
    input: { IdentityPoolId: 0, MaxResults: 0, NextToken: 0, HideDisabled: 0 },
    output: {
      Identities: D.list({ CreationDate: D.ts, LastModifiedDate: D.ts }),
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
  operationName: "ListIdentities",
})) as any;

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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IdentityPoolId: 0,
      IdentityId: 0,
      DeveloperUserIdentifier: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceUserIdentifier: 0,
      DestinationUserIdentifier: 0,
      DeveloperProviderName: 0,
      IdentityPoolId: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IdentityPoolId: 0,
      Roles: 0,
      RoleMappings: D.map({
        Type: 0,
        AmbiguousRoleResolution: 0,
        RulesConfiguration: {
          Rules: D.list({ Claim: 0, MatchType: 0, Value: 0, RoleARN: 0 }),
        },
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IdentityPoolId: 0,
      IdentityProviderName: 0,
      UseDefaults: 0,
      PrincipalTags: 0,
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
  operationName: "SetPrincipalTagAttributeMap",
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IdentityId: 0,
      IdentityPoolId: 0,
      DeveloperProviderName: 0,
      DeveloperUserIdentifier: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { IdentityId: 0, Logins: 0, LoginsToRemove: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IdentityPoolId: 0,
      IdentityPoolName: 0,
      AllowUnauthenticatedIdentities: 0,
      AllowClassicFlow: 0,
      SupportedLoginProviders: 0,
      DeveloperProviderName: 0,
      OpenIdConnectProviderARNs: 0,
      CognitoIdentityProviders: D.list(i_CognitoIdentityProvider),
      SamlProviderARNs: 0,
      IdentityPoolTags: 0,
    },
  },
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
})) as any;

const i_CognitoIdentityProvider: D.LazyStruct = () => ({
  ProviderName: 0,
  ClientId: 0,
  ServerSideTokenCheck: 0,
});
