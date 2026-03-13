// ==========================================================================
// Google Drive API (drive v3)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "drive",
  version: "v3",
  rootUrl: "https://www.googleapis.com/",
  servicePath: "drive/v3/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Permission {
  /** Output only. Deprecated: Output only. Use `permissionDetails` instead. */
  teamDrivePermissionDetails?: Array<{
    teamDrivePermissionType?: string;
    inheritedFrom?: string;
    role?: string;
    inherited?: boolean;
  }>;
  /** Indicates the view for this permission. Only populated for permissions that belong to a view. The only supported values are `published` and `metadata`: * `published`: The permission's role is `publishedReader`. * `metadata`: The item is only visible to the `metadata` view because the item has limited access and the scope has at least read access to the parent. The `metadata` view is only supported on folders. For more information, see [Views](https://developers.google.com/workspace/drive/api/guides/ref-roles#views). */
  view?: string;
  /** The role granted by this permission. Supported values include: * `owner` * `organizer` * `fileOrganizer` * `writer` * `commenter` * `reader` For more information, see [Roles and permissions](https://developers.google.com/workspace/drive/api/guides/ref-roles). */
  role?: string;
  /** The domain to which this permission refers. */
  domain?: string;
  /** The email address of the user or group to which this permission refers. */
  emailAddress?: string;
  /** Output only. The "pretty" name of the value of the permission. The following is a list of examples for each type of permission: * `user` - User's full name, as defined for their Google Account, such as "Dana A." * `group` - Name of the Google Group, such as "The Company Administrators." * `domain` - String domain name, such as "cymbalgroup.com." * `anyone` - No `displayName` is present. */
  displayName?: string;
  /** Output only. Whether the account associated with this permission has been deleted. This field only pertains to permissions of type `user` or `group`. */
  deleted?: boolean;
  /** Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type `domain` or `anyone`. */
  allowFileDiscovery?: boolean;
  /** Output only. Details of whether the permissions on this item are inherited or are directly on this item. */
  permissionDetails?: Array<{
    inherited?: boolean;
    permissionType?: string;
    inheritedFrom?: string;
    role?: string;
  }>;
  /** The time at which this permission will expire (RFC 3339 date-time). Expiration times have the following restrictions: - They can only be set on user and group permissions - The time must be in the future - The time cannot be more than a year in the future */
  expirationTime?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#permission"`. */
  kind?: string;
  /** Whether the account associated with this permission is a pending owner. Only populated for permissions of type `user` for files that aren't in a shared drive. */
  pendingOwner?: boolean;
  /** Output only. The ID of this permission. This is a unique identifier for the grantee, and is published in the [User resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/User) as `permissionId`. IDs should be treated as opaque values. */
  id?: string;
  /** The type of the grantee. Supported values include: * `user` * `group` * `domain` * `anyone` When creating a permission, if `type` is `user` or `group`, you must provide an `emailAddress` for the user or group. If `type` is `domain`, you must provide a `domain`. If `type` is `anyone`, no extra information is required. */
  type?: string;
  /** When `true`, only organizers, owners, and users with permissions added directly on the item can access it. */
  inheritedPermissionsDisabled?: boolean;
  /** Output only. A link to the user's profile photo, if available. */
  photoLink?: string;
}

export const Permission: Schema.Schema<Permission> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      teamDrivePermissionDetails: Schema.optional(
        Schema.Array(
          Schema.Struct({
            teamDrivePermissionType: Schema.optional(Schema.String),
            inheritedFrom: Schema.optional(Schema.String),
            role: Schema.optional(Schema.String),
            inherited: Schema.optional(Schema.Boolean),
          }),
        ),
      ),
      view: Schema.optional(Schema.String),
      role: Schema.optional(Schema.String),
      domain: Schema.optional(Schema.String),
      emailAddress: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      deleted: Schema.optional(Schema.Boolean),
      allowFileDiscovery: Schema.optional(Schema.Boolean),
      permissionDetails: Schema.optional(
        Schema.Array(
          Schema.Struct({
            inherited: Schema.optional(Schema.Boolean),
            permissionType: Schema.optional(Schema.String),
            inheritedFrom: Schema.optional(Schema.String),
            role: Schema.optional(Schema.String),
          }),
        ),
      ),
      expirationTime: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      pendingOwner: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      inheritedPermissionsDisabled: Schema.optional(Schema.Boolean),
      photoLink: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Permission" }) as any as Schema.Schema<Permission>;

export interface User {
  /** Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester. */
  emailAddress?: string;
  /** Output only. A link to the user's profile photo, if available. */
  photoLink?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`. */
  kind?: string;
  /** Output only. Whether this user is the requesting user. */
  me?: boolean;
  /** Output only. The user's ID as visible in Permission resources. */
  permissionId?: string;
  /** Output only. A plain text displayable name for this user. */
  displayName?: string;
}

export const User: Schema.Schema<User> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      emailAddress: Schema.optional(Schema.String),
      photoLink: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      me: Schema.optional(Schema.Boolean),
      permissionId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface Reply {
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#reply"`. */
  kind?: string;
  /** Output only. The ID of the reply. */
  id?: string;
  /** Output only. The content of the reply with HTML formatting. */
  htmlContent?: string;
  /** The plain text content of the reply. This field is used for setting the content, while `htmlContent` should be displayed. This field is required by the `create` method if no `action` value is specified. */
  content?: string;
  /** The action the reply performed to the parent comment. The supported values are: * `resolve` * `reopen` */
  action?: string;
  /** Output only. A list of email addresses for users mentioned in this comment. If no users are mentioned, the list is empty. */
  mentionedEmailAddresses?: Array<string>;
  /** Output only. The author of the reply. The author's email address and permission ID won't be populated. */
  author?: User;
  /** The last time the reply was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** Output only. Whether the reply has been deleted. A deleted reply has no content. */
  deleted?: boolean;
  /** The time at which the reply was created (RFC 3339 date-time). */
  createdTime?: string;
  /** Output only. The email address of the user assigned to this comment. If no user is assigned, the field is unset. */
  assigneeEmailAddress?: string;
}

export const Reply: Schema.Schema<Reply> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      htmlContent: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      mentionedEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
      author: Schema.optional(User),
      modifiedTime: Schema.optional(Schema.String),
      deleted: Schema.optional(Schema.Boolean),
      createdTime: Schema.optional(Schema.String),
      assigneeEmailAddress: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Reply" }) as any as Schema.Schema<Reply>;

export interface ReplyList {
  /** The list of replies. If `nextPageToken` is populated, then this list may be incomplete and an additional page of results should be fetched. */
  replies?: Array<Reply>;
  /** The page token for the next page of replies. This will be absent if the end of the replies list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#replyList"`. */
  kind?: string;
}

export const ReplyList: Schema.Schema<ReplyList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      replies: Schema.optional(Schema.Array(Reply)),
      nextPageToken: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ReplyList" }) as any as Schema.Schema<ReplyList>;

export interface ReviewerResponse {
  /** A Reviewer’s Response for the Approval. */
  response?:
    | "RESPONSE_UNSPECIFIED"
    | "NO_RESPONSE"
    | "APPROVED"
    | "DECLINED"
    | (string & {});
  /** This is always drive#reviewerResponse. */
  kind?: string;
  /** The user that is responsible for this response. */
  reviewer?: User;
}

export const ReviewerResponse: Schema.Schema<ReviewerResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      response: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      reviewer: Schema.optional(User),
    }),
  ).annotate({
    identifier: "ReviewerResponse",
  }) as any as Schema.Schema<ReviewerResponse>;

export interface LabelField {
  /** This is always drive#labelField. */
  kind?: string;
  /** The identifier of this label field. */
  id?: string;
  /** The field type. While new values may be supported in the future, the following are currently allowed: * `dateString` * `integer` * `selection` * `text` * `user` */
  valueType?: string;
  /** Only present if `valueType` is `selection` */
  selection?: Array<string>;
  /** Only present if valueType is dateString. RFC 3339 formatted date: YYYY-MM-DD. */
  dateString?: Array<string>;
  /** Only present if `valueType` is `integer`. */
  integer?: Array<string>;
  /** Only present if `valueType` is `text`. */
  text?: Array<string>;
  /** Only present if `valueType` is `user`. */
  user?: Array<User>;
}

export const LabelField: Schema.Schema<LabelField> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      valueType: Schema.optional(Schema.String),
      selection: Schema.optional(Schema.Array(Schema.String)),
      dateString: Schema.optional(Schema.Array(Schema.String)),
      integer: Schema.optional(Schema.Array(Schema.String)),
      text: Schema.optional(Schema.Array(Schema.String)),
      user: Schema.optional(Schema.Array(User)),
    }),
  ).annotate({ identifier: "LabelField" }) as any as Schema.Schema<LabelField>;

export interface Label {
  /** The ID of the label. */
  id?: string;
  /** The revision ID of the label. */
  revisionId?: string;
  /** This is always drive#label */
  kind?: string;
  /** A map of the fields on the label, keyed by the field's ID. */
  fields?: Record<string, LabelField>;
}

export const Label: Schema.Schema<Label> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      revisionId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      fields: Schema.optional(Schema.Record(Schema.String, LabelField)),
    }),
  ).annotate({ identifier: "Label" }) as any as Schema.Schema<Label>;

export interface Revision {
  /** Output only. The MD5 checksum of the revision's content. This is only applicable to files with binary content in Drive. */
  md5Checksum?: string;
  /** Output only. A link to the published revision. This is only populated for Docs Editors files. */
  publishedLink?: string;
  /** Output only. The size of the revision's content in bytes. This is only applicable to files with binary content in Drive. */
  size?: string;
  /** Whether subsequent revisions will be automatically republished. This is only applicable to Docs Editors files. */
  publishAuto?: boolean;
  /** Whether this revision is published. This is only applicable to Docs Editors files. */
  published?: boolean;
  /** Output only. Links for exporting Docs Editors files to specific formats. */
  exportLinks?: Record<string, string>;
  /** Output only. The ID of the revision. */
  id?: string;
  /** Whether to keep this revision forever, even if it is no longer the head revision. If not set, the revision will be automatically purged 30 days after newer content is uploaded. This can be set on a maximum of 200 revisions for a file. This field is only applicable to files with binary content in Drive. */
  keepForever?: boolean;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#revision"`. */
  kind?: string;
  /** Output only. The original filename used to create this revision. This is only applicable to files with binary content in Drive. */
  originalFilename?: string;
  /** Whether this revision is published outside the domain. This is only applicable to Docs Editors files. */
  publishedOutsideDomain?: boolean;
  /** Output only. The MIME type of the revision. */
  mimeType?: string;
  /** Output only. The last user to modify this revision. This field is only populated when the last modification was performed by a signed-in user. */
  lastModifyingUser?: User;
  /** The last time the revision was modified (RFC 3339 date-time). */
  modifiedTime?: string;
}

export const Revision: Schema.Schema<Revision> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      md5Checksum: Schema.optional(Schema.String),
      publishedLink: Schema.optional(Schema.String),
      size: Schema.optional(Schema.String),
      publishAuto: Schema.optional(Schema.Boolean),
      published: Schema.optional(Schema.Boolean),
      exportLinks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      id: Schema.optional(Schema.String),
      keepForever: Schema.optional(Schema.Boolean),
      kind: Schema.optional(Schema.String),
      originalFilename: Schema.optional(Schema.String),
      publishedOutsideDomain: Schema.optional(Schema.Boolean),
      mimeType: Schema.optional(Schema.String),
      lastModifyingUser: Schema.optional(User),
      modifiedTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Revision" }) as any as Schema.Schema<Revision>;

export interface DownloadRestriction {
  /** Whether download and copy is restricted for readers. */
  restrictedForReaders?: boolean;
  /** Whether download and copy is restricted for writers. If `true`, download is also restricted for readers. */
  restrictedForWriters?: boolean;
}

export const DownloadRestriction: Schema.Schema<DownloadRestriction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      restrictedForReaders: Schema.optional(Schema.Boolean),
      restrictedForWriters: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DownloadRestriction",
  }) as any as Schema.Schema<DownloadRestriction>;

export interface DownloadRestrictionsMetadata {
  /** The download restriction of the file applied directly by the owner or organizer. This doesn't take into account shared drive settings or DLP rules. */
  itemDownloadRestriction?: DownloadRestriction;
  /** Output only. The effective download restriction applied to this file. This considers all restriction settings and DLP rules. */
  effectiveDownloadRestrictionWithContext?: DownloadRestriction;
}

export const DownloadRestrictionsMetadata: Schema.Schema<DownloadRestrictionsMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      itemDownloadRestriction: Schema.optional(DownloadRestriction),
      effectiveDownloadRestrictionWithContext:
        Schema.optional(DownloadRestriction),
    }),
  ).annotate({
    identifier: "DownloadRestrictionsMetadata",
  }) as any as Schema.Schema<DownloadRestrictionsMetadata>;

export interface ContentRestriction {
  /** Reason for why the content of the file is restricted. This is only mutable on requests that also set `readOnly=true`. */
  reason?: string;
  /** Whether the content restriction can only be modified or removed by a user who owns the file. For files in shared drives, any user with `organizer` capabilities can modify or remove this content restriction. */
  ownerRestricted?: boolean;
  /** The time at which the content restriction was set (formatted RFC 3339 timestamp). Only populated if readOnly is true. */
  restrictionTime?: string;
  /** Output only. Whether the content restriction was applied by the system, for example due to an esignature. Users cannot modify or remove system restricted content restrictions. */
  systemRestricted?: boolean;
  /** Whether the content of the file is read-only. If a file is read-only, a new revision of the file may not be added, comments may not be added or modified, and the title of the file may not be modified. */
  readOnly?: boolean;
  /** Output only. The type of the content restriction. Currently the only possible value is `globalContentRestriction`. */
  type?: string;
  /** Output only. The user who set the content restriction. Only populated if `readOnly=true`. */
  restrictingUser?: User;
}

export const ContentRestriction: Schema.Schema<ContentRestriction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      ownerRestricted: Schema.optional(Schema.Boolean),
      restrictionTime: Schema.optional(Schema.String),
      systemRestricted: Schema.optional(Schema.Boolean),
      readOnly: Schema.optional(Schema.Boolean),
      type: Schema.optional(Schema.String),
      restrictingUser: Schema.optional(User),
    }),
  ).annotate({
    identifier: "ContentRestriction",
  }) as any as Schema.Schema<ContentRestriction>;

