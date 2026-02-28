// ==========================================================================
// Cloud Billing Budget API (billingbudgets v1)
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
  name: "billingbudgets",
  version: "v1",
  rootUrl: "https://billingbudgets.googleapis.com/",
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

export interface GoogleCloudBillingBudgetsV1CustomPeriod {
  /** Required. The start date must be after January 1, 2017. */
  startDate?: GoogleTypeDate;
  /** Optional. The end date of the time period. Budgets with elapsed end date won't be processed. If unset, specifies to track all usage incurred since the start_date. */
  endDate?: GoogleTypeDate;
}

export const GoogleCloudBillingBudgetsV1CustomPeriod: Schema.Schema<GoogleCloudBillingBudgetsV1CustomPeriod> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(GoogleTypeDate),
  endDate: Schema.optional(GoogleTypeDate),
})).annotate({ identifier: "GoogleCloudBillingBudgetsV1CustomPeriod" }) as any as Schema.Schema<GoogleCloudBillingBudgetsV1CustomPeriod>;

export interface GoogleCloudBillingBudgetsV1Filter {
  /** Optional. A set of projects of the form `projects/{project}`, specifying that usage from only this set of projects should be included in the budget. If omitted, the report includes all usage for the billing account, regardless of which project the usage occurred on. */
  projects?: Array<string>;
  /** Optional. A set of folder and organization names of the form `folders/{folderId}` or `organizations/{organizationId}`, specifying that usage from only this set of folders and organizations should be included in the budget. If omitted, the budget includes all usage that the billing account pays for. If the folder or organization contains projects that are paid for by a different Cloud Billing account, the budget *doesn't* apply to those projects. */
  resourceAncestors?: Array<string>;
  /** Optional. If Filter.credit_types_treatment is INCLUDE_SPECIFIED_CREDITS, this is a list of credit types to be subtracted from gross cost to determine the spend for threshold calculations. See [a list of acceptable credit type values](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables#credits-type). If Filter.credit_types_treatment is **not** INCLUDE_SPECIFIED_CREDITS, this field must be empty. */
  creditTypes?: Array<string>;
  /** Optional. If not set, default behavior is `INCLUDE_ALL_CREDITS`. */
  creditTypesTreatment?: "CREDIT_TYPES_TREATMENT_UNSPECIFIED" | "INCLUDE_ALL_CREDITS" | "EXCLUDE_ALL_CREDITS" | "INCLUDE_SPECIFIED_CREDITS" | (string & {});
  /** Optional. A set of services of the form `services/{service_id}`, specifying that usage from only this set of services should be included in the budget. If omitted, the report includes usage for all the services. The service names are available through the Catalog API: https://cloud.google.com/billing/v1/how-tos/catalog-api. */
  services?: Array<string>;
  /** Optional. A set of subaccounts of the form `billingAccounts/{account_id}`, specifying that usage from only this set of subaccounts should be included in the budget. If a subaccount is set to the name of the parent account, usage from the parent account is included. If the field is omitted, the report includes usage from the parent account and all subaccounts, if they exist. */
  subaccounts?: Array<string>;
  /** Optional. A single label and value pair specifying that usage from only this set of labeled resources should be included in the budget. If omitted, the report includes all labeled and unlabeled usage. An object containing a single `"key": value` pair. Example: `{ "name": "wrench" }`. _Currently, multiple entries or multiple values per entry are not allowed._ */
  labels?: Record<string, Array<unknown>>;
  /** Optional. Specifies to track usage for recurring calendar period. For example, assume that CalendarPeriod.QUARTER is set. The budget tracks usage from April 1 to June 30, when the current calendar month is April, May, June. After that, it tracks usage from July 1 to September 30 when the current calendar month is July, August, September, so on. */
  calendarPeriod?: "CALENDAR_PERIOD_UNSPECIFIED" | "MONTH" | "QUARTER" | "YEAR" | (string & {});
  /** Optional. Specifies to track usage from any start date (required) to any end date (optional). This time period is static, it does not recur. */
  customPeriod?: GoogleCloudBillingBudgetsV1CustomPeriod;
}

