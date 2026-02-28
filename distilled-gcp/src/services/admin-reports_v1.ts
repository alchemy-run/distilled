// ==========================================================================
// Admin SDK API (admin reports_v1)
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
  name: "admin",
  version: "reports_v1",
  rootUrl: "https://admin.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface NestedParameter {
  /** The name of the parameter. */
  name?: string;
  /** String value of the parameter. */
  value?: string;
  /** Multiple string values of the parameter. */
  multiValue?: Array<string>;
  /** Integer value of the parameter. */
  intValue?: string;
  /** Multiple integer values of the parameter. */
  multiIntValue?: Array<string>;
  /** Boolean value of the parameter. */
  boolValue?: boolean;
  /** Multiple boolean values of the parameter. */
  multiBoolValue?: Array<boolean>;
}

export const NestedParameter: Schema.Schema<NestedParameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  multiValue: Schema.optional(Schema.Array(Schema.String)),
  intValue: Schema.optional(Schema.String),
  multiIntValue: Schema.optional(Schema.Array(Schema.String)),
  boolValue: Schema.optional(Schema.Boolean),
  multiBoolValue: Schema.optional(Schema.Array(Schema.Boolean)),
})).annotate({ identifier: "NestedParameter" }) as any as Schema.Schema<NestedParameter>;

export interface ActivityEventsStatus {
  /** Status code of the event. Note: Field can be empty. */
  httpStatusCode?: number;
  /** Status of the event. Possible values if not empty: - UNKNOWN_EVENT_STATUS - SUCCEEDED - SUCCEEDED_WITH_WARNINGS - FAILED - SKIPPED */
  eventStatus?: string;
  /** Error code of the event. Note: Field can be empty. */
  errorCode?: string;
  /** Error message of the event. Note: Field can be empty. */
  errorMessage?: string;
}

export const ActivityEventsStatus: Schema.Schema<ActivityEventsStatus> = Schema.suspend(() => Schema.Struct({
  httpStatusCode: Schema.optional(Schema.Number),
  eventStatus: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "ActivityEventsStatus" }) as any as Schema.Schema<ActivityEventsStatus>;

export interface ActivityNetworkInfo {
  /** IP Address of the user doing the action. */
  ipAsn?: Array<number>;
  /** ISO 3166-1 alpha-2 region code of the user doing the action. */
  regionCode?: string;
  /** ISO 3166-2 region code (states and provinces) for countries of the user doing the action. */
  subdivisionCode?: string;
}

export const ActivityNetworkInfo: Schema.Schema<ActivityNetworkInfo> = Schema.suspend(() => Schema.Struct({
  ipAsn: Schema.optional(Schema.Array(Schema.Number)),
  regionCode: Schema.optional(Schema.String),
  subdivisionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "ActivityNetworkInfo" }) as any as Schema.Schema<ActivityNetworkInfo>;

export interface FieldValueTextListValue {
  /** List of text values. */
  values?: Array<string>;
}

export const FieldValueTextListValue: Schema.Schema<FieldValueTextListValue> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FieldValueTextListValue" }) as any as Schema.Schema<FieldValueTextListValue>;

export interface FieldValueSelectionValue {
  /** Identifier of the selection. */
  id?: string;
  /** Display name of the selection. */
  displayName?: string;
  /** Whether the selection is badged. */
  badged?: boolean;
}

export const FieldValueSelectionValue: Schema.Schema<FieldValueSelectionValue> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  badged: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FieldValueSelectionValue" }) as any as Schema.Schema<FieldValueSelectionValue>;

export interface FieldValueSelectionListValue {
  /** List of selections. */
  values?: Array<FieldValueSelectionValue>;
}

export const FieldValueSelectionListValue: Schema.Schema<FieldValueSelectionListValue> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(FieldValueSelectionValue)),
})).annotate({ identifier: "FieldValueSelectionListValue" }) as any as Schema.Schema<FieldValueSelectionListValue>;

export interface FieldValueUserValue {
  /** Email of the user. */
  email?: string;
}

export const FieldValueUserValue: Schema.Schema<FieldValueUserValue> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "FieldValueUserValue" }) as any as Schema.Schema<FieldValueUserValue>;

export interface FieldValueUserListValue {
  /** List of users. */
  values?: Array<FieldValueUserValue>;
}

export const FieldValueUserListValue: Schema.Schema<FieldValueUserListValue> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(FieldValueUserValue)),
})).annotate({ identifier: "FieldValueUserListValue" }) as any as Schema.Schema<FieldValueUserListValue>;

export interface Admin_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Admin_Date: Schema.Schema<Admin_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Admin_Date" }) as any as Schema.Schema<Admin_Date>;

export interface Reason {
  /** The type of the reason. */
  reasonType?: string;
}

export const Reason: Schema.Schema<Reason> = Schema.suspend(() => Schema.Struct({
  reasonType: Schema.optional(Schema.String),
})).annotate({ identifier: "Reason" }) as any as Schema.Schema<Reason>;

export interface FieldValue {
  /** Identifier of the field */
  id?: string;
  /** Display name of the field */
  displayName?: string;
  /** Type of the field */
  type?: string;
  /** If the field is unset, this will be true. */
  unsetValue?: boolean;
  /** Setting a long text value. */
  longTextValue?: string;
  /** Setting a text value. */
  textValue?: string;
  /** Setting a text list value. */
  textListValue?: FieldValueTextListValue;
  /** Setting a selection value by selecting a single value from a dropdown. */
  selectionValue?: FieldValueSelectionValue;
  /** Setting a selection list value by selecting multiple values from a dropdown. */
  selectionListValue?: FieldValueSelectionListValue;
  /** Setting an integer value. */
  integerValue?: string;
  /** Setting a user value by selecting a single user. */
  userValue?: FieldValueUserValue;
  /** Setting a user list value by selecting multiple users. */
  userListValue?: FieldValueUserListValue;
  /** Setting a date value. */
  dateValue?: Admin_Date;
  /** The reason why the field was applied to the label. */
  reason?: Reason;
}

