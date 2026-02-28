// ==========================================================================
// Google Drive API (drive v3)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
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

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface User {
  /** Output only. A plain text displayable name for this user. */
  displayName?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`. */
  kind?: string;
  /** Output only. Whether this user is the requesting user. */
  me?: boolean;
  /** Output only. The user's ID as visible in Permission resources. */
  permissionId?: string;
  /** Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester. */
  emailAddress?: string;
  /** Output only. A link to the user's profile photo, if available. */
  photoLink?: string;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  me: Schema.optional(Schema.Boolean),
  permissionId: Schema.optional(Schema.String),
  emailAddress: Schema.optional(Schema.String),
  photoLink: Schema.optional(Schema.String),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface About {
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#about"`. */
  kind?: string;
  /** The user's storage quota limits and usage. For users that are part of an organization with pooled storage, information about the limit and usage across all services is for the organization, rather than the individual user. All fields are measured in bytes. */
  storageQuota?: { limit?: string; usageInDrive?: string; usageInDriveTrash?: string; usage?: string };
  /** A list of themes that are supported for shared drives. */
  driveThemes?: Array<{ id?: string; backgroundImageLink?: string; colorRgb?: string }>;
  /** Whether the user can create shared drives. */
  canCreateDrives?: boolean;
  /** A map of source MIME type to possible targets for all supported imports. */
  importFormats?: Record<string, Array<string>>;
  /** A map of source MIME type to possible targets for all supported exports. */
  exportFormats?: Record<string, Array<string>>;
  /** Whether the user has installed the requesting app. */
  appInstalled?: boolean;
  /** The authenticated user. */
  user?: User;
  /** The currently supported folder colors as RGB hex strings. */
  folderColorPalette?: Array<string>;
  /** A map of maximum import sizes by MIME type, in bytes. */
  maxImportSizes?: Record<string, string>;
  /** The maximum upload size in bytes. */
  maxUploadSize?: string;
  /** Deprecated: Use `driveThemes` instead. */
  teamDriveThemes?: Array<{ id?: string; backgroundImageLink?: string; colorRgb?: string }>;
  /** Deprecated: Use `canCreateDrives` instead. */
  canCreateTeamDrives?: boolean;
}

export const About: Schema.Schema<About> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  storageQuota: Schema.optional(Schema.Struct({ limit: Schema.optional(Schema.String), usageInDrive: Schema.optional(Schema.String), usageInDriveTrash: Schema.optional(Schema.String), usage: Schema.optional(Schema.String) })),
  driveThemes: Schema.optional(Schema.Array(Schema.Struct({ id: Schema.optional(Schema.String), backgroundImageLink: Schema.optional(Schema.String), colorRgb: Schema.optional(Schema.String) }))),
  canCreateDrives: Schema.optional(Schema.Boolean),
  importFormats: Schema.optional(Schema.Record(Schema.String, Schema.Array(Schema.String))),
  exportFormats: Schema.optional(Schema.Record(Schema.String, Schema.Array(Schema.String))),
  appInstalled: Schema.optional(Schema.Boolean),
  user: Schema.optional(User),
  folderColorPalette: Schema.optional(Schema.Array(Schema.String)),
  maxImportSizes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  maxUploadSize: Schema.optional(Schema.String),
  teamDriveThemes: Schema.optional(Schema.Array(Schema.Struct({ id: Schema.optional(Schema.String), backgroundImageLink: Schema.optional(Schema.String), colorRgb: Schema.optional(Schema.String) }))),
  canCreateTeamDrives: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "About" }) as any as Schema.Schema<About>;

export interface AppIcons {
  /** Size of the icon. Represented as the maximum of the width and height. */
  size?: number;
  /** Category of the icon. Allowed values are: * `application` - The icon for the application. * `document` - The icon for a file associated with the app. * `documentShared` - The icon for a shared file associated with the app. */
  category?: string;
  /** URL for the icon. */
  iconUrl?: string;
}

export const AppIcons: Schema.Schema<AppIcons> = Schema.suspend(() => Schema.Struct({
  size: Schema.optional(Schema.Number),
  category: Schema.optional(Schema.String),
  iconUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "AppIcons" }) as any as Schema.Schema<AppIcons>;

export interface App {
  /** The name of the app. */
  name?: string;
  /** The type of object this app creates such as a Chart. If empty, the app name should be used instead. */
  objectType?: string;
  /** Whether this app supports creating objects. */
  supportsCreate?: boolean;
  /** A link to the product listing for this app. */
  productUrl?: string;
  /** The list of primary MIME types. */
  primaryMimeTypes?: Array<string>;
  /** The list of secondary MIME types. */
  secondaryMimeTypes?: Array<string>;
  /** The list of primary file extensions. */
  primaryFileExtensions?: Array<string>;
  /** The list of secondary file extensions. */
  secondaryFileExtensions?: Array<string>;
  /** The ID of the app. */
  id?: string;
  /** Whether this app supports importing from Google Docs. */
  supportsImport?: boolean;
  /** Whether the app is installed. */
  installed?: boolean;
  /** Whether the app is authorized to access data on the user's Drive. */
  authorized?: boolean;
  /** The various icons for the app. */
  icons?: Array<AppIcons>;
  /** Whether the app is selected as the default handler for the types it supports. */
  useByDefault?: boolean;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string "drive#app". */
  kind?: string;
  /** A short description of the app. */
  shortDescription?: string;
  /** A long description of the app. */
  longDescription?: string;
  /** Whether this app supports opening more than one file. */
  supportsMultiOpen?: boolean;
  /** The ID of the product listing for this app. */
  productId?: string;
  /** The template URL for opening files with this app. The template contains {ids} or {exportIds} to be replaced by the actual file IDs. For more information, see Open Files for the full documentation. */
  openUrlTemplate?: string;
  /** The URL to create a file with this app. */
  createUrl?: string;
  /** The template URL to create a file with this app in a given folder. The template contains the {folderId} to be replaced by the folder ID house the new file. */
  createInFolderTemplate?: string;
  /** Whether this app supports creating files when offline. */
  supportsOfflineCreate?: boolean;
  /** Whether the app has Drive-wide scope. An app with Drive-wide scope can access all files in the user's Drive. */
  hasDriveWideScope?: boolean;
}

export const App: Schema.Schema<App> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  objectType: Schema.optional(Schema.String),
  supportsCreate: Schema.optional(Schema.Boolean),
  productUrl: Schema.optional(Schema.String),
  primaryMimeTypes: Schema.optional(Schema.Array(Schema.String)),
  secondaryMimeTypes: Schema.optional(Schema.Array(Schema.String)),
  primaryFileExtensions: Schema.optional(Schema.Array(Schema.String)),
  secondaryFileExtensions: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  supportsImport: Schema.optional(Schema.Boolean),
  installed: Schema.optional(Schema.Boolean),
  authorized: Schema.optional(Schema.Boolean),
  icons: Schema.optional(Schema.Array(AppIcons)),
  useByDefault: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  shortDescription: Schema.optional(Schema.String),
  longDescription: Schema.optional(Schema.String),
  supportsMultiOpen: Schema.optional(Schema.Boolean),
  productId: Schema.optional(Schema.String),
  openUrlTemplate: Schema.optional(Schema.String),
  createUrl: Schema.optional(Schema.String),
  createInFolderTemplate: Schema.optional(Schema.String),
  supportsOfflineCreate: Schema.optional(Schema.Boolean),
  hasDriveWideScope: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "App" }) as any as Schema.Schema<App>;

export interface AppList {
  /** The list of app IDs that the user has specified to use by default. The list is in reverse-priority order (lowest to highest). */
  defaultAppIds?: Array<string>;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string "drive#appList". */
  kind?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** The list of apps. */
  items?: Array<App>;
}

export const AppList: Schema.Schema<AppList> = Schema.suspend(() => Schema.Struct({
  defaultAppIds: Schema.optional(Schema.Array(Schema.String)),
  kind: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(App)),
})).annotate({ identifier: "AppList" }) as any as Schema.Schema<AppList>;

export interface StartPageToken {
  /** The starting page token for listing future changes. The page token doesn't expire. */
  startPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#startPageToken"`. */
  kind?: string;
}

export const StartPageToken: Schema.Schema<StartPageToken> = Schema.suspend(() => Schema.Struct({
  startPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "StartPageToken" }) as any as Schema.Schema<StartPageToken>;

export interface Permission {
  /** Output only. The ID of this permission. This is a unique identifier for the grantee, and is published in the [User resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/User) as `permissionId`. IDs should be treated as opaque values. */
  id?: string;
  /** Output only. The "pretty" name of the value of the permission. The following is a list of examples for each type of permission: * `user` - User's full name, as defined for their Google Account, such as "Dana A." * `group` - Name of the Google Group, such as "The Company Administrators." * `domain` - String domain name, such as "cymbalgroup.com." * `anyone` - No `displayName` is present. */
  displayName?: string;
  /** The type of the grantee. Supported values include: * `user` * `group` * `domain` * `anyone` When creating a permission, if `type` is `user` or `group`, you must provide an `emailAddress` for the user or group. If `type` is `domain`, you must provide a `domain`. If `type` is `anyone`, no extra information is required. */
  type?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#permission"`. */
  kind?: string;
  /** Output only. Details of whether the permissions on this item are inherited or are directly on this item. */
  permissionDetails?: Array<{ permissionType?: string; inheritedFrom?: string; role?: string; inherited?: boolean }>;
  /** Output only. A link to the user's profile photo, if available. */
  photoLink?: string;
  /** The email address of the user or group to which this permission refers. */
  emailAddress?: string;
  /** The role granted by this permission. Supported values include: * `owner` * `organizer` * `fileOrganizer` * `writer` * `commenter` * `reader` For more information, see [Roles and permissions](https://developers.google.com/workspace/drive/api/guides/ref-roles). */
  role?: string;
  /** Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type `domain` or `anyone`. */
  allowFileDiscovery?: boolean;
  /** The domain to which this permission refers. */
  domain?: string;
  /** The time at which this permission will expire (RFC 3339 date-time). Expiration times have the following restrictions: - They can only be set on user and group permissions - The time must be in the future - The time cannot be more than a year in the future */
  expirationTime?: string;
  /** Output only. Deprecated: Output only. Use `permissionDetails` instead. */
  teamDrivePermissionDetails?: Array<{ teamDrivePermissionType?: string; inheritedFrom?: string; role?: string; inherited?: boolean }>;
  /** Output only. Whether the account associated with this permission has been deleted. This field only pertains to permissions of type `user` or `group`. */
  deleted?: boolean;
  /** Indicates the view for this permission. Only populated for permissions that belong to a view. The only supported values are `published` and `metadata`: * `published`: The permission's role is `publishedReader`. * `metadata`: The item is only visible to the `metadata` view because the item has limited access and the scope has at least read access to the parent. The `metadata` view is only supported on folders. For more information, see [Views](https://developers.google.com/workspace/drive/api/guides/ref-roles#views). */
  view?: string;
  /** Whether the account associated with this permission is a pending owner. Only populated for permissions of type `user` for files that aren't in a shared drive. */
  pendingOwner?: boolean;
  /** When `true`, only organizers, owners, and users with permissions added directly on the item can access it. */
  inheritedPermissionsDisabled?: boolean;
}

export const Permission: Schema.Schema<Permission> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  permissionDetails: Schema.optional(Schema.Array(Schema.Struct({ permissionType: Schema.optional(Schema.String), inheritedFrom: Schema.optional(Schema.String), role: Schema.optional(Schema.String), inherited: Schema.optional(Schema.Boolean) }))),
  photoLink: Schema.optional(Schema.String),
  emailAddress: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  allowFileDiscovery: Schema.optional(Schema.Boolean),
  domain: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  teamDrivePermissionDetails: Schema.optional(Schema.Array(Schema.Struct({ teamDrivePermissionType: Schema.optional(Schema.String), inheritedFrom: Schema.optional(Schema.String), role: Schema.optional(Schema.String), inherited: Schema.optional(Schema.Boolean) }))),
  deleted: Schema.optional(Schema.Boolean),
  view: Schema.optional(Schema.String),
  pendingOwner: Schema.optional(Schema.Boolean),
  inheritedPermissionsDisabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Permission" }) as any as Schema.Schema<Permission>;

export interface ContentRestriction {
  /** Whether the content of the file is read-only. If a file is read-only, a new revision of the file may not be added, comments may not be added or modified, and the title of the file may not be modified. */
  readOnly?: boolean;
  /** Reason for why the content of the file is restricted. This is only mutable on requests that also set `readOnly=true`. */
  reason?: string;
  /** Output only. The type of the content restriction. Currently the only possible value is `globalContentRestriction`. */
  type?: string;
  /** Output only. The user who set the content restriction. Only populated if `readOnly=true`. */
  restrictingUser?: User;
  /** The time at which the content restriction was set (formatted RFC 3339 timestamp). Only populated if readOnly is true. */
  restrictionTime?: string;
  /** Whether the content restriction can only be modified or removed by a user who owns the file. For files in shared drives, any user with `organizer` capabilities can modify or remove this content restriction. */
  ownerRestricted?: boolean;
  /** Output only. Whether the content restriction was applied by the system, for example due to an esignature. Users cannot modify or remove system restricted content restrictions. */
  systemRestricted?: boolean;
}

export const ContentRestriction: Schema.Schema<ContentRestriction> = Schema.suspend(() => Schema.Struct({
  readOnly: Schema.optional(Schema.Boolean),
  reason: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  restrictingUser: Schema.optional(User),
  restrictionTime: Schema.optional(Schema.String),
  ownerRestricted: Schema.optional(Schema.Boolean),
  systemRestricted: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ContentRestriction" }) as any as Schema.Schema<ContentRestriction>;

export interface LabelField {
  /** This is always drive#labelField. */
  kind?: string;
  /** The identifier of this label field. */
  id?: string;
  /** The field type. While new values may be supported in the future, the following are currently allowed: * `dateString` * `integer` * `selection` * `text` * `user` */
  valueType?: string;
  /** Only present if valueType is dateString. RFC 3339 formatted date: YYYY-MM-DD. */
  dateString?: Array<string>;
  /** Only present if `valueType` is `integer`. */
  integer?: Array<string>;
  /** Only present if `valueType` is `selection` */
  selection?: Array<string>;
  /** Only present if `valueType` is `text`. */
  text?: Array<string>;
  /** Only present if `valueType` is `user`. */
  user?: Array<User>;
}

export const LabelField: Schema.Schema<LabelField> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  dateString: Schema.optional(Schema.Array(Schema.String)),
  integer: Schema.optional(Schema.Array(Schema.String)),
  selection: Schema.optional(Schema.Array(Schema.String)),
  text: Schema.optional(Schema.Array(Schema.String)),
  user: Schema.optional(Schema.Array(User)),
})).annotate({ identifier: "LabelField" }) as any as Schema.Schema<LabelField>;

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

export const Label: Schema.Schema<Label> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Record(Schema.String, LabelField)),
})).annotate({ identifier: "Label" }) as any as Schema.Schema<Label>;

