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
  sdkId: "Directory Service Data",
  target: "DirectoryServiceData",
  version: "2023-05-31",
  sigv4: "ds-data",
  protocol: restJson1Protocol,
  xmlns: "http://directoryservicedata.amazonaws.com/doc/2023-05-31/",
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
                `https://ds-data-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ds-data-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ds-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ds-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string; readonly Reason?: AccessDeniedReason }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DirectoryUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "DirectoryUnavailableException",
    ["BadRequestError", "RetryableError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: DirectoryUnavailableReason;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: ValidationExceptionReason;
  }> {}
export type DirectoryId = string;
export type GroupName = string;
export type MemberName = string;
export type Realm = string;
export type ClientToken = string;
export interface AddGroupMemberRequest {
  DirectoryId: string;
  GroupName: string;
  MemberName: string;
  MemberRealm?: string;
  ClientToken?: string;
}
export interface AddGroupMemberResult {}
export type GroupType = "Distribution" | "Security" | (string & {});
export type GroupScope =
  | "DomainLocal"
  | "Global"
  | "Universal"
  | "BuiltinLocal"
  | (string & {});
export type LdapDisplayName = string;
export type StringAttributeValue = string | redacted.Redacted<string>;
export type NumberAttributeValue = number;
export type BooleanAttributeValue = boolean;
export type StringSetAttributeValue = (string | redacted.Redacted<string>)[];
export type AttributeValue =
  | {
      S: string | redacted.Redacted<string>;
      N?: never;
      BOOL?: never;
      SS?: never;
    }
  | { S?: never; N: number; BOOL?: never; SS?: never }
  | { S?: never; N?: never; BOOL: boolean; SS?: never }
  | {
      S?: never;
      N?: never;
      BOOL?: never;
      SS: (string | redacted.Redacted<string>)[];
    };
export type Attributes = { [key: string]: AttributeValue | undefined };
export interface CreateGroupRequest {
  DirectoryId: string;
  SAMAccountName: string;
  GroupType?: GroupType;
  GroupScope?: GroupScope;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
  ClientToken?: string;
}
export type SID = string;
export interface CreateGroupResult {
  DirectoryId?: string;
  SAMAccountName?: string;
  SID?: string;
}
export type UserName = string;
export type EmailAddress = string | redacted.Redacted<string>;
export type GivenName = string | redacted.Redacted<string>;
export type Surname = string | redacted.Redacted<string>;
export interface CreateUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
  ClientToken?: string;
}
export interface CreateUserResult {
  DirectoryId?: string;
  SID?: string;
  SAMAccountName?: string;
}
export interface DeleteGroupRequest {
  DirectoryId: string;
  SAMAccountName: string;
  ClientToken?: string;
}
export interface DeleteGroupResult {}
export interface DeleteUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  ClientToken?: string;
}
export interface DeleteUserResult {}
export type LdapDisplayNameList = string[];
export interface DescribeGroupRequest {
  DirectoryId: string;
  Realm?: string;
  SAMAccountName: string;
  OtherAttributes?: string[];
}
export type DistinguishedName = string | redacted.Redacted<string>;
export interface DescribeGroupResult {
  DirectoryId?: string;
  Realm?: string;
  SID?: string;
  SAMAccountName?: string;
  DistinguishedName?: string | redacted.Redacted<string>;
  GroupType?: GroupType;
  GroupScope?: GroupScope;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
}
export interface DescribeUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  OtherAttributes?: string[];
  Realm?: string;
}
export type UserPrincipalName = string | redacted.Redacted<string>;
export interface DescribeUserResult {
  DirectoryId?: string;
  Realm?: string;
  SID?: string;
  SAMAccountName?: string;
  DistinguishedName?: string | redacted.Redacted<string>;
  UserPrincipalName?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  Enabled?: boolean;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
}
export interface DisableUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  ClientToken?: string;
}
export interface DisableUserResult {}
export type NextToken = string | redacted.Redacted<string>;
export type MaxResults = number;
export interface ListGroupMembersRequest {
  DirectoryId: string;
  Realm?: string;
  MemberRealm?: string;
  SAMAccountName: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export type MemberType = "USER" | "GROUP" | "COMPUTER" | (string & {});
export interface Member {
  SID: string;
  SAMAccountName: string;
  MemberType: MemberType;
}
export type MemberList = Member[];
export interface ListGroupMembersResult {
  DirectoryId?: string;
  Realm?: string;
  MemberRealm?: string;
  Members?: Member[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListGroupsRequest {
  DirectoryId: string;
  Realm?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export interface GroupSummary {
  SID: string;
  SAMAccountName: string;
  GroupType: GroupType;
  GroupScope: GroupScope;
}
export type GroupSummaryList = GroupSummary[];
export interface ListGroupsResult {
  DirectoryId?: string;
  Realm?: string;
  Groups?: GroupSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListGroupsForMemberRequest {
  DirectoryId: string;
  Realm?: string;
  MemberRealm?: string;
  SAMAccountName: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export interface ListGroupsForMemberResult {
  DirectoryId?: string;
  Realm?: string;
  MemberRealm?: string;
  Groups?: GroupSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListUsersRequest {
  DirectoryId: string;
  Realm?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export interface UserSummary {
  SID: string;
  SAMAccountName: string;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  Enabled: boolean;
}
export type UserSummaryList = UserSummary[];
export interface ListUsersResult {
  DirectoryId?: string;
  Realm?: string;
  Users?: UserSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface RemoveGroupMemberRequest {
  DirectoryId: string;
  GroupName: string;
  MemberName: string;
  MemberRealm?: string;
  ClientToken?: string;
}
export interface RemoveGroupMemberResult {}
export type SearchString = string | redacted.Redacted<string>;
export interface SearchGroupsRequest {
  DirectoryId: string;
  SearchString: string | redacted.Redacted<string>;
  SearchAttributes: string[];
  Realm?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export interface Group {
  SID?: string;
  SAMAccountName: string;
  DistinguishedName?: string | redacted.Redacted<string>;
  GroupType?: GroupType;
  GroupScope?: GroupScope;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
}
export type GroupList = Group[];
export interface SearchGroupsResult {
  DirectoryId?: string;
  Realm?: string;
  Groups?: Group[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface SearchUsersRequest {
  DirectoryId: string;
  Realm?: string;
  SearchString: string | redacted.Redacted<string>;
  SearchAttributes: string[];
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export interface User {
  SID?: string;
  SAMAccountName: string;
  DistinguishedName?: string | redacted.Redacted<string>;
  UserPrincipalName?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  Enabled?: boolean;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
}
export type UserList = User[];
export interface SearchUsersResult {
  DirectoryId?: string;
  Realm?: string;
  Users?: User[];
  NextToken?: string | redacted.Redacted<string>;
}
export type UpdateType = "ADD" | "REPLACE" | "REMOVE" | (string & {});
export interface UpdateGroupRequest {
  DirectoryId: string;
  SAMAccountName: string;
  GroupType?: GroupType;
  GroupScope?: GroupScope;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
  UpdateType?: UpdateType;
  ClientToken?: string;
}
export interface UpdateGroupResult {}
export interface UpdateUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
  UpdateType?: UpdateType;
  ClientToken?: string;
}
export interface UpdateUserResult {}
export type ExceptionMessage = string;
export type AccessDeniedReason =
  | "IAM_AUTH"
  | "DIRECTORY_AUTH"
  | "DATA_DISABLED"
  | (string & {});
export type DirectoryUnavailableReason =
  | "INVALID_DIRECTORY_STATE"
  | "DIRECTORY_TIMEOUT"
  | "DIRECTORY_RESOURCES_EXCEEDED"
  | "NO_DISK_SPACE"
  | "TRUST_AUTH_FAILURE"
  | (string & {});
export type ValidationExceptionReason =
  | "INVALID_REALM"
  | "INVALID_DIRECTORY_TYPE"
  | "INVALID_SECONDARY_REGION"
  | "INVALID_NEXT_TOKEN"
  | "INVALID_ATTRIBUTE_VALUE"
  | "INVALID_ATTRIBUTE_NAME"
  | "INVALID_ATTRIBUTE_FOR_USER"
  | "INVALID_ATTRIBUTE_FOR_GROUP"
  | "INVALID_ATTRIBUTE_FOR_SEARCH"
  | "INVALID_ATTRIBUTE_FOR_MODIFY"
  | "DUPLICATE_ATTRIBUTE"
  | "MISSING_ATTRIBUTE"
  | "ATTRIBUTE_EXISTS"
  | "LDAP_SIZE_LIMIT_EXCEEDED"
  | "LDAP_UNSUPPORTED_OPERATION"
  | (string & {});
export type AddGroupMemberError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds an existing user, group, or computer as a group member.
 */
export const addGroupMember: API.OperationMethod<
  AddGroupMemberRequest,
  AddGroupMemberResult,
  AddGroupMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GroupMemberships/AddGroupMember",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      GroupName: 0,
      MemberName: 0,
      MemberRealm: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddGroupMember",
})) as any;

export type CreateGroupError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new group.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResult,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Groups/CreateGroup",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      SAMAccountName: 0,
      GroupType: 0,
      GroupScope: 0,
      OtherAttributes: D.map(i_AttributeValue),
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
})) as any;

export type CreateUserError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new user.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResult,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Users/CreateUser",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      SAMAccountName: 0,
      EmailAddress: 0,
      GivenName: 0,
      Surname: 0,
      OtherAttributes: D.map(i_AttributeValue),
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type DeleteGroupError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResult,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Groups/DeleteGroup",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      SAMAccountName: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
})) as any;

export type DeleteUserError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a user.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResult,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Users/DeleteUser",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      SAMAccountName: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DescribeGroupError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific group.
 */
export const describeGroup: API.OperationMethod<
  DescribeGroupRequest,
  DescribeGroupResult,
  DescribeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Groups/DescribeGroup",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      Realm: 0,
      SAMAccountName: 0,
      OtherAttributes: 0,
    },
    output: {
      DistinguishedName: D.secret,
      OtherAttributes: D.map(o_AttributeValue),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroup",
})) as any;

export type DescribeUserError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific user.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResult,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Users/DescribeUser",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      SAMAccountName: 0,
      OtherAttributes: 0,
      Realm: 0,
    },
    output: {
      DistinguishedName: D.secret,
      UserPrincipalName: D.secret,
      EmailAddress: D.secret,
      GivenName: D.secret,
      Surname: D.secret,
      OtherAttributes: D.map(o_AttributeValue),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
})) as any;

export type DisableUserError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deactivates an active user account. For information about how to enable an inactive user
 * account, see ResetUserPassword
 * in the *Directory Service API Reference*.
 */
export const disableUser: API.OperationMethod<
  DisableUserRequest,
  DisableUserResult,
  DisableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Users/DisableUser",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      SAMAccountName: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableUser",
})) as any;

export type ListGroupMembersError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns member information for the specified group.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the
 * `ListGroupMembers.NextToken` member contains a token that you pass in the next
 * call to `ListGroupMembers`. This retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listGroupMembers: API.PaginatedOperationMethod<
  ListGroupMembersRequest,
  ListGroupMembersResult,
  ListGroupMembersError,
  Credentials | HttpClient.HttpClient,
  Member
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /GroupMemberships/ListGroupMembers",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      Realm: 0,
      MemberRealm: 0,
      SAMAccountName: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { NextToken: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Members",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns group information for the specified directory.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `ListGroups.NextToken`
 * member contains a token that you pass in the next call to `ListGroups`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResult,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /Groups/ListGroups",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      Realm: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { NextToken: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsForMemberError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns group information for the specified member.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the
 * `ListGroupsForMember.NextToken` member contains a token that you pass in the next
 * call to `ListGroupsForMember`. This retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listGroupsForMember: API.PaginatedOperationMethod<
  ListGroupsForMemberRequest,
  ListGroupsForMemberResult,
  ListGroupsForMemberError,
  Credentials | HttpClient.HttpClient,
  GroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /GroupMemberships/ListGroupsForMember",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      Realm: 0,
      MemberRealm: 0,
      SAMAccountName: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { NextToken: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupsForMember",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns user information for the specified directory.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `ListUsers.NextToken`
 * member contains a token that you pass in the next call to `ListUsers`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResult,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  UserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /Users/ListUsers",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      Realm: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      Users: D.list({ GivenName: D.secret, Surname: D.secret }),
      NextToken: D.secret,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type RemoveGroupMemberError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a member from a group.
 */
export const removeGroupMember: API.OperationMethod<
  RemoveGroupMemberRequest,
  RemoveGroupMemberResult,
  RemoveGroupMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GroupMemberships/RemoveGroupMember",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      GroupName: 0,
      MemberName: 0,
      MemberRealm: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveGroupMember",
})) as any;

export type SearchGroupsError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches the specified directory for a group. You can find groups that match the
 * `SearchString` parameter with the value of their attributes included in the
 * `SearchString` parameter.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `SearchGroups.NextToken`
 * member contains a token that you pass in the next call to `SearchGroups`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const searchGroups: API.PaginatedOperationMethod<
  SearchGroupsRequest,
  SearchGroupsResult,
  SearchGroupsError,
  Credentials | HttpClient.HttpClient,
  Group
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /Groups/SearchGroups",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      SearchString: 0,
      SearchAttributes: 0,
      Realm: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      Groups: D.list({
        DistinguishedName: D.secret,
        OtherAttributes: D.map(o_AttributeValue),
      }),
      NextToken: D.secret,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchUsersError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches the specified directory for a user. You can find users that match the
 * `SearchString` parameter with the value of their attributes included in the
 * `SearchString` parameter.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `SearchUsers.NextToken`
 * member contains a token that you pass in the next call to `SearchUsers`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const searchUsers: API.PaginatedOperationMethod<
  SearchUsersRequest,
  SearchUsersResult,
  SearchUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /Users/SearchUsers",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      Realm: 0,
      SearchString: 0,
      SearchAttributes: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      Users: D.list({
        DistinguishedName: D.secret,
        UserPrincipalName: D.secret,
        EmailAddress: D.secret,
        GivenName: D.secret,
        Surname: D.secret,
        OtherAttributes: D.map(o_AttributeValue),
      }),
      NextToken: D.secret,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type UpdateGroupError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates group information.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResult,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Groups/UpdateGroup",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      SAMAccountName: 0,
      GroupType: 0,
      GroupScope: 0,
      OtherAttributes: D.map(i_AttributeValue),
      UpdateType: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
})) as any;

export type UpdateUserError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates user information.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResult,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Users/UpdateUser",
    input: {
      DirectoryId: D.m({ query: "DirectoryId" }),
      SAMAccountName: 0,
      EmailAddress: 0,
      GivenName: 0,
      Surname: 0,
      OtherAttributes: D.map(i_AttributeValue),
      UpdateType: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
})) as any;

const i_AttributeValue: D.LazyStruct = () => ({ S: 0, N: 0, BOOL: 0, SS: 0 });
const o_AttributeValue: D.LazyStruct = () => ({
  S: D.secret,
  SS: D.list(D.secret),
});
