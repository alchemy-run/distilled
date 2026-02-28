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

export interface NoConsolidation {
}

export const NoConsolidation: Schema.Schema<NoConsolidation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "NoConsolidation" }) as any as Schema.Schema<NoConsolidation>;

export interface Legacy {
}

export const Legacy: Schema.Schema<Legacy> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Legacy" }) as any as Schema.Schema<Legacy>;

export interface ConsolidationStrategy {
  /** The individual activities are not consolidated. */
  none?: NoConsolidation;
  /** The individual activities are consolidated using the legacy strategy. */
  legacy?: Legacy;
}

export const ConsolidationStrategy: Schema.Schema<ConsolidationStrategy> = Schema.suspend(() => Schema.Struct({
  none: Schema.optional(NoConsolidation),
  legacy: Schema.optional(Legacy),
})).annotate({ identifier: "ConsolidationStrategy" }) as any as Schema.Schema<ConsolidationStrategy>;

export interface QueryDriveActivityRequest {
  /** Return activities for this Drive item. The format is `items/ITEM_ID`. */
  itemName?: string;
  /** Return activities for this Drive folder, plus all children and descendants. The format is `items/ITEM_ID`. */
  ancestorName?: string;
  /** Details on how to consolidate related actions that make up the activity. If not set, then related actions aren't consolidated. */
  consolidationStrategy?: ConsolidationStrategy;
  /** The minimum number of activities desired in the response; the server attempts to return at least this quantity. The server may also return fewer activities if it has a partial response ready before the request times out. If not set, a default value is used. */
  pageSize?: number;
  /** The token identifies which page of results to return. Set this to the next_page_token value returned from a previous query to obtain the following page of results. If not set, the first page of results is returned. */
  pageToken?: string;
  /** The filtering for items returned from this query request. The format of the filter string is a sequence of expressions, joined by an optional "AND", where each expression is of the form "field operator value". Supported fields: - `time`: Uses numerical operators on date values either in terms of milliseconds since Jan 1, 1970 or in RFC 3339 format. Examples: - `time > 1452409200000 AND time <= 1492812924310` - `time >= "2016-01-10T01:02:03-05:00"` - `detail.action_detail_case`: Uses the "has" operator (:) and either a singular value or a list of allowed action types enclosed in parentheses, separated by a space. To exclude a result from the response, prepend a hyphen (`-`) to the beginning of the filter string. Examples: - `detail.action_detail_case:RENAME` - `detail.action_detail_case:(CREATE RESTORE)` - `-detail.action_detail_case:MOVE` */
  filter?: string;
}

export const QueryDriveActivityRequest: Schema.Schema<QueryDriveActivityRequest> = Schema.suspend(() => Schema.Struct({
  itemName: Schema.optional(Schema.String),
  ancestorName: Schema.optional(Schema.String),
  consolidationStrategy: Schema.optional(ConsolidationStrategy),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryDriveActivityRequest" }) as any as Schema.Schema<QueryDriveActivityRequest>;

export interface New {
}

export const New: Schema.Schema<New> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "New" }) as any as Schema.Schema<New>;

export interface Upload {
}

export const Upload: Schema.Schema<Upload> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Upload" }) as any as Schema.Schema<Upload>;

export interface File {
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

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

export interface DriveFolder {
  /** The type of Drive folder. */
  type?: "TYPE_UNSPECIFIED" | "MY_DRIVE_ROOT" | "SHARED_DRIVE_ROOT" | "STANDARD_FOLDER" | (string & {});
}

export const DriveFolder: Schema.Schema<DriveFolder> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveFolder" }) as any as Schema.Schema<DriveFolder>;

export interface DriveItemReference {
  /** The target Drive item. The format is `items/ITEM_ID`. */
  name?: string;
  /** The title of the Drive item. */
  title?: string;
  /** This field is deprecated; please use the `driveFile` field instead. */
  file?: File;
  /** This field is deprecated; please use the `driveFolder` field instead. */
  folder?: Folder;
  /** The Drive item is a file. */
  driveFile?: DriveFile;
  /** The Drive item is a folder. Includes information about the type of folder. */
  driveFolder?: DriveFolder;
}

export const DriveItemReference: Schema.Schema<DriveItemReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  file: Schema.optional(File),
  folder: Schema.optional(Folder),
  driveFile: Schema.optional(DriveFile),
  driveFolder: Schema.optional(DriveFolder),
})).annotate({ identifier: "DriveItemReference" }) as any as Schema.Schema<DriveItemReference>;

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

