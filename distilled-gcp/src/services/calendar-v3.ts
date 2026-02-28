// ==========================================================================
// Calendar API (calendar v3)
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
  name: "calendar",
  version: "v3",
  rootUrl: "https://www.googleapis.com/",
  servicePath: "calendar/v3/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AclRule {
  /** ETag of the resource. */
  etag?: string;
  /** Identifier of the Access Control List (ACL) rule. See Sharing calendars. */
  id?: string;
  /** Type of the resource ("calendar#aclRule"). */
  kind?: string;
  /** The role assigned to the scope. Possible values are: - "none" - Provides no access. - "freeBusyReader" - Provides read access to free/busy information. - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. Provides read access to the calendar's ACLs. - "owner" - Provides manager access to the calendar. This role has all of the permissions of the writer role with the additional ability to modify access levels of other users. Important: the owner role is different from the calendar's data owner. A calendar has a single data owner, but can have multiple users with owner role. */
  role?: string;
  /** The extent to which calendar access is granted by this ACL rule. */
  scope?: { type?: string; value?: string };
}

export const AclRule: Schema.Schema<AclRule> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.Struct({ type: Schema.optional(Schema.String), value: Schema.optional(Schema.String) })),
})).annotate({ identifier: "AclRule" }) as any as Schema.Schema<AclRule>;

export interface Acl {
  /** ETag of the collection. */
  etag?: string;
  /** List of rules on the access control list. */
  items?: Array<AclRule>;
  /** Type of the collection ("calendar#acl"). */
  kind?: string;
  /** Token used to access the next page of this result. Omitted if no further results are available, in which case nextSyncToken is provided. */
  nextPageToken?: string;
  /** Token used at a later point in time to retrieve only the entries that have changed since this result was returned. Omitted if further results are available, in which case nextPageToken is provided. */
  nextSyncToken?: string;
}

export const Acl: Schema.Schema<Acl> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(AclRule)),
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  nextSyncToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Acl" }) as any as Schema.Schema<Acl>;

export interface ConferenceProperties {
  /** The types of conference solutions that are supported for this calendar. The possible values are: - "eventHangout" - "eventNamedHangout" - "hangoutsMeet" Optional. */
  allowedConferenceSolutionTypes?: Array<string>;
}

export const ConferenceProperties: Schema.Schema<ConferenceProperties> = Schema.suspend(() => Schema.Struct({
  allowedConferenceSolutionTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ConferenceProperties" }) as any as Schema.Schema<ConferenceProperties>;

export interface Calendar {
  /** Whether this calendar automatically accepts invitations. Only valid for resource calendars. */
  autoAcceptInvitations?: boolean;
  /** Conferencing properties for this calendar, for example what types of conferences are allowed. */
  conferenceProperties?: ConferenceProperties;
  /** The email of the owner of the calendar. Set only for secondary calendars. Read-only. */
  dataOwner?: string;
  /** Description of the calendar. Optional. */
  description?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Identifier of the calendar. To retrieve IDs call the calendarList.list() method. */
  id?: string;
  /** Type of the resource ("calendar#calendar"). */
  kind?: string;
  /** Geographic location of the calendar as free-form text. Optional. */
  location?: string;
  /** Title of the calendar. */
  summary?: string;
  /** The time zone of the calendar. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) Optional. */
  timeZone?: string;
}

export const Calendar: Schema.Schema<Calendar> = Schema.suspend(() => Schema.Struct({
  autoAcceptInvitations: Schema.optional(Schema.Boolean),
  conferenceProperties: Schema.optional(ConferenceProperties),
  dataOwner: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "Calendar" }) as any as Schema.Schema<Calendar>;

export interface EventReminder {
  /** The method used by this reminder. Possible values are: - "email" - Reminders are sent via email. - "popup" - Reminders are sent via a UI popup. Required when adding a reminder. */
  method?: string;
  /** Number of minutes before the start of the event when the reminder should trigger. Valid values are between 0 and 40320 (4 weeks in minutes). Required when adding a reminder. */
  minutes?: number;
}

export const EventReminder: Schema.Schema<EventReminder> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  minutes: Schema.optional(Schema.Number),
})).annotate({ identifier: "EventReminder" }) as any as Schema.Schema<EventReminder>;

export interface CalendarNotification {
  /** The method used to deliver the notification. The possible value is: - "email" - Notifications are sent via email. Required when adding a notification. */
  method?: string;
  /** The type of notification. Possible values are: - "eventCreation" - Notification sent when a new event is put on the calendar. - "eventChange" - Notification sent when an event is changed. - "eventCancellation" - Notification sent when an event is cancelled. - "eventResponse" - Notification sent when an attendee responds to the event invitation. - "agenda" - An agenda with the events of the day (sent out in the morning). Required when adding a notification. */
  type?: string;
}

export const CalendarNotification: Schema.Schema<CalendarNotification> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "CalendarNotification" }) as any as Schema.Schema<CalendarNotification>;

export interface CalendarListEntry {
  /** The effective access role that the authenticated user has on the calendar. Read-only. Possible values are: - "freeBusyReader" - Provides read access to free/busy information. - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. - "owner" - Provides manager access to the calendar. This role has all of the permissions of the writer role with the additional ability to see and modify access levels of other users. Important: the owner role is different from the calendar's data owner. A calendar has a single data owner, but can have multiple users with owner role. */
  accessRole?: string;
  /** Whether this calendar automatically accepts invitations. Only valid for resource calendars. Read-only. */
  autoAcceptInvitations?: boolean;
  /** The main color of the calendar in the hexadecimal format "#0088aa". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional. */
  backgroundColor?: string;
  /** The color of the calendar. This is an ID referring to an entry in the calendar section of the colors definition (see the colors endpoint). This property is superseded by the backgroundColor and foregroundColor properties and can be ignored when using these properties. Optional. */
  colorId?: string;
  /** Conferencing properties for this calendar, for example what types of conferences are allowed. */
  conferenceProperties?: ConferenceProperties;
  /** The email of the owner of the calendar. Set only for secondary calendars. Read-only. */
  dataOwner?: string;
  /** The default reminders that the authenticated user has for this calendar. */
  defaultReminders?: Array<EventReminder>;
  /** Whether this calendar list entry has been deleted from the calendar list. Read-only. Optional. The default is False. */
  deleted?: boolean;
  /** Description of the calendar. Optional. Read-only. */
  description?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The foreground color of the calendar in the hexadecimal format "#ffffff". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional. */
  foregroundColor?: string;
  /** Whether the calendar has been hidden from the list. Optional. The attribute is only returned when the calendar is hidden, in which case the value is true. */
  hidden?: boolean;
  /** Identifier of the calendar. */
  id?: string;
  /** Type of the resource ("calendar#calendarListEntry"). */
  kind?: string;
  /** Geographic location of the calendar as free-form text. Optional. Read-only. */
  location?: string;
  /** The notifications that the authenticated user is receiving for this calendar. */
  notificationSettings?: { notifications?: Array<CalendarNotification> };
  /** Whether the calendar is the primary calendar of the authenticated user. Read-only. Optional. The default is False. */
  primary?: boolean;
  /** Whether the calendar content shows up in the calendar UI. Optional. The default is False. */
  selected?: boolean;
  /** Title of the calendar. Read-only. */
  summary?: string;
  /** The summary that the authenticated user has set for this calendar. Optional. */
  summaryOverride?: string;
  /** The time zone of the calendar. Optional. Read-only. */
  timeZone?: string;
}

export const CalendarListEntry: Schema.Schema<CalendarListEntry> = Schema.suspend(() => Schema.Struct({
  accessRole: Schema.optional(Schema.String),
  autoAcceptInvitations: Schema.optional(Schema.Boolean),
  backgroundColor: Schema.optional(Schema.String),
  colorId: Schema.optional(Schema.String),
  conferenceProperties: Schema.optional(ConferenceProperties),
  dataOwner: Schema.optional(Schema.String),
  defaultReminders: Schema.optional(Schema.Array(EventReminder)),
  deleted: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  foregroundColor: Schema.optional(Schema.String),
  hidden: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  notificationSettings: Schema.optional(Schema.Struct({ notifications: Schema.optional(Schema.Array(CalendarNotification)) })),
  primary: Schema.optional(Schema.Boolean),
  selected: Schema.optional(Schema.Boolean),
  summary: Schema.optional(Schema.String),
  summaryOverride: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "CalendarListEntry" }) as any as Schema.Schema<CalendarListEntry>;

export interface CalendarList {
  /** ETag of the collection. */
  etag?: string;
  /** Calendars that are present on the user's calendar list. */
  items?: Array<CalendarListEntry>;
  /** Type of the collection ("calendar#calendarList"). */
  kind?: string;
  /** Token used to access the next page of this result. Omitted if no further results are available, in which case nextSyncToken is provided. */
  nextPageToken?: string;
  /** Token used at a later point in time to retrieve only the entries that have changed since this result was returned. Omitted if further results are available, in which case nextPageToken is provided. */
  nextSyncToken?: string;
}

export const CalendarList: Schema.Schema<CalendarList> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(CalendarListEntry)),
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  nextSyncToken: Schema.optional(Schema.String),
})).annotate({ identifier: "CalendarList" }) as any as Schema.Schema<CalendarList>;

export interface Channel {
  /** The address where notifications are delivered for this channel. */
  address?: string;
  /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
  expiration?: string;
  /** A UUID or similar unique string that identifies this channel. */
  id?: string;
  /** Identifies this as a notification channel used to watch for changes to a resource, which is "api#channel". */
  kind?: string;
  /** Additional parameters controlling delivery channel behavior. Optional. */
  params?: Record<string, string>;
  /** A Boolean value to indicate whether payload is wanted. Optional. */
  payload?: boolean;
  /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
  resourceId?: string;
  /** A version-specific identifier for the watched resource. */
  resourceUri?: string;
  /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
  token?: string;
  /** The type of delivery mechanism used for this channel. Valid values are "web_hook" (or "webhook"). Both values refer to a channel where Http requests are used to deliver messages. */
  type?: string;
}

