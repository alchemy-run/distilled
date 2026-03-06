// ==========================================================================
// Drive Activity API (driveactivity v2)
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
  name: "driveactivity",
  version: "v2",
  rootUrl: "https://driveactivity.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Group {
  /** The email address of the group. */
  email?: string;
  /** The title of the group. */
  title?: string;
}

export const Group: Schema.Schema<Group> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface DeletedUser {
}

export const DeletedUser: Schema.Schema<DeletedUser> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeletedUser" }) as any as Schema.Schema<DeletedUser>;

export interface UnknownUser {
}

export const UnknownUser: Schema.Schema<UnknownUser> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UnknownUser" }) as any as Schema.Schema<UnknownUser>;

export interface KnownUser {
  /** True if this is the user making the request. */
  isCurrentUser?: boolean;
  /** The identifier for this user that can be used with the People API to get more information. The format is `people/ACCOUNT_ID`. See https://developers.google.com/people/. */
  personName?: string;
}

export const KnownUser: Schema.Schema<KnownUser> = Schema.suspend(() => Schema.Struct({
  isCurrentUser: Schema.optional(Schema.Boolean),
  personName: Schema.optional(Schema.String),
})).annotate({ identifier: "KnownUser" }) as any as Schema.Schema<KnownUser>;

export interface User {
  /** A user whose account has since been deleted. */
  deletedUser?: DeletedUser;
  /** A user about whom nothing is currently known. */
  unknownUser?: UnknownUser;
  /** A known user. */
  knownUser?: KnownUser;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  deletedUser: Schema.optional(DeletedUser),
  unknownUser: Schema.optional(UnknownUser),
  knownUser: Schema.optional(KnownUser),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface Assignment {
  /** The sub-type of this event. */
  subtype?: "SUBTYPE_UNSPECIFIED" | "ADDED" | "DELETED" | "REPLY_ADDED" | "REPLY_DELETED" | "RESOLVED" | "REOPENED" | "REASSIGNED" | (string & {});
  /** The user to whom the comment was assigned. */
  assignedUser?: User;
}

export const Assignment: Schema.Schema<Assignment> = Schema.suspend(() => Schema.Struct({
  subtype: Schema.optional(Schema.String),
  assignedUser: Schema.optional(User),
})).annotate({ identifier: "Assignment" }) as any as Schema.Schema<Assignment>;

export interface Legacy {
}

export const Legacy: Schema.Schema<Legacy> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Legacy" }) as any as Schema.Schema<Legacy>;

export interface NoConsolidation {
}

export const NoConsolidation: Schema.Schema<NoConsolidation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "NoConsolidation" }) as any as Schema.Schema<NoConsolidation>;

export interface ConsolidationStrategy {
  /** The individual activities are consolidated using the legacy strategy. */
  legacy?: Legacy;
  /** The individual activities are not consolidated. */
  none?: NoConsolidation;
}

export const ConsolidationStrategy: Schema.Schema<ConsolidationStrategy> = Schema.suspend(() => Schema.Struct({
  legacy: Schema.optional(Legacy),
  none: Schema.optional(NoConsolidation),
})).annotate({ identifier: "ConsolidationStrategy" }) as any as Schema.Schema<ConsolidationStrategy>;

export interface QueryDriveActivityRequest {
  /** Details on how to consolidate related actions that make up the activity. If not set, then related actions aren't consolidated. */
  consolidationStrategy?: ConsolidationStrategy;
  /** The token identifies which page of results to return. Set this to the next_page_token value returned from a previous query to obtain the following page of results. If not set, the first page of results is returned. */
  pageToken?: string;
  /** Return activities for this Drive item. The format is `items/ITEM_ID`. */
  itemName?: string;
  /** Return activities for this Drive folder, plus all children and descendants. The format is `items/ITEM_ID`. */
  ancestorName?: string;
  /** The minimum number of activities desired in the response; the server attempts to return at least this quantity. The server may also return fewer activities if it has a partial response ready before the request times out. If not set, a default value is used. */
  pageSize?: number;
  /** The filtering for items returned from this query request. The format of the filter string is a sequence of expressions, joined by an optional "AND", where each expression is of the form "field operator value". Supported fields: - `time`: Uses numerical operators on date values either in terms of milliseconds since Jan 1, 1970 or in RFC 3339 format. Examples: - `time > 1452409200000 AND time <= 1492812924310` - `time >= "2016-01-10T01:02:03-05:00"` - `detail.action_detail_case`: Uses the "has" operator (:) and either a singular value or a list of allowed action types enclosed in parentheses, separated by a space. To exclude a result from the response, prepend a hyphen (`-`) to the beginning of the filter string. Examples: - `detail.action_detail_case:RENAME` - `detail.action_detail_case:(CREATE RESTORE)` - `-detail.action_detail_case:MOVE` */
  filter?: string;
}

