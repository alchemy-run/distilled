// ==========================================================================
// Google Vault API (vault v1)
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
  name: "vault",
  version: "v1",
  rootUrl: "https://vault.googleapis.com/",
  servicePath: "",
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

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface MatterPermission {
  /** The user's role for the matter. */
  role?: "ROLE_UNSPECIFIED" | "COLLABORATOR" | "OWNER" | (string & {});
  /** The account ID, as provided by the [Admin SDK](https://developers.google.com/admin-sdk/). */
  accountId?: string;
}

export const MatterPermission: Schema.Schema<MatterPermission> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
})).annotate({ identifier: "MatterPermission" }) as any as Schema.Schema<MatterPermission>;

export interface Matter {
  /** The matter ID, which is generated by the server. Leave blank when creating a matter. */
  matterId?: string;
  /** The name of the matter. */
  name?: string;
  /** An optional description for the matter. */
  description?: string;
  /** The state of the matter. */
  state?: "STATE_UNSPECIFIED" | "OPEN" | "CLOSED" | "DELETED" | (string & {});
  /** Lists the users and their permission for the matter. Currently there is no programmer defined limit on the number of permissions a matter can have. */
  matterPermissions?: Array<MatterPermission>;
  /** Optional. The requested data region for the matter. */
  matterRegion?: "MATTER_REGION_UNSPECIFIED" | "ANY" | "US" | "EUROPE" | (string & {});
}

export const Matter: Schema.Schema<Matter> = Schema.suspend(() => Schema.Struct({
  matterId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  matterPermissions: Schema.optional(Schema.Array(MatterPermission)),
  matterRegion: Schema.optional(Schema.String),
})).annotate({ identifier: "Matter" }) as any as Schema.Schema<Matter>;

export interface CloseMatterRequest {
}

export const CloseMatterRequest: Schema.Schema<CloseMatterRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CloseMatterRequest" }) as any as Schema.Schema<CloseMatterRequest>;

export interface CloseMatterResponse {
  /** The updated matter, with state **CLOSED**. */
  matter?: Matter;
}

export const CloseMatterResponse: Schema.Schema<CloseMatterResponse> = Schema.suspend(() => Schema.Struct({
  matter: Schema.optional(Matter),
})).annotate({ identifier: "CloseMatterResponse" }) as any as Schema.Schema<CloseMatterResponse>;

export interface ReopenMatterRequest {
}

export const ReopenMatterRequest: Schema.Schema<ReopenMatterRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ReopenMatterRequest" }) as any as Schema.Schema<ReopenMatterRequest>;

export interface ReopenMatterResponse {
  /** The updated matter, with state **OPEN**. */
  matter?: Matter;
}

export const ReopenMatterResponse: Schema.Schema<ReopenMatterResponse> = Schema.suspend(() => Schema.Struct({
  matter: Schema.optional(Matter),
})).annotate({ identifier: "ReopenMatterResponse" }) as any as Schema.Schema<ReopenMatterResponse>;

export interface UndeleteMatterRequest {
}

export const UndeleteMatterRequest: Schema.Schema<UndeleteMatterRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteMatterRequest" }) as any as Schema.Schema<UndeleteMatterRequest>;

export interface ListMattersResponse {
  /** List of matters. */
  matters?: Array<Matter>;
  /** Page token to retrieve the next page of results in the list. */
  nextPageToken?: string;
}