export const Channel: Schema.Schema<Channel> = Schema.suspend(() => Schema.Struct({
  address: Schema.optional(Schema.String),
  expiration: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  params: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  payload: Schema.optional(Schema.Boolean),
  resourceId: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface ColorDefinition {
  /** The background color associated with this color definition. */
  background?: string;
  /** The foreground color that can be used to write on top of a background with 'background' color. */
  foreground?: string;
}

export const ColorDefinition: Schema.Schema<ColorDefinition> = Schema.suspend(() => Schema.Struct({
  background: Schema.optional(Schema.String),
  foreground: Schema.optional(Schema.String),
})).annotate({ identifier: "ColorDefinition" }) as any as Schema.Schema<ColorDefinition>;

export interface Colors {
  /** A global palette of calendar colors, mapping from the color ID to its definition. A calendarListEntry resource refers to one of these color IDs in its colorId field. Read-only. */
  calendar?: Record<string, ColorDefinition>;
  /** A global palette of event colors, mapping from the color ID to its definition. An event resource may refer to one of these color IDs in its colorId field. Read-only. */
  event?: Record<string, ColorDefinition>;
  /** Type of the resource ("calendar#colors"). */
  kind?: string;
  /** Last modification time of the color palette (as a RFC3339 timestamp). Read-only. */
  updated?: string;
}

export const Colors: Schema.Schema<Colors> = Schema.suspend(() => Schema.Struct({
  calendar: Schema.optional(Schema.Record(Schema.String, ColorDefinition)),
  event: Schema.optional(Schema.Record(Schema.String, ColorDefinition)),
  kind: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
})).annotate({ identifier: "Colors" }) as any as Schema.Schema<Colors>;

export interface ConferenceSolutionKey {
  /** The conference solution type. If a client encounters an unfamiliar or empty type, it should still be able to display the entry points. However, it should disallow modifications. The possible values are: - "eventHangout" for Hangouts for consumers (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "eventNamedHangout" for classic Hangouts for Google Workspace users (deprecated; existing events may show this conference solution type but new conferences cannot be created) - "hangoutsMeet" for Google Meet (http://meet.google.com) - "addOn" for 3P conference providers */
  type?: string;
}

export const ConferenceSolutionKey: Schema.Schema<ConferenceSolutionKey> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ConferenceSolutionKey" }) as any as Schema.Schema<ConferenceSolutionKey>;

export interface ConferenceSolution {
  /** The user-visible icon for this solution. */
  iconUri?: string;
  /** The key which can uniquely identify the conference solution for this event. */
  key?: ConferenceSolutionKey;
  /** The user-visible name of this solution. Not localized. */
  name?: string;
}

export const ConferenceSolution: Schema.Schema<ConferenceSolution> = Schema.suspend(() => Schema.Struct({
  iconUri: Schema.optional(Schema.String),
  key: Schema.optional(ConferenceSolutionKey),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ConferenceSolution" }) as any as Schema.Schema<ConferenceSolution>;

export interface ConferenceRequestStatus {
  /** The current status of the conference create request. Read-only. The possible values are: - "pending": the conference create request is still being processed. - "success": the conference create request succeeded, the entry points are populated. - "failure": the conference create request failed, there are no entry points. */
  statusCode?: string;
}

export const ConferenceRequestStatus: Schema.Schema<ConferenceRequestStatus> = Schema.suspend(() => Schema.Struct({
  statusCode: Schema.optional(Schema.String),
})).annotate({ identifier: "ConferenceRequestStatus" }) as any as Schema.Schema<ConferenceRequestStatus>;

export interface CreateConferenceRequest {
  /** The conference solution, such as Hangouts or Google Meet. */
  conferenceSolutionKey?: ConferenceSolutionKey;
  /** The client-generated unique ID for this request. Clients should regenerate this ID for every new request. If an ID provided is the same as for the previous request, the request is ignored. */
  requestId?: string;
  /** The status of the conference create request. */
  status?: ConferenceRequestStatus;
}

export const CreateConferenceRequest: Schema.Schema<CreateConferenceRequest> = Schema.suspend(() => Schema.Struct({
  conferenceSolutionKey: Schema.optional(ConferenceSolutionKey),
  requestId: Schema.optional(Schema.String),
  status: Schema.optional(ConferenceRequestStatus),
})).annotate({ identifier: "CreateConferenceRequest" }) as any as Schema.Schema<CreateConferenceRequest>;

export interface EntryPoint {
  /** The access code to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional. */
  accessCode?: string;
  /** Features of the entry point, such as being toll or toll-free. One entry point can have multiple features. However, toll and toll-free cannot be both set on the same entry point. */
  entryPointFeatures?: Array<string>;
  /** The type of the conference entry point. Possible values are: - "video" - joining a conference over HTTP. A conference can have zero or one video entry point. - "phone" - joining a conference by dialing a phone number. A conference can have zero or more phone entry points. - "sip" - joining a conference over SIP. A conference can have zero or one sip entry point. - "more" - further conference joining instructions, for example additional phone numbers. A conference can have zero or one more entry point. A conference with only a more entry point is not a valid conference. */
  entryPointType?: string;
  /** The label for the URI. Visible to end users. Not localized. The maximum length is 512 characters. Examples: - for video: meet.google.com/aaa-bbbb-ccc - for phone: +1 123 268 2601 - for sip: 12345678@altostrat.com - for more: should not be filled Optional. */
  label?: string;
  /** The meeting code to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional. */
  meetingCode?: string;
  /** The passcode to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. */
  passcode?: string;
  /** The password to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional. */
  password?: string;
  /** The PIN to access the conference. The maximum length is 128 characters. When creating new conference data, populate only the subset of {meetingCode, accessCode, passcode, password, pin} fields that match the terminology that the conference provider uses. Only the populated fields should be displayed. Optional. */
  pin?: string;
  /** The CLDR/ISO 3166 region code for the country associated with this phone access. Example: "SE" for Sweden. Calendar backend will populate this field only for EntryPointType.PHONE. */
  regionCode?: string;
  /** The URI of the entry point. The maximum length is 1300 characters. Format: - for video, http: or https: schema is required. - for phone, tel: schema is required. The URI should include the entire dial sequence (e.g., tel:+12345678900,,,123456789;1234). - for sip, sip: schema is required, e.g., sip:12345678@myprovider.com. - for more, http: or https: schema is required. */
  uri?: string;
}

export const EntryPoint: Schema.Schema<EntryPoint> = Schema.suspend(() => Schema.Struct({
  accessCode: Schema.optional(Schema.String),
  entryPointFeatures: Schema.optional(Schema.Array(Schema.String)),
  entryPointType: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  meetingCode: Schema.optional(Schema.String),
  passcode: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  pin: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "EntryPoint" }) as any as Schema.Schema<EntryPoint>;

export interface ConferenceParametersAddOnParameters {
  parameters?: Record<string, string>;
}

export const ConferenceParametersAddOnParameters: Schema.Schema<ConferenceParametersAddOnParameters> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ConferenceParametersAddOnParameters" }) as any as Schema.Schema<ConferenceParametersAddOnParameters>;

export interface ConferenceParameters {
  /** Additional add-on specific data. */
  addOnParameters?: ConferenceParametersAddOnParameters;
}

export const ConferenceParameters: Schema.Schema<ConferenceParameters> = Schema.suspend(() => Schema.Struct({
  addOnParameters: Schema.optional(ConferenceParametersAddOnParameters),
})).annotate({ identifier: "ConferenceParameters" }) as any as Schema.Schema<ConferenceParameters>;

export interface ConferenceData {
  /** The ID of the conference. Can be used by developers to keep track of conferences, should not be displayed to users. The ID value is formed differently for each conference solution type: - eventHangout: ID is not set. (This conference type is deprecated.) - eventNamedHangout: ID is the name of the Hangout. (This conference type is deprecated.) - hangoutsMeet: ID is the 10-letter meeting code, for example aaa-bbbb-ccc. - addOn: ID is defined by the third-party provider. Optional. */
  conferenceId?: string;
  /** The conference solution, such as Google Meet. Unset for a conference with a failed create request. Either conferenceSolution and at least one entryPoint, or createRequest is required. */
  conferenceSolution?: ConferenceSolution;
  /** A request to generate a new conference and attach it to the event. The data is generated asynchronously. To see whether the data is present check the status field. Either conferenceSolution and at least one entryPoint, or createRequest is required. */
  createRequest?: CreateConferenceRequest;
  /** Information about individual conference entry points, such as URLs or phone numbers. All of them must belong to the same conference. Either conferenceSolution and at least one entryPoint, or createRequest is required. */
  entryPoints?: Array<EntryPoint>;
  /** Additional notes (such as instructions from the domain administrator, legal notices) to display to the user. Can contain HTML. The maximum length is 2048 characters. Optional. */
  notes?: string;
  /** Additional properties related to a conference. An example would be a solution-specific setting for enabling video streaming. */
  parameters?: ConferenceParameters;
  /** The signature of the conference data. Generated on server side. Unset for a conference with a failed create request. Optional for a conference with a pending create request. */
  signature?: string;
}

export const ConferenceData: Schema.Schema<ConferenceData> = Schema.suspend(() => Schema.Struct({
  conferenceId: Schema.optional(Schema.String),
  conferenceSolution: Schema.optional(ConferenceSolution),
  createRequest: Schema.optional(CreateConferenceRequest),
  entryPoints: Schema.optional(Schema.Array(EntryPoint)),
  notes: Schema.optional(Schema.String),
  parameters: Schema.optional(ConferenceParameters),
  signature: Schema.optional(Schema.String),
})).annotate({ identifier: "ConferenceData" }) as any as Schema.Schema<ConferenceData>;

export interface Calendar_Error {
  /** Domain, or broad category, of the error. */
  domain?: string;
  /** Specific reason for the error. Some of the possible values are: - "groupTooBig" - The group of users requested is too large for a single query. - "tooManyCalendarsRequested" - The number of calendars requested is too large for a single query. - "notFound" - The requested resource was not found. - "internalError" - The API service has encountered an internal error. Additional error types may be added in the future, so clients should gracefully handle additional error statuses not included in this list. */
  reason?: string;
}

export const Calendar_Error: Schema.Schema<Calendar_Error> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "Calendar_Error" }) as any as Schema.Schema<Calendar_Error>;

export interface EventAttachment {
  /** ID of the attached file. Read-only. For Google Drive files, this is the ID of the corresponding Files resource entry in the Drive API. */
  fileId?: string;
  /** URL link to the attachment. For adding Google Drive file attachments use the same format as in alternateLink property of the Files resource in the Drive API. Required when adding an attachment. */
  fileUrl?: string;
  /** URL link to the attachment's icon. This field can only be modified for custom third-party attachments. */
  iconLink?: string;
  /** Internet media type (MIME type) of the attachment. */
  mimeType?: string;
  /** Attachment title. */
  title?: string;
}

export const EventAttachment: Schema.Schema<EventAttachment> = Schema.suspend(() => Schema.Struct({
  fileId: Schema.optional(Schema.String),
  fileUrl: Schema.optional(Schema.String),
  iconLink: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "EventAttachment" }) as any as Schema.Schema<EventAttachment>;

export interface EventAttendee {
  /** Number of additional guests. Optional. The default is 0. */
  additionalGuests?: number;
  /** The attendee's response comment. Optional. */
  comment?: string;
  /** The attendee's name, if available. Optional. */
  displayName?: string;
  /** The attendee's email address, if available. This field must be present when adding an attendee. It must be a valid email address as per RFC5322. Required when adding an attendee. */
  email?: string;
  /** The attendee's Profile ID, if available. */
  id?: string;
  /** Whether this is an optional attendee. Optional. The default is False. */
  optional?: boolean;
  /** Whether the attendee is the organizer of the event. Read-only. The default is False. */
  organizer?: boolean;
  /** Whether the attendee is a resource. Can only be set when the attendee is added to the event for the first time. Subsequent modifications are ignored. Optional. The default is False. */
  resource?: boolean;
  /** The attendee's response status. Possible values are: - "needsAction" - The attendee has not responded to the invitation (recommended for new events). - "declined" - The attendee has declined the invitation. - "tentative" - The attendee has tentatively accepted the invitation. - "accepted" - The attendee has accepted the invitation. Warning: If you add an event using the values declined, tentative, or accepted, attendees with the "Add invitations to my calendar" setting set to "When I respond to invitation in email" or "Only if the sender is known" might have their response reset to needsAction and won't see an event in their calendar unless they change their response in the event invitation email. Furthermore, if more than 200 guests are invited to the event, response status is not propagated to the guests. */
  responseStatus?: string;
  /** Whether this entry represents the calendar on which this copy of the event appears. Read-only. The default is False. */
  self?: boolean;
}

export const EventAttendee: Schema.Schema<EventAttendee> = Schema.suspend(() => Schema.Struct({
  additionalGuests: Schema.optional(Schema.Number),
  comment: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  optional: Schema.optional(Schema.Boolean),
  organizer: Schema.optional(Schema.Boolean),
  resource: Schema.optional(Schema.Boolean),
  responseStatus: Schema.optional(Schema.String),
  self: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EventAttendee" }) as any as Schema.Schema<EventAttendee>;

export interface EventBirthdayProperties {
  /** Resource name of the contact this birthday event is linked to. This can be used to fetch contact details from People API. Format: "people/c12345". Read-only. */
  contact?: string;
  /** Custom type label specified for this event. This is populated if birthdayProperties.type is set to "custom". Read-only. */
  customTypeName?: string;
  /** Type of birthday or special event. Possible values are: - "anniversary" - An anniversary other than birthday. Always has a contact. - "birthday" - A birthday event. This is the default value. - "custom" - A special date whose label is further specified in the customTypeName field. Always has a contact. - "other" - A special date which does not fall into the other categories, and does not have a custom label. Always has a contact. - "self" - Calendar owner's own birthday. Cannot have a contact. The Calendar API only supports creating events with the type "birthday". The type cannot be changed after the event is created. */
  type?: string;
}

export const EventBirthdayProperties: Schema.Schema<EventBirthdayProperties> = Schema.suspend(() => Schema.Struct({
  contact: Schema.optional(Schema.String),
  customTypeName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "EventBirthdayProperties" }) as any as Schema.Schema<EventBirthdayProperties>;

export interface EventDateTime {
  /** The date, in the format "yyyy-mm-dd", if this is an all-day event. */
  date?: string;
  /** The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone. */
  dateTime?: string;
  /** The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) For recurring events this field is required and specifies the time zone in which the recurrence is expanded. For single events this field is optional and indicates a custom time zone for the event start/end. */
  timeZone?: string;
}

export const EventDateTime: Schema.Schema<EventDateTime> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Schema.String),
  dateTime: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "EventDateTime" }) as any as Schema.Schema<EventDateTime>;

export interface EventFocusTimeProperties {
  /** Whether to decline meeting invitations which overlap Focus Time events. Valid values are declineNone, meaning that no meeting invitations are declined; declineAllConflictingInvitations, meaning that all conflicting meeting invitations that conflict with the event are declined; and declineOnlyNewConflictingInvitations, meaning that only new conflicting meeting invitations which arrive while the Focus Time event is present are to be declined. */
  autoDeclineMode?: string;
  /** The status to mark the user in Chat and related products. This can be available or doNotDisturb. */
  chatStatus?: string;
  /** Response message to set if an existing event or new invitation is automatically declined by Calendar. */
  declineMessage?: string;
}

export const EventFocusTimeProperties: Schema.Schema<EventFocusTimeProperties> = Schema.suspend(() => Schema.Struct({
  autoDeclineMode: Schema.optional(Schema.String),
  chatStatus: Schema.optional(Schema.String),
  declineMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "EventFocusTimeProperties" }) as any as Schema.Schema<EventFocusTimeProperties>;

export interface EventOutOfOfficeProperties {
  /** Whether to decline meeting invitations which overlap Out of office events. Valid values are declineNone, meaning that no meeting invitations are declined; declineAllConflictingInvitations, meaning that all conflicting meeting invitations that conflict with the event are declined; and declineOnlyNewConflictingInvitations, meaning that only new conflicting meeting invitations which arrive while the Out of office event is present are to be declined. */
  autoDeclineMode?: string;
  /** Response message to set if an existing event or new invitation is automatically declined by Calendar. */
  declineMessage?: string;
}

export const EventOutOfOfficeProperties: Schema.Schema<EventOutOfOfficeProperties> = Schema.suspend(() => Schema.Struct({
  autoDeclineMode: Schema.optional(Schema.String),
  declineMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "EventOutOfOfficeProperties" }) as any as Schema.Schema<EventOutOfOfficeProperties>;

export interface EventWorkingLocationProperties {
  /** If present, specifies that the user is working from a custom location. */
  customLocation?: { label?: string };
  /** If present, specifies that the user is working at home. */
  homeOffice?: unknown;
  /** If present, specifies that the user is working from an office. */
  officeLocation?: { buildingId?: string; deskId?: string; floorId?: string; floorSectionId?: string; label?: string };
  /** Type of the working location. Possible values are: - "homeOffice" - The user is working at home. - "officeLocation" - The user is working from an office. - "customLocation" - The user is working from a custom location. Any details are specified in a sub-field of the specified name, but this field may be missing if empty. Any other fields are ignored. Required when adding working location properties. */
  type?: string;
}

export const EventWorkingLocationProperties: Schema.Schema<EventWorkingLocationProperties> = Schema.suspend(() => Schema.Struct({
  customLocation: Schema.optional(Schema.Struct({ label: Schema.optional(Schema.String) })),
  homeOffice: Schema.optional(Schema.Unknown),
  officeLocation: Schema.optional(Schema.Struct({ buildingId: Schema.optional(Schema.String), deskId: Schema.optional(Schema.String), floorId: Schema.optional(Schema.String), floorSectionId: Schema.optional(Schema.String), label: Schema.optional(Schema.String) })),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "EventWorkingLocationProperties" }) as any as Schema.Schema<EventWorkingLocationProperties>;

export interface Event {
  /** Whether anyone can invite themselves to the event (deprecated). Optional. The default is False. */
  anyoneCanAddSelf?: boolean;
  /** File attachments for the event. In order to modify attachments the supportsAttachments request parameter should be set to true. There can be at most 25 attachments per event, */
  attachments?: Array<EventAttachment>;
  /** The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users. Service accounts need to use domain-wide delegation of authority to populate the attendee list. */
  attendees?: Array<EventAttendee>;
  /** Whether attendees may have been omitted from the event's representation. When retrieving an event, this may be due to a restriction specified by the maxAttendee query parameter. When updating an event, this can be used to only update the participant's response. Optional. The default is False. */
  attendeesOmitted?: boolean;
  /** Birthday or special event data. Used if eventType is "birthday". Immutable. */
  birthdayProperties?: EventBirthdayProperties;
  /** The color of the event. This is an ID referring to an entry in the event section of the colors definition (see the colors endpoint). Optional. */
  colorId?: string;
  /** The conference-related information, such as details of a Google Meet conference. To create new conference details use the createRequest field. To persist your changes, remember to set the conferenceDataVersion request parameter to 1 for all event modification requests. Warning: Reusing Google Meet conference data across different events can cause access issues and expose meeting details to unintended users. To help ensure meeting privacy, always generate a unique conference for each event by using the createRequest field. */
  conferenceData?: ConferenceData;
  /** Creation time of the event (as a RFC3339 timestamp). Read-only. */
  created?: string;
  /** The creator of the event. Read-only. */
  creator?: { displayName?: string; email?: string; id?: string; self?: boolean };
  /** Description of the event. Can contain HTML. Optional. */
  description?: string;
  /** The (exclusive) end time of the event. For a recurring event, this is the end time of the first instance. */
  end?: EventDateTime;
  /** Whether the end time is actually unspecified. An end time is still provided for compatibility reasons, even if this attribute is set to True. The default is False. */
  endTimeUnspecified?: boolean;
  /** ETag of the resource. */
  etag?: string;
  /** Specific type of the event. This cannot be modified after the event is created. Possible values are: - "birthday" - A special all-day event with an annual recurrence. - "default" - A regular event or not further specified. - "focusTime" - A focus-time event. - "fromGmail" - An event from Gmail. This type of event cannot be created. - "outOfOffice" - An out-of-office event. - "workingLocation" - A working location event. */
  eventType?: string;
  /** Extended properties of the event. */
  extendedProperties?: { private?: Record<string, string>; shared?: Record<string, string> };
  /** Focus Time event data. Used if eventType is focusTime. */
  focusTimeProperties?: EventFocusTimeProperties;
  /** A gadget that extends this event. Gadgets are deprecated; this structure is instead only used for returning birthday calendar metadata. */
  gadget?: { display?: string; height?: number; iconLink?: string; link?: string; preferences?: Record<string, string>; title?: string; type?: string; width?: number };
  /** Whether attendees other than the organizer can invite others to the event. Optional. The default is True. */
  guestsCanInviteOthers?: boolean;
  /** Whether attendees other than the organizer can modify the event. Optional. The default is False. */
  guestsCanModify?: boolean;
  /** Whether attendees other than the organizer can see who the event's attendees are. Optional. The default is True. */
  guestsCanSeeOtherGuests?: boolean;
  /** An absolute link to the Google Hangout associated with this event. Read-only. */
  hangoutLink?: string;
  /** An absolute link to this event in the Google Calendar Web UI. Read-only. */
  htmlLink?: string;
  /** Event unique identifier as defined in RFC5545. It is used to uniquely identify events accross calendaring systems and must be supplied when importing events via the import method. Note that the iCalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same iCalUIDs. To retrieve an event using its iCalUID, call the events.list method using the iCalUID parameter. To retrieve an event using its id, call the events.get method. */
  iCalUID?: string;
  /** Opaque identifier of the event. When creating new single or recurring events, you can specify their IDs. Provided IDs must follow these rules: - characters allowed in the ID are those used in base32hex encoding, i.e. lowercase letters a-v and digits 0-9, see section 3.1.2 in RFC2938 - the length of the ID must be between 5 and 1024 characters - the ID must be unique per calendar Due to the globally distributed nature of the system, we cannot guarantee that ID collisions will be detected at event creation time. To minimize the risk of collisions we recommend using an established UUID algorithm such as one described in RFC4122. If you do not specify an ID, it will be automatically generated by the server. Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs. */
  id?: string;
  /** Type of the resource ("calendar#event"). */
  kind?: string;
  /** Geographic location of the event as free-form text. Optional. */
  location?: string;
  /** Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". The default is False. Read-Only. */
  locked?: boolean;
  /** The organizer of the event. If the organizer is also an attendee, this is indicated with a separate entry in attendees with the organizer field set to True. To change the organizer, use the move operation. Read-only, except when importing an event. */
  organizer?: { displayName?: string; email?: string; id?: string; self?: boolean };
  /** For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. It uniquely identifies the instance within the recurring event series even if the instance was moved to a different time. Immutable. */
  originalStartTime?: EventDateTime;
  /** Out of office event data. Used if eventType is outOfOffice. */
  outOfOfficeProperties?: EventOutOfOfficeProperties;
  /** If set to True, Event propagation is disabled. Note that it is not the same thing as Private event properties. Optional. Immutable. The default is False. */
  privateCopy?: boolean;
  /** List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events. */
  recurrence?: Array<string>;
  /** For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. Immutable. */
  recurringEventId?: string;
  /** Information about the event's reminders for the authenticated user. Note that changing reminders does not also change the updated property of the enclosing event. */
  reminders?: { overrides?: Array<EventReminder>; useDefault?: boolean };
  /** Sequence number as per iCalendar. */
  sequence?: number;
  /** Source from which the event was created. For example, a web page, an email message or any document identifiable by an URL with HTTP or HTTPS scheme. Can only be seen or modified by the creator of the event. */
  source?: { title?: string; url?: string };
  /** The (inclusive) start time of the event. For a recurring event, this is the start time of the first instance. */
  start?: EventDateTime;
  /** Status of the event. Optional. Possible values are: - "confirmed" - The event is confirmed. This is the default status. - "tentative" - The event is tentatively confirmed. - "cancelled" - The event is cancelled (deleted). The list method returns cancelled events only on incremental sync (when syncToken or updatedMin are specified) or if the showDeleted flag is set to true. The get method always returns them. A cancelled status represents two different states depending on the event type: - Cancelled exceptions of an uncancelled recurring event indicate that this instance should no longer be presented to the user. Clients should store these events for the lifetime of the parent recurring event. Cancelled exceptions are only guaranteed to have values for the id, recurringEventId and originalStartTime fields populated. The other fields might be empty. - All other cancelled events represent deleted events. Clients should remove their locally synced copies. Such cancelled events will eventually disappear, so do not rely on them being available indefinitely. Deleted events are only guaranteed to have the id field populated. On the organizer's calendar, cancelled events continue to expose event details (summary, location, etc.) so that they can be restored (undeleted). Similarly, the events to which the user was invited and that they manually removed continue to provide details. However, incremental sync requests with showDeleted set to false will not return these details. If an event changes its organizer (for example via the move operation) and the original organizer is not on the attendee list, it will leave behind a cancelled event where only the id field is guaranteed to be populated. */
  status?: string;
  /** Title of the event. */
  summary?: string;
  /** Whether the event blocks time on the calendar. Optional. Possible values are: - "opaque" - Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI. - "transparent" - The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI. */
  transparency?: string;
  /** Last modification time of the main event data (as a RFC3339 timestamp). Updating event reminders will not cause this to change. Read-only. */
  updated?: string;
  /** Visibility of the event. Optional. Possible values are: - "default" - Uses the default visibility for events on the calendar. This is the default value. - "public" - The event is public and event details are visible to all readers of the calendar. - "private" - The event is private and only event attendees may view event details. - "confidential" - The event is private. This value is provided for compatibility reasons. */
  visibility?: string;
  /** Working location event data. */
  workingLocationProperties?: EventWorkingLocationProperties;
}

export const Event: Schema.Schema<Event> = Schema.suspend(() => Schema.Struct({
  anyoneCanAddSelf: Schema.optional(Schema.Boolean),
  attachments: Schema.optional(Schema.Array(EventAttachment)),
  attendees: Schema.optional(Schema.Array(EventAttendee)),
  attendeesOmitted: Schema.optional(Schema.Boolean),
  birthdayProperties: Schema.optional(EventBirthdayProperties),
  colorId: Schema.optional(Schema.String),
  conferenceData: Schema.optional(ConferenceData),
  created: Schema.optional(Schema.String),
  creator: Schema.optional(Schema.Struct({ displayName: Schema.optional(Schema.String), email: Schema.optional(Schema.String), id: Schema.optional(Schema.String), self: Schema.optional(Schema.Boolean) })),
  description: Schema.optional(Schema.String),
  end: Schema.optional(EventDateTime),
  endTimeUnspecified: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
  extendedProperties: Schema.optional(Schema.Struct({ private: Schema.optional(Schema.Record(Schema.String, Schema.String)), shared: Schema.optional(Schema.Record(Schema.String, Schema.String)) })),
  focusTimeProperties: Schema.optional(EventFocusTimeProperties),
  gadget: Schema.optional(Schema.Struct({ display: Schema.optional(Schema.String), height: Schema.optional(Schema.Number), iconLink: Schema.optional(Schema.String), link: Schema.optional(Schema.String), preferences: Schema.optional(Schema.Record(Schema.String, Schema.String)), title: Schema.optional(Schema.String), type: Schema.optional(Schema.String), width: Schema.optional(Schema.Number) })),
  guestsCanInviteOthers: Schema.optional(Schema.Boolean),
  guestsCanModify: Schema.optional(Schema.Boolean),
  guestsCanSeeOtherGuests: Schema.optional(Schema.Boolean),
  hangoutLink: Schema.optional(Schema.String),
  htmlLink: Schema.optional(Schema.String),
  iCalUID: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  locked: Schema.optional(Schema.Boolean),
  organizer: Schema.optional(Schema.Struct({ displayName: Schema.optional(Schema.String), email: Schema.optional(Schema.String), id: Schema.optional(Schema.String), self: Schema.optional(Schema.Boolean) })),
  originalStartTime: Schema.optional(EventDateTime),
  outOfOfficeProperties: Schema.optional(EventOutOfOfficeProperties),
  privateCopy: Schema.optional(Schema.Boolean),
  recurrence: Schema.optional(Schema.Array(Schema.String)),
  recurringEventId: Schema.optional(Schema.String),
  reminders: Schema.optional(Schema.Struct({ overrides: Schema.optional(Schema.Array(EventReminder)), useDefault: Schema.optional(Schema.Boolean) })),
  sequence: Schema.optional(Schema.Number),
  source: Schema.optional(Schema.Struct({ title: Schema.optional(Schema.String), url: Schema.optional(Schema.String) })),
  start: Schema.optional(EventDateTime),
  status: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
  transparency: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  visibility: Schema.optional(Schema.String),
  workingLocationProperties: Schema.optional(EventWorkingLocationProperties),
})).annotate({ identifier: "Event" }) as any as Schema.Schema<Event>;

export interface Events {
  /** The user's access role for this calendar. Read-only. Possible values are: - "none" - The user has no access. - "freeBusyReader" - The user has read access to free/busy information. - "reader" - The user has read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - "writer" - The user has read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. - "owner" - The user has manager access to the calendar. This role has all of the permissions of the writer role with the additional ability to see and modify access levels of other users. Important: the owner role is different from the calendar's data owner. A calendar has a single data owner, but can have multiple users with owner role. */
  accessRole?: string;
  /** The default reminders on the calendar for the authenticated user. These reminders apply to all events on this calendar that do not explicitly override them (i.e. do not have reminders.useDefault set to True). */
  defaultReminders?: Array<EventReminder>;
  /** Description of the calendar. Read-only. */
  description?: string;
  /** ETag of the collection. */
  etag?: string;
  /** List of events on the calendar. */
  items?: Array<Event>;
  /** Type of the collection ("calendar#events"). */
  kind?: string;
  /** Token used to access the next page of this result. Omitted if no further results are available, in which case nextSyncToken is provided. */
  nextPageToken?: string;
  /** Token used at a later point in time to retrieve only the entries that have changed since this result was returned. Omitted if further results are available, in which case nextPageToken is provided. */
  nextSyncToken?: string;
  /** Title of the calendar. Read-only. */
  summary?: string;
  /** The time zone of the calendar. Read-only. */
  timeZone?: string;
  /** Last modification time of the calendar (as a RFC3339 timestamp). Read-only. */
  updated?: string;
}

export const Events: Schema.Schema<Events> = Schema.suspend(() => Schema.Struct({
  accessRole: Schema.optional(Schema.String),
  defaultReminders: Schema.optional(Schema.Array(EventReminder)),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Event)),
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  nextSyncToken: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
})).annotate({ identifier: "Events" }) as any as Schema.Schema<Events>;

export interface TimePeriod {
  /** The (exclusive) end of the time period. */
  end?: string;
  /** The (inclusive) start of the time period. */
  start?: string;
}

export const TimePeriod: Schema.Schema<TimePeriod> = Schema.suspend(() => Schema.Struct({
  end: Schema.optional(Schema.String),
  start: Schema.optional(Schema.String),
})).annotate({ identifier: "TimePeriod" }) as any as Schema.Schema<TimePeriod>;

export interface FreeBusyCalendar {
  /** List of time ranges during which this calendar should be regarded as busy. */
  busy?: Array<TimePeriod>;
  /** Optional error(s) (if computation for the calendar failed). */
  errors?: Array<Calendar_Error>;
}

export const FreeBusyCalendar: Schema.Schema<FreeBusyCalendar> = Schema.suspend(() => Schema.Struct({
  busy: Schema.optional(Schema.Array(TimePeriod)),
  errors: Schema.optional(Schema.Array(Calendar_Error)),
})).annotate({ identifier: "FreeBusyCalendar" }) as any as Schema.Schema<FreeBusyCalendar>;

export interface FreeBusyGroup {
  /** List of calendars' identifiers within a group. */
  calendars?: Array<string>;
  /** Optional error(s) (if computation for the group failed). */
  errors?: Array<Calendar_Error>;
}

export const FreeBusyGroup: Schema.Schema<FreeBusyGroup> = Schema.suspend(() => Schema.Struct({
  calendars: Schema.optional(Schema.Array(Schema.String)),
  errors: Schema.optional(Schema.Array(Calendar_Error)),
})).annotate({ identifier: "FreeBusyGroup" }) as any as Schema.Schema<FreeBusyGroup>;

export interface FreeBusyRequestItem {
  /** The identifier of a calendar or a group. */
  id?: string;
}

export const FreeBusyRequestItem: Schema.Schema<FreeBusyRequestItem> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "FreeBusyRequestItem" }) as any as Schema.Schema<FreeBusyRequestItem>;

export interface FreeBusyRequest {
  /** Maximal number of calendars for which FreeBusy information is to be provided. Optional. Maximum value is 50. */
  calendarExpansionMax?: number;
  /** Maximal number of calendar identifiers to be provided for a single group. Optional. An error is returned for a group with more members than this value. Maximum value is 100. */
  groupExpansionMax?: number;
  /** List of calendars and/or groups to query. */
  items?: Array<FreeBusyRequestItem>;
  /** The end of the interval for the query formatted as per RFC3339. */
  timeMax?: string;
  /** The start of the interval for the query formatted as per RFC3339. */
  timeMin?: string;
  /** Time zone used in the response. Optional. The default is UTC. */
  timeZone?: string;
}

export const FreeBusyRequest: Schema.Schema<FreeBusyRequest> = Schema.suspend(() => Schema.Struct({
  calendarExpansionMax: Schema.optional(Schema.Number),
  groupExpansionMax: Schema.optional(Schema.Number),
  items: Schema.optional(Schema.Array(FreeBusyRequestItem)),
  timeMax: Schema.optional(Schema.String),
  timeMin: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "FreeBusyRequest" }) as any as Schema.Schema<FreeBusyRequest>;

export interface FreeBusyResponse {
  /** List of free/busy information for calendars. */
  calendars?: Record<string, FreeBusyCalendar>;
  /** Expansion of groups. */
  groups?: Record<string, FreeBusyGroup>;
  /** Type of the resource ("calendar#freeBusy"). */
  kind?: string;
  /** The end of the interval. */
  timeMax?: string;
  /** The start of the interval. */
  timeMin?: string;
}

export const FreeBusyResponse: Schema.Schema<FreeBusyResponse> = Schema.suspend(() => Schema.Struct({
  calendars: Schema.optional(Schema.Record(Schema.String, FreeBusyCalendar)),
  groups: Schema.optional(Schema.Record(Schema.String, FreeBusyGroup)),
  kind: Schema.optional(Schema.String),
  timeMax: Schema.optional(Schema.String),
  timeMin: Schema.optional(Schema.String),
})).annotate({ identifier: "FreeBusyResponse" }) as any as Schema.Schema<FreeBusyResponse>;

export interface Setting {
  /** ETag of the resource. */
  etag?: string;
  /** The id of the user setting. */
  id?: string;
  /** Type of the resource ("calendar#setting"). */
  kind?: string;
  /** Value of the user setting. The format of the value depends on the ID of the setting. It must always be a UTF-8 string of length up to 1024 characters. */
  value?: string;
}

export const Setting: Schema.Schema<Setting> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Setting" }) as any as Schema.Schema<Setting>;

export interface Settings {
  /** Etag of the collection. */
  etag?: string;
  /** List of user settings. */
  items?: Array<Setting>;
  /** Type of the collection ("calendar#settings"). */
  kind?: string;
  /** Token used to access the next page of this result. Omitted if no further results are available, in which case nextSyncToken is provided. */
  nextPageToken?: string;
  /** Token used at a later point in time to retrieve only the entries that have changed since this result was returned. Omitted if further results are available, in which case nextPageToken is provided. */
  nextSyncToken?: string;
}

export const Settings: Schema.Schema<Settings> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Setting)),
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  nextSyncToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Settings" }) as any as Schema.Schema<Settings>;

// ==========================================================================
// Operations
// ==========================================================================

/** Deletes an access control rule. */
export interface DeleteAclRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** ACL rule identifier. */
  ruleId: string;
}

export const DeleteAclRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
}).pipe(
  T.Http({ method: "DELETE", path: "calendars/{calendarId}/acl/{ruleId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAclRequest>;

export interface DeleteAclResponse {}
export const DeleteAclResponse: Schema.Schema<DeleteAclResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAclResponse>;

export type DeleteAclError = CommonErrors;

export const deleteAcl: API.OperationMethod<DeleteAclRequest, DeleteAclResponse, DeleteAclError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAclRequest,
  output: DeleteAclResponse,
  errors: [],
}));

/** Returns an access control rule. */
export interface GetAclRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** ACL rule identifier. */
  ruleId: string;
}

export const GetAclRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
}).pipe(
  T.Http({ method: "GET", path: "calendars/{calendarId}/acl/{ruleId}" }),
  svc,
) as unknown as Schema.Schema<GetAclRequest>;

