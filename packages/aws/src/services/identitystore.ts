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
  sdkId: "identitystore",
  serviceShapeName: "AWSIdentityStore",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "identitystore" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-06-15");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://identitystore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://identitystore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://identitystore.{R}.{D}","properties":{},"headers":{}}');

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ConflictExceptionReason" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      ResourceType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ResourceType" }),
      ),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ResourceNotFoundExceptionReason",
        }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type IdentityStoreId = string;
export type GroupDisplayName = string | redacted.Redacted<string>;
export type SensitiveStringType = string | redacted.Redacted<string>;
export interface CreateGroupRequest {
  IdentityStoreId: string;
  DisplayName?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
}
export type ResourceId = string;
export type ResourceArn = string;
export type ResourceRevision = string;
export interface CreateGroupResponse {
  IdentityStoreId: string;
  GroupId: string;
  GroupArn: string;
  Revision: string;
}
export type MemberId = { UserId: string };
export interface CreateGroupMembershipRequest {
  IdentityStoreId: string;
  GroupId: string;
  MemberId: MemberId;
}
export interface CreateGroupMembershipResponse {
  IdentityStoreId: string;
  MembershipId: string;
  MembershipArn: string;
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
  UserArn: string;
  Revision: string;
}
export interface DeleteGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
  Revision?: string;
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
  Revision?: string;
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
  IdentityStoreId: string;
  GroupId: string;
  GroupArn: string;
  Revision: string;
  DisplayName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
}
export interface DescribeGroupMembershipRequest {
  IdentityStoreId: string;
  MembershipId: string;
}
export interface DescribeGroupMembershipResponse {
  IdentityStoreId: string;
  MembershipId: string;
  MembershipArn: string;
  GroupId: string;
  MemberId: MemberId;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
}
export interface DescribeIdentityStoreRequest {
  IdentityStoreId: string;
}
export type IdentityStoreArn = string;
export type VpcIdType = string;
export type VpcIdList = string[];
export type IpCidrType = string;
export type IpCidrList = string[];
export interface NetworkConfigurationDetails {
  VpceAccessRequired: boolean;
  ApiRestrictSourceVpcs?: string[];
  ApiAllowSourceIps?: string[];
  ScimAllowSourceIps?: string[];
}
export interface DescribeIdentityStoreResponse {
  IdentityStoreId: string;
  IdentityStoreArn: string;
  NetworkConfiguration?: NetworkConfigurationDetails;
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
  UserArn: string;
  Revision: string;
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
  IdentityStoreId: string;
  GroupId: string;
  GroupArn: string;
}
export interface GetGroupMembershipIdRequest {
  IdentityStoreId: string;
  GroupId: string;
  MemberId: MemberId;
}
export interface GetGroupMembershipIdResponse {
  IdentityStoreId: string;
  MembershipId: string;
  MembershipArn: string;
}
export interface GetUserIdRequest {
  IdentityStoreId: string;
  AlternateIdentifier: AlternateIdentifier;
}
export interface GetUserIdResponse {
  IdentityStoreId: string;
  UserId: string;
  UserArn: string;
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
  MembershipId: string;
  MembershipArn: string;
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
  IdentityStoreId: string;
  GroupId: string;
  GroupArn: string;
  Revision: string;
  DisplayName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
}
export type Groups = Group[];
export interface ListGroupsResponse {
  Groups: Group[];
  NextToken?: string;
}
export interface ListIdentityStoresRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface IdentityStore {
  IdentityStoreId: string;
  IdentityStoreArn: string;
}
export type IdentityStores = IdentityStore[];
export interface ListIdentityStoresResponse {
  IdentityStores: IdentityStore[];
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
  UserArn: string;
  Revision: string;
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
  Revision?: string;
}
export interface UpdateGroupResponse {
  IdentityStoreId: string;
  GroupId: string;
  GroupArn: string;
  Revision: string;
}
export interface NetworkConfiguration {
  VpceAccessRequired: boolean;
  ApiRestrictSourceVpcs?: string[];
  ApiAllowSourceIps?: string[];
  ScimAllowSourceIps?: string[];
}
export interface UpdateIdentityStoreRequest {
  IdentityStoreId: string;
  NetworkConfiguration?: NetworkConfiguration;
}
export interface UpdateIdentityStoreResponse {
  IdentityStoreId: string;
  IdentityStoreArn: string;
}
export interface UpdateUserRequest {
  IdentityStoreId: string;
  UserId: string;
  Operations: AttributeOperation[];
  Revision?: string;
}
export interface UpdateUserResponse {
  IdentityStoreId: string;
  UserId: string;
  UserArn: string;
  Revision: string;
}
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
export type ResourceNotFoundExceptionReason = "KMS_KEY_NOT_FOUND" | (string & {});
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
  input: __S(216, __c27, 0) as any as S.Schema<CreateGroupRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<CreateGroupResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<CreateGroupMembershipRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<CreateGroupMembershipResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupMembership",
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(272, __c34, 0) as any as S.Schema<CreateUserResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

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
  input: __S(280, __c35, 0) as any as S.Schema<DeleteGroupRequest>,
  output: __S(288, __c36, 0) as any as S.Schema<DeleteGroupResponse>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<DeleteGroupMembershipRequest>,
  output: __S(288, __c36, 0) as any as S.Schema<DeleteGroupMembershipResponse>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroupMembership",
}));

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
  input: __S(304, __c38, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(288, __c36, 0) as any as S.Schema<DeleteUserResponse>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DescribeGroupError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(0, __c0, 0) as any as S.Schema<DescribeGroupRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DescribeGroupResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroup",
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<DescribeGroupMembershipRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<DescribeGroupMembershipResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroupMembership",
}));