export const ListMattersResponse: Schema.Schema<ListMattersResponse> = Schema.suspend(() => Schema.Struct({
  matters: Schema.optional(Schema.Array(Matter)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMattersResponse" }) as any as Schema.Schema<ListMattersResponse>;

export interface AddMatterPermissionsRequest {
  /** The account and its role to add. */
  matterPermission?: MatterPermission;
  /** To send a notification email to the added account, set to **true**. To not send a notification email, set to **false**. */
  sendEmails?: boolean;
  /** Only relevant if **sendEmails** is **true**. To CC the requestor in the email message, set to **true**. To not CC requestor, set to **false**. */
  ccMe?: boolean;
}

export const AddMatterPermissionsRequest: Schema.Schema<AddMatterPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  matterPermission: Schema.optional(MatterPermission),
  sendEmails: Schema.optional(Schema.Boolean),
  ccMe: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AddMatterPermissionsRequest" }) as any as Schema.Schema<AddMatterPermissionsRequest>;

export interface RemoveMatterPermissionsRequest {
  /** The account ID. */
  accountId?: string;
}

export const RemoveMatterPermissionsRequest: Schema.Schema<RemoveMatterPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveMatterPermissionsRequest" }) as any as Schema.Schema<RemoveMatterPermissionsRequest>;

export interface AccountInfo {
  /** A set of accounts to search. */
  emails?: Array<string>;
}

export const AccountInfo: Schema.Schema<AccountInfo> = Schema.suspend(() => Schema.Struct({
  emails: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AccountInfo" }) as any as Schema.Schema<AccountInfo>;

export interface OrgUnitInfo {
  /** The name of the organizational unit to search, as provided by the [Admin SDK Directory API](https://developers.google.com/admin-sdk/directory/). */
  orgUnitId?: string;
}

export const OrgUnitInfo: Schema.Schema<OrgUnitInfo> = Schema.suspend(() => Schema.Struct({
  orgUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "OrgUnitInfo" }) as any as Schema.Schema<OrgUnitInfo>;

export interface SharedDriveInfo {
  /** A list of shared drive IDs, as provided by the [Drive API](https://developers.google.com/drive). */
  sharedDriveIds?: Array<string>;
}

export const SharedDriveInfo: Schema.Schema<SharedDriveInfo> = Schema.suspend(() => Schema.Struct({
  sharedDriveIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SharedDriveInfo" }) as any as Schema.Schema<SharedDriveInfo>;

export interface HangoutsChatInfo {
  /** A list of Chat spaces IDs, as provided by the [Chat API](https://developers.google.com/workspace/chat). There is a limit of exporting from 500 Chat spaces per request. */
  roomId?: Array<string>;
}

export const HangoutsChatInfo: Schema.Schema<HangoutsChatInfo> = Schema.suspend(() => Schema.Struct({
  roomId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "HangoutsChatInfo" }) as any as Schema.Schema<HangoutsChatInfo>;

export interface SitesUrlInfo {
  /** A list of published site URLs. */
  urls?: Array<string>;
}

export const SitesUrlInfo: Schema.Schema<SitesUrlInfo> = Schema.suspend(() => Schema.Struct({
  urls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SitesUrlInfo" }) as any as Schema.Schema<SitesUrlInfo>;

export interface DriveDocumentIds {
  /** Required. A list of Drive document IDs. */
  ids?: Array<string>;
}

export const DriveDocumentIds: Schema.Schema<DriveDocumentIds> = Schema.suspend(() => Schema.Struct({
  ids: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DriveDocumentIds" }) as any as Schema.Schema<DriveDocumentIds>;

export interface DriveDocumentInfo {
  /** Specify Drive documents by document ID. */
  documentIds?: DriveDocumentIds;
}

export const DriveDocumentInfo: Schema.Schema<DriveDocumentInfo> = Schema.suspend(() => Schema.Struct({
  documentIds: Schema.optional(DriveDocumentIds),
})).annotate({ identifier: "DriveDocumentInfo" }) as any as Schema.Schema<DriveDocumentInfo>;

export interface TeamDriveInfo {
  /** List of Team Drive IDs, as provided by the [Drive API](https://developers.google.com/drive). */
  teamDriveIds?: Array<string>;
}

export const TeamDriveInfo: Schema.Schema<TeamDriveInfo> = Schema.suspend(() => Schema.Struct({
  teamDriveIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TeamDriveInfo" }) as any as Schema.Schema<TeamDriveInfo>;

export interface MailOptions {
  /** Set to **true** to exclude drafts. */
  excludeDrafts?: boolean;
  /** Specifies whether the results should include encrypted content, unencrypted content, or both. Defaults to including both. */
  clientSideEncryptedOption?: "CLIENT_SIDE_ENCRYPTED_OPTION_UNSPECIFIED" | "CLIENT_SIDE_ENCRYPTED_OPTION_ANY" | "CLIENT_SIDE_ENCRYPTED_OPTION_ENCRYPTED" | "CLIENT_SIDE_ENCRYPTED_OPTION_UNENCRYPTED" | (string & {});
}

export const MailOptions: Schema.Schema<MailOptions> = Schema.suspend(() => Schema.Struct({
  excludeDrafts: Schema.optional(Schema.Boolean),
  clientSideEncryptedOption: Schema.optional(Schema.String),
})).annotate({ identifier: "MailOptions" }) as any as Schema.Schema<MailOptions>;

export interface DriveOptions {
  /** Search the current version of the Drive file, but export the contents of the last version saved before 12:00 AM UTC on the specified date. Enter the date in UTC. */
  versionDate?: string;
  /** Set to true to include Team Drive. */
  includeTeamDrives?: boolean;
  /** Set to **true** to include shared drives. */
  includeSharedDrives?: boolean;
  /** Set whether the results include only content encrypted with [Google Workspace Client-side encryption](https://support.google.com/a?p=cse_ov) content, only unencrypted content, or both. Defaults to both. Currently supported for Drive. */
  clientSideEncryptedOption?: "CLIENT_SIDE_ENCRYPTED_OPTION_UNSPECIFIED" | "CLIENT_SIDE_ENCRYPTED_OPTION_ANY" | "CLIENT_SIDE_ENCRYPTED_OPTION_ENCRYPTED" | "CLIENT_SIDE_ENCRYPTED_OPTION_UNENCRYPTED" | (string & {});
  /** Optional. Options to include or exclude documents in shared drives. We recommend using this field over include_shared_drives. This field overrides include_shared_drives and include_team_drives when set. */
  sharedDrivesOption?: "SHARED_DRIVES_OPTION_UNSPECIFIED" | "NOT_INCLUDED" | "INCLUDED_IF_ACCOUNT_IS_NOT_A_MEMBER" | "INCLUDED" | (string & {});
}

export const DriveOptions: Schema.Schema<DriveOptions> = Schema.suspend(() => Schema.Struct({
  versionDate: Schema.optional(Schema.String),
  includeTeamDrives: Schema.optional(Schema.Boolean),
  includeSharedDrives: Schema.optional(Schema.Boolean),
  clientSideEncryptedOption: Schema.optional(Schema.String),
  sharedDrivesOption: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveOptions" }) as any as Schema.Schema<DriveOptions>;

export interface HangoutsChatOptions {
  /** For searches by account or organizational unit, set to **true** to include rooms. */
  includeRooms?: boolean;
}

export const HangoutsChatOptions: Schema.Schema<HangoutsChatOptions> = Schema.suspend(() => Schema.Struct({
  includeRooms: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "HangoutsChatOptions" }) as any as Schema.Schema<HangoutsChatOptions>;

export interface VoiceOptions {
  /** Datatypes to search */
  coveredData?: Array<"COVERED_DATA_UNSPECIFIED" | "TEXT_MESSAGES" | "VOICEMAILS" | "CALL_LOGS" | (string & {})>;
}

export const VoiceOptions: Schema.Schema<VoiceOptions> = Schema.suspend(() => Schema.Struct({
  coveredData: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "VoiceOptions" }) as any as Schema.Schema<VoiceOptions>;

export interface CalendarOptions {
  /** Matches only those events whose location contains all of the words in the given set. If the string contains quoted phrases, this method only matches those events whose location contain the exact phrase. Entries in the set are considered in "and". Word splitting example: ["New Zealand"] vs ["New","Zealand"] "New Zealand": matched by both "New and better Zealand": only matched by the later */
  locationQuery?: Array<string>;
  /** Matches only those events whose attendees contain all of the words in the given set. Entries in the set are considered in "and". */
  peopleQuery?: Array<string>;
  /** Matches only those events that do not contain any of the words in the given set in title, description, location, or attendees. Entries in the set are considered in "or". */
  minusWords?: Array<string>;
  /** Matches only events for which the custodian gave one of these responses. If the set is empty or contains ATTENDEE_RESPONSE_UNSPECIFIED there will be no filtering on responses. */
  responseStatuses?: Array<"ATTENDEE_RESPONSE_UNSPECIFIED" | "ATTENDEE_RESPONSE_NEEDS_ACTION" | "ATTENDEE_RESPONSE_ACCEPTED" | "ATTENDEE_RESPONSE_DECLINED" | "ATTENDEE_RESPONSE_TENTATIVE" | (string & {})>;
  /** Search the current version of the Calendar event, but export the contents of the last version saved before 12:00 AM UTC on the specified date. Enter the date in UTC. */
  versionDate?: string;
}

export const CalendarOptions: Schema.Schema<CalendarOptions> = Schema.suspend(() => Schema.Struct({
  locationQuery: Schema.optional(Schema.Array(Schema.String)),
  peopleQuery: Schema.optional(Schema.Array(Schema.String)),
  minusWords: Schema.optional(Schema.Array(Schema.String)),
  responseStatuses: Schema.optional(Schema.Array(Schema.String)),
  versionDate: Schema.optional(Schema.String),
})).annotate({ identifier: "CalendarOptions" }) as any as Schema.Schema<CalendarOptions>;

export interface GeminiOptions {
}

export const GeminiOptions: Schema.Schema<GeminiOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GeminiOptions" }) as any as Schema.Schema<GeminiOptions>;

export interface Query {
  /** The Google Workspace service to search. */
  corpus?: "CORPUS_TYPE_UNSPECIFIED" | "DRIVE" | "MAIL" | "GROUPS" | "HANGOUTS_CHAT" | "VOICE" | "CALENDAR" | "GEMINI" | (string & {});
  /** The data source to search. */
  dataScope?: "DATA_SCOPE_UNSPECIFIED" | "ALL_DATA" | "HELD_DATA" | "UNPROCESSED_DATA" | (string & {});
  /** The search method to use. */
  searchMethod?: "SEARCH_METHOD_UNSPECIFIED" | "ACCOUNT" | "ORG_UNIT" | "TEAM_DRIVE" | "ENTIRE_ORG" | "ROOM" | "SITES_URL" | "SHARED_DRIVE" | "DRIVE_DOCUMENT" | (string & {});
  /** The entity to search. This field replaces **searchMethod** to support shared drives. When **searchMethod** is **TEAM_DRIVE**, the response of this field is **SHARED_DRIVE**. */
  method?: "SEARCH_METHOD_UNSPECIFIED" | "ACCOUNT" | "ORG_UNIT" | "TEAM_DRIVE" | "ENTIRE_ORG" | "ROOM" | "SITES_URL" | "SHARED_DRIVE" | "DRIVE_DOCUMENT" | (string & {});
  /** Service-specific [search operators](https://support.google.com/vault/answer/2474474) to filter search results. */
  terms?: string;
  /** The start time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date. */
  startTime?: string;
  /** The end time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date. */
  endTime?: string;
  /** Required when **SearchMethod** is **ACCOUNT**. */
  accountInfo?: AccountInfo;
  /** Required when **SearchMethod** is **ORG_UNIT**. */
  orgUnitInfo?: OrgUnitInfo;
  /** Required when **SearchMethod** is **SHARED_DRIVE**. */
  sharedDriveInfo?: SharedDriveInfo;
  /** Required when **SearchMethod** is **ROOM**. (read-only) */
  hangoutsChatInfo?: HangoutsChatInfo;
  /** Required when **SearchMethod** is **SITES_URL**. */
  sitesUrlInfo?: SitesUrlInfo;
  /** Required when **SearchMethod** is **DRIVE_DOCUMENT**. */
  driveDocumentInfo?: DriveDocumentInfo;
  /** Required when **SearchMethod** is **TEAM_DRIVE**. */
  teamDriveInfo?: TeamDriveInfo;
  /** Set Gmail search-specific options. */
  mailOptions?: MailOptions;
  /** Set Drive search-specific options. */
  driveOptions?: DriveOptions;
  /** Set Chat search-specific options. (read-only) */
  hangoutsChatOptions?: HangoutsChatOptions;
  /** Set Voice search-specific options. */
  voiceOptions?: VoiceOptions;
  /** Set Calendar search-specific options. */
  calendarOptions?: CalendarOptions;
  /** Set Gemini search-specific options. */
  geminiOptions?: GeminiOptions;
  /** The time zone name. It should be an IANA TZ name, such as "America/Los_Angeles". For a list of time zone names, see [Time Zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For more information about how Vault uses time zones, see [the Vault help center](https://support.google.com/vault/answer/6092995#time). */
  timeZone?: string;
}

export const Query: Schema.Schema<Query> = Schema.suspend(() => Schema.Struct({
  corpus: Schema.optional(Schema.String),
  dataScope: Schema.optional(Schema.String),
  searchMethod: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  terms: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  accountInfo: Schema.optional(AccountInfo),
  orgUnitInfo: Schema.optional(OrgUnitInfo),
  sharedDriveInfo: Schema.optional(SharedDriveInfo),
  hangoutsChatInfo: Schema.optional(HangoutsChatInfo),
  sitesUrlInfo: Schema.optional(SitesUrlInfo),
  driveDocumentInfo: Schema.optional(DriveDocumentInfo),
  teamDriveInfo: Schema.optional(TeamDriveInfo),
  mailOptions: Schema.optional(MailOptions),
  driveOptions: Schema.optional(DriveOptions),
  hangoutsChatOptions: Schema.optional(HangoutsChatOptions),
  voiceOptions: Schema.optional(VoiceOptions),
  calendarOptions: Schema.optional(CalendarOptions),
  geminiOptions: Schema.optional(GeminiOptions),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "Query" }) as any as Schema.Schema<Query>;

export interface CountArtifactsRequest {
  /** The search query. */
  query?: Query;
  /** Sets the granularity of the count results. */
  view?: "COUNT_RESULT_VIEW_UNSPECIFIED" | "TOTAL_COUNT" | "ALL" | (string & {});
}

export const CountArtifactsRequest: Schema.Schema<CountArtifactsRequest> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Query),
  view: Schema.optional(Schema.String),
})).annotate({ identifier: "CountArtifactsRequest" }) as any as Schema.Schema<CountArtifactsRequest>;

export interface UserInfo {
  /** The email address of the user. */
  email?: string;
  /** The displayed name of the user. */
  displayName?: string;
}

export const UserInfo: Schema.Schema<UserInfo> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "UserInfo" }) as any as Schema.Schema<UserInfo>;

export interface MailExportOptions {
  /** The file format for exported messages. */
  exportFormat?: "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST" | "ICS" | "XML" | (string & {});
  /** To export confidential mode content, set to **true**. */
  showConfidentialModeContent?: boolean;
  /** To use the new export system, set to **true**. */
  useNewExport?: boolean;
  /** Optional. To enable exporting linked Drive files, set to **true**. */
  exportLinkedDriveFiles?: boolean;
}

export const MailExportOptions: Schema.Schema<MailExportOptions> = Schema.suspend(() => Schema.Struct({
  exportFormat: Schema.optional(Schema.String),
  showConfidentialModeContent: Schema.optional(Schema.Boolean),
  useNewExport: Schema.optional(Schema.Boolean),
  exportLinkedDriveFiles: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MailExportOptions" }) as any as Schema.Schema<MailExportOptions>;

export interface GroupsExportOptions {
  /** The file format for exported messages. */
  exportFormat?: "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST" | "ICS" | "XML" | (string & {});
}

export const GroupsExportOptions: Schema.Schema<GroupsExportOptions> = Schema.suspend(() => Schema.Struct({
  exportFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GroupsExportOptions" }) as any as Schema.Schema<GroupsExportOptions>;

export interface DriveExportOptions {
  /** To include access level information for users with [indirect access](https://support.google.com/vault/answer/6099459#metadata) to files, set to **true**. */
  includeAccessInfo?: boolean;
}

export const DriveExportOptions: Schema.Schema<DriveExportOptions> = Schema.suspend(() => Schema.Struct({
  includeAccessInfo: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DriveExportOptions" }) as any as Schema.Schema<DriveExportOptions>;

export interface HangoutsChatExportOptions {
  /** The file format for exported messages. */
  exportFormat?: "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST" | "ICS" | "XML" | (string & {});
}

export const HangoutsChatExportOptions: Schema.Schema<HangoutsChatExportOptions> = Schema.suspend(() => Schema.Struct({
  exportFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "HangoutsChatExportOptions" }) as any as Schema.Schema<HangoutsChatExportOptions>;

export interface VoiceExportOptions {
  /** The file format for exported text messages. */
  exportFormat?: "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST" | "ICS" | "XML" | (string & {});
}

export const VoiceExportOptions: Schema.Schema<VoiceExportOptions> = Schema.suspend(() => Schema.Struct({
  exportFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "VoiceExportOptions" }) as any as Schema.Schema<VoiceExportOptions>;

export interface CalendarExportOptions {
  /** The file format for exported text messages. */
  exportFormat?: "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST" | "ICS" | "XML" | (string & {});
}

export const CalendarExportOptions: Schema.Schema<CalendarExportOptions> = Schema.suspend(() => Schema.Struct({
  exportFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "CalendarExportOptions" }) as any as Schema.Schema<CalendarExportOptions>;

export interface GeminiExportOptions {
  /** The file format for exported messages. */
  exportFormat?: "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST" | "ICS" | "XML" | (string & {});
}

export const GeminiExportOptions: Schema.Schema<GeminiExportOptions> = Schema.suspend(() => Schema.Struct({
  exportFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GeminiExportOptions" }) as any as Schema.Schema<GeminiExportOptions>;

export interface ExportOptions {
  /** Options for Gmail exports. */
  mailOptions?: MailExportOptions;
  /** Options for Groups exports. */
  groupsOptions?: GroupsExportOptions;
  /** Options for Drive exports. */
  driveOptions?: DriveExportOptions;
  /** Options for Chat exports. */
  hangoutsChatOptions?: HangoutsChatExportOptions;
  /** Options for Voice exports. */
  voiceOptions?: VoiceExportOptions;
  /** Option available for Calendar export. */
  calendarOptions?: CalendarExportOptions;
  /** Option available for Gemini export. */
  geminiOptions?: GeminiExportOptions;
  /** The requested data region for the export. */
  region?: "EXPORT_REGION_UNSPECIFIED" | "ANY" | "US" | "EUROPE" | (string & {});
}

export const ExportOptions: Schema.Schema<ExportOptions> = Schema.suspend(() => Schema.Struct({
  mailOptions: Schema.optional(MailExportOptions),
  groupsOptions: Schema.optional(GroupsExportOptions),
  driveOptions: Schema.optional(DriveExportOptions),
  hangoutsChatOptions: Schema.optional(HangoutsChatExportOptions),
  voiceOptions: Schema.optional(VoiceExportOptions),
  calendarOptions: Schema.optional(CalendarExportOptions),
  geminiOptions: Schema.optional(GeminiExportOptions),
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportOptions" }) as any as Schema.Schema<ExportOptions>;

export interface ExportStats {
  /** The number of messages or files already processed for export. */
  exportedArtifactCount?: string;
  /** The number of messages or files to be exported. */
  totalArtifactCount?: string;
  /** The size of export in bytes. */
  sizeInBytes?: string;
}

export const ExportStats: Schema.Schema<ExportStats> = Schema.suspend(() => Schema.Struct({
  exportedArtifactCount: Schema.optional(Schema.String),
  totalArtifactCount: Schema.optional(Schema.String),
  sizeInBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportStats" }) as any as Schema.Schema<ExportStats>;

export interface CloudStorageFile {
  /** The name of the Cloud Storage bucket for the export file. You can use this value in the Cloud Storage [JSON API](https://cloud.google.com/storage/docs/json_api) or [XML API](https://cloud.google.com/storage/docs/xml-api), but not to list the bucket contents. Instead, you can [get individual export files](https://cloud.google.com/storage/docs/json_api/v1/objects/get) by object name. */
  bucketName?: string;
  /** The name of the Cloud Storage object for the export file. You can use this value in the Cloud Storage [JSON API](https://cloud.google.com/storage/docs/json_api) or [XML API](https://cloud.google.com/storage/docs/xml-api). */
  objectName?: string;
  /** The export file size. */
  size?: string;
  /** The md5 hash of the file. */
  md5Hash?: string;
}

export const CloudStorageFile: Schema.Schema<CloudStorageFile> = Schema.suspend(() => Schema.Struct({
  bucketName: Schema.optional(Schema.String),
  objectName: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
  md5Hash: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudStorageFile" }) as any as Schema.Schema<CloudStorageFile>;

export interface CloudStorageSink {
  /** Output only. The exported files in Cloud Storage. */
  files?: Array<CloudStorageFile>;
}

export const CloudStorageSink: Schema.Schema<CloudStorageSink> = Schema.suspend(() => Schema.Struct({
  files: Schema.optional(Schema.Array(CloudStorageFile)),
})).annotate({ identifier: "CloudStorageSink" }) as any as Schema.Schema<CloudStorageSink>;

export interface Export {
  /** Output only. The generated export ID. */
  id?: string;
  /** Output only. The matter ID. */
  matterId?: string;
  /** Output only. Identifies the parent export that spawned this child export. This is only set on child exports. */
  parentExportId?: string;
  /** The export name. Don't use special characters (~!$'(),;@:/?) in the name, they can prevent you from downloading exports. */
  name?: string;
  /** Output only. The requester of the export. */
  requester?: UserInfo;
  /** The query parameters used to create the export. */
  query?: Query;
  /** Additional export options. */
  exportOptions?: ExportOptions;
  /** Output only. The time when the export was created. */
  createTime?: string;
  /** Output only. The status of the export. */
  status?: "EXPORT_STATUS_UNSPECIFIED" | "COMPLETED" | "FAILED" | "IN_PROGRESS" | (string & {});
  /** Output only. Details about the export progress and size. */
  stats?: ExportStats;
  /** Output only. The sink for export files in Cloud Storage. */
  cloudStorageSink?: CloudStorageSink;
}

export const Export: Schema.Schema<Export> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  matterId: Schema.optional(Schema.String),
  parentExportId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  requester: Schema.optional(UserInfo),
  query: Schema.optional(Query),
  exportOptions: Schema.optional(ExportOptions),
  createTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  stats: Schema.optional(ExportStats),
  cloudStorageSink: Schema.optional(CloudStorageSink),
})).annotate({ identifier: "Export" }) as any as Schema.Schema<Export>;

export interface ListExportsResponse {
  /** The list of exports. */
  exports?: Array<Export>;
  /** Page token to retrieve the next page of results in the list. */
  nextPageToken?: string;
}

export const ListExportsResponse: Schema.Schema<ListExportsResponse> = Schema.suspend(() => Schema.Struct({
  exports: Schema.optional(Schema.Array(Export)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListExportsResponse" }) as any as Schema.Schema<ListExportsResponse>;

export interface HeldAccount {
  /** The account ID, as provided by the [Admin SDK](https://developers.google.com/admin-sdk/). */
  accountId?: string;
  /** Output only. When the account was put on hold. */
  holdTime?: string;
  /** The primary email address of the account. If used as an input, this takes precedence over **accountId**. */
  email?: string;
  /** Output only. The first name of the account holder. */
  firstName?: string;
  /** Output only. The last name of the account holder. */
  lastName?: string;
}

export const HeldAccount: Schema.Schema<HeldAccount> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  holdTime: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  firstName: Schema.optional(Schema.String),
  lastName: Schema.optional(Schema.String),
})).annotate({ identifier: "HeldAccount" }) as any as Schema.Schema<HeldAccount>;

export interface HeldOrgUnit {
  /** The organizational unit's immutable ID as provided by the [Admin SDK](https://developers.google.com/admin-sdk/). */
  orgUnitId?: string;
  /** When the organizational unit was put on hold. This property is immutable. */
  holdTime?: string;
}

export const HeldOrgUnit: Schema.Schema<HeldOrgUnit> = Schema.suspend(() => Schema.Struct({
  orgUnitId: Schema.optional(Schema.String),
  holdTime: Schema.optional(Schema.String),
})).annotate({ identifier: "HeldOrgUnit" }) as any as Schema.Schema<HeldOrgUnit>;

export interface HeldDriveQuery {
  /** To include files in Team Drives in the hold, set to **true**. */
  includeTeamDriveFiles?: boolean;
  /** To include files in shared drives in the hold, set to **true**. */
  includeSharedDriveFiles?: boolean;
}

export const HeldDriveQuery: Schema.Schema<HeldDriveQuery> = Schema.suspend(() => Schema.Struct({
  includeTeamDriveFiles: Schema.optional(Schema.Boolean),
  includeSharedDriveFiles: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "HeldDriveQuery" }) as any as Schema.Schema<HeldDriveQuery>;

export interface HeldMailQuery {
  /** The [search operators](https://support.google.com/vault/answer/2474474) used to refine the messages covered by the hold. */
  terms?: string;
  /** The start time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date. */
  startTime?: string;
  /** The end time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date. */
  endTime?: string;
}

export const HeldMailQuery: Schema.Schema<HeldMailQuery> = Schema.suspend(() => Schema.Struct({
  terms: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "HeldMailQuery" }) as any as Schema.Schema<HeldMailQuery>;

export interface HeldGroupsQuery {
  /** The [search operators](https://support.google.com/vault/answer/2474474) used to refine the messages covered by the hold. */
  terms?: string;
  /** The start time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date. */
  startTime?: string;
  /** The end time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date. */
  endTime?: string;
}

export const HeldGroupsQuery: Schema.Schema<HeldGroupsQuery> = Schema.suspend(() => Schema.Struct({
  terms: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "HeldGroupsQuery" }) as any as Schema.Schema<HeldGroupsQuery>;

export interface HeldHangoutsChatQuery {
  /** To include messages in Chat spaces the user was a member of, set to **true**. */
  includeRooms?: boolean;
}

export const HeldHangoutsChatQuery: Schema.Schema<HeldHangoutsChatQuery> = Schema.suspend(() => Schema.Struct({
  includeRooms: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "HeldHangoutsChatQuery" }) as any as Schema.Schema<HeldHangoutsChatQuery>;

export interface HeldVoiceQuery {
  /** A list of data types covered by the hold. Should be non-empty. Order does not matter and duplicates are ignored. */
  coveredData?: Array<"COVERED_DATA_UNSPECIFIED" | "TEXT_MESSAGES" | "VOICEMAILS" | "CALL_LOGS" | (string & {})>;
}

export const HeldVoiceQuery: Schema.Schema<HeldVoiceQuery> = Schema.suspend(() => Schema.Struct({
  coveredData: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "HeldVoiceQuery" }) as any as Schema.Schema<HeldVoiceQuery>;

export interface HeldCalendarQuery {
}

export const HeldCalendarQuery: Schema.Schema<HeldCalendarQuery> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "HeldCalendarQuery" }) as any as Schema.Schema<HeldCalendarQuery>;

export interface CorpusQuery {
  /** Service-specific options for Drive holds. If set, **CorpusType** must be **DRIVE**. */
  driveQuery?: HeldDriveQuery;
  /** Service-specific options for Gmail holds. If set, **CorpusType** must be **MAIL**. */
  mailQuery?: HeldMailQuery;
  /** Service-specific options for Groups holds. If set, **CorpusType** must be **GROUPS**. */
  groupsQuery?: HeldGroupsQuery;
  /** Service-specific options for Chat holds. If set, **CorpusType** must be **HANGOUTS_CHAT**. */
  hangoutsChatQuery?: HeldHangoutsChatQuery;
  /** Service-specific options for Voice holds. If set, **CorpusType** must be **VOICE**. */
  voiceQuery?: HeldVoiceQuery;
  /** Service-specific options for Calendar holds. If set, **CorpusType** must be **CALENDAR**. */
  calendarQuery?: HeldCalendarQuery;
}

export const CorpusQuery: Schema.Schema<CorpusQuery> = Schema.suspend(() => Schema.Struct({
  driveQuery: Schema.optional(HeldDriveQuery),
  mailQuery: Schema.optional(HeldMailQuery),
  groupsQuery: Schema.optional(HeldGroupsQuery),
  hangoutsChatQuery: Schema.optional(HeldHangoutsChatQuery),
  voiceQuery: Schema.optional(HeldVoiceQuery),
  calendarQuery: Schema.optional(HeldCalendarQuery),
})).annotate({ identifier: "CorpusQuery" }) as any as Schema.Schema<CorpusQuery>;

export interface Hold {
  /** The unique immutable ID of the hold. Assigned during creation. */
  holdId?: string;
  /** The name of the hold. */
  name?: string;
  /** The last time this hold was modified. */
  updateTime?: string;
  /** If set, the hold applies to the specified accounts and **orgUnit** must be empty. */
  accounts?: Array<HeldAccount>;
  /** If set, the hold applies to all members of the organizational unit and **accounts** must be empty. This property is mutable. For Groups holds, set **accounts**. */
  orgUnit?: HeldOrgUnit;
  /** The service to be searched. */
  corpus?: "CORPUS_TYPE_UNSPECIFIED" | "DRIVE" | "MAIL" | "GROUPS" | "HANGOUTS_CHAT" | "VOICE" | "CALENDAR" | "GEMINI" | (string & {});
  /** Service-specific options. If set, **CorpusQuery** must match **CorpusType**. */
  query?: CorpusQuery;
}

export const Hold: Schema.Schema<Hold> = Schema.suspend(() => Schema.Struct({
  holdId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  accounts: Schema.optional(Schema.Array(HeldAccount)),
  orgUnit: Schema.optional(HeldOrgUnit),
  corpus: Schema.optional(Schema.String),
  query: Schema.optional(CorpusQuery),
})).annotate({ identifier: "Hold" }) as any as Schema.Schema<Hold>;

export interface ListHoldsResponse {
  /** The list of holds. */
  holds?: Array<Hold>;
  /** Page token to retrieve the next page of results in the list. If this is empty, then there are no more holds to list. */
  nextPageToken?: string;
}

export const ListHoldsResponse: Schema.Schema<ListHoldsResponse> = Schema.suspend(() => Schema.Struct({
  holds: Schema.optional(Schema.Array(Hold)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListHoldsResponse" }) as any as Schema.Schema<ListHoldsResponse>;

export interface AddHeldAccountsRequest {
  /** A comma-separated list of the emails of the accounts to add to the hold. Specify either **emails** or **account_ids**, but not both. */
  emails?: Array<string>;
  /** A comma-separated list of the account IDs of the accounts to add to the hold. Specify either **emails** or **account_ids**, but not both. */
  accountIds?: Array<string>;
}

export const AddHeldAccountsRequest: Schema.Schema<AddHeldAccountsRequest> = Schema.suspend(() => Schema.Struct({
  emails: Schema.optional(Schema.Array(Schema.String)),
  accountIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AddHeldAccountsRequest" }) as any as Schema.Schema<AddHeldAccountsRequest>;

export interface AddHeldAccountResult {
  /** Returned when the account was successfully created. */
  account?: HeldAccount;
  /** Reports the request status. If it failed, returns an error message. */
  status?: Status;
}

export const AddHeldAccountResult: Schema.Schema<AddHeldAccountResult> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(HeldAccount),
  status: Schema.optional(Status),
})).annotate({ identifier: "AddHeldAccountResult" }) as any as Schema.Schema<AddHeldAccountResult>;

export interface AddHeldAccountsResponse {
  /** The list of responses, in the same order as the batch request. */
  responses?: Array<AddHeldAccountResult>;
}

export const AddHeldAccountsResponse: Schema.Schema<AddHeldAccountsResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(AddHeldAccountResult)),
})).annotate({ identifier: "AddHeldAccountsResponse" }) as any as Schema.Schema<AddHeldAccountsResponse>;

export interface RemoveHeldAccountsRequest {
  /** The account IDs of the accounts to remove from the hold. */
  accountIds?: Array<string>;
}

export const RemoveHeldAccountsRequest: Schema.Schema<RemoveHeldAccountsRequest> = Schema.suspend(() => Schema.Struct({
  accountIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RemoveHeldAccountsRequest" }) as any as Schema.Schema<RemoveHeldAccountsRequest>;

export interface RemoveHeldAccountsResponse {
  /** A list of statuses for the deleted accounts. Results have the same order as the request. */
  statuses?: Array<Status>;
}

export const RemoveHeldAccountsResponse: Schema.Schema<RemoveHeldAccountsResponse> = Schema.suspend(() => Schema.Struct({
  statuses: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "RemoveHeldAccountsResponse" }) as any as Schema.Schema<RemoveHeldAccountsResponse>;

export interface ListHeldAccountsResponse {
  /** The held accounts on a hold. */
  accounts?: Array<HeldAccount>;
}

export const ListHeldAccountsResponse: Schema.Schema<ListHeldAccountsResponse> = Schema.suspend(() => Schema.Struct({
  accounts: Schema.optional(Schema.Array(HeldAccount)),
})).annotate({ identifier: "ListHeldAccountsResponse" }) as any as Schema.Schema<ListHeldAccountsResponse>;

export interface SavedQuery {
  /** A unique identifier for the saved query. */
  savedQueryId?: string;
  /** The name of the saved query. */
  displayName?: string;
  /** The search parameters of the saved query. */
  query?: Query;
  /** Output only. The matter ID of the matter the saved query is saved in. The server does not use this field during create and always uses matter ID in the URL. */
  matterId?: string;
  /** Output only. The server-generated timestamp when the saved query was created. */
  createTime?: string;
}

export const SavedQuery: Schema.Schema<SavedQuery> = Schema.suspend(() => Schema.Struct({
  savedQueryId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  query: Schema.optional(Query),
  matterId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SavedQuery" }) as any as Schema.Schema<SavedQuery>;

export interface ListSavedQueriesResponse {
  /** List of saved queries. */
  savedQueries?: Array<SavedQuery>;
  /** Page token to retrieve the next page of results in the list. If this is empty, then there are no more saved queries to list. */
  nextPageToken?: string;
}

export const ListSavedQueriesResponse: Schema.Schema<ListSavedQueriesResponse> = Schema.suspend(() => Schema.Struct({
  savedQueries: Schema.optional(Schema.Array(SavedQuery)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSavedQueriesResponse" }) as any as Schema.Schema<ListSavedQueriesResponse>;

export interface AccountCountError {
  /** Account owner. */
  account?: UserInfo;
  /** Account query error. */
  errorType?: "ERROR_TYPE_UNSPECIFIED" | "WILDCARD_TOO_BROAD" | "TOO_MANY_TERMS" | "LOCATION_UNAVAILABLE" | "UNKNOWN" | "DEADLINE_EXCEEDED" | (string & {});
}

export const AccountCountError: Schema.Schema<AccountCountError> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(UserInfo),
  errorType: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountCountError" }) as any as Schema.Schema<AccountCountError>;

export interface AccountCount {
  /** Account owner. */
  account?: UserInfo;
  /** The number of results (messages or files) found for this account. */
  count?: string;
}

export const AccountCount: Schema.Schema<AccountCount> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(UserInfo),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountCount" }) as any as Schema.Schema<AccountCount>;

export interface MailCountResult {
  /** Total number of accounts involved in this count operation. */
  queriedAccountsCount?: string;
  /** Total number of accounts that can be queried and have more than zero messages. */
  matchingAccountsCount?: string;
  /** When **DataScope** is **HELD_DATA** and when account emails are passed in explicitly, the list of accounts in the request that are not queried because they are not on hold in the matter. For other data scopes, this field is not set. */
  nonQueryableAccounts?: Array<string>;
  /** Errors occurred when querying these accounts. */
  accountCountErrors?: Array<AccountCountError>;
  /** Subtotal count per matching account that have more than zero messages. */
  accountCounts?: Array<AccountCount>;
}

export const MailCountResult: Schema.Schema<MailCountResult> = Schema.suspend(() => Schema.Struct({
  queriedAccountsCount: Schema.optional(Schema.String),
  matchingAccountsCount: Schema.optional(Schema.String),
  nonQueryableAccounts: Schema.optional(Schema.Array(Schema.String)),
  accountCountErrors: Schema.optional(Schema.Array(AccountCountError)),
  accountCounts: Schema.optional(Schema.Array(AccountCount)),
})).annotate({ identifier: "MailCountResult" }) as any as Schema.Schema<MailCountResult>;

export interface GroupsCountResult {
  /** Total number of accounts involved in this count operation. */
  queriedAccountsCount?: string;
  /** Total number of accounts that can be queried and have more than zero messages. */
  matchingAccountsCount?: string;
  /** When **DataScope** is **HELD_DATA**, these accounts in the request are not queried because they are not on hold. For other data scope, this field is not set. */
  nonQueryableAccounts?: Array<string>;
  /** Error occurred when querying these accounts. */
  accountCountErrors?: Array<AccountCountError>;
  /** Subtotal count per matching account that have more than zero messages. */
  accountCounts?: Array<AccountCount>;
}

export const GroupsCountResult: Schema.Schema<GroupsCountResult> = Schema.suspend(() => Schema.Struct({
  queriedAccountsCount: Schema.optional(Schema.String),
  matchingAccountsCount: Schema.optional(Schema.String),
  nonQueryableAccounts: Schema.optional(Schema.Array(Schema.String)),
  accountCountErrors: Schema.optional(Schema.Array(AccountCountError)),
  accountCounts: Schema.optional(Schema.Array(AccountCount)),
})).annotate({ identifier: "GroupsCountResult" }) as any as Schema.Schema<GroupsCountResult>;

export interface CountArtifactsResponse {
  /** Total count of messages. */
  totalCount?: string;
  /** Count metrics for Gmail and classic Hangouts. */
  mailCountResult?: MailCountResult;
  /** Count metrics for Groups. */
  groupsCountResult?: GroupsCountResult;
}

export const CountArtifactsResponse: Schema.Schema<CountArtifactsResponse> = Schema.suspend(() => Schema.Struct({
  totalCount: Schema.optional(Schema.String),
  mailCountResult: Schema.optional(MailCountResult),
  groupsCountResult: Schema.optional(GroupsCountResult),
})).annotate({ identifier: "CountArtifactsResponse" }) as any as Schema.Schema<CountArtifactsResponse>;

export interface CountArtifactsMetadata {
  /** Creation time of count operation. */
  startTime?: string;
  /** End time of count operation. Available when operation is done. */
  endTime?: string;
  /** The matter ID of the associated matter. */
  matterId?: string;
  /** The search query from the request. */
  query?: Query;
}

export const CountArtifactsMetadata: Schema.Schema<CountArtifactsMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  matterId: Schema.optional(Schema.String),
  query: Schema.optional(Query),
})).annotate({ identifier: "CountArtifactsMetadata" }) as any as Schema.Schema<CountArtifactsMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse_Op = ListOperationsResponse;
export const ListOperationsResponse_Op = ListOperationsResponse;

export type ListOperationsError = CommonErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listOperations: API.PaginatedOperationMethod<ListOperationsRequest, ListOperationsResponse_Op, ListOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface DeleteOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOperationsRequest>;

export type DeleteOperationsResponse = Empty;
export const DeleteOperationsResponse = Empty;

export type DeleteOperationsError = CommonErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteOperations: API.OperationMethod<DeleteOperationsRequest, DeleteOperationsResponse, DeleteOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = Empty;
export const CancelOperationsResponse = Empty;

export type CancelOperationsError = CommonErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelOperations: API.OperationMethod<CancelOperationsRequest, CancelOperationsResponse, CancelOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

export interface CreateMattersRequest {
  /** Request body */
  body?: Matter;
}

export const CreateMattersRequest = Schema.Struct({
  body: Schema.optional(Matter).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateMattersRequest>;

export type CreateMattersResponse = Matter;
export const CreateMattersResponse = Matter;

export type CreateMattersError = CommonErrors;

/** Creates a matter with the given name and description. The initial state is open, and the owner is the method caller. Returns the created matter with default view. */
export const createMatters: API.OperationMethod<CreateMattersRequest, CreateMattersResponse, CreateMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateMattersRequest,
  output: CreateMattersResponse,
  errors: [],
}));

export interface UpdateMattersRequest {
  /** The matter ID. */
  matterId: string;
  /** Request body */
  body?: Matter;
}

export const UpdateMattersRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(Matter).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/matters/{matterId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateMattersRequest>;

export type UpdateMattersResponse = Matter;
export const UpdateMattersResponse = Matter;

export type UpdateMattersError = CommonErrors;

/** Updates the specified matter. This updates only the name and description of the matter, identified by matter ID. Changes to any other fields are ignored. Returns the default view of the matter. */
export const updateMatters: API.OperationMethod<UpdateMattersRequest, UpdateMattersResponse, UpdateMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateMattersRequest,
  output: UpdateMattersResponse,
  errors: [],
}));

export interface CloseMattersRequest {
  /** The matter ID. */
  matterId: string;
  /** Request body */
  body?: CloseMatterRequest;
}

export const CloseMattersRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(CloseMatterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}:close", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CloseMattersRequest>;

export type CloseMattersResponse = CloseMatterResponse;
export const CloseMattersResponse = CloseMatterResponse;

export type CloseMattersError = CommonErrors;

/** Closes the specified matter. Returns the matter with updated state. */
export const closeMatters: API.OperationMethod<CloseMattersRequest, CloseMattersResponse, CloseMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CloseMattersRequest,
  output: CloseMattersResponse,
  errors: [],
}));

export interface ReopenMattersRequest {
  /** The matter ID. */
  matterId: string;
  /** Request body */
  body?: ReopenMatterRequest;
}

export const ReopenMattersRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(ReopenMatterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}:reopen", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReopenMattersRequest>;

export type ReopenMattersResponse = ReopenMatterResponse;
export const ReopenMattersResponse = ReopenMatterResponse;

export type ReopenMattersError = CommonErrors;

/** Reopens the specified matter. Returns the matter with updated state. */
export const reopenMatters: API.OperationMethod<ReopenMattersRequest, ReopenMattersResponse, ReopenMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReopenMattersRequest,
  output: ReopenMattersResponse,
  errors: [],
}));

export interface DeleteMattersRequest {
  /** The matter ID */
  matterId: string;
}

export const DeleteMattersRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/matters/{matterId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMattersRequest>;

export type DeleteMattersResponse = Matter;
export const DeleteMattersResponse = Matter;

export type DeleteMattersError = CommonErrors;

/** Deletes the specified matter. Returns the matter with updated state. */
export const deleteMatters: API.OperationMethod<DeleteMattersRequest, DeleteMattersResponse, DeleteMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMattersRequest,
  output: DeleteMattersResponse,
  errors: [],
}));

export interface UndeleteMattersRequest {
  /** The matter ID. */
  matterId: string;
  /** Request body */
  body?: UndeleteMatterRequest;
}

export const UndeleteMattersRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(UndeleteMatterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteMattersRequest>;

export type UndeleteMattersResponse = Matter;
export const UndeleteMattersResponse = Matter;

export type UndeleteMattersError = CommonErrors;

/** Undeletes the specified matter. Returns the matter with updated state. */
export const undeleteMatters: API.OperationMethod<UndeleteMattersRequest, UndeleteMattersResponse, UndeleteMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteMattersRequest,
  output: UndeleteMattersResponse,
  errors: [],
}));

export interface GetMattersRequest {
  /** The matter ID. */
  matterId: string;
  /** Specifies how much information about the matter to return in the response. */
  view?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetMattersRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/matters/{matterId}" }),
  svc,
) as unknown as Schema.Schema<GetMattersRequest>;

export type GetMattersResponse = Matter;
export const GetMattersResponse = Matter;

export type GetMattersError = CommonErrors;

/** Gets the specified matter. */
export const getMatters: API.OperationMethod<GetMattersRequest, GetMattersResponse, GetMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMattersRequest,
  output: GetMattersResponse,
  errors: [],
}));

export interface ListMattersRequest {
  /** The number of matters to return in the response. Default and maximum are 100. */
  pageSize?: number;
  /** The pagination token as returned in the response. */
  pageToken?: string;
  /** Specifies how much information about the matter to return in response. */
  view?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** If set, lists only matters with the specified state. The default lists matters of all states. */
  state?: "STATE_UNSPECIFIED" | "OPEN" | "CLOSED" | "DELETED" | (string & {});
}

export const ListMattersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  state: Schema.optional(Schema.String).pipe(T.HttpQuery("state")),
}).pipe(
  T.Http({ method: "GET", path: "v1/matters" }),
  svc,
) as unknown as Schema.Schema<ListMattersRequest>;

export type ListMattersResponse_Op = ListMattersResponse;
export const ListMattersResponse_Op = ListMattersResponse;

export type ListMattersError = CommonErrors;

/** Lists matters the requestor has access to. */
export const listMatters: API.PaginatedOperationMethod<ListMattersRequest, ListMattersResponse_Op, ListMattersError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMattersRequest,
  output: ListMattersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface AddPermissionsMattersRequest {
  /** The matter ID. */
  matterId: string;
  /** Request body */
  body?: AddMatterPermissionsRequest;
}

export const AddPermissionsMattersRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(AddMatterPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}:addPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddPermissionsMattersRequest>;

export type AddPermissionsMattersResponse = MatterPermission;
export const AddPermissionsMattersResponse = MatterPermission;

export type AddPermissionsMattersError = CommonErrors;

/** Adds an account as a matter collaborator. */
export const addPermissionsMatters: API.OperationMethod<AddPermissionsMattersRequest, AddPermissionsMattersResponse, AddPermissionsMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddPermissionsMattersRequest,
  output: AddPermissionsMattersResponse,
  errors: [],
}));

export interface RemovePermissionsMattersRequest {
  /** The matter ID. */
  matterId: string;
  /** Request body */
  body?: RemoveMatterPermissionsRequest;
}

export const RemovePermissionsMattersRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(RemoveMatterPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}:removePermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemovePermissionsMattersRequest>;

export type RemovePermissionsMattersResponse = Empty;
export const RemovePermissionsMattersResponse = Empty;

export type RemovePermissionsMattersError = CommonErrors;

/** Removes an account as a matter collaborator. */
export const removePermissionsMatters: API.OperationMethod<RemovePermissionsMattersRequest, RemovePermissionsMattersResponse, RemovePermissionsMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemovePermissionsMattersRequest,
  output: RemovePermissionsMattersResponse,
  errors: [],
}));

export interface CountMattersRequest {
  /** The matter ID. */
  matterId: string;
  /** Request body */
  body?: CountArtifactsRequest;
}

export const CountMattersRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(CountArtifactsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}:count", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CountMattersRequest>;

export type CountMattersResponse = Operation;
export const CountMattersResponse = Operation;

export type CountMattersError = CommonErrors;

/** Counts the accounts processed by the specified query. */
export const countMatters: API.OperationMethod<CountMattersRequest, CountMattersResponse, CountMattersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CountMattersRequest,
  output: CountMattersResponse,
  errors: [],
}));

export interface CreateMattersExportsRequest {
  /** The matter ID. */
  matterId: string;
  /** Request body */
  body?: Export;
}

export const CreateMattersExportsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(Export).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}/exports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateMattersExportsRequest>;

export type CreateMattersExportsResponse = Export;
export const CreateMattersExportsResponse = Export;

export type CreateMattersExportsError = CommonErrors;

/** Creates an export. */
export const createMattersExports: API.OperationMethod<CreateMattersExportsRequest, CreateMattersExportsResponse, CreateMattersExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateMattersExportsRequest,
  output: CreateMattersExportsResponse,
  errors: [],
}));

export interface DeleteMattersExportsRequest {
  /** The matter ID. */
  matterId: string;
  /** The export ID. */
  exportId: string;
}

export const DeleteMattersExportsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  exportId: Schema.String.pipe(T.HttpPath("exportId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/matters/{matterId}/exports/{exportId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMattersExportsRequest>;

export type DeleteMattersExportsResponse = Empty;
export const DeleteMattersExportsResponse = Empty;

export type DeleteMattersExportsError = CommonErrors;

/** Deletes an export. */
export const deleteMattersExports: API.OperationMethod<DeleteMattersExportsRequest, DeleteMattersExportsResponse, DeleteMattersExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMattersExportsRequest,
  output: DeleteMattersExportsResponse,
  errors: [],
}));

export interface GetMattersExportsRequest {
  /** The matter ID. */
  matterId: string;
  /** The export ID. */
  exportId: string;
}

export const GetMattersExportsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  exportId: Schema.String.pipe(T.HttpPath("exportId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/matters/{matterId}/exports/{exportId}" }),
  svc,
) as unknown as Schema.Schema<GetMattersExportsRequest>;

export type GetMattersExportsResponse = Export;
export const GetMattersExportsResponse = Export;

export type GetMattersExportsError = CommonErrors;

/** Gets an export. */
export const getMattersExports: API.OperationMethod<GetMattersExportsRequest, GetMattersExportsResponse, GetMattersExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMattersExportsRequest,
  output: GetMattersExportsResponse,
  errors: [],
}));

export interface ListMattersExportsRequest {
  /** The matter ID. */
  matterId: string;
  /** The number of exports to return in the response. */
  pageSize?: number;
  /** The pagination token as returned in the response. */
  pageToken?: string;
}

export const ListMattersExportsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/matters/{matterId}/exports" }),
  svc,
) as unknown as Schema.Schema<ListMattersExportsRequest>;

export type ListMattersExportsResponse = ListExportsResponse;
export const ListMattersExportsResponse = ListExportsResponse;

export type ListMattersExportsError = CommonErrors;

/** Lists details about the exports in the specified matter. */
export const listMattersExports: API.PaginatedOperationMethod<ListMattersExportsRequest, ListMattersExportsResponse, ListMattersExportsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMattersExportsRequest,
  output: ListMattersExportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateMattersHoldsRequest {
  /** The matter ID. */
  matterId: string;
  /** Request body */
  body?: Hold;
}

export const CreateMattersHoldsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(Hold).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}/holds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateMattersHoldsRequest>;

export type CreateMattersHoldsResponse = Hold;
export const CreateMattersHoldsResponse = Hold;

export type CreateMattersHoldsError = CommonErrors;

/** Creates a hold in the specified matter. */
export const createMattersHolds: API.OperationMethod<CreateMattersHoldsRequest, CreateMattersHoldsResponse, CreateMattersHoldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateMattersHoldsRequest,
  output: CreateMattersHoldsResponse,
  errors: [],
}));

export interface UpdateMattersHoldsRequest {
  /** The matter ID. */
  matterId: string;
  /** The ID of the hold. */
  holdId: string;
  /** Request body */
  body?: Hold;
}

export const UpdateMattersHoldsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  holdId: Schema.String.pipe(T.HttpPath("holdId")),
  body: Schema.optional(Hold).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/matters/{matterId}/holds/{holdId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateMattersHoldsRequest>;

export type UpdateMattersHoldsResponse = Hold;
export const UpdateMattersHoldsResponse = Hold;

export type UpdateMattersHoldsError = CommonErrors;

/** Updates the scope (organizational unit or accounts) and query parameters of a hold. You cannot add accounts to a hold that covers an organizational unit, nor can you add organizational units to a hold that covers individual accounts. If you try, the unsupported values are ignored. */
export const updateMattersHolds: API.OperationMethod<UpdateMattersHoldsRequest, UpdateMattersHoldsResponse, UpdateMattersHoldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateMattersHoldsRequest,
  output: UpdateMattersHoldsResponse,
  errors: [],
}));

export interface DeleteMattersHoldsRequest {
  /** The matter ID. */
  matterId: string;
  /** The hold ID. */
  holdId: string;
}

export const DeleteMattersHoldsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  holdId: Schema.String.pipe(T.HttpPath("holdId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/matters/{matterId}/holds/{holdId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMattersHoldsRequest>;

export type DeleteMattersHoldsResponse = Empty;
export const DeleteMattersHoldsResponse = Empty;

export type DeleteMattersHoldsError = CommonErrors;

/** Removes the specified hold and releases the accounts or organizational unit covered by the hold. If the data is not preserved by another hold or retention rule, it might be purged. */
export const deleteMattersHolds: API.OperationMethod<DeleteMattersHoldsRequest, DeleteMattersHoldsResponse, DeleteMattersHoldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMattersHoldsRequest,
  output: DeleteMattersHoldsResponse,
  errors: [],
}));

export interface GetMattersHoldsRequest {
  /** The matter ID. */
  matterId: string;
  /** The hold ID. */
  holdId: string;
  /** The amount of detail to return for a hold. */
  view?: "HOLD_VIEW_UNSPECIFIED" | "BASIC_HOLD" | "FULL_HOLD" | (string & {});
}

export const GetMattersHoldsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  holdId: Schema.String.pipe(T.HttpPath("holdId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/matters/{matterId}/holds/{holdId}" }),
  svc,
) as unknown as Schema.Schema<GetMattersHoldsRequest>;

export type GetMattersHoldsResponse = Hold;
export const GetMattersHoldsResponse = Hold;

export type GetMattersHoldsError = CommonErrors;

/** Gets the specified hold. */
export const getMattersHolds: API.OperationMethod<GetMattersHoldsRequest, GetMattersHoldsResponse, GetMattersHoldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMattersHoldsRequest,
  output: GetMattersHoldsResponse,
  errors: [],
}));

export interface ListMattersHoldsRequest {
  /** The matter ID. */
  matterId: string;
  /** The number of holds to return in the response, between 0 and 100 inclusive. Leaving this empty, or as 0, is the same as **page_size** = 100. */
  pageSize?: number;
  /** The pagination token as returned in the response. An empty token means start from the beginning. */
  pageToken?: string;
  /** The amount of detail to return for a hold. */
  view?: "HOLD_VIEW_UNSPECIFIED" | "BASIC_HOLD" | "FULL_HOLD" | (string & {});
}

export const ListMattersHoldsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/matters/{matterId}/holds" }),
  svc,
) as unknown as Schema.Schema<ListMattersHoldsRequest>;

export type ListMattersHoldsResponse = ListHoldsResponse;
export const ListMattersHoldsResponse = ListHoldsResponse;

export type ListMattersHoldsError = CommonErrors;

/** Lists the holds in a matter. */
export const listMattersHolds: API.PaginatedOperationMethod<ListMattersHoldsRequest, ListMattersHoldsResponse, ListMattersHoldsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMattersHoldsRequest,
  output: ListMattersHoldsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface AddHeldAccountsMattersHoldsRequest {
  /** The matter ID. */
  matterId: string;
  /** The hold ID. */
  holdId: string;
  /** Request body */
  body?: AddHeldAccountsRequest;
}

export const AddHeldAccountsMattersHoldsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  holdId: Schema.String.pipe(T.HttpPath("holdId")),
  body: Schema.optional(AddHeldAccountsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}/holds/{holdId}:addHeldAccounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddHeldAccountsMattersHoldsRequest>;

export type AddHeldAccountsMattersHoldsResponse = AddHeldAccountsResponse;
export const AddHeldAccountsMattersHoldsResponse = AddHeldAccountsResponse;

export type AddHeldAccountsMattersHoldsError = CommonErrors;

/** Adds accounts to a hold. Returns a list of accounts that have been successfully added. Accounts can be added only to an existing account-based hold. */
export const addHeldAccountsMattersHolds: API.OperationMethod<AddHeldAccountsMattersHoldsRequest, AddHeldAccountsMattersHoldsResponse, AddHeldAccountsMattersHoldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddHeldAccountsMattersHoldsRequest,
  output: AddHeldAccountsMattersHoldsResponse,
  errors: [],
}));

export interface RemoveHeldAccountsMattersHoldsRequest {
  /** The matter ID. */
  matterId: string;
  /** The hold ID. */
  holdId: string;
  /** Request body */
  body?: RemoveHeldAccountsRequest;
}

export const RemoveHeldAccountsMattersHoldsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  holdId: Schema.String.pipe(T.HttpPath("holdId")),
  body: Schema.optional(RemoveHeldAccountsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}/holds/{holdId}:removeHeldAccounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveHeldAccountsMattersHoldsRequest>;

export type RemoveHeldAccountsMattersHoldsResponse = RemoveHeldAccountsResponse;
export const RemoveHeldAccountsMattersHoldsResponse = RemoveHeldAccountsResponse;

export type RemoveHeldAccountsMattersHoldsError = CommonErrors;

/** Removes the specified accounts from a hold. Returns a list of statuses in the same order as the request. */
export const removeHeldAccountsMattersHolds: API.OperationMethod<RemoveHeldAccountsMattersHoldsRequest, RemoveHeldAccountsMattersHoldsResponse, RemoveHeldAccountsMattersHoldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveHeldAccountsMattersHoldsRequest,
  output: RemoveHeldAccountsMattersHoldsResponse,
  errors: [],
}));

