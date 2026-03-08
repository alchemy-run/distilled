// ==========================================================================
// Google Drive API (drive v2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "drive",
  version: "v2",
  rootUrl: "https://www.googleapis.com/",
  servicePath: "drive/v2/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface User {
  /** Output only. A plain text displayable name for this user. */
  displayName?: string;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`. */
  kind?: string;
  /** Output only. Whether this user is the same as the authenticated user for whom the request was made. */
  isAuthenticatedUser?: boolean;
  /** Output only. The user's ID as visible in Permission resources. */
  permissionId?: string;
  /** Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester. */
  emailAddress?: string;
  /** Output only. The user's profile picture. */
  picture?: { url?: string };
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  isAuthenticatedUser: Schema.optional(Schema.Boolean),
  permissionId: Schema.optional(Schema.String),
  emailAddress: Schema.optional(Schema.String),
  picture: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String) })),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface About {
  /** The name of the current user. */
  name?: string;
  /** The total number of quota bytes. This is only relevant when quotaType is LIMITED. */
  quotaBytesTotal?: string;
  /** The number of quota bytes used by Google Drive. */
  quotaBytesUsed?: string;
  /** The number of quota bytes used by trashed items. */
  quotaBytesUsedInTrash?: string;
  /** The largest change id. */
  largestChangeId?: string;
  /** The number of remaining change ids, limited to no more than 2500. */
  remainingChangeIds?: string;
  /** The id of the root folder. */
  rootFolderId?: string;
  /** The allowable import formats. */
  importFormats?: Array<{ source?: string; targets?: Array<string> }>;
  /** The allowable export formats. */
  exportFormats?: Array<{ source?: string; targets?: Array<string> }>;
  /** Information about supported additional roles per file type. The most specific type takes precedence. */
  additionalRoleInfo?: Array<{ type?: string; roleSets?: Array<{ primaryRole?: string; additionalRoles?: Array<string> }> }>;
  /** List of additional features enabled on this account. */
  features?: Array<{ featureName?: string; featureRate?: number }>;
  /** List of max upload sizes for each file type. The most specific type takes precedence. */
  maxUploadSizes?: Array<{ type?: string; size?: string }>;
  /** The domain sharing policy for the current user. Possible values are: * `allowed` * `allowedWithWarning` * `incomingOnly` * `disallowed` */
  domainSharingPolicy?: string;
  /** This is always `drive#about`. */
  kind?: string;
  /** The current user's ID as visible in the permissions collection. */
  permissionId?: string;
  /** A boolean indicating whether the authenticated app is installed by the authenticated user. */
  isCurrentAppInstalled?: boolean;
  /** The number of quota bytes used by all Google apps (Drive, Picasa, etc.). */
  quotaBytesUsedAggregate?: string;
  /** The authenticated user. */
  user?: User;
  /** The ETag of the item. */
  etag?: string;
  /** The user's language or locale code, as defined by BCP 47, with some extensions from Unicode's LDML format (http://www.unicode.org/reports/tr35/). */
  languageCode?: string;
  /** A link back to this item. */
  selfLink?: string;
  /** The type of the user's storage quota. Possible values are: * `LIMITED` * `UNLIMITED` */
  quotaType?: string;
  /** The palette of allowable folder colors as RGB hex strings. */
  folderColorPalette?: Array<string>;
  /** A list of themes that are supported for shared drives. */
  driveThemes?: Array<{ id?: string; backgroundImageLink?: string; colorRgb?: string }>;
  /** Whether the user can create shared drives. */
  canCreateDrives?: boolean;
  /** The amount of storage quota used by different Google services. */
  quotaBytesByService?: Array<{ serviceName?: string; bytesUsed?: string }>;
  /** Deprecated: Use `driveThemes` instead. */
  teamDriveThemes?: Array<{ id?: string; backgroundImageLink?: string; colorRgb?: string }>;
  /** Deprecated: Use `canCreateDrives` instead. */
  canCreateTeamDrives?: boolean;
}

export const About: Schema.Schema<About> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  quotaBytesTotal: Schema.optional(Schema.String),
  quotaBytesUsed: Schema.optional(Schema.String),
  quotaBytesUsedInTrash: Schema.optional(Schema.String),
  largestChangeId: Schema.optional(Schema.String),
  remainingChangeIds: Schema.optional(Schema.String),
  rootFolderId: Schema.optional(Schema.String),
  importFormats: Schema.optional(Schema.Array(Schema.Struct({ source: Schema.optional(Schema.String), targets: Schema.optional(Schema.Array(Schema.String)) }))),
  exportFormats: Schema.optional(Schema.Array(Schema.Struct({ source: Schema.optional(Schema.String), targets: Schema.optional(Schema.Array(Schema.String)) }))),
  additionalRoleInfo: Schema.optional(Schema.Array(Schema.Struct({ type: Schema.optional(Schema.String), roleSets: Schema.optional(Schema.Array(Schema.Struct({ primaryRole: Schema.optional(Schema.String), additionalRoles: Schema.optional(Schema.Array(Schema.String)) }))) }))),
  features: Schema.optional(Schema.Array(Schema.Struct({ featureName: Schema.optional(Schema.String), featureRate: Schema.optional(Schema.Number) }))),
  maxUploadSizes: Schema.optional(Schema.Array(Schema.Struct({ type: Schema.optional(Schema.String), size: Schema.optional(Schema.String) }))),
  domainSharingPolicy: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  permissionId: Schema.optional(Schema.String),
  isCurrentAppInstalled: Schema.optional(Schema.Boolean),
  quotaBytesUsedAggregate: Schema.optional(Schema.String),
  user: Schema.optional(User),
  etag: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  quotaType: Schema.optional(Schema.String),
  folderColorPalette: Schema.optional(Schema.Array(Schema.String)),
  driveThemes: Schema.optional(Schema.Array(Schema.Struct({ id: Schema.optional(Schema.String), backgroundImageLink: Schema.optional(Schema.String), colorRgb: Schema.optional(Schema.String) }))),
  canCreateDrives: Schema.optional(Schema.Boolean),
  quotaBytesByService: Schema.optional(Schema.Array(Schema.Struct({ serviceName: Schema.optional(Schema.String), bytesUsed: Schema.optional(Schema.String) }))),
  teamDriveThemes: Schema.optional(Schema.Array(Schema.Struct({ id: Schema.optional(Schema.String), backgroundImageLink: Schema.optional(Schema.String), colorRgb: Schema.optional(Schema.String) }))),
  canCreateTeamDrives: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "About" }) as any as Schema.Schema<About>;

export interface App {
  /** The name of the app. */
  name?: string;
  /** The type of object this app creates (e.g. Chart). If empty, the app name should be used instead. */
  objectType?: string;
  /** Whether this app supports creating new objects. */
  supportsCreate?: boolean;
  /** A link to the product listing for this app. */
  productUrl?: string;
  /** The list of primary mime types. */
  primaryMimeTypes?: Array<string>;
  /** The list of secondary mime types. */
  secondaryMimeTypes?: Array<string>;
  /** The list of primary file extensions. */
  primaryFileExtensions?: Array<string>;
  /** The list of secondary file extensions. */
  secondaryFileExtensions?: Array<string>;
  /** The ID of the app. */
  id?: string;
  /** Whether this app supports importing from Docs Editors. */
  supportsImport?: boolean;
  /** Whether the app is installed. */
  installed?: boolean;
  /** Whether the app is authorized to access data on the user's Drive. */
  authorized?: boolean;
  /** The various icons for the app. */
  icons?: Array<{ size?: number; category?: string; iconUrl?: string }>;
  /** Whether the app is selected as the default handler for the types it supports. */
  useByDefault?: boolean;
  /** This is always `drive#app`. */
  kind?: string;
  /** A short description of the app. */
  shortDescription?: string;
  /** A long description of the app. */
  longDescription?: string;
  /** Whether this app supports opening more than one file. */
  supportsMultiOpen?: boolean;
  /** The ID of the product listing for this app. */
  productId?: string;
  /** The template url for opening files with this app. The template will contain `{ids}` and/or `{exportIds}` to be replaced by the actual file ids. See Open Files for the full documentation. */
  openUrlTemplate?: string;
  /** The url to create a new file with this app. */
  createUrl?: string;
  /** The template url to create a new file with this app in a given folder. The template will contain {folderId} to be replaced by the folder to create the new file in. */
  createInFolderTemplate?: string;
  /** Whether this app supports creating new files when offline. */
  supportsOfflineCreate?: boolean;
  /** Whether the app has drive-wide scope. An app with drive-wide scope can access all files in the user's drive. */
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
  icons: Schema.optional(Schema.Array(Schema.Struct({ size: Schema.optional(Schema.Number), category: Schema.optional(Schema.String), iconUrl: Schema.optional(Schema.String) }))),
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
  /** The ETag of the list. */
  etag?: string;
  /** List of app IDs that the user has specified to use by default. The list is in reverse-priority order (lowest to highest). */
  defaultAppIds?: Array<string>;
  /** This is always `drive#appList`. */
  kind?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** The list of apps. */
  items?: Array<App>;
}

export const AppList: Schema.Schema<AppList> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  defaultAppIds: Schema.optional(Schema.Array(Schema.String)),
  kind: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(App)),
})).annotate({ identifier: "AppList" }) as any as Schema.Schema<AppList>;

export interface Permission {
  /** The ID of the user this permission refers to, and identical to the `permissionId` in the About and Files resources. When making a `drive.permissions.insert` request, exactly one of the `id` or `value` fields must be specified unless the permission type is `anyone`, in which case both `id` and `value` are ignored. */
  id?: string;
  /** Output only. The name for this permission. */
  name?: string;
  /** The account type. Allowed values are: * `user` * `group` * `domain` * `anyone` */
  type?: string;
  /** The primary role for this user. While new values may be supported in the future, the following are currently allowed: * `owner` * `organizer` * `fileOrganizer` * `writer` * `reader` */
  role?: string;
  /** Additional roles for this user. Only `commenter` is currently allowed, though more may be supported in the future. */
  additionalRoles?: Array<string>;
  /** Output only. Deprecated. */
  authKey?: string;
  /** The email address or domain name for the entity. This is used during inserts and is not populated in responses. When making a `drive.permissions.insert` request, exactly one of the `id` or `value` fields must be specified unless the permission type is `anyone`, in which case both `id` and `value` are ignored. */
  value?: string;
  /** Output only. This is always `drive#permission`. */
  kind?: string;
  /** Whether the link is required for this permission. */
  withLink?: boolean;
  /** Output only. A link to the profile photo, if available. */
  photoLink?: string;
  /** Output only. A link back to this permission. */
  selfLink?: string;
  /** Output only. The email address of the user or group this permission refers to. This is an output-only field which is present when the permission type is `user` or `group`. */
  emailAddress?: string;
  /** Output only. The domain name of the entity this permission refers to. This is an output-only field which is present when the permission type is `user`, `group` or `domain`. */
  domain?: string;
  /** Output only. The ETag of the permission. */
  etag?: string;
  /** Output only. Details of whether the permissions on this item are inherited or directly on this item. */
  permissionDetails?: Array<{ permissionType?: string; role?: string; additionalRoles?: Array<string>; inheritedFrom?: string; inherited?: boolean }>;
  /** The time at which this permission will expire (RFC 3339 date-time). Expiration dates have the following restrictions: - They can only be set on user and group permissions - The date must be in the future - The date cannot be more than a year in the future - The date can only be set on drive.permissions.update or drive.permissions.patch requests */
  expirationDate?: string;
  /** Output only. Deprecated: Use `permissionDetails` instead. */
  teamDrivePermissionDetails?: Array<{ teamDrivePermissionType?: string; role?: string; additionalRoles?: Array<string>; inheritedFrom?: string; inherited?: boolean }>;
  /** Output only. Whether the account associated with this permission has been deleted. This field only pertains to user and group permissions. */
  deleted?: boolean;
  /** Indicates the view for this permission. Only populated for permissions that belong to a view. published and metadata are the only supported values. - published: The permission's role is published_reader. - metadata: The item is only visible to the metadata view because the item has limited access and the scope has at least read access to the parent. Note: The metadata view is currently only supported on folders. */
  view?: string;
  /** Whether the account associated with this permission is a pending owner. Only populated for `user` type permissions for files that are not in a shared drive. */
  pendingOwner?: boolean;
  /** When true, only organizers, owners, and users with permissions added directly on the item can access it. */
  inheritedPermissionsDisabled?: boolean;
}

export const Permission: Schema.Schema<Permission> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  additionalRoles: Schema.optional(Schema.Array(Schema.String)),
  authKey: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  withLink: Schema.optional(Schema.Boolean),
  photoLink: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  emailAddress: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  permissionDetails: Schema.optional(Schema.Array(Schema.Struct({ permissionType: Schema.optional(Schema.String), role: Schema.optional(Schema.String), additionalRoles: Schema.optional(Schema.Array(Schema.String)), inheritedFrom: Schema.optional(Schema.String), inherited: Schema.optional(Schema.Boolean) }))),
  expirationDate: Schema.optional(Schema.String),
  teamDrivePermissionDetails: Schema.optional(Schema.Array(Schema.Struct({ teamDrivePermissionType: Schema.optional(Schema.String), role: Schema.optional(Schema.String), additionalRoles: Schema.optional(Schema.Array(Schema.String)), inheritedFrom: Schema.optional(Schema.String), inherited: Schema.optional(Schema.Boolean) }))),
  deleted: Schema.optional(Schema.Boolean),
  view: Schema.optional(Schema.String),
  pendingOwner: Schema.optional(Schema.Boolean),
  inheritedPermissionsDisabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Permission" }) as any as Schema.Schema<Permission>;

export interface ParentReference {
  /** Output only. A link back to this reference. */
  selfLink?: string;
  /** The ID of the parent. */
  id?: string;
  /** Output only. Whether or not the parent is the root folder. */
  isRoot?: boolean;
  /** Output only. This is always `drive#parentReference`. */
  kind?: string;
  /** Output only. A link to the parent. */
  parentLink?: string;
}

export const ParentReference: Schema.Schema<ParentReference> = Schema.suspend(() => Schema.Struct({
  selfLink: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  isRoot: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  parentLink: Schema.optional(Schema.String),
})).annotate({ identifier: "ParentReference" }) as any as Schema.Schema<ParentReference>;

export interface Property {
  /** Output only. The link back to this property. */
  selfLink?: string;
  /** The value of this property. */
  value?: string;
  /** The visibility of this property. Allowed values are PRIVATE (default) and PUBLIC. Private properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with a OAuth 2 client ID. You cannot use an API key to retrieve private properties. */
  visibility?: string;
  /** Output only. This is always `drive#property`. */
  kind?: string;
  /** Output only. ETag of the property. */
  etag?: string;
  /** The key of this property. */
  key?: string;
}

