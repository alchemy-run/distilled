// ==========================================================================
// Merchant API (merchantapi lfp_v1)
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
  name: "merchantapi",
  version: "lfp_v1",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface CountrySettings {
  /** Required. The [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml) for the country for which these settings are defined. */
  regionCode?: string;
  /** Output only. The verification state of this merchant's instock serving feature. */
  instockServingVerificationState?:
    | "VERIFICATION_STATE_UNSPECIFIED"
    | "VERIFICATION_STATE_NOT_APPROVED"
    | "VERIFICATION_STATE_IN_PROGRESS"
    | "VERIFICATION_STATE_APPROVED"
    | (string & {});
  /** Output only. The verification state of this merchant's pickup serving feature. */
  pickupServingVerificationState?:
    | "VERIFICATION_STATE_UNSPECIFIED"
    | "VERIFICATION_STATE_NOT_APPROVED"
    | "VERIFICATION_STATE_IN_PROGRESS"
    | "VERIFICATION_STATE_APPROVED"
    | (string & {});
  /** True if this merchant has enabled local inventory ads in MC. */
  localInventoryAdsEnabled?: boolean;
  /** Output only. The product page type selected by this merchant. */
  productPageType?:
    | "PRODUCT_PAGE_TYPE_UNSPECIFIED"
    | "GOOGLE_HOSTED"
    | "MERCHANT_HOSTED"
    | "MERCHANT_HOSTED_STORE_SPECIFIC"
    | (string & {});
  /** True if this merchant has enabled free local listings in MC. */
  freeLocalListingsEnabled?: boolean;
  /** Output only. The verification state of this merchant's inventory check. */
  inventoryVerificationState?:
    | "VERIFICATION_STATE_UNSPECIFIED"
    | "VERIFICATION_STATE_NOT_APPROVED"
    | "VERIFICATION_STATE_IN_PROGRESS"
    | "VERIFICATION_STATE_APPROVED"
    | (string & {});
}