export interface File {
  /** Shortcut file details. Only populated for shortcut files, which have the mimeType field set to `application/vnd.google-apps.shortcut`. Can only be set on `files.create` requests. */
  shortcutDetails?: {
    targetId?: string;
    targetResourceKey?: string;
    targetMimeType?: string;
  };
  /** The MIME type of the file. Google Drive attempts to automatically detect an appropriate value from uploaded content, if no value is provided. The value cannot be changed unless a new revision is uploaded. If a file is created with a Google Doc MIME type, the uploaded content is imported, if possible. The supported import formats are published in the [`about`](/workspace/drive/api/reference/rest/v3/about) resource. */
  mimeType?: string;
  /** he last time the file was modified by anyone (RFC 3339 date-time). Note that setting modifiedTime will also update modifiedByMeTime for the user. */
  modifiedTime?: string;
  /** Output only. The thumbnail version for use in thumbnail cache invalidation. */
  thumbnailVersion?: string;
  /** Output only. ID of the shared drive the file resides in. Only populated for items in shared drives. */
  driveId?: string;
  /** Output only. The MD5 checksum for the content of the file. This is only applicable to files with binary content in Google Drive. */
  md5Checksum?: string;
  /** Output only. Whether the file has been modified by this user. */
  modifiedByMe?: boolean;
  /** Whether the user has starred the file. */
  starred?: boolean;
  /** Output only. The full file extension extracted from the `name` field. May contain multiple concatenated extensions, such as "tar.gz". This is only available for files with binary content in Google Drive. This is automatically updated when the `name` field changes, however it's not cleared if the new name doesn't contain a valid extension. */
  fullFileExtension?: string;
  /** Output only. The final component of `fullFileExtension`. This is only available for files with binary content in Google Drive. */
  fileExtension?: string;
  /** The color for a folder or a shortcut to a folder as an RGB hex string. The supported colors are published in the `folderColorPalette` field of the [`about`](/workspace/drive/api/reference/rest/v3/about) resource. If an unsupported color is specified, the closest color in the palette is used instead. */
  folderColorRgb?: string;
  /** Output only. Whether there are permissions directly on this file. This field is only populated for items in shared drives. */
  hasAugmentedPermissions?: boolean;
  /** Output only. Links for exporting Docs Editors files to specific formats. */
  exportLinks?: Record<string, string>;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#file"`. */
  kind?: string;
  /** The original filename of the uploaded content if available, or else the original value of the `name` field. This is only available for files with binary content in Google Drive. */
  originalFilename?: string;
  /** Output only. A link for downloading the content of the file in a browser. This is only available for files with binary content in Google Drive. */
  webContentLink?: string;
  /** Output only. Whether this file has a thumbnail. This doesn't indicate whether the requesting app has access to the thumbnail. To check access, look for the presence of the thumbnailLink field. */
  hasThumbnail?: boolean;
  /** The ID of the file. */
  id?: string;
  /** The time at which the file was shared with the user, if applicable (RFC 3339 date-time). */
  sharedWithMeTime?: string;
  /** Output only. The number of storage quota bytes used by the file. This includes the head revision as well as previous revisions with `keepForever` enabled. */
  quotaBytesUsed?: string;
  /** Output only. The last user to modify the file. This field is only populated when the last modification was performed by a signed-in user. */
  lastModifyingUser?: User;
  /** Output only. Whether the file has been shared. Not populated for items in shared drives. */
  shared?: boolean;
  /** Output only. The list of spaces which contain the file. The currently supported values are `drive`, `appDataFolder`, and `photos`. */
  spaces?: Array<string>;
  /** The time at which the file was created (RFC 3339 date-time). */
  createdTime?: string;
  /** A collection of arbitrary key-value pairs which are private to the requesting app. Entries with null values are cleared in update and copy requests. These properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with a OAuth 2 client ID. You cannot use an API key to retrieve private properties. */
  appProperties?: Record<string, string>;
  /** Output only. An overview of the labels on the file. */
  labelInfo?: { labels?: Array<Label> };
  /** Download restrictions applied on the file. */
  downloadRestrictions?: DownloadRestrictionsMetadata;
  /** Output only. A static, unauthenticated link to the file's icon. */
  iconLink?: string;
  /** Contains details about the link URLs that clients are using to refer to this item. */
  linkShareMetadata?: {
    securityUpdateEligible?: boolean;
    securityUpdateEnabled?: boolean;
  };
  /** Output only. Additional metadata about video media. This may not be available immediately upon upload. */
  videoMediaMetadata?: {
    height?: number;
    width?: number;
    durationMillis?: string;
  };
  /** A short description of the file. */
  description?: string;
  /** The name of the file. This isn't necessarily unique within a folder. Note that for immutable items such as the top-level folders of shared drives, the My Drive root folder, and the Application Data folder, the name is constant. */
  name?: string;
  /** Output only. If the file has been explicitly trashed, the user who trashed it. Only populated for items in shared drives. */
  trashingUser?: User;
  /** Output only. Whether the file was created or opened by the requesting app. */
  isAppAuthorized?: boolean;
  /** Output only. A link for opening the file in a relevant Google editor or viewer in a browser. */
  webViewLink?: string;
  /** Output only. The user who shared the file with the requesting user, if applicable. */
  sharingUser?: User;
  /** Output only. The SHA1 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha1Checksum?: string;
  /** The time that the item was trashed (RFC 3339 date-time). Only populated for items in shared drives. */
  trashedTime?: string;
  /** Output only. The full list of permissions for the file. This is only available if the requesting user can share the file. Not populated for items in shared drives. */
  permissions?: Array<Permission>;
  /** The last time the file was viewed by the user (RFC 3339 date-time). */
  viewedByMeTime?: string;
  /** Whether users with only `writer` permission can modify the file's permissions. Not populated for items in shared drives. */
  writersCanShare?: boolean;
  /** Additional information about the content of the file. These fields are never populated in responses. */
  contentHints?: {
    thumbnail?: { image?: string; mimeType?: string };
    indexableText?: string;
  };
  /** Output only. Whether the file has been explicitly trashed, as opposed to recursively trashed from a parent folder. */
  explicitlyTrashed?: boolean;
  /** Output only. Capabilities the current user has on this file. Each capability corresponds to a fine-grained action that a user may take. For more information, see [Understand file capabilities](https://developers.google.com/workspace/drive/api/guides/manage-sharing#capabilities). */
  capabilities?: {
    canModifyContentRestriction?: boolean;
    canRemoveContentRestriction?: boolean;
    canComment?: boolean;
    canUntrash?: boolean;
    canShare?: boolean;
    canReadDrive?: boolean;
    canTrashChildren?: boolean;
    canMoveItemIntoTeamDrive?: boolean;
    canModifyContent?: boolean;
    canAddFolderFromAnotherDrive?: boolean;
    canListChildren?: boolean;
    canDeleteChildren?: boolean;
    canRename?: boolean;
    canMoveChildrenOutOfDrive?: boolean;
    canReadRevisions?: boolean;
    canChangeCopyRequiresWriterPermission?: boolean;
    canModifyLabels?: boolean;
    canDisableInheritedPermissions?: boolean;
    canMoveChildrenWithinDrive?: boolean;
    canChangeViewersCanCopyContent?: boolean;
    canCopy?: boolean;
    canTrash?: boolean;
    canChangeSecurityUpdateEnabled?: boolean;
    canAcceptOwnership?: boolean;
    canDownload?: boolean;
    canReadTeamDrive?: boolean;
    canEdit?: boolean;
    canMoveChildrenOutOfTeamDrive?: boolean;
    canRemoveMyDriveParent?: boolean;
    canMoveChildrenWithinTeamDrive?: boolean;
    canEnableInheritedPermissions?: boolean;
    canModifyEditorContentRestriction?: boolean;
    canAddChildren?: boolean;
    canReadLabels?: boolean;
    canMoveItemOutOfTeamDrive?: boolean;
    canDelete?: boolean;
    canRemoveChildren?: boolean;
    canMoveItemWithinDrive?: boolean;
    canChangeItemDownloadRestriction?: boolean;
    canMoveItemOutOfDrive?: boolean;
    canMoveItemWithinTeamDrive?: boolean;
    canMoveTeamDriveItem?: boolean;
    canAddMyDriveParent?: boolean;
    canModifyOwnerContentRestriction?: boolean;
  };
  /** Whether the options to copy, print, or download this file should be disabled for readers and commenters. */
  copyRequiresWriterPermission?: boolean;
  /** Output only. The ID of the file's head revision. This is currently only available for files with binary content in Google Drive. */
  headRevisionId?: string;
  /** Output only. The owner of this file. Only certain legacy files may have more than one owner. This field isn't populated for items in shared drives. */
  owners?: Array<User>;
  /** Output only. List of permission IDs for users with access to this file. */
  permissionIds?: Array<string>;
  /** Output only. The SHA256 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha256Checksum?: string;
  /** Output only. Size in bytes of blobs and Google Workspace editor files. Won't be populated for files that have no size, like shortcuts and folders. */
  size?: string;
  /** The ID of the parent folder containing the file. A file can only have one parent folder; specifying multiple parents isn't supported. If not specified as part of a create request, the file is placed directly in the user's My Drive folder. If not specified as part of a copy request, the file inherits any discoverable parent of the source file. Update requests must use the `addParents` and `removeParents` parameters to modify the parents list. */
  parents?: Array<string>;
  /** The last time the file was modified by the user (RFC 3339 date-time). */
  modifiedByMeTime?: string;
  /** Whether this file has inherited permissions disabled. Inherited permissions are enabled by default. */
  inheritedPermissionsDisabled?: boolean;
  /** A collection of arbitrary key-value pairs which are visible to all apps. Entries with null values are cleared in update and copy requests. */
  properties?: Record<string, string>;
  /** Output only. Additional metadata about image media, if available. */
  imageMediaMetadata?: {
    meteringMode?: string;
    location?: { altitude?: number; latitude?: number; longitude?: number };
    time?: string;
    subjectDistance?: number;
    cameraModel?: string;
    exposureTime?: number;
    rotation?: number;
    lens?: string;
    height?: number;
    aperture?: number;
    whiteBalance?: string;
    cameraMake?: string;
    sensor?: string;
    maxApertureValue?: number;
    flashUsed?: boolean;
    width?: number;
    exposureBias?: number;
    exposureMode?: string;
    colorSpace?: string;
    focalLength?: number;
    isoSpeed?: number;
  };
  /** Output only. A monotonically increasing version number for the file. This reflects every change made to the file on the server, even those not visible to the user. */
  version?: string;
  /** Restrictions for accessing the content of the file. Only populated if such a restriction exists. */
  contentRestrictions?: Array<ContentRestriction>;
  /** Output only. A key needed to access the item via a shared link. */
  resourceKey?: string;
  /** Output only. Whether the file has been viewed by this user. */
  viewedByMe?: boolean;
  /** Output only. Whether the user owns the file. Not populated for items in shared drives. */
  ownedByMe?: boolean;
  /** Deprecated: Use `copyRequiresWriterPermission` instead. */
  viewersCanCopyContent?: boolean;
  /** Deprecated: Output only. Use `driveId` instead. */
  teamDriveId?: string;
  /** Whether the file has been trashed, either explicitly or from a trashed parent folder. Only the owner may trash a file, and other users cannot see files in the owner's trash. */
  trashed?: boolean;
  /** Output only. A short-lived link to the file's thumbnail, if available. Typically lasts on the order of hours. Not intended for direct usage on web applications due to [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policies. Consider using a proxy server. Only populated when the requesting app can access the file's content. If the file isn't shared publicly, the URL returned in `files.thumbnailLink` must be fetched using a credentialed request. */
  thumbnailLink?: string;
}

export const File: Schema.Schema<File> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      shortcutDetails: Schema.optional(
        Schema.Struct({
          targetId: Schema.optional(Schema.String),
          targetResourceKey: Schema.optional(Schema.String),
          targetMimeType: Schema.optional(Schema.String),
        }),
      ),
      mimeType: Schema.optional(Schema.String),
      modifiedTime: Schema.optional(Schema.String),
      thumbnailVersion: Schema.optional(Schema.String),
      driveId: Schema.optional(Schema.String),
      md5Checksum: Schema.optional(Schema.String),
      modifiedByMe: Schema.optional(Schema.Boolean),
      starred: Schema.optional(Schema.Boolean),
      fullFileExtension: Schema.optional(Schema.String),
      fileExtension: Schema.optional(Schema.String),
      folderColorRgb: Schema.optional(Schema.String),
      hasAugmentedPermissions: Schema.optional(Schema.Boolean),
      exportLinks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      kind: Schema.optional(Schema.String),
      originalFilename: Schema.optional(Schema.String),
      webContentLink: Schema.optional(Schema.String),
      hasThumbnail: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      sharedWithMeTime: Schema.optional(Schema.String),
      quotaBytesUsed: Schema.optional(Schema.String),
      lastModifyingUser: Schema.optional(User),
      shared: Schema.optional(Schema.Boolean),
      spaces: Schema.optional(Schema.Array(Schema.String)),
      createdTime: Schema.optional(Schema.String),
      appProperties: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      labelInfo: Schema.optional(
        Schema.Struct({ labels: Schema.optional(Schema.Array(Label)) }),
      ),
      downloadRestrictions: Schema.optional(DownloadRestrictionsMetadata),
      iconLink: Schema.optional(Schema.String),
      linkShareMetadata: Schema.optional(
        Schema.Struct({
          securityUpdateEligible: Schema.optional(Schema.Boolean),
          securityUpdateEnabled: Schema.optional(Schema.Boolean),
        }),
      ),
      videoMediaMetadata: Schema.optional(
        Schema.Struct({
          height: Schema.optional(Schema.Number),
          width: Schema.optional(Schema.Number),
          durationMillis: Schema.optional(Schema.String),
        }),
      ),
      description: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      trashingUser: Schema.optional(User),
      isAppAuthorized: Schema.optional(Schema.Boolean),
      webViewLink: Schema.optional(Schema.String),
      sharingUser: Schema.optional(User),
      sha1Checksum: Schema.optional(Schema.String),
      trashedTime: Schema.optional(Schema.String),
      permissions: Schema.optional(Schema.Array(Permission)),
      viewedByMeTime: Schema.optional(Schema.String),
      writersCanShare: Schema.optional(Schema.Boolean),
      contentHints: Schema.optional(
        Schema.Struct({
          thumbnail: Schema.optional(
            Schema.Struct({
              image: Schema.optional(Schema.String),
              mimeType: Schema.optional(Schema.String),
            }),
          ),
          indexableText: Schema.optional(Schema.String),
        }),
      ),
      explicitlyTrashed: Schema.optional(Schema.Boolean),
      capabilities: Schema.optional(
        Schema.Struct({
          canModifyContentRestriction: Schema.optional(Schema.Boolean),
          canRemoveContentRestriction: Schema.optional(Schema.Boolean),
          canComment: Schema.optional(Schema.Boolean),
          canUntrash: Schema.optional(Schema.Boolean),
          canShare: Schema.optional(Schema.Boolean),
          canReadDrive: Schema.optional(Schema.Boolean),
          canTrashChildren: Schema.optional(Schema.Boolean),
          canMoveItemIntoTeamDrive: Schema.optional(Schema.Boolean),
          canModifyContent: Schema.optional(Schema.Boolean),
          canAddFolderFromAnotherDrive: Schema.optional(Schema.Boolean),
          canListChildren: Schema.optional(Schema.Boolean),
          canDeleteChildren: Schema.optional(Schema.Boolean),
          canRename: Schema.optional(Schema.Boolean),
          canMoveChildrenOutOfDrive: Schema.optional(Schema.Boolean),
          canReadRevisions: Schema.optional(Schema.Boolean),
          canChangeCopyRequiresWriterPermission: Schema.optional(
            Schema.Boolean,
          ),
          canModifyLabels: Schema.optional(Schema.Boolean),
          canDisableInheritedPermissions: Schema.optional(Schema.Boolean),
          canMoveChildrenWithinDrive: Schema.optional(Schema.Boolean),
          canChangeViewersCanCopyContent: Schema.optional(Schema.Boolean),
          canCopy: Schema.optional(Schema.Boolean),
          canTrash: Schema.optional(Schema.Boolean),
          canChangeSecurityUpdateEnabled: Schema.optional(Schema.Boolean),
          canAcceptOwnership: Schema.optional(Schema.Boolean),
          canDownload: Schema.optional(Schema.Boolean),
          canReadTeamDrive: Schema.optional(Schema.Boolean),
          canEdit: Schema.optional(Schema.Boolean),
          canMoveChildrenOutOfTeamDrive: Schema.optional(Schema.Boolean),
          canRemoveMyDriveParent: Schema.optional(Schema.Boolean),
          canMoveChildrenWithinTeamDrive: Schema.optional(Schema.Boolean),
          canEnableInheritedPermissions: Schema.optional(Schema.Boolean),
          canModifyEditorContentRestriction: Schema.optional(Schema.Boolean),
          canAddChildren: Schema.optional(Schema.Boolean),
          canReadLabels: Schema.optional(Schema.Boolean),
          canMoveItemOutOfTeamDrive: Schema.optional(Schema.Boolean),
          canDelete: Schema.optional(Schema.Boolean),
          canRemoveChildren: Schema.optional(Schema.Boolean),
          canMoveItemWithinDrive: Schema.optional(Schema.Boolean),
          canChangeItemDownloadRestriction: Schema.optional(Schema.Boolean),
          canMoveItemOutOfDrive: Schema.optional(Schema.Boolean),
          canMoveItemWithinTeamDrive: Schema.optional(Schema.Boolean),
          canMoveTeamDriveItem: Schema.optional(Schema.Boolean),
          canAddMyDriveParent: Schema.optional(Schema.Boolean),
          canModifyOwnerContentRestriction: Schema.optional(Schema.Boolean),
        }),
      ),
      copyRequiresWriterPermission: Schema.optional(Schema.Boolean),
      headRevisionId: Schema.optional(Schema.String),
      owners: Schema.optional(Schema.Array(User)),
      permissionIds: Schema.optional(Schema.Array(Schema.String)),
      sha256Checksum: Schema.optional(Schema.String),
      size: Schema.optional(Schema.String),
      parents: Schema.optional(Schema.Array(Schema.String)),
      modifiedByMeTime: Schema.optional(Schema.String),
      inheritedPermissionsDisabled: Schema.optional(Schema.Boolean),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      imageMediaMetadata: Schema.optional(
        Schema.Struct({
          meteringMode: Schema.optional(Schema.String),
          location: Schema.optional(
            Schema.Struct({
              altitude: Schema.optional(Schema.Number),
              latitude: Schema.optional(Schema.Number),
              longitude: Schema.optional(Schema.Number),
            }),
          ),
          time: Schema.optional(Schema.String),
          subjectDistance: Schema.optional(Schema.Number),
          cameraModel: Schema.optional(Schema.String),
          exposureTime: Schema.optional(Schema.Number),
          rotation: Schema.optional(Schema.Number),
          lens: Schema.optional(Schema.String),
          height: Schema.optional(Schema.Number),
          aperture: Schema.optional(Schema.Number),
          whiteBalance: Schema.optional(Schema.String),
          cameraMake: Schema.optional(Schema.String),
          sensor: Schema.optional(Schema.String),
          maxApertureValue: Schema.optional(Schema.Number),
          flashUsed: Schema.optional(Schema.Boolean),
          width: Schema.optional(Schema.Number),
          exposureBias: Schema.optional(Schema.Number),
          exposureMode: Schema.optional(Schema.String),
          colorSpace: Schema.optional(Schema.String),
          focalLength: Schema.optional(Schema.Number),
          isoSpeed: Schema.optional(Schema.Number),
        }),
      ),
      version: Schema.optional(Schema.String),
      contentRestrictions: Schema.optional(Schema.Array(ContentRestriction)),
      resourceKey: Schema.optional(Schema.String),
      viewedByMe: Schema.optional(Schema.Boolean),
      ownedByMe: Schema.optional(Schema.Boolean),
      viewersCanCopyContent: Schema.optional(Schema.Boolean),
      teamDriveId: Schema.optional(Schema.String),
      trashed: Schema.optional(Schema.Boolean),
      thumbnailLink: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface Drive {
  /** The name of this shared drive. */
  name?: string;
  /** Output only. A short-lived link to this shared drive's background image. */
  backgroundImageLink?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#drive"`. */
  kind?: string;
  /** Whether the shared drive is hidden from default view. */
  hidden?: boolean;
  /** Output only. The ID of this shared drive which is also the ID of the top level folder of this shared drive. */
  id?: string;
  /** The color of this shared drive as an RGB hex string. It can only be set on a `drive.drives.update` request that does not set `themeId`. */
  colorRgb?: string;
  /** The ID of the theme from which the background image and color will be set. The set of possible `driveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.drives.create` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`. */
  themeId?: string;
  /** An image file and cropping parameters from which a background image for this shared drive is set. This is a write only field; it can only be set on `drive.drives.update` requests that don't set `themeId`. When specified, all fields of the `backgroundImageFile` must be set. */
  backgroundImageFile?: {
    xCoordinate?: number;
    yCoordinate?: number;
    width?: number;
    id?: string;
  };
  /** The time at which the shared drive was created (RFC 3339 date-time). */
  createdTime?: string;
  /** A set of restrictions that apply to this shared drive or items inside this shared drive. Note that restrictions can't be set when creating a shared drive. To add a restriction, first create a shared drive and then use `drives.update` to add restrictions. */
  restrictions?: {
    domainUsersOnly?: boolean;
    sharingFoldersRequiresOrganizerPermission?: boolean;
    downloadRestriction?: DownloadRestriction;
    copyRequiresWriterPermission?: boolean;
    driveMembersOnly?: boolean;
    adminManagedRestrictions?: boolean;
  };
  /** Output only. The organizational unit of this shared drive. This field is only populated on `drives.list` responses when the `useDomainAdminAccess` parameter is set to `true`. */
  orgUnitId?: string;
  /** Output only. Capabilities the current user has on this shared drive. */
  capabilities?: {
    canComment?: boolean;
    canChangeDriveMembersOnlyRestriction?: boolean;
    canEdit?: boolean;
    canChangeDomainUsersOnlyRestriction?: boolean;
    canTrashChildren?: boolean;
    canDownload?: boolean;
    canDeleteDrive?: boolean;
    canShare?: boolean;
    canCopy?: boolean;
    canChangeCopyRequiresWriterPermissionRestriction?: boolean;
    canManageMembers?: boolean;
    canChangeDownloadRestriction?: boolean;
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;
    canReadRevisions?: boolean;
    canChangeDriveBackground?: boolean;
    canRenameDrive?: boolean;
    canResetDriveRestrictions?: boolean;
    canListChildren?: boolean;
    canDeleteChildren?: boolean;
    canRename?: boolean;
    canAddChildren?: boolean;
  };
}