export const QueryDriveActivityRequest: Schema.Schema<QueryDriveActivityRequest> = Schema.suspend(() => Schema.Struct({
  consolidationStrategy: Schema.optional(ConsolidationStrategy),
  pageToken: Schema.optional(Schema.String),
  itemName: Schema.optional(Schema.String),
  ancestorName: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryDriveActivityRequest" }) as any as Schema.Schema<QueryDriveActivityRequest>;

export interface DriveReference {
  /** The resource name of the shared drive. The format is `COLLECTION_ID/DRIVE_ID`. Clients should not assume a specific collection ID for this resource name. */
  name?: string;
  /** The title of the shared drive. */
  title?: string;
}

export const DriveReference: Schema.Schema<DriveReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveReference" }) as any as Schema.Schema<DriveReference>;

export interface Post {
  /** The sub-type of this event. */
  subtype?: "SUBTYPE_UNSPECIFIED" | "ADDED" | "DELETED" | "REPLY_ADDED" | "REPLY_DELETED" | "RESOLVED" | "REOPENED" | (string & {});
}

export const Post: Schema.Schema<Post> = Schema.suspend(() => Schema.Struct({
  subtype: Schema.optional(Schema.String),
})).annotate({ identifier: "Post" }) as any as Schema.Schema<Post>;

export interface Suggestion {
  /** The sub-type of this event. */
  subtype?: "SUBTYPE_UNSPECIFIED" | "ADDED" | "DELETED" | "REPLY_ADDED" | "REPLY_DELETED" | "ACCEPTED" | "REJECTED" | "ACCEPT_DELETED" | "REJECT_DELETED" | (string & {});
}

export const Suggestion: Schema.Schema<Suggestion> = Schema.suspend(() => Schema.Struct({
  subtype: Schema.optional(Schema.String),
})).annotate({ identifier: "Suggestion" }) as any as Schema.Schema<Suggestion>;

export interface Comment {
  /** A change on a regular posted comment. */
  post?: Post;
  /** A change on an assignment. */
  assignment?: Assignment;
  /** Users who are mentioned in this comment. */
  mentionedUsers?: Array<User>;
  /** A change on a suggestion. */
  suggestion?: Suggestion;
}

export const Comment: Schema.Schema<Comment> = Schema.suspend(() => Schema.Struct({
  post: Schema.optional(Post),
  assignment: Schema.optional(Assignment),
  mentionedUsers: Schema.optional(Schema.Array(User)),
  suggestion: Schema.optional(Suggestion),
})).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface ApplicationReference {
  /** The reference type corresponding to this event. */
  type?: "UNSPECIFIED_REFERENCE_TYPE" | "LINK" | "DISCUSS" | (string & {});
}

export const ApplicationReference: Schema.Schema<ApplicationReference> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplicationReference" }) as any as Schema.Schema<ApplicationReference>;

export interface Rename {
  /** The previous title of the drive object. */
  oldTitle?: string;
  /** The new title of the drive object. */
  newTitle?: string;
}

export const Rename: Schema.Schema<Rename> = Schema.suspend(() => Schema.Struct({
  oldTitle: Schema.optional(Schema.String),
  newTitle: Schema.optional(Schema.String),
})).annotate({ identifier: "Rename" }) as any as Schema.Schema<Rename>;

export interface DataLeakPreventionChange {
  /** The type of Data Leak Prevention (DLP) change. */
  type?: "TYPE_UNSPECIFIED" | "FLAGGED" | "CLEARED" | (string & {});
}

export const DataLeakPreventionChange: Schema.Schema<DataLeakPreventionChange> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DataLeakPreventionChange" }) as any as Schema.Schema<DataLeakPreventionChange>;

export interface Text {
  /** Value of Text Field. */
  value?: string;
}

export const Text: Schema.Schema<Text> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Text" }) as any as Schema.Schema<Text>;

export interface TextList {
  /** Text values. */
  values?: Array<Text>;
}

export const TextList: Schema.Schema<TextList> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Text)),
})).annotate({ identifier: "TextList" }) as any as Schema.Schema<TextList>;