export interface CreateMattersHoldsAccountsRequest {
  /** The matter ID. */
  matterId: string;
  /** The hold ID. */
  holdId: string;
  /** Request body */
  body?: HeldAccount;
}

export const CreateMattersHoldsAccountsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  holdId: Schema.String.pipe(T.HttpPath("holdId")),
  body: Schema.optional(HeldAccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}/holds/{holdId}/accounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateMattersHoldsAccountsRequest>;

export type CreateMattersHoldsAccountsResponse = HeldAccount;
export const CreateMattersHoldsAccountsResponse = HeldAccount;

export type CreateMattersHoldsAccountsError = CommonErrors;

/** Adds an account to a hold. Accounts can be added only to a hold that does not have an organizational unit set. If you try to add an account to an organizational unit-based hold, an error is returned. */
export const createMattersHoldsAccounts: API.OperationMethod<CreateMattersHoldsAccountsRequest, CreateMattersHoldsAccountsResponse, CreateMattersHoldsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateMattersHoldsAccountsRequest,
  output: CreateMattersHoldsAccountsResponse,
  errors: [],
}));

export interface DeleteMattersHoldsAccountsRequest {
  /** The matter ID. */
  matterId: string;
  /** The hold ID. */
  holdId: string;
  /** The ID of the account to remove from the hold. */
  accountId: string;
}

export const DeleteMattersHoldsAccountsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  holdId: Schema.String.pipe(T.HttpPath("holdId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/matters/{matterId}/holds/{holdId}/accounts/{accountId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMattersHoldsAccountsRequest>;

export type DeleteMattersHoldsAccountsResponse = Empty;
export const DeleteMattersHoldsAccountsResponse = Empty;

export type DeleteMattersHoldsAccountsError = CommonErrors;

/** Removes an account from a hold. */
export const deleteMattersHoldsAccounts: API.OperationMethod<DeleteMattersHoldsAccountsRequest, DeleteMattersHoldsAccountsResponse, DeleteMattersHoldsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMattersHoldsAccountsRequest,
  output: DeleteMattersHoldsAccountsResponse,
  errors: [],
}));

export interface ListMattersHoldsAccountsRequest {
  /** The matter ID. */
  matterId: string;
  /** The hold ID. */
  holdId: string;
}

export const ListMattersHoldsAccountsRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  holdId: Schema.String.pipe(T.HttpPath("holdId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/matters/{matterId}/holds/{holdId}/accounts" }),
  svc,
) as unknown as Schema.Schema<ListMattersHoldsAccountsRequest>;

export type ListMattersHoldsAccountsResponse = ListHeldAccountsResponse;
export const ListMattersHoldsAccountsResponse = ListHeldAccountsResponse;

