// ==========================================================================
// Merchant API (merchantapi reports_v1beta)
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
  version: "reports_v1beta",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Merchantapi_Date {
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Merchantapi_Date: Schema.Schema<Merchantapi_Date> = Schema.suspend(() => Schema.Struct({
  month: Schema.optional(Schema.Number),
  year: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Merchantapi_Date" }) as any as Schema.Schema<Merchantapi_Date>;

export interface CompetitiveVisibilityCompetitorView {
  /** Country where impressions appeared. Required in the `SELECT` clause. A condition on `report_country_code` is required in the `WHERE` clause. */
  reportCountryCode?: string;
  /** Date of this row. A condition on `date` is required in the `WHERE` clause. */
  date?: Merchantapi_Date;
  /** Position of the domain in the similar businesses ranking for the selected keys (`date`, `report_category_id`, `report_country_code`, `traffic_source`) based on impressions. 1 is the highest. Cannot be filtered on in the 'WHERE' clause. */
  rank?: string;
  /** True if this row contains data for your domain. Cannot be filtered on in the 'WHERE' clause. */
  isYourDomain?: boolean;
  /** [Ads / organic ratio] (https://support.google.com/merchants/answer/11366442#zippy=%2Cads-free-ratio) shows how often the domain receives impressions from Shopping ads compared to organic traffic. The number is rounded and bucketed. Cannot be filtered on in the 'WHERE' clause. */
  adsOrganicRatio?: number;
  /** Domain of your competitor or your domain, if 'is_your_domain' is true. Required in the `SELECT` clause. Cannot be filtered on in the 'WHERE' clause. */
  domain?: string;
  /** Traffic source of impressions. Required in the `SELECT` clause. */
  trafficSource?: "TRAFFIC_SOURCE_ENUM_UNSPECIFIED" | "ORGANIC" | "ADS" | "ALL" | (string & {});
  /** [Higher position rate] (https://support.google.com/merchants/answer/11366442#zippy=%2Chigher-position-rate) shows how often a competitor’s offer got placed in a higher position on the page than your offer. Cannot be filtered on in the 'WHERE' clause. */
  higherPositionRate?: number;
  /** [Relative visibility] (https://support.google.com/merchants/answer/11366442#zippy=%2Crelative-visibility) shows how often your competitors’ offers are shown compared to your offers. In other words, this is the number of displayed impressions of a competitor retailer divided by the number of your displayed impressions during a selected time range for a selected product category and country. Cannot be filtered on in the 'WHERE' clause. */
  relativeVisibility?: number;
  /** Google product category ID to calculate the report for, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). Required in the `SELECT` clause. A condition on `report_category_id` is required in the `WHERE` clause. */
  reportCategoryId?: string;
  /** [Page overlap rate] (https://support.google.com/merchants/answer/11366442#zippy=%2Cpage-overlap-rate) shows how frequently competing retailers’ offers are shown together with your offers on the same page. Cannot be filtered on in the 'WHERE' clause. */
  pageOverlapRate?: number;
}

export const CompetitiveVisibilityCompetitorView: Schema.Schema<CompetitiveVisibilityCompetitorView> = Schema.suspend(() => Schema.Struct({
  reportCountryCode: Schema.optional(Schema.String),
  date: Schema.optional(Merchantapi_Date),
  rank: Schema.optional(Schema.String),
  isYourDomain: Schema.optional(Schema.Boolean),
  adsOrganicRatio: Schema.optional(Schema.Number),
  domain: Schema.optional(Schema.String),
  trafficSource: Schema.optional(Schema.String),
  higherPositionRate: Schema.optional(Schema.Number),
  relativeVisibility: Schema.optional(Schema.Number),
  reportCategoryId: Schema.optional(Schema.String),
  pageOverlapRate: Schema.optional(Schema.Number),
})).annotate({ identifier: "CompetitiveVisibilityCompetitorView" }) as any as Schema.Schema<CompetitiveVisibilityCompetitorView>;

export interface ProductChange {
  /** The old value of the changed resource or attribute. If empty, it means that the product was created. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  oldValue?: string;
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
  /** Countries that have the change (if applicable). Represented in the ISO 3166 format. */
  regionCode?: string;
  /** Reporting contexts that have the change (if applicable). Currently this field supports only (`SHOPPING_ADS`, `LOCAL_INVENTORY_ADS`, `YOUTUBE_SHOPPING`, `YOUTUBE_CHECKOUT`, `YOUTUBE_AFFILIATE`) from the enum value [ReportingContextEnum](/merchant/api/reference/rest/Shared.Types/ReportingContextEnum) */
  reportingContext?: "REPORTING_CONTEXT_ENUM_UNSPECIFIED" | "SHOPPING_ADS" | "DISCOVERY_ADS" | "DEMAND_GEN_ADS" | "DEMAND_GEN_ADS_DISCOVER_SURFACE" | "VIDEO_ADS" | "DISPLAY_ADS" | "LOCAL_INVENTORY_ADS" | "VEHICLE_INVENTORY_ADS" | "FREE_LISTINGS" | "FREE_LISTINGS_UCP_CHECKOUT" | "FREE_LOCAL_LISTINGS" | "FREE_LOCAL_VEHICLE_LISTINGS" | "YOUTUBE_AFFILIATE" | "YOUTUBE_SHOPPING" | "CLOUD_RETAIL" | "LOCAL_CLOUD_RETAIL" | "PRODUCT_REVIEWS" | "MERCHANT_REVIEWS" | "YOUTUBE_CHECKOUT" | (string & {});
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() => Schema.Struct({
  oldValue: Schema.optional(Schema.String),
  newValue: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  reportingContext: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductChange" }) as any as Schema.Schema<ProductChange>;

export interface SearchRequest {
  /** Optional. Number of `ReportRows` to retrieve in a single page. Defaults to 1000. Values above 100,000 are coerced to 100,000. */
  pageSize?: number;
  /** Required. Query that defines a report to be retrieved. For details on how to construct your query, see the [Query Language guide](/merchant/api/guides/reports/query-language). For the full list of available tables and fields, see the Available fields. */
  query?: string;
  /** Optional. Token of the page to retrieve. If not specified, the first page of results is returned. In order to request the next page of results, the value obtained from `next_page_token` in the previous response should be used. */
  pageToken?: string;
}

export const SearchRequest: Schema.Schema<SearchRequest> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  query: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchRequest" }) as any as Schema.Schema<SearchRequest>;

export interface Price {
  /** The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217). */
  currencyCode?: string;
  /** The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros). */
  amountMicros?: string;
}

export const Price: Schema.Schema<Price> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  amountMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface PriceInsightsProductView {
  /** REST ID of the product, in the form of `channel~languageCode~feedLabel~offerId`. Can be used to join data with the `product_view` table. Required in the `SELECT` clause. */
  id?: string;
  /** Product type (2nd level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL2?: string;
  /** Latest suggested price for the product. */
  suggestedPrice?: Price;
  /** Product category (4th level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL4?: string;
  /** The predicted effectiveness of applying the price suggestion, bucketed. */
  effectiveness?: "EFFECTIVENESS_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
  /** Product category (5th level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL5?: string;
  /** Merchant-provided id of the product. */
  offerId?: string;
  /** Current price of the product. */
  price?: Price;
  /** Product category (1st level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL1?: string;
  /** Product type (3rd level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL3?: string;
  /** Brand of the product. */
  brand?: string;
  /** Product type (1st level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL1?: string;
  /** Title of the product. */
  title?: string;
  /** Product category (2nd level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL2?: string;
  /** Predicted change in conversions as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in conversions). */
  predictedConversionsChangeFraction?: number;
  /** Predicted change in impressions as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in impressions. */
  predictedImpressionsChangeFraction?: number;
  /** Product type (4th level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL4?: string;
  /** Product category (3rd level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL3?: string;
  /** Product type (5th level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL5?: string;
  /** Predicted change in clicks as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in clicks. */
  predictedClicksChangeFraction?: number;
}

export const PriceInsightsProductView: Schema.Schema<PriceInsightsProductView> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  productTypeL2: Schema.optional(Schema.String),
  suggestedPrice: Schema.optional(Price),
  categoryL4: Schema.optional(Schema.String),
  effectiveness: Schema.optional(Schema.String),
  categoryL5: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  categoryL1: Schema.optional(Schema.String),
  productTypeL3: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  productTypeL1: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  categoryL2: Schema.optional(Schema.String),
  predictedConversionsChangeFraction: Schema.optional(Schema.Number),
  predictedImpressionsChangeFraction: Schema.optional(Schema.Number),
  productTypeL4: Schema.optional(Schema.String),
  categoryL3: Schema.optional(Schema.String),
  productTypeL5: Schema.optional(Schema.String),
  predictedClicksChangeFraction: Schema.optional(Schema.Number),
})).annotate({ identifier: "PriceInsightsProductView" }) as any as Schema.Schema<PriceInsightsProductView>;

export interface BestSellersBrandView {
  /** Granularity of the report. The ranking can be done over a week or a month timeframe. Required in the `SELECT` clause. Condition on `report_granularity` is required in the `WHERE` clause. */
  reportGranularity?: "REPORT_GRANULARITY_ENUM_UNSPECIFIED" | "WEEKLY" | "MONTHLY" | (string & {});
  /** Google product category ID to calculate the ranking for, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). Required in the `SELECT` clause. If a `WHERE` condition on `report_category_id` is not specified in the query, rankings for all top-level categories are returned. */
  reportCategoryId?: string;
  /** Estimated demand in relation to the brand with the highest popularity rank in the same category and country in the previous week or month. */
  previousRelativeDemand?: "RELATIVE_DEMAND_ENUM_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | (string & {});
  /** Estimated demand in relation to the brand with the highest popularity rank in the same category and country. */
  relativeDemand?: "RELATIVE_DEMAND_ENUM_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | (string & {});
  /** Popularity of the brand on Ads and organic surfaces, in the selected category and country, based on the estimated number of units sold. */
  rank?: string;
  /** Change in the estimated demand. Whether it rose, sank or remained flat. */
  relativeDemandChange?: "RELATIVE_DEMAND_CHANGE_TYPE_ENUM_UNSPECIFIED" | "SINKER" | "FLAT" | "RISER" | (string & {});
  /** Country where the ranking is calculated. Represented in the ISO 3166 format. Required in the `SELECT` clause. Condition on `report_country_code` is required in the `WHERE` clause. */
  reportCountryCode?: string;
  /** Name of the brand. */
  brand?: string;
  /** Report date. The value of this field can only be one of the following: * The first day of the week (Monday) for weekly reports, * The first day of the month for monthly reports. Required in the `SELECT` clause. If a `WHERE` condition on `report_date` is not specified in the query, the latest available weekly or monthly report is returned. */
  reportDate?: Merchantapi_Date;
  /** Popularity rank in the previous week or month. */
  previousRank?: string;
}

export const BestSellersBrandView: Schema.Schema<BestSellersBrandView> = Schema.suspend(() => Schema.Struct({
  reportGranularity: Schema.optional(Schema.String),
  reportCategoryId: Schema.optional(Schema.String),
  previousRelativeDemand: Schema.optional(Schema.String),
  relativeDemand: Schema.optional(Schema.String),
  rank: Schema.optional(Schema.String),
  relativeDemandChange: Schema.optional(Schema.String),
  reportCountryCode: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  reportDate: Schema.optional(Merchantapi_Date),
  previousRank: Schema.optional(Schema.String),
})).annotate({ identifier: "BestSellersBrandView" }) as any as Schema.Schema<BestSellersBrandView>;

export interface ProductStatusChangeMessage {
  /** The product id. */
  resourceId?: string;
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> = Schema.suspend(() => Schema.Struct({
  resourceId: Schema.optional(Schema.String),
  attribute: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  managingAccount: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  changes: Schema.optional(Schema.Array(ProductChange)),
  account: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductStatusChangeMessage" }) as any as Schema.Schema<ProductStatusChangeMessage>;

export interface BestSellersProductClusterView {
  /** Title of the product cluster. */
  title?: string;
  /** Popularity of the product cluster on Ads and organic surfaces, in the selected category and country, based on the estimated number of units sold. */
  rank?: string;
  /** Change in the estimated demand. Whether it rose, sank or remained flat. */
  relativeDemandChange?: "RELATIVE_DEMAND_CHANGE_TYPE_ENUM_UNSPECIFIED" | "SINKER" | "FLAT" | "RISER" | (string & {});
  /** Brand of the product cluster. */
  brand?: string;
  /** Product category (2nd level) of the product cluster, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL2?: string;
  /** Popularity rank in the previous week or month. */
  previousRank?: string;
  /** Estimated demand in relation to the product cluster with the highest popularity rank in the same category and country in the previous week or month. */
  previousRelativeDemand?: "RELATIVE_DEMAND_ENUM_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | (string & {});
  /** Product category (3rd level) of the product cluster, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL3?: string;
  /** GTINs of example variants of the product cluster. */
  variantGtins?: Array<string>;
  /** Whether the product cluster is `IN_STOCK` in your product data source in at least one of the countries, `OUT_OF_STOCK` in your product data source in all countries, or `NOT_IN_INVENTORY` at all. The field doesn't take the Best sellers report country filter into account. */
  inventoryStatus?: "INVENTORY_STATUS_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "NOT_IN_INVENTORY" | (string & {});
  /** Country where the ranking is calculated. Represented in the ISO 3166 format. Required in the `SELECT` clause. Condition on `report_country_code` is required in the `WHERE` clause. */
  reportCountryCode?: string;
  /** Report date. The value of this field can only be one of the following: * The first day of the week (Monday) for weekly reports, * The first day of the month for monthly reports. Required in the `SELECT` clause. If a `WHERE` condition on `report_date` is not specified in the query, the latest available weekly or monthly report is returned. */
  reportDate?: Merchantapi_Date;
  /** Granularity of the report. The ranking can be done over a week or a month timeframe. Required in the `SELECT` clause. Condition on `report_granularity` is required in the `WHERE` clause. */
  reportGranularity?: "REPORT_GRANULARITY_ENUM_UNSPECIFIED" | "WEEKLY" | "MONTHLY" | (string & {});
  /** Google product category ID to calculate the ranking for, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). Required in the `SELECT` clause. If a `WHERE` condition on `report_category_id` is not specified in the query, rankings for all top-level categories are returned. */
  reportCategoryId?: string;
  /** Product category (5th level) of the product cluster, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL5?: string;
  /** Product category (4th level) of the product cluster, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL4?: string;
  /** Estimated demand in relation to the product cluster with the highest popularity rank in the same category and country. */
  relativeDemand?: "RELATIVE_DEMAND_ENUM_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | (string & {});
  /** Product category (1st level) of the product cluster, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL1?: string;
  /** Whether there is at least one product of the brand currently `IN_STOCK` in your product data source in at least one of the countries, all products are `OUT_OF_STOCK` in your product data source in all countries, or `NOT_IN_INVENTORY`. The field doesn't take the Best sellers report country filter into account. */
  brandInventoryStatus?: "INVENTORY_STATUS_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "NOT_IN_INVENTORY" | (string & {});
}

export const BestSellersProductClusterView: Schema.Schema<BestSellersProductClusterView> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  rank: Schema.optional(Schema.String),
  relativeDemandChange: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  categoryL2: Schema.optional(Schema.String),
  previousRank: Schema.optional(Schema.String),
  previousRelativeDemand: Schema.optional(Schema.String),
  categoryL3: Schema.optional(Schema.String),
  variantGtins: Schema.optional(Schema.Array(Schema.String)),
  inventoryStatus: Schema.optional(Schema.String),
  reportCountryCode: Schema.optional(Schema.String),
  reportDate: Schema.optional(Merchantapi_Date),
  reportGranularity: Schema.optional(Schema.String),
  reportCategoryId: Schema.optional(Schema.String),
  categoryL5: Schema.optional(Schema.String),
  categoryL4: Schema.optional(Schema.String),
  relativeDemand: Schema.optional(Schema.String),
  categoryL1: Schema.optional(Schema.String),
  brandInventoryStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "BestSellersProductClusterView" }) as any as Schema.Schema<BestSellersProductClusterView>;

export interface IssueSeverityPerReportingContext {
  /** Reporting context the issue applies to. */
  reportingContext?: "REPORTING_CONTEXT_ENUM_UNSPECIFIED" | "SHOPPING_ADS" | "DISCOVERY_ADS" | "DEMAND_GEN_ADS" | "DEMAND_GEN_ADS_DISCOVER_SURFACE" | "VIDEO_ADS" | "DISPLAY_ADS" | "LOCAL_INVENTORY_ADS" | "VEHICLE_INVENTORY_ADS" | "FREE_LISTINGS" | "FREE_LISTINGS_UCP_CHECKOUT" | "FREE_LOCAL_LISTINGS" | "FREE_LOCAL_VEHICLE_LISTINGS" | "YOUTUBE_AFFILIATE" | "YOUTUBE_SHOPPING" | "CLOUD_RETAIL" | "LOCAL_CLOUD_RETAIL" | "PRODUCT_REVIEWS" | "MERCHANT_REVIEWS" | "YOUTUBE_CHECKOUT" | (string & {});
  /** List of disapproved countries in the reporting context, represented in ISO 3166 format. */
  disapprovedCountries?: Array<string>;
  /** List of demoted countries in the reporting context, represented in ISO 3166 format. */
  demotedCountries?: Array<string>;
}

export const IssueSeverityPerReportingContext: Schema.Schema<IssueSeverityPerReportingContext> = Schema.suspend(() => Schema.Struct({
  reportingContext: Schema.optional(Schema.String),
  disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
  demotedCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IssueSeverityPerReportingContext" }) as any as Schema.Schema<IssueSeverityPerReportingContext>;

export interface PriceCompetitivenessProductView {
  /** Product category (2nd level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL2?: string;
  /** Title of the product. */
  title?: string;
  /** Brand of the product. */
  brand?: string;
  /** Product type (1st level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL1?: string;
  /** Product category (3rd level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL3?: string;
  /** Product type (5th level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL5?: string;
  /** Product type (4th level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL4?: string;
  /** Latest available price benchmark for the product's catalog in the benchmark country. */
  benchmarkPrice?: Price;
  /** Country of the price benchmark. Represented in the ISO 3166 format. Required in the `SELECT` clause. */
  reportCountryCode?: string;
  /** REST ID of the product, in the form of `channel~languageCode~feedLabel~offerId`. Can be used to join data with the `product_view` table. Required in the `SELECT` clause. */
  id?: string;
  /** Product type (2nd level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL2?: string;
  /** Product category (1st level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL1?: string;
  /** Product type (3rd level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL3?: string;
  /** Merchant-provided id of the product. */
  offerId?: string;
  /** Current price of the product. */
  price?: Price;
  /** Product category (5th level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL5?: string;
  /** Product category (4th level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL4?: string;
}

export const PriceCompetitivenessProductView: Schema.Schema<PriceCompetitivenessProductView> = Schema.suspend(() => Schema.Struct({
  categoryL2: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  productTypeL1: Schema.optional(Schema.String),
  categoryL3: Schema.optional(Schema.String),
  productTypeL5: Schema.optional(Schema.String),
  productTypeL4: Schema.optional(Schema.String),
  benchmarkPrice: Schema.optional(Price),
  reportCountryCode: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  productTypeL2: Schema.optional(Schema.String),
  categoryL1: Schema.optional(Schema.String),
  productTypeL3: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  categoryL5: Schema.optional(Schema.String),
  categoryL4: Schema.optional(Schema.String),
})).annotate({ identifier: "PriceCompetitivenessProductView" }) as any as Schema.Schema<PriceCompetitivenessProductView>;

export interface CompetitiveVisibilityTopMerchantView {
  /** Date of this row. Cannot be selected in the `SELECT` clause. A condition on `date` is required in the `WHERE` clause. */
  date?: Merchantapi_Date;
  /** Position of the domain in the top merchants ranking for the selected keys (`date`, `report_category_id`, `report_country_code`, `traffic_source`) based on impressions. 1 is the highest. Cannot be filtered on in the 'WHERE' clause. */
  rank?: string;
  /** Country where impressions appeared. Required in the `SELECT` clause. A condition on `report_country_code` is required in the `WHERE` clause. */
  reportCountryCode?: string;
  /** Traffic source of impressions. Required in the `SELECT` clause. */
  trafficSource?: "TRAFFIC_SOURCE_ENUM_UNSPECIFIED" | "ORGANIC" | "ADS" | "ALL" | (string & {});
  /** [Higher position rate] (https://support.google.com/merchants/answer/11366442#zippy=%2Chigher-position-rate) shows how often a competitor’s offer got placed in a higher position on the page than your offer. Cannot be filtered on in the 'WHERE' clause. */
  higherPositionRate?: number;
  /** Domain of your competitor or your domain, if 'is_your_domain' is true. Required in the `SELECT` clause. Cannot be filtered on in the 'WHERE' clause. */
  domain?: string;
  /** True if this row contains data for your domain. Cannot be filtered on in the 'WHERE' clause. */
  isYourDomain?: boolean;
  /** [Ads / organic ratio] (https://support.google.com/merchants/answer/11366442#zippy=%2Cads-free-ratio) shows how often the domain receives impressions from Shopping ads compared to organic traffic. The number is rounded and bucketed. Cannot be filtered on in the 'WHERE' clause. */
  adsOrganicRatio?: number;
  /** [Page overlap rate] (https://support.google.com/merchants/answer/11366442#zippy=%2Cpage-overlap-rate) shows how frequently competing retailers’ offers are shown together with your offers on the same page. Cannot be filtered on in the 'WHERE' clause. */
  pageOverlapRate?: number;
  /** Google product category ID to calculate the report for, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). Required in the `SELECT` clause. A condition on `report_category_id` is required in the `WHERE` clause. */
  reportCategoryId?: string;
}

export const CompetitiveVisibilityTopMerchantView: Schema.Schema<CompetitiveVisibilityTopMerchantView> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Merchantapi_Date),
  rank: Schema.optional(Schema.String),
  reportCountryCode: Schema.optional(Schema.String),
  trafficSource: Schema.optional(Schema.String),
  higherPositionRate: Schema.optional(Schema.Number),
  domain: Schema.optional(Schema.String),
  isYourDomain: Schema.optional(Schema.Boolean),
  adsOrganicRatio: Schema.optional(Schema.Number),
  pageOverlapRate: Schema.optional(Schema.Number),
  reportCategoryId: Schema.optional(Schema.String),
})).annotate({ identifier: "CompetitiveVisibilityTopMerchantView" }) as any as Schema.Schema<CompetitiveVisibilityTopMerchantView>;

export interface ProductPerformanceView {
  /** Custom label 0 for custom grouping of products. Segment. */
  customLabel0?: string;
  /** [Product category (2nd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. Segment. */
  categoryL2?: string;
  /** Custom label 2 for custom grouping of products. Segment. */
  customLabel2?: string;
  /** Brand of the product. Segment. */
  brand?: string;
  /** [Product type (1st level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. Segment. */
  productTypeL1?: string;
  /** [Product category (3rd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. Segment. */
  categoryL3?: string;
  /** [Product type (5th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. Segment. */
  productTypeL5?: string;
  /** Value of conversions attributed to the product, reported on the conversion date. Metric. Available only for the `FREE` traffic source. */
  conversionValue?: Price;
  /** Custom label 3 for custom grouping of products. Segment. */
  customLabel3?: string;
  /** Custom label 4 for custom grouping of products. Segment. */
  customLabel4?: string;
  /** Code of the country where the customer is located at the time of the event. Represented in the ISO 3166 format. Segment. If the customer country cannot be determined, a special 'ZZ' code is returned. */
  customerCountryCode?: string;
  /** Number of times merchant's products are shown. Metric. */
  impressions?: string;
  /** Number of conversions attributed to the product, reported on the conversion date. Depending on the attribution model, a conversion might be distributed across multiple clicks, where each click gets its own credit assigned. This metric is a sum of all such credits. Metric. Available only for the `FREE` traffic source. */
  conversions?: number;
  /** [Product category (1st level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. Segment. */
  categoryL1?: string;
  /** [Product category (5th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. Segment. */
  categoryL5?: string;
  /** Number of clicks. Metric. */
  clicks?: string;
  /** Marketing method to which metrics apply. Segment. */
  marketingMethod?: "MARKETING_METHOD_ENUM_UNSPECIFIED" | "ORGANIC" | "ADS" | (string & {});
  /** Click-through rate - the number of clicks merchant's products receive (clicks) divided by the number of times the products are shown (impressions). Metric. */
  clickThroughRate?: number;
  /** Title of the product. Segment. */
  title?: string;
  /** Custom label 1 for custom grouping of products. Segment. */
  customLabel1?: string;
  /** [Product type (4th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. Segment. */
  productTypeL4?: string;
  /** Date in the merchant timezone to which metrics apply. Segment. Condition on `date` is required in the `WHERE` clause. */
  date?: Merchantapi_Date;
  /** [Product type (2nd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. Segment. */
  productTypeL2?: string;
  /** First day of the week (Monday) of the metrics date in the merchant timezone. Segment. */
  week?: Merchantapi_Date;
  /** [Product type (3rd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. Segment. */
  productTypeL3?: string;
  /** Merchant-provided id of the product. Segment. */
  offerId?: string;
  /** [Product category (4th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. Segment. */
  categoryL4?: string;
  /** Number of conversions divided by the number of clicks, reported on the impression date. Metric. Available only for the `FREE` traffic source. */
  conversionRate?: number;
}

export const ProductPerformanceView: Schema.Schema<ProductPerformanceView> = Schema.suspend(() => Schema.Struct({
  customLabel0: Schema.optional(Schema.String),
  categoryL2: Schema.optional(Schema.String),
  customLabel2: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  productTypeL1: Schema.optional(Schema.String),
  categoryL3: Schema.optional(Schema.String),
  productTypeL5: Schema.optional(Schema.String),
  conversionValue: Schema.optional(Price),
  customLabel3: Schema.optional(Schema.String),
  customLabel4: Schema.optional(Schema.String),
  customerCountryCode: Schema.optional(Schema.String),
  impressions: Schema.optional(Schema.String),
  conversions: Schema.optional(Schema.Number),
  categoryL1: Schema.optional(Schema.String),
  categoryL5: Schema.optional(Schema.String),
  clicks: Schema.optional(Schema.String),
  marketingMethod: Schema.optional(Schema.String),
  clickThroughRate: Schema.optional(Schema.Number),
  title: Schema.optional(Schema.String),
  customLabel1: Schema.optional(Schema.String),
  productTypeL4: Schema.optional(Schema.String),
  date: Schema.optional(Merchantapi_Date),
  productTypeL2: Schema.optional(Schema.String),
  week: Schema.optional(Merchantapi_Date),
  productTypeL3: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  categoryL4: Schema.optional(Schema.String),
  conversionRate: Schema.optional(Schema.Number),
})).annotate({ identifier: "ProductPerformanceView" }) as any as Schema.Schema<ProductPerformanceView>;

export interface CompetitiveVisibilityBenchmarkView {
  /** Traffic source of impressions. Required in the `SELECT` clause. */
  trafficSource?: "TRAFFIC_SOURCE_ENUM_UNSPECIFIED" | "ORGANIC" | "ADS" | "ALL" | (string & {});
  /** Change in visibility based on impressions for your domain with respect to the start of the selected time range (or first day with non-zero impressions). Cannot be filtered on in the 'WHERE' clause. */
  yourDomainVisibilityTrend?: number;
  /** Change in visibility based on impressions with respect to the start of the selected time range (or first day with non-zero impressions) for a combined set of merchants with highest visibility approximating the market. Cannot be filtered on in the 'WHERE' clause. */
  categoryBenchmarkVisibilityTrend?: number;
  /** Country where impressions appeared. Required in the `SELECT` clause. A condition on `report_country_code` is required in the `WHERE` clause. */
  reportCountryCode?: string;
  /** Date of this row. Required in the `SELECT` clause. A condition on `date` is required in the `WHERE` clause. */
  date?: Merchantapi_Date;
  /** Google product category ID to calculate the report for, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). Required in the `SELECT` clause. A condition on `report_category_id` is required in the `WHERE` clause. */
  reportCategoryId?: string;
}

export const CompetitiveVisibilityBenchmarkView: Schema.Schema<CompetitiveVisibilityBenchmarkView> = Schema.suspend(() => Schema.Struct({
  trafficSource: Schema.optional(Schema.String),
  yourDomainVisibilityTrend: Schema.optional(Schema.Number),
  categoryBenchmarkVisibilityTrend: Schema.optional(Schema.Number),
  reportCountryCode: Schema.optional(Schema.String),
  date: Schema.optional(Merchantapi_Date),
  reportCategoryId: Schema.optional(Schema.String),
})).annotate({ identifier: "CompetitiveVisibilityBenchmarkView" }) as any as Schema.Schema<CompetitiveVisibilityBenchmarkView>;

export interface NonProductPerformanceView {
  /** Number of times images and online store links leading to your non-product pages were shown. Metric. */
  impressions?: string;
  /** Click-through rate - the number of clicks (`clicks`) divided by the number of impressions (`impressions`) of images and online store links leading to your non-product pages. Metric. */
  clickThroughRate?: number;
  /** First day of the week (Monday) of the metrics date in the merchant timezone. Segment. */
  week?: Merchantapi_Date;
  /** Date in the merchant timezone to which metrics apply. Segment. Condition on `date` is required in the `WHERE` clause. */
  date?: Merchantapi_Date;
  /** Number of clicks on images and online store links leading to your non-product pages. Metric. */
  clicks?: string;
}

export const NonProductPerformanceView: Schema.Schema<NonProductPerformanceView> = Schema.suspend(() => Schema.Struct({
  impressions: Schema.optional(Schema.String),
  clickThroughRate: Schema.optional(Schema.Number),
  week: Schema.optional(Merchantapi_Date),
  date: Schema.optional(Merchantapi_Date),
  clicks: Schema.optional(Schema.String),
})).annotate({ identifier: "NonProductPerformanceView" }) as any as Schema.Schema<NonProductPerformanceView>;

export interface StatusPerReportingContext {
  /** Reporting context the status applies to. */
  reportingContext?: "REPORTING_CONTEXT_ENUM_UNSPECIFIED" | "SHOPPING_ADS" | "DISCOVERY_ADS" | "DEMAND_GEN_ADS" | "DEMAND_GEN_ADS_DISCOVER_SURFACE" | "VIDEO_ADS" | "DISPLAY_ADS" | "LOCAL_INVENTORY_ADS" | "VEHICLE_INVENTORY_ADS" | "FREE_LISTINGS" | "FREE_LISTINGS_UCP_CHECKOUT" | "FREE_LOCAL_LISTINGS" | "FREE_LOCAL_VEHICLE_LISTINGS" | "YOUTUBE_AFFILIATE" | "YOUTUBE_SHOPPING" | "CLOUD_RETAIL" | "LOCAL_CLOUD_RETAIL" | "PRODUCT_REVIEWS" | "MERCHANT_REVIEWS" | "YOUTUBE_CHECKOUT" | (string & {});
  /** List of approved countries in the reporting context, represented in [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format, for example, `US`. */
  approvedCountries?: Array<string>;
  /** List of disapproved countries in the reporting context, represented in [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format, for example, `US`. */
  disapprovedCountries?: Array<string>;
  /** List of pending countries in the reporting context, represented in [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format, for example, `US`. */
  pendingCountries?: Array<string>;
}

export const StatusPerReportingContext: Schema.Schema<StatusPerReportingContext> = Schema.suspend(() => Schema.Struct({
  reportingContext: Schema.optional(Schema.String),
  approvedCountries: Schema.optional(Schema.Array(Schema.String)),
  disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
  pendingCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "StatusPerReportingContext" }) as any as Schema.Schema<StatusPerReportingContext>;

export interface ItemIssueSeverity {
  /** Aggregated severity of the issue for all reporting contexts it affects. Reporting contexts included in the computation of the aggregated severity can be restricted using a filter on the `reporting_context` field. **This field can be used for filtering the results.** */
  aggregatedSeverity?: "AGGREGATED_ISSUE_SEVERITY_UNSPECIFIED" | "DISAPPROVED" | "DEMOTED" | "PENDING" | (string & {});
  /** Issue severity per reporting context. Reporting contexts included in this list can be restricted using a filter on the `reporting_context` field. */
  severityPerReportingContext?: Array<IssueSeverityPerReportingContext>;
}

export const ItemIssueSeverity: Schema.Schema<ItemIssueSeverity> = Schema.suspend(() => Schema.Struct({
  aggregatedSeverity: Schema.optional(Schema.String),
  severityPerReportingContext: Schema.optional(Schema.Array(IssueSeverityPerReportingContext)),
})).annotate({ identifier: "ItemIssueSeverity" }) as any as Schema.Schema<ItemIssueSeverity>;

export interface ItemIssueType {
  /** Error code of the issue, equivalent to the `code` of [Product issues](https://developers.google.com/shopping-content/guides/product-issues). */
  code?: string;
  /** Canonical attribute name for attribute-specific issues. */
  canonicalAttribute?: string;
}

export const ItemIssueType: Schema.Schema<ItemIssueType> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  canonicalAttribute: Schema.optional(Schema.String),
})).annotate({ identifier: "ItemIssueType" }) as any as Schema.Schema<ItemIssueType>;

export interface ItemIssue {
  /** Item issue severity. */
  severity?: ItemIssueSeverity;
  /** Item issue resolution. */
  resolution?: "ITEM_ISSUE_RESOLUTION_UNSPECIFIED" | "MERCHANT_ACTION" | "PENDING_PROCESSING" | (string & {});
  /** Item issue type. */
  type?: ItemIssueType;
}

export const ItemIssue: Schema.Schema<ItemIssue> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(ItemIssueSeverity),
  resolution: Schema.optional(Schema.String),
  type: Schema.optional(ItemIssueType),
})).annotate({ identifier: "ItemIssue" }) as any as Schema.Schema<ItemIssue>;