export interface Selection {
  /** Selection value as Field Choice ID. */
  value?: string;
  /** Selection value as human-readable display string. */
  displayName?: string;
}

export const Selection: Schema.Schema<Selection> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Selection" }) as any as Schema.Schema<Selection>;

export interface SingleUser {
  /** User value as email. */
  value?: string;
}

export const SingleUser: Schema.Schema<SingleUser> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "SingleUser" }) as any as Schema.Schema<SingleUser>;

export interface UserList {
  /** User values. */
  values?: Array<SingleUser>;
}

export const UserList: Schema.Schema<UserList> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(SingleUser)),
})).annotate({ identifier: "UserList" }) as any as Schema.Schema<UserList>;

export interface Integer {
  /** Integer value. */
  value?: string;
}

export const Integer: Schema.Schema<Integer> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Integer" }) as any as Schema.Schema<Integer>;

export interface SelectionList {
  /** Selection values. */
  values?: Array<Selection>;
}

export const SelectionList: Schema.Schema<SelectionList> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Selection)),
})).annotate({ identifier: "SelectionList" }) as any as Schema.Schema<SelectionList>;

export interface Driveactivity_Date {
  /** Date value. */
  value?: string;
}

export const Driveactivity_Date: Schema.Schema<Driveactivity_Date> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Driveactivity_Date" }) as any as Schema.Schema<Driveactivity_Date>;

export interface FieldValue {
  /** Text Field value. */
  text?: Text;
  /** Text List Field value. */
  textList?: TextList;
  /** Selection Field value. */
  selection?: Selection;
  /** User List Field value. */
  userList?: UserList;
  /** Integer Field value. */
  integer?: Integer;
  /** Selection List Field value. */
  selectionList?: SelectionList;
  /** User Field value. */
  user?: SingleUser;
  /** Date Field value. */
  date?: Driveactivity_Date;
}

export const FieldValue: Schema.Schema<FieldValue> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Text),
  textList: Schema.optional(TextList),
  selection: Schema.optional(Selection),
  userList: Schema.optional(UserList),
  integer: Schema.optional(Integer),
  selectionList: Schema.optional(SelectionList),
  user: Schema.optional(SingleUser),
  date: Schema.optional(Driveactivity_Date),
})).annotate({ identifier: "FieldValue" }) as any as Schema.Schema<FieldValue>;

export interface FieldValueChange {
  /** The human-readable display name for this field. */
  displayName?: string;
  /** The value that is now set on the field. If not present, the field was cleared. At least one of {old_value|new_value} is always set. */
  newValue?: FieldValue;
  /** The ID of this field. Field IDs are unique within a Label. */
  fieldId?: string;
  /** The value that was previously set on the field. If not present, the field was newly set. At least one of {old_value|new_value} is always set. */
  oldValue?: FieldValue;
}

export const FieldValueChange: Schema.Schema<FieldValueChange> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  newValue: Schema.optional(FieldValue),
  fieldId: Schema.optional(Schema.String),
  oldValue: Schema.optional(FieldValue),
})).annotate({ identifier: "FieldValueChange" }) as any as Schema.Schema<FieldValueChange>;

export interface AppliedLabelChangeDetail {
  /** The human-readable title of the label that changed. */
  title?: string;
  /** The Label name representing the Label that changed. This name always contains the revision of the Label that was used when this Action occurred. The format is `labels/id@revision`. */
  label?: string;
  /** The types of changes made to the Label on the Target. */
  types?: Array<"TYPE_UNSPECIFIED" | "LABEL_ADDED" | "LABEL_REMOVED" | "LABEL_FIELD_VALUE_CHANGED" | "LABEL_APPLIED_BY_ITEM_CREATE" | (string & {})>;
  /** Field Changes. Only present if `types` contains `LABEL_FIELD_VALUE_CHANGED`. */
  fieldChanges?: Array<FieldValueChange>;
}