export const GoogleCloudBillingBudgetsV1Filter: Schema.Schema<GoogleCloudBillingBudgetsV1Filter> = Schema.suspend(() => Schema.Struct({
  projects: Schema.optional(Schema.Array(Schema.String)),
  resourceAncestors: Schema.optional(Schema.Array(Schema.String)),
  creditTypes: Schema.optional(Schema.Array(Schema.String)),
  creditTypesTreatment: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(Schema.String)),
  subaccounts: Schema.optional(Schema.Array(Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.Array(Schema.Unknown))),
  calendarPeriod: Schema.optional(Schema.String),
  customPeriod: Schema.optional(GoogleCloudBillingBudgetsV1CustomPeriod),
})).annotate({ identifier: "GoogleCloudBillingBudgetsV1Filter" }) as any as Schema.Schema<GoogleCloudBillingBudgetsV1Filter>;

export interface GoogleTypeMoney {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const GoogleTypeMoney: Schema.Schema<GoogleTypeMoney> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeMoney" }) as any as Schema.Schema<GoogleTypeMoney>;

export interface GoogleCloudBillingBudgetsV1LastPeriodAmount {
}

export const GoogleCloudBillingBudgetsV1LastPeriodAmount: Schema.Schema<GoogleCloudBillingBudgetsV1LastPeriodAmount> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudBillingBudgetsV1LastPeriodAmount" }) as any as Schema.Schema<GoogleCloudBillingBudgetsV1LastPeriodAmount>;

export interface GoogleCloudBillingBudgetsV1BudgetAmount {
  /** A specified amount to use as the budget. `currency_code` is optional. If specified when creating a budget, it must match the currency of the billing account. If specified when updating a budget, it must match the currency_code of the existing budget. The `currency_code` is provided on output. */
  specifiedAmount?: GoogleTypeMoney;
  /** Use the last period's actual spend as the budget for the present period. LastPeriodAmount can only be set when the budget's time period is a Filter.calendar_period. It cannot be set in combination with Filter.custom_period. */
  lastPeriodAmount?: GoogleCloudBillingBudgetsV1LastPeriodAmount;
}

export const GoogleCloudBillingBudgetsV1BudgetAmount: Schema.Schema<GoogleCloudBillingBudgetsV1BudgetAmount> = Schema.suspend(() => Schema.Struct({
  specifiedAmount: Schema.optional(GoogleTypeMoney),
  lastPeriodAmount: Schema.optional(GoogleCloudBillingBudgetsV1LastPeriodAmount),
})).annotate({ identifier: "GoogleCloudBillingBudgetsV1BudgetAmount" }) as any as Schema.Schema<GoogleCloudBillingBudgetsV1BudgetAmount>;

export interface GoogleCloudBillingBudgetsV1ThresholdRule {
  /** Required. Send an alert when this threshold is exceeded. This is a 1.0-based percentage, so 0.5 = 50%. Validation: non-negative number. */
  thresholdPercent?: number;
  /** Optional. The type of basis used to determine if spend has passed the threshold. Behavior defaults to CURRENT_SPEND if not set. */
  spendBasis?: "BASIS_UNSPECIFIED" | "CURRENT_SPEND" | "FORECASTED_SPEND" | (string & {});
}

export const GoogleCloudBillingBudgetsV1ThresholdRule: Schema.Schema<GoogleCloudBillingBudgetsV1ThresholdRule> = Schema.suspend(() => Schema.Struct({
  thresholdPercent: Schema.optional(Schema.Number),
  spendBasis: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBillingBudgetsV1ThresholdRule" }) as any as Schema.Schema<GoogleCloudBillingBudgetsV1ThresholdRule>;

export interface GoogleCloudBillingBudgetsV1NotificationsRule {
  /** Optional. The name of the Pub/Sub topic where budget-related messages are published, in the form `projects/{project_id}/topics/{topic_id}`. Updates are sent to the topic at regular intervals; the timing of the updates is not dependent on the [threshold rules](#thresholdrule) you've set. Note that if you want your [Pub/Sub JSON object](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification_format) to contain data for `alertThresholdExceeded`, you need at least one [alert threshold rule](#thresholdrule). When you set threshold rules, you must also enable at least one of the email notification options, either using the default IAM recipients or Cloud Monitoring email notification channels. To use Pub/Sub topics with budgets, you must do the following: 1. Create the Pub/Sub topic before connecting it to your budget. For guidance, see [Manage programmatic budget alert notifications](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications). 2. Grant the API caller the `pubsub.topics.setIamPolicy` permission on the Pub/Sub topic. If not set, the API call fails with PERMISSION_DENIED. For additional details on Pub/Sub roles and permissions, see [Permissions required for this task](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#permissions_required_for_this_task). */
  pubsubTopic?: string;
  /** Optional. Required when NotificationsRule.pubsub_topic is set. The schema version of the notification sent to NotificationsRule.pubsub_topic. Only "1.0" is accepted. It represents the JSON schema as defined in https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification_format. */
  schemaVersion?: string;
  /** Optional. Email targets to send notifications to when a threshold is exceeded. This is in addition to the `DefaultIamRecipients` who receive alert emails based on their billing account IAM role. The value is the full REST resource name of a Cloud Monitoring email notification channel with the form `projects/{project_id}/notificationChannels/{channel_id}`. A maximum of 5 email notifications are allowed. To customize budget alert email recipients with monitoring notification channels, you _must create the monitoring notification channels before you link them to a budget_. For guidance on setting up notification channels to use with budgets, see [Customize budget alert email recipients](https://cloud.google.com/billing/docs/how-to/budgets-notification-recipients). For Cloud Billing budget alerts, you _must use email notification channels_. The other types of notification channels are _not_ supported, such as Slack, SMS, or PagerDuty. If you want to [send budget notifications to Slack](https://cloud.google.com/billing/docs/how-to/notify#send_notifications_to_slack), use a pubsubTopic and configure [programmatic notifications](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications). */
  monitoringNotificationChannels?: Array<string>;
  /** Optional. When set to true, disables default notifications sent when a threshold is exceeded. Default notifications are sent to those with Billing Account Administrator and Billing Account User IAM roles for the target account. */
  disableDefaultIamRecipients?: boolean;
  /** Optional. When set to true, and when the budget has a single project configured, notifications will be sent to project level recipients of that project. This field will be ignored if the budget has multiple or no project configured. Currently, project level recipients are the users with `Owner` role on a cloud project. */
  enableProjectLevelRecipients?: boolean;
}

export const GoogleCloudBillingBudgetsV1NotificationsRule: Schema.Schema<GoogleCloudBillingBudgetsV1NotificationsRule> = Schema.suspend(() => Schema.Struct({
  pubsubTopic: Schema.optional(Schema.String),
  schemaVersion: Schema.optional(Schema.String),
  monitoringNotificationChannels: Schema.optional(Schema.Array(Schema.String)),
  disableDefaultIamRecipients: Schema.optional(Schema.Boolean),
  enableProjectLevelRecipients: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudBillingBudgetsV1NotificationsRule" }) as any as Schema.Schema<GoogleCloudBillingBudgetsV1NotificationsRule>;

export interface GoogleCloudBillingBudgetsV1Budget {
  /** Output only. Resource name of the budget. The resource name implies the scope of a budget. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`. */
  name?: string;
  /** User data for display name in UI. The name must be less than or equal to 60 characters. */
  displayName?: string;
  /** Optional. Filters that define which resources are used to compute the actual spend against the budget amount, such as projects, services, and the budget's time period, as well as other filters. */
  budgetFilter?: GoogleCloudBillingBudgetsV1Filter;
  /** Required. Budgeted amount. */
  amount?: GoogleCloudBillingBudgetsV1BudgetAmount;
  /** Optional. Rules that trigger alerts (notifications of thresholds being crossed) when spend exceeds the specified percentages of the budget. Optional for `pubsubTopic` notifications. Required if using email notifications. */
  thresholdRules?: Array<GoogleCloudBillingBudgetsV1ThresholdRule>;
  /** Optional. Rules to apply to notifications sent based on budget spend and thresholds. */
  notificationsRule?: GoogleCloudBillingBudgetsV1NotificationsRule;
  /** Optional. Etag to validate that the object is unchanged for a read-modify-write operation. An empty etag causes an update to overwrite other changes. */
  etag?: string;
  ownershipScope?: "OWNERSHIP_SCOPE_UNSPECIFIED" | "ALL_USERS" | "BILLING_ACCOUNT" | (string & {});
}

export const GoogleCloudBillingBudgetsV1Budget: Schema.Schema<GoogleCloudBillingBudgetsV1Budget> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  budgetFilter: Schema.optional(GoogleCloudBillingBudgetsV1Filter),
  amount: Schema.optional(GoogleCloudBillingBudgetsV1BudgetAmount),
  thresholdRules: Schema.optional(Schema.Array(GoogleCloudBillingBudgetsV1ThresholdRule)),
  notificationsRule: Schema.optional(GoogleCloudBillingBudgetsV1NotificationsRule),
  etag: Schema.optional(Schema.String),
  ownershipScope: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBillingBudgetsV1Budget" }) as any as Schema.Schema<GoogleCloudBillingBudgetsV1Budget>;

export interface GoogleCloudBillingBudgetsV1ListBudgetsResponse {
  /** List of the budgets owned by the requested billing account. */
  budgets?: Array<GoogleCloudBillingBudgetsV1Budget>;
  /** If not empty, indicates that there may be more budgets that match the request; this value should be passed in a new `ListBudgetsRequest`. */
  nextPageToken?: string;
}

export const GoogleCloudBillingBudgetsV1ListBudgetsResponse: Schema.Schema<GoogleCloudBillingBudgetsV1ListBudgetsResponse> = Schema.suspend(() => Schema.Struct({
  budgets: Schema.optional(Schema.Array(GoogleCloudBillingBudgetsV1Budget)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBillingBudgetsV1ListBudgetsResponse" }) as any as Schema.Schema<GoogleCloudBillingBudgetsV1ListBudgetsResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a new budget. See [Quotas and limits](https://cloud.google.com/billing/quotas) for more information on the limits of the number of budgets you can create. */
export interface CreateBillingAccountsBudgetsRequest {
  /** Required. The name of the billing account to create the budget in. Values are of the form `billingAccounts/{billingAccountId}`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudBillingBudgetsV1Budget;
}

export const CreateBillingAccountsBudgetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudBillingBudgetsV1Budget).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}/budgets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBillingAccountsBudgetsRequest>;

export type CreateBillingAccountsBudgetsResponse = GoogleCloudBillingBudgetsV1Budget;
export const CreateBillingAccountsBudgetsResponse = GoogleCloudBillingBudgetsV1Budget;

export type CreateBillingAccountsBudgetsError = CommonErrors;

export const createBillingAccountsBudgets: API.OperationMethod<CreateBillingAccountsBudgetsRequest, CreateBillingAccountsBudgetsResponse, CreateBillingAccountsBudgetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBillingAccountsBudgetsRequest,
  output: CreateBillingAccountsBudgetsResponse,
  errors: [],
}));

/** Updates a budget and returns the updated budget. WARNING: There are some fields exposed on the Google Cloud Console that aren't available on this API. Budget fields that are not exposed in this API will not be changed by this method. */
export interface PatchBillingAccountsBudgetsRequest {
  /** Output only. Resource name of the budget. The resource name implies the scope of a budget. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`. */
  name: string;
  /** Optional. Indicates which fields in the provided budget to update. Read-only fields (such as `name`) cannot be changed. If this is not provided, then only fields with non-default values from the request are updated. See https://developers.google.com/protocol-buffers/docs/proto3#default for more details about default values. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudBillingBudgetsV1Budget;
}

export const PatchBillingAccountsBudgetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudBillingBudgetsV1Budget).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/billingAccounts/{billingAccountsId}/budgets/{budgetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBillingAccountsBudgetsRequest>;

export type PatchBillingAccountsBudgetsResponse = GoogleCloudBillingBudgetsV1Budget;
export const PatchBillingAccountsBudgetsResponse = GoogleCloudBillingBudgetsV1Budget;

export type PatchBillingAccountsBudgetsError = CommonErrors;

export const patchBillingAccountsBudgets: API.OperationMethod<PatchBillingAccountsBudgetsRequest, PatchBillingAccountsBudgetsResponse, PatchBillingAccountsBudgetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBillingAccountsBudgetsRequest,
  output: PatchBillingAccountsBudgetsResponse,
  errors: [],
}));

/** Returns a budget. WARNING: There are some fields exposed on the Google Cloud Console that aren't available on this API. When reading from the API, you will not see these fields in the return value, though they may have been set in the Cloud Console. */
export interface GetBillingAccountsBudgetsRequest {
  /** Required. Name of budget to get. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`. */
  name: string;
}

export const GetBillingAccountsBudgetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/budgets/{budgetsId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsBudgetsRequest>;

export type GetBillingAccountsBudgetsResponse = GoogleCloudBillingBudgetsV1Budget;
export const GetBillingAccountsBudgetsResponse = GoogleCloudBillingBudgetsV1Budget;

export type GetBillingAccountsBudgetsError = CommonErrors;

export const getBillingAccountsBudgets: API.OperationMethod<GetBillingAccountsBudgetsRequest, GetBillingAccountsBudgetsResponse, GetBillingAccountsBudgetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsBudgetsRequest,
  output: GetBillingAccountsBudgetsResponse,
  errors: [],
}));

/** Returns a list of budgets for a billing account. WARNING: There are some fields exposed on the Google Cloud Console that aren't available on this API. When reading from the API, you will not see these fields in the return value, though they may have been set in the Cloud Console. */
export interface ListBillingAccountsBudgetsRequest {
  /** Required. Name of billing account to list budgets under. Values are of the form `billingAccounts/{billingAccountId}`. */
  parent: string;
  /** Optional. Set the scope of the budgets to be returned, in the format of the resource name. The scope of a budget is the cost that it tracks, such as costs for a single project, or the costs for all projects in a folder. Only project scope (in the format of "projects/project-id" or "projects/123") is supported in this field. When this field is set to a project's resource name, the budgets returned are tracking the costs for that project. */
  scope?: string;
  /** Optional. The maximum number of budgets to return per page. The default and maximum value are 100. */
  pageSize?: number;
  /** Optional. The value returned by the last `ListBudgetsResponse` which indicates that this is a continuation of a prior `ListBudgets` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListBillingAccountsBudgetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/budgets" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsBudgetsRequest>;

export type ListBillingAccountsBudgetsResponse = GoogleCloudBillingBudgetsV1ListBudgetsResponse;
export const ListBillingAccountsBudgetsResponse = GoogleCloudBillingBudgetsV1ListBudgetsResponse;

export type ListBillingAccountsBudgetsError = CommonErrors;

export const listBillingAccountsBudgets = API.makePaginated(() => ({
  input: ListBillingAccountsBudgetsRequest,
  output: ListBillingAccountsBudgetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a budget. Returns successfully if already deleted. */
export interface DeleteBillingAccountsBudgetsRequest {
  /** Required. Name of the budget to delete. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`. */
  name: string;
}

export const DeleteBillingAccountsBudgetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/billingAccounts/{billingAccountsId}/budgets/{budgetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBillingAccountsBudgetsRequest>;

export type DeleteBillingAccountsBudgetsResponse = GoogleProtobufEmpty;
export const DeleteBillingAccountsBudgetsResponse = GoogleProtobufEmpty;

export type DeleteBillingAccountsBudgetsError = CommonErrors;

export const deleteBillingAccountsBudgets: API.OperationMethod<DeleteBillingAccountsBudgetsRequest, DeleteBillingAccountsBudgetsResponse, DeleteBillingAccountsBudgetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBillingAccountsBudgetsRequest,
  output: DeleteBillingAccountsBudgetsResponse,
  errors: [],
}));