export const Drive: Schema.Schema<Drive> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      backgroundImageLink: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      hidden: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      colorRgb: Schema.optional(Schema.String),
      themeId: Schema.optional(Schema.String),
      backgroundImageFile: Schema.optional(
        Schema.Struct({
          xCoordinate: Schema.optional(Schema.Number),
          yCoordinate: Schema.optional(Schema.Number),
          width: Schema.optional(Schema.Number),
          id: Schema.optional(Schema.String),
        }),
      ),
      createdTime: Schema.optional(Schema.String),
      restrictions: Schema.optional(
        Schema.Struct({
          domainUsersOnly: Schema.optional(Schema.Boolean),
          sharingFoldersRequiresOrganizerPermission: Schema.optional(
            Schema.Boolean,
          ),
          downloadRestriction: Schema.optional(DownloadRestriction),
          copyRequiresWriterPermission: Schema.optional(Schema.Boolean),
          driveMembersOnly: Schema.optional(Schema.Boolean),
          adminManagedRestrictions: Schema.optional(Schema.Boolean),
        }),
      ),
      orgUnitId: Schema.optional(Schema.String),
      capabilities: Schema.optional(
        Schema.Struct({
          canComment: Schema.optional(Schema.Boolean),
          canChangeDriveMembersOnlyRestriction: Schema.optional(Schema.Boolean),
          canEdit: Schema.optional(Schema.Boolean),
          canChangeDomainUsersOnlyRestriction: Schema.optional(Schema.Boolean),
          canTrashChildren: Schema.optional(Schema.Boolean),
          canDownload: Schema.optional(Schema.Boolean),
          canDeleteDrive: Schema.optional(Schema.Boolean),
          canShare: Schema.optional(Schema.Boolean),
          canCopy: Schema.optional(Schema.Boolean),
          canChangeCopyRequiresWriterPermissionRestriction: Schema.optional(
            Schema.Boolean,
          ),
          canManageMembers: Schema.optional(Schema.Boolean),
          canChangeDownloadRestriction: Schema.optional(Schema.Boolean),
          canChangeSharingFoldersRequiresOrganizerPermissionRestriction:
            Schema.optional(Schema.Boolean),
          canReadRevisions: Schema.optional(Schema.Boolean),
          canChangeDriveBackground: Schema.optional(Schema.Boolean),
          canRenameDrive: Schema.optional(Schema.Boolean),
          canResetDriveRestrictions: Schema.optional(Schema.Boolean),
          canListChildren: Schema.optional(Schema.Boolean),
          canDeleteChildren: Schema.optional(Schema.Boolean),
          canRename: Schema.optional(Schema.Boolean),
          canAddChildren: Schema.optional(Schema.Boolean),
        }),
      ),
    }),
  ).annotate({ identifier: "Drive" }) as any as Schema.Schema<Drive>;

export interface TeamDrive {
  /** Capabilities the current user has on this Team Drive. */
  capabilities?: {
    canShare?: boolean;
    canDownload?: boolean;
    canRenameTeamDrive?: boolean;
    canEdit?: boolean;
    canChangeDomainUsersOnlyRestriction?: boolean;
    canTrashChildren?: boolean;
    canComment?: boolean;
    canChangeDownloadRestriction?: boolean;
    canResetTeamDriveRestrictions?: boolean;
    canManageMembers?: boolean;
    canDeleteTeamDrive?: boolean;
    canChangeTeamMembersOnlyRestriction?: boolean;
    canChangeCopyRequiresWriterPermissionRestriction?: boolean;
    canCopy?: boolean;
    canChangeTeamDriveBackground?: boolean;
    canReadRevisions?: boolean;
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;
    canAddChildren?: boolean;
    canRemoveChildren?: boolean;
    canRename?: boolean;
    canListChildren?: boolean;
    canDeleteChildren?: boolean;
  };
  /** The ID of the theme from which the background image and color will be set. The set of possible `teamDriveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.teamdrives.create` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`. */
  themeId?: string;
  /** An image file and cropping parameters from which a background image for this Team Drive is set. This is a write only field; it can only be set on `drive.teamdrives.update` requests that don't set `themeId`. When specified, all fields of the `backgroundImageFile` must be set. */
  backgroundImageFile?: {
    id?: string;
    width?: number;
    xCoordinate?: number;
    yCoordinate?: number;
  };
  /** The time at which the Team Drive was created (RFC 3339 date-time). */
  createdTime?: string;
  /** A set of restrictions that apply to this Team Drive or items inside this Team Drive. */
  restrictions?: {
    domainUsersOnly?: boolean;
    teamMembersOnly?: boolean;
    sharingFoldersRequiresOrganizerPermission?: boolean;
    downloadRestriction?: DownloadRestriction;
    copyRequiresWriterPermission?: boolean;
    adminManagedRestrictions?: boolean;
  };
  /** The organizational unit of this shared drive. This field is only populated on `drives.list` responses when the `useDomainAdminAccess` parameter is set to `true`. */
  orgUnitId?: string;
  /** The ID of this Team Drive which is also the ID of the top level folder of this Team Drive. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#teamDrive"`. */
  kind?: string;
  /** The color of this Team Drive as an RGB hex string. It can only be set on a `drive.teamdrives.update` request that does not set `themeId`. */
  colorRgb?: string;
  /** The name of this Team Drive. */
  name?: string;
  /** A short-lived link to this Team Drive's background image. */
  backgroundImageLink?: string;
}

export const TeamDrive: Schema.Schema<TeamDrive> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      capabilities: Schema.optional(
        Schema.Struct({
          canShare: Schema.optional(Schema.Boolean),
          canDownload: Schema.optional(Schema.Boolean),
          canRenameTeamDrive: Schema.optional(Schema.Boolean),
          canEdit: Schema.optional(Schema.Boolean),
          canChangeDomainUsersOnlyRestriction: Schema.optional(Schema.Boolean),
          canTrashChildren: Schema.optional(Schema.Boolean),
          canComment: Schema.optional(Schema.Boolean),
          canChangeDownloadRestriction: Schema.optional(Schema.Boolean),
          canResetTeamDriveRestrictions: Schema.optional(Schema.Boolean),
          canManageMembers: Schema.optional(Schema.Boolean),
          canDeleteTeamDrive: Schema.optional(Schema.Boolean),
          canChangeTeamMembersOnlyRestriction: Schema.optional(Schema.Boolean),
          canChangeCopyRequiresWriterPermissionRestriction: Schema.optional(
            Schema.Boolean,
          ),
          canCopy: Schema.optional(Schema.Boolean),
          canChangeTeamDriveBackground: Schema.optional(Schema.Boolean),
          canReadRevisions: Schema.optional(Schema.Boolean),
          canChangeSharingFoldersRequiresOrganizerPermissionRestriction:
            Schema.optional(Schema.Boolean),
          canAddChildren: Schema.optional(Schema.Boolean),
          canRemoveChildren: Schema.optional(Schema.Boolean),
          canRename: Schema.optional(Schema.Boolean),
          canListChildren: Schema.optional(Schema.Boolean),
          canDeleteChildren: Schema.optional(Schema.Boolean),
        }),
      ),
      themeId: Schema.optional(Schema.String),
      backgroundImageFile: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          width: Schema.optional(Schema.Number),
          xCoordinate: Schema.optional(Schema.Number),
          yCoordinate: Schema.optional(Schema.Number),
        }),
      ),
      createdTime: Schema.optional(Schema.String),
      restrictions: Schema.optional(
        Schema.Struct({
          domainUsersOnly: Schema.optional(Schema.Boolean),
          teamMembersOnly: Schema.optional(Schema.Boolean),
          sharingFoldersRequiresOrganizerPermission: Schema.optional(
            Schema.Boolean,
          ),
          downloadRestriction: Schema.optional(DownloadRestriction),
          copyRequiresWriterPermission: Schema.optional(Schema.Boolean),
          adminManagedRestrictions: Schema.optional(Schema.Boolean),
        }),
      ),
      orgUnitId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      colorRgb: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      backgroundImageLink: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TeamDrive" }) as any as Schema.Schema<TeamDrive>;

export interface Change {
  /** The time of this change (RFC 3339 date-time). */
  time?: string;
  /** The updated state of the file. Present if the type is file and the file has not been removed from this list of changes. */
  file?: File;
  /** The ID of the file which has changed. */
  fileId?: string;
  /** The type of the change. Possible values are `file` and `drive`. */
  changeType?: string;
  /** The ID of the shared drive associated with this change. */
  driveId?: string;
  /** The updated state of the shared drive. Present if the changeType is drive, the user is still a member of the shared drive, and the shared drive has not been deleted. */
  drive?: Drive;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#change"`. */
  kind?: string;
  /** Deprecated: Use `changeType` instead. */
  type?: string;
  /** Deprecated: Use `drive` instead. */
  teamDrive?: TeamDrive;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** Whether the file or shared drive has been removed from this list of changes, for example by deletion or loss of access. */
  removed?: boolean;
}

export const Change: Schema.Schema<Change> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      time: Schema.optional(Schema.String),
      file: Schema.optional(File),
      fileId: Schema.optional(Schema.String),
      changeType: Schema.optional(Schema.String),
      driveId: Schema.optional(Schema.String),
      drive: Schema.optional(Drive),
      kind: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      teamDrive: Schema.optional(TeamDrive),
      teamDriveId: Schema.optional(Schema.String),
      removed: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Change" }) as any as Schema.Schema<Change>;

export interface ChangeList {
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#changeList"`. */
  kind?: string;
  /** The list of changes. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  changes?: Array<Change>;
  /** The page token for the next page of changes. This will be absent if the end of the changes list has been reached. The page token doesn't expire. */
  nextPageToken?: string;
  /** The starting page token for future changes. This will be present only if the end of the current changes list has been reached. The page token doesn't expire. */
  newStartPageToken?: string;
}

export const ChangeList: Schema.Schema<ChangeList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      changes: Schema.optional(Schema.Array(Change)),
      nextPageToken: Schema.optional(Schema.String),
      newStartPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ChangeList" }) as any as Schema.Schema<ChangeList>;

export interface LabelFieldModification {
  /** Unsets the values for this field. */
  unsetValues?: boolean;
  /** Replaces a `user` field with these new values. The values must be a valid email addresses. */
  setUserValues?: Array<string>;
  /** Replaces the value of a dateString Field with these new values. The string must be in the RFC 3339 full-date format: YYYY-MM-DD. */
  setDateValues?: Array<string>;
  /** Sets the value of a `text` field. */
  setTextValues?: Array<string>;
  /** The ID of the field to be modified. */
  fieldId?: string;
  /** Replaces a `selection` field with these new values. */
  setSelectionValues?: Array<string>;
  /** This is always `"drive#labelFieldModification"`. */
  kind?: string;
  /** Replaces the value of an `integer` field with these new values. */
  setIntegerValues?: Array<string>;
}

export const LabelFieldModification: Schema.Schema<LabelFieldModification> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unsetValues: Schema.optional(Schema.Boolean),
      setUserValues: Schema.optional(Schema.Array(Schema.String)),
      setDateValues: Schema.optional(Schema.Array(Schema.String)),
      setTextValues: Schema.optional(Schema.Array(Schema.String)),
      fieldId: Schema.optional(Schema.String),
      setSelectionValues: Schema.optional(Schema.Array(Schema.String)),
      kind: Schema.optional(Schema.String),
      setIntegerValues: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "LabelFieldModification",
  }) as any as Schema.Schema<LabelFieldModification>;