export type GetAclResponse = AclRule;
export const GetAclResponse = AclRule;

export type GetAclError = CommonErrors;

export const getAcl: API.OperationMethod<GetAclRequest, GetAclResponse, GetAclError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAclRequest,
  output: GetAclResponse,
  errors: [],
}));

/** Creates an access control rule. */
export interface InsertAclRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Whether to send notifications about the calendar sharing change. Optional. The default is True. */
  sendNotifications?: boolean;
  /** Request body */
  body?: AclRule;
}

export const InsertAclRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  sendNotifications: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotifications")),
  body: Schema.optional(AclRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "calendars/{calendarId}/acl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAclRequest>;

export type InsertAclResponse = AclRule;
export const InsertAclResponse = AclRule;

export type InsertAclError = CommonErrors;

export const insertAcl: API.OperationMethod<InsertAclRequest, InsertAclResponse, InsertAclError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAclRequest,
  output: InsertAclResponse,
  errors: [],
}));

/** Returns the rules in the access control list for the calendar. */
export interface ListAclRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
  maxResults?: number;
  /** Token specifying which result page to return. Optional. */
  pageToken?: string;
  /** Whether to include deleted ACLs in the result. Deleted ACLs are represented by role equal to "none". Deleted ACLs will always be included if syncToken is provided. Optional. The default is False. */
  showDeleted?: boolean;
  /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All entries deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
  syncToken?: string;
}

