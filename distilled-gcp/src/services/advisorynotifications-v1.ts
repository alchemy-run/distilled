// ==========================================================================
// Advisory Notifications API (advisorynotifications v1)
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
  name: "advisorynotifications",
  version: "v1",
  rootUrl: "https://advisorynotifications.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudAdvisorynotificationsV1Text {
  /** The English copy. */
  enText?: string;
  /** The requested localized copy (if applicable). */
  localizedText?: string;
  /** Status of the localization. */
  localizationState?: "LOCALIZATION_STATE_UNSPECIFIED" | "LOCALIZATION_STATE_NOT_APPLICABLE" | "LOCALIZATION_STATE_PENDING" | "LOCALIZATION_STATE_COMPLETED" | (string & {});
}

export const GoogleCloudAdvisorynotificationsV1Text: Schema.Schema<GoogleCloudAdvisorynotificationsV1Text> = Schema.suspend(() => Schema.Struct({
  enText: Schema.optional(Schema.String),
  localizedText: Schema.optional(Schema.String),
  localizationState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1Text" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1Text>;

export interface GoogleCloudAdvisorynotificationsV1Subject {
  /** The text content. */
  text?: GoogleCloudAdvisorynotificationsV1Text;
}

export const GoogleCloudAdvisorynotificationsV1Subject: Schema.Schema<GoogleCloudAdvisorynotificationsV1Subject> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudAdvisorynotificationsV1Text),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1Subject" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1Subject>;

export interface GoogleCloudAdvisorynotificationsV1MessageBody {
  /** The text content of the message body. */
  text?: GoogleCloudAdvisorynotificationsV1Text;
}

export const GoogleCloudAdvisorynotificationsV1MessageBody: Schema.Schema<GoogleCloudAdvisorynotificationsV1MessageBody> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudAdvisorynotificationsV1Text),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1MessageBody" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1MessageBody>;

export interface GoogleCloudAdvisorynotificationsV1CsvCsvRow {
  /** The data entries in a CSV file row, as a string array rather than a single comma-separated string. */
  entries?: Array<string>;
}

export const GoogleCloudAdvisorynotificationsV1CsvCsvRow: Schema.Schema<GoogleCloudAdvisorynotificationsV1CsvCsvRow> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1CsvCsvRow" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1CsvCsvRow>;

export interface GoogleCloudAdvisorynotificationsV1Csv {
  /** The list of headers for data columns in a CSV file. */
  headers?: Array<string>;
  /** The list of data rows in a CSV file, as string arrays rather than as a single comma-separated string. */
  dataRows?: Array<GoogleCloudAdvisorynotificationsV1CsvCsvRow>;
}

export const GoogleCloudAdvisorynotificationsV1Csv: Schema.Schema<GoogleCloudAdvisorynotificationsV1Csv> = Schema.suspend(() => Schema.Struct({
  headers: Schema.optional(Schema.Array(Schema.String)),
  dataRows: Schema.optional(Schema.Array(GoogleCloudAdvisorynotificationsV1CsvCsvRow)),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1Csv" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1Csv>;

export interface GoogleCloudAdvisorynotificationsV1Attachment {
  /** A CSV file attachment. Max size is 10 MB. */
  csv?: GoogleCloudAdvisorynotificationsV1Csv;
  /** The title of the attachment. */
  displayName?: string;
}

export const GoogleCloudAdvisorynotificationsV1Attachment: Schema.Schema<GoogleCloudAdvisorynotificationsV1Attachment> = Schema.suspend(() => Schema.Struct({
  csv: Schema.optional(GoogleCloudAdvisorynotificationsV1Csv),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1Attachment" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1Attachment>;

export interface GoogleCloudAdvisorynotificationsV1Message {
  /** The message content. */
  body?: GoogleCloudAdvisorynotificationsV1MessageBody;
  /** The attachments to download. */
  attachments?: Array<GoogleCloudAdvisorynotificationsV1Attachment>;
  /** The Message creation timestamp. */
  createTime?: string;
  /** Time when Message was localized */
  localizationTime?: string;
}

export const GoogleCloudAdvisorynotificationsV1Message: Schema.Schema<GoogleCloudAdvisorynotificationsV1Message> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(GoogleCloudAdvisorynotificationsV1MessageBody),
  attachments: Schema.optional(Schema.Array(GoogleCloudAdvisorynotificationsV1Attachment)),
  createTime: Schema.optional(Schema.String),
  localizationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1Message" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1Message>;

export interface GoogleCloudAdvisorynotificationsV1Notification {
  /** The resource name of the notification. Format: organizations/{organization}/locations/{location}/notifications/{notification} or projects/{project}/locations/{location}/notifications/{notification}. */
  name?: string;
  /** The subject line of the notification. */
  subject?: GoogleCloudAdvisorynotificationsV1Subject;
  /** A list of messages in the notification. */
  messages?: Array<GoogleCloudAdvisorynotificationsV1Message>;
  /** Output only. Time the notification was created. */
  createTime?: string;
  /** Type of notification */
  notificationType?: "NOTIFICATION_TYPE_UNSPECIFIED" | "NOTIFICATION_TYPE_SECURITY_PRIVACY_ADVISORY" | "NOTIFICATION_TYPE_SENSITIVE_ACTIONS" | "NOTIFICATION_TYPE_SECURITY_MSA" | "NOTIFICATION_TYPE_THREAT_HORIZONS" | (string & {});
}

export const GoogleCloudAdvisorynotificationsV1Notification: Schema.Schema<GoogleCloudAdvisorynotificationsV1Notification> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  subject: Schema.optional(GoogleCloudAdvisorynotificationsV1Subject),
  messages: Schema.optional(Schema.Array(GoogleCloudAdvisorynotificationsV1Message)),
  createTime: Schema.optional(Schema.String),
  notificationType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1Notification" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1Notification>;

export interface GoogleCloudAdvisorynotificationsV1ListNotificationsResponse {
  /** List of notifications under a given parent. */
  notifications?: Array<GoogleCloudAdvisorynotificationsV1Notification>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Estimation of a total number of notifications. */
  totalSize?: number;
}

export const GoogleCloudAdvisorynotificationsV1ListNotificationsResponse: Schema.Schema<GoogleCloudAdvisorynotificationsV1ListNotificationsResponse> = Schema.suspend(() => Schema.Struct({
  notifications: Schema.optional(Schema.Array(GoogleCloudAdvisorynotificationsV1Notification)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1ListNotificationsResponse" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1ListNotificationsResponse>;

export interface GoogleCloudAdvisorynotificationsV1NotificationSettings {
  /** Whether the associated NotificationType is enabled. */
  enabled?: boolean;
}

export const GoogleCloudAdvisorynotificationsV1NotificationSettings: Schema.Schema<GoogleCloudAdvisorynotificationsV1NotificationSettings> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1NotificationSettings" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1NotificationSettings>;

export interface GoogleCloudAdvisorynotificationsV1Settings {
  /** Identifier. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. */
  name?: string;
  /** Required. Map of each notification type and its settings to get/set all settings at once. The server will validate the value for each notification type. */
  notificationSettings?: Record<string, GoogleCloudAdvisorynotificationsV1NotificationSettings>;
  /** Required. Fingerprint for optimistic concurrency returned in Get requests. Must be provided for Update requests. If the value provided does not match the value known to the server, ABORTED will be thrown, and the client should retry the read-modify-write cycle. */
  etag?: string;
}

export const GoogleCloudAdvisorynotificationsV1Settings: Schema.Schema<GoogleCloudAdvisorynotificationsV1Settings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  notificationSettings: Schema.optional(Schema.Record(Schema.String, GoogleCloudAdvisorynotificationsV1NotificationSettings)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudAdvisorynotificationsV1Settings" }) as any as Schema.Schema<GoogleCloudAdvisorynotificationsV1Settings>;

// ==========================================================================
// Operations
// ==========================================================================

/** Get notification settings. */
export interface GetSettingsOrganizationsLocationsRequest {
  /** Required. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. */
  name: string;
}

export const GetSettingsOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsOrganizationsLocationsRequest>;

export type GetSettingsOrganizationsLocationsResponse = GoogleCloudAdvisorynotificationsV1Settings;
export const GetSettingsOrganizationsLocationsResponse = GoogleCloudAdvisorynotificationsV1Settings;

export type GetSettingsOrganizationsLocationsError = CommonErrors;

export const getSettingsOrganizationsLocations: API.OperationMethod<GetSettingsOrganizationsLocationsRequest, GetSettingsOrganizationsLocationsResponse, GetSettingsOrganizationsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsOrganizationsLocationsRequest,
  output: GetSettingsOrganizationsLocationsResponse,
  errors: [],
}));

/** Update notification settings. */
export interface UpdateSettingsOrganizationsLocationsRequest {
  /** Identifier. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. */
  name: string;
  /** Request body */
  body?: GoogleCloudAdvisorynotificationsV1Settings;
}

export const UpdateSettingsOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudAdvisorynotificationsV1Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsOrganizationsLocationsRequest>;

export type UpdateSettingsOrganizationsLocationsResponse = GoogleCloudAdvisorynotificationsV1Settings;
export const UpdateSettingsOrganizationsLocationsResponse = GoogleCloudAdvisorynotificationsV1Settings;

export type UpdateSettingsOrganizationsLocationsError = CommonErrors;

export const updateSettingsOrganizationsLocations: API.OperationMethod<UpdateSettingsOrganizationsLocationsRequest, UpdateSettingsOrganizationsLocationsResponse, UpdateSettingsOrganizationsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsOrganizationsLocationsRequest,
  output: UpdateSettingsOrganizationsLocationsResponse,
  errors: [],
}));

/** Lists notifications under a given parent. */
export interface ListOrganizationsLocationsNotificationsRequest {
  /** Required. The parent, which owns this collection of notifications. Must be of the form "organizations/{organization}/locations/{location}" or "projects/{project}/locations/{location}". */
  parent: string;
  /** The maximum number of notifications to return. The service may return fewer than this value. If unspecified or equal to 0, at most 50 notifications will be returned. The maximum value is 50; values above 50 will be coerced to 50. */
  pageSize?: number;
  /** A page token returned from a previous request. When paginating, all other parameters provided in the request must match the call that returned the page token. */
  pageToken?: string;
  /** Specifies which parts of the notification resource should be returned in the response. */
  view?: "NOTIFICATION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** ISO code for requested localization language. If unset, will be interpereted as "en". If the requested language is valid, but not supported for this notification, English will be returned with an "Not applicable" LocalizationState. If the ISO code is invalid (i.e. not a real language), this RPC will throw an error. */
  languageCode?: string;
}

export const ListOrganizationsLocationsNotificationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/notifications" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsNotificationsRequest>;

export type ListOrganizationsLocationsNotificationsResponse = GoogleCloudAdvisorynotificationsV1ListNotificationsResponse;
export const ListOrganizationsLocationsNotificationsResponse = GoogleCloudAdvisorynotificationsV1ListNotificationsResponse;

export type ListOrganizationsLocationsNotificationsError = CommonErrors;

export const listOrganizationsLocationsNotifications = API.makePaginated(() => ({
  input: ListOrganizationsLocationsNotificationsRequest,
  output: ListOrganizationsLocationsNotificationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a notification. */
export interface GetOrganizationsLocationsNotificationsRequest {
  /** Required. A name of the notification to retrieve. Format: organizations/{organization}/locations/{location}/notifications/{notification} or projects/{projects}/locations/{location}/notifications/{notification}. */
  name: string;
  /** ISO code for requested localization language. If unset, will be interpereted as "en". If the requested language is valid, but not supported for this notification, English will be returned with an "Not applicable" LocalizationState. If the ISO code is invalid (i.e. not a real language), this RPC will throw an error. */
  languageCode?: string;
}

export const GetOrganizationsLocationsNotificationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/notifications/{notificationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsNotificationsRequest>;

export type GetOrganizationsLocationsNotificationsResponse = GoogleCloudAdvisorynotificationsV1Notification;
export const GetOrganizationsLocationsNotificationsResponse = GoogleCloudAdvisorynotificationsV1Notification;

export type GetOrganizationsLocationsNotificationsError = CommonErrors;

export const getOrganizationsLocationsNotifications: API.OperationMethod<GetOrganizationsLocationsNotificationsRequest, GetOrganizationsLocationsNotificationsResponse, GetOrganizationsLocationsNotificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsNotificationsRequest,
  output: GetOrganizationsLocationsNotificationsResponse,
  errors: [],
}));

/** Get notification settings. */
export interface GetSettingsProjectsLocationsRequest {
  /** Required. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. */
  name: string;
}

export const GetSettingsProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsProjectsLocationsRequest>;

export type GetSettingsProjectsLocationsResponse = GoogleCloudAdvisorynotificationsV1Settings;
export const GetSettingsProjectsLocationsResponse = GoogleCloudAdvisorynotificationsV1Settings;

export type GetSettingsProjectsLocationsError = CommonErrors;

export const getSettingsProjectsLocations: API.OperationMethod<GetSettingsProjectsLocationsRequest, GetSettingsProjectsLocationsResponse, GetSettingsProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsProjectsLocationsRequest,
  output: GetSettingsProjectsLocationsResponse,
  errors: [],
}));

/** Update notification settings. */
export interface UpdateSettingsProjectsLocationsRequest {
  /** Identifier. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. */
  name: string;
  /** Request body */
  body?: GoogleCloudAdvisorynotificationsV1Settings;
}

export const UpdateSettingsProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudAdvisorynotificationsV1Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsProjectsLocationsRequest>;

export type UpdateSettingsProjectsLocationsResponse = GoogleCloudAdvisorynotificationsV1Settings;
export const UpdateSettingsProjectsLocationsResponse = GoogleCloudAdvisorynotificationsV1Settings;

export type UpdateSettingsProjectsLocationsError = CommonErrors;

export const updateSettingsProjectsLocations: API.OperationMethod<UpdateSettingsProjectsLocationsRequest, UpdateSettingsProjectsLocationsResponse, UpdateSettingsProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsProjectsLocationsRequest,
  output: UpdateSettingsProjectsLocationsResponse,
  errors: [],
}));

/** Lists notifications under a given parent. */
export interface ListProjectsLocationsNotificationsRequest {
  /** Required. The parent, which owns this collection of notifications. Must be of the form "organizations/{organization}/locations/{location}" or "projects/{project}/locations/{location}". */
  parent: string;
  /** The maximum number of notifications to return. The service may return fewer than this value. If unspecified or equal to 0, at most 50 notifications will be returned. The maximum value is 50; values above 50 will be coerced to 50. */
  pageSize?: number;
  /** A page token returned from a previous request. When paginating, all other parameters provided in the request must match the call that returned the page token. */
  pageToken?: string;
  /** Specifies which parts of the notification resource should be returned in the response. */
  view?: "NOTIFICATION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** ISO code for requested localization language. If unset, will be interpereted as "en". If the requested language is valid, but not supported for this notification, English will be returned with an "Not applicable" LocalizationState. If the ISO code is invalid (i.e. not a real language), this RPC will throw an error. */
  languageCode?: string;
}

export const ListProjectsLocationsNotificationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/notifications" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNotificationsRequest>;

export type ListProjectsLocationsNotificationsResponse = GoogleCloudAdvisorynotificationsV1ListNotificationsResponse;
export const ListProjectsLocationsNotificationsResponse = GoogleCloudAdvisorynotificationsV1ListNotificationsResponse;

export type ListProjectsLocationsNotificationsError = CommonErrors;

export const listProjectsLocationsNotifications = API.makePaginated(() => ({
  input: ListProjectsLocationsNotificationsRequest,
  output: ListProjectsLocationsNotificationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a notification. */
export interface GetProjectsLocationsNotificationsRequest {
  /** Required. A name of the notification to retrieve. Format: organizations/{organization}/locations/{location}/notifications/{notification} or projects/{projects}/locations/{location}/notifications/{notification}. */
  name: string;
  /** ISO code for requested localization language. If unset, will be interpereted as "en". If the requested language is valid, but not supported for this notification, English will be returned with an "Not applicable" LocalizationState. If the ISO code is invalid (i.e. not a real language), this RPC will throw an error. */
  languageCode?: string;
}

export const GetProjectsLocationsNotificationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/notifications/{notificationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNotificationsRequest>;

export type GetProjectsLocationsNotificationsResponse = GoogleCloudAdvisorynotificationsV1Notification;
export const GetProjectsLocationsNotificationsResponse = GoogleCloudAdvisorynotificationsV1Notification;

export type GetProjectsLocationsNotificationsError = CommonErrors;

export const getProjectsLocationsNotifications: API.OperationMethod<GetProjectsLocationsNotificationsRequest, GetProjectsLocationsNotificationsResponse, GetProjectsLocationsNotificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNotificationsRequest,
  output: GetProjectsLocationsNotificationsResponse,
  errors: [],
}));