export type ListMattersHoldsAccountsError = CommonErrors;

/** Lists the accounts covered by a hold. This can list only individually-specified accounts covered by the hold. If the hold covers an organizational unit, use the [Admin SDK](https://developers.google.com/admin-sdk/). to list the members of the organizational unit on hold. */
export const listMattersHoldsAccounts: API.OperationMethod<ListMattersHoldsAccountsRequest, ListMattersHoldsAccountsResponse, ListMattersHoldsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListMattersHoldsAccountsRequest,
  output: ListMattersHoldsAccountsResponse,
  errors: [],
}));

export interface CreateMattersSavedQueriesRequest {
  /** The ID of the matter to create the saved query in. */
  matterId: string;
  /** Request body */
  body?: SavedQuery;
}

export const CreateMattersSavedQueriesRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  body: Schema.optional(SavedQuery).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/matters/{matterId}/savedQueries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateMattersSavedQueriesRequest>;

export type CreateMattersSavedQueriesResponse = SavedQuery;
export const CreateMattersSavedQueriesResponse = SavedQuery;

export type CreateMattersSavedQueriesError = CommonErrors;

/** Creates a saved query. */
export const createMattersSavedQueries: API.OperationMethod<CreateMattersSavedQueriesRequest, CreateMattersSavedQueriesResponse, CreateMattersSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateMattersSavedQueriesRequest,
  output: CreateMattersSavedQueriesResponse,
  errors: [],
}));