export interface LabelModification {
  /** If true, the label will be removed from the file. */
  removeLabel?: boolean;
  /** The ID of the label to modify. */
  labelId?: string;
  /** The list of modifications to this label's fields. */
  fieldModifications?: Array<LabelFieldModification>;
  /** This is always `"drive#labelModification"`. */
  kind?: string;
}

export const LabelModification: Schema.Schema<LabelModification> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      removeLabel: Schema.optional(Schema.Boolean),
      labelId: Schema.optional(Schema.String),
      fieldModifications: Schema.optional(Schema.Array(LabelFieldModification)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LabelModification",
  }) as any as Schema.Schema<LabelModification>;

export interface ModifyLabelsRequest {
  /** The list of modifications to apply to the labels on the file. */
  labelModifications?: Array<LabelModification>;
  /** This is always `"drive#modifyLabelsRequest"`. */
  kind?: string;
}

export const ModifyLabelsRequest: Schema.Schema<ModifyLabelsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelModifications: Schema.optional(Schema.Array(LabelModification)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ModifyLabelsRequest",
  }) as any as Schema.Schema<ModifyLabelsRequest>;

export interface AccessProposalRoleAndView {
  /** Indicates the view for this access proposal. Only populated for proposals that belong to a view. Only `published` is supported. */
  view?: string;
  /** The role that was proposed by the requester. The supported values are: * `writer` * `commenter` * `reader` */
  role?: string;
}

export const AccessProposalRoleAndView: Schema.Schema<AccessProposalRoleAndView> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      view: Schema.optional(Schema.String),
      role: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccessProposalRoleAndView",
  }) as any as Schema.Schema<AccessProposalRoleAndView>;

export interface AccessProposal {
  /** The email address of the user that will receive permissions, if accepted. */
  recipientEmailAddress?: string;
  /** The file ID that the proposal for access is on. */
  fileId?: string;
  /** A wrapper for the role and view of an access proposal. For more information, see [Roles and permissions](https://developers.google.com/workspace/drive/api/guides/ref-roles). */
  rolesAndViews?: Array<AccessProposalRoleAndView>;
  /** The email address of the requesting user. */
  requesterEmailAddress?: string;
  /** The ID of the access proposal. */
  proposalId?: string;
  /** The creation time. */
  createTime?: string;
  /** The message that the requester added to the proposal. */
  requestMessage?: string;
}

export const AccessProposal: Schema.Schema<AccessProposal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recipientEmailAddress: Schema.optional(Schema.String),
      fileId: Schema.optional(Schema.String),
      rolesAndViews: Schema.optional(Schema.Array(AccessProposalRoleAndView)),
      requesterEmailAddress: Schema.optional(Schema.String),
      proposalId: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      requestMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccessProposal",
  }) as any as Schema.Schema<AccessProposal>;

export interface AppIcons {
  /** Size of the icon. Represented as the maximum of the width and height. */
  size?: number;
  /** URL for the icon. */
  iconUrl?: string;
  /** Category of the icon. Allowed values are: * `application` - The icon for the application. * `document` - The icon for a file associated with the app. * `documentShared` - The icon for a shared file associated with the app. */
  category?: string;
}

export const AppIcons: Schema.Schema<AppIcons> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      size: Schema.optional(Schema.Number),
      iconUrl: Schema.optional(Schema.String),
      category: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "AppIcons" }) as any as Schema.Schema<AppIcons>;

export interface App {
  /** Whether this app supports creating objects. */
  supportsCreate?: boolean;
  /** The list of secondary MIME types. */
  secondaryMimeTypes?: Array<string>;
  /** Whether the app is installed. */
  installed?: boolean;
  /** A short description of the app. */
  shortDescription?: string;
  /** The ID of the product listing for this app. */
  productId?: string;
  /** The template URL for opening files with this app. The template contains {ids} or {exportIds} to be replaced by the actual file IDs. For more information, see Open Files for the full documentation. */
  openUrlTemplate?: string;
  /** The list of secondary file extensions. */
  secondaryFileExtensions?: Array<string>;
  /** Whether this app supports creating files when offline. */
  supportsOfflineCreate?: boolean;
  /** The URL to create a file with this app. */
  createUrl?: string;
  /** A long description of the app. */
  longDescription?: string;
  /** The various icons for the app. */
  icons?: Array<AppIcons>;
  /** Whether the app is authorized to access data on the user's Drive. */
  authorized?: boolean;
  /** Whether the app has Drive-wide scope. An app with Drive-wide scope can access all files in the user's Drive. */
  hasDriveWideScope?: boolean;
  /** Whether this app supports opening more than one file. */
  supportsMultiOpen?: boolean;
  /** The type of object this app creates such as a Chart. If empty, the app name should be used instead. */
  objectType?: string;
  /** The list of primary file extensions. */
  primaryFileExtensions?: Array<string>;
  /** Whether this app supports importing from Google Docs. */
  supportsImport?: boolean;
  /** The template URL to create a file with this app in a given folder. The template contains the {folderId} to be replaced by the folder ID house the new file. */
  createInFolderTemplate?: string;
  /** The name of the app. */
  name?: string;
  /** A link to the product listing for this app. */
  productUrl?: string;
  /** The ID of the app. */
  id?: string;
  /** Whether the app is selected as the default handler for the types it supports. */
  useByDefault?: boolean;
  /** The list of primary MIME types. */
  primaryMimeTypes?: Array<string>;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string "drive#app". */
  kind?: string;
}

export const App: Schema.Schema<App> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      supportsCreate: Schema.optional(Schema.Boolean),
      secondaryMimeTypes: Schema.optional(Schema.Array(Schema.String)),
      installed: Schema.optional(Schema.Boolean),
      shortDescription: Schema.optional(Schema.String),
      productId: Schema.optional(Schema.String),
      openUrlTemplate: Schema.optional(Schema.String),
      secondaryFileExtensions: Schema.optional(Schema.Array(Schema.String)),
      supportsOfflineCreate: Schema.optional(Schema.Boolean),
      createUrl: Schema.optional(Schema.String),
      longDescription: Schema.optional(Schema.String),
      icons: Schema.optional(Schema.Array(AppIcons)),
      authorized: Schema.optional(Schema.Boolean),
      hasDriveWideScope: Schema.optional(Schema.Boolean),
      supportsMultiOpen: Schema.optional(Schema.Boolean),
      objectType: Schema.optional(Schema.String),
      primaryFileExtensions: Schema.optional(Schema.Array(Schema.String)),
      supportsImport: Schema.optional(Schema.Boolean),
      createInFolderTemplate: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      productUrl: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      useByDefault: Schema.optional(Schema.Boolean),
      primaryMimeTypes: Schema.optional(Schema.Array(Schema.String)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "App" }) as any as Schema.Schema<App>;

export interface AppList {
  /** Output only. Identifies what kind of resource this is. Value: the fixed string "drive#appList". */
  kind?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** The list of apps. */
  items?: Array<App>;
  /** The list of app IDs that the user has specified to use by default. The list is in reverse-priority order (lowest to highest). */
  defaultAppIds?: Array<string>;
}

export const AppList: Schema.Schema<AppList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(App)),
      defaultAppIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "AppList" }) as any as Schema.Schema<AppList>;

export interface Comment {
  /** Output only. The email address of the user assigned to this comment. If no user is assigned, the field is unset. */
  assigneeEmailAddress?: string;
  /** A region of the document represented as a JSON string. For details on defining anchor properties, refer to [Manage comments and replies](https://developers.google.com/workspace/drive/api/v3/manage-comments). */
  anchor?: string;
  /** Output only. The content of the comment with HTML formatting. */
  htmlContent?: string;
  /** Output only. The full list of replies to the comment in chronological order. */
  replies?: Array<Reply>;
  /** Output only. Whether the comment has been resolved by one of its replies. */
  resolved?: boolean;
  /** The plain text content of the comment. This field is used for setting the content, while `htmlContent` should be displayed. */
  content?: string;
  /** Output only. The author of the comment. The author's email address and permission ID will not be populated. */
  author?: User;
  /** The last time the comment or any of its replies was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment. */
  quotedFileContent?: { value?: string; mimeType?: string };
  /** The time at which the comment was created (RFC 3339 date-time). */
  createdTime?: string;
  /** Output only. Whether the comment has been deleted. A deleted comment has no content. */
  deleted?: boolean;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#comment"`. */
  kind?: string;
  /** Output only. The ID of the comment. */
  id?: string;
  /** Output only. A list of email addresses for users mentioned in this comment. If no users are mentioned, the list is empty. */
  mentionedEmailAddresses?: Array<string>;
}

export const Comment: Schema.Schema<Comment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assigneeEmailAddress: Schema.optional(Schema.String),
      anchor: Schema.optional(Schema.String),
      htmlContent: Schema.optional(Schema.String),
      replies: Schema.optional(Schema.Array(Reply)),
      resolved: Schema.optional(Schema.Boolean),
      content: Schema.optional(Schema.String),
      author: Schema.optional(User),
      modifiedTime: Schema.optional(Schema.String),
      quotedFileContent: Schema.optional(
        Schema.Struct({
          value: Schema.optional(Schema.String),
          mimeType: Schema.optional(Schema.String),
        }),
      ),
      createdTime: Schema.optional(Schema.String),
      deleted: Schema.optional(Schema.Boolean),
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      mentionedEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface StartPageToken {
  /** The starting page token for listing future changes. The page token doesn't expire. */
  startPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#startPageToken"`. */
  kind?: string;
}

export const StartPageToken: Schema.Schema<StartPageToken> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startPageToken: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StartPageToken",
  }) as any as Schema.Schema<StartPageToken>;

export interface About {
  /** Whether the user has installed the requesting app. */
  appInstalled?: boolean;
  /** A map of maximum import sizes by MIME type, in bytes. */
  maxImportSizes?: Record<string, string>;
  /** A list of themes that are supported for shared drives. */
  driveThemes?: Array<{
    id?: string;
    colorRgb?: string;
    backgroundImageLink?: string;
  }>;
  /** Whether the user can create shared drives. */
  canCreateDrives?: boolean;
  /** The currently supported folder colors as RGB hex strings. */
  folderColorPalette?: Array<string>;
  /** The user's storage quota limits and usage. For users that are part of an organization with pooled storage, information about the limit and usage across all services is for the organization, rather than the individual user. All fields are measured in bytes. */
  storageQuota?: {
    limit?: string;
    usageInDrive?: string;
    usageInDriveTrash?: string;
    usage?: string;
  };
  /** A map of source MIME type to possible targets for all supported imports. */
  importFormats?: Record<string, Array<string>>;
  /** The authenticated user. */
  user?: User;
  /** The maximum upload size in bytes. */
  maxUploadSize?: string;
  /** Deprecated: Use `driveThemes` instead. */
  teamDriveThemes?: Array<{
    backgroundImageLink?: string;
    colorRgb?: string;
    id?: string;
  }>;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#about"`. */
  kind?: string;
  /** Deprecated: Use `canCreateDrives` instead. */
  canCreateTeamDrives?: boolean;
  /** A map of source MIME type to possible targets for all supported exports. */
  exportFormats?: Record<string, Array<string>>;
}

export const About: Schema.Schema<About> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      appInstalled: Schema.optional(Schema.Boolean),
      maxImportSizes: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      driveThemes: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            colorRgb: Schema.optional(Schema.String),
            backgroundImageLink: Schema.optional(Schema.String),
          }),
        ),
      ),
      canCreateDrives: Schema.optional(Schema.Boolean),
      folderColorPalette: Schema.optional(Schema.Array(Schema.String)),
      storageQuota: Schema.optional(
        Schema.Struct({
          limit: Schema.optional(Schema.String),
          usageInDrive: Schema.optional(Schema.String),
          usageInDriveTrash: Schema.optional(Schema.String),
          usage: Schema.optional(Schema.String),
        }),
      ),
      importFormats: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      user: Schema.optional(User),
      maxUploadSize: Schema.optional(Schema.String),
      teamDriveThemes: Schema.optional(
        Schema.Array(
          Schema.Struct({
            backgroundImageLink: Schema.optional(Schema.String),
            colorRgb: Schema.optional(Schema.String),
            id: Schema.optional(Schema.String),
          }),
        ),
      ),
      kind: Schema.optional(Schema.String),
      canCreateTeamDrives: Schema.optional(Schema.Boolean),
      exportFormats: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
    }),
  ).annotate({ identifier: "About" }) as any as Schema.Schema<About>;

export interface ResolveAccessProposalRequest {
  /** Optional. The roles that the approver has allowed, if any. For more information, see [Roles and permissions](https://developers.google.com/workspace/drive/api/guides/ref-roles). Note: This field is required for the `ACCEPT` action. */
  role?: Array<string>;
  /** Required. The action to take on the access proposal. */
  action?: "ACTION_UNSPECIFIED" | "ACCEPT" | "DENY" | (string & {});
  /** Optional. Indicates the view for this access proposal. This should only be set when the proposal belongs to a view. Only `published` is supported. */
  view?: string;
  /** Optional. Whether to send an email to the requester when the access proposal is denied or accepted. */
  sendNotification?: boolean;
}

export const ResolveAccessProposalRequest: Schema.Schema<ResolveAccessProposalRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      role: Schema.optional(Schema.Array(Schema.String)),
      action: Schema.optional(Schema.String),
      view: Schema.optional(Schema.String),
      sendNotification: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ResolveAccessProposalRequest",
  }) as any as Schema.Schema<ResolveAccessProposalRequest>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      done: Schema.optional(Schema.Boolean),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      error: Schema.optional(Status),
      name: Schema.optional(Schema.String),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ModifyLabelsResponse {
  /** The list of labels which were added or updated by the request. */
  modifiedLabels?: Array<Label>;
  /** This is always `"drive#modifyLabelsResponse"`. */
  kind?: string;
}

export const ModifyLabelsResponse: Schema.Schema<ModifyLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      modifiedLabels: Schema.optional(Schema.Array(Label)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ModifyLabelsResponse",
  }) as any as Schema.Schema<ModifyLabelsResponse>;

export interface GeneratedIds {
  /** The IDs generated for the requesting user in the specified space. */
  ids?: Array<string>;
  /** The type of file that can be created with these IDs. */
  space?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#generatedIds"`. */
  kind?: string;
}

export const GeneratedIds: Schema.Schema<GeneratedIds> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ids: Schema.optional(Schema.Array(Schema.String)),
      space: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GeneratedIds",
  }) as any as Schema.Schema<GeneratedIds>;

export interface Channel {
  /** A version-specific identifier for the watched resource. */
  resourceUri?: string;
  /** Identifies this as a notification channel used to watch for changes to a resource, which is `api#channel`. */
  kind?: string;
  /** A UUID or similar unique string that identifies this channel. */
  id?: string;
  /** The type of delivery mechanism used for this channel. Valid values are "web_hook" or "webhook". */
  type?: string;
  /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
  token?: string;
  /** The address where notifications are delivered for this channel. */
  address?: string;
  /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
  expiration?: string;
  /** Additional parameters controlling delivery channel behavior. Optional. */
  params?: Record<string, string>;
  /** A Boolean value to indicate whether payload is wanted. Optional. */
  payload?: boolean;
  /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
  resourceId?: string;
}

export const Channel: Schema.Schema<Channel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceUri: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      address: Schema.optional(Schema.String),
      expiration: Schema.optional(Schema.String),
      params: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      payload: Schema.optional(Schema.Boolean),
      resourceId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface PermissionList {
  /** The page token for the next page of permissions. This field will be absent if the end of the permissions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** The list of permissions. If `nextPageToken` is populated, then this list may be incomplete and an additional page of results should be fetched. */
  permissions?: Array<Permission>;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#permissionList"`. */
  kind?: string;
}

export const PermissionList: Schema.Schema<PermissionList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      permissions: Schema.optional(Schema.Array(Permission)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PermissionList",
  }) as any as Schema.Schema<PermissionList>;

export interface ListAccessProposalsResponse {
  /** The continuation token for the next page of results. This will be absent if the end of the results list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** The list of access proposals. This field is only populated in Drive API v3. */
  accessProposals?: Array<AccessProposal>;
}

export const ListAccessProposalsResponse: Schema.Schema<ListAccessProposalsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      accessProposals: Schema.optional(Schema.Array(AccessProposal)),
    }),
  ).annotate({
    identifier: "ListAccessProposalsResponse",
  }) as any as Schema.Schema<ListAccessProposalsResponse>;