export interface DownloadRestriction {
  /** Whether download and copy is restricted for readers. */
  restrictedForReaders?: boolean;
  /** Whether download and copy is restricted for writers. If `true`, download is also restricted for readers. */
  restrictedForWriters?: boolean;
}

export const DownloadRestriction: Schema.Schema<DownloadRestriction> = Schema.suspend(() => Schema.Struct({
  restrictedForReaders: Schema.optional(Schema.Boolean),
  restrictedForWriters: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DownloadRestriction" }) as any as Schema.Schema<DownloadRestriction>;

export interface DownloadRestrictionsMetadata {
  /** The download restriction of the file applied directly by the owner or organizer. This doesn't take into account shared drive settings or DLP rules. */
  itemDownloadRestriction?: DownloadRestriction;
  /** Output only. The effective download restriction applied to this file. This considers all restriction settings and DLP rules. */
  effectiveDownloadRestrictionWithContext?: DownloadRestriction;
}

export const DownloadRestrictionsMetadata: Schema.Schema<DownloadRestrictionsMetadata> = Schema.suspend(() => Schema.Struct({
  itemDownloadRestriction: Schema.optional(DownloadRestriction),
  effectiveDownloadRestrictionWithContext: Schema.optional(DownloadRestriction),
})).annotate({ identifier: "DownloadRestrictionsMetadata" }) as any as Schema.Schema<DownloadRestrictionsMetadata>;

export interface File {
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#file"`. */
  kind?: string;
  /** Output only. ID of the shared drive the file resides in. Only populated for items in shared drives. */
  driveId?: string;
  /** Output only. The final component of `fullFileExtension`. This is only available for files with binary content in Google Drive. */
  fileExtension?: string;
  /** Whether the options to copy, print, or download this file should be disabled for readers and commenters. */
  copyRequiresWriterPermission?: boolean;
  /** Output only. The MD5 checksum for the content of the file. This is only applicable to files with binary content in Google Drive. */
  md5Checksum?: string;
  /** Additional information about the content of the file. These fields are never populated in responses. */
  contentHints?: { indexableText?: string; thumbnail?: { image?: string; mimeType?: string } };
  /** Whether users with only `writer` permission can modify the file's permissions. Not populated for items in shared drives. */
  writersCanShare?: boolean;
  /** Output only. Whether the file has been viewed by this user. */
  viewedByMe?: boolean;
  /** The MIME type of the file. Google Drive attempts to automatically detect an appropriate value from uploaded content, if no value is provided. The value cannot be changed unless a new revision is uploaded. If a file is created with a Google Doc MIME type, the uploaded content is imported, if possible. The supported import formats are published in the [`about`](/workspace/drive/api/reference/rest/v3/about) resource. */
  mimeType?: string;
  /** Output only. Links for exporting Docs Editors files to specific formats. */
  exportLinks?: Record<string, string>;
  /** The ID of the parent folder containing the file. A file can only have one parent folder; specifying multiple parents isn't supported. If not specified as part of a create request, the file is placed directly in the user's My Drive folder. If not specified as part of a copy request, the file inherits any discoverable parent of the source file. Update requests must use the `addParents` and `removeParents` parameters to modify the parents list. */
  parents?: Array<string>;
  /** Output only. A short-lived link to the file's thumbnail, if available. Typically lasts on the order of hours. Not intended for direct usage on web applications due to [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policies. Consider using a proxy server. Only populated when the requesting app can access the file's content. If the file isn't shared publicly, the URL returned in `files.thumbnailLink` must be fetched using a credentialed request. */
  thumbnailLink?: string;
  /** Output only. A static, unauthenticated link to the file's icon. */
  iconLink?: string;
  /** Output only. Whether the file has been shared. Not populated for items in shared drives. */
  shared?: boolean;
  /** Output only. The last user to modify the file. This field is only populated when the last modification was performed by a signed-in user. */
  lastModifyingUser?: User;
  /** Output only. The owner of this file. Only certain legacy files may have more than one owner. This field isn't populated for items in shared drives. */
  owners?: Array<User>;
  /** Output only. The ID of the file's head revision. This is currently only available for files with binary content in Google Drive. */
  headRevisionId?: string;
  /** Output only. The user who shared the file with the requesting user, if applicable. */
  sharingUser?: User;
  /** Output only. A link for opening the file in a relevant Google editor or viewer in a browser. */
  webViewLink?: string;
  /** Output only. A link for downloading the content of the file in a browser. This is only available for files with binary content in Google Drive. */
  webContentLink?: string;
  /** Output only. Size in bytes of blobs and Google Workspace editor files. Won't be populated for files that have no size, like shortcuts and folders. */
  size?: string;
  /** Deprecated: Use `copyRequiresWriterPermission` instead. */
  viewersCanCopyContent?: boolean;
  /** Output only. The full list of permissions for the file. This is only available if the requesting user can share the file. Not populated for items in shared drives. */
  permissions?: Array<Permission>;
  /** Output only. Whether this file has a thumbnail. This doesn't indicate whether the requesting app has access to the thumbnail. To check access, look for the presence of the thumbnailLink field. */
  hasThumbnail?: boolean;
  /** Output only. The list of spaces which contain the file. The currently supported values are `drive`, `appDataFolder`, and `photos`. */
  spaces?: Array<string>;
  /** The color for a folder or a shortcut to a folder as an RGB hex string. The supported colors are published in the `folderColorPalette` field of the [`about`](/workspace/drive/api/reference/rest/v3/about) resource. If an unsupported color is specified, the closest color in the palette is used instead. */
  folderColorRgb?: string;
  /** The ID of the file. */
  id?: string;
  /** The name of the file. This isn't necessarily unique within a folder. Note that for immutable items such as the top-level folders of shared drives, the My Drive root folder, and the Application Data folder, the name is constant. */
  name?: string;
  /** A short description of the file. */
  description?: string;
  /** Whether the user has starred the file. */
  starred?: boolean;
  /** Whether the file has been trashed, either explicitly or from a trashed parent folder. Only the owner may trash a file, and other users cannot see files in the owner's trash. */
  trashed?: boolean;
  /** Output only. Whether the file has been explicitly trashed, as opposed to recursively trashed from a parent folder. */
  explicitlyTrashed?: boolean;
  /** The time at which the file was created (RFC 3339 date-time). */
  createdTime?: string;
  /** he last time the file was modified by anyone (RFC 3339 date-time). Note that setting modifiedTime will also update modifiedByMeTime for the user. */
  modifiedTime?: string;
  /** The last time the file was modified by the user (RFC 3339 date-time). */
  modifiedByMeTime?: string;
  /** The last time the file was viewed by the user (RFC 3339 date-time). */
  viewedByMeTime?: string;
  /** The time at which the file was shared with the user, if applicable (RFC 3339 date-time). */
  sharedWithMeTime?: string;
  /** Output only. The number of storage quota bytes used by the file. This includes the head revision as well as previous revisions with `keepForever` enabled. */
  quotaBytesUsed?: string;
  /** Output only. A monotonically increasing version number for the file. This reflects every change made to the file on the server, even those not visible to the user. */
  version?: string;
  /** The original filename of the uploaded content if available, or else the original value of the `name` field. This is only available for files with binary content in Google Drive. */
  originalFilename?: string;
  /** Output only. Whether the user owns the file. Not populated for items in shared drives. */
  ownedByMe?: boolean;
  /** Output only. The full file extension extracted from the `name` field. May contain multiple concatenated extensions, such as "tar.gz". This is only available for files with binary content in Google Drive. This is automatically updated when the `name` field changes, however it's not cleared if the new name doesn't contain a valid extension. */
  fullFileExtension?: string;
  /** A collection of arbitrary key-value pairs which are visible to all apps. Entries with null values are cleared in update and copy requests. */
  properties?: Record<string, string>;
  /** A collection of arbitrary key-value pairs which are private to the requesting app. Entries with null values are cleared in update and copy requests. These properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with a OAuth 2 client ID. You cannot use an API key to retrieve private properties. */
  appProperties?: Record<string, string>;
  /** Output only. Whether the file was created or opened by the requesting app. */
  isAppAuthorized?: boolean;
  /** Deprecated: Output only. Use `driveId` instead. */
  teamDriveId?: string;
  /** Output only. Capabilities the current user has on this file. Each capability corresponds to a fine-grained action that a user may take. For more information, see [Understand file capabilities](https://developers.google.com/workspace/drive/api/guides/manage-sharing#capabilities). */
  capabilities?: { canChangeViewersCanCopyContent?: boolean; canMoveChildrenOutOfDrive?: boolean; canReadDrive?: boolean; canEdit?: boolean; canCopy?: boolean; canComment?: boolean; canAddChildren?: boolean; canDelete?: boolean; canDownload?: boolean; canListChildren?: boolean; canRemoveChildren?: boolean; canRename?: boolean; canTrash?: boolean; canReadRevisions?: boolean; canReadTeamDrive?: boolean; canMoveTeamDriveItem?: boolean; canChangeCopyRequiresWriterPermission?: boolean; canMoveItemIntoTeamDrive?: boolean; canUntrash?: boolean; canModifyContent?: boolean; canMoveItemWithinTeamDrive?: boolean; canMoveItemOutOfTeamDrive?: boolean; canDeleteChildren?: boolean; canMoveChildrenOutOfTeamDrive?: boolean; canMoveChildrenWithinTeamDrive?: boolean; canTrashChildren?: boolean; canMoveItemOutOfDrive?: boolean; canAddMyDriveParent?: boolean; canRemoveMyDriveParent?: boolean; canMoveItemWithinDrive?: boolean; canShare?: boolean; canMoveChildrenWithinDrive?: boolean; canModifyContentRestriction?: boolean; canAddFolderFromAnotherDrive?: boolean; canChangeSecurityUpdateEnabled?: boolean; canAcceptOwnership?: boolean; canReadLabels?: boolean; canModifyLabels?: boolean; canModifyEditorContentRestriction?: boolean; canModifyOwnerContentRestriction?: boolean; canRemoveContentRestriction?: boolean; canDisableInheritedPermissions?: boolean; canEnableInheritedPermissions?: boolean; canChangeItemDownloadRestriction?: boolean };
  /** Output only. Whether there are permissions directly on this file. This field is only populated for items in shared drives. */
  hasAugmentedPermissions?: boolean;
  /** Output only. If the file has been explicitly trashed, the user who trashed it. Only populated for items in shared drives. */
  trashingUser?: User;
  /** Output only. The thumbnail version for use in thumbnail cache invalidation. */
  thumbnailVersion?: string;
  /** The time that the item was trashed (RFC 3339 date-time). Only populated for items in shared drives. */
  trashedTime?: string;
  /** Output only. Whether the file has been modified by this user. */
  modifiedByMe?: boolean;
  /** Output only. List of permission IDs for users with access to this file. */
  permissionIds?: Array<string>;
  /** Output only. Additional metadata about image media, if available. */
  imageMediaMetadata?: { flashUsed?: boolean; meteringMode?: string; sensor?: string; exposureMode?: string; colorSpace?: string; whiteBalance?: string; width?: number; height?: number; location?: { latitude?: number; longitude?: number; altitude?: number }; rotation?: number; time?: string; cameraMake?: string; cameraModel?: string; exposureTime?: number; aperture?: number; focalLength?: number; isoSpeed?: number; exposureBias?: number; maxApertureValue?: number; subjectDistance?: number; lens?: string };
  /** Output only. Additional metadata about video media. This may not be available immediately upon upload. */
  videoMediaMetadata?: { width?: number; height?: number; durationMillis?: string };
  /** Shortcut file details. Only populated for shortcut files, which have the mimeType field set to `application/vnd.google-apps.shortcut`. Can only be set on `files.create` requests. */
  shortcutDetails?: { targetId?: string; targetMimeType?: string; targetResourceKey?: string };
  /** Restrictions for accessing the content of the file. Only populated if such a restriction exists. */
  contentRestrictions?: Array<ContentRestriction>;
  /** Output only. A key needed to access the item via a shared link. */
  resourceKey?: string;
  /** Contains details about the link URLs that clients are using to refer to this item. */
  linkShareMetadata?: { securityUpdateEligible?: boolean; securityUpdateEnabled?: boolean };
  /** Output only. An overview of the labels on the file. */
  labelInfo?: { labels?: Array<Label> };
  /** Output only. The SHA1 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha1Checksum?: string;
  /** Output only. The SHA256 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha256Checksum?: string;
  /** Whether this file has inherited permissions disabled. Inherited permissions are enabled by default. */
  inheritedPermissionsDisabled?: boolean;
  /** Download restrictions applied on the file. */
  downloadRestrictions?: DownloadRestrictionsMetadata;
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  driveId: Schema.optional(Schema.String),
  fileExtension: Schema.optional(Schema.String),
  copyRequiresWriterPermission: Schema.optional(Schema.Boolean),
  md5Checksum: Schema.optional(Schema.String),
  contentHints: Schema.optional(Schema.Struct({ indexableText: Schema.optional(Schema.String), thumbnail: Schema.optional(Schema.Struct({ image: Schema.optional(Schema.String), mimeType: Schema.optional(Schema.String) })) })),
  writersCanShare: Schema.optional(Schema.Boolean),
  viewedByMe: Schema.optional(Schema.Boolean),
  mimeType: Schema.optional(Schema.String),
  exportLinks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  parents: Schema.optional(Schema.Array(Schema.String)),
  thumbnailLink: Schema.optional(Schema.String),
  iconLink: Schema.optional(Schema.String),
  shared: Schema.optional(Schema.Boolean),
  lastModifyingUser: Schema.optional(User),
  owners: Schema.optional(Schema.Array(User)),
  headRevisionId: Schema.optional(Schema.String),
  sharingUser: Schema.optional(User),
  webViewLink: Schema.optional(Schema.String),
  webContentLink: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
  viewersCanCopyContent: Schema.optional(Schema.Boolean),
  permissions: Schema.optional(Schema.Array(Permission)),
  hasThumbnail: Schema.optional(Schema.Boolean),
  spaces: Schema.optional(Schema.Array(Schema.String)),
  folderColorRgb: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  starred: Schema.optional(Schema.Boolean),
  trashed: Schema.optional(Schema.Boolean),
  explicitlyTrashed: Schema.optional(Schema.Boolean),
  createdTime: Schema.optional(Schema.String),
  modifiedTime: Schema.optional(Schema.String),
  modifiedByMeTime: Schema.optional(Schema.String),
  viewedByMeTime: Schema.optional(Schema.String),
  sharedWithMeTime: Schema.optional(Schema.String),
  quotaBytesUsed: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  originalFilename: Schema.optional(Schema.String),
  ownedByMe: Schema.optional(Schema.Boolean),
  fullFileExtension: Schema.optional(Schema.String),
  properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  appProperties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  isAppAuthorized: Schema.optional(Schema.Boolean),
  teamDriveId: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Struct({ canChangeViewersCanCopyContent: Schema.optional(Schema.Boolean), canMoveChildrenOutOfDrive: Schema.optional(Schema.Boolean), canReadDrive: Schema.optional(Schema.Boolean), canEdit: Schema.optional(Schema.Boolean), canCopy: Schema.optional(Schema.Boolean), canComment: Schema.optional(Schema.Boolean), canAddChildren: Schema.optional(Schema.Boolean), canDelete: Schema.optional(Schema.Boolean), canDownload: Schema.optional(Schema.Boolean), canListChildren: Schema.optional(Schema.Boolean), canRemoveChildren: Schema.optional(Schema.Boolean), canRename: Schema.optional(Schema.Boolean), canTrash: Schema.optional(Schema.Boolean), canReadRevisions: Schema.optional(Schema.Boolean), canReadTeamDrive: Schema.optional(Schema.Boolean), canMoveTeamDriveItem: Schema.optional(Schema.Boolean), canChangeCopyRequiresWriterPermission: Schema.optional(Schema.Boolean), canMoveItemIntoTeamDrive: Schema.optional(Schema.Boolean), canUntrash: Schema.optional(Schema.Boolean), canModifyContent: Schema.optional(Schema.Boolean), canMoveItemWithinTeamDrive: Schema.optional(Schema.Boolean), canMoveItemOutOfTeamDrive: Schema.optional(Schema.Boolean), canDeleteChildren: Schema.optional(Schema.Boolean), canMoveChildrenOutOfTeamDrive: Schema.optional(Schema.Boolean), canMoveChildrenWithinTeamDrive: Schema.optional(Schema.Boolean), canTrashChildren: Schema.optional(Schema.Boolean), canMoveItemOutOfDrive: Schema.optional(Schema.Boolean), canAddMyDriveParent: Schema.optional(Schema.Boolean), canRemoveMyDriveParent: Schema.optional(Schema.Boolean), canMoveItemWithinDrive: Schema.optional(Schema.Boolean), canShare: Schema.optional(Schema.Boolean), canMoveChildrenWithinDrive: Schema.optional(Schema.Boolean), canModifyContentRestriction: Schema.optional(Schema.Boolean), canAddFolderFromAnotherDrive: Schema.optional(Schema.Boolean), canChangeSecurityUpdateEnabled: Schema.optional(Schema.Boolean), canAcceptOwnership: Schema.optional(Schema.Boolean), canReadLabels: Schema.optional(Schema.Boolean), canModifyLabels: Schema.optional(Schema.Boolean), canModifyEditorContentRestriction: Schema.optional(Schema.Boolean), canModifyOwnerContentRestriction: Schema.optional(Schema.Boolean), canRemoveContentRestriction: Schema.optional(Schema.Boolean), canDisableInheritedPermissions: Schema.optional(Schema.Boolean), canEnableInheritedPermissions: Schema.optional(Schema.Boolean), canChangeItemDownloadRestriction: Schema.optional(Schema.Boolean) })),
  hasAugmentedPermissions: Schema.optional(Schema.Boolean),
  trashingUser: Schema.optional(User),
  thumbnailVersion: Schema.optional(Schema.String),
  trashedTime: Schema.optional(Schema.String),
  modifiedByMe: Schema.optional(Schema.Boolean),
  permissionIds: Schema.optional(Schema.Array(Schema.String)),
  imageMediaMetadata: Schema.optional(Schema.Struct({ flashUsed: Schema.optional(Schema.Boolean), meteringMode: Schema.optional(Schema.String), sensor: Schema.optional(Schema.String), exposureMode: Schema.optional(Schema.String), colorSpace: Schema.optional(Schema.String), whiteBalance: Schema.optional(Schema.String), width: Schema.optional(Schema.Number), height: Schema.optional(Schema.Number), location: Schema.optional(Schema.Struct({ latitude: Schema.optional(Schema.Number), longitude: Schema.optional(Schema.Number), altitude: Schema.optional(Schema.Number) })), rotation: Schema.optional(Schema.Number), time: Schema.optional(Schema.String), cameraMake: Schema.optional(Schema.String), cameraModel: Schema.optional(Schema.String), exposureTime: Schema.optional(Schema.Number), aperture: Schema.optional(Schema.Number), focalLength: Schema.optional(Schema.Number), isoSpeed: Schema.optional(Schema.Number), exposureBias: Schema.optional(Schema.Number), maxApertureValue: Schema.optional(Schema.Number), subjectDistance: Schema.optional(Schema.Number), lens: Schema.optional(Schema.String) })),
  videoMediaMetadata: Schema.optional(Schema.Struct({ width: Schema.optional(Schema.Number), height: Schema.optional(Schema.Number), durationMillis: Schema.optional(Schema.String) })),
  shortcutDetails: Schema.optional(Schema.Struct({ targetId: Schema.optional(Schema.String), targetMimeType: Schema.optional(Schema.String), targetResourceKey: Schema.optional(Schema.String) })),
  contentRestrictions: Schema.optional(Schema.Array(ContentRestriction)),
  resourceKey: Schema.optional(Schema.String),
  linkShareMetadata: Schema.optional(Schema.Struct({ securityUpdateEligible: Schema.optional(Schema.Boolean), securityUpdateEnabled: Schema.optional(Schema.Boolean) })),
  labelInfo: Schema.optional(Schema.Struct({ labels: Schema.optional(Schema.Array(Label)) })),
  sha1Checksum: Schema.optional(Schema.String),
  sha256Checksum: Schema.optional(Schema.String),
  inheritedPermissionsDisabled: Schema.optional(Schema.Boolean),
  downloadRestrictions: Schema.optional(DownloadRestrictionsMetadata),
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface TeamDrive {
  /** The ID of this Team Drive which is also the ID of the top level folder of this Team Drive. */
  id?: string;
  /** The name of this Team Drive. */
  name?: string;
  /** The color of this Team Drive as an RGB hex string. It can only be set on a `drive.teamdrives.update` request that does not set `themeId`. */
  colorRgb?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#teamDrive"`. */
  kind?: string;
  /** A short-lived link to this Team Drive's background image. */
  backgroundImageLink?: string;
  /** Capabilities the current user has on this Team Drive. */
  capabilities?: { canAddChildren?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteTeamDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRemoveChildren?: boolean; canRename?: boolean; canRenameTeamDrive?: boolean; canChangeTeamDriveBackground?: boolean; canShare?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canChangeTeamMembersOnlyRestriction?: boolean; canDeleteChildren?: boolean; canTrashChildren?: boolean; canResetTeamDriveRestrictions?: boolean; canChangeDownloadRestriction?: boolean };
  /** The ID of the theme from which the background image and color will be set. The set of possible `teamDriveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.teamdrives.create` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`. */
  themeId?: string;
  /** An image file and cropping parameters from which a background image for this Team Drive is set. This is a write only field; it can only be set on `drive.teamdrives.update` requests that don't set `themeId`. When specified, all fields of the `backgroundImageFile` must be set. */
  backgroundImageFile?: { id?: string; xCoordinate?: number; yCoordinate?: number; width?: number };
  /** The time at which the Team Drive was created (RFC 3339 date-time). */
  createdTime?: string;
  /** A set of restrictions that apply to this Team Drive or items inside this Team Drive. */
  restrictions?: { copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; teamMembersOnly?: boolean; adminManagedRestrictions?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean; downloadRestriction?: DownloadRestriction };
  /** The organizational unit of this shared drive. This field is only populated on `drives.list` responses when the `useDomainAdminAccess` parameter is set to `true`. */
  orgUnitId?: string;
}

export const TeamDrive: Schema.Schema<TeamDrive> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  colorRgb: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  backgroundImageLink: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Struct({ canAddChildren: Schema.optional(Schema.Boolean), canComment: Schema.optional(Schema.Boolean), canCopy: Schema.optional(Schema.Boolean), canDeleteTeamDrive: Schema.optional(Schema.Boolean), canDownload: Schema.optional(Schema.Boolean), canEdit: Schema.optional(Schema.Boolean), canListChildren: Schema.optional(Schema.Boolean), canManageMembers: Schema.optional(Schema.Boolean), canReadRevisions: Schema.optional(Schema.Boolean), canRemoveChildren: Schema.optional(Schema.Boolean), canRename: Schema.optional(Schema.Boolean), canRenameTeamDrive: Schema.optional(Schema.Boolean), canChangeTeamDriveBackground: Schema.optional(Schema.Boolean), canShare: Schema.optional(Schema.Boolean), canChangeCopyRequiresWriterPermissionRestriction: Schema.optional(Schema.Boolean), canChangeDomainUsersOnlyRestriction: Schema.optional(Schema.Boolean), canChangeSharingFoldersRequiresOrganizerPermissionRestriction: Schema.optional(Schema.Boolean), canChangeTeamMembersOnlyRestriction: Schema.optional(Schema.Boolean), canDeleteChildren: Schema.optional(Schema.Boolean), canTrashChildren: Schema.optional(Schema.Boolean), canResetTeamDriveRestrictions: Schema.optional(Schema.Boolean), canChangeDownloadRestriction: Schema.optional(Schema.Boolean) })),
  themeId: Schema.optional(Schema.String),
  backgroundImageFile: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String), xCoordinate: Schema.optional(Schema.Number), yCoordinate: Schema.optional(Schema.Number), width: Schema.optional(Schema.Number) })),
  createdTime: Schema.optional(Schema.String),
  restrictions: Schema.optional(Schema.Struct({ copyRequiresWriterPermission: Schema.optional(Schema.Boolean), domainUsersOnly: Schema.optional(Schema.Boolean), teamMembersOnly: Schema.optional(Schema.Boolean), adminManagedRestrictions: Schema.optional(Schema.Boolean), sharingFoldersRequiresOrganizerPermission: Schema.optional(Schema.Boolean), downloadRestriction: Schema.optional(DownloadRestriction) })),
  orgUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "TeamDrive" }) as any as Schema.Schema<TeamDrive>;

