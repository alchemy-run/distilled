// ==========================================================================
// Merchant API (merchantapi promotions_v1beta)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "merchantapi",
  version: "promotions_v1beta",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ProductChange {
  /** The old value of the changed resource or attribute. If empty, it means that the product was created. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  oldValue?: string;
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
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
  /** Countries that have the change (if applicable). Represented in the ISO 3166 format. */
  regionCode?: string;
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() =>
  Schema.Struct({
    oldValue: Schema.optional(Schema.String),
    reportingContext: Schema.optional(Schema.String),
    newValue: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ProductChange",
}) as any as Schema.Schema<ProductChange>;

export interface ItemLevelIssue {
  /** Output only. The destination the issue applies to. */
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
  /** Output only. A short issue description in English. */
  description?: string;
  /** Output only. The error code of the issue. */
  code?: string;
  /** Output only. Whether the issue can be resolved by the merchant. */
  resolution?: string;
  /** Output only. How this issue affects serving of the promotion. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "NOT_IMPACTED"
    | "DEMOTED"
    | "DISAPPROVED"
    | (string & {});
  /** Output only. The attribute's name, if the issue is caused by a single attribute. */
  attribute?: string;
  /** Output only. A detailed issue description in English. */
  detail?: string;
  /** Output only. The URL of a web page to help with resolving this issue. */
  documentation?: string;
  /** Output only. List of country codes (ISO 3166-1 alpha-2) where issue applies to the offer. */
  applicableCountries?: Array<string>;
}

export const ItemLevelIssue: Schema.Schema<ItemLevelIssue> = Schema.suspend(
  () =>
    Schema.Struct({
      reportingContext: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      resolution: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
      documentation: Schema.optional(Schema.String),
      applicableCountries: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "ItemLevelIssue",
}) as any as Schema.Schema<ItemLevelIssue>;

export interface ProductStatusChangeMessage {
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** The product id. */
  resourceId?: string;
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> =
  Schema.suspend(() =>
    Schema.Struct({
      managingAccount: Schema.optional(Schema.String),
      resourceType: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      resourceId: Schema.optional(Schema.String),
      account: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
      expirationTime: Schema.optional(Schema.String),
      changes: Schema.optional(Schema.Array(ProductChange)),
      eventTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStatusChangeMessage",
  }) as any as Schema.Schema<ProductStatusChangeMessage>;

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

export interface Interval {
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
}

export const Interval: Schema.Schema<Interval> = Schema.suspend(() =>
  Schema.Struct({
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

export interface Attributes {
  /** Required. The list of destinations (also known as [Marketing methods](https://support.google.com/merchants/answer/15130232)) where the promotion applies to. If you don't specify a destination by including a supported value in your data source, your promotion will display in Shopping ads and free listings by default. You may have previously submitted the following values as destinations for your products: Shopping Actions, Surfaces across Google, Local surfaces across Google. To represent these values use `FREE_LISTINGS`, `FREE_LOCAL_LISTINGS`, `LOCAL_INVENTORY_ADS`. For more details see [Promotion destination](https://support.google.com/merchants/answer/13837465) */
  promotionDestinations?: Array<
    | "DESTINATION_ENUM_UNSPECIFIED"
    | "SHOPPING_ADS"
    | "DISPLAY_ADS"
    | "LOCAL_INVENTORY_ADS"
    | "FREE_LISTINGS"
    | "FREE_LOCAL_LISTINGS"
    | "YOUTUBE_SHOPPING"
    | "YOUTUBE_SHOPPING_CHECKOUT"
    | "YOUTUBE_AFFILIATE"
    | "FREE_VEHICLE_LISTINGS"
    | "VEHICLE_ADS"
    | "CLOUD_RETAIL"
    | "LOCAL_CLOUD_RETAIL"
    | (string & {})
  >;
  /** Optional. Product filter by [item ID](https://support.google.com/merchants/answer/13861565?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). */
  itemIdInclusion?: Array<string>;
  /** Optional. Product filter by [product type exclusion](https://support.google.com/merchants/answer/13863746?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). */
  productTypeExclusion?: Array<string>;
  /** Optional. [Maximum purchase quantity](https://support.google.com/merchants/answer/13861564?ref_topic=13773355) for the promotion. */
  limitQuantity?: string;
  /** Optional. The maximum monetary discount a customer can receive for the promotion. This field is only supported with the `Percent off` coupon value type. */
  maxDiscountAmount?: Price;
  /** Optional. Maximum percent off for a promotion with `PERCENT_OFF_RANGE` coupon value type. At least one of `min_percent_off` or `max_percent_off` must be present when the coupon value type is `PERCENT_OFF_RANGE`. If neither is provided an `INVALID_PROMOTION_MISSING_BENEFIT_OR_RESTRICTION` error is returned. */
  maxPercentOff?: string;
  /** Optional. Product filter by product type for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). */
  productTypeInclusion?: Array<string>;
  /** Optional. This field defines the audience a promotion will be visible to. */
  audience?:
    | "AUDIENCE_UNSPECIFIED"
    | "NEW_CUSTOMERS"
    | "LOCATION"
    | (string & {});
  /** Optional. `TimePeriod` representation of the promotion's display dates. This attribute specifies the date and time frame when the promotion will be live on Google.com and Shopping ads. If the display time period for promotion `promotion_display_time_period` attribute is not specified, the promotion effective time period `promotion_effective_time_period` determines the date and time frame when the promotion will be live on Google.com and Shopping ads. */
  promotionDisplayTimePeriod?: Interval;
  /** Optional. Product filter by item group ID for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability [product_applicability] attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). */
  itemGroupIdInclusion?: Array<string>;
  minimumPurchaseQuantity?: string;
  /** Optional. A restriction customers must meet before they can redeem the promotion. */
  redemptionRestriction?:
    | "REDEMPTION_RESTRICTION_UNSPECIFIED"
    | "SUBSCRIBE"
    | "FIRST_ORDER"
    | "SIGNUP_FOR_EMAIL"
    | "SIGNUP_FOR_TEXT"
    | "CUSTOM"
    | (string & {});
  /** Optional. [Store codes to include](https://support.google.com/merchants/answer/13857470?ref_topic=13773355) for the promotion. The store filter attributes only applies when the `store_applicability` attribute is set to [specific_stores](https://support.google.com/merchants/answer/13857563?ref_topic=13773355). Store code (the store ID from your Business Profile) of the physical store the product is sold in. See the [Local product inventory data specification](https://support.google.com/merchants/answer/3061342) for more information. */
  storeCodesInclusion?: Array<string>;
  /** Optional. Minimum money off amount for a promotion with `MONEY_OFF_RANGE` coupon value type. At least one of `min_money_off_amount` or `max_money_off_amount` must be present when the coupon value type is `MONEY_OFF_RANGE`. If neither is provided an `INVALID_PROMOTION_MISSING_BENEFIT_OR_RESTRICTION` error is returned. */
  minMoneyOffAmount?: Price;
  /** Required. [Type](https://support.google.com/merchants/answer/13837405?ref_topic=13773355) of the promotion. Use this attribute to indicate whether or not customers need a coupon code to redeem your promotion. */
  offerType?:
    | "OFFER_TYPE_UNSPECIFIED"
    | "NO_CODE"
    | "GENERIC_CODE"
    | (string & {});
  /** Optional. The custom redemption restriction for the promotion. If the `redemption_restriction` field is set to `CUSTOM`, this field must be set. */
  customRedemptionRestriction?: string;
  /** Optional. Event applicability for this promotion. When present, this field indicates you are creating a [sales event](https://support.google.com/merchants/answer/15523289) and not a product promotion. Exactly one of `product_applicability` or `event_applicability` must be set. */
  eventApplicability?:
    | "EVENT_APPLICABILITY_UNSPECIFIED"
    | "SITEWIDE"
    | "SPECIFIC_CATEGORIES"
    | (string & {});
  /** Optional. Maximum money off amount for a promotion with `MONEY_OFF_RANGE` coupon value type. At least one of `min_money_off_amount` or `max_money_off_amount` must be present when the coupon value type is `MONEY_OFF_RANGE`. If neither is provided an `INVALID_PROMOTION_MISSING_BENEFIT_OR_RESTRICTION` error is returned. */
  maxMoneyOffAmount?: Price;
  /** Optional. [Maximum product price](https://support.google.com/merchants/answer/2906014) for promotion. */
  limitValue?: Price;
  /** Optional. Minimum percent off for a promotion with `PERCENT_OFF_RANGE` coupon value type. At least one of `min_percent_off` or `max_percent_off` must be present when the coupon value type is `PERCENT_OFF_RANGE`. If neither is provided an `INVALID_PROMOTION_MISSING_BENEFIT_OR_RESTRICTION` error is returned. */
  minPercentOff?: string;
  /** Optional. Whether the promotion applies to [all stores, or only specified stores](https://support.google.com/merchants/answer/13857563?sjid=17642868584668136159-NC). Local Inventory ads promotions throw an error if no store applicability is included. An `INVALID_ARGUMENT` error is thrown if `store_applicability` is set to `ALL_STORES` and `store_codes_inclusion` or `score_code_exclusion` is set to a value. */
  storeApplicability?:
    | "STORE_APPLICABILITY_UNSPECIFIED"
    | "ALL_STORES"
    | "SPECIFIC_STORES"
    | (string & {});
  /** Optional. A list of Google product categories for this promotion. Set if `EventApplicability` is `SPECIFIC_CATEGORIES`. Up to 5 product categories can be specified. For more details on eligible values for product categories, checkout the `google_product_category` attribute in the [Promotion data specification](https://support.google.com/merchants/answer/2906014). */
  googleProductCategories?: Array<string>;
  /** Optional. [Store codes to exclude](https://support.google.com/merchants/answer/13859586?ref_topic=13773355) for the promotion. The store filter attributes only applies when the `store_applicability` attribute is set to [specific_stores](https://support.google.com/merchants/answer/13857563?ref_topic=13773355). */
  storeCodesExclusion?: Array<string>;
  /** Optional. Product filter by [item ID exclusion](https://support.google.com/merchants/answer/13863524?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). */
  itemIdExclusion?: Array<string>;
  /** Required. The [coupon value type] (https://support.google.com/merchants/answer/13861986?ref_topic=13773355) attribute to signal the type of promotion that you are running. Depending on type of the selected coupon value [some attributes are required](https://support.google.com/merchants/answer/6393006?ref_topic=7322920). */
  couponValueType?:
    | "COUPON_VALUE_TYPE_UNSPECIFIED"
    | "MONEY_OFF"
    | "PERCENT_OFF"
    | "BUY_M_GET_N_MONEY_OFF"
    | "BUY_M_GET_N_PERCENT_OFF"
    | "BUY_M_GET_MONEY_OFF"
    | "BUY_M_GET_PERCENT_OFF"
    | "FREE_GIFT"
    | "FREE_GIFT_WITH_VALUE"
    | "FREE_GIFT_WITH_ITEM_ID"
    | "FREE_SHIPPING_STANDARD"
    | "FREE_SHIPPING_OVERNIGHT"
    | "FREE_SHIPPING_TWO_DAY"
    | "MONEY_OFF_RANGE"
    | "PERCENT_OFF_RANGE"
    | (string & {});
  /** Optional. [Free gift value](https://support.google.com/merchants/answer/13844477?ref_topic=13773355) for the promotion. */
  freeGiftValue?: Price;
  /** Optional. [Free gift item ID](https://support.google.com/merchants/answer/13857152?ref_topic=13773355) for the promotion. */
  freeGiftItemId?: string;
  /** Optional. [Free gift description](https://support.google.com/merchants/answer/13847245?ref_topic=13773355) for the promotion. */
  freeGiftDescription?: string;
  /** Optional. A list of [regions](https://support.google.com/merchants/answer/15406457?#howregionswork) where the promotion is applicable. Must be set if `audience` is set to `LOCATION`. */
  regionIdInclusion?: Array<string>;
  /** Optional. Product filter by brand for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). */
  brandInclusion?: Array<string>;
  /** Optional. Applicability of the promotion to either all products or [only specific products](https://support.google.com/merchants/answer/6396257). Exactly one of `product_applicability` or `event_applicability` must be set. */
  productApplicability?:
    | "PRODUCT_APPLICABILITY_UNSPECIFIED"
    | "ALL_PRODUCTS"
    | "SPECIFIC_PRODUCTS"
    | (string & {});
  /** Optional. [Minimum purchase amount](https://support.google.com/merchants/answer/13837705?ref_topic=13773355) for the promotion. */
  minimumPurchaseAmount?: Price;
  /** Optional. The number of items discounted in the promotion. The attribute is set when `couponValueType` is equal to `buy_m_get_n_money_off` or `buy_m_get_n_percent_off`. */
  getThisQuantityDiscounted?: string;
  /** Optional. Product filter by [item group ID](https://support.google.com/merchants/answer/13837298?ref_topic=13773355). The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). exclusion for the promotion. */
  itemGroupIdExclusion?: Array<string>;
  /** Optional. The [percentage discount](https://support.google.com/merchants/answer/13837404?sjid=17642868584668136159-NC) offered in the promotion. */
  percentOff?: string;
  /** Optional. URL to the page on the merchant's site where the promotion shows. Local Inventory ads promotions throw an error if no `promotion_url` is included. URL is used to confirm that the promotion is valid and can be redeemed. */
  promotionUrl?: string;
  /** Required. [Long title](https://support.google.com/merchants/answer/13838102?ref_topic=13773355) for the promotion. */
  longTitle?: string;
  /** Optional. Generic redemption code for the promotion. To be used with the `offerType` field and must meet the [minimum requirements](https://support.google.com/merchants/answer/13837405?ref_topic=13773355). */
  genericRedemptionCode?: string;
  /** Required. `TimePeriod` representation of the promotion's effective dates. This attribute specifies that the promotion can be tested on your online store during this time period. */
  promotionEffectiveTimePeriod?: Interval;
  /** Optional. Product filter by [brand exclusion](https://support.google.com/merchants/answer/13861679?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). */
  brandExclusion?: Array<string>;
  /** Optional. The [money off amount](https://support.google.com/merchants/answer/13838101?ref_topic=13773355) offered in the promotion. */
  moneyOffAmount?: Price;
}

export const Attributes: Schema.Schema<Attributes> = Schema.suspend(() =>
  Schema.Struct({
    promotionDestinations: Schema.optional(Schema.Array(Schema.String)),
    itemIdInclusion: Schema.optional(Schema.Array(Schema.String)),
    productTypeExclusion: Schema.optional(Schema.Array(Schema.String)),
    limitQuantity: Schema.optional(Schema.String),
    maxDiscountAmount: Schema.optional(Price),
    maxPercentOff: Schema.optional(Schema.String),
    productTypeInclusion: Schema.optional(Schema.Array(Schema.String)),
    audience: Schema.optional(Schema.String),
    promotionDisplayTimePeriod: Schema.optional(Interval),
    itemGroupIdInclusion: Schema.optional(Schema.Array(Schema.String)),
    minimumPurchaseQuantity: Schema.optional(Schema.String),
    redemptionRestriction: Schema.optional(Schema.String),
    storeCodesInclusion: Schema.optional(Schema.Array(Schema.String)),
    minMoneyOffAmount: Schema.optional(Price),
    offerType: Schema.optional(Schema.String),
    customRedemptionRestriction: Schema.optional(Schema.String),
    eventApplicability: Schema.optional(Schema.String),
    maxMoneyOffAmount: Schema.optional(Price),
    limitValue: Schema.optional(Price),
    minPercentOff: Schema.optional(Schema.String),
    storeApplicability: Schema.optional(Schema.String),
    googleProductCategories: Schema.optional(Schema.Array(Schema.String)),
    storeCodesExclusion: Schema.optional(Schema.Array(Schema.String)),
    itemIdExclusion: Schema.optional(Schema.Array(Schema.String)),
    couponValueType: Schema.optional(Schema.String),
    freeGiftValue: Schema.optional(Price),
    freeGiftItemId: Schema.optional(Schema.String),
    freeGiftDescription: Schema.optional(Schema.String),
    regionIdInclusion: Schema.optional(Schema.Array(Schema.String)),
    brandInclusion: Schema.optional(Schema.Array(Schema.String)),
    productApplicability: Schema.optional(Schema.String),
    minimumPurchaseAmount: Schema.optional(Price),
    getThisQuantityDiscounted: Schema.optional(Schema.String),
    itemGroupIdExclusion: Schema.optional(Schema.Array(Schema.String)),
    percentOff: Schema.optional(Schema.String),
    promotionUrl: Schema.optional(Schema.String),
    longTitle: Schema.optional(Schema.String),
    genericRedemptionCode: Schema.optional(Schema.String),
    promotionEffectiveTimePeriod: Schema.optional(Interval),
    brandExclusion: Schema.optional(Schema.Array(Schema.String)),
    moneyOffAmount: Schema.optional(Price),
  }),
).annotate({ identifier: "Attributes" }) as any as Schema.Schema<Attributes>;

export interface DestinationStatus {
  /** Output only. The name of the promotion destination. */
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
  /** Output only. The status for the specified destination. */
  status?:
    | "STATE_UNSPECIFIED"
    | "IN_REVIEW"
    | "REJECTED"
    | "LIVE"
    | "STOPPED"
    | "EXPIRED"
    | "PENDING"
    | (string & {});
}

export const DestinationStatus: Schema.Schema<DestinationStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      reportingContext: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DestinationStatus",
  }) as any as Schema.Schema<DestinationStatus>;

export interface PromotionStatus {
  /** Output only. Date on which the promotion status has been last updated in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example `2020-01-02T09:00:00+01:00` or `2020-01-02T09:00:00Z` */
  lastUpdateDate?: string;
  /** Output only. The intended destinations for the promotion. */
  destinationStatuses?: Array<DestinationStatus>;
  /** Output only. A list of issues associated with the promotion. */
  itemLevelIssues?: Array<ItemLevelIssue>;
  /** Output only. Date on which the promotion has been created in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example `2020-01-02T09:00:00+01:00` or `2020-01-02T09:00:00Z` */
  creationDate?: string;
}

export const PromotionStatus: Schema.Schema<PromotionStatus> = Schema.suspend(
  () =>
    Schema.Struct({
      lastUpdateDate: Schema.optional(Schema.String),
      destinationStatuses: Schema.optional(Schema.Array(DestinationStatus)),
      itemLevelIssues: Schema.optional(Schema.Array(ItemLevelIssue)),
      creationDate: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PromotionStatus",
}) as any as Schema.Schema<PromotionStatus>;

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

export interface Promotion {
  /** Output only. The primary data source of the promotion. */
  dataSource?: string;
  /** Optional. Represents the existing version (freshness) of the promotion, which can be used to preserve the right order when multiple updates are done at the same time. If set, the insertion is prevented when version number is lower than the current version number of the existing promotion. Re-insertion (for example, promotion refresh after 30 days) can be performed with the current `version_number`. If the operation is prevented, the aborted exception will be thrown. */
  versionNumber?: string;
  /** Identifier. The name of the promotion. Format: `accounts/{account}/promotions/{promotion}` */
  name?: string;
  /** Required. The user provided promotion ID to uniquely identify the promotion. Follow [minimum requirements](https://support.google.com/merchants/answer/7050148?ref_topic=7322920&sjid=871860036916537104-NC#minimum_requirements) to prevent promotion disapprovals. */
  promotionId?: string;
  /** Required. [Redemption channel](https://support.google.com/merchants/answer/13837674?ref_topic=13773355&sjid=17642868584668136159-NC) for the promotion. At least one channel is required. */
  redemptionChannel?: Array<
    "REDEMPTION_CHANNEL_UNSPECIFIED" | "IN_STORE" | "ONLINE" | (string & {})
  >;
  /** Optional. A list of promotion attributes. */
  attributes?: Attributes;
  /** Output only. The [status of a promotion](https://support.google.com/merchants/answer/3398326?ref_topic=7322924&sjid=5155774230887277618-NC), data validation issues, that is, information about a promotion computed asynchronously. */
  promotionStatus?: PromotionStatus;
  /** Required. The two-letter [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code for the promotion. Promotions is only for [selected languages](https://support.google.com/merchants/answer/4588281?ref_topic=6396150&sjid=18314938579342094533-NC#option3&zippy=). */
  contentLanguage?: string;
  /** Optional. A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the data specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API. */
  customAttributes?: Array<CustomAttribute>;
  /** Required. The target country used as part of the unique identifier. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). Promotions are only available in selected countries, [Free Listings and Shopping ads](https://support.google.com/merchants/answer/4588460) [Local Inventory ads](https://support.google.com/merchants/answer/10146326) */
  targetCountry?: string;
}

export const Promotion: Schema.Schema<Promotion> = Schema.suspend(() =>
  Schema.Struct({
    dataSource: Schema.optional(Schema.String),
    versionNumber: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    promotionId: Schema.optional(Schema.String),
    redemptionChannel: Schema.optional(Schema.Array(Schema.String)),
    attributes: Schema.optional(Attributes),
    promotionStatus: Schema.optional(PromotionStatus),
    contentLanguage: Schema.optional(Schema.String),
    customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
    targetCountry: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Promotion" }) as any as Schema.Schema<Promotion>;

export interface InsertPromotionRequest {
  /** Required. The promotion to insert. */
  promotion?: Promotion;
  /** Required. The data source of the [promotion](https://support.google.com/merchants/answer/6396268?sjid=5155774230887277618-NC) Format: `accounts/{account}/dataSources/{datasource}`. */
  dataSource?: string;
}

export const InsertPromotionRequest: Schema.Schema<InsertPromotionRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      promotion: Schema.optional(Promotion),
      dataSource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InsertPromotionRequest",
  }) as any as Schema.Schema<InsertPromotionRequest>;

export interface ListPromotionsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The processed promotions from the specified account. */
  promotions?: Array<Promotion>;
}

export const ListPromotionsResponse: Schema.Schema<ListPromotionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      promotions: Schema.optional(Schema.Array(Promotion)),
    }),
  ).annotate({
    identifier: "ListPromotionsResponse",
  }) as any as Schema.Schema<ListPromotionsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListAccountsPromotionsRequest {
  /** Required. The account to list processed promotions for. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of promotions to return. The service may return fewer than this value. The maximum value is 250; values above 250 will be coerced to 250. If unspecified, the maximum number of promotions will be returned. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListPromotions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPromotions` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsPromotionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "promotions/v1beta/accounts/{accountsId}/promotions",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsPromotionsRequest>;

export type ListAccountsPromotionsResponse = ListPromotionsResponse;
export const ListAccountsPromotionsResponse = ListPromotionsResponse;

export type ListAccountsPromotionsError = DefaultErrors;

/** Lists the promotions in your Merchant Center account. The response might contain fewer items than specified by `pageSize`. Rely on `pageToken` to determine if there are more items to be requested. After inserting or updating a promotion, it may take several minutes before the updated processed promotion can be retrieved. */
export const listAccountsPromotions: API.PaginatedOperationMethod<
  ListAccountsPromotionsRequest,
  ListAccountsPromotionsResponse,
  ListAccountsPromotionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsPromotionsRequest,
  output: ListAccountsPromotionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface InsertAccountsPromotionsRequest {
  /** Required. The account where the promotion will be inserted. Format: accounts/{account} */
  parent: string;
  /** Request body */
  body?: InsertPromotionRequest;
}

export const InsertAccountsPromotionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(InsertPromotionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "promotions/v1beta/accounts/{accountsId}/promotions:insert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertAccountsPromotionsRequest>;

export type InsertAccountsPromotionsResponse = Promotion;
export const InsertAccountsPromotionsResponse = Promotion;

export type InsertAccountsPromotionsError = DefaultErrors;

/** Inserts a promotion for your Merchant Center account. If the promotion already exists, then it updates the promotion instead. */
export const insertAccountsPromotions: API.OperationMethod<
  InsertAccountsPromotionsRequest,
  InsertAccountsPromotionsResponse,
  InsertAccountsPromotionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertAccountsPromotionsRequest,
  output: InsertAccountsPromotionsResponse,
  errors: [],
}));

export interface GetAccountsPromotionsRequest {
  /** Required. The name of the promotion to retrieve. Format: `accounts/{account}/promotions/{promotions}` */
  name: string;
}

export const GetAccountsPromotionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "promotions/v1beta/accounts/{accountsId}/promotions/{promotionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsPromotionsRequest>;

export type GetAccountsPromotionsResponse = Promotion;
export const GetAccountsPromotionsResponse = Promotion;

export type GetAccountsPromotionsError = DefaultErrors;

/** Retrieves the promotion from your Merchant Center account. After inserting or updating a promotion input, it may take several minutes before the updated promotion can be retrieved. */
export const getAccountsPromotions: API.OperationMethod<
  GetAccountsPromotionsRequest,
  GetAccountsPromotionsResponse,
  GetAccountsPromotionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsPromotionsRequest,
  output: GetAccountsPromotionsResponse,
  errors: [],
}));
