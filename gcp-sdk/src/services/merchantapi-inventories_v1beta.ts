// ==========================================================================
// Merchant API (merchantapi inventories_v1beta)
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
  version: "inventories_v1beta",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Interval {
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
}

export const Interval: Schema.Schema<Interval> = Schema.suspend(() =>
  Schema.Struct({
    endTime: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

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

export interface CustomAttribute {
  /** Subattributes within this attribute group. If `group_values` is not empty, `value` must be empty. */
  groupValues?: Array<CustomAttribute>;
  /** The name of the attribute. */
  name?: string;
  /** The value of the attribute. If `value` is not empty, `group_values` must be empty. */
  value?: string;
}

export const CustomAttribute: Schema.Schema<CustomAttribute> = Schema.suspend(
  () =>
    Schema.Struct({
      groupValues: Schema.optional(Schema.Array(CustomAttribute)),
      name: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CustomAttribute",
}) as any as Schema.Schema<CustomAttribute>;

export interface LocalInventory {
  /** Output only. The account that owns the product. This field will be ignored if set by the client. */
  account?: string;
  /** Required. Immutable. Store code (the store ID from your Business Profile) of the physical store the product is sold in. See the [Local product inventory data specification](https://support.google.com/merchants/answer/3061342) for more information. */
  storeCode?: string;
  /** Optional. Sale price of the product at this store. Mandatory if `salePriceEffectiveDate` is defined. */
  salePrice?: Price;
  /** Optional. The `TimePeriod` of the sale at this store. */
  salePriceEffectiveDate?: Interval;
  /** Output only. The name of the `LocalInventory` resource. Format: `accounts/{account}/products/{product}/localInventories/{store_code}` The `{product}` segment is a unique identifier for the product. This identifier must be unique within a merchant account and generally follows the structure: `content_language~feed_label~offer_id`. Example: `en~US~sku123` For legacy local products, the structure is: `local~content_language~feed_label~offer_id`. Example: `local~en~US~sku123` The format of the `{product}` segment in the URL is automatically detected by the server, supporting two options: 1. **Encoded Format**: The `{product}` segment is an unpadded base64url encoded string (RFC 4648 Section 5). The decoded string must result in the `content_language~feed_label~offer_id` structure. This encoding MUST be used if any part of the product identifier (like `offer_id`) contains characters such as `/`, `%`, or `~`. * Example: To represent the product ID `en~US~sku/123` for `store_code` "store123", the `{product}` segment must be the base64url encoding of this string, which is `ZW5-VVMtc2t1LzEyMw`. The full resource name for the local inventory would be `accounts/123/products/ZW5-VVMtc2t1LzEyMw/localInventories/store123`. 2. **Plain Format**: The `{product}` segment is the tilde-separated string `content_language~feed_label~offer_id`. This format is suitable only when `content_language`, `feed_label`, and `offer_id` do not contain URL-problematic characters like `/`, `%`, or `~`. We recommend using the **Encoded Format** for all product IDs to ensure correct parsing, especially those containing special characters. The presence of tilde (`~`) characters in the `{product}` segment is used to differentiate between the two formats. Note: For calls to the v1beta version, the plain format for the product segment is `channel~content_language~feed_label~offer_id`. For example, the full resource name for a local inventory at `store_code` "store123" would be: `accounts/123/products/online~en~US~sku123/localInventories/store123`. */
  name?: string;
  /** Availability of the product at this store. For accepted attribute values, see the [local product inventory data specification](https://support.google.com/merchants/answer/3061342) */
  availability?: string;
  /** Supported pickup method for this product. Unless the value is `"not supported"`, this field must be submitted together with `pickupSla`. For accepted attribute values, see the [local product inventory data specification](https://support.google.com/merchants/answer/3061342) */
  pickupMethod?: string;
  /** Optional. Price of the product at this store. */
  price?: Price;
  /** Relative time period from the order date for an order for this product, from this store, to be ready for pickup. Must be submitted with `pickupMethod`. For accepted attribute values, see the [local product inventory data specification](https://support.google.com/merchants/answer/3061342) */
  pickupSla?: string;
  /** Location of the product inside the store. Maximum length is 20 bytes. */
  instoreProductLocation?: string;
  /** A list of custom (merchant-provided) attributes. You can also use `CustomAttribute` to submit any attribute of the data specification in its generic form. */
  customAttributes?: Array<CustomAttribute>;
  /** Quantity of the product available at this store. Must be greater than or equal to zero. */
  quantity?: string;
}

export const LocalInventory: Schema.Schema<LocalInventory> = Schema.suspend(
  () =>
    Schema.Struct({
      account: Schema.optional(Schema.String),
      storeCode: Schema.optional(Schema.String),
      salePrice: Schema.optional(Price),
      salePriceEffectiveDate: Schema.optional(Interval),
      name: Schema.optional(Schema.String),
      availability: Schema.optional(Schema.String),
      pickupMethod: Schema.optional(Schema.String),
      price: Schema.optional(Price),
      pickupSla: Schema.optional(Schema.String),
      instoreProductLocation: Schema.optional(Schema.String),
      customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
      quantity: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "LocalInventory",
}) as any as Schema.Schema<LocalInventory>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ProductChange {
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
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
  /** Countries that have the change (if applicable). Represented in the ISO 3166 format. */
  regionCode?: string;
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() =>
  Schema.Struct({
    newValue: Schema.optional(Schema.String),
    reportingContext: Schema.optional(Schema.String),
    oldValue: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ProductChange",
}) as any as Schema.Schema<ProductChange>;

export interface RegionalInventory {
  /** Output only. The account that owns the product. This field will be ignored if set by the client. */
  account?: string;
  /** Availability of the product in this region. For accepted attribute values, see the [regional product inventory data specification](https://support.google.com/merchants/answer/14644124). */
  availability?: string;
  /** Output only. The name of the `RegionalInventory` resource. Format: `accounts/{account}/products/{product}/regionalInventories/{region}` The `{product}` segment is a unique identifier for the product. This identifier must be unique within a merchant account and generally follows the structure: `content_language~feed_label~offer_id`. Example: `en~US~sku123` For legacy local products, the structure is: `local~content_language~feed_label~offer_id`. Example: `local~en~US~sku123` The format of the `{product}` segment in the URL is automatically detected by the server, supporting two options: 1. **Encoded Format**: The `{product}` segment is an unpadded base64url encoded string (RFC 4648 Section 5). The decoded string must result in the `content_language~feed_label~offer_id` structure. This encoding MUST be used if any part of the product identifier (like `offer_id`) contains characters such as `/`, `%`, or `~`. * Example: To represent the product ID `en~US~sku/123` for `region` "region123", the `{product}` segment must be the base64url encoding of this string, which is `ZW5-VVMtc2t1LzEyMw`. The full resource name for the regional inventory would be `accounts/123/products/ZW5-VVMtc2t1LzEyMw/regionalInventories/region123`. 2. **Plain Format**: The `{product}` segment is the tilde-separated string `content_language~feed_label~offer_id`. This format is suitable only when `content_language`, `feed_label`, and `offer_id` do not contain URL-problematic characters like `/`, `%`, or `~`. We recommend using the **Encoded Format** for all product IDs to ensure correct parsing, especially those containing special characters. The presence of tilde (`~`) characters in the `{product}` segment is used to differentiate between the two formats. Note: For calls to the v1beta version, the plain format for the product segment is `channel~content_language~feed_label~offer_id`. For example, the full resource name for a regional inventory in `region` "region123" would be: `accounts/123/products/online~en~US~sku123/regionalInventories/region123`. */
  name?: string;
  /** Required. Immutable. ID of the region for this `RegionalInventory` resource. See the [Regional availability and pricing](https://support.google.com/merchants/answer/9698880) for more details. */
  region?: string;
  /** Optional. The `TimePeriod` of the sale price in this region. */
  salePriceEffectiveDate?: Interval;
  /** Optional. Sale price of the product in this region. Mandatory if `salePriceEffectiveDate` is defined. */
  salePrice?: Price;
  /** Optional. Price of the product in this region. */
  price?: Price;
  /** A list of custom (merchant-provided) attributes. You can also use `CustomAttribute` to submit any attribute of the data specification in its generic form. */
  customAttributes?: Array<CustomAttribute>;
}

export const RegionalInventory: Schema.Schema<RegionalInventory> =
  Schema.suspend(() =>
    Schema.Struct({
      account: Schema.optional(Schema.String),
      availability: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      region: Schema.optional(Schema.String),
      salePriceEffectiveDate: Schema.optional(Interval),
      salePrice: Schema.optional(Price),
      price: Schema.optional(Price),
      customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
    }),
  ).annotate({
    identifier: "RegionalInventory",
  }) as any as Schema.Schema<RegionalInventory>;

export interface ListRegionalInventoriesResponse {
  /** The `RegionalInventory` resources for the given product from the specified account. */
  regionalInventories?: Array<RegionalInventory>;
  /** A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListRegionalInventoriesResponse: Schema.Schema<ListRegionalInventoriesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      regionalInventories: Schema.optional(Schema.Array(RegionalInventory)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListRegionalInventoriesResponse",
  }) as any as Schema.Schema<ListRegionalInventoriesResponse>;

export interface ListLocalInventoriesResponse {
  /** The `LocalInventory` resources for the given product from the specified account. */
  localInventories?: Array<LocalInventory>;
  /** A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListLocalInventoriesResponse: Schema.Schema<ListLocalInventoriesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      localInventories: Schema.optional(Schema.Array(LocalInventory)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocalInventoriesResponse",
  }) as any as Schema.Schema<ListLocalInventoriesResponse>;

export interface ProductStatusChangeMessage {
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** The product id. */
  resourceId?: string;
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> =
  Schema.suspend(() =>
    Schema.Struct({
      managingAccount: Schema.optional(Schema.String),
      changes: Schema.optional(Schema.Array(ProductChange)),
      resourceType: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      expirationTime: Schema.optional(Schema.String),
      eventTime: Schema.optional(Schema.String),
      account: Schema.optional(Schema.String),
      resourceId: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStatusChangeMessage",
  }) as any as Schema.Schema<ProductStatusChangeMessage>;

// ==========================================================================
// Operations
// ==========================================================================

export interface DeleteAccountsProductsLocalInventoriesRequest {
  /** Required. The name of the local inventory for the given product to delete. Format: `accounts/{account}/products/{product}/localInventories/{store_code}` The `{product}` segment is a unique identifier for the product. This identifier must be unique within a merchant account and generally follows the structure: `content_language~feed_label~offer_id`. Example: `en~US~sku123` For legacy local products, the structure is: `local~content_language~feed_label~offer_id`. Example: `local~en~US~sku123` The format of the `{product}` segment in the URL is automatically detected by the server, supporting two options: 1. **Encoded Format**: The `{product}` segment is an unpadded base64url encoded string (RFC 4648 Section 5). The decoded string must result in the `content_language~feed_label~offer_id` structure. This encoding MUST be used if any part of the product identifier (like `offer_id`) contains characters such as `/`, `%`, or `~`. * Example: To represent the product ID `en~US~sku/123` for `store_code` "store123", the `{product}` segment must be the base64url encoding of this string, which is `ZW5-VVMtc2t1LzEyMw`. The full resource name for the local inventory would be `accounts/123/products/ZW5-VVMtc2t1LzEyMw/localInventories/store123`. 2. **Plain Format**: The `{product}` segment is the tilde-separated string `content_language~feed_label~offer_id`. This format is suitable only when `content_language`, `feed_label`, and `offer_id` do not contain URL-problematic characters like `/`, `%`, or `~`. We recommend using the **Encoded Format** for all product IDs to ensure correct parsing, especially those containing special characters. The presence of tilde (`~`) characters in the `{product}` segment is used to differentiate between the two formats. Note: For calls to the v1beta version, the plain format for the product segment is `channel~content_language~feed_label~offer_id`. For example, the full resource name for a local inventory at `store_code` "store123" would be: `accounts/123/products/online~en~US~sku123/localInventories/store123`. */
  name: string;
}

export const DeleteAccountsProductsLocalInventoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "inventories/v1beta/accounts/{accountsId}/products/{productsId}/localInventories/{localInventoriesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsProductsLocalInventoriesRequest>;

export type DeleteAccountsProductsLocalInventoriesResponse = Empty;
export const DeleteAccountsProductsLocalInventoriesResponse = Empty;

export type DeleteAccountsProductsLocalInventoriesError = DefaultErrors;

/** Deletes the specified `LocalInventory` from the given product in your merchant account. It might take a up to an hour for the `LocalInventory` to be deleted from the specific product. Once you have received a successful delete response, wait for that period before attempting a delete again. */
export const deleteAccountsProductsLocalInventories: API.OperationMethod<
  DeleteAccountsProductsLocalInventoriesRequest,
  DeleteAccountsProductsLocalInventoriesResponse,
  DeleteAccountsProductsLocalInventoriesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsProductsLocalInventoriesRequest,
  output: DeleteAccountsProductsLocalInventoriesResponse,
  errors: [],
}));

export interface ListAccountsProductsLocalInventoriesRequest {
  /** A page token, received from a previous `ListLocalInventories` call. Provide the page token to retrieve the subsequent page. When paginating, all other parameters provided to `ListLocalInventories` must match the call that provided the page token. The token returned as nextPageToken in the response to the previous request. */
  pageToken?: string;
  /** Required. The `name` of the parent product to list local inventories for. Format: `accounts/{account}/products/{product}` The `{product}` segment is a unique identifier for the product. This identifier must be unique within a merchant account and generally follows the structure: `content_language~feed_label~offer_id`. Example: `en~US~sku123` For legacy local products, the structure is: `local~content_language~feed_label~offer_id`. Example: `local~en~US~sku123` The format of the `{product}` segment in the URL is automatically detected by the server, supporting two options: 1. **Encoded Format**: The `{product}` segment is an unpadded base64url encoded string (RFC 4648 Section 5). The decoded string must result in the `content_language~feed_label~offer_id` structure. This encoding MUST be used if any part of the product identifier (like `offer_id`) contains characters such as `/`, `%`, or `~`. * Example: To represent the product ID `en~US~sku/123`, the `{product}` segment must be the base64url encoding of this string, which is `ZW5-VVMtc2t1LzEyMw`. The full resource name for the product would be `accounts/123/products/ZW5-VVMtc2t1LzEyMw`. 2. **Plain Format**: The `{product}` segment is the tilde-separated string `content_language~feed_label~offer_id`. This format is suitable only when `content_language`, `feed_label`, and `offer_id` do not contain URL-problematic characters like `/`, `%`, or `~`. We recommend using the **Encoded Format** for all product IDs to ensure correct parsing, especially those containing special characters. The presence of tilde (`~`) characters in the `{product}` segment is used to differentiate between the two formats. Note: For calls to the v1beta version, the plain format is `channel~content_language~feed_label~offer_id`, for example: `accounts/123/products/online~en~US~sku123`. */
  parent: string;
  /** The maximum number of `LocalInventory` resources for the given product to return. The service returns fewer than this value if the number of inventories for the given product is less that than the `pageSize`. The default value is 25000. The maximum value is 25000; If a value higher than the maximum is specified, then the `pageSize` will default to the maximum */
  pageSize?: number;
}

export const ListAccountsProductsLocalInventoriesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "inventories/v1beta/accounts/{accountsId}/products/{productsId}/localInventories",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsProductsLocalInventoriesRequest>;

export type ListAccountsProductsLocalInventoriesResponse =
  ListLocalInventoriesResponse;
export const ListAccountsProductsLocalInventoriesResponse =
  ListLocalInventoriesResponse;

export type ListAccountsProductsLocalInventoriesError = DefaultErrors;

/** Lists the `LocalInventory` resources for the given product in your merchant account. The response might contain fewer items than specified by `pageSize`. If `pageToken` was returned in previous request, it can be used to obtain additional results. `LocalInventory` resources are listed per product for a given account. */
export const listAccountsProductsLocalInventories: API.PaginatedOperationMethod<
  ListAccountsProductsLocalInventoriesRequest,
  ListAccountsProductsLocalInventoriesResponse,
  ListAccountsProductsLocalInventoriesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsProductsLocalInventoriesRequest,
  output: ListAccountsProductsLocalInventoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface InsertAccountsProductsLocalInventoriesRequest {
  /** Required. The account and product where this inventory will be inserted. Format: `accounts/{account}/products/{product}` The `{product}` segment is a unique identifier for the product. This identifier must be unique within a merchant account and generally follows the structure: `content_language~feed_label~offer_id`. Example: `en~US~sku123` For legacy local products, the structure is: `local~content_language~feed_label~offer_id`. Example: `local~en~US~sku123` The format of the `{product}` segment in the URL is automatically detected by the server, supporting two options: 1. **Encoded Format**: The `{product}` segment is an unpadded base64url encoded string (RFC 4648 Section 5). The decoded string must result in the `content_language~feed_label~offer_id` structure. This encoding MUST be used if any part of the product identifier (like `offer_id`) contains characters such as `/`, `%`, or `~`. * Example: To represent the product ID `en~US~sku/123`, the `{product}` segment must be the base64url encoding of this string, which is `ZW5-VVMtc2t1LzEyMw`. The full resource name for the product would be `accounts/123/products/ZW5-VVMtc2t1LzEyMw`. 2. **Plain Format**: The `{product}` segment is the tilde-separated string `content_language~feed_label~offer_id`. This format is suitable only when `content_language`, `feed_label`, and `offer_id` do not contain URL-problematic characters like `/`, `%`, or `~`. We recommend using the **Encoded Format** for all product IDs to ensure correct parsing, especially those containing special characters. The presence of tilde (`~`) characters in the `{product}` segment is used to differentiate between the two formats. Note: For calls to the v1beta version, the plain format is `channel~content_language~feed_label~offer_id`, for example: `accounts/123/products/online~en~US~sku123`. */
  parent: string;
  /** Request body */
  body?: LocalInventory;
}

export const InsertAccountsProductsLocalInventoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LocalInventory).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "inventories/v1beta/accounts/{accountsId}/products/{productsId}/localInventories:insert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertAccountsProductsLocalInventoriesRequest>;

export type InsertAccountsProductsLocalInventoriesResponse = LocalInventory;
export const InsertAccountsProductsLocalInventoriesResponse = LocalInventory;

export type InsertAccountsProductsLocalInventoriesError = DefaultErrors;

/** Inserts a `LocalInventory` resource to a product in your merchant account. Replaces the full `LocalInventory` resource if an entry with the same `storeCode` already exists for the product. It might take up to 30 minutes for the new or updated `LocalInventory` resource to appear in products. */
export const insertAccountsProductsLocalInventories: API.OperationMethod<
  InsertAccountsProductsLocalInventoriesRequest,
  InsertAccountsProductsLocalInventoriesResponse,
  InsertAccountsProductsLocalInventoriesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertAccountsProductsLocalInventoriesRequest,
  output: InsertAccountsProductsLocalInventoriesResponse,
  errors: [],
}));

export interface DeleteAccountsProductsRegionalInventoriesRequest {
  /** Required. The name of the `RegionalInventory` resource to delete. Format: `accounts/{account}/products/{product}/regionalInventories/{region}` The `{product}` segment is a unique identifier for the product. This identifier must be unique within a merchant account and generally follows the structure: `content_language~feed_label~offer_id`. Example: `en~US~sku123` For legacy local products, the structure is: `local~content_language~feed_label~offer_id`. Example: `local~en~US~sku123` The format of the `{product}` segment in the URL is automatically detected by the server, supporting two options: 1. **Encoded Format**: The `{product}` segment is an unpadded base64url encoded string (RFC 4648 Section 5). The decoded string must result in the `content_language~feed_label~offer_id` structure. This encoding MUST be used if any part of the product identifier (like `offer_id`) contains characters such as `/`, `%`, or `~`. * Example: To represent the product ID `en~US~sku/123` for `region` "region123", the `{product}` segment must be the base64url encoding of this string, which is `ZW5-VVMtc2t1LzEyMw`. The full resource name for the regional inventory would be `accounts/123/products/ZW5-VVMtc2t1LzEyMw/regionalInventories/region123`. 2. **Plain Format**: The `{product}` segment is the tilde-separated string `content_language~feed_label~offer_id`. This format is suitable only when `content_language`, `feed_label`, and `offer_id` do not contain URL-problematic characters like `/`, `%`, or `~`. We recommend using the **Encoded Format** for all product IDs to ensure correct parsing, especially those containing special characters. The presence of tilde (`~`) characters in the `{product}` segment is used to differentiate between the two formats. Note: For calls to the v1beta version, the plain format for the product segment is `channel~content_language~feed_label~offer_id`. For example, the full resource name for a regional inventory in `region` "region123" would be: `accounts/123/products/online~en~US~sku123/regionalInventories/region123`. */
  name: string;
}

export const DeleteAccountsProductsRegionalInventoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "inventories/v1beta/accounts/{accountsId}/products/{productsId}/regionalInventories/{regionalInventoriesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsProductsRegionalInventoriesRequest>;

export type DeleteAccountsProductsRegionalInventoriesResponse = Empty;
export const DeleteAccountsProductsRegionalInventoriesResponse = Empty;

export type DeleteAccountsProductsRegionalInventoriesError = DefaultErrors;

/** Deletes the specified `RegionalInventory` resource from the given product in your merchant account. It might take up to an hour for the `RegionalInventory` to be deleted from the specific product. Once you have received a successful delete response, wait for that period before attempting a delete again. */
export const deleteAccountsProductsRegionalInventories: API.OperationMethod<
  DeleteAccountsProductsRegionalInventoriesRequest,
  DeleteAccountsProductsRegionalInventoriesResponse,
  DeleteAccountsProductsRegionalInventoriesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsProductsRegionalInventoriesRequest,
  output: DeleteAccountsProductsRegionalInventoriesResponse,
  errors: [],
}));