export interface TargetReference {
  /** The target is a Drive item. */
  driveItem?: DriveItemReference;
  /** The target is a shared drive. */
  drive?: DriveReference;
  /** This field is deprecated; please use the `drive` field instead. */
  teamDrive?: TeamDriveReference;
}

export const TargetReference: Schema.Schema<TargetReference> = Schema.suspend(() => Schema.Struct({
  driveItem: Schema.optional(DriveItemReference),
  drive: Schema.optional(DriveReference),
  teamDrive: Schema.optional(TeamDriveReference),
})).annotate({ identifier: "TargetReference" }) as any as Schema.Schema<TargetReference>;

export interface Copy {
  /** The original object. */
  originalObject?: TargetReference;
}

export const Copy: Schema.Schema<Copy> = Schema.suspend(() => Schema.Struct({
  originalObject: Schema.optional(TargetReference),
})).annotate({ identifier: "Copy" }) as any as Schema.Schema<Copy>;

export interface Create {
  /** If present, indicates the object was newly created (e.g. as a blank document), not derived from a Drive object or external object. */
  new?: New;
  /** If present, indicates the object originated externally and was uploaded to Drive. */
  upload?: Upload;
  /** If present, indicates the object was created by copying an existing Drive object. */
  copy?: Copy;
}

export const Create: Schema.Schema<Create> = Schema.suspend(() => Schema.Struct({
  new: Schema.optional(New),
  upload: Schema.optional(Upload),
  copy: Schema.optional(Copy),
})).annotate({ identifier: "Create" }) as any as Schema.Schema<Create>;

export interface Edit {
}

export const Edit: Schema.Schema<Edit> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Edit" }) as any as Schema.Schema<Edit>;

export interface Move {
  /** The added parent object(s). */
  addedParents?: Array<TargetReference>;
  /** The removed parent object(s). */
  removedParents?: Array<TargetReference>;
}

export const Move: Schema.Schema<Move> = Schema.suspend(() => Schema.Struct({
  addedParents: Schema.optional(Schema.Array(TargetReference)),
  removedParents: Schema.optional(Schema.Array(TargetReference)),
})).annotate({ identifier: "Move" }) as any as Schema.Schema<Move>;

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

export interface Delete {
  /** The type of delete action taken. */
  type?: "TYPE_UNSPECIFIED" | "TRASH" | "PERMANENT_DELETE" | (string & {});
}

export const Delete: Schema.Schema<Delete> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Delete" }) as any as Schema.Schema<Delete>;

export interface Restore {
  /** The type of restore action taken. */
  type?: "TYPE_UNSPECIFIED" | "UNTRASH" | (string & {});
}

export const Restore: Schema.Schema<Restore> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Restore" }) as any as Schema.Schema<Restore>;

export interface KnownUser {
  /** The identifier for this user that can be used with the People API to get more information. The format is `people/ACCOUNT_ID`. See https://developers.google.com/people/. */
  personName?: string;
  /** True if this is the user making the request. */
  isCurrentUser?: boolean;
}