export const FieldValue: Schema.Schema<FieldValue> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  unsetValue: Schema.optional(Schema.Boolean),
  longTextValue: Schema.optional(Schema.String),
  textValue: Schema.optional(Schema.String),
  textListValue: Schema.optional(FieldValueTextListValue),
  selectionValue: Schema.optional(FieldValueSelectionValue),
  selectionListValue: Schema.optional(FieldValueSelectionListValue),
  integerValue: Schema.optional(Schema.String),
  userValue: Schema.optional(FieldValueUserValue),
  userListValue: Schema.optional(FieldValueUserListValue),
  dateValue: Schema.optional(Admin_Date),
  reason: Schema.optional(Reason),
})).annotate({ identifier: "FieldValue" }) as any as Schema.Schema<FieldValue>;

export interface AppliedLabel {
  /** Identifier of the label - Only the label id, not the full OnePlatform resource name. */
  id?: string;
  /** Title of the label */
  title?: string;
  /** List of fields which are part of the label and have been set by the user. If label has a field which was not set by the user, it would not be present in this list. */
  fieldValues?: Array<FieldValue>;
  /** The reason why the label was applied on the resource. */
  reason?: Reason;
}

export const AppliedLabel: Schema.Schema<AppliedLabel> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  fieldValues: Schema.optional(Schema.Array(FieldValue)),
  reason: Schema.optional(Reason),
})).annotate({ identifier: "AppliedLabel" }) as any as Schema.Schema<AppliedLabel>;

export interface ResourceDetails {
  /** Identifier of the resource. */
  id?: string;
  /** Title of the resource. For instance, in case of a drive document, this would be the title of the document. In case of an email, this would be the subject. */
  title?: string;
  /** Type of the resource - document, email, chat message */
  type?: string;
  /** List of labels applied on the resource */
  appliedLabels?: Array<AppliedLabel>;
  /** Defines relationship of the resource to the events */
  relation?: string;
}

export const ResourceDetails: Schema.Schema<ResourceDetails> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  appliedLabels: Schema.optional(Schema.Array(AppliedLabel)),
  relation: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceDetails" }) as any as Schema.Schema<ResourceDetails>;

export interface Activity {
  /** The type of API resource. For an activity report, the value is `audit#activity`. */
  kind?: string;
  /** ETag of the entry. */
  etag?: string;
  /** This is the domain that is affected by the report's event. For example domain of Admin console or the Drive application's document owner. */
  ownerDomain?: string;
  /** IP address of the user doing the action. This is the Internet Protocol (IP) address of the user when logging into Google Workspace, which may or may not reflect the user's physical location. For example, the IP address can be the user's proxy server's address or a virtual private network (VPN) address. The API supports IPv4 and IPv6. */
  ipAddress?: string;
  /** Activity events in the report. */
  events?: Array<{ type?: string; name?: string; parameters?: Array<{ messageValue?: { parameter?: Array<NestedParameter> }; name?: string; value?: string; multiValue?: Array<string>; intValue?: string; multiIntValue?: Array<string>; boolValue?: boolean; multiMessageValue?: Array<{ parameter?: Array<NestedParameter> }> }>; resourceIds?: Array<string>; status?: ActivityEventsStatus }>;
  /** Unique identifier for each activity record. */
  id?: { time?: string; uniqueQualifier?: string; applicationName?: string; customerId?: string };
  /** User doing the action. */
  actor?: { profileId?: string; email?: string; callerType?: string; key?: string; applicationInfo?: { oauthClientId?: string; applicationName?: string; impersonation?: boolean } };
  /** Network information of the user doing the action. */
  networkInfo?: ActivityNetworkInfo;
  /** Details of the resource on which the action was performed. */
  resourceDetails?: Array<ResourceDetails>;
}

export const Activity: Schema.Schema<Activity> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  ownerDomain: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  events: Schema.optional(Schema.Array(Schema.Struct({ type: Schema.optional(Schema.String), name: Schema.optional(Schema.String), parameters: Schema.optional(Schema.Array(Schema.Struct({ messageValue: Schema.optional(Schema.Struct({ parameter: Schema.optional(Schema.Array(NestedParameter)) })), name: Schema.optional(Schema.String), value: Schema.optional(Schema.String), multiValue: Schema.optional(Schema.Array(Schema.String)), intValue: Schema.optional(Schema.String), multiIntValue: Schema.optional(Schema.Array(Schema.String)), boolValue: Schema.optional(Schema.Boolean), multiMessageValue: Schema.optional(Schema.Array(Schema.Struct({ parameter: Schema.optional(Schema.Array(NestedParameter)) }))) }))), resourceIds: Schema.optional(Schema.Array(Schema.String)), status: Schema.optional(ActivityEventsStatus) }))),
  id: Schema.optional(Schema.Struct({ time: Schema.optional(Schema.String), uniqueQualifier: Schema.optional(Schema.String), applicationName: Schema.optional(Schema.String), customerId: Schema.optional(Schema.String) })),
  actor: Schema.optional(Schema.Struct({ profileId: Schema.optional(Schema.String), email: Schema.optional(Schema.String), callerType: Schema.optional(Schema.String), key: Schema.optional(Schema.String), applicationInfo: Schema.optional(Schema.Struct({ oauthClientId: Schema.optional(Schema.String), applicationName: Schema.optional(Schema.String), impersonation: Schema.optional(Schema.Boolean) })) })),
  networkInfo: Schema.optional(ActivityNetworkInfo),
  resourceDetails: Schema.optional(Schema.Array(ResourceDetails)),
})).annotate({ identifier: "Activity" }) as any as Schema.Schema<Activity>;

