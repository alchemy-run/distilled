// ==========================================================================
// Merchant API (merchantapi notifications_v1beta)
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
  name: "merchantapi",
  version: "notifications_v1beta",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ProductChange {
  /** Countries that have the change (if applicable). Represented in the ISO 3166 format. */
  regionCode?: string;
  /** Reporting contexts that have the change (if applicable). Currently this field supports only (`SHOPPING_ADS`, `LOCAL_INVENTORY_ADS`, `YOUTUBE_SHOPPING`, `YOUTUBE_CHECKOUT`, `YOUTUBE_AFFILIATE`) from the enum value [ReportingContextEnum](/merchant/api/reference/rest/Shared.Types/ReportingContextEnum) */
  reportingContext?:
    | "REPORTING_CONTEXT_ENUM_UNSPECIFIED"
    | "SHOPPING_ADS"
    | "DISCOVERY_ADS"
    | "DEMAND_GEN_ADS"
    | "DEMAND_GEN_ADS_DISCOVER_SURFACE"
    | "VIDEO_ADS"
    | "DISPLAY_ADS"
    | "LOCAL_INVENTORY_ADS"
    | "VEHICLE_INVENTORY_ADS"
    | "FREE_LISTINGS"
    | "FREE_LISTINGS_UCP_CHECKOUT"
    | "FREE_LOCAL_LISTINGS"
    | "FREE_LOCAL_VEHICLE_LISTINGS"
    | "YOUTUBE_AFFILIATE"
    | "YOUTUBE_SHOPPING"
    | "CLOUD_RETAIL"
    | "LOCAL_CLOUD_RETAIL"
    | "PRODUCT_REVIEWS"
    | "MERCHANT_REVIEWS"
    | "YOUTUBE_CHECKOUT"
    | (string & {});
  /** The old value of the changed resource or attribute. If empty, it means that the product was created. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  oldValue?: string;
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() =>
  Schema.Struct({
    regionCode: Schema.optional(Schema.String),
    reportingContext: Schema.optional(Schema.String),
    oldValue: Schema.optional(Schema.String),
    newValue: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ProductChange",
}) as any as Schema.Schema<ProductChange>;

export interface ProductStatusChangeMessage {
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** The product id. */
  resourceId?: string;
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> =
  Schema.suspend(() =>
    Schema.Struct({
      eventTime: Schema.optional(Schema.String),
      changes: Schema.optional(Schema.Array(ProductChange)),
      expirationTime: Schema.optional(Schema.String),
      resourceType: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      resourceId: Schema.optional(Schema.String),
      account: Schema.optional(Schema.String),
      managingAccount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStatusChangeMessage",
  }) as any as Schema.Schema<ProductStatusChangeMessage>;

export interface NotificationSubscription {
  /** The `name` of the account you want to receive notifications for. Format: `accounts/{account}` */
  targetAccount?: string;
  /** If this value is true, the requesting account is notified of the specified event for all managed accounts (can be subaccounts or other linked accounts) including newly added accounts on a daily basis. */
  allManagedAccounts?: boolean;
  /** The event that the merchant wants to be notified about. */
  registeredEvent?:
    | "NOTIFICATION_EVENT_TYPE_UNSPECIFIED"
    | "PRODUCT_STATUS_CHANGE"
    | (string & {});
  /** Output only. The `name` of the notification configuration. Generated by the Content API upon creation of a new `NotificationSubscription`. The `account` represents the merchant ID of the merchant that owns the configuration. Format: `accounts/{account}/notificationsubscriptions/{notification_subscription}` */
  name?: string;
  /** URL to be used to push the notification to the merchant. */
  callBackUri?: string;
}

export const NotificationSubscription: Schema.Schema<NotificationSubscription> =
  Schema.suspend(() =>
    Schema.Struct({
      targetAccount: Schema.optional(Schema.String),
      allManagedAccounts: Schema.optional(Schema.Boolean),
      registeredEvent: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      callBackUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NotificationSubscription",
  }) as any as Schema.Schema<NotificationSubscription>;

export interface ListNotificationSubscriptionsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of notification subscriptions requested by the merchant. */
  notificationSubscriptions?: Array<NotificationSubscription>;
}

export const ListNotificationSubscriptionsResponse: Schema.Schema<ListNotificationSubscriptionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      notificationSubscriptions: Schema.optional(
        Schema.Array(NotificationSubscription),
      ),
    }),
  ).annotate({
    identifier: "ListNotificationSubscriptionsResponse",
  }) as any as Schema.Schema<ListNotificationSubscriptionsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetAccountsNotificationsubscriptionsRequest {
  /** Required. The `name` of the notification subscription. */
  name: string;
}

export const GetAccountsNotificationsubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "notifications/v1beta/accounts/{accountsId}/notificationsubscriptions/{notificationsubscriptionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsNotificationsubscriptionsRequest>;

export type GetAccountsNotificationsubscriptionsResponse =
  NotificationSubscription;
export const GetAccountsNotificationsubscriptionsResponse =
  NotificationSubscription;

export type GetAccountsNotificationsubscriptionsError = DefaultErrors;

/** Gets notification subscriptions for an account. */
export const getAccountsNotificationsubscriptions: API.OperationMethod<
  GetAccountsNotificationsubscriptionsRequest,
  GetAccountsNotificationsubscriptionsResponse,
  GetAccountsNotificationsubscriptionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsNotificationsubscriptionsRequest,
  output: GetAccountsNotificationsubscriptionsResponse,
  errors: [],
}));