export const KnownUser: Schema.Schema<KnownUser> = Schema.suspend(() => Schema.Struct({
  personName: Schema.optional(Schema.String),
  isCurrentUser: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KnownUser" }) as any as Schema.Schema<KnownUser>;

export interface DeletedUser {
}

export const DeletedUser: Schema.Schema<DeletedUser> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeletedUser" }) as any as Schema.Schema<DeletedUser>;

export interface UnknownUser {
}

export const UnknownUser: Schema.Schema<UnknownUser> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UnknownUser" }) as any as Schema.Schema<UnknownUser>;

export interface User {
  /** A known user. */
  knownUser?: KnownUser;
  /** A user whose account has since been deleted. */
  deletedUser?: DeletedUser;
  /** A user about whom nothing is currently known. */
  unknownUser?: UnknownUser;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  knownUser: Schema.optional(KnownUser),
  deletedUser: Schema.optional(DeletedUser),
  unknownUser: Schema.optional(UnknownUser),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

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

export interface Anyone {
}

export const Anyone: Schema.Schema<Anyone> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Anyone" }) as any as Schema.Schema<Anyone>;

export interface Permission {
  /** Indicates the [Google Drive permissions role](https://developers.google.com/workspace/drive/web/manage-sharing#roles). The role determines a user's ability to read, write, and comment on items. */
  role?: "ROLE_UNSPECIFIED" | "OWNER" | "ORGANIZER" | "FILE_ORGANIZER" | "EDITOR" | "COMMENTER" | "VIEWER" | "PUBLISHED_VIEWER" | (string & {});
  /** The user to whom this permission applies. */
  user?: User;
  /** The group to whom this permission applies. */
  group?: Group;
  /** The domain to whom this permission applies. */
  domain?: Domain;
  /** If set, this permission applies to anyone, even logged out users. */
  anyone?: Anyone;
  /** If true, the item can be discovered (e.g. in the user's "Shared with me" collection) without needing a link to the item. */
  allowDiscovery?: boolean;
}

export const Permission: Schema.Schema<Permission> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  user: Schema.optional(User),
  group: Schema.optional(Group),
  domain: Schema.optional(Domain),
  anyone: Schema.optional(Anyone),
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

export interface Post {
  /** The sub-type of this event. */
  subtype?: "SUBTYPE_UNSPECIFIED" | "ADDED" | "DELETED" | "REPLY_ADDED" | "REPLY_DELETED" | "RESOLVED" | "REOPENED" | (string & {});
}

export const Post: Schema.Schema<Post> = Schema.suspend(() => Schema.Struct({
  subtype: Schema.optional(Schema.String),
})).annotate({ identifier: "Post" }) as any as Schema.Schema<Post>;

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
  /** A change on a suggestion. */
  suggestion?: Suggestion;
  /** Users who are mentioned in this comment. */
  mentionedUsers?: Array<User>;
}

export const Comment: Schema.Schema<Comment> = Schema.suspend(() => Schema.Struct({
  post: Schema.optional(Post),
  assignment: Schema.optional(Assignment),
  suggestion: Schema.optional(Suggestion),
  mentionedUsers: Schema.optional(Schema.Array(User)),
})).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface DataLeakPreventionChange {
  /** The type of Data Leak Prevention (DLP) change. */
  type?: "TYPE_UNSPECIFIED" | "FLAGGED" | "CLEARED" | (string & {});
}

export const DataLeakPreventionChange: Schema.Schema<DataLeakPreventionChange> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DataLeakPreventionChange" }) as any as Schema.Schema<DataLeakPreventionChange>;

export interface ApplicationReference {
  /** The reference type corresponding to this event. */
  type?: "UNSPECIFIED_REFERENCE_TYPE" | "LINK" | "DISCUSS" | (string & {});
}

export const ApplicationReference: Schema.Schema<ApplicationReference> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplicationReference" }) as any as Schema.Schema<ApplicationReference>;

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

export interface SelectionList {
  /** Selection values. */
  values?: Array<Selection>;
}

export const SelectionList: Schema.Schema<SelectionList> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Selection)),
})).annotate({ identifier: "SelectionList" }) as any as Schema.Schema<SelectionList>;

export interface Integer {
  /** Integer value. */
  value?: string;
}

export const Integer: Schema.Schema<Integer> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Integer" }) as any as Schema.Schema<Integer>;

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
  /** Selection List Field value. */
  selectionList?: SelectionList;
  /** Integer Field value. */
  integer?: Integer;
  /** User Field value. */
  user?: SingleUser;
  /** User List Field value. */
  userList?: UserList;
  /** Date Field value. */
  date?: Driveactivity_Date;
}

export const FieldValue: Schema.Schema<FieldValue> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Text),
  textList: Schema.optional(TextList),
  selection: Schema.optional(Selection),
  selectionList: Schema.optional(SelectionList),
  integer: Schema.optional(Integer),
  user: Schema.optional(SingleUser),
  userList: Schema.optional(UserList),
  date: Schema.optional(Driveactivity_Date),
})).annotate({ identifier: "FieldValue" }) as any as Schema.Schema<FieldValue>;