export interface Activities {
  /** The type of API resource. For an activity report, the value is `reports#activities`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Each activity record in the response. */
  items?: Array<Activity>;
  /** Token for retrieving the follow-on next page of the report. The `nextPageToken` value is used in the request's `pageToken` query string. */
  nextPageToken?: string;
}

export const Activities: Schema.Schema<Activities> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Activity)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Activities" }) as any as Schema.Schema<Activities>;

export interface Channel {
  /** A UUID or similar unique string that identifies this channel. */
  id?: string;
  /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
  token?: string;
  /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
  expiration?: string;
  /** The type of delivery mechanism used for this channel. The value should be set to `"web_hook"`. */
  type?: string;
  /** The address where notifications are delivered for this channel. */
  address?: string;
  /** A Boolean value to indicate whether payload is wanted. A payload is data that is sent in the body of an HTTP POST, PUT, or PATCH message and contains important information about the request. Optional. */
  payload?: boolean;
  /** Additional parameters controlling delivery channel behavior. Optional. */
  params?: Record<string, string>;
  /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
  resourceId?: string;
  /** A version-specific identifier for the watched resource. */
  resourceUri?: string;
  /** Identifies this as a notification channel used to watch for changes to a resource, which is "`api#channel`". */
  kind?: string;
}

export const Channel: Schema.Schema<Channel> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  expiration: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Boolean),
  params: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  resourceId: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface UsageReport {
  /** The type of API resource. For a usage report, the value is `admin#reports#usageReport`. */
  kind?: string;
  /** Output only. The date of the report request. */
  date?: string;
  /** Output only. Parameter value pairs for various applications. For the Entity Usage Report parameters and values, see [the Entity Usage parameters reference](https://developers.google.com/workspace/admin/reports/v1/reference/usage-ref-appendix-a/entities). */
  parameters?: Array<{ intValue?: string; name?: string; stringValue?: string; datetimeValue?: string; boolValue?: boolean; msgValue?: Array<Record<string, unknown>> }>;
  /** ETag of the resource. */
  etag?: string;
  /** Output only. Information about the type of the item. */
  entity?: { customerId?: string; userEmail?: string; profileId?: string; entityId?: string; type?: string };
}

export const UsageReport: Schema.Schema<UsageReport> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  date: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(Schema.Struct({ intValue: Schema.optional(Schema.String), name: Schema.optional(Schema.String), stringValue: Schema.optional(Schema.String), datetimeValue: Schema.optional(Schema.String), boolValue: Schema.optional(Schema.Boolean), msgValue: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))) }))),
  etag: Schema.optional(Schema.String),
  entity: Schema.optional(Schema.Struct({ customerId: Schema.optional(Schema.String), userEmail: Schema.optional(Schema.String), profileId: Schema.optional(Schema.String), entityId: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
})).annotate({ identifier: "UsageReport" }) as any as Schema.Schema<UsageReport>;

export interface UsageReports {
  /** The type of API resource. For a usage report, the value is `admin#reports#usageReports`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Warnings, if any. */
  warnings?: Array<{ code?: string; message?: string; data?: Array<{ key?: string; value?: string }> }>;
  /** Various application parameter records. */
  usageReports?: Array<UsageReport>;
  /** Token to specify next page. A report with multiple pages has a `nextPageToken` property in the response. For your follow-on requests getting all of the report's pages, enter the `nextPageToken` value in the `pageToken` query string. */
  nextPageToken?: string;
}

export const UsageReports: Schema.Schema<UsageReports> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  warnings: Schema.optional(Schema.Array(Schema.Struct({ code: Schema.optional(Schema.String), message: Schema.optional(Schema.String), data: Schema.optional(Schema.Array(Schema.Struct({ key: Schema.optional(Schema.String), value: Schema.optional(Schema.String) }))) }))),
  usageReports: Schema.optional(Schema.Array(UsageReport)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "UsageReports" }) as any as Schema.Schema<UsageReports>;

// ==========================================================================
// Operations
// ==========================================================================