export const ListAclRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  syncToken: Schema.optional(Schema.String).pipe(T.HttpQuery("syncToken")),
}).pipe(
  T.Http({ method: "GET", path: "calendars/{calendarId}/acl" }),
  svc,
) as unknown as Schema.Schema<ListAclRequest>;

export type ListAclResponse = Acl;
export const ListAclResponse = Acl;

export type ListAclError = CommonErrors;

export const listAcl = API.makePaginated(() => ({
  input: ListAclRequest,
  output: ListAclResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Updates an access control rule. This method supports patch semantics. */
export interface PatchAclRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** ACL rule identifier. */
  ruleId: string;
  /** Whether to send notifications about the calendar sharing change. Note that there are no notifications on access removal. Optional. The default is True. */
  sendNotifications?: boolean;
  /** Request body */
  body?: AclRule;
}

export const PatchAclRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  sendNotifications: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotifications")),
  body: Schema.optional(AclRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "calendars/{calendarId}/acl/{ruleId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAclRequest>;

export type PatchAclResponse = AclRule;
export const PatchAclResponse = AclRule;

export type PatchAclError = CommonErrors;

export const patchAcl: API.OperationMethod<PatchAclRequest, PatchAclResponse, PatchAclError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAclRequest,
  output: PatchAclResponse,
  errors: [],
}));