export interface Drive {
  /** Output only. The ID of this shared drive which is also the ID of the top level folder of this shared drive. */
  id?: string;
  /** The name of this shared drive. */
  name?: string;
  /** The color of this shared drive as an RGB hex string. It can only be set on a `drive.drives.update` request that does not set `themeId`. */
  colorRgb?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#drive"`. */
  kind?: string;
  /** Output only. A short-lived link to this shared drive's background image. */
  backgroundImageLink?: string;
  /** Output only. Capabilities the current user has on this shared drive. */
  capabilities?: { canAddChildren?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRename?: boolean; canRenameDrive?: boolean; canChangeDriveBackground?: boolean; canShare?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeDriveMembersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canResetDriveRestrictions?: boolean; canDeleteChildren?: boolean; canTrashChildren?: boolean; canChangeDownloadRestriction?: boolean };
  /** The ID of the theme from which the background image and color will be set. The set of possible `driveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.drives.create` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`. */
  themeId?: string;
  /** An image file and cropping parameters from which a background image for this shared drive is set. This is a write only field; it can only be set on `drive.drives.update` requests that don't set `themeId`. When specified, all fields of the `backgroundImageFile` must be set. */
  backgroundImageFile?: { id?: string; xCoordinate?: number; yCoordinate?: number; width?: number };
  /** The time at which the shared drive was created (RFC 3339 date-time). */
  createdTime?: string;
  /** Whether the shared drive is hidden from default view. */
  hidden?: boolean;
  /** A set of restrictions that apply to this shared drive or items inside this shared drive. Note that restrictions can't be set when creating a shared drive. To add a restriction, first create a shared drive and then use `drives.update` to add restrictions. */
  restrictions?: { copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; driveMembersOnly?: boolean; adminManagedRestrictions?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean; downloadRestriction?: DownloadRestriction };
  /** Output only. The organizational unit of this shared drive. This field is only populated on `drives.list` responses when the `useDomainAdminAccess` parameter is set to `true`. */
  orgUnitId?: string;
}

export const Drive: Schema.Schema<Drive> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  colorRgb: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  backgroundImageLink: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Struct({ canAddChildren: Schema.optional(Schema.Boolean), canComment: Schema.optional(Schema.Boolean), canCopy: Schema.optional(Schema.Boolean), canDeleteDrive: Schema.optional(Schema.Boolean), canDownload: Schema.optional(Schema.Boolean), canEdit: Schema.optional(Schema.Boolean), canListChildren: Schema.optional(Schema.Boolean), canManageMembers: Schema.optional(Schema.Boolean), canReadRevisions: Schema.optional(Schema.Boolean), canRename: Schema.optional(Schema.Boolean), canRenameDrive: Schema.optional(Schema.Boolean), canChangeDriveBackground: Schema.optional(Schema.Boolean), canShare: Schema.optional(Schema.Boolean), canChangeCopyRequiresWriterPermissionRestriction: Schema.optional(Schema.Boolean), canChangeDomainUsersOnlyRestriction: Schema.optional(Schema.Boolean), canChangeDriveMembersOnlyRestriction: Schema.optional(Schema.Boolean), canChangeSharingFoldersRequiresOrganizerPermissionRestriction: Schema.optional(Schema.Boolean), canResetDriveRestrictions: Schema.optional(Schema.Boolean), canDeleteChildren: Schema.optional(Schema.Boolean), canTrashChildren: Schema.optional(Schema.Boolean), canChangeDownloadRestriction: Schema.optional(Schema.Boolean) })),
  themeId: Schema.optional(Schema.String),
  backgroundImageFile: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String), xCoordinate: Schema.optional(Schema.Number), yCoordinate: Schema.optional(Schema.Number), width: Schema.optional(Schema.Number) })),
  createdTime: Schema.optional(Schema.String),
  hidden: Schema.optional(Schema.Boolean),
  restrictions: Schema.optional(Schema.Struct({ copyRequiresWriterPermission: Schema.optional(Schema.Boolean), domainUsersOnly: Schema.optional(Schema.Boolean), driveMembersOnly: Schema.optional(Schema.Boolean), adminManagedRestrictions: Schema.optional(Schema.Boolean), sharingFoldersRequiresOrganizerPermission: Schema.optional(Schema.Boolean), downloadRestriction: Schema.optional(DownloadRestriction) })),
  orgUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "Drive" }) as any as Schema.Schema<Drive>;

export interface Change {
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#change"`. */
  kind?: string;
  /** Whether the file or shared drive has been removed from this list of changes, for example by deletion or loss of access. */
  removed?: boolean;
  /** The updated state of the file. Present if the type is file and the file has not been removed from this list of changes. */
  file?: File;
  /** The ID of the file which has changed. */
  fileId?: string;
  /** The time of this change (RFC 3339 date-time). */
  time?: string;
  /** The ID of the shared drive associated with this change. */
  driveId?: string;
  /** Deprecated: Use `changeType` instead. */
  type?: string;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** Deprecated: Use `drive` instead. */
  teamDrive?: TeamDrive;
  /** The type of the change. Possible values are `file` and `drive`. */
  changeType?: string;
  /** The updated state of the shared drive. Present if the changeType is drive, the user is still a member of the shared drive, and the shared drive has not been deleted. */
  drive?: Drive;
}

