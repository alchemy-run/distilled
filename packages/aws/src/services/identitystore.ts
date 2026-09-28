import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "identitystore",
  target: "AWSIdentityStore",
  version: "2020-06-15",
  sigv4: "identitystore",
  protocol: awsJson1_1Protocol,
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
                `https://identitystore-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://identitystore.${Region}.amazonaws.com`);
              }
              return e(
                `https://identitystore-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://identitystore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://identitystore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message?: string;
    readonly RequestId?: string;
    readonly Reason?: ConflictExceptionReason;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly ResourceType?: ResourceType;
    readonly ResourceId?: string;
    readonly Reason?: ResourceNotFoundExceptionReason;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string; readonly RequestId?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly RequestId?: string;
    readonly Reason?: ValidationExceptionReason;
  }> {}
export type IdentityStoreId = string;
export type GroupDisplayName = string | redacted.Redacted<string>;
export type SensitiveStringType = string | redacted.Redacted<string>;
export interface CreateGroupRequest {
  IdentityStoreId: string;
  DisplayName?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
}
export type ResourceId = string;
export interface CreateGroupResponse {
  GroupId: string;
  IdentityStoreId: string;
}
export type MemberId = { UserId: string };
export interface CreateGroupMembershipRequest {
  IdentityStoreId: string;
  GroupId: string;
  MemberId: MemberId;
}
export interface CreateGroupMembershipResponse {
  MembershipId: string;
  IdentityStoreId: string;
}
export type UserName = string | redacted.Redacted<string>;
export interface Name {
  Formatted?: string | redacted.Redacted<string>;
  FamilyName?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  MiddleName?: string | redacted.Redacted<string>;
  HonorificPrefix?: string | redacted.Redacted<string>;
  HonorificSuffix?: string | redacted.Redacted<string>;
}
export interface Email {
  Value?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export type Emails = Email[];
export interface Address {
  StreetAddress?: string | redacted.Redacted<string>;
  Locality?: string | redacted.Redacted<string>;
  Region?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  Country?: string | redacted.Redacted<string>;
  Formatted?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export type Addresses = Address[];
export interface PhoneNumber {
  Value?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export type PhoneNumbers = PhoneNumber[];
export interface Photo {
  Value: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Display?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export type Photos = Photo[];
export interface Role {
  Value?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export type Roles = Role[];
export type ExtensionName = string;
export type AttributeValue = unknown;
export type Extensions = { [key: string]: any | undefined };
export interface CreateUserRequest {
  IdentityStoreId: string;
  UserName?: string | redacted.Redacted<string>;
  Name?: Name;
  DisplayName?: string | redacted.Redacted<string>;
  NickName?: string | redacted.Redacted<string>;
  ProfileUrl?: string | redacted.Redacted<string>;
  Emails?: Email[];
  Addresses?: Address[];
  PhoneNumbers?: PhoneNumber[];
  UserType?: string | redacted.Redacted<string>;
  Title?: string | redacted.Redacted<string>;
  PreferredLanguage?: string | redacted.Redacted<string>;
  Locale?: string | redacted.Redacted<string>;
  Timezone?: string | redacted.Redacted<string>;
  Photos?: Photo[];
  Website?: string | redacted.Redacted<string>;
  Birthdate?: string | redacted.Redacted<string>;
  Roles?: Role[];
  Extensions?: { [key: string]: any | undefined };
}
export interface CreateUserResponse {
  IdentityStoreId: string;
  UserId: string;
}
export interface DeleteGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
}
export interface DeleteGroupResponse {}
export interface DeleteGroupMembershipRequest {
  IdentityStoreId: string;
  MembershipId: string;
}
export interface DeleteGroupMembershipResponse {}
export interface DeleteUserRequest {
  IdentityStoreId: string;
  UserId: string;
}
export interface DeleteUserResponse {}
export interface DescribeGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
}
export type ExternalIdIssuer = string | redacted.Redacted<string>;
export type ExternalIdIdentifier = string | redacted.Redacted<string>;
export interface ExternalId {
  Issuer: string | redacted.Redacted<string>;
  Id: string | redacted.Redacted<string>;
}
export type ExternalIds = ExternalId[];
export type StringType = string;
export interface DescribeGroupResponse {
  GroupId: string;
  DisplayName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
  IdentityStoreId: string;
}
export interface DescribeGroupMembershipRequest {
  IdentityStoreId: string;
  MembershipId: string;
}
export interface DescribeGroupMembershipResponse {
  IdentityStoreId: string;
  MembershipId: string;
  GroupId: string;
  MemberId: MemberId;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
}
export type ExtensionNames = string[];
export interface DescribeUserRequest {
  IdentityStoreId: string;
  UserId: string;
  Extensions?: string[];
}
export type UserStatus = "ENABLED" | "DISABLED" | (string & {});
export interface DescribeUserResponse {
  IdentityStoreId: string;
  UserId: string;
  UserName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Name?: Name;
  DisplayName?: string | redacted.Redacted<string>;
  NickName?: string | redacted.Redacted<string>;
  ProfileUrl?: string | redacted.Redacted<string>;
  Emails?: Email[];
  Addresses?: Address[];
  PhoneNumbers?: PhoneNumber[];
  UserType?: string | redacted.Redacted<string>;
  Title?: string | redacted.Redacted<string>;
  PreferredLanguage?: string | redacted.Redacted<string>;
  Locale?: string | redacted.Redacted<string>;
  Timezone?: string | redacted.Redacted<string>;
  UserStatus?: UserStatus;
  Photos?: Photo[];
  Website?: string | redacted.Redacted<string>;
  Birthdate?: string | redacted.Redacted<string>;
  Roles?: Role[];
  CreatedAt?: Date;
  CreatedBy?: string;
  UpdatedAt?: Date;
  UpdatedBy?: string;
  Extensions?: { [key: string]: any | undefined };
}
export type AttributePath = string;
export interface UniqueAttribute {
  AttributePath: string;
  AttributeValue: any;
}
export type AlternateIdentifier =
  | { ExternalId: ExternalId; UniqueAttribute?: never }
  | { ExternalId?: never; UniqueAttribute: UniqueAttribute };
export interface GetGroupIdRequest {
  IdentityStoreId: string;
  AlternateIdentifier: AlternateIdentifier;
}
export interface GetGroupIdResponse {
  GroupId: string;
  IdentityStoreId: string;
}
export interface GetGroupMembershipIdRequest {
  IdentityStoreId: string;
  GroupId: string;
  MemberId: MemberId;
}
export interface GetGroupMembershipIdResponse {
  MembershipId: string;
  IdentityStoreId: string;
}
export interface GetUserIdRequest {
  IdentityStoreId: string;
  AlternateIdentifier: AlternateIdentifier;
}
export interface GetUserIdResponse {
  IdentityStoreId: string;
  UserId: string;
}
export type GroupIds = string[];
export interface IsMemberInGroupsRequest {
  IdentityStoreId: string;
  MemberId: MemberId;
  GroupIds: string[];
}
export interface GroupMembershipExistenceResult {
  GroupId?: string;
  MemberId?: MemberId;
  MembershipExists?: boolean;
}
export type GroupMembershipExistenceResults = GroupMembershipExistenceResult[];
export interface IsMemberInGroupsResponse {
  Results: GroupMembershipExistenceResult[];
}
export type MaxResults = number;
export type NextToken = string;
export interface ListGroupMembershipsRequest {
  IdentityStoreId: string;
  GroupId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface GroupMembership {
  IdentityStoreId: string;
  MembershipId?: string;
  GroupId?: string;
  MemberId?: MemberId;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
}
export type GroupMemberships = GroupMembership[];
export interface ListGroupMembershipsResponse {
  GroupMemberships: GroupMembership[];
  NextToken?: string;
}
export interface ListGroupMembershipsForMemberRequest {
  IdentityStoreId: string;
  MemberId: MemberId;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListGroupMembershipsForMemberResponse {
  GroupMemberships: GroupMembership[];
  NextToken?: string;
}
export interface Filter {
  AttributePath: string;
  AttributeValue: string | redacted.Redacted<string>;
}
export type Filters = Filter[];
export interface ListGroupsRequest {
  IdentityStoreId: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export interface Group {
  GroupId: string;
  DisplayName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
  IdentityStoreId: string;
}
export type Groups = Group[];
export interface ListGroupsResponse {
  Groups: Group[];
  NextToken?: string;
}
export interface ListUsersRequest {
  IdentityStoreId: string;
  Extensions?: string[];
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export interface User {
  IdentityStoreId: string;
  UserId: string;
  UserName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Name?: Name;
  DisplayName?: string | redacted.Redacted<string>;
  NickName?: string | redacted.Redacted<string>;
  ProfileUrl?: string | redacted.Redacted<string>;
  Emails?: Email[];
  Addresses?: Address[];
  PhoneNumbers?: PhoneNumber[];
  UserType?: string | redacted.Redacted<string>;
  Title?: string | redacted.Redacted<string>;
  PreferredLanguage?: string | redacted.Redacted<string>;
  Locale?: string | redacted.Redacted<string>;
  Timezone?: string | redacted.Redacted<string>;
  UserStatus?: UserStatus;
  Photos?: Photo[];
  Website?: string | redacted.Redacted<string>;
  Birthdate?: string | redacted.Redacted<string>;
  Roles?: Role[];
  CreatedAt?: Date;
  CreatedBy?: string;
  UpdatedAt?: Date;
  UpdatedBy?: string;
  Extensions?: { [key: string]: any | undefined };
}
export type Users = User[];
export interface ListUsersResponse {
  Users: User[];
  NextToken?: string;
}
export interface AttributeOperation {
  AttributePath: string;
  AttributeValue?: any;
}
export type AttributeOperations = AttributeOperation[];
export interface UpdateGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
  Operations: AttributeOperation[];
}
export interface UpdateGroupResponse {}
export interface UpdateUserRequest {
  IdentityStoreId: string;
  UserId: string;
  Operations: AttributeOperation[];
}
export interface UpdateUserResponse {}
export type ExceptionMessage = string;
export type RequestId = string;
export type ConflictExceptionReason =
  | "UNIQUENESS_CONSTRAINT_VIOLATION"
  | "CONCURRENT_MODIFICATION"
  | (string & {});
export type ResourceType =
  | "GROUP"
  | "USER"
  | "IDENTITY_STORE"
  | "GROUP_MEMBERSHIP"
  | "RESOURCE_POLICY"
  | (string & {});
export type ResourceNotFoundExceptionReason =
  | "KMS_KEY_NOT_FOUND"
  | (string & {});
export type ValidationExceptionReason =
  | "KMS_INVALID_ARN"
  | "KMS_INVALID_KEY_USAGE"
  | "KMS_INVALID_STATE"
  | "KMS_DISABLED"
  | (string & {});
export type CreateGroupError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group within the specified identity store.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, DisplayName: 0, Description: 0 },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
})) as any;

export type CreateGroupMembershipError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a relationship between a member and a group. The following identifiers must be specified: `GroupId`, `IdentityStoreId`, and `MemberId`.
 */
export const createGroupMembership: API.OperationMethod<
  CreateGroupMembershipRequest,
  CreateGroupMembershipResponse,
  CreateGroupMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, GroupId: 0, MemberId: i_MemberId },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupMembership",
})) as any;

export type CreateUserError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user within the specified identity store.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IdentityStoreId: 0,
      UserName: 0,
      Name: {
        Formatted: 0,
        FamilyName: 0,
        GivenName: 0,
        MiddleName: 0,
        HonorificPrefix: 0,
        HonorificSuffix: 0,
      },
      DisplayName: 0,
      NickName: 0,
      ProfileUrl: 0,
      Emails: D.list({ Value: 0, Type: 0, Primary: 0 }),
      Addresses: D.list({
        StreetAddress: 0,
        Locality: 0,
        Region: 0,
        PostalCode: 0,
        Country: 0,
        Formatted: 0,
        Type: 0,
        Primary: 0,
      }),
      PhoneNumbers: D.list({ Value: 0, Type: 0, Primary: 0 }),
      UserType: 0,
      Title: 0,
      PreferredLanguage: 0,
      Locale: 0,
      Timezone: 0,
      Photos: D.list({ Value: 0, Type: 0, Display: 0, Primary: 0 }),
      Website: 0,
      Birthdate: 0,
      Roles: D.list({ Value: 0, Type: 0, Primary: 0 }),
      Extensions: 0,
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type DeleteGroupError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete a group within an identity store given `GroupId`.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { IdentityStoreId: 0, GroupId: 0 } },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
})) as any;

export type DeleteGroupMembershipError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete a membership within a group given `MembershipId`.
 */
export const deleteGroupMembership: API.OperationMethod<
  DeleteGroupMembershipRequest,
  DeleteGroupMembershipResponse,
  DeleteGroupMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { IdentityStoreId: 0, MembershipId: 0 } },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroupMembership",
})) as any;

export type DeleteUserError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a user within an identity store given `UserId`.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { IdentityStoreId: 0, UserId: 0 } },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DescribeGroupError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the group metadata and attributes from `GroupId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const describeGroup: API.OperationMethod<
  DescribeGroupRequest,
  DescribeGroupResponse,
  DescribeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, GroupId: 0 },
    output: {
      DisplayName: D.secret,
      ExternalIds: D.list(o_ExternalId),
      Description: D.secret,
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroup",
})) as any;