export const Property: Schema.Schema<Property> = Schema.suspend(() => Schema.Struct({
  selfLink: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  visibility: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "Property" }) as any as Schema.Schema<Property>;

export interface ContentRestriction {
  /** Whether the content of the file is read-only. If a file is read-only, a new revision of the file may not be added, comments may not be added or modified, and the title of the file may not be modified. */
  readOnly?: boolean;
  /** Reason for why the content of the file is restricted. This is only mutable on requests that also set `readOnly=true`. */
  reason?: string;
  /** Output only. The type of the content restriction. Currently the only possible value is `globalContentRestriction`. */
  type?: string;
  /** Output only. The user who set the content restriction. Only populated if `readOnly` is true. */
  restrictingUser?: User;
  /** The time at which the content restriction was set (formatted RFC 3339 timestamp). Only populated if readOnly is true. */
  restrictionDate?: string;
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
  restrictionDate: Schema.optional(Schema.String),
  ownerRestricted: Schema.optional(Schema.Boolean),
  systemRestricted: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ContentRestriction" }) as any as Schema.Schema<ContentRestriction>;

export interface LabelField {
  /** This is always `drive#labelField`. */
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
  /** This is always `drive#label` */
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

export interface File {
  /** Output only. The type of file. This is always `drive#file`. */
  kind?: string;
  /** Output only. The permissions for the authenticated user on this file. */
  userPermission?: Permission;
  /** Output only. The final component of `fullFileExtension` with trailing text that does not appear to be part of the extension removed. This field is only populated for files with content stored in Google Drive; it is not populated for Docs Editors or shortcut files. */
  fileExtension?: string;
  /** Output only. An MD5 checksum for the content of this file. This field is only populated for files with content stored in Google Drive; it is not populated for Docs Editors or shortcut files. */
  md5Checksum?: string;
  /** Output only. A link back to this file. */
  selfLink?: string;
  /** Output only. Name(s) of the owner(s) of this file. Not populated for items in shared drives. */
  ownerNames?: Array<string>;
  /** Output only. Name of the last user to modify this file. */
  lastModifyingUserName?: string;
  /** Output only. Deprecated: Use `capabilities/canEdit` instead. */
  editable?: boolean;
  /** Whether writers can share the document with other users. Not populated for items in shared drives. */
  writersCanShare?: boolean;
  /** Output only. Short lived download URL for the file. This field is only populated for files with content stored in Google Drive; it is not populated for Google Docs or shortcut files. */
  downloadUrl?: string;
  /** The MIME type of the file. This is only mutable on update when uploading new content. This field can be left blank, and the mimetype will be determined from the uploaded content's MIME type. */
  mimeType?: string;
  /** Output only. Links for exporting Docs Editors files to specific formats. */
  exportLinks?: Record<string, string>;
  /** Output only. ID of the shared drive the file resides in. Only populated for items in shared drives. */
  driveId?: string;
  /** The ID of the parent folder containing the file. A file can only have one parent folder; specifying multiple parents isn't supported. If not specified as part of an insert request, the file is placed directly in the user's My Drive folder. If not specified as part of a copy request, the file inherits any discoverable parent of the source file. Update requests must use the `addParents` and `removeParents` parameters to modify the parents list. */
  parents?: Array<ParentReference>;
  /** Output only. A short-lived link to the file's thumbnail, if available. Typically lasts on the order of hours. Not intended for direct usage on web applications due to [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), consider using a proxy server. Only populated when the requesting app can access the file's content. If the file isn't shared publicly, the URL returned in `Files.thumbnailLink` must be fetched using a credentialed request. */
  thumbnailLink?: string;
  /** Output only. Whether this file is in the Application Data folder. */
  appDataContents?: boolean;
  /** Output only. A link only available on public folders for viewing their static web assets (HTML, CSS, JS, etc) via Google Drive's Website Hosting. */
  webViewLink?: string;
  /** Output only. A link to the file's icon. */
  iconLink?: string;
  /** Output only. Whether the file has been shared. Not populated for items in shared drives. */
  shared?: boolean;
  /** Output only. The last user to modify this file. This field is only populated when the last modification was performed by a signed-in user. */
  lastModifyingUser?: User;
  /** Output only. The owner of this file. Only certain legacy files may have more than one owner. This field isn't populated for items in shared drives. */
  owners?: Array<User>;
  /** Output only. A map of the id of each of the user's apps to a link to open this file with that app. Only populated when the drive.apps.readonly scope is used. */
  openWithLinks?: Record<string, string>;
  /** Output only. A link to open this file with the user's default app for this file. Only populated when the drive.apps.readonly scope is used. */
  defaultOpenWithLink?: string;
  /** Output only. The ID of the file's head revision. This field is only populated for files with content stored in Google Drive; it is not populated for Docs Editors or shortcut files. */
  headRevisionId?: string;
  /** The list of properties. */
  properties?: Array<Property>;
  /** Output only. Deprecated: Use `capabilities/canCopy` instead. */
  copyable?: boolean;
  /** Output only. ETag of the file. */
  etag?: string;
  /** Output only. User that shared the item with the current user, if available. */
  sharingUser?: User;
  /** Output only. A link for opening the file in a relevant Google editor or viewer. */
  alternateLink?: string;
  /** Output only. A link for embedding the file. */
  embedLink?: string;
  /** Output only. A link for downloading the content of the file in a browser using cookie based authentication. In cases where the content is shared publicly, the content can be downloaded without any credentials. */
  webContentLink?: string;
  /** Output only. Size in bytes of blobs and first party editor files. Won't be populated for files that have no size, like shortcuts and folders. */
  fileSize?: string;
  /** Whether the options to copy, print, or download this file, should be disabled for readers and commenters. */
  copyRequiresWriterPermission?: boolean;
  /** Output only. The list of permissions for users with access to this file. Not populated for items in shared drives. */
  permissions?: Array<Permission>;
  /** Output only. Whether this file has a thumbnail. This does not indicate whether the requesting app has access to the thumbnail. To check access, look for the presence of the thumbnailLink field. */
  hasThumbnail?: boolean;
  /** Output only. The list of spaces which contain the file. Supported values are `drive`, `appDataFolder` and `photos`. */
  spaces?: Array<string>;
  /** Folder color as an RGB hex string if the file is a folder or a shortcut to a folder. The list of supported colors is available in the folderColorPalette field of the About resource. If an unsupported color is specified, it will be changed to the closest color in the palette. */
  folderColorRgb?: string;
  /** The ID of the file. */
  id?: string;
  /** The title of this file. Note that for immutable items such as the top level folders of shared drives, My Drive root folder, and Application Data folder the title is constant. */
  title?: string;
  /** A short description of the file. */
  description?: string;
  /** A group of labels for the file. */
  labels?: { viewed?: boolean; restricted?: boolean; starred?: boolean; hidden?: boolean; trashed?: boolean; modified?: boolean };
  /** Output only. Whether this file has been explicitly trashed, as opposed to recursively trashed. */
  explicitlyTrashed?: boolean;
  /** Create time for this file (formatted RFC 3339 timestamp). */
  createdDate?: string;
  /** Last time this file was modified by anyone (formatted RFC 3339 timestamp). This is only mutable on update when the setModifiedDate parameter is set. */
  modifiedDate?: string;
  /** Last time this file was modified by the user (formatted RFC 3339 timestamp). Note that setting modifiedDate will also update the modifiedByMe date for the user which set the date. */
  modifiedByMeDate?: string;
  /** Last time this file was viewed by the user (formatted RFC 3339 timestamp). */
  lastViewedByMeDate?: string;
  /** Deprecated. */
  markedViewedByMeDate?: string;
  /** Time at which this file was shared with the user (formatted RFC 3339 timestamp). */
  sharedWithMeDate?: string;
  /** Output only. The number of quota bytes used by this file. */
  quotaBytesUsed?: string;
  /** Output only. A monotonically increasing version number for the file. This reflects every change made to the file on the server, even those not visible to the requesting user. */
  version?: string;
  /** Indexable text attributes for the file (can only be written) */
  indexableText?: { text?: string };
  /** The original filename of the uploaded content if available, or else the original value of the `title` field. This is only available for files with binary content in Google Drive. */
  originalFilename?: string;
  /** Output only. Whether the file is owned by the current user. Not populated for items in shared drives. */
  ownedByMe?: boolean;
  /** Output only. Deprecated: Use `capabilities/canComment` instead. */
  canComment?: boolean;
  /** Output only. Deprecated: Use `capabilities/canShare` instead. */
  shareable?: boolean;
  /** Output only. The full file extension; extracted from the title. May contain multiple concatenated extensions, such as "tar.gz". Removing an extension from the title does not clear this field; however, changing the extension on the title does update this field. This field is only populated for files with content stored in Google Drive; it is not populated for Docs Editors or shortcut files. */
  fullFileExtension?: string;
  /** Output only. Whether the file was created or opened by the requesting app. */
  isAppAuthorized?: boolean;
  /** Output only. Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** Output only. Capabilities the current user has on this file. Each capability corresponds to a fine-grained action that a user may take. */
  capabilities?: { canChangeRestrictedDownload?: boolean; canMoveChildrenOutOfDrive?: boolean; canReadDrive?: boolean; canEdit?: boolean; canCopy?: boolean; canComment?: boolean; canAddChildren?: boolean; canDelete?: boolean; canDownload?: boolean; canListChildren?: boolean; canRemoveChildren?: boolean; canRename?: boolean; canTrash?: boolean; canReadRevisions?: boolean; canReadTeamDrive?: boolean; canMoveTeamDriveItem?: boolean; canChangeCopyRequiresWriterPermission?: boolean; canMoveItemIntoTeamDrive?: boolean; canUntrash?: boolean; canModifyContent?: boolean; canMoveItemWithinTeamDrive?: boolean; canMoveItemOutOfTeamDrive?: boolean; canDeleteChildren?: boolean; canMoveChildrenOutOfTeamDrive?: boolean; canMoveChildrenWithinTeamDrive?: boolean; canTrashChildren?: boolean; canMoveItemOutOfDrive?: boolean; canAddMyDriveParent?: boolean; canRemoveMyDriveParent?: boolean; canMoveItemWithinDrive?: boolean; canShare?: boolean; canMoveChildrenWithinDrive?: boolean; canModifyContentRestriction?: boolean; canAddFolderFromAnotherDrive?: boolean; canChangeSecurityUpdateEnabled?: boolean; canAcceptOwnership?: boolean; canReadLabels?: boolean; canModifyLabels?: boolean; canModifyEditorContentRestriction?: boolean; canModifyOwnerContentRestriction?: boolean; canRemoveContentRestriction?: boolean; canDisableInheritedPermissions?: boolean; canEnableInheritedPermissions?: boolean };
  /** Output only. Whether there are permissions directly on this file. This field is only populated for items in shared drives. */
  hasAugmentedPermissions?: boolean;
  /** Output only. If the file has been explicitly trashed, the user who trashed it. Only populated for items in shared drives. */
  trashingUser?: User;
  /** Output only. Deprecated: Use `capabilities/canReadRevisions` instead. */
  canReadRevisions?: boolean;
  /** Output only. The thumbnail version for use in thumbnail cache invalidation. */
  thumbnailVersion?: string;
  /** The time that the item was trashed (formatted RFC 3339 timestamp). Only populated for items in shared drives. */
  trashedDate?: string;
  /** Output only. List of permission IDs for users with access to this file. */
  permissionIds?: Array<string>;
  /** A thumbnail for the file. This will only be used if a standard thumbnail cannot be generated. */
  thumbnail?: { image?: string; mimeType?: string };
  /** Output only. Metadata about image media. This will only be present for image types, and its contents will depend on what can be parsed from the image content. */
  imageMediaMetadata?: { flashUsed?: boolean; meteringMode?: string; sensor?: string; exposureMode?: string; colorSpace?: string; whiteBalance?: string; width?: number; height?: number; location?: { latitude?: number; longitude?: number; altitude?: number }; rotation?: number; date?: string; cameraMake?: string; cameraModel?: string; exposureTime?: number; aperture?: number; focalLength?: number; isoSpeed?: number; exposureBias?: number; maxApertureValue?: number; subjectDistance?: number; lens?: string };
  /** Output only. Metadata about video media. This will only be present for video types. */
  videoMediaMetadata?: { width?: number; height?: number; durationMillis?: string };
  /** Shortcut file details. Only populated for shortcut files, which have the mimeType field set to `application/vnd.google-apps.shortcut`. Can only be set on `files.insert` requests. */
  shortcutDetails?: { targetId?: string; targetMimeType?: string; targetResourceKey?: string };
  /** Restrictions for accessing the content of the file. Only populated if such a restriction exists. */
  contentRestrictions?: Array<ContentRestriction>;
  /** Output only. A key needed to access the item via a shared link. */
  resourceKey?: string;
  /** Contains details about the link URLs that clients are using to refer to this item. */
  linkShareMetadata?: { securityUpdateEligible?: boolean; securityUpdateEnabled?: boolean };
  /** Output only. An overview of the labels on the file. */
  labelInfo?: { labels?: Array<Label> };
  /** Output only. The SHA1 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it is not populated for Docs Editors or shortcut files. */
  sha1Checksum?: string;
  /** Output only. The SHA256 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it is not populated for Docs Editors or shortcut files. */
  sha256Checksum?: string;
  /** Whether this file has inherited permissions disabled. Inherited permissions are enabled by default. */
  inheritedPermissionsDisabled?: boolean;
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  userPermission: Schema.optional(Permission),
  fileExtension: Schema.optional(Schema.String),
  md5Checksum: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  ownerNames: Schema.optional(Schema.Array(Schema.String)),
  lastModifyingUserName: Schema.optional(Schema.String),
  editable: Schema.optional(Schema.Boolean),
  writersCanShare: Schema.optional(Schema.Boolean),
  downloadUrl: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  exportLinks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  driveId: Schema.optional(Schema.String),
  parents: Schema.optional(Schema.Array(ParentReference)),
  thumbnailLink: Schema.optional(Schema.String),
  appDataContents: Schema.optional(Schema.Boolean),
  webViewLink: Schema.optional(Schema.String),
  iconLink: Schema.optional(Schema.String),
  shared: Schema.optional(Schema.Boolean),
  lastModifyingUser: Schema.optional(User),
  owners: Schema.optional(Schema.Array(User)),
  openWithLinks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  defaultOpenWithLink: Schema.optional(Schema.String),
  headRevisionId: Schema.optional(Schema.String),
  properties: Schema.optional(Schema.Array(Property)),
  copyable: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  sharingUser: Schema.optional(User),
  alternateLink: Schema.optional(Schema.String),
  embedLink: Schema.optional(Schema.String),
  webContentLink: Schema.optional(Schema.String),
  fileSize: Schema.optional(Schema.String),
  copyRequiresWriterPermission: Schema.optional(Schema.Boolean),
  permissions: Schema.optional(Schema.Array(Permission)),
  hasThumbnail: Schema.optional(Schema.Boolean),
  spaces: Schema.optional(Schema.Array(Schema.String)),
  folderColorRgb: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Struct({ viewed: Schema.optional(Schema.Boolean), restricted: Schema.optional(Schema.Boolean), starred: Schema.optional(Schema.Boolean), hidden: Schema.optional(Schema.Boolean), trashed: Schema.optional(Schema.Boolean), modified: Schema.optional(Schema.Boolean) })),
  explicitlyTrashed: Schema.optional(Schema.Boolean),
  createdDate: Schema.optional(Schema.String),
  modifiedDate: Schema.optional(Schema.String),
  modifiedByMeDate: Schema.optional(Schema.String),
  lastViewedByMeDate: Schema.optional(Schema.String),
  markedViewedByMeDate: Schema.optional(Schema.String),
  sharedWithMeDate: Schema.optional(Schema.String),
  quotaBytesUsed: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  indexableText: Schema.optional(Schema.Struct({ text: Schema.optional(Schema.String) })),
  originalFilename: Schema.optional(Schema.String),
  ownedByMe: Schema.optional(Schema.Boolean),
  canComment: Schema.optional(Schema.Boolean),
  shareable: Schema.optional(Schema.Boolean),
  fullFileExtension: Schema.optional(Schema.String),
  isAppAuthorized: Schema.optional(Schema.Boolean),
  teamDriveId: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Struct({ canChangeRestrictedDownload: Schema.optional(Schema.Boolean), canMoveChildrenOutOfDrive: Schema.optional(Schema.Boolean), canReadDrive: Schema.optional(Schema.Boolean), canEdit: Schema.optional(Schema.Boolean), canCopy: Schema.optional(Schema.Boolean), canComment: Schema.optional(Schema.Boolean), canAddChildren: Schema.optional(Schema.Boolean), canDelete: Schema.optional(Schema.Boolean), canDownload: Schema.optional(Schema.Boolean), canListChildren: Schema.optional(Schema.Boolean), canRemoveChildren: Schema.optional(Schema.Boolean), canRename: Schema.optional(Schema.Boolean), canTrash: Schema.optional(Schema.Boolean), canReadRevisions: Schema.optional(Schema.Boolean), canReadTeamDrive: Schema.optional(Schema.Boolean), canMoveTeamDriveItem: Schema.optional(Schema.Boolean), canChangeCopyRequiresWriterPermission: Schema.optional(Schema.Boolean), canMoveItemIntoTeamDrive: Schema.optional(Schema.Boolean), canUntrash: Schema.optional(Schema.Boolean), canModifyContent: Schema.optional(Schema.Boolean), canMoveItemWithinTeamDrive: Schema.optional(Schema.Boolean), canMoveItemOutOfTeamDrive: Schema.optional(Schema.Boolean), canDeleteChildren: Schema.optional(Schema.Boolean), canMoveChildrenOutOfTeamDrive: Schema.optional(Schema.Boolean), canMoveChildrenWithinTeamDrive: Schema.optional(Schema.Boolean), canTrashChildren: Schema.optional(Schema.Boolean), canMoveItemOutOfDrive: Schema.optional(Schema.Boolean), canAddMyDriveParent: Schema.optional(Schema.Boolean), canRemoveMyDriveParent: Schema.optional(Schema.Boolean), canMoveItemWithinDrive: Schema.optional(Schema.Boolean), canShare: Schema.optional(Schema.Boolean), canMoveChildrenWithinDrive: Schema.optional(Schema.Boolean), canModifyContentRestriction: Schema.optional(Schema.Boolean), canAddFolderFromAnotherDrive: Schema.optional(Schema.Boolean), canChangeSecurityUpdateEnabled: Schema.optional(Schema.Boolean), canAcceptOwnership: Schema.optional(Schema.Boolean), canReadLabels: Schema.optional(Schema.Boolean), canModifyLabels: Schema.optional(Schema.Boolean), canModifyEditorContentRestriction: Schema.optional(Schema.Boolean), canModifyOwnerContentRestriction: Schema.optional(Schema.Boolean), canRemoveContentRestriction: Schema.optional(Schema.Boolean), canDisableInheritedPermissions: Schema.optional(Schema.Boolean), canEnableInheritedPermissions: Schema.optional(Schema.Boolean) })),
  hasAugmentedPermissions: Schema.optional(Schema.Boolean),
  trashingUser: Schema.optional(User),
  canReadRevisions: Schema.optional(Schema.Boolean),
  thumbnailVersion: Schema.optional(Schema.String),
  trashedDate: Schema.optional(Schema.String),
  permissionIds: Schema.optional(Schema.Array(Schema.String)),
  thumbnail: Schema.optional(Schema.Struct({ image: Schema.optional(Schema.String), mimeType: Schema.optional(Schema.String) })),
  imageMediaMetadata: Schema.optional(Schema.Struct({ flashUsed: Schema.optional(Schema.Boolean), meteringMode: Schema.optional(Schema.String), sensor: Schema.optional(Schema.String), exposureMode: Schema.optional(Schema.String), colorSpace: Schema.optional(Schema.String), whiteBalance: Schema.optional(Schema.String), width: Schema.optional(Schema.Number), height: Schema.optional(Schema.Number), location: Schema.optional(Schema.Struct({ latitude: Schema.optional(Schema.Number), longitude: Schema.optional(Schema.Number), altitude: Schema.optional(Schema.Number) })), rotation: Schema.optional(Schema.Number), date: Schema.optional(Schema.String), cameraMake: Schema.optional(Schema.String), cameraModel: Schema.optional(Schema.String), exposureTime: Schema.optional(Schema.Number), aperture: Schema.optional(Schema.Number), focalLength: Schema.optional(Schema.Number), isoSpeed: Schema.optional(Schema.Number), exposureBias: Schema.optional(Schema.Number), maxApertureValue: Schema.optional(Schema.Number), subjectDistance: Schema.optional(Schema.Number), lens: Schema.optional(Schema.String) })),
  videoMediaMetadata: Schema.optional(Schema.Struct({ width: Schema.optional(Schema.Number), height: Schema.optional(Schema.Number), durationMillis: Schema.optional(Schema.String) })),
  shortcutDetails: Schema.optional(Schema.Struct({ targetId: Schema.optional(Schema.String), targetMimeType: Schema.optional(Schema.String), targetResourceKey: Schema.optional(Schema.String) })),
  contentRestrictions: Schema.optional(Schema.Array(ContentRestriction)),
  resourceKey: Schema.optional(Schema.String),
  linkShareMetadata: Schema.optional(Schema.Struct({ securityUpdateEligible: Schema.optional(Schema.Boolean), securityUpdateEnabled: Schema.optional(Schema.Boolean) })),
  labelInfo: Schema.optional(Schema.Struct({ labels: Schema.optional(Schema.Array(Label)) })),
  sha1Checksum: Schema.optional(Schema.String),
  sha256Checksum: Schema.optional(Schema.String),
  inheritedPermissionsDisabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface TeamDrive {
  /** The ID of this Team Drive which is also the ID of the top level folder of this Team Drive. */
  id?: string;
  /** The name of this Team Drive. */
  name?: string;
  /** The color of this Team Drive as an RGB hex string. It can only be set on a `drive.teamdrives.update` request that does not set `themeId`. */
  colorRgb?: string;
  /** This is always `drive#teamDrive` */
  kind?: string;
  /** A short-lived link to this Team Drive's background image. */
  backgroundImageLink?: string;
  /** Capabilities the current user has on this Team Drive. */
  capabilities?: { canAddChildren?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteTeamDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRemoveChildren?: boolean; canRename?: boolean; canRenameTeamDrive?: boolean; canChangeTeamDriveBackground?: boolean; canShare?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canChangeTeamMembersOnlyRestriction?: boolean; canDeleteChildren?: boolean; canTrashChildren?: boolean; canResetTeamDriveRestrictions?: boolean };
  /** The ID of the theme from which the background image and color will be set. The set of possible `teamDriveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.teamdrives.insert` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`. */
  themeId?: string;
  /** An image file and cropping parameters from which a background image for this Team Drive is set. This is a write only field; it can only be set on `drive.teamdrives.update` requests that don't set `themeId`. When specified, all fields of the `backgroundImageFile` must be set. */
  backgroundImageFile?: { id?: string; xCoordinate?: number; yCoordinate?: number; width?: number };
  /** The time at which the Team Drive was created (RFC 3339 date-time). */
  createdDate?: string;
  /** A set of restrictions that apply to this Team Drive or items inside this Team Drive. */
  restrictions?: { copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; teamMembersOnly?: boolean; adminManagedRestrictions?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean };
  /** The organizational unit of this shared drive. This field is only populated on `drives.list` responses when the `useDomainAdminAccess` parameter is set to `true`. */
  orgUnitId?: string;
}

export const TeamDrive: Schema.Schema<TeamDrive> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  colorRgb: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  backgroundImageLink: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Struct({ canAddChildren: Schema.optional(Schema.Boolean), canComment: Schema.optional(Schema.Boolean), canCopy: Schema.optional(Schema.Boolean), canDeleteTeamDrive: Schema.optional(Schema.Boolean), canDownload: Schema.optional(Schema.Boolean), canEdit: Schema.optional(Schema.Boolean), canListChildren: Schema.optional(Schema.Boolean), canManageMembers: Schema.optional(Schema.Boolean), canReadRevisions: Schema.optional(Schema.Boolean), canRemoveChildren: Schema.optional(Schema.Boolean), canRename: Schema.optional(Schema.Boolean), canRenameTeamDrive: Schema.optional(Schema.Boolean), canChangeTeamDriveBackground: Schema.optional(Schema.Boolean), canShare: Schema.optional(Schema.Boolean), canChangeCopyRequiresWriterPermissionRestriction: Schema.optional(Schema.Boolean), canChangeDomainUsersOnlyRestriction: Schema.optional(Schema.Boolean), canChangeSharingFoldersRequiresOrganizerPermissionRestriction: Schema.optional(Schema.Boolean), canChangeTeamMembersOnlyRestriction: Schema.optional(Schema.Boolean), canDeleteChildren: Schema.optional(Schema.Boolean), canTrashChildren: Schema.optional(Schema.Boolean), canResetTeamDriveRestrictions: Schema.optional(Schema.Boolean) })),
  themeId: Schema.optional(Schema.String),
  backgroundImageFile: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String), xCoordinate: Schema.optional(Schema.Number), yCoordinate: Schema.optional(Schema.Number), width: Schema.optional(Schema.Number) })),
  createdDate: Schema.optional(Schema.String),
  restrictions: Schema.optional(Schema.Struct({ copyRequiresWriterPermission: Schema.optional(Schema.Boolean), domainUsersOnly: Schema.optional(Schema.Boolean), teamMembersOnly: Schema.optional(Schema.Boolean), adminManagedRestrictions: Schema.optional(Schema.Boolean), sharingFoldersRequiresOrganizerPermission: Schema.optional(Schema.Boolean) })),
  orgUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "TeamDrive" }) as any as Schema.Schema<TeamDrive>;

