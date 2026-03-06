// ==========================================================================
// Merchant API (merchantapi quota_v1beta)
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
  name: "merchantapi",
  version: "quota_v1beta",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export const MethodDetails: Schema.Schema<MethodDetails> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  subapi: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "MethodDetails" }) as any as Schema.Schema<MethodDetails>;

export interface ProductChange {
  /** The old value of the changed resource or attribute. If empty, it means that the product was created. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  oldValue?: string;
  /** Countries that have the change (if applicable). Represented in the ISO 3166 format. */
  regionCode?: string;
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
  /** Reporting contexts that have the change (if applicable). Currently this field supports only (`SHOPPING_ADS`, `LOCAL_INVENTORY_ADS`, `YOUTUBE_SHOPPING`, `YOUTUBE_CHECKOUT`, `YOUTUBE_AFFILIATE`) from the enum value [ReportingContextEnum](/merchant/api/reference/rest/Shared.Types/ReportingContextEnum) */
  reportingContext?: "REPORTING_CONTEXT_ENUM_UNSPECIFIED" | "SHOPPING_ADS" | "DISCOVERY_ADS" | "DEMAND_GEN_ADS" | "DEMAND_GEN_ADS_DISCOVER_SURFACE" | "VIDEO_ADS" | "DISPLAY_ADS" | "LOCAL_INVENTORY_ADS" | "VEHICLE_INVENTORY_ADS" | "FREE_LISTINGS" | "FREE_LISTINGS_UCP_CHECKOUT" | "FREE_LOCAL_LISTINGS" | "FREE_LOCAL_VEHICLE_LISTINGS" | "YOUTUBE_AFFILIATE" | "YOUTUBE_SHOPPING" | "CLOUD_RETAIL" | "LOCAL_CLOUD_RETAIL" | "PRODUCT_REVIEWS" | "MERCHANT_REVIEWS" | "YOUTUBE_CHECKOUT" | (string & {});
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() => Schema.Struct({
  oldValue: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  newValue: Schema.optional(Schema.String),
  reportingContext: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductChange" }) as any as Schema.Schema<ProductChange>;

export interface ProductStatusChangeMessage {
  /** The product id. */
  resourceId?: string;
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> = Schema.suspend(() => Schema.Struct({
  resourceId: Schema.optional(Schema.String),
  managingAccount: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
  attribute: Schema.optional(Schema.String),
  changes: Schema.optional(Schema.Array(ProductChange)),
  resourceType: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductStatusChangeMessage" }) as any as Schema.Schema<ProductStatusChangeMessage>;

export interface QuotaGroup {
  /** Identifier. The resource name of the quota group. Format: accounts/{account}/quotas/{group} Note: There is no guarantee on the format of {group} */
  name?: string;
  /** Output only. The current quota usage, meaning the number of calls already made on a given day to the methods in the group. The daily quota limits reset at at 12:00 PM midday UTC. */
  quotaUsage?: string;
  /** Output only. List of all methods group quota applies to. */
  methodDetails?: Array<MethodDetails>;
  /** Output only. The maximum number of calls allowed per day for the group. */
  quotaLimit?: string;
  /** Output only. The maximum number of calls allowed per minute for the group. */
  quotaMinuteLimit?: string;
}

export const QuotaGroup: Schema.Schema<QuotaGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  quotaUsage: Schema.optional(Schema.String),
  methodDetails: Schema.optional(Schema.Array(MethodDetails)),
  quotaLimit: Schema.optional(Schema.String),
  quotaMinuteLimit: Schema.optional(Schema.String),
})).annotate({ identifier: "QuotaGroup" }) as any as Schema.Schema<QuotaGroup>;

export interface ListQuotaGroupsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The methods, current quota usage and limits per each group. The quota is shared between all methods in the group. The groups are sorted in descending order based on quota_usage. */
  quotaGroups?: Array<QuotaGroup>;
}

export const ListQuotaGroupsResponse: Schema.Schema<ListQuotaGroupsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  quotaGroups: Schema.optional(Schema.Array(QuotaGroup)),
})).annotate({ identifier: "ListQuotaGroupsResponse" }) as any as Schema.Schema<ListQuotaGroupsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListAccountsQuotasRequest {
  /** Optional. Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
  /** Required. The merchant account who owns the collection of method quotas Format: accounts/{account} */
  parent: string;
  /** Optional. The maximum number of quotas to return in the response, used for paging. Defaults to 500; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListAccountsQuotasRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "quota/v1beta/accounts/{accountsId}/quotas" }),
  svc,
) as unknown as Schema.Schema<ListAccountsQuotasRequest>;

export type ListAccountsQuotasResponse = ListQuotaGroupsResponse;
export const ListAccountsQuotasResponse = ListQuotaGroupsResponse;

export type ListAccountsQuotasError = CommonErrors;

/** Lists the daily call quota and usage per group for your Merchant Center account. */
export const listAccountsQuotas: API.PaginatedOperationMethod<ListAccountsQuotasRequest, ListAccountsQuotasResponse, ListAccountsQuotasError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListAccountsQuotasRequest,
  output: ListAccountsQuotasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

