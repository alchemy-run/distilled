// ==========================================================================
// Firebase Cloud Messaging Data API (fcmdata v1beta1)
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
  name: "fcmdata",
  version: "v1beta1",
  rootUrl: "https://fcmdata.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleTypeDate {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleFirebaseFcmDataV1beta1MessageOutcomePercents {
  /** The percentage of all accepted messages that were successfully delivered to the device. */
  delivered?: number;
  /** The percentage of messages accepted on this day that were not dropped and not delivered, due to the device being disconnected (as of the end of the America/Los_Angeles day when the message was sent to FCM). A portion of these messages will be delivered the next day when the device connects but others may be destined to devices that ultimately never reconnect. */
  pending?: number;
  /** The percentage of accepted messages that were [collapsed](https://firebase.google.com/docs/cloud-messaging/concept-options#collapsible_and_non-collapsible_messages) by another message. */
  collapsed?: number;
  /** The percentage of accepted messages that were dropped due to [too many undelivered non-collapsible messages](https://firebase.google.com/docs/cloud-messaging/concept-options#collapsible_and_non-collapsible_messages). Specifically, each app instance can only have 100 pending messages stored on our servers for a device which is disconnected. When that device reconnects, those messages are delivered. When there are more than the maximum pending messages, we call [OnDeletedMessages()](https://firebase.google.com/docs/cloud-messaging/android/receive#override-ondeletedmessages) in our SDK instead of delivering the messages. */
  droppedTooManyPendingMessages?: number;
  /** The percentage of accepted messages that were dropped because the application was force stopped on the device at the time of delivery and retries were unsuccessful. */
  droppedAppForceStopped?: number;
  /** The percentage of accepted messages that were dropped because the target device is inactive. FCM will drop messages if the target device is deemed inactive by our servers. If a device does reconnect, we call [OnDeletedMessages()](https://firebase.google.com/docs/cloud-messaging/android/receive#override-ondeletedmessages) in our SDK instead of delivering the messages. */
  droppedDeviceInactive?: number;
  /** The percentage of accepted messages that expired because [Time To Live (TTL)](https://firebase.google.com/docs/cloud-messaging/concept-options#ttl) elapsed before the target device reconnected. */
  droppedTtlExpired?: number;
}