export interface ProductView {
  /** Link to the processed image of the product, hosted on the Google infrastructure. */
  thumbnailLink?: string;
  /** Language code of the product in BCP 47 format. */
  languageCode?: string;
  /** Product category (3rd level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL3?: string;
  /** Product type (5th level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL5?: string;
  /** Brand of the product. */
  brand?: string;
  /** Product type (1st level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL1?: string;
  /** Estimated performance potential compared to highest performing products of the merchant. */
  clickPotential?: "CLICK_POTENTIAL_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
  /** Detailed product status per reporting context. Reporting contexts included in this list can be restricted using a filter on the `reporting_context` field. Equivalent to `ProductStatus.destination_statuses` in Products API. **This field cannot be used for sorting or filtering the results.** */
  statusPerReportingContext?: Array<StatusPerReportingContext>;
  /** Product category (2nd level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL2?: string;
  /** Product category (5th level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL5?: string;
  /** List of Global Trade Item Numbers (GTINs) of the product. */
  gtin?: Array<string>;
  /** Normalized [shipping label](https://support.google.com/merchants/answer/6324504) specified in the data source. */
  shippingLabel?: string;
  /** Feed label of the product. */
  feedLabel?: string;
  /** Product category (1st level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL1?: string;
  /** Channel of the product. Can be `ONLINE` or `LOCAL`. */
  channel?: "CHANNEL_ENUM_UNSPECIFIED" | "ONLINE" | "LOCAL" | (string & {});
  /** REST ID of the product, in the form of `channel~languageCode~feedLabel~offerId`. Merchant API methods that operate on products take this as their `name` parameter. Required in the `SELECT` clause. */
  id?: string;
  /** The time the merchant created the product in timestamp seconds. */
  creationTime?: string;
  /** Reporting context to restrict the query to. Restricts the reporting contexts returned in `status_per_reporting_context` and `item_issues`, and used to compute `aggregated_reporting_context_status`. **This field can only be used in the `WHERE` clause and cannot be selected in the `SELECT` clause.** */
  reportingContext?: "REPORTING_CONTEXT_ENUM_UNSPECIFIED" | "SHOPPING_ADS" | "DISCOVERY_ADS" | "DEMAND_GEN_ADS" | "DEMAND_GEN_ADS_DISCOVER_SURFACE" | "VIDEO_ADS" | "DISPLAY_ADS" | "LOCAL_INVENTORY_ADS" | "VEHICLE_INVENTORY_ADS" | "FREE_LISTINGS" | "FREE_LISTINGS_UCP_CHECKOUT" | "FREE_LOCAL_LISTINGS" | "FREE_LOCAL_VEHICLE_LISTINGS" | "YOUTUBE_AFFILIATE" | "YOUTUBE_SHOPPING" | "CLOUD_RETAIL" | "LOCAL_CLOUD_RETAIL" | "PRODUCT_REVIEWS" | "MERCHANT_REVIEWS" | "YOUTUBE_CHECKOUT" | (string & {});
  /** List of item issues for the product. **This field cannot be used for sorting the results.** **Only selected attributes of this field (for example, `item_issues.severity.aggregated_severity`) can be used for filtering the results.** */
  itemIssues?: Array<ItemIssue>;
  /** Normalized click potential of the product. Values range from 1 to 1000, where 1 is the highest click potential and 1000 is the theoretical lowest. */
  clickPotentialRank?: string;
  /** Product type (4th level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL4?: string;
  /** Title of the product. */
  title?: string;
  /** Expiration date for the product, specified on insertion. */
  expirationDate?: Merchantapi_Date;
  /** Aggregated status across all reporting contexts. Reporting contexts included in the computation of the aggregated status can be restricted using a filter on the `reporting_context` field. */
  aggregatedReportingContextStatus?: "AGGREGATED_REPORTING_CONTEXT_STATUS_UNSPECIFIED" | "NOT_ELIGIBLE_OR_DISAPPROVED" | "PENDING" | "ELIGIBLE_LIMITED" | "ELIGIBLE" | (string & {});
  /** Product category (4th level) in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL4?: string;
  /** Item group id provided by the merchant for grouping variants together. */
  itemGroupId?: string;
  /** Product type (3rd level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL3?: string;
  /** Merchant-provided id of the product. */
  offerId?: string;
  /** Product price. Absent if the information about the price of the product is not available. */
  price?: Price;
  /** [Availability](https://support.google.com/merchants/answer/6324448) of the product. */
  availability?: string;
  /** Product type (2nd level) in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324406). */
  productTypeL2?: string;
  /** [Condition](https://support.google.com/merchants/answer/6324469) of the product. */
  condition?: string;
}