/** Updates an access control rule. */
export interface UpdateAclRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** ACL rule identifier. */
  ruleId: string;
  /** Whether to send notifications about the calendar sharing change. Note that there are no notifications on access removal. Optional. The default is True. */
  sendNotifications?: boolean;
  /** Request body */
  body?: AclRule;
}

export const UpdateAclRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  sendNotifications: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotifications")),
  body: Schema.optional(AclRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "calendars/{calendarId}/acl/{ruleId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAclRequest>;

export type UpdateAclResponse = AclRule;
export const UpdateAclResponse = AclRule;

export type UpdateAclError = CommonErrors;

export const updateAcl: API.OperationMethod<UpdateAclRequest, UpdateAclResponse, UpdateAclError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAclRequest,
  output: UpdateAclResponse,
  errors: [],
}));

/** Watch for changes to ACL resources. */
export interface WatchAclRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
  maxResults?: number;
  /** Token specifying which result page to return. Optional. */
  pageToken?: string;
  /** Whether to include deleted ACLs in the result. Deleted ACLs are represented by role equal to "none". Deleted ACLs will always be included if syncToken is provided. Optional. The default is False. */
  showDeleted?: boolean;
  /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All entries deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
  syncToken?: string;
  /** Request body */
  body?: Channel;
}

export const WatchAclRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  syncToken: Schema.optional(Schema.String).pipe(T.HttpQuery("syncToken")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "calendars/{calendarId}/acl/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchAclRequest>;

export type WatchAclResponse = Channel;
export const WatchAclResponse = Channel;

export type WatchAclError = CommonErrors;

export const watchAcl: API.OperationMethod<WatchAclRequest, WatchAclResponse, WatchAclError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchAclRequest,
  output: WatchAclResponse,
  errors: [],
}));

/** Removes a calendar from the user's calendar list. */
export interface DeleteCalendarListRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
}

export const DeleteCalendarListRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
}).pipe(
  T.Http({ method: "DELETE", path: "users/me/calendarList/{calendarId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCalendarListRequest>;

export interface DeleteCalendarListResponse {}
export const DeleteCalendarListResponse: Schema.Schema<DeleteCalendarListResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteCalendarListResponse>;

export type DeleteCalendarListError = CommonErrors;

export const deleteCalendarList: API.OperationMethod<DeleteCalendarListRequest, DeleteCalendarListResponse, DeleteCalendarListError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCalendarListRequest,
  output: DeleteCalendarListResponse,
  errors: [],
}));

/** Returns a calendar from the user's calendar list. */
export interface GetCalendarListRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
}

export const GetCalendarListRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
}).pipe(
  T.Http({ method: "GET", path: "users/me/calendarList/{calendarId}" }),
  svc,
) as unknown as Schema.Schema<GetCalendarListRequest>;

export type GetCalendarListResponse = CalendarListEntry;
export const GetCalendarListResponse = CalendarListEntry;

export type GetCalendarListError = CommonErrors;

export const getCalendarList: API.OperationMethod<GetCalendarListRequest, GetCalendarListResponse, GetCalendarListError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCalendarListRequest,
  output: GetCalendarListResponse,
  errors: [],
}));

/** Inserts an existing calendar into the user's calendar list. */
export interface InsertCalendarListRequest {
  /** Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False. */
  colorRgbFormat?: boolean;
  /** Request body */
  body?: CalendarListEntry;
}