export interface Drive {
  /** Output only. The ID of this shared drive which is also the ID of the top level folder of this shared drive. */
  id?: string;
  /** The name of this shared drive. */
  name?: string;
  /** The color of this shared drive as an RGB hex string. It can only be set on a `drive.drives.update` request that does not set `themeId`. */
  colorRgb?: string;
  /** Output only. This is always `drive#drive` */
  kind?: string;
  /** Output only. A short-lived link to this shared drive's background image. */
  backgroundImageLink?: string;
  /** Output only. Capabilities the current user has on this shared drive. */
  capabilities?: { canAddChildren?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRename?: boolean; canRenameDrive?: boolean; canChangeDriveBackground?: boolean; canShare?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeDriveMembersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canResetDriveRestrictions?: boolean; canDeleteChildren?: boolean; canTrashChildren?: boolean };
  /** The ID of the theme from which the background image and color will be set. The set of possible `driveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.drives.insert` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`. */
  themeId?: string;
  /** An image file and cropping parameters from which a background image for this shared drive is set. This is a write only field; it can only be set on `drive.drives.update` requests that don't set `themeId`. When specified, all fields of the `backgroundImageFile` must be set. */
  backgroundImageFile?: { id?: string; xCoordinate?: number; yCoordinate?: number; width?: number };
  /** The time at which the shared drive was created (RFC 3339 date-time). */
  createdDate?: string;
  /** Whether the shared drive is hidden from default view. */
  hidden?: boolean;
  /** A set of restrictions that apply to this shared drive or items inside this shared drive. */
  restrictions?: { copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; driveMembersOnly?: boolean; adminManagedRestrictions?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean };
  /** Output only. The organizational unit of this shared drive. This field is only populated on `drives.list` responses when the `useDomainAdminAccess` parameter is set to `true`. */
  orgUnitId?: string;
}

export const Drive: Schema.Schema<Drive> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  colorRgb: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  backgroundImageLink: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Struct({ canAddChildren: Schema.optional(Schema.Boolean), canComment: Schema.optional(Schema.Boolean), canCopy: Schema.optional(Schema.Boolean), canDeleteDrive: Schema.optional(Schema.Boolean), canDownload: Schema.optional(Schema.Boolean), canEdit: Schema.optional(Schema.Boolean), canListChildren: Schema.optional(Schema.Boolean), canManageMembers: Schema.optional(Schema.Boolean), canReadRevisions: Schema.optional(Schema.Boolean), canRename: Schema.optional(Schema.Boolean), canRenameDrive: Schema.optional(Schema.Boolean), canChangeDriveBackground: Schema.optional(Schema.Boolean), canShare: Schema.optional(Schema.Boolean), canChangeCopyRequiresWriterPermissionRestriction: Schema.optional(Schema.Boolean), canChangeDomainUsersOnlyRestriction: Schema.optional(Schema.Boolean), canChangeDriveMembersOnlyRestriction: Schema.optional(Schema.Boolean), canChangeSharingFoldersRequiresOrganizerPermissionRestriction: Schema.optional(Schema.Boolean), canResetDriveRestrictions: Schema.optional(Schema.Boolean), canDeleteChildren: Schema.optional(Schema.Boolean), canTrashChildren: Schema.optional(Schema.Boolean) })),
  themeId: Schema.optional(Schema.String),
  backgroundImageFile: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String), xCoordinate: Schema.optional(Schema.Number), yCoordinate: Schema.optional(Schema.Number), width: Schema.optional(Schema.Number) })),
  createdDate: Schema.optional(Schema.String),
  hidden: Schema.optional(Schema.Boolean),
  restrictions: Schema.optional(Schema.Struct({ copyRequiresWriterPermission: Schema.optional(Schema.Boolean), domainUsersOnly: Schema.optional(Schema.Boolean), driveMembersOnly: Schema.optional(Schema.Boolean), adminManagedRestrictions: Schema.optional(Schema.Boolean), sharingFoldersRequiresOrganizerPermission: Schema.optional(Schema.Boolean) })),
  orgUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "Drive" }) as any as Schema.Schema<Drive>;

export interface Change {
  /** The ID of the change. */
  id?: string;
  /** Whether the file or shared drive has been removed from this list of changes, for example by deletion or loss of access. */
  deleted?: boolean;
  /** The updated state of the file. Present if the type is file and the file has not been removed from this list of changes. */
  file?: File;
  /** The ID of the file associated with this change. */
  fileId?: string;
  /** The time of this modification. */
  modificationDate?: string;
  /** This is always `drive#change`. */
  kind?: string;
  /** Deprecated: Use `changeType` instead. */
  type?: string;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
  /** Deprecated: Use `drive` instead. */
  teamDrive?: TeamDrive;
  /** The type of the change. Possible values are `file` and `drive`. */
  changeType?: string;
  /** A link back to this change. */
  selfLink?: string;
  /** The ID of the shared drive associated with this change. */
  driveId?: string;
  /** The updated state of the shared drive. Present if the changeType is drive, the user is still a member of the shared drive, and the shared drive has not been deleted. */
  drive?: Drive;
}

export const Change: Schema.Schema<Change> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  file: Schema.optional(File),
  fileId: Schema.optional(Schema.String),
  modificationDate: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  teamDriveId: Schema.optional(Schema.String),
  teamDrive: Schema.optional(TeamDrive),
  changeType: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  driveId: Schema.optional(Schema.String),
  drive: Schema.optional(Drive),
})).annotate({ identifier: "Change" }) as any as Schema.Schema<Change>;

