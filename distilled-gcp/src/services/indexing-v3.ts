// ==========================================================================
// Web Search Indexing API (indexing v3)
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
  name: "indexing",
  version: "v3",
  rootUrl: "https://indexing.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface UrlNotification {
  /** The object of this notification. The URL must be owned by the publisher of this notification and, in case of `URL_UPDATED` notifications, it _must_ be crawlable by Google. */
  url?: string;
  /** Creation timestamp for this notification. Users should _not_ specify it, the field is ignored at the request time. */
  notifyTime?: string;
  /** The URL life cycle event that Google is being notified about. */
  type?: "URL_NOTIFICATION_TYPE_UNSPECIFIED" | "URL_UPDATED" | "URL_DELETED" | (string & {});
}

export const UrlNotification: Schema.Schema<UrlNotification> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  notifyTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "UrlNotification" }) as any as Schema.Schema<UrlNotification>;

export interface UrlNotificationMetadata {
  /** URL to which this metadata refers. */
  url?: string;
  /** Latest notification received with type `URL_REMOVED`. */
  latestRemove?: UrlNotification;
  /** Latest notification received with type `URL_UPDATED`. */
  latestUpdate?: UrlNotification;
}

export const UrlNotificationMetadata: Schema.Schema<UrlNotificationMetadata> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  latestRemove: Schema.optional(UrlNotification),
  latestUpdate: Schema.optional(UrlNotification),
})).annotate({ identifier: "UrlNotificationMetadata" }) as any as Schema.Schema<UrlNotificationMetadata>;

export interface PublishUrlNotificationResponse {
  /** Description of the notification events received for this URL. */
  urlNotificationMetadata?: UrlNotificationMetadata;
}

export const PublishUrlNotificationResponse: Schema.Schema<PublishUrlNotificationResponse> = Schema.suspend(() => Schema.Struct({
  urlNotificationMetadata: Schema.optional(UrlNotificationMetadata),
})).annotate({ identifier: "PublishUrlNotificationResponse" }) as any as Schema.Schema<PublishUrlNotificationResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets metadata about a Web Document. This method can _only_ be used to query URLs that were previously seen in successful Indexing API notifications. Includes the latest `UrlNotification` received via this API. */
export interface GetMetadataUrlNotificationsRequest {
  /** URL that is being queried. */
  url?: string;
}

export const GetMetadataUrlNotificationsRequest = Schema.Struct({
  url: Schema.optional(Schema.String).pipe(T.HttpQuery("url")),
}).pipe(
  T.Http({ method: "GET", path: "v3/urlNotifications/metadata" }),
  svc,
) as unknown as Schema.Schema<GetMetadataUrlNotificationsRequest>;

export type GetMetadataUrlNotificationsResponse = UrlNotificationMetadata;
export const GetMetadataUrlNotificationsResponse = UrlNotificationMetadata;

export type GetMetadataUrlNotificationsError = CommonErrors;

export const getMetadataUrlNotifications: API.OperationMethod<GetMetadataUrlNotificationsRequest, GetMetadataUrlNotificationsResponse, GetMetadataUrlNotificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMetadataUrlNotificationsRequest,
  output: GetMetadataUrlNotificationsResponse,
  errors: [],
}));

/** Notifies that a URL has been updated or deleted. */
export interface PublishUrlNotificationsRequest {
  /** Request body */
  body?: UrlNotification;
}

export const PublishUrlNotificationsRequest = Schema.Struct({
  body: Schema.optional(UrlNotification).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/urlNotifications:publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishUrlNotificationsRequest>;

export type PublishUrlNotificationsResponse = PublishUrlNotificationResponse;
export const PublishUrlNotificationsResponse = PublishUrlNotificationResponse;

export type PublishUrlNotificationsError = CommonErrors;

export const publishUrlNotifications: API.OperationMethod<PublishUrlNotificationsRequest, PublishUrlNotificationsResponse, PublishUrlNotificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishUrlNotificationsRequest,
  output: PublishUrlNotificationsResponse,
  errors: [],
}));