export interface ListAccountsProductsRegionalInventoriesRequest {
  /** Required. The `name` of the parent product to list `RegionalInventory` resources for. Format: `accounts/{account}/products/{product}` The `{product}` segment is a unique identifier for the product. This identifier must be unique within a merchant account and generally follows the structure: `content_language~feed_label~offer_id`. Example: `en~US~sku123` For legacy local products, the structure is: `local~content_language~feed_label~offer_id`. Example: `local~en~US~sku123` The format of the `{product}` segment in the URL is automatically detected by the server, supporting two options: 1. **Encoded Format**: The `{product}` segment is an unpadded base64url encoded string (RFC 4648 Section 5). The decoded string must result in the `content_language~feed_label~offer_id` structure. This encoding MUST be used if any part of the product identifier (like `offer_id`) contains characters such as `/`, `%`, or `~`. * Example: To represent the product ID `en~US~sku/123`, the `{product}` segment must be the base64url encoding of this string, which is `ZW5-VVMtc2t1LzEyMw`. The full resource name for the product would be `accounts/123/products/ZW5-VVMtc2t1LzEyMw`. 2. **Plain Format**: The `{product}` segment is the tilde-separated string `content_language~feed_label~offer_id`. This format is suitable only when `content_language`, `feed_label`, and `offer_id` do not contain URL-problematic characters like `/`, `%`, or `~`. We recommend using the **Encoded Format** for all product IDs to ensure correct parsing, especially those containing special characters. The presence of tilde (`~`) characters in the `{product}` segment is used to differentiate between the two formats. Note: For calls to the v1beta version, the plain format is `channel~content_language~feed_label~offer_id`, for example: `accounts/123/products/online~en~US~sku123`. */
  parent: string;
  /** The maximum number of `RegionalInventory` resources for the given product to return. The service returns fewer than this value if the number of inventories for the given product is less that than the `pageSize`. The default value is 25000. The maximum value is 100000; If a value higher than the maximum is specified, then the `pageSize` will default to the maximum. */
  pageSize?: number;
  /** A page token, received from a previous `ListRegionalInventories` call. Provide the page token to retrieve the subsequent page. When paginating, all other parameters provided to `ListRegionalInventories` must match the call that provided the page token. The token returned as nextPageToken in the response to the previous request. */
  pageToken?: string;
}

export const ListAccountsProductsRegionalInventoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "inventories/v1beta/accounts/{accountsId}/products/{productsId}/regionalInventories",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsProductsRegionalInventoriesRequest>;

export type ListAccountsProductsRegionalInventoriesResponse =
  ListRegionalInventoriesResponse;
export const ListAccountsProductsRegionalInventoriesResponse =
  ListRegionalInventoriesResponse;

export type ListAccountsProductsRegionalInventoriesError = DefaultErrors;

/** Lists the `RegionalInventory` resources for the given product in your merchant account. The response might contain fewer items than specified by `pageSize`. If `pageToken` was returned in previous request, it can be used to obtain additional results. `RegionalInventory` resources are listed per product for a given account. */
export const listAccountsProductsRegionalInventories: API.PaginatedOperationMethod<
  ListAccountsProductsRegionalInventoriesRequest,
  ListAccountsProductsRegionalInventoriesResponse,
  ListAccountsProductsRegionalInventoriesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsProductsRegionalInventoriesRequest,
  output: ListAccountsProductsRegionalInventoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface InsertAccountsProductsRegionalInventoriesRequest {
  /** Required. The account and product where this inventory will be inserted. Format: `accounts/{account}/products/{product}` The `{product}` segment is a unique identifier for the product. This identifier must be unique within a merchant account and generally follows the structure: `content_language~feed_label~offer_id`. Example: `en~US~sku123` For legacy local products, the structure is: `local~content_language~feed_label~offer_id`. Example: `local~en~US~sku123` The format of the `{product}` segment in the URL is automatically detected by the server, supporting two options: 1. **Encoded Format**: The `{product}` segment is an unpadded base64url encoded string (RFC 4648 Section 5). The decoded string must result in the `content_language~feed_label~offer_id` structure. This encoding MUST be used if any part of the product identifier (like `offer_id`) contains characters such as `/`, `%`, or `~`. * Example: To represent the product ID `en~US~sku/123`, the `{product}` segment must be the base64url encoding of this string, which is `ZW5-VVMtc2t1LzEyMw`. The full resource name for the product would be `accounts/123/products/ZW5-VVMtc2t1LzEyMw`. 2. **Plain Format**: The `{product}` segment is the tilde-separated string `content_language~feed_label~offer_id`. This format is suitable only when `content_language`, `feed_label`, and `offer_id` do not contain URL-problematic characters like `/`, `%`, or `~`. We recommend using the **Encoded Format** for all product IDs to ensure correct parsing, especially those containing special characters. The presence of tilde (`~`) characters in the `{product}` segment is used to differentiate between the two formats. Note: For calls to the v1beta version, the plain format is `channel~content_language~feed_label~offer_id`, for example: `accounts/123/products/online~en~US~sku123`. */
  parent: string;
  /** Request body */
  body?: RegionalInventory;
}

export const InsertAccountsProductsRegionalInventoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RegionalInventory).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "inventories/v1beta/accounts/{accountsId}/products/{productsId}/regionalInventories:insert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertAccountsProductsRegionalInventoriesRequest>;

export type InsertAccountsProductsRegionalInventoriesResponse =
  RegionalInventory;
export const InsertAccountsProductsRegionalInventoriesResponse =
  RegionalInventory;

export type InsertAccountsProductsRegionalInventoriesError = DefaultErrors;

/** Inserts a `RegionalInventory` to a given product in your merchant account. Replaces the full `RegionalInventory` resource if an entry with the same `region` already exists for the product. It might take up to 30 minutes for the new or updated `RegionalInventory` resource to appear in products. */
export const insertAccountsProductsRegionalInventories: API.OperationMethod<
  InsertAccountsProductsRegionalInventoriesRequest,
  InsertAccountsProductsRegionalInventoriesResponse,
  InsertAccountsProductsRegionalInventoriesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertAccountsProductsRegionalInventoriesRequest,
  output: InsertAccountsProductsRegionalInventoriesResponse,
  errors: [],
}));