export interface FieldValueChange {
  /** The ID of this field. Field IDs are unique within a Label. */
  fieldId?: string;
  /** The value that was previously set on the field. If not present, the field was newly set. At least one of {old_value|new_value} is always set. */
  oldValue?: FieldValue;
  /** The value that is now set on the field. If not present, the field was cleared. At least one of {old_value|new_value} is always set. */
  newValue?: FieldValue;
  /** The human-readable display name for this field. */
  displayName?: string;
}

export const FieldValueChange: Schema.Schema<FieldValueChange> = Schema.suspend(() => Schema.Struct({
  fieldId: Schema.optional(Schema.String),
  oldValue: Schema.optional(FieldValue),
  newValue: Schema.optional(FieldValue),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "FieldValueChange" }) as any as Schema.Schema<FieldValueChange>;

export interface AppliedLabelChangeDetail {
  /** The Label name representing the Label that changed. This name always contains the revision of the Label that was used when this Action occurred. The format is `labels/id@revision`. */
  label?: string;
  /** The types of changes made to the Label on the Target. */
  types?: Array<"TYPE_UNSPECIFIED" | "LABEL_ADDED" | "LABEL_REMOVED" | "LABEL_FIELD_VALUE_CHANGED" | "LABEL_APPLIED_BY_ITEM_CREATE" | (string & {})>;
  /** The human-readable title of the label that changed. */
  title?: string;
  /** Field Changes. Only present if `types` contains `LABEL_FIELD_VALUE_CHANGED`. */
  fieldChanges?: Array<FieldValueChange>;
}

export const AppliedLabelChangeDetail: Schema.Schema<AppliedLabelChangeDetail> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  types: Schema.optional(Schema.Array(Schema.String)),
  title: Schema.optional(Schema.String),
  fieldChanges: Schema.optional(Schema.Array(FieldValueChange)),
})).annotate({ identifier: "AppliedLabelChangeDetail" }) as any as Schema.Schema<AppliedLabelChangeDetail>;

export interface AppliedLabelChange {
  /** Changes that were made to the Label on the Target. */
  changes?: Array<AppliedLabelChangeDetail>;
}

export const AppliedLabelChange: Schema.Schema<AppliedLabelChange> = Schema.suspend(() => Schema.Struct({
  changes: Schema.optional(Schema.Array(AppliedLabelChangeDetail)),
})).annotate({ identifier: "AppliedLabelChange" }) as any as Schema.Schema<AppliedLabelChange>;

export interface ActionDetail {
  /** An object was created. */
  create?: Create;
  /** An object was edited. */
  edit?: Edit;
  /** An object was moved. */
  move?: Move;
  /** An object was renamed. */
  rename?: Rename;
  /** An object was deleted. */
  delete?: Delete;
  /** A deleted object was restored. */
  restore?: Restore;
  /** The permission on an object was changed. */
  permissionChange?: PermissionChange;
  /** A change about comments was made. */
  comment?: Comment;
  /** A change happened in data leak prevention status. */
  dlpChange?: DataLeakPreventionChange;
  /** An object was referenced in an application outside of Drive/Docs. */
  reference?: ApplicationReference;
  /** Settings were changed. */
  settingsChange?: SettingsChange;
  /** Label was changed. */
  appliedLabelChange?: AppliedLabelChange;
}

export const ActionDetail: Schema.Schema<ActionDetail> = Schema.suspend(() => Schema.Struct({
  create: Schema.optional(Create),
  edit: Schema.optional(Edit),
  move: Schema.optional(Move),
  rename: Schema.optional(Rename),
  delete: Schema.optional(Delete),
  restore: Schema.optional(Restore),
  permissionChange: Schema.optional(PermissionChange),
  comment: Schema.optional(Comment),
  dlpChange: Schema.optional(DataLeakPreventionChange),
  reference: Schema.optional(ApplicationReference),
  settingsChange: Schema.optional(SettingsChange),
  appliedLabelChange: Schema.optional(AppliedLabelChange),
})).annotate({ identifier: "ActionDetail" }) as any as Schema.Schema<ActionDetail>;