export type DescribeGroupMembershipError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves membership metadata and attributes from `MembershipId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const describeGroupMembership: API.OperationMethod<
  DescribeGroupMembershipRequest,
  DescribeGroupMembershipResponse,
  DescribeGroupMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, MembershipId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroupMembership",
})) as any;

export type DescribeUserError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the user metadata and attributes from the `UserId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResponse,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, UserId: 0, Extensions: 0 },
    output: {
      UserName: D.secret,
      ExternalIds: D.list(o_ExternalId),
      Name: o_Name,
      DisplayName: D.secret,
      NickName: D.secret,
      ProfileUrl: D.secret,
      Emails: D.list(o_Email),
      Addresses: D.list(o_Address),
      PhoneNumbers: D.list(o_PhoneNumber),
      UserType: D.secret,
      Title: D.secret,
      PreferredLanguage: D.secret,
      Locale: D.secret,
      Timezone: D.secret,
      Photos: D.list(o_Photo),
      Website: D.secret,
      Birthdate: D.secret,
      Roles: D.list(o_Role),
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
})) as any;

export type GetGroupIdError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves `GroupId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const getGroupId: API.OperationMethod<
  GetGroupIdRequest,
  GetGroupIdResponse,
  GetGroupIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, AlternateIdentifier: i_AlternateIdentifier },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupId",
})) as any;

export type GetGroupMembershipIdError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the `MembershipId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const getGroupMembershipId: API.OperationMethod<
  GetGroupMembershipIdRequest,
  GetGroupMembershipIdResponse,
  GetGroupMembershipIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, GroupId: 0, MemberId: i_MemberId },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupMembershipId",
})) as any;