export interface LabelList {
  /** The page token for the next page of labels. This field will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** The list of labels. */
  labels?: Array<Label>;
  /** This is always `"drive#labelList"`. */
  kind?: string;
}

export const LabelList: Schema.Schema<LabelList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Array(Label)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "LabelList" }) as any as Schema.Schema<LabelList>;

export interface TeamDriveList {
  /** The page token for the next page of Team Drives. This will be absent if the end of the Team Drives list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#teamDriveList"`. */
  kind?: string;
  /** The list of Team Drives. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  teamDrives?: Array<TeamDrive>;
}

export const TeamDriveList: Schema.Schema<TeamDriveList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      teamDrives: Schema.optional(Schema.Array(TeamDrive)),
    }),
  ).annotate({
    identifier: "TeamDriveList",
  }) as any as Schema.Schema<TeamDriveList>;

export interface Approval {
  /** Output only. The most recent time the approval was modified. */
  modifyTime?: string;
  /** The user that requested the Approval. */
  initiator?: User;
  /** The Approval ID. */
  approvalId?: string;
  /** Output only. The status of the approval at the time this resource was requested. */
  status?:
    | "STATUS_UNSPECIFIED"
    | "IN_PROGRESS"
    | "APPROVED"
    | "CANCELLED"
    | "DECLINED"
    | (string & {});
  /** The responses made on the Approval by reviewers. */
  reviewerResponses?: Array<ReviewerResponse>;
  /** The time that the approval is due. */
  dueTime?: string;
  /** This is always drive#approval. */
  kind?: string;
  /** Target file id of the approval. */
  targetFileId?: string;
  /** Output only. The time the approval was completed. */
  completeTime?: string;
  /** Output only. The time the approval was created. */
  createTime?: string;
}

export const Approval: Schema.Schema<Approval> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      modifyTime: Schema.optional(Schema.String),
      initiator: Schema.optional(User),
      approvalId: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      reviewerResponses: Schema.optional(Schema.Array(ReviewerResponse)),
      dueTime: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      targetFileId: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Approval" }) as any as Schema.Schema<Approval>;

export interface ApprovalList {
  /** This is always drive#approvalList */
  kind?: string;
  /** The list of Approvals. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  items?: Array<Approval>;
  /** The page token for the next page of Approvals. This will be absent if the end of the Approvals list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
}

export const ApprovalList: Schema.Schema<ApprovalList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Approval)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApprovalList",
  }) as any as Schema.Schema<ApprovalList>;

export interface RevisionList {
  /** The list of revisions. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  revisions?: Array<Revision>;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#revisionList"`. */
  kind?: string;
  /** The page token for the next page of revisions. This will be absent if the end of the revisions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
}

export const RevisionList: Schema.Schema<RevisionList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      revisions: Schema.optional(Schema.Array(Revision)),
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RevisionList",
  }) as any as Schema.Schema<RevisionList>;

export interface CommentList {
  /** The list of comments. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  comments?: Array<Comment>;
  /** The page token for the next page of comments. This will be absent if the end of the comments list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#commentList"`. */
  kind?: string;
}

export const CommentList: Schema.Schema<CommentList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      comments: Schema.optional(Schema.Array(Comment)),
      nextPageToken: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CommentList",
  }) as any as Schema.Schema<CommentList>;

export interface FileList {
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#fileList"`. */
  kind?: string;
  /** Whether the search process was incomplete. If true, then some search results might be missing, since all documents were not searched. This can occur when searching multiple drives with the `allDrives` corpora, but all corpora couldn't be searched. When this happens, it's suggested that clients narrow their query by choosing a different corpus such as `user` or `drive`. */
  incompleteSearch?: boolean;
  /** The list of files. If `nextPageToken` is populated, then this list may be incomplete and an additional page of results should be fetched. */
  files?: Array<File>;
  /** The page token for the next page of files. This will be absent if the end of the files list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
}

export const FileList: Schema.Schema<FileList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      incompleteSearch: Schema.optional(Schema.Boolean),
      files: Schema.optional(Schema.Array(File)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "FileList" }) as any as Schema.Schema<FileList>;

export interface DriveList {
  /** The page token for the next page of shared drives. This will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** The list of shared drives. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  drives?: Array<Drive>;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#driveList"`. */
  kind?: string;
}

export const DriveList: Schema.Schema<DriveList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      drives: Schema.optional(Schema.Array(Drive)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DriveList" }) as any as Schema.Schema<DriveList>;

// ==========================================================================
// Operations
// ==========================================================================

export interface UpdateCommentsRequest {
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the file. */
  fileId: string;
  /** Request body */
  body?: Comment;
}

export const UpdateCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  body: Schema.optional(Comment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "files/{fileId}/comments/{commentId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateCommentsRequest>;

export type UpdateCommentsResponse = Comment;
export const UpdateCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type UpdateCommentsError = DefaultErrors;

/** Updates a comment with patch semantics. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export const updateComments: API.OperationMethod<
  UpdateCommentsRequest,
  UpdateCommentsResponse,
  UpdateCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCommentsRequest,
  output: UpdateCommentsResponse,
  errors: [],
}));

export interface DeleteCommentsRequest {
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the file. */
  fileId: string;
}

export const DeleteCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}/comments/{commentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCommentsRequest>;

export interface DeleteCommentsResponse {}
export const DeleteCommentsResponse: Schema.Schema<DeleteCommentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteCommentsResponse>;

export type DeleteCommentsError = DefaultErrors;

/** Deletes a comment. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export const deleteComments: API.OperationMethod<
  DeleteCommentsRequest,
  DeleteCommentsResponse,
  DeleteCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCommentsRequest,
  output: DeleteCommentsResponse,
  errors: [],
}));

export interface ListCommentsRequest {
  /** Whether to include deleted comments. Deleted comments will not include their original content. */
  includeDeleted?: boolean;
  /** The ID of the file. */
  fileId: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
  /** The minimum value of 'modifiedTime' for the result comments (RFC 3339 date-time). */
  startModifiedTime?: string;
  /** The maximum number of comments to return per page. */
  pageSize?: number;
}

export const ListCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  includeDeleted: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeDeleted"),
  ),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startModifiedTime: Schema.optional(Schema.String).pipe(
    T.HttpQuery("startModifiedTime"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListCommentsRequest>;

export type ListCommentsResponse = CommentList;
export const ListCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ CommentList;

export type ListCommentsError = DefaultErrors;

/** Lists a file's comments. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export const listComments: API.PaginatedOperationMethod<
  ListCommentsRequest,
  ListCommentsResponse,
  ListCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCommentsRequest,
  output: ListCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCommentsRequest {
  /** Whether to return deleted comments. Deleted comments will not include their original content. */
  includeDeleted?: boolean;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the file. */
  fileId: string;
}

export const GetCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  includeDeleted: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeDeleted"),
  ),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/comments/{commentId}" }),
  svc,
) as unknown as Schema.Schema<GetCommentsRequest>;

export type GetCommentsResponse = Comment;
export const GetCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type GetCommentsError = DefaultErrors;

/** Gets a comment by ID. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export const getComments: API.OperationMethod<
  GetCommentsRequest,
  GetCommentsResponse,
  GetCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCommentsRequest,
  output: GetCommentsResponse,
  errors: [],
}));

export interface CreateCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** Request body */
  body?: Comment;
}

export const CreateCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  body: Schema.optional(Comment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/comments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCommentsRequest>;

export type CreateCommentsResponse = Comment;
export const CreateCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type CreateCommentsError = DefaultErrors;

/** Creates a comment on a file. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export const createComments: API.OperationMethod<
  CreateCommentsRequest,
  CreateCommentsResponse,
  CreateCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCommentsRequest,
  output: CreateCommentsResponse,
  errors: [],
}));

export interface UpdatePermissionsRequest {
  /** Deprecated: All requests use the expansive access rules. */
  enforceExpansiveAccess?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. For more information, see [Transfer file ownership](https://developers.google.com//workspace/drive/api/guides/transfer-file). */
  transferOwnership?: boolean;
  /** The ID of the permission. */
  permissionId: string;
  /** The ID of the file or shared drive. */
  fileId: string;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
  /** Whether to remove the expiration date. */
  removeExpiration?: boolean;
  /** Request body */
  body?: Permission;
}

export const UpdatePermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enforceExpansiveAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("enforceExpansiveAccess"),
    ),
    supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsAllDrives"),
    ),
    transferOwnership: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("transferOwnership"),
    ),
    permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsTeamDrives"),
    ),
    useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useDomainAdminAccess"),
    ),
    removeExpiration: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("removeExpiration"),
    ),
    body: Schema.optional(Permission).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "files/{fileId}/permissions/{permissionId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdatePermissionsRequest>;

export type UpdatePermissionsResponse = Permission;
export const UpdatePermissionsResponse = /*@__PURE__*/ /*#__PURE__*/ Permission;

export type UpdatePermissionsError = DefaultErrors;

/** Updates a permission with patch semantics. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). **Warning:** Concurrent permissions operations on the same file aren't supported; only the last update is applied. */
export const updatePermissions: API.OperationMethod<
  UpdatePermissionsRequest,
  UpdatePermissionsResponse,
  UpdatePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePermissionsRequest,
  output: UpdatePermissionsResponse,
  errors: [],
}));

export interface DeletePermissionsRequest {
  /** Deprecated: All requests use the expansive access rules. */
  enforceExpansiveAccess?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** The ID of the permission. */
  permissionId: string;
  /** The ID of the file or shared drive. */
  fileId: string;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
}

export const DeletePermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enforceExpansiveAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("enforceExpansiveAccess"),
    ),
    supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsAllDrives"),
    ),
    permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsTeamDrives"),
    ),
    useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useDomainAdminAccess"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "files/{fileId}/permissions/{permissionId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeletePermissionsRequest>;

export interface DeletePermissionsResponse {}
export const DeletePermissionsResponse: Schema.Schema<DeletePermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeletePermissionsResponse>;

export type DeletePermissionsError = DefaultErrors;

/** Deletes a permission. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). **Warning:** Concurrent permissions operations on the same file aren't supported; only the last update is applied. */
export const deletePermissions: API.OperationMethod<
  DeletePermissionsRequest,
  DeletePermissionsResponse,
  DeletePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePermissionsRequest,
  output: DeletePermissionsResponse,
  errors: [],
}));

export interface ListPermissionsRequest {
  /** The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned. */
  pageSize?: number;
  /** The ID of the file or shared drive. */
  fileId: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
}

export const ListPermissionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsTeamDrives"),
    ),
    useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useDomainAdminAccess"),
    ),
    supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsAllDrives"),
    ),
    includePermissionsForView: Schema.optional(Schema.String).pipe(
      T.HttpQuery("includePermissionsForView"),
    ),
  },
).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/permissions" }),
  svc,
) as unknown as Schema.Schema<ListPermissionsRequest>;

export type ListPermissionsResponse = PermissionList;
export const ListPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PermissionList;

export type ListPermissionsError = DefaultErrors;

/** Lists a file's or shared drive's permissions. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). */
export const listPermissions: API.PaginatedOperationMethod<
  ListPermissionsRequest,
  ListPermissionsResponse,
  ListPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionsRequest,
  output: ListPermissionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetPermissionsRequest {
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** The ID of the file. */
  fileId: string;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
  /** The ID of the permission. */
  permissionId: string;
}

export const GetPermissionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useDomainAdminAccess"),
  ),
  permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/permissions/{permissionId}" }),
  svc,
) as unknown as Schema.Schema<GetPermissionsRequest>;

export type GetPermissionsResponse = Permission;
export const GetPermissionsResponse = /*@__PURE__*/ /*#__PURE__*/ Permission;

export type GetPermissionsError = DefaultErrors;

/** Gets a permission by ID. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). */
export const getPermissions: API.OperationMethod<
  GetPermissionsRequest,
  GetPermissionsResponse,
  GetPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPermissionsRequest,
  output: GetPermissionsResponse,
  errors: [],
}));

export interface CreatePermissionsRequest {
  /** Whether to send a notification email when sharing to users or groups. This defaults to `true` for users and groups, and is not allowed for other requests. It must not be disabled for ownership transfers. */
  sendNotificationEmail?: boolean;
  /** Deprecated: All requests use the expansive access rules. */
  enforceExpansiveAccess?: boolean;
  /** Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. For more information, see [Transfer file ownership](https://developers.google.com/workspace/drive/api/guides/transfer-file). */
  transferOwnership?: boolean;
  /** The ID of the file or shared drive. */
  fileId: string;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
  /** This parameter only takes effect if the item isn't in a shared drive and the request is attempting to transfer the ownership of the item. If set to `true`, the item is moved to the new owner's My Drive root folder and all prior parents removed. If set to `false`, parents aren't changed. */
  moveToNewOwnersRoot?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: See `moveToNewOwnersRoot` for details. */
  enforceSingleParent?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** A plain text custom message to include in the notification email. */
  emailMessage?: string;
  /** Request body */
  body?: Permission;
}

export const CreatePermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sendNotificationEmail: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("sendNotificationEmail"),
    ),
    enforceExpansiveAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("enforceExpansiveAccess"),
    ),
    transferOwnership: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("transferOwnership"),
    ),
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useDomainAdminAccess"),
    ),
    moveToNewOwnersRoot: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("moveToNewOwnersRoot"),
    ),
    supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsAllDrives"),
    ),
    enforceSingleParent: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("enforceSingleParent"),
    ),
    supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsTeamDrives"),
    ),
    emailMessage: Schema.optional(Schema.String).pipe(
      T.HttpQuery("emailMessage"),
    ),
    body: Schema.optional(Permission).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "files/{fileId}/permissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePermissionsRequest>;

export type CreatePermissionsResponse = Permission;
export const CreatePermissionsResponse = /*@__PURE__*/ /*#__PURE__*/ Permission;

export type CreatePermissionsError = DefaultErrors;

/** Creates a permission for a file or shared drive. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). **Warning:** Concurrent permissions operations on the same file aren't supported; only the last update is applied. */
export const createPermissions: API.OperationMethod<
  CreatePermissionsRequest,
  CreatePermissionsResponse,
  CreatePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePermissionsRequest,
  output: CreatePermissionsResponse,
  errors: [],
}));

export interface DeleteRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
}

export const DeleteRepliesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  replyId: Schema.String.pipe(T.HttpPath("replyId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "files/{fileId}/comments/{commentId}/replies/{replyId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteRepliesRequest>;

export interface DeleteRepliesResponse {}
export const DeleteRepliesResponse: Schema.Schema<DeleteRepliesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteRepliesResponse>;

export type DeleteRepliesError = DefaultErrors;

/** Deletes a reply. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export const deleteReplies: API.OperationMethod<
  DeleteRepliesRequest,
  DeleteRepliesResponse,
  DeleteRepliesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRepliesRequest,
  output: DeleteRepliesResponse,
  errors: [],
}));

export interface UpdateRepliesRequest {
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** The ID of the file. */
  fileId: string;
  /** Request body */
  body?: Reply;
}

export const UpdateRepliesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  replyId: Schema.String.pipe(T.HttpPath("replyId")),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  body: Schema.optional(Reply).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "files/{fileId}/comments/{commentId}/replies/{replyId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateRepliesRequest>;

export type UpdateRepliesResponse = Reply;
export const UpdateRepliesResponse = /*@__PURE__*/ /*#__PURE__*/ Reply;

export type UpdateRepliesError = DefaultErrors;

/** Updates a reply with patch semantics. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export const updateReplies: API.OperationMethod<
  UpdateRepliesRequest,
  UpdateRepliesResponse,
  UpdateRepliesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRepliesRequest,
  output: UpdateRepliesResponse,
  errors: [],
}));

export interface GetRepliesRequest {
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** The ID of the file. */
  fileId: string;
  /** Whether to return deleted replies. Deleted replies don't include their original content. */
  includeDeleted?: boolean;
}

export const GetRepliesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  replyId: Schema.String.pipe(T.HttpPath("replyId")),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeDeleted"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "files/{fileId}/comments/{commentId}/replies/{replyId}",
  }),
  svc,
) as unknown as Schema.Schema<GetRepliesRequest>;

export type GetRepliesResponse = Reply;
export const GetRepliesResponse = /*@__PURE__*/ /*#__PURE__*/ Reply;

export type GetRepliesError = DefaultErrors;