export interface StartPageToken {
  /** The starting page token for listing changes. */
  startPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"drive#startPageToken"`. */
  kind?: string;
}

export const StartPageToken: Schema.Schema<StartPageToken> = Schema.suspend(() => Schema.Struct({
  startPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "StartPageToken" }) as any as Schema.Schema<StartPageToken>;

export interface ChangeList {
  /** The current largest change ID. */
  largestChangeId?: string;
  /** The page token for the next page of changes. This will be absent if the end of the changes list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** This is always `drive#changeList`. */
  kind?: string;
  /** The ETag of the list. */
  etag?: string;
  /** The starting page token for future changes. This will be present only if the end of the current changes list has been reached. */
  newStartPageToken?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** A link to the next page of changes. */
  nextLink?: string;
  /** The list of changes. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  items?: Array<Change>;
}

export const ChangeList: Schema.Schema<ChangeList> = Schema.suspend(() => Schema.Struct({
  largestChangeId: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  newStartPageToken: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Change)),
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

export interface ChildReference {
  /** The ID of the child. */
  id?: string;
  /** Output only. A link back to this reference. */
  selfLink?: string;
  /** Output only. This is always `drive#childReference`. */
  kind?: string;
  /** Output only. A link to the child. */
  childLink?: string;
}

export const ChildReference: Schema.Schema<ChildReference> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  childLink: Schema.optional(Schema.String),
})).annotate({ identifier: "ChildReference" }) as any as Schema.Schema<ChildReference>;

export interface ChildList {
  /** The page token for the next page of children. This will be absent if the end of the children list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** This is always `drive#childList`. */
  kind?: string;
  /** The ETag of the list. */
  etag?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** A link to the next page of children. */
  nextLink?: string;
  /** The list of children. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  items?: Array<ChildReference>;
}

export const ChildList: Schema.Schema<ChildList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(ChildReference)),
})).annotate({ identifier: "ChildList" }) as any as Schema.Schema<ChildList>;

export interface CommentReply {
  /** The ID of the reply. */
  replyId?: string;
  /** This is always drive#commentReply. */
  kind?: string;
  /** The date when this reply was first created. */
  createdDate?: string;
  /** The date when this reply was last modified. */
  modifiedDate?: string;
  /** The action this reply performed to the parent comment. When creating a new reply this is the action to be perform tSo the parent comment. Possible values are: * `resolve` - To resolve a comment. * `reopen` - To reopen (un-resolve) a comment. */
  verb?: string;
  /** The user who wrote this reply. */
  author?: User;
  /** Whether this reply has been deleted. If a reply has been deleted the content will be cleared and this will only represent a reply that once existed. */
  deleted?: boolean;
  /** HTML formatted content for this reply. */
  htmlContent?: string;
  /** The plain text content used to create this reply. This is not HTML safe and should only be used as a starting point to make edits to a reply's content. This field is required on inserts if no verb is specified (resolve/reopen). */
  content?: string;
}

export const CommentReply: Schema.Schema<CommentReply> = Schema.suspend(() => Schema.Struct({
  replyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  createdDate: Schema.optional(Schema.String),
  modifiedDate: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  author: Schema.optional(User),
  deleted: Schema.optional(Schema.Boolean),
  htmlContent: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "CommentReply" }) as any as Schema.Schema<CommentReply>;

export interface Comment {
  /** The ID of the comment. */
  commentId?: string;
  /** This is always drive#comment. */
  kind?: string;
  /** The date when this comment was first created. */
  createdDate?: string;
  /** The date when this comment or any of its replies were last modified. */
  modifiedDate?: string;
  /** The file which this comment is addressing. */
  fileId?: string;
  /** The title of the file which this comment is addressing. */
  fileTitle?: string;
  /** The status of this comment. Status can be changed by posting a reply to a comment with the desired status. Possible values are: * `open` - The comment is still open. * `resolved` - The comment has been resolved by one of its replies. */
  status?: string;
  /** A region of the document represented as a JSON string. For details on defining anchor properties, refer to [Manage comments and replies](https://developers.google.com/workspace/drive/api/v3/manage-comments). */
  anchor?: string;
  /** Replies to this post. */
  replies?: Array<CommentReply>;
  /** The user who wrote this comment. */
  author?: User;
  /** Whether this comment has been deleted. If a comment has been deleted the content will be cleared and this will only represent a comment that once existed. */
  deleted?: boolean;
  /** A link back to this comment. */
  selfLink?: string;
  /** HTML formatted content for this comment. */
  htmlContent?: string;
  /** The plain text content used to create this comment. This is not HTML safe and should only be used as a starting point to make edits to a comment's content. */
  content?: string;
  /** Context of a file which is being commented on. */
  context?: { type?: string; value?: string };
}

export const Comment: Schema.Schema<Comment> = Schema.suspend(() => Schema.Struct({
  commentId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  createdDate: Schema.optional(Schema.String),
  modifiedDate: Schema.optional(Schema.String),
  fileId: Schema.optional(Schema.String),
  fileTitle: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  anchor: Schema.optional(Schema.String),
  replies: Schema.optional(Schema.Array(CommentReply)),
  author: Schema.optional(User),
  deleted: Schema.optional(Schema.Boolean),
  selfLink: Schema.optional(Schema.String),
  htmlContent: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  context: Schema.optional(Schema.Struct({ type: Schema.optional(Schema.String), value: Schema.optional(Schema.String) })),
})).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface CommentList {
  /** The list of comments. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  items?: Array<Comment>;
  /** This is always drive#commentList. */
  kind?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** A link to the next page of comments. */
  nextLink?: string;
  /** The page token for the next page of comments. This will be absent if the end of the comments list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
}

export const CommentList: Schema.Schema<CommentList> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Comment)),
  kind: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "CommentList" }) as any as Schema.Schema<CommentList>;

export interface DriveList {
  /** The page token for the next page of shared drives. This will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** This is always `drive#driveList` */
  kind?: string;
  /** The list of shared drives. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  items?: Array<Drive>;
}

export const DriveList: Schema.Schema<DriveList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Drive)),
})).annotate({ identifier: "DriveList" }) as any as Schema.Schema<DriveList>;

export interface GeneratedIds {
  /** The IDs generated for the requesting user in the specified space. */
  ids?: Array<string>;
  /** The type of file that can be created with these IDs. */
  space?: string;
  /** This is always `drive#generatedIds` */
  kind?: string;
}

export const GeneratedIds: Schema.Schema<GeneratedIds> = Schema.suspend(() => Schema.Struct({
  ids: Schema.optional(Schema.Array(Schema.String)),
  space: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "GeneratedIds" }) as any as Schema.Schema<GeneratedIds>;

export interface FileList {
  /** The page token for the next page of files. This will be absent if the end of the files list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** This is always `drive#fileList`. */
  kind?: string;
  /** The ETag of the list. */
  etag?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** Whether the search process was incomplete. If true, then some search results may be missing, since all documents were not searched. This may occur when searching multiple drives with the "allDrives" corpora, but all corpora could not be searched. When this happens, it is suggested that clients narrow their query by choosing a different corpus such as "default" or "drive". */
  incompleteSearch?: boolean;
  /** A link to the next page of files. */
  nextLink?: string;
  /** The list of files. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  items?: Array<File>;
}

export const FileList: Schema.Schema<FileList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  incompleteSearch: Schema.optional(Schema.Boolean),
  nextLink: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(File)),
})).annotate({ identifier: "FileList" }) as any as Schema.Schema<FileList>;

export interface LabelList {
  /** The list of labels. */
  items?: Array<Label>;
  /** The page token for the next page of labels. This field will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** This is always `drive#labelList` */
  kind?: string;
}

export const LabelList: Schema.Schema<LabelList> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Label)),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LabelList" }) as any as Schema.Schema<LabelList>;

export interface LabelFieldModification {
  /** The ID of the field to be modified. */
  fieldId?: string;
  /** This is always `drive#labelFieldModification`. */
  kind?: string;
  /** Replaces the value of a dateString Field with these new values. The string must be in the RFC 3339 full-date format: YYYY-MM-DD. */
  setDateValues?: Array<string>;
  /** Sets the value of a `text` field. */
  setTextValues?: Array<string>;
  /** Replaces a `selection` field with these new values. */
  setSelectionValues?: Array<string>;
  /** Replaces the value of an `integer` field with these new values. */
  setIntegerValues?: Array<string>;
  /** Replaces a `user` field with these new values. The values must be valid email addresses. */
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
  /** This is always `drive#labelModification`. */
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
  /** This is always `drive#modifyLabelsRequest`. */
  kind?: string;
}

export const ModifyLabelsRequest: Schema.Schema<ModifyLabelsRequest> = Schema.suspend(() => Schema.Struct({
  labelModifications: Schema.optional(Schema.Array(LabelModification)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ModifyLabelsRequest" }) as any as Schema.Schema<ModifyLabelsRequest>;

export interface ModifyLabelsResponse {
  /** The list of labels which were added or updated by the request. */
  modifiedLabels?: Array<Label>;
  /** This is always `drive#modifyLabelsResponse` */
  kind?: string;
}

export const ModifyLabelsResponse: Schema.Schema<ModifyLabelsResponse> = Schema.suspend(() => Schema.Struct({
  modifiedLabels: Schema.optional(Schema.Array(Label)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ModifyLabelsResponse" }) as any as Schema.Schema<ModifyLabelsResponse>;

export interface ParentList {
  /** This is always `drive#parentList`. */
  kind?: string;
  /** The ETag of the list. */
  etag?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** The list of parents. */
  items?: Array<ParentReference>;
}

export const ParentList: Schema.Schema<ParentList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(ParentReference)),
})).annotate({ identifier: "ParentList" }) as any as Schema.Schema<ParentList>;

export interface PermissionId {
  /** This is always `drive#permissionId`. */
  kind?: string;
  /** The permission ID. */
  id?: string;
}

export const PermissionId: Schema.Schema<PermissionId> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "PermissionId" }) as any as Schema.Schema<PermissionId>;

export interface PermissionList {
  /** The page token for the next page of permissions. This field will be absent if the end of the permissions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** This is always `drive#permissionList`. */
  kind?: string;
  /** The ETag of the list. */
  etag?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** The list of permissions. */
  items?: Array<Permission>;
}

export const PermissionList: Schema.Schema<PermissionList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Permission)),
})).annotate({ identifier: "PermissionList" }) as any as Schema.Schema<PermissionList>;

export interface PropertyList {
  /** This is always `drive#propertyList`. */
  kind?: string;
  /** The ETag of the list. */
  etag?: string;
  /** The link back to this list. */
  selfLink?: string;
  /** The list of properties. */
  items?: Array<Property>;
}

export const PropertyList: Schema.Schema<PropertyList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Property)),
})).annotate({ identifier: "PropertyList" }) as any as Schema.Schema<PropertyList>;

export interface CommentReplyList {
  /** The list of replies. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  items?: Array<CommentReply>;
  /** This is always `drive#commentReplyList`. */
  kind?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** A link to the next page of replies. */
  nextLink?: string;
  /** The page token for the next page of replies. This will be absent if the end of the replies list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
}

export const CommentReplyList: Schema.Schema<CommentReplyList> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(CommentReply)),
  kind: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "CommentReplyList" }) as any as Schema.Schema<CommentReplyList>;

export interface Revision {
  /** Output only. The ID of the revision. */
  id?: string;
  /** Output only. The MIME type of the revision. */
  mimeType?: string;
  /** Output only. This is always `drive#revision`. */
  kind?: string;
  /** Whether this revision is published. This is only populated and can only be modified for Docs Editors files. */
  published?: boolean;
  /** Output only. The ETag of the revision. */
  etag?: string;
  /** Output only. Links for exporting Docs Editors files to specific formats. */
  exportLinks?: Record<string, string>;
  /** Whether this revision is pinned to prevent automatic purging. If not set, the revision is automatically purged 30 days after newer content is uploaded. This field can only be modified on files with content stored in Drive, excluding Docs Editors files. Revisions can also be pinned when they are created through the drive.files.insert/update/copy by using the pinned query parameter. Pinned revisions are stored indefinitely using additional storage quota, up to a maximum of 200 revisions. */
  pinned?: boolean;
  /** Output only. An MD5 checksum for the content of this revision. This will only be populated on files with content stored in Drive. */
  md5Checksum?: string;
  /** Last time this revision was modified (formatted RFC 3339 timestamp). */
  modifiedDate?: string;
  /** Output only. Name of the last user to modify this revision. */
  lastModifyingUserName?: string;
  /** Output only. Short term download URL for the file. This will only be populated on files with content stored in Drive. */
  downloadUrl?: string;
  /** Whether subsequent revisions will be automatically republished. This is only populated and can only be modified for Docs Editors files. */
  publishAuto?: boolean;
  /** Whether this revision is published outside the domain. This is only populated and can only be modified for Docs Editors files. */
  publishedOutsideDomain?: boolean;
  /** Output only. A link to the published revision. This is only populated for Docs Editors files. */
  publishedLink?: string;
  /** Output only. The size of the revision in bytes. This will only be populated on files with content stored in Drive. */
  fileSize?: string;
  /** Output only. The original filename when this revision was created. This will only be populated on files with content stored in Drive. */
  originalFilename?: string;
  /** Output only. The last user to modify this revision. This field is only populated when the last modification was performed by a signed-in user. */
  lastModifyingUser?: User;
  /** Output only. A link back to this revision. */
  selfLink?: string;
}

export const Revision: Schema.Schema<Revision> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  published: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  exportLinks: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  pinned: Schema.optional(Schema.Boolean),
  md5Checksum: Schema.optional(Schema.String),
  modifiedDate: Schema.optional(Schema.String),
  lastModifyingUserName: Schema.optional(Schema.String),
  downloadUrl: Schema.optional(Schema.String),
  publishAuto: Schema.optional(Schema.Boolean),
  publishedOutsideDomain: Schema.optional(Schema.Boolean),
  publishedLink: Schema.optional(Schema.String),
  fileSize: Schema.optional(Schema.String),
  originalFilename: Schema.optional(Schema.String),
  lastModifyingUser: Schema.optional(User),
  selfLink: Schema.optional(Schema.String),
})).annotate({ identifier: "Revision" }) as any as Schema.Schema<Revision>;

export interface RevisionList {
  /** The page token for the next page of revisions. This field will be absent if the end of the revisions list has been reached. If the token is rejected for any reason, it should be discarded and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** This is always `drive#revisionList`. */
  kind?: string;
  /** The ETag of the list. */
  etag?: string;
  /** A link back to this list. */
  selfLink?: string;
  /** The list of revisions. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  items?: Array<Revision>;
}

export const RevisionList: Schema.Schema<RevisionList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Revision)),
})).annotate({ identifier: "RevisionList" }) as any as Schema.Schema<RevisionList>;

export interface TeamDriveList {
  /** The page token for the next page of Team Drives. */
  nextPageToken?: string;
  /** This is always `drive#teamDriveList` */
  kind?: string;
  /** The list of Team Drives. */
  items?: Array<TeamDrive>;
}

export const TeamDriveList: Schema.Schema<TeamDriveList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(TeamDrive)),
})).annotate({ identifier: "TeamDriveList" }) as any as Schema.Schema<TeamDriveList>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetAboutRequest {
  /** Whether to count changes outside the My Drive hierarchy. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive will be omitted from the `maxChangeIdCount`. */
  includeSubscribed?: boolean;
  /** Maximum number of remaining change IDs to count */
  maxChangeIdCount?: string;
  /** Change ID to start counting from when calculating number of remaining change IDs */
  startChangeId?: string;
}

export const GetAboutRequest = Schema.Struct({
  includeSubscribed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeSubscribed")),
  maxChangeIdCount: Schema.optional(Schema.String).pipe(T.HttpQuery("maxChangeIdCount")),
  startChangeId: Schema.optional(Schema.String).pipe(T.HttpQuery("startChangeId")),
}).pipe(
  T.Http({ method: "GET", path: "about" }),
  svc,
) as unknown as Schema.Schema<GetAboutRequest>;

export type GetAboutResponse = About;
export const GetAboutResponse = About;

export type GetAboutError = DefaultErrors;