export type GetUserIdError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the `UserId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const getUserId: API.OperationMethod<
  GetUserIdRequest,
  GetUserIdResponse,
  GetUserIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, AlternateIdentifier: i_AlternateIdentifier },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserId",
})) as any;

export type IsMemberInGroupsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Checks the user's membership in all requested groups and returns if the member exists in all queried groups.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const isMemberInGroups: API.OperationMethod<
  IsMemberInGroupsRequest,
  IsMemberInGroupsResponse,
  IsMemberInGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, MemberId: i_MemberId, GroupIds: 0 },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsMemberInGroups",
})) as any;

export type ListGroupMembershipsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * For the specified group in the specified identity store, returns the list of all ` GroupMembership` objects and returns results in paginated form.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listGroupMemberships: API.PaginatedOperationMethod<
  ListGroupMembershipsRequest,
  ListGroupMembershipsResponse,
  ListGroupMembershipsError,
  Credentials | HttpClient.HttpClient,
  GroupMembership
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { IdentityStoreId: 0, GroupId: 0, MaxResults: 0, NextToken: 0 },
    output: { GroupMemberships: D.list(o_GroupMembership) },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupMemberships",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupMemberships",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupMembershipsForMemberError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * For the specified member in the specified identity store, returns the list of all ` GroupMembership` objects and returns results in paginated form.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listGroupMembershipsForMember: API.PaginatedOperationMethod<
  ListGroupMembershipsForMemberRequest,
  ListGroupMembershipsForMemberResponse,
  ListGroupMembershipsForMemberError,
  Credentials | HttpClient.HttpClient,
  GroupMembership
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      IdentityStoreId: 0,
      MemberId: i_MemberId,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { GroupMemberships: D.list(o_GroupMembership) },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupMembershipsForMember",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupMemberships",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all groups in the identity store. Returns a paginated list of complete `Group` objects. Filtering for a `Group` by the `DisplayName` attribute is deprecated. Instead, use the `GetGroupId` API action.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  Group
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      IdentityStoreId: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
    },
    output: {
      Groups: D.list({
        DisplayName: D.secret,
        ExternalIds: D.list(o_ExternalId),
        Description: D.secret,
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
      }),
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
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

export type ListUsersError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all users in the identity store. Returns a paginated list of complete `User` objects. Filtering for a `User` by the `UserName` attribute is deprecated. Instead, use the `GetUserId` API action.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      IdentityStoreId: 0,
      Extensions: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
    },
    output: {
      Users: D.list({
        UserName: D.secret,
        ExternalIds: D.list(o_ExternalId),
        Name: o_Name,
        DisplayName: D.secret,
        NickName: D.secret,
        ProfileUrl: D.secret,
        Emails: D.list(o_Email),
        Addresses: D.list(o_Address),
        PhoneNumbers: D.list(o_PhoneNumber),
        UserType: D.secret,
        Title: D.secret,
        PreferredLanguage: D.secret,
        Locale: D.secret,
        Timezone: D.secret,
        Photos: D.list(o_Photo),
        Website: D.secret,
        Birthdate: D.secret,
        Roles: D.list(o_Role),
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
      }),
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
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

export type UpdateGroupError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified group metadata and attributes in the specified identity store.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResponse,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IdentityStoreId: 0,
      GroupId: 0,
      Operations: D.list(i_AttributeOperation),
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
})) as any;

export type UpdateUserError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified user metadata and attributes in the specified identity store.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IdentityStoreId: 0,
      UserId: 0,
      Operations: D.list(i_AttributeOperation),
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
})) as any;

const i_AlternateIdentifier: D.LazyStruct = () => ({
  ExternalId: { Issuer: 0, Id: 0 },
  UniqueAttribute: { AttributePath: 0, AttributeValue: 0 },
});
const i_AttributeOperation: D.LazyStruct = () => ({
  AttributePath: 0,
  AttributeValue: 0,
});
const i_Filter: D.LazyStruct = () => ({ AttributePath: 0, AttributeValue: 0 });
const i_MemberId: D.LazyStruct = () => ({ UserId: 0 });
const o_Address: D.LazyStruct = () => ({
  StreetAddress: D.secret,
  Locality: D.secret,
  Region: D.secret,
  PostalCode: D.secret,
  Country: D.secret,
  Formatted: D.secret,
  Type: D.secret,
});
const o_Email: D.LazyStruct = () => ({ Value: D.secret, Type: D.secret });
const o_ExternalId: D.LazyStruct = () => ({ Issuer: D.secret, Id: D.secret });
const o_GroupMembership: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
});
const o_Name: D.LazyStruct = () => ({
  Formatted: D.secret,
  FamilyName: D.secret,
  GivenName: D.secret,
  MiddleName: D.secret,
  HonorificPrefix: D.secret,
  HonorificSuffix: D.secret,
});
const o_PhoneNumber: D.LazyStruct = () => ({ Value: D.secret, Type: D.secret });
const o_Photo: D.LazyStruct = () => ({
  Value: D.secret,
  Type: D.secret,
  Display: D.secret,
});
const o_Role: D.LazyStruct = () => ({ Value: D.secret, Type: D.secret });