export const Change: Schema.Schema<Change> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  removed: Schema.optional(Schema.Boolean),
  file: Schema.optional(File),
  fileId: Schema.optional(Schema.String),
  time: Schema.optional(Schema.String),
  driveId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  teamDriveId: Schema.optional(Schema.String),
  teamDrive: Schema.optional(TeamDrive),
  changeType: Schema.optional(Schema.String),
  drive: Schema.optional(Drive),
})).annotate({ identifier: "Change" }) as any as Schema.Schema<Change>;

export interface ChangeList {
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#changeList"`. */
  kind?: string;
  /** The page token for the next page of changes. This will be absent if the end of the changes list has been reached. The page token doesn't expire. */
  nextPageToken?: string;
  /** The starting page token for future changes. This will be present only if the end of the current changes list has been reached. The page token doesn't expire. */
  newStartPageToken?: string;
  /** The list of changes. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  changes?: Array<Change>;
}

export const ChangeList: Schema.Schema<ChangeList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  newStartPageToken: Schema.optional(Schema.String),
  changes: Schema.optional(Schema.Array(Change)),
})).annotate({ identifier: "ChangeList" }) as any as Schema.Schema<ChangeList>;

export interface Channel {
  /** A Boolean value to indicate whether payload is wanted. Optional. */
  payload?: boolean;
  /** A UUID or similar unique string that identifies this channel. */
  id?: string;
  /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
  resourceId?: string;
  /** A version-specific identifier for the watched resource. */
  resourceUri?: string;
  /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
  token?: string;
  /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
  expiration?: string;
  /** The type of delivery mechanism used for this channel. Valid values are "web_hook" or "webhook". */
  type?: string;
  /** The address where notifications are delivered for this channel. */
  address?: string;
  /** Additional parameters controlling delivery channel behavior. Optional. */
  params?: Record<string, string>;
  /** Identifies this as a notification channel used to watch for changes to a resource, which is `api#channel`. */
  kind?: string;
}

export const Channel: Schema.Schema<Channel> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  resourceId: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  expiration: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  params: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface Reply {
  /** Output only. The ID of the reply. */
  id?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#reply"`. */
  kind?: string;
  /** The time at which the reply was created (RFC 3339 date-time). */
  createdTime?: string;
  /** The last time the reply was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** The action the reply performed to the parent comment. The supported values are: * `resolve` * `reopen` */
  action?: string;
  /** Output only. The author of the reply. The author's email address and permission ID won't be populated. */
  author?: User;
  /** Output only. Whether the reply has been deleted. A deleted reply has no content. */
  deleted?: boolean;
  /** Output only. The content of the reply with HTML formatting. */
  htmlContent?: string;
  /** The plain text content of the reply. This field is used for setting the content, while `htmlContent` should be displayed. This field is required by the `create` method if no `action` value is specified. */
  content?: string;
  /** Output only. A list of email addresses for users mentioned in this comment. If no users are mentioned, the list is empty. */
  mentionedEmailAddresses?: Array<string>;
  /** Output only. The email address of the user assigned to this comment. If no user is assigned, the field is unset. */
  assigneeEmailAddress?: string;
}

export const Reply: Schema.Schema<Reply> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  createdTime: Schema.optional(Schema.String),
  modifiedTime: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  author: Schema.optional(User),
  deleted: Schema.optional(Schema.Boolean),
  htmlContent: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  mentionedEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
  assigneeEmailAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "Reply" }) as any as Schema.Schema<Reply>;

export interface Comment {
  /** Output only. The ID of the comment. */
  id?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#comment"`. */
  kind?: string;
  /** The time at which the comment was created (RFC 3339 date-time). */
  createdTime?: string;
  /** The last time the comment or any of its replies was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** Output only. Whether the comment has been resolved by one of its replies. */
  resolved?: boolean;
  /** A region of the document represented as a JSON string. For details on defining anchor properties, refer to [Manage comments and replies](https://developers.google.com/workspace/drive/api/v3/manage-comments). */
  anchor?: string;
  /** Output only. The full list of replies to the comment in chronological order. */
  replies?: Array<Reply>;
  /** Output only. The author of the comment. The author's email address and permission ID will not be populated. */
  author?: User;
  /** Output only. Whether the comment has been deleted. A deleted comment has no content. */
  deleted?: boolean;
  /** Output only. The content of the comment with HTML formatting. */
  htmlContent?: string;
  /** The plain text content of the comment. This field is used for setting the content, while `htmlContent` should be displayed. */
  content?: string;
  /** The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment. */
  quotedFileContent?: { mimeType?: string; value?: string };
  /** Output only. A list of email addresses for users mentioned in this comment. If no users are mentioned, the list is empty. */
  mentionedEmailAddresses?: Array<string>;
  /** Output only. The email address of the user assigned to this comment. If no user is assigned, the field is unset. */
  assigneeEmailAddress?: string;
}

export const Comment: Schema.Schema<Comment> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  createdTime: Schema.optional(Schema.String),
  modifiedTime: Schema.optional(Schema.String),
  resolved: Schema.optional(Schema.Boolean),
  anchor: Schema.optional(Schema.String),
  replies: Schema.optional(Schema.Array(Reply)),
  author: Schema.optional(User),
  deleted: Schema.optional(Schema.Boolean),
  htmlContent: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  quotedFileContent: Schema.optional(Schema.Struct({ mimeType: Schema.optional(Schema.String), value: Schema.optional(Schema.String) })),
  mentionedEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
  assigneeEmailAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface CommentList {
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#commentList"`. */
  kind?: string;
  /** The list of comments. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  comments?: Array<Comment>;
  /** The page token for the next page of comments. This will be absent if the end of the comments list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
}

export const CommentList: Schema.Schema<CommentList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  comments: Schema.optional(Schema.Array(Comment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "CommentList" }) as any as Schema.Schema<CommentList>;

export interface DriveList {
  /** The page token for the next page of shared drives. This will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#driveList"`. */
  kind?: string;
  /** The list of shared drives. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  drives?: Array<Drive>;
}

export const DriveList: Schema.Schema<DriveList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  drives: Schema.optional(Schema.Array(Drive)),
})).annotate({ identifier: "DriveList" }) as any as Schema.Schema<DriveList>;

export interface GeneratedIds {
  /** The IDs generated for the requesting user in the specified space. */
  ids?: Array<string>;
  /** The type of file that can be created with these IDs. */
  space?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#generatedIds"`. */
  kind?: string;
}

export const GeneratedIds: Schema.Schema<GeneratedIds> = Schema.suspend(() => Schema.Struct({
  ids: Schema.optional(Schema.Array(Schema.String)),
  space: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "GeneratedIds" }) as any as Schema.Schema<GeneratedIds>;

export interface FileList {
  /** The page token for the next page of files. This will be absent if the end of the files list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#fileList"`. */
  kind?: string;
  /** Whether the search process was incomplete. If true, then some search results might be missing, since all documents were not searched. This can occur when searching multiple drives with the `allDrives` corpora, but all corpora couldn't be searched. When this happens, it's suggested that clients narrow their query by choosing a different corpus such as `user` or `drive`. */
  incompleteSearch?: boolean;
  /** The list of files. If `nextPageToken` is populated, then this list may be incomplete and an additional page of results should be fetched. */
  files?: Array<File>;
}

export const FileList: Schema.Schema<FileList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  incompleteSearch: Schema.optional(Schema.Boolean),
  files: Schema.optional(Schema.Array(File)),
})).annotate({ identifier: "FileList" }) as any as Schema.Schema<FileList>;

export interface LabelList {
  /** The list of labels. */
  labels?: Array<Label>;
  /** The page token for the next page of labels. This field will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** This is always `"drive#labelList"`. */
  kind?: string;
}

export const LabelList: Schema.Schema<LabelList> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Array(Label)),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LabelList" }) as any as Schema.Schema<LabelList>;

export interface LabelFieldModification {
  /** The ID of the field to be modified. */
  fieldId?: string;
  /** This is always `"drive#labelFieldModification"`. */
  kind?: string;
  /** Replaces the value of a dateString Field with these new values. The string must be in the RFC 3339 full-date format: YYYY-MM-DD. */
  setDateValues?: Array<string>;
  /** Sets the value of a `text` field. */
  setTextValues?: Array<string>;
  /** Replaces a `selection` field with these new values. */
  setSelectionValues?: Array<string>;
  /** Replaces the value of an `integer` field with these new values. */
  setIntegerValues?: Array<string>;
  /** Replaces a `user` field with these new values. The values must be a valid email addresses. */
  setUserValues?: Array<string>;
  /** Unsets the values for this field. */
  unsetValues?: boolean;
}

