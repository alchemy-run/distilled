// ==========================================================================
// Merchant API (merchantapi conversions_v1)
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
  version: "conversions_v1",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The product id. */
  resourceId?: string;
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> = Schema.suspend(() => Schema.Struct({
  attribute: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
  changes: Schema.optional(Schema.Array(ProductChange)),
  resourceId: Schema.optional(Schema.String),
  managingAccount: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductStatusChangeMessage" }) as any as Schema.Schema<ProductStatusChangeMessage>;

export interface ConversionType {
  /** Output only. Conversion event name, as it'll be reported by the client. */
  name?: string;
  /** Output only. Option indicating if the type should be included in Merchant Center reporting. */
  report?: boolean;
}

export const ConversionType: Schema.Schema<ConversionType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  report: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConversionType" }) as any as Schema.Schema<ConversionType>;

export interface AttributionSettings {
  /** Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time. */
  conversionType?: Array<ConversionType>;
  /** Required. Lookback window (in days) used for attribution in this source. Supported values are `7`, `30` & `40`. */
  attributionLookbackWindowDays?: number;
  /** Required. Attribution model. */
  attributionModel?: "ATTRIBUTION_MODEL_UNSPECIFIED" | "CROSS_CHANNEL_LAST_CLICK" | "ADS_PREFERRED_LAST_CLICK" | "CROSS_CHANNEL_DATA_DRIVEN" | "CROSS_CHANNEL_FIRST_CLICK" | "CROSS_CHANNEL_LINEAR" | "CROSS_CHANNEL_POSITION_BASED" | "CROSS_CHANNEL_TIME_DECAY" | (string & {});
}

export const AttributionSettings: Schema.Schema<AttributionSettings> = Schema.suspend(() => Schema.Struct({
  conversionType: Schema.optional(Schema.Array(ConversionType)),
  attributionLookbackWindowDays: Schema.optional(Schema.Number),
  attributionModel: Schema.optional(Schema.String),
})).annotate({ identifier: "AttributionSettings" }) as any as Schema.Schema<AttributionSettings>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface MerchantCenterDestination {
  /** Required. Merchant-specified display name for the destination. This is the name that identifies the conversion source within the Merchant Center UI. The maximum length is 64 characters. */
  displayName?: string;
  /** Required. Three-letter currency code (ISO 4217). The currency code defines in which currency the conversions sent to this destination will be reported in Merchant Center. */
  currencyCode?: string;
  /** Output only. Merchant Center Destination ID. */
  destination?: string;
  /** Required. Attribution settings used for the Merchant Center Destination. */
  attributionSettings?: AttributionSettings;
}

export const MerchantCenterDestination: Schema.Schema<MerchantCenterDestination> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  attributionSettings: Schema.optional(AttributionSettings),
})).annotate({ identifier: "MerchantCenterDestination" }) as any as Schema.Schema<MerchantCenterDestination>;

export interface GoogleAnalyticsLink {
  /** Required. Immutable. ID of the Google Analytics property the merchant is linked to. */
  propertyId?: string;
  /** Output only. Name of the Google Analytics property the merchant is linked to. */
  property?: string;
  /** Output only. Attribution settings for the linked Google Analytics property. */
  attributionSettings?: AttributionSettings;
}

export const GoogleAnalyticsLink: Schema.Schema<GoogleAnalyticsLink> = Schema.suspend(() => Schema.Struct({
  propertyId: Schema.optional(Schema.String),
  property: Schema.optional(Schema.String),
  attributionSettings: Schema.optional(AttributionSettings),
})).annotate({ identifier: "GoogleAnalyticsLink" }) as any as Schema.Schema<GoogleAnalyticsLink>;