/** Gets a reply by ID. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export const getReplies: API.OperationMethod<
  GetRepliesRequest,
  GetRepliesResponse,
  GetRepliesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRepliesRequest,
  output: GetRepliesResponse,
  errors: [],
}));

export interface ListRepliesRequest {
  /** The ID of the comment. */
  commentId: string;
  /** Whether to include deleted replies. Deleted replies don't include their original content. */
  includeDeleted?: boolean;
  /** The maximum number of replies to return per page. */
  pageSize?: number;
  /** The ID of the file. */
  fileId: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
}

export const ListRepliesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeDeleted"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "files/{fileId}/comments/{commentId}/replies",
  }),
  svc,
) as unknown as Schema.Schema<ListRepliesRequest>;

export type ListRepliesResponse = ReplyList;
export const ListRepliesResponse = /*@__PURE__*/ /*#__PURE__*/ ReplyList;

export type ListRepliesError = DefaultErrors;

/** Lists a comment's replies. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export const listReplies: API.PaginatedOperationMethod<
  ListRepliesRequest,
  ListRepliesResponse,
  ListRepliesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRepliesRequest,
  output: ListRepliesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** Request body */
  body?: Reply;
}

export const CreateRepliesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  body: Schema.optional(Reply).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "files/{fileId}/comments/{commentId}/replies",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateRepliesRequest>;

export type CreateRepliesResponse = Reply;
export const CreateRepliesResponse = /*@__PURE__*/ /*#__PURE__*/ Reply;

export type CreateRepliesError = DefaultErrors;

/** Creates a reply to a comment. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export const createReplies: API.OperationMethod<
  CreateRepliesRequest,
  CreateRepliesResponse,
  CreateRepliesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRepliesRequest,
  output: CreateRepliesResponse,
  errors: [],
}));

export interface GetStartPageTokenChangesRequest {
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive will be returned. */
  driveId?: string;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
}

export const GetStartPageTokenChangesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsAllDrives"),
    ),
    teamDriveId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("teamDriveId"),
    ),
    driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
    supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("supportsTeamDrives"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "changes/startPageToken" }),
    svc,
  ) as unknown as Schema.Schema<GetStartPageTokenChangesRequest>;

export type GetStartPageTokenChangesResponse = StartPageToken;
export const GetStartPageTokenChangesResponse =
  /*@__PURE__*/ /*#__PURE__*/ StartPageToken;

export type GetStartPageTokenChangesError = DefaultErrors;

/** Gets the starting pageToken for listing future changes. For more information, see [Retrieve changes](https://developers.google.com/workspace/drive/api/guides/manage-changes). */
export const getStartPageTokenChanges: API.OperationMethod<
  GetStartPageTokenChangesRequest,
  GetStartPageTokenChangesResponse,
  GetStartPageTokenChangesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetStartPageTokenChangesRequest,
  output: GetStartPageTokenChangesResponse,
  errors: [],
}));

export interface ListChangesRequest {
  /** The shared drive from which changes will be returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
  driveId?: string;
  /** A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'. */
  spaces?: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method. */
  pageToken: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Deprecated: Use `includeItemsFromAllDrives` instead. */
  includeTeamDriveItems?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
  includeCorpusRemovals?: boolean;
  /** Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive. */
  restrictToMyDrive?: boolean;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
  includeRemoved?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** The maximum number of changes to return per page. */
  pageSize?: number;
}

export const ListChangesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  spaces: Schema.optional(Schema.String).pipe(T.HttpQuery("spaces")),
  pageToken: Schema.String.pipe(T.HttpQuery("pageToken")),
  includeLabels: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includeLabels"),
  ),
  includeTeamDriveItems: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeTeamDriveItems"),
  ),
  includePermissionsForView: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includePermissionsForView"),
  ),
  includeCorpusRemovals: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeCorpusRemovals"),
  ),
  restrictToMyDrive: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("restrictToMyDrive"),
  ),
  includeItemsFromAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeItemsFromAllDrives"),
  ),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  teamDriveId: Schema.optional(Schema.String).pipe(T.HttpQuery("teamDriveId")),
  includeRemoved: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeRemoved"),
  ),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "changes" }),
  svc,
) as unknown as Schema.Schema<ListChangesRequest>;

export type ListChangesResponse = ChangeList;
export const ListChangesResponse = /*@__PURE__*/ /*#__PURE__*/ ChangeList;

export type ListChangesError = DefaultErrors;

/** Lists the changes for a user or shared drive. For more information, see [Retrieve changes](https://developers.google.com/workspace/drive/api/guides/manage-changes). */
export const listChanges: API.PaginatedOperationMethod<
  ListChangesRequest,
  ListChangesResponse,
  ListChangesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListChangesRequest,
  output: ListChangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface WatchChangesRequest {
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** The maximum number of changes to return per page. */
  pageSize?: number;
  /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
  includeRemoved?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** The shared drive from which changes will be returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
  driveId?: string;
  /** A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'. */
  spaces?: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method. */
  pageToken: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Deprecated: Use `includeItemsFromAllDrives` instead. */
  includeTeamDriveItems?: boolean;
  /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
  includeCorpusRemovals?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive. */
  restrictToMyDrive?: boolean;
  /** Request body */
  body?: Channel;
}

export const WatchChangesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  includeItemsFromAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeItemsFromAllDrives"),
  ),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  teamDriveId: Schema.optional(Schema.String).pipe(T.HttpQuery("teamDriveId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  includeRemoved: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeRemoved"),
  ),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  spaces: Schema.optional(Schema.String).pipe(T.HttpQuery("spaces")),
  pageToken: Schema.String.pipe(T.HttpQuery("pageToken")),
  includeLabels: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includeLabels"),
  ),
  includeTeamDriveItems: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeTeamDriveItems"),
  ),
  includeCorpusRemovals: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeCorpusRemovals"),
  ),
  includePermissionsForView: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includePermissionsForView"),
  ),
  restrictToMyDrive: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("restrictToMyDrive"),
  ),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "changes/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchChangesRequest>;

export type WatchChangesResponse = Channel;
export const WatchChangesResponse = /*@__PURE__*/ /*#__PURE__*/ Channel;

export type WatchChangesError = DefaultErrors;

/** Subscribes to changes for a user. For more information, see [Notifications for resource changes](https://developers.google.com/workspace/drive/api/guides/push). */
export const watchChanges: API.OperationMethod<
  WatchChangesRequest,
  WatchChangesResponse,
  WatchChangesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: WatchChangesRequest,
  output: WatchChangesResponse,
  errors: [],
}));

export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "operations/{name}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResponse,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface GetApprovalsRequest {
  /** Required. The ID of the file the Approval is on. */
  fileId: string;
  /** Required. The ID of the Approval. */
  approvalId: string;
}

export const GetApprovalsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  approvalId: Schema.String.pipe(T.HttpPath("approvalId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/approvals/{approvalId}" }),
  svc,
) as unknown as Schema.Schema<GetApprovalsRequest>;

export type GetApprovalsResponse = Approval;
export const GetApprovalsResponse = /*@__PURE__*/ /*#__PURE__*/ Approval;

export type GetApprovalsError = DefaultErrors;

/** Gets an Approval by ID. */
export const getApprovals: API.OperationMethod<
  GetApprovalsRequest,
  GetApprovalsResponse,
  GetApprovalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApprovalsRequest,
  output: GetApprovalsResponse,
  errors: [],
}));

export interface ListApprovalsRequest {
  /** Required. The ID of the file the Approval is on. */
  fileId: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of nextPageToken from a previous response. */
  pageToken?: string;
  /** The maximum number of Approvals to return. When not set, at most 100 Approvals will be returned. */
  pageSize?: number;
}

export const ListApprovalsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/approvals" }),
  svc,
) as unknown as Schema.Schema<ListApprovalsRequest>;

export type ListApprovalsResponse = ApprovalList;
export const ListApprovalsResponse = /*@__PURE__*/ /*#__PURE__*/ ApprovalList;

export type ListApprovalsError = DefaultErrors;

/** Lists the Approvals on a file. */
export const listApprovals: API.PaginatedOperationMethod<
  ListApprovalsRequest,
  ListApprovalsResponse,
  ListApprovalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApprovalsRequest,
  output: ListApprovalsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetAccessproposalsRequest {
  /** Required. The ID of the item the request is on. */
  fileId: string;
  /** Required. The ID of the access proposal to resolve. */
  proposalId: string;
}

export const GetAccessproposalsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "files/{fileId}/accessproposals/{proposalId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAccessproposalsRequest>;

export type GetAccessproposalsResponse = AccessProposal;
export const GetAccessproposalsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessProposal;

export type GetAccessproposalsError = DefaultErrors;

/** Retrieves an access proposal by ID. For more information, see [Manage pending access proposals](https://developers.google.com/workspace/drive/api/guides/pending-access). */
export const getAccessproposals: API.OperationMethod<
  GetAccessproposalsRequest,
  GetAccessproposalsResponse,
  GetAccessproposalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccessproposalsRequest,
  output: GetAccessproposalsResponse,
  errors: [],
}));

export interface ListAccessproposalsRequest {
  /** Optional. The number of results per page. */
  pageSize?: number;
  /** Required. The ID of the item the request is on. */
  fileId: string;
  /** Optional. The continuation token on the list of access requests. */
  pageToken?: string;
}

export const ListAccessproposalsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "files/{fileId}/accessproposals" }),
    svc,
  ) as unknown as Schema.Schema<ListAccessproposalsRequest>;

export type ListAccessproposalsResponse = ListAccessProposalsResponse;
export const ListAccessproposalsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAccessProposalsResponse;

export type ListAccessproposalsError = DefaultErrors;

/** List the access proposals on a file. For more information, see [Manage pending access proposals](https://developers.google.com/workspace/drive/api/guides/pending-access). Note: Only approvers are able to list access proposals on a file. If the user isn't an approver, a 403 error is returned. */
export const listAccessproposals: API.PaginatedOperationMethod<
  ListAccessproposalsRequest,
  ListAccessproposalsResponse,
  ListAccessproposalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccessproposalsRequest,
  output: ListAccessproposalsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ResolveAccessproposalsRequest {
  /** Required. The ID of the item the request is on. */
  fileId: string;
  /** Required. The ID of the access proposal to resolve. */
  proposalId: string;
  /** Request body */
  body?: ResolveAccessProposalRequest;
}

export const ResolveAccessproposalsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
    body: Schema.optional(ResolveAccessProposalRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "files/{fileId}/accessproposals/{proposalId}:resolve",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ResolveAccessproposalsRequest>;

export interface ResolveAccessproposalsResponse {}
export const ResolveAccessproposalsResponse: Schema.Schema<ResolveAccessproposalsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<ResolveAccessproposalsResponse>;

export type ResolveAccessproposalsError = DefaultErrors;

/** Approves or denies an access proposal. For more information, see [Manage pending access proposals](https://developers.google.com/workspace/drive/api/guides/pending-access). */
export const resolveAccessproposals: API.OperationMethod<
  ResolveAccessproposalsRequest,
  ResolveAccessproposalsResponse,
  ResolveAccessproposalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResolveAccessproposalsRequest,
  output: ResolveAccessproposalsResponse,
  errors: [],
}));

export interface ExportFilesRequest {
  /** The ID of the file. */
  fileId: string;
  /** Required. The MIME type of the format requested for this export. For a list of supported MIME types, see [Export MIME types for Google Workspace documents](/workspace/drive/api/guides/ref-export-formats). */
  mimeType: string;
}

export const ExportFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  mimeType: Schema.String.pipe(T.HttpQuery("mimeType")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/export" }),
  svc,
) as unknown as Schema.Schema<ExportFilesRequest>;

export interface ExportFilesResponse {}
export const ExportFilesResponse: Schema.Schema<ExportFilesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<ExportFilesResponse>;

export type ExportFilesError = DefaultErrors;

/** Exports a Google Workspace document to the requested MIME type and returns exported byte content. For more information, see [Download and export files](https://developers.google.com/workspace/drive/api/guides/manage-downloads). Note that the exported content is limited to 10 MB. */
export const exportFiles: API.OperationMethod<
  ExportFilesRequest,
  ExportFilesResponse,
  ExportFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportFilesRequest,
  output: ExportFilesResponse,
  errors: [],
}));

export interface UpdateFilesRequest {
  /** The ID of the file. */
  fileId: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** A comma-separated list of parent IDs to add. */
  addParents?: string;
  /** A comma-separated list of parent IDs to remove. */
  removeParents?: string;
  /** Whether to use the uploaded content as indexable text. */
  useContentAsIndexableText?: boolean;
  /** Whether to set the `keepForever` field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions. */
  keepRevisionForever?: boolean;
  /** Deprecated: Adding files to multiple folders is no longer supported. Use shortcuts instead. */
  enforceSingleParent?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** A language hint for OCR processing during image import (ISO 639-1 code). */
  ocrLanguage?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** Request body */
  body?: File;
}

export const UpdateFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  includeLabels: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includeLabels"),
  ),
  addParents: Schema.optional(Schema.String).pipe(T.HttpQuery("addParents")),
  removeParents: Schema.optional(Schema.String).pipe(
    T.HttpQuery("removeParents"),
  ),
  useContentAsIndexableText: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useContentAsIndexableText"),
  ),
  keepRevisionForever: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("keepRevisionForever"),
  ),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("enforceSingleParent"),
  ),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  includePermissionsForView: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includePermissionsForView"),
  ),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateFilesRequest>;

export type UpdateFilesResponse = File;
export const UpdateFilesResponse = /*@__PURE__*/ /*#__PURE__*/ File;

export type UpdateFilesError = DefaultErrors;

/** Updates a file's metadata, content, or both. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might be changed automatically, such as `modifiedDate`. This method supports patch semantics. This method supports an * /upload* URI and accepts uploaded media with the following characteristics: - *Maximum file size:* 5,120 GB - *Accepted Media MIME types:* `* /*` (Specify a valid MIME type, rather than the literal `* /*` value. The literal `* /*` is only used to indicate that any valid MIME type can be uploaded. For more information, see [Google Workspace and Google Drive supported MIME types](/workspace/drive/api/guides/mime-types).) For more information on uploading files, see [Upload file data](/workspace/drive/api/guides/manage-uploads). */
export const updateFiles: API.OperationMethod<
  UpdateFilesRequest,
  UpdateFilesResponse,
  UpdateFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFilesRequest,
  output: UpdateFilesResponse,
  errors: [],
}));

export interface DeleteFilesRequest {
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** The ID of the file. */
  fileId: string;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated: If an item isn't in a shared drive and its last parent is deleted but the item itself isn't, the item will be placed under its owner's root. */
  enforceSingleParent?: boolean;
}

export const DeleteFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("enforceSingleParent"),
  ),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFilesRequest>;

export interface DeleteFilesResponse {}
export const DeleteFilesResponse: Schema.Schema<DeleteFilesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteFilesResponse>;

export type DeleteFilesError = DefaultErrors;

/** Permanently deletes a file owned by the user without moving it to the trash. For more information, see [Trash or delete files and folders](https://developers.google.com/workspace/drive/api/guides/delete). If the file belongs to a shared drive, the user must be an `organizer` on the parent folder. If the target is a folder, all descendants owned by the user are also deleted. */
export const deleteFiles: API.OperationMethod<
  DeleteFilesRequest,
  DeleteFilesResponse,
  DeleteFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFilesRequest,
  output: DeleteFilesResponse,
  errors: [],
}));

export interface ModifyLabelsFilesRequest {
  /** The ID of the file to which the labels belong. */
  fileId: string;
  /** Request body */
  body?: ModifyLabelsRequest;
}

export const ModifyLabelsFilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    body: Schema.optional(ModifyLabelsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "files/{fileId}/modifyLabels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyLabelsFilesRequest>;

export type ModifyLabelsFilesResponse = ModifyLabelsResponse;
export const ModifyLabelsFilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ModifyLabelsResponse;

export type ModifyLabelsFilesError = DefaultErrors;

/** Modifies the set of labels applied to a file. For more information, see [Set a label field on a file](https://developers.google.com/workspace/drive/api/guides/set-label). Returns a list of the labels that were added or modified. */
export const modifyLabelsFiles: API.OperationMethod<
  ModifyLabelsFilesRequest,
  ModifyLabelsFilesResponse,
  ModifyLabelsFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyLabelsFilesRequest,
  output: ModifyLabelsFilesResponse,
  errors: [],
}));