/** Retrieves a list of activities for a specific customer's account and application such as the Admin console application or the Google Drive application. For more information, see the guides for administrator and Google Drive activity reports. For more information about the activity report's parameters, see the activity parameters reference guides. */
export interface ListActivitiesRequest {
  /** Represents the profile ID or the user email for which the data should be filtered. Can be `all` for all information, or `userKey` for a user's unique Google Workspace profile ID or their primary email address. Must not be a deleted user. For a deleted user, call `users.list` in Directory API with `showDeleted=true`, then use the returned `ID` as the `userKey`. */
  userKey: string;
  /** Application name for which the events are to be retrieved. */
  applicationName: "access_transparency" | "admin" | "calendar" | "chat" | "drive" | "gcp" | "gmail" | "gplus" | "groups" | "groups_enterprise" | "jamboard" | "login" | "meet" | "mobile" | "rules" | "saml" | "token" | "user_accounts" | "context_aware_access" | "chrome" | "data_studio" | "keep" | "vault" | "gemini_in_workspace_apps" | "classroom" | "assignments" | "cloud_search" | "tasks" | "data_migration" | "meet_hardware" | "directory_sync" | "ldap" | "profile" | "access_evaluation" | "admin_data_action" | "contacts" | "takeout" | "graduation" | (string & {});
  /** The Internet Protocol (IP) Address of host where the event was performed. This is an additional way to filter a report's summary using the IP address of the user whose activity is being reported. This IP address may or may not reflect the user's physical location. For example, the IP address can be the user's proxy server's address or a virtual private network (VPN) address. This parameter supports both IPv4 and IPv6 address versions. */
  actorIpAddress?: string;
  /** The unique ID of the customer to retrieve data for. */
  customerId?: string;
  /** Sets the end of the range of time shown in the report. The date is in the RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The default value is the approximate time of the API request. An API report has three basic time concepts: - *Date of the API's request for a report*: When the API created and retrieved the report. - *Report's start time*: The beginning of the timespan shown in the report. The `startTime` must be before the `endTime` (if specified) and the current time when the request is made, or the API returns an error. - *Report's end time*: The end of the timespan shown in the report. For example, the timespan of events summarized in a report can start in April and end in May. The report itself can be requested in August. If the `endTime` is not specified, the report returns all activities from the `startTime` until the current time or the most recent 180 days if the `startTime` is more than 180 days in the past. For Gmail requests, `startTime` and `endTime` must be provided and the difference must not be greater than 30 days. */
  endTime?: string;
  /** The name of the event being queried by the API. Each `eventName` is related to a specific Google Workspace service or feature which the API organizes into types of events. An example is the Google Calendar events in the Admin console application's reports. The Calendar Settings `type` structure has all of the Calendar `eventName` activities reported by the API. When an administrator changes a Calendar setting, the API reports this activity in the Calendar Settings `type` and `eventName` parameters. For more information about `eventName` query strings and parameters, see the list of event names for various applications above in `applicationName`. */
  eventName?: string;
  /** The `filters` query string is a comma-separated list composed of event parameters manipulated by relational operators. Event parameters are in the form `{parameter1 name}{relational operator}{parameter1 value},{parameter2 name}{relational operator}{parameter2 value},...` These event parameters are associated with a specific `eventName`. An empty report is returned if the request's parameter doesn't belong to the `eventName`. For more information about the available `eventName` fields for each application and their associated parameters, go to the [ApplicationName](#applicationname) table, then click through to the Activity Events page in the Appendix for the application you want. In the following Drive activity examples, the returned list consists of all `edit` events where the `doc_id` parameter value matches the conditions defined by the relational operator. In the first example, the request returns all edited documents with a `doc_id` value equal to `12345`. In the second example, the report returns any edited documents where the `doc_id` value is not equal to `98765`. The `<>` operator is URL-encoded in the request's query string (`%3C%3E`): ``` GET...&eventName=edit&filters=doc_id==12345 GET...&eventName=edit&filters=doc_id%3C%3E98765 ``` A `filters` query supports these relational operators: * `==`—'equal to'. * `<>`—'not equal to'. Must be URL-encoded (%3C%3E). * `<`—'less than'. Must be URL-encoded (%3C). * `<=`—'less than or equal to'. Must be URL-encoded (%3C=). * `>`—'greater than'. Must be URL-encoded (%3E). * `>=`—'greater than or equal to'. Must be URL-encoded (%3E=). **Note:** The API doesn't accept multiple values of the same parameter. If a parameter is supplied more than once in the API request, the API only accepts the last value of that parameter. In addition, if an invalid parameter is supplied in the API request, the API ignores that parameter and returns the response corresponding to the remaining valid parameters. If no parameters are requested, all parameters are returned. */
  filters?: string;
  /** Determines how many activity records are shown on each response page. For example, if the request sets `maxResults=1` and the report has two activities, the report has two pages. The response's `nextPageToken` property has the token to the second page. The `maxResults` query string is optional in the request. The default value is 1000. */
  maxResults?: number;
  /** ID of the organizational unit to report on. Activity records will be shown only for users who belong to the specified organizational unit. Data before Dec 17, 2018 doesn't appear in the filtered results. */
  orgUnitID?: string;
  /** The token to specify next page. A report with multiple pages has a `nextPageToken` property in the response. In your follow-on request getting the next page of the report, enter the `nextPageToken` value in the `pageToken` query string. */
  pageToken?: string;
  /** Sets the beginning of the range of time shown in the report. The date is in the RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The report returns all activities from `startTime` until `endTime`. The `startTime` must be before the `endTime` (if specified) and the current time when the request is made, or the API returns an error. For Gmail requests, `startTime` and `endTime` must be provided and the difference must not be greater than 30 days. */
  startTime?: string;
  /** Comma separated group ids (obfuscated) on which user activities are filtered, i.e. the response will contain activities for only those users that are a part of at least one of the group ids mentioned here. Format: "id:abc123,id:xyz456" *Important:* To filter by groups, you must explicitly add the groups to your filtering groups allowlist. For more information about adding groups to filtering groups allowlist, see [Filter results by Google Group](https://support.google.com/a/answer/11482175) */
  groupIdFilter?: string;
  /** Optional. The `resourceDetailsFilter` query string is an AND separated list composed of [Resource Details](#resourcedetails) fields manipulated by relational operators. Resource Details Filters are in the form `{resourceDetails.field1}{relational operator}{field1 value} AND {resourceDetails.field2}{relational operator}{field2 value}...` All the inner fields are traversed using the `.` operator, as shown in the following example: ``` resourceDetails.id = "resourceId" AND resourceDetails.appliedLabels.id = "appliedLabelId" AND resourceDetails.appliedLabels.fieldValue.id = "fieldValueId" ``` `resourceDetailsFilter` query supports these relational operators: * `=`—'equal to'. * `!=`—'not equal to'. * `:`—'exists'. This is used for filtering on repeated fields. [`FieldValue`](#fieldvalue) types that are repeated in nature uses `exists` operator for filtering. The following [`FieldValue`](#fieldvalue) types are repeated: * [`TextListValue`](#textlistvalue) * [`SelectionListValue`](#selectionlistvalue) * [`UserListValue`](#userlistvalue) For example, in the following filter, [`SelectionListValue`](#selectionlistvalue), is a repeated field. The filter checks whether [`SelectionListValue`](#selectionlistvalue) contains `selection_id`: ``` resourceDetails.id = "resourceId" AND resourceDetails.appliedLabels.id = "appliedLabelId" AND resourceDetails.appliedLabels.fieldValue.id = "fieldValueId" AND resourceDetails.appliedLabels.fieldValue.type = "SELECTION_LIST_VALUE" AND resourceDetails.appliedLabels.fieldValue.selectionListValue.id: "id" ``` **Usage** ``` GET...&resourceDetailsFilter=resourceDetails.id = "resourceId" AND resourceDetails.appliedLabels.id = "appliedLabelId" GET...&resourceDetailsFilter=resourceDetails.id=%22resourceId%22%20AND%20resourceDetails.appliedLabels.id=%22appliedLabelId%22 ``` **Note the following**: * You must URL encode the query string before sending the request. * The API supports a maximum of 5 fields separated by the AND operator. - When filtering on deeper levels (e.g., [`AppliedLabel`](#appliedlabel), [`FieldValue`](#fieldvalue)), the IDs of all preceding levels in the hierarchy must be included in the filter. For example: Filtering on [`FieldValue`](#fieldvalue) requires [`AppliedLabel`](#appliedlabel) ID and resourceDetails ID to be present. *Sample Query*: ``` resourceDetails.id = "resourceId" AND resourceDetails.appliedLabels.id = "appliedLabelId" AND resourceDetails.appliedLabels.fieldValue.id = "fieldValueId" ``` * Filtering on inner [`FieldValue`](#fieldvalue) types like `longTextValue` and `textValue` requires `resourceDetails.appliedLabels.fieldValue.type` to be present. * Only Filtering on a single [`AppliedLabel`](#appliedlabel) id and [`FieldValue`](#fieldvalue) id is supported. */
  resourceDetailsFilter?: string;
  /** Optional. Used to filter on the `regionCode` field present in [`NetworkInfo`](#networkinfo) message. **Usage** ``` GET...&networkInfoFilter=regionCode="IN" GET...&networkInfoFilter=regionCode=%22IN%22 ``` */
  networkInfoFilter?: string;
  /** Optional. Used to filter on the `statusCode` field present in [`Status`](#status) message. **Usage** ``` GET...&statusFilter=statusCode="200" GET...&statusFilter=statusCode=%22200%22 ``` */
  statusFilter?: string;
  /** Optional. Used to filter on the `oAuthClientId` field present in [`ApplicationInfo`](#applicationinfo) message. **Usage** ``` GET...&applicationInfoFilter=oAuthClientId="clientId" GET...&applicationInfoFilter=oAuthClientId=%22clientId%22 ``` */
  applicationInfoFilter?: string;
}