export const AppliedLabelChangeDetail: Schema.Schema<AppliedLabelChangeDetail> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  types: Schema.optional(Schema.Array(Schema.String)),
  fieldChanges: Schema.optional(Schema.Array(FieldValueChange)),
})).annotate({ identifier: "AppliedLabelChangeDetail" }) as any as Schema.Schema<AppliedLabelChangeDetail>;

export interface AppliedLabelChange {
  /** Changes that were made to the Label on the Target. */
  changes?: Array<AppliedLabelChangeDetail>;
}

export const AppliedLabelChange: Schema.Schema<AppliedLabelChange> = Schema.suspend(() => Schema.Struct({
  changes: Schema.optional(Schema.Array(AppliedLabelChangeDetail)),
})).annotate({ identifier: "AppliedLabelChange" }) as any as Schema.Schema<AppliedLabelChange>;

export interface TeamDriveReference {
  /** This field is deprecated; please see `DriveReference.name` instead. */
  name?: string;
  /** This field is deprecated; please see `DriveReference.title` instead. */
  title?: string;
}

export const TeamDriveReference: Schema.Schema<TeamDriveReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "TeamDriveReference" }) as any as Schema.Schema<TeamDriveReference>;

export interface DriveFolder {
  /** The type of Drive folder. */
  type?: "TYPE_UNSPECIFIED" | "MY_DRIVE_ROOT" | "SHARED_DRIVE_ROOT" | "STANDARD_FOLDER" | (string & {});
}

export const DriveFolder: Schema.Schema<DriveFolder> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveFolder" }) as any as Schema.Schema<DriveFolder>;

export interface Folder {
  /** This field is deprecated; please see `DriveFolder.type` instead. */
  type?: "TYPE_UNSPECIFIED" | "MY_DRIVE_ROOT" | "TEAM_DRIVE_ROOT" | "STANDARD_FOLDER" | (string & {});
}

export const Folder: Schema.Schema<Folder> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Folder" }) as any as Schema.Schema<Folder>;

export interface DriveFile {
}

export const DriveFile: Schema.Schema<DriveFile> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DriveFile" }) as any as Schema.Schema<DriveFile>;

export interface File {
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface DriveItemReference {
  /** The title of the Drive item. */
  title?: string;
  /** The Drive item is a folder. Includes information about the type of folder. */
  driveFolder?: DriveFolder;
  /** This field is deprecated; please use the `driveFolder` field instead. */
  folder?: Folder;
  /** The target Drive item. The format is `items/ITEM_ID`. */
  name?: string;
  /** The Drive item is a file. */
  driveFile?: DriveFile;
  /** This field is deprecated; please use the `driveFile` field instead. */
  file?: File;
}

export const DriveItemReference: Schema.Schema<DriveItemReference> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  driveFolder: Schema.optional(DriveFolder),
  folder: Schema.optional(Folder),
  name: Schema.optional(Schema.String),
  driveFile: Schema.optional(DriveFile),
  file: Schema.optional(File),
})).annotate({ identifier: "DriveItemReference" }) as any as Schema.Schema<DriveItemReference>;

export interface TargetReference {
  /** This field is deprecated; please use the `drive` field instead. */
  teamDrive?: TeamDriveReference;
  /** The target is a Drive item. */
  driveItem?: DriveItemReference;
  /** The target is a shared drive. */
  drive?: DriveReference;
}

export const TargetReference: Schema.Schema<TargetReference> = Schema.suspend(() => Schema.Struct({
  teamDrive: Schema.optional(TeamDriveReference),
  driveItem: Schema.optional(DriveItemReference),
  drive: Schema.optional(DriveReference),
})).annotate({ identifier: "TargetReference" }) as any as Schema.Schema<TargetReference>;

export interface Move {
  /** The removed parent object(s). */
  removedParents?: Array<TargetReference>;
  /** The added parent object(s). */
  addedParents?: Array<TargetReference>;
}

export const Move: Schema.Schema<Move> = Schema.suspend(() => Schema.Struct({
  removedParents: Schema.optional(Schema.Array(TargetReference)),
  addedParents: Schema.optional(Schema.Array(TargetReference)),
})).annotate({ identifier: "Move" }) as any as Schema.Schema<Move>;