/** Gets the information about the current user along with Drive API settings */
export const getAbout: API.OperationMethod<GetAboutRequest, GetAboutResponse, GetAboutError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetAboutRequest,
  output: GetAboutResponse,
  errors: [],
}));

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

export type GetAppsError = DefaultErrors;

/** Gets a specific app. */
export const getApps: API.OperationMethod<GetAppsRequest, GetAppsResponse, GetAppsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsRequest,
  output: GetAppsResponse,
  errors: [],
}));

export interface ListAppsRequest {
  /** A comma-separated list of file extensions for open with filtering. All apps within the given app query scope which can open any of the given file extensions will be included in the response. If `appFilterMimeTypes` are provided as well, the result is a union of the two resulting app lists. */
  appFilterExtensions?: string;
  /** A comma-separated list of MIME types for open with filtering. All apps within the given app query scope which can open any of the given MIME types will be included in the response. If `appFilterExtensions` are provided as well, the result is a union of the two resulting app lists. */
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

export type ListAppsError = DefaultErrors;

/** Lists a user's installed apps. */
export const listApps: API.OperationMethod<ListAppsRequest, ListAppsResponse, ListAppsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListAppsRequest,
  output: ListAppsResponse,
  errors: [],
}));

export interface GetChangesRequest {
  /** The ID of the change. */
  changeId: string;
  /** The shared drive from which the change will be returned. */
  driveId?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated: Use `driveId` instead. */
  teamDriveId?: string;
}

export const GetChangesRequest = Schema.Struct({
  changeId: Schema.String.pipe(T.HttpPath("changeId")),
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  teamDriveId: Schema.optional(Schema.String).pipe(T.HttpQuery("teamDriveId")),
}).pipe(
  T.Http({ method: "GET", path: "changes/{changeId}" }),
  svc,
) as unknown as Schema.Schema<GetChangesRequest>;

export type GetChangesResponse = Change;
export const GetChangesResponse = Change;

export type GetChangesError = DefaultErrors;

/** Deprecated: Use `changes.getStartPageToken` and `changes.list` to retrieve recent changes. */
export const getChanges: API.OperationMethod<GetChangesRequest, GetChangesResponse, GetChangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetChangesRequest,
  output: GetChangesResponse,
  errors: [],
}));

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

export type GetStartPageTokenChangesError = DefaultErrors;

/** Gets the starting pageToken for listing future changes. */
export const getStartPageTokenChanges: API.OperationMethod<GetStartPageTokenChangesRequest, GetStartPageTokenChangesResponse, GetStartPageTokenChangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetStartPageTokenChangesRequest,
  output: GetStartPageTokenChangesResponse,
  errors: [],
}));

export interface ListChangesRequest {
  /** The shared drive from which changes will be returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
  driveId?: string;
  /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
  includeCorpusRemovals?: boolean;
  /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
  includeDeleted?: boolean;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** Whether to include changes outside the My Drive hierarchy in the result. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive will be omitted from the result. */
  includeSubscribed?: boolean;
  /** Deprecated: Use `includeItemsFromAllDrives` instead. */
  includeTeamDriveItems?: boolean;
  /** Maximum number of changes to return. */
  maxResults?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response or to the response from the getStartPageToken method. */
  pageToken?: string;
  /** A comma-separated list of spaces to query. Supported values are `drive`, `appDataFolder` and `photos`. */
  spaces?: string;
  /** Deprecated: Use `pageToken` instead. */
  startChangeId?: string;
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

export const ListChangesRequest = Schema.Struct({
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  includeCorpusRemovals: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeCorpusRemovals")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
  includeItemsFromAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeItemsFromAllDrives")),
  includeSubscribed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeSubscribed")),
  includeTeamDriveItems: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeTeamDriveItems")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  spaces: Schema.optional(Schema.String).pipe(T.HttpQuery("spaces")),
  startChangeId: Schema.optional(Schema.String).pipe(T.HttpQuery("startChangeId")),
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

export type ListChangesError = DefaultErrors;

/** Lists the changes for a user or shared drive. */
export const listChanges: API.PaginatedOperationMethod<ListChangesRequest, ListChangesResponse, ListChangesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListChangesRequest,
  output: ListChangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface WatchChangesRequest {
  /** The shared drive from which changes will be returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
  driveId?: string;
  /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
  includeCorpusRemovals?: boolean;
  /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
  includeDeleted?: boolean;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** Whether to include changes outside the My Drive hierarchy in the result. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive will be omitted from the result. */
  includeSubscribed?: boolean;
  /** Deprecated: Use `includeItemsFromAllDrives` instead. */
  includeTeamDriveItems?: boolean;
  /** Maximum number of changes to return. */
  maxResults?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response or to the response from the getStartPageToken method. */
  pageToken?: string;
  /** A comma-separated list of spaces to query. Supported values are `drive`, `appDataFolder` and `photos`. */
  spaces?: string;
  /** Deprecated: Use `pageToken` instead. */
  startChangeId?: string;
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
  /** Request body */
  body?: Channel;
}

export const WatchChangesRequest = Schema.Struct({
  driveId: Schema.optional(Schema.String).pipe(T.HttpQuery("driveId")),
  includeCorpusRemovals: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeCorpusRemovals")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
  includeItemsFromAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeItemsFromAllDrives")),
  includeSubscribed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeSubscribed")),
  includeTeamDriveItems: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeTeamDriveItems")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  spaces: Schema.optional(Schema.String).pipe(T.HttpQuery("spaces")),
  startChangeId: Schema.optional(Schema.String).pipe(T.HttpQuery("startChangeId")),
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

export type WatchChangesError = DefaultErrors;

/** Subscribe to changes for a user. */
export const watchChanges: API.OperationMethod<WatchChangesRequest, WatchChangesResponse, WatchChangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: WatchChangesRequest,
  output: WatchChangesResponse,
  errors: [],
}));

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

export type StopChannelsError = DefaultErrors;

/** Stops watching resources through this channel. */
export const stopChannels: API.OperationMethod<StopChannelsRequest, StopChannelsResponse, StopChannelsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: StopChannelsRequest,
  output: StopChannelsResponse,
  errors: [],
}));

export interface DeleteChildrenRequest {
  /** The ID of the folder. */
  folderId: string;
  /** The ID of the child. */
  childId: string;
  /** Deprecated: If an item is not in a shared drive and its last parent is removed, the item is placed under its owner's root. */
  enforceSingleParent?: boolean;
}

export const DeleteChildrenRequest = Schema.Struct({
  folderId: Schema.String.pipe(T.HttpPath("folderId")),
  childId: Schema.String.pipe(T.HttpPath("childId")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{folderId}/children/{childId}" }),
  svc,
) as unknown as Schema.Schema<DeleteChildrenRequest>;

export interface DeleteChildrenResponse {}
export const DeleteChildrenResponse: Schema.Schema<DeleteChildrenResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteChildrenResponse>;

export type DeleteChildrenError = DefaultErrors;

/** Removes a child from a folder. */
export const deleteChildren: API.OperationMethod<DeleteChildrenRequest, DeleteChildrenResponse, DeleteChildrenError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteChildrenRequest,
  output: DeleteChildrenResponse,
  errors: [],
}));

export interface GetChildrenRequest {
  /** The ID of the folder. */
  folderId: string;
  /** The ID of the child. */
  childId: string;
}

export const GetChildrenRequest = Schema.Struct({
  folderId: Schema.String.pipe(T.HttpPath("folderId")),
  childId: Schema.String.pipe(T.HttpPath("childId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{folderId}/children/{childId}" }),
  svc,
) as unknown as Schema.Schema<GetChildrenRequest>;

export type GetChildrenResponse = ChildReference;
export const GetChildrenResponse = ChildReference;

export type GetChildrenError = DefaultErrors;

/** Gets a specific child reference. */
export const getChildren: API.OperationMethod<GetChildrenRequest, GetChildrenResponse, GetChildrenError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetChildrenRequest,
  output: GetChildrenResponse,
  errors: [],
}));

export interface InsertChildrenRequest {
  /** The ID of the folder. */
  folderId: string;
  /** Deprecated: Adding files to multiple folders is no longer supported. Use `shortcuts` instead. */
  enforceSingleParent?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Request body */
  body?: ChildReference;
}

export const InsertChildrenRequest = Schema.Struct({
  folderId: Schema.String.pipe(T.HttpPath("folderId")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  body: Schema.optional(ChildReference).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{folderId}/children", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertChildrenRequest>;

export type InsertChildrenResponse = ChildReference;
export const InsertChildrenResponse = ChildReference;

export type InsertChildrenError = DefaultErrors;

/** Inserts a file into a folder. */
export const insertChildren: API.OperationMethod<InsertChildrenRequest, InsertChildrenResponse, InsertChildrenError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertChildrenRequest,
  output: InsertChildrenResponse,
  errors: [],
}));

export interface ListChildrenRequest {
  /** The ID of the folder. */
  folderId: string;
  /** Maximum number of children to return. */
  maxResults?: number;
  /** A comma-separated list of sort keys. Valid keys are `createdDate`, `folder`, `lastViewedByMeDate`, `modifiedByMeDate`, `modifiedDate`, `quotaBytesUsed`, `recency`, `sharedWithMeDate`, `starred`, and `title`. Each key sorts ascending by default, but may be reversed with the `desc` modifier. Example usage: ?orderBy=folder,modifiedDate desc,title. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored. */
  orderBy?: string;
  /** Page token for children. */
  pageToken?: string;
  /** Query string for searching children. */
  q?: string;
}

export const ListChildrenRequest = Schema.Struct({
  folderId: Schema.String.pipe(T.HttpPath("folderId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
}).pipe(
  T.Http({ method: "GET", path: "files/{folderId}/children" }),
  svc,
) as unknown as Schema.Schema<ListChildrenRequest>;

export type ListChildrenResponse = ChildList;
export const ListChildrenResponse = ChildList;

export type ListChildrenError = DefaultErrors;

/** Lists a folder's children. */
export const listChildren: API.PaginatedOperationMethod<ListChildrenRequest, ListChildrenResponse, ListChildrenError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListChildrenRequest,
  output: ListChildrenResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

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

export type DeleteCommentsError = DefaultErrors;

/** Deletes a comment. */
export const deleteComments: API.OperationMethod<DeleteCommentsRequest, DeleteCommentsResponse, DeleteCommentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCommentsRequest,
  output: DeleteCommentsResponse,
  errors: [],
}));

export interface GetCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** If set, this will succeed when retrieving a deleted comment, and will include any deleted replies. */
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

export type GetCommentsError = DefaultErrors;

/** Gets a comment by ID. */
export const getComments: API.OperationMethod<GetCommentsRequest, GetCommentsResponse, GetCommentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetCommentsRequest,
  output: GetCommentsResponse,
  errors: [],
}));

export interface InsertCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** Request body */
  body?: Comment;
}

export const InsertCommentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  body: Schema.optional(Comment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/comments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCommentsRequest>;

export type InsertCommentsResponse = Comment;
export const InsertCommentsResponse = Comment;

export type InsertCommentsError = DefaultErrors;

/** Creates a new comment on the given file. */
export const insertComments: API.OperationMethod<InsertCommentsRequest, InsertCommentsResponse, InsertCommentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCommentsRequest,
  output: InsertCommentsResponse,
  errors: [],
}));

export interface ListCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** If set, all comments and replies, including deleted comments and replies (with content stripped) will be returned. */
  includeDeleted?: boolean;
  /** The maximum number of discussions to include in the response, used for paging. */
  maxResults?: number;
  /** The continuation token, used to page through large result sets. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response. */
  pageToken?: string;
  /** Only discussions that were updated after this timestamp will be returned. Formatted as an RFC 3339 timestamp. */
  updatedMin?: string;
}

export const ListCommentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListCommentsRequest>;

export type ListCommentsResponse = CommentList;
export const ListCommentsResponse = CommentList;

export type ListCommentsError = DefaultErrors;

/** Lists a file's comments. */
export const listComments: API.PaginatedOperationMethod<ListCommentsRequest, ListCommentsResponse, ListCommentsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListCommentsRequest,
  output: ListCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface PatchCommentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** Request body */
  body?: Comment;
}

export const PatchCommentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  body: Schema.optional(Comment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}/comments/{commentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCommentsRequest>;

export type PatchCommentsResponse = Comment;
export const PatchCommentsResponse = Comment;

export type PatchCommentsError = DefaultErrors;

/** Updates an existing comment. */
export const patchComments: API.OperationMethod<PatchCommentsRequest, PatchCommentsResponse, PatchCommentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCommentsRequest,
  output: PatchCommentsResponse,
  errors: [],
}));

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
  T.Http({ method: "PUT", path: "files/{fileId}/comments/{commentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCommentsRequest>;

export type UpdateCommentsResponse = Comment;
export const UpdateCommentsResponse = Comment;

export type UpdateCommentsError = DefaultErrors;

/** Updates an existing comment. */
export const updateComments: API.OperationMethod<UpdateCommentsRequest, UpdateCommentsResponse, UpdateCommentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCommentsRequest,
  output: UpdateCommentsResponse,
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

export type DeleteDrivesError = DefaultErrors;

/** Permanently deletes a shared drive for which the user is an `organizer`. The shared drive cannot contain any untrashed items. */
export const deleteDrives: API.OperationMethod<DeleteDrivesRequest, DeleteDrivesResponse, DeleteDrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDrivesRequest,
  output: DeleteDrivesResponse,
  errors: [],
}));

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

export type GetDrivesError = DefaultErrors;

/** Gets a shared drive's metadata by ID. */
export const getDrives: API.OperationMethod<GetDrivesRequest, GetDrivesResponse, GetDrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetDrivesRequest,
  output: GetDrivesResponse,
  errors: [],
}));

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

export type HideDrivesError = DefaultErrors;

/** Hides a shared drive from the default view. */
export const hideDrives: API.OperationMethod<HideDrivesRequest, HideDrivesResponse, HideDrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: HideDrivesRequest,
  output: HideDrivesResponse,
  errors: [],
}));

export interface InsertDrivesRequest {
  /** Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned. */
  requestId: string;
  /** Request body */
  body?: Drive;
}

export const InsertDrivesRequest = Schema.Struct({
  requestId: Schema.String.pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Drive).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "drives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDrivesRequest>;

export type InsertDrivesResponse = Drive;
export const InsertDrivesResponse = Drive;

export type InsertDrivesError = DefaultErrors;

/** Creates a new shared drive. */
export const insertDrives: API.OperationMethod<InsertDrivesRequest, InsertDrivesResponse, InsertDrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDrivesRequest,
  output: InsertDrivesResponse,
  errors: [],
}));

export interface ListDrivesRequest {
  /** Maximum number of shared drives to return per page. */
  maxResults?: number;
  /** Page token for shared drives. */
  pageToken?: string;
  /** Query string for searching shared drives. */
  q?: string;
  /** Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned. */
  useDomainAdminAccess?: boolean;
}

export const ListDrivesRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
}).pipe(
  T.Http({ method: "GET", path: "drives" }),
  svc,
) as unknown as Schema.Schema<ListDrivesRequest>;

export type ListDrivesResponse = DriveList;
export const ListDrivesResponse = DriveList;

export type ListDrivesError = DefaultErrors;

/** Lists the user's shared drives. This method accepts the `q` parameter, which is a search query combining one or more search terms. For more information, see the [Search for shared drives](/workspace/drive/api/guides/search-shareddrives) guide. */
export const listDrives: API.PaginatedOperationMethod<ListDrivesRequest, ListDrivesResponse, ListDrivesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListDrivesRequest,
  output: ListDrivesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

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

