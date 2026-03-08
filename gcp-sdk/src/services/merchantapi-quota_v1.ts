// ==========================================================================
// Merchant API (merchantapi quota_v1)
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
  version: "quota_v1",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ProductLimit {
  /** Required. The scope of the product limit. */
  scope?: "SCOPE_UNSPECIFIED" | "ADS_NON_EEA" | "ADS_EEA" | (string & {});
  /** Required. The maximum number of products that are allowed in the account in the given scope. */
  limit?: string;
}

export const ProductLimit: Schema.Schema<ProductLimit> = Schema.suspend(() =>
  Schema.Struct({
    scope: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ProductLimit",
}) as any as Schema.Schema<ProductLimit>;

export interface AccountLimit {
  /** Identifier. The limit part of the name will be a combination of the type and the scope. For example: `accounts/123/limits/products~ADS_NON_EEA` Format: `accounts/{account}/limits/{limit}` */
  name?: string;
  /** The limit for products. */
  products?: ProductLimit;
}

export const AccountLimit: Schema.Schema<AccountLimit> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    products: Schema.optional(ProductLimit),
  }),
).annotate({
  identifier: "AccountLimit",
}) as any as Schema.Schema<AccountLimit>;

export interface MethodDetails {
  /** Output only. The name of the method for example `products.list`. */
  method?: string;
  /** Output only. The API version that the method belongs to. */
  version?: string;
  /** Output only. The sub-API that the method belongs to. */
  subapi?: string;
  /** Output only. The path for the method such as `products/v1/productInputs.insert` */
  path?: string;
}

export const MethodDetails: Schema.Schema<MethodDetails> = Schema.suspend(() =>
  Schema.Struct({
    method: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    subapi: Schema.optional(Schema.String),
    path: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "MethodDetails",
}) as any as Schema.Schema<MethodDetails>;

export interface QuotaGroup {
  /** Output only. List of all methods group quota applies to. */
  methodDetails?: Array<MethodDetails>;
  /** Output only. The current quota usage, meaning the number of calls already made on a given day to the methods in the group. The daily quota limits reset at at 12:00 PM midday UTC. */
  quotaUsage?: string;
  /** Output only. The maximum number of calls allowed per day for the group. */
  quotaLimit?: string;
  /** Output only. The maximum number of calls allowed per minute for the group. */
  quotaMinuteLimit?: string;
  /** Identifier. The resource name of the quota group. Format: accounts/{account}/quotas/{group} Note: There is no guarantee on the format of {group} */
  name?: string;
}

export const QuotaGroup: Schema.Schema<QuotaGroup> = Schema.suspend(() =>
  Schema.Struct({
    methodDetails: Schema.optional(Schema.Array(MethodDetails)),
    quotaUsage: Schema.optional(Schema.String),
    quotaLimit: Schema.optional(Schema.String),
    quotaMinuteLimit: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "QuotaGroup" }) as any as Schema.Schema<QuotaGroup>;

export interface ListQuotaGroupsResponse {
  /** The methods, current quota usage and limits per each group. The quota is shared between all methods in the group. The groups are sorted in descending order based on quota_usage. */
  quotaGroups?: Array<QuotaGroup>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListQuotaGroupsResponse: Schema.Schema<ListQuotaGroupsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      quotaGroups: Schema.optional(Schema.Array(QuotaGroup)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListQuotaGroupsResponse",
  }) as any as Schema.Schema<ListQuotaGroupsResponse>;

export interface ListAccountLimitsResponse {
  /** The limits for the given account. */
  accountLimits?: Array<AccountLimit>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAccountLimitsResponse: Schema.Schema<ListAccountLimitsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accountLimits: Schema.optional(Schema.Array(AccountLimit)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAccountLimitsResponse",
  }) as any as Schema.Schema<ListAccountLimitsResponse>;

export interface ProductChange {
  /** The old value of the changed resource or attribute. If empty, it means that the product was created. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  oldValue?: string;
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
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
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() =>
  Schema.Struct({
    oldValue: Schema.optional(Schema.String),
    newValue: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    reportingContext: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ProductChange",
}) as any as Schema.Schema<ProductChange>;

export interface ProductStatusChangeMessage {
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** The product id. */
  resourceId?: string;
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> =
  Schema.suspend(() =>
    Schema.Struct({
      resourceType: Schema.optional(Schema.String),
      expirationTime: Schema.optional(Schema.String),
      changes: Schema.optional(Schema.Array(ProductChange)),
      eventTime: Schema.optional(Schema.String),
      account: Schema.optional(Schema.String),
      managingAccount: Schema.optional(Schema.String),
      resourceId: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStatusChangeMessage",
  }) as any as Schema.Schema<ProductStatusChangeMessage>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetAccountsLimitsRequest {
  /** Required. The name of the limit to retrieve. Format: `accounts/{account}/limits/{limit}` For example: `accounts/123/limits/products~ADS_NON_EEA` */
  name: string;
}

export const GetAccountsLimitsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "quota/v1/accounts/{accountsId}/limits/{limitsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsLimitsRequest>;

export type GetAccountsLimitsResponse = AccountLimit;
export const GetAccountsLimitsResponse = AccountLimit;

export type GetAccountsLimitsError = DefaultErrors;

/** Retrieves an account limit. */
export const getAccountsLimits: API.OperationMethod<
  GetAccountsLimitsRequest,
  GetAccountsLimitsResponse,
  GetAccountsLimitsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsLimitsRequest,
  output: GetAccountsLimitsResponse,
  errors: [],
}));

export interface ListAccountsLimitsRequest {
  /** Required. The parent account. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of limits to return. The service may return fewer than this value. If unspecified, at most 100 limits will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Required. A filter on the limit `type` is required, for example, `type = "products"`. */
  filter?: string;
  /** Optional. A page token, received from a previous `ListAccountLimits` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccountLimits` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsLimitsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "quota/v1/accounts/{accountsId}/limits" }),
  svc,
) as unknown as Schema.Schema<ListAccountsLimitsRequest>;

export type ListAccountsLimitsResponse = ListAccountLimitsResponse;
export const ListAccountsLimitsResponse = ListAccountLimitsResponse;

export type ListAccountsLimitsError = DefaultErrors;

/** Lists the limits of an account. */
export const listAccountsLimits: API.PaginatedOperationMethod<
  ListAccountsLimitsRequest,
  ListAccountsLimitsResponse,
  ListAccountsLimitsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsLimitsRequest,
  output: ListAccountsLimitsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListAccountsQuotasRequest {
  /** Optional. The maximum number of quotas to return in the response, used for paging. Defaults to 500; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The merchant account who owns the collection of method quotas Format: accounts/{account} */
  parent: string;
  /** Optional. Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsQuotasRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "quota/v1/accounts/{accountsId}/quotas" }),
  svc,
) as unknown as Schema.Schema<ListAccountsQuotasRequest>;

export type ListAccountsQuotasResponse = ListQuotaGroupsResponse;
export const ListAccountsQuotasResponse = ListQuotaGroupsResponse;

export type ListAccountsQuotasError = DefaultErrors;

/** Lists the daily call quota and usage per group for your Merchant Center account. */
export const listAccountsQuotas: API.PaginatedOperationMethod<
  ListAccountsQuotasRequest,
  ListAccountsQuotasResponse,
  ListAccountsQuotasError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsQuotasRequest,
  output: ListAccountsQuotasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