export const GoogleFirebaseFcmDataV1beta1MessageOutcomePercents: Schema.Schema<GoogleFirebaseFcmDataV1beta1MessageOutcomePercents> = Schema.suspend(() => Schema.Struct({
  delivered: Schema.optional(Schema.Number),
  pending: Schema.optional(Schema.Number),
  collapsed: Schema.optional(Schema.Number),
  droppedTooManyPendingMessages: Schema.optional(Schema.Number),
  droppedAppForceStopped: Schema.optional(Schema.Number),
  droppedDeviceInactive: Schema.optional(Schema.Number),
  droppedTtlExpired: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleFirebaseFcmDataV1beta1MessageOutcomePercents" }) as any as Schema.Schema<GoogleFirebaseFcmDataV1beta1MessageOutcomePercents>;

export interface GoogleFirebaseFcmDataV1beta1DeliveryPerformancePercents {
  /** The percentage of accepted messages that were delivered to the device without delay from the FCM system. */
  deliveredNoDelay?: number;
  /** The percentage of accepted messages that were delayed because the target device was not connected at the time of sending. These messages were eventually delivered when the device reconnected. */
  delayedDeviceOffline?: number;
  /** The percentage of accepted messages that were delayed because the device was in doze mode. Only [normal priority messages](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message) should be delayed due to doze mode. */
  delayedDeviceDoze?: number;
  /** The percentage of accepted messages that were delayed due to message throttling, such as [collapsible message throttling](https://firebase.google.com/docs/cloud-messaging/concept-options#collapsible_throttling) or [maximum message rate throttling](https://firebase.google.com/docs/cloud-messaging/concept-options#device_throttling). */
  delayedMessageThrottled?: number;
  /** The percentage of accepted messages that were delayed because the intended device user-profile was [stopped](https://firebase.google.com/docs/cloud-messaging/android/receive#handling_messages) on the target device at the time of the send. The messages were eventually delivered when the user-profile was started again. */
  delayedUserStopped?: number;
}

export const GoogleFirebaseFcmDataV1beta1DeliveryPerformancePercents: Schema.Schema<GoogleFirebaseFcmDataV1beta1DeliveryPerformancePercents> = Schema.suspend(() => Schema.Struct({
  deliveredNoDelay: Schema.optional(Schema.Number),
  delayedDeviceOffline: Schema.optional(Schema.Number),
  delayedDeviceDoze: Schema.optional(Schema.Number),
  delayedMessageThrottled: Schema.optional(Schema.Number),
  delayedUserStopped: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleFirebaseFcmDataV1beta1DeliveryPerformancePercents" }) as any as Schema.Schema<GoogleFirebaseFcmDataV1beta1DeliveryPerformancePercents>;

export interface GoogleFirebaseFcmDataV1beta1MessageInsightPercents {
  /** The percentage of accepted messages that had their priority lowered from high to normal. See [documentation for setting message priority](https://firebase.google.com/docs/cloud-messaging/android/message-priority). */
  priorityLowered?: number;
}

export const GoogleFirebaseFcmDataV1beta1MessageInsightPercents: Schema.Schema<GoogleFirebaseFcmDataV1beta1MessageInsightPercents> = Schema.suspend(() => Schema.Struct({
  priorityLowered: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleFirebaseFcmDataV1beta1MessageInsightPercents" }) as any as Schema.Schema<GoogleFirebaseFcmDataV1beta1MessageInsightPercents>;

export interface GoogleFirebaseFcmDataV1beta1ProxyNotificationInsightPercents {
  /** The percentage of accepted notifications that were successfully proxied by [Google Play services](https://developers.google.com/android/guides/overview). */
  proxied?: number;
  /** The percentage of accepted notifications that failed to be proxied. This is usually caused by exceptions that occurred while calling [notifyAsPackage](https://developer.android.com/reference/android/app/NotificationManager#notifyAsPackage%28java.lang.String,%20java.lang.String,%20int,%20android.app.Notification%29). */
  failed?: number;
  /** The percentage of accepted notifications that were skipped because proxy notification is unsupported for the recipient. */
  skippedUnsupported?: number;
  /** The percentage of accepted notifications that were skipped because the messages were not throttled. */
  skippedNotThrottled?: number;
  /** The percentage of accepted notifications that were skipped because configurations required for notifications to be proxied were missing. */
  skippedUnconfigured?: number;
  /** The percentage of accepted notifications that were skipped because the app disallowed these messages to be proxied. */
  skippedOptedOut?: number;
}

export const GoogleFirebaseFcmDataV1beta1ProxyNotificationInsightPercents: Schema.Schema<GoogleFirebaseFcmDataV1beta1ProxyNotificationInsightPercents> = Schema.suspend(() => Schema.Struct({
  proxied: Schema.optional(Schema.Number),
  failed: Schema.optional(Schema.Number),
  skippedUnsupported: Schema.optional(Schema.Number),
  skippedNotThrottled: Schema.optional(Schema.Number),
  skippedUnconfigured: Schema.optional(Schema.Number),
  skippedOptedOut: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleFirebaseFcmDataV1beta1ProxyNotificationInsightPercents" }) as any as Schema.Schema<GoogleFirebaseFcmDataV1beta1ProxyNotificationInsightPercents>;

export interface GoogleFirebaseFcmDataV1beta1Data {
  /** Count of messages accepted by FCM intended for Android devices. The targeted device must have opted in to the collection of usage and diagnostic information. */
  countMessagesAccepted?: string;
  /** Count of notifications accepted by FCM intended for Android devices. The targeted device must have opted in to the collection of usage and diagnostic information. */
  countNotificationsAccepted?: string;
  /** Mutually exclusive breakdown of message delivery outcomes. */
  messageOutcomePercents?: GoogleFirebaseFcmDataV1beta1MessageOutcomePercents;
  /** Additional information about delivery performance for messages that were successfully delivered. */
  deliveryPerformancePercents?: GoogleFirebaseFcmDataV1beta1DeliveryPerformancePercents;
  /** Additional general insights about message delivery. */
  messageInsightPercents?: GoogleFirebaseFcmDataV1beta1MessageInsightPercents;
  /** Additional insights about proxy notification delivery. */
  proxyNotificationInsightPercents?: GoogleFirebaseFcmDataV1beta1ProxyNotificationInsightPercents;
}

export const GoogleFirebaseFcmDataV1beta1Data: Schema.Schema<GoogleFirebaseFcmDataV1beta1Data> = Schema.suspend(() => Schema.Struct({
  countMessagesAccepted: Schema.optional(Schema.String),
  countNotificationsAccepted: Schema.optional(Schema.String),
  messageOutcomePercents: Schema.optional(GoogleFirebaseFcmDataV1beta1MessageOutcomePercents),
  deliveryPerformancePercents: Schema.optional(GoogleFirebaseFcmDataV1beta1DeliveryPerformancePercents),
  messageInsightPercents: Schema.optional(GoogleFirebaseFcmDataV1beta1MessageInsightPercents),
  proxyNotificationInsightPercents: Schema.optional(GoogleFirebaseFcmDataV1beta1ProxyNotificationInsightPercents),
})).annotate({ identifier: "GoogleFirebaseFcmDataV1beta1Data" }) as any as Schema.Schema<GoogleFirebaseFcmDataV1beta1Data>;

export interface GoogleFirebaseFcmDataV1beta1AndroidDeliveryData {
  /** The app ID to which the messages were sent. */
  appId?: string;
  /** The date represented by this entry. */
  date?: GoogleTypeDate;
  /** The analytics label associated with the messages sent. All messages sent without an analytics label will be grouped together in a single entry. */
  analyticsLabel?: string;
  /** The data for the specified appId, date, and analyticsLabel. */
  data?: GoogleFirebaseFcmDataV1beta1Data;
}

export const GoogleFirebaseFcmDataV1beta1AndroidDeliveryData: Schema.Schema<GoogleFirebaseFcmDataV1beta1AndroidDeliveryData> = Schema.suspend(() => Schema.Struct({
  appId: Schema.optional(Schema.String),
  date: Schema.optional(GoogleTypeDate),
  analyticsLabel: Schema.optional(Schema.String),
  data: Schema.optional(GoogleFirebaseFcmDataV1beta1Data),
})).annotate({ identifier: "GoogleFirebaseFcmDataV1beta1AndroidDeliveryData" }) as any as Schema.Schema<GoogleFirebaseFcmDataV1beta1AndroidDeliveryData>;

export interface GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse {
  /** The delivery data for the provided app. There will be one entry per combination of app, date, and analytics label. */
  androidDeliveryData?: Array<GoogleFirebaseFcmDataV1beta1AndroidDeliveryData>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse: Schema.Schema<GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse> = Schema.suspend(() => Schema.Struct({
  androidDeliveryData: Schema.optional(Schema.Array(GoogleFirebaseFcmDataV1beta1AndroidDeliveryData)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse" }) as any as Schema.Schema<GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** List aggregate delivery data for the given Android application. */
export interface ListProjectsAndroidAppsDeliveryDataRequest {
  /** Required. The application for which to list delivery data. Format: `projects/{project_id}/androidApps/{app_id}` */
  parent: string;
  /** The maximum number of entries to return. The service may return fewer than this value. If unspecified, at most 1,000 entries will be returned. The maximum value is 10,000; values above 10,000 will be capped to 10,000. This default may change over time. */
  pageSize?: number;
  /** A page token, received from a previous `ListAndroidDeliveryDataRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAndroidDeliveryDataRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsAndroidAppsDeliveryDataRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/androidApps/{androidAppsId}/deliveryData" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAndroidAppsDeliveryDataRequest>;

export type ListProjectsAndroidAppsDeliveryDataResponse = GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse;
export const ListProjectsAndroidAppsDeliveryDataResponse = GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse;

export type ListProjectsAndroidAppsDeliveryDataError = CommonErrors;

export const listProjectsAndroidAppsDeliveryData = API.makePaginated(() => ({
  input: ListProjectsAndroidAppsDeliveryDataRequest,
  output: ListProjectsAndroidAppsDeliveryDataResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