export interface Copy {
  /** The original object. */
  originalObject?: TargetReference;
}

export const Copy: Schema.Schema<Copy> = Schema.suspend(() => Schema.Struct({
  originalObject: Schema.optional(TargetReference),
})).annotate({ identifier: "Copy" }) as any as Schema.Schema<Copy>;

export interface New {
}

export const New: Schema.Schema<New> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "New" }) as any as Schema.Schema<New>;

export interface Upload {
}

export const Upload: Schema.Schema<Upload> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Upload" }) as any as Schema.Schema<Upload>;

export interface Create {
  /** If present, indicates the object was created by copying an existing Drive object. */
  copy?: Copy;
  /** If present, indicates the object was newly created (e.g. as a blank document), not derived from a Drive object or external object. */
  new?: New;
  /** If present, indicates the object originated externally and was uploaded to Drive. */
  upload?: Upload;
}

export const Create: Schema.Schema<Create> = Schema.suspend(() => Schema.Struct({
  copy: Schema.optional(Copy),
  new: Schema.optional(New),
  upload: Schema.optional(Upload),
})).annotate({ identifier: "Create" }) as any as Schema.Schema<Create>;

export interface Delete {
  /** The type of delete action taken. */
  type?: "TYPE_UNSPECIFIED" | "TRASH" | "PERMANENT_DELETE" | (string & {});
}

export const Delete: Schema.Schema<Delete> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Delete" }) as any as Schema.Schema<Delete>;

export interface Anyone {
}

export const Anyone: Schema.Schema<Anyone> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Anyone" }) as any as Schema.Schema<Anyone>;

export interface Domain {
  /** The name of the domain, e.g. `google.com`. */
  name?: string;
  /** An opaque string used to identify this domain. */
  legacyId?: string;
}

export const Domain: Schema.Schema<Domain> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  legacyId: Schema.optional(Schema.String),
})).annotate({ identifier: "Domain" }) as any as Schema.Schema<Domain>;

export interface Permission {
  /** If set, this permission applies to anyone, even logged out users. */
  anyone?: Anyone;
  /** The group to whom this permission applies. */
  group?: Group;
  /** The user to whom this permission applies. */
  user?: User;
  /** Indicates the [Google Drive permissions role](https://developers.google.com/workspace/drive/web/manage-sharing#roles). The role determines a user's ability to read, write, and comment on items. */
  role?: "ROLE_UNSPECIFIED" | "OWNER" | "ORGANIZER" | "FILE_ORGANIZER" | "EDITOR" | "COMMENTER" | "VIEWER" | "PUBLISHED_VIEWER" | (string & {});
  /** The domain to whom this permission applies. */
  domain?: Domain;
  /** If true, the item can be discovered (e.g. in the user's "Shared with me" collection) without needing a link to the item. */
  allowDiscovery?: boolean;
}