export interface ConversionSource {
  /** Output only. The time when an archived conversion source becomes permanently deleted and is no longer available to undelete. */
  expireTime?: string;
  /** Output only. Identifier. Generated by the Content API upon creation of a new `ConversionSource`. Format: `[a-z]{4}:.+` The four characters before the colon represent the type of conversion source. Content after the colon represents the ID of the conversion source within that type. The ID of two different conversion sources might be the same across different types. The following type prefixes are supported: * `galk`: For GoogleAnalyticsLink sources. * `mcdn`: For MerchantCenterDestination sources. */
  name?: string;
  /** Output only. Controller of the conversion source. */
  controller?: "CONTROLLER_UNSPECIFIED" | "MERCHANT" | "YOUTUBE_AFFILIATES" | (string & {});
  /** Immutable. Conversion Source of type "Link to Google Analytics Property". */
  googleAnalyticsLink?: GoogleAnalyticsLink;
  /** Output only. Current state of this conversion source. Can't be edited through the API. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED" | "PENDING" | (string & {});
  /** Conversion Source of type "Merchant Center Tag Destination". */
  merchantCenterDestination?: MerchantCenterDestination;
}

export const ConversionSource: Schema.Schema<ConversionSource> = Schema.suspend(() => Schema.Struct({
  expireTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  controller: Schema.optional(Schema.String),
  googleAnalyticsLink: Schema.optional(GoogleAnalyticsLink),
  state: Schema.optional(Schema.String),
  merchantCenterDestination: Schema.optional(MerchantCenterDestination),
})).annotate({ identifier: "ConversionSource" }) as any as Schema.Schema<ConversionSource>;

export interface UndeleteConversionSourceRequest {
}

export const UndeleteConversionSourceRequest: Schema.Schema<UndeleteConversionSourceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteConversionSourceRequest" }) as any as Schema.Schema<UndeleteConversionSourceRequest>;

export interface ListConversionSourcesResponse {
  /** List of conversion sources. */
  conversionSources?: Array<ConversionSource>;
  /** Token to be used to fetch the next results page. */
  nextPageToken?: string;
}

export const ListConversionSourcesResponse: Schema.Schema<ListConversionSourcesResponse> = Schema.suspend(() => Schema.Struct({
  conversionSources: Schema.optional(Schema.Array(ConversionSource)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConversionSourcesResponse" }) as any as Schema.Schema<ListConversionSourcesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetAccountsConversionSourcesRequest {
  /** Required. The name of the conversion source to be fetched. Format: `accounts/{account}/conversionSources/{conversion_source}` */
  name: string;
}

export const GetAccountsConversionSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "conversions/v1/accounts/{accountsId}/conversionSources/{conversionSourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsConversionSourcesRequest>;

export type GetAccountsConversionSourcesResponse = ConversionSource;
export const GetAccountsConversionSourcesResponse = ConversionSource;

export type GetAccountsConversionSourcesError = CommonErrors;

/** Fetches a conversion source. */
export const getAccountsConversionSources: API.OperationMethod<GetAccountsConversionSourcesRequest, GetAccountsConversionSourcesResponse, GetAccountsConversionSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsConversionSourcesRequest,
  output: GetAccountsConversionSourcesResponse,
  errors: [],
}));

export interface ListAccountsConversionSourcesRequest {
  /** Optional. Show deleted (archived) conversion sources. By default, deleted conversion sources are not returned. */
  showDeleted?: boolean;
  /** Required. The merchant account who owns the collection of conversion sources. Format: `accounts/{account}` */
  parent: string;
  /** Optional. Page token. */
  pageToken?: string;
  /** Optional. The maximum number of conversion sources to return in a page. If no `page_size` is specified, `100` is used as the default value. The maximum value is `200`. Values above `200` will be coerced to `200`. Regardless of pagination, at most `200` conversion sources are returned in total. */
  pageSize?: number;
}

export const ListAccountsConversionSourcesRequest = Schema.Struct({
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "conversions/v1/accounts/{accountsId}/conversionSources" }),
  svc,
) as unknown as Schema.Schema<ListAccountsConversionSourcesRequest>;

export type ListAccountsConversionSourcesResponse = ListConversionSourcesResponse;
export const ListAccountsConversionSourcesResponse = ListConversionSourcesResponse;

export type ListAccountsConversionSourcesError = CommonErrors;

/** Retrieves the list of conversion sources the caller has access to. */
export const listAccountsConversionSources: API.PaginatedOperationMethod<ListAccountsConversionSourcesRequest, ListAccountsConversionSourcesResponse, ListAccountsConversionSourcesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListAccountsConversionSourcesRequest,
  output: ListAccountsConversionSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAccountsConversionSourcesRequest {
  /** Required. The merchant account that will own the new conversion source. Format: `accounts/{account}` */
  parent: string;
  /** Request body */
  body?: ConversionSource;
}