export const CountrySettings: Schema.Schema<CountrySettings> = Schema.suspend(
  () =>
    Schema.Struct({
      regionCode: Schema.optional(Schema.String),
      instockServingVerificationState: Schema.optional(Schema.String),
      pickupServingVerificationState: Schema.optional(Schema.String),
      localInventoryAdsEnabled: Schema.optional(Schema.Boolean),
      productPageType: Schema.optional(Schema.String),
      freeLocalListingsEnabled: Schema.optional(Schema.Boolean),
      inventoryVerificationState: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CountrySettings",
}) as any as Schema.Schema<CountrySettings>;

export interface Price {
  /** The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros). */
  amountMicros?: string;
  /** The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217). */
  currencyCode?: string;
}

export const Price: Schema.Schema<Price> = Schema.suspend(() =>
  Schema.Struct({
    amountMicros: Schema.optional(Schema.String),
    currencyCode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface LfpSale {
  /** Required. The unit price of the product. */
  price?: Price;
  /** Required. The [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml) for the country where the product is sold. */
  regionCode?: string;
  /** Required. The Global Trade Item Number of the sold product. */
  gtin?: string;
  /** Output only. System generated globally unique ID for the `LfpSale`. */
  uid?: string;
  /** Required. The Merchant Center ID of the merchant to submit the sale for. */
  targetAccount?: string;
  /** Required. The relative change of the available quantity. Negative for items returned. */
  quantity?: string;
  /** Required. The timestamp for the sale. */
  saleTime?: string;
  /** Optional. The [feed label](https://developers.google.com/shopping-content/guides/products/feed-labels) for the product. If this is not set, it will default to `regionCode`. */
  feedLabel?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in the Business Profile. */
  storeCode?: string;
  /** Required. A unique identifier for the product. If both inventories and sales are submitted for a merchant, this id should match for the same product. **Note**: if the merchant sells the same product new and used, they should have different IDs. */
  offerId?: string;
  /** Output only. Identifier. The name of the `LfpSale` resource. Format: `accounts/{account}/lfpSales/{sale}` */
  name?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
}

export const LfpSale: Schema.Schema<LfpSale> = Schema.suspend(() =>
  Schema.Struct({
    price: Schema.optional(Price),
    regionCode: Schema.optional(Schema.String),
    gtin: Schema.optional(Schema.String),
    uid: Schema.optional(Schema.String),
    targetAccount: Schema.optional(Schema.String),
    quantity: Schema.optional(Schema.String),
    saleTime: Schema.optional(Schema.String),
    feedLabel: Schema.optional(Schema.String),
    storeCode: Schema.optional(Schema.String),
    offerId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    contentLanguage: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "LfpSale" }) as any as Schema.Schema<LfpSale>;

export interface LfpStore {
  /** Optional. The merchant or store name. */
  storeName?: string;
  /** Required. The street address of the store. Example: 1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA. */
  storeAddress?: string;
  /** Optional. The store phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format. Example: `+15556767888` */
  phoneNumber?: string;
  /** Output only. Identifier. The name of the `LfpStore` resource. Format: `accounts/{account}/lfpStores/{target_merchant}~{store_code}` */
  name?: string;
  /** Optional. Output only. The state of matching to a Google Business Profile. See matchingStateHint for further details if no match is found. */
  matchingState?:
    | "STORE_MATCHING_STATE_UNSPECIFIED"
    | "STORE_MATCHING_STATE_MATCHED"
    | "STORE_MATCHING_STATE_FAILED"
    | (string & {});
  /** Optional. Output only. The hint of why the matching has failed. This is only set when matchingState=`STORE_MATCHING_STATE_FAILED`. Possible values are: - "`linked-store-not-found`": There aren't any Google Business Profile stores available for matching. - "`store-match-not-found`": The provided `LfpStore` couldn't be matched to any of the connected Google Business Profile stores. Merchant Center account is connected correctly and stores are available on Google Business Profile, but the `LfpStore` location address does not match with Google Business Profile stores' addresses. Update the `LfpStore` address or Google Business Profile store address to match correctly. - "`store-match-unverified`": The provided `LfpStore` couldn't be matched to any of the connected Google Business Profile stores, as the matched Google Business Profile store is unverified. Go through the Google Business Profile verification process to match correctly. */
  matchingStateHint?: string;
  /** Required. Immutable. A store identifier that is unique for the target merchant. */
  storeCode?: string;
  /** Required. The Merchant Center id of the merchant to submit the store for. */
  targetAccount?: string;
  /** Optional. [Google My Business category id](https://support.google.com/business/answer/7249669). */
  gcidCategory?: Array<string>;
  /** Optional. The [Google Place Id](https://developers.google.com/maps/documentation/places/web-service/place-id#id-overview) of the store location. */
  placeId?: string;
  /** Optional. The website URL for the store or merchant. */
  websiteUri?: string;
}

export const LfpStore: Schema.Schema<LfpStore> = Schema.suspend(() =>
  Schema.Struct({
    storeName: Schema.optional(Schema.String),
    storeAddress: Schema.optional(Schema.String),
    phoneNumber: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    matchingState: Schema.optional(Schema.String),
    matchingStateHint: Schema.optional(Schema.String),
    storeCode: Schema.optional(Schema.String),
    targetAccount: Schema.optional(Schema.String),
    gcidCategory: Schema.optional(Schema.Array(Schema.String)),
    placeId: Schema.optional(Schema.String),
    websiteUri: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "LfpStore" }) as any as Schema.Schema<LfpStore>;

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
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** The product id. */
  resourceId?: string;
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> =
  Schema.suspend(() =>
    Schema.Struct({
      account: Schema.optional(Schema.String),
      resourceId: Schema.optional(Schema.String),
      expirationTime: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      eventTime: Schema.optional(Schema.String),
      managingAccount: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
      resourceType: Schema.optional(Schema.String),
      changes: Schema.optional(Schema.Array(ProductChange)),
    }),
  ).annotate({
    identifier: "ProductStatusChangeMessage",
  }) as any as Schema.Schema<ProductStatusChangeMessage>;

export interface InventoryStats {
  /** Number of entries that were built based on provided inventories/sales and couldn't be submitted to Google due to errors like missing product. */
  unsubmittedEntries?: string;
  /** Number of entries (understanding entry as a pair of product and store) that were built based on provided inventories/sales and submitted to Google. */
  submittedEntries?: string;
  /** Number of submitted in stock entries. */
  submittedInStockEntries?: string;
  /** Number of products from provided inventories/sales that were created from matches to existing online products provided by the merchant or to the Google catalog. */
  submittedProducts?: string;
}

export const InventoryStats: Schema.Schema<InventoryStats> = Schema.suspend(
  () =>
    Schema.Struct({
      unsubmittedEntries: Schema.optional(Schema.String),
      submittedEntries: Schema.optional(Schema.String),
      submittedInStockEntries: Schema.optional(Schema.String),
      submittedProducts: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "InventoryStats",
}) as any as Schema.Schema<InventoryStats>;

export interface LfpInventory {
  /** Required. The Merchant Center ID of the merchant to submit the inventory for. */
  targetAccount?: string;
  /** Required. The [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml) for the country where the product is sold. */
  regionCode?: string;
  /** Optional. The current price of the product. */
  price?: Price;
  /** Optional. Supported pickup method for this offer. Unless the value is "not supported", this field must be submitted together with `pickupSla`. For accepted attribute values, see the [local product inventory data specification](https://support.google.com/merchants/answer/3061342). */
  pickupMethod?: string;
  /** Output only. Identifier. The name for the `LfpInventory` resource. Format: `accounts/{account}/lfpInventories/{target_merchant}~{store_code}~{offer}` */
  name?: string;
  /** Optional. The time when the inventory is collected. If not set, it will be set to the time when the inventory is submitted. */
  collectionTime?: string;
  /** Optional. Expected date that an order will be ready for pickup relative to the order date. Must be submitted together with `pickupMethod`. For accepted attribute values, see the [local product inventory data specification](https://support.google.com/merchants/answer/3061342). */
  pickupSla?: string;
  /** Required. The identifier of the merchant's store. Either the store code inserted through `InsertLfpStore` or the store code in the Business Profile. */
  storeCode?: string;
  /** Optional. Quantity of the product available at this store. Must be greater than or equal to zero. */
  quantity?: string;
  /** Optional. The [feed label](https://developers.google.com/shopping-content/guides/products/feed-labels) for the product. If this is not set, it will default to `regionCode`. */
  feedLabel?: string;
  /** Required. Availability of the product at this store. For accepted attribute values, see the [local product inventory data specification](https://support.google.com/merchants/answer/3061342) */
  availability?: string;
  /** Optional. The Global Trade Item Number of the product. */
  gtin?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Required. Immutable. A unique identifier for the product. If both inventories and sales are submitted for a merchant, this id should match for the same product. **Note**: if the merchant sells the same product new and used, they should have different IDs. */
  offerId?: string;
}

export const LfpInventory: Schema.Schema<LfpInventory> = Schema.suspend(() =>
  Schema.Struct({
    targetAccount: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    price: Schema.optional(Price),
    pickupMethod: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    collectionTime: Schema.optional(Schema.String),
    pickupSla: Schema.optional(Schema.String),
    storeCode: Schema.optional(Schema.String),
    quantity: Schema.optional(Schema.String),
    feedLabel: Schema.optional(Schema.String),
    availability: Schema.optional(Schema.String),
    gtin: Schema.optional(Schema.String),
    contentLanguage: Schema.optional(Schema.String),
    offerId: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "LfpInventory",
}) as any as Schema.Schema<LfpInventory>;

export interface ListLfpStoresResponse {
  /** The stores from the specified merchant. */
  lfpStores?: Array<LfpStore>;
  /** A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListLfpStoresResponse: Schema.Schema<ListLfpStoresResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      lfpStores: Schema.optional(Schema.Array(LfpStore)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLfpStoresResponse",
  }) as any as Schema.Schema<ListLfpStoresResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface LfpStoreState {
  /** Required. Immutable. The identifier of this store. */
  storeCode?: string;
  /** Output only. The store matching state. */
  matchingState?:
    | "STORE_MATCHING_STATE_UNSPECIFIED"
    | "STORE_MATCHING_STATE_MATCHED"
    | "STORE_MATCHING_STATE_FAILED"
    | (string & {});
  /** The hint of why the matching has failed (only set if matching_state is FAILED). */
  matchingStateHint?: string;
}

export const LfpStoreState: Schema.Schema<LfpStoreState> = Schema.suspend(() =>
  Schema.Struct({
    storeCode: Schema.optional(Schema.String),
    matchingState: Schema.optional(Schema.String),
    matchingStateHint: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "LfpStoreState",
}) as any as Schema.Schema<LfpStoreState>;

export interface LfpMerchantState {
  /** Output only. The state per store from the specified merchant. The field will be absent if the merchant has no stores submitted through LFP. */
  storeStates?: Array<LfpStoreState>;
  /** The inventory statistics for the merchant. The field will be absent if the merchant has no inventory submitted through LFP. */
  inventoryStats?: InventoryStats;
  /** Identifier. The name of the `LfpMerchantState` resource. Format: `accounts/{account}/lfpMerchantStates/{target_merchant}`. For example, `accounts/123456/lfpMerchantStates/567890`. */
  name?: string;
  /** Country-specific settings for the merchant. */
  countrySettings?: Array<CountrySettings>;
  /** Number of [GBPs](https://www.google.com/business/) this merchant has access to. */
  linkedGbps?: string;
}

export const LfpMerchantState: Schema.Schema<LfpMerchantState> = Schema.suspend(
  () =>
    Schema.Struct({
      storeStates: Schema.optional(Schema.Array(LfpStoreState)),
      inventoryStats: Schema.optional(InventoryStats),
      name: Schema.optional(Schema.String),
      countrySettings: Schema.optional(Schema.Array(CountrySettings)),
      linkedGbps: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "LfpMerchantState",
}) as any as Schema.Schema<LfpMerchantState>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetAccountsLfpMerchantStatesRequest {
  /** Required. The name of the state to retrieve. Format: `accounts/{account}/lfpMerchantStates/{target_merchant}`. For example, `accounts/123456/lfpMerchantStates/567890`. */
  name: string;
}

export const GetAccountsLfpMerchantStatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "lfp/v1/accounts/{accountsId}/lfpMerchantStates/{lfpMerchantStatesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsLfpMerchantStatesRequest>;

export type GetAccountsLfpMerchantStatesResponse = LfpMerchantState;
export const GetAccountsLfpMerchantStatesResponse = LfpMerchantState;

export type GetAccountsLfpMerchantStatesError = DefaultErrors;

/** Gets the LFP state of a merchant */
export const getAccountsLfpMerchantStates: API.OperationMethod<
  GetAccountsLfpMerchantStatesRequest,
  GetAccountsLfpMerchantStatesResponse,
  GetAccountsLfpMerchantStatesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsLfpMerchantStatesRequest,
  output: GetAccountsLfpMerchantStatesResponse,
  errors: [],
}));

export interface GetAccountsLfpStoresRequest {
  /** Required. The name of the store to retrieve. Format: `accounts/{account}/lfpStores/{target_merchant}~{store_code}` */
  name: string;
}

export const GetAccountsLfpStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "lfp/v1/accounts/{accountsId}/lfpStores/{lfpStoresId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsLfpStoresRequest>;

export type GetAccountsLfpStoresResponse = LfpStore;
export const GetAccountsLfpStoresResponse = LfpStore;

export type GetAccountsLfpStoresError = DefaultErrors;

/** Retrieves information about a store. */
export const getAccountsLfpStores: API.OperationMethod<
  GetAccountsLfpStoresRequest,
  GetAccountsLfpStoresResponse,
  GetAccountsLfpStoresError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsLfpStoresRequest,
  output: GetAccountsLfpStoresResponse,
  errors: [],
}));

export interface InsertAccountsLfpStoresRequest {
  /** Required. The LFP provider account Format: `accounts/{account}` */
  parent: string;
  /** Request body */
  body?: LfpStore;
}

export const InsertAccountsLfpStoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LfpStore).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "lfp/v1/accounts/{accountsId}/lfpStores:insert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertAccountsLfpStoresRequest>;

export type InsertAccountsLfpStoresResponse = LfpStore;
export const InsertAccountsLfpStoresResponse = LfpStore;

export type InsertAccountsLfpStoresError = DefaultErrors;

/** Inserts a store for the target merchant. If the store with the same store code already exists, it will be replaced. */
export const insertAccountsLfpStores: API.OperationMethod<
  InsertAccountsLfpStoresRequest,
  InsertAccountsLfpStoresResponse,
  InsertAccountsLfpStoresError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertAccountsLfpStoresRequest,
  output: InsertAccountsLfpStoresResponse,
  errors: [],
}));