export const LabelFieldModification: Schema.Schema<LabelFieldModification> = Schema.suspend(() => Schema.Struct({
  fieldId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  setDateValues: Schema.optional(Schema.Array(Schema.String)),
  setTextValues: Schema.optional(Schema.Array(Schema.String)),
  setSelectionValues: Schema.optional(Schema.Array(Schema.String)),
  setIntegerValues: Schema.optional(Schema.Array(Schema.String)),
  setUserValues: Schema.optional(Schema.Array(Schema.String)),
  unsetValues: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LabelFieldModification" }) as any as Schema.Schema<LabelFieldModification>;

export interface LabelModification {
  /** The ID of the label to modify. */
  labelId?: string;
  /** The list of modifications to this label's fields. */
  fieldModifications?: Array<LabelFieldModification>;
  /** If true, the label will be removed from the file. */
  removeLabel?: boolean;
  /** This is always `"drive#labelModification"`. */
  kind?: string;
}

export const LabelModification: Schema.Schema<LabelModification> = Schema.suspend(() => Schema.Struct({
  labelId: Schema.optional(Schema.String),
  fieldModifications: Schema.optional(Schema.Array(LabelFieldModification)),
  removeLabel: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LabelModification" }) as any as Schema.Schema<LabelModification>;

export interface ModifyLabelsRequest {
  /** The list of modifications to apply to the labels on the file. */
  labelModifications?: Array<LabelModification>;
  /** This is always `"drive#modifyLabelsRequest"`. */
  kind?: string;
}

export const ModifyLabelsRequest: Schema.Schema<ModifyLabelsRequest> = Schema.suspend(() => Schema.Struct({
  labelModifications: Schema.optional(Schema.Array(LabelModification)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ModifyLabelsRequest" }) as any as Schema.Schema<ModifyLabelsRequest>;

export interface ModifyLabelsResponse {
  /** The list of labels which were added or updated by the request. */
  modifiedLabels?: Array<Label>;
  /** This is always `"drive#modifyLabelsResponse"`. */
  kind?: string;
}

export const ModifyLabelsResponse: Schema.Schema<ModifyLabelsResponse> = Schema.suspend(() => Schema.Struct({
  modifiedLabels: Schema.optional(Schema.Array(Label)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ModifyLabelsResponse" }) as any as Schema.Schema<ModifyLabelsResponse>;

export interface PermissionList {
  /** The page token for the next page of permissions. This field will be absent if the end of the permissions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#permissionList"`. */
  kind?: string;
  /** The list of permissions. If `nextPageToken` is populated, then this list may be incomplete and an additional page of results should be fetched. */
  permissions?: Array<Permission>;
}

export const PermissionList: Schema.Schema<PermissionList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(Permission)),
})).annotate({ identifier: "PermissionList" }) as any as Schema.Schema<PermissionList>;

export interface ReplyList {
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#replyList"`. */
  kind?: string;
  /** The list of replies. If `nextPageToken` is populated, then this list may be incomplete and an additional page of results should be fetched. */
  replies?: Array<Reply>;
  /** The page token for the next page of replies. This will be absent if the end of the replies list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
}

export const ReplyList: Schema.Schema<ReplyList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  replies: Schema.optional(Schema.Array(Reply)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ReplyList" }) as any as Schema.Schema<ReplyList>;

export interface Revision {
  /** Output only. The ID of the revision. */
  id?: string;
  /** Output only. The MIME type of the revision. */
  mimeType?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#revision"`. */
  kind?: string;
  /** Whether this revision is published. This is only applicable to Docs Editors files. */
  published?: boolean;
  /** Output only. Links for exporting Docs Editors files to specific formats. */
  exportLinks?: Record<string, string>;
  /** Whether to keep this revision forever, even if it is no longer the head revision. If not set, the revision will be automatically purged 30 days after newer content is uploaded. This can be set on a maximum of 200 revisions for a file. This field is only applicable to files with binary content in Drive. */
  keepForever?: boolean;
  /** Output only. The MD5 checksum of the revision's content. This is only applicable to files with binary content in Drive. */
  md5Checksum?: string;
  /** The last time the revision was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** Whether subsequent revisions will be automatically republished. This is only applicable to Docs Editors files. */
  publishAuto?: boolean;
  /** Whether this revision is published outside the domain. This is only applicable to Docs Editors files. */
  publishedOutsideDomain?: boolean;
  /** Output only. A link to the published revision. This is only populated for Docs Editors files. */
  publishedLink?: string;
  /** Output only. The size of the revision's content in bytes. This is only applicable to files with binary content in Drive. */
  size?: string;
  /** Output only. The original filename used to create this revision. This is only applicable to files with binary content in Drive. */
  originalFilename?: string;
  /** Output only. The last user to modify this revision. This field is only populated when the last modification was performed by a signed-in user. */
  lastModifyingUser?: User;
}

export const Revision: Schema.Schema<Revision> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  published: Schema.optional(Schema.Boolean),
  exportLinks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  keepForever: Schema.optional(Schema.Boolean),
  md5Checksum: Schema.optional(Schema.String),
  modifiedTime: Schema.optional(Schema.String),
  publishAuto: Schema.optional(Schema.Boolean),
  publishedOutsideDomain: Schema.optional(Schema.Boolean),
  publishedLink: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
  originalFilename: Schema.optional(Schema.String),
  lastModifyingUser: Schema.optional(User),
})).annotate({ identifier: "Revision" }) as any as Schema.Schema<Revision>;

export interface RevisionList {
  /** The page token for the next page of revisions. This will be absent if the end of the revisions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#revisionList"`. */
  kind?: string;
  /** The list of revisions. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  revisions?: Array<Revision>;
}

export const RevisionList: Schema.Schema<RevisionList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  revisions: Schema.optional(Schema.Array(Revision)),
})).annotate({ identifier: "RevisionList" }) as any as Schema.Schema<RevisionList>;

export interface TeamDriveList {
  /** The page token for the next page of Team Drives. This will be absent if the end of the Team Drives list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. The page token is typically valid for several hours. However, if new items are added or removed, your expected results might differ. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#teamDriveList"`. */
  kind?: string;
  /** The list of Team Drives. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  teamDrives?: Array<TeamDrive>;
}

export const TeamDriveList: Schema.Schema<TeamDriveList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  teamDrives: Schema.optional(Schema.Array(TeamDrive)),
})).annotate({ identifier: "TeamDriveList" }) as any as Schema.Schema<TeamDriveList>;

export interface ReviewerResponse {
  /** This is always drive#reviewerResponse. */
  kind?: string;
  /** The user that is responsible for this response. */
  reviewer?: User;
  /** A Reviewer’s Response for the Approval. */
  response?: "RESPONSE_UNSPECIFIED" | "NO_RESPONSE" | "APPROVED" | "DECLINED" | (string & {});
}

export const ReviewerResponse: Schema.Schema<ReviewerResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  reviewer: Schema.optional(User),
  response: Schema.optional(Schema.String),
})).annotate({ identifier: "ReviewerResponse" }) as any as Schema.Schema<ReviewerResponse>;

export interface Approval {
  /** This is always drive#approval. */
  kind?: string;
  /** The Approval ID. */
  approvalId?: string;
  /** Target file id of the approval. */
  targetFileId?: string;
  /** Output only. The time the approval was created. */
  createTime?: string;
  /** Output only. The most recent time the approval was modified. */
  modifyTime?: string;
  /** Output only. The time the approval was completed. */
  completeTime?: string;
  /** The time that the approval is due. */
  dueTime?: string;
  /** Output only. The status of the approval at the time this resource was requested. */
  status?: "STATUS_UNSPECIFIED" | "IN_PROGRESS" | "APPROVED" | "CANCELLED" | "DECLINED" | (string & {});
  /** The user that requested the Approval. */
  initiator?: User;
  /** The responses made on the Approval by reviewers. */
  reviewerResponses?: Array<ReviewerResponse>;
}

export const Approval: Schema.Schema<Approval> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  approvalId: Schema.optional(Schema.String),
  targetFileId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  modifyTime: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
  dueTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  initiator: Schema.optional(User),
  reviewerResponses: Schema.optional(Schema.Array(ReviewerResponse)),
})).annotate({ identifier: "Approval" }) as any as Schema.Schema<Approval>;

export interface ApprovalList {
  /** This is always drive#approvalList */
  kind?: string;
  /** The list of Approvals. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  items?: Array<Approval>;
  /** The page token for the next page of Approvals. This will be absent if the end of the Approvals list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
}

export const ApprovalList: Schema.Schema<ApprovalList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Approval)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ApprovalList" }) as any as Schema.Schema<ApprovalList>;

export interface AccessProposalRoleAndView {
  /** The role that was proposed by the requester. The supported values are: * `writer` * `commenter` * `reader` */
  role?: string;
  /** Indicates the view for this access proposal. Only populated for proposals that belong to a view. Only `published` is supported. */
  view?: string;
}

export const AccessProposalRoleAndView: Schema.Schema<AccessProposalRoleAndView> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  view: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessProposalRoleAndView" }) as any as Schema.Schema<AccessProposalRoleAndView>;

export interface AccessProposal {
  /** The file ID that the proposal for access is on. */
  fileId?: string;
  /** The ID of the access proposal. */
  proposalId?: string;
  /** The email address of the requesting user. */
  requesterEmailAddress?: string;
  /** The email address of the user that will receive permissions, if accepted. */
  recipientEmailAddress?: string;
  /** A wrapper for the role and view of an access proposal. For more information, see [Roles and permissions](https://developers.google.com/workspace/drive/api/guides/ref-roles). */
  rolesAndViews?: Array<AccessProposalRoleAndView>;
  /** The message that the requester added to the proposal. */
  requestMessage?: string;
  /** The creation time. */
  createTime?: string;
}

export const AccessProposal: Schema.Schema<AccessProposal> = Schema.suspend(() => Schema.Struct({
  fileId: Schema.optional(Schema.String),
  proposalId: Schema.optional(Schema.String),
  requesterEmailAddress: Schema.optional(Schema.String),
  recipientEmailAddress: Schema.optional(Schema.String),
  rolesAndViews: Schema.optional(Schema.Array(AccessProposalRoleAndView)),
  requestMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessProposal" }) as any as Schema.Schema<AccessProposal>;

export interface ResolveAccessProposalRequest {
  /** Optional. The roles that the approver has allowed, if any. For more information, see [Roles and permissions](https://developers.google.com/workspace/drive/api/guides/ref-roles). Note: This field is required for the `ACCEPT` action. */
  role?: Array<string>;
  /** Optional. Indicates the view for this access proposal. This should only be set when the proposal belongs to a view. Only `published` is supported. */
  view?: string;
  /** Required. The action to take on the access proposal. */
  action?: "ACTION_UNSPECIFIED" | "ACCEPT" | "DENY" | (string & {});
  /** Optional. Whether to send an email to the requester when the access proposal is denied or accepted. */
  sendNotification?: boolean;
}

export const ResolveAccessProposalRequest: Schema.Schema<ResolveAccessProposalRequest> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.Array(Schema.String)),
  view: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  sendNotification: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ResolveAccessProposalRequest" }) as any as Schema.Schema<ResolveAccessProposalRequest>;

export interface ListAccessProposalsResponse {
  /** The list of access proposals. This field is only populated in Drive API v3. */
  accessProposals?: Array<AccessProposal>;
  /** The continuation token for the next page of results. This will be absent if the end of the results list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
}

export const ListAccessProposalsResponse: Schema.Schema<ListAccessProposalsResponse> = Schema.suspend(() => Schema.Struct({
  accessProposals: Schema.optional(Schema.Array(AccessProposal)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAccessProposalsResponse" }) as any as Schema.Schema<ListAccessProposalsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "operations/{name}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Gets information about the user, the user's Drive, and system capabilities. For more information, see [Return user info](https://developers.google.com/workspace/drive/api/guides/user-info). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export interface GetAboutRequest {
}

export const GetAboutRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "about" }),
  svc,
) as unknown as Schema.Schema<GetAboutRequest>;

export type GetAboutResponse = About;
export const GetAboutResponse = About;

export type GetAboutError = CommonErrors;

export const getAbout: API.OperationMethod<GetAboutRequest, GetAboutResponse, GetAboutError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAboutRequest,
  output: GetAboutResponse,
  errors: [],
}));

/** Gets a specific app. For more information, see [Return user info](https://developers.google.com/workspace/drive/api/guides/user-info). */
export interface GetAppsRequest {
  /** The ID of the app. */
  appId: string;
}

export const GetAppsRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
}).pipe(
  T.Http({ method: "GET", path: "apps/{appId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsRequest>;

export type GetAppsResponse = App;
export const GetAppsResponse = App;

export type GetAppsError = CommonErrors;

export const getApps: API.OperationMethod<GetAppsRequest, GetAppsResponse, GetAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsRequest,
  output: GetAppsResponse,
  errors: [],
}));

/** Lists a user's installed apps. For more information, see [Return user info](https://developers.google.com/workspace/drive/api/guides/user-info). */
export interface ListAppsRequest {
  /** A comma-separated list of file extensions to limit returned results. All results within the given app query scope which can open any of the given file extensions are included in the response. If `appFilterMimeTypes` are provided as well, the result is a union of the two resulting app lists. */
  appFilterExtensions?: string;
  /** A comma-separated list of file extensions to limit returned results. All results within the given app query scope which can open any of the given MIME types will be included in the response. If `appFilterExtensions` are provided as well, the result is a union of the two resulting app lists. */
  appFilterMimeTypes?: string;
  /** A language or locale code, as defined by BCP 47, with some extensions from Unicode's LDML format (http://www.unicode.org/reports/tr35/). */
  languageCode?: string;
}

export const ListAppsRequest = Schema.Struct({
  appFilterExtensions: Schema.optional(Schema.String).pipe(T.HttpQuery("appFilterExtensions")),
  appFilterMimeTypes: Schema.optional(Schema.String).pipe(T.HttpQuery("appFilterMimeTypes")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "apps" }),
  svc,
) as unknown as Schema.Schema<ListAppsRequest>;

export type ListAppsResponse = AppList;
export const ListAppsResponse = AppList;

export type ListAppsError = CommonErrors;

export const listApps: API.OperationMethod<ListAppsRequest, ListAppsResponse, ListAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAppsRequest,
  output: ListAppsResponse,
  errors: [],
}));

/** Gets the starting pageToken for listing future changes. For more information, see [Retrieve changes](https://developers.google.com/workspace/drive/api/guides/manage-changes). */
export interface GetStartPageTokenChangesRequest {
  /** The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive will be returned. */
  driveId?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
}

export const GetStartPageTokenChangesRequest = Schema.Struct({
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  teamDriveId: Schema.optional(Schema.String).pipe(T.HttpQuery("teamDriveId")),
}).pipe(
  T.Http({ method: "GET", path: "changes/startPageToken" }),
  svc,
) as unknown as Schema.Schema<GetStartPageTokenChangesRequest>;

export type GetStartPageTokenChangesResponse = StartPageToken;
export const GetStartPageTokenChangesResponse = StartPageToken;

export type GetStartPageTokenChangesError = CommonErrors;

export const getStartPageTokenChanges: API.OperationMethod<GetStartPageTokenChangesRequest, GetStartPageTokenChangesResponse, GetStartPageTokenChangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStartPageTokenChangesRequest,
  output: GetStartPageTokenChangesResponse,
  errors: [],
}));

/** Lists the changes for a user or shared drive. For more information, see [Retrieve changes](https://developers.google.com/workspace/drive/api/guides/manage-changes). */
export interface ListChangesRequest {
  /** The shared drive from which changes will be returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
  driveId?: string;
  /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
  includeCorpusRemovals?: boolean;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
  includeRemoved?: boolean;
  /** Deprecated: Use `includeItemsFromAllDrives` instead. */
  includeTeamDriveItems?: boolean;
  /** The maximum number of changes to return per page. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method. */
  pageToken: string;
  /** Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive. */
  restrictToMyDrive?: boolean;
  /** A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'. */
  spaces?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
}

export const ListChangesRequest = Schema.Struct({
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  includeCorpusRemovals: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeCorpusRemovals")),
  includeItemsFromAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeItemsFromAllDrives")),
  includeRemoved: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeRemoved")),
  includeTeamDriveItems: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeTeamDriveItems")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.String.pipe(T.HttpQuery("pageToken")),
  restrictToMyDrive: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("restrictToMyDrive")),
  spaces: Schema.optional(Schema.String).pipe(T.HttpQuery("spaces")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  teamDriveId: Schema.optional(Schema.String).pipe(T.HttpQuery("teamDriveId")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
}).pipe(
  T.Http({ method: "GET", path: "changes" }),
  svc,
) as unknown as Schema.Schema<ListChangesRequest>;

export type ListChangesResponse = ChangeList;
export const ListChangesResponse = ChangeList;

export type ListChangesError = CommonErrors;

export const listChanges = API.makePaginated(() => ({
  input: ListChangesRequest,
  output: ListChangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Subscribes to changes for a user. For more information, see [Notifications for resource changes](https://developers.google.com/workspace/drive/api/guides/push). */
export interface WatchChangesRequest {
  /** The shared drive from which changes will be returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
  driveId?: string;
  /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
  includeCorpusRemovals?: boolean;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
  includeRemoved?: boolean;
  /** Deprecated: Use `includeItemsFromAllDrives` instead. */
  includeTeamDriveItems?: boolean;
  /** The maximum number of changes to return per page. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method. */
  pageToken: string;
  /** Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive. */
  restrictToMyDrive?: boolean;
  /** A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'. */
  spaces?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Request body */
  body?: Channel;
}

export const WatchChangesRequest = Schema.Struct({
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  includeCorpusRemovals: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeCorpusRemovals")),
  includeItemsFromAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeItemsFromAllDrives")),
  includeRemoved: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeRemoved")),
  includeTeamDriveItems: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeTeamDriveItems")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.String.pipe(T.HttpQuery("pageToken")),
  restrictToMyDrive: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("restrictToMyDrive")),
  spaces: Schema.optional(Schema.String).pipe(T.HttpQuery("spaces")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  teamDriveId: Schema.optional(Schema.String).pipe(T.HttpQuery("teamDriveId")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "changes/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchChangesRequest>;

export type WatchChangesResponse = Channel;
export const WatchChangesResponse = Channel;

export type WatchChangesError = CommonErrors;

export const watchChanges: API.OperationMethod<WatchChangesRequest, WatchChangesResponse, WatchChangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchChangesRequest,
  output: WatchChangesResponse,
  errors: [],
}));

/** Stops watching resources through this channel. For more information, see [Notifications for resource changes](https://developers.google.com/workspace/drive/api/guides/push). */
export interface StopChannelsRequest {
  /** Request body */
  body?: Channel;
}

export const StopChannelsRequest = Schema.Struct({
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "channels/stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopChannelsRequest>;

export interface StopChannelsResponse {}
export const StopChannelsResponse: Schema.Schema<StopChannelsResponse> = Schema.Struct({}) as any as Schema.Schema<StopChannelsResponse>;

export type StopChannelsError = CommonErrors;

export const stopChannels: API.OperationMethod<StopChannelsRequest, StopChannelsResponse, StopChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopChannelsRequest,
  output: StopChannelsResponse,
  errors: [],
}));

/** Creates a comment on a file. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export interface CreateCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** Request body */
  body?: Comment;
}

export const CreateCommentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  body: Schema.optional(Comment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/comments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCommentsRequest>;

export type CreateCommentsResponse = Comment;
export const CreateCommentsResponse = Comment;

export type CreateCommentsError = CommonErrors;

export const createComments: API.OperationMethod<CreateCommentsRequest, CreateCommentsResponse, CreateCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCommentsRequest,
  output: CreateCommentsResponse,
  errors: [],
}));

/** Deletes a comment. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export interface DeleteCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
}

export const DeleteCommentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}/comments/{commentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCommentsRequest>;

export interface DeleteCommentsResponse {}
export const DeleteCommentsResponse: Schema.Schema<DeleteCommentsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteCommentsResponse>;

export type DeleteCommentsError = CommonErrors;

export const deleteComments: API.OperationMethod<DeleteCommentsRequest, DeleteCommentsResponse, DeleteCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCommentsRequest,
  output: DeleteCommentsResponse,
  errors: [],
}));

/** Gets a comment by ID. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export interface GetCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** Whether to return deleted comments. Deleted comments will not include their original content. */
  includeDeleted?: boolean;
}

export const GetCommentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/comments/{commentId}" }),
  svc,
) as unknown as Schema.Schema<GetCommentsRequest>;

export type GetCommentsResponse = Comment;
export const GetCommentsResponse = Comment;

export type GetCommentsError = CommonErrors;

export const getComments: API.OperationMethod<GetCommentsRequest, GetCommentsResponse, GetCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCommentsRequest,
  output: GetCommentsResponse,
  errors: [],
}));

/** Lists a file's comments. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export interface ListCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** Whether to include deleted comments. Deleted comments will not include their original content. */
  includeDeleted?: boolean;
  /** The maximum number of comments to return per page. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
  /** The minimum value of 'modifiedTime' for the result comments (RFC 3339 date-time). */
  startModifiedTime?: string;
}

export const ListCommentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startModifiedTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startModifiedTime")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListCommentsRequest>;

export type ListCommentsResponse = CommentList;
export const ListCommentsResponse = CommentList;

export type ListCommentsError = CommonErrors;