export type UnhideDrivesError = DefaultErrors;

/** Restores a shared drive to the default view. */
export const unhideDrives: API.OperationMethod<UnhideDrivesRequest, UnhideDrivesResponse, UnhideDrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UnhideDrivesRequest,
  output: UnhideDrivesResponse,
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

export const UpdateDrivesRequest = Schema.Struct({
  driveId: Schema.String.pipe(T.HttpPath("driveId")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
  body: Schema.optional(Drive).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "drives/{driveId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDrivesRequest>;

export type UpdateDrivesResponse = Drive;
export const UpdateDrivesResponse = Drive;

export type UpdateDrivesError = DefaultErrors;

/** Updates the metadata for a shared drive. */
export const updateDrives: API.OperationMethod<UpdateDrivesRequest, UpdateDrivesResponse, UpdateDrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDrivesRequest,
  output: UpdateDrivesResponse,
  errors: [],
}));

export interface CopyFilesRequest {
  /** The ID of the file to copy. */
  fileId: string;
  /** Whether to convert this file to the corresponding Docs Editors format. */
  convert?: boolean;
  /** Deprecated: Copying files into multiple folders is no longer supported. Use shortcuts instead. */
  enforceSingleParent?: boolean;
  /** Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads. */
  ocr?: boolean;
  /** If `ocr` is true, hints at the language to use. Valid values are BCP 47 codes. */
  ocrLanguage?: string;
  /** Whether to pin the head revision of the new copy. A file can have a maximum of 200 pinned revisions. */
  pinned?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** The language of the timed text. */
  timedTextLanguage?: string;
  /** The timed text track name. */
  timedTextTrackName?: string;
  /** The visibility of the new file. Permissions are still inherited from parent folders. This parameter is only relevant when the source is not a Google Doc file and when `convert=false`. */
  visibility?: "DEFAULT" | "PRIVATE" | (string & {});
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Request body */
  body?: File;
}

export const CopyFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  convert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("convert")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  ocr: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ocr")),
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  pinned: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pinned")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  timedTextLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("timedTextLanguage")),
  timedTextTrackName: Schema.optional(Schema.String).pipe(T.HttpQuery("timedTextTrackName")),
  visibility: Schema.optional(Schema.String).pipe(T.HttpQuery("visibility")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/copy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CopyFilesRequest>;

export type CopyFilesResponse = File;
export const CopyFilesResponse = File;

export type CopyFilesError = DefaultErrors;

/** Creates a copy of the specified file. */
export const copyFiles: API.OperationMethod<CopyFilesRequest, CopyFilesResponse, CopyFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CopyFilesRequest,
  output: CopyFilesResponse,
  errors: [],
}));

export interface DeleteFilesRequest {
  /** The ID of the file to delete. */
  fileId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated: If an item is not in a shared drive and its last parent is deleted but the item itself is not, the item is placed under its owner's root. */
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

export type DeleteFilesError = DefaultErrors;

/** Permanently deletes a file owned by the user without moving it to the trash. If the file belongs to a shared drive, the user must be an `organizer` on the parent folder. If the target is a folder, all descendants owned by the user are also deleted. */
export const deleteFiles: API.OperationMethod<DeleteFilesRequest, DeleteFilesResponse, DeleteFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFilesRequest,
  output: DeleteFilesResponse,
  errors: [],
}));

export interface EmptyTrashFilesRequest {
  /** Deprecated: If an item is not in a shared drive and its last parent is deleted but the item itself is not, the item is placed under its owner's root. */
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

export type EmptyTrashFilesError = DefaultErrors;

/** Permanently deletes all of the user's trashed files. */
export const emptyTrashFiles: API.OperationMethod<EmptyTrashFilesRequest, EmptyTrashFilesResponse, EmptyTrashFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: EmptyTrashFilesRequest,
  output: EmptyTrashFilesResponse,
  errors: [],
}));

export interface ExportFilesRequest {
  /** The ID of the file. */
  fileId: string;
  /** Required. The MIME type of the format requested for this export. */
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

export type ExportFilesError = DefaultErrors;

/** Exports a Google Workspace document to the requested MIME type and returns exported byte content. Note that the exported content is limited to 10MB. */
export const exportFiles: API.OperationMethod<ExportFilesRequest, ExportFilesResponse, ExportFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ExportFilesRequest,
  output: ExportFilesResponse,
  errors: [],
}));

export interface GenerateIdsFilesRequest {
  /** Maximum number of IDs to return. */
  maxResults?: number;
  /** The space in which the IDs can be used to create new files. Supported values are `drive` and `appDataFolder`. (Default: `drive`) */
  space?: string;
  /** The type of items which the IDs can be used for. Supported values are `files` and `shortcuts`. Note that `shortcuts` are only supported in the `drive` `space`. (Default: `files`) */
  type?: string;
}

export const GenerateIdsFilesRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  space: Schema.optional(Schema.String).pipe(T.HttpQuery("space")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "GET", path: "files/generateIds" }),
  svc,
) as unknown as Schema.Schema<GenerateIdsFilesRequest>;

export type GenerateIdsFilesResponse = GeneratedIds;
export const GenerateIdsFilesResponse = GeneratedIds;

export type GenerateIdsFilesError = DefaultErrors;

/** Generates a set of file IDs which can be provided in insert or copy requests. */
export const generateIdsFiles: API.OperationMethod<GenerateIdsFilesRequest, GenerateIdsFilesResponse, GenerateIdsFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateIdsFilesRequest,
  output: GenerateIdsFilesResponse,
  errors: [],
}));

export interface GetFilesRequest {
  /** The ID for the file in question. */
  fileId: string;
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when the `alt` parameter is set to `media` and the user is the owner of the file or an organizer of the shared drive in which the file resides. */
  acknowledgeAbuse?: boolean;
  /** Deprecated: This parameter has no function. */
  projection?: "BASIC" | "FULL" | (string & {});
  /** Specifies the Revision ID that should be downloaded. Ignored unless alt=media is specified. */
  revisionId?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated: Use `files.update` with `modifiedDateBehavior=noChange, updateViewedDate=true` and an empty request body. */
  updateViewedDate?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
}

export const GetFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  acknowledgeAbuse: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acknowledgeAbuse")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  updateViewedDate: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("updateViewedDate")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}" }),
  svc,
) as unknown as Schema.Schema<GetFilesRequest>;

export type GetFilesResponse = File;
export const GetFilesResponse = File;

export type GetFilesError = DefaultErrors;

/** Gets a file's metadata or content by ID. If you provide the URL parameter `alt=media`, then the response includes the file contents in the response body. Downloading content with `alt=media` only works if the file is stored in Drive. To download Google Docs, Sheets, and Slides use [`files.export`](/workspace/drive/api/reference/rest/v2/files/export) instead. For more information, see [Download & export files](/workspace/drive/api/guides/manage-downloads). */
export const getFiles: API.OperationMethod<GetFilesRequest, GetFilesResponse, GetFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetFilesRequest,
  output: GetFilesResponse,
  errors: [],
}));

export interface InsertFilesRequest {
  /** Whether to convert this file to the corresponding Docs Editors format. */
  convert?: boolean;
  /** Deprecated: Creating files in multiple folders is no longer supported. */
  enforceSingleParent?: boolean;
  /** Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads. */
  ocr?: boolean;
  /** If ocr is true, hints at the language to use. Valid values are BCP 47 codes. */
  ocrLanguage?: string;
  /** Whether to pin the head revision of the uploaded file. A file can have a maximum of 200 pinned revisions. */
  pinned?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** The language of the timed text. */
  timedTextLanguage?: string;
  /** The timed text track name. */
  timedTextTrackName?: string;
  /** Whether to use the content as indexable text. */
  useContentAsIndexableText?: boolean;
  /** The visibility of the new file. Permissions are still inherited from parent folders. This parameter is only relevant when `convert=false`. */
  visibility?: "DEFAULT" | "PRIVATE" | (string & {});
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Request body */
  body?: File;
}

export const InsertFilesRequest = Schema.Struct({
  convert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("convert")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  ocr: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ocr")),
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  pinned: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pinned")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  timedTextLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("timedTextLanguage")),
  timedTextTrackName: Schema.optional(Schema.String).pipe(T.HttpQuery("timedTextTrackName")),
  useContentAsIndexableText: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useContentAsIndexableText")),
  visibility: Schema.optional(Schema.String).pipe(T.HttpQuery("visibility")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertFilesRequest>;

export type InsertFilesResponse = File;
export const InsertFilesResponse = File;

export type InsertFilesError = DefaultErrors;

/** Inserts a new file. This method supports an * /upload* URI and accepts uploaded media with the following characteristics: - *Maximum file size:* 5,120 GB - *Accepted Media MIME types:*`* /*` Note: Specify a valid MIME type, rather than the literal `* /*` value. The literal `* /*` is only used to indicate that any valid MIME type can be uploaded. For more information on uploading files, see [Upload file data](/workspace/drive/api/guides/manage-uploads). Apps creating shortcuts with `files.insert` must specify the MIME type `application/vnd.google-apps.shortcut`. Apps should specify a file extension in the `title` property when inserting files with the API. For example, an operation to insert a JPEG file should specify something like `"title": "cat.jpg"` in the metadata. Subsequent `GET` requests include the read-only `fileExtension` property populated with the extension originally specified in the `title` property. When a Google Drive user requests to download a file, or when the file is downloaded through the sync client, Drive builds a full filename (with extension) based on the title. In cases where the extension is missing, Drive attempts to determine the extension based on the file's MIME type. */
export const insertFiles: API.OperationMethod<InsertFilesRequest, InsertFilesResponse, InsertFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertFilesRequest,
  output: InsertFilesResponse,
  errors: [],
}));

export interface ListFilesRequest {
  /** Bodies of items (files/documents) to which the query applies. Supported bodies are `default`, `domain`, `drive` and `allDrives`. Prefer `default` or `drive` to `allDrives` for efficiency. */
  corpora?: string;
  /** Deprecated: The body of items (files/documents) to which the query applies. Use `corpora` instead. */
  corpus?: "DEFAULT" | "DOMAIN" | (string & {});
  /** ID of the shared drive to search. */
  driveId?: string;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** Deprecated: Use `includeItemsFromAllDrives` instead. */
  includeTeamDriveItems?: boolean;
  /** The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached. */
  maxResults?: number;
  /** A comma-separated list of sort keys. Valid keys are: * `createdDate`: When the file was created. * `folder`: The folder ID. This field is sorted using alphabetical ordering. * `lastViewedByMeDate`: The last time the file was viewed by the user. * `modifiedByMeDate`: The last time the file was modified by the user. * `modifiedDate`: The last time the file was modified by anyone. * `quotaBytesUsed`: The number of storage quota bytes used by the file. * `recency`: The most recent timestamp from the file's date-time fields. * `sharedWithMeDate`: When the file was shared with the user, if applicable. * `starred`: Whether the user has starred the file. * `title`: The title of the file. This field is sorted using alphabetical ordering, so 1, 12, 2, 22. * `title_natural`: The title of the file. This field is sorted using natural sort ordering, so 1, 2, 12, 22. Each key sorts ascending by default, but can be reversed with the 'desc' modifier. Example usage: `?orderBy=folder,modifiedDate desc,title`. Note that there's a current limitation for users with approximately one million files in which the requested sort order is ignored. */
  orderBy?: string;
  /** Page token for files. */
  pageToken?: string;
  /** Deprecated: This parameter has no function. */
  projection?: "BASIC" | "FULL" | (string & {});
  /** Query string for searching files. */
  q?: string;
  /** A comma-separated list of spaces to query. Supported values are `drive`, and `appDataFolder`. */
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
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
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

export type ListFilesError = DefaultErrors;

/** Lists the user's files. For more information, see [Search for files and folders](/workspace/drive/api/guides/search-files). This method accepts the `q` parameter, which is a search query combining one or more search terms. This method returns *all* files by default, including trashed files. If you don't want trashed files to appear in the list, use the `trashed=false` query parameter to remove trashed files from the results. */
export const listFiles: API.PaginatedOperationMethod<ListFilesRequest, ListFilesResponse, ListFilesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListFilesRequest,
  output: ListFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

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

export type ListLabelsFilesError = DefaultErrors;

/** Lists the labels on a file. */
export const listLabelsFiles: API.PaginatedOperationMethod<ListLabelsFilesRequest, ListLabelsFilesResponse, ListLabelsFilesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListLabelsFilesRequest,
  output: ListLabelsFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

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

export type ModifyLabelsFilesError = DefaultErrors;

/** Modifies the set of labels applied to a file. Returns a list of the labels that were added or modified. */
export const modifyLabelsFiles: API.OperationMethod<ModifyLabelsFilesRequest, ModifyLabelsFilesResponse, ModifyLabelsFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyLabelsFilesRequest,
  output: ModifyLabelsFilesResponse,
  errors: [],
}));

export interface PatchFilesRequest {
  /** The ID of the file to update. */
  fileId: string;
  /** Comma-separated list of parent IDs to add. */
  addParents?: string;
  /** Deprecated: This parameter has no function. */
  convert?: boolean;
  /** Deprecated: Adding files to multiple folders is no longer supported. Use `shortcuts` instead. */
  enforceSingleParent?: boolean;
  /** Determines the behavior in which `modifiedDate` is updated. This overrides `setModifiedDate`. */
  modifiedDateBehavior?: "fromBody" | "fromBodyIfNeeded" | "fromBodyOrNow" | "noChange" | "now" | "nowIfNeeded" | (string & {});
  /** Whether a blob upload should create a new revision. If false, the blob data in the current head revision is replaced. If true or not set, a new blob is created as head revision, and previous unpinned revisions are preserved for a short period of time. Pinned revisions are stored indefinitely, using additional storage quota, up to a maximum of 200 revisions. For details on how revisions are retained, see the [Drive Help Center](https://support.google.com/drive/answer/2409045). Note that this field is ignored if there is no payload in the request. */
  newRevision?: boolean;
  /** Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads. */
  ocr?: boolean;
  /** If ocr is true, hints at the language to use. Valid values are BCP 47 codes. */
  ocrLanguage?: string;
  /** Whether to pin the new revision. A file can have a maximum of 200 pinned revisions. Note that this field is ignored if there is no payload in the request. */
  pinned?: boolean;
  /** Comma-separated list of parent IDs to remove. */
  removeParents?: string;
  /** Whether to set the modified date using the value supplied in the request body. Setting this field to `true` is equivalent to `modifiedDateBehavior=fromBodyOrNow`, and `false` is equivalent to `modifiedDateBehavior=now`. To prevent any changes to the modified date set `modifiedDateBehavior=noChange`. */
  setModifiedDate?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** The language of the timed text. */
  timedTextLanguage?: string;
  /** The timed text track name. */
  timedTextTrackName?: string;
  /** Whether to update the view date after successfully updating the file. */
  updateViewedDate?: boolean;
  /** Whether to use the content as indexable text. */
  useContentAsIndexableText?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
  /** Request body */
  body?: File;
}

export const PatchFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  addParents: Schema.optional(Schema.String).pipe(T.HttpQuery("addParents")),
  convert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("convert")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  modifiedDateBehavior: Schema.optional(Schema.String).pipe(T.HttpQuery("modifiedDateBehavior")),
  newRevision: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("newRevision")),
  ocr: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ocr")),
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  pinned: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pinned")),
  removeParents: Schema.optional(Schema.String).pipe(T.HttpQuery("removeParents")),
  setModifiedDate: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("setModifiedDate")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  timedTextLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("timedTextLanguage")),
  timedTextTrackName: Schema.optional(Schema.String).pipe(T.HttpQuery("timedTextTrackName")),
  updateViewedDate: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("updateViewedDate")),
  useContentAsIndexableText: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useContentAsIndexableText")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFilesRequest>;