export interface DeleteMattersSavedQueriesRequest {
  /** The ID of the matter to delete the saved query from. */
  matterId: string;
  /** ID of the saved query to delete. */
  savedQueryId: string;
}

export const DeleteMattersSavedQueriesRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  savedQueryId: Schema.String.pipe(T.HttpPath("savedQueryId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/matters/{matterId}/savedQueries/{savedQueryId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMattersSavedQueriesRequest>;

export type DeleteMattersSavedQueriesResponse = Empty;
export const DeleteMattersSavedQueriesResponse = Empty;

export type DeleteMattersSavedQueriesError = CommonErrors;

/** Deletes the specified saved query. */
export const deleteMattersSavedQueries: API.OperationMethod<DeleteMattersSavedQueriesRequest, DeleteMattersSavedQueriesResponse, DeleteMattersSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMattersSavedQueriesRequest,
  output: DeleteMattersSavedQueriesResponse,
  errors: [],
}));

export interface GetMattersSavedQueriesRequest {
  /** The ID of the matter to get the saved query from. */
  matterId: string;
  /** ID of the saved query to retrieve. */
  savedQueryId: string;
}

export const GetMattersSavedQueriesRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  savedQueryId: Schema.String.pipe(T.HttpPath("savedQueryId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/matters/{matterId}/savedQueries/{savedQueryId}" }),
  svc,
) as unknown as Schema.Schema<GetMattersSavedQueriesRequest>;