export const ListActivitiesRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  applicationName: Schema.String.pipe(T.HttpPath("applicationName")),
  actorIpAddress: Schema.optional(Schema.String).pipe(T.HttpQuery("actorIpAddress")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
  eventName: Schema.optional(Schema.String).pipe(T.HttpQuery("eventName")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orgUnitID: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitID")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  groupIdFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("groupIdFilter")),
  resourceDetailsFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceDetailsFilter")),
  networkInfoFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("networkInfoFilter")),
  statusFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("statusFilter")),
  applicationInfoFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("applicationInfoFilter")),
}).pipe(
  T.Http({ method: "GET", path: "admin/reports/v1/activity/users/{userKey}/applications/{applicationName}" }),
  svc,
) as unknown as Schema.Schema<ListActivitiesRequest>;

export type ListActivitiesResponse = Activities;
export const ListActivitiesResponse = Activities;

export type ListActivitiesError = CommonErrors;

export const listActivities = API.makePaginated(() => ({
  input: ListActivitiesRequest,
  output: ListActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Start receiving notifications for account activities. For more information, see Receiving Push Notifications. */
export interface WatchActivitiesRequest {
  /** Represents the profile ID or the user email for which the data should be filtered. Can be `all` for all information, or `userKey` for a user's unique Google Workspace profile ID or their primary email address. Must not be a deleted user. For a deleted user, call `users.list` in Directory API with `showDeleted=true`, then use the returned `ID` as the `userKey`. */
  userKey: string;
  /** Application name for which the events are to be retrieved. */
  applicationName: "access_transparency" | "admin" | "calendar" | "chat" | "drive" | "gcp" | "gplus" | "groups" | "groups_enterprise" | "jamboard" | "login" | "meet" | "mobile" | "rules" | "saml" | "token" | "user_accounts" | "context_aware_access" | "chrome" | "data_studio" | "keep" | "classroom" | (string & {});
  /** The Internet Protocol (IP) Address of host where the event was performed. This is an additional way to filter a report's summary using the IP address of the user whose activity is being reported. This IP address may or may not reflect the user's physical location. For example, the IP address can be the user's proxy server's address or a virtual private network (VPN) address. This parameter supports both IPv4 and IPv6 address versions. */
  actorIpAddress?: string;
  /** The unique ID of the customer to retrieve data for. */
  customerId?: string;
  /** Sets the end of the range of time shown in the report. The date is in the RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The default value is the approximate time of the API request. An API report has three basic time concepts: - *Date of the API's request for a report*: When the API created and retrieved the report. - *Report's start time*: The beginning of the timespan shown in the report. The `startTime` must be before the `endTime` (if specified) and the current time when the request is made, or the API returns an error. - *Report's end time*: The end of the timespan shown in the report. For example, the timespan of events summarized in a report can start in April and end in May. The report itself can be requested in August. If the `endTime` is not specified, the report returns all activities from the `startTime` until the current time or the most recent 180 days if the `startTime` is more than 180 days in the past. */
  endTime?: string;
  /** The name of the event being queried by the API. Each `eventName` is related to a specific Google Workspace service or feature which the API organizes into types of events. An example is the Google Calendar events in the Admin console application's reports. The Calendar Settings `type` structure has all of the Calendar `eventName` activities reported by the API. When an administrator changes a Calendar setting, the API reports this activity in the Calendar Settings `type` and `eventName` parameters. For more information about `eventName` query strings and parameters, see the list of event names for various applications above in `applicationName`. */
  eventName?: string;
  /** The `filters` query string is a comma-separated list composed of event parameters manipulated by relational operators. Event parameters are in the form `{parameter1 name}{relational operator}{parameter1 value},{parameter2 name}{relational operator}{parameter2 value},...` These event parameters are associated with a specific `eventName`. An empty report is returned if the request's parameter doesn't belong to the `eventName`. For more information about the available `eventName` fields for each application and their associated parameters, go to the [ApplicationName](#applicationname) table, then click through to the Activity Events page in the Appendix for the application you want. In the following Drive activity examples, the returned list consists of all `edit` events where the `doc_id` parameter value matches the conditions defined by the relational operator. In the first example, the request returns all edited documents with a `doc_id` value equal to `12345`. In the second example, the report returns any edited documents where the `doc_id` value is not equal to `98765`. The `<>` operator is URL-encoded in the request's query string (`%3C%3E`): ``` GET...&eventName=edit&filters=doc_id==12345 GET...&eventName=edit&filters=doc_id%3C%3E98765 ``` A `filters` query supports these relational operators: * `==`—'equal to'. * `<>`—'not equal to'. Must be URL-encoded (%3C%3E). * `<`—'less than'. Must be URL-encoded (%3C). * `<=`—'less than or equal to'. Must be URL-encoded (%3C=). * `>`—'greater than'. Must be URL-encoded (%3E). * `>=`—'greater than or equal to'. Must be URL-encoded (%3E=). **Note:** The API doesn't accept multiple values of the same parameter. If a parameter is supplied more than once in the API request, the API only accepts the last value of that parameter. In addition, if an invalid parameter is supplied in the API request, the API ignores that parameter and returns the response corresponding to the remaining valid parameters. If no parameters are requested, all parameters are returned. */
  filters?: string;
  /** Determines how many activity records are shown on each response page. For example, if the request sets `maxResults=1` and the report has two activities, the report has two pages. The response's `nextPageToken` property has the token to the second page. The `maxResults` query string is optional in the request. The default value is 1000. */
  maxResults?: number;
  /** `Deprecated`. This field is deprecated and is no longer supported. ID of the organizational unit to report on. Activity records will be shown only for users who belong to the specified organizational unit. Data before Dec 17, 2018 doesn't appear in the filtered results. */
  orgUnitID?: string;
  /** The token to specify next page. A report with multiple pages has a `nextPageToken` property in the response. In your follow-on request getting the next page of the report, enter the `nextPageToken` value in the `pageToken` query string. */
  pageToken?: string;
  /** Sets the beginning of the range of time shown in the report. The date is in the RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The report returns all activities from `startTime` until `endTime`. The `startTime` must be before the `endTime` (if specified) and the current time when the request is made, or the API returns an error. */
  startTime?: string;
  /** `Deprecated`. This field is deprecated and is no longer supported. Comma separated group ids (obfuscated) on which user activities are filtered, i.e. the response will contain activities for only those users that are a part of at least one of the group ids mentioned here. Format: "id:abc123,id:xyz456" *Important:* To filter by groups, you must explicitly add the groups to your filtering groups allowlist. For more information about adding groups to filtering groups allowlist, see [Filter results by Google Group](https://support.google.com/a/answer/11482175) */
  groupIdFilter?: string;
  /** Request body */
  body?: Channel;
}

export const WatchActivitiesRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  applicationName: Schema.String.pipe(T.HttpPath("applicationName")),
  actorIpAddress: Schema.optional(Schema.String).pipe(T.HttpQuery("actorIpAddress")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
  eventName: Schema.optional(Schema.String).pipe(T.HttpQuery("eventName")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orgUnitID: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitID")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  groupIdFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("groupIdFilter")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/reports/v1/activity/users/{userKey}/applications/{applicationName}/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchActivitiesRequest>;

export type WatchActivitiesResponse = Channel;
export const WatchActivitiesResponse = Channel;

export type WatchActivitiesError = CommonErrors;

export const watchActivities: API.OperationMethod<WatchActivitiesRequest, WatchActivitiesResponse, WatchActivitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchActivitiesRequest,
  output: WatchActivitiesResponse,
  errors: [],
}));

/** Stop watching resources through this channel. */
export interface StopChannelsRequest {
  /** Request body */
  body?: Channel;
}

export const StopChannelsRequest = Schema.Struct({
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/reports_v1/channels/stop", hasBody: true }),
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

/** Retrieves a report which is a collection of properties and statistics for a specific customer's account. For more information, see the Customers Usage Report guide. For more information about the customer report's parameters, see the Customers Usage parameters reference guides. */
export interface GetCustomerUsageReportsRequest {
  /** Represents the date the usage occurred, based on UTC-8:00 (Pacific Standard Time). The timestamp is in the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601), `yyyy-mm-dd`. */
  date: string;
  /** The unique ID of the customer to retrieve data for. */
  customerId?: string;
  /** Token to specify next page. A report with multiple pages has a `nextPageToken` property in the response. For your follow-on requests getting all of the report's pages, enter the `nextPageToken` value in the `pageToken` query string. */
  pageToken?: string;
  /** The `parameters` query string is a comma-separated list of event parameters that refine a report's results. The parameter is associated with a specific application. The application values for the Customers usage report include `accounts`, `app_maker`, `apps_scripts`, `calendar`, `chat`, `classroom`, `cros`, `docs`, `gmail`, `gplus`, `device_management`, `meet`, and `sites`. A `parameters` query string is in the CSV form of `app_name1:param_name1, app_name2:param_name2`. *Note:* The API doesn't accept multiple values of a parameter. If a particular parameter is supplied more than once in the API request, the API only accepts the last value of that request parameter. In addition, if an invalid request parameter is supplied in the API request, the API ignores that request parameter and returns the response corresponding to the remaining valid request parameters. An example of an invalid request parameter is one that does not belong to the application. If no parameters are requested, all parameters are returned. */
  parameters?: string;
}

export const GetCustomerUsageReportsRequest = Schema.Struct({
  date: Schema.String.pipe(T.HttpPath("date")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parameters: Schema.optional(Schema.String).pipe(T.HttpQuery("parameters")),
}).pipe(
  T.Http({ method: "GET", path: "admin/reports/v1/usage/dates/{date}" }),
  svc,
) as unknown as Schema.Schema<GetCustomerUsageReportsRequest>;

export type GetCustomerUsageReportsResponse = UsageReports;
export const GetCustomerUsageReportsResponse = UsageReports;

export type GetCustomerUsageReportsError = CommonErrors;

export const getCustomerUsageReports = API.makePaginated(() => ({
  input: GetCustomerUsageReportsRequest,
  output: GetCustomerUsageReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a report which is a collection of properties and statistics for entities used by users within the account. For more information, see the Entities Usage Report guide. For more information about the entities report's parameters, see the Entities Usage parameters reference guides. */
export interface GetEntityUsageReportsRequest {
  /** Represents the type of entity for the report. */
  entityType: "gplus_communities" | (string & {});
  /** Represents the key of the object to filter the data with. It is a string which can take the value `all` to get activity events for all users, or any other value for an app-specific entity. For details on how to obtain the `entityKey` for a particular `entityType`, see the Entities Usage parameters reference guides. */
  entityKey: string;
  /** Represents the date the usage occurred, based on UTC-8:00 (Pacific Standard Time). The timestamp is in the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601), `yyyy-mm-dd`. */
  date: string;
  /** The unique ID of the customer to retrieve data for. */
  customerId?: string;
  /** The `filters` query string is a comma-separated list of an application's event parameters where the parameter's value is manipulated by a relational operator. The `filters` query string includes the name of the application whose usage is returned in the report. The application values for the Entities usage report include `accounts`, `docs`, and `gmail`. Filters are in the form `[application name]:parameter name[parameter value],...`. In this example, the `<>` 'not equal to' operator is URL-encoded in the request's query string (%3C%3E): GET https://www.googleapis.com/admin/reports/v1/usage/gplus_communities/all/dates/2017-12-01 ?parameters=gplus:community_name,gplus:num_total_members &filters=gplus:num_total_members%3C%3E0 The relational operators include: - `==` - 'equal to'. - `<>` - 'not equal to'. It is URL-encoded (%3C%3E). - `<` - 'less than'. It is URL-encoded (%3C). - `<=` - 'less than or equal to'. It is URL-encoded (%3C=). - `>` - 'greater than'. It is URL-encoded (%3E). - `>=` - 'greater than or equal to'. It is URL-encoded (%3E=). Filters can only be applied to numeric parameters. */
  filters?: string;
  /** Determines how many activity records are shown on each response page. For example, if the request sets `maxResults=1` and the report has two activities, the report has two pages. The response's `nextPageToken` property has the token to the second page. */
  maxResults?: number;
  /** Token to specify next page. A report with multiple pages has a `nextPageToken` property in the response. In your follow-on request getting the next page of the report, enter the `nextPageToken` value in the `pageToken` query string. */
  pageToken?: string;
  /** The `parameters` query string is a comma-separated list of event parameters that refine a report's results. The parameter is associated with a specific application. The application values for the Entities usage report are only `gplus`. A `parameter` query string is in the CSV form of `[app_name1:param_name1], [app_name2:param_name2]...`. *Note:* The API doesn't accept multiple values of a parameter. If a particular parameter is supplied more than once in the API request, the API only accepts the last value of that request parameter. In addition, if an invalid request parameter is supplied in the API request, the API ignores that request parameter and returns the response corresponding to the remaining valid request parameters. An example of an invalid request parameter is one that does not belong to the application. If no parameters are requested, all parameters are returned. */
  parameters?: string;
}

export const GetEntityUsageReportsRequest = Schema.Struct({
  entityType: Schema.String.pipe(T.HttpPath("entityType")),
  entityKey: Schema.String.pipe(T.HttpPath("entityKey")),
  date: Schema.String.pipe(T.HttpPath("date")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parameters: Schema.optional(Schema.String).pipe(T.HttpQuery("parameters")),
}).pipe(
  T.Http({ method: "GET", path: "admin/reports/v1/usage/{entityType}/{entityKey}/dates/{date}" }),
  svc,
) as unknown as Schema.Schema<GetEntityUsageReportsRequest>;

export type GetEntityUsageReportsResponse = UsageReports;
export const GetEntityUsageReportsResponse = UsageReports;

export type GetEntityUsageReportsError = CommonErrors;

export const getEntityUsageReports = API.makePaginated(() => ({
  input: GetEntityUsageReportsRequest,
  output: GetEntityUsageReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a report which is a collection of properties and statistics for a set of users with the account. For more information, see the User Usage Report guide. For more information about the user report's parameters, see the Users Usage parameters reference guides. */
export interface GetUserUsageReportRequest {
  /** Represents the profile ID or the user email for which the data should be filtered. Can be `all` for all information, or `userKey` for a user's unique Google Workspace profile ID or their primary email address. Must not be a deleted user. For a deleted user, call `users.list` in Directory API with `showDeleted=true`, then use the returned `ID` as the `userKey`. */
  userKey: string;
  /** Represents the date the usage occurred, based on UTC-8:00 (Pacific Standard Time). The timestamp is in the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601), `yyyy-mm-dd`. */
  date: string;
  /** The unique ID of the customer to retrieve data for. */
  customerId?: string;
  /** The `filters` query string is a comma-separated list of an application's event parameters where the parameter's value is manipulated by a relational operator. The `filters` query string includes the name of the application whose usage is returned in the report. The application values for the Users Usage Report include `accounts`, `chat`, `docs`, and `gmail`. Filters are in the form `[application name]:parameter name[parameter value],...`. In this example, the `<>` 'not equal to' operator is URL-encoded in the request's query string (%3C%3E): GET https://www.googleapis.com/admin/reports/v1/usage/users/all/dates/2013-03-03 ?parameters=accounts:last_login_time &filters=accounts:last_login_time%3C%3E2010-10-28T10:26:35.000Z The relational operators include: - `==` - 'equal to'. - `<>` - 'not equal to'. It is URL-encoded (%3C%3E). - `<` - 'less than'. It is URL-encoded (%3C). - `<=` - 'less than or equal to'. It is URL-encoded (%3C=). - `>` - 'greater than'. It is URL-encoded (%3E). - `>=` - 'greater than or equal to'. It is URL-encoded (%3E=). */
  filters?: string;
  /** Determines how many activity records are shown on each response page. For example, if the request sets `maxResults=1` and the report has two activities, the report has two pages. The response's `nextPageToken` property has the token to the second page. The `maxResults` query string is optional. */
  maxResults?: number;
  /** ID of the organizational unit to report on. User activity will be shown only for users who belong to the specified organizational unit. Data before Dec 17, 2018 doesn't appear in the filtered results. */
  orgUnitID?: string;
  /** Token to specify next page. A report with multiple pages has a `nextPageToken` property in the response. In your follow-on request getting the next page of the report, enter the `nextPageToken` value in the `pageToken` query string. */
  pageToken?: string;
  /** The `parameters` query string is a comma-separated list of event parameters that refine a report's results. The parameter is associated with a specific application. The application values for the Customers Usage report include `accounts`, `app_maker`, `apps_scripts`, `calendar`, `chat`, `classroom`, `cros`, `docs`, `gmail`, `gplus`, `device_management`, `meet`, and `sites`. A `parameters` query string is in the CSV form of `app_name1:param_name1, app_name2:param_name2`. *Note:* The API doesn't accept multiple values of a parameter. If a particular parameter is supplied more than once in the API request, the API only accepts the last value of that request parameter. In addition, if an invalid request parameter is supplied in the API request, the API ignores that request parameter and returns the response corresponding to the remaining valid request parameters. An example of an invalid request parameter is one that does not belong to the application. If no parameters are requested, all parameters are returned. */
  parameters?: string;
  /** Comma separated group ids (obfuscated) on which user activities are filtered, i.e. the response will contain activities for only those users that are a part of at least one of the group ids mentioned here. Format: "id:abc123,id:xyz456" */
  groupIdFilter?: string;
}

export const GetUserUsageReportRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  date: Schema.String.pipe(T.HttpPath("date")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orgUnitID: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitID")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parameters: Schema.optional(Schema.String).pipe(T.HttpQuery("parameters")),
  groupIdFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("groupIdFilter")),
}).pipe(
  T.Http({ method: "GET", path: "admin/reports/v1/usage/users/{userKey}/dates/{date}" }),
  svc,
) as unknown as Schema.Schema<GetUserUsageReportRequest>;

export type GetUserUsageReportResponse = UsageReports;
export const GetUserUsageReportResponse = UsageReports;

export type GetUserUsageReportError = CommonErrors;

export const getUserUsageReport = API.makePaginated(() => ({
  input: GetUserUsageReportRequest,
  output: GetUserUsageReportResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