export interface DeleteAccountsLfpStoresRequest {
  /** Required. The name of the store to delete for the target merchant account. Format: `accounts/{account}/lfpStores/{target_merchant}~{store_code}` */
  name: string;
}

export const DeleteAccountsLfpStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "lfp/v1/accounts/{accountsId}/lfpStores/{lfpStoresId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsLfpStoresRequest>;

export type DeleteAccountsLfpStoresResponse = Empty;
export const DeleteAccountsLfpStoresResponse = Empty;

export type DeleteAccountsLfpStoresError = DefaultErrors;

/** Deletes a store for a target merchant. */
export const deleteAccountsLfpStores: API.OperationMethod<
  DeleteAccountsLfpStoresRequest,
  DeleteAccountsLfpStoresResponse,
  DeleteAccountsLfpStoresError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsLfpStoresRequest,
  output: DeleteAccountsLfpStoresResponse,
  errors: [],
}));

export interface ListAccountsLfpStoresRequest {
  /** Required. The LFP partner. Format: `accounts/{account}` */
  parent: string;
  /** Required. The Merchant Center id of the merchant to list stores for. */
  targetAccount?: string;
  /** Optional. The maximum number of `LfpStore` resources for the given account to return. The service returns fewer than this value if the number of stores for the given account is less than the `pageSize`. The default value is 250. The maximum value is 1000; If a value higher than the maximum is specified, then the `pageSize` will default to the maximum. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListLfpStoresRequest` call. Provide the page token to retrieve the subsequent page. When paginating, all other parameters provided to `ListLfpStoresRequest` must match the call that provided the page token. The token returned as nextPageToken in the response to the previous request. */
  pageToken?: string;
}