export const InsertCalendarListRequest = Schema.Struct({
  colorRgbFormat: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("colorRgbFormat")),
  body: Schema.optional(CalendarListEntry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "users/me/calendarList", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCalendarListRequest>;

export type InsertCalendarListResponse = CalendarListEntry;
export const InsertCalendarListResponse = CalendarListEntry;

export type InsertCalendarListError = CommonErrors;

export const insertCalendarList: API.OperationMethod<InsertCalendarListRequest, InsertCalendarListResponse, InsertCalendarListError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCalendarListRequest,
  output: InsertCalendarListResponse,
  errors: [],
}));

/** Returns the calendars on the user's calendar list. */
export interface ListCalendarListRequest {
  /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
  maxResults?: number;
  /** The minimum access role for the user in the returned entries. Optional. The default is no restriction. */
  minAccessRole?: "freeBusyReader" | "owner" | "reader" | "writer" | (string & {});
  /** Token specifying which result page to return. Optional. */
  pageToken?: string;
  /** Whether to include deleted calendar list entries in the result. Optional. The default is False. */
  showDeleted?: boolean;
  /** Whether to show hidden entries. Optional. The default is False. */
  showHidden?: boolean;
  /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False. To ensure client state consistency minAccessRole query parameter cannot be specified together with nextSyncToken. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
  syncToken?: string;
}

export const ListCalendarListRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  minAccessRole: Schema.optional(Schema.String).pipe(T.HttpQuery("minAccessRole")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  showHidden: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showHidden")),
  syncToken: Schema.optional(Schema.String).pipe(T.HttpQuery("syncToken")),
}).pipe(
  T.Http({ method: "GET", path: "users/me/calendarList" }),
  svc,
) as unknown as Schema.Schema<ListCalendarListRequest>;

export type ListCalendarListResponse = CalendarList;
export const ListCalendarListResponse = CalendarList;

export type ListCalendarListError = CommonErrors;

export const listCalendarList = API.makePaginated(() => ({
  input: ListCalendarListRequest,
  output: ListCalendarListResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Updates an existing calendar on the user's calendar list. This method supports patch semantics. */
export interface PatchCalendarListRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False. */
  colorRgbFormat?: boolean;
  /** Request body */
  body?: CalendarListEntry;
}

export const PatchCalendarListRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  colorRgbFormat: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("colorRgbFormat")),
  body: Schema.optional(CalendarListEntry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "users/me/calendarList/{calendarId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCalendarListRequest>;

export type PatchCalendarListResponse = CalendarListEntry;
export const PatchCalendarListResponse = CalendarListEntry;

export type PatchCalendarListError = CommonErrors;

export const patchCalendarList: API.OperationMethod<PatchCalendarListRequest, PatchCalendarListResponse, PatchCalendarListError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCalendarListRequest,
  output: PatchCalendarListResponse,
  errors: [],
}));

/** Updates an existing calendar on the user's calendar list. */
export interface UpdateCalendarListRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False. */
  colorRgbFormat?: boolean;
  /** Request body */
  body?: CalendarListEntry;
}

export const UpdateCalendarListRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  colorRgbFormat: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("colorRgbFormat")),
  body: Schema.optional(CalendarListEntry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "users/me/calendarList/{calendarId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCalendarListRequest>;

export type UpdateCalendarListResponse = CalendarListEntry;
export const UpdateCalendarListResponse = CalendarListEntry;

export type UpdateCalendarListError = CommonErrors;

export const updateCalendarList: API.OperationMethod<UpdateCalendarListRequest, UpdateCalendarListResponse, UpdateCalendarListError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCalendarListRequest,
  output: UpdateCalendarListResponse,
  errors: [],
}));

/** Watch for changes to CalendarList resources. */
export interface WatchCalendarListRequest {
  /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
  maxResults?: number;
  /** The minimum access role for the user in the returned entries. Optional. The default is no restriction. */
  minAccessRole?: "freeBusyReader" | "owner" | "reader" | "writer" | (string & {});
  /** Token specifying which result page to return. Optional. */
  pageToken?: string;
  /** Whether to include deleted calendar list entries in the result. Optional. The default is False. */
  showDeleted?: boolean;
  /** Whether to show hidden entries. Optional. The default is False. */
  showHidden?: boolean;
  /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False. To ensure client state consistency minAccessRole query parameter cannot be specified together with nextSyncToken. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
  syncToken?: string;
  /** Request body */
  body?: Channel;
}

export const WatchCalendarListRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  minAccessRole: Schema.optional(Schema.String).pipe(T.HttpQuery("minAccessRole")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  showHidden: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showHidden")),
  syncToken: Schema.optional(Schema.String).pipe(T.HttpQuery("syncToken")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "users/me/calendarList/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchCalendarListRequest>;

export type WatchCalendarListResponse = Channel;
export const WatchCalendarListResponse = Channel;

export type WatchCalendarListError = CommonErrors;

export const watchCalendarList: API.OperationMethod<WatchCalendarListRequest, WatchCalendarListResponse, WatchCalendarListError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchCalendarListRequest,
  output: WatchCalendarListResponse,
  errors: [],
}));

/** Clears a primary calendar. This operation deletes all events associated with the primary calendar of an account. */
export interface ClearCalendarsRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
}

export const ClearCalendarsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
}).pipe(
  T.Http({ method: "POST", path: "calendars/{calendarId}/clear", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClearCalendarsRequest>;

export interface ClearCalendarsResponse {}
export const ClearCalendarsResponse: Schema.Schema<ClearCalendarsResponse> = Schema.Struct({}) as any as Schema.Schema<ClearCalendarsResponse>;

export type ClearCalendarsError = CommonErrors;

export const clearCalendars: API.OperationMethod<ClearCalendarsRequest, ClearCalendarsResponse, ClearCalendarsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClearCalendarsRequest,
  output: ClearCalendarsResponse,
  errors: [],
}));

/** Deletes a secondary calendar. Use calendars.clear for clearing all events on primary calendars. */
export interface DeleteCalendarsRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
}

export const DeleteCalendarsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
}).pipe(
  T.Http({ method: "DELETE", path: "calendars/{calendarId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCalendarsRequest>;

export interface DeleteCalendarsResponse {}
export const DeleteCalendarsResponse: Schema.Schema<DeleteCalendarsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteCalendarsResponse>;

export type DeleteCalendarsError = CommonErrors;

export const deleteCalendars: API.OperationMethod<DeleteCalendarsRequest, DeleteCalendarsResponse, DeleteCalendarsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCalendarsRequest,
  output: DeleteCalendarsResponse,
  errors: [],
}));

/** Returns metadata for a calendar. */
export interface GetCalendarsRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
}

export const GetCalendarsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
}).pipe(
  T.Http({ method: "GET", path: "calendars/{calendarId}" }),
  svc,
) as unknown as Schema.Schema<GetCalendarsRequest>;

export type GetCalendarsResponse = Calendar;
export const GetCalendarsResponse = Calendar;

export type GetCalendarsError = CommonErrors;

export const getCalendars: API.OperationMethod<GetCalendarsRequest, GetCalendarsResponse, GetCalendarsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCalendarsRequest,
  output: GetCalendarsResponse,
  errors: [],
}));

/** Creates a secondary calendar. The authenticated user for the request is made the data owner of the new calendar. Note: We recommend to authenticate as the intended data owner of the calendar. You can use domain-wide delegation of authority to allow applications to act on behalf of a specific user. Don't use a service account for authentication. If you use a service account for authentication, the service account is the data owner, which can lead to unexpected behavior. For example, if a service account is the data owner, data ownership cannot be transferred. */
export interface InsertCalendarsRequest {
  /** Request body */
  body?: Calendar;
}

export const InsertCalendarsRequest = Schema.Struct({
  body: Schema.optional(Calendar).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "calendars", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCalendarsRequest>;

export type InsertCalendarsResponse = Calendar;
export const InsertCalendarsResponse = Calendar;

export type InsertCalendarsError = CommonErrors;

export const insertCalendars: API.OperationMethod<InsertCalendarsRequest, InsertCalendarsResponse, InsertCalendarsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCalendarsRequest,
  output: InsertCalendarsResponse,
  errors: [],
}));

/** Updates metadata for a calendar. This method supports patch semantics. */
export interface PatchCalendarsRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Request body */
  body?: Calendar;
}

export const PatchCalendarsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  body: Schema.optional(Calendar).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "calendars/{calendarId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCalendarsRequest>;

export type PatchCalendarsResponse = Calendar;
export const PatchCalendarsResponse = Calendar;

export type PatchCalendarsError = CommonErrors;

export const patchCalendars: API.OperationMethod<PatchCalendarsRequest, PatchCalendarsResponse, PatchCalendarsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCalendarsRequest,
  output: PatchCalendarsResponse,
  errors: [],
}));

/** Updates metadata for a calendar. */
export interface UpdateCalendarsRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Request body */
  body?: Calendar;
}

export const UpdateCalendarsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  body: Schema.optional(Calendar).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "calendars/{calendarId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCalendarsRequest>;

export type UpdateCalendarsResponse = Calendar;
export const UpdateCalendarsResponse = Calendar;

export type UpdateCalendarsError = CommonErrors;

export const updateCalendars: API.OperationMethod<UpdateCalendarsRequest, UpdateCalendarsResponse, UpdateCalendarsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCalendarsRequest,
  output: UpdateCalendarsResponse,
  errors: [],
}));

/** Stop watching resources through this channel */
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

/** Returns the color definitions for calendars and events. */
export interface GetColorsRequest {
}

export const GetColorsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "colors" }),
  svc,
) as unknown as Schema.Schema<GetColorsRequest>;

export type GetColorsResponse = Colors;
export const GetColorsResponse = Colors;

export type GetColorsError = CommonErrors;

export const getColors: API.OperationMethod<GetColorsRequest, GetColorsResponse, GetColorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetColorsRequest,
  output: GetColorsResponse,
  errors: [],
}));

/** Deletes an event. */
export interface DeleteEventsRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Event identifier. */
  eventId: string;
  /** Deprecated. Please use sendUpdates instead. Whether to send notifications about the deletion of the event. Note that some emails might still be sent even if you set the value to false. The default is false. */
  sendNotifications?: boolean;
  /** Guests who should receive notifications about the deletion of the event. */
  sendUpdates?: "all" | "externalOnly" | "none" | (string & {});
}