export const Permission: Schema.Schema<Permission> = Schema.suspend(() => Schema.Struct({
  anyone: Schema.optional(Anyone),
  group: Schema.optional(Group),
  user: Schema.optional(User),
  role: Schema.optional(Schema.String),
  domain: Schema.optional(Domain),
  allowDiscovery: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Permission" }) as any as Schema.Schema<Permission>;

export interface PermissionChange {
  /** The set of permissions added by this change. */
  addedPermissions?: Array<Permission>;
  /** The set of permissions removed by this change. */
  removedPermissions?: Array<Permission>;
}

export const PermissionChange: Schema.Schema<PermissionChange> = Schema.suspend(() => Schema.Struct({
  addedPermissions: Schema.optional(Schema.Array(Permission)),
  removedPermissions: Schema.optional(Schema.Array(Permission)),
})).annotate({ identifier: "PermissionChange" }) as any as Schema.Schema<PermissionChange>;

export interface Restore {
  /** The type of restore action taken. */
  type?: "TYPE_UNSPECIFIED" | "UNTRASH" | (string & {});
}

export const Restore: Schema.Schema<Restore> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Restore" }) as any as Schema.Schema<Restore>;

export interface RestrictionChange {
  /** The feature which had a change in restriction policy. */
  feature?: "FEATURE_UNSPECIFIED" | "SHARING_OUTSIDE_DOMAIN" | "DIRECT_SHARING" | "ITEM_DUPLICATION" | "DRIVE_FILE_STREAM" | "FILE_ORGANIZER_CAN_SHARE_FOLDERS" | "READERS_CAN_DOWNLOAD" | "WRITERS_CAN_DOWNLOAD" | (string & {});
  /** The restriction in place after the change. */
  newRestriction?: "RESTRICTION_UNSPECIFIED" | "UNRESTRICTED" | "FULLY_RESTRICTED" | (string & {});
}

export const RestrictionChange: Schema.Schema<RestrictionChange> = Schema.suspend(() => Schema.Struct({
  feature: Schema.optional(Schema.String),
  newRestriction: Schema.optional(Schema.String),
})).annotate({ identifier: "RestrictionChange" }) as any as Schema.Schema<RestrictionChange>;

export interface SettingsChange {
  /** The set of changes made to restrictions. */
  restrictionChanges?: Array<RestrictionChange>;
}

export const SettingsChange: Schema.Schema<SettingsChange> = Schema.suspend(() => Schema.Struct({
  restrictionChanges: Schema.optional(Schema.Array(RestrictionChange)),
})).annotate({ identifier: "SettingsChange" }) as any as Schema.Schema<SettingsChange>;

export interface Edit {
}

export const Edit: Schema.Schema<Edit> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Edit" }) as any as Schema.Schema<Edit>;

export interface ActionDetail {
  /** A change about comments was made. */
  comment?: Comment;
  /** An object was referenced in an application outside of Drive/Docs. */
  reference?: ApplicationReference;
  /** An object was renamed. */
  rename?: Rename;
  /** A change happened in data leak prevention status. */
  dlpChange?: DataLeakPreventionChange;
  /** Label was changed. */
  appliedLabelChange?: AppliedLabelChange;
  /** An object was moved. */
  move?: Move;
  /** An object was created. */
  create?: Create;
  /** An object was deleted. */
  delete?: Delete;
  /** The permission on an object was changed. */
  permissionChange?: PermissionChange;
  /** A deleted object was restored. */
  restore?: Restore;
  /** Settings were changed. */
  settingsChange?: SettingsChange;
  /** An object was edited. */
  edit?: Edit;
}

export const ActionDetail: Schema.Schema<ActionDetail> = Schema.suspend(() => Schema.Struct({
  comment: Schema.optional(Comment),
  reference: Schema.optional(ApplicationReference),
  rename: Schema.optional(Rename),
  dlpChange: Schema.optional(DataLeakPreventionChange),
  appliedLabelChange: Schema.optional(AppliedLabelChange),
  move: Schema.optional(Move),
  create: Schema.optional(Create),
  delete: Schema.optional(Delete),
  permissionChange: Schema.optional(PermissionChange),
  restore: Schema.optional(Restore),
  settingsChange: Schema.optional(SettingsChange),
  edit: Schema.optional(Edit),
})).annotate({ identifier: "ActionDetail" }) as any as Schema.Schema<ActionDetail>;

export interface Owner {
  /** The drive that owns the item. */
  drive?: DriveReference;
  /** The domain of the Drive item owner. */
  domain?: Domain;
  /** The user that owns the Drive item. */
  user?: User;
  /** This field is deprecated; please use the `drive` field instead. */
  teamDrive?: TeamDriveReference;
}

export const Owner: Schema.Schema<Owner> = Schema.suspend(() => Schema.Struct({
  drive: Schema.optional(DriveReference),
  domain: Schema.optional(Domain),
  user: Schema.optional(User),
  teamDrive: Schema.optional(TeamDriveReference),
})).annotate({ identifier: "Owner" }) as any as Schema.Schema<Owner>;

export interface DriveItem {
  /** This field is deprecated; please use the `driveFile` field instead. */
  file?: File;
  /** The MIME type of the Drive item. See https://developers.google.com/workspace/drive/v3/web/mime-types. */
  mimeType?: string;
  /** Information about the owner of this Drive item. */
  owner?: Owner;
  /** This field is deprecated; please use the `driveFolder` field instead. */
  folder?: Folder;
  /** The target Drive item. The format is `items/ITEM_ID`. */
  name?: string;
  /** The Drive item is a file. */
  driveFile?: DriveFile;
  /** The title of the Drive item. */
  title?: string;
  /** The Drive item is a folder. Includes information about the type of folder. */
  driveFolder?: DriveFolder;
}

export const DriveItem: Schema.Schema<DriveItem> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(File),
  mimeType: Schema.optional(Schema.String),
  owner: Schema.optional(Owner),
  folder: Schema.optional(Folder),
  name: Schema.optional(Schema.String),
  driveFile: Schema.optional(DriveFile),
  title: Schema.optional(Schema.String),
  driveFolder: Schema.optional(DriveFolder),
})).annotate({ identifier: "DriveItem" }) as any as Schema.Schema<DriveItem>;