export interface WatchFilesRequest {
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** The ID of the file. */
  fileId: string;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when the `alt` parameter is set to `media` and the user is the owner of the file or an organizer of the shared drive in which the file resides. */
  acknowledgeAbuse?: boolean;
  /** Request body */
  body?: Channel;
}

export const WatchFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  includePermissionsForView: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includePermissionsForView"),
  ),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  includeLabels: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includeLabels"),
  ),
  acknowledgeAbuse: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("acknowledgeAbuse"),
  ),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchFilesRequest>;

export type WatchFilesResponse = Channel;
export const WatchFilesResponse = /*@__PURE__*/ /*#__PURE__*/ Channel;

export type WatchFilesError = DefaultErrors;

/** Subscribes to changes to a file. For more information, see [Notifications for resource changes](https://developers.google.com/workspace/drive/api/guides/push). */
export const watchFiles: API.OperationMethod<
  WatchFilesRequest,
  WatchFilesResponse,
  WatchFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: WatchFilesRequest,
  output: WatchFilesResponse,
  errors: [],
}));

export interface ListLabelsFilesRequest {
  /** The maximum number of labels to return per page. When not set, defaults to 100. */
  maxResults?: number;
  /** The ID for the file. */
  fileId: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
}

export const ListLabelsFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/listLabels" }),
  svc,
) as unknown as Schema.Schema<ListLabelsFilesRequest>;

export type ListLabelsFilesResponse = LabelList;
export const ListLabelsFilesResponse = /*@__PURE__*/ /*#__PURE__*/ LabelList;

export type ListLabelsFilesError = DefaultErrors;

/** Lists the labels on a file. For more information, see [List labels on a file](https://developers.google.com/workspace/drive/api/guides/list-labels). */
export const listLabelsFiles: API.PaginatedOperationMethod<
  ListLabelsFilesRequest,
  ListLabelsFilesResponse,
  ListLabelsFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLabelsFilesRequest,
  output: ListLabelsFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DownloadFilesRequest {
  /** Required. The ID of the file to download. */
  fileId: string;
  /** Optional. The revision ID of the file to download. This field can only be set when downloading blob files, Google Docs, and Google Sheets. Returns `INVALID_ARGUMENT` if downloading a specific revision on the file is unsupported. */
  revisionId?: string;
  /** Optional. The MIME type the file should be downloaded as. This field can only be set when downloading Google Workspace documents. For a list of supported MIME types, see [Export MIME types for Google Workspace documents](/workspace/drive/api/guides/ref-export-formats). If not set, a Google Workspace document is downloaded with a default MIME type. The default MIME type might change in the future. */
  mimeType?: string;
}

export const DownloadFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
  mimeType: Schema.optional(Schema.String).pipe(T.HttpQuery("mimeType")),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/download", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DownloadFilesRequest>;

export type DownloadFilesResponse = Operation;
export const DownloadFilesResponse = /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DownloadFilesError = DefaultErrors;

/** Downloads the content of a file. For more information, see [Download and export files](https://developers.google.com/workspace/drive/api/guides/manage-downloads). Operations are valid for 24 hours from the time of creation. */
export const downloadFiles: API.OperationMethod<
  DownloadFilesRequest,
  DownloadFilesResponse,
  DownloadFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DownloadFilesRequest,
  output: DownloadFilesResponse,
  errors: [],
}));

export interface CreateFilesRequest {
  /** Whether to use the uploaded content as indexable text. */
  useContentAsIndexableText?: boolean;
  /** Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders. */
  ignoreDefaultVisibility?: boolean;
  /** Whether to set the `keepForever` field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions. */
  keepRevisionForever?: boolean;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** Deprecated: Creating files in multiple folders is no longer supported. */
  enforceSingleParent?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** A language hint for OCR processing during image import (ISO 639-1 code). */
  ocrLanguage?: string;
  /** Request body */
  body?: File;
}

export const CreateFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  useContentAsIndexableText: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useContentAsIndexableText"),
  ),
  ignoreDefaultVisibility: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("ignoreDefaultVisibility"),
  ),
  keepRevisionForever: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("keepRevisionForever"),
  ),
  includeLabels: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includeLabels"),
  ),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  includePermissionsForView: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includePermissionsForView"),
  ),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("enforceSingleParent"),
  ),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFilesRequest>;

export type CreateFilesResponse = File;
export const CreateFilesResponse = /*@__PURE__*/ /*#__PURE__*/ File;

export type CreateFilesError = DefaultErrors;

/** Creates a file. For more information, see [Create and manage files](/workspace/drive/api/guides/create-file). This method supports an * /upload* URI and accepts uploaded media with the following characteristics: - *Maximum file size:* 5,120 GB - *Accepted Media MIME types:* `* /*` (Specify a valid MIME type, rather than the literal `* /*` value. The literal `* /*` is only used to indicate that any valid MIME type can be uploaded. For more information, see [Google Workspace and Google Drive supported MIME types](/workspace/drive/api/guides/mime-types).) For more information on uploading files, see [Upload file data](/workspace/drive/api/guides/manage-uploads). Apps creating shortcuts with the `create` method must specify the MIME type `application/vnd.google-apps.shortcut`. Apps should specify a file extension in the `name` property when inserting files with the API. For example, an operation to insert a JPEG file should specify something like `"name": "cat.jpg"` in the metadata. Subsequent `GET` requests include the read-only `fileExtension` property populated with the extension originally specified in the `name` property. When a Google Drive user requests to download a file, or when the file is downloaded through the sync client, Drive builds a full filename (with extension) based on the name. In cases where the extension is missing, Drive attempts to determine the extension based on the file's MIME type. */
export const createFiles: API.OperationMethod<
  CreateFilesRequest,
  CreateFilesResponse,
  CreateFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFilesRequest,
  output: CreateFilesResponse,
  errors: [],
}));

export interface GetFilesRequest {
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when the `alt` parameter is set to `media` and the user is the owner of the file or an organizer of the shared drive in which the file resides. */
  acknowledgeAbuse?: boolean;
  /** The ID of the file. */
  fileId: string;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
}

export const GetFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  acknowledgeAbuse: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("acknowledgeAbuse"),
  ),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  includeLabels: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includeLabels"),
  ),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  includePermissionsForView: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includePermissionsForView"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}" }),
  svc,
) as unknown as Schema.Schema<GetFilesRequest>;

export type GetFilesResponse = File;
export const GetFilesResponse = /*@__PURE__*/ /*#__PURE__*/ File;

export type GetFilesError = DefaultErrors;

/** Gets a file's metadata or content by ID. For more information, see [Search for files and folders](/workspace/drive/api/guides/search-files). If you provide the URL parameter `alt=media`, then the response includes the file contents in the response body. Downloading content with `alt=media` only works if the file is stored in Drive. To download Google Docs, Sheets, and Slides use [`files.export`](/workspace/drive/api/reference/rest/v3/files/export) instead. For more information, see [Download and export files](/workspace/drive/api/guides/manage-downloads). */
export const getFiles: API.OperationMethod<
  GetFilesRequest,
  GetFilesResponse,
  GetFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFilesRequest,
  output: GetFilesResponse,
  errors: [],
}));

export interface CopyFilesRequest {
  /** A language hint for OCR processing during image import (ISO 639-1 code). */
  ocrLanguage?: string;
  /** Deprecated: Copying files into multiple folders is no longer supported. Use shortcuts instead. */
  enforceSingleParent?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** The ID of the file. */
  fileId: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Whether to set the `keepForever` field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions. */
  keepRevisionForever?: boolean;
  /** Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders. */
  ignoreDefaultVisibility?: boolean;
  /** Request body */
  body?: File;
}

export const CopyFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("enforceSingleParent"),
  ),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  includePermissionsForView: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includePermissionsForView"),
  ),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  includeLabels: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includeLabels"),
  ),
  keepRevisionForever: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("keepRevisionForever"),
  ),
  ignoreDefaultVisibility: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("ignoreDefaultVisibility"),
  ),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/copy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CopyFilesRequest>;

export type CopyFilesResponse = File;
export const CopyFilesResponse = /*@__PURE__*/ /*#__PURE__*/ File;

export type CopyFilesError = DefaultErrors;

/** Creates a copy of a file and applies any requested updates with patch semantics. For more information, see [Create and manage files](https://developers.google.com/workspace/drive/api/guides/create-file). */
export const copyFiles: API.OperationMethod<
  CopyFilesRequest,
  CopyFilesResponse,
  CopyFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CopyFilesRequest,
  output: CopyFilesResponse,
  errors: [],
}));

export interface EmptyTrashFilesRequest {
  /** Deprecated: If an item isn't in a shared drive and its last parent is deleted but the item itself isn't, the item will be placed under its owner's root. */
  enforceSingleParent?: boolean;
  /** If set, empties the trash of the provided shared drive. */
  driveId?: string;
}

export const EmptyTrashFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    enforceSingleParent: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("enforceSingleParent"),
    ),
    driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  },
).pipe(
  T.Http({ method: "DELETE", path: "files/trash" }),
  svc,
) as unknown as Schema.Schema<EmptyTrashFilesRequest>;

export interface EmptyTrashFilesResponse {}
export const EmptyTrashFilesResponse: Schema.Schema<EmptyTrashFilesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<EmptyTrashFilesResponse>;

export type EmptyTrashFilesError = DefaultErrors;

/** Permanently deletes all of the user's trashed files. For more information, see [Trash or delete files and folders](https://developers.google.com/workspace/drive/api/guides/delete). */
export const emptyTrashFiles: API.OperationMethod<
  EmptyTrashFilesRequest,
  EmptyTrashFilesResponse,
  EmptyTrashFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EmptyTrashFilesRequest,
  output: EmptyTrashFilesResponse,
  errors: [],
}));

export interface ListFilesRequest {
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached. */
  pageSize?: number;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** Deprecated: The source of files to list. Use `corpora` instead. */
  corpus?: "domain" | "user" | (string & {});
  /** A query for filtering the file results. For supported syntax, see [Search for files and folders](/workspace/drive/api/guides/search-files). */
  q?: string;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** ID of the shared drive to search. */
  driveId?: string;
  /** Specifies a collection of items (files or documents) to which the query applies. Supported items include: * `user` * `domain` * `drive` * `allDrives` Prefer `user` or `drive` to `allDrives` for efficiency. By default, corpora is set to `user`. However, this can change depending on the filter set through the `q` parameter. For more information, see [File organization](https://developers.google.com/workspace/drive/api/guides/about-files#file-organization). */
  corpora?: string;
  /** A comma-separated list of sort keys. Valid keys are: * `createdTime`: When the file was created. Avoid using this key for queries on large item collections as it might result in timeouts or other issues. For time-related sorting on large item collections, use `modifiedTime` instead. * `folder`: The folder ID. This field is sorted using alphabetical ordering. * `modifiedByMeTime`: The last time the file was modified by the user. * `modifiedTime`: The last time the file was modified by anyone. * `name`: The name of the file. This field is sorted using alphabetical ordering, so 1, 12, 2, 22. * `name_natural`: The name of the file. This field is sorted using natural sort ordering, so 1, 2, 12, 22. * `quotaBytesUsed`: The number of storage quota bytes used by the file. * `recency`: The most recent timestamp from the file's date-time fields. * `sharedWithMeTime`: When the file was shared with the user, if applicable. * `starred`: Whether the user has starred the file. * `viewedByMeTime`: The last time the file was viewed by the user. Each key sorts ascending by default, but can be reversed with the `desc` modifier. Example usage: `?orderBy=folder,modifiedTime desc,name`. */
  orderBy?: string;
  /** A comma-separated list of spaces to query within the corpora. Supported values are `drive` and `appDataFolder`. For more information, see [File organization](https://developers.google.com/workspace/drive/api/guides/about-files#file-organization). */
  spaces?: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Deprecated: Use `includeItemsFromAllDrives` instead. */
  includeTeamDriveItems?: boolean;
}

export const ListFilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsAllDrives"),
  ),
  teamDriveId: Schema.optional(Schema.String).pipe(T.HttpQuery("teamDriveId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("supportsTeamDrives"),
  ),
  includeItemsFromAllDrives: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeItemsFromAllDrives"),
  ),
  corpus: Schema.optional(Schema.String).pipe(T.HttpQuery("corpus")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includePermissionsForView"),
  ),
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  corpora: Schema.optional(Schema.String).pipe(T.HttpQuery("corpora")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  spaces: Schema.optional(Schema.String).pipe(T.HttpQuery("spaces")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  includeLabels: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includeLabels"),
  ),
  includeTeamDriveItems: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeTeamDriveItems"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "files" }),
  svc,
) as unknown as Schema.Schema<ListFilesRequest>;

export type ListFilesResponse = FileList;
export const ListFilesResponse = /*@__PURE__*/ /*#__PURE__*/ FileList;

export type ListFilesError = DefaultErrors;

/** Lists the user's files. For more information, see [Search for files and folders](/workspace/drive/api/guides/search-files). This method accepts the `q` parameter, which is a search query combining one or more search terms. This method returns *all* files by default, including trashed files. If you don't want trashed files to appear in the list, use the `trashed=false` query parameter to remove trashed files from the results. */
export const listFiles: API.PaginatedOperationMethod<
  ListFilesRequest,
  ListFilesResponse,
  ListFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFilesRequest,
  output: ListFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GenerateIdsFilesRequest {
  /** The space in which the IDs can be used to create files. Supported values are `drive` and `appDataFolder`. (Default: `drive`.) For more information, see [File organization](https://developers.google.com/workspace/drive/api/guides/about-files#file-organization). */
  space?: string;
  /** The type of items which the IDs can be used for. Supported values are `files` and `shortcuts`. Note that `shortcuts` are only supported in the `drive` `space`. (Default: `files`.) For more information, see [File organization](https://developers.google.com/workspace/drive/api/guides/about-files#file-organization). */
  type?: string;
  /** The number of IDs to return. */
  count?: number;
}

export const GenerateIdsFilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    space: Schema.optional(Schema.String).pipe(T.HttpQuery("space")),
    type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
    count: Schema.optional(Schema.Number).pipe(T.HttpQuery("count")),
  }).pipe(
    T.Http({ method: "GET", path: "files/generateIds" }),
    svc,
  ) as unknown as Schema.Schema<GenerateIdsFilesRequest>;

export type GenerateIdsFilesResponse = GeneratedIds;
export const GenerateIdsFilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GeneratedIds;

export type GenerateIdsFilesError = DefaultErrors;

/** Generates a set of file IDs which can be provided in create or copy requests. For more information, see [Create and manage files](https://developers.google.com/workspace/drive/api/guides/create-file). */
export const generateIdsFiles: API.OperationMethod<
  GenerateIdsFilesRequest,
  GenerateIdsFilesResponse,
  GenerateIdsFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateIdsFilesRequest,
  output: GenerateIdsFilesResponse,
  errors: [],
}));

export interface ListAppsRequest {
  /** A comma-separated list of file extensions to limit returned results. All results within the given app query scope which can open any of the given MIME types will be included in the response. If `appFilterExtensions` are provided as well, the result is a union of the two resulting app lists. */
  appFilterMimeTypes?: string;
  /** A language or locale code, as defined by BCP 47, with some extensions from Unicode's LDML format (http://www.unicode.org/reports/tr35/). */
  languageCode?: string;
  /** A comma-separated list of file extensions to limit returned results. All results within the given app query scope which can open any of the given file extensions are included in the response. If `appFilterMimeTypes` are provided as well, the result is a union of the two resulting app lists. */
  appFilterExtensions?: string;
}

export const ListAppsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  appFilterMimeTypes: Schema.optional(Schema.String).pipe(
    T.HttpQuery("appFilterMimeTypes"),
  ),
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
  appFilterExtensions: Schema.optional(Schema.String).pipe(
    T.HttpQuery("appFilterExtensions"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "apps" }),
  svc,
) as unknown as Schema.Schema<ListAppsRequest>;

export type ListAppsResponse = AppList;
export const ListAppsResponse = /*@__PURE__*/ /*#__PURE__*/ AppList;

export type ListAppsError = DefaultErrors;