export type DescribeIdentityStoreError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about the specified identity store, including its Amazon Resource Name (ARN) and network configuration.
 */
export const describeIdentityStore: API.OperationMethod<
  DescribeIdentityStoreRequest,
  DescribeIdentityStoreResponse,
  DescribeIdentityStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DescribeIdentityStoreRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<DescribeIdentityStoreResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityStore",
}));

export type DescribeUserError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(64, __c8, 0) as any as S.Schema<DescribeUserRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<DescribeUserResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
}));

export type GetGroupIdError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(80, __c10, 0) as any as S.Schema<GetGroupIdRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<GetGroupIdResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupId",
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<GetGroupMembershipIdRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<GetGroupMembershipIdResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupMembershipId",
}));

export type GetUserIdError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(104, __c13, 0) as any as S.Schema<GetUserIdRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<GetUserIdResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserId",
}));

export type IsMemberInGroupsError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(112, __c14, 0) as any as S.Schema<IsMemberInGroupsRequest>,
  output: __S(115, __c14, 3) as any as S.Schema<IsMemberInGroupsResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsMemberInGroups",
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<ListGroupMembershipsRequest>,
  output: __S(130, __c16, 2) as any as S.Schema<ListGroupMembershipsResponse>,
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
  input: __S(136, __c17, 0) as any as S.Schema<ListGroupMembershipsForMemberRequest>,
  output: __S(130, __c16, 2) as any as S.Schema<ListGroupMembershipsForMemberResponse>,
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

export type ListGroupsError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(144, __c18, 0) as any as S.Schema<ListGroupsRequest>,
  output: __S(146, __c18, 2) as any as S.Schema<ListGroupsResponse>,
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

export type ListIdentityStoresError = ValidationException | CommonErrors;
/**
 * Lists the identity stores that you have access to. This operation returns only the identity store ID and Amazon Resource Name (ARN) of each identity store. To obtain additional information about an identity store, call `DescribeIdentityStore`.
 *
 * This operation returns results in paginated form. Use the `NextToken` parameter to retrieve additional pages of results.
 */
export const listIdentityStores: API.PaginatedOperationMethod<
  ListIdentityStoresRequest,
  ListIdentityStoresResponse,
  ListIdentityStoresError,
  Credentials | HttpClient.HttpClient,
  IdentityStore
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<ListIdentityStoresRequest>,
  output: __S(162, __c20, 2) as any as S.Schema<ListIdentityStoresResponse>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityStores",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IdentityStores",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(176, __c22, 0) as any as S.Schema<ListUsersRequest>,
  output: __S(178, __c22, 2) as any as S.Schema<ListUsersResponse>,
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
  input: __S(184, __c23, 0) as any as S.Schema<UpdateGroupRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<UpdateGroupResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateIdentityStoreError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of the specified identity store, including its network configuration.
 */