export interface FileComment {
  /** The link to the discussion thread containing this comment, for example, `https://docs.google.com/DOCUMENT_ID/edit?disco=THREAD_ID`. */
  linkToDiscussion?: string;
  /** The Drive item containing this comment. */
  parent?: DriveItem;
  /** The comment in the discussion thread. This identifier is an opaque string compatible with the Drive API; see https://developers.google.com/workspace/drive/v3/reference/comments/get */
  legacyCommentId?: string;
  /** The discussion thread to which the comment was added. This identifier is an opaque string compatible with the Drive API and references the first comment in a discussion; see https://developers.google.com/workspace/drive/v3/reference/comments/get */
  legacyDiscussionId?: string;
}

export const FileComment: Schema.Schema<FileComment> = Schema.suspend(() => Schema.Struct({
  linkToDiscussion: Schema.optional(Schema.String),
  parent: Schema.optional(DriveItem),
  legacyCommentId: Schema.optional(Schema.String),
  legacyDiscussionId: Schema.optional(Schema.String),
})).annotate({ identifier: "FileComment" }) as any as Schema.Schema<FileComment>;

export interface TimeRange {
  /** The start of the time range. */
  startTime?: string;
  /** The end of the time range. */
  endTime?: string;
}

export const TimeRange: Schema.Schema<TimeRange> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeRange" }) as any as Schema.Schema<TimeRange>;

export interface AnonymousUser {
}

export const AnonymousUser: Schema.Schema<AnonymousUser> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AnonymousUser" }) as any as Schema.Schema<AnonymousUser>;

export interface Administrator {
}

export const Administrator: Schema.Schema<Administrator> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Administrator" }) as any as Schema.Schema<Administrator>;

export interface SystemEvent {
  /** The type of the system event that may triggered activity. */
  type?: "TYPE_UNSPECIFIED" | "USER_DELETION" | "TRASH_AUTO_PURGE" | (string & {});
}

export const SystemEvent: Schema.Schema<SystemEvent> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "SystemEvent" }) as any as Schema.Schema<SystemEvent>;

export interface Impersonation {
  /** The impersonated user. */
  impersonatedUser?: User;
}

export const Impersonation: Schema.Schema<Impersonation> = Schema.suspend(() => Schema.Struct({
  impersonatedUser: Schema.optional(User),
})).annotate({ identifier: "Impersonation" }) as any as Schema.Schema<Impersonation>;

export interface Actor {
  /** An end user. */
  user?: User;
  /** An anonymous user. */
  anonymous?: AnonymousUser;
  /** An administrator. */
  administrator?: Administrator;
  /** A non-user actor (i.e. system triggered). */
  system?: SystemEvent;
  /** An account acting on behalf of another. */
  impersonation?: Impersonation;
}

export const Actor: Schema.Schema<Actor> = Schema.suspend(() => Schema.Struct({
  user: Schema.optional(User),
  anonymous: Schema.optional(AnonymousUser),
  administrator: Schema.optional(Administrator),
  system: Schema.optional(SystemEvent),
  impersonation: Schema.optional(Impersonation),
})).annotate({ identifier: "Actor" }) as any as Schema.Schema<Actor>;

export interface TeamDrive {
  /** This field is deprecated; please see `Drive.name` instead. */
  name?: string;
  /** This field is deprecated; please see `Drive.root` instead. */
  root?: DriveItem;
  /** This field is deprecated; please see `Drive.title` instead. */
  title?: string;
}

export const TeamDrive: Schema.Schema<TeamDrive> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  root: Schema.optional(DriveItem),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "TeamDrive" }) as any as Schema.Schema<TeamDrive>;