export interface AnonymousUser {
}

export const AnonymousUser: Schema.Schema<AnonymousUser> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AnonymousUser" }) as any as Schema.Schema<AnonymousUser>;

export interface Impersonation {
  /** The impersonated user. */
  impersonatedUser?: User;
}

export const Impersonation: Schema.Schema<Impersonation> = Schema.suspend(() => Schema.Struct({
  impersonatedUser: Schema.optional(User),
})).annotate({ identifier: "Impersonation" }) as any as Schema.Schema<Impersonation>;

export interface SystemEvent {
  /** The type of the system event that may triggered activity. */
  type?: "TYPE_UNSPECIFIED" | "USER_DELETION" | "TRASH_AUTO_PURGE" | (string & {});
}

export const SystemEvent: Schema.Schema<SystemEvent> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "SystemEvent" }) as any as Schema.Schema<SystemEvent>;

export interface Administrator {
}

export const Administrator: Schema.Schema<Administrator> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Administrator" }) as any as Schema.Schema<Administrator>;

export interface Actor {
  /** An end user. */
  user?: User;
  /** An anonymous user. */
  anonymous?: AnonymousUser;
  /** An account acting on behalf of another. */
  impersonation?: Impersonation;
  /** A non-user actor (i.e. system triggered). */
  system?: SystemEvent;
  /** An administrator. */
  administrator?: Administrator;
}

export const Actor: Schema.Schema<Actor> = Schema.suspend(() => Schema.Struct({
  user: Schema.optional(User),
  anonymous: Schema.optional(AnonymousUser),
  impersonation: Schema.optional(Impersonation),
  system: Schema.optional(SystemEvent),
  administrator: Schema.optional(Administrator),
})).annotate({ identifier: "Actor" }) as any as Schema.Schema<Actor>;

export interface Owner {
  /** The user that owns the Drive item. */
  user?: User;
  /** The drive that owns the item. */
  drive?: DriveReference;
  /** This field is deprecated; please use the `drive` field instead. */
  teamDrive?: TeamDriveReference;
  /** The domain of the Drive item owner. */
  domain?: Domain;
}

export const Owner: Schema.Schema<Owner> = Schema.suspend(() => Schema.Struct({
  user: Schema.optional(User),
  drive: Schema.optional(DriveReference),
  teamDrive: Schema.optional(TeamDriveReference),
  domain: Schema.optional(Domain),
})).annotate({ identifier: "Owner" }) as any as Schema.Schema<Owner>;

export interface DriveItem {
  /** The target Drive item. The format is `items/ITEM_ID`. */
  name?: string;
  /** The title of the Drive item. */
  title?: string;
  /** This field is deprecated; please use the `driveFile` field instead. */
  file?: File;
  /** This field is deprecated; please use the `driveFolder` field instead. */
  folder?: Folder;
  /** The Drive item is a file. */
  driveFile?: DriveFile;
  /** The Drive item is a folder. Includes information about the type of folder. */
  driveFolder?: DriveFolder;
  /** The MIME type of the Drive item. See https://developers.google.com/workspace/drive/v3/web/mime-types. */
  mimeType?: string;
  /** Information about the owner of this Drive item. */
  owner?: Owner;
}

export const DriveItem: Schema.Schema<DriveItem> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  file: Schema.optional(File),
  folder: Schema.optional(Folder),
  driveFile: Schema.optional(DriveFile),
  driveFolder: Schema.optional(DriveFolder),
  mimeType: Schema.optional(Schema.String),
  owner: Schema.optional(Owner),
})).annotate({ identifier: "DriveItem" }) as any as Schema.Schema<DriveItem>;

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

export interface FileComment {
  /** The comment in the discussion thread. This identifier is an opaque string compatible with the Drive API; see https://developers.google.com/workspace/drive/v3/reference/comments/get */
  legacyCommentId?: string;
  /** The discussion thread to which the comment was added. This identifier is an opaque string compatible with the Drive API and references the first comment in a discussion; see https://developers.google.com/workspace/drive/v3/reference/comments/get */
  legacyDiscussionId?: string;
  /** The link to the discussion thread containing this comment, for example, `https://docs.google.com/DOCUMENT_ID/edit?disco=THREAD_ID`. */
  linkToDiscussion?: string;
  /** The Drive item containing this comment. */
  parent?: DriveItem;
}