/** Lists a user's installed apps. For more information, see [Return user info](https://developers.google.com/workspace/drive/api/guides/user-info). */
export const listApps: API.OperationMethod<
  ListAppsRequest,
  ListAppsResponse,
  ListAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListAppsRequest,
  output: ListAppsResponse,
  errors: [],
}));

export interface GetAppsRequest {
  /** The ID of the app. */
  appId: string;
}

export const GetAppsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
}).pipe(
  T.Http({ method: "GET", path: "apps/{appId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsRequest>;

export type GetAppsResponse = App;
export const GetAppsResponse = /*@__PURE__*/ /*#__PURE__*/ App;

export type GetAppsError = DefaultErrors;

/** Gets a specific app. For more information, see [Return user info](https://developers.google.com/workspace/drive/api/guides/user-info). */
export const getApps: API.OperationMethod<
  GetAppsRequest,
  GetAppsResponse,
  GetAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAppsRequest,
  output: GetAppsResponse,
  errors: [],
}));

export interface StopChannelsRequest {
  /** Request body */
  body?: Channel;
}

export const StopChannelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "channels/stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopChannelsRequest>;

export interface StopChannelsResponse {}
export const StopChannelsResponse: Schema.Schema<StopChannelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<StopChannelsResponse>;

export type StopChannelsError = DefaultErrors;

/** Stops watching resources through this channel. For more information, see [Notifications for resource changes](https://developers.google.com/workspace/drive/api/guides/push). */
export const stopChannels: API.OperationMethod<
  StopChannelsRequest,
  StopChannelsResponse,
  StopChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopChannelsRequest,
  output: StopChannelsResponse,
  errors: [],
}));

export interface DeleteRevisionsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the revision. */
  revisionId: string;
}

export const DeleteRevisionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    revisionId: Schema.String.pipe(T.HttpPath("revisionId")),
  },
).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}/revisions/{revisionId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRevisionsRequest>;

export interface DeleteRevisionsResponse {}
export const DeleteRevisionsResponse: Schema.Schema<DeleteRevisionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteRevisionsResponse>;

export type DeleteRevisionsError = DefaultErrors;

/** Permanently deletes a file version. You can only delete revisions for files with binary content in Google Drive, like images or videos. Revisions for other files, like Google Docs or Sheets, and the last remaining file version can't be deleted. For more information, see [Manage file revisions](https://developers.google.com/drive/api/guides/manage-revisions). */
export const deleteRevisions: API.OperationMethod<
  DeleteRevisionsRequest,
  DeleteRevisionsResponse,
  DeleteRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRevisionsRequest,
  output: DeleteRevisionsResponse,
  errors: [],
}));

export interface UpdateRevisionsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the revision. */
  revisionId: string;
  /** Request body */
  body?: Revision;
}

export const UpdateRevisionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    fileId: Schema.String.pipe(T.HttpPath("fileId")),
    revisionId: Schema.String.pipe(T.HttpPath("revisionId")),
    body: Schema.optional(Revision).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "files/{fileId}/revisions/{revisionId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateRevisionsRequest>;

export type UpdateRevisionsResponse = Revision;
export const UpdateRevisionsResponse = /*@__PURE__*/ /*#__PURE__*/ Revision;

export type UpdateRevisionsError = DefaultErrors;

/** Updates a revision with patch semantics. For more information, see [Manage file revisions](https://developers.google.com/workspace/drive/api/guides/manage-revisions). */
export const updateRevisions: API.OperationMethod<
  UpdateRevisionsRequest,
  UpdateRevisionsResponse,
  UpdateRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRevisionsRequest,
  output: UpdateRevisionsResponse,
  errors: [],
}));

export interface GetRevisionsRequest {
  /** The ID of the revision. */
  revisionId: string;
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when the `alt` parameter is set to `media` and the user is the owner of the file or an organizer of the shared drive in which the file resides. */
  acknowledgeAbuse?: boolean;
  /** The ID of the file. */
  fileId: string;
}

export const GetRevisionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  revisionId: Schema.String.pipe(T.HttpPath("revisionId")),
  acknowledgeAbuse: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("acknowledgeAbuse"),
  ),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/revisions/{revisionId}" }),
  svc,
) as unknown as Schema.Schema<GetRevisionsRequest>;

export type GetRevisionsResponse = Revision;
export const GetRevisionsResponse = /*@__PURE__*/ /*#__PURE__*/ Revision;

export type GetRevisionsError = DefaultErrors;

/** Gets a revision's metadata or content by ID. For more information, see [Manage file revisions](https://developers.google.com/workspace/drive/api/guides/manage-revisions). */
export const getRevisions: API.OperationMethod<
  GetRevisionsRequest,
  GetRevisionsResponse,
  GetRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRevisionsRequest,
  output: GetRevisionsResponse,
  errors: [],
}));

export interface ListRevisionsRequest {
  /** The maximum number of revisions to return per page. */
  pageSize?: number;
  /** The ID of the file. */
  fileId: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
}

export const ListRevisionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/revisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsRequest>;

export type ListRevisionsResponse = RevisionList;
export const ListRevisionsResponse = /*@__PURE__*/ /*#__PURE__*/ RevisionList;

export type ListRevisionsError = DefaultErrors;

/** Lists a file's revisions. For more information, see [Manage file revisions](https://developers.google.com/workspace/drive/api/guides/manage-revisions). **Important:** The list of revisions returned by this method might be incomplete for files with a large revision history, including frequently edited Google Docs, Sheets, and Slides. Older revisions might be omitted from the response, meaning the first revision returned may not be the oldest existing revision. The revision history visible in the Workspace editor user interface might be more complete than the list returned by the API. */
export const listRevisions: API.PaginatedOperationMethod<
  ListRevisionsRequest,
  ListRevisionsResponse,
  ListRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRevisionsRequest,
  output: ListRevisionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAboutRequest {}

export const GetAboutRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "about" }),
  svc,
) as unknown as Schema.Schema<GetAboutRequest>;

export type GetAboutResponse = About;
export const GetAboutResponse = /*@__PURE__*/ /*#__PURE__*/ About;

export type GetAboutError = DefaultErrors;

/** Gets information about the user, the user's Drive, and system capabilities. For more information, see [Return user info](https://developers.google.com/workspace/drive/api/guides/user-info). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export const getAbout: API.OperationMethod<
  GetAboutRequest,
  GetAboutResponse,
  GetAboutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAboutRequest,
  output: GetAboutResponse,
  errors: [],
}));

export interface HideDrivesRequest {
  /** The ID of the shared drive. */
  driveId: string;
}

export const HideDrivesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
}).pipe(
  T.Http({ method: "POST", path: "drives/{driveId}/hide", hasBody: true }),
  svc,
) as unknown as Schema.Schema<HideDrivesRequest>;

export type HideDrivesResponse = Drive;
export const HideDrivesResponse = /*@__PURE__*/ /*#__PURE__*/ Drive;

export type HideDrivesError = DefaultErrors;

/** Hides a shared drive from the default view. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export const hideDrives: API.OperationMethod<
  HideDrivesRequest,
  HideDrivesResponse,
  HideDrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: HideDrivesRequest,
  output: HideDrivesResponse,
  errors: [],
}));

export interface UnhideDrivesRequest {
  /** The ID of the shared drive. */
  driveId: string;
}

export const UnhideDrivesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
}).pipe(
  T.Http({ method: "POST", path: "drives/{driveId}/unhide", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnhideDrivesRequest>;

export type UnhideDrivesResponse = Drive;
export const UnhideDrivesResponse = /*@__PURE__*/ /*#__PURE__*/ Drive;

export type UnhideDrivesError = DefaultErrors;

/** Restores a shared drive to the default view. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export const unhideDrives: API.OperationMethod<
  UnhideDrivesRequest,
  UnhideDrivesResponse,
  UnhideDrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UnhideDrivesRequest,
  output: UnhideDrivesResponse,
  errors: [],
}));

export interface CreateDrivesRequest {
  /** Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned. */
  requestId: string;
  /** Request body */
  body?: Drive;
}

export const CreateDrivesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  requestId: Schema.String.pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Drive).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "drives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateDrivesRequest>;

export type CreateDrivesResponse = Drive;
export const CreateDrivesResponse = /*@__PURE__*/ /*#__PURE__*/ Drive;

export type CreateDrivesError = DefaultErrors;

/** Creates a shared drive. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export const createDrives: API.OperationMethod<
  CreateDrivesRequest,
  CreateDrivesResponse,
  CreateDrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDrivesRequest,
  output: CreateDrivesResponse,
  errors: [],
}));

export interface ListDrivesRequest {
  /** Query string for searching shared drives. */
  q?: string;
  /** Page token for shared drives. */
  pageToken?: string;
  /** Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned. */
  useDomainAdminAccess?: boolean;
  /** Maximum number of shared drives to return per page. */
  pageSize?: number;
}

export const ListDrivesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useDomainAdminAccess"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "drives" }),
  svc,
) as unknown as Schema.Schema<ListDrivesRequest>;

export type ListDrivesResponse = DriveList;
export const ListDrivesResponse = /*@__PURE__*/ /*#__PURE__*/ DriveList;

export type ListDrivesError = DefaultErrors;

/** Lists the user's shared drives. This method accepts the `q` parameter, which is a search query combining one or more search terms. For more information, see the [Search for shared drives](/workspace/drive/api/guides/search-shareddrives) guide. */
export const listDrives: API.PaginatedOperationMethod<
  ListDrivesRequest,
  ListDrivesResponse,
  ListDrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDrivesRequest,
  output: ListDrivesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetDrivesRequest {
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
  /** The ID of the shared drive. */
  driveId: string;
}

export const GetDrivesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useDomainAdminAccess"),
  ),
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
}).pipe(
  T.Http({ method: "GET", path: "drives/{driveId}" }),
  svc,
) as unknown as Schema.Schema<GetDrivesRequest>;

export type GetDrivesResponse = Drive;
export const GetDrivesResponse = /*@__PURE__*/ /*#__PURE__*/ Drive;

export type GetDrivesError = DefaultErrors;

/** Gets a shared drive's metadata by ID. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export const getDrives: API.OperationMethod<
  GetDrivesRequest,
  GetDrivesResponse,
  GetDrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDrivesRequest,
  output: GetDrivesResponse,
  errors: [],
}));

export interface UpdateDrivesRequest {
  /** The ID of the shared drive. */
  driveId: string;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
  /** Request body */
  body?: Drive;
}

export const UpdateDrivesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useDomainAdminAccess"),
  ),
  body: Schema.optional(Drive).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "drives/{driveId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDrivesRequest>;

export type UpdateDrivesResponse = Drive;
export const UpdateDrivesResponse = /*@__PURE__*/ /*#__PURE__*/ Drive;

export type UpdateDrivesError = DefaultErrors;

/** Updates the metadata for a shared drive. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export const updateDrives: API.OperationMethod<
  UpdateDrivesRequest,
  UpdateDrivesResponse,
  UpdateDrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDrivesRequest,
  output: UpdateDrivesResponse,
  errors: [],
}));

export interface DeleteDrivesRequest {
  /** The ID of the shared drive. */
  driveId: string;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
  /** Whether any items inside the shared drive should also be deleted. This option is only supported when `useDomainAdminAccess` is also set to `true`. */
  allowItemDeletion?: boolean;
}

export const DeleteDrivesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useDomainAdminAccess"),
  ),
  allowItemDeletion: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowItemDeletion"),
  ),
}).pipe(
  T.Http({ method: "DELETE", path: "drives/{driveId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDrivesRequest>;

export interface DeleteDrivesResponse {}
export const DeleteDrivesResponse: Schema.Schema<DeleteDrivesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteDrivesResponse>;

export type DeleteDrivesError = DefaultErrors;

/** Permanently deletes a shared drive for which the user is an `organizer`. The shared drive cannot contain any untrashed items. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export const deleteDrives: API.OperationMethod<
  DeleteDrivesRequest,
  DeleteDrivesResponse,
  DeleteDrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDrivesRequest,
  output: DeleteDrivesResponse,
  errors: [],
}));

export interface ListTeamdrivesRequest {
  /** Query string for searching Team Drives. */
  q?: string;
  /** Maximum number of Team Drives to return. */
  pageSize?: number;
  /** Page token for Team Drives. */
  pageToken?: string;
  /** Issue the request as a domain administrator; if set to true, then all Team Drives of the domain in which the requester is an administrator are returned. */
  useDomainAdminAccess?: boolean;
}

export const ListTeamdrivesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useDomainAdminAccess"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "teamdrives" }),
  svc,
) as unknown as Schema.Schema<ListTeamdrivesRequest>;

export type ListTeamdrivesResponse = TeamDriveList;
export const ListTeamdrivesResponse = /*@__PURE__*/ /*#__PURE__*/ TeamDriveList;

export type ListTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.list` instead. */
export const listTeamdrives: API.PaginatedOperationMethod<
  ListTeamdrivesRequest,
  ListTeamdrivesResponse,
  ListTeamdrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTeamdrivesRequest,
  output: ListTeamdrivesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetTeamdrivesRequest {
  /** The ID of the Team Drive */
  teamDriveId: string;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs. */
  useDomainAdminAccess?: boolean;
}

export const GetTeamdrivesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  teamDriveId: Schema.String.pipe(T.HttpPath("teamDriveId")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useDomainAdminAccess"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "teamdrives/{teamDriveId}" }),
  svc,
) as unknown as Schema.Schema<GetTeamdrivesRequest>;

export type GetTeamdrivesResponse = TeamDrive;
export const GetTeamdrivesResponse = /*@__PURE__*/ /*#__PURE__*/ TeamDrive;

export type GetTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.get` instead. */
export const getTeamdrives: API.OperationMethod<
  GetTeamdrivesRequest,
  GetTeamdrivesResponse,
  GetTeamdrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetTeamdrivesRequest,
  output: GetTeamdrivesResponse,
  errors: [],
}));

export interface UpdateTeamdrivesRequest {
  /** The ID of the Team Drive */
  teamDriveId: string;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs. */
  useDomainAdminAccess?: boolean;
  /** Request body */
  body?: TeamDrive;
}

export const UpdateTeamdrivesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    teamDriveId: Schema.String.pipe(T.HttpPath("teamDriveId")),
    useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useDomainAdminAccess"),
    ),
    body: Schema.optional(TeamDrive).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "teamdrives/{teamDriveId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateTeamdrivesRequest>;

export type UpdateTeamdrivesResponse = TeamDrive;
export const UpdateTeamdrivesResponse = /*@__PURE__*/ /*#__PURE__*/ TeamDrive;

export type UpdateTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.update` instead. */
export const updateTeamdrives: API.OperationMethod<
  UpdateTeamdrivesRequest,
  UpdateTeamdrivesResponse,
  UpdateTeamdrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateTeamdrivesRequest,
  output: UpdateTeamdrivesResponse,
  errors: [],
}));

export interface DeleteTeamdrivesRequest {
  /** The ID of the Team Drive */
  teamDriveId: string;
}

export const DeleteTeamdrivesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    teamDriveId: Schema.String.pipe(T.HttpPath("teamDriveId")),
  }).pipe(
    T.Http({ method: "DELETE", path: "teamdrives/{teamDriveId}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteTeamdrivesRequest>;

export interface DeleteTeamdrivesResponse {}
export const DeleteTeamdrivesResponse: Schema.Schema<DeleteTeamdrivesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteTeamdrivesResponse>;

export type DeleteTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.delete` instead. */
export const deleteTeamdrives: API.OperationMethod<
  DeleteTeamdrivesRequest,
  DeleteTeamdrivesResponse,
  DeleteTeamdrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTeamdrivesRequest,
  output: DeleteTeamdrivesResponse,
  errors: [],
}));

export interface CreateTeamdrivesRequest {
  /** Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned. */
  requestId: string;
  /** Request body */
  body?: TeamDrive;
}

export const CreateTeamdrivesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.String.pipe(T.HttpQuery("requestId")),
    body: Schema.optional(TeamDrive).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "teamdrives", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateTeamdrivesRequest>;

export type CreateTeamdrivesResponse = TeamDrive;
export const CreateTeamdrivesResponse = /*@__PURE__*/ /*#__PURE__*/ TeamDrive;

export type CreateTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.create` instead. */
export const createTeamdrives: API.OperationMethod<
  CreateTeamdrivesRequest,
  CreateTeamdrivesResponse,
  CreateTeamdrivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTeamdrivesRequest,
  output: CreateTeamdrivesResponse,
  errors: [],
}));