export type GetMattersSavedQueriesResponse = SavedQuery;
export const GetMattersSavedQueriesResponse = SavedQuery;

export type GetMattersSavedQueriesError = CommonErrors;

/** Retrieves the specified saved query. */
export const getMattersSavedQueries: API.OperationMethod<GetMattersSavedQueriesRequest, GetMattersSavedQueriesResponse, GetMattersSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMattersSavedQueriesRequest,
  output: GetMattersSavedQueriesResponse,
  errors: [],
}));

export interface ListMattersSavedQueriesRequest {
  /** The ID of the matter to get the saved queries for. */
  matterId: string;
  /** The maximum number of saved queries to return. */
  pageSize?: number;
  /** The pagination token as returned in the previous response. An empty token means start from the beginning. */
  pageToken?: string;
}

export const ListMattersSavedQueriesRequest = Schema.Struct({
  matterId: Schema.String.pipe(T.HttpPath("matterId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/matters/{matterId}/savedQueries" }),
  svc,
) as unknown as Schema.Schema<ListMattersSavedQueriesRequest>;

export type ListMattersSavedQueriesResponse = ListSavedQueriesResponse;
export const ListMattersSavedQueriesResponse = ListSavedQueriesResponse;

export type ListMattersSavedQueriesError = CommonErrors;

/** Lists the saved queries in a matter. */
export const listMattersSavedQueries: API.PaginatedOperationMethod<ListMattersSavedQueriesRequest, ListMattersSavedQueriesResponse, ListMattersSavedQueriesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMattersSavedQueriesRequest,
  output: ListMattersSavedQueriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