export type PatchFilesResponse = File;
export const PatchFilesResponse = File;

export type PatchFilesError = DefaultErrors;

/** Updates a file's metadata and/or content. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might change automatically, such as modifiedDate. This method supports patch semantics. */
export const patchFiles: API.OperationMethod<PatchFilesRequest, PatchFilesResponse, PatchFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFilesRequest,
  output: PatchFilesResponse,
  errors: [],
}));

export interface TouchFilesRequest {
  /** The ID of the file to update. */
  fileId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
}

export const TouchFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/touch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TouchFilesRequest>;

export type TouchFilesResponse = File;
export const TouchFilesResponse = File;

export type TouchFilesError = DefaultErrors;

/** Set the file's updated time to the current server time. */
export const touchFiles: API.OperationMethod<TouchFilesRequest, TouchFilesResponse, TouchFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TouchFilesRequest,
  output: TouchFilesResponse,
  errors: [],
}));

export interface TrashFilesRequest {
  /** The ID of the file to trash. */
  fileId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
}

export const TrashFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/trash", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TrashFilesRequest>;

export type TrashFilesResponse = File;
export const TrashFilesResponse = File;

export type TrashFilesError = DefaultErrors;

/** Moves a file to the trash. The currently authenticated user must own the file or be at least a `fileOrganizer` on the parent for shared drive files. */
export const trashFiles: API.OperationMethod<TrashFilesRequest, TrashFilesResponse, TrashFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TrashFilesRequest,
  output: TrashFilesResponse,
  errors: [],
}));

export interface UntrashFilesRequest {
  /** The ID of the file to untrash. */
  fileId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** A comma-separated list of IDs of labels to include in the `labelInfo` part of the response. */
  includeLabels?: string;
}

export const UntrashFilesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/untrash", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UntrashFilesRequest>;

export type UntrashFilesResponse = File;
export const UntrashFilesResponse = File;

export type UntrashFilesError = DefaultErrors;

/** Restores a file from the trash. The currently authenticated user must own the file or be at least a `fileOrganizer` on the parent for shared drive files. */
export const untrashFiles: API.OperationMethod<UntrashFilesRequest, UntrashFilesResponse, UntrashFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UntrashFilesRequest,
  output: UntrashFilesResponse,
  errors: [],
}));

export interface UpdateFilesRequest {
  /** The ID of the file to update. */
  fileId: string;
  /** Comma-separated list of parent IDs to add. */
  addParents?: string;
  /** Deprecated: This parameter has no function. */
  convert?: boolean;
  /** Deprecated: Adding files to multiple folders is no longer supported. Use `shortcuts` instead. */
  enforceSingleParent?: boolean;
  /** Determines the behavior in which `modifiedDate` is updated. This overrides `setModifiedDate`. */
  modifiedDateBehavior?: "fromBody" | "fromBodyIfNeeded" | "fromBodyOrNow" | "noChange" | "now" | "nowIfNeeded" | (string & {});
  /** Whether a blob upload should create a new revision. If false, the blob data in the current head revision is replaced. If true or not set, a new blob is created as head revision, and previous unpinned revisions are preserved for a short period of time. Pinned revisions are stored indefinitely, using additional storage quota, up to a maximum of 200 revisions. For details on how revisions are retained, see the [Drive Help Center](https://support.google.com/drive/answer/2409045). */
  newRevision?: boolean;
  /** Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads. */
  ocr?: boolean;
  /** If ocr is true, hints at the language to use. Valid values are BCP 47 codes. */
  ocrLanguage?: string;
  /** Whether to pin the new revision. A file can have a maximum of 200 pinned revisions. */
  pinned?: boolean;
  /** Comma-separated list of parent IDs to remove. */
  removeParents?: string;
  /** Whether to set the modified date using the value supplied in the request body. Setting this field to `true` is equivalent to `modifiedDateBehavior=fromBodyOrNow`, and `false` is equivalent to `modifiedDateBehavior=now`. To prevent any changes to the modified date set `modifiedDateBehavior=noChange`. */
  setModifiedDate?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** The language of the timed text. */
  timedTextLanguage?: string;
  /** The timed text track name. */
  timedTextTrackName?: string;
  /** Whether to update the view date after successfully updating the file. */
  updateViewedDate?: boolean;
  /** Whether to use the content as indexable text. */
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
  convert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("convert")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  modifiedDateBehavior: Schema.optional(Schema.String).pipe(T.HttpQuery("modifiedDateBehavior")),
  newRevision: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("newRevision")),
  ocr: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ocr")),
  ocrLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("ocrLanguage")),
  pinned: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pinned")),
  removeParents: Schema.optional(Schema.String).pipe(T.HttpQuery("removeParents")),
  setModifiedDate: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("setModifiedDate")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  timedTextLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("timedTextLanguage")),
  timedTextTrackName: Schema.optional(Schema.String).pipe(T.HttpQuery("timedTextTrackName")),
  updateViewedDate: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("updateViewedDate")),
  useContentAsIndexableText: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useContentAsIndexableText")),
  includePermissionsForView: Schema.optional(Schema.String).pipe(T.HttpQuery("includePermissionsForView")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(File).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "files/{fileId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateFilesRequest>;

export type UpdateFilesResponse = File;
export const UpdateFilesResponse = File;

export type UpdateFilesError = DefaultErrors;

/** Updates a file's metadata, content, or both. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might be changed automatically, such as `modifiedDate`. This method supports patch semantics. This method supports an * /upload* URI and accepts uploaded media with the following characteristics: - *Maximum file size:* 5,120 GB - *Accepted Media MIME types:* `* /*` (Specify a valid MIME type, rather than the literal `* /*` value. The literal `* /*` is only used to indicate that any valid MIME type can be uploaded. For more information, see [Google Workspace and Google Drive supported MIME types](/workspace/drive/api/guides/mime-types).) For more information on uploading files, see [Upload file data](/workspace/drive/api/guides/manage-uploads). */
export const updateFiles: API.OperationMethod<UpdateFilesRequest, UpdateFilesResponse, UpdateFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateFilesRequest,
  output: UpdateFilesResponse,
  errors: [],
}));

export interface WatchFilesRequest {
  /** The ID for the file in question. */
  fileId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when the `alt` parameter is set to `media` and the user is the owner of the file or an organizer of the shared drive in which the file resides. */
  acknowledgeAbuse?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
  /** Specifies the Revision ID that should be downloaded. Ignored unless alt=media is specified. */
  revisionId?: string;
  /** Deprecated: Use files.update with modifiedDateBehavior=noChange, updateViewedDate=true and an empty request body. */
  updateViewedDate?: boolean;
  /** Deprecated: This parameter has no function. */
  projection?: "BASIC" | "FULL" | (string & {});
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
  revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
  updateViewedDate: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("updateViewedDate")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  includeLabels: Schema.optional(Schema.String).pipe(T.HttpQuery("includeLabels")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchFilesRequest>;

export type WatchFilesResponse = Channel;
export const WatchFilesResponse = Channel;

export type WatchFilesError = DefaultErrors;

/** Subscribes to changes to a file. */
export const watchFiles: API.OperationMethod<WatchFilesRequest, WatchFilesResponse, WatchFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: WatchFilesRequest,
  output: WatchFilesResponse,
  errors: [],
}));

export interface DeleteParentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the parent. */
  parentId: string;
  /** Deprecated: If an item is not in a shared drive and its last parent is removed, the item is placed under its owner's root. */
  enforceSingleParent?: boolean;
}

export const DeleteParentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  parentId: Schema.String.pipe(T.HttpPath("parentId")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}/parents/{parentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteParentsRequest>;

export interface DeleteParentsResponse {}
export const DeleteParentsResponse: Schema.Schema<DeleteParentsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteParentsResponse>;

export type DeleteParentsError = DefaultErrors;

/** Removes a parent from a file. */
export const deleteParents: API.OperationMethod<DeleteParentsRequest, DeleteParentsResponse, DeleteParentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteParentsRequest,
  output: DeleteParentsResponse,
  errors: [],
}));

export interface GetParentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the parent. */
  parentId: string;
}

export const GetParentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  parentId: Schema.String.pipe(T.HttpPath("parentId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/parents/{parentId}" }),
  svc,
) as unknown as Schema.Schema<GetParentsRequest>;

export type GetParentsResponse = ParentReference;
export const GetParentsResponse = ParentReference;

export type GetParentsError = DefaultErrors;

/** Gets a specific parent reference. */
export const getParents: API.OperationMethod<GetParentsRequest, GetParentsResponse, GetParentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetParentsRequest,
  output: GetParentsResponse,
  errors: [],
}));

export interface InsertParentsRequest {
  /** The ID of the file. */
  fileId: string;
  /** Deprecated: Adding files to multiple folders is no longer supported. Use `shortcuts` instead. */
  enforceSingleParent?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Request body */
  body?: ParentReference;
}

export const InsertParentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  body: Schema.optional(ParentReference).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/parents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertParentsRequest>;

export type InsertParentsResponse = ParentReference;
export const InsertParentsResponse = ParentReference;

export type InsertParentsError = DefaultErrors;

/** Adds a parent folder for a file. */
export const insertParents: API.OperationMethod<InsertParentsRequest, InsertParentsResponse, InsertParentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertParentsRequest,
  output: InsertParentsResponse,
  errors: [],
}));

export interface ListParentsRequest {
  /** The ID of the file. */
  fileId: string;
}

export const ListParentsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/parents" }),
  svc,
) as unknown as Schema.Schema<ListParentsRequest>;

export type ListParentsResponse = ParentList;
export const ListParentsResponse = ParentList;

export type ListParentsError = DefaultErrors;

/** Lists a file's parents. */
export const listParents: API.OperationMethod<ListParentsRequest, ListParentsResponse, ListParentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListParentsRequest,
  output: ListParentsResponse,
  errors: [],
}));

export interface DeletePermissionsRequest {
  /** The ID for the file or shared drive. */
  fileId: string;
  /** The ID for the permission. */
  permissionId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
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

export type DeletePermissionsError = DefaultErrors;

/** Deletes a permission from a file or shared drive. **Warning:** Concurrent permissions operations on the same file are not supported; only the last update is applied. */
export const deletePermissions: API.OperationMethod<DeletePermissionsRequest, DeletePermissionsResponse, DeletePermissionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePermissionsRequest,
  output: DeletePermissionsResponse,
  errors: [],
}));

export interface GetPermissionsRequest {
  /** The ID for the file or shared drive. */
  fileId: string;
  /** The ID for the permission. */
  permissionId: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
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

export type GetPermissionsError = DefaultErrors;

/** Gets a permission by ID. */
export const getPermissions: API.OperationMethod<GetPermissionsRequest, GetPermissionsResponse, GetPermissionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetPermissionsRequest,
  output: GetPermissionsResponse,
  errors: [],
}));

export interface GetIdForEmailPermissionsRequest {
  /** The email address for which to return a permission ID */
  email: string;
}

export const GetIdForEmailPermissionsRequest = Schema.Struct({
  email: Schema.String.pipe(T.HttpPath("email")),
}).pipe(
  T.Http({ method: "GET", path: "permissionIds/{email}" }),
  svc,
) as unknown as Schema.Schema<GetIdForEmailPermissionsRequest>;

export type GetIdForEmailPermissionsResponse = PermissionId;
export const GetIdForEmailPermissionsResponse = PermissionId;

export type GetIdForEmailPermissionsError = DefaultErrors;

/** Returns the permission ID for an email address. */
export const getIdForEmailPermissions: API.OperationMethod<GetIdForEmailPermissionsRequest, GetIdForEmailPermissionsResponse, GetIdForEmailPermissionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIdForEmailPermissionsRequest,
  output: GetIdForEmailPermissionsResponse,
  errors: [],
}));

export interface InsertPermissionsRequest {
  /** The ID for the file or shared drive. */
  fileId: string;
  /** A plain text custom message to include in notification emails. */
  emailMessage?: string;
  /** Deprecated: See `moveToNewOwnersRoot` for details. */
  enforceSingleParent?: boolean;
  /** This parameter will only take effect if the item is not in a shared drive and the request is attempting to transfer the ownership of the item. If set to `true`, the item will be moved to the new owner's My Drive root folder and all prior parents removed. If set to `false`, parents are not changed. */
  moveToNewOwnersRoot?: boolean;
  /** Whether to send notification emails when sharing to users or groups. This parameter is ignored and an email is sent if the `role` is `owner`. */
  sendNotificationEmails?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
  /** Whether the request should enforce expansive access rules. */
  enforceExpansiveAccess?: boolean;
  /** Request body */
  body?: Permission;
}

export const InsertPermissionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  emailMessage: Schema.optional(Schema.String).pipe(T.HttpQuery("emailMessage")),
  enforceSingleParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleParent")),
  moveToNewOwnersRoot: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("moveToNewOwnersRoot")),
  sendNotificationEmails: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotificationEmails")),
  supportsAllDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAllDrives")),
  supportsTeamDrives: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsTeamDrives")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
  enforceExpansiveAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceExpansiveAccess")),
  body: Schema.optional(Permission).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/permissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPermissionsRequest>;

export type InsertPermissionsResponse = Permission;
export const InsertPermissionsResponse = Permission;

export type InsertPermissionsError = DefaultErrors;

/** Inserts a permission for a file or shared drive. **Warning:** Concurrent permissions operations on the same file are not supported; only the last update is applied. */
export const insertPermissions: API.OperationMethod<InsertPermissionsRequest, InsertPermissionsResponse, InsertPermissionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPermissionsRequest,
  output: InsertPermissionsResponse,
  errors: [],
}));

export interface ListPermissionsRequest {
  /** The ID for the file or shared drive. */
  fileId: string;
  /** The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned. */
  maxResults?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
  /** Specifies which additional view's permissions to include in the response. Only `published` is supported. */
  includePermissionsForView?: string;
}

export const ListPermissionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
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

export type ListPermissionsError = DefaultErrors;

/** Lists a file's or shared drive's permissions. */
export const listPermissions: API.PaginatedOperationMethod<ListPermissionsRequest, ListPermissionsResponse, ListPermissionsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListPermissionsRequest,
  output: ListPermissionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface PatchPermissionsRequest {
  /** The ID for the file or shared drive. */
  fileId: string;
  /** The ID for the permission. */
  permissionId: string;
  /** Whether to remove the expiration date. */
  removeExpiration?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether changing a role to `owner` downgrades the current owners to writers. Does nothing if the specified role is not `owner`. */
  transferOwnership?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
  /** Whether the request should enforce expansive access rules. */
  enforceExpansiveAccess?: boolean;
  /** Request body */
  body?: Permission;
}

export const PatchPermissionsRequest = Schema.Struct({
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
) as unknown as Schema.Schema<PatchPermissionsRequest>;

export type PatchPermissionsResponse = Permission;
export const PatchPermissionsResponse = Permission;

export type PatchPermissionsError = DefaultErrors;

/** Updates a permission using patch semantics. **Warning:** Concurrent permissions operations on the same file are not supported; only the last update is applied. */
export const patchPermissions: API.OperationMethod<PatchPermissionsRequest, PatchPermissionsResponse, PatchPermissionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPermissionsRequest,
  output: PatchPermissionsResponse,
  errors: [],
}));

