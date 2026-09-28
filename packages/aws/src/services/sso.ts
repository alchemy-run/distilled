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
  sdkId: "SSO",
  target: "SWBPortalService",
  version: "2019-06-10",
  sigv4: "awsssoportal",
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
                `https://portal.sso-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://portal.sso.${Region}.amazonaws.com`);
              }
              return e(
                `https://portal.sso-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://portal.sso.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://portal.sso.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
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
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export type RoleNameType = string;
export type AccountIdType = string;
export type AccessTokenType = string | redacted.Redacted<string>;
export interface GetRoleCredentialsRequest {
  roleName: string;
  accountId: string;
  accessToken: string | redacted.Redacted<string>;
}
export type AccessKeyType = string;
export type SecretAccessKeyType = string | redacted.Redacted<string>;
export type SessionTokenType = string | redacted.Redacted<string>;
export type ExpirationTimestampType = number;
export interface RoleCredentials {
  accessKeyId?: string;
  secretAccessKey?: string | redacted.Redacted<string>;
  sessionToken?: string | redacted.Redacted<string>;
  expiration?: number;
}
export interface GetRoleCredentialsResponse {
  roleCredentials?: RoleCredentials;
}
export type NextTokenType = string;
export type MaxResultType = number;
export interface ListAccountRolesRequest {
  nextToken?: string;
  maxResults?: number;
  accessToken: string | redacted.Redacted<string>;
  accountId: string;
}
export interface RoleInfo {
  roleName?: string;
  accountId?: string;
}
export type RoleListType = RoleInfo[];
export interface ListAccountRolesResponse {
  nextToken?: string;
  roleList?: RoleInfo[];
}
export interface ListAccountsRequest {
  nextToken?: string;
  maxResults?: number;
  accessToken: string | redacted.Redacted<string>;
}
export type AccountNameType = string;
export type EmailAddressType = string;
export interface AccountInfo {
  accountId?: string;
  accountName?: string;
  emailAddress?: string;
}
export type AccountListType = AccountInfo[];
export interface ListAccountsResponse {
  nextToken?: string;
  accountList?: AccountInfo[];
}
export interface LogoutRequest {
  accessToken: string | redacted.Redacted<string>;
}
export interface LogoutResponse {}
export type ErrorDescription = string;
export type GetRoleCredentialsError =
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the STS short-term credentials for a given role name that is assigned to the
 * user.
 */
export const getRoleCredentials: API.OperationMethod<
  GetRoleCredentialsRequest,
  GetRoleCredentialsResponse,
  GetRoleCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /federation/credentials",
    input: {
      roleName: D.m({ query: "role_name" }),
      accountId: D.m({ query: "account_id" }),
      accessToken: D.m({ header: "x-amz-sso_bearer_token" }),
    },
    output: {
      roleCredentials: { secretAccessKey: D.secret, sessionToken: D.secret },
    },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoleCredentials",
})) as any;

export type ListAccountRolesError =
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all roles that are assigned to the user for a given AWS account.
 */
export const listAccountRoles: API.PaginatedOperationMethod<
  ListAccountRolesRequest,
  ListAccountRolesResponse,
  ListAccountRolesError,
  Credentials | HttpClient.HttpClient,
  RoleInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assignment/roles",
    input: {
      nextToken: D.m({ query: "next_token" }),
      maxResults: D.m({ query: "max_result" }),
      accessToken: D.m({ header: "x-amz-sso_bearer_token" }),
      accountId: D.m({ query: "account_id" }),
    },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountRoles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "roleList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccountsError =
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all AWS accounts assigned to the user. These AWS accounts are assigned by the
 * administrator of the account. For more information, see Assign User Access in the *IAM Identity Center User Guide*. This operation
 * returns a paginated response.
 */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient,
  AccountInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assignment/accounts",
    input: {
      nextToken: D.m({ query: "next_token" }),
      maxResults: D.m({ query: "max_result" }),
      accessToken: D.m({ header: "x-amz-sso_bearer_token" }),
    },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type LogoutError =
  | InvalidRequestException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes the locally stored SSO tokens from the client-side cache and sends an API call to
 * the IAM Identity Center service to invalidate the corresponding server-side IAM Identity Center sign in
 * session.
 *
 * If a user uses IAM Identity Center to access the AWS CLI, the user’s IAM Identity Center sign in session is
 * used to obtain an IAM session, as specified in the corresponding IAM Identity Center permission set.
 * More specifically, IAM Identity Center assumes an IAM role in the target account on behalf of the user,
 * and the corresponding temporary AWS credentials are returned to the client.
 *
 * After user logout, any existing IAM role sessions that were created by using IAM Identity Center
 * permission sets continue based on the duration configured in the permission set.
 * For more information, see User
 * authentications in the IAM Identity Center User
 * Guide.
 */
export const logout: API.OperationMethod<
  LogoutRequest,
  LogoutResponse,
  LogoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /logout",
    input: { accessToken: D.m({ header: "x-amz-sso_bearer_token" }) },
  },
  errors: [
    InvalidRequestException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Logout",
})) as any;
