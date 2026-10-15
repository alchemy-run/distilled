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
const ns = /*@__PURE__*/ T.XmlNamespace(
  "http://directoryservicedata.amazonaws.com/doc/2023-05-31/",
);
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Directory Service Data",
  serviceShapeName: "DirectoryServiceData",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ds-data" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-05-31");
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
              `https://ds-data-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://ds-data-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ds-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ds-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ds-data.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "AccessDeniedReason" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DirectoryUnavailableException
  extends /*@__PURE__*/ S.TaggedError<DirectoryUnavailableException>()(
    "DirectoryUnavailableException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "DirectoryUnavailableReason",
        }),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(400), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type GroupScope = "DomainLocal" | "Global" | "Universal" | "BuiltinLocal" | (string & {});
export type LdapDisplayName = string;
export type StringAttributeValue = string | redacted.Redacted<string>;
export type NumberAttributeValue = number;
export type BooleanAttributeValue = boolean;
export type StringSetAttributeValue = (string | redacted.Redacted<string>)[];
export type AttributeValue =
  | { S: string | redacted.Redacted<string>; N?: never; BOOL?: never; SS?: never }
  | { S?: never; N: number; BOOL?: never; SS?: never }
  | { S?: never; N?: never; BOOL: boolean; SS?: never }
  | { S?: never; N?: never; BOOL?: never; SS: (string | redacted.Redacted<string>)[] };
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
export type AccessDeniedReason = "IAM_AUTH" | "DIRECTORY_AUTH" | "DATA_DISABLED" | (string & {});
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
  input: __S(64, __c16, 0) as any as S.Schema<AddGroupMemberRequest>,
  output: __S(68, __c17, 0) as any as S.Schema<AddGroupMemberResult>,
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
}));

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
  input: __S(72, __c18, 0) as any as S.Schema<CreateGroupRequest>,
  output: __S(73, __c18, 1) as any as S.Schema<CreateGroupResult>,
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
}));

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
  input: __S(80, __c20, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(81, __c20, 1) as any as S.Schema<CreateUserResult>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteGroupRequest>,
  output: __S(68, __c17, 0) as any as S.Schema<DeleteGroupResult>,
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
}));

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
  input: __S(4, __c1, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(68, __c17, 0) as any as S.Schema<DeleteUserResult>,
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
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<DescribeGroupRequest>,
  output: __S(9, __c2, 1) as any as S.Schema<DescribeGroupResult>,
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
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<DescribeUserRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<DescribeUserResult>,
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
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<DisableUserRequest>,
  output: __S(68, __c17, 0) as any as S.Schema<DisableUserResult>,
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
}));

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
  input: __S(24, __c6, 0) as any as S.Schema<ListGroupMembersRequest>,
  output: __S(27, __c6, 3) as any as S.Schema<ListGroupMembersResult>,
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
  input: __S(28, __c7, 0) as any as S.Schema<ListGroupsRequest>,
  output: __S(29, __c7, 1) as any as S.Schema<ListGroupsResult>,
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
  input: __S(36, __c9, 0) as any as S.Schema<ListGroupsForMemberRequest>,
  output: __S(37, __c9, 1) as any as S.Schema<ListGroupsForMemberResult>,
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
  input: __S(40, __c10, 0) as any as S.Schema<ListUsersRequest>,
  output: __S(43, __c10, 3) as any as S.Schema<ListUsersResult>,
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
  input: __S(44, __c11, 0) as any as S.Schema<RemoveGroupMemberRequest>,
  output: __S(68, __c17, 0) as any as S.Schema<RemoveGroupMemberResult>,
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
}));

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
  input: __S(48, __c12, 0) as any as S.Schema<SearchGroupsRequest>,
  output: __S(51, __c12, 3) as any as S.Schema<SearchGroupsResult>,
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
  input: __S(52, __c13, 0) as any as S.Schema<SearchUsersRequest>,
  output: __S(55, __c13, 3) as any as S.Schema<SearchUsersResult>,
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
  input: __S(56, __c14, 0) as any as S.Schema<UpdateGroupRequest>,
  output: __S(68, __c17, 0) as any as S.Schema<UpdateGroupResult>,
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
}));

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
  input: __S(60, __c15, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(68, __c17, 0) as any as S.Schema<UpdateUserResult>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          SAMAccountName: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Groups/DeleteGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGroupRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          SAMAccountName: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Users/DeleteUser" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteUserRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          Realm: S.optional(S.String),
          SAMAccountName: S.String,
          OtherAttributes: S.optional(__S(12, __c3, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Groups/DescribeGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Realm: S.optional(S.String),
          SID: S.optional(S.String),
          SAMAccountName: S.optional(S.String),
          DistinguishedName: S.optional(SensitiveString),
          GroupType: S.optional(S.String),
          GroupScope: S.optional(S.String),
          OtherAttributes: S.optional(__S(78, __c19, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeGroupResult" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          SAMAccountName: S.String,
          OtherAttributes: S.optional(__S(12, __c3, 0)),
          Realm: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Users/DescribeUser" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Realm: S.optional(S.String),
          SID: S.optional(S.String),
          SAMAccountName: S.optional(S.String),
          DistinguishedName: S.optional(SensitiveString),
          UserPrincipalName: S.optional(SensitiveString),
          EmailAddress: S.optional(SensitiveString),
          GivenName: S.optional(SensitiveString),
          Surname: S.optional(SensitiveString),
          Enabled: S.optional(S.Boolean),
          OtherAttributes: S.optional(__S(78, __c19, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeUserResult" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          SAMAccountName: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Users/DisableUser" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableUserRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          Realm: S.optional(S.String),
          MemberRealm: S.optional(S.String),
          SAMAccountName: S.String,
          NextToken: S.optional(SensitiveString),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/GroupMemberships/ListGroupMembers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroupMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SID: S.String, SAMAccountName: S.String, MemberType: S.String }),
      ).annotate({ identifier: "Member" });
    case 2:
      return S.Array(__S(25, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Realm: S.optional(S.String),
          MemberRealm: S.optional(S.String),
          Members: S.optional(__S(26, __c6, 2)),
          NextToken: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "ListGroupMembersResult" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          Realm: S.optional(S.String),
          NextToken: S.optional(SensitiveString),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Groups/ListGroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Realm: S.optional(S.String),
          Groups: S.optional(__S(33, __c8, 1)),
          NextToken: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "ListGroupsResult" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SID: S.String,
          SAMAccountName: S.String,
          GroupType: S.String,
          GroupScope: S.String,
        }),
      ).annotate({ identifier: "GroupSummary" });
    case 1:
      return S.Array(__S(32, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          Realm: S.optional(S.String),
          MemberRealm: S.optional(S.String),
          SAMAccountName: S.String,
          NextToken: S.optional(SensitiveString),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/GroupMemberships/ListGroupsForMember" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroupsForMemberRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Realm: S.optional(S.String),
          MemberRealm: S.optional(S.String),
          Groups: S.optional(__S(33, __c8, 1)),
          NextToken: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "ListGroupsForMemberResult" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          Realm: S.optional(S.String),
          NextToken: S.optional(SensitiveString),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Users/ListUsers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SID: S.String,
          SAMAccountName: S.String,
          GivenName: S.optional(SensitiveString),
          Surname: S.optional(SensitiveString),
          Enabled: S.Boolean,
        }),
      ).annotate({ identifier: "UserSummary" });
    case 2:
      return S.Array(__S(41, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Realm: S.optional(S.String),
          Users: S.optional(__S(42, __c10, 2)),
          NextToken: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "ListUsersResult" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          GroupName: S.String,
          MemberName: S.String,
          MemberRealm: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/GroupMemberships/RemoveGroupMember" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveGroupMemberRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          SearchString: SensitiveString,
          SearchAttributes: __S(12, __c3, 0),
          Realm: S.optional(S.String),
          NextToken: S.optional(SensitiveString),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Groups/SearchGroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SID: S.optional(S.String),
          SAMAccountName: S.String,
          DistinguishedName: S.optional(SensitiveString),
          GroupType: S.optional(S.String),
          GroupScope: S.optional(S.String),
          OtherAttributes: S.optional(__S(78, __c19, 2)),
        }),
      ).annotate({ identifier: "Group" });
    case 2:
      return S.Array(__S(49, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Realm: S.optional(S.String),
          Groups: S.optional(__S(50, __c12, 2)),
          NextToken: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "SearchGroupsResult" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          Realm: S.optional(S.String),
          SearchString: SensitiveString,
          SearchAttributes: __S(12, __c3, 0),
          NextToken: S.optional(SensitiveString),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Users/SearchUsers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SID: S.optional(S.String),
          SAMAccountName: S.String,
          DistinguishedName: S.optional(SensitiveString),
          UserPrincipalName: S.optional(SensitiveString),
          EmailAddress: S.optional(SensitiveString),
          GivenName: S.optional(SensitiveString),
          Surname: S.optional(SensitiveString),
          Enabled: S.optional(S.Boolean),
          OtherAttributes: S.optional(__S(78, __c19, 2)),
        }),
      ).annotate({ identifier: "User" });
    case 2:
      return S.Array(__S(53, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          Realm: S.optional(S.String),
          Users: S.optional(__S(54, __c13, 2)),
          NextToken: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "SearchUsersResult" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          SAMAccountName: S.String,
          GroupType: S.optional(S.String),
          GroupScope: S.optional(S.String),
          OtherAttributes: S.optional(__S(78, __c19, 2)),
          UpdateType: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Groups/UpdateGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGroupRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          SAMAccountName: S.String,
          EmailAddress: S.optional(SensitiveString),
          GivenName: S.optional(SensitiveString),
          Surname: S.optional(SensitiveString),
          OtherAttributes: S.optional(__S(78, __c19, 2)),
          UpdateType: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Users/UpdateUser" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUserRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          GroupName: S.String,
          MemberName: S.String,
          MemberRealm: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/GroupMemberships/AddGroupMember" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddGroupMemberRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddGroupMemberResult",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          SAMAccountName: S.String,
          GroupType: S.optional(S.String),
          GroupScope: S.optional(S.String),
          OtherAttributes: S.optional(__S(78, __c19, 2)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Groups/CreateGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          SAMAccountName: S.optional(S.String),
          SID: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateGroupResult" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ S: SensitiveString }),
        /*@__PURE__*/ S.Struct({ N: S.Number }),
        /*@__PURE__*/ S.Struct({ BOOL: S.Boolean }),
        /*@__PURE__*/ S.Struct({ SS: __S(76, __c19, 0) }),
      ]);
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(77, __c19, 1).pipe(S.optional));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
          SAMAccountName: S.String,
          EmailAddress: S.optional(SensitiveString),
          GivenName: S.optional(SensitiveString),
          Surname: S.optional(SensitiveString),
          OtherAttributes: S.optional(__S(78, __c19, 2)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/Users/CreateUser" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DirectoryId: S.optional(S.String),
          SID: S.optional(S.String),
          SAMAccountName: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateUserResult" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