export const listComments = API.makePaginated(() => ({
  input: ListCommentsRequest,
  output: ListCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a comment with patch semantics. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). */
export interface UpdateCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** Request body */
  body?: Comment;
}

export const UpdateCommentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  body: Schema.optional(Comment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}/comments/{commentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCommentsRequest>;

export type UpdateCommentsResponse = Comment;
export const UpdateCommentsResponse = Comment;

export type UpdateCommentsError = CommonErrors;

export const updateComments: API.OperationMethod<UpdateCommentsRequest, UpdateCommentsResponse, UpdateCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCommentsRequest,
  output: UpdateCommentsResponse,
  errors: [],
}));

/** Creates a shared drive. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export interface CreateDrivesRequest {
  /** Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned. */
  requestId: string;
  /** Request body */
  body?: Drive;
}

export const CreateDrivesRequest = Schema.Struct({
  requestId: Schema.String.pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Drive).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "drives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateDrivesRequest>;

export type CreateDrivesResponse = Drive;
export const CreateDrivesResponse = Drive;

export type CreateDrivesError = CommonErrors;

export const createDrives: API.OperationMethod<CreateDrivesRequest, CreateDrivesResponse, CreateDrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateDrivesRequest,
  output: CreateDrivesResponse,
  errors: [],
}));

/** Permanently deletes a shared drive for which the user is an `organizer`. The shared drive cannot contain any untrashed items. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export interface DeleteDrivesRequest {
  /** The ID of the shared drive. */
  driveId: string;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
  /** Whether any items inside the shared drive should also be deleted. This option is only supported when `useDomainAdminAccess` is also set to `true`. */
  allowItemDeletion?: boolean;
}

export const DeleteDrivesRequest = Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
  allowItemDeletion: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowItemDeletion")),
}).pipe(
  T.Http({ method: "DELETE", path: "drives/{driveId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDrivesRequest>;

export interface DeleteDrivesResponse {}
export const DeleteDrivesResponse: Schema.Schema<DeleteDrivesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteDrivesResponse>;

export type DeleteDrivesError = CommonErrors;

export const deleteDrives: API.OperationMethod<DeleteDrivesRequest, DeleteDrivesResponse, DeleteDrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDrivesRequest,
  output: DeleteDrivesResponse,
  errors: [],
}));

/** Gets a shared drive's metadata by ID. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export interface GetDrivesRequest {
  /** The ID of the shared drive. */
  driveId: string;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
}

export const GetDrivesRequest = Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
}).pipe(
  T.Http({ method: "GET", path: "drives/{driveId}" }),
  svc,
) as unknown as Schema.Schema<GetDrivesRequest>;

export type GetDrivesResponse = Drive;
export const GetDrivesResponse = Drive;

export type GetDrivesError = CommonErrors;

export const getDrives: API.OperationMethod<GetDrivesRequest, GetDrivesResponse, GetDrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDrivesRequest,
  output: GetDrivesResponse,
  errors: [],
}));

/** Hides a shared drive from the default view. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export interface HideDrivesRequest {
  /** The ID of the shared drive. */
  driveId: string;
}

export const HideDrivesRequest = Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
}).pipe(
  T.Http({ method: "POST", path: "drives/{driveId}/hide", hasBody: true }),
  svc,
) as unknown as Schema.Schema<HideDrivesRequest>;

export type HideDrivesResponse = Drive;
export const HideDrivesResponse = Drive;

export type HideDrivesError = CommonErrors;

export const hideDrives: API.OperationMethod<HideDrivesRequest, HideDrivesResponse, HideDrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: HideDrivesRequest,
  output: HideDrivesResponse,
  errors: [],
}));

/** Lists the user's shared drives. This method accepts the `q` parameter, which is a search query combining one or more search terms. For more information, see the [Search for shared drives](/workspace/drive/api/guides/search-shareddrives) guide. */
export interface ListDrivesRequest {
  /** Maximum number of shared drives to return per page. */
  pageSize?: number;
  /** Page token for shared drives. */
  pageToken?: string;
  /** Query string for searching shared drives. */
  q?: string;
  /** Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned. */
  useDomainAdminAccess?: boolean;
}

export const ListDrivesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
}).pipe(
  T.Http({ method: "GET", path: "drives" }),
  svc,
) as unknown as Schema.Schema<ListDrivesRequest>;

export type ListDrivesResponse = DriveList;
export const ListDrivesResponse = DriveList;

export type ListDrivesError = CommonErrors;

export const listDrives = API.makePaginated(() => ({
  input: ListDrivesRequest,
  output: ListDrivesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Restores a shared drive to the default view. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export interface UnhideDrivesRequest {
  /** The ID of the shared drive. */
  driveId: string;
}

export const UnhideDrivesRequest = Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
}).pipe(
  T.Http({ method: "POST", path: "drives/{driveId}/unhide", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnhideDrivesRequest>;

export type UnhideDrivesResponse = Drive;
export const UnhideDrivesResponse = Drive;

export type UnhideDrivesError = CommonErrors;

export const unhideDrives: API.OperationMethod<UnhideDrivesRequest, UnhideDrivesResponse, UnhideDrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnhideDrivesRequest,
  output: UnhideDrivesResponse,
  errors: [],
}));

/** Updates the metadata for a shared drive. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives). */
export interface UpdateDrivesRequest {
  /** The ID of the shared drive. */
  driveId: string;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
  /** Request body */
  body?: Drive;
}

export const UpdateDrivesRequest = Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
  body: Schema.optional(Drive).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "drives/{driveId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDrivesRequest>;

export type UpdateDrivesResponse = Drive;
export const UpdateDrivesResponse = Drive;

export type UpdateDrivesError = CommonErrors;

export const updateDrives: API.OperationMethod<UpdateDrivesRequest, UpdateDrivesResponse, UpdateDrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDrivesRequest,
  output: UpdateDrivesResponse,
  errors: [],
}));

/** Creates a copy of a file and applies any requested updates with patch semantics. For more information, see [Create and manage files](https://developers.google.com/workspace/drive/api/guides/create-file). */
export interface CopyFilesRequest {
  /** The ID of the file. */
  fileId: string;
  /** Deprecated: Copying files into multiple folders is no longer supported. Use shortcuts instead. */
  enforceSingleParent?: boolean;
  /** Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders. */
  ignoreDefaultVisibility?: boolean;
  /** Whether to set the `keepForever` field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions. */
  keepRevisionForever?: boolean;
  /** A language hint for OCR processing during image import (ISO 639-1 code). */
  ocrLanguage?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Request body */
  body?: File;
}

export const CopyFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  ignoreDefaultVisibility: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreDefaultVisibility")),
  keepRevisionForever: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("keepRevisionForever")),
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/copy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CopyFilesRequest>;

export type CopyFilesResponse = File;
export const CopyFilesResponse = File;

export type CopyFilesError = CommonErrors;

export const copyFiles: API.OperationMethod<CopyFilesRequest, CopyFilesResponse, CopyFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CopyFilesRequest,
  output: CopyFilesResponse,
  errors: [],
}));

/** Creates a file. For more information, see [Create and manage files](/workspace/drive/api/guides/create-file). This method supports an * /upload* URI and accepts uploaded media with the following characteristics: - *Maximum file size:* 5,120 GB - *Accepted Media MIME types:* `* /*` (Specify a valid MIME type, rather than the literal `* /*` value. The literal `* /*` is only used to indicate that any valid MIME type can be uploaded. For more information, see [Google Workspace and Google Drive supported MIME types](/workspace/drive/api/guides/mime-types).) For more information on uploading files, see [Upload file data](/workspace/drive/api/guides/manage-uploads). Apps creating shortcuts with the `create` method must specify the MIME type `application/vnd.google-apps.shortcut`. Apps should specify a file extension in the `name` property when inserting files with the API. For example, an operation to insert a JPEG file should specify something like `"name": "cat.jpg"` in the metadata. Subsequent `GET` requests include the read-only `fileExtension` property populated with the extension originally specified in the `name` property. When a Google Drive user requests to download a file, or when the file is downloaded through the sync client, Drive builds a full filename (with extension) based on the name. In cases where the extension is missing, Drive attempts to determine the extension based on the file's MIME type. */
export interface CreateFilesRequest {
  /** Deprecated: Creating files in multiple folders is no longer supported. */
  enforceSingleParent?: boolean;
  /** Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders. */
  ignoreDefaultVisibility?: boolean;
  /** Whether to set the `keepForever` field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions. */
  keepRevisionForever?: boolean;
  /** A language hint for OCR processing during image import (ISO 639-1 code). */
  ocrLanguage?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether to use the uploaded content as indexable text. */
  useContentAsIndexableText?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Request body */
  body?: File;
}

export const CreateFilesRequest = Schema.Struct({
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  ignoreDefaultVisibility: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreDefaultVisibility")),
  keepRevisionForever: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("keepRevisionForever")),
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  useContentAsIndexableText: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useContentAsIndexableText")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFilesRequest>;

export type CreateFilesResponse = File;
export const CreateFilesResponse = File;

export type CreateFilesError = CommonErrors;

export const createFiles: API.OperationMethod<CreateFilesRequest, CreateFilesResponse, CreateFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFilesRequest,
  output: CreateFilesResponse,
  errors: [],
}));

/** Permanently deletes a file owned by the user without moving it to the trash. For more information, see [Trash or delete files and folders](https://developers.google.com/workspace/drive/api/guides/delete). If the file belongs to a shared drive, the user must be an `organizer` on the parent folder. If the target is a folder, all descendants owned by the user are also deleted. */
export interface DeleteFilesRequest {
  /** The ID of the file. */
  fileId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated: If an item isn't in a shared drive and its last parent is deleted but the item itself isn't, the item will be placed under its owner's root. */
  enforceSingleParent?: boolean;
}

export const DeleteFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFilesRequest>;

export interface DeleteFilesResponse {}
export const DeleteFilesResponse: Schema.Schema<DeleteFilesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteFilesResponse>;

export type DeleteFilesError = CommonErrors;

export const deleteFiles: API.OperationMethod<DeleteFilesRequest, DeleteFilesResponse, DeleteFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFilesRequest,
  output: DeleteFilesResponse,
  errors: [],
}));

/** Permanently deletes all of the user's trashed files. For more information, see [Trash or delete files and folders](https://developers.google.com/workspace/drive/api/guides/delete). */
export interface EmptyTrashFilesRequest {
  /** Deprecated: If an item isn't in a shared drive and its last parent is deleted but the item itself isn't, the item will be placed under its owner's root. */
  enforceSingleParent?: boolean;
  /** If set, empties the trash of the provided shared drive. */
  driveId?: string;
}

export const EmptyTrashFilesRequest = Schema.Struct({
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/trash" }),
  svc,
) as unknown as Schema.Schema<EmptyTrashFilesRequest>;

export interface EmptyTrashFilesResponse {}
export const EmptyTrashFilesResponse: Schema.Schema<EmptyTrashFilesResponse> = Schema.Struct({}) as any as Schema.Schema<EmptyTrashFilesResponse>;

export type EmptyTrashFilesError = CommonErrors;

export const emptyTrashFiles: API.OperationMethod<EmptyTrashFilesRequest, EmptyTrashFilesResponse, EmptyTrashFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EmptyTrashFilesRequest,
  output: EmptyTrashFilesResponse,
  errors: [],
}));

/** Exports a Google Workspace document to the requested MIME type and returns exported byte content. For more information, see [Download and export files](https://developers.google.com/workspace/drive/api/guides/manage-downloads). Note that the exported content is limited to 10 MB. */
export interface ExportFilesRequest {
  /** The ID of the file. */
  fileId: string;
  /** Required. The MIME type of the format requested for this export. For a list of supported MIME types, see [Export MIME types for Google Workspace documents](/workspace/drive/api/guides/ref-export-formats). */
  mimeType: string;
}

export const ExportFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  mimeType: Schema.String.pipe(T.HttpQuery("mimeType")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/export" }),
  svc,
) as unknown as Schema.Schema<ExportFilesRequest>;

export interface ExportFilesResponse {}
export const ExportFilesResponse: Schema.Schema<ExportFilesResponse> = Schema.Struct({}) as any as Schema.Schema<ExportFilesResponse>;

export type ExportFilesError = CommonErrors;

export const exportFiles: API.OperationMethod<ExportFilesRequest, ExportFilesResponse, ExportFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportFilesRequest,
  output: ExportFilesResponse,
  errors: [],
}));

/** Generates a set of file IDs which can be provided in create or copy requests. For more information, see [Create and manage files](https://developers.google.com/workspace/drive/api/guides/create-file). */
export interface GenerateIdsFilesRequest {
  /** The number of IDs to return. */
  count?: number;
  /** The space in which the IDs can be used to create files. Supported values are `drive` and `appDataFolder`. (Default: `drive`.) For more information, see [File organization](https://developers.google.com/workspace/drive/api/guides/about-files#file-organization). */
  space?: string;
  /** The type of items which the IDs can be used for. Supported values are `files` and `shortcuts`. Note that `shortcuts` are only supported in the `drive` `space`. (Default: `files`.) For more information, see [File organization](https://developers.google.com/workspace/drive/api/guides/about-files#file-organization). */
  type?: string;
}

export const GenerateIdsFilesRequest = Schema.Struct({
  count: Schema.optional(Schema.Number).pipe(T.HttpQuery("count")),
  space: Schema.optional(Schema.String).pipe(T.HttpQuery("space")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "GET", path: "files/generateIds" }),
  svc,
) as unknown as Schema.Schema<GenerateIdsFilesRequest>;

export type GenerateIdsFilesResponse = GeneratedIds;
export const GenerateIdsFilesResponse = GeneratedIds;

export type GenerateIdsFilesError = CommonErrors;

export const generateIdsFiles: API.OperationMethod<GenerateIdsFilesRequest, GenerateIdsFilesResponse, GenerateIdsFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateIdsFilesRequest,
  output: GenerateIdsFilesResponse,
  errors: [],
}));

/** Gets a file's metadata or content by ID. For more information, see [Search for files and folders](/workspace/drive/api/guides/search-files). If you provide the URL parameter `alt=media`, then the response includes the file contents in the response body. Downloading content with `alt=media` only works if the file is stored in Drive. To download Google Docs, Sheets, and Slides use [`files.export`](/workspace/drive/api/reference/rest/v3/files/export) instead. For more information, see [Download and export files](/workspace/drive/api/guides/manage-downloads). */
export interface GetFilesRequest {
  /** The ID of the file. */
  fileId: string;
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when the `alt` parameter is set to `media` and the user is the owner of the file or an organizer of the shared drive in which the file resides. */
  acknowledgeAbuse?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
}

export const GetFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  acknowledgeAbuse: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acknowledgeAbuse")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}" }),
  svc,
) as unknown as Schema.Schema<GetFilesRequest>;

export type GetFilesResponse = File;
export const GetFilesResponse = File;

export type GetFilesError = CommonErrors;

export const getFiles: API.OperationMethod<GetFilesRequest, GetFilesResponse, GetFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFilesRequest,
  output: GetFilesResponse,
  errors: [],
}));

