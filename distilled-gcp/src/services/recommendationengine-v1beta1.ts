// ==========================================================================
// Recommendations AI (Beta) (recommendationengine v1beta1)
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
  name: "recommendationengine",
  version: "v1beta1",
  rootUrl: "https://recommendationengine.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse {
  /** Number of user events that were joined with latest catalog items. */
  rejoinedUserEventsCount?: string;
}

export const GoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse: Schema.Schema<GoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  rejoinedUserEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse>;

export interface GoogleCloudRecommendationengineV1beta1Image {
  /** Required. URL of the image with a length limit of 5 KiB. */
  uri?: string;
  /** Optional. Width of the image in number of pixels. */
  width?: number;
  /** Optional. Height of the image in number of pixels. */
  height?: number;
}

export const GoogleCloudRecommendationengineV1beta1Image: Schema.Schema<GoogleCloudRecommendationengineV1beta1Image> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1Image" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1Image>;

export interface GoogleCloudRecommendationengineV1beta1ProductCatalogItemExactPrice {
  /** Optional. Display price of the product. */
  displayPrice?: number;
  /** Optional. Price of the product without any discount. If zero, by default set to be the 'displayPrice'. */
  originalPrice?: number;
}

export const GoogleCloudRecommendationengineV1beta1ProductCatalogItemExactPrice: Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductCatalogItemExactPrice> = Schema.suspend(() => Schema.Struct({
  displayPrice: Schema.optional(Schema.Number),
  originalPrice: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ProductCatalogItemExactPrice" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductCatalogItemExactPrice>;

export interface GoogleCloudRecommendationengineV1beta1ProductCatalogItemPriceRange {
  /** Required. The minimum product price. */
  min?: number;
  /** Required. The maximum product price. */
  max?: number;
}

export const GoogleCloudRecommendationengineV1beta1ProductCatalogItemPriceRange: Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductCatalogItemPriceRange> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.Number),
  max: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ProductCatalogItemPriceRange" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductCatalogItemPriceRange>;

export interface GoogleCloudRecommendationengineV1beta1ProductCatalogItem {
  /** Optional. Canonical URL directly linking to the item detail page with a length limit of 5 KiB.. */
  canonicalProductUri?: string;
  /** Optional. The available quantity of the item. */
  availableQuantity?: string;
  /** Optional. Online stock state of the catalog item. Default is `IN_STOCK`. */
  stockState?: "STOCK_STATE_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "PREORDER" | "BACKORDER" | (string & {});
  /** Optional. Product images for the catalog item. */
  images?: Array<GoogleCloudRecommendationengineV1beta1Image>;
  /** Optional. A map to pass the costs associated with the product. For example: {"manufacturing": 45.5} The profit of selling this item is computed like so: * If 'exactPrice' is provided, profit = displayPrice - sum(costs) * If 'priceRange' is provided, profit = minPrice - sum(costs) */
  costs?: Record<string, number>;
  /** Optional. Only required if the price is set. Currency code for price/costs. Use three-character ISO-4217 code. */
  currencyCode?: string;
  /** Optional. The exact product price. */
  exactPrice?: GoogleCloudRecommendationengineV1beta1ProductCatalogItemExactPrice;
  /** Optional. The product price range. */
  priceRange?: GoogleCloudRecommendationengineV1beta1ProductCatalogItemPriceRange;
}

export const GoogleCloudRecommendationengineV1beta1ProductCatalogItem: Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductCatalogItem> = Schema.suspend(() => Schema.Struct({
  canonicalProductUri: Schema.optional(Schema.String),
  availableQuantity: Schema.optional(Schema.String),
  stockState: Schema.optional(Schema.String),
  images: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1Image)),
  costs: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
  currencyCode: Schema.optional(Schema.String),
  exactPrice: Schema.optional(GoogleCloudRecommendationengineV1beta1ProductCatalogItemExactPrice),
  priceRange: Schema.optional(GoogleCloudRecommendationengineV1beta1ProductCatalogItemPriceRange),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ProductCatalogItem" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductCatalogItem>;

export interface GoogleCloudRecommendationengineV1alphaRejoinCatalogMetadata {
}

export const GoogleCloudRecommendationengineV1alphaRejoinCatalogMetadata: Schema.Schema<GoogleCloudRecommendationengineV1alphaRejoinCatalogMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecommendationengineV1alphaRejoinCatalogMetadata" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1alphaRejoinCatalogMetadata>;

export interface GoogleCloudRecommendationengineV1beta1ImportMetadata {
  /** Count of entries that encountered errors while processing. */
  failureCount?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
  /** Id of the request / operation. This is parroting back the requestId that was passed in the request. */
  requestId?: string;
  /** Operation create time. */
  createTime?: string;
  /** Name of the operation. */
  operationName?: string;
  /** Count of entries that were processed successfully. */
  successCount?: string;
}

export const GoogleCloudRecommendationengineV1beta1ImportMetadata: Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportMetadata> = Schema.suspend(() => Schema.Struct({
  failureCount: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  operationName: Schema.optional(Schema.String),
  successCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ImportMetadata" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportMetadata>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  error: Schema.optional(GoogleRpcStatus),
  name: Schema.optional(Schema.String),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleCloudRecommendationengineV1beta1FeatureMapStringList {
  /** String feature value with a length limit of 128 bytes. */
  value?: Array<string>;
}

export const GoogleCloudRecommendationengineV1beta1FeatureMapStringList: Schema.Schema<GoogleCloudRecommendationengineV1beta1FeatureMapStringList> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1FeatureMapStringList" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1FeatureMapStringList>;

export interface GoogleCloudRecommendationengineV1beta1FeatureMapFloatList {
  /** Float feature value. */
  value?: Array<number>;
}

export const GoogleCloudRecommendationengineV1beta1FeatureMapFloatList: Schema.Schema<GoogleCloudRecommendationengineV1beta1FeatureMapFloatList> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1FeatureMapFloatList" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1FeatureMapFloatList>;

export interface GoogleCloudRecommendationengineV1beta1FeatureMap {
  /** Categorical features that can take on one of a limited number of possible values. Some examples would be the brand/maker of a product, or country of a customer. Feature names and values must be UTF-8 encoded strings. For example: `{ "colors": {"value": ["yellow", "green"]}, "sizes": {"value":["S", "M"]}` */
  categoricalFeatures?: Record<string, GoogleCloudRecommendationengineV1beta1FeatureMapStringList>;
  /** Numerical features. Some examples would be the height/weight of a product, or age of a customer. Feature names must be UTF-8 encoded strings. For example: `{ "lengths_cm": {"value":[2.3, 15.4]}, "heights_cm": {"value":[8.1, 6.4]} }` */
  numericalFeatures?: Record<string, GoogleCloudRecommendationengineV1beta1FeatureMapFloatList>;
}

export const GoogleCloudRecommendationengineV1beta1FeatureMap: Schema.Schema<GoogleCloudRecommendationengineV1beta1FeatureMap> = Schema.suspend(() => Schema.Struct({
  categoricalFeatures: Schema.optional(Schema.Record(Schema.String, GoogleCloudRecommendationengineV1beta1FeatureMapStringList)),
  numericalFeatures: Schema.optional(Schema.Record(Schema.String, GoogleCloudRecommendationengineV1beta1FeatureMapFloatList)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1FeatureMap" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1FeatureMap>;

export interface GoogleCloudRecommendationengineV1beta1PurchaseTransaction {
  /** Optional. All the costs associated with the product. These can be manufacturing costs, shipping expenses not borne by the end user, or any other costs. Total product cost such that profit = revenue - (sum(taxes) + sum(costs)) If product_cost is not set, then profit = revenue - tax - shipping - sum(CatalogItem.costs). If CatalogItem.cost is not specified for one of the items, CatalogItem.cost based profit *cannot* be calculated for this Transaction. */
  costs?: Record<string, number>;
  /** Required. Total revenue or grand total associated with the transaction. This value include shipping, tax, or other adjustments to total revenue that you want to include as part of your revenue calculations. This field is not required if the event type is `refund`. */
  revenue?: number;
  /** Optional. The transaction ID with a length limit of 128 bytes. */
  id?: string;
  /** Required. Currency code. Use three-character ISO-4217 code. This field is not required if the event type is `refund`. */
  currencyCode?: string;
  /** Optional. All the taxes associated with the transaction. */
  taxes?: Record<string, number>;
}

export const GoogleCloudRecommendationengineV1beta1PurchaseTransaction: Schema.Schema<GoogleCloudRecommendationengineV1beta1PurchaseTransaction> = Schema.suspend(() => Schema.Struct({
  costs: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
  revenue: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  taxes: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1PurchaseTransaction" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1PurchaseTransaction>;

export interface GoogleCloudRecommendationengineV1beta1ProductDetail {
  /** Optional. Item stock state. If provided, this overrides the stock state in Catalog for items in this event. */
  stockState?: "STOCK_STATE_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "PREORDER" | "BACKORDER" | (string & {});
  /** Optional. Extra features associated with a product in the user event. */
  itemAttributes?: GoogleCloudRecommendationengineV1beta1FeatureMap;
  /** Optional. Quantity of the products in stock when a user event happens. Optional. If provided, this overrides the available quantity in Catalog for this event. and can only be set if `stock_status` is set to `IN_STOCK`. Note that if an item is out of stock, you must set the `stock_state` field to be `OUT_OF_STOCK`. Leaving this field unspecified / as zero is not sufficient to mark the item out of stock. */
  availableQuantity?: number;
  /** Required. Catalog item ID. UTF-8 encoded string with a length limit of 128 characters. */
  id?: string;
  /** Optional. Currency code for price/costs. Use three-character ISO-4217 code. Required only if originalPrice or displayPrice is set. */
  currencyCode?: string;
  /** Optional. Display price of the product (e.g. discounted price). If provided, this will override the display price in Catalog for this product. */
  displayPrice?: number;
  /** Optional. Quantity of the product associated with the user event. For example, this field will be 2 if two products are added to the shopping cart for `add-to-cart` event. Required for `add-to-cart`, `add-to-list`, `remove-from-cart`, `checkout-start`, `purchase-complete`, `refund` event types. */
  quantity?: number;
  /** Optional. Original price of the product. If provided, this will override the original price in Catalog for this product. */
  originalPrice?: number;
}

export const GoogleCloudRecommendationengineV1beta1ProductDetail: Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductDetail> = Schema.suspend(() => Schema.Struct({
  stockState: Schema.optional(Schema.String),
  itemAttributes: Schema.optional(GoogleCloudRecommendationengineV1beta1FeatureMap),
  availableQuantity: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  displayPrice: Schema.optional(Schema.Number),
  quantity: Schema.optional(Schema.Number),
  originalPrice: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ProductDetail" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductDetail>;

export interface GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy {
  /** Required. Catalog item categories. Each category should be a UTF-8 encoded string with a length limit of 2 KiB. Note that the order in the list denotes the specificity (from least to most specific). */
  categories?: Array<string>;
}

export const GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy: Schema.Schema<GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy> = Schema.suspend(() => Schema.Struct({
  categories: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy>;

export interface GoogleCloudRecommendationengineV1beta1ProductEventDetail {
  /** Required for `add-to-list` and `remove-from-list` events. The id or name of the list that the item is being added to or removed from. Other event types should not set this field. */
  listId?: string;
  /** At least one of search_query or page_categories is required for `search` events. Other event types should not set this field. The user's search query as UTF-8 encoded text with a length limit of 5 KiB. */
  searchQuery?: string;
  /** Optional. A transaction represents the entire purchase transaction. Required for `purchase-complete` events. Optional for `checkout-start` events. Other event types should not set this field. */
  purchaseTransaction?: GoogleCloudRecommendationengineV1beta1PurchaseTransaction;
  /** Optional. The id or name of the associated shopping cart. This id is used to associate multiple items added or present in the cart before purchase. This can only be set for `add-to-cart`, `remove-from-cart`, `checkout-start`, `purchase-complete`, or `shopping-cart-page-view` events. */
  cartId?: string;
  /** The main product details related to the event. This field is required for the following event types: * `add-to-cart` * `add-to-list` * `checkout-start` * `detail-page-view` * `purchase-complete` * `refund` * `remove-from-cart` * `remove-from-list` This field is optional for the following event types: * `page-visit` * `shopping-cart-page-view` - note that 'product_details' should be set for this unless the shopping cart is empty. * `search` (highly encouraged) In a `search` event, this field represents the products returned to the end user on the current page (the end user may have not finished broswing the whole page yet). When a new page is returned to the end user, after pagination/filtering/ordering even for the same query, a new SEARCH event with different product_details is desired. The end user may have not finished broswing the whole page yet. This field is not allowed for the following event types: * `category-page-view` * `home-page-view` */
  productDetails?: Array<GoogleCloudRecommendationengineV1beta1ProductDetail>;
  /** Required for `category-page-view` events. At least one of search_query or page_categories is required for `search` events. Other event types should not set this field. The categories associated with a category page. Category pages include special pages such as sales or promotions. For instance, a special sale page may have the category hierarchy: categories : ["Sales", "2017 Black Friday Deals"]. */
  pageCategories?: Array<GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy>;
}

export const GoogleCloudRecommendationengineV1beta1ProductEventDetail: Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductEventDetail> = Schema.suspend(() => Schema.Struct({
  listId: Schema.optional(Schema.String),
  searchQuery: Schema.optional(Schema.String),
  purchaseTransaction: Schema.optional(GoogleCloudRecommendationengineV1beta1PurchaseTransaction),
  cartId: Schema.optional(Schema.String),
  productDetails: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1ProductDetail)),
  pageCategories: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ProductEventDetail" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ProductEventDetail>;

export interface GoogleCloudRecommendationengineV1alphaTuningMetadata {
  /** The resource name of the recommendation model that this tune applies to. Format: projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/eventStores/{event_store_id}/recommendationModels/{recommendation_model_id} */
  recommendationModel?: string;
}

export const GoogleCloudRecommendationengineV1alphaTuningMetadata: Schema.Schema<GoogleCloudRecommendationengineV1alphaTuningMetadata> = Schema.suspend(() => Schema.Struct({
  recommendationModel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1alphaTuningMetadata" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1alphaTuningMetadata>;

export interface GoogleCloudRecommendationengineV1beta1GcsSource {
  /** Required. Google Cloud Storage URIs to input files. URI can be up to 2000 characters long. URIs can match the full object path (for example, `gs://bucket/directory/object.json`) or a pattern matching one or more files, such as `gs://bucket/directory/*.json`. A request can contain at most 100 files, and each file can be up to 2 GB. See [Importing catalog information](/recommendations-ai/docs/upload-catalog) for the expected file format and setup instructions. */
  inputUris?: Array<string>;
  /** Optional. The schema to use when parsing the data from the source. Supported values for catalog imports: 1: "catalog_recommendations_ai" using https://cloud.google.com/recommendations-ai/docs/upload-catalog#json (Default for catalogItems.import) 2: "catalog_merchant_center" using https://cloud.google.com/recommendations-ai/docs/upload-catalog#mc Supported values for user events imports: 1: "user_events_recommendations_ai" using https://cloud.google.com/recommendations-ai/docs/manage-user-events#import (Default for userEvents.import) 2. "user_events_ga360" using https://support.google.com/analytics/answer/3437719?hl=en */
  jsonSchema?: string;
}

export const GoogleCloudRecommendationengineV1beta1GcsSource: Schema.Schema<GoogleCloudRecommendationengineV1beta1GcsSource> = Schema.suspend(() => Schema.Struct({
  inputUris: Schema.optional(Schema.Array(Schema.String)),
  jsonSchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1GcsSource" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1GcsSource>;

export interface GoogleCloudRecommendationengineV1beta1RejoinUserEventsMetadata {
}

export const GoogleCloudRecommendationengineV1beta1RejoinUserEventsMetadata: Schema.Schema<GoogleCloudRecommendationengineV1beta1RejoinUserEventsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1RejoinUserEventsMetadata" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1RejoinUserEventsMetadata>;

export interface GoogleCloudRecommendationengineV1beta1CatalogItemLevelConfig {
  /** Optional. Level of the catalog at which events are uploaded. See https://cloud.google.com/recommendations-ai/docs/catalog#catalog-levels for more details. */
  eventItemLevel?: "CATALOG_ITEM_LEVEL_UNSPECIFIED" | "VARIANT" | "MASTER" | (string & {});
  /** Optional. Level of the catalog at which predictions are made. See https://cloud.google.com/recommendations-ai/docs/catalog#catalog-levels for more details. */
  predictItemLevel?: "CATALOG_ITEM_LEVEL_UNSPECIFIED" | "VARIANT" | "MASTER" | (string & {});
}

export const GoogleCloudRecommendationengineV1beta1CatalogItemLevelConfig: Schema.Schema<GoogleCloudRecommendationengineV1beta1CatalogItemLevelConfig> = Schema.suspend(() => Schema.Struct({
  eventItemLevel: Schema.optional(Schema.String),
  predictItemLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1CatalogItemLevelConfig" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1CatalogItemLevelConfig>;

export interface GoogleCloudRecommendationengineV1alphaTuningResponse {
}

export const GoogleCloudRecommendationengineV1alphaTuningResponse: Schema.Schema<GoogleCloudRecommendationengineV1alphaTuningResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecommendationengineV1alphaTuningResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1alphaTuningResponse>;

export interface GoogleCloudRecommendationengineV1beta1CatalogItem {
  /** Optional. Catalog item description. UTF-8 encoded string with a length limit of 5 KiB. */
  description?: string;
  /** Optional. Metadata specific to retail products. */
  productMetadata?: GoogleCloudRecommendationengineV1beta1ProductCatalogItem;
  /** Required. Catalog item categories. This field is repeated for supporting one catalog item belonging to several parallel category hierarchies. For example, if a shoes product belongs to both ["Shoes & Accessories" -> "Shoes"] and ["Sports & Fitness" -> "Athletic Clothing" -> "Shoes"], it could be represented as: "categoryHierarchies": [ { "categories": ["Shoes & Accessories", "Shoes"]}, { "categories": ["Sports & Fitness", "Athletic Clothing", "Shoes"] } ] */
  categoryHierarchies?: Array<GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy>;
  /** Required. Catalog item identifier. UTF-8 encoded string with a length limit of 128 bytes. This id must be unique among all catalog items within the same catalog. It should also be used when logging user events in order for the user events to be joined with the Catalog. */
  id?: string;
  /** Optional. Deprecated. The model automatically detects the text language. Your catalog can include text in different languages, but duplicating catalog items to provide text in multiple languages can result in degraded model performance. */
  languageCode?: string;
  /** Optional. Variant group identifier for prediction results. UTF-8 encoded string with a length limit of 128 bytes. This field must be enabled before it can be used. [Learn more](/recommendations-ai/docs/catalog#item-group-id). */
  itemGroupId?: string;
  /** Optional. Filtering tags associated with the catalog item. Each tag should be a UTF-8 encoded string with a length limit of 1 KiB. This tag can be used for filtering recommendation results by passing the tag as part of the predict request filter. */
  tags?: Array<string>;
  /** Required. Catalog item title. UTF-8 encoded string with a length limit of 1 KiB. */
  title?: string;
  /** Optional. Highly encouraged. Extra catalog item attributes to be included in the recommendation model. For example, for retail products, this could include the store name, vendor, style, color, etc. These are very strong signals for recommendation model, thus we highly recommend providing the item attributes here. */
  itemAttributes?: GoogleCloudRecommendationengineV1beta1FeatureMap;
}

export const GoogleCloudRecommendationengineV1beta1CatalogItem: Schema.Schema<GoogleCloudRecommendationengineV1beta1CatalogItem> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  productMetadata: Schema.optional(GoogleCloudRecommendationengineV1beta1ProductCatalogItem),
  categoryHierarchies: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy)),
  id: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  itemGroupId: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  title: Schema.optional(Schema.String),
  itemAttributes: Schema.optional(GoogleCloudRecommendationengineV1beta1FeatureMap),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1CatalogItem" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1CatalogItem>;

export interface GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse {
  /** The catalog items. */
  catalogItems?: Array<GoogleCloudRecommendationengineV1beta1CatalogItem>;
  /** If empty, the list is complete. If nonempty, the token to pass to the next request's ListCatalogItemRequest.page_token. */
  nextPageToken?: string;
}

export const GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse: Schema.Schema<GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse> = Schema.suspend(() => Schema.Struct({
  catalogItems: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1CatalogItem)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse>;

export interface GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration {
  /** The API key. */
  apiKey?: string;
}

export const GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration: Schema.Schema<GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration> = Schema.suspend(() => Schema.Struct({
  apiKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration>;

export interface GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse {
  /** If empty, the list is complete. If nonempty, pass the token to the next request's `ListPredictionApiKeysRegistrationsRequest.pageToken`. */
  nextPageToken?: string;
  /** The list of registered API keys. */
  predictionApiKeyRegistrations?: Array<GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration>;
}

export const GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse: Schema.Schema<GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  predictionApiKeyRegistrations: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse>;

export interface GoogleCloudRecommendationengineV1beta1UserInfo {
  /** Optional. Unique identifier for logged-in user with a length limit of 128 bytes. Required only for logged-in users. Don't set for anonymous users. Don't set the field to the same fixed ID for different users. This mixes the event history of those users together, which results in degraded model quality. */
  userId?: string;
  /** Required. A unique identifier for tracking visitors with a length limit of 128 bytes. For example, this could be implemented with an HTTP cookie, which should be able to uniquely identify a visitor on a single device. This unique identifier should not change if the visitor logs in or out of the website. Maximum length 128 bytes. Cannot be empty. Don't set the field to the same fixed ID for different users. This mixes the event history of those users together, which results in degraded model quality. */
  visitorId?: string;
  /** Optional. Indicates if the request is made directly from the end user in which case the user_agent and ip_address fields can be populated from the HTTP request. This should *not* be set when using the javascript pixel. This flag should be set only if the API request is made directly from the end user such as a mobile app (and not if a gateway or a server is processing and pushing the user events). */
  directUserRequest?: boolean;
  /** Optional. IP address of the user. This could be either IPv4 (e.g. 104.133.9.80) or IPv6 (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334). This should *not* be set when using the javascript pixel or if `direct_user_request` is set. Used to extract location information for personalization. */
  ipAddress?: string;
  /** Optional. User agent as included in the HTTP header. UTF-8 encoded string with a length limit of 1 KiB. This should *not* be set when using the JavaScript pixel or if `directUserRequest` is set. */
  userAgent?: string;
}

export const GoogleCloudRecommendationengineV1beta1UserInfo: Schema.Schema<GoogleCloudRecommendationengineV1beta1UserInfo> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
  visitorId: Schema.optional(Schema.String),
  directUserRequest: Schema.optional(Schema.Boolean),
  ipAddress: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1UserInfo" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1UserInfo>;

export interface GoogleCloudRecommendationengineV1beta1EventDetail {
  /** Optional. Recommendation token included in the recommendation prediction response. This field enables accurate attribution of recommendation model performance. This token enables us to accurately attribute page view or purchase back to the event and the particular predict response containing this clicked/purchased item. If user clicks on product K in the recommendation results, pass the `PredictResponse.recommendationToken` property as a url parameter to product K's page. When recording events on product K's page, log the PredictResponse.recommendation_token to this field. Optional, but highly encouraged for user events that are the result of a recommendation prediction query. */
  recommendationToken?: string;
  /** Optional. The referrer url of the current page. When using the JavaScript pixel, this value is filled in automatically. */
  referrerUri?: string;
  /** Optional. A list of identifiers for the independent experiment groups this user event belongs to. This is used to distinguish between user events associated with different experiment setups (e.g. using Recommendation Engine system, using different recommendation models). */
  experimentIds?: Array<string>;
  /** Optional. Complete url (window.location.href) of the user's current page. When using the JavaScript pixel, this value is filled in automatically. Maximum length 5KB. */
  uri?: string;
  /** Optional. A unique id of a web page view. This should be kept the same for all user events triggered from the same pageview. For example, an item detail page view could trigger multiple events as the user is browsing the page. The `pageViewId` property should be kept the same for all these events so that they can be grouped together properly. This `pageViewId` will be automatically generated if using the JavaScript pixel. */
  pageViewId?: string;
  /** Optional. Extra user event features to include in the recommendation model. For product recommendation, an example of extra user information is traffic_channel, i.e. how user arrives at the site. Users can arrive at the site by coming to the site directly, or coming through Google search, and etc. */
  eventAttributes?: GoogleCloudRecommendationengineV1beta1FeatureMap;
}

export const GoogleCloudRecommendationengineV1beta1EventDetail: Schema.Schema<GoogleCloudRecommendationengineV1beta1EventDetail> = Schema.suspend(() => Schema.Struct({
  recommendationToken: Schema.optional(Schema.String),
  referrerUri: Schema.optional(Schema.String),
  experimentIds: Schema.optional(Schema.Array(Schema.String)),
  uri: Schema.optional(Schema.String),
  pageViewId: Schema.optional(Schema.String),
  eventAttributes: Schema.optional(GoogleCloudRecommendationengineV1beta1FeatureMap),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1EventDetail" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1EventDetail>;

export interface GoogleCloudRecommendationengineV1beta1UserEvent {
  /** Optional. Retail product specific user event metadata. This field is required for the following event types: * `add-to-cart` * `add-to-list` * `category-page-view` * `checkout-start` * `detail-page-view` * `purchase-complete` * `refund` * `remove-from-cart` * `remove-from-list` * `search` This field is optional for the following event types: * `page-visit` * `shopping-cart-page-view` - note that 'product_event_detail' should be set for this unless the shopping cart is empty. This field is not allowed for the following event types: * `home-page-view` */
  productEventDetail?: GoogleCloudRecommendationengineV1beta1ProductEventDetail;
  /** Required. User information. */
  userInfo?: GoogleCloudRecommendationengineV1beta1UserInfo;
  /** Optional. User event detailed information common across different recommendation types. */
  eventDetail?: GoogleCloudRecommendationengineV1beta1EventDetail;
  /** Required. User event type. Allowed values are: * `add-to-cart` Products being added to cart. * `add-to-list` Items being added to a list (shopping list, favorites etc). * `category-page-view` Special pages such as sale or promotion pages viewed. * `checkout-start` User starting a checkout process. * `detail-page-view` Products detail page viewed. * `home-page-view` Homepage viewed. * `page-visit` Generic page visits not included in the event types above. * `purchase-complete` User finishing a purchase. * `refund` Purchased items being refunded or returned. * `remove-from-cart` Products being removed from cart. * `remove-from-list` Items being removed from a list. * `search` Product search. * `shopping-cart-page-view` User viewing a shopping cart. * `impression` List of items displayed. Used by Google Tag Manager. */
  eventType?: string;
  /** Optional. Only required for ImportUserEvents method. Timestamp of user event created. */
  eventTime?: string;
  /** Optional. This field should *not* be set when using JavaScript pixel or the Recommendations AI Tag. Defaults to `EVENT_SOURCE_UNSPECIFIED`. */
  eventSource?: "EVENT_SOURCE_UNSPECIFIED" | "AUTOML" | "ECOMMERCE" | "BATCH_UPLOAD" | (string & {});
}

export const GoogleCloudRecommendationengineV1beta1UserEvent: Schema.Schema<GoogleCloudRecommendationengineV1beta1UserEvent> = Schema.suspend(() => Schema.Struct({
  productEventDetail: Schema.optional(GoogleCloudRecommendationengineV1beta1ProductEventDetail),
  userInfo: Schema.optional(GoogleCloudRecommendationengineV1beta1UserInfo),
  eventDetail: Schema.optional(GoogleCloudRecommendationengineV1beta1EventDetail),
  eventType: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
  eventSource: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1UserEvent" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1UserEvent>;

export interface GoogleCloudRecommendationengineV1alphaRejoinCatalogResponse {
  /** Number of user events that were joined with latest catalog items. */
  rejoinedUserEventsCount?: string;
}

export const GoogleCloudRecommendationengineV1alphaRejoinCatalogResponse: Schema.Schema<GoogleCloudRecommendationengineV1alphaRejoinCatalogResponse> = Schema.suspend(() => Schema.Struct({
  rejoinedUserEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1alphaRejoinCatalogResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1alphaRejoinCatalogResponse>;

export interface GoogleCloudRecommendationengineV1beta1RejoinUserEventsRequest {
  /** Required. The type of the catalog rejoin to define the scope and range of the user events to be rejoined with catalog items. */
  userEventRejoinScope?: "USER_EVENT_REJOIN_SCOPE_UNSPECIFIED" | "JOINED_EVENTS" | "UNJOINED_EVENTS" | (string & {});
}

export const GoogleCloudRecommendationengineV1beta1RejoinUserEventsRequest: Schema.Schema<GoogleCloudRecommendationengineV1beta1RejoinUserEventsRequest> = Schema.suspend(() => Schema.Struct({
  userEventRejoinScope: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1RejoinUserEventsRequest" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1RejoinUserEventsRequest>;

export interface GoogleCloudRecommendationengineV1beta1CatalogInlineSource {
  /** Optional. A list of catalog items to update/create. Recommended max of 10k items. */
  catalogItems?: Array<GoogleCloudRecommendationengineV1beta1CatalogItem>;
}

export const GoogleCloudRecommendationengineV1beta1CatalogInlineSource: Schema.Schema<GoogleCloudRecommendationengineV1beta1CatalogInlineSource> = Schema.suspend(() => Schema.Struct({
  catalogItems: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1CatalogItem)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1CatalogInlineSource" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1CatalogInlineSource>;

export interface GoogleCloudRecommendationengineV1beta1ImportErrorsConfig {
  /** Google Cloud Storage path for import errors. This must be an empty, existing Cloud Storage bucket. Import errors will be written to a file in this bucket, one per line, as a JSON-encoded `google.rpc.Status` message. */
  gcsPrefix?: string;
}

export const GoogleCloudRecommendationengineV1beta1ImportErrorsConfig: Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportErrorsConfig> = Schema.suspend(() => Schema.Struct({
  gcsPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ImportErrorsConfig" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportErrorsConfig>;

export interface GoogleCloudRecommendationengineV1beta1UserEventInlineSource {
  /** Optional. A list of user events to import. Recommended max of 10k items. */
  userEvents?: Array<GoogleCloudRecommendationengineV1beta1UserEvent>;
}

export const GoogleCloudRecommendationengineV1beta1UserEventInlineSource: Schema.Schema<GoogleCloudRecommendationengineV1beta1UserEventInlineSource> = Schema.suspend(() => Schema.Struct({
  userEvents: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1UserEvent)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1UserEventInlineSource" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1UserEventInlineSource>;

export interface GoogleCloudRecommendationengineV1beta1BigQuerySource {
  /** Optional. Intermediate Cloud Storage directory used for the import. Can be specified if one wants to have the BigQuery export to a specific Cloud Storage directory. */
  gcsStagingDir?: string;
  /** Required. The BigQuery data set to copy the data from. */
  datasetId?: string;
  /** Required. The BigQuery table to copy the data from. */
  tableId?: string;
  /** Optional. The project id (can be project # or id) that the BigQuery source is in. If not specified, inherits the project id from the parent request. */
  projectId?: string;
  /** Optional. The schema to use when parsing the data from the source. Supported values for catalog imports: 1: "catalog_recommendations_ai" using https://cloud.google.com/recommendations-ai/docs/upload-catalog#json (Default for catalogItems.import) 2: "catalog_merchant_center" using https://cloud.google.com/recommendations-ai/docs/upload-catalog#mc Supported values for user event imports: 1: "user_events_recommendations_ai" using https://cloud.google.com/recommendations-ai/docs/manage-user-events#import (Default for userEvents.import) 2. "user_events_ga360" using https://support.google.com/analytics/answer/3437719?hl=en */
  dataSchema?: string;
}

export const GoogleCloudRecommendationengineV1beta1BigQuerySource: Schema.Schema<GoogleCloudRecommendationengineV1beta1BigQuerySource> = Schema.suspend(() => Schema.Struct({
  gcsStagingDir: Schema.optional(Schema.String),
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  dataSchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1BigQuerySource" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1BigQuerySource>;

export interface GoogleCloudRecommendationengineV1beta1InputConfig {
  /** The Inline source for the input content for Catalog items. */
  catalogInlineSource?: GoogleCloudRecommendationengineV1beta1CatalogInlineSource;
  /** Google Cloud Storage location for the input content. */
  gcsSource?: GoogleCloudRecommendationengineV1beta1GcsSource;
  /** The Inline source for the input content for UserEvents. */
  userEventInlineSource?: GoogleCloudRecommendationengineV1beta1UserEventInlineSource;
  /** BigQuery input source. */
  bigQuerySource?: GoogleCloudRecommendationengineV1beta1BigQuerySource;
}

export const GoogleCloudRecommendationengineV1beta1InputConfig: Schema.Schema<GoogleCloudRecommendationengineV1beta1InputConfig> = Schema.suspend(() => Schema.Struct({
  catalogInlineSource: Schema.optional(GoogleCloudRecommendationengineV1beta1CatalogInlineSource),
  gcsSource: Schema.optional(GoogleCloudRecommendationengineV1beta1GcsSource),
  userEventInlineSource: Schema.optional(GoogleCloudRecommendationengineV1beta1UserEventInlineSource),
  bigQuerySource: Schema.optional(GoogleCloudRecommendationengineV1beta1BigQuerySource),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1InputConfig" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1InputConfig>;

export interface GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest {
  /** Optional. Unique identifier provided by client, within the ancestor dataset scope. Ensures idempotency for expensive long running operations. Server-generated if unspecified. Up to 128 characters long. This is returned as google.longrunning.Operation.name in the response. Note that this field must not be set if the desired input config is catalog_inline_source. */
  requestId?: string;
  /** Optional. The desired location of errors incurred during the Import. */
  errorsConfig?: GoogleCloudRecommendationengineV1beta1ImportErrorsConfig;
  /** Required. The desired input location of the data. */
  inputConfig?: GoogleCloudRecommendationengineV1beta1InputConfig;
}

export const GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest: Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  errorsConfig: Schema.optional(GoogleCloudRecommendationengineV1beta1ImportErrorsConfig),
  inputConfig: Schema.optional(GoogleCloudRecommendationengineV1beta1InputConfig),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest>;

export interface GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest {
  /** Optional. Unique identifier provided by client, within the ancestor dataset scope. Ensures idempotency and used for request deduplication. Server-generated if unspecified. Up to 128 characters long. This is returned as google.longrunning.Operation.name in the response. */
  requestId?: string;
  /** Required. The desired input location of the data. */
  inputConfig?: GoogleCloudRecommendationengineV1beta1InputConfig;
  /** Optional. The desired location of errors incurred during the Import. */
  errorsConfig?: GoogleCloudRecommendationengineV1beta1ImportErrorsConfig;
  /** Optional. Indicates which fields in the provided imported 'items' to update. If not set, will by default update all fields. */
  updateMask?: string;
}

export const GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest: Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  inputConfig: Schema.optional(GoogleCloudRecommendationengineV1beta1InputConfig),
  errorsConfig: Schema.optional(GoogleCloudRecommendationengineV1beta1ImportErrorsConfig),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest>;

export interface GoogleCloudRecommendationengineV1beta1PredictResponsePredictionResult {
  /** ID of the recommended catalog item */
  id?: string;
  /** Additional item metadata / annotations. Possible values: * `catalogItem`: JSON representation of the catalogItem. Will be set if `returnCatalogItem` is set to true in `PredictRequest.params`. * `score`: Prediction score in double value. Will be set if `returnItemScore` is set to true in `PredictRequest.params`. */
  itemMetadata?: Record<string, unknown>;
}

export const GoogleCloudRecommendationengineV1beta1PredictResponsePredictionResult: Schema.Schema<GoogleCloudRecommendationengineV1beta1PredictResponsePredictionResult> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  itemMetadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1PredictResponsePredictionResult" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1PredictResponsePredictionResult>;

export interface GoogleCloudRecommendationengineV1beta1PredictResponse {
  /** A unique recommendation token. This should be included in the user event logs resulting from this recommendation, which enables accurate attribution of recommendation model performance. */
  recommendationToken?: string;
  /** True if the dryRun property was set in the request. */
  dryRun?: boolean;
  /** A list of recommended items. The order represents the ranking (from the most relevant item to the least). */
  results?: Array<GoogleCloudRecommendationengineV1beta1PredictResponsePredictionResult>;
  /** IDs of items in the request that were missing from the catalog. */
  itemsMissingInCatalog?: Array<string>;
  /** If empty, the list is complete. If nonempty, the token to pass to the next request's PredictRequest.page_token. */
  nextPageToken?: string;
  /** Additional domain specific prediction response metadata. */
  metadata?: Record<string, unknown>;
}

export const GoogleCloudRecommendationengineV1beta1PredictResponse: Schema.Schema<GoogleCloudRecommendationengineV1beta1PredictResponse> = Schema.suspend(() => Schema.Struct({
  recommendationToken: Schema.optional(Schema.String),
  dryRun: Schema.optional(Schema.Boolean),
  results: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1PredictResponsePredictionResult)),
  itemsMissingInCatalog: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1PredictResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1PredictResponse>;

export interface GoogleCloudRecommendationengineV1beta1Catalog {
  /** Required. The catalog display name. */
  displayName?: string;
  /** Required. The catalog item level configuration. */
  catalogItemLevelConfig?: GoogleCloudRecommendationengineV1beta1CatalogItemLevelConfig;
  /** Required. The ID of the default event store. */
  defaultEventStoreId?: string;
  /** The fully qualified resource name of the catalog. */
  name?: string;
}

export const GoogleCloudRecommendationengineV1beta1Catalog: Schema.Schema<GoogleCloudRecommendationengineV1beta1Catalog> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  catalogItemLevelConfig: Schema.optional(GoogleCloudRecommendationengineV1beta1CatalogItemLevelConfig),
  defaultEventStoreId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1Catalog" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1Catalog>;

export interface GoogleCloudRecommendationengineV1beta1ListCatalogsResponse {
  /** Output only. All the customer's catalogs. */
  catalogs?: Array<GoogleCloudRecommendationengineV1beta1Catalog>;
  /** Pagination token, if not returned indicates the last page. */
  nextPageToken?: string;
}

export const GoogleCloudRecommendationengineV1beta1ListCatalogsResponse: Schema.Schema<GoogleCloudRecommendationengineV1beta1ListCatalogsResponse> = Schema.suspend(() => Schema.Struct({
  catalogs: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1Catalog)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ListCatalogsResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ListCatalogsResponse>;

export interface GoogleCloudRecommendationengineV1beta1PredictRequest {
  /** Optional. Additional domain specific parameters for the predictions. Allowed values: * `returnCatalogItem`: Boolean. If set to true, the associated catalogItem object will be returned in the `PredictResponse.PredictionResult.itemMetadata` object in the method response. * `returnItemScore`: Boolean. If set to true, the prediction 'score' corresponding to each returned item will be set in the `metadata` field in the prediction response. The given 'score' indicates the probability of an item being clicked/purchased given the user's context and history. * `strictFiltering`: Boolean. True by default. If set to false, the service will return generic (unfiltered) popular items instead of empty if your filter blocks all prediction results. * `priceRerankLevel`: String. Default empty. If set to be non-empty, then it needs to be one of {'no-price-reranking', 'low-price-reranking', 'medium-price-reranking', 'high-price-reranking'}. This gives request level control and adjust prediction results based on product price. * `diversityLevel`: String. Default empty. If set to be non-empty, then it needs to be one of {'no-diversity', 'low-diversity', 'medium-diversity', 'high-diversity', 'auto-diversity'}. This gives request level control and adjust prediction results based on product category. */
  params?: Record<string, unknown>;
  /** Optional. Maximum number of results to return per page. Set this property to the number of prediction results required. If zero, the service will choose a reasonable default. */
  pageSize?: number;
  /** Required. Context about the user, what they are looking at and what action they took to trigger the predict request. Note that this user event detail won't be ingested to userEvent logs. Thus, a separate userEvent write request is required for event logging. Don't set UserInfo.visitor_id or UserInfo.user_id to the same fixed ID for different users. If you are trying to receive non-personalized recommendations (not recommended; this can negatively impact model performance), instead set UserInfo.visitor_id to a random unique ID and leave UserInfo.user_id unset. */
  userEvent?: GoogleCloudRecommendationengineV1beta1UserEvent;
  /** Optional. The previous PredictResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Filter for restricting prediction results. Accepts values for tags and the `filterOutOfStockItems` flag. * Tag expressions. Restricts predictions to items that match all of the specified tags. Boolean operators `OR` and `NOT` are supported if the expression is enclosed in parentheses, and must be separated from the tag values by a space. `-"tagA"` is also supported and is equivalent to `NOT "tagA"`. Tag values must be double quoted UTF-8 encoded strings with a size limit of 1 KiB. * filterOutOfStockItems. Restricts predictions to items that do not have a stockState value of OUT_OF_STOCK. Examples: * tag=("Red" OR "Blue") tag="New-Arrival" tag=(NOT "promotional") * filterOutOfStockItems tag=(-"promotional") * filterOutOfStockItems If your filter blocks all prediction results, nothing will be returned. If you want generic (unfiltered) popular items to be returned instead, set `strictFiltering` to false in `PredictRequest.params`. */
  filter?: string;
  /** Optional. The labels for the predict request. * Label keys can contain lowercase letters, digits and hyphens, must start with a letter, and must end with a letter or digit. * Non-zero label values can contain lowercase letters, digits and hyphens, must start with a letter, and must end with a letter or digit. * No more than 64 labels can be associated with a given request. See https://goo.gl/xmQnxf for more information on and examples of labels. */
  labels?: Record<string, string>;
  /** Optional. Use dryRun mode for this prediction query. If set to true, a fake model will be used that returns arbitrary catalog items. Note that the dryRun mode should only be used for testing the API, or if the model is not ready. */
  dryRun?: boolean;
}

export const GoogleCloudRecommendationengineV1beta1PredictRequest: Schema.Schema<GoogleCloudRecommendationengineV1beta1PredictRequest> = Schema.suspend(() => Schema.Struct({
  params: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  pageSize: Schema.optional(Schema.Number),
  userEvent: Schema.optional(GoogleCloudRecommendationengineV1beta1UserEvent),
  pageToken: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  dryRun: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1PredictRequest" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1PredictRequest>;

export interface GoogleCloudRecommendationengineV1beta1PurgeUserEventsRequest {
  /** Required. The filter string to specify the events to be deleted. Empty string filter is not allowed. The eligible fields for filtering are: * `eventType`: UserEvent.eventType field of type string. * `eventTime`: in ISO 8601 "zulu" format. * `visitorId`: field of type string. Specifying this will delete all events associated with a visitor. * `userId`: field of type string. Specifying this will delete all events associated with a user. Examples: * Deleting all events in a time range: `eventTime > "2012-04-23T18:25:43.511Z" eventTime < "2012-04-23T18:30:43.511Z"` * Deleting specific eventType in time range: `eventTime > "2012-04-23T18:25:43.511Z" eventType = "detail-page-view"` * Deleting all events for a specific visitor: `visitorId = "visitor1024"` The filtering fields are assumed to have an implicit AND. */
  filter?: string;
  /** Optional. The default value is false. Override this flag to true to actually perform the purge. If the field is not set to true, a sampling of events to be deleted will be returned. */
  force?: boolean;
}

export const GoogleCloudRecommendationengineV1beta1PurgeUserEventsRequest: Schema.Schema<GoogleCloudRecommendationengineV1beta1PurgeUserEventsRequest> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  force: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1PurgeUserEventsRequest" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1PurgeUserEventsRequest>;

export interface GoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse {
  /** The total count of events purged as a result of the operation. */
  purgedEventsCount?: string;
  /** A sampling of events deleted (or will be deleted) depending on the `force` property in the request. Max of 500 items will be returned. */
  userEventsSample?: Array<GoogleCloudRecommendationengineV1beta1UserEvent>;
}

export const GoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse: Schema.Schema<GoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  purgedEventsCount: Schema.optional(Schema.String),
  userEventsSample: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1UserEvent)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse>;

export interface GoogleCloudRecommendationengineV1beta1ListUserEventsResponse {
  /** If empty, the list is complete. If nonempty, the token to pass to the next request's ListUserEvents.page_token. */
  nextPageToken?: string;
  /** The user events. */
  userEvents?: Array<GoogleCloudRecommendationengineV1beta1UserEvent>;
}

export const GoogleCloudRecommendationengineV1beta1ListUserEventsResponse: Schema.Schema<GoogleCloudRecommendationengineV1beta1ListUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  userEvents: Schema.optional(Schema.Array(GoogleCloudRecommendationengineV1beta1UserEvent)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ListUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ListUserEventsResponse>;

export interface GoogleApiHttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
  /** The HTTP request/response body as raw binary. */
  data?: string;
}

export const GoogleApiHttpBody: Schema.Schema<GoogleApiHttpBody> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  extensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiHttpBody" }) as any as Schema.Schema<GoogleApiHttpBody>;

export interface GoogleCloudRecommendationengineV1beta1ImportCatalogItemsResponse {
  /** Echoes the destination for the complete errors in the request if set. */
  errorsConfig?: GoogleCloudRecommendationengineV1beta1ImportErrorsConfig;
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
}

export const GoogleCloudRecommendationengineV1beta1ImportCatalogItemsResponse: Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportCatalogItemsResponse> = Schema.suspend(() => Schema.Struct({
  errorsConfig: Schema.optional(GoogleCloudRecommendationengineV1beta1ImportErrorsConfig),
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ImportCatalogItemsResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportCatalogItemsResponse>;

export interface GoogleCloudRecommendationengineV1beta1UserEventImportSummary {
  /** Count of user events imported, but with catalog information not found in the imported catalog. */
  unjoinedEventsCount?: string;
  /** Count of user events imported with complete existing catalog information. */
  joinedEventsCount?: string;
}

export const GoogleCloudRecommendationengineV1beta1UserEventImportSummary: Schema.Schema<GoogleCloudRecommendationengineV1beta1UserEventImportSummary> = Schema.suspend(() => Schema.Struct({
  unjoinedEventsCount: Schema.optional(Schema.String),
  joinedEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1UserEventImportSummary" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1UserEventImportSummary>;

export interface GoogleCloudRecommendationengineV1beta1ImportUserEventsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** Aggregated statistics of user event import status. */
  importSummary?: GoogleCloudRecommendationengineV1beta1UserEventImportSummary;
  /** Echoes the destination for the complete errors if this field was set in the request. */
  errorsConfig?: GoogleCloudRecommendationengineV1beta1ImportErrorsConfig;
}

export const GoogleCloudRecommendationengineV1beta1ImportUserEventsResponse: Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  importSummary: Schema.optional(GoogleCloudRecommendationengineV1beta1UserEventImportSummary),
  errorsConfig: Schema.optional(GoogleCloudRecommendationengineV1beta1ImportErrorsConfig),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1ImportUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1ImportUserEventsResponse>;

export interface GoogleLongrunningListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata {
  /** Operation create time. */
  createTime?: string;
  /** The ID of the request / operation. */
  operationName?: string;
}

export const GoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata: Schema.Schema<GoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  operationName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata>;

export interface GoogleCloudRecommendationengineV1beta1CreatePredictionApiKeyRegistrationRequest {
  /** Required. The prediction API key registration. */
  predictionApiKeyRegistration?: GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration;
}

export const GoogleCloudRecommendationengineV1beta1CreatePredictionApiKeyRegistrationRequest: Schema.Schema<GoogleCloudRecommendationengineV1beta1CreatePredictionApiKeyRegistrationRequest> = Schema.suspend(() => Schema.Struct({
  predictionApiKeyRegistration: Schema.optional(GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration),
})).annotate({ identifier: "GoogleCloudRecommendationengineV1beta1CreatePredictionApiKeyRegistrationRequest" }) as any as Schema.Schema<GoogleCloudRecommendationengineV1beta1CreatePredictionApiKeyRegistrationRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists all the catalog configurations associated with the project. */
export interface ListProjectsLocationsCatalogsRequest {
  /** Optional. A page token, received from a previous `ListCatalogs` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Maximum number of results to return. If unspecified, defaults to 50. Max allowed value is 1000. */
  pageSize?: number;
  /** Required. The account resource name with an associated location. */
  parent: string;
}

export const ListProjectsLocationsCatalogsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsRequest>;

export type ListProjectsLocationsCatalogsResponse = GoogleCloudRecommendationengineV1beta1ListCatalogsResponse;
export const ListProjectsLocationsCatalogsResponse = GoogleCloudRecommendationengineV1beta1ListCatalogsResponse;

export type ListProjectsLocationsCatalogsError = CommonErrors;

export const listProjectsLocationsCatalogs = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsRequest,
  output: ListProjectsLocationsCatalogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the catalog configuration. */
export interface PatchProjectsLocationsCatalogsRequest {
  /** The fully qualified resource name of the catalog. */
  name: string;
  /** Optional. Indicates which fields in the provided 'catalog' to update. If not set, will only update the catalog_item_level_config field. Currently only fields that can be updated are catalog_item_level_config. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1Catalog;
}

export const PatchProjectsLocationsCatalogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1Catalog).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCatalogsRequest>;

export type PatchProjectsLocationsCatalogsResponse = GoogleCloudRecommendationengineV1beta1Catalog;
export const PatchProjectsLocationsCatalogsResponse = GoogleCloudRecommendationengineV1beta1Catalog;

export type PatchProjectsLocationsCatalogsError = CommonErrors;

export const patchProjectsLocationsCatalogs: API.OperationMethod<PatchProjectsLocationsCatalogsRequest, PatchProjectsLocationsCatalogsResponse, PatchProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCatalogsRequest,
  output: PatchProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Gets a list of user events within a time range, with potential filtering. The method does not list unjoined user events. Unjoined user event definition: when a user event is ingested from Recommendations AI User Event APIs, the catalog item included in the user event is connected with the current catalog. If a catalog item of the ingested event is not in the current catalog, it could lead to degraded model quality. This is called an unjoined event. */
export interface ListProjectsLocationsCatalogsEventStoresUserEventsRequest {
  /** Optional. The previous ListUserEventsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Filtering expression to specify restrictions over returned events. This is a sequence of terms, where each term applies some kind of a restriction to the returned user events. Use this expression to restrict results to a specific time range, or filter events by eventType. eg: eventTime > "2012-04-23T18:25:43.511Z" eventsMissingCatalogItems eventTime<"2012-04-23T18:25:43.511Z" eventType=search We expect only 3 types of fields: * eventTime: this can be specified a maximum of 2 times, once with a less than operator and once with a greater than operator. The eventTime restrict should result in one contiguous valid eventTime range. * eventType: only 1 eventType restriction can be specified. * eventsMissingCatalogItems: specififying this will restrict results to events for which catalog items were not found in the catalog. The default behavior is to return only those events for which catalog items were found. Some examples of valid filters expressions: * Example 1: eventTime > "2012-04-23T18:25:43.511Z" eventTime < "2012-04-23T18:30:43.511Z" * Example 2: eventTime > "2012-04-23T18:25:43.511Z" eventType = detail-page-view * Example 3: eventsMissingCatalogItems eventType = search eventTime < "2018-04-23T18:30:43.511Z" * Example 4: eventTime > "2012-04-23T18:25:43.511Z" * Example 5: eventType = search * Example 6: eventsMissingCatalogItems */
  filter?: string;
  /** Required. The parent eventStore resource name, such as `projects/* /locations/* /catalogs/default_catalog/eventStores/default_event_store`. */
  parent: string;
  /** Optional. Maximum number of results to return per page. If zero, the service will choose a reasonable default. */
  pageSize?: number;
}

export const ListProjectsLocationsCatalogsEventStoresUserEventsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/userEvents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsEventStoresUserEventsRequest>;

export type ListProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleCloudRecommendationengineV1beta1ListUserEventsResponse;
export const ListProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleCloudRecommendationengineV1beta1ListUserEventsResponse;

export type ListProjectsLocationsCatalogsEventStoresUserEventsError = CommonErrors;

export const listProjectsLocationsCatalogsEventStoresUserEvents = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsEventStoresUserEventsRequest,
  output: ListProjectsLocationsCatalogsEventStoresUserEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Triggers a user event rejoin operation with latest catalog data. Events will not be annotated with detailed catalog information if catalog item is missing at the time the user event is ingested, and these events are stored as unjoined events with a limited usage on training and serving. This API can be used to trigger a 'join' operation on specified events with latest version of catalog items. It can also be used to correct events joined with wrong catalog items. */
export interface RejoinProjectsLocationsCatalogsEventStoresUserEventsRequest {
  /** Required. Full resource name of user event, such as `projects/* /locations/* /catalogs/default_catalog/eventStores/default_event_store`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1RejoinUserEventsRequest;
}

export const RejoinProjectsLocationsCatalogsEventStoresUserEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1RejoinUserEventsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/userEvents:rejoin", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RejoinProjectsLocationsCatalogsEventStoresUserEventsRequest>;

export type RejoinProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleLongrunningOperation;
export const RejoinProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleLongrunningOperation;

export type RejoinProjectsLocationsCatalogsEventStoresUserEventsError = CommonErrors;

export const rejoinProjectsLocationsCatalogsEventStoresUserEvents: API.OperationMethod<RejoinProjectsLocationsCatalogsEventStoresUserEventsRequest, RejoinProjectsLocationsCatalogsEventStoresUserEventsResponse, RejoinProjectsLocationsCatalogsEventStoresUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RejoinProjectsLocationsCatalogsEventStoresUserEventsRequest,
  output: RejoinProjectsLocationsCatalogsEventStoresUserEventsResponse,
  errors: [],
}));

/** Deletes permanently all user events specified by the filter provided. Depending on the number of events specified by the filter, this operation could take hours or days to complete. To test a filter, use the list command first. */
export interface PurgeProjectsLocationsCatalogsEventStoresUserEventsRequest {
  /** Required. The resource name of the event_store under which the events are created. The format is `projects/${projectId}/locations/global/catalogs/${catalogId}/eventStores/${eventStoreId}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1PurgeUserEventsRequest;
}

export const PurgeProjectsLocationsCatalogsEventStoresUserEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1PurgeUserEventsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/userEvents:purge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PurgeProjectsLocationsCatalogsEventStoresUserEventsRequest>;

export type PurgeProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleLongrunningOperation;
export const PurgeProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleLongrunningOperation;

export type PurgeProjectsLocationsCatalogsEventStoresUserEventsError = CommonErrors;

export const purgeProjectsLocationsCatalogsEventStoresUserEvents: API.OperationMethod<PurgeProjectsLocationsCatalogsEventStoresUserEventsRequest, PurgeProjectsLocationsCatalogsEventStoresUserEventsResponse, PurgeProjectsLocationsCatalogsEventStoresUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PurgeProjectsLocationsCatalogsEventStoresUserEventsRequest,
  output: PurgeProjectsLocationsCatalogsEventStoresUserEventsResponse,
  errors: [],
}));

/** Writes a single user event. */
export interface WriteProjectsLocationsCatalogsEventStoresUserEventsRequest {
  /** Required. The parent eventStore resource name, such as "projects/1234/locations/global/catalogs/default_catalog/eventStores/default_event_store". */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1UserEvent;
}

export const WriteProjectsLocationsCatalogsEventStoresUserEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1UserEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/userEvents:write", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WriteProjectsLocationsCatalogsEventStoresUserEventsRequest>;

export type WriteProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleCloudRecommendationengineV1beta1UserEvent;
export const WriteProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleCloudRecommendationengineV1beta1UserEvent;

export type WriteProjectsLocationsCatalogsEventStoresUserEventsError = CommonErrors;

export const writeProjectsLocationsCatalogsEventStoresUserEvents: API.OperationMethod<WriteProjectsLocationsCatalogsEventStoresUserEventsRequest, WriteProjectsLocationsCatalogsEventStoresUserEventsResponse, WriteProjectsLocationsCatalogsEventStoresUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WriteProjectsLocationsCatalogsEventStoresUserEventsRequest,
  output: WriteProjectsLocationsCatalogsEventStoresUserEventsResponse,
  errors: [],
}));

/** Bulk import of User events. Request processing might be synchronous. Events that already exist are skipped. Use this method for backfilling historical user events. Operation.response is of type ImportResponse. Note that it is possible for a subset of the items to be successfully inserted. Operation.metadata is of type ImportMetadata. */
export interface ImportProjectsLocationsCatalogsEventStoresUserEventsRequest {
  /** Required. `projects/1234/locations/global/catalogs/default_catalog/eventStores/default_event_store` */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest;
}

export const ImportProjectsLocationsCatalogsEventStoresUserEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/userEvents:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsCatalogsEventStoresUserEventsRequest>;

export type ImportProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsCatalogsEventStoresUserEventsError = CommonErrors;

export const importProjectsLocationsCatalogsEventStoresUserEvents: API.OperationMethod<ImportProjectsLocationsCatalogsEventStoresUserEventsRequest, ImportProjectsLocationsCatalogsEventStoresUserEventsResponse, ImportProjectsLocationsCatalogsEventStoresUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsCatalogsEventStoresUserEventsRequest,
  output: ImportProjectsLocationsCatalogsEventStoresUserEventsResponse,
  errors: [],
}));

/** Writes a single user event from the browser. This uses a GET request to due to browser restriction of POST-ing to a 3rd party domain. This method is used only by the Recommendations AI JavaScript pixel. Users should not call this method directly. */
export interface CollectProjectsLocationsCatalogsEventStoresUserEventsRequest {
  /** Optional. The event timestamp in milliseconds. This prevents browser caching of otherwise identical get requests. The name is abbreviated to reduce the payload bytes. */
  ets?: string;
  /** Optional. The url including cgi-parameters but excluding the hash fragment. The URL must be truncated to 1.5K bytes to conservatively be under the 2K bytes. This is often more useful than the referer url, because many browsers only send the domain for 3rd party requests. */
  uri?: string;
  /** Required. URL encoded UserEvent proto. */
  userEvent?: string;
  /** Required. The parent eventStore name, such as `projects/1234/locations/global/catalogs/default_catalog/eventStores/default_event_store`. */
  parent: string;
}

export const CollectProjectsLocationsCatalogsEventStoresUserEventsRequest = Schema.Struct({
  ets: Schema.optional(Schema.String).pipe(T.HttpQuery("ets")),
  uri: Schema.optional(Schema.String).pipe(T.HttpQuery("uri")),
  userEvent: Schema.optional(Schema.String).pipe(T.HttpQuery("userEvent")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/userEvents:collect" }),
  svc,
) as unknown as Schema.Schema<CollectProjectsLocationsCatalogsEventStoresUserEventsRequest>;

export type CollectProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleApiHttpBody;
export const CollectProjectsLocationsCatalogsEventStoresUserEventsResponse = GoogleApiHttpBody;

export type CollectProjectsLocationsCatalogsEventStoresUserEventsError = CommonErrors;

export const collectProjectsLocationsCatalogsEventStoresUserEvents: API.OperationMethod<CollectProjectsLocationsCatalogsEventStoresUserEventsRequest, CollectProjectsLocationsCatalogsEventStoresUserEventsResponse, CollectProjectsLocationsCatalogsEventStoresUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CollectProjectsLocationsCatalogsEventStoresUserEventsRequest,
  output: CollectProjectsLocationsCatalogsEventStoresUserEventsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsCatalogsEventStoresOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsCatalogsEventStoresOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsEventStoresOperationsRequest>;

export type GetProjectsLocationsCatalogsEventStoresOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsCatalogsEventStoresOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsCatalogsEventStoresOperationsError = CommonErrors;

export const getProjectsLocationsCatalogsEventStoresOperations: API.OperationMethod<GetProjectsLocationsCatalogsEventStoresOperationsRequest, GetProjectsLocationsCatalogsEventStoresOperationsResponse, GetProjectsLocationsCatalogsEventStoresOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsEventStoresOperationsRequest,
  output: GetProjectsLocationsCatalogsEventStoresOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsCatalogsEventStoresOperationsRequest {
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsLocationsCatalogsEventStoresOperationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsEventStoresOperationsRequest>;

export type ListProjectsLocationsCatalogsEventStoresOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsCatalogsEventStoresOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsCatalogsEventStoresOperationsError = CommonErrors;

export const listProjectsLocationsCatalogsEventStoresOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsEventStoresOperationsRequest,
  output: ListProjectsLocationsCatalogsEventStoresOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Makes a recommendation prediction. If using API Key based authentication, the API Key must be registered using the PredictionApiKeyRegistry service. [Learn more](https://cloud.google.com/recommendations-ai/docs/setting-up#register-key). */
export interface PredictProjectsLocationsCatalogsEventStoresPlacementsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1PredictRequest;
}

export const PredictProjectsLocationsCatalogsEventStoresPlacementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1PredictRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/placements/{placementsId}:predict", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PredictProjectsLocationsCatalogsEventStoresPlacementsRequest>;

export type PredictProjectsLocationsCatalogsEventStoresPlacementsResponse = GoogleCloudRecommendationengineV1beta1PredictResponse;
export const PredictProjectsLocationsCatalogsEventStoresPlacementsResponse = GoogleCloudRecommendationengineV1beta1PredictResponse;

export type PredictProjectsLocationsCatalogsEventStoresPlacementsError = CommonErrors;

export const predictProjectsLocationsCatalogsEventStoresPlacements: API.OperationMethod<PredictProjectsLocationsCatalogsEventStoresPlacementsRequest, PredictProjectsLocationsCatalogsEventStoresPlacementsResponse, PredictProjectsLocationsCatalogsEventStoresPlacementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PredictProjectsLocationsCatalogsEventStoresPlacementsRequest,
  output: PredictProjectsLocationsCatalogsEventStoresPlacementsResponse,
  errors: [],
}));

/** List the registered apiKeys for use with predict method. */
export interface ListProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest {
  /** Optional. Maximum number of results to return per page. If unset, the service will choose a reasonable default. */
  pageSize?: number;
  /** Optional. The previous `ListPredictionApiKeyRegistration.nextPageToken`. */
  pageToken?: string;
  /** Required. The parent placement resource name such as `projects/1234/locations/global/catalogs/default_catalog/eventStores/default_event_store` */
  parent: string;
}

export const ListProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/predictionApiKeyRegistrations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest>;

export type ListProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse = GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse;
export const ListProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse = GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse;

export type ListProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsError = CommonErrors;

export const listProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrations = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest,
  output: ListProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Unregister an apiKey from using for predict method. */
export interface DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest {
  /** Required. The API key to unregister including full resource path. `projects/* /locations/global/catalogs/default_catalog/eventStores/default_event_store/predictionApiKeyRegistrations/` */
  name: string;
}

export const DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/predictionApiKeyRegistrations/{predictionApiKeyRegistrationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest>;

export type DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsError = CommonErrors;

export const deleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrations: API.OperationMethod<DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest, DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse, DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest,
  output: DeleteProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse,
  errors: [],
}));

/** Register an API key for use with predict method. */
export interface CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest {
  /** Required. The parent resource path. `projects/* /locations/global/catalogs/default_catalog/eventStores/default_event_store`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1CreatePredictionApiKeyRegistrationRequest;
}

export const CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1CreatePredictionApiKeyRegistrationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/eventStores/{eventStoresId}/predictionApiKeyRegistrations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest>;

export type CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse = GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration;
export const CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse = GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration;

export type CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsError = CommonErrors;

export const createProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrations: API.OperationMethod<CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest, CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse, CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsRequest,
  output: CreateProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsCatalogsOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsCatalogsOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsOperationsRequest>;

export type ListProjectsLocationsCatalogsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsCatalogsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsCatalogsOperationsError = CommonErrors;

export const listProjectsLocationsCatalogsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsOperationsRequest,
  output: ListProjectsLocationsCatalogsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsCatalogsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsCatalogsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsOperationsRequest>;

export type GetProjectsLocationsCatalogsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsCatalogsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsCatalogsOperationsError = CommonErrors;

export const getProjectsLocationsCatalogsOperations: API.OperationMethod<GetProjectsLocationsCatalogsOperationsRequest, GetProjectsLocationsCatalogsOperationsResponse, GetProjectsLocationsCatalogsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsOperationsRequest,
  output: GetProjectsLocationsCatalogsOperationsResponse,
  errors: [],
}));

/** Gets a list of catalog items. */
export interface ListProjectsLocationsCatalogsCatalogItemsRequest {
  /** Optional. Maximum number of results to return per page. If zero, the service will choose a reasonable default. */
  pageSize?: number;
  /** Required. The parent catalog resource name, such as `projects/* /locations/global/catalogs/default_catalog`. */
  parent: string;
  /** Optional. Use of this field is not supported by version v1beta1. */
  filter?: string;
  /** Optional. The previous ListCatalogItemsResponse.next_page_token. */
  pageToken?: string;
}

export const ListProjectsLocationsCatalogsCatalogItemsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/catalogItems" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsCatalogItemsRequest>;

export type ListProjectsLocationsCatalogsCatalogItemsResponse = GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse;
export const ListProjectsLocationsCatalogsCatalogItemsResponse = GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse;

export type ListProjectsLocationsCatalogsCatalogItemsError = CommonErrors;

export const listProjectsLocationsCatalogsCatalogItems = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsCatalogItemsRequest,
  output: ListProjectsLocationsCatalogsCatalogItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a specific catalog item. */
export interface GetProjectsLocationsCatalogsCatalogItemsRequest {
  /** Required. Full resource name of catalog item, such as `projects/* /locations/global/catalogs/default_catalog/catalogitems/some_catalog_item_id`. */
  name: string;
}

export const GetProjectsLocationsCatalogsCatalogItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/catalogItems/{catalogItemsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsCatalogItemsRequest>;

export type GetProjectsLocationsCatalogsCatalogItemsResponse = GoogleCloudRecommendationengineV1beta1CatalogItem;
export const GetProjectsLocationsCatalogsCatalogItemsResponse = GoogleCloudRecommendationengineV1beta1CatalogItem;

export type GetProjectsLocationsCatalogsCatalogItemsError = CommonErrors;

export const getProjectsLocationsCatalogsCatalogItems: API.OperationMethod<GetProjectsLocationsCatalogsCatalogItemsRequest, GetProjectsLocationsCatalogsCatalogItemsResponse, GetProjectsLocationsCatalogsCatalogItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsCatalogItemsRequest,
  output: GetProjectsLocationsCatalogsCatalogItemsResponse,
  errors: [],
}));

/** Updates a catalog item. Partial updating is supported. Non-existing items will be created. */
export interface PatchProjectsLocationsCatalogsCatalogItemsRequest {
  /** Required. Full resource name of catalog item, such as `projects/* /locations/global/catalogs/default_catalog/catalogItems/some_catalog_item_id`. */
  name: string;
  /** Optional. Indicates which fields in the provided 'item' to update. If not set, will by default update all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1CatalogItem;
}

export const PatchProjectsLocationsCatalogsCatalogItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1CatalogItem).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/catalogItems/{catalogItemsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCatalogsCatalogItemsRequest>;

export type PatchProjectsLocationsCatalogsCatalogItemsResponse = GoogleCloudRecommendationengineV1beta1CatalogItem;
export const PatchProjectsLocationsCatalogsCatalogItemsResponse = GoogleCloudRecommendationengineV1beta1CatalogItem;

export type PatchProjectsLocationsCatalogsCatalogItemsError = CommonErrors;

export const patchProjectsLocationsCatalogsCatalogItems: API.OperationMethod<PatchProjectsLocationsCatalogsCatalogItemsRequest, PatchProjectsLocationsCatalogsCatalogItemsResponse, PatchProjectsLocationsCatalogsCatalogItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCatalogsCatalogItemsRequest,
  output: PatchProjectsLocationsCatalogsCatalogItemsResponse,
  errors: [],
}));

/** Creates a catalog item. */
export interface CreateProjectsLocationsCatalogsCatalogItemsRequest {
  /** Required. The parent catalog resource name, such as `projects/* /locations/global/catalogs/default_catalog`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1CatalogItem;
}

export const CreateProjectsLocationsCatalogsCatalogItemsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1CatalogItem).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/catalogItems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCatalogsCatalogItemsRequest>;

export type CreateProjectsLocationsCatalogsCatalogItemsResponse = GoogleCloudRecommendationengineV1beta1CatalogItem;
export const CreateProjectsLocationsCatalogsCatalogItemsResponse = GoogleCloudRecommendationengineV1beta1CatalogItem;

export type CreateProjectsLocationsCatalogsCatalogItemsError = CommonErrors;

export const createProjectsLocationsCatalogsCatalogItems: API.OperationMethod<CreateProjectsLocationsCatalogsCatalogItemsRequest, CreateProjectsLocationsCatalogsCatalogItemsResponse, CreateProjectsLocationsCatalogsCatalogItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCatalogsCatalogItemsRequest,
  output: CreateProjectsLocationsCatalogsCatalogItemsResponse,
  errors: [],
}));

/** Deletes a catalog item. */
export interface DeleteProjectsLocationsCatalogsCatalogItemsRequest {
  /** Required. Full resource name of catalog item, such as `projects/* /locations/global/catalogs/default_catalog/catalogItems/some_catalog_item_id`. */
  name: string;
}

export const DeleteProjectsLocationsCatalogsCatalogItemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/catalogItems/{catalogItemsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCatalogsCatalogItemsRequest>;

export type DeleteProjectsLocationsCatalogsCatalogItemsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsCatalogsCatalogItemsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsCatalogsCatalogItemsError = CommonErrors;

export const deleteProjectsLocationsCatalogsCatalogItems: API.OperationMethod<DeleteProjectsLocationsCatalogsCatalogItemsRequest, DeleteProjectsLocationsCatalogsCatalogItemsResponse, DeleteProjectsLocationsCatalogsCatalogItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCatalogsCatalogItemsRequest,
  output: DeleteProjectsLocationsCatalogsCatalogItemsResponse,
  errors: [],
}));

/** Bulk import of multiple catalog items. Request processing may be synchronous. No partial updating supported. Non-existing items will be created. Operation.response is of type ImportResponse. Note that it is possible for a subset of the items to be successfully updated. */
export interface ImportProjectsLocationsCatalogsCatalogItemsRequest {
  /** Required. `projects/1234/locations/global/catalogs/default_catalog` If no updateMask is specified, requires catalogItems.create permission. If updateMask is specified, requires catalogItems.update permission. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest;
}

export const ImportProjectsLocationsCatalogsCatalogItemsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/catalogItems:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsCatalogsCatalogItemsRequest>;

export type ImportProjectsLocationsCatalogsCatalogItemsResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsCatalogsCatalogItemsResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsCatalogsCatalogItemsError = CommonErrors;

export const importProjectsLocationsCatalogsCatalogItems: API.OperationMethod<ImportProjectsLocationsCatalogsCatalogItemsRequest, ImportProjectsLocationsCatalogsCatalogItemsResponse, ImportProjectsLocationsCatalogsCatalogItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsCatalogsCatalogItemsRequest,
  output: ImportProjectsLocationsCatalogsCatalogItemsResponse,
  errors: [],
}));