export const FileComment: Schema.Schema<FileComment> = Schema.suspend(() => Schema.Struct({
  legacyCommentId: Schema.optional(Schema.String),
  legacyDiscussionId: Schema.optional(Schema.String),
  linkToDiscussion: Schema.optional(Schema.String),
  parent: Schema.optional(DriveItem),
})).annotate({ identifier: "FileComment" }) as any as Schema.Schema<FileComment>;

export interface TeamDrive {
  /** This field is deprecated; please see `Drive.name` instead. */
  name?: string;
  /** This field is deprecated; please see `Drive.title` instead. */
  title?: string;
  /** This field is deprecated; please see `Drive.root` instead. */
  root?: DriveItem;
}

export const TeamDrive: Schema.Schema<TeamDrive> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  root: Schema.optional(DriveItem),
})).annotate({ identifier: "TeamDrive" }) as any as Schema.Schema<TeamDrive>;

export interface Target {
  /** The target is a Drive item. */
  driveItem?: DriveItem;
  /** The target is a shared drive. */
  drive?: Drive;
  /** The target is a comment on a Drive file. */
  fileComment?: FileComment;
  /** This field is deprecated; please use the `drive` field instead. */
  teamDrive?: TeamDrive;
}

export const Target: Schema.Schema<Target> = Schema.suspend(() => Schema.Struct({
  driveItem: Schema.optional(DriveItem),
  drive: Schema.optional(Drive),
  fileComment: Schema.optional(FileComment),
  teamDrive: Schema.optional(TeamDrive),
})).annotate({ identifier: "Target" }) as any as Schema.Schema<Target>;

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

export interface Action {
  /** The type and detailed information about the action. */
  detail?: ActionDetail;
  /** The actor responsible for this action (or empty if all actors are responsible). */
  actor?: Actor;
  /** The target this action affects (or empty if affecting all targets). This represents the state of the target immediately after this action occurred. */
  target?: Target;
  /** The action occurred at this specific time. */
  timestamp?: string;
  /** The action occurred over this time range. */
  timeRange?: TimeRange;
}

export const Action: Schema.Schema<Action> = Schema.suspend(() => Schema.Struct({
  detail: Schema.optional(ActionDetail),
  actor: Schema.optional(Actor),
  target: Schema.optional(Target),
  timestamp: Schema.optional(Schema.String),
  timeRange: Schema.optional(TimeRange),
})).annotate({ identifier: "Action" }) as any as Schema.Schema<Action>;

export interface DriveActivity {
  /** Key information about the primary action for this activity. This is either representative, or the most important, of all actions in the activity, according to the ConsolidationStrategy in the request. */
  primaryActionDetail?: ActionDetail;
  /** All actor(s) responsible for the activity. */
  actors?: Array<Actor>;
  /** Details on all actions in this activity. */
  actions?: Array<Action>;
  /** All Google Drive objects this activity is about (e.g. file, folder, drive). This represents the state of the target immediately after the actions occurred. */
  targets?: Array<Target>;
  /** The activity occurred at this specific time. */
  timestamp?: string;
  /** The activity occurred over this time range. */
  timeRange?: TimeRange;
}

export const DriveActivity: Schema.Schema<DriveActivity> = Schema.suspend(() => Schema.Struct({
  primaryActionDetail: Schema.optional(ActionDetail),
  actors: Schema.optional(Schema.Array(Actor)),
  actions: Schema.optional(Schema.Array(Action)),
  targets: Schema.optional(Schema.Array(Target)),
  timestamp: Schema.optional(Schema.String),
  timeRange: Schema.optional(TimeRange),
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

/** Query past activity in Google Drive. */
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

export const queryActivity: API.OperationMethod<QueryActivityRequest, QueryActivityResponse, QueryActivityError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryActivityRequest,
  output: QueryActivityResponse,
  errors: [],
}));