export const CreateAccountsConversionSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ConversionSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "conversions/v1/accounts/{accountsId}/conversionSources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsConversionSourcesRequest>;

export type CreateAccountsConversionSourcesResponse = ConversionSource;
export const CreateAccountsConversionSourcesResponse = ConversionSource;

export type CreateAccountsConversionSourcesError = CommonErrors;

/** Creates a new conversion source. */
export const createAccountsConversionSources: API.OperationMethod<CreateAccountsConversionSourcesRequest, CreateAccountsConversionSourcesResponse, CreateAccountsConversionSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsConversionSourcesRequest,
  output: CreateAccountsConversionSourcesResponse,
  errors: [],
}));

export interface PatchAccountsConversionSourcesRequest {
  /** Optional. List of fields being updated. */
  updateMask?: string;
  /** Output only. Identifier. Generated by the Content API upon creation of a new `ConversionSource`. Format: `[a-z]{4}:.+` The four characters before the colon represent the type of conversion source. Content after the colon represents the ID of the conversion source within that type. The ID of two different conversion sources might be the same across different types. The following type prefixes are supported: * `galk`: For GoogleAnalyticsLink sources. * `mcdn`: For MerchantCenterDestination sources. */
  name: string;
  /** Request body */
  body?: ConversionSource;
}

export const PatchAccountsConversionSourcesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ConversionSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "conversions/v1/accounts/{accountsId}/conversionSources/{conversionSourcesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsConversionSourcesRequest>;

export type PatchAccountsConversionSourcesResponse = ConversionSource;
export const PatchAccountsConversionSourcesResponse = ConversionSource;

export type PatchAccountsConversionSourcesError = CommonErrors;

/** Updates information of an existing conversion source. Available only for Merchant Center Destination conversion sources. */
export const patchAccountsConversionSources: API.OperationMethod<PatchAccountsConversionSourcesRequest, PatchAccountsConversionSourcesResponse, PatchAccountsConversionSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsConversionSourcesRequest,
  output: PatchAccountsConversionSourcesResponse,
  errors: [],
}));

export interface DeleteAccountsConversionSourcesRequest {
  /** Required. The name of the conversion source to be deleted. Format: `accounts/{account}/conversionSources/{conversion_source}` */
  name: string;
}

export const DeleteAccountsConversionSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "conversions/v1/accounts/{accountsId}/conversionSources/{conversionSourcesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsConversionSourcesRequest>;

export type DeleteAccountsConversionSourcesResponse = Empty;
export const DeleteAccountsConversionSourcesResponse = Empty;

export type DeleteAccountsConversionSourcesError = CommonErrors;

/** Archives an existing conversion source. If the conversion source is a Merchant Center Destination, it will be recoverable for 30 days. If the conversion source is a Google Analytics Link, it will be deleted immediately and can be restored by creating a new one. */
export const deleteAccountsConversionSources: API.OperationMethod<DeleteAccountsConversionSourcesRequest, DeleteAccountsConversionSourcesResponse, DeleteAccountsConversionSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsConversionSourcesRequest,
  output: DeleteAccountsConversionSourcesResponse,
  errors: [],
}));

export interface UndeleteAccountsConversionSourcesRequest {
  /** Required. The name of the conversion source to be undeleted. Format: `accounts/{account}/conversionSources/{conversion_source}` */
  name: string;
  /** Request body */
  body?: UndeleteConversionSourceRequest;
}

export const UndeleteAccountsConversionSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteConversionSourceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "conversions/v1/accounts/{accountsId}/conversionSources/{conversionSourcesId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteAccountsConversionSourcesRequest>;

export type UndeleteAccountsConversionSourcesResponse = ConversionSource;
export const UndeleteAccountsConversionSourcesResponse = ConversionSource;

export type UndeleteAccountsConversionSourcesError = CommonErrors;

/** Re-enables an archived conversion source. Only Available for Merchant Center Destination conversion sources. */
export const undeleteAccountsConversionSources: API.OperationMethod<UndeleteAccountsConversionSourcesRequest, UndeleteAccountsConversionSourcesResponse, UndeleteAccountsConversionSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteAccountsConversionSourcesRequest,
  output: UndeleteAccountsConversionSourcesResponse,
  errors: [],
}));