export const ProductView: Schema.Schema<ProductView> = Schema.suspend(() => Schema.Struct({
  thumbnailLink: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  categoryL3: Schema.optional(Schema.String),
  productTypeL5: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  productTypeL1: Schema.optional(Schema.String),
  clickPotential: Schema.optional(Schema.String),
  statusPerReportingContext: Schema.optional(Schema.Array(StatusPerReportingContext)),
  categoryL2: Schema.optional(Schema.String),
  categoryL5: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.Array(Schema.String)),
  shippingLabel: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  categoryL1: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  reportingContext: Schema.optional(Schema.String),
  itemIssues: Schema.optional(Schema.Array(ItemIssue)),
  clickPotentialRank: Schema.optional(Schema.String),
  productTypeL4: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  expirationDate: Schema.optional(Merchantapi_Date),
  aggregatedReportingContextStatus: Schema.optional(Schema.String),
  categoryL4: Schema.optional(Schema.String),
  itemGroupId: Schema.optional(Schema.String),
  productTypeL3: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  availability: Schema.optional(Schema.String),
  productTypeL2: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductView" }) as any as Schema.Schema<ProductView>;

export interface ReportRow {
  /** Fields available for query in `price_competitiveness_product_view` table. */
  priceCompetitivenessProductView?: PriceCompetitivenessProductView;
  /** Fields available for query in `competitive_visibility_top_merchant_view` table. */
  competitiveVisibilityTopMerchantView?: CompetitiveVisibilityTopMerchantView;
  /** Fields available for query in `best_sellers_brand_view` table. */
  bestSellersBrandView?: BestSellersBrandView;
  /** Fields available for query in `product_performance_view` table. */
  productPerformanceView?: ProductPerformanceView;
  /** Fields available for query in `competitive_visibility_competitor_view` table. */
  competitiveVisibilityCompetitorView?: CompetitiveVisibilityCompetitorView;
  /** Fields available for query in `best_sellers_product_cluster_view` table. */
  bestSellersProductClusterView?: BestSellersProductClusterView;
  /** Fields available for query in `competitive_visibility_benchmark_view` table. */
  competitiveVisibilityBenchmarkView?: CompetitiveVisibilityBenchmarkView;
  /** Fields available for query in `non_product_performance_view` table. */
  nonProductPerformanceView?: NonProductPerformanceView;
  /** Fields available for query in `product_view` table. */
  productView?: ProductView;
  /** Fields available for query in `price_insights_product_view` table. */
  priceInsightsProductView?: PriceInsightsProductView;
}

export const ReportRow: Schema.Schema<ReportRow> = Schema.suspend(() => Schema.Struct({
  priceCompetitivenessProductView: Schema.optional(PriceCompetitivenessProductView),
  competitiveVisibilityTopMerchantView: Schema.optional(CompetitiveVisibilityTopMerchantView),
  bestSellersBrandView: Schema.optional(BestSellersBrandView),
  productPerformanceView: Schema.optional(ProductPerformanceView),
  competitiveVisibilityCompetitorView: Schema.optional(CompetitiveVisibilityCompetitorView),
  bestSellersProductClusterView: Schema.optional(BestSellersProductClusterView),
  competitiveVisibilityBenchmarkView: Schema.optional(CompetitiveVisibilityBenchmarkView),
  nonProductPerformanceView: Schema.optional(NonProductPerformanceView),
  productView: Schema.optional(ProductView),
  priceInsightsProductView: Schema.optional(PriceInsightsProductView),
})).annotate({ identifier: "ReportRow" }) as any as Schema.Schema<ReportRow>;

export interface SearchResponse {
  /** Token which can be sent as `page_token` to retrieve the next page. If omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Rows that matched the search query. */
  results?: Array<ReportRow>;
}

export const SearchResponse: Schema.Schema<SearchResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(ReportRow)),
})).annotate({ identifier: "SearchResponse" }) as any as Schema.Schema<SearchResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SearchAccountsReportsRequest {
  /** Required. Id of the account making the call. Must be a standalone account or an MCA subaccount. Format: accounts/{account} */
  parent: string;
  /** Request body */
  body?: SearchRequest;
}

export const SearchAccountsReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SearchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "reports/v1beta/accounts/{accountsId}/reports:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchAccountsReportsRequest>;

export type SearchAccountsReportsResponse = SearchResponse;
export const SearchAccountsReportsResponse = SearchResponse;

export type SearchAccountsReportsError = DefaultErrors;

/** Retrieves a report defined by a search query. The response might contain fewer rows than specified by `page_size`. Rely on `next_page_token` to determine if there are more rows to be requested. */
export const searchAccountsReports: API.OperationMethod<SearchAccountsReportsRequest, SearchAccountsReportsResponse, SearchAccountsReportsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SearchAccountsReportsRequest,
  output: SearchAccountsReportsResponse,
  errors: [],
}));