export interface UpdatePermissionsRequest {
  /** The ID for the file or shared drive. */
  fileId: string;
  /** The ID for the permission. */
  permissionId: string;
  /** Whether to remove the expiration date. */
  removeExpiration?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated: Use `supportsAllDrives` instead. */
  supportsTeamDrives?: boolean;
  /** Whether changing a role to `owner` downgrades the current owners to writers. Does nothing if the specified role is not `owner`. */
  transferOwnership?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
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
  T.Http({ method: "PUT", path: "files/{fileId}/permissions/{permissionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePermissionsRequest>;

export type UpdatePermissionsResponse = Permission;
export const UpdatePermissionsResponse = Permission;

export type UpdatePermissionsError = DefaultErrors;

/** Updates a permission. **Warning:** Concurrent permissions operations on the same file are not supported; only the last update is applied. */
export const updatePermissions: API.OperationMethod<UpdatePermissionsRequest, UpdatePermissionsResponse, UpdatePermissionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePermissionsRequest,
  output: UpdatePermissionsResponse,
  errors: [],
}));

export interface DeletePropertiesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The key of the property. */
  propertyKey: string;
  /** The visibility of the property. */
  visibility?: string;
}

export const DeletePropertiesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  propertyKey: Schema.String.pipe(T.HttpPath("propertyKey")),
  visibility: Schema.optional(Schema.String).pipe(T.HttpQuery("visibility")),
}).pipe(
  T.Http({ method: "DELETE", path: "files/{fileId}/properties/{propertyKey}" }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesRequest>;

export interface DeletePropertiesResponse {}
export const DeletePropertiesResponse: Schema.Schema<DeletePropertiesResponse> = Schema.Struct({}) as any as Schema.Schema<DeletePropertiesResponse>;

export type DeletePropertiesError = DefaultErrors;

/** Deletes a property. */
export const deleteProperties: API.OperationMethod<DeletePropertiesRequest, DeletePropertiesResponse, DeletePropertiesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePropertiesRequest,
  output: DeletePropertiesResponse,
  errors: [],
}));

export interface GetPropertiesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The key of the property. */
  propertyKey: string;
  /** The visibility of the property. */
  visibility?: string;
}

export const GetPropertiesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  propertyKey: Schema.String.pipe(T.HttpPath("propertyKey")),
  visibility: Schema.optional(Schema.String).pipe(T.HttpQuery("visibility")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/properties/{propertyKey}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesRequest>;

export type GetPropertiesResponse = Property;
export const GetPropertiesResponse = Property;

export type GetPropertiesError = DefaultErrors;

/** Gets a property by its key. */
export const getProperties: API.OperationMethod<GetPropertiesRequest, GetPropertiesResponse, GetPropertiesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetPropertiesRequest,
  output: GetPropertiesResponse,
  errors: [],
}));

export interface InsertPropertiesRequest {
  /** The ID of the file. */
  fileId: string;
  /** Request body */
  body?: Property;
}

export const InsertPropertiesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  body: Schema.optional(Property).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/properties", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPropertiesRequest>;

export type InsertPropertiesResponse = Property;
export const InsertPropertiesResponse = Property;

export type InsertPropertiesError = DefaultErrors;

/** Adds a property to a file, or updates it if it already exists. */
export const insertProperties: API.OperationMethod<InsertPropertiesRequest, InsertPropertiesResponse, InsertPropertiesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPropertiesRequest,
  output: InsertPropertiesResponse,
  errors: [],
}));

export interface ListPropertiesRequest {
  /** The ID of the file. */
  fileId: string;
}

export const ListPropertiesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/properties" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesRequest>;

export type ListPropertiesResponse = PropertyList;
export const ListPropertiesResponse = PropertyList;

export type ListPropertiesError = DefaultErrors;

/** Lists a file's properties. */
export const listProperties: API.OperationMethod<ListPropertiesRequest, ListPropertiesResponse, ListPropertiesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListPropertiesRequest,
  output: ListPropertiesResponse,
  errors: [],
}));

export interface PatchPropertiesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The key of the property. */
  propertyKey: string;
  /** The visibility of the property. Allowed values are PRIVATE and PUBLIC. (Default: PRIVATE) */
  visibility?: string;
  /** Request body */
  body?: Property;
}

export const PatchPropertiesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  propertyKey: Schema.String.pipe(T.HttpPath("propertyKey")),
  visibility: Schema.optional(Schema.String).pipe(T.HttpQuery("visibility")),
  body: Schema.optional(Property).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}/properties/{propertyKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesRequest>;

export type PatchPropertiesResponse = Property;
export const PatchPropertiesResponse = Property;

export type PatchPropertiesError = DefaultErrors;

/** Updates a property. */
export const patchProperties: API.OperationMethod<PatchPropertiesRequest, PatchPropertiesResponse, PatchPropertiesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPropertiesRequest,
  output: PatchPropertiesResponse,
  errors: [],
}));

export interface UpdatePropertiesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The key of the property. */
  propertyKey: string;
  /** The visibility of the property. Allowed values are PRIVATE and PUBLIC. (Default: PRIVATE) */
  visibility?: string;
  /** Request body */
  body?: Property;
}

export const UpdatePropertiesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  propertyKey: Schema.String.pipe(T.HttpPath("propertyKey")),
  visibility: Schema.optional(Schema.String).pipe(T.HttpQuery("visibility")),
  body: Schema.optional(Property).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "files/{fileId}/properties/{propertyKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePropertiesRequest>;

export type UpdatePropertiesResponse = Property;
export const UpdatePropertiesResponse = Property;

export type UpdatePropertiesError = DefaultErrors;

/** Updates a property. */
export const updateProperties: API.OperationMethod<UpdatePropertiesRequest, UpdatePropertiesResponse, UpdatePropertiesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePropertiesRequest,
  output: UpdatePropertiesResponse,
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

export type DeleteRepliesError = DefaultErrors;

/** Deletes a reply. */
export const deleteReplies: API.OperationMethod<DeleteRepliesRequest, DeleteRepliesResponse, DeleteRepliesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRepliesRequest,
  output: DeleteRepliesResponse,
  errors: [],
}));

export interface GetRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** If set, this will succeed when retrieving a deleted reply. */
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

export type GetRepliesResponse = CommentReply;
export const GetRepliesResponse = CommentReply;

export type GetRepliesError = DefaultErrors;

/** Gets a reply. */
export const getReplies: API.OperationMethod<GetRepliesRequest, GetRepliesResponse, GetRepliesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetRepliesRequest,
  output: GetRepliesResponse,
  errors: [],
}));

export interface InsertRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** Request body */
  body?: CommentReply;
}

export const InsertRepliesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  body: Schema.optional(CommentReply).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "files/{fileId}/comments/{commentId}/replies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertRepliesRequest>;

export type InsertRepliesResponse = CommentReply;
export const InsertRepliesResponse = CommentReply;

export type InsertRepliesError = DefaultErrors;

/** Creates a new reply to the given comment. */
export const insertReplies: API.OperationMethod<InsertRepliesRequest, InsertRepliesResponse, InsertRepliesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertRepliesRequest,
  output: InsertRepliesResponse,
  errors: [],
}));

export interface ListRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** If set, all replies, including deleted replies (with content stripped) will be returned. */
  includeDeleted?: boolean;
  /** The maximum number of replies to include in the response, used for paging. */
  maxResults?: number;
  /** The continuation token, used to page through large result sets. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response. */
  pageToken?: string;
}

export const ListRepliesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/comments/{commentId}/replies" }),
  svc,
) as unknown as Schema.Schema<ListRepliesRequest>;

export type ListRepliesResponse = CommentReplyList;
export const ListRepliesResponse = CommentReplyList;

export type ListRepliesError = DefaultErrors;

/** Lists all of the replies to a comment. */
export const listReplies: API.PaginatedOperationMethod<ListRepliesRequest, ListRepliesResponse, ListRepliesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListRepliesRequest,
  output: ListRepliesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface PatchRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** Request body */
  body?: CommentReply;
}

export const PatchRepliesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  replyId: Schema.String.pipe(T.HttpPath("replyId")),
  body: Schema.optional(CommentReply).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}/comments/{commentId}/replies/{replyId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchRepliesRequest>;

export type PatchRepliesResponse = CommentReply;
export const PatchRepliesResponse = CommentReply;

export type PatchRepliesError = DefaultErrors;

/** Updates an existing reply. */
export const patchReplies: API.OperationMethod<PatchRepliesRequest, PatchRepliesResponse, PatchRepliesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchRepliesRequest,
  output: PatchRepliesResponse,
  errors: [],
}));

export interface UpdateRepliesRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** Request body */
  body?: CommentReply;
}

export const UpdateRepliesRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  replyId: Schema.String.pipe(T.HttpPath("replyId")),
  body: Schema.optional(CommentReply).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "files/{fileId}/comments/{commentId}/replies/{replyId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRepliesRequest>;

export type UpdateRepliesResponse = CommentReply;
export const UpdateRepliesResponse = CommentReply;

export type UpdateRepliesError = DefaultErrors;

/** Updates an existing reply. */
export const updateReplies: API.OperationMethod<UpdateRepliesRequest, UpdateRepliesResponse, UpdateRepliesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRepliesRequest,
  output: UpdateRepliesResponse,
  errors: [],
}));

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

export type DeleteRevisionsError = DefaultErrors;

/** Permanently deletes a file version. You can only delete revisions for files with binary content, like images or videos. Revisions for other files, like Google Docs or Sheets, and the last remaining file version can't be deleted. */
export const deleteRevisions: API.OperationMethod<DeleteRevisionsRequest, DeleteRevisionsResponse, DeleteRevisionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRevisionsRequest,
  output: DeleteRevisionsResponse,
  errors: [],
}));

export interface GetRevisionsRequest {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the revision. */
  revisionId: string;
}

export const GetRevisionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  revisionId: Schema.String.pipe(T.HttpPath("revisionId")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/revisions/{revisionId}" }),
  svc,
) as unknown as Schema.Schema<GetRevisionsRequest>;

export type GetRevisionsResponse = Revision;
export const GetRevisionsResponse = Revision;

export type GetRevisionsError = DefaultErrors;

/** Gets a specific revision. */
export const getRevisions: API.OperationMethod<GetRevisionsRequest, GetRevisionsResponse, GetRevisionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetRevisionsRequest,
  output: GetRevisionsResponse,
  errors: [],
}));

export interface ListRevisionsRequest {
  /** The ID of the file. */
  fileId: string;
  /** Maximum number of revisions to return. */
  maxResults?: number;
  /** Page token for revisions. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response. */
  pageToken?: string;
}

export const ListRevisionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "files/{fileId}/revisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsRequest>;

export type ListRevisionsResponse = RevisionList;
export const ListRevisionsResponse = RevisionList;

export type ListRevisionsError = DefaultErrors;

/** Lists a file's revisions. **Important:** The list of revisions returned by this method might be incomplete for files with a large revision history, including frequently edited Google Docs, Sheets, and Slides. Older revisions might be omitted from the response, meaning the first revision returned may not be the oldest existing revision. The revision history visible in the Workspace editor user interface might be more complete than the list returned by the API. */
export const listRevisions: API.PaginatedOperationMethod<ListRevisionsRequest, ListRevisionsResponse, ListRevisionsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListRevisionsRequest,
  output: ListRevisionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface PatchRevisionsRequest {
  /** The ID for the file. */
  fileId: string;
  /** The ID for the revision. */
  revisionId: string;
  /** Request body */
  body?: Revision;
}

export const PatchRevisionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  revisionId: Schema.String.pipe(T.HttpPath("revisionId")),
  body: Schema.optional(Revision).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "files/{fileId}/revisions/{revisionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchRevisionsRequest>;

export type PatchRevisionsResponse = Revision;
export const PatchRevisionsResponse = Revision;

export type PatchRevisionsError = DefaultErrors;

/** Updates a revision. */
export const patchRevisions: API.OperationMethod<PatchRevisionsRequest, PatchRevisionsResponse, PatchRevisionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchRevisionsRequest,
  output: PatchRevisionsResponse,
  errors: [],
}));

export interface UpdateRevisionsRequest {
  /** The ID for the file. */
  fileId: string;
  /** The ID for the revision. */
  revisionId: string;
  /** Request body */
  body?: Revision;
}

export const UpdateRevisionsRequest = Schema.Struct({
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
  revisionId: Schema.String.pipe(T.HttpPath("revisionId")),
  body: Schema.optional(Revision).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "files/{fileId}/revisions/{revisionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRevisionsRequest>;

export type UpdateRevisionsResponse = Revision;
export const UpdateRevisionsResponse = Revision;

export type UpdateRevisionsError = DefaultErrors;

/** Updates a revision. */
export const updateRevisions: API.OperationMethod<UpdateRevisionsRequest, UpdateRevisionsResponse, UpdateRevisionsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRevisionsRequest,
  output: UpdateRevisionsResponse,
  errors: [],
}));

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

export type DeleteTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.delete` instead. */
export const deleteTeamdrives: API.OperationMethod<DeleteTeamdrivesRequest, DeleteTeamdrivesResponse, DeleteTeamdrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTeamdrivesRequest,
  output: DeleteTeamdrivesResponse,
  errors: [],
}));

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

export type GetTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.get` instead. */
export const getTeamdrives: API.OperationMethod<GetTeamdrivesRequest, GetTeamdrivesResponse, GetTeamdrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetTeamdrivesRequest,
  output: GetTeamdrivesResponse,
  errors: [],
}));

export interface InsertTeamdrivesRequest {
  /** Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned. */
  requestId: string;
  /** Request body */
  body?: TeamDrive;
}

export const InsertTeamdrivesRequest = Schema.Struct({
  requestId: Schema.String.pipe(T.HttpQuery("requestId")),
  body: Schema.optional(TeamDrive).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "teamdrives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertTeamdrivesRequest>;

export type InsertTeamdrivesResponse = TeamDrive;
export const InsertTeamdrivesResponse = TeamDrive;

export type InsertTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.insert` instead. */
export const insertTeamdrives: API.OperationMethod<InsertTeamdrivesRequest, InsertTeamdrivesResponse, InsertTeamdrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertTeamdrivesRequest,
  output: InsertTeamdrivesResponse,
  errors: [],
}));

export interface ListTeamdrivesRequest {
  /** Maximum number of Team Drives to return. */
  maxResults?: number;
  /** Page token for Team Drives. */
  pageToken?: string;
  /** Query string for searching Team Drives. */
  q?: string;
  /** Issue the request as a domain administrator; if set to true, then all Team Drives of the domain in which the requester is an administrator are returned. */
  useDomainAdminAccess?: boolean;
}

export const ListTeamdrivesRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  useDomainAdminAccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useDomainAdminAccess")),
}).pipe(
  T.Http({ method: "GET", path: "teamdrives" }),
  svc,
) as unknown as Schema.Schema<ListTeamdrivesRequest>;

export type ListTeamdrivesResponse = TeamDriveList;
export const ListTeamdrivesResponse = TeamDriveList;

export type ListTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.list` instead. */
export const listTeamdrives: API.PaginatedOperationMethod<ListTeamdrivesRequest, ListTeamdrivesResponse, ListTeamdrivesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListTeamdrivesRequest,
  output: ListTeamdrivesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

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
  T.Http({ method: "PUT", path: "teamdrives/{teamDriveId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateTeamdrivesRequest>;

export type UpdateTeamdrivesResponse = TeamDrive;
export const UpdateTeamdrivesResponse = TeamDrive;

export type UpdateTeamdrivesError = DefaultErrors;

/** Deprecated: Use `drives.update` instead. */
export const updateTeamdrives: API.OperationMethod<UpdateTeamdrivesRequest, UpdateTeamdrivesResponse, UpdateTeamdrivesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateTeamdrivesRequest,
  output: UpdateTeamdrivesResponse,
  errors: [],
}));

