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
  sdkId: "WorkDocs",
  target: "AWSGorillaBoyService",
  version: "2016-05-01",
  sigv4: "workdocs",
  protocol: restJson1Protocol,
  xmlns: "https://aws.amazon.com/api/v1/",
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
                `https://workdocs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://workdocs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://workdocs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://workdocs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ConflictingOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictingOperationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class CustomMetadataLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomMetadataLimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class DeactivatingLastSystemUserException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeactivatingLastSystemUserException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class DocumentLockedForCommentsException
  extends /*@__PURE__*/ TE.TaggedError(
    "DocumentLockedForCommentsException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class DraftUploadOutOfSyncException
  extends /*@__PURE__*/ TE.TaggedError(
    "DraftUploadOutOfSyncException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class EntityAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "EntityAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class EntityNotExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "EntityNotExistsException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly EntityIds?: string[] }> {}
export class FailedDependencyException
  extends /*@__PURE__*/ TE.TaggedError("FailedDependencyException", [], {
    status: 424,
  })<{ readonly message?: string }> {}
export class IllegalUserStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "IllegalUserStateException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidCommentOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCommentOperationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidOperationException",
    ["BadRequestError"],
    { status: 405 },
  )<{ readonly message?: string }> {}
export class InvalidPasswordException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPasswordException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ProhibitedStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "ProhibitedStateException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class RequestedEntityTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestedEntityTooLargeException",
    ["BadRequestError"],
    { status: 413 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyCheckedOutException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyCheckedOutException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class StorageLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "StorageLimitExceededException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class StorageLimitWillExceedException
  extends /*@__PURE__*/ TE.TaggedError(
    "StorageLimitWillExceedException",
    ["BadRequestError"],
    { status: 413 },
  )<{ readonly message?: string }> {}
export class TooManyLabelsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyLabelsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManySubscriptionsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManySubscriptionsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthorizedOperationException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class UnauthorizedResourceAccessException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthorizedResourceAccessException",
    ["BadRequestError", "AuthError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type AuthenticationHeaderType = string | redacted.Redacted<string>;
export type ResourceIdType = string;
export type DocumentVersionIdType = string;
export interface AbortDocumentVersionUploadRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
}
export interface AbortDocumentVersionUploadResponse {}
export type IdType = string;
export interface ActivateUserRequest {
  UserId: string;
  AuthenticationToken?: string | redacted.Redacted<string>;
}
export type UsernameType = string | redacted.Redacted<string>;
export type EmailAddressType = string | redacted.Redacted<string>;
export type UserAttributeValueType = string | redacted.Redacted<string>;
export type UserStatusType = "ACTIVE" | "INACTIVE" | "PENDING" | (string & {});
export type UserType =
  | "USER"
  | "ADMIN"
  | "POWERUSER"
  | "MINIMALUSER"
  | "WORKSPACESUSER"
  | (string & {});
export type TimeZoneIdType = string;
export type LocaleType =
  | "en"
  | "fr"
  | "ko"
  | "de"
  | "es"
  | "ja"
  | "ru"
  | "zh_CN"
  | "zh_TW"
  | "pt_BR"
  | "default"
  | (string & {});
export type SizeType = number;
export type PositiveSizeType = number;
export type StorageType = "UNLIMITED" | "QUOTA" | (string & {});
export interface StorageRuleType {
  StorageAllocatedInBytes?: number;
  StorageType?: StorageType;
}
export interface UserStorageMetadata {
  StorageUtilizedInBytes?: number;
  StorageRule?: StorageRuleType;
}
export interface User {
  Id?: string;
  Username?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  OrganizationId?: string;
  RootFolderId?: string;
  RecycleBinFolderId?: string;
  Status?: UserStatusType;
  Type?: UserType;
  CreatedTimestamp?: Date;
  ModifiedTimestamp?: Date;
  TimeZoneId?: string;
  Locale?: LocaleType;
  Storage?: UserStorageMetadata;
}
export interface ActivateUserResponse {
  User?: User;
}
export type PrincipalType =
  | "USER"
  | "GROUP"
  | "INVITE"
  | "ANONYMOUS"
  | "ORGANIZATION"
  | (string & {});
export type RoleType =
  | "VIEWER"
  | "CONTRIBUTOR"
  | "OWNER"
  | "COOWNER"
  | (string & {});
export interface SharePrincipal {
  Id: string;
  Type: PrincipalType;
  Role: RoleType;
}
export type SharePrincipalList = SharePrincipal[];
export type MessageType = string | redacted.Redacted<string>;
export interface NotificationOptions {
  SendEmail?: boolean;
  EmailMessage?: string | redacted.Redacted<string>;
}
export interface AddResourcePermissionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  Principals: SharePrincipal[];
  NotificationOptions?: NotificationOptions;
}
export type ShareStatusType = "SUCCESS" | "FAILURE" | (string & {});
export interface ShareResult {
  PrincipalId?: string;
  InviteePrincipalId?: string;
  Role?: RoleType;
  Status?: ShareStatusType;
  ShareId?: string;
  StatusMessage?: string | redacted.Redacted<string>;
}
export type ShareResultsList = ShareResult[];
export interface AddResourcePermissionsResponse {
  ShareResults?: ShareResult[];
}
export type CommentIdType = string;
export type CommentTextType = string | redacted.Redacted<string>;
export type CommentVisibilityType = "PUBLIC" | "PRIVATE" | (string & {});
export interface CreateCommentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  ParentId?: string;
  ThreadId?: string;
  Text: string | redacted.Redacted<string>;
  Visibility?: CommentVisibilityType;
  NotifyCollaborators?: boolean;
}
export type CommentStatusType =
  | "DRAFT"
  | "PUBLISHED"
  | "DELETED"
  | (string & {});
export interface Comment {
  CommentId: string;
  ParentId?: string;
  ThreadId?: string;
  Text?: string | redacted.Redacted<string>;
  Contributor?: User;
  CreatedTimestamp?: Date;
  Status?: CommentStatusType;
  Visibility?: CommentVisibilityType;
  RecipientId?: string;
}
export interface CreateCommentResponse {
  Comment?: Comment;
}
export type CustomMetadataKeyType = string;
export type CustomMetadataValueType = string;
export type CustomMetadataMap = { [key: string]: string | undefined };
export interface CreateCustomMetadataRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  VersionId?: string;
  CustomMetadata: { [key: string]: string | undefined };
}
export interface CreateCustomMetadataResponse {}
export type ResourceNameType = string | redacted.Redacted<string>;
export interface CreateFolderRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  ParentFolderId: string;
}
export type ResourceStateType =
  | "ACTIVE"
  | "RESTORING"
  | "RECYCLING"
  | "RECYCLED"
  | (string & {});
export type HashType = string;
export type SharedLabel = string;
export type SharedLabels = string[];
export interface FolderMetadata {
  Id?: string;
  Name?: string | redacted.Redacted<string>;
  CreatorId?: string;
  ParentFolderId?: string;
  CreatedTimestamp?: Date;
  ModifiedTimestamp?: Date;
  ResourceState?: ResourceStateType;
  Signature?: string;
  Labels?: string[];
  Size?: number;
  LatestVersionSize?: number;
}
export interface CreateFolderResponse {
  Metadata?: FolderMetadata;
}
export interface CreateLabelsRequest {
  ResourceId: string;
  Labels: string[];
  AuthenticationToken?: string | redacted.Redacted<string>;
}
export interface CreateLabelsResponse {}
export type SubscriptionEndPointType = string;
export type SubscriptionProtocolType = "HTTPS" | "SQS" | (string & {});
export type SubscriptionType = "ALL" | (string & {});
export interface CreateNotificationSubscriptionRequest {
  OrganizationId: string;
  Endpoint: string;
  Protocol: SubscriptionProtocolType;
  SubscriptionType: SubscriptionType;
}
export interface Subscription {
  SubscriptionId?: string;
  EndPoint?: string;
  Protocol?: SubscriptionProtocolType;
}
export interface CreateNotificationSubscriptionResponse {
  Subscription?: Subscription;
}
export type PasswordType = string | redacted.Redacted<string>;
export interface CreateUserRequest {
  OrganizationId?: string;
  Username: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName: string | redacted.Redacted<string>;
  Surname: string | redacted.Redacted<string>;
  Password: string | redacted.Redacted<string>;
  TimeZoneId?: string;
  StorageRule?: StorageRuleType;
  AuthenticationToken?: string | redacted.Redacted<string>;
}
export interface CreateUserResponse {
  User?: User;
}
export interface DeactivateUserRequest {
  UserId: string;
  AuthenticationToken?: string | redacted.Redacted<string>;
}
export interface DeactivateUserResponse {}
export interface DeleteCommentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  CommentId: string;
}
export interface DeleteCommentResponse {}
export type CustomMetadataKeyList = string[];
export interface DeleteCustomMetadataRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  VersionId?: string;
  Keys?: string[];
  DeleteAll?: boolean;
}
export interface DeleteCustomMetadataResponse {}
export interface DeleteDocumentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
}
export interface DeleteDocumentResponse {}
export interface DeleteDocumentVersionRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  DeletePriorVersions: boolean;
}
export interface DeleteDocumentVersionResponse {}
export interface DeleteFolderRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
}
export interface DeleteFolderResponse {}
export interface DeleteFolderContentsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
}
export interface DeleteFolderContentsResponse {}
export interface DeleteLabelsRequest {
  ResourceId: string;
  AuthenticationToken?: string | redacted.Redacted<string>;
  Labels?: string[];
  DeleteAll?: boolean;
}
export interface DeleteLabelsResponse {}
export interface DeleteNotificationSubscriptionRequest {
  SubscriptionId: string;
  OrganizationId: string;
}
export interface DeleteNotificationSubscriptionResponse {}
export interface DeleteUserRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  UserId: string;
}
export interface DeleteUserResponse {}
export type ActivityNamesFilterType = string;
export type LimitType = number;
export type SearchMarkerType = string;
export interface DescribeActivitiesRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  StartTime?: Date;
  EndTime?: Date;
  OrganizationId?: string;
  ActivityTypes?: string;
  ResourceId?: string;
  UserId?: string;
  IncludeIndirectActivities?: boolean;
  Limit?: number;
  Marker?: string;
}
export type ActivityType =
  | "DOCUMENT_CHECKED_IN"
  | "DOCUMENT_CHECKED_OUT"
  | "DOCUMENT_RENAMED"
  | "DOCUMENT_VERSION_UPLOADED"
  | "DOCUMENT_VERSION_DELETED"
  | "DOCUMENT_VERSION_VIEWED"
  | "DOCUMENT_VERSION_DOWNLOADED"
  | "DOCUMENT_RECYCLED"
  | "DOCUMENT_RESTORED"
  | "DOCUMENT_REVERTED"
  | "DOCUMENT_SHARED"
  | "DOCUMENT_UNSHARED"
  | "DOCUMENT_SHARE_PERMISSION_CHANGED"
  | "DOCUMENT_SHAREABLE_LINK_CREATED"
  | "DOCUMENT_SHAREABLE_LINK_REMOVED"
  | "DOCUMENT_SHAREABLE_LINK_PERMISSION_CHANGED"
  | "DOCUMENT_MOVED"
  | "DOCUMENT_COMMENT_ADDED"
  | "DOCUMENT_COMMENT_DELETED"
  | "DOCUMENT_ANNOTATION_ADDED"
  | "DOCUMENT_ANNOTATION_DELETED"
  | "FOLDER_CREATED"
  | "FOLDER_DELETED"
  | "FOLDER_RENAMED"
  | "FOLDER_RECYCLED"
  | "FOLDER_RESTORED"
  | "FOLDER_SHARED"
  | "FOLDER_UNSHARED"
  | "FOLDER_SHARE_PERMISSION_CHANGED"
  | "FOLDER_SHAREABLE_LINK_CREATED"
  | "FOLDER_SHAREABLE_LINK_REMOVED"
  | "FOLDER_SHAREABLE_LINK_PERMISSION_CHANGED"
  | "FOLDER_MOVED"
  | (string & {});
export interface UserMetadata {
  Id?: string;
  Username?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
}
export type UserMetadataList = UserMetadata[];
export type GroupNameType = string;
export interface GroupMetadata {
  Id?: string;
  Name?: string;
}
export type GroupMetadataList = GroupMetadata[];
export interface Participants {
  Users?: UserMetadata[];
  Groups?: GroupMetadata[];
}
export type ResourceType = "FOLDER" | "DOCUMENT" | (string & {});
export interface ResourceMetadata {
  Type?: ResourceType;
  Name?: string | redacted.Redacted<string>;
  OriginalName?: string | redacted.Redacted<string>;
  Id?: string;
  VersionId?: string;
  Owner?: UserMetadata;
  ParentId?: string;
}
export interface CommentMetadata {
  CommentId?: string;
  Contributor?: User;
  CreatedTimestamp?: Date;
  CommentStatus?: CommentStatusType;
  RecipientId?: string;
  ContributorId?: string;
}
export interface Activity {
  Type?: ActivityType;
  TimeStamp?: Date;
  IsIndirectActivity?: boolean;
  OrganizationId?: string;
  Initiator?: UserMetadata;
  Participants?: Participants;
  ResourceMetadata?: ResourceMetadata;
  OriginalParent?: ResourceMetadata;
  CommentMetadata?: CommentMetadata;
}
export type UserActivities = Activity[];
export interface DescribeActivitiesResponse {
  UserActivities?: Activity[];
  Marker?: string;
}
export type MarkerType = string;
export interface DescribeCommentsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  Limit?: number;
  Marker?: string;
}
export type CommentList = Comment[];
export interface DescribeCommentsResponse {
  Comments?: Comment[];
  Marker?: string;
}
export type PageMarkerType = string;
export type FieldNamesType = string;
export interface DescribeDocumentVersionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  Marker?: string;
  Limit?: number;
  Include?: string;
  Fields?: string;
}
export type DocumentContentType = string;
export type DocumentStatusType = "INITIALIZED" | "ACTIVE" | (string & {});
export type DocumentThumbnailType =
  | "SMALL"
  | "SMALL_HQ"
  | "LARGE"
  | (string & {});
export type UrlType = string | redacted.Redacted<string>;
export type DocumentThumbnailUrlMap = {
  [key in DocumentThumbnailType]?: string | redacted.Redacted<string>;
};
export type DocumentSourceType = "ORIGINAL" | "WITH_COMMENTS" | (string & {});
export type DocumentSourceUrlMap = {
  [key in DocumentSourceType]?: string | redacted.Redacted<string>;
};
export interface DocumentVersionMetadata {
  Id?: string;
  Name?: string | redacted.Redacted<string>;
  ContentType?: string;
  Size?: number;
  Signature?: string;
  Status?: DocumentStatusType;
  CreatedTimestamp?: Date;
  ModifiedTimestamp?: Date;
  ContentCreatedTimestamp?: Date;
  ContentModifiedTimestamp?: Date;
  CreatorId?: string;
  Thumbnail?: { [key: string]: string | redacted.Redacted<string> | undefined };
  Source?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type DocumentVersionMetadataList = DocumentVersionMetadata[];
export interface DescribeDocumentVersionsResponse {
  DocumentVersions?: DocumentVersionMetadata[];
  Marker?: string;
}
export type ResourceSortType = "DATE" | "NAME" | (string & {});
export type OrderType = "ASCENDING" | "DESCENDING" | (string & {});
export type FolderContentType = "ALL" | "DOCUMENT" | "FOLDER" | (string & {});
export interface DescribeFolderContentsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
  Sort?: ResourceSortType;
  Order?: OrderType;
  Limit?: number;
  Marker?: string;
  Type?: FolderContentType;
  Include?: string;
}
export type FolderMetadataList = FolderMetadata[];
export interface DocumentMetadata {
  Id?: string;
  CreatorId?: string;
  ParentFolderId?: string;
  CreatedTimestamp?: Date;
  ModifiedTimestamp?: Date;
  LatestVersionMetadata?: DocumentVersionMetadata;
  ResourceState?: ResourceStateType;
  Labels?: string[];
}
export type DocumentMetadataList = DocumentMetadata[];
export interface DescribeFolderContentsResponse {
  Folders?: FolderMetadata[];
  Documents?: DocumentMetadata[];
  Marker?: string;
}
export type SearchQueryType = string | redacted.Redacted<string>;
export type PositiveIntegerType = number;
export interface DescribeGroupsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  SearchQuery: string | redacted.Redacted<string>;
  OrganizationId?: string;
  Marker?: string;
  Limit?: number;
}
export interface DescribeGroupsResponse {
  Groups?: GroupMetadata[];
  Marker?: string;
}
export interface DescribeNotificationSubscriptionsRequest {
  OrganizationId: string;
  Marker?: string;
  Limit?: number;
}
export type SubscriptionList = Subscription[];
export interface DescribeNotificationSubscriptionsResponse {
  Subscriptions?: Subscription[];
  Marker?: string;
}
export interface DescribeResourcePermissionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  PrincipalId?: string;
  Limit?: number;
  Marker?: string;
}
export type RolePermissionType = "DIRECT" | "INHERITED" | (string & {});
export interface PermissionInfo {
  Role?: RoleType;
  Type?: RolePermissionType;
}
export type PermissionInfoList = PermissionInfo[];
export interface Principal {
  Id?: string;
  Type?: PrincipalType;
  Roles?: PermissionInfo[];
}
export type PrincipalList = Principal[];
export interface DescribeResourcePermissionsResponse {
  Principals?: Principal[];
  Marker?: string;
}
export interface DescribeRootFoldersRequest {
  AuthenticationToken: string | redacted.Redacted<string>;
  Limit?: number;
  Marker?: string;
}
export interface DescribeRootFoldersResponse {
  Folders?: FolderMetadata[];
  Marker?: string;
}
export type UserIdsType = string;
export type UserFilterType = "ALL" | "ACTIVE_PENDING" | (string & {});
export type UserSortType =
  | "USER_NAME"
  | "FULL_NAME"
  | "STORAGE_LIMIT"
  | "USER_STATUS"
  | "STORAGE_USED"
  | (string & {});
export interface DescribeUsersRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  OrganizationId?: string;
  UserIds?: string;
  Query?: string | redacted.Redacted<string>;
  Include?: UserFilterType;
  Order?: OrderType;
  Sort?: UserSortType;
  Marker?: string;
  Limit?: number;
  Fields?: string;
}
export type OrganizationUserList = User[];
export interface DescribeUsersResponse {
  Users?: User[];
  TotalNumberOfUsers?: number;
  Marker?: string;
}
export interface GetCurrentUserRequest {
  AuthenticationToken: string | redacted.Redacted<string>;
}
export interface GetCurrentUserResponse {
  User?: User;
}
export interface GetDocumentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  IncludeCustomMetadata?: boolean;
}
export interface GetDocumentResponse {
  Metadata?: DocumentMetadata;
  CustomMetadata?: { [key: string]: string | undefined };
}
export interface GetDocumentPathRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  Limit?: number;
  Fields?: string;
  Marker?: string;
}
export interface ResourcePathComponent {
  Id?: string;
  Name?: string | redacted.Redacted<string>;
}
export type ResourcePathComponentList = ResourcePathComponent[];
export interface ResourcePath {
  Components?: ResourcePathComponent[];
}
export interface GetDocumentPathResponse {
  Path?: ResourcePath;
}
export interface GetDocumentVersionRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  Fields?: string;
  IncludeCustomMetadata?: boolean;
}
export interface GetDocumentVersionResponse {
  Metadata?: DocumentVersionMetadata;
  CustomMetadata?: { [key: string]: string | undefined };
}
export interface GetFolderRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
  IncludeCustomMetadata?: boolean;
}
export interface GetFolderResponse {
  Metadata?: FolderMetadata;
  CustomMetadata?: { [key: string]: string | undefined };
}
export interface GetFolderPathRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
  Limit?: number;
  Fields?: string;
  Marker?: string;
}
export interface GetFolderPathResponse {
  Path?: ResourcePath;
}
export type ResourceCollectionType = "SHARED_WITH_ME" | (string & {});
export interface GetResourcesRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  UserId?: string;
  CollectionType?: ResourceCollectionType;
  Limit?: number;
  Marker?: string;
}
export interface GetResourcesResponse {
  Folders?: FolderMetadata[];
  Documents?: DocumentMetadata[];
  Marker?: string;
}
export interface InitiateDocumentVersionUploadRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  Id?: string;
  Name?: string | redacted.Redacted<string>;
  ContentCreatedTimestamp?: Date;
  ContentModifiedTimestamp?: Date;
  ContentType?: string;
  DocumentSizeInBytes?: number;
  ParentFolderId?: string;
}
export type HeaderNameType = string;
export type HeaderValueType = string;
export type SignedHeaderMap = { [key: string]: string | undefined };
export interface UploadMetadata {
  UploadUrl?: string | redacted.Redacted<string>;
  SignedHeaders?: { [key: string]: string | undefined };
}
export interface InitiateDocumentVersionUploadResponse {
  Metadata?: DocumentMetadata;
  UploadMetadata?: UploadMetadata;
}
export interface RemoveAllResourcePermissionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
}
export interface RemoveAllResourcePermissionsResponse {}
export interface RemoveResourcePermissionRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  PrincipalId: string;
  PrincipalType?: PrincipalType;
}
export interface RemoveResourcePermissionResponse {}
export interface RestoreDocumentVersionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
}
export interface RestoreDocumentVersionsResponse {}
export type SearchQueryScopeType = "NAME" | "CONTENT" | (string & {});
export type SearchQueryScopeTypeList = SearchQueryScopeType[];
export type AdditionalResponseFieldType = "WEBURL" | (string & {});
export type AdditionalResponseFieldsList = AdditionalResponseFieldType[];
export type LanguageCodeType =
  | "AR"
  | "BG"
  | "BN"
  | "DA"
  | "DE"
  | "CS"
  | "EL"
  | "EN"
  | "ES"
  | "FA"
  | "FI"
  | "FR"
  | "HI"
  | "HU"
  | "ID"
  | "IT"
  | "JA"
  | "KO"
  | "LT"
  | "LV"
  | "NL"
  | "NO"
  | "PT"
  | "RO"
  | "RU"
  | "SV"
  | "SW"
  | "TH"
  | "TR"
  | "ZH"
  | "DEFAULT"
  | (string & {});
export type TextLocaleTypeList = LanguageCodeType[];
export type ContentCategoryType =
  | "IMAGE"
  | "DOCUMENT"
  | "PDF"
  | "SPREADSHEET"
  | "PRESENTATION"
  | "AUDIO"
  | "VIDEO"
  | "SOURCE_CODE"
  | "OTHER"
  | (string & {});
export type SearchContentCategoryTypeList = ContentCategoryType[];
export type SearchResourceType =
  | "FOLDER"
  | "DOCUMENT"
  | "COMMENT"
  | "DOCUMENT_VERSION"
  | (string & {});
export type SearchResourceTypeList = SearchResourceType[];
export type SearchLabel = string;
export type SearchLabelList = string[];
export type PrincipalRoleType =
  | "VIEWER"
  | "CONTRIBUTOR"
  | "OWNER"
  | "COOWNER"
  | (string & {});
export type SearchPrincipalRoleList = PrincipalRoleType[];
export interface SearchPrincipalType {
  Id: string;
  Roles?: PrincipalRoleType[];
}
export type SearchPrincipalTypeList = SearchPrincipalType[];
export type SearchAncestorId = string;
export type SearchAncestorIdList = string[];
export type SearchCollectionType = "OWNED" | "SHARED_WITH_ME" | (string & {});
export type SearchCollectionTypeList = SearchCollectionType[];
export type LongType = number;
export interface LongRangeType {
  StartValue?: number;
  EndValue?: number;
}
export interface DateRangeType {
  StartValue?: Date;
  EndValue?: Date;
}
export interface Filters {
  TextLocales?: LanguageCodeType[];
  ContentCategories?: ContentCategoryType[];
  ResourceTypes?: SearchResourceType[];
  Labels?: string[];
  Principals?: SearchPrincipalType[];
  AncestorIds?: string[];
  SearchCollectionTypes?: SearchCollectionType[];
  SizeRange?: LongRangeType;
  CreatedRange?: DateRangeType;
  ModifiedRange?: DateRangeType;
}
export type OrderByFieldType =
  | "RELEVANCE"
  | "NAME"
  | "SIZE"
  | "CREATED_TIMESTAMP"
  | "MODIFIED_TIMESTAMP"
  | (string & {});
export type SortOrder = "ASC" | "DESC" | (string & {});
export interface SearchSortResult {
  Field?: OrderByFieldType;
  Order?: SortOrder;
}
export type SearchResultSortList = SearchSortResult[];
export type SearchResultsLimitType = number;
export type NextMarkerType = string;
export interface SearchResourcesRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  QueryText?: string | redacted.Redacted<string>;
  QueryScopes?: SearchQueryScopeType[];
  OrganizationId?: string;
  AdditionalResponseFields?: AdditionalResponseFieldType[];
  Filters?: Filters;
  OrderBy?: SearchSortResult[];
  Limit?: number;
  Marker?: string;
}
export type ResponseItemType =
  | "DOCUMENT"
  | "FOLDER"
  | "COMMENT"
  | "DOCUMENT_VERSION"
  | (string & {});
export type ResponseItemWebUrl = string | redacted.Redacted<string>;
export interface ResponseItem {
  ResourceType?: ResponseItemType;
  WebUrl?: string | redacted.Redacted<string>;
  DocumentMetadata?: DocumentMetadata;
  FolderMetadata?: FolderMetadata;
  CommentMetadata?: CommentMetadata;
  DocumentVersionMetadata?: DocumentVersionMetadata;
}
export type ResponseItemsList = ResponseItem[];
export interface SearchResourcesResponse {
  Items?: ResponseItem[];
  Marker?: string;
}
export interface UpdateDocumentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  Name?: string | redacted.Redacted<string>;
  ParentFolderId?: string;
  ResourceState?: ResourceStateType;
}
export interface UpdateDocumentResponse {}
export type DocumentVersionStatus = "ACTIVE" | (string & {});
export interface UpdateDocumentVersionRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  VersionStatus?: DocumentVersionStatus;
}
export interface UpdateDocumentVersionResponse {}
export interface UpdateFolderRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
  Name?: string | redacted.Redacted<string>;
  ParentFolderId?: string;
  ResourceState?: ResourceStateType;
}
export interface UpdateFolderResponse {}
export type BooleanEnumType = "TRUE" | "FALSE" | (string & {});
export interface UpdateUserRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  UserId: string;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  Type?: UserType;
  StorageRule?: StorageRuleType;
  TimeZoneId?: string;
  Locale?: LocaleType;
  GrantPoweruserPrivileges?: BooleanEnumType;
}
export interface UpdateUserResponse {
  User?: User;
}
export type ErrorMessageType = string;
export type EntityIdList = string[];
export type ExceptionCodeType = string;
export type AbortDocumentVersionUploadError =
  | ConcurrentModificationException
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Aborts the upload of the specified document version that was previously initiated
 * by InitiateDocumentVersionUpload. The client should make this call
 * only when it no longer intends to upload the document version, or fails to do
 * so.
 */
export const abortDocumentVersionUpload: API.OperationMethod<
  AbortDocumentVersionUploadRequest,
  AbortDocumentVersionUploadResponse,
  AbortDocumentVersionUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/documents/{DocumentId}/versions/{VersionId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      VersionId: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AbortDocumentVersionUpload",
})) as any;

export type ActivateUserError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Activates the specified user. Only active users can access Amazon
 * WorkDocs.
 */
export const activateUser: API.OperationMethod<
  ActivateUserRequest,
  ActivateUserResponse,
  ActivateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/users/{UserId}/activation",
    input: {
      UserId: 0,
      AuthenticationToken: D.m({ header: "Authentication" }),
    },
    output: { User: o_User },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateUser",
})) as any;

export type AddResourcePermissionsError =
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Creates a set of permissions for the specified folder or document. The resource
 * permissions are overwritten if the principals already have different
 * permissions.
 */
export const addResourcePermissions: API.OperationMethod<
  AddResourcePermissionsRequest,
  AddResourcePermissionsResponse,
  AddResourcePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/resources/{ResourceId}/permissions",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      ResourceId: 0,
      Principals: D.list({ Id: 0, Type: 0, Role: 0 }),
      NotificationOptions: { SendEmail: 0, EmailMessage: 0 },
    },
    output: { ShareResults: D.list({ StatusMessage: D.secret }) },
    body: true,
  },
  errors: [
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddResourcePermissions",
})) as any;

export type CreateCommentError =
  | DocumentLockedForCommentsException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidCommentOperationException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Adds a new comment to the specified document version.
 */
export const createComment: API.OperationMethod<
  CreateCommentRequest,
  CreateCommentResponse,
  CreateCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/documents/{DocumentId}/versions/{VersionId}/comment",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      VersionId: 0,
      ParentId: 0,
      ThreadId: 0,
      Text: 0,
      Visibility: 0,
      NotifyCollaborators: 0,
    },
    output: { Comment: o_Comment },
    body: true,
  },
  errors: [
    DocumentLockedForCommentsException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidCommentOperationException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComment",
})) as any;

export type CreateCustomMetadataError =
  | CustomMetadataLimitExceededException
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Adds one or more custom properties to the specified resource (a folder, document,
 * or version).
 */
export const createCustomMetadata: API.OperationMethod<
  CreateCustomMetadataRequest,
  CreateCustomMetadataResponse,
  CreateCustomMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /api/v1/resources/{ResourceId}/customMetadata",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      ResourceId: 0,
      VersionId: D.m({ query: "versionid" }),
      CustomMetadata: 0,
    },
    body: true,
  },
  errors: [
    CustomMetadataLimitExceededException,
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomMetadata",
})) as any;

export type CreateFolderError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityAlreadyExistsException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Creates a folder with the specified name and parent folder.
 */
export const createFolder: API.OperationMethod<
  CreateFolderRequest,
  CreateFolderResponse,
  CreateFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/folders",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      Name: 0,
      ParentFolderId: 0,
    },
    output: { Metadata: o_FolderMetadata },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityAlreadyExistsException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFolder",
})) as any;

export type CreateLabelsError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | TooManyLabelsException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Adds the specified list of labels to the given resource (a document or
 * folder)
 */
export const createLabels: API.OperationMethod<
  CreateLabelsRequest,
  CreateLabelsResponse,
  CreateLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /api/v1/resources/{ResourceId}/labels",
    input: {
      ResourceId: 0,
      Labels: 0,
      AuthenticationToken: D.m({ header: "Authentication" }),
    },
    body: true,
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    TooManyLabelsException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLabels",
})) as any;

export type CreateNotificationSubscriptionError =
  | InvalidArgumentException
  | ServiceUnavailableException
  | TooManySubscriptionsException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Configure Amazon WorkDocs to use Amazon SNS notifications. The endpoint receives a
 * confirmation message, and must confirm the subscription.
 *
 * For more information, see Setting up notifications for an IAM user or role in the Amazon WorkDocs Developer
 * Guide.
 */
export const createNotificationSubscription: API.OperationMethod<
  CreateNotificationSubscriptionRequest,
  CreateNotificationSubscriptionResponse,
  CreateNotificationSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/organizations/{OrganizationId}/subscriptions",
    input: { OrganizationId: 0, Endpoint: 0, Protocol: 0, SubscriptionType: 0 },
    body: true,
  },
  errors: [
    InvalidArgumentException,
    ServiceUnavailableException,
    TooManySubscriptionsException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotificationSubscription",
})) as any;

export type CreateUserError =
  | EntityAlreadyExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Creates a user in a Simple AD or Microsoft AD directory. The status of a newly
 * created user is "ACTIVE". New users can access Amazon WorkDocs.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/users",
    input: {
      OrganizationId: 0,
      Username: 0,
      EmailAddress: 0,
      GivenName: 0,
      Surname: 0,
      Password: 0,
      TimeZoneId: 0,
      StorageRule: i_StorageRuleType,
      AuthenticationToken: D.m({ header: "Authentication" }),
    },
    output: { User: o_User },
    body: true,
  },
  errors: [
    EntityAlreadyExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type DeactivateUserError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deactivates the specified user, which revokes the user's access to Amazon
 * WorkDocs.
 */
export const deactivateUser: API.OperationMethod<
  DeactivateUserRequest,
  DeactivateUserResponse,
  DeactivateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/users/{UserId}/activation",
    input: {
      UserId: 0,
      AuthenticationToken: D.m({ header: "Authentication" }),
    },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateUser",
})) as any;

export type DeleteCommentError =
  | DocumentLockedForCommentsException
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the specified comment from the document version.
 */
export const deleteComment: API.OperationMethod<
  DeleteCommentRequest,
  DeleteCommentResponse,
  DeleteCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/documents/{DocumentId}/versions/{VersionId}/comment/{CommentId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      VersionId: 0,
      CommentId: 0,
    },
  },
  errors: [
    DocumentLockedForCommentsException,
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComment",
})) as any;

export type DeleteCustomMetadataError =
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes custom metadata from the specified resource.
 */
export const deleteCustomMetadata: API.OperationMethod<
  DeleteCustomMetadataRequest,
  DeleteCustomMetadataResponse,
  DeleteCustomMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/resources/{ResourceId}/customMetadata",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      ResourceId: 0,
      VersionId: D.m({ query: "versionId" }),
      Keys: D.m({ query: "keys" }),
      DeleteAll: D.m({ query: "deleteAll" }),
    },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomMetadata",
})) as any;

export type DeleteDocumentError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Permanently deletes the specified document and its associated metadata.
 */
export const deleteDocument: API.OperationMethod<
  DeleteDocumentRequest,
  DeleteDocumentResponse,
  DeleteDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/documents/{DocumentId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocument",
})) as any;

export type DeleteDocumentVersionError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidOperationException
  | ProhibitedStateException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes a specific version of a document.
 */
export const deleteDocumentVersion: API.OperationMethod<
  DeleteDocumentVersionRequest,
  DeleteDocumentVersionResponse,
  DeleteDocumentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/documentVersions/{DocumentId}/versions/{VersionId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      VersionId: 0,
      DeletePriorVersions: D.m({ query: "deletePriorVersions" }),
    },
  },
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidOperationException,
    ProhibitedStateException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocumentVersion",
})) as any;

export type DeleteFolderError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Permanently deletes the specified folder and its contents.
 */
export const deleteFolder: API.OperationMethod<
  DeleteFolderRequest,
  DeleteFolderResponse,
  DeleteFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/folders/{FolderId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      FolderId: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFolder",
})) as any;

export type DeleteFolderContentsError =
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the contents of the specified folder.
 */
export const deleteFolderContents: API.OperationMethod<
  DeleteFolderContentsRequest,
  DeleteFolderContentsResponse,
  DeleteFolderContentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/folders/{FolderId}/contents",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      FolderId: 0,
    },
  },
  errors: [
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFolderContents",
})) as any;

export type DeleteLabelsError =
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the specified list of labels from a resource.
 */
export const deleteLabels: API.OperationMethod<
  DeleteLabelsRequest,
  DeleteLabelsResponse,
  DeleteLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/resources/{ResourceId}/labels",
    input: {
      ResourceId: 0,
      AuthenticationToken: D.m({ header: "Authentication" }),
      Labels: D.m({ query: "labels" }),
      DeleteAll: D.m({ query: "deleteAll" }),
    },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLabels",
})) as any;

export type DeleteNotificationSubscriptionError =
  | EntityNotExistsException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the specified subscription from the specified organization.
 */
export const deleteNotificationSubscription: API.OperationMethod<
  DeleteNotificationSubscriptionRequest,
  DeleteNotificationSubscriptionResponse,
  DeleteNotificationSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/organizations/{OrganizationId}/subscriptions/{SubscriptionId}",
    input: { SubscriptionId: 0, OrganizationId: 0 },
  },
  errors: [
    EntityNotExistsException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationSubscription",
})) as any;

export type DeleteUserError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the specified user from a Simple AD or Microsoft AD directory.
 *
 * Deleting a user immediately and permanently deletes all content in that user's folder structure. Site retention policies do NOT apply to this type of deletion.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/users/{UserId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      UserId: 0,
    },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DescribeActivitiesError =
  | FailedDependencyException
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the user activities in a specified time period.
 */
export const describeActivities: API.PaginatedOperationMethod<
  DescribeActivitiesRequest,
  DescribeActivitiesResponse,
  DescribeActivitiesError,
  Credentials | HttpClient.HttpClient,
  Activity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/activities",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      StartTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      EndTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
      OrganizationId: D.m({ query: "organizationId" }),
      ActivityTypes: D.m({ query: "activityTypes" }),
      ResourceId: D.m({ query: "resourceId" }),
      UserId: D.m({ query: "userId" }),
      IncludeIndirectActivities: D.m({ query: "includeIndirectActivities" }),
      Limit: D.m({ query: "limit" }),
      Marker: D.m({ query: "marker" }),
    },
    output: {
      UserActivities: D.list({
        TimeStamp: D.ts,
        Initiator: o_UserMetadata,
        Participants: { Users: D.list(o_UserMetadata) },
        ResourceMetadata: o_ResourceMetadata,
        OriginalParent: o_ResourceMetadata,
        CommentMetadata: o_CommentMetadata,
      }),
    },
  },
  errors: [
    FailedDependencyException,
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActivities",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UserActivities",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeCommentsError =
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * List all the comments for the specified document version.
 */
export const describeComments: API.PaginatedOperationMethod<
  DescribeCommentsRequest,
  DescribeCommentsResponse,
  DescribeCommentsError,
  Credentials | HttpClient.HttpClient,
  Comment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/documents/{DocumentId}/versions/{VersionId}/comments",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      VersionId: 0,
      Limit: D.m({ query: "limit" }),
      Marker: D.m({ query: "marker" }),
    },
    output: { Comments: D.list(o_Comment) },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComments",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Comments",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeDocumentVersionsError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | InvalidPasswordException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves the document versions for the specified document.
 *
 * By default, only active versions are returned.
 */
export const describeDocumentVersions: API.PaginatedOperationMethod<
  DescribeDocumentVersionsRequest,
  DescribeDocumentVersionsResponse,
  DescribeDocumentVersionsError,
  Credentials | HttpClient.HttpClient,
  DocumentVersionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/documents/{DocumentId}/versions",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      Marker: D.m({ query: "marker" }),
      Limit: D.m({ query: "limit" }),
      Include: D.m({ query: "include" }),
      Fields: D.m({ query: "fields" }),
    },
    output: { DocumentVersions: D.list(o_DocumentVersionMetadata) },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    InvalidPasswordException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDocumentVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DocumentVersions",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeFolderContentsError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the contents of the specified folder, including its documents and
 * subfolders.
 *
 * By default, Amazon WorkDocs returns the first 100 active document and folder
 * metadata items. If there are more results, the response includes a marker that you can
 * use to request the next set of results. You can also request initialized
 * documents.
 */
export const describeFolderContents: API.PaginatedOperationMethod<
  DescribeFolderContentsRequest,
  DescribeFolderContentsResponse,
  DescribeFolderContentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/folders/{FolderId}/contents",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      FolderId: 0,
      Sort: D.m({ query: "sort" }),
      Order: D.m({ query: "order" }),
      Limit: D.m({ query: "limit" }),
      Marker: D.m({ query: "marker" }),
      Type: D.m({ query: "type" }),
      Include: D.m({ query: "include" }),
    },
    output: {
      Folders: D.list(o_FolderMetadata),
      Documents: D.list(o_DocumentMetadata),
    },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFolderContents",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGroupsError =
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the groups specified by the query. Groups are defined by the underlying
 * Active Directory.
 */
export const describeGroups: API.PaginatedOperationMethod<
  DescribeGroupsRequest,
  DescribeGroupsResponse,
  DescribeGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/groups",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      SearchQuery: D.m({ query: "searchQuery" }),
      OrganizationId: D.m({ query: "organizationId" }),
      Marker: D.m({ query: "marker" }),
      Limit: D.m({ query: "limit" }),
    },
  },
  errors: [
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Groups",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeNotificationSubscriptionsError =
  | EntityNotExistsException
  | ServiceUnavailableException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Lists the specified notification subscriptions.
 */
export const describeNotificationSubscriptions: API.PaginatedOperationMethod<
  DescribeNotificationSubscriptionsRequest,
  DescribeNotificationSubscriptionsResponse,
  DescribeNotificationSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/organizations/{OrganizationId}/subscriptions",
    input: {
      OrganizationId: 0,
      Marker: D.m({ query: "marker" }),
      Limit: D.m({ query: "limit" }),
    },
  },
  errors: [
    EntityNotExistsException,
    ServiceUnavailableException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationSubscriptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Subscriptions",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeResourcePermissionsError =
  | FailedDependencyException
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the permissions of a specified resource.
 */
export const describeResourcePermissions: API.PaginatedOperationMethod<
  DescribeResourcePermissionsRequest,
  DescribeResourcePermissionsResponse,
  DescribeResourcePermissionsError,
  Credentials | HttpClient.HttpClient,
  Principal
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/resources/{ResourceId}/permissions",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      ResourceId: 0,
      PrincipalId: D.m({ query: "principalId" }),
      Limit: D.m({ query: "limit" }),
      Marker: D.m({ query: "marker" }),
    },
  },
  errors: [
    FailedDependencyException,
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePermissions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Principals",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeRootFoldersError =
  | FailedDependencyException
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the current user's special folders; the `RootFolder` and the
 * `RecycleBin`. `RootFolder` is the root of user's files and
 * folders and `RecycleBin` is the root of recycled items. This is not a valid
 * action for SigV4 (administrative API) clients.
 *
 * This action requires an authentication token. To get an authentication token,
 * register an application with Amazon WorkDocs. For more information, see Authentication and Access
 * Control for User Applications in the
 * Amazon
 * WorkDocs Developer Guide.
 */
export const describeRootFolders: API.PaginatedOperationMethod<
  DescribeRootFoldersRequest,
  DescribeRootFoldersResponse,
  DescribeRootFoldersError,
  Credentials | HttpClient.HttpClient,
  FolderMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/me/root",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      Limit: D.m({ query: "limit" }),
      Marker: D.m({ query: "marker" }),
    },
    output: { Folders: D.list(o_FolderMetadata) },
  },
  errors: [
    FailedDependencyException,
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRootFolders",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Folders",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeUsersError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | RequestedEntityTooLargeException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the specified users. You can describe all users or filter the results
 * (for example, by status or organization).
 *
 * By default, Amazon WorkDocs returns the first 24 active or pending users. If there
 * are more results, the response includes a marker that you can use to request the next
 * set of results.
 */
export const describeUsers: API.PaginatedOperationMethod<
  DescribeUsersRequest,
  DescribeUsersResponse,
  DescribeUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/users",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      OrganizationId: D.m({ query: "organizationId" }),
      UserIds: D.m({ query: "userIds" }),
      Query: D.m({ query: "query" }),
      Include: D.m({ query: "include" }),
      Order: D.m({ query: "order" }),
      Sort: D.m({ query: "sort" }),
      Marker: D.m({ query: "marker" }),
      Limit: D.m({ query: "limit" }),
      Fields: D.m({ query: "fields" }),
    },
    output: { Users: D.list(o_User) },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    RequestedEntityTooLargeException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Users",
    pageSize: "Limit",
  } as const,
})) as any;

export type GetCurrentUserError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves details of the current user for whom the authentication token was
 * generated. This is not a valid action for SigV4 (administrative API) clients.
 *
 * This action requires an authentication token. To get an authentication token,
 * register an application with Amazon WorkDocs. For more information, see Authentication and Access
 * Control for User Applications in the
 * Amazon
 * WorkDocs Developer Guide.
 */
export const getCurrentUser: API.OperationMethod<
  GetCurrentUserRequest,
  GetCurrentUserResponse,
  GetCurrentUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/me",
    input: { AuthenticationToken: D.m({ header: "Authentication" }) },
    output: { User: o_User },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCurrentUser",
})) as any;

export type GetDocumentError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | InvalidPasswordException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves details of a document.
 */
export const getDocument: API.OperationMethod<
  GetDocumentRequest,
  GetDocumentResponse,
  GetDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/documents/{DocumentId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      IncludeCustomMetadata: D.m({ query: "includeCustomMetadata" }),
    },
    output: { Metadata: o_DocumentMetadata },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    InvalidPasswordException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocument",
})) as any;

export type GetDocumentPathError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves the path information (the hierarchy from the root folder) for the
 * requested document.
 *
 * By default, Amazon WorkDocs returns a maximum of 100 levels upwards from the
 * requested document and only includes the IDs of the parent folders in the path. You can
 * limit the maximum number of levels. You can also request the names of the parent
 * folders.
 */
export const getDocumentPath: API.OperationMethod<
  GetDocumentPathRequest,
  GetDocumentPathResponse,
  GetDocumentPathError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/documents/{DocumentId}/path",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      Limit: D.m({ query: "limit" }),
      Fields: D.m({ query: "fields" }),
      Marker: D.m({ query: "marker" }),
    },
    output: { Path: o_ResourcePath },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentPath",
})) as any;

export type GetDocumentVersionError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidPasswordException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves version metadata for the specified document.
 */
export const getDocumentVersion: API.OperationMethod<
  GetDocumentVersionRequest,
  GetDocumentVersionResponse,
  GetDocumentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/documents/{DocumentId}/versions/{VersionId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      VersionId: 0,
      Fields: D.m({ query: "fields" }),
      IncludeCustomMetadata: D.m({ query: "includeCustomMetadata" }),
    },
    output: { Metadata: o_DocumentVersionMetadata },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidPasswordException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentVersion",
})) as any;

export type GetFolderError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves the metadata of the specified folder.
 */
export const getFolder: API.OperationMethod<
  GetFolderRequest,
  GetFolderResponse,
  GetFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/folders/{FolderId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      FolderId: 0,
      IncludeCustomMetadata: D.m({ query: "includeCustomMetadata" }),
    },
    output: { Metadata: o_FolderMetadata },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFolder",
})) as any;

export type GetFolderPathError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves the path information (the hierarchy from the root folder) for the
 * specified folder.
 *
 * By default, Amazon WorkDocs returns a maximum of 100 levels upwards from the
 * requested folder and only includes the IDs of the parent folders in the path. You can
 * limit the maximum number of levels. You can also request the parent folder
 * names.
 */
export const getFolderPath: API.OperationMethod<
  GetFolderPathRequest,
  GetFolderPathResponse,
  GetFolderPathError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/folders/{FolderId}/path",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      FolderId: 0,
      Limit: D.m({ query: "limit" }),
      Fields: D.m({ query: "fields" }),
      Marker: D.m({ query: "marker" }),
    },
    output: { Path: o_ResourcePath },
  },
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFolderPath",
})) as any;

export type GetResourcesError =
  | FailedDependencyException
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves a collection of resources, including folders and documents. The only
 * `CollectionType` supported is `SHARED_WITH_ME`.
 */
export const getResources: API.OperationMethod<
  GetResourcesRequest,
  GetResourcesResponse,
  GetResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/resources",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      UserId: D.m({ query: "userId" }),
      CollectionType: D.m({ query: "collectionType" }),
      Limit: D.m({ query: "limit" }),
      Marker: D.m({ query: "marker" }),
    },
    output: {
      Folders: D.list(o_FolderMetadata),
      Documents: D.list(o_DocumentMetadata),
    },
  },
  errors: [
    FailedDependencyException,
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResources",
})) as any;

export type InitiateDocumentVersionUploadError =
  | DraftUploadOutOfSyncException
  | EntityAlreadyExistsException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | InvalidPasswordException
  | LimitExceededException
  | ProhibitedStateException
  | ResourceAlreadyCheckedOutException
  | ServiceUnavailableException
  | StorageLimitExceededException
  | StorageLimitWillExceedException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Creates a new document object and version object.
 *
 * The client specifies the parent folder ID and name of the document to upload. The
 * ID is optionally specified when creating a new version of an existing document. This is
 * the first step to upload a document. Next, upload the document to the URL returned from
 * the call, and then call UpdateDocumentVersion.
 *
 * To cancel the document upload, call AbortDocumentVersionUpload.
 */
export const initiateDocumentVersionUpload: API.OperationMethod<
  InitiateDocumentVersionUploadRequest,
  InitiateDocumentVersionUploadResponse,
  InitiateDocumentVersionUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/documents",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      Id: 0,
      Name: 0,
      ContentCreatedTimestamp: 0,
      ContentModifiedTimestamp: 0,
      ContentType: 0,
      DocumentSizeInBytes: 0,
      ParentFolderId: 0,
    },
    output: {
      Metadata: o_DocumentMetadata,
      UploadMetadata: { UploadUrl: D.secret },
    },
    body: true,
  },
  errors: [
    DraftUploadOutOfSyncException,
    EntityAlreadyExistsException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    InvalidPasswordException,
    LimitExceededException,
    ProhibitedStateException,
    ResourceAlreadyCheckedOutException,
    ServiceUnavailableException,
    StorageLimitExceededException,
    StorageLimitWillExceedException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitiateDocumentVersionUpload",
})) as any;

export type RemoveAllResourcePermissionsError =
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Removes all the permissions from the specified resource.
 */
export const removeAllResourcePermissions: API.OperationMethod<
  RemoveAllResourcePermissionsRequest,
  RemoveAllResourcePermissionsResponse,
  RemoveAllResourcePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/resources/{ResourceId}/permissions",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      ResourceId: 0,
    },
  },
  errors: [
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAllResourcePermissions",
})) as any;

export type RemoveResourcePermissionError =
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Removes the permission for the specified principal from the specified
 * resource.
 */
export const removeResourcePermission: API.OperationMethod<
  RemoveResourcePermissionRequest,
  RemoveResourcePermissionResponse,
  RemoveResourcePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/resources/{ResourceId}/permissions/{PrincipalId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      ResourceId: 0,
      PrincipalId: 0,
      PrincipalType: D.m({ query: "type" }),
    },
  },
  errors: [
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveResourcePermission",
})) as any;

export type RestoreDocumentVersionsError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidOperationException
  | ProhibitedStateException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Recovers a deleted version of an Amazon WorkDocs document.
 */
export const restoreDocumentVersions: API.OperationMethod<
  RestoreDocumentVersionsRequest,
  RestoreDocumentVersionsResponse,
  RestoreDocumentVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/documentVersions/restore/{DocumentId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidOperationException,
    ProhibitedStateException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDocumentVersions",
})) as any;

export type SearchResourcesError =
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Searches metadata and the content of folders, documents, document versions, and comments.
 */
export const searchResources: API.PaginatedOperationMethod<
  SearchResourcesRequest,
  SearchResourcesResponse,
  SearchResourcesError,
  Credentials | HttpClient.HttpClient,
  ResponseItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/search",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      QueryText: 0,
      QueryScopes: 0,
      OrganizationId: 0,
      AdditionalResponseFields: 0,
      Filters: {
        TextLocales: 0,
        ContentCategories: 0,
        ResourceTypes: 0,
        Labels: 0,
        Principals: D.list({ Id: 0, Roles: 0 }),
        AncestorIds: 0,
        SearchCollectionTypes: 0,
        SizeRange: { StartValue: 0, EndValue: 0 },
        CreatedRange: i_DateRangeType,
        ModifiedRange: i_DateRangeType,
      },
      OrderBy: D.list({ Field: 0, Order: 0 }),
      Limit: 0,
      Marker: 0,
    },
    output: {
      Items: D.list({
        WebUrl: D.secret,
        DocumentMetadata: o_DocumentMetadata,
        FolderMetadata: o_FolderMetadata,
        CommentMetadata: o_CommentMetadata,
        DocumentVersionMetadata: o_DocumentVersionMetadata,
      }),
    },
    body: true,
  },
  errors: [
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchResources",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Items",
    pageSize: "Limit",
  } as const,
})) as any;

export type UpdateDocumentError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityAlreadyExistsException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Updates the specified attributes of a document. The user must have access to both
 * the document and its parent folder, if applicable.
 */
export const updateDocument: API.OperationMethod<
  UpdateDocumentRequest,
  UpdateDocumentResponse,
  UpdateDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /api/v1/documents/{DocumentId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      Name: 0,
      ParentFolderId: 0,
      ResourceState: 0,
    },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityAlreadyExistsException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocument",
})) as any;

export type UpdateDocumentVersionError =
  | ConcurrentModificationException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidOperationException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Changes the status of the document version to ACTIVE.
 *
 * Amazon WorkDocs also sets its document container to ACTIVE. This is the last step
 * in a document upload, after the client uploads the document to an S3-presigned URL
 * returned by InitiateDocumentVersionUpload.
 */
export const updateDocumentVersion: API.OperationMethod<
  UpdateDocumentVersionRequest,
  UpdateDocumentVersionResponse,
  UpdateDocumentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /api/v1/documents/{DocumentId}/versions/{VersionId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      DocumentId: 0,
      VersionId: 0,
      VersionStatus: 0,
    },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidOperationException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentVersion",
})) as any;

export type UpdateFolderError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityAlreadyExistsException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Updates the specified attributes of the specified folder. The user must have access
 * to both the folder and its parent folder, if applicable.
 */
export const updateFolder: API.OperationMethod<
  UpdateFolderRequest,
  UpdateFolderResponse,
  UpdateFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /api/v1/folders/{FolderId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      FolderId: 0,
      Name: 0,
      ParentFolderId: 0,
      ResourceState: 0,
    },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityAlreadyExistsException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFolder",
})) as any;

export type UpdateUserError =
  | DeactivatingLastSystemUserException
  | EntityNotExistsException
  | FailedDependencyException
  | IllegalUserStateException
  | InvalidArgumentException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Updates the specified attributes of the specified user, and grants or revokes
 * administrative privileges to the Amazon WorkDocs site.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /api/v1/users/{UserId}",
    input: {
      AuthenticationToken: D.m({ header: "Authentication" }),
      UserId: 0,
      GivenName: 0,
      Surname: 0,
      Type: 0,
      StorageRule: i_StorageRuleType,
      TimeZoneId: 0,
      Locale: 0,
      GrantPoweruserPrivileges: 0,
    },
    output: { User: o_User },
    body: true,
  },
  errors: [
    DeactivatingLastSystemUserException,
    EntityNotExistsException,
    FailedDependencyException,
    IllegalUserStateException,
    InvalidArgumentException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
})) as any;

const i_DateRangeType: D.LazyStruct = () => ({ StartValue: 0, EndValue: 0 });
const i_StorageRuleType: D.LazyStruct = () => ({
  StorageAllocatedInBytes: 0,
  StorageType: 0,
});
const o_Comment: D.LazyStruct = () => ({
  Text: D.secret,
  Contributor: o_User,
  CreatedTimestamp: D.ts,
});
const o_CommentMetadata: D.LazyStruct = () => ({
  Contributor: o_User,
  CreatedTimestamp: D.ts,
});
const o_DocumentMetadata: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  ModifiedTimestamp: D.ts,
  LatestVersionMetadata: o_DocumentVersionMetadata,
});
const o_DocumentVersionMetadata: D.LazyStruct = () => ({
  Name: D.secret,
  CreatedTimestamp: D.ts,
  ModifiedTimestamp: D.ts,
  ContentCreatedTimestamp: D.ts,
  ContentModifiedTimestamp: D.ts,
  Thumbnail: D.map(D.secret),
  Source: D.map(D.secret),
});
const o_FolderMetadata: D.LazyStruct = () => ({
  Name: D.secret,
  CreatedTimestamp: D.ts,
  ModifiedTimestamp: D.ts,
});
const o_ResourceMetadata: D.LazyStruct = () => ({
  Name: D.secret,
  OriginalName: D.secret,
  Owner: o_UserMetadata,
});
const o_ResourcePath: D.LazyStruct = () => ({
  Components: D.list({ Name: D.secret }),
});
const o_User: D.LazyStruct = () => ({
  Username: D.secret,
  EmailAddress: D.secret,
  GivenName: D.secret,
  Surname: D.secret,
  CreatedTimestamp: D.ts,
  ModifiedTimestamp: D.ts,
});
const o_UserMetadata: D.LazyStruct = () => ({
  Username: D.secret,
  GivenName: D.secret,
  Surname: D.secret,
  EmailAddress: D.secret,
});