export const DeleteEventsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  sendNotifications: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotifications")),
  sendUpdates: Schema.optional(Schema.String).pipe(T.HttpQuery("sendUpdates")),
}).pipe(
  T.Http({ method: "DELETE", path: "calendars/{calendarId}/events/{eventId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEventsRequest>;

export interface DeleteEventsResponse {}
export const DeleteEventsResponse: Schema.Schema<DeleteEventsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteEventsResponse>;

export type DeleteEventsError = CommonErrors;

export const deleteEvents: API.OperationMethod<DeleteEventsRequest, DeleteEventsResponse, DeleteEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEventsRequest,
  output: DeleteEventsResponse,
  errors: [],
}));

/** Returns an event based on its Google Calendar ID. To retrieve an event using its iCalendar ID, call the events.list method using the iCalUID parameter. */
export interface GetEventsRequest {
  /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
  alwaysIncludeEmail?: boolean;
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Event identifier. */
  eventId: string;
  /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
  maxAttendees?: number;
  /** Time zone used in the response. Optional. The default is the time zone of the calendar. */
  timeZone?: string;
}

export const GetEventsRequest = Schema.Struct({
  alwaysIncludeEmail: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("alwaysIncludeEmail")),
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  maxAttendees: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxAttendees")),
  timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
}).pipe(
  T.Http({ method: "GET", path: "calendars/{calendarId}/events/{eventId}" }),
  svc,
) as unknown as Schema.Schema<GetEventsRequest>;

export type GetEventsResponse = Event;
export const GetEventsResponse = Event;

export type GetEventsError = CommonErrors;

export const getEvents: API.OperationMethod<GetEventsRequest, GetEventsResponse, GetEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEventsRequest,
  output: GetEventsResponse,
  errors: [],
}));

/** Imports an event. This operation is used to add a private copy of an existing event to a calendar. Only events with an eventType of default may be imported. Deprecated behavior: If a non-default event is imported, its type will be changed to default and any event-type-specific properties it may have will be dropped. */
export interface ImportEventsRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. */
  conferenceDataVersion?: number;
  /** Whether API client performing operation supports event attachments. Optional. The default is False. */
  supportsAttachments?: boolean;
  /** Request body */
  body?: Event;
}

export const ImportEventsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  conferenceDataVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("conferenceDataVersion")),
  supportsAttachments: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAttachments")),
  body: Schema.optional(Event).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "calendars/{calendarId}/events/import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportEventsRequest>;

export type ImportEventsResponse = Event;
export const ImportEventsResponse = Event;

export type ImportEventsError = CommonErrors;

export const importEvents: API.OperationMethod<ImportEventsRequest, ImportEventsResponse, ImportEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportEventsRequest,
  output: ImportEventsResponse,
  errors: [],
}));

/** Creates an event. */
export interface InsertEventsRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. */
  conferenceDataVersion?: number;
  /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
  maxAttendees?: number;
  /** Deprecated. Please use sendUpdates instead. Whether to send notifications about the creation of the new event. Note that some emails might still be sent even if you set the value to false. The default is false. */
  sendNotifications?: boolean;
  /** Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false. */
  sendUpdates?: "all" | "externalOnly" | "none" | (string & {});
  /** Whether API client performing operation supports event attachments. Optional. The default is False. */
  supportsAttachments?: boolean;
  /** Request body */
  body?: Event;
}

export const InsertEventsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  conferenceDataVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("conferenceDataVersion")),
  maxAttendees: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxAttendees")),
  sendNotifications: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotifications")),
  sendUpdates: Schema.optional(Schema.String).pipe(T.HttpQuery("sendUpdates")),
  supportsAttachments: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAttachments")),
  body: Schema.optional(Event).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "calendars/{calendarId}/events", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertEventsRequest>;

export type InsertEventsResponse = Event;
export const InsertEventsResponse = Event;

export type InsertEventsError = CommonErrors;

export const insertEvents: API.OperationMethod<InsertEventsRequest, InsertEventsResponse, InsertEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertEventsRequest,
  output: InsertEventsResponse,
  errors: [],
}));

/** Returns instances of the specified recurring event. */
export interface InstancesEventsRequest {
  /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
  alwaysIncludeEmail?: boolean;
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Recurring event identifier. */
  eventId: string;
  /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
  maxAttendees?: number;
  /** Maximum number of events returned on one result page. By default the value is 250 events. The page size can never be larger than 2500 events. Optional. */
  maxResults?: number;
  /** The original start time of the instance in the result. Optional. */
  originalStart?: string;
  /** Token specifying which result page to return. Optional. */
  pageToken?: string;
  /** Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events will still be included if singleEvents is False. Optional. The default is False. */
  showDeleted?: boolean;
  /** Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset. */
  timeMax?: string;
  /** Lower bound (inclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset. */
  timeMin?: string;
  /** Time zone used in the response. Optional. The default is the time zone of the calendar. */
  timeZone?: string;
}

export const InstancesEventsRequest = Schema.Struct({
  alwaysIncludeEmail: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("alwaysIncludeEmail")),
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  maxAttendees: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxAttendees")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  originalStart: Schema.optional(Schema.String).pipe(T.HttpQuery("originalStart")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  timeMax: Schema.optional(Schema.String).pipe(T.HttpQuery("timeMax")),
  timeMin: Schema.optional(Schema.String).pipe(T.HttpQuery("timeMin")),
  timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
}).pipe(
  T.Http({ method: "GET", path: "calendars/{calendarId}/events/{eventId}/instances" }),
  svc,
) as unknown as Schema.Schema<InstancesEventsRequest>;

export type InstancesEventsResponse = Events;
export const InstancesEventsResponse = Events;

export type InstancesEventsError = CommonErrors;

export const instancesEvents = API.makePaginated(() => ({
  input: InstancesEventsRequest,
  output: InstancesEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Returns events on the specified calendar. */
export interface ListEventsRequest {
  /** Deprecated and ignored. */
  alwaysIncludeEmail?: boolean;
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Event types to return. Optional. This parameter can be repeated multiple times to return events of different types. If unset, returns all event types. */
  eventTypes?: "birthday" | "default" | "focusTime" | "fromGmail" | "outOfOffice" | "workingLocation" | (string & {})[];
  /** Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID. */
  iCalUID?: string;
  /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
  maxAttendees?: number;
  /** Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional. */
  maxResults?: number;
  /** The order of the events returned in the result. Optional. The default is an unspecified, stable order. */
  orderBy?: "startTime" | "updated" | (string & {});
  /** Token specifying which result page to return. Optional. */
  pageToken?: string;
  /** Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints. */
  privateExtendedProperty?: string[];
  /** Free text search terms to find events that match these terms in the following fields: - summary - description - location - attendee's displayName - attendee's email - organizer's displayName - organizer's email - workingLocationProperties.officeLocation.buildingId - workingLocationProperties.officeLocation.deskId - workingLocationProperties.officeLocation.label - workingLocationProperties.customLocation.label These search terms also match predefined keywords against all display title translations of working location, out-of-office, and focus-time events. For example, searching for "Office" or "Bureau" returns working location events of type officeLocation, whereas searching for "Out of office" or "Abwesend" returns out-of-office events. Optional. */
  q?: string;
  /** Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints. */
  sharedExtendedProperty?: string[];
  /** Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False. */
  showDeleted?: boolean;
  /** Whether to include hidden invitations in the result. Optional. The default is False. */
  showHiddenInvitations?: boolean;
  /** Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False. */
  singleEvents?: boolean;
  /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False. There are several query parameters that cannot be specified together with nextSyncToken to ensure consistency of the client state. These are: - iCalUID - orderBy - privateExtendedProperty - q - sharedExtendedProperty - timeMin - timeMax - updatedMin All other query parameters should be the same as for the initial synchronization to avoid undefined behavior. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
  syncToken?: string;
  /** Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin. */
  timeMax?: string;
  /** Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax. */
  timeMin?: string;
  /** Time zone used in the response. Optional. The default is the time zone of the calendar. */
  timeZone?: string;
  /** Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time. */
  updatedMin?: string;
}

export const ListEventsRequest = Schema.Struct({
  alwaysIncludeEmail: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("alwaysIncludeEmail")),
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  eventTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("eventTypes")),
  iCalUID: Schema.optional(Schema.String).pipe(T.HttpQuery("iCalUID")),
  maxAttendees: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxAttendees")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  privateExtendedProperty: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("privateExtendedProperty")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  sharedExtendedProperty: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sharedExtendedProperty")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  showHiddenInvitations: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showHiddenInvitations")),
  singleEvents: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("singleEvents")),
  syncToken: Schema.optional(Schema.String).pipe(T.HttpQuery("syncToken")),
  timeMax: Schema.optional(Schema.String).pipe(T.HttpQuery("timeMax")),
  timeMin: Schema.optional(Schema.String).pipe(T.HttpQuery("timeMin")),
  timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
  updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
}).pipe(
  T.Http({ method: "GET", path: "calendars/{calendarId}/events" }),
  svc,
) as unknown as Schema.Schema<ListEventsRequest>;

export type ListEventsResponse = Events;
export const ListEventsResponse = Events;

export type ListEventsError = CommonErrors;

export const listEvents = API.makePaginated(() => ({
  input: ListEventsRequest,
  output: ListEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Moves an event to another calendar, i.e. changes an event's organizer. Note that only default events can be moved; birthday, focusTime, fromGmail, outOfOffice and workingLocation events cannot be moved. */
export interface MoveEventsRequest {
  /** Calendar identifier of the source calendar where the event currently is on. */
  calendarId: string;
  /** Calendar identifier of the target calendar where the event is to be moved to. */
  destination: string;
  /** Event identifier. */
  eventId: string;
  /** Deprecated. Please use sendUpdates instead. Whether to send notifications about the change of the event's organizer. Note that some emails might still be sent even if you set the value to false. The default is false. */
  sendNotifications?: boolean;
  /** Guests who should receive notifications about the change of the event's organizer. */
  sendUpdates?: "all" | "externalOnly" | "none" | (string & {});
}

export const MoveEventsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  destination: Schema.String.pipe(T.HttpQuery("destination")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  sendNotifications: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotifications")),
  sendUpdates: Schema.optional(Schema.String).pipe(T.HttpQuery("sendUpdates")),
}).pipe(
  T.Http({ method: "POST", path: "calendars/{calendarId}/events/{eventId}/move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveEventsRequest>;

export type MoveEventsResponse = Event;
export const MoveEventsResponse = Event;

export type MoveEventsError = CommonErrors;

export const moveEvents: API.OperationMethod<MoveEventsRequest, MoveEventsResponse, MoveEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveEventsRequest,
  output: MoveEventsResponse,
  errors: [],
}));

/** Updates an event. This method supports patch semantics. */
export interface PatchEventsRequest {
  /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
  alwaysIncludeEmail?: boolean;
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. */
  conferenceDataVersion?: number;
  /** Event identifier. */
  eventId: string;
  /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
  maxAttendees?: number;
  /** Deprecated. Please use sendUpdates instead. Whether to send notifications about the event update (for example, description changes, etc.). Note that some emails might still be sent even if you set the value to false. The default is false. */
  sendNotifications?: boolean;
  /** Guests who should receive notifications about the event update (for example, title changes, etc.). */
  sendUpdates?: "all" | "externalOnly" | "none" | (string & {});
  /** Whether API client performing operation supports event attachments. Optional. The default is False. */
  supportsAttachments?: boolean;
  /** Request body */
  body?: Event;
}

export const PatchEventsRequest = Schema.Struct({
  alwaysIncludeEmail: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("alwaysIncludeEmail")),
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  conferenceDataVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("conferenceDataVersion")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  maxAttendees: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxAttendees")),
  sendNotifications: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotifications")),
  sendUpdates: Schema.optional(Schema.String).pipe(T.HttpQuery("sendUpdates")),
  supportsAttachments: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAttachments")),
  body: Schema.optional(Event).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "calendars/{calendarId}/events/{eventId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEventsRequest>;

export type PatchEventsResponse = Event;
export const PatchEventsResponse = Event;

export type PatchEventsError = CommonErrors;

export const patchEvents: API.OperationMethod<PatchEventsRequest, PatchEventsResponse, PatchEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEventsRequest,
  output: PatchEventsResponse,
  errors: [],
}));