export const ListAccountsLfpStoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  targetAccount: Schema.optional(Schema.String).pipe(
    T.HttpQuery("targetAccount"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "lfp/v1/accounts/{accountsId}/lfpStores" }),
  svc,
) as unknown as Schema.Schema<ListAccountsLfpStoresRequest>;

export type ListAccountsLfpStoresResponse = ListLfpStoresResponse;
export const ListAccountsLfpStoresResponse = ListLfpStoresResponse;

export type ListAccountsLfpStoresError = DefaultErrors;

/** Lists the stores of the target merchant, specified by the filter in `ListLfpStoresRequest`. */
export const listAccountsLfpStores: API.PaginatedOperationMethod<
  ListAccountsLfpStoresRequest,
  ListAccountsLfpStoresResponse,
  ListAccountsLfpStoresError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsLfpStoresRequest,
  output: ListAccountsLfpStoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface InsertAccountsLfpInventoriesRequest {
  /** Required. The LFP provider account. Format: `accounts/{account}` */
  parent: string;
  /** Request body */
  body?: LfpInventory;
}

export const InsertAccountsLfpInventoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LfpInventory).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "lfp/v1/accounts/{accountsId}/lfpInventories:insert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertAccountsLfpInventoriesRequest>;

export type InsertAccountsLfpInventoriesResponse = LfpInventory;
export const InsertAccountsLfpInventoriesResponse = LfpInventory;