export const updateIdentityStore: API.OperationMethod<
  UpdateIdentityStoreRequest,
  UpdateIdentityStoreResponse,
  UpdateIdentityStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<UpdateIdentityStoreRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<UpdateIdentityStoreResponse>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityStore",
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(272, __c34, 0) as any as S.Schema<UpdateUserResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
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
        S.Struct({ IdentityStoreId: S.String, GroupId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeGroupRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Issuer: SensitiveString, Id: SensitiveString })).annotate({
        identifier: "ExternalId",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(8, __c1, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          GroupId: S.String,
          GroupArn: S.String,
          Revision: S.String,
          DisplayName: S.optional(SensitiveString),
          ExternalIds: S.optional(__S(16, __c2, 0)),
          Description: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          UpdatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeGroupResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityStoreId: S.String, MembershipId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeGroupMembershipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          MembershipId: S.String,
          MembershipArn: S.String,
          GroupId: S.String,
          MemberId: __S(240, __c30, 0),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          UpdatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeGroupMembershipResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityStoreId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeIdentityStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          IdentityStoreArn: S.String,
          NetworkConfiguration: S.optional(__S(56, __c7, 0)),
        }),
      ).annotate({ identifier: "DescribeIdentityStoreResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpceAccessRequired: S.Boolean,
          ApiRestrictSourceVpcs: S.optional(__S(48, __c6, 0)),
          ApiAllowSourceIps: S.optional(__S(48, __c6, 0)),
          ScimAllowSourceIps: S.optional(__S(48, __c6, 0)),
        }),
      ).annotate({ identifier: "NetworkConfigurationDetails" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          UserId: S.String,
          Extensions: S.optional(__S(48, __c6, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeUserRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          UserId: S.String,
          UserArn: S.String,
          Revision: S.String,
          UserName: S.optional(SensitiveString),
          ExternalIds: S.optional(__S(16, __c2, 0)),
          Name: S.optional(__S(264, __c33, 0)),
          DisplayName: S.optional(SensitiveString),
          NickName: S.optional(SensitiveString),
          ProfileUrl: S.optional(SensitiveString),
          Emails: S.optional(__S(266, __c33, 2)),
          Addresses: S.optional(__S(268, __c33, 4)),
          PhoneNumbers: S.optional(__S(266, __c33, 2)),
          UserType: S.optional(SensitiveString),
          Title: S.optional(SensitiveString),
          PreferredLanguage: S.optional(SensitiveString),
          Locale: S.optional(SensitiveString),
          Timezone: S.optional(SensitiveString),
          UserStatus: S.optional(S.String),
          Photos: S.optional(__S(270, __c33, 6)),
          Website: S.optional(SensitiveString),
          Birthdate: S.optional(SensitiveString),
          Roles: S.optional(__S(266, __c33, 2)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedBy: S.optional(S.String),
          Extensions: S.optional(__S(271, __c33, 7)),
        }),
      ).annotate({ identifier: "DescribeUserResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityStoreId: S.String, AlternateIdentifier: __S(89, __c11, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGroupIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IdentityStoreId: S.String, GroupId: S.String, GroupArn: S.String }),
      ).annotate({ identifier: "GetGroupIdResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AttributePath: S.String, AttributeValue: S.Any })).annotate(
        { identifier: "UniqueAttribute" },
      );
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ExternalId: __S(8, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ UniqueAttribute: __S(88, __c11, 0) }),
      ]);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          GroupId: S.String,
          MemberId: __S(240, __c30, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetGroupMembershipIdRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityStoreId: S.String, AlternateIdentifier: __S(89, __c11, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUserIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IdentityStoreId: S.String, UserId: S.String, UserArn: S.String }),
      ).annotate({ identifier: "GetUserIdResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          MemberId: __S(240, __c30, 0),
          GroupIds: __S(48, __c6, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "IsMemberInGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GroupId: S.optional(S.String),
          MemberId: S.optional(__S(240, __c30, 0)),
          MembershipExists: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GroupMembershipExistenceResult" });
    case 2:
      return S.Array(__S(113, __c14, 1));
    case 3:
      return S.suspend(() => S.Struct({ Results: __S(114, __c14, 2) })).annotate({
        identifier: "IsMemberInGroupsResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          GroupId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGroupMembershipsRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          MembershipId: S.String,
          MembershipArn: S.String,
          GroupId: S.optional(S.String),
          MemberId: S.optional(__S(240, __c30, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          UpdatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GroupMembership" });
    case 1:
      return S.Array(__S(128, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ GroupMemberships: __S(129, __c16, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGroupMembershipsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          MemberId: __S(240, __c30, 0),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGroupMembershipsForMemberRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(153, __c19, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGroupsRequest" });
    case 1:
      return S.Array(__S(24, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Groups: __S(145, __c18, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGroupsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttributePath: S.String, AttributeValue: SensitiveString }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(152, __c19, 0));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIdentityStoresRequest" });
    case 1:
      return S.Array(__S(168, __c21, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ IdentityStores: __S(161, __c20, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIdentityStoresResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityStoreId: S.String, IdentityStoreArn: S.String }),
      ).annotate({ identifier: "IdentityStore" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          Extensions: S.optional(__S(48, __c6, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(153, __c19, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUsersRequest" });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Users: __S(177, __c22, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUsersResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          GroupId: S.String,
          Operations: __S(193, __c24, 1),
          Revision: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGroupRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttributePath: S.String, AttributeValue: S.optional(S.Any) }),
      ).annotate({ identifier: "AttributeOperation" });
    case 1:
      return S.Array(__S(192, __c24, 0));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          NetworkConfiguration: S.optional(__S(56, __c7, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateIdentityStoreRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          UserId: S.String,
          Operations: __S(193, __c24, 1),
          Revision: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUserRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          DisplayName: S.optional(SensitiveString),
          Description: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGroupRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          GroupId: S.String,
          GroupArn: S.String,
          Revision: S.String,
        }),
      ).annotate({ identifier: "CreateGroupResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          GroupId: S.String,
          MemberId: __S(240, __c30, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGroupMembershipRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ UserId: S.String })]);
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityStoreId: S.String, MembershipId: S.String, MembershipArn: S.String }),
      ).annotate({ identifier: "CreateGroupMembershipResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          UserName: S.optional(SensitiveString),
          Name: S.optional(__S(264, __c33, 0)),
          DisplayName: S.optional(SensitiveString),
          NickName: S.optional(SensitiveString),
          ProfileUrl: S.optional(SensitiveString),
          Emails: S.optional(__S(266, __c33, 2)),
          Addresses: S.optional(__S(268, __c33, 4)),
          PhoneNumbers: S.optional(__S(266, __c33, 2)),
          UserType: S.optional(SensitiveString),
          Title: S.optional(SensitiveString),
          PreferredLanguage: S.optional(SensitiveString),
          Locale: S.optional(SensitiveString),
          Timezone: S.optional(SensitiveString),
          Photos: S.optional(__S(270, __c33, 6)),
          Website: S.optional(SensitiveString),
          Birthdate: S.optional(SensitiveString),
          Roles: S.optional(__S(266, __c33, 2)),
          Extensions: S.optional(__S(271, __c33, 7)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Formatted: S.optional(SensitiveString),
          FamilyName: S.optional(SensitiveString),
          GivenName: S.optional(SensitiveString),
          MiddleName: S.optional(SensitiveString),
          HonorificPrefix: S.optional(SensitiveString),
          HonorificSuffix: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Name" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(SensitiveString),
          Type: S.optional(SensitiveString),
          Primary: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Email" });
    case 2:
      return S.Array(__S(265, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StreetAddress: S.optional(SensitiveString),
          Locality: S.optional(SensitiveString),
          Region: S.optional(SensitiveString),
          PostalCode: S.optional(SensitiveString),
          Country: S.optional(SensitiveString),
          Formatted: S.optional(SensitiveString),
          Type: S.optional(SensitiveString),
          Primary: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Address" });
    case 4:
      return S.Array(__S(267, __c33, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Value: SensitiveString,
          Type: S.optional(SensitiveString),
          Display: S.optional(SensitiveString),
          Primary: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Photo" });
    case 6:
      return S.Array(__S(269, __c33, 5));
    case 7:
      return S.Record(S.String, /*@__PURE__*/ S.Any.pipe(S.optional));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          UserId: S.String,
          UserArn: S.String,
          Revision: S.String,
        }),
      ).annotate({ identifier: "CreateUserResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          GroupId: S.String,
          Revision: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteGroupRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteGroupResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IdentityStoreId: S.String, MembershipId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGroupMembershipRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityStoreId: S.String,
          UserId: S.String,
          Revision: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteUserRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