export interface PatchAccountsNotificationsubscriptionsRequest {
  /** Output only. The `name` of the notification configuration. Generated by the Content API upon creation of a new `NotificationSubscription`. The `account` represents the merchant ID of the merchant that owns the configuration. Format: `accounts/{account}/notificationsubscriptions/{notification_subscription}` */
  name: string;
  /** List of fields being updated. */
  updateMask?: string;
  /** Request body */
  body?: NotificationSubscription;
}

export const PatchAccountsNotificationsubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(NotificationSubscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "notifications/v1beta/accounts/{accountsId}/notificationsubscriptions/{notificationsubscriptionsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsNotificationsubscriptionsRequest>;

export type PatchAccountsNotificationsubscriptionsResponse =
  NotificationSubscription;
export const PatchAccountsNotificationsubscriptionsResponse =
  NotificationSubscription;

export type PatchAccountsNotificationsubscriptionsError = DefaultErrors;

/** Updates an existing notification subscription for a merchant. */
export const patchAccountsNotificationsubscriptions: API.OperationMethod<
  PatchAccountsNotificationsubscriptionsRequest,
  PatchAccountsNotificationsubscriptionsResponse,
  PatchAccountsNotificationsubscriptionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsNotificationsubscriptionsRequest,
  output: PatchAccountsNotificationsubscriptionsResponse,
  errors: [],
}));

export interface DeleteAccountsNotificationsubscriptionsRequest {
  /** Required. The name of the notification subscription to be deleted. */
  name: string;
}

export const DeleteAccountsNotificationsubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "notifications/v1beta/accounts/{accountsId}/notificationsubscriptions/{notificationsubscriptionsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsNotificationsubscriptionsRequest>;

export type DeleteAccountsNotificationsubscriptionsResponse = Empty;
export const DeleteAccountsNotificationsubscriptionsResponse = Empty;

export type DeleteAccountsNotificationsubscriptionsError = DefaultErrors;

/** Deletes a notification subscription for a merchant. */
export const deleteAccountsNotificationsubscriptions: API.OperationMethod<
  DeleteAccountsNotificationsubscriptionsRequest,
  DeleteAccountsNotificationsubscriptionsResponse,
  DeleteAccountsNotificationsubscriptionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsNotificationsubscriptionsRequest,
  output: DeleteAccountsNotificationsubscriptionsResponse,
  errors: [],
}));

export interface CreateAccountsNotificationsubscriptionsRequest {
  /** Required. The merchant account that owns the new notification subscription. Format: `accounts/{account}` */
  parent: string;
  /** Request body */
  body?: NotificationSubscription;
}

export const CreateAccountsNotificationsubscriptionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(NotificationSubscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "notifications/v1beta/accounts/{accountsId}/notificationsubscriptions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsNotificationsubscriptionsRequest>;

export type CreateAccountsNotificationsubscriptionsResponse =
  NotificationSubscription;
export const CreateAccountsNotificationsubscriptionsResponse =
  NotificationSubscription;

export type CreateAccountsNotificationsubscriptionsError = DefaultErrors;

/** Creates a notification subscription for a business. For standalone or subaccounts accounts, the business can create a subscription for self. For MCAs, the business can create a subscription for all managed accounts or for a specific subaccount. See [Decode notifications](/merchant/api/guides/accounts/notifications#decode_notifications) for information on how to decode the notification payload and how to interpret its contents. We will allow the following types of notification subscriptions to exist together (per business as a subscriber per event type): 1. Subscription for all managed accounts + subscription for self. 2. Multiple "partial" subscriptions for managed accounts + subscription for self. we will not allow (per business as a subscriber per event type): 1. Multiple self subscriptions. 2. Multiple "all managed accounts" subscriptions. 3. "All managed accounts" subscription and partial subscriptions at the same time. 4. Multiple partial subscriptions for the same target account. */
export const createAccountsNotificationsubscriptions: API.OperationMethod<
  CreateAccountsNotificationsubscriptionsRequest,
  CreateAccountsNotificationsubscriptionsResponse,
  CreateAccountsNotificationsubscriptionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsNotificationsubscriptionsRequest,
  output: CreateAccountsNotificationsubscriptionsResponse,
  errors: [],
}));

export interface ListAccountsNotificationsubscriptionsRequest {
  /** The maximum number of notification subscriptions to return in a page. The default value for `page_size` is 100. The maximum value is `200`. Values above `200` will be coerced to `200`. */
  pageSize?: number;
  /** Required. The merchant account who owns the notification subscriptions. Format: `accounts/{account}` */
  parent: string;
  /** Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsNotificationsubscriptionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "notifications/v1beta/accounts/{accountsId}/notificationsubscriptions",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsNotificationsubscriptionsRequest>;

export type ListAccountsNotificationsubscriptionsResponse =
  ListNotificationSubscriptionsResponse;
export const ListAccountsNotificationsubscriptionsResponse =
  ListNotificationSubscriptionsResponse;

export type ListAccountsNotificationsubscriptionsError = DefaultErrors;

/** Gets all the notification subscriptions for a merchant. */
export const listAccountsNotificationsubscriptions: API.PaginatedOperationMethod<
  ListAccountsNotificationsubscriptionsRequest,
  ListAccountsNotificationsubscriptionsResponse,
  ListAccountsNotificationsubscriptionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsNotificationsubscriptionsRequest,
  output: ListAccountsNotificationsubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