export type InsertAccountsLfpInventoriesError = DefaultErrors;

/** Inserts a `LfpInventory` resource for the given target merchant account. If the resource already exists, it will be replaced. The inventory automatically expires after 30 days. */
export const insertAccountsLfpInventories: API.OperationMethod<
  InsertAccountsLfpInventoriesRequest,
  InsertAccountsLfpInventoriesResponse,
  InsertAccountsLfpInventoriesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertAccountsLfpInventoriesRequest,
  output: InsertAccountsLfpInventoriesResponse,
  errors: [],
}));

export interface InsertAccountsLfpSalesRequest {
  /** Required. The LFP provider account. Format: `accounts/{lfp_partner}` */
  parent: string;
  /** Request body */
  body?: LfpSale;
}

export const InsertAccountsLfpSalesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LfpSale).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "lfp/v1/accounts/{accountsId}/lfpSales:insert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertAccountsLfpSalesRequest>;

export type InsertAccountsLfpSalesResponse = LfpSale;
export const InsertAccountsLfpSalesResponse = LfpSale;

export type InsertAccountsLfpSalesError = DefaultErrors;

/** Inserts a `LfpSale` for the given merchant. */
export const insertAccountsLfpSales: API.OperationMethod<
  InsertAccountsLfpSalesRequest,
  InsertAccountsLfpSalesResponse,
  InsertAccountsLfpSalesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertAccountsLfpSalesRequest,
  output: InsertAccountsLfpSalesResponse,
  errors: [],
}));