/** Lists the user's files. For more information, see [Search for files and folders](/workspace/drive/api/guides/search-files). This method accepts the `q` parameter, which is a search query combining one or more search terms. This method returns *all* files by default, including trashed files. If you don't want trashed files to appear in the list, use the `trashed=false` query parameter to remove trashed files from the results. */
export interface ListFilesRequest {
  /** Specifies a collection of items (files or documents) to which the query applies. Supported items include: * `user` * `domain` * `drive` * `allDrives` Prefer `user` or `drive` to `allDrives` for efficiency. By default, corpora is set to `user`. However, this can change depending on the filter set through the `q` parameter. For more information, see [File organization](https://developers.google.com/workspace/drive/api/guides/about-files#file-organization). */
  corpora?: string;
  /** Deprecated: The source of files to list. Use `corpora` instead. */
  corpus?: "domain" | "user" | (string & {});
  /** ID of the shared drive to search. */
  driveId?: string;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** Deprecated: Use `includeItemsFromAllDrives` instead. */
  includeTeamDriveItems?: boolean;
  /** A comma-separated list of sort keys. Valid keys are: * `createdTime`: When the file was created. Avoid using this key for queries on large item collections as it might result in timeouts or other issues. For time-related sorting on large item collections, use `modifiedTime` instead. * `folder`: The folder ID. This field is sorted using alphabetical ordering. * `modifiedByMeTime`: The last time the file was modified by the user. * `modifiedTime`: The last time the file was modified by anyone. * `name`: The name of the file. This field is sorted using alphabetical ordering, so 1, 12, 2, 22. * `name_natural`: The name of the file. This field is sorted using natural sort ordering, so 1, 2, 12, 22. * `quotaBytesUsed`: The number of storage quota bytes used by the file. * `recency`: The most recent timestamp from the file's date-time fields. * `sharedWithMeTime`: When the file was shared with the user, if applicable. * `starred`: Whether the user has starred the file. * `viewedByMeTime`: The last time the file was viewed by the user. Each key sorts ascending by default, but can be reversed with the `desc` modifier. Example usage: `?orderBy=folder,modifiedTime desc,name`. */
  orderBy?: string;
  /** The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
  /** A query for filtering the file results. For supported syntax, see [Search for files and folders](/workspace/drive/api/guides/search-files). */
  q?: string;
  /** A comma-separated list of spaces to query within the corpora. Supported values are `drive` and `appDataFolder`. For more information, see [File organization](https://developers.google.com/workspace/drive/api/guides/about-files#file-organization). */
  spaces?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
}

export const ListFilesRequest = Schema.Struct({
  corpora: Schema.optional(Schema.String).pipe(T.HttpQuery("corpora")),
  corpus: Schema.optional(Schema.String).pipe(T.HttpQuery("corpus")),
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  includeItemsFromAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeItemsFromAllDrives")),
  includeTeamDriveItems: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeTeamDriveItems")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  spaces: Schema.optional(Schema.String).pipe(T.HttpQuery("spaces")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  teamDriveId: Schema.optional(Schema.String).pipe(T.HttpQuery("teamDriveId")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
}).pipe(
  T.Http({ method: "GET", path: "files" }),
  svc,
) as unknown as Schema.Schema<ListFilesRequest>;

export type ListFilesResponse = FileList;
export const ListFilesResponse = FileList;

export type ListFilesError = CommonErrors;

export const listFiles = API.makePaginated(() => ({
  input: ListFilesRequest,
  output: ListFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the labels on a file. For more information, see [List labels on a file](https://developers.google.com/workspace/drive/api/guides/list-labels). */
export interface ListLabelsFilesRequest {
  /** The ID for the file. */
  fileId: string;
  /** The maximum number of labels to return per page. When not set, defaults to 100. */
  maxResults?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
}

export const ListLabelsFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/listLabels" }),
  svc,
) as unknown as Schema.Schema<ListLabelsFilesRequest>;

export type ListLabelsFilesResponse = LabelList;
export const ListLabelsFilesResponse = LabelList;

export type ListLabelsFilesError = CommonErrors;

export const listLabelsFiles = API.makePaginated(() => ({
  input: ListLabelsFilesRequest,
  output: ListLabelsFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Modifies the set of labels applied to a file. For more information, see [Set a label field on a file](https://developers.google.com/workspace/drive/api/guides/set-label). Returns a list of the labels that were added or modified. */
export interface ModifyLabelsFilesRequest {
  /** The ID of the file to which the labels belong. */
  fileId: string;
  /** Request body */
  body?: ModifyLabelsRequest;
}

export const ModifyLabelsFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  body: Schema.optional(ModifyLabelsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/modifyLabels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyLabelsFilesRequest>;

export type ModifyLabelsFilesResponse = ModifyLabelsResponse;
export const ModifyLabelsFilesResponse = ModifyLabelsResponse;

export type ModifyLabelsFilesError = CommonErrors;

export const modifyLabelsFiles: API.OperationMethod<ModifyLabelsFilesRequest, ModifyLabelsFilesResponse, ModifyLabelsFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyLabelsFilesRequest,
  output: ModifyLabelsFilesResponse,
  errors: [],
}));

/** Updates a file's metadata, content, or both. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might be changed automatically, such as `modifiedDate`. This method supports patch semantics. This method supports an * /upload* URI and accepts uploaded media with the following characteristics: - *Maximum file size:* 5,120 GB - *Accepted Media MIME types:* `* /*` (Specify a valid MIME type, rather than the literal `* /*` value. The literal `* /*` is only used to indicate that any valid MIME type can be uploaded. For more information, see [Google Workspace and Google Drive supported MIME types](/workspace/drive/api/guides/mime-types).) For more information on uploading files, see [Upload file data](/workspace/drive/api/guides/manage-uploads). */
export interface UpdateFilesRequest {
  /** The ID of the file. */
  fileId: string;
  /** A comma-separated list of parent IDs to add. */
  addParents?: string;
  /** Deprecated: Adding files to multiple folders is no longer supported. Use shortcuts instead. */
  enforceSingleParent?: boolean;
  /** Whether to set the `keepForever` field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions. */
  keepRevisionForever?: boolean;
  /** A language hint for OCR processing during image import (ISO 639-1 code). */
  ocrLanguage?: string;
  /** A comma-separated list of parent IDs to remove. */
  removeParents?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether to use the uploaded content as indexable text. */
  useContentAsIndexableText?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Request body */
  body?: File;
}

export const UpdateFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  addParents: Schema.optional(Schema.String).pipe(T.HttpQuery("addParents")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  keepRevisionForever: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("keepRevisionForever")),
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  removeParents: Schema.optional(Schema.String).pipe(T.HttpQuery("removeParents")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  useContentAsIndexableText: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useContentAsIndexableText")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateFilesRequest>;

export type UpdateFilesResponse = File;
export const UpdateFilesResponse = File;

export type UpdateFilesError = CommonErrors;

export const updateFiles: API.OperationMethod<UpdateFilesRequest, UpdateFilesResponse, UpdateFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateFilesRequest,
  output: UpdateFilesResponse,
  errors: [],
}));

/** Subscribes to changes to a file. For more information, see [Notifications for resource changes](https://developers.google.com/workspace/drive/api/guides/push). */
export interface WatchFilesRequest {
  /** The ID of the file. */
  fileId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when the `alt` parameter is set to `media` and the user is the owner of the file or an organizer of the shared drive in which the file resides. */
  acknowledgeAbuse?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Request body */
  body?: Channel;
}

export const WatchFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  acknowledgeAbuse: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acknowledgeAbuse")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchFilesRequest>;

export type WatchFilesResponse = Channel;
export const WatchFilesResponse = Channel;

export type WatchFilesError = CommonErrors;

export const watchFiles: API.OperationMethod<WatchFilesRequest, WatchFilesResponse, WatchFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchFilesRequest,
  output: WatchFilesResponse,
  errors: [],
}));

/** Downloads the content of a file. For more information, see [Download and export files](https://developers.google.com/workspace/drive/api/guides/manage-downloads). Operations are valid for 24 hours from the time of creation. */
export interface DownloadFilesRequest {
  /** Required. The ID of the file to download. */
  fileId: string;
  /** Optional. The MIME type the file should be downloaded as. This field can only be set when downloading Google Workspace documents. For a list of supported MIME types, see [Export MIME types for Google Workspace documents](/workspace/drive/api/guides/ref-export-formats). If not set, a Google Workspace document is downloaded with a default MIME type. The default MIME type might change in the future. */
  mimeType?: string;
  /** Optional. The revision ID of the file to download. This field can only be set when downloading blob files, Google Docs, and Google Sheets. Returns `INVALID_ARGUMENT` if downloading a specific revision on the file is unsupported. */
  revisionId?: string;
}

export const DownloadFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  mimeType: Schema.optional(Schema.String).pipe(T.HttpQuery("mimeType")),
  revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/download", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DownloadFilesRequest>;

export type DownloadFilesResponse = Operation;
export const DownloadFilesResponse = Operation;

export type DownloadFilesError = CommonErrors;

export const downloadFiles: API.OperationMethod<DownloadFilesRequest, DownloadFilesResponse, DownloadFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadFilesRequest,
  output: DownloadFilesResponse,
  errors: [],
}));

/** Creates a permission for a file or shared drive. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). **Warning:** Concurrent permissions operations on the same file aren't supported; only the last update is applied. */
export interface CreatePermissionsRequest {
  /** The ID of the file or shared drive. */
  fileId: string;
  /** A plain text custom message to include in the notification email. */
  emailMessage?: string;
  /** Deprecated: See `moveToNewOwnersRoot` for details. */
  enforceSingleParent?: boolean;
  /** This parameter only takes effect if the item isn't in a shared drive and the request is attempting to transfer the ownership of the item. If set to `true`, the item is moved to the new owner's My Drive root folder and all prior parents removed. If set to `false`, parents aren't changed. */
  moveToNewOwnersRoot?: boolean;
  /** Whether to send a notification email when sharing to users or groups. This defaults to `true` for users and groups, and is not allowed for other requests. It must not be disabled for ownership transfers. */
  sendNotificationEmail?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. For more information, see [Transfer file ownership](https://developers.google.com/workspace/drive/api/guides/transfer-file). */
  transferOwnership?: boolean;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
  /** Whether the request should enforce expansive access rules. */
  enforceExpansiveAccess?: boolean;
  /** Request body */
  body?: Permission;
}

export const CreatePermissionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  emailMessage: Schema.optional(Schema.String).pipe(T.HttpQuery("emailMessage")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  moveToNewOwnersRoot: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("moveToNewOwnersRoot")),
  sendNotificationEmail: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotificationEmail")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  transferOwnership: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("transferOwnership")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
  enforceExpansiveAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceExpansiveAccess")),
  body: Schema.optional(Permission).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/permissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePermissionsRequest>;

export type CreatePermissionsResponse = Permission;
export const CreatePermissionsResponse = Permission;

export type CreatePermissionsError = CommonErrors;

export const createPermissions: API.OperationMethod<CreatePermissionsRequest, CreatePermissionsResponse, CreatePermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePermissionsRequest,
  output: CreatePermissionsResponse,
  errors: [],
}));

/** Deletes a permission. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). **Warning:** Concurrent permissions operations on the same file aren't supported; only the last update is applied. */
export interface DeletePermissionsRequest {
  /** The ID of the file or shared drive. */
  fileId: string;
  /** The ID of the permission. */
  permissionId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
  /** Whether the request should enforce expansive access rules. */
  enforceExpansiveAccess?: boolean;
}

export const DeletePermissionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
  enforceExpansiveAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceExpansiveAccess")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}/permissions/{permissionId}" }),
  svc,
) as unknown as Schema.Schema<DeletePermissionsRequest>;

export interface DeletePermissionsResponse {}
export const DeletePermissionsResponse: Schema.Schema<DeletePermissionsResponse> = Schema.Struct({}) as any as Schema.Schema<DeletePermissionsResponse>;

export type DeletePermissionsError = CommonErrors;

export const deletePermissions: API.OperationMethod<DeletePermissionsRequest, DeletePermissionsResponse, DeletePermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePermissionsRequest,
  output: DeletePermissionsResponse,
  errors: [],
}));

/** Gets a permission by ID. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). */
export interface GetPermissionsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the permission. */
  permissionId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
}

export const GetPermissionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/permissions/{permissionId}" }),
  svc,
) as unknown as Schema.Schema<GetPermissionsRequest>;

export type GetPermissionsResponse = Permission;
export const GetPermissionsResponse = Permission;

export type GetPermissionsError = CommonErrors;

export const getPermissions: API.OperationMethod<GetPermissionsRequest, GetPermissionsResponse, GetPermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPermissionsRequest,
  output: GetPermissionsResponse,
  errors: [],
}));

/** Lists a file's or shared drive's permissions. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). */
export interface ListPermissionsRequest {
  /** The ID of the file or shared drive. */
  fileId: string;
  /** The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
}

export const ListPermissionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/permissions" }),
  svc,
) as unknown as Schema.Schema<ListPermissionsRequest>;

export type ListPermissionsResponse = PermissionList;
export const ListPermissionsResponse = PermissionList;

export type ListPermissionsError = CommonErrors;

export const listPermissions = API.makePaginated(() => ({
  input: ListPermissionsRequest,
  output: ListPermissionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a permission with patch semantics. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). **Warning:** Concurrent permissions operations on the same file aren't supported; only the last update is applied. */
export interface UpdatePermissionsRequest {
  /** The ID of the file or shared drive. */
  fileId: string;
  /** The ID of the permission. */
  permissionId: string;
  /** Whether to remove the expiration date. */
  removeExpiration?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. For more information, see [Transfer file ownership](https://developers.google.com//workspace/drive/api/guides/transfer-file). */
  transferOwnership?: boolean;
  /** Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators). */
  useDomainAdminAccess?: boolean;
  /** Whether the request should enforce expansive access rules. */
  enforceExpansiveAccess?: boolean;
  /** Request body */
  body?: Permission;
}

export const UpdatePermissionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
  removeExpiration: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("removeExpiration")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  transferOwnership: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("transferOwnership")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
  enforceExpansiveAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceExpansiveAccess")),
  body: Schema.optional(Permission).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}/permissions/{permissionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePermissionsRequest>;

export type UpdatePermissionsResponse = Permission;
export const UpdatePermissionsResponse = Permission;

export type UpdatePermissionsError = CommonErrors;

export const updatePermissions: API.OperationMethod<UpdatePermissionsRequest, UpdatePermissionsResponse, UpdatePermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePermissionsRequest,
  output: UpdatePermissionsResponse,
  errors: [],
}));

/** Creates a reply to a comment. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export interface CreateRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** Request body */
  body?: Reply;
}

export const CreateRepliesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  body: Schema.optional(Reply).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/comments/{commentId}/replies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateRepliesRequest>;

export type CreateRepliesResponse = Reply;
export const CreateRepliesResponse = Reply;

export type CreateRepliesError = CommonErrors;

export const createReplies: API.OperationMethod<CreateRepliesRequest, CreateRepliesResponse, CreateRepliesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateRepliesRequest,
  output: CreateRepliesResponse,
  errors: [],
}));

