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
const ns = /*@__PURE__*/ T.XmlNamespace("https://aws.amazon.com/api/v1/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "WorkDocs",
  serviceShapeName: "AWSGorillaBoyService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "workdocs" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-05-01");
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
              `https://workdocs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://workdocs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://workdocs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://workdocs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://workdocs.{R}.{D}","properties":{},"headers":{}}');

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictingOperationException
  extends /*@__PURE__*/ S.TaggedError<ConflictingOperationException>()(
    "ConflictingOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CustomMetadataLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CustomMetadataLimitExceededException>()(
    "CustomMetadataLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class DeactivatingLastSystemUserException
  extends /*@__PURE__*/ S.TaggedError<DeactivatingLastSystemUserException>()(
    "DeactivatingLastSystemUserException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DocumentLockedForCommentsException
  extends /*@__PURE__*/ S.TaggedError<DocumentLockedForCommentsException>()(
    "DocumentLockedForCommentsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DraftUploadOutOfSyncException
  extends /*@__PURE__*/ S.TaggedError<DraftUploadOutOfSyncException>()(
    "DraftUploadOutOfSyncException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EntityAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EntityAlreadyExistsException>()(
    "EntityAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class EntityNotExistsException
  extends /*@__PURE__*/ S.TaggedError<EntityNotExistsException>()(
    "EntityNotExistsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      EntityIds: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(928, __c58, 0)).annotate({ identifier: "EntityIdList" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class FailedDependencyException
  extends /*@__PURE__*/ S.TaggedError<FailedDependencyException>()(
    "FailedDependencyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class IllegalUserStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalUserStateException>()(
    "IllegalUserStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidCommentOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidCommentOperationException>()(
    "InvalidCommentOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()(
    "InvalidOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class InvalidPasswordException
  extends /*@__PURE__*/ S.TaggedError<InvalidPasswordException>()(
    "InvalidPasswordException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ProhibitedStateException
  extends /*@__PURE__*/ S.TaggedError<ProhibitedStateException>()(
    "ProhibitedStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class RequestedEntityTooLargeException
  extends /*@__PURE__*/ S.TaggedError<RequestedEntityTooLargeException>()(
    "RequestedEntityTooLargeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyCheckedOutException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyCheckedOutException>()(
    "ResourceAlreadyCheckedOutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class StorageLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<StorageLimitExceededException>()(
    "StorageLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class StorageLimitWillExceedException
  extends /*@__PURE__*/ S.TaggedError<StorageLimitWillExceedException>()(
    "StorageLimitWillExceedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class TooManyLabelsException
  extends /*@__PURE__*/ S.TaggedError<TooManyLabelsException>()(
    "TooManyLabelsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManySubscriptionsException
  extends /*@__PURE__*/ S.TaggedError<TooManySubscriptionsException>()(
    "TooManySubscriptionsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedOperationException>()(
    "UnauthorizedOperationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class UnauthorizedResourceAccessException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedResourceAccessException>()(
    "UnauthorizedResourceAccessException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
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
export type RoleType = "VIEWER" | "CONTRIBUTOR" | "OWNER" | "COOWNER" | (string & {});
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
export type CommentStatusType = "DRAFT" | "PUBLISHED" | "DELETED" | (string & {});
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
export type ResourceStateType = "ACTIVE" | "RESTORING" | "RECYCLING" | "RECYCLED" | (string & {});
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
export type DocumentThumbnailType = "SMALL" | "SMALL_HQ" | "LARGE" | (string & {});
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
export type PrincipalRoleType = "VIEWER" | "CONTRIBUTOR" | "OWNER" | "COOWNER" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AbortDocumentVersionUploadRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<AbortDocumentVersionUploadResponse>,
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
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<ActivateUserRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<ActivateUserResponse>,
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
}));

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
  input: __S(83, __c5, 3) as any as S.Schema<AddResourcePermissionsRequest>,
  output: __S(86, __c5, 6) as any as S.Schema<AddResourcePermissionsResponse>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<CreateCommentRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<CreateCommentResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<CreateCustomMetadataRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateCustomMetadataResponse>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<CreateFolderRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<CreateFolderResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<CreateLabelsRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateLabelsResponse>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<CreateNotificationSubscriptionRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<CreateNotificationSubscriptionResponse>,
  errors: [
    InvalidArgumentException,
    ServiceUnavailableException,
    TooManySubscriptionsException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotificationSubscription",
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<CreateUserResponse>,
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
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<DeactivateUserRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeactivateUserResponse>,
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
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<DeleteCommentRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteCommentResponse>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<DeleteCustomMetadataRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteCustomMetadataResponse>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<DeleteDocumentRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteDocumentResponse>,
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
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<DeleteDocumentVersionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteDocumentVersionResponse>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<DeleteFolderRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteFolderResponse>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<DeleteFolderContentsRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteFolderContentsResponse>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<DeleteLabelsRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteLabelsResponse>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<DeleteNotificationSubscriptionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteNotificationSubscriptionResponse>,
  errors: [
    EntityNotExistsException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationSubscription",
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteUserResponse>,
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
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<DescribeActivitiesRequest>,
  output: __S(423, __c26, 7) as any as S.Schema<DescribeActivitiesResponse>,
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
  input: __S(464, __c29, 0) as any as S.Schema<DescribeCommentsRequest>,
  output: __S(466, __c29, 2) as any as S.Schema<DescribeCommentsResponse>,
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
  input: __S(480, __c30, 0) as any as S.Schema<DescribeDocumentVersionsRequest>,
  output: __S(482, __c30, 2) as any as S.Schema<DescribeDocumentVersionsResponse>,
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
  input: __S(512, __c32, 0) as any as S.Schema<DescribeFolderContentsRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<DescribeFolderContentsResponse>,
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
  pagination: { inputToken: "Marker", outputToken: "Marker", pageSize: "Limit" } as const,
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
  input: __S(576, __c36, 0) as any as S.Schema<DescribeGroupsRequest>,
  output: __S(577, __c36, 1) as any as S.Schema<DescribeGroupsResponse>,
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
  input: __S(592, __c37, 0) as any as S.Schema<DescribeNotificationSubscriptionsRequest>,
  output: __S(594, __c37, 2) as any as S.Schema<DescribeNotificationSubscriptionsResponse>,
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
  input: __S(608, __c38, 0) as any as S.Schema<DescribeResourcePermissionsRequest>,
  output: __S(613, __c38, 5) as any as S.Schema<DescribeResourcePermissionsResponse>,
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
  input: __S(624, __c39, 0) as any as S.Schema<DescribeRootFoldersRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<DescribeRootFoldersResponse>,
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
  input: __S(640, __c40, 0) as any as S.Schema<DescribeUsersRequest>,
  output: __S(642, __c40, 2) as any as S.Schema<DescribeUsersResponse>,
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
  input: __S(656, __c41, 0) as any as S.Schema<GetCurrentUserRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<GetCurrentUserResponse>,
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
}));

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
  input: __S(672, __c42, 0) as any as S.Schema<GetDocumentRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<GetDocumentResponse>,
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
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<GetDocumentPathRequest>,
  output: __S(707, __c44, 3) as any as S.Schema<GetDocumentPathResponse>,
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
}));

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
  input: __S(720, __c45, 0) as any as S.Schema<GetDocumentVersionRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<GetDocumentVersionResponse>,
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
}));

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
  input: __S(736, __c46, 0) as any as S.Schema<GetFolderRequest>,
  output: __S(737, __c46, 1) as any as S.Schema<GetFolderResponse>,
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
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<GetFolderPathRequest>,
  output: __S(707, __c44, 3) as any as S.Schema<GetFolderPathResponse>,
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
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<GetResourcesRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<GetResourcesResponse>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<InitiateDocumentVersionUploadRequest>,
  output: __S(786, __c49, 2) as any as S.Schema<InitiateDocumentVersionUploadResponse>,
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
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<RemoveAllResourcePermissionsRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<RemoveAllResourcePermissionsResponse>,
  errors: [
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAllResourcePermissions",
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<RemoveResourcePermissionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<RemoveResourcePermissionResponse>,
  errors: [
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveResourcePermission",
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<RestoreDocumentVersionsRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<RestoreDocumentVersionsResponse>,
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
}));

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
  input: __S(856, __c53, 8) as any as S.Schema<SearchResourcesRequest>,
  output: __S(859, __c53, 11) as any as S.Schema<SearchResourcesResponse>,
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
  input: __S(864, __c54, 0) as any as S.Schema<UpdateDocumentRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateDocumentResponse>,
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
}));

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
  input: __S(880, __c55, 0) as any as S.Schema<UpdateDocumentVersionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateDocumentVersionResponse>,
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
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<UpdateFolderRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateFolderResponse>,
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
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<UpdateUserResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          VersionId: S.String.pipe(T.HttpLabel("VersionId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AbortDocumentVersionUploadRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AbortDocumentVersionUploadResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/api/v1/users/{UserId}/activation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ActivateUserRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StorageAllocatedInBytes: S.optional(S.Number),
          StorageType: S.optional(S.String),
        }),
      ).annotate({ identifier: "StorageRuleType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StorageUtilizedInBytes: S.optional(S.Number),
          StorageRule: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "UserStorageMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Username: S.optional(SensitiveString),
          EmailAddress: S.optional(SensitiveString),
          GivenName: S.optional(SensitiveString),
          Surname: S.optional(SensitiveString),
          OrganizationId: S.optional(S.String),
          RootFolderId: S.optional(S.String),
          RecycleBinFolderId: S.optional(S.String),
          Status: S.optional(S.String),
          Type: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TimeZoneId: S.optional(S.String),
          Locale: S.optional(S.String),
          Storage: S.optional(__S(49, __c3, 1)),
        }),
      ).annotate({ identifier: "User" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ User: S.optional(__S(50, __c3, 2)) }).pipe(ns)).annotate({
        identifier: "ActivateUserResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.String, Type: S.String, Role: S.String })).annotate({
        identifier: "SharePrincipal",
      });
    case 1:
      return S.Array(__S(80, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ SendEmail: S.optional(S.Boolean), EmailMessage: S.optional(SensitiveString) }),
      ).annotate({ identifier: "NotificationOptions" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
          Principals: __S(81, __c5, 1),
          NotificationOptions: S.optional(__S(82, __c5, 2)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/api/v1/resources/{ResourceId}/permissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddResourcePermissionsRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          PrincipalId: S.optional(S.String),
          InviteePrincipalId: S.optional(S.String),
          Role: S.optional(S.String),
          Status: S.optional(S.String),
          ShareId: S.optional(S.String),
          StatusMessage: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ShareResult" });
    case 5:
      return S.Array(__S(84, __c5, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ ShareResults: S.optional(__S(85, __c5, 5)) }).pipe(ns),
      ).annotate({ identifier: "AddResourcePermissionsResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          VersionId: S.String.pipe(T.HttpLabel("VersionId")),
          ParentId: S.optional(S.String),
          ThreadId: S.optional(S.String),
          Text: SensitiveString,
          Visibility: S.optional(S.String),
          NotifyCollaborators: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}/comment",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCommentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Comment: S.optional(__S(112, __c7, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateCommentResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CommentId: S.String,
          ParentId: S.optional(S.String),
          ThreadId: S.optional(S.String),
          Text: S.optional(SensitiveString),
          Contributor: S.optional(__S(50, __c3, 2)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          Visibility: S.optional(S.String),
          RecipientId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Comment" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionid")),
          CustomMetadata: __S(144, __c9, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/api/v1/resources/{ResourceId}/customMetadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomMetadataRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          Name: S.optional(SensitiveString),
          ParentFolderId: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/api/v1/folders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFolderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Metadata: S.optional(__S(176, __c11, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateFolderResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(SensitiveString),
          CreatorId: S.optional(S.String),
          ParentFolderId: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceState: S.optional(S.String),
          Signature: S.optional(S.String),
          Labels: S.optional(__S(928, __c58, 0)),
          Size: S.optional(S.Number),
          LatestVersionSize: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FolderMetadata" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
          Labels: __S(928, __c58, 0),
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/api/v1/resources/{ResourceId}/labels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLabelsRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String.pipe(T.HttpLabel("OrganizationId")),
          Endpoint: S.String,
          Protocol: S.String,
          SubscriptionType: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/api/v1/organizations/{OrganizationId}/subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNotificationSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Subscription: S.optional(__S(224, __c14, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateNotificationSubscriptionResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionId: S.optional(S.String),
          EndPoint: S.optional(S.String),
          Protocol: S.optional(S.String),
        }),
      ).annotate({ identifier: "Subscription" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.optional(S.String),
          Username: SensitiveString,
          EmailAddress: S.optional(SensitiveString),
          GivenName: SensitiveString,
          Surname: SensitiveString,
          Password: SensitiveString,
          TimeZoneId: S.optional(S.String),
          StorageRule: S.optional(__S(48, __c3, 0)),
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/api/v1/users" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateUserRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/api/v1/users/{UserId}/activation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeactivateUserRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          VersionId: S.String.pipe(T.HttpLabel("VersionId")),
          CommentId: S.String.pipe(T.HttpLabel("CommentId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}/comment/{CommentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCommentRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          Keys: S.optional(__S(928, __c58, 0)).pipe(T.HttpQuery("keys")),
          DeleteAll: S.optional(S.Boolean).pipe(T.HttpQuery("deleteAll")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/api/v1/resources/{ResourceId}/customMetadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomMetadataRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/api/v1/documents/{DocumentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDocumentRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          VersionId: S.String.pipe(T.HttpLabel("VersionId")),
          DeletePriorVersions: S.Boolean.pipe(T.HttpQuery("deletePriorVersions")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/api/v1/documentVersions/{DocumentId}/versions/{VersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDocumentVersionRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          FolderId: S.String.pipe(T.HttpLabel("FolderId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/api/v1/folders/{FolderId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFolderRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          FolderId: S.String.pipe(T.HttpLabel("FolderId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/api/v1/folders/{FolderId}/contents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFolderContentsRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          Labels: S.optional(__S(928, __c58, 0)).pipe(T.HttpQuery("labels")),
          DeleteAll: S.optional(S.Boolean).pipe(T.HttpQuery("deleteAll")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/api/v1/resources/{ResourceId}/labels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLabelsRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionId: S.String.pipe(T.HttpLabel("SubscriptionId")),
          OrganizationId: S.String.pipe(T.HttpLabel("OrganizationId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/api/v1/organizations/{OrganizationId}/subscriptions/{SubscriptionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNotificationSubscriptionRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/api/v1/users/{UserId}" }),
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
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startTime"),
          ),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endTime"),
          ),
          OrganizationId: S.optional(S.String).pipe(T.HttpQuery("organizationId")),
          ActivityTypes: S.optional(S.String).pipe(T.HttpQuery("activityTypes")),
          ResourceId: S.optional(S.String).pipe(T.HttpQuery("resourceId")),
          UserId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          IncludeIndirectActivities: S.optional(S.Boolean).pipe(
            T.HttpQuery("includeIndirectActivities"),
          ),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/activities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeActivitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Username: S.optional(SensitiveString),
          GivenName: S.optional(SensitiveString),
          Surname: S.optional(SensitiveString),
          EmailAddress: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "UserMetadata" });
    case 2:
      return S.Array(__S(417, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Users: S.optional(__S(418, __c26, 2)), Groups: S.optional(__S(433, __c27, 1)) }),
      ).annotate({ identifier: "Participants" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Name: S.optional(SensitiveString),
          OriginalName: S.optional(SensitiveString),
          Id: S.optional(S.String),
          VersionId: S.optional(S.String),
          Owner: S.optional(__S(417, __c26, 1)),
          ParentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceMetadata" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          TimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IsIndirectActivity: S.optional(S.Boolean),
          OrganizationId: S.optional(S.String),
          Initiator: S.optional(__S(417, __c26, 1)),
          Participants: S.optional(__S(419, __c26, 3)),
          ResourceMetadata: S.optional(__S(420, __c26, 4)),
          OriginalParent: S.optional(__S(420, __c26, 4)),
          CommentMetadata: S.optional(__S(448, __c28, 0)),
        }),
      ).annotate({ identifier: "Activity" });
    case 6:
      return S.Array(__S(421, __c26, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          UserActivities: S.optional(__S(422, __c26, 6)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeActivitiesResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "GroupMetadata" });
    case 1:
      return S.Array(__S(432, __c27, 0));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CommentId: S.optional(S.String),
          Contributor: S.optional(__S(50, __c3, 2)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CommentStatus: S.optional(S.String),
          RecipientId: S.optional(S.String),
          ContributorId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CommentMetadata" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          VersionId: S.String.pipe(T.HttpLabel("VersionId")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}/comments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCommentsRequest" });
    case 1:
      return S.Array(__S(112, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Comments: S.optional(__S(465, __c29, 1)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeCommentsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Include: S.optional(S.String).pipe(T.HttpQuery("include")),
          Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/documents/{DocumentId}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDocumentVersionsRequest" });
    case 1:
      return S.Array(__S(497, __c31, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DocumentVersions: S.optional(__S(481, __c30, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDocumentVersionsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(SensitiveString),
          ContentType: S.optional(S.String),
          Size: S.optional(S.Number),
          Signature: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ContentCreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ContentModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatorId: S.optional(S.String),
          Thumbnail: S.optional(__S(496, __c31, 0)),
          Source: S.optional(__S(496, __c31, 0)),
        }),
      ).annotate({ identifier: "DocumentVersionMetadata" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          FolderId: S.String.pipe(T.HttpLabel("FolderId")),
          Sort: S.optional(S.String).pipe(T.HttpQuery("sort")),
          Order: S.optional(S.String).pipe(T.HttpQuery("order")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          Type: S.optional(S.String).pipe(T.HttpQuery("type")),
          Include: S.optional(S.String).pipe(T.HttpQuery("include")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/folders/{FolderId}/contents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeFolderContentsRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(176, __c11, 0));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          CreatorId: S.optional(S.String),
          ParentFolderId: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestVersionMetadata: S.optional(__S(497, __c31, 1)),
          ResourceState: S.optional(S.String),
          Labels: S.optional(__S(928, __c58, 0)),
        }),
      ).annotate({ identifier: "DocumentMetadata" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(544, __c34, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Folders: S.optional(__S(528, __c33, 0)),
          Documents: S.optional(__S(560, __c35, 0)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFolderContentsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          SearchQuery: SensitiveString.pipe(T.HttpQuery("searchQuery")),
          OrganizationId: S.optional(S.String).pipe(T.HttpQuery("organizationId")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/api/v1/groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Groups: S.optional(__S(433, __c27, 1)), Marker: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DescribeGroupsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.String.pipe(T.HttpLabel("OrganizationId")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/organizations/{OrganizationId}/subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeNotificationSubscriptionsRequest" });
    case 1:
      return S.Array(__S(224, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Subscriptions: S.optional(__S(593, __c37, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeNotificationSubscriptionsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
          PrincipalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/resources/{ResourceId}/permissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeResourcePermissionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Role: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "PermissionInfo" });
    case 2:
      return S.Array(__S(609, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          Roles: S.optional(__S(610, __c38, 2)),
        }),
      ).annotate({ identifier: "Principal" });
    case 4:
      return S.Array(__S(611, __c38, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Principals: S.optional(__S(612, __c38, 4)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeResourcePermissionsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: SensitiveString.pipe(T.HttpHeader("Authentication")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/me/root" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRootFoldersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Folders: S.optional(__S(528, __c33, 0)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeRootFoldersResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          OrganizationId: S.optional(S.String).pipe(T.HttpQuery("organizationId")),
          UserIds: S.optional(S.String).pipe(T.HttpQuery("userIds")),
          Query: S.optional(SensitiveString).pipe(T.HttpQuery("query")),
          Include: S.optional(S.String).pipe(T.HttpQuery("include")),
          Order: S.optional(S.String).pipe(T.HttpQuery("order")),
          Sort: S.optional(S.String).pipe(T.HttpQuery("sort")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/api/v1/users" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeUsersRequest" });
    case 1:
      return S.Array(__S(50, __c3, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Users: S.optional(__S(641, __c40, 1)),
          TotalNumberOfUsers: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeUsersResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: SensitiveString.pipe(T.HttpHeader("Authentication")),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/api/v1/me" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCurrentUserRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          IncludeCustomMetadata: S.optional(S.Boolean).pipe(T.HttpQuery("includeCustomMetadata")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/documents/{DocumentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDocumentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(544, __c34, 0)),
          CustomMetadata: S.optional(__S(144, __c9, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetDocumentResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/documents/{DocumentId}/path" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDocumentPathRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Name: S.optional(SensitiveString) }),
      ).annotate({ identifier: "ResourcePathComponent" });
    case 1:
      return S.Array(__S(704, __c44, 0));
    case 2:
      return S.suspend(() => S.Struct({ Components: S.optional(__S(705, __c44, 1)) })).annotate({
        identifier: "ResourcePath",
      });
    case 3:
      return S.suspend(() => S.Struct({ Path: S.optional(__S(706, __c44, 2)) }).pipe(ns)).annotate({
        identifier: "GetDocumentPathResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          VersionId: S.String.pipe(T.HttpLabel("VersionId")),
          Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
          IncludeCustomMetadata: S.optional(S.Boolean).pipe(T.HttpQuery("includeCustomMetadata")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDocumentVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(497, __c31, 1)),
          CustomMetadata: S.optional(__S(144, __c9, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetDocumentVersionResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          FolderId: S.String.pipe(T.HttpLabel("FolderId")),
          IncludeCustomMetadata: S.optional(S.Boolean).pipe(T.HttpQuery("includeCustomMetadata")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/folders/{FolderId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFolderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(176, __c11, 0)),
          CustomMetadata: S.optional(__S(144, __c9, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetFolderResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          FolderId: S.String.pipe(T.HttpLabel("FolderId")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/folders/{FolderId}/path" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFolderPathRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          UserId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          CollectionType: S.optional(S.String).pipe(T.HttpQuery("collectionType")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/api/v1/resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcesRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          Id: S.optional(S.String),
          Name: S.optional(SensitiveString),
          ContentCreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ContentModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ContentType: S.optional(S.String),
          DocumentSizeInBytes: S.optional(S.Number),
          ParentFolderId: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/api/v1/documents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InitiateDocumentVersionUploadRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UploadUrl: S.optional(SensitiveString),
          SignedHeaders: S.optional(__S(144, __c9, 0)),
        }),
      ).annotate({ identifier: "UploadMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(544, __c34, 0)),
          UploadMetadata: S.optional(__S(785, __c49, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "InitiateDocumentVersionUploadResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/api/v1/resources/{ResourceId}/permissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveAllResourcePermissionsRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
          PrincipalId: S.String.pipe(T.HttpLabel("PrincipalId")),
          PrincipalType: S.optional(S.String).pipe(T.HttpQuery("type")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/api/v1/resources/{ResourceId}/permissions/{PrincipalId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveResourcePermissionRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/api/v1/documentVersions/restore/{DocumentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RestoreDocumentVersionsRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ Id: S.String, Roles: S.optional(__S(848, __c53, 0)) }),
      ).annotate({ identifier: "SearchPrincipalType" });
    case 2:
      return S.Array(__S(849, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ StartValue: S.optional(S.Number), EndValue: S.optional(S.Number) }),
      ).annotate({ identifier: "LongRangeType" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          StartValue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndValue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DateRangeType" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          TextLocales: S.optional(__S(848, __c53, 0)),
          ContentCategories: S.optional(__S(848, __c53, 0)),
          ResourceTypes: S.optional(__S(848, __c53, 0)),
          Labels: S.optional(__S(928, __c58, 0)),
          Principals: S.optional(__S(850, __c53, 2)),
          AncestorIds: S.optional(__S(928, __c58, 0)),
          SearchCollectionTypes: S.optional(__S(848, __c53, 0)),
          SizeRange: S.optional(__S(851, __c53, 3)),
          CreatedRange: S.optional(__S(852, __c53, 4)),
          ModifiedRange: S.optional(__S(852, __c53, 4)),
        }),
      ).annotate({ identifier: "Filters" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Field: S.optional(S.String), Order: S.optional(S.String) }),
      ).annotate({ identifier: "SearchSortResult" });
    case 7:
      return S.Array(__S(854, __c53, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          QueryText: S.optional(SensitiveString),
          QueryScopes: S.optional(__S(848, __c53, 0)),
          OrganizationId: S.optional(S.String),
          AdditionalResponseFields: S.optional(__S(848, __c53, 0)),
          Filters: S.optional(__S(853, __c53, 5)),
          OrderBy: S.optional(__S(855, __c53, 7)),
          Limit: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/api/v1/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchResourcesRequest" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          WebUrl: S.optional(SensitiveString),
          DocumentMetadata: S.optional(__S(544, __c34, 0)),
          FolderMetadata: S.optional(__S(176, __c11, 0)),
          CommentMetadata: S.optional(__S(448, __c28, 0)),
          DocumentVersionMetadata: S.optional(__S(497, __c31, 1)),
        }),
      ).annotate({ identifier: "ResponseItem" });
    case 10:
      return S.Array(__S(857, __c53, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(858, __c53, 10)), Marker: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "SearchResourcesResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          Name: S.optional(SensitiveString),
          ParentFolderId: S.optional(S.String),
          ResourceState: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PATCH", uri: "/api/v1/documents/{DocumentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDocumentRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
          VersionId: S.String.pipe(T.HttpLabel("VersionId")),
          VersionStatus: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PATCH", uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDocumentVersionRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          FolderId: S.String.pipe(T.HttpLabel("FolderId")),
          Name: S.optional(SensitiveString),
          ParentFolderId: S.optional(S.String),
          ResourceState: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PATCH", uri: "/api/v1/folders/{FolderId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFolderRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationToken: S.optional(SensitiveString).pipe(T.HttpHeader("Authentication")),
          UserId: S.String.pipe(T.HttpLabel("UserId")),
          GivenName: S.optional(SensitiveString),
          Surname: S.optional(SensitiveString),
          Type: S.optional(S.String),
          StorageRule: S.optional(__S(48, __c3, 0)),
          TimeZoneId: S.optional(S.String),
          Locale: S.optional(S.String),
          GrantPoweruserPrivileges: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PATCH", uri: "/api/v1/users/{UserId}" }),
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
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