/** Creates an event based on a simple text string. */
export interface QuickAddEventsRequest {
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Deprecated. Please use sendUpdates instead. Whether to send notifications about the creation of the event. Note that some emails might still be sent even if you set the value to false. The default is false. */
  sendNotifications?: boolean;
  /** Guests who should receive notifications about the creation of the new event. */
  sendUpdates?: "all" | "externalOnly" | "none" | (string & {});
  /** The text describing the event to be created. */
  text: string;
}

export const QuickAddEventsRequest = Schema.Struct({
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  sendNotifications: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotifications")),
  sendUpdates: Schema.optional(Schema.String).pipe(T.HttpQuery("sendUpdates")),
  text: Schema.String.pipe(T.HttpQuery("text")),
}).pipe(
  T.Http({ method: "POST", path: "calendars/{calendarId}/events/quickAdd", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QuickAddEventsRequest>;

export type QuickAddEventsResponse = Event;
export const QuickAddEventsResponse = Event;

export type QuickAddEventsError = CommonErrors;

export const quickAddEvents: API.OperationMethod<QuickAddEventsRequest, QuickAddEventsResponse, QuickAddEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QuickAddEventsRequest,
  output: QuickAddEventsResponse,
  errors: [],
}));

/** Updates an event. */
export interface UpdateEventsRequest {
  /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
  alwaysIncludeEmail?: boolean;
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. */
  conferenceDataVersion?: number;
  /** Event identifier. */
  eventId: string;
  /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
  maxAttendees?: number;
  /** Deprecated. Please use sendUpdates instead. Whether to send notifications about the event update (for example, description changes, etc.). Note that some emails might still be sent even if you set the value to false. The default is false. */
  sendNotifications?: boolean;
  /** Guests who should receive notifications about the event update (for example, title changes, etc.). */
  sendUpdates?: "all" | "externalOnly" | "none" | (string & {});
  /** Whether API client performing operation supports event attachments. Optional. The default is False. */
  supportsAttachments?: boolean;
  /** Request body */
  body?: Event;
}

export const UpdateEventsRequest = Schema.Struct({
  alwaysIncludeEmail: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("alwaysIncludeEmail")),
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  conferenceDataVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("conferenceDataVersion")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  maxAttendees: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxAttendees")),
  sendNotifications: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sendNotifications")),
  sendUpdates: Schema.optional(Schema.String).pipe(T.HttpQuery("sendUpdates")),
  supportsAttachments: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("supportsAttachments")),
  body: Schema.optional(Event).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "calendars/{calendarId}/events/{eventId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEventsRequest>;

export type UpdateEventsResponse = Event;
export const UpdateEventsResponse = Event;

export type UpdateEventsError = CommonErrors;

export const updateEvents: API.OperationMethod<UpdateEventsRequest, UpdateEventsResponse, UpdateEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEventsRequest,
  output: UpdateEventsResponse,
  errors: [],
}));

/** Watch for changes to Events resources. */
export interface WatchEventsRequest {
  /** Deprecated and ignored. */
  alwaysIncludeEmail?: boolean;
  /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
  calendarId: string;
  /** Event types to return. Optional. This parameter can be repeated multiple times to return events of different types. If unset, returns all event types. */
  eventTypes?: "birthday" | "default" | "focusTime" | "fromGmail" | "outOfOffice" | "workingLocation" | (string & {})[];
  /** Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID. */
  iCalUID?: string;
  /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
  maxAttendees?: number;
  /** Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional. */
  maxResults?: number;
  /** The order of the events returned in the result. Optional. The default is an unspecified, stable order. */
  orderBy?: "startTime" | "updated" | (string & {});
  /** Token specifying which result page to return. Optional. */
  pageToken?: string;
  /** Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints. */
  privateExtendedProperty?: string[];
  /** Free text search terms to find events that match these terms in the following fields: - summary - description - location - attendee's displayName - attendee's email - organizer's displayName - organizer's email - workingLocationProperties.officeLocation.buildingId - workingLocationProperties.officeLocation.deskId - workingLocationProperties.officeLocation.label - workingLocationProperties.customLocation.label These search terms also match predefined keywords against all display title translations of working location, out-of-office, and focus-time events. For example, searching for "Office" or "Bureau" returns working location events of type officeLocation, whereas searching for "Out of office" or "Abwesend" returns out-of-office events. Optional. */
  q?: string;
  /** Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints. */
  sharedExtendedProperty?: string[];
  /** Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False. */
  showDeleted?: boolean;
  /** Whether to include hidden invitations in the result. Optional. The default is False. */
  showHiddenInvitations?: boolean;
  /** Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False. */
  singleEvents?: boolean;
  /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False. There are several query parameters that cannot be specified together with nextSyncToken to ensure consistency of the client state. These are: - iCalUID - orderBy - privateExtendedProperty - q - sharedExtendedProperty - timeMin - timeMax - updatedMin All other query parameters should be the same as for the initial synchronization to avoid undefined behavior. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
  syncToken?: string;
  /** Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin. */
  timeMax?: string;
  /** Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax. */
  timeMin?: string;
  /** Time zone used in the response. Optional. The default is the time zone of the calendar. */
  timeZone?: string;
  /** Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time. */
  updatedMin?: string;
  /** Request body */
  body?: Channel;
}

export const WatchEventsRequest = Schema.Struct({
  alwaysIncludeEmail: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("alwaysIncludeEmail")),
  calendarId: Schema.String.pipe(T.HttpPath("calendarId")),
  eventTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("eventTypes")),
  iCalUID: Schema.optional(Schema.String).pipe(T.HttpQuery("iCalUID")),
  maxAttendees: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxAttendees")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  privateExtendedProperty: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("privateExtendedProperty")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  sharedExtendedProperty: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sharedExtendedProperty")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  showHiddenInvitations: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showHiddenInvitations")),
  singleEvents: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("singleEvents")),
  syncToken: Schema.optional(Schema.String).pipe(T.HttpQuery("syncToken")),
  timeMax: Schema.optional(Schema.String).pipe(T.HttpQuery("timeMax")),
  timeMin: Schema.optional(Schema.String).pipe(T.HttpQuery("timeMin")),
  timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
  updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "calendars/{calendarId}/events/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchEventsRequest>;

export type WatchEventsResponse = Channel;
export const WatchEventsResponse = Channel;

export type WatchEventsError = CommonErrors;

export const watchEvents: API.OperationMethod<WatchEventsRequest, WatchEventsResponse, WatchEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchEventsRequest,
  output: WatchEventsResponse,
  errors: [],
}));

/** Returns free/busy information for a set of calendars. */
export interface QueryFreebusyRequest {
  /** Request body */
  body?: FreeBusyRequest;
}

export const QueryFreebusyRequest = Schema.Struct({
  body: Schema.optional(FreeBusyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "freeBusy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryFreebusyRequest>;

export type QueryFreebusyResponse = FreeBusyResponse;
export const QueryFreebusyResponse = FreeBusyResponse;

export type QueryFreebusyError = CommonErrors;

export const queryFreebusy: API.OperationMethod<QueryFreebusyRequest, QueryFreebusyResponse, QueryFreebusyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryFreebusyRequest,
  output: QueryFreebusyResponse,
  errors: [],
}));

/** Returns a single user setting. */
export interface GetSettingsRequest {
  /** The id of the user setting. */
  setting: string;
}

export const GetSettingsRequest = Schema.Struct({
  setting: Schema.String.pipe(T.HttpPath("setting")),
}).pipe(
  T.Http({ method: "GET", path: "users/me/settings/{setting}" }),
  svc,
) as unknown as Schema.Schema<GetSettingsRequest>;

export type GetSettingsResponse = Setting;
export const GetSettingsResponse = Setting;

export type GetSettingsError = CommonErrors;

export const getSettings: API.OperationMethod<GetSettingsRequest, GetSettingsResponse, GetSettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsRequest,
  output: GetSettingsResponse,
  errors: [],
}));

/** Returns all user settings for the authenticated user. */
export interface ListSettingsRequest {
  /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
  maxResults?: number;
  /** Token specifying which result page to return. Optional. */
  pageToken?: string;
  /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
  syncToken?: string;
}

export const ListSettingsRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  syncToken: Schema.optional(Schema.String).pipe(T.HttpQuery("syncToken")),
}).pipe(
  T.Http({ method: "GET", path: "users/me/settings" }),
  svc,
) as unknown as Schema.Schema<ListSettingsRequest>;

export type ListSettingsResponse = Settings;
export const ListSettingsResponse = Settings;

export type ListSettingsError = CommonErrors;

export const listSettings = API.makePaginated(() => ({
  input: ListSettingsRequest,
  output: ListSettingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Watch for changes to Settings resources. */
export interface WatchSettingsRequest {
  /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
  maxResults?: number;
  /** Token specifying which result page to return. Optional. */
  pageToken?: string;
  /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
  syncToken?: string;
  /** Request body */
  body?: Channel;
}

export const WatchSettingsRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  syncToken: Schema.optional(Schema.String).pipe(T.HttpQuery("syncToken")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "users/me/settings/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchSettingsRequest>;

export type WatchSettingsResponse = Channel;
export const WatchSettingsResponse = Channel;

export type WatchSettingsError = CommonErrors;

export const watchSettings: API.OperationMethod<WatchSettingsRequest, WatchSettingsResponse, WatchSettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchSettingsRequest,
  output: WatchSettingsResponse,
  errors: [],
}));