export interface Drive {
  /** The resource name of the shared drive. The format is `COLLECTION_ID/DRIVE_ID`. Clients should not assume a specific collection ID for this resource name. */
  name?: string;
  /** The title of the shared drive. */
  title?: string;
  /** The root of this shared drive. */
  root?: DriveItem;
}

export const Drive: Schema.Schema<Drive> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  root: Schema.optional(DriveItem),
})).annotate({ identifier: "Drive" }) as any as Schema.Schema<Drive>;

export interface Target {
  /** This field is deprecated; please use the `drive` field instead. */
  teamDrive?: TeamDrive;
  /** The target is a Drive item. */
  driveItem?: DriveItem;
  /** The target is a comment on a Drive file. */
  fileComment?: FileComment;
  /** The target is a shared drive. */
  drive?: Drive;
}

export const Target: Schema.Schema<Target> = Schema.suspend(() => Schema.Struct({
  teamDrive: Schema.optional(TeamDrive),
  driveItem: Schema.optional(DriveItem),
  fileComment: Schema.optional(FileComment),
  drive: Schema.optional(Drive),
})).annotate({ identifier: "Target" }) as any as Schema.Schema<Target>;

export interface Action {
  /** The action occurred over this time range. */
  timeRange?: TimeRange;
  /** The target this action affects (or empty if affecting all targets). This represents the state of the target immediately after this action occurred. */
  target?: Target;
  /** The actor responsible for this action (or empty if all actors are responsible). */
  actor?: Actor;
  /** The action occurred at this specific time. */
  timestamp?: string;
  /** The type and detailed information about the action. */
  detail?: ActionDetail;
}

export const Action: Schema.Schema<Action> = Schema.suspend(() => Schema.Struct({
  timeRange: Schema.optional(TimeRange),
  target: Schema.optional(Target),
  actor: Schema.optional(Actor),
  timestamp: Schema.optional(Schema.String),
  detail: Schema.optional(ActionDetail),
})).annotate({ identifier: "Action" }) as any as Schema.Schema<Action>;

export interface DriveActivity {
  /** The activity occurred over this time range. */
  timeRange?: TimeRange;
  /** All actor(s) responsible for the activity. */
  actors?: Array<Actor>;
  /** Details on all actions in this activity. */
  actions?: Array<Action>;
  /** All Google Drive objects this activity is about (e.g. file, folder, drive). This represents the state of the target immediately after the actions occurred. */
  targets?: Array<Target>;
  /** Key information about the primary action for this activity. This is either representative, or the most important, of all actions in the activity, according to the ConsolidationStrategy in the request. */
  primaryActionDetail?: ActionDetail;
  /** The activity occurred at this specific time. */
  timestamp?: string;
}

export const DriveActivity: Schema.Schema<DriveActivity> = Schema.suspend(() => Schema.Struct({
  timeRange: Schema.optional(TimeRange),
  actors: Schema.optional(Schema.Array(Actor)),
  actions: Schema.optional(Schema.Array(Action)),
  targets: Schema.optional(Schema.Array(Target)),
  primaryActionDetail: Schema.optional(ActionDetail),
  timestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveActivity" }) as any as Schema.Schema<DriveActivity>;

export interface QueryDriveActivityResponse {
  /** List of activity requested. */
  activities?: Array<DriveActivity>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const QueryDriveActivityResponse: Schema.Schema<QueryDriveActivityResponse> = Schema.suspend(() => Schema.Struct({
  activities: Schema.optional(Schema.Array(DriveActivity)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryDriveActivityResponse" }) as any as Schema.Schema<QueryDriveActivityResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface QueryActivityRequest {
  /** Request body */
  body?: QueryDriveActivityRequest;
}

export const QueryActivityRequest = Schema.Struct({
  body: Schema.optional(QueryDriveActivityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/activity:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryActivityRequest>;

export type QueryActivityResponse = QueryDriveActivityResponse;
export const QueryActivityResponse = QueryDriveActivityResponse;

export type QueryActivityError = CommonErrors;

/** Query past activity in Google Drive. */
export const queryActivity: API.OperationMethod<QueryActivityRequest, QueryActivityResponse, QueryActivityError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryActivityRequest,
  output: QueryActivityResponse,
  errors: [],
}));

