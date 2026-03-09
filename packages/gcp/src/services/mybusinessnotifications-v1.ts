// ==========================================================================
// My Business Notifications API (mybusinessnotifications v1)
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
  name: "mybusinessnotifications",
  version: "v1",
  rootUrl: "https://mybusinessnotifications.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface NotificationSetting {
  /** Optional. The Google Pub/Sub topic that will receive notifications when locations managed by this account are updated. If unset, no notifications will be posted. The account mybusiness-api-pubsub@system.gserviceaccount.com must have at least Publish permissions on the Pub/Sub topic. */
  pubsubTopic?: string;
  /** Required. The resource name this setting is for. This is of the form `accounts/{account_id}/notificationSetting`. */
  name?: string;
  /** The types of notifications that will be sent to the Pub/Sub topic. To stop receiving notifications entirely, use NotificationSettings.UpdateNotificationSetting with an empty notification_types or set the pubsub_topic to an empty string. */
  notificationTypes?: Array<
    | "NOTIFICATION_TYPE_UNSPECIFIED"
    | "GOOGLE_UPDATE"
    | "NEW_REVIEW"
    | "UPDATED_REVIEW"
    | "NEW_CUSTOMER_MEDIA"
    | "NEW_QUESTION"
    | "UPDATED_QUESTION"
    | "NEW_ANSWER"
    | "UPDATED_ANSWER"
    | "DUPLICATE_LOCATION"
    | "LOSS_OF_VOICE_OF_MERCHANT"
    | "VOICE_OF_MERCHANT_UPDATED"
    | (string & {})
  >;
}

export const NotificationSetting: Schema.Schema<NotificationSetting> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pubsubTopic: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      notificationTypes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "NotificationSetting",
  }) as any as Schema.Schema<NotificationSetting>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetNotificationSettingAccountsRequest {
  /** Required. The resource name of the notification setting we are trying to fetch. */
  name: string;
}

export const GetNotificationSettingAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/accounts/{accountsId}/notificationSetting",
    }),
    svc,
  ) as unknown as Schema.Schema<GetNotificationSettingAccountsRequest>;

export type GetNotificationSettingAccountsResponse = NotificationSetting;
export const GetNotificationSettingAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ NotificationSetting;

export type GetNotificationSettingAccountsError = DefaultErrors;

/** Returns the pubsub notification settings for the account. */
export const getNotificationSettingAccounts: API.OperationMethod<
  GetNotificationSettingAccountsRequest,
  GetNotificationSettingAccountsResponse,
  GetNotificationSettingAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNotificationSettingAccountsRequest,
  output: GetNotificationSettingAccountsResponse,
  errors: [],
}));

export interface UpdateNotificationSettingAccountsRequest {
  /** Required. The resource name this setting is for. This is of the form `accounts/{account_id}/notificationSetting`. */
  name: string;
  /** Required. The specific fields that should be updated. The only editable field is notification_setting. */
  updateMask?: string;
  /** Request body */
  body?: NotificationSetting;
}

export const UpdateNotificationSettingAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(NotificationSetting).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/accounts/{accountsId}/notificationSetting",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateNotificationSettingAccountsRequest>;

export type UpdateNotificationSettingAccountsResponse = NotificationSetting;
export const UpdateNotificationSettingAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ NotificationSetting;

export type UpdateNotificationSettingAccountsError = DefaultErrors;

/** Sets the pubsub notification setting for the account informing Google which topic to send pubsub notifications for. Use the notification_types field within notification_setting to manipulate the events an account wants to subscribe to. An account will only have one notification setting resource, and only one pubsub topic can be set. To delete the setting, update with an empty notification_types */
export const updateNotificationSettingAccounts: API.OperationMethod<
  UpdateNotificationSettingAccountsRequest,
  UpdateNotificationSettingAccountsResponse,
  UpdateNotificationSettingAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateNotificationSettingAccountsRequest,
  output: UpdateNotificationSettingAccountsResponse,
  errors: [],
}));