/** Deletes a reply. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export interface DeleteRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
}

export const DeleteRepliesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  replyId: Schema.String.pipe(T.HttpPath("replyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}/comments/{commentId}/replies/{replyId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRepliesRequest>;

export interface DeleteRepliesResponse {}
export const DeleteRepliesResponse: Schema.Schema<DeleteRepliesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteRepliesResponse>;

export type DeleteRepliesError = CommonErrors;

export const deleteReplies: API.OperationMethod<DeleteRepliesRequest, DeleteRepliesResponse, DeleteRepliesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRepliesRequest,
  output: DeleteRepliesResponse,
  errors: [],
}));

/** Gets a reply by ID. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export interface GetRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** Whether to return deleted replies. Deleted replies don't include their original content. */
  includeDeleted?: boolean;
}

export const GetRepliesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  replyId: Schema.String.pipe(T.HttpPath("replyId")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/comments/{commentId}/replies/{replyId}" }),
  svc,
) as unknown as Schema.Schema<GetRepliesRequest>;

export type GetRepliesResponse = Reply;
export const GetRepliesResponse = Reply;

export type GetRepliesError = CommonErrors;

export const getReplies: API.OperationMethod<GetRepliesRequest, GetRepliesResponse, GetRepliesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRepliesRequest,
  output: GetRepliesResponse,
  errors: [],
}));

/** Lists a comment's replies. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export interface ListRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** Whether to include deleted replies. Deleted replies don't include their original content. */
  includeDeleted?: boolean;
  /** The maximum number of replies to return per page. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
}

export const ListRepliesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/comments/{commentId}/replies" }),
  svc,
) as unknown as Schema.Schema<ListRepliesRequest>;

export type ListRepliesResponse = ReplyList;
export const ListRepliesResponse = ReplyList;

export type ListRepliesError = CommonErrors;

export const listReplies = API.makePaginated(() => ({
  input: ListRepliesRequest,
  output: ListRepliesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a reply with patch semantics. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). */
export interface UpdateRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** Request body */
  body?: Reply;
}

export const UpdateRepliesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  replyId: Schema.String.pipe(T.HttpPath("replyId")),
  body: Schema.optional(Reply).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}/comments/{commentId}/replies/{replyId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRepliesRequest>;

export type UpdateRepliesResponse = Reply;
export const UpdateRepliesResponse = Reply;

export type UpdateRepliesError = CommonErrors;

export const updateReplies: API.OperationMethod<UpdateRepliesRequest, UpdateRepliesResponse, UpdateRepliesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRepliesRequest,
  output: UpdateRepliesResponse,
  errors: [],
}));

/** Permanently deletes a file version. You can only delete revisions for files with binary content in Google Drive, like images or videos. Revisions for other files, like Google Docs or Sheets, and the last remaining file version can't be deleted. For more information, see [Manage file revisions](https://developers.google.com/drive/api/guides/manage-revisions). */
export interface DeleteRevisionsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the revision. */
  revisionId: string;
}

export const DeleteRevisionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  revisionId: Schema.String.pipe(T.HttpPath("revisionId")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}/revisions/{revisionId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRevisionsRequest>;

export interface DeleteRevisionsResponse {}
export const DeleteRevisionsResponse: Schema.Schema<DeleteRevisionsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteRevisionsResponse>;

export type DeleteRevisionsError = CommonErrors;

export const deleteRevisions: API.OperationMethod<DeleteRevisionsRequest, DeleteRevisionsResponse, DeleteRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRevisionsRequest,
  output: DeleteRevisionsResponse,
  errors: [],
}));

/** Gets a revision's metadata or content by ID. For more information, see [Manage file revisions](https://developers.google.com/workspace/drive/api/guides/manage-revisions). */
export interface GetRevisionsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the revision. */
  revisionId: string;
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when the `alt` parameter is set to `media` and the user is the owner of the file or an organizer of the shared drive in which the file resides. */
  acknowledgeAbuse?: boolean;
}

export const GetRevisionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  revisionId: Schema.String.pipe(T.HttpPath("revisionId")),
  acknowledgeAbuse: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acknowledgeAbuse")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/revisions/{revisionId}" }),
  svc,
) as unknown as Schema.Schema<GetRevisionsRequest>;

export type GetRevisionsResponse = Revision;
export const GetRevisionsResponse = Revision;

export type GetRevisionsError = CommonErrors;

export const getRevisions: API.OperationMethod<GetRevisionsRequest, GetRevisionsResponse, GetRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRevisionsRequest,
  output: GetRevisionsResponse,
  errors: [],
}));

/** Lists a file's revisions. For more information, see [Manage file revisions](https://developers.google.com/workspace/drive/api/guides/manage-revisions). **Important:** The list of revisions returned by this method might be incomplete for files with a large revision history, including frequently edited Google Docs, Sheets, and Slides. Older revisions might be omitted from the response, meaning the first revision returned may not be the oldest existing revision. The revision history visible in the Workspace editor user interface might be more complete than the list returned by the API. */
export interface ListRevisionsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The maximum number of revisions to return per page. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
}

export const ListRevisionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/revisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsRequest>;

export type ListRevisionsResponse = RevisionList;
export const ListRevisionsResponse = RevisionList;

export type ListRevisionsError = CommonErrors;

export const listRevisions = API.makePaginated(() => ({
  input: ListRevisionsRequest,
  output: ListRevisionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a revision with patch semantics. For more information, see [Manage file revisions](https://developers.google.com/workspace/drive/api/guides/manage-revisions). */
export interface UpdateRevisionsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the revision. */
  revisionId: string;
  /** Request body */
  body?: Revision;
}

export const UpdateRevisionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  revisionId: Schema.String.pipe(T.HttpPath("revisionId")),
  body: Schema.optional(Revision).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}/revisions/{revisionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRevisionsRequest>;

export type UpdateRevisionsResponse = Revision;
export const UpdateRevisionsResponse = Revision;

export type UpdateRevisionsError = CommonErrors;

export const updateRevisions: API.OperationMethod<UpdateRevisionsRequest, UpdateRevisionsResponse, UpdateRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRevisionsRequest,
  output: UpdateRevisionsResponse,
  errors: [],
}));

/** Deprecated: Use `drives.create` instead. */
export interface CreateTeamdrivesRequest {
  /** Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned. */
  requestId: string;
  /** Request body */
  body?: TeamDrive;
}

export const CreateTeamdrivesRequest = Schema.Struct({
  requestId: Schema.String.pipe(T.HttpQuery("requestId")),
  body: Schema.optional(TeamDrive).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "teamdrives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateTeamdrivesRequest>;

export type CreateTeamdrivesResponse = TeamDrive;
export const CreateTeamdrivesResponse = TeamDrive;

export type CreateTeamdrivesError = CommonErrors;

export const createTeamdrives: API.OperationMethod<CreateTeamdrivesRequest, CreateTeamdrivesResponse, CreateTeamdrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateTeamdrivesRequest,
  output: CreateTeamdrivesResponse,
  errors: [],
}));

/** Deprecated: Use `drives.delete` instead. */
export interface DeleteTeamdrivesRequest {
  /** The ID of the Team Drive */
  teamDriveId: string;
}

export const DeleteTeamdrivesRequest = Schema.Struct({
  teamDriveId: Schema.String.pipe(T.HttpPath("teamDriveId")),
}).pipe(
  T.Http({ method: "DELETE", path: "teamdrives/{teamDriveId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTeamdrivesRequest>;

export interface DeleteTeamdrivesResponse {}
export const DeleteTeamdrivesResponse: Schema.Schema<DeleteTeamdrivesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteTeamdrivesResponse>;

export type DeleteTeamdrivesError = CommonErrors;

export const deleteTeamdrives: API.OperationMethod<DeleteTeamdrivesRequest, DeleteTeamdrivesResponse, DeleteTeamdrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTeamdrivesRequest,
  output: DeleteTeamdrivesResponse,
  errors: [],
}));

/** Deprecated: Use `drives.get` instead. */
export interface GetTeamdrivesRequest {
  /** The ID of the Team Drive */
  teamDriveId: string;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs. */
  useDomainAdminAccess?: boolean;
}

export const GetTeamdrivesRequest = Schema.Struct({
  teamDriveId: Schema.String.pipe(T.HttpPath("teamDriveId")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
}).pipe(
  T.Http({ method: "GET", path: "teamdrives/{teamDriveId}" }),
  svc,
) as unknown as Schema.Schema<GetTeamdrivesRequest>;

export type GetTeamdrivesResponse = TeamDrive;
export const GetTeamdrivesResponse = TeamDrive;

export type GetTeamdrivesError = CommonErrors;

export const getTeamdrives: API.OperationMethod<GetTeamdrivesRequest, GetTeamdrivesResponse, GetTeamdrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTeamdrivesRequest,
  output: GetTeamdrivesResponse,
  errors: [],
}));

/** Deprecated: Use `drives.list` instead. */
export interface ListTeamdrivesRequest {
  /** Maximum number of Team Drives to return. */
  pageSize?: number;
  /** Page token for Team Drives. */
  pageToken?: string;
  /** Query string for searching Team Drives. */
  q?: string;
  /** Issue the request as a domain administrator; if set to true, then all Team Drives of the domain in which the requester is an administrator are returned. */
  useDomainAdminAccess?: boolean;
}

export const ListTeamdrivesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
}).pipe(
  T.Http({ method: "GET", path: "teamdrives" }),
  svc,
) as unknown as Schema.Schema<ListTeamdrivesRequest>;

export type ListTeamdrivesResponse = TeamDriveList;
export const ListTeamdrivesResponse = TeamDriveList;

export type ListTeamdrivesError = CommonErrors;

export const listTeamdrives = API.makePaginated(() => ({
  input: ListTeamdrivesRequest,
  output: ListTeamdrivesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deprecated: Use `drives.update` instead. */
export interface UpdateTeamdrivesRequest {
  /** The ID of the Team Drive */
  teamDriveId: string;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs. */
  useDomainAdminAccess?: boolean;
  /** Request body */
  body?: TeamDrive;
}

export const UpdateTeamdrivesRequest = Schema.Struct({
  teamDriveId: Schema.String.pipe(T.HttpPath("teamDriveId")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
  body: Schema.optional(TeamDrive).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "teamdrives/{teamDriveId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateTeamdrivesRequest>;

export type UpdateTeamdrivesResponse = TeamDrive;
export const UpdateTeamdrivesResponse = TeamDrive;

export type UpdateTeamdrivesError = CommonErrors;

export const updateTeamdrives: API.OperationMethod<UpdateTeamdrivesRequest, UpdateTeamdrivesResponse, UpdateTeamdrivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateTeamdrivesRequest,
  output: UpdateTeamdrivesResponse,
  errors: [],
}));

/** Gets an Approval by ID. */
export interface GetApprovalsRequest {
  /** Required. The ID of the file the Approval is on. */
  fileId: string;
  /** Required. The ID of the Approval. */
  approvalId: string;
}

export const GetApprovalsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  approvalId: Schema.String.pipe(T.HttpPath("approvalId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/approvals/{approvalId}" }),
  svc,
) as unknown as Schema.Schema<GetApprovalsRequest>;

export type GetApprovalsResponse = Approval;
export const GetApprovalsResponse = Approval;

export type GetApprovalsError = CommonErrors;

export const getApprovals: API.OperationMethod<GetApprovalsRequest, GetApprovalsResponse, GetApprovalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetApprovalsRequest,
  output: GetApprovalsResponse,
  errors: [],
}));

/** Lists the Approvals on a file. */
export interface ListApprovalsRequest {
  /** Required. The ID of the file the Approval is on. */
  fileId: string;
  /** The maximum number of Approvals to return. When not set, at most 100 Approvals will be returned. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of nextPageToken from a previous response. */
  pageToken?: string;
}

export const ListApprovalsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/approvals" }),
  svc,
) as unknown as Schema.Schema<ListApprovalsRequest>;

export type ListApprovalsResponse = ApprovalList;
export const ListApprovalsResponse = ApprovalList;

export type ListApprovalsError = CommonErrors;

export const listApprovals = API.makePaginated(() => ({
  input: ListApprovalsRequest,
  output: ListApprovalsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Retrieves an access proposal by ID. For more information, see [Manage pending access proposals](https://developers.google.com/workspace/drive/api/guides/pending-access). */
export interface GetAccessproposalsRequest {
  /** Required. The ID of the item the request is on. */
  fileId: string;
  /** Required. The ID of the access proposal to resolve. */
  proposalId: string;
}

export const GetAccessproposalsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/accessproposals/{proposalId}" }),
  svc,
) as unknown as Schema.Schema<GetAccessproposalsRequest>;

export type GetAccessproposalsResponse = AccessProposal;
export const GetAccessproposalsResponse = AccessProposal;

export type GetAccessproposalsError = CommonErrors;

export const getAccessproposals: API.OperationMethod<GetAccessproposalsRequest, GetAccessproposalsResponse, GetAccessproposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccessproposalsRequest,
  output: GetAccessproposalsResponse,
  errors: [],
}));

/** Approves or denies an access proposal. For more information, see [Manage pending access proposals](https://developers.google.com/workspace/drive/api/guides/pending-access). */
export interface ResolveAccessproposalsRequest {
  /** Required. The ID of the item the request is on. */
  fileId: string;
  /** Required. The ID of the access proposal to resolve. */
  proposalId: string;
  /** Request body */
  body?: ResolveAccessProposalRequest;
}

export const ResolveAccessproposalsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(ResolveAccessProposalRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/accessproposals/{proposalId}:resolve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResolveAccessproposalsRequest>;

export interface ResolveAccessproposalsResponse {}
export const ResolveAccessproposalsResponse: Schema.Schema<ResolveAccessproposalsResponse> = Schema.Struct({}) as any as Schema.Schema<ResolveAccessproposalsResponse>;

export type ResolveAccessproposalsError = CommonErrors;

export const resolveAccessproposals: API.OperationMethod<ResolveAccessproposalsRequest, ResolveAccessproposalsResponse, ResolveAccessproposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResolveAccessproposalsRequest,
  output: ResolveAccessproposalsResponse,
  errors: [],
}));

/** List the access proposals on a file. For more information, see [Manage pending access proposals](https://developers.google.com/workspace/drive/api/guides/pending-access). Note: Only approvers are able to list access proposals on a file. If the user isn't an approver, a 403 error is returned. */
export interface ListAccessproposalsRequest {
  /** Required. The ID of the item the request is on. */
  fileId: string;
  /** Optional. The continuation token on the list of access requests. */
  pageToken?: string;
  /** Optional. The number of results per page. */
  pageSize?: number;
}

export const ListAccessproposalsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/accessproposals" }),
  svc,
) as unknown as Schema.Schema<ListAccessproposalsRequest>;

export type ListAccessproposalsResponse = ListAccessProposalsResponse;
export const ListAccessproposalsResponse = ListAccessProposalsResponse;

export type ListAccessproposalsError = CommonErrors;

export const listAccessproposals = API.makePaginated(() => ({
  input: ListAccessproposalsRequest,
  output: ListAccessproposalsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

