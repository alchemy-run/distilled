// ==========================================================================
// Search Ads 360 Reporting API (searchads360 v0)
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
  name: "searchads360",
  version: "v0",
  rootUrl: "https://searchads360.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleAdsSearchads360V0Common__ManualCpc {
  /** Whether bids are to be enhanced based on conversion optimizer data. */
  enhancedCpcEnabled?: boolean;
}

export const GoogleAdsSearchads360V0Common__ManualCpc: Schema.Schema<GoogleAdsSearchads360V0Common__ManualCpc> = Schema.suspend(() => Schema.Struct({
  enhancedCpcEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__ManualCpc" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__ManualCpc>;

export interface GoogleAdsSearchads360V0Resources__GeoTargetConstant {
  /** Output only. The fully qualified English name, consisting of the target's name and that of its parent and country. */
  canonicalName?: string;
  /** Output only. The ISO-3166-1 alpha-2 country code that is associated with the target. */
  countryCode?: string;
  /** Output only. Geo target constant status. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVAL_PLANNED" | (string & {});
  /** Output only. The resource name of the geo target constant. Geo target constant resource names have the form: `geoTargetConstants/{geo_target_constant_id}` */
  resourceName?: string;
  /** Output only. Geo target constant English name. */
  name?: string;
  /** Output only. The ID of the geo target constant. */
  id?: string;
  /** Output only. The resource name of the parent geo target constant. Geo target constant resource names have the form: `geoTargetConstants/{parent_geo_target_constant_id}` */
  parentGeoTarget?: string;
  /** Output only. Geo target constant target type. */
  targetType?: string;
}

export const GoogleAdsSearchads360V0Resources__GeoTargetConstant: Schema.Schema<GoogleAdsSearchads360V0Resources__GeoTargetConstant> = Schema.suspend(() => Schema.Struct({
  canonicalName: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  parentGeoTarget: Schema.optional(Schema.String),
  targetType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__GeoTargetConstant" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__GeoTargetConstant>;

export interface GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCustomAttribute {
  /** Indicates the index of the custom attribute. */
  index?: "UNSPECIFIED" | "UNKNOWN" | "INDEX0" | "INDEX1" | "INDEX2" | "INDEX3" | "INDEX4" | (string & {});
  /** String value of the product custom attribute. */
  value?: string;
}

export const GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCustomAttribute: Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCustomAttribute> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCustomAttribute" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCustomAttribute>;

export interface GoogleAdsSearchads360V0Common__RealTimeBiddingSetting {
  /** Whether the campaign is opted in to real-time bidding. */
  optIn?: boolean;
}

export const GoogleAdsSearchads360V0Common__RealTimeBiddingSetting: Schema.Schema<GoogleAdsSearchads360V0Common__RealTimeBiddingSetting> = Schema.suspend(() => Schema.Struct({
  optIn: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__RealTimeBiddingSetting" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__RealTimeBiddingSetting>;

export interface GoogleAdsSearchads360V0Common__ManualCpm {
}

export const GoogleAdsSearchads360V0Common__ManualCpm: Schema.Schema<GoogleAdsSearchads360V0Common__ManualCpm> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__ManualCpm" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__ManualCpm>;

export interface GoogleAdsSearchads360V0Resources_Campaign_OptimizationGoalSetting {
  /** The list of optimization goal types. */
  optimizationGoalTypes?: Array<"UNSPECIFIED" | "UNKNOWN" | "CALL_CLICKS" | "DRIVING_DIRECTIONS" | "APP_PRE_REGISTRATION" | (string & {})>;
}

export const GoogleAdsSearchads360V0Resources_Campaign_OptimizationGoalSetting: Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_OptimizationGoalSetting> = Schema.suspend(() => Schema.Struct({
  optimizationGoalTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_Campaign_OptimizationGoalSetting" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_OptimizationGoalSetting>;

export interface GoogleAdsSearchads360V0Common__WebpageConditionInfo {
  /** Argument of webpage targeting condition. */
  argument?: string;
  /** Operand of webpage targeting condition. */
  operand?: "UNSPECIFIED" | "UNKNOWN" | "URL" | "CATEGORY" | "PAGE_TITLE" | "PAGE_CONTENT" | "CUSTOM_LABEL" | (string & {});
  /** Operator of webpage targeting condition. */
  operator?: "UNSPECIFIED" | "UNKNOWN" | "EQUALS" | "CONTAINS" | (string & {});
}

export const GoogleAdsSearchads360V0Common__WebpageConditionInfo: Schema.Schema<GoogleAdsSearchads360V0Common__WebpageConditionInfo> = Schema.suspend(() => Schema.Struct({
  argument: Schema.optional(Schema.String),
  operand: Schema.optional(Schema.String),
  operator: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__WebpageConditionInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__WebpageConditionInfo>;

export interface GoogleAdsSearchads360V0Common__ManualCpa {
}

export const GoogleAdsSearchads360V0Common__ManualCpa: Schema.Schema<GoogleAdsSearchads360V0Common__ManualCpa> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__ManualCpa" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__ManualCpa>;

export interface GoogleAdsSearchads360V0Resources__CampaignAudienceView {
  /** Output only. The resource name of the campaign audience view. Campaign audience view resource names have the form: `customers/{customer_id}/campaignAudienceViews/{campaign_id}~{criterion_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__CampaignAudienceView: Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignAudienceView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CampaignAudienceView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignAudienceView>;

export interface GoogleAdsSearchads360V0Resources__ProductGroupView {
  /** Output only. The resource name of the product group view. Product group view resource names have the form: `customers/{customer_id}/productGroupViews/{ad_group_id}~{criterion_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__ProductGroupView: Schema.Schema<GoogleAdsSearchads360V0Resources__ProductGroupView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__ProductGroupView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__ProductGroupView>;

export interface GoogleAdsSearchads360V0Services__ConversionCustomDimensionHeader {
  /** The conversion custom dimension ID. */
  id?: string;
  /** The user defined name of the conversion custom dimension. */
  name?: string;
}

export const GoogleAdsSearchads360V0Services__ConversionCustomDimensionHeader: Schema.Schema<GoogleAdsSearchads360V0Services__ConversionCustomDimensionHeader> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__ConversionCustomDimensionHeader" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__ConversionCustomDimensionHeader>;

export interface GoogleAdsSearchads360V0Resources__AdGroupAudienceView {
  /** Output only. The resource name of the ad group audience view. Ad group audience view resource names have the form: `customers/{customer_id}/adGroupAudienceViews/{ad_group_id}~{criterion_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupAudienceView: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAudienceView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupAudienceView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAudienceView>;

export interface GoogleAdsSearchads360V0Common__TargetRestriction {
  /** Indicates whether to restrict your ads to show only for the criteria you have selected for this targeting_dimension, or to target all values for this targeting_dimension and show ads based on your targeting in other TargetingDimensions. A value of `true` means that these criteria will only apply bid modifiers, and not affect targeting. A value of `false` means that these criteria will restrict targeting as well as applying bid modifiers. */
  bidOnly?: boolean;
  /** The targeting dimension that these settings apply to. */
  targetingDimension?: "UNSPECIFIED" | "UNKNOWN" | "KEYWORD" | "AUDIENCE" | "TOPIC" | "GENDER" | "AGE_RANGE" | "PLACEMENT" | "PARENTAL_STATUS" | "INCOME_RANGE" | (string & {});
}

export const GoogleAdsSearchads360V0Common__TargetRestriction: Schema.Schema<GoogleAdsSearchads360V0Common__TargetRestriction> = Schema.suspend(() => Schema.Struct({
  bidOnly: Schema.optional(Schema.Boolean),
  targetingDimension: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TargetRestriction" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TargetRestriction>;

export interface GoogleAdsSearchads360V0Common__Value {
  /** An int64. */
  int64Value?: string;
  /** A string. */
  stringValue?: string;
  /** A float. */
  floatValue?: number;
  /** A double. */
  doubleValue?: number;
  /** A boolean. */
  booleanValue?: boolean;
}

export const GoogleAdsSearchads360V0Common__Value: Schema.Schema<GoogleAdsSearchads360V0Common__Value> = Schema.suspend(() => Schema.Struct({
  int64Value: Schema.optional(Schema.String),
  stringValue: Schema.optional(Schema.String),
  floatValue: Schema.optional(Schema.Number),
  doubleValue: Schema.optional(Schema.Number),
  booleanValue: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__Value" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__Value>;

export interface GoogleAdsSearchads360V0Common__Metrics {
  /** The conversion custom metrics. */
  conversionCustomMetrics?: Array<GoogleAdsSearchads360V0Common__Value>;
  /** The impressions you've received on the Display Network divided by the estimated number of impressions you were eligible to receive. Note: Content impression share is reported in the range of 0.1 to 1. Any value below 0.1 is reported as 0.0999. */
  contentImpressionShare?: number;
  /** Client account cross-sell cost of goods sold (COGS) is the total cost of products sold as a result of advertising a different product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If these products don't match then this is considered cross-sell. Cross-sell cost of goods sold is the total cost of the products sold that weren't advertised. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat has a cost of goods sold value of $3, the shirt has a cost of goods sold value of $5. The cross-sell cost of goods sold for this order is $5. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  clientAccountCrossSellCostOfGoodsSoldMicros?: string;
  /** The sum of biddable conversions value by conversion date. When this column is selected with date, the values in date column means the conversion date. */
  conversionsValueByConversionDate?: number;
  /** The sum of conversion values for the conversions included in the "conversions" field. This metric is useful only if you entered a value for your conversion actions. */
  conversionsValue?: number;
  /** The types of payable and free interactions. */
  interactionEventTypes?: Array<"UNSPECIFIED" | "UNKNOWN" | "CLICK" | "ENGAGEMENT" | "VIDEO_VIEW" | "NONE" | (string & {})>;
  /** The total number of conversions. This includes all conversions regardless of the value of include_in_conversions_metric. When this column is selected with date, the values in date column means the conversion date. Details for the by_conversion_date columns are available at https://support.google.com/sa360/answer/9250611. */
  allConversionsByConversionDate?: number;
  /** The sum of conversions by conversion date for biddable conversion types. Can be fractional due to attribution modeling. When this column is selected with date, the values in date column means the conversion date. */
  conversionsByConversionDate?: number;
  /** The number estimating how often your ad wasn't the very first ad among the top ads in the search results due to a low budget. Note: Search budget lost absolute top impression share is reported in the range of 0 to 0.9. Any value above 0.9 is reported as 0.9001. */
  searchBudgetLostAbsoluteTopImpressionShare?: number;
  /** The number of unique users who saw your ad during the requested time period. This metric cannot be aggregated, and can only be requested for date ranges of 92 days or less. This metric is available for following campaign types - Display, Video, Discovery and App. */
  uniqueUsers?: string;
  /** The cost of ad interactions divided by current model attributed conversions. This only includes conversion actions which include_in_conversions_metric attribute is set to true. If you use conversion-based bidding, your bid strategies will optimize for these conversions. */
  costPerCurrentModelAttributedConversion?: number;
  /** The number estimating how often your ad wasn't the very first ad among the top ads in the search results due to poor Ad Rank. Note: Search rank lost absolute top impression share is reported in the range of 0 to 0.9. Any value above 0.9 is reported as 0.9001. */
  searchRankLostAbsoluteTopImpressionShare?: number;
  /** The value of client account conversions. This only includes conversion actions which include_in_client_account_conversions_metric attribute is set to true. If you use conversion-based bidding, your bid strategies will optimize for these conversions. */
  clientAccountConversionsValue?: number;
  /** Cross-sell revenue is the total amount you made from products sold as a result of advertising a different product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If these products don't match then this is considered cross-sell. Cross-sell revenue is the total value you made from cross-sell attributed to your ads. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat is priced $10 and the shirt is priced $20. The cross-sell revenue of this order is $20. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  crossSellRevenueMicros?: string;
  /** The sum of the value of cross-device conversions. */
  crossDeviceConversionsValue?: number;
  /** Client account cross-sell gross profit is the profit you made from products sold as a result of advertising a different product, minus cost of goods sold (COGS). How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the purchase is a sold product. If these products don't match then this is considered cross-sell. Cross-sell gross profit is the revenue you made from cross-sell attributed to your ads minus the cost of the goods sold. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The shirt is priced $20 and has a cost of goods sold value of $5. The cross-sell gross profit of this order is $15 = $20 - $5. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  clientAccountCrossSellGrossProfitMicros?: string;
  /** Cross-sell cost of goods sold (COGS) is the total cost of products sold as a result of advertising a different product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If these products don't match then this is considered cross-sell. Cross-sell cost of goods sold is the total cost of the products sold that weren't advertised. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat has a cost of goods sold value of $3, the shirt has a cost of goods sold value of $5. The cross-sell cost of goods sold for this order is $5. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  crossSellCostOfGoodsSoldMicros?: string;
  /** Average biddable conversions (from interaction) per conversion eligible interaction. Shows how often, on average, an ad interaction leads to a biddable conversion. */
  conversionsFromInteractionsRate?: number;
  /** The percentage of the customer's Shopping or Search ad impressions that are shown in the most prominent Shopping position. See https://support.google.com/sa360/answer/9566729 for details. Any value below 0.1 is reported as 0.0999. */
  searchAbsoluteTopImpressionShare?: number;
  /** The value of all conversions divided by the total cost of ad interactions (such as clicks for text ads or views for video ads). */
  allConversionsValuePerCost?: number;
  /** The cost of ad interactions divided by all conversions. */
  costPerAllConversions?: number;
  /** Client account lead units sold is the total number of products sold as a result of advertising the same product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If the advertised and sold products match, then the total number of these products sold is shown under lead units sold. Example: Someone clicked on a Shopping ad for a hat then bought the same hat, a shirt and a jacket. The lead units sold in this order is 1. This metric is only available if you report conversions with cart data. */
  clientAccountLeadUnitsSold?: number;
  /** The average quality score. */
  averageQualityScore?: number;
  /** The historical quality score. */
  historicalQualityScore?: string;
  /** Client account lead cost of goods sold (COGS) is the total cost of products sold as a result of advertising the same product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If the advertised and sold products match, then the cost of these goods is counted under lead cost of goods sold. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat has a cost of goods sold value of $3, the shirt has a cost of goods sold value of $5. The lead cost of goods sold for this order is $3. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  clientAccountLeadCostOfGoodsSoldMicros?: string;
  /** The number of conversions. This only includes conversion actions which include_in_conversions_metric attribute is set to true. If you use conversion-based bidding, your bid strategies will optimize for these conversions. */
  conversions?: number;
  /** The number of clicks. */
  clicks?: string;
  /** The value of all conversions from interactions divided by the total number of interactions. */
  allConversionsFromInteractionsValuePerInteraction?: number;
  /** The number of client account conversions. This only includes conversion actions which include_in_client_account_conversions_metric attribute is set to true. If you use conversion-based bidding, your bid strategies will optimize for these conversions. */
  clientAccountConversions?: number;
  /** The number estimating how often your ad didn't show adjacent to the top organic search results due to a low budget. Note: Search budget lost top impression share is reported in the range of 0 to 0.9. Any value above 0.9 is reported as 0.9001. */
  searchBudgetLostTopImpressionShare?: number;
  /** Gross profit margin is the percentage gross profit you made from orders attributed to your ads, after taking out the cost of goods sold (COGS). How it works: You report conversions with cart data for completed purchases on your website. Gross profit margin is the gross profit you made divided by your total revenue and multiplied by 100%. Gross profit margin calculations only include products that have a cost of goods sold value in Merchant Center. Example: Someone bought a hat and a shirt in an order on your website. The hat is priced $10 and has a cost of goods sold value of $3. The shirt is priced $20 but has no cost of goods sold value. Gross profit margin for this order will only take into account the hat because it has a cost of goods sold value, so it's 70% = ($10 - $3)/$10 x 100%. This metric is only available if you report conversions with cart data. */
  grossProfitMargin?: number;
  /** Estimated number of times people visited a store after clicking an ad. This metric applies to feed items only. */
  allConversionsFromStoreVisit?: number;
  /** Lead cost of goods sold (COGS) is the total cost of products sold as a result of advertising the same product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If the advertised and sold products match, then the cost of these goods is counted under lead cost of goods sold. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat has a cost of goods sold value of $3, the shirt has a cost of goods sold value of $5. The lead cost of goods sold for this order is $3. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  leadCostOfGoodsSoldMicros?: string;
  /** The estimated percentage of impressions on the Search Network that your ads didn't receive due to poor Ad Rank. Note: Search rank lost impression share is reported in the range of 0 to 0.9. Any value above 0.9 is reported as 0.9001. */
  searchRankLostImpressionShare?: number;
  /** The impressions you've received on the Search Network divided by the estimated number of impressions you were eligible to receive. Note: Search impression share is reported in the range of 0.1 to 1. Any value below 0.1 is reported as 0.0999. */
  searchImpressionShare?: number;
  /** Client account lead revenue is the total amount you made from products sold as a result of advertising the same product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If the advertised and sold products match, then the total value you made from the sales of these products is shown under lead revenue. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat is priced $10 and the shirt is priced $20. The lead revenue of this order is $10. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  clientAccountLeadRevenueMicros?: string;
  /** The value of all conversions. When this column is selected with date, the values in date column means the conversion date. Details for the by_conversion_date columns are available at https://support.google.com/sa360/answer/9250611. */
  allConversionsValueByConversionDate?: number;
  /** All conversions from interactions (as oppose to view through conversions) divided by the number of ad interactions. */
  allConversionsFromInteractionsRate?: number;
  /** The sum of your cost-per-click (CPC) and cost-per-thousand impressions (CPM) costs during this period. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  costMicros?: string;
  /** The number of clicks your ad receives (Clicks) divided by the number of times your ad is shown (Impressions). */
  ctr?: number;
  /** The percent of your ad impressions that are shown adjacent to the top organic search results. */
  topImpressionPercentage?: number;
  /** The historical search predicted click through rate (CTR). */
  historicalSearchPredictedCtr?: "UNSPECIFIED" | "UNKNOWN" | "BELOW_AVERAGE" | "AVERAGE" | "ABOVE_AVERAGE" | (string & {});
  /** Biddable conversions value by conversion date divided by biddable conversions by conversion date. Shows how much, on average, each of the biddable conversions is worth (by conversion date). When this column is selected with date, the values in date column means the conversion date. */
  valuePerConversionsByConversionDate?: number;
  /** The estimated percent of times that your ad was eligible to show on the Display Network but didn't because your budget was too low. Note: Content budget lost impression share is reported in the range of 0 to 0.9. Any value above 0.9 is reported as 0.9001. */
  contentBudgetLostImpressionShare?: number;
  /** Average cart size is the average number of products in each order attributed to your ads. How it works: You report conversions with cart data for completed purchases on your website. Average cart size is the total number of products sold divided by the total number of orders you received. Example: You received 2 orders, the first included 3 products and the second included 2. The average cart size is 2.5 products = (3+2)/2. This metric is only available if you report conversions with cart data. */
  averageCartSize?: number;
  /** The estimated percent of times that your ad was eligible to show on the Search Network but didn't because your budget was too low. Note: Search budget lost impression share is reported in the range of 0 to 0.9. Any value above 0.9 is reported as 0.9001. */
  searchBudgetLostImpressionShare?: number;
  /** The number of times people clicked a link to view a store's menu after clicking an ad. This metric applies to feed items only. */
  allConversionsFromMenu?: number;
  /** The value of conversions from interactions divided by the number of ad interactions. This only includes conversion actions which include_in_conversions_metric attribute is set to true. If you use conversion-based bidding, your bid strategies will optimize for these conversions. */
  conversionsFromInteractionsValuePerInteraction?: number;
  /** The number of times people clicked a "Get directions" button to navigate to a store after clicking an ad. This metric applies to feed items only. */
  allConversionsFromDirections?: number;
  /** The percentage of mobile clicks that go to a mobile-friendly page. */
  mobileFriendlyClicksPercentage?: number;
  /** Clicks that Search Ads 360 has successfully recorded and forwarded to an advertiser's landing page. */
  visits?: number;
  /** The number of times that people were taken to a store's URL after clicking an ad. This metric applies to feed items only. */
  allConversionsFromStoreWebsite?: number;
  /** The total number of conversions. This includes all conversions regardless of the value of include_in_conversions_metric. */
  allConversions?: number;
  /** Client account lead gross profit is the profit you made from products sold as a result of advertising the same product, minus cost of goods sold (COGS). How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If the advertised and sold products match, then the revenue you made from these sales minus the cost of goods sold is your lead gross profit. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat is priced $10 and has a cost of goods sold value of $3. The lead gross profit of this order is $7 = $10 - $3. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  clientAccountLeadGrossProfitMicros?: string;
  /** Number of general invalid clicks. These are a subset of your invalid clicks that are detected through routine means of filtration (such as known invalid data-center traffic, bots and spiders or other crawlers, irregular patterns, etc.). You're not charged for them, and they don't affect your account statistics. See the help page at https://support.google.com/campaignmanager/answer/6076504 for details. */
  generalInvalidClicks?: string;
  /** Average conversion eligible cost per biddable conversion. */
  costPerConversion?: number;
  /** The number of other conversions (for example, posting a review or saving a location for a store) that occurred after people clicked an ad. This metric applies to feed items only. */
  allConversionsFromOtherEngagement?: number;
  /** The quality of historical landing page experience. */
  historicalLandingPageQualityScore?: "UNSPECIFIED" | "UNKNOWN" | "BELOW_AVERAGE" | "AVERAGE" | "ABOVE_AVERAGE" | (string & {});
  /** Client account cross-sell revenue is the total amount you made from products sold as a result of advertising a different product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If these products don't match then this is considered cross-sell. Cross-sell revenue is the total value you made from cross-sell attributed to your ads. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat is priced $10 and the shirt is priced $20. The cross-sell revenue of this order is $20. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  clientAccountCrossSellRevenueMicros?: string;
  /** The value of biddable conversion divided by the number of biddable conversions. Shows how much, on average, each of the biddable conversions is worth. */
  valuePerConversion?: number;
  /** The value of all conversions. */
  allConversionsValue?: number;
  /** Orders is the total number of purchase conversions you received attributed to your ads. How it works: You report conversions with cart data for completed purchases on your website. If a conversion is attributed to previous interactions with your ads (clicks for text or Shopping ads, views for video ads etc.) it's counted as an order. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt in an order on your website. Even though they bought 2 products, this would count as 1 order. This metric is only available if you report conversions with cart data. */
  orders?: number;
  /** The number estimating how often your ad didn't show adjacent to the top organic search results due to poor Ad Rank. Note: Search rank lost top impression share is reported in the range of 0 to 0.9. Any value above 0.9 is reported as 0.9001. */
  searchRankLostTopImpressionShare?: number;
  /** The creative historical quality score. */
  historicalCreativeQualityScore?: "UNSPECIFIED" | "UNKNOWN" | "BELOW_AVERAGE" | "AVERAGE" | "ABOVE_AVERAGE" | (string & {});
  /** Units sold is the total number of products sold from orders attributed to your ads. How it works: You report conversions with cart data for completed purchases on your website. Units sold is the total number of products sold from all orders attributed to your ads. Example: Someone clicked on a Shopping ad for a hat then bought the same hat, a shirt and a jacket. The units sold in this order is 3. This metric is only available if you report conversions with cart data. */
  unitsSold?: number;
  /** Conversions from when a customer clicks on an ad on one device, then converts on a different device or browser. Cross-device conversions are already included in all_conversions. */
  crossDeviceConversions?: number;
  /** Cost of goods sold (COGS) is the total cost of the products you sold in orders attributed to your ads. How it works: You can add a cost of goods sold value to every product in Merchant Center. If you report conversions with cart data, the products you sold are matched with their cost of goods sold value and this can be used to calculate the gross profit you made on each order. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat has a cost of goods sold value of $3, the shirt has a cost of goods sold value of $5. The cost of goods sold for this order is $8 = $3 + $5. This metric is only available if you report conversions with cart data. */
  costOfGoodsSoldMicros?: string;
  /** Count of how often your ad has appeared on a search results page or website on the Google Network. */
  impressions?: string;
  /** The average amount you pay per interaction. This amount is the total cost of your ads divided by the total number of interactions. */
  averageCost?: number;
  /** How often people interact with your ad after it is shown to them. This is the number of interactions divided by the number of times your ad is shown. */
  interactionRate?: number;
  /** Cross-sell units sold is the total number of products sold as a result of advertising a different product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If these products don't match then this is considered cross-sell. Cross-sell units sold is the total number of cross-sold products from all orders attributed to your ads. Example: Someone clicked on a Shopping ad for a hat then bought the same hat, a shirt and a jacket. The cross-sell units sold in this order is 2. This metric is only available if you report conversions with cart data. */
  crossSellUnitsSold?: number;
  /** The number of interactions. An interaction is the main user action associated with an ad format-clicks for text and shopping ads, views for video ads, and so on. */
  interactions?: string;
  /** Revenue is the total amount you made from orders attributed to your ads. How it works: You report conversions with cart data for completed purchases on your website. Revenue is the total value of all the orders you received attributed to your ads, minus any discount. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt in an order from your website. The hat is priced $10 and the shirt is priced $20. The entire order has a $5 discount. The revenue from this order is $25 = ($10 + $20) - $5. This metric is only available if you report conversions with cart data. */
  revenueMicros?: string;
  /** Lead gross profit is the profit you made from products sold as a result of advertising the same product, minus cost of goods sold (COGS). How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If the advertised and sold products match, then the revenue you made from these sales minus the cost of goods sold is your lead gross profit. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat is priced $10 and has a cost of goods sold value of $3. The lead gross profit of this order is $7 = $10 - $3. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  leadGrossProfitMicros?: string;
  /** The total cost of all clicks divided by the total number of clicks received. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  averageCpc?: number;
  /** The value of all conversions divided by the number of all conversions. */
  valuePerAllConversions?: number;
  /** Cross-sell gross profit is the profit you made from products sold as a result of advertising a different product, minus cost of goods sold (COGS). How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the purchase is a sold product. If these products don't match then this is considered cross-sell. Cross-sell gross profit is the revenue you made from cross-sell attributed to your ads minus the cost of the goods sold. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The shirt is priced $20 and has a cost of goods sold value of $5. The cross-sell gross profit of this order is $15 = $20 - $5. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  crossSellGrossProfitMicros?: string;
  /** The value of all conversions divided by the number of all conversions. When this column is selected with date, the values in date column means the conversion date. Details for the by_conversion_date columns are available at https://support.google.com/sa360/answer/9250611. */
  valuePerAllConversionsByConversionDate?: number;
  /** The number of clicks you've received on the Search Network divided by the estimated number of clicks you were eligible to receive. Note: Search click share is reported in the range of 0.1 to 1. Any value below 0.1 is reported as 0.0999. */
  searchClickShare?: number;
  /** The percentage of clicks that have been filtered out of your total number of clicks (filtered + non-filtered clicks) due to being general invalid clicks. These are clicks Google considers illegitimate that are detected through routine means of filtration (that is, known invalid data-center traffic, bots and spiders or other crawlers, irregular patterns, etc). You're not charged for them, and they don't affect your account statistics. See the help page at https://support.google.com/campaignmanager/answer/6076504 for details. */
  generalInvalidClickRate?: number;
  /** The number of times people clicked the "Call" button to call a store during or after clicking an ad. This number doesn't include whether or not calls were connected, or the duration of any calls. This metric applies to feed items only. */
  allConversionsFromClickToCall?: number;
  /** The number of times people placed an order at a store after clicking an ad. This metric applies to feed items only. */
  allConversionsFromOrder?: number;
  /** The average number of times a unique user saw your ad during the requested time period. This metric cannot be aggregated, and can only be requested for date ranges of 92 days or less. This metric is available for following campaign types - Display, Video, Discovery and App. */
  averageImpressionFrequencyPerUser?: number;
  /** The percentage of clicks filtered out of your total number of clicks (filtered + non-filtered clicks) during the reporting period. */
  invalidClickRate?: number;
  /** The impressions you've received divided by the estimated number of impressions you were eligible to receive on the Search Network for search terms that matched your keywords exactly (or were close variants of your keyword), regardless of your keyword match types. Note: Search exact match impression share is reported in the range of 0.1 to 1. Any value below 0.1 is reported as 0.0999. */
  searchExactMatchImpressionShare?: number;
  /** The raw event conversion metrics. */
  rawEventConversionMetrics?: Array<GoogleAdsSearchads360V0Common__Value>;
  /** Search absolute top impression share is the percentage of your Search ad impressions that are shown in the most prominent Search position. */
  absoluteTopImpressionPercentage?: number;
  /** The total number of view-through conversions. These happen when a customer sees an image or rich media ad, then later completes a conversion on your site without interacting with (for example, clicking on) another ad. */
  clientAccountViewThroughConversions?: string;
  /** Client account cross-sell units sold is the total number of products sold as a result of advertising a different product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If these products don't match then this is considered cross-sell. Cross-sell units sold is the total number of cross-sold products from all orders attributed to your ads. Example: Someone clicked on a Shopping ad for a hat then bought the same hat, a shirt and a jacket. The cross-sell units sold in this order is 2. This metric is only available if you report conversions with cart data. */
  clientAccountCrossSellUnitsSold?: number;
  /** The impressions you've received among the top ads compared to the estimated number of impressions you were eligible to receive among the top ads. Note: Search top impression share is reported in the range of 0.1 to 1. Any value below 0.1 is reported as 0.0999. Top ads are generally above the top organic results, although they may show below the top organic results on certain queries. */
  searchTopImpressionShare?: number;
  /** Lead units sold is the total number of products sold as a result of advertising the same product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If the advertised and sold products match, then the total number of these products sold is shown under lead units sold. Example: Someone clicked on a Shopping ad for a hat then bought the same hat, a shirt and a jacket. The lead units sold in this order is 1. This metric is only available if you report conversions with cart data. */
  leadUnitsSold?: number;
  /** The estimated percentage of impressions on the Display Network that your ads didn't receive due to poor Ad Rank. Note: Content rank lost impression share is reported in the range of 0 to 0.9. Any value above 0.9 is reported as 0.9001. */
  contentRankLostImpressionShare?: number;
  /** The value of biddable conversion divided by the total cost of conversion eligible interactions. */
  conversionsValuePerCost?: number;
  /** Average order value is the average revenue you made per order attributed to your ads. How it works: You report conversions with cart data for completed purchases on your website. Average order value is the total revenue from your orders divided by the total number of orders. Example: You received 3 orders which made $10, $15 and $20 worth of revenue. The average order value is $15 = ($10 + $15 + $20)/3. This metric is only available if you report conversions with cart data. */
  averageOrderValueMicros?: string;
  /** Gross profit is the profit you made from orders attributed to your ads minus the cost of goods sold (COGS). How it works: Gross profit is the revenue you made from sales attributed to your ads minus cost of goods sold. Gross profit calculations only include products that have a cost of goods sold value in Merchant Center. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt in an order from your website. The hat is priced $10 and the shirt is priced $20. The hat has a cost of goods sold value of $3, but the shirt has no cost of goods sold value. Gross profit for this order will only take into account the hat, so it's $7 = $10 - $3. This metric is only available if you report conversions with cart data. */
  grossProfitMicros?: string;
  /** Average cost-per-thousand impressions (CPM). This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  averageCpm?: number;
  /** The number of cross-device conversions by conversion date. Details for the by_conversion_date columns are available at https://support.google.com/sa360/answer/9250611. */
  crossDeviceConversionsByConversionDate?: number;
  /** The sum of cross-device conversions value by conversion date. Details for the by_conversion_date columns are available at https://support.google.com/sa360/answer/9250611. */
  crossDeviceConversionsValueByConversionDate?: number;
  /** Lead revenue is the total amount you made from products sold as a result of advertising the same product. How it works: You report conversions with cart data for completed purchases on your website. If the ad that was interacted with before the purchase has an associated product (see Shopping Ads) then this product is considered the advertised product. Any product included in the order the customer places is a sold product. If the advertised and sold products match, then the total value you made from the sales of these products is shown under lead revenue. Example: Someone clicked on a Shopping ad for a hat then bought the same hat and a shirt. The hat is priced $10 and the shirt is priced $20. The lead revenue of this order is $10. This metric is only available if you report conversions with cart data. This metric is a monetary value and returned in the customer's currency by default. See the metrics_currency parameter at https://developers.google.com/search-ads/reporting/query/query-structure#parameters_clause */
  leadRevenueMicros?: string;
  /** Number of clicks Google considers illegitimate and doesn't charge you for. */
  invalidClicks?: string;
}

export const GoogleAdsSearchads360V0Common__Metrics: Schema.Schema<GoogleAdsSearchads360V0Common__Metrics> = Schema.suspend(() => Schema.Struct({
  conversionCustomMetrics: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__Value)),
  contentImpressionShare: Schema.optional(Schema.Number),
  clientAccountCrossSellCostOfGoodsSoldMicros: Schema.optional(Schema.String),
  conversionsValueByConversionDate: Schema.optional(Schema.Number),
  conversionsValue: Schema.optional(Schema.Number),
  interactionEventTypes: Schema.optional(Schema.Array(Schema.String)),
  allConversionsByConversionDate: Schema.optional(Schema.Number),
  conversionsByConversionDate: Schema.optional(Schema.Number),
  searchBudgetLostAbsoluteTopImpressionShare: Schema.optional(Schema.Number),
  uniqueUsers: Schema.optional(Schema.String),
  costPerCurrentModelAttributedConversion: Schema.optional(Schema.Number),
  searchRankLostAbsoluteTopImpressionShare: Schema.optional(Schema.Number),
  clientAccountConversionsValue: Schema.optional(Schema.Number),
  crossSellRevenueMicros: Schema.optional(Schema.String),
  crossDeviceConversionsValue: Schema.optional(Schema.Number),
  clientAccountCrossSellGrossProfitMicros: Schema.optional(Schema.String),
  crossSellCostOfGoodsSoldMicros: Schema.optional(Schema.String),
  conversionsFromInteractionsRate: Schema.optional(Schema.Number),
  searchAbsoluteTopImpressionShare: Schema.optional(Schema.Number),
  allConversionsValuePerCost: Schema.optional(Schema.Number),
  costPerAllConversions: Schema.optional(Schema.Number),
  clientAccountLeadUnitsSold: Schema.optional(Schema.Number),
  averageQualityScore: Schema.optional(Schema.Number),
  historicalQualityScore: Schema.optional(Schema.String),
  clientAccountLeadCostOfGoodsSoldMicros: Schema.optional(Schema.String),
  conversions: Schema.optional(Schema.Number),
  clicks: Schema.optional(Schema.String),
  allConversionsFromInteractionsValuePerInteraction: Schema.optional(Schema.Number),
  clientAccountConversions: Schema.optional(Schema.Number),
  searchBudgetLostTopImpressionShare: Schema.optional(Schema.Number),
  grossProfitMargin: Schema.optional(Schema.Number),
  allConversionsFromStoreVisit: Schema.optional(Schema.Number),
  leadCostOfGoodsSoldMicros: Schema.optional(Schema.String),
  searchRankLostImpressionShare: Schema.optional(Schema.Number),
  searchImpressionShare: Schema.optional(Schema.Number),
  clientAccountLeadRevenueMicros: Schema.optional(Schema.String),
  allConversionsValueByConversionDate: Schema.optional(Schema.Number),
  allConversionsFromInteractionsRate: Schema.optional(Schema.Number),
  costMicros: Schema.optional(Schema.String),
  ctr: Schema.optional(Schema.Number),
  topImpressionPercentage: Schema.optional(Schema.Number),
  historicalSearchPredictedCtr: Schema.optional(Schema.String),
  valuePerConversionsByConversionDate: Schema.optional(Schema.Number),
  contentBudgetLostImpressionShare: Schema.optional(Schema.Number),
  averageCartSize: Schema.optional(Schema.Number),
  searchBudgetLostImpressionShare: Schema.optional(Schema.Number),
  allConversionsFromMenu: Schema.optional(Schema.Number),
  conversionsFromInteractionsValuePerInteraction: Schema.optional(Schema.Number),
  allConversionsFromDirections: Schema.optional(Schema.Number),
  mobileFriendlyClicksPercentage: Schema.optional(Schema.Number),
  visits: Schema.optional(Schema.Number),
  allConversionsFromStoreWebsite: Schema.optional(Schema.Number),
  allConversions: Schema.optional(Schema.Number),
  clientAccountLeadGrossProfitMicros: Schema.optional(Schema.String),
  generalInvalidClicks: Schema.optional(Schema.String),
  costPerConversion: Schema.optional(Schema.Number),
  allConversionsFromOtherEngagement: Schema.optional(Schema.Number),
  historicalLandingPageQualityScore: Schema.optional(Schema.String),
  clientAccountCrossSellRevenueMicros: Schema.optional(Schema.String),
  valuePerConversion: Schema.optional(Schema.Number),
  allConversionsValue: Schema.optional(Schema.Number),
  orders: Schema.optional(Schema.Number),
  searchRankLostTopImpressionShare: Schema.optional(Schema.Number),
  historicalCreativeQualityScore: Schema.optional(Schema.String),
  unitsSold: Schema.optional(Schema.Number),
  crossDeviceConversions: Schema.optional(Schema.Number),
  costOfGoodsSoldMicros: Schema.optional(Schema.String),
  impressions: Schema.optional(Schema.String),
  averageCost: Schema.optional(Schema.Number),
  interactionRate: Schema.optional(Schema.Number),
  crossSellUnitsSold: Schema.optional(Schema.Number),
  interactions: Schema.optional(Schema.String),
  revenueMicros: Schema.optional(Schema.String),
  leadGrossProfitMicros: Schema.optional(Schema.String),
  averageCpc: Schema.optional(Schema.Number),
  valuePerAllConversions: Schema.optional(Schema.Number),
  crossSellGrossProfitMicros: Schema.optional(Schema.String),
  valuePerAllConversionsByConversionDate: Schema.optional(Schema.Number),
  searchClickShare: Schema.optional(Schema.Number),
  generalInvalidClickRate: Schema.optional(Schema.Number),
  allConversionsFromClickToCall: Schema.optional(Schema.Number),
  allConversionsFromOrder: Schema.optional(Schema.Number),
  averageImpressionFrequencyPerUser: Schema.optional(Schema.Number),
  invalidClickRate: Schema.optional(Schema.Number),
  searchExactMatchImpressionShare: Schema.optional(Schema.Number),
  rawEventConversionMetrics: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__Value)),
  absoluteTopImpressionPercentage: Schema.optional(Schema.Number),
  clientAccountViewThroughConversions: Schema.optional(Schema.String),
  clientAccountCrossSellUnitsSold: Schema.optional(Schema.Number),
  searchTopImpressionShare: Schema.optional(Schema.Number),
  leadUnitsSold: Schema.optional(Schema.Number),
  contentRankLostImpressionShare: Schema.optional(Schema.Number),
  conversionsValuePerCost: Schema.optional(Schema.Number),
  averageOrderValueMicros: Schema.optional(Schema.String),
  grossProfitMicros: Schema.optional(Schema.String),
  averageCpm: Schema.optional(Schema.Number),
  crossDeviceConversionsByConversionDate: Schema.optional(Schema.Number),
  crossDeviceConversionsValueByConversionDate: Schema.optional(Schema.Number),
  leadRevenueMicros: Schema.optional(Schema.String),
  invalidClicks: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__Metrics" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__Metrics>;

export interface GoogleAdsSearchads360V0Common__TextLabel {
  /** A short description of the label. The length must be no more than 200 characters. */
  description?: string;
  /** Background color of the label in HEX format. This string must match the regular expression '^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$'. Note: The background color may not be visible for manager accounts. */
  backgroundColor?: string;
}

export const GoogleAdsSearchads360V0Common__TextLabel: Schema.Schema<GoogleAdsSearchads360V0Common__TextLabel> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  backgroundColor: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TextLabel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TextLabel>;

export interface GoogleAdsSearchads360V0Resources__SearchAds360Field {
  /** Output only. Whether the artifact can be used in a ORDER BY clause in search queries. */
  sortable?: boolean;
  /** Output only. The resource name of the artifact. Artifact resource names have the form: `SearchAds360Fields/{name}` */
  resourceName?: string;
  /** Output only. Values the artifact can assume if it is a field of type ENUM. This field is only set for artifacts of category SEGMENT or ATTRIBUTE. */
  enumValues?: Array<string>;
  /** Output only. Whether the artifact can be used in a SELECT clause in search queries. */
  selectable?: boolean;
  /** Output only. The category of the artifact. */
  category?: "UNSPECIFIED" | "UNKNOWN" | "RESOURCE" | "ATTRIBUTE" | "SEGMENT" | "METRIC" | (string & {});
  /** Output only. The name of the artifact. */
  name?: string;
  /** Output only. Whether the field artifact is repeated. */
  isRepeated?: boolean;
  /** Output only. The URL of proto describing the artifact's data type. */
  typeUrl?: string;
  /** Output only. This field lists the names of all metrics that are selectable with the described artifact when it is used in the FROM clause. It is only set for artifacts whose category is RESOURCE. */
  metrics?: Array<string>;
  /** Output only. The names of all resources that are selectable with the described artifact. Fields from these resources do not segment metrics when included in search queries. This field is only set for artifacts whose category is RESOURCE. */
  attributeResources?: Array<string>;
  /** Output only. This field determines the operators that can be used with the artifact in WHERE clauses. */
  dataType?: "UNSPECIFIED" | "UNKNOWN" | "BOOLEAN" | "DATE" | "DOUBLE" | "ENUM" | "FLOAT" | "INT32" | "INT64" | "MESSAGE" | "RESOURCE_NAME" | "STRING" | "UINT64" | (string & {});
  /** Output only. Whether the artifact can be used in a WHERE clause in search queries. */
  filterable?: boolean;
  /** Output only. The names of all resources, segments, and metrics that are selectable with the described artifact. */
  selectableWith?: Array<string>;
  /** Output only. This field lists the names of all artifacts, whether a segment or another resource, that segment metrics when included in search queries and when the described artifact is used in the FROM clause. It is only set for artifacts whose category is RESOURCE. */
  segments?: Array<string>;
}

export const GoogleAdsSearchads360V0Resources__SearchAds360Field: Schema.Schema<GoogleAdsSearchads360V0Resources__SearchAds360Field> = Schema.suspend(() => Schema.Struct({
  sortable: Schema.optional(Schema.Boolean),
  resourceName: Schema.optional(Schema.String),
  enumValues: Schema.optional(Schema.Array(Schema.String)),
  selectable: Schema.optional(Schema.Boolean),
  category: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  isRepeated: Schema.optional(Schema.Boolean),
  typeUrl: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  attributeResources: Schema.optional(Schema.Array(Schema.String)),
  dataType: Schema.optional(Schema.String),
  filterable: Schema.optional(Schema.Boolean),
  selectableWith: Schema.optional(Schema.Array(Schema.String)),
  segments: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__SearchAds360Field" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__SearchAds360Field>;

export interface GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse {
  /** Total number of results that match the query ignoring the LIMIT clause. */
  totalResultsCount?: string;
  /** Pagination token used to retrieve the next page of results. Pass the content of this string as the `page_token` attribute of the next request. `next_page_token` is not returned for the last page. */
  nextPageToken?: string;
  /** The list of fields that matched the query. */
  results?: Array<GoogleAdsSearchads360V0Resources__SearchAds360Field>;
}

export const GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse: Schema.Schema<GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse> = Schema.suspend(() => Schema.Struct({
  totalResultsCount: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Resources__SearchAds360Field)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse>;

export interface GoogleAdsSearchads360V0Common__YoutubeVideoAsset {
  /** YouTube video id. This is the 11 character string value used in the YouTube video URL. */
  youtubeVideoId?: string;
  /** YouTube video title. */
  youtubeVideoTitle?: string;
}

export const GoogleAdsSearchads360V0Common__YoutubeVideoAsset: Schema.Schema<GoogleAdsSearchads360V0Common__YoutubeVideoAsset> = Schema.suspend(() => Schema.Struct({
  youtubeVideoId: Schema.optional(Schema.String),
  youtubeVideoTitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__YoutubeVideoAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__YoutubeVideoAsset>;

export interface GoogleAdsSearchads360V0Common__SearchAds360TextAdInfo {
  /** The displayed mobile URL of the ad. */
  displayMobileUrl?: string;
  /** The second line of the ad's description. */
  description2?: string;
  /** The tracking id of the ad. */
  adTrackingId?: string;
  /** The first line of the ad's description. */
  description1?: string;
  /** The headline of the ad. */
  headline?: string;
  /** The displayed URL of the ad. */
  displayUrl?: string;
}

export const GoogleAdsSearchads360V0Common__SearchAds360TextAdInfo: Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360TextAdInfo> = Schema.suspend(() => Schema.Struct({
  displayMobileUrl: Schema.optional(Schema.String),
  description2: Schema.optional(Schema.String),
  adTrackingId: Schema.optional(Schema.String),
  description1: Schema.optional(Schema.String),
  headline: Schema.optional(Schema.String),
  displayUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__SearchAds360TextAdInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360TextAdInfo>;

export interface GoogleAdsSearchads360V0Resources_ConversionAction_AttributionModelSettings {
  /** The attribution model type of this conversion action. */
  attributionModel?: "UNSPECIFIED" | "UNKNOWN" | "EXTERNAL" | "GOOGLE_ADS_LAST_CLICK" | "GOOGLE_SEARCH_ATTRIBUTION_FIRST_CLICK" | "GOOGLE_SEARCH_ATTRIBUTION_LINEAR" | "GOOGLE_SEARCH_ATTRIBUTION_TIME_DECAY" | "GOOGLE_SEARCH_ATTRIBUTION_POSITION_BASED" | "GOOGLE_SEARCH_ATTRIBUTION_DATA_DRIVEN" | (string & {});
  /** Output only. The status of the data-driven attribution model for the conversion action. */
  dataDrivenModelStatus?: "UNSPECIFIED" | "UNKNOWN" | "AVAILABLE" | "STALE" | "EXPIRED" | "NEVER_GENERATED" | (string & {});
}

export const GoogleAdsSearchads360V0Resources_ConversionAction_AttributionModelSettings: Schema.Schema<GoogleAdsSearchads360V0Resources_ConversionAction_AttributionModelSettings> = Schema.suspend(() => Schema.Struct({
  attributionModel: Schema.optional(Schema.String),
  dataDrivenModelStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ConversionAction_AttributionModelSettings" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ConversionAction_AttributionModelSettings>;

export interface GoogleAdsSearchads360V0Resources_AdGroupCriterion_PositionEstimates {
  /** Output only. The estimate of the CPC bid required for ad to be displayed at the top of the first page of search results. */
  topOfPageCpcMicros?: string;
}

export const GoogleAdsSearchads360V0Resources_AdGroupCriterion_PositionEstimates: Schema.Schema<GoogleAdsSearchads360V0Resources_AdGroupCriterion_PositionEstimates> = Schema.suspend(() => Schema.Struct({
  topOfPageCpcMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_AdGroupCriterion_PositionEstimates" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_AdGroupCriterion_PositionEstimates>;

export interface GoogleAdsSearchads360V0Common__TargetCpa {
  /** Maximum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. This should only be set for portfolio bid strategies. */
  cpcBidCeilingMicros?: string;
  /** Average CPA target. This target should be greater than or equal to minimum billable unit based on the currency for the account. */
  targetCpaMicros?: string;
  /** Minimum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. This should only be set for portfolio bid strategies. */
  cpcBidFloorMicros?: string;
}

export const GoogleAdsSearchads360V0Common__TargetCpa: Schema.Schema<GoogleAdsSearchads360V0Common__TargetCpa> = Schema.suspend(() => Schema.Struct({
  cpcBidCeilingMicros: Schema.optional(Schema.String),
  targetCpaMicros: Schema.optional(Schema.String),
  cpcBidFloorMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TargetCpa" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TargetCpa>;

export interface GoogleAdsSearchads360V0Common__EnhancedCpc {
}

export const GoogleAdsSearchads360V0Common__EnhancedCpc: Schema.Schema<GoogleAdsSearchads360V0Common__EnhancedCpc> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__EnhancedCpc" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__EnhancedCpc>;

export interface GoogleAdsSearchads360V0Common__UnifiedPageFeedAsset {
  /** Labels used to group the page urls. */
  labels?: Array<string>;
  /** The webpage that advertisers want to target. */
  pageUrl?: string;
}

export const GoogleAdsSearchads360V0Common__UnifiedPageFeedAsset: Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedPageFeedAsset> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Array(Schema.String)),
  pageUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__UnifiedPageFeedAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedPageFeedAsset>;

export interface GoogleAdsSearchads360V0Resources__Audience {
  /** Description of this audience. */
  description?: string;
  /** Required. Name of the audience. It should be unique across all audiences. It must have a minimum length of 1 and maximum length of 255. */
  name?: string;
  /** Immutable. The resource name of the audience. Audience names have the form: `customers/{customer_id}/audiences/{audience_id}` */
  resourceName?: string;
  /** Output only. ID of the audience. */
  id?: string;
}

export const GoogleAdsSearchads360V0Resources__Audience: Schema.Schema<GoogleAdsSearchads360V0Resources__Audience> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__Audience" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__Audience>;

export interface GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBrand {
  /** String value of the product brand. */
  value?: string;
}

export const GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBrand: Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBrand> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBrand" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBrand>;

export interface GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCondition {
  /** Value of the condition. */
  condition?: "UNSPECIFIED" | "UNKNOWN" | "NEW" | "REFURBISHED" | "USED" | (string & {});
}

export const GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCondition: Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCondition> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCondition" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCondition>;

export interface GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductChannel {
  /** Value of the locality. */
  channel?: "UNSPECIFIED" | "UNKNOWN" | "ONLINE" | "LOCAL" | (string & {});
}

export const GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductChannel: Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductChannel> = Schema.suspend(() => Schema.Struct({
  channel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductChannel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductChannel>;

export interface GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductType {
  /** Value of the type. */
  value?: string;
  /** Level of the type. */
  level?: "UNSPECIFIED" | "UNKNOWN" | "LEVEL1" | "LEVEL2" | "LEVEL3" | "LEVEL4" | "LEVEL5" | (string & {});
}

export const GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductType: Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductType> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  level: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductType" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductType>;

export interface GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBiddingCategory {
  /** Indicates the level of the category in the taxonomy. */
  level?: "UNSPECIFIED" | "UNKNOWN" | "LEVEL1" | "LEVEL2" | "LEVEL3" | "LEVEL4" | "LEVEL5" | (string & {});
  /** ID of the product bidding category. This ID is equivalent to the google_product_category ID as described in this article: https://support.google.com/merchants/answer/6324436 */
  id?: string;
}

export const GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBiddingCategory: Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBiddingCategory> = Schema.suspend(() => Schema.Struct({
  level: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBiddingCategory" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBiddingCategory>;

export interface GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductItemId {
  /** Value of the id. */
  value?: string;
}

export const GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductItemId: Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductItemId> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductItemId" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductItemId>;

export interface GoogleAdsSearchads360V0Resources__ListingGroupFilterDimension {
  /** Brand of a product offer. */
  productBrand?: GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBrand;
  /** Condition of a product offer. */
  productCondition?: GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCondition;
  /** Locality of a product offer. */
  productChannel?: GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductChannel;
  /** Custom attribute of a product offer. */
  productCustomAttribute?: GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCustomAttribute;
  /** Type of a product offer. */
  productType?: GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductType;
  /** Bidding category of a product offer. */
  productBiddingCategory?: GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBiddingCategory;
  /** Item id of a product offer. */
  productItemId?: GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductItemId;
}

export const GoogleAdsSearchads360V0Resources__ListingGroupFilterDimension: Schema.Schema<GoogleAdsSearchads360V0Resources__ListingGroupFilterDimension> = Schema.suspend(() => Schema.Struct({
  productBrand: Schema.optional(GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBrand),
  productCondition: Schema.optional(GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCondition),
  productChannel: Schema.optional(GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductChannel),
  productCustomAttribute: Schema.optional(GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductCustomAttribute),
  productType: Schema.optional(GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductType),
  productBiddingCategory: Schema.optional(GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductBiddingCategory),
  productItemId: Schema.optional(GoogleAdsSearchads360V0Resources_ListingGroupFilterDimension_ProductItemId),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__ListingGroupFilterDimension" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__ListingGroupFilterDimension>;

export interface GoogleAdsSearchads360V0Resources__ListingGroupFilterDimensionPath {
  /** Output only. The complete path of dimensions through the listing group filter hierarchy (excluding the root node) to this listing group filter. */
  dimensions?: Array<GoogleAdsSearchads360V0Resources__ListingGroupFilterDimension>;
}

export const GoogleAdsSearchads360V0Resources__ListingGroupFilterDimensionPath: Schema.Schema<GoogleAdsSearchads360V0Resources__ListingGroupFilterDimensionPath> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Resources__ListingGroupFilterDimension)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__ListingGroupFilterDimensionPath" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__ListingGroupFilterDimensionPath>;

export interface GoogleAdsSearchads360V0Resources__AssetGroupListingGroupFilter {
  /** Immutable. Type of a listing group filter node. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "SUBDIVISION" | "UNIT_INCLUDED" | "UNIT_EXCLUDED" | (string & {});
  /** Immutable. The resource name of the asset group listing group filter. Asset group listing group filter resource name have the form: `customers/{customer_id}/assetGroupListingGroupFilters/{asset_group_id}~{listing_group_filter_id}` */
  resourceName?: string;
  /** Dimension value with which this listing group is refining its parent. Undefined for the root group. */
  caseValue?: GoogleAdsSearchads360V0Resources__ListingGroupFilterDimension;
  /** Output only. The ID of the ListingGroupFilter. */
  id?: string;
  /** Immutable. Resource name of the parent listing group subdivision. Null for the root listing group filter node. */
  parentListingGroupFilter?: string;
  /** Output only. The path of dimensions defining this listing group filter. */
  path?: GoogleAdsSearchads360V0Resources__ListingGroupFilterDimensionPath;
  /** Immutable. The asset group which this asset group listing group filter is part of. */
  assetGroup?: string;
  /** Immutable. The vertical the current node tree represents. All nodes in the same tree must belong to the same vertical. */
  vertical?: "UNSPECIFIED" | "UNKNOWN" | "SHOPPING" | (string & {});
}

export const GoogleAdsSearchads360V0Resources__AssetGroupListingGroupFilter: Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupListingGroupFilter> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  caseValue: Schema.optional(GoogleAdsSearchads360V0Resources__ListingGroupFilterDimension),
  id: Schema.optional(Schema.String),
  parentListingGroupFilter: Schema.optional(Schema.String),
  path: Schema.optional(GoogleAdsSearchads360V0Resources__ListingGroupFilterDimensionPath),
  assetGroup: Schema.optional(Schema.String),
  vertical: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AssetGroupListingGroupFilter" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupListingGroupFilter>;

export interface GoogleAdsSearchads360V0Services__RawEventConversionMetricHeader {
  /** The conversion custom variable ID. */
  id?: string;
  /** The user defined name of the raw event metric. */
  name?: string;
}

export const GoogleAdsSearchads360V0Services__RawEventConversionMetricHeader: Schema.Schema<GoogleAdsSearchads360V0Services__RawEventConversionMetricHeader> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__RawEventConversionMetricHeader" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__RawEventConversionMetricHeader>;

export interface GoogleAdsSearchads360V0Common__CustomParameter {
  /** The value to be substituted. */
  value?: string;
  /** The key matching the parameter tag name. */
  key?: string;
}

export const GoogleAdsSearchads360V0Common__CustomParameter: Schema.Schema<GoogleAdsSearchads360V0Common__CustomParameter> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__CustomParameter" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__CustomParameter>;

export interface GoogleAdsSearchads360V0Common__TextAsset {
  /** Text content of the text asset. */
  text?: string;
}

export const GoogleAdsSearchads360V0Common__TextAsset: Schema.Schema<GoogleAdsSearchads360V0Common__TextAsset> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TextAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TextAsset>;

export interface GoogleAdsSearchads360V0Common__CallToActionAsset {
  /** Call to action. */
  callToAction?: "UNSPECIFIED" | "UNKNOWN" | "LEARN_MORE" | "GET_QUOTE" | "APPLY_NOW" | "SIGN_UP" | "CONTACT_US" | "SUBSCRIBE" | "DOWNLOAD" | "BOOK_NOW" | "SHOP_NOW" | "BUY_NOW" | "DONATE_NOW" | "ORDER_NOW" | "PLAY_NOW" | "SEE_MORE" | "START_NOW" | "VISIT_SITE" | "WATCH_NOW" | (string & {});
}

export const GoogleAdsSearchads360V0Common__CallToActionAsset: Schema.Schema<GoogleAdsSearchads360V0Common__CallToActionAsset> = Schema.suspend(() => Schema.Struct({
  callToAction: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__CallToActionAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__CallToActionAsset>;

export interface GoogleAdsSearchads360V0Common__ImageDimension {
  /** A URL that returns the image with this height and width. */
  url?: string;
  /** Height of the image. */
  heightPixels?: string;
  /** Width of the image. */
  widthPixels?: string;
}

export const GoogleAdsSearchads360V0Common__ImageDimension: Schema.Schema<GoogleAdsSearchads360V0Common__ImageDimension> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  heightPixels: Schema.optional(Schema.String),
  widthPixels: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__ImageDimension" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__ImageDimension>;

export interface GoogleAdsSearchads360V0Common__ImageAsset {
  /** MIME type of the image asset. */
  mimeType?: "UNSPECIFIED" | "UNKNOWN" | "IMAGE_JPEG" | "IMAGE_GIF" | "IMAGE_PNG" | "FLASH" | "TEXT_HTML" | "PDF" | "MSWORD" | "MSEXCEL" | "RTF" | "AUDIO_WAV" | "AUDIO_MP3" | "HTML5_AD_ZIP" | (string & {});
  /** File size of the image asset in bytes. */
  fileSize?: string;
  /** Metadata for this image at its original size. */
  fullSize?: GoogleAdsSearchads360V0Common__ImageDimension;
}

export const GoogleAdsSearchads360V0Common__ImageAsset: Schema.Schema<GoogleAdsSearchads360V0Common__ImageAsset> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  fileSize: Schema.optional(Schema.String),
  fullSize: Schema.optional(GoogleAdsSearchads360V0Common__ImageDimension),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__ImageAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__ImageAsset>;

export interface GoogleAdsSearchads360V0Common__AdScheduleInfo {
  /** Minutes after the start hour at which this schedule starts. This field is required for CREATE operations and is prohibited on UPDATE operations. */
  startMinute?: "UNSPECIFIED" | "UNKNOWN" | "ZERO" | "FIFTEEN" | "THIRTY" | "FORTY_FIVE" | (string & {});
  /** Day of the week the schedule applies to. This field is required for CREATE operations and is prohibited on UPDATE operations. */
  dayOfWeek?: "UNSPECIFIED" | "UNKNOWN" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Starting hour in 24 hour time. This field must be between 0 and 23, inclusive. This field is required for CREATE operations and is prohibited on UPDATE operations. */
  startHour?: number;
  /** Ending hour in 24 hour time; 24 signifies end of the day. This field must be between 0 and 24, inclusive. This field is required for CREATE operations and is prohibited on UPDATE operations. */
  endHour?: number;
  /** Minutes after the end hour at which this schedule ends. The schedule is exclusive of the end minute. This field is required for CREATE operations and is prohibited on UPDATE operations. */
  endMinute?: "UNSPECIFIED" | "UNKNOWN" | "ZERO" | "FIFTEEN" | "THIRTY" | "FORTY_FIVE" | (string & {});
}

export const GoogleAdsSearchads360V0Common__AdScheduleInfo: Schema.Schema<GoogleAdsSearchads360V0Common__AdScheduleInfo> = Schema.suspend(() => Schema.Struct({
  startMinute: Schema.optional(Schema.String),
  dayOfWeek: Schema.optional(Schema.String),
  startHour: Schema.optional(Schema.Number),
  endHour: Schema.optional(Schema.Number),
  endMinute: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__AdScheduleInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__AdScheduleInfo>;

export interface GoogleAdsSearchads360V0Common__UnifiedCalloutAsset {
  /** The callout text. The length of this string should be between 1 and 25, inclusive. */
  calloutText?: string;
  /** Last date of when this asset is effective and still serving, in yyyy-MM-dd format. */
  endDate?: string;
  /** List of non-overlapping schedules specifying all time intervals for which the asset may serve. There can be a maximum of 6 schedules per day, 42 in total. */
  adScheduleTargets?: Array<GoogleAdsSearchads360V0Common__AdScheduleInfo>;
  /** Start date of when this asset is effective and can begin serving, in yyyy-MM-dd format. */
  startDate?: string;
  /** Whether to show the asset in search user's time zone. Applies to Microsoft Ads. */
  useSearcherTimeZone?: boolean;
}

export const GoogleAdsSearchads360V0Common__UnifiedCalloutAsset: Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedCalloutAsset> = Schema.suspend(() => Schema.Struct({
  calloutText: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  adScheduleTargets: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__AdScheduleInfo)),
  startDate: Schema.optional(Schema.String),
  useSearcherTimeZone: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__UnifiedCalloutAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedCalloutAsset>;

export interface GoogleAdsSearchads360V0Common__UnifiedSitelinkAsset {
  /** List of non-overlapping schedules specifying all time intervals for which the asset may serve. There can be a maximum of 6 schedules per day, 42 in total. */
  adScheduleTargets?: Array<GoogleAdsSearchads360V0Common__AdScheduleInfo>;
  /** Whether to show the sitelink asset in search user's time zone. Applies to Microsoft Ads. */
  useSearcherTimeZone?: boolean;
  /** Whether the preference is for the sitelink asset to be displayed on mobile devices. Applies to Microsoft Ads. */
  mobilePreferred?: boolean;
  /** First line of the description for the sitelink. If set, the length should be between 1 and 35, inclusive, and description2 must also be set. */
  description1?: string;
  /** Start date of when this asset is effective and can begin serving, in yyyy-MM-dd format. */
  startDate?: string;
  /** ID used for tracking clicks for the sitelink asset. This is a Yahoo! Japan only field. */
  trackingId?: string;
  /** Last date of when this asset is effective and still serving, in yyyy-MM-dd format. */
  endDate?: string;
  /** URL display text for the sitelink. The length of this string should be between 1 and 25, inclusive. */
  linkText?: string;
  /** Second line of the description for the sitelink. If set, the length should be between 1 and 35, inclusive, and description1 must also be set. */
  description2?: string;
}

export const GoogleAdsSearchads360V0Common__UnifiedSitelinkAsset: Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedSitelinkAsset> = Schema.suspend(() => Schema.Struct({
  adScheduleTargets: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__AdScheduleInfo)),
  useSearcherTimeZone: Schema.optional(Schema.Boolean),
  mobilePreferred: Schema.optional(Schema.Boolean),
  description1: Schema.optional(Schema.String),
  startDate: Schema.optional(Schema.String),
  trackingId: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  linkText: Schema.optional(Schema.String),
  description2: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__UnifiedSitelinkAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedSitelinkAsset>;

export interface GoogleAdsSearchads360V0Common__UnifiedCallAsset {
  /** The advertiser's raw phone number. Examples: '1234567890', '(123)456-7890' */
  phoneNumber?: string;
  /** Last date of when this asset is effective and still serving, in yyyy-MM-dd format. */
  endDate?: string;
  /** List of non-overlapping schedules specifying all time intervals for which the asset may serve. There can be a maximum of 6 schedules per day, 42 in total. */
  adScheduleTargets?: Array<GoogleAdsSearchads360V0Common__AdScheduleInfo>;
  /** Whether the call only shows the phone number without a link to the website. Applies to Microsoft Ads. */
  callOnly?: boolean;
  /** The conversion action to attribute a call conversion to. If not set, the default conversion action is used. This field only has effect if call_conversion_reporting_state is set to USE_RESOURCE_LEVEL_CALL_CONVERSION_ACTION. */
  callConversionAction?: string;
  /** Two-letter country code of the phone number. Examples: 'US', 'us'. */
  countryCode?: string;
  /** Whether the call should be enabled on call tracking. Applies to Microsoft Ads. */
  callTrackingEnabled?: boolean;
  /** Start date of when this asset is effective and can begin serving, in yyyy-MM-dd format. */
  startDate?: string;
  /** Whether to show the call extension in search user's time zone. Applies to Microsoft Ads. */
  useSearcherTimeZone?: boolean;
  /** Output only. Indicates whether this CallAsset should use its own call conversion setting, follow the account level setting, or disable call conversion. */
  callConversionReportingState?: "UNSPECIFIED" | "UNKNOWN" | "DISABLED" | "USE_ACCOUNT_LEVEL_CALL_CONVERSION_ACTION" | "USE_RESOURCE_LEVEL_CALL_CONVERSION_ACTION" | (string & {});
}

export const GoogleAdsSearchads360V0Common__UnifiedCallAsset: Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedCallAsset> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  adScheduleTargets: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__AdScheduleInfo)),
  callOnly: Schema.optional(Schema.Boolean),
  callConversionAction: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  callTrackingEnabled: Schema.optional(Schema.Boolean),
  startDate: Schema.optional(Schema.String),
  useSearcherTimeZone: Schema.optional(Schema.Boolean),
  callConversionReportingState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__UnifiedCallAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedCallAsset>;

export interface GoogleAdsSearchads360V0Common__MobileAppAsset {
  /** Required. A string that uniquely identifies a mobile application. It should just contain the platform native id, like "com.android.ebay" for Android or "12345689" for iOS. */
  appId?: string;
  /** Required. The application store that distributes this specific app. */
  appStore?: "UNSPECIFIED" | "UNKNOWN" | "APPLE_APP_STORE" | "GOOGLE_APP_STORE" | (string & {});
}

export const GoogleAdsSearchads360V0Common__MobileAppAsset: Schema.Schema<GoogleAdsSearchads360V0Common__MobileAppAsset> = Schema.suspend(() => Schema.Struct({
  appId: Schema.optional(Schema.String),
  appStore: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__MobileAppAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__MobileAppAsset>;

export interface GoogleAdsSearchads360V0Common__BusinessProfileLocation {
  /** Business Profile store code of this location. This is synced from the Business Profile account. */
  storeCode?: string;
  /** Advertiser specified label for the location on the Business Profile account. This is synced from the Business Profile account. */
  labels?: Array<string>;
  /** Listing ID of this Business Profile location. This is synced from the linked Business Profile account. */
  listingId?: string;
}

export const GoogleAdsSearchads360V0Common__BusinessProfileLocation: Schema.Schema<GoogleAdsSearchads360V0Common__BusinessProfileLocation> = Schema.suspend(() => Schema.Struct({
  storeCode: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(Schema.String)),
  listingId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__BusinessProfileLocation" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__BusinessProfileLocation>;

export interface GoogleAdsSearchads360V0Common__UnifiedLocationAsset {
  /** The type of location ownership. If the type is BUSINESS_OWNER, it will be served as a location extension. If the type is AFFILIATE, it will be served as an affiliate location. */
  locationOwnershipType?: "UNSPECIFIED" | "UNKNOWN" | "BUSINESS_OWNER" | "AFFILIATE" | (string & {});
  /** Place IDs uniquely identify a place in the Google Places database and on Google Maps. This field is unique for a given customer ID and asset type. See https://developers.google.com/places/web-service/place-id to learn more about Place ID. */
  placeId?: string;
  /** The list of business locations for the customer. This will only be returned if the Location Asset is syncing from the Business Profile account. It is possible to have multiple Business Profile listings under the same account that point to the same Place ID. */
  businessProfileLocations?: Array<GoogleAdsSearchads360V0Common__BusinessProfileLocation>;
}

export const GoogleAdsSearchads360V0Common__UnifiedLocationAsset: Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedLocationAsset> = Schema.suspend(() => Schema.Struct({
  locationOwnershipType: Schema.optional(Schema.String),
  placeId: Schema.optional(Schema.String),
  businessProfileLocations: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__BusinessProfileLocation)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__UnifiedLocationAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__UnifiedLocationAsset>;

export interface GoogleAdsSearchads360V0Resources__Asset {
  /** Output only. The ID of the asset. */
  id?: string;
  /** A list of mappings to be used for substituting URL custom parameter tags in the tracking_url_template, final_urls, and/or final_mobile_urls. */
  urlCustomParameters?: Array<GoogleAdsSearchads360V0Common__CustomParameter>;
  /** Output only. A text asset. */
  textAsset?: GoogleAdsSearchads360V0Common__TextAsset;
  /** Output only. The status of the asset. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | "ARCHIVED" | "PENDING_SYSTEM_GENERATED" | (string & {});
  /** Immutable. A call to action asset. */
  callToActionAsset?: GoogleAdsSearchads360V0Common__CallToActionAsset;
  /** Output only. Type of the asset. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "YOUTUBE_VIDEO" | "MEDIA_BUNDLE" | "IMAGE" | "TEXT" | "LEAD_FORM" | "BOOK_ON_GOOGLE" | "PROMOTION" | "CALLOUT" | "STRUCTURED_SNIPPET" | "SITELINK" | "PAGE_FEED" | "DYNAMIC_EDUCATION" | "MOBILE_APP" | "HOTEL_CALLOUT" | "CALL" | "PRICE" | "CALL_TO_ACTION" | "DYNAMIC_REAL_ESTATE" | "DYNAMIC_CUSTOM" | "DYNAMIC_HOTELS_AND_RENTALS" | "DYNAMIC_FLIGHTS" | "DISCOVERY_CAROUSEL_CARD" | "DYNAMIC_TRAVEL" | "DYNAMIC_LOCAL" | "DYNAMIC_JOBS" | "LOCATION" | "HOTEL_PROPERTY" | (string & {});
  /** Output only. An image asset. */
  imageAsset?: GoogleAdsSearchads360V0Common__ImageAsset;
  /** Output only. A unified callout asset. */
  calloutAsset?: GoogleAdsSearchads360V0Common__UnifiedCalloutAsset;
  /** URL template for constructing a tracking URL. */
  trackingUrlTemplate?: string;
  /** Optional name of the asset. */
  name?: string;
  /** Immutable. A YouTube video asset. */
  youtubeVideoAsset?: GoogleAdsSearchads360V0Common__YoutubeVideoAsset;
  /** A list of possible final mobile URLs after all cross domain redirects. */
  finalMobileUrls?: Array<string>;
  /** URL template for appending params to landing page URLs served with parallel tracking. */
  finalUrlSuffix?: string;
  /** Output only. The timestamp when this asset was created. The timestamp is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss" format. */
  creationTime?: string;
  /** Output only. The datetime when this asset was last modified. The datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss" format. */
  lastModifiedTime?: string;
  /** Output only. The Engine Status for an asset. */
  engineStatus?: "UNSPECIFIED" | "UNKNOWN" | "SERVING" | "SERVING_LIMITED" | "DISAPPROVED" | "DISABLED" | "REMOVED" | (string & {});
  /** Output only. A unified sitelink asset. */
  sitelinkAsset?: GoogleAdsSearchads360V0Common__UnifiedSitelinkAsset;
  /** Immutable. The resource name of the asset. Asset resource names have the form: `customers/{customer_id}/assets/{asset_id}` */
  resourceName?: string;
  /** A list of possible final URLs after all cross domain redirects. */
  finalUrls?: Array<string>;
  /** Output only. A unified call asset. */
  callAsset?: GoogleAdsSearchads360V0Common__UnifiedCallAsset;
  /** A mobile app asset. */
  mobileAppAsset?: GoogleAdsSearchads360V0Common__MobileAppAsset;
  /** Output only. A unified location asset. */
  locationAsset?: GoogleAdsSearchads360V0Common__UnifiedLocationAsset;
  /** Output only. A unified page feed asset. */
  pageFeedAsset?: GoogleAdsSearchads360V0Common__UnifiedPageFeedAsset;
}

export const GoogleAdsSearchads360V0Resources__Asset: Schema.Schema<GoogleAdsSearchads360V0Resources__Asset> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  urlCustomParameters: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__CustomParameter)),
  textAsset: Schema.optional(GoogleAdsSearchads360V0Common__TextAsset),
  status: Schema.optional(Schema.String),
  callToActionAsset: Schema.optional(GoogleAdsSearchads360V0Common__CallToActionAsset),
  type: Schema.optional(Schema.String),
  imageAsset: Schema.optional(GoogleAdsSearchads360V0Common__ImageAsset),
  calloutAsset: Schema.optional(GoogleAdsSearchads360V0Common__UnifiedCalloutAsset),
  trackingUrlTemplate: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  youtubeVideoAsset: Schema.optional(GoogleAdsSearchads360V0Common__YoutubeVideoAsset),
  finalMobileUrls: Schema.optional(Schema.Array(Schema.String)),
  finalUrlSuffix: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  engineStatus: Schema.optional(Schema.String),
  sitelinkAsset: Schema.optional(GoogleAdsSearchads360V0Common__UnifiedSitelinkAsset),
  resourceName: Schema.optional(Schema.String),
  finalUrls: Schema.optional(Schema.Array(Schema.String)),
  callAsset: Schema.optional(GoogleAdsSearchads360V0Common__UnifiedCallAsset),
  mobileAppAsset: Schema.optional(GoogleAdsSearchads360V0Common__MobileAppAsset),
  locationAsset: Schema.optional(GoogleAdsSearchads360V0Common__UnifiedLocationAsset),
  pageFeedAsset: Schema.optional(GoogleAdsSearchads360V0Common__UnifiedPageFeedAsset),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__Asset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__Asset>;

export interface GoogleAdsSearchads360V0Common__TargetOutrankShare {
  /** Maximum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. */
  cpcBidCeilingMicros?: string;
}

export const GoogleAdsSearchads360V0Common__TargetOutrankShare: Schema.Schema<GoogleAdsSearchads360V0Common__TargetOutrankShare> = Schema.suspend(() => Schema.Struct({
  cpcBidCeilingMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TargetOutrankShare" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TargetOutrankShare>;

export interface GoogleAdsSearchads360V0Resources__AgeRangeView {
  /** Output only. The resource name of the age range view. Age range view resource names have the form: `customers/{customer_id}/ageRangeViews/{ad_group_id}~{criterion_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__AgeRangeView: Schema.Schema<GoogleAdsSearchads360V0Resources__AgeRangeView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AgeRangeView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AgeRangeView>;

export interface GoogleAdsSearchads360V0Resources_AdGroupCriterion_QualityInfo {
  /** Output only. The quality score. This field may not be populated if Google does not have enough information to determine a value. */
  qualityScore?: number;
}

export const GoogleAdsSearchads360V0Resources_AdGroupCriterion_QualityInfo: Schema.Schema<GoogleAdsSearchads360V0Resources_AdGroupCriterion_QualityInfo> = Schema.suspend(() => Schema.Struct({
  qualityScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_AdGroupCriterion_QualityInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_AdGroupCriterion_QualityInfo>;

export interface GoogleAdsSearchads360V0Common__UserListInfo {
  /** The User List resource name. */
  userList?: string;
}

export const GoogleAdsSearchads360V0Common__UserListInfo: Schema.Schema<GoogleAdsSearchads360V0Common__UserListInfo> = Schema.suspend(() => Schema.Struct({
  userList: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__UserListInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__UserListInfo>;

export interface GoogleAdsSearchads360V0Common__ListingGroupInfo {
  /** Type of the listing group. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "SUBDIVISION" | "UNIT" | (string & {});
}

export const GoogleAdsSearchads360V0Common__ListingGroupInfo: Schema.Schema<GoogleAdsSearchads360V0Common__ListingGroupInfo> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__ListingGroupInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__ListingGroupInfo>;

export interface GoogleAdsSearchads360V0Common__LocationInfo {
  /** The geo target constant resource name. */
  geoTargetConstant?: string;
}

export const GoogleAdsSearchads360V0Common__LocationInfo: Schema.Schema<GoogleAdsSearchads360V0Common__LocationInfo> = Schema.suspend(() => Schema.Struct({
  geoTargetConstant: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__LocationInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__LocationInfo>;

export interface GoogleAdsSearchads360V0Common__WebpageInfo {
  /** Website criteria coverage percentage. This is the computed percentage of website coverage based on the website target, negative website target and negative keywords in the ad group and campaign. For instance, when coverage returns as 1, it indicates it has 100% coverage. This field is read-only. */
  coveragePercentage?: number;
  /** The name of the criterion that is defined by this parameter. The name value will be used for identifying, sorting and filtering criteria with this type of parameters. This field is required for CREATE operations and is prohibited on UPDATE operations. */
  criterionName?: string;
  /** Conditions, or logical expressions, for webpage targeting. The list of webpage targeting conditions are and-ed together when evaluated for targeting. An empty list of conditions indicates all pages of the campaign's website are targeted. This field is required for CREATE operations and is prohibited on UPDATE operations. */
  conditions?: Array<GoogleAdsSearchads360V0Common__WebpageConditionInfo>;
}

export const GoogleAdsSearchads360V0Common__WebpageInfo: Schema.Schema<GoogleAdsSearchads360V0Common__WebpageInfo> = Schema.suspend(() => Schema.Struct({
  coveragePercentage: Schema.optional(Schema.Number),
  criterionName: Schema.optional(Schema.String),
  conditions: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__WebpageConditionInfo)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__WebpageInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__WebpageInfo>;

export interface GoogleAdsSearchads360V0Common__KeywordInfo {
  /** The text of the keyword (at most 80 characters and 10 words). */
  text?: string;
  /** The match type of the keyword. */
  matchType?: "UNSPECIFIED" | "UNKNOWN" | "EXACT" | "PHRASE" | "BROAD" | (string & {});
}

export const GoogleAdsSearchads360V0Common__KeywordInfo: Schema.Schema<GoogleAdsSearchads360V0Common__KeywordInfo> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  matchType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__KeywordInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__KeywordInfo>;

export interface GoogleAdsSearchads360V0Common__AgeRangeInfo {
  /** Type of the age range. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "AGE_RANGE_18_24" | "AGE_RANGE_25_34" | "AGE_RANGE_35_44" | "AGE_RANGE_45_54" | "AGE_RANGE_55_64" | "AGE_RANGE_65_UP" | "AGE_RANGE_UNDETERMINED" | (string & {});
}

export const GoogleAdsSearchads360V0Common__AgeRangeInfo: Schema.Schema<GoogleAdsSearchads360V0Common__AgeRangeInfo> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__AgeRangeInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__AgeRangeInfo>;

export interface GoogleAdsSearchads360V0Common__GenderInfo {
  /** Type of the gender. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "MALE" | "FEMALE" | "UNDETERMINED" | (string & {});
}

export const GoogleAdsSearchads360V0Common__GenderInfo: Schema.Schema<GoogleAdsSearchads360V0Common__GenderInfo> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__GenderInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__GenderInfo>;

export interface GoogleAdsSearchads360V0Resources__AdGroupCriterion {
  /** Output only. The effective CPC (cost-per-click) bid. */
  effectiveCpcBidMicros?: string;
  /** Output only. Information regarding the quality of the criterion. */
  qualityInfo?: GoogleAdsSearchads360V0Resources_AdGroupCriterion_QualityInfo;
  /** Immutable. The resource name of the ad group criterion. Ad group criterion resource names have the form: `customers/{customer_id}/adGroupCriteria/{ad_group_id}~{criterion_id}` */
  resourceName?: string;
  /** Immutable. User List. */
  userList?: GoogleAdsSearchads360V0Common__UserListInfo;
  /** Immutable. Listing group. */
  listingGroup?: GoogleAdsSearchads360V0Common__ListingGroupInfo;
  /** Output only. The datetime when this ad group criterion was last modified. The datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss" format. */
  lastModifiedTime?: string;
  /** Immutable. Location. */
  location?: GoogleAdsSearchads360V0Common__LocationInfo;
  /** Output only. Estimates for criterion bids at various positions. */
  positionEstimates?: GoogleAdsSearchads360V0Resources_AdGroupCriterion_PositionEstimates;
  /** Immutable. Webpage */
  webpage?: GoogleAdsSearchads360V0Common__WebpageInfo;
  /** Immutable. Keyword. */
  keyword?: GoogleAdsSearchads360V0Common__KeywordInfo;
  /** Immutable. Age range. */
  ageRange?: GoogleAdsSearchads360V0Common__AgeRangeInfo;
  /** The list of mappings used to substitute custom parameter tags in a `tracking_url_template`, `final_urls`, or `mobile_final_urls`. */
  urlCustomParameters?: Array<GoogleAdsSearchads360V0Common__CustomParameter>;
  /** Output only. The ID of the criterion. */
  criterionId?: string;
  /** The URL template for constructing a tracking URL. */
  trackingUrlTemplate?: string;
  /** Output only. The Engine Status for ad group criterion. */
  engineStatus?: "UNSPECIFIED" | "UNKNOWN" | "AD_GROUP_CRITERION_ELIGIBLE" | "AD_GROUP_CRITERION_INAPPROPRIATE_FOR_CAMPAIGN" | "AD_GROUP_CRITERION_INVALID_MOBILE_SEARCH" | "AD_GROUP_CRITERION_INVALID_PC_SEARCH" | "AD_GROUP_CRITERION_INVALID_SEARCH" | "AD_GROUP_CRITERION_LOW_SEARCH_VOLUME" | "AD_GROUP_CRITERION_MOBILE_URL_UNDER_REVIEW" | "AD_GROUP_CRITERION_PARTIALLY_INVALID" | "AD_GROUP_CRITERION_TO_BE_ACTIVATED" | "AD_GROUP_CRITERION_UNDER_REVIEW" | "AD_GROUP_CRITERION_NOT_REVIEWED" | "AD_GROUP_CRITERION_ON_HOLD" | "AD_GROUP_CRITERION_PENDING_REVIEW" | "AD_GROUP_CRITERION_PAUSED" | "AD_GROUP_CRITERION_REMOVED" | "AD_GROUP_CRITERION_APPROVED" | "AD_GROUP_CRITERION_DISAPPROVED" | "AD_GROUP_CRITERION_SERVING" | "AD_GROUP_CRITERION_ACCOUNT_PAUSED" | (string & {});
  /** The CPC (cost-per-click) bid. */
  cpcBidMicros?: string;
  /** Immutable. Gender. */
  gender?: GoogleAdsSearchads360V0Common__GenderInfo;
  /** The status of the criterion. This is the status of the ad group criterion entity, set by the client. Note: UI reports may incorporate additional information that affects whether a criterion is eligible to run. In some cases a criterion that's REMOVED in the API can still show as enabled in the UI. For example, campaigns by default show to users of all age ranges unless excluded. The UI will show each age range as "enabled", since they're eligible to see the ads; but AdGroupCriterion.status will show "removed", since no positive criterion was added. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED" | (string & {});
  /** Output only. The type of the criterion. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "KEYWORD" | "PLACEMENT" | "MOBILE_APP_CATEGORY" | "MOBILE_APPLICATION" | "DEVICE" | "LOCATION" | "LISTING_GROUP" | "AD_SCHEDULE" | "AGE_RANGE" | "GENDER" | "INCOME_RANGE" | "PARENTAL_STATUS" | "YOUTUBE_VIDEO" | "YOUTUBE_CHANNEL" | "USER_LIST" | "PROXIMITY" | "TOPIC" | "LISTING_SCOPE" | "LANGUAGE" | "IP_BLOCK" | "CONTENT_LABEL" | "CARRIER" | "USER_INTEREST" | "WEBPAGE" | "OPERATING_SYSTEM_VERSION" | "APP_PAYMENT_MODEL" | "MOBILE_DEVICE" | "CUSTOM_AFFINITY" | "CUSTOM_INTENT" | "LOCATION_GROUP" | "CUSTOM_AUDIENCE" | "COMBINED_AUDIENCE" | "KEYWORD_THEME" | "AUDIENCE" | "LOCAL_SERVICE_ID" | "BRAND" | "BRAND_LIST" | "LIFE_EVENT" | (string & {});
  /** Immutable. The ad group to which the criterion belongs. */
  adGroup?: string;
  /** Output only. The resource names of labels attached to this ad group criterion. */
  labels?: Array<string>;
  /** Immutable. Whether to target (`false`) or exclude (`true`) the criterion. This field is immutable. To switch a criterion from positive to negative, remove then re-add it. */
  negative?: boolean;
  /** Output only. The resource names of effective labels attached to this ad group criterion. An effective label is a label inherited or directly assigned to this ad group criterion. */
  effectiveLabels?: Array<string>;
  /** Output only. The timestamp when this ad group criterion was created. The timestamp is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss" format. */
  creationTime?: string;
  /** Output only. ID of the ad group criterion in the external engine account. This field is for non-Google Ads account only, for example, Yahoo Japan, Microsoft, Baidu etc. For Google Ads entity, use "ad_group_criterion.criterion_id" instead. */
  engineId?: string;
  /** The list of possible final mobile URLs after all cross-domain redirects. */
  finalMobileUrls?: Array<string>;
  /** The list of possible final URLs after all cross-domain redirects for the ad. */
  finalUrls?: Array<string>;
  /** The modifier for the bid when the criterion matches. The modifier must be in the range: 0.1 - 10.0. Most targetable criteria types support modifiers. */
  bidModifier?: number;
  /** URL template for appending params to final URL. */
  finalUrlSuffix?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupCriterion: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupCriterion> = Schema.suspend(() => Schema.Struct({
  effectiveCpcBidMicros: Schema.optional(Schema.String),
  qualityInfo: Schema.optional(GoogleAdsSearchads360V0Resources_AdGroupCriterion_QualityInfo),
  resourceName: Schema.optional(Schema.String),
  userList: Schema.optional(GoogleAdsSearchads360V0Common__UserListInfo),
  listingGroup: Schema.optional(GoogleAdsSearchads360V0Common__ListingGroupInfo),
  lastModifiedTime: Schema.optional(Schema.String),
  location: Schema.optional(GoogleAdsSearchads360V0Common__LocationInfo),
  positionEstimates: Schema.optional(GoogleAdsSearchads360V0Resources_AdGroupCriterion_PositionEstimates),
  webpage: Schema.optional(GoogleAdsSearchads360V0Common__WebpageInfo),
  keyword: Schema.optional(GoogleAdsSearchads360V0Common__KeywordInfo),
  ageRange: Schema.optional(GoogleAdsSearchads360V0Common__AgeRangeInfo),
  urlCustomParameters: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__CustomParameter)),
  criterionId: Schema.optional(Schema.String),
  trackingUrlTemplate: Schema.optional(Schema.String),
  engineStatus: Schema.optional(Schema.String),
  cpcBidMicros: Schema.optional(Schema.String),
  gender: Schema.optional(GoogleAdsSearchads360V0Common__GenderInfo),
  status: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  adGroup: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(Schema.String)),
  negative: Schema.optional(Schema.Boolean),
  effectiveLabels: Schema.optional(Schema.Array(Schema.String)),
  creationTime: Schema.optional(Schema.String),
  engineId: Schema.optional(Schema.String),
  finalMobileUrls: Schema.optional(Schema.Array(Schema.String)),
  finalUrls: Schema.optional(Schema.Array(Schema.String)),
  bidModifier: Schema.optional(Schema.Number),
  finalUrlSuffix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupCriterion" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupCriterion>;

export interface GoogleAdsSearchads360V0Resources__LocationView {
  /** Output only. The resource name of the location view. Location view resource names have the form: `customers/{customer_id}/locationViews/{campaign_id}~{criterion_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__LocationView: Schema.Schema<GoogleAdsSearchads360V0Resources__LocationView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__LocationView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__LocationView>;

export interface GoogleAdsSearchads360V0Errors__ErrorCode {
  /** The reasons for the distinct error */
  distinctError?: "UNSPECIFIED" | "UNKNOWN" | "DUPLICATE_ELEMENT" | "DUPLICATE_TYPE" | (string & {});
  /** The reasons for the size limit error */
  sizeLimitError?: "UNSPECIFIED" | "UNKNOWN" | "REQUEST_SIZE_LIMIT_EXCEEDED" | "RESPONSE_SIZE_LIMIT_EXCEEDED" | (string & {});
  /** The reasons for the conversion custom variable error */
  conversionCustomVariableError?: "UNSPECIFIED" | "UNKNOWN" | "DUPLICATE_NAME" | "DUPLICATE_TAG" | "RESERVED_TAG" | "NOT_FOUND" | "NOT_AVAILABLE" | "INCOMPATIBLE_TYPE" | "INVALID_METRIC" | "EXCEEDS_CARDINALITY_LIMIT" | "INVALID_DIMENSION" | "INCOMPATIBLE_WITH_SELECTED_RESOURCE" | (string & {});
  /** The reasons for the header error. */
  headerError?: "UNSPECIFIED" | "UNKNOWN" | "INVALID_USER_SELECTED_CUSTOMER_ID" | "INVALID_LOGIN_CUSTOMER_ID" | (string & {});
  /** An error with the amount of quota remaining. */
  quotaError?: "UNSPECIFIED" | "UNKNOWN" | "RESOURCE_EXHAUSTED" | "RESOURCE_TEMPORARILY_EXHAUSTED" | (string & {});
  /** An error encountered when trying to authorize a user. */
  authorizationError?: "UNSPECIFIED" | "UNKNOWN" | "USER_PERMISSION_DENIED" | "PROJECT_DISABLED" | "AUTHORIZATION_ERROR" | "ACTION_NOT_PERMITTED" | "INCOMPLETE_SIGNUP" | "CUSTOMER_NOT_ENABLED" | "MISSING_TOS" | "INVALID_LOGIN_CUSTOMER_ID_SERVING_CUSTOMER_ID_COMBINATION" | "SERVICE_ACCESS_DENIED" | "ACCESS_DENIED_FOR_ACCOUNT_TYPE" | "METRIC_ACCESS_DENIED" | (string & {});
  /** The reasons for the date error */
  dateError?: "UNSPECIFIED" | "UNKNOWN" | "INVALID_FIELD_VALUES_IN_DATE" | "INVALID_FIELD_VALUES_IN_DATE_TIME" | "INVALID_STRING_DATE" | "INVALID_STRING_DATE_TIME_MICROS" | "INVALID_STRING_DATE_TIME_SECONDS" | "INVALID_STRING_DATE_TIME_SECONDS_WITH_OFFSET" | "EARLIER_THAN_MINIMUM_DATE" | "LATER_THAN_MAXIMUM_DATE" | "DATE_RANGE_MINIMUM_DATE_LATER_THAN_MAXIMUM_DATE" | "DATE_RANGE_MINIMUM_AND_MAXIMUM_DATES_BOTH_NULL" | (string & {});
  /** The reasons for the custom column error */
  customColumnError?: "UNSPECIFIED" | "UNKNOWN" | "CUSTOM_COLUMN_NOT_FOUND" | "CUSTOM_COLUMN_NOT_AVAILABLE" | (string & {});
  /** Indicates failure to properly authenticate user. */
  authenticationError?: "UNSPECIFIED" | "UNKNOWN" | "AUTHENTICATION_ERROR" | "CLIENT_CUSTOMER_ID_INVALID" | "CUSTOMER_NOT_FOUND" | "GOOGLE_ACCOUNT_DELETED" | "GOOGLE_ACCOUNT_COOKIE_INVALID" | "GOOGLE_ACCOUNT_AUTHENTICATION_FAILED" | "GOOGLE_ACCOUNT_USER_AND_ADS_USER_MISMATCH" | "LOGIN_COOKIE_REQUIRED" | "NOT_ADS_USER" | "OAUTH_TOKEN_INVALID" | "OAUTH_TOKEN_EXPIRED" | "OAUTH_TOKEN_DISABLED" | "OAUTH_TOKEN_REVOKED" | "OAUTH_TOKEN_HEADER_INVALID" | "LOGIN_COOKIE_INVALID" | "USER_ID_INVALID" | "TWO_STEP_VERIFICATION_NOT_ENROLLED" | "ADVANCED_PROTECTION_NOT_ENROLLED" | (string & {});
  /** The reasons for invalid parameter errors. */
  invalidParameterError?: "UNSPECIFIED" | "UNKNOWN" | "INVALID_CURRENCY_CODE" | (string & {});
  /** The reasons for the date range error */
  dateRangeError?: "UNSPECIFIED" | "UNKNOWN" | "INVALID_DATE" | "START_DATE_AFTER_END_DATE" | "CANNOT_SET_DATE_TO_PAST" | "AFTER_MAXIMUM_ALLOWABLE_DATE" | "CANNOT_MODIFY_START_DATE_IF_ALREADY_STARTED" | (string & {});
  /** An error caused by the request */
  requestError?: "UNSPECIFIED" | "UNKNOWN" | "RESOURCE_NAME_MISSING" | "RESOURCE_NAME_MALFORMED" | "BAD_RESOURCE_ID" | "INVALID_PRODUCT_NAME" | "INVALID_CUSTOMER_ID" | "OPERATION_REQUIRED" | "RESOURCE_NOT_FOUND" | "INVALID_PAGE_TOKEN" | "EXPIRED_PAGE_TOKEN" | "INVALID_PAGE_SIZE" | "REQUIRED_FIELD_MISSING" | "IMMUTABLE_FIELD" | "TOO_MANY_MUTATE_OPERATIONS" | "CANNOT_BE_EXECUTED_BY_MANAGER_ACCOUNT" | "CANNOT_MODIFY_FOREIGN_FIELD" | "INVALID_ENUM_VALUE" | "LOGIN_CUSTOMER_ID_PARAMETER_MISSING" | "LOGIN_OR_LINKED_CUSTOMER_ID_PARAMETER_REQUIRED" | "VALIDATE_ONLY_REQUEST_HAS_PAGE_TOKEN" | "CANNOT_RETURN_SUMMARY_ROW_FOR_REQUEST_WITHOUT_METRICS" | "CANNOT_RETURN_SUMMARY_ROW_FOR_VALIDATE_ONLY_REQUESTS" | "INCONSISTENT_RETURN_SUMMARY_ROW_VALUE" | "TOTAL_RESULTS_COUNT_NOT_ORIGINALLY_REQUESTED" | "RPC_DEADLINE_TOO_SHORT" | "PRODUCT_NOT_SUPPORTED" | (string & {});
  /** An error with the query */
  queryError?: "UNSPECIFIED" | "UNKNOWN" | "QUERY_ERROR" | "BAD_ENUM_CONSTANT" | "BAD_ESCAPE_SEQUENCE" | "BAD_FIELD_NAME" | "BAD_LIMIT_VALUE" | "BAD_NUMBER" | "BAD_OPERATOR" | "BAD_PARAMETER_NAME" | "BAD_PARAMETER_VALUE" | "BAD_RESOURCE_TYPE_IN_FROM_CLAUSE" | "BAD_SYMBOL" | "BAD_VALUE" | "DATE_RANGE_TOO_WIDE" | "DATE_RANGE_TOO_NARROW" | "EXPECTED_AND" | "EXPECTED_BY" | "EXPECTED_DIMENSION_FIELD_IN_SELECT_CLAUSE" | "EXPECTED_FILTERS_ON_DATE_RANGE" | "EXPECTED_FROM" | "EXPECTED_LIST" | "EXPECTED_REFERENCED_FIELD_IN_SELECT_CLAUSE" | "EXPECTED_SELECT" | "EXPECTED_SINGLE_VALUE" | "EXPECTED_VALUE_WITH_BETWEEN_OPERATOR" | "INVALID_DATE_FORMAT" | "MISALIGNED_DATE_FOR_FILTER" | "INVALID_STRING_VALUE" | "INVALID_VALUE_WITH_BETWEEN_OPERATOR" | "INVALID_VALUE_WITH_DURING_OPERATOR" | "INVALID_VALUE_WITH_LIKE_OPERATOR" | "OPERATOR_FIELD_MISMATCH" | "PROHIBITED_EMPTY_LIST_IN_CONDITION" | "PROHIBITED_ENUM_CONSTANT" | "PROHIBITED_FIELD_COMBINATION_IN_SELECT_CLAUSE" | "PROHIBITED_FIELD_IN_ORDER_BY_CLAUSE" | "PROHIBITED_FIELD_IN_SELECT_CLAUSE" | "PROHIBITED_FIELD_IN_WHERE_CLAUSE" | "PROHIBITED_RESOURCE_TYPE_IN_FROM_CLAUSE" | "PROHIBITED_RESOURCE_TYPE_IN_SELECT_CLAUSE" | "PROHIBITED_RESOURCE_TYPE_IN_WHERE_CLAUSE" | "PROHIBITED_METRIC_IN_SELECT_OR_WHERE_CLAUSE" | "PROHIBITED_SEGMENT_IN_SELECT_OR_WHERE_CLAUSE" | "PROHIBITED_SEGMENT_WITH_METRIC_IN_SELECT_OR_WHERE_CLAUSE" | "LIMIT_VALUE_TOO_LOW" | "PROHIBITED_NEWLINE_IN_STRING" | "PROHIBITED_VALUE_COMBINATION_IN_LIST" | "PROHIBITED_VALUE_COMBINATION_WITH_BETWEEN_OPERATOR" | "STRING_NOT_TERMINATED" | "TOO_MANY_SEGMENTS" | "UNEXPECTED_END_OF_QUERY" | "UNEXPECTED_FROM_CLAUSE" | "UNRECOGNIZED_FIELD" | "UNEXPECTED_INPUT" | "REQUESTED_METRICS_FOR_MANAGER" | "FILTER_HAS_TOO_MANY_VALUES" | (string & {});
  /** An unexpected server-side error. */
  internalError?: "UNSPECIFIED" | "UNKNOWN" | "INTERNAL_ERROR" | "ERROR_CODE_NOT_PUBLISHED" | "TRANSIENT_ERROR" | "DEADLINE_EXCEEDED" | (string & {});
}

export const GoogleAdsSearchads360V0Errors__ErrorCode: Schema.Schema<GoogleAdsSearchads360V0Errors__ErrorCode> = Schema.suspend(() => Schema.Struct({
  distinctError: Schema.optional(Schema.String),
  sizeLimitError: Schema.optional(Schema.String),
  conversionCustomVariableError: Schema.optional(Schema.String),
  headerError: Schema.optional(Schema.String),
  quotaError: Schema.optional(Schema.String),
  authorizationError: Schema.optional(Schema.String),
  dateError: Schema.optional(Schema.String),
  customColumnError: Schema.optional(Schema.String),
  authenticationError: Schema.optional(Schema.String),
  invalidParameterError: Schema.optional(Schema.String),
  dateRangeError: Schema.optional(Schema.String),
  requestError: Schema.optional(Schema.String),
  queryError: Schema.optional(Schema.String),
  internalError: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Errors__ErrorCode" }) as any as Schema.Schema<GoogleAdsSearchads360V0Errors__ErrorCode>;

export interface GoogleAdsSearchads360V0Errors_ErrorLocation_FieldPathElement {
  /** The name of a field or a oneof */
  fieldName?: string;
  /** If field_name is a repeated field, this is the element that failed */
  index?: number;
}

export const GoogleAdsSearchads360V0Errors_ErrorLocation_FieldPathElement: Schema.Schema<GoogleAdsSearchads360V0Errors_ErrorLocation_FieldPathElement> = Schema.suspend(() => Schema.Struct({
  fieldName: Schema.optional(Schema.String),
  index: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAdsSearchads360V0Errors_ErrorLocation_FieldPathElement" }) as any as Schema.Schema<GoogleAdsSearchads360V0Errors_ErrorLocation_FieldPathElement>;

export interface GoogleAdsSearchads360V0Errors__ErrorLocation {
  /** A field path that indicates which field was invalid in the request. */
  fieldPathElements?: Array<GoogleAdsSearchads360V0Errors_ErrorLocation_FieldPathElement>;
}

export const GoogleAdsSearchads360V0Errors__ErrorLocation: Schema.Schema<GoogleAdsSearchads360V0Errors__ErrorLocation> = Schema.suspend(() => Schema.Struct({
  fieldPathElements: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Errors_ErrorLocation_FieldPathElement)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Errors__ErrorLocation" }) as any as Schema.Schema<GoogleAdsSearchads360V0Errors__ErrorLocation>;

export interface GoogleAdsSearchads360V0Errors__QuotaErrorDetails {
  /** The high level description of the quota bucket. Examples are "Get requests for standard access" or "Requests per account". */
  rateName?: string;
  /** The rate scope of the quota limit. */
  rateScope?: "UNSPECIFIED" | "UNKNOWN" | "ACCOUNT" | "DEVELOPER" | (string & {});
  /** Backoff period that customers should wait before sending next request. */
  retryDelay?: string;
}

export const GoogleAdsSearchads360V0Errors__QuotaErrorDetails: Schema.Schema<GoogleAdsSearchads360V0Errors__QuotaErrorDetails> = Schema.suspend(() => Schema.Struct({
  rateName: Schema.optional(Schema.String),
  rateScope: Schema.optional(Schema.String),
  retryDelay: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Errors__QuotaErrorDetails" }) as any as Schema.Schema<GoogleAdsSearchads360V0Errors__QuotaErrorDetails>;

export interface GoogleAdsSearchads360V0Errors__ErrorDetails {
  /** The error code that should have been returned, but wasn't. This is used when the error code is not published in the client specified version. */
  unpublishedErrorCode?: string;
  /** Details on the quota error, including the scope (account or developer), the rate bucket name and the retry delay. */
  quotaErrorDetails?: GoogleAdsSearchads360V0Errors__QuotaErrorDetails;
}

export const GoogleAdsSearchads360V0Errors__ErrorDetails: Schema.Schema<GoogleAdsSearchads360V0Errors__ErrorDetails> = Schema.suspend(() => Schema.Struct({
  unpublishedErrorCode: Schema.optional(Schema.String),
  quotaErrorDetails: Schema.optional(GoogleAdsSearchads360V0Errors__QuotaErrorDetails),
})).annotate({ identifier: "GoogleAdsSearchads360V0Errors__ErrorDetails" }) as any as Schema.Schema<GoogleAdsSearchads360V0Errors__ErrorDetails>;

export interface GoogleAdsSearchads360V0Errors__SearchAds360Error {
  /** An enum value that indicates which error occurred. */
  errorCode?: GoogleAdsSearchads360V0Errors__ErrorCode;
  /** The value that triggered the error. */
  trigger?: GoogleAdsSearchads360V0Common__Value;
  /** Describes the part of the request proto that caused the error. */
  location?: GoogleAdsSearchads360V0Errors__ErrorLocation;
  /** Additional error details, which are returned by certain error codes. Most error codes do not include details. */
  details?: GoogleAdsSearchads360V0Errors__ErrorDetails;
  /** A human-readable description of the error. */
  message?: string;
}

export const GoogleAdsSearchads360V0Errors__SearchAds360Error: Schema.Schema<GoogleAdsSearchads360V0Errors__SearchAds360Error> = Schema.suspend(() => Schema.Struct({
  errorCode: Schema.optional(GoogleAdsSearchads360V0Errors__ErrorCode),
  trigger: Schema.optional(GoogleAdsSearchads360V0Common__Value),
  location: Schema.optional(GoogleAdsSearchads360V0Errors__ErrorLocation),
  details: Schema.optional(GoogleAdsSearchads360V0Errors__ErrorDetails),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Errors__SearchAds360Error" }) as any as Schema.Schema<GoogleAdsSearchads360V0Errors__SearchAds360Error>;

export interface GoogleAdsSearchads360V0Resources_Campaign_GeoTargetTypeSetting {
  /** The setting used for negative geotargeting in this particular campaign. */
  negativeGeoTargetType?: "UNSPECIFIED" | "UNKNOWN" | "PRESENCE_OR_INTEREST" | "PRESENCE" | (string & {});
  /** The setting used for positive geotargeting in this particular campaign. */
  positiveGeoTargetType?: "UNSPECIFIED" | "UNKNOWN" | "PRESENCE_OR_INTEREST" | "SEARCH_INTEREST" | "PRESENCE" | (string & {});
}

export const GoogleAdsSearchads360V0Resources_Campaign_GeoTargetTypeSetting: Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_GeoTargetTypeSetting> = Schema.suspend(() => Schema.Struct({
  negativeGeoTargetType: Schema.optional(Schema.String),
  positiveGeoTargetType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_Campaign_GeoTargetTypeSetting" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_GeoTargetTypeSetting>;

export interface GoogleAdsSearchads360V0Common__TargetImpressionShare {
  /** The chosen fraction of ads to be shown in the targeted location in micros. For example, 1% equals 10,000. */
  locationFractionMicros?: string;
  /** The targeted location on the search results page. */
  location?: "UNSPECIFIED" | "UNKNOWN" | "ANYWHERE_ON_PAGE" | "TOP_OF_PAGE" | "ABSOLUTE_TOP_OF_PAGE" | (string & {});
  /** The highest CPC bid the automated bidding system is permitted to specify. This is a required field entered by the advertiser that sets the ceiling and specified in local micros. */
  cpcBidCeilingMicros?: string;
}

export const GoogleAdsSearchads360V0Common__TargetImpressionShare: Schema.Schema<GoogleAdsSearchads360V0Common__TargetImpressionShare> = Schema.suspend(() => Schema.Struct({
  locationFractionMicros: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  cpcBidCeilingMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TargetImpressionShare" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TargetImpressionShare>;

export interface GoogleAdsSearchads360V0Common__MaximizeConversions {
  /** Maximum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. Mutable for portfolio bidding strategies only. */
  cpcBidCeilingMicros?: string;
  /** Minimum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. Mutable for portfolio bidding strategies only. */
  cpcBidFloorMicros?: string;
  /** The target cost-per-action (CPA) option. This is the average amount that you would like to spend per conversion action specified in micro units of the bidding strategy's currency. If set, the bid strategy will get as many conversions as possible at or below the target cost-per-action. If the target CPA is not set, the bid strategy will aim to achieve the lowest possible CPA given the budget. */
  targetCpaMicros?: string;
}

export const GoogleAdsSearchads360V0Common__MaximizeConversions: Schema.Schema<GoogleAdsSearchads360V0Common__MaximizeConversions> = Schema.suspend(() => Schema.Struct({
  cpcBidCeilingMicros: Schema.optional(Schema.String),
  cpcBidFloorMicros: Schema.optional(Schema.String),
  targetCpaMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__MaximizeConversions" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__MaximizeConversions>;

export interface GoogleAdsSearchads360V0Common__MaximizeConversionValue {
  /** The target return on ad spend (ROAS) option. If set, the bid strategy will maximize revenue while averaging the target return on ad spend. If the target ROAS is high, the bid strategy may not be able to spend the full budget. If the target ROAS is not set, the bid strategy will aim to achieve the highest possible ROAS for the budget. */
  targetRoas?: number;
  /** Maximum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. Mutable for portfolio bidding strategies only. */
  cpcBidCeilingMicros?: string;
  /** Minimum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. Mutable for portfolio bidding strategies only. */
  cpcBidFloorMicros?: string;
}

export const GoogleAdsSearchads360V0Common__MaximizeConversionValue: Schema.Schema<GoogleAdsSearchads360V0Common__MaximizeConversionValue> = Schema.suspend(() => Schema.Struct({
  targetRoas: Schema.optional(Schema.Number),
  cpcBidCeilingMicros: Schema.optional(Schema.String),
  cpcBidFloorMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__MaximizeConversionValue" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__MaximizeConversionValue>;

export interface GoogleAdsSearchads360V0Common__TargetSpend {
  /** Deprecated: The spend target under which to maximize clicks. A TargetSpend bidder will attempt to spend the smaller of this value or the natural throttling spend amount. If not specified, the budget is used as the spend target. This field is deprecated and should no longer be used. See https://ads-developers.googleblog.com/2020/05/reminder-about-sunset-creation-of.html for details. */
  targetSpendMicros?: string;
  /** Maximum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. */
  cpcBidCeilingMicros?: string;
}

export const GoogleAdsSearchads360V0Common__TargetSpend: Schema.Schema<GoogleAdsSearchads360V0Common__TargetSpend> = Schema.suspend(() => Schema.Struct({
  targetSpendMicros: Schema.optional(Schema.String),
  cpcBidCeilingMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TargetSpend" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TargetSpend>;

export interface GoogleAdsSearchads360V0Common__TargetRoas {
  /** Maximum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. This should only be set for portfolio bid strategies. */
  cpcBidCeilingMicros?: string;
  /** Required. The chosen revenue (based on conversion data) per unit of spend. Value must be between 0.01 and 1000.0, inclusive. */
  targetRoas?: number;
  /** Minimum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. This should only be set for portfolio bid strategies. */
  cpcBidFloorMicros?: string;
}

export const GoogleAdsSearchads360V0Common__TargetRoas: Schema.Schema<GoogleAdsSearchads360V0Common__TargetRoas> = Schema.suspend(() => Schema.Struct({
  cpcBidCeilingMicros: Schema.optional(Schema.String),
  targetRoas: Schema.optional(Schema.Number),
  cpcBidFloorMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TargetRoas" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TargetRoas>;

export interface GoogleAdsSearchads360V0Resources__BiddingStrategy {
  /** A bidding strategy that automatically optimizes towards a chosen percentage of impressions. */
  targetImpressionShare?: GoogleAdsSearchads360V0Common__TargetImpressionShare;
  /** Immutable. The currency used by the bidding strategy (ISO 4217 three-letter code). For bidding strategies in manager customers, this currency can be set on creation and defaults to the manager customer's currency. For serving customers, this field cannot be set; all strategies in a serving customer implicitly use the serving customer's currency. In all cases the effective_currency_code field returns the currency used by the strategy. */
  currencyCode?: string;
  /** An automated bidding strategy to help get the most conversions for your campaigns while spending your budget. */
  maximizeConversions?: GoogleAdsSearchads360V0Common__MaximizeConversions;
  /** Output only. The number of campaigns attached to this bidding strategy. This field is read-only. */
  campaignCount?: string;
  /** The name of the bidding strategy. All bidding strategies within an account must be named distinctly. The length of this string should be between 1 and 255, inclusive, in UTF-8 bytes, (trimmed). */
  name?: string;
  /** An automated bidding strategy to help get the most conversion value for your campaigns while spending your budget. */
  maximizeConversionValue?: GoogleAdsSearchads360V0Common__MaximizeConversionValue;
  /** Output only. The type of the bidding strategy. Create a bidding strategy by setting the bidding scheme. This field is read-only. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "COMMISSION" | "ENHANCED_CPC" | "INVALID" | "MANUAL_CPA" | "MANUAL_CPC" | "MANUAL_CPM" | "MANUAL_CPV" | "MAXIMIZE_CONVERSIONS" | "MAXIMIZE_CONVERSION_VALUE" | "PAGE_ONE_PROMOTED" | "PERCENT_CPC" | "TARGET_CPA" | "TARGET_CPM" | "TARGET_IMPRESSION_SHARE" | "TARGET_OUTRANK_SHARE" | "TARGET_ROAS" | "TARGET_SPEND" | (string & {});
  /** Output only. The number of non-removed campaigns attached to this bidding strategy. This field is read-only. */
  nonRemovedCampaignCount?: string;
  /** A bid strategy that sets your bids to help get as many clicks as possible within your budget. */
  targetSpend?: GoogleAdsSearchads360V0Common__TargetSpend;
  /** A bidding strategy that sets bids based on the target fraction of auctions where the advertiser should outrank a specific competitor. This field is deprecated. Creating a new bidding strategy with this field or attaching bidding strategies with this field to a campaign will fail. Mutates to strategies that already have this scheme populated are allowed. */
  targetOutrankShare?: GoogleAdsSearchads360V0Common__TargetOutrankShare;
  /** Output only. The ID of the bidding strategy. */
  id?: string;
  /** A bidding strategy that sets bids to help get as many conversions as possible at the target cost-per-acquisition (CPA) you set. */
  targetCpa?: GoogleAdsSearchads360V0Common__TargetCpa;
  /** Output only. The status of the bidding strategy. This field is read-only. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | (string & {});
  /** A bidding strategy that helps you maximize revenue while averaging a specific target Return On Ad Spend (ROAS). */
  targetRoas?: GoogleAdsSearchads360V0Common__TargetRoas;
  /** A bidding strategy that raises bids for clicks that seem more likely to lead to a conversion and lowers them for clicks where they seem less likely. */
  enhancedCpc?: GoogleAdsSearchads360V0Common__EnhancedCpc;
  /** Output only. The currency used by the bidding strategy (ISO 4217 three-letter code). For bidding strategies in manager customers, this is the currency set by the advertiser when creating the strategy. For serving customers, this is the customer's currency_code. Bidding strategy metrics are reported in this currency. This field is read-only. */
  effectiveCurrencyCode?: string;
  /** Immutable. The resource name of the bidding strategy. Bidding strategy resource names have the form: `customers/{customer_id}/biddingStrategies/{bidding_strategy_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__BiddingStrategy: Schema.Schema<GoogleAdsSearchads360V0Resources__BiddingStrategy> = Schema.suspend(() => Schema.Struct({
  targetImpressionShare: Schema.optional(GoogleAdsSearchads360V0Common__TargetImpressionShare),
  currencyCode: Schema.optional(Schema.String),
  maximizeConversions: Schema.optional(GoogleAdsSearchads360V0Common__MaximizeConversions),
  campaignCount: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  maximizeConversionValue: Schema.optional(GoogleAdsSearchads360V0Common__MaximizeConversionValue),
  type: Schema.optional(Schema.String),
  nonRemovedCampaignCount: Schema.optional(Schema.String),
  targetSpend: Schema.optional(GoogleAdsSearchads360V0Common__TargetSpend),
  targetOutrankShare: Schema.optional(GoogleAdsSearchads360V0Common__TargetOutrankShare),
  id: Schema.optional(Schema.String),
  targetCpa: Schema.optional(GoogleAdsSearchads360V0Common__TargetCpa),
  status: Schema.optional(Schema.String),
  targetRoas: Schema.optional(GoogleAdsSearchads360V0Common__TargetRoas),
  enhancedCpc: Schema.optional(GoogleAdsSearchads360V0Common__EnhancedCpc),
  effectiveCurrencyCode: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__BiddingStrategy" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__BiddingStrategy>;

export interface GoogleAdsSearchads360V0Common__PercentCpc {
  /** Maximum bid limit that can be set by the bid strategy. This is an optional field entered by the advertiser and specified in local micros. Note: A zero value is interpreted in the same way as having bid_ceiling undefined. */
  cpcBidCeilingMicros?: string;
  /** Adjusts the bid for each auction upward or downward, depending on the likelihood of a conversion. Individual bids may exceed cpc_bid_ceiling_micros, but the average bid amount for a campaign should not. */
  enhancedCpcEnabled?: boolean;
}

export const GoogleAdsSearchads360V0Common__PercentCpc: Schema.Schema<GoogleAdsSearchads360V0Common__PercentCpc> = Schema.suspend(() => Schema.Struct({
  cpcBidCeilingMicros: Schema.optional(Schema.String),
  enhancedCpcEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__PercentCpc" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__PercentCpc>;

export interface GoogleAdsSearchads360V0Common__AssetInteractionTarget {
  /** Only used with CustomerAsset, CampaignAsset and AdGroupAsset metrics. Indicates whether the interaction metrics occurred on the asset itself or a different asset or ad unit. */
  interactionOnThisAsset?: boolean;
  /** The asset resource name. */
  asset?: string;
}

export const GoogleAdsSearchads360V0Common__AssetInteractionTarget: Schema.Schema<GoogleAdsSearchads360V0Common__AssetInteractionTarget> = Schema.suspend(() => Schema.Struct({
  interactionOnThisAsset: Schema.optional(Schema.Boolean),
  asset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__AssetInteractionTarget" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__AssetInteractionTarget>;

export interface GoogleAdsSearchads360V0Common__Keyword {
  /** Keyword info. */
  info?: GoogleAdsSearchads360V0Common__KeywordInfo;
  /** The AdGroupCriterion resource name. */
  adGroupCriterion?: string;
}

export const GoogleAdsSearchads360V0Common__Keyword: Schema.Schema<GoogleAdsSearchads360V0Common__Keyword> = Schema.suspend(() => Schema.Struct({
  info: Schema.optional(GoogleAdsSearchads360V0Common__KeywordInfo),
  adGroupCriterion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__Keyword" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__Keyword>;

export interface GoogleAdsSearchads360V0Common__Segments {
  /** Resource name of the geo target constant for the country of sale of the product. */
  productCountry?: string;
  /** Bidding category (level 5) of the product. */
  productBiddingCategoryLevel5?: string;
  /** Bidding category (level 3) of the product sold. */
  productSoldBiddingCategoryLevel3?: string;
  /** Type (level 4) of the product. */
  productTypeL4?: string;
  /** Type (level 3) of the product sold. */
  productSoldTypeL3?: string;
  /** Resource name of the geo target constant that represents a postal code. */
  geoTargetPostalCode?: string;
  /** Bidding category (level 4) of the product. */
  productBiddingCategoryLevel4?: string;
  /** Bidding category (level 2) of the product. */
  productBiddingCategoryLevel2?: string;
  /** Channel exclusivity of the product. */
  productChannelExclusivity?: "UNSPECIFIED" | "UNKNOWN" | "SINGLE_CHANNEL" | "MULTI_CHANNEL" | (string & {});
  /** Custom attribute 4 of the product sold. */
  productSoldCustomAttribute4?: string;
  /** Quarter as represented by the date of the first day of a quarter. Uses the calendar year for quarters, for example, the second quarter of 2018 starts on 2018-04-01. Formatted as yyyy-MM-dd. */
  quarter?: string;
  /** Bidding category (level 2) of the product sold. */
  productSoldBiddingCategoryLevel2?: string;
  /** Conversion action name. */
  conversionActionName?: string;
  /** Device to which metrics apply. */
  device?: "UNSPECIFIED" | "UNKNOWN" | "MOBILE" | "TABLET" | "DESKTOP" | "CONNECTED_TV" | "OTHER" | (string & {});
  /** Year, formatted as yyyy. */
  year?: number;
  /** Resource name of the geo target constant that represents a country. */
  geoTargetCountry?: string;
  /** Bidding category (level 1) of the product. */
  productBiddingCategoryLevel1?: string;
  /** Title of the product sold. */
  productSoldTitle?: string;
  /** Month as represented by the date of the first day of a month. Formatted as yyyy-MM-dd. */
  month?: string;
  /** Store ID of the product. */
  productStoreId?: string;
  /** Condition of the product sold. */
  productSoldCondition?: "UNSPECIFIED" | "UNKNOWN" | "OLD" | "NEW" | "REFURBISHED" | "USED" | (string & {});
  /** Only used with CustomerAsset, CampaignAsset and AdGroupAsset metrics. Indicates whether the interaction metrics occurred on the asset itself or a different asset or ad unit. Interactions (for example, clicks) are counted across all the parts of the served ad (for example, Ad itself and other components like Sitelinks) when they are served together. When interaction_on_this_asset is true, it means the interactions are on this specific asset and when interaction_on_this_asset is false, it means the interactions is not on this specific asset but on other parts of the served ad this asset is served with. */
  assetInteractionTarget?: GoogleAdsSearchads360V0Common__AssetInteractionTarget;
  /** Title of the product. */
  productTitle?: string;
  /** Ad network type. */
  adNetworkType?: "UNSPECIFIED" | "UNKNOWN" | "SEARCH" | "SEARCH_PARTNERS" | "CONTENT" | "YOUTUBE_SEARCH" | "YOUTUBE_WATCH" | "MIXED" | (string & {});
  /** Bidding category (level 3) of the product. */
  productBiddingCategoryLevel3?: string;
  /** Custom attribute 1 of the product sold. */
  productSoldCustomAttribute1?: string;
  /** Type (level 2) of the product sold. */
  productSoldTypeL2?: string;
  /** Type (level 5) of the product. */
  productTypeL5?: string;
  /** Resource name of the geo target constant that represents a city. */
  geoTargetCity?: string;
  /** Bidding category (level 1) of the product sold. */
  productSoldBiddingCategoryLevel1?: string;
  /** Type (level 5) of the product sold. */
  productSoldTypeL5?: string;
  /** Custom attribute 0 of the product. */
  productCustomAttribute0?: string;
  /** Custom attribute 2 of the product sold. */
  productSoldCustomAttribute2?: string;
  /** Custom attribute 3 of the product. */
  productCustomAttribute3?: string;
  /** Type (level 3) of the product. */
  productTypeL3?: string;
  /** Bidding category (level 5) of the product sold. */
  productSoldBiddingCategoryLevel5?: string;
  /** Custom attribute 3 of the product sold. */
  productSoldCustomAttribute3?: string;
  /** Bidding category (level 4) of the product sold. */
  productSoldBiddingCategoryLevel4?: string;
  /** Keyword criterion. */
  keyword?: GoogleAdsSearchads360V0Common__Keyword;
  /** Type (level 1) of the product. */
  productTypeL1?: string;
  /** Brand of the product. */
  productBrand?: string;
  /** Condition of the product. */
  productCondition?: "UNSPECIFIED" | "UNKNOWN" | "OLD" | "NEW" | "REFURBISHED" | "USED" | (string & {});
  /** Custom attribute 1 of the product. */
  productCustomAttribute1?: string;
  /** Day of the week, for example, MONDAY. */
  dayOfWeek?: "UNSPECIFIED" | "UNKNOWN" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Resource name of the conversion action. */
  conversionAction?: string;
  /** Channel of the product. */
  productChannel?: "UNSPECIFIED" | "UNKNOWN" | "ONLINE" | "LOCAL" | (string & {});
  /** Resource name of the language constant for the language of the product. */
  productLanguage?: string;
  /** Resource name of the geo target constant that represents a metro. */
  geoTargetMetro?: string;
  /** Custom attribute 4 of the product. */
  productCustomAttribute4?: string;
  /** Brand of the product sold. */
  productSoldBrand?: string;
  /** The conversion custom dimensions. */
  conversionCustomDimensions?: Array<GoogleAdsSearchads360V0Common__Value>;
  /** Resource name of the geo target constant that represents a region. */
  geoTargetRegion?: string;
  /** Conversion action category. */
  conversionActionCategory?: "UNSPECIFIED" | "UNKNOWN" | "DEFAULT" | "PAGE_VIEW" | "PURCHASE" | "SIGNUP" | "LEAD" | "DOWNLOAD" | "ADD_TO_CART" | "BEGIN_CHECKOUT" | "SUBSCRIBE_PAID" | "PHONE_CALL_LEAD" | "IMPORTED_LEAD" | "SUBMIT_LEAD_FORM" | "BOOK_APPOINTMENT" | "REQUEST_QUOTE" | "GET_DIRECTIONS" | "OUTBOUND_CLICK" | "CONTACT" | "ENGAGEMENT" | "STORE_VISIT" | "STORE_SALE" | "QUALIFIED_LEAD" | "CONVERTED_LEAD" | (string & {});
  /** Custom attribute 0 of the product sold. */
  productSoldCustomAttribute0?: string;
  /** Type (level 2) of the product. */
  productTypeL2?: string;
  /** Hour of day as a number between 0 and 23, inclusive. */
  hour?: number;
  /** Week as defined as Monday through Sunday, and represented by the date of Monday. Formatted as yyyy-MM-dd. */
  week?: string;
  /** Item ID of the product sold. */
  productSoldItemId?: string;
  /** Type (level 1) of the product sold. */
  productSoldTypeL1?: string;
  /** Item ID of the product. */
  productItemId?: string;
  /** The raw event conversion dimensions. */
  rawEventConversionDimensions?: Array<GoogleAdsSearchads360V0Common__Value>;
  /** Date to which metrics apply. yyyy-MM-dd format, for example, 2018-04-17. */
  date?: string;
  /** Type (level 4) of the product sold. */
  productSoldTypeL4?: string;
  /** Custom attribute 2 of the product. */
  productCustomAttribute2?: string;
}

export const GoogleAdsSearchads360V0Common__Segments: Schema.Schema<GoogleAdsSearchads360V0Common__Segments> = Schema.suspend(() => Schema.Struct({
  productCountry: Schema.optional(Schema.String),
  productBiddingCategoryLevel5: Schema.optional(Schema.String),
  productSoldBiddingCategoryLevel3: Schema.optional(Schema.String),
  productTypeL4: Schema.optional(Schema.String),
  productSoldTypeL3: Schema.optional(Schema.String),
  geoTargetPostalCode: Schema.optional(Schema.String),
  productBiddingCategoryLevel4: Schema.optional(Schema.String),
  productBiddingCategoryLevel2: Schema.optional(Schema.String),
  productChannelExclusivity: Schema.optional(Schema.String),
  productSoldCustomAttribute4: Schema.optional(Schema.String),
  quarter: Schema.optional(Schema.String),
  productSoldBiddingCategoryLevel2: Schema.optional(Schema.String),
  conversionActionName: Schema.optional(Schema.String),
  device: Schema.optional(Schema.String),
  year: Schema.optional(Schema.Number),
  geoTargetCountry: Schema.optional(Schema.String),
  productBiddingCategoryLevel1: Schema.optional(Schema.String),
  productSoldTitle: Schema.optional(Schema.String),
  month: Schema.optional(Schema.String),
  productStoreId: Schema.optional(Schema.String),
  productSoldCondition: Schema.optional(Schema.String),
  assetInteractionTarget: Schema.optional(GoogleAdsSearchads360V0Common__AssetInteractionTarget),
  productTitle: Schema.optional(Schema.String),
  adNetworkType: Schema.optional(Schema.String),
  productBiddingCategoryLevel3: Schema.optional(Schema.String),
  productSoldCustomAttribute1: Schema.optional(Schema.String),
  productSoldTypeL2: Schema.optional(Schema.String),
  productTypeL5: Schema.optional(Schema.String),
  geoTargetCity: Schema.optional(Schema.String),
  productSoldBiddingCategoryLevel1: Schema.optional(Schema.String),
  productSoldTypeL5: Schema.optional(Schema.String),
  productCustomAttribute0: Schema.optional(Schema.String),
  productSoldCustomAttribute2: Schema.optional(Schema.String),
  productCustomAttribute3: Schema.optional(Schema.String),
  productTypeL3: Schema.optional(Schema.String),
  productSoldBiddingCategoryLevel5: Schema.optional(Schema.String),
  productSoldCustomAttribute3: Schema.optional(Schema.String),
  productSoldBiddingCategoryLevel4: Schema.optional(Schema.String),
  keyword: Schema.optional(GoogleAdsSearchads360V0Common__Keyword),
  productTypeL1: Schema.optional(Schema.String),
  productBrand: Schema.optional(Schema.String),
  productCondition: Schema.optional(Schema.String),
  productCustomAttribute1: Schema.optional(Schema.String),
  dayOfWeek: Schema.optional(Schema.String),
  conversionAction: Schema.optional(Schema.String),
  productChannel: Schema.optional(Schema.String),
  productLanguage: Schema.optional(Schema.String),
  geoTargetMetro: Schema.optional(Schema.String),
  productCustomAttribute4: Schema.optional(Schema.String),
  productSoldBrand: Schema.optional(Schema.String),
  conversionCustomDimensions: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__Value)),
  geoTargetRegion: Schema.optional(Schema.String),
  conversionActionCategory: Schema.optional(Schema.String),
  productSoldCustomAttribute0: Schema.optional(Schema.String),
  productTypeL2: Schema.optional(Schema.String),
  hour: Schema.optional(Schema.Number),
  week: Schema.optional(Schema.String),
  productSoldItemId: Schema.optional(Schema.String),
  productSoldTypeL1: Schema.optional(Schema.String),
  productItemId: Schema.optional(Schema.String),
  rawEventConversionDimensions: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__Value)),
  date: Schema.optional(Schema.String),
  productSoldTypeL4: Schema.optional(Schema.String),
  productCustomAttribute2: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__Segments" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__Segments>;

export interface GoogleAdsSearchads360V0Resources__AdGroupAsset {
  /** Immutable. The resource name of the ad group asset. AdGroupAsset resource names have the form: `customers/{customer_id}/adGroupAssets/{ad_group_id}~{asset_id}~{field_type}` */
  resourceName?: string;
  /** Status of the ad group asset. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | "PAUSED" | (string & {});
  /** Required. Immutable. The asset which is linked to the ad group. */
  asset?: string;
  /** Required. Immutable. The ad group to which the asset is linked. */
  adGroup?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupAsset: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAsset> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  asset: Schema.optional(Schema.String),
  adGroup: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAsset>;

export interface GoogleAdsSearchads360V0Common__SearchAds360ProductAdInfo {
}

export const GoogleAdsSearchads360V0Common__SearchAds360ProductAdInfo: Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360ProductAdInfo> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__SearchAds360ProductAdInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360ProductAdInfo>;

export interface GoogleAdsSearchads360V0Services__CustomColumnHeader {
  /** The user defined name of the custom column. */
  name?: string;
  /** The custom column ID. */
  id?: string;
  /** True when the custom column references metrics. */
  referencesMetrics?: boolean;
}

export const GoogleAdsSearchads360V0Services__CustomColumnHeader: Schema.Schema<GoogleAdsSearchads360V0Services__CustomColumnHeader> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  referencesMetrics: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__CustomColumnHeader" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__CustomColumnHeader>;

export interface GoogleAdsSearchads360V0Resources_ConversionCustomVariable_FloodlightConversionCustomVariableInfo {
  /** Output only. Floodlight variable type defined in Search Ads 360. */
  floodlightVariableType?: "UNSPECIFIED" | "UNKNOWN" | "DIMENSION" | "METRIC" | "UNSET" | (string & {});
  /** Output only. Floodlight variable data type defined in Search Ads 360. */
  floodlightVariableDataType?: "UNSPECIFIED" | "UNKNOWN" | "NUMBER" | "STRING" | (string & {});
}

export const GoogleAdsSearchads360V0Resources_ConversionCustomVariable_FloodlightConversionCustomVariableInfo: Schema.Schema<GoogleAdsSearchads360V0Resources_ConversionCustomVariable_FloodlightConversionCustomVariableInfo> = Schema.suspend(() => Schema.Struct({
  floodlightVariableType: Schema.optional(Schema.String),
  floodlightVariableDataType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ConversionCustomVariable_FloodlightConversionCustomVariableInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ConversionCustomVariable_FloodlightConversionCustomVariableInfo>;

export interface GoogleAdsSearchads360V0Resources__ConversionCustomVariable {
  /** Immutable. The resource name of the conversion custom variable. Conversion custom variable resource names have the form: `customers/{customer_id}/conversionCustomVariables/{conversion_custom_variable_id}` */
  resourceName?: string;
  /** Output only. Fields for Search Ads 360 floodlight conversion custom variables. */
  floodlightConversionCustomVariableInfo?: GoogleAdsSearchads360V0Resources_ConversionCustomVariable_FloodlightConversionCustomVariableInfo;
  /** The status of the conversion custom variable for conversion event accrual. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ACTIVATION_NEEDED" | "ENABLED" | "PAUSED" | (string & {});
  /** Output only. The IDs of custom columns that use this conversion custom variable. */
  customColumnIds?: Array<string>;
  /** Output only. The ID of the conversion custom variable. */
  id?: string;
  /** Output only. Family of the conversion custom variable. */
  family?: "UNSPECIFIED" | "UNKNOWN" | "STANDARD" | "FLOODLIGHT" | (string & {});
  /** Output only. The resource name of the customer that owns the conversion custom variable. */
  ownerCustomer?: string;
  /** Required. The name of the conversion custom variable. Name should be unique. The maximum length of name is 100 characters. There should not be any extra spaces before and after. */
  name?: string;
  /** Required. Immutable. The tag of the conversion custom variable. Tag should be unique and consist of a "u" character directly followed with a number less than ormequal to 100. For example: "u4". */
  tag?: string;
  /** Output only. Cardinality of the conversion custom variable. */
  cardinality?: "UNSPECIFIED" | "UNKNOWN" | "BELOW_ALL_LIMITS" | "EXCEEDS_SEGMENTATION_LIMIT_BUT_NOT_STATS_LIMIT" | "APPROACHES_STATS_LIMIT" | "EXCEEDS_STATS_LIMIT" | (string & {});
}

export const GoogleAdsSearchads360V0Resources__ConversionCustomVariable: Schema.Schema<GoogleAdsSearchads360V0Resources__ConversionCustomVariable> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  floodlightConversionCustomVariableInfo: Schema.optional(GoogleAdsSearchads360V0Resources_ConversionCustomVariable_FloodlightConversionCustomVariableInfo),
  status: Schema.optional(Schema.String),
  customColumnIds: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  family: Schema.optional(Schema.String),
  ownerCustomer: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  cardinality: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__ConversionCustomVariable" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__ConversionCustomVariable>;

export interface GoogleAdsSearchads360V0Common__FrequencyCapEntry {
}

export const GoogleAdsSearchads360V0Common__FrequencyCapEntry: Schema.Schema<GoogleAdsSearchads360V0Common__FrequencyCapEntry> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__FrequencyCapEntry" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__FrequencyCapEntry>;

export interface GoogleAdsSearchads360V0Resources__AdGroupAdEffectiveLabel {
  /** Immutable. The resource name of the ad group ad effective label. Ad group ad effective label resource names have the form: `customers/{owner_customer_id}/adGroupAdEffectiveLabels/{ad_group_id}~{ad_id}~{label_id}` */
  resourceName?: string;
  /** Immutable. The ad group ad to which the effective label is attached. */
  adGroupAd?: string;
  /** Output only. The ID of the Customer which owns the effective label. */
  ownerCustomerId?: string;
  /** Immutable. The effective label assigned to the ad group ad. */
  label?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupAdEffectiveLabel: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAdEffectiveLabel> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  adGroupAd: Schema.optional(Schema.String),
  ownerCustomerId: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupAdEffectiveLabel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAdEffectiveLabel>;

export interface GoogleAdsSearchads360V0Resources__CampaignEffectiveLabel {
  /** Immutable. The campaign to which the effective label is attached. */
  campaign?: string;
  /** Output only. The ID of the Customer which owns the effective label. */
  ownerCustomerId?: string;
  /** Immutable. The effective label assigned to the campaign. */
  label?: string;
  /** Immutable. Name of the resource. CampaignEffectivelabel resource names have the form: `customers/{owner_customer_id}/campaignEffectiveLabels/{campaign_id}~{label_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__CampaignEffectiveLabel: Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignEffectiveLabel> = Schema.suspend(() => Schema.Struct({
  campaign: Schema.optional(Schema.String),
  ownerCustomerId: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CampaignEffectiveLabel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignEffectiveLabel>;

export interface GoogleAdsSearchads360V0Resources__UserList {
  /** Output only. Type of this list. This field is read-only. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "REMARKETING" | "LOGICAL" | "EXTERNAL_REMARKETING" | "RULE_BASED" | "SIMILAR" | "CRM_BASED" | (string & {});
  /** Immutable. The resource name of the user list. User list resource names have the form: `customers/{customer_id}/userLists/{user_list_id}` */
  resourceName?: string;
  /** Output only. Id of the user list. */
  id?: string;
  /** Name of this user list. Depending on its access_reason, the user list name may not be unique (for example, if access_reason=SHARED) */
  name?: string;
}

export const GoogleAdsSearchads360V0Resources__UserList: Schema.Schema<GoogleAdsSearchads360V0Resources__UserList> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__UserList" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__UserList>;

export interface GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting {
  /** Immutable. Whether to target Vehicle Listing inventory. */
  useVehicleInventory?: boolean;
  /** Immutable. ID of the Merchant Center account. This field is required for create operations. This field is immutable for Shopping campaigns. */
  merchantId?: string;
  /** Feed label of products to include in the campaign. Valid feed labels may contain a maximum of 20 characters including uppercase letters, numbers, hyphens, and underscores. If you previously used the deprecated `sales_country` in the two-letter country code (`XX`) format, the `feed_label` field should be used instead. For more information see the [feed label](//support.google.com/merchants/answer/12453549) support article. */
  feedLabel?: string;
  /** Priority of the campaign. Campaigns with numerically higher priorities take precedence over those with lower priorities. This field is required for Shopping campaigns, with values between 0 and 2, inclusive. This field is optional for Smart Shopping campaigns, but must be equal to 3 if set. */
  campaignPriority?: number;
  /** Sales country of products to include in the campaign. */
  salesCountry?: string;
  /** Whether to include local products. */
  enableLocal?: boolean;
}

export const GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting: Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting> = Schema.suspend(() => Schema.Struct({
  useVehicleInventory: Schema.optional(Schema.Boolean),
  merchantId: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  campaignPriority: Schema.optional(Schema.Number),
  salesCountry: Schema.optional(Schema.String),
  enableLocal: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting>;

export interface GoogleAdsSearchads360V0Resources__CustomColumn {
  /** Output only. True when the custom column is referring to one or more metrics. */
  referencesMetrics?: boolean;
  /** Output only. The list of the referenced system columns of this custom column. For example, A custom column "sum of impressions and clicks" has referenced system columns of {"metrics.clicks", "metrics.impressions"}. */
  referencedSystemColumns?: Array<string>;
  /** Output only. The type of the result value of the custom column. */
  valueType?: "UNSPECIFIED" | "UNKNOWN" | "STRING" | "INT64" | "DOUBLE" | "BOOLEAN" | "DATE" | (string & {});
  /** Output only. User-defined name of the custom column. */
  name?: string;
  /** Output only. User-defined description of the custom column. */
  description?: string;
  /** Output only. True when the custom column is available to be used in the query of SearchAds360Service.Search and SearchAds360Service.SearchStream. */
  queryable?: boolean;
  /** Output only. True when the custom column is referring to one or more attributes. */
  referencesAttributes?: boolean;
  /** Output only. ID of the custom column. */
  id?: string;
  /** Immutable. The resource name of the custom column. Custom column resource names have the form: `customers/{customer_id}/customColumns/{custom_column_id}` */
  resourceName?: string;
  /** Output only. How the result value of the custom column should be interpreted. */
  renderType?: "UNSPECIFIED" | "UNKNOWN" | "NUMBER" | "PERCENT" | "MONEY" | "STRING" | "BOOLEAN" | "DATE" | (string & {});
}

export const GoogleAdsSearchads360V0Resources__CustomColumn: Schema.Schema<GoogleAdsSearchads360V0Resources__CustomColumn> = Schema.suspend(() => Schema.Struct({
  referencesMetrics: Schema.optional(Schema.Boolean),
  referencedSystemColumns: Schema.optional(Schema.Array(Schema.String)),
  valueType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  queryable: Schema.optional(Schema.Boolean),
  referencesAttributes: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  renderType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CustomColumn" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CustomColumn>;

export interface GoogleAdsSearchads360V0Services__ListCustomColumnsResponse {
  /** The CustomColumns owned by the provided customer. */
  customColumns?: Array<GoogleAdsSearchads360V0Resources__CustomColumn>;
}

export const GoogleAdsSearchads360V0Services__ListCustomColumnsResponse: Schema.Schema<GoogleAdsSearchads360V0Services__ListCustomColumnsResponse> = Schema.suspend(() => Schema.Struct({
  customColumns: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Resources__CustomColumn)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__ListCustomColumnsResponse" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__ListCustomColumnsResponse>;

export interface GoogleAdsSearchads360V0Common__DeviceInfo {
  /** Type of the device. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "MOBILE" | "TABLET" | "DESKTOP" | "CONNECTED_TV" | "OTHER" | (string & {});
}

export const GoogleAdsSearchads360V0Common__DeviceInfo: Schema.Schema<GoogleAdsSearchads360V0Common__DeviceInfo> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__DeviceInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__DeviceInfo>;

export interface GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsRequest {
  /** Number of elements to retrieve in a single page. When too large a page is requested, the server may decide to further limit the number of returned resources. */
  pageSize?: number;
  /** Token of the page to retrieve. If not specified, the first page of results will be returned. Use the value obtained from `next_page_token` in the previous response in order to request the next page of results. */
  pageToken?: string;
  /** Required. The query string. */
  query?: string;
}

export const GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsRequest: Schema.Schema<GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsRequest> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsRequest" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsRequest>;

export interface GoogleAdsSearchads360V0Resources__ConversionTrackingSetting {
  /** Output only. The conversion tracking id of the customer's manager. This is set when the customer is opted into conversion tracking, and it overrides conversion_tracking_id. This field can only be managed through the Google Ads UI. This field is read-only. */
  googleAdsCrossAccountConversionTrackingId?: string;
  /** Output only. The resource name of the customer where conversions are created and managed. This field is read-only. */
  googleAdsConversionCustomer?: string;
  /** Output only. Conversion tracking status. It indicates whether the customer is using conversion tracking, and who is the conversion tracking owner of this customer. If this customer is using cross-account conversion tracking, the value returned will differ based on the `login-customer-id` of the request. */
  conversionTrackingStatus?: "UNSPECIFIED" | "UNKNOWN" | "NOT_CONVERSION_TRACKED" | "CONVERSION_TRACKING_MANAGED_BY_SELF" | "CONVERSION_TRACKING_MANAGED_BY_THIS_MANAGER" | "CONVERSION_TRACKING_MANAGED_BY_ANOTHER_MANAGER" | (string & {});
  /** Output only. Whether the customer is opted-in for enhanced conversions for leads. If using cross-account conversion tracking, this value is inherited from the manager. This field is read-only. */
  enhancedConversionsForLeadsEnabled?: boolean;
  /** Output only. Whether the customer has accepted customer data terms. If using cross-account conversion tracking, this value is inherited from the manager. This field is read-only. For more information, see https://support.google.com/adspolicy/answer/7475709. */
  acceptedCustomerDataTerms?: boolean;
  /** Output only. The conversion tracking id used for this account. This id doesn't indicate whether the customer uses conversion tracking (conversion_tracking_status does). This field is read-only. */
  conversionTrackingId?: string;
  /** Output only. The conversion tracking id of the customer's manager. This is set when the customer is opted into cross-account conversion tracking, and it overrides conversion_tracking_id. */
  crossAccountConversionTrackingId?: string;
}

export const GoogleAdsSearchads360V0Resources__ConversionTrackingSetting: Schema.Schema<GoogleAdsSearchads360V0Resources__ConversionTrackingSetting> = Schema.suspend(() => Schema.Struct({
  googleAdsCrossAccountConversionTrackingId: Schema.optional(Schema.String),
  googleAdsConversionCustomer: Schema.optional(Schema.String),
  conversionTrackingStatus: Schema.optional(Schema.String),
  enhancedConversionsForLeadsEnabled: Schema.optional(Schema.Boolean),
  acceptedCustomerDataTerms: Schema.optional(Schema.Boolean),
  conversionTrackingId: Schema.optional(Schema.String),
  crossAccountConversionTrackingId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__ConversionTrackingSetting" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__ConversionTrackingSetting>;

export interface GoogleAdsSearchads360V0Common__LocationGroupInfo {
  /** Distance in units specifying the radius around targeted locations. This is required and must be set in CREATE operations. */
  radius?: string;
  /** Geo target constant(s) restricting the scope of the geographic area within the feed. Currently only one geo target constant is allowed. */
  geoTargetConstants?: Array<string>;
  /** Unit of the radius. Miles and meters are supported for geo target constants. Milli miles and meters are supported for feed item sets. This is required and must be set in CREATE operations. */
  radiusUnits?: "UNSPECIFIED" | "UNKNOWN" | "METERS" | "MILES" | "MILLI_MILES" | (string & {});
  /** FeedItemSets whose FeedItems are targeted. If multiple IDs are specified, then all items that appear in at least one set are targeted. This field cannot be used with geo_target_constants. This is optional and can only be set in CREATE operations. */
  feedItemSets?: Array<string>;
}

export const GoogleAdsSearchads360V0Common__LocationGroupInfo: Schema.Schema<GoogleAdsSearchads360V0Common__LocationGroupInfo> = Schema.suspend(() => Schema.Struct({
  radius: Schema.optional(Schema.String),
  geoTargetConstants: Schema.optional(Schema.Array(Schema.String)),
  radiusUnits: Schema.optional(Schema.String),
  feedItemSets: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__LocationGroupInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__LocationGroupInfo>;

export interface GoogleAdsSearchads360V0Common__LanguageInfo {
  /** The language constant resource name. */
  languageConstant?: string;
}

export const GoogleAdsSearchads360V0Common__LanguageInfo: Schema.Schema<GoogleAdsSearchads360V0Common__LanguageInfo> = Schema.suspend(() => Schema.Struct({
  languageConstant: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__LanguageInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__LanguageInfo>;

export interface GoogleAdsSearchads360V0Resources__CampaignCriterion {
  /** The modifier for the bids when the criterion matches. The modifier must be in the range: 0.1 - 10.0. Most targetable criteria types support modifiers. Use 0 to opt out of a Device type. */
  bidModifier?: number;
  /** Immutable. Webpage. */
  webpage?: GoogleAdsSearchads360V0Common__WebpageInfo;
  /** Immutable. Device. */
  device?: GoogleAdsSearchads360V0Common__DeviceInfo;
  /** Immutable. Gender. */
  gender?: GoogleAdsSearchads360V0Common__GenderInfo;
  /** Output only. The display name of the criterion. This field is ignored for mutates. */
  displayName?: string;
  /** Immutable. Location. */
  location?: GoogleAdsSearchads360V0Common__LocationInfo;
  /** Immutable. Keyword. */
  keyword?: GoogleAdsSearchads360V0Common__KeywordInfo;
  /** Immutable. Location Group */
  locationGroup?: GoogleAdsSearchads360V0Common__LocationGroupInfo;
  /** Immutable. Language. */
  language?: GoogleAdsSearchads360V0Common__LanguageInfo;
  /** The status of the criterion. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED" | (string & {});
  /** Output only. The ID of the criterion. This field is ignored during mutate. */
  criterionId?: string;
  /** Output only. The datetime when this campaign criterion was last modified. The datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss" format. */
  lastModifiedTime?: string;
  /** Immutable. The resource name of the campaign criterion. Campaign criterion resource names have the form: `customers/{customer_id}/campaignCriteria/{campaign_id}~{criterion_id}` */
  resourceName?: string;
  /** Immutable. Age range. */
  ageRange?: GoogleAdsSearchads360V0Common__AgeRangeInfo;
  /** Immutable. Whether to target (`false`) or exclude (`true`) the criterion. */
  negative?: boolean;
  /** Output only. The type of the criterion. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "KEYWORD" | "PLACEMENT" | "MOBILE_APP_CATEGORY" | "MOBILE_APPLICATION" | "DEVICE" | "LOCATION" | "LISTING_GROUP" | "AD_SCHEDULE" | "AGE_RANGE" | "GENDER" | "INCOME_RANGE" | "PARENTAL_STATUS" | "YOUTUBE_VIDEO" | "YOUTUBE_CHANNEL" | "USER_LIST" | "PROXIMITY" | "TOPIC" | "LISTING_SCOPE" | "LANGUAGE" | "IP_BLOCK" | "CONTENT_LABEL" | "CARRIER" | "USER_INTEREST" | "WEBPAGE" | "OPERATING_SYSTEM_VERSION" | "APP_PAYMENT_MODEL" | "MOBILE_DEVICE" | "CUSTOM_AFFINITY" | "CUSTOM_INTENT" | "LOCATION_GROUP" | "CUSTOM_AUDIENCE" | "COMBINED_AUDIENCE" | "KEYWORD_THEME" | "AUDIENCE" | "LOCAL_SERVICE_ID" | "BRAND" | "BRAND_LIST" | "LIFE_EVENT" | (string & {});
  /** Immutable. User List. */
  userList?: GoogleAdsSearchads360V0Common__UserListInfo;
}

export const GoogleAdsSearchads360V0Resources__CampaignCriterion: Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignCriterion> = Schema.suspend(() => Schema.Struct({
  bidModifier: Schema.optional(Schema.Number),
  webpage: Schema.optional(GoogleAdsSearchads360V0Common__WebpageInfo),
  device: Schema.optional(GoogleAdsSearchads360V0Common__DeviceInfo),
  gender: Schema.optional(GoogleAdsSearchads360V0Common__GenderInfo),
  displayName: Schema.optional(Schema.String),
  location: Schema.optional(GoogleAdsSearchads360V0Common__LocationInfo),
  keyword: Schema.optional(GoogleAdsSearchads360V0Common__KeywordInfo),
  locationGroup: Schema.optional(GoogleAdsSearchads360V0Common__LocationGroupInfo),
  language: Schema.optional(GoogleAdsSearchads360V0Common__LanguageInfo),
  status: Schema.optional(Schema.String),
  criterionId: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  ageRange: Schema.optional(GoogleAdsSearchads360V0Common__AgeRangeInfo),
  negative: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  userList: Schema.optional(GoogleAdsSearchads360V0Common__UserListInfo),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CampaignCriterion" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignCriterion>;

export interface GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetRoas {
  /** Output only. The chosen revenue (based on conversion data) per unit of spend. */
  targetRoas?: number;
}

export const GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetRoas: Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetRoas> = Schema.suspend(() => Schema.Struct({
  targetRoas: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetRoas" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetRoas>;

export interface GoogleAdsSearchads360V0Resources__AssetGroup {
  /** Output only. The ID of the asset group. */
  id?: string;
  /** Immutable. The resource name of the asset group. Asset group resource names have the form: `customers/{customer_id}/assetGroups/{asset_group_id}` */
  resourceName?: string;
  /** Second part of text that may appear appended to the url displayed in the ad. This field can only be set when path1 is set. */
  path2?: string;
  /** First part of text that may appear appended to the url displayed in the ad. */
  path1?: string;
  /** Output only. Overall ad strength of this asset group. */
  adStrength?: "UNSPECIFIED" | "UNKNOWN" | "PENDING" | "NO_ADS" | "POOR" | "AVERAGE" | "GOOD" | "EXCELLENT" | (string & {});
  /** Required. Name of the asset group. Required. It must have a minimum length of 1 and maximum length of 128. It must be unique under a campaign. */
  name?: string;
  /** The status of the asset group. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED" | (string & {});
  /** A list of final mobile URLs after all cross domain redirects. In performance max, by default, the urls are eligible for expansion unless opted out. */
  finalMobileUrls?: Array<string>;
  /** Immutable. The campaign with which this asset group is associated. The asset which is linked to the asset group. */
  campaign?: string;
  /** A list of final URLs after all cross domain redirects. In performance max, by default, the urls are eligible for expansion unless opted out. */
  finalUrls?: Array<string>;
}

export const GoogleAdsSearchads360V0Resources__AssetGroup: Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  path2: Schema.optional(Schema.String),
  path1: Schema.optional(Schema.String),
  adStrength: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  finalMobileUrls: Schema.optional(Schema.Array(Schema.String)),
  campaign: Schema.optional(Schema.String),
  finalUrls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AssetGroup" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroup>;

export interface GoogleAdsSearchads360V0Resources__CampaignBudget {
  /** Immutable. The resource name of the campaign budget. Campaign budget resource names have the form: `customers/{customer_id}/campaignBudgets/{campaign_budget_id}` */
  resourceName?: string;
  /** Immutable. Period over which to spend the budget. Defaults to DAILY if not specified. */
  period?: "UNSPECIFIED" | "UNKNOWN" | "DAILY" | "FIXED_DAILY" | "CUSTOM_PERIOD" | (string & {});
  /** The delivery method that determines the rate at which the campaign budget is spent. Defaults to STANDARD if unspecified in a create operation. */
  deliveryMethod?: "UNSPECIFIED" | "UNKNOWN" | "STANDARD" | "ACCELERATED" | (string & {});
  /** The amount of the budget, in the local currency for the account. Amount is specified in micros, where one million is equivalent to one currency unit. Monthly spend is capped at 30.4 times this amount. */
  amountMicros?: string;
}

export const GoogleAdsSearchads360V0Resources__CampaignBudget: Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignBudget> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  period: Schema.optional(Schema.String),
  deliveryMethod: Schema.optional(Schema.String),
  amountMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CampaignBudget" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignBudget>;

export interface GoogleAdsSearchads360V0Resources__CustomerAssetSet {
  /** Immutable. The customer to which this asset set is linked. */
  customer?: string;
  /** Immutable. The resource name of the customer asset set. Asset set asset resource names have the form: `customers/{customer_id}/customerAssetSets/{asset_set_id}` */
  resourceName?: string;
  /** Output only. The status of the customer asset set asset. Read-only. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | (string & {});
  /** Immutable. The asset set which is linked to the customer. */
  assetSet?: string;
}

export const GoogleAdsSearchads360V0Resources__CustomerAssetSet: Schema.Schema<GoogleAdsSearchads360V0Resources__CustomerAssetSet> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  assetSet: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CustomerAssetSet" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CustomerAssetSet>;

export interface GoogleAdsSearchads360V0Resources__CampaignLabel {
  /** Output only. The ID of the Customer which owns the label. */
  ownerCustomerId?: string;
  /** Immutable. The label assigned to the campaign. */
  label?: string;
  /** Immutable. The campaign to which the label is attached. */
  campaign?: string;
  /** Immutable. Name of the resource. Campaign label resource names have the form: `customers/{owner_customer_id}/campaignLabels/{campaign_id}~{label_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__CampaignLabel: Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignLabel> = Schema.suspend(() => Schema.Struct({
  ownerCustomerId: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  campaign: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CampaignLabel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignLabel>;

export interface GoogleAdsSearchads360V0Common__AudienceInfo {
  /** The Audience resource name. */
  audience?: string;
}

export const GoogleAdsSearchads360V0Common__AudienceInfo: Schema.Schema<GoogleAdsSearchads360V0Common__AudienceInfo> = Schema.suspend(() => Schema.Struct({
  audience: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__AudienceInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__AudienceInfo>;

export interface GoogleAdsSearchads360V0Resources__KeywordView {
  /** Output only. The resource name of the keyword view. Keyword view resource names have the form: `customers/{customer_id}/keywordViews/{ad_group_id}~{criterion_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__KeywordView: Schema.Schema<GoogleAdsSearchads360V0Resources__KeywordView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__KeywordView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__KeywordView>;

export interface GoogleAdsSearchads360V0Resources__DynamicSearchAdsSearchTermView {
  /** Output only. The resource name of the dynamic search ads search term view. Dynamic search ads search term view resource names have the form: `customers/{customer_id}/dynamicSearchAdsSearchTermViews/{ad_group_id}~{search_term_fingerprint}~{headline_fingerprint}~{landing_page_fingerprint}~{page_url_fingerprint}` */
  resourceName?: string;
  /** Output only. The dynamically selected landing page URL of the impression. This field is read-only. */
  landingPage?: string;
}

export const GoogleAdsSearchads360V0Resources__DynamicSearchAdsSearchTermView: Schema.Schema<GoogleAdsSearchads360V0Resources__DynamicSearchAdsSearchTermView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  landingPage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__DynamicSearchAdsSearchTermView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__DynamicSearchAdsSearchTermView>;

export interface GoogleAdsSearchads360V0Resources__AssetGroupAsset {
  /** Immutable. The asset group which this asset group asset is linking. */
  assetGroup?: string;
  /** Immutable. The resource name of the asset group asset. Asset group asset resource name have the form: `customers/{customer_id}/assetGroupAssets/{asset_group_id}~{asset_id}~{field_type}` */
  resourceName?: string;
  /** Immutable. The asset which this asset group asset is linking. */
  asset?: string;
  /** The description of the placement of the asset within the asset group. For example: HEADLINE, YOUTUBE_VIDEO etc */
  fieldType?: "UNSPECIFIED" | "UNKNOWN" | "HEADLINE" | "DESCRIPTION" | "MANDATORY_AD_TEXT" | "MARKETING_IMAGE" | "MEDIA_BUNDLE" | "YOUTUBE_VIDEO" | "BOOK_ON_GOOGLE" | "LEAD_FORM" | "PROMOTION" | "CALLOUT" | "STRUCTURED_SNIPPET" | "SITELINK" | "MOBILE_APP" | "HOTEL_CALLOUT" | "CALL" | "PRICE" | "LONG_HEADLINE" | "BUSINESS_NAME" | "SQUARE_MARKETING_IMAGE" | "PORTRAIT_MARKETING_IMAGE" | "LOGO" | "LANDSCAPE_LOGO" | "VIDEO" | "CALL_TO_ACTION_SELECTION" | "AD_IMAGE" | "BUSINESS_LOGO" | "HOTEL_PROPERTY" | "DISCOVERY_CAROUSEL_CARD" | "LONG_DESCRIPTION" | "CALL_TO_ACTION" | (string & {});
  /** The status of the link between an asset and asset group. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | "PAUSED" | (string & {});
}

export const GoogleAdsSearchads360V0Resources__AssetGroupAsset: Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupAsset> = Schema.suspend(() => Schema.Struct({
  assetGroup: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  asset: Schema.optional(Schema.String),
  fieldType: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AssetGroupAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupAsset>;

export interface GoogleAdsSearchads360V0Resources__CustomerAsset {
  /** Required. Immutable. The asset which is linked to the customer. */
  asset?: string;
  /** Immutable. The resource name of the customer asset. CustomerAsset resource names have the form: `customers/{customer_id}/customerAssets/{asset_id}~{field_type}` */
  resourceName?: string;
  /** Status of the customer asset. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | "PAUSED" | (string & {});
}

export const GoogleAdsSearchads360V0Resources__CustomerAsset: Schema.Schema<GoogleAdsSearchads360V0Resources__CustomerAsset> = Schema.suspend(() => Schema.Struct({
  asset: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CustomerAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CustomerAsset>;

export interface GoogleAdsSearchads360V0Common__TargetingSetting {
  /** The per-targeting-dimension setting to restrict the reach of your campaign or ad group. */
  targetRestrictions?: Array<GoogleAdsSearchads360V0Common__TargetRestriction>;
}

export const GoogleAdsSearchads360V0Common__TargetingSetting: Schema.Schema<GoogleAdsSearchads360V0Common__TargetingSetting> = Schema.suspend(() => Schema.Struct({
  targetRestrictions: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__TargetRestriction)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TargetingSetting" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TargetingSetting>;

export interface GoogleAdsSearchads360V0Resources__AdGroup {
  /** Immutable. The resource name of the ad group. Ad group resource names have the form: `customers/{customer_id}/adGroups/{ad_group_id}` */
  resourceName?: string;
  /** Output only. The resource names of effective labels attached to this ad group. An effective label is a label inherited or directly assigned to this ad group. */
  effectiveLabels?: Array<string>;
  /** Output only. The datetime when this ad group was last modified. The datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss" format. */
  lastModifiedTime?: string;
  /** The URL template for constructing a tracking URL. */
  trackingUrlTemplate?: string;
  /** Output only. Date when the ad group ends serving ads. By default, the ad group ends on the ad group's end date. If this field is set, then the ad group ends at the end of the specified date in the customer's time zone. This field is only available for Microsoft Advertising and Facebook gateway accounts. Format: YYYY-MM-DD Example: 2019-03-14 */
  endDate?: string;
  /** Output only. The language of the ads and keywords in an ad group. This field is only available for Microsoft Advertising accounts. More details: https://docs.microsoft.com/en-us/advertising/guides/ad-languages?view=bingads-13#adlanguage */
  languageCode?: string;
  /** Immutable. The type of the ad group. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "SEARCH_STANDARD" | "DISPLAY_STANDARD" | "SHOPPING_PRODUCT_ADS" | "SHOPPING_SHOWCASE_ADS" | "HOTEL_ADS" | "SHOPPING_SMART_ADS" | "VIDEO_BUMPER" | "VIDEO_TRUE_VIEW_IN_STREAM" | "VIDEO_TRUE_VIEW_IN_DISPLAY" | "VIDEO_NON_SKIPPABLE_IN_STREAM" | "VIDEO_OUTSTREAM" | "SEARCH_DYNAMIC_ADS" | "SHOPPING_COMPARISON_LISTING_ADS" | "PROMOTED_HOTEL_ADS" | "VIDEO_RESPONSIVE" | "VIDEO_EFFICIENT_REACH" | "SMART_CAMPAIGN_ADS" | "TRAVEL_ADS" | (string & {});
  /** The ad rotation mode of the ad group. */
  adRotationMode?: "UNSPECIFIED" | "UNKNOWN" | "OPTIMIZE" | "ROTATE_FOREVER" | (string & {});
  /** The name of the ad group. This field is required and should not be empty when creating new ad groups. It must contain fewer than 255 UTF-8 full-width characters. It must not contain any null (code point 0x0), NL line feed (code point 0xA) or carriage return (code point 0xD) characters. */
  name?: string;
  /** The maximum CPC (cost-per-click) bid. */
  cpcBidMicros?: string;
  /** The status of the ad group. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED" | (string & {});
  /** Setting for targeting related features. */
  targetingSetting?: GoogleAdsSearchads360V0Common__TargetingSetting;
  /** Output only. ID of the ad group in the external engine account. This field is for non-Google Ads account only, for example, Yahoo Japan, Microsoft, Baidu etc. For Google Ads entity, use "ad_group.id" instead. */
  engineId?: string;
  /** Output only. The Engine Status for ad group. */
  engineStatus?: "UNSPECIFIED" | "UNKNOWN" | "AD_GROUP_ELIGIBLE" | "AD_GROUP_EXPIRED" | "AD_GROUP_REMOVED" | "AD_GROUP_DRAFT" | "AD_GROUP_PAUSED" | "AD_GROUP_SERVING" | "AD_GROUP_SUBMITTED" | "CAMPAIGN_PAUSED" | "ACCOUNT_PAUSED" | (string & {});
  /** Output only. Date when this ad group starts serving ads. By default, the ad group starts now or the ad group's start date, whichever is later. If this field is set, then the ad group starts at the beginning of the specified date in the customer's time zone. This field is only available for Microsoft Advertising and Facebook gateway accounts. Format: YYYY-MM-DD Example: 2019-03-14 */
  startDate?: string;
  /** URL template for appending params to Final URL. */
  finalUrlSuffix?: string;
  /** Output only. The resource names of labels attached to this ad group. */
  labels?: Array<string>;
  /** Output only. The ID of the ad group. */
  id?: string;
  /** Output only. The timestamp when this ad_group was created. The timestamp is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss" format. */
  creationTime?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroup: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroup> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  effectiveLabels: Schema.optional(Schema.Array(Schema.String)),
  lastModifiedTime: Schema.optional(Schema.String),
  trackingUrlTemplate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  adRotationMode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  cpcBidMicros: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  targetingSetting: Schema.optional(GoogleAdsSearchads360V0Common__TargetingSetting),
  engineId: Schema.optional(Schema.String),
  engineStatus: Schema.optional(Schema.String),
  startDate: Schema.optional(Schema.String),
  finalUrlSuffix: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroup" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroup>;

export interface GoogleAdsSearchads360V0Resources__CustomerManagerLink {
  /** Status of the link between the customer and the manager. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ACTIVE" | "INACTIVE" | "PENDING" | "REFUSED" | "CANCELED" | (string & {});
  /** Immutable. Name of the resource. CustomerManagerLink resource names have the form: `customers/{customer_id}/customerManagerLinks/{manager_customer_id}~{manager_link_id}` */
  resourceName?: string;
  /** Output only. The manager customer linked to the customer. */
  managerCustomer?: string;
  /** Output only. ID of the customer-manager link. This field is read only. */
  managerLinkId?: string;
  /** Output only. The timestamp when the CustomerManagerLink was created. The timestamp is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss" format. */
  startTime?: string;
}

export const GoogleAdsSearchads360V0Resources__CustomerManagerLink: Schema.Schema<GoogleAdsSearchads360V0Resources__CustomerManagerLink> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  managerCustomer: Schema.optional(Schema.String),
  managerLinkId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CustomerManagerLink" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CustomerManagerLink>;

export interface GoogleAdsSearchads360V0Resources__CampaignAssetSet {
  /** Immutable. The campaign to which this asset set is linked. */
  campaign?: string;
  /** Output only. The status of the campaign asset set asset. Read-only. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | (string & {});
  /** Immutable. The resource name of the campaign asset set. Asset set asset resource names have the form: `customers/{customer_id}/campaignAssetSets/{campaign_id}~{asset_set_id}` */
  resourceName?: string;
  /** Immutable. The asset set which is linked to the campaign. */
  assetSet?: string;
}

export const GoogleAdsSearchads360V0Resources__CampaignAssetSet: Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignAssetSet> = Schema.suspend(() => Schema.Struct({
  campaign: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  assetSet: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CampaignAssetSet" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignAssetSet>;

export interface GoogleAdsSearchads360V0Resources__AssetGroupSignal {
  /** Immutable. The asset group which this asset group signal belongs to. */
  assetGroup?: string;
  /** Immutable. The resource name of the asset group signal. Asset group signal resource name have the form: `customers/{customer_id}/assetGroupSignals/{asset_group_id}~{signal_id}` */
  resourceName?: string;
  /** Immutable. The audience signal to be used by the performance max campaign. */
  audience?: GoogleAdsSearchads360V0Common__AudienceInfo;
}

export const GoogleAdsSearchads360V0Resources__AssetGroupSignal: Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupSignal> = Schema.suspend(() => Schema.Struct({
  assetGroup: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  audience: Schema.optional(GoogleAdsSearchads360V0Common__AudienceInfo),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AssetGroupSignal" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupSignal>;

export interface GoogleAdsSearchads360V0Resources__AdGroupEffectiveLabel {
  /** Immutable. The resource name of the ad group effective label. Ad group effective label resource names have the form: `customers/{owner_customer_id}/adGroupEffectiveLabels/{ad_group_id}~{label_id}` */
  resourceName?: string;
  /** Immutable. The effective label assigned to the ad group. */
  label?: string;
  /** Immutable. The ad group to which the effective label is attached. */
  adGroup?: string;
  /** Output only. The ID of the Customer which owns the effective label. */
  ownerCustomerId?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupEffectiveLabel: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupEffectiveLabel> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  adGroup: Schema.optional(Schema.String),
  ownerCustomerId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupEffectiveLabel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupEffectiveLabel>;

export interface GoogleAdsSearchads360V0Resources__Label {
  /** The name of the label. This field is required and should not be empty when creating a new label. The length of this string should be between 1 and 80, inclusive. */
  name?: string;
  /** A type of label displaying text on a colored background. */
  textLabel?: GoogleAdsSearchads360V0Common__TextLabel;
  /** Output only. ID of the label. Read only. */
  id?: string;
  /** Immutable. Name of the resource. Label resource names have the form: `customers/{owner_customer_id}/labels/{label_id}` */
  resourceName?: string;
  /** Output only. Status of the label. Read only. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | (string & {});
}

export const GoogleAdsSearchads360V0Resources__Label: Schema.Schema<GoogleAdsSearchads360V0Resources__Label> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  textLabel: Schema.optional(GoogleAdsSearchads360V0Common__TextLabel),
  id: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__Label" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__Label>;

export interface GoogleAdsSearchads360V0Resources__ProductBiddingCategoryConstant {
  /** Output only. Status of the product bidding category. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ACTIVE" | "OBSOLETE" | (string & {});
  /** Output only. Two-letter upper-case country code of the product bidding category. */
  countryCode?: string;
  /** Output only. Level of the product bidding category. */
  level?: "UNSPECIFIED" | "UNKNOWN" | "LEVEL1" | "LEVEL2" | "LEVEL3" | "LEVEL4" | "LEVEL5" | (string & {});
  /** Output only. The resource name of the product bidding category. Product bidding category resource names have the form: `productBiddingCategoryConstants/{country_code}~{level}~{id}` */
  resourceName?: string;
  /** Output only. Display value of the product bidding category localized according to language_code. */
  localizedName?: string;
  /** Output only. Resource name of the parent product bidding category. */
  productBiddingCategoryConstantParent?: string;
  /** Output only. Language code of the product bidding category. */
  languageCode?: string;
  /** Output only. ID of the product bidding category. This ID is equivalent to the google_product_category ID as described in this article: https://support.google.com/merchants/answer/6324436. */
  id?: string;
}

export const GoogleAdsSearchads360V0Resources__ProductBiddingCategoryConstant: Schema.Schema<GoogleAdsSearchads360V0Resources__ProductBiddingCategoryConstant> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  level: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  localizedName: Schema.optional(Schema.String),
  productBiddingCategoryConstantParent: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__ProductBiddingCategoryConstant" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__ProductBiddingCategoryConstant>;

export interface GoogleAdsSearchads360V0Resources__LanguageConstant {
  /** Output only. The resource name of the language constant. Language constant resource names have the form: `languageConstants/{criterion_id}` */
  resourceName?: string;
  /** Output only. The ID of the language constant. */
  id?: string;
  /** Output only. The language code, for example, "en_US", "en_AU", "es", "fr", etc. */
  code?: string;
  /** Output only. Whether the language is targetable. */
  targetable?: boolean;
  /** Output only. The full name of the language in English, for example, "English (US)", "Spanish", etc. */
  name?: string;
}

export const GoogleAdsSearchads360V0Resources__LanguageConstant: Schema.Schema<GoogleAdsSearchads360V0Resources__LanguageConstant> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  targetable: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__LanguageConstant" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__LanguageConstant>;

export interface GoogleAdsSearchads360V0Resources__Visit {
  /** Output only. The country (ISO-3166 format) registered for the inventory feed that contains the product clicked on. */
  productCountryCode?: string;
  /** Output only. The store in the Local Inventory Ad that was clicked on. This should match the store IDs used in your local products feed. */
  productStoreId?: string;
  /** Output only. The timestamp of the visit event. The timestamp is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss" format. */
  visitDateTime?: string;
  /** Output only. A unique string for each visit that is passed to the landing page as the click id URL parameter. */
  clickId?: string;
  /** Output only. ID of the asset which was interacted with during the visit event. */
  assetId?: string;
  /** Output only. The language (ISO-639-1) that has been set for the Merchant Center feed containing data about the product. */
  productLanguageCode?: string;
  /** Output only. The ID of the visit. */
  id?: string;
  /** Output only. Ad ID. A value of 0 indicates that the ad is unattributed. */
  adId?: string;
  /** Output only. Asset field type of the visit event. */
  assetFieldType?: "UNSPECIFIED" | "UNKNOWN" | "HEADLINE" | "DESCRIPTION" | "MANDATORY_AD_TEXT" | "MARKETING_IMAGE" | "MEDIA_BUNDLE" | "YOUTUBE_VIDEO" | "BOOK_ON_GOOGLE" | "LEAD_FORM" | "PROMOTION" | "CALLOUT" | "STRUCTURED_SNIPPET" | "SITELINK" | "MOBILE_APP" | "HOTEL_CALLOUT" | "CALL" | "PRICE" | "LONG_HEADLINE" | "BUSINESS_NAME" | "SQUARE_MARKETING_IMAGE" | "PORTRAIT_MARKETING_IMAGE" | "LOGO" | "LANDSCAPE_LOGO" | "VIDEO" | "CALL_TO_ACTION_SELECTION" | "AD_IMAGE" | "BUSINESS_LOGO" | "HOTEL_PROPERTY" | "DISCOVERY_CAROUSEL_CARD" | "LONG_DESCRIPTION" | "CALL_TO_ACTION" | (string & {});
  /** Output only. Search Ads 360 keyword ID. A value of 0 indicates that the keyword is unattributed. */
  criterionId?: string;
  /** Output only. The Search Ads 360 inventory account ID containing the product that was clicked on. Search Ads 360 generates this ID when you link an inventory account in Search Ads 360. */
  merchantId?: string;
  /** Output only. The sales channel of the product that was clicked on: Online or Local. */
  productChannel?: "UNSPECIFIED" | "UNKNOWN" | "ONLINE" | "LOCAL" | (string & {});
  /** Output only. The resource name of the visit. Visit resource names have the form: `customers/{customer_id}/visits/{ad_group_id}~{criterion_id}~{ds_visit_id}` */
  resourceName?: string;
  /** Output only. The ID of the product clicked on. */
  productId?: string;
}

export const GoogleAdsSearchads360V0Resources__Visit: Schema.Schema<GoogleAdsSearchads360V0Resources__Visit> = Schema.suspend(() => Schema.Struct({
  productCountryCode: Schema.optional(Schema.String),
  productStoreId: Schema.optional(Schema.String),
  visitDateTime: Schema.optional(Schema.String),
  clickId: Schema.optional(Schema.String),
  assetId: Schema.optional(Schema.String),
  productLanguageCode: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  adId: Schema.optional(Schema.String),
  assetFieldType: Schema.optional(Schema.String),
  criterionId: Schema.optional(Schema.String),
  merchantId: Schema.optional(Schema.String),
  productChannel: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__Visit" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__Visit>;

export interface GoogleAdsSearchads360V0Resources_ConversionAction_ValueSettings {
  /** Controls whether the default value and default currency code are used in place of the value and currency code specified in conversion events for this conversion action. */
  alwaysUseDefaultValue?: boolean;
  /** The value to use when conversion events for this conversion action are sent with an invalid, disallowed or missing value, or when this conversion action is configured to always use the default value. */
  defaultValue?: number;
  /** The currency code to use when conversion events for this conversion action are sent with an invalid or missing currency code, or when this conversion action is configured to always use the default value. */
  defaultCurrencyCode?: string;
}

export const GoogleAdsSearchads360V0Resources_ConversionAction_ValueSettings: Schema.Schema<GoogleAdsSearchads360V0Resources_ConversionAction_ValueSettings> = Schema.suspend(() => Schema.Struct({
  alwaysUseDefaultValue: Schema.optional(Schema.Boolean),
  defaultValue: Schema.optional(Schema.Number),
  defaultCurrencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ConversionAction_ValueSettings" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ConversionAction_ValueSettings>;

export interface GoogleAdsSearchads360V0Resources_ConversionAction_FloodlightSettings {
  /** Output only. ID of the Floodlight activity in DoubleClick Campaign Manager (DCM). */
  activityId?: string;
  /** Output only. String used to identify a Floodlight activity when reporting conversions. */
  activityTag?: string;
  /** Output only. String used to identify a Floodlight activity group when reporting conversions. */
  activityGroupTag?: string;
}

export const GoogleAdsSearchads360V0Resources_ConversionAction_FloodlightSettings: Schema.Schema<GoogleAdsSearchads360V0Resources_ConversionAction_FloodlightSettings> = Schema.suspend(() => Schema.Struct({
  activityId: Schema.optional(Schema.String),
  activityTag: Schema.optional(Schema.String),
  activityGroupTag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_ConversionAction_FloodlightSettings" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_ConversionAction_FloodlightSettings>;

export interface GoogleAdsSearchads360V0Resources__ConversionAction {
  /** Output only. Timestamp of the Floodlight activity's creation, formatted in ISO 8601. */
  creationTime?: string;
  /** The name of the conversion action. This field is required and should not be empty when creating new conversion actions. */
  name?: string;
  /** Whether this conversion action should be included in the "client_account_conversions" metric. */
  includeInClientAccountConversionsMetric?: boolean;
  /** Immutable. The type of this conversion action. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "AD_CALL" | "CLICK_TO_CALL" | "GOOGLE_PLAY_DOWNLOAD" | "GOOGLE_PLAY_IN_APP_PURCHASE" | "UPLOAD_CALLS" | "UPLOAD_CLICKS" | "WEBPAGE" | "WEBSITE_CALL" | "STORE_SALES_DIRECT_UPLOAD" | "STORE_SALES" | "FIREBASE_ANDROID_FIRST_OPEN" | "FIREBASE_ANDROID_IN_APP_PURCHASE" | "FIREBASE_ANDROID_CUSTOM" | "FIREBASE_IOS_FIRST_OPEN" | "FIREBASE_IOS_IN_APP_PURCHASE" | "FIREBASE_IOS_CUSTOM" | "THIRD_PARTY_APP_ANALYTICS_ANDROID_FIRST_OPEN" | "THIRD_PARTY_APP_ANALYTICS_ANDROID_IN_APP_PURCHASE" | "THIRD_PARTY_APP_ANALYTICS_ANDROID_CUSTOM" | "THIRD_PARTY_APP_ANALYTICS_IOS_FIRST_OPEN" | "THIRD_PARTY_APP_ANALYTICS_IOS_IN_APP_PURCHASE" | "THIRD_PARTY_APP_ANALYTICS_IOS_CUSTOM" | "ANDROID_APP_PRE_REGISTRATION" | "ANDROID_INSTALLS_ALL_OTHER_APPS" | "FLOODLIGHT_ACTION" | "FLOODLIGHT_TRANSACTION" | "GOOGLE_HOSTED" | "LEAD_FORM_SUBMIT" | "SALESFORCE" | "SEARCH_ADS_360" | "SMART_CAMPAIGN_AD_CLICKS_TO_CALL" | "SMART_CAMPAIGN_MAP_CLICKS_TO_CALL" | "SMART_CAMPAIGN_MAP_DIRECTIONS" | "SMART_CAMPAIGN_TRACKED_CALLS" | "STORE_VISITS" | "WEBPAGE_CODELESS" | "UNIVERSAL_ANALYTICS_GOAL" | "UNIVERSAL_ANALYTICS_TRANSACTION" | "GOOGLE_ANALYTICS_4_CUSTOM" | "GOOGLE_ANALYTICS_4_PURCHASE" | (string & {});
  /** Output only. The resource name of the conversion action owner customer, or null if this is a system-defined conversion action. */
  ownerCustomer?: string;
  /** If a conversion action's primary_for_goal bit is false, the conversion action is non-biddable for all campaigns regardless of their customer conversion goal or campaign conversion goal. However, custom conversion goals do not respect primary_for_goal, so if a campaign has a custom conversion goal configured with a primary_for_goal = false conversion action, that conversion action is still biddable. By default, primary_for_goal will be true if not set. In V9, primary_for_goal can only be set to false after creation through an 'update' operation because it's not declared as optional. */
  primaryForGoal?: boolean;
  /** Settings related to this conversion action's attribution model. */
  attributionModelSettings?: GoogleAdsSearchads360V0Resources_ConversionAction_AttributionModelSettings;
  /** The maximum number of days that may elapse between an interaction (for example, a click) and a conversion event. */
  clickThroughLookbackWindowDays?: string;
  /** The status of this conversion action for conversion event accrual. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | "HIDDEN" | (string & {});
  /** The category of conversions reported for this conversion action. */
  category?: "UNSPECIFIED" | "UNKNOWN" | "DEFAULT" | "PAGE_VIEW" | "PURCHASE" | "SIGNUP" | "LEAD" | "DOWNLOAD" | "ADD_TO_CART" | "BEGIN_CHECKOUT" | "SUBSCRIBE_PAID" | "PHONE_CALL_LEAD" | "IMPORTED_LEAD" | "SUBMIT_LEAD_FORM" | "BOOK_APPOINTMENT" | "REQUEST_QUOTE" | "GET_DIRECTIONS" | "OUTBOUND_CLICK" | "CONTACT" | "ENGAGEMENT" | "STORE_VISIT" | "STORE_SALE" | "QUALIFIED_LEAD" | "CONVERTED_LEAD" | (string & {});
  /** Output only. The ID of the conversion action. */
  id?: string;
  /** Settings related to the value for conversion events associated with this conversion action. */
  valueSettings?: GoogleAdsSearchads360V0Resources_ConversionAction_ValueSettings;
  /** Output only. Whether this conversion action should be included in the "conversions" metric. */
  includeInConversionsMetric?: boolean;
  /** App ID for an app conversion action. */
  appId?: string;
  /** Output only. Floodlight settings for Floodlight conversion types. */
  floodlightSettings?: GoogleAdsSearchads360V0Resources_ConversionAction_FloodlightSettings;
  /** Immutable. The resource name of the conversion action. Conversion action resource names have the form: `customers/{customer_id}/conversionActions/{conversion_action_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__ConversionAction: Schema.Schema<GoogleAdsSearchads360V0Resources__ConversionAction> = Schema.suspend(() => Schema.Struct({
  creationTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  includeInClientAccountConversionsMetric: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  ownerCustomer: Schema.optional(Schema.String),
  primaryForGoal: Schema.optional(Schema.Boolean),
  attributionModelSettings: Schema.optional(GoogleAdsSearchads360V0Resources_ConversionAction_AttributionModelSettings),
  clickThroughLookbackWindowDays: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  valueSettings: Schema.optional(GoogleAdsSearchads360V0Resources_ConversionAction_ValueSettings),
  includeInConversionsMetric: Schema.optional(Schema.Boolean),
  appId: Schema.optional(Schema.String),
  floodlightSettings: Schema.optional(GoogleAdsSearchads360V0Resources_ConversionAction_FloodlightSettings),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__ConversionAction" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__ConversionAction>;

export interface GoogleAdsSearchads360V0Resources__WebpageView {
  /** Output only. The resource name of the webpage view. Webpage view resource names have the form: `customers/{customer_id}/webpageViews/{ad_group_id}~{criterion_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__WebpageView: Schema.Schema<GoogleAdsSearchads360V0Resources__WebpageView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__WebpageView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__WebpageView>;

export interface GoogleAdsSearchads360V0Resources__UserLocationView {
  /** Output only. Indicates whether location was targeted or not. */
  targetingLocation?: boolean;
  /** Output only. Criterion Id for the country. */
  countryCriterionId?: string;
  /** Output only. The resource name of the user location view. UserLocation view resource names have the form: `customers/{customer_id}/userLocationViews/{country_criterion_id}~{targeting_location}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__UserLocationView: Schema.Schema<GoogleAdsSearchads360V0Resources__UserLocationView> = Schema.suspend(() => Schema.Struct({
  targetingLocation: Schema.optional(Schema.Boolean),
  countryCriterionId: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__UserLocationView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__UserLocationView>;

export interface GoogleAdsSearchads360V0Resources__DoubleClickCampaignManagerSetting {
  /** Output only. ID of the Campaign Manager network associated with this customer. */
  networkId?: string;
  /** Output only. Time zone of the Campaign Manager network associated with this customer in IANA Time Zone Database format, such as America/New_York. */
  timeZone?: string;
  /** Output only. ID of the Campaign Manager advertiser associated with this customer. */
  advertiserId?: string;
}

export const GoogleAdsSearchads360V0Resources__DoubleClickCampaignManagerSetting: Schema.Schema<GoogleAdsSearchads360V0Resources__DoubleClickCampaignManagerSetting> = Schema.suspend(() => Schema.Struct({
  networkId: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__DoubleClickCampaignManagerSetting" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__DoubleClickCampaignManagerSetting>;

export interface GoogleAdsSearchads360V0Resources__Customer {
  /** Output only. The datetime when this customer was last modified. The datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss" format. */
  lastModifiedTime?: string;
  /** Output only. ID of the account in the external engine account. */
  engineId?: string;
  /** Output only. The status of the customer. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "CANCELED" | "SUSPENDED" | "CLOSED" | (string & {});
  /** Immutable. The resource name of the customer. Customer resource names have the form: `customers/{customer_id}` */
  resourceName?: string;
  /** Output only. Account status, for example, Enabled, Paused, Removed, etc. */
  accountStatus?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "SUSPENDED" | "REMOVED" | "DRAFT" | (string & {});
  /** The URL template for constructing a tracking URL out of parameters. */
  trackingUrlTemplate?: string;
  /** Output only. The descriptive name of the sub manager. */
  subManagerDescriptiveName?: string;
  /** Immutable. The local timezone ID of the customer. */
  timeZone?: string;
  /** Output only. Engine account type, for example, Google Ads, Microsoft Advertising, Yahoo Japan, Baidu, Facebook, Engine Track, etc. */
  accountType?: "UNSPECIFIED" | "UNKNOWN" | "BAIDU" | "ENGINE_TRACK" | "FACEBOOK" | "FACEBOOK_GATEWAY" | "GOOGLE_ADS" | "MICROSOFT" | "SEARCH_ADS_360" | "YAHOO_JAPAN" | (string & {});
  /** Output only. The timestamp when this customer was created. The timestamp is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss" format. */
  creationTime?: string;
  /** Optional, non-unique descriptive name of the customer. */
  descriptiveName?: string;
  /** Output only. The customer ID of the associate manager. A 0 value indicates that the customer has no SA360 associate manager. */
  associateManagerId?: string;
  /** Output only. The ID of the customer. */
  id?: string;
  /** Output only. The descriptive name of the manager. */
  managerDescriptiveName?: string;
  /** Output only. Whether the customer is a manager. */
  manager?: boolean;
  /** Output only. The account level of the customer: Manager, Sub-manager, Associate manager, Service account. */
  accountLevel?: "UNSPECIFIED" | "UNKNOWN" | "CLIENT_ACCOUNT_FACEBOOK" | "CLIENT_ACCOUNT_GOOGLE_ADS" | "CLIENT_ACCOUNT_MICROSOFT" | "CLIENT_ACCOUNT_YAHOO_JAPAN" | "CLIENT_ACCOUNT_ENGINE_TRACK" | "MANAGER" | "SUB_MANAGER" | "ASSOCIATE_MANAGER" | (string & {});
  /** Output only. The descriptive name of the associate manager. */
  associateManagerDescriptiveName?: string;
  /** Whether auto-tagging is enabled for the customer. */
  autoTaggingEnabled?: boolean;
  /** Output only. Conversion tracking setting for a customer. */
  conversionTrackingSetting?: GoogleAdsSearchads360V0Resources__ConversionTrackingSetting;
  /** Output only. DoubleClick Campaign Manager (DCM) setting for a manager customer. */
  doubleClickCampaignManagerSetting?: GoogleAdsSearchads360V0Resources__DoubleClickCampaignManagerSetting;
  /** Output only. The customer ID of the sub manager. A 0 value indicates that the customer has no sub SA360 manager. */
  subManagerId?: string;
  /** The URL template for appending params to the final URL. */
  finalUrlSuffix?: string;
  /** Output only. The customer ID of the manager. A 0 value indicates that the customer has no SA360 manager. */
  managerId?: string;
  /** Immutable. The currency in which the account operates. A subset of the currency codes from the ISO 4217 standard is supported. */
  currencyCode?: string;
}

export const GoogleAdsSearchads360V0Resources__Customer: Schema.Schema<GoogleAdsSearchads360V0Resources__Customer> = Schema.suspend(() => Schema.Struct({
  lastModifiedTime: Schema.optional(Schema.String),
  engineId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  accountStatus: Schema.optional(Schema.String),
  trackingUrlTemplate: Schema.optional(Schema.String),
  subManagerDescriptiveName: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  accountType: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  descriptiveName: Schema.optional(Schema.String),
  associateManagerId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  managerDescriptiveName: Schema.optional(Schema.String),
  manager: Schema.optional(Schema.Boolean),
  accountLevel: Schema.optional(Schema.String),
  associateManagerDescriptiveName: Schema.optional(Schema.String),
  autoTaggingEnabled: Schema.optional(Schema.Boolean),
  conversionTrackingSetting: Schema.optional(GoogleAdsSearchads360V0Resources__ConversionTrackingSetting),
  doubleClickCampaignManagerSetting: Schema.optional(GoogleAdsSearchads360V0Resources__DoubleClickCampaignManagerSetting),
  subManagerId: Schema.optional(Schema.String),
  finalUrlSuffix: Schema.optional(Schema.String),
  managerId: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__Customer" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__Customer>;

export interface GoogleAdsSearchads360V0Resources__AdGroupLabel {
  /** Immutable. The ad group to which the label is attached. */
  adGroup?: string;
  /** Immutable. The resource name of the ad group label. Ad group label resource names have the form: `customers/{owner_customer_id}/adGroupLabels/{ad_group_id}~{label_id}` */
  resourceName?: string;
  /** Output only. The ID of the Customer which owns the label. */
  ownerCustomerId?: string;
  /** Immutable. The label assigned to the ad group. */
  label?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupLabel: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupLabel> = Schema.suspend(() => Schema.Struct({
  adGroup: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  ownerCustomerId: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupLabel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupLabel>;

export interface GoogleAdsSearchads360V0Resources__AssetSet {
  /** Output only. The ID of the asset set. */
  id?: string;
  /** Immutable. The resource name of the asset set. Asset set resource names have the form: `customers/{customer_id}/assetSets/{asset_set_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__AssetSet: Schema.Schema<GoogleAdsSearchads360V0Resources__AssetSet> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AssetSet" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AssetSet>;

export interface GoogleAdsSearchads360V0Common__AdTextAsset {
  /** Asset text. */
  text?: string;
}

export const GoogleAdsSearchads360V0Common__AdTextAsset: Schema.Schema<GoogleAdsSearchads360V0Common__AdTextAsset> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__AdTextAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__AdTextAsset>;

export interface GoogleAdsSearchads360V0Common__SearchAds360ResponsiveSearchAdInfo {
  /** Text appended to path1 with a delimiter. */
  path2?: string;
  /** Text appended to the auto-generated visible URL with a delimiter. */
  path1?: string;
  /** List of text assets for headlines. When the ad serves the headlines will be selected from this list. */
  headlines?: Array<GoogleAdsSearchads360V0Common__AdTextAsset>;
  /** List of text assets for descriptions. When the ad serves the descriptions will be selected from this list. */
  descriptions?: Array<GoogleAdsSearchads360V0Common__AdTextAsset>;
  /** The tracking id of the ad. */
  adTrackingId?: string;
}

export const GoogleAdsSearchads360V0Common__SearchAds360ResponsiveSearchAdInfo: Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360ResponsiveSearchAdInfo> = Schema.suspend(() => Schema.Struct({
  path2: Schema.optional(Schema.String),
  path1: Schema.optional(Schema.String),
  headlines: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__AdTextAsset)),
  descriptions: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__AdTextAsset)),
  adTrackingId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__SearchAds360ResponsiveSearchAdInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360ResponsiveSearchAdInfo>;

export interface GoogleAdsSearchads360V0Common__SearchAds360ExpandedDynamicSearchAdInfo {
  /** The first line of the ad's description. */
  description1?: string;
  /** The second line of the ad's description. */
  description2?: string;
  /** The tracking id of the ad. */
  adTrackingId?: string;
}

export const GoogleAdsSearchads360V0Common__SearchAds360ExpandedDynamicSearchAdInfo: Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360ExpandedDynamicSearchAdInfo> = Schema.suspend(() => Schema.Struct({
  description1: Schema.optional(Schema.String),
  description2: Schema.optional(Schema.String),
  adTrackingId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__SearchAds360ExpandedDynamicSearchAdInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360ExpandedDynamicSearchAdInfo>;

export interface GoogleAdsSearchads360V0Common__SearchAds360ExpandedTextAdInfo {
  /** The second line of the ad's description. */
  description2?: string;
  /** The tracking id of the ad. */
  adTrackingId?: string;
  /** Text appended to path1 with a delimiter. */
  path2?: string;
  /** The headline of the ad. */
  headline?: string;
  /** The second headline of the ad. */
  headline2?: string;
  /** The third headline of the ad. */
  headline3?: string;
  /** Text appended to the auto-generated visible URL with a delimiter. */
  path1?: string;
  /** The first line of the ad's description. */
  description1?: string;
}

export const GoogleAdsSearchads360V0Common__SearchAds360ExpandedTextAdInfo: Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360ExpandedTextAdInfo> = Schema.suspend(() => Schema.Struct({
  description2: Schema.optional(Schema.String),
  adTrackingId: Schema.optional(Schema.String),
  path2: Schema.optional(Schema.String),
  headline: Schema.optional(Schema.String),
  headline2: Schema.optional(Schema.String),
  headline3: Schema.optional(Schema.String),
  path1: Schema.optional(Schema.String),
  description1: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__SearchAds360ExpandedTextAdInfo" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__SearchAds360ExpandedTextAdInfo>;

export interface GoogleAdsSearchads360V0Common__FinalAppUrl {
  /** The app deep link URL. Deep links specify a location in an app that corresponds to the content you'd like to show, and should be of the form {scheme}://{host_path} The scheme identifies which app to open. For your app, you can use a custom scheme that starts with the app's name. The host and path specify the unique location in the app where your content exists. Example: "exampleapp://productid_1234". Required. */
  url?: string;
  /** The operating system targeted by this URL. Required. */
  osType?: "UNSPECIFIED" | "UNKNOWN" | "IOS" | "ANDROID" | (string & {});
}

export const GoogleAdsSearchads360V0Common__FinalAppUrl: Schema.Schema<GoogleAdsSearchads360V0Common__FinalAppUrl> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  osType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__FinalAppUrl" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__FinalAppUrl>;

export interface GoogleAdsSearchads360V0Resources__Ad {
  /** Immutable. The resource name of the ad. Ad resource names have the form: `customers/{customer_id}/ads/{ad_id}` */
  resourceName?: string;
  /** Output only. The type of ad. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "TEXT_AD" | "EXPANDED_TEXT_AD" | "CALL_ONLY_AD" | "EXPANDED_DYNAMIC_SEARCH_AD" | "HOTEL_AD" | "SHOPPING_SMART_AD" | "SHOPPING_PRODUCT_AD" | "VIDEO_AD" | "GMAIL_AD" | "IMAGE_AD" | "RESPONSIVE_SEARCH_AD" | "LEGACY_RESPONSIVE_DISPLAY_AD" | "APP_AD" | "LEGACY_APP_INSTALL_AD" | "RESPONSIVE_DISPLAY_AD" | "LOCAL_AD" | "HTML5_UPLOAD_AD" | "DYNAMIC_HTML5_AD" | "APP_ENGAGEMENT_AD" | "SHOPPING_COMPARISON_LISTING_AD" | "VIDEO_BUMPER_AD" | "VIDEO_NON_SKIPPABLE_IN_STREAM_AD" | "VIDEO_OUTSTREAM_AD" | "VIDEO_TRUEVIEW_DISCOVERY_AD" | "VIDEO_TRUEVIEW_IN_STREAM_AD" | "VIDEO_RESPONSIVE_AD" | "SMART_CAMPAIGN_AD" | "APP_PRE_REGISTRATION_AD" | "DISCOVERY_MULTI_ASSET_AD" | "DISCOVERY_CAROUSEL_AD" | "TRAVEL_AD" | "DISCOVERY_VIDEO_RESPONSIVE_AD" | "MULTIMEDIA_AD" | (string & {});
  /** Output only. The ID of the ad. */
  id?: string;
  /** The list of possible final mobile URLs after all cross-domain redirects for the ad. */
  finalMobileUrls?: Array<string>;
  /** Immutable. Details pertaining to a responsive search ad. */
  responsiveSearchAd?: GoogleAdsSearchads360V0Common__SearchAds360ResponsiveSearchAdInfo;
  /** Immutable. Details pertaining to an expanded dynamic search ad. */
  expandedDynamicSearchAd?: GoogleAdsSearchads360V0Common__SearchAds360ExpandedDynamicSearchAdInfo;
  /** Immutable. Details pertaining to an expanded text ad. */
  expandedTextAd?: GoogleAdsSearchads360V0Common__SearchAds360ExpandedTextAdInfo;
  /** Immutable. Details pertaining to a text ad. */
  textAd?: GoogleAdsSearchads360V0Common__SearchAds360TextAdInfo;
  /** Immutable. The name of the ad. This is only used to be able to identify the ad. It does not need to be unique and does not affect the served ad. */
  name?: string;
  /** The URL template for constructing a tracking URL. */
  trackingUrlTemplate?: string;
  /** A list of final app URLs that will be used on mobile if the user has the specific app installed. */
  finalAppUrls?: Array<GoogleAdsSearchads360V0Common__FinalAppUrl>;
  /** Immutable. Details pertaining to a product ad. */
  productAd?: GoogleAdsSearchads360V0Common__SearchAds360ProductAdInfo;
  /** The list of possible final URLs after all cross-domain redirects for the ad. */
  finalUrls?: Array<string>;
  /** The URL that appears in the ad description for some ad formats. */
  displayUrl?: string;
  /** The suffix to use when constructing a final URL. */
  finalUrlSuffix?: string;
}

export const GoogleAdsSearchads360V0Resources__Ad: Schema.Schema<GoogleAdsSearchads360V0Resources__Ad> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  finalMobileUrls: Schema.optional(Schema.Array(Schema.String)),
  responsiveSearchAd: Schema.optional(GoogleAdsSearchads360V0Common__SearchAds360ResponsiveSearchAdInfo),
  expandedDynamicSearchAd: Schema.optional(GoogleAdsSearchads360V0Common__SearchAds360ExpandedDynamicSearchAdInfo),
  expandedTextAd: Schema.optional(GoogleAdsSearchads360V0Common__SearchAds360ExpandedTextAdInfo),
  textAd: Schema.optional(GoogleAdsSearchads360V0Common__SearchAds360TextAdInfo),
  name: Schema.optional(Schema.String),
  trackingUrlTemplate: Schema.optional(Schema.String),
  finalAppUrls: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__FinalAppUrl)),
  productAd: Schema.optional(GoogleAdsSearchads360V0Common__SearchAds360ProductAdInfo),
  finalUrls: Schema.optional(Schema.Array(Schema.String)),
  displayUrl: Schema.optional(Schema.String),
  finalUrlSuffix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__Ad" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__Ad>;

export interface GoogleAdsSearchads360V0Resources__AdGroupAd {
  /** The status of the ad. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED" | (string & {});
  /** Output only. The datetime when this ad group ad was last modified. The datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss" format. */
  lastModifiedTime?: string;
  /** Immutable. The ad. */
  ad?: GoogleAdsSearchads360V0Resources__Ad;
  /** Output only. The resource names of effective labels attached to this ad. An effective label is a label inherited or directly assigned to this ad. */
  effectiveLabels?: Array<string>;
  /** Output only. Additional status of the ad in the external engine account. Possible statuses (depending on the type of external account) include active, eligible, pending review, etc. */
  engineStatus?: "UNSPECIFIED" | "UNKNOWN" | "AD_GROUP_AD_ELIGIBLE" | "AD_GROUP_AD_INAPPROPRIATE_FOR_CAMPAIGN" | "AD_GROUP_AD_MOBILE_URL_UNDER_REVIEW" | "AD_GROUP_AD_PARTIALLY_INVALID" | "AD_GROUP_AD_TO_BE_ACTIVATED" | "AD_GROUP_AD_NOT_REVIEWED" | "AD_GROUP_AD_ON_HOLD" | "AD_GROUP_AD_PAUSED" | "AD_GROUP_AD_REMOVED" | "AD_GROUP_AD_PENDING_REVIEW" | "AD_GROUP_AD_UNDER_REVIEW" | "AD_GROUP_AD_APPROVED" | "AD_GROUP_AD_DISAPPROVED" | "AD_GROUP_AD_SERVING" | "AD_GROUP_AD_ACCOUNT_PAUSED" | "AD_GROUP_AD_CAMPAIGN_PAUSED" | "AD_GROUP_AD_AD_GROUP_PAUSED" | (string & {});
  /** Output only. ID of the ad in the external engine account. This field is for Search Ads 360 account only, for example, Yahoo Japan, Microsoft, Baidu etc. For non-Search Ads 360 entity, use "ad_group_ad.ad.id" instead. */
  engineId?: string;
  /** Output only. The resource names of labels attached to this ad group ad. */
  labels?: Array<string>;
  /** Immutable. The resource name of the ad. Ad group ad resource names have the form: `customers/{customer_id}/adGroupAds/{ad_group_id}~{ad_id}` */
  resourceName?: string;
  /** Output only. The timestamp when this ad_group_ad was created. The datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss" format. */
  creationTime?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupAd: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAd> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  ad: Schema.optional(GoogleAdsSearchads360V0Resources__Ad),
  effectiveLabels: Schema.optional(Schema.Array(Schema.String)),
  engineStatus: Schema.optional(Schema.String),
  engineId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(Schema.String)),
  resourceName: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupAd" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAd>;

export interface GoogleAdsSearchads360V0Resources__AdGroupCriterionLabel {
  /** Immutable. The label assigned to the ad group criterion. */
  label?: string;
  /** Immutable. The ad group criterion to which the label is attached. */
  adGroupCriterion?: string;
  /** Output only. The ID of the Customer which owns the label. */
  ownerCustomerId?: string;
  /** Immutable. The resource name of the ad group criterion label. Ad group criterion label resource names have the form: `customers/{owner_customer_id}/adGroupCriterionLabels/{ad_group_id}~{criterion_id}~{label_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupCriterionLabel: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupCriterionLabel> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  adGroupCriterion: Schema.optional(Schema.String),
  ownerCustomerId: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupCriterionLabel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupCriterionLabel>;

export interface GoogleAdsSearchads360V0Resources__GenderView {
  /** Output only. The resource name of the gender view. Gender view resource names have the form: `customers/{customer_id}/genderViews/{ad_group_id}~{criterion_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__GenderView: Schema.Schema<GoogleAdsSearchads360V0Resources__GenderView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__GenderView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__GenderView>;

export interface GoogleAdsSearchads360V0Resources__CartDataSalesView {
  /** Output only. The resource name of the Cart data sales view. Cart data sales view resource names have the form: `customers/{customer_id}/cartDataSalesView` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__CartDataSalesView: Schema.Schema<GoogleAdsSearchads360V0Resources__CartDataSalesView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CartDataSalesView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CartDataSalesView>;

export interface GoogleAdsSearchads360V0Resources__AssetSetAsset {
  /** Output only. The status of the asset set asset. Read-only. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | (string & {});
  /** Immutable. The asset set which this asset set asset is linking to. */
  assetSet?: string;
  /** Immutable. The asset which this asset set asset is linking to. */
  asset?: string;
  /** Immutable. The resource name of the asset set asset. Asset set asset resource names have the form: `customers/{customer_id}/assetSetAssets/{asset_set_id}~{asset_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__AssetSetAsset: Schema.Schema<GoogleAdsSearchads360V0Resources__AssetSetAsset> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  assetSet: Schema.optional(Schema.String),
  asset: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AssetSetAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AssetSetAsset>;

export interface GoogleAdsSearchads360V0Resources__CustomerClient {
  /** Output only. Identifies if the client is a manager. Read only. */
  manager?: boolean;
  /** Output only. Identifies if the client is a test account. Read only. */
  testAccount?: boolean;
  /** Output only. The resource name of the customer client. CustomerClient resource names have the form: `customers/{customer_id}/customerClients/{client_customer_id}` */
  resourceName?: string;
  /** Output only. Distance between given customer and client. For self link, the level value will be 0. Read only. */
  level?: string;
  /** Output only. Descriptive name for the client. Read only. */
  descriptiveName?: string;
  /** Output only. The ID of the client customer. Read only. */
  id?: string;
  /** Output only. Specifies whether this is a hidden account. Read only. */
  hidden?: boolean;
  /** Output only. The resource names of the labels owned by the requesting customer that are applied to the client customer. Label resource names have the form: `customers/{customer_id}/labels/{label_id}` */
  appliedLabels?: Array<string>;
  /** Output only. Common Locale Data Repository (CLDR) string representation of the time zone of the client, for example, America/Los_Angeles. Read only. */
  timeZone?: string;
  /** Output only. Currency code (for example, 'USD', 'EUR') for the client. Read only. */
  currencyCode?: string;
  /** Output only. The status of the client customer. Read only. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "CANCELED" | "SUSPENDED" | "CLOSED" | (string & {});
  /** Output only. The resource name of the client-customer which is linked to the given customer. Read only. */
  clientCustomer?: string;
}

export const GoogleAdsSearchads360V0Resources__CustomerClient: Schema.Schema<GoogleAdsSearchads360V0Resources__CustomerClient> = Schema.suspend(() => Schema.Struct({
  manager: Schema.optional(Schema.Boolean),
  testAccount: Schema.optional(Schema.Boolean),
  resourceName: Schema.optional(Schema.String),
  level: Schema.optional(Schema.String),
  descriptiveName: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  hidden: Schema.optional(Schema.Boolean),
  appliedLabels: Schema.optional(Schema.Array(Schema.String)),
  timeZone: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  clientCustomer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CustomerClient" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CustomerClient>;

export interface GoogleAdsSearchads360V0Resources_Campaign_SelectiveOptimization {
  /** The selected set of resource names for conversion actions for optimizing this campaign. */
  conversionActions?: Array<string>;
}

export const GoogleAdsSearchads360V0Resources_Campaign_SelectiveOptimization: Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_SelectiveOptimization> = Schema.suspend(() => Schema.Struct({
  conversionActions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_Campaign_SelectiveOptimization" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_SelectiveOptimization>;

export interface GoogleAdsSearchads360V0Resources_Campaign_TrackingSetting {
  /** Output only. The url used for dynamic tracking. */
  trackingUrl?: string;
}

export const GoogleAdsSearchads360V0Resources_Campaign_TrackingSetting: Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_TrackingSetting> = Schema.suspend(() => Schema.Struct({
  trackingUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_Campaign_TrackingSetting" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_TrackingSetting>;

export interface GoogleAdsSearchads360V0Common__TargetCpm {
}

export const GoogleAdsSearchads360V0Common__TargetCpm: Schema.Schema<GoogleAdsSearchads360V0Common__TargetCpm> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__TargetCpm" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__TargetCpm>;

export interface GoogleAdsSearchads360V0Resources_Campaign_DynamicSearchAdsSetting {
  /** Required. The Internet domain name that this setting represents, for example, "google.com" or "www.google.com". */
  domainName?: string;
  /** Required. The language code specifying the language of the domain, for example, "en". */
  languageCode?: string;
  /** Whether the campaign uses advertiser supplied URLs exclusively. */
  useSuppliedUrlsOnly?: boolean;
}

export const GoogleAdsSearchads360V0Resources_Campaign_DynamicSearchAdsSetting: Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_DynamicSearchAdsSetting> = Schema.suspend(() => Schema.Struct({
  domainName: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  useSuppliedUrlsOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_Campaign_DynamicSearchAdsSetting" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_DynamicSearchAdsSetting>;

export interface GoogleAdsSearchads360V0Resources_Campaign_NetworkSettings {
  /** Whether ads will be served on the Google Partner Network. This is available only to some select Google partner accounts. */
  targetPartnerSearchNetwork?: boolean;
  /** Whether ads will be served with google.com search results. */
  targetGoogleSearch?: boolean;
  /** Whether ads will be served on partner sites in the Google Search Network (requires `target_google_search` to also be `true`). */
  targetSearchNetwork?: boolean;
  /** Whether ads will be served on specified placements in the Google Display Network. Placements are specified using the Placement criterion. */
  targetContentNetwork?: boolean;
}

export const GoogleAdsSearchads360V0Resources_Campaign_NetworkSettings: Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_NetworkSettings> = Schema.suspend(() => Schema.Struct({
  targetPartnerSearchNetwork: Schema.optional(Schema.Boolean),
  targetGoogleSearch: Schema.optional(Schema.Boolean),
  targetSearchNetwork: Schema.optional(Schema.Boolean),
  targetContentNetwork: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_Campaign_NetworkSettings" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_Campaign_NetworkSettings>;

export interface GoogleAdsSearchads360V0Resources__Campaign {
  /** Standard Maximize Conversion Value bidding strategy that automatically sets bids to maximize revenue while spending your budget. */
  maximizeConversionValue?: GoogleAdsSearchads360V0Common__MaximizeConversionValue;
  /** Selective optimization setting for this campaign, which includes a set of conversion actions to optimize this campaign towards. This feature only applies to app campaigns that use MULTI_CHANNEL as AdvertisingChannelType and APP_CAMPAIGN or APP_CAMPAIGN_FOR_ENGAGEMENT as AdvertisingChannelSubType. */
  selectiveOptimization?: GoogleAdsSearchads360V0Resources_Campaign_SelectiveOptimization;
  /** Standard Maximize Conversions bidding strategy that automatically maximizes number of conversions while spending your budget. */
  maximizeConversions?: GoogleAdsSearchads360V0Common__MaximizeConversions;
  /** Output only. Resource name of AccessibleBiddingStrategy, a read-only view of the unrestricted attributes of the attached portfolio bidding strategy identified by 'bidding_strategy'. Empty, if the campaign does not use a portfolio strategy. Unrestricted strategy attributes are available to all customers with whom the strategy is shared and are read from the AccessibleBiddingStrategy resource. In contrast, restricted attributes are only available to the owner customer of the strategy and their managers. Restricted attributes can only be read from the BiddingStrategy resource. */
  accessibleBiddingStrategy?: string;
  /** Standard Target Spend bidding strategy that automatically sets your bids to help get as many clicks as possible within your budget. */
  targetSpend?: GoogleAdsSearchads360V0Common__TargetSpend;
  /** The ad serving optimization status of the campaign. */
  adServingOptimizationStatus?: "UNSPECIFIED" | "UNKNOWN" | "OPTIMIZE" | "CONVERSION_OPTIMIZE" | "ROTATE" | "ROTATE_INDEFINITELY" | "UNAVAILABLE" | (string & {});
  /** Output only. The datetime when this campaign was last modified. The datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss" format. */
  lastModifiedTime?: string;
  /** A list that limits how often each user will see this campaign's ads. */
  frequencyCaps?: Array<GoogleAdsSearchads360V0Common__FrequencyCapEntry>;
  /** The asset field types that should be excluded from this campaign. Asset links with these field types will not be inherited by this campaign from the upper level. */
  excludedParentAssetFieldTypes?: Array<"UNSPECIFIED" | "UNKNOWN" | "HEADLINE" | "DESCRIPTION" | "MANDATORY_AD_TEXT" | "MARKETING_IMAGE" | "MEDIA_BUNDLE" | "YOUTUBE_VIDEO" | "BOOK_ON_GOOGLE" | "LEAD_FORM" | "PROMOTION" | "CALLOUT" | "STRUCTURED_SNIPPET" | "SITELINK" | "MOBILE_APP" | "HOTEL_CALLOUT" | "CALL" | "PRICE" | "LONG_HEADLINE" | "BUSINESS_NAME" | "SQUARE_MARKETING_IMAGE" | "PORTRAIT_MARKETING_IMAGE" | "LOGO" | "LANDSCAPE_LOGO" | "VIDEO" | "CALL_TO_ACTION_SELECTION" | "AD_IMAGE" | "BUSINESS_LOGO" | "HOTEL_PROPERTY" | "DISCOVERY_CAROUSEL_CARD" | "LONG_DESCRIPTION" | "CALL_TO_ACTION" | (string & {})>;
  /** Standard Manual CPC bidding strategy. Manual click-based bidding where user pays per click. */
  manualCpc?: GoogleAdsSearchads360V0Common__ManualCpc;
  /** Immutable. The primary serving target for ads within the campaign. The targeting options can be refined in `network_settings`. This field is required and should not be empty when creating new campaigns. Can be set only when creating campaigns. After the campaign is created, the field can not be changed. */
  advertisingChannelType?: "UNSPECIFIED" | "UNKNOWN" | "SEARCH" | "DISPLAY" | "SHOPPING" | "HOTEL" | "VIDEO" | "MULTI_CHANNEL" | "LOCAL" | "SMART" | "PERFORMANCE_MAX" | "LOCAL_SERVICES" | "DISCOVERY" | "TRAVEL" | "SOCIAL" | (string & {});
  /** Standard Percent Cpc bidding strategy where bids are a fraction of the advertised price for some good or service. */
  percentCpc?: GoogleAdsSearchads360V0Common__PercentCpc;
  /** The last day of the campaign in serving customer's timezone in YYYY-MM-DD format. On create, defaults to 2037-12-30, which means the campaign will run indefinitely. To set an existing campaign to run indefinitely, set this field to 2037-12-30. */
  endDate?: string;
  /** The setting for ads geotargeting. */
  geoTargetTypeSetting?: GoogleAdsSearchads360V0Resources_Campaign_GeoTargetTypeSetting;
  /** The resource name of the campaign budget of the campaign. */
  campaignBudget?: string;
  /** Standard Manual CPM bidding strategy. Manual impression-based bidding where user pays per thousand impressions. */
  manualCpm?: GoogleAdsSearchads360V0Common__ManualCpm;
  /** Standard Target CPA bidding strategy that automatically sets bids to help get as many conversions as possible at the target cost-per-acquisition (CPA) you set. */
  targetCpa?: GoogleAdsSearchads360V0Common__TargetCpa;
  /** Target Impression Share bidding strategy. An automated bidding strategy that sets bids to achieve a chosen percentage of impressions. */
  targetImpressionShare?: GoogleAdsSearchads360V0Common__TargetImpressionShare;
  /** Standard Target ROAS bidding strategy that automatically maximizes revenue while averaging a specific target return on ad spend (ROAS). */
  targetRoas?: GoogleAdsSearchads360V0Common__TargetRoas;
  /** Optimization goal setting for this campaign, which includes a set of optimization goal types. */
  optimizationGoalSetting?: GoogleAdsSearchads360V0Resources_Campaign_OptimizationGoalSetting;
  /** Output only. The type of bidding strategy. A bidding strategy can be created by setting either the bidding scheme to create a standard bidding strategy or the `bidding_strategy` field to create a portfolio bidding strategy. This field is read-only. */
  biddingStrategyType?: "UNSPECIFIED" | "UNKNOWN" | "COMMISSION" | "ENHANCED_CPC" | "INVALID" | "MANUAL_CPA" | "MANUAL_CPC" | "MANUAL_CPM" | "MANUAL_CPV" | "MAXIMIZE_CONVERSIONS" | "MAXIMIZE_CONVERSION_VALUE" | "PAGE_ONE_PROMOTED" | "PERCENT_CPC" | "TARGET_CPA" | "TARGET_CPM" | "TARGET_IMPRESSION_SHARE" | "TARGET_OUTRANK_SHARE" | "TARGET_ROAS" | "TARGET_SPEND" | (string & {});
  /** Output only. Campaign-level settings for tracking information. */
  trackingSetting?: GoogleAdsSearchads360V0Resources_Campaign_TrackingSetting;
  /** Immutable. The resource name of the campaign. Campaign resource names have the form: `customers/{customer_id}/campaigns/{campaign_id}` */
  resourceName?: string;
  /** The list of mappings used to substitute custom parameter tags in a `tracking_url_template`, `final_urls`, or `mobile_final_urls`. */
  urlCustomParameters?: Array<GoogleAdsSearchads360V0Common__CustomParameter>;
  /** Output only. The resource names of labels attached to this campaign. */
  labels?: Array<string>;
  /** Output only. ID of the campaign in the external engine account. This field is for non-Google Ads account only, for example, Yahoo Japan, Microsoft, Baidu etc. For Google Ads entity, use "campaign.id" instead. */
  engineId?: string;
  /** Output only. The resource names of effective labels attached to this campaign. An effective label is a label inherited or directly assigned to this campaign. */
  effectiveLabels?: Array<string>;
  /** The URL template for constructing a tracking URL. */
  trackingUrlTemplate?: string;
  /** Immutable. Optional refinement to `advertising_channel_type`. Must be a valid sub-type of the parent channel type. Can be set only when creating campaigns. After campaign is created, the field can not be changed. */
  advertisingChannelSubType?: "UNSPECIFIED" | "UNKNOWN" | "SEARCH_MOBILE_APP" | "DISPLAY_MOBILE_APP" | "SEARCH_EXPRESS" | "DISPLAY_EXPRESS" | "SHOPPING_SMART_ADS" | "DISPLAY_GMAIL_AD" | "DISPLAY_SMART_CAMPAIGN" | "VIDEO_OUTSTREAM" | "VIDEO_ACTION" | "VIDEO_NON_SKIPPABLE" | "APP_CAMPAIGN" | "APP_CAMPAIGN_FOR_ENGAGEMENT" | "LOCAL_CAMPAIGN" | "SHOPPING_COMPARISON_LISTING_ADS" | "SMART_CAMPAIGN" | "VIDEO_SEQUENCE" | "APP_CAMPAIGN_FOR_PRE_REGISTRATION" | "VIDEO_REACH_TARGET_FREQUENCY" | "TRAVEL_ACTIVITIES" | "SOCIAL_FACEBOOK_TRACKING_ONLY" | (string & {});
  /** Output only. The timestamp when this campaign was created. The timestamp is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss" format. create_time will be deprecated in v1. Use creation_time instead. */
  createTime?: string;
  /** Output only. The system status of the campaign's bidding strategy. */
  biddingStrategySystemStatus?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "LEARNING_NEW" | "LEARNING_SETTING_CHANGE" | "LEARNING_BUDGET_CHANGE" | "LEARNING_COMPOSITION_CHANGE" | "LEARNING_CONVERSION_TYPE_CHANGE" | "LEARNING_CONVERSION_SETTING_CHANGE" | "LIMITED_BY_CPC_BID_CEILING" | "LIMITED_BY_CPC_BID_FLOOR" | "LIMITED_BY_DATA" | "LIMITED_BY_BUDGET" | "LIMITED_BY_LOW_PRIORITY_SPEND" | "LIMITED_BY_LOW_QUALITY" | "LIMITED_BY_INVENTORY" | "MISCONFIGURED_ZERO_ELIGIBILITY" | "MISCONFIGURED_CONVERSION_TYPES" | "MISCONFIGURED_CONVERSION_SETTINGS" | "MISCONFIGURED_SHARED_BUDGET" | "MISCONFIGURED_STRATEGY_TYPE" | "PAUSED" | "UNAVAILABLE" | "MULTIPLE_LEARNING" | "MULTIPLE_LIMITED" | "MULTIPLE_MISCONFIGURED" | "MULTIPLE" | (string & {});
  /** Output only. Types of feeds that are attached directly to this campaign. */
  feedTypes?: Array<"UNSPECIFIED" | "UNKNOWN" | "PAGE_FEED" | "DYNAMIC_EDUCATION" | "MERCHANT_CENTER_FEED" | "DYNAMIC_REAL_ESTATE" | "DYNAMIC_CUSTOM" | "DYNAMIC_HOTELS_AND_RENTALS" | "DYNAMIC_FLIGHTS" | "DYNAMIC_TRAVEL" | "DYNAMIC_LOCAL" | "DYNAMIC_JOBS" | "LOCATION_SYNC" | "BUSINESS_PROFILE_DYNAMIC_LOCATION_GROUP" | "CHAIN_DYNAMIC_LOCATION_GROUP" | "STATIC_LOCATION_GROUP" | "HOTEL_PROPERTY" | "TRAVEL_FEED" | (string & {})>;
  /** Output only. The ID of the campaign. */
  id?: string;
  /** The name of the campaign. This field is required and should not be empty when creating new campaigns. It must not contain any null (code point 0x0), NL line feed (code point 0xA) or carriage return (code point 0xD) characters. */
  name?: string;
  /** Output only. The ad serving status of the campaign. */
  servingStatus?: "UNSPECIFIED" | "UNKNOWN" | "SERVING" | "NONE" | "ENDED" | "PENDING" | "SUSPENDED" | (string & {});
  /** Represents opting out of URL expansion to more targeted URLs. If opted out (true), only the final URLs in the asset group or URLs specified in the advertiser's Google Merchant Center or business data feeds are targeted. If opted in (false), the entire domain will be targeted. This field can only be set for Performance Max campaigns, where the default value is false. */
  urlExpansionOptOut?: boolean;
  /** The date when campaign started in serving customer's timezone in YYYY-MM-DD format. */
  startDate?: string;
  /** The resource name of the portfolio bidding strategy used by the campaign. */
  biddingStrategy?: string;
  /** Output only. The timestamp when this campaign was created. The timestamp is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss" format. */
  creationTime?: string;
  /** Suffix used to append query parameters to landing pages that are served with parallel tracking. */
  finalUrlSuffix?: string;
  /** The status of the campaign. When a new campaign is added, the status defaults to ENABLED. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED" | (string & {});
  /** Settings for Real-Time Bidding, a feature only available for campaigns targeting the Ad Exchange network. */
  realTimeBiddingSetting?: GoogleAdsSearchads360V0Common__RealTimeBiddingSetting;
  /** A bidding strategy that automatically optimizes cost per thousand impressions. */
  targetCpm?: GoogleAdsSearchads360V0Common__TargetCpm;
  /** Standard Manual CPA bidding strategy. Manual bidding strategy that allows advertiser to set the bid per advertiser-specified action. Supported only for Local Services campaigns. */
  manualCpa?: GoogleAdsSearchads360V0Common__ManualCpa;
  /** The setting for controlling Dynamic Search Ads (DSA). */
  dynamicSearchAdsSetting?: GoogleAdsSearchads360V0Resources_Campaign_DynamicSearchAdsSetting;
  /** The setting for controlling Shopping campaigns. */
  shoppingSetting?: GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting;
  /** The network settings for the campaign. */
  networkSettings?: GoogleAdsSearchads360V0Resources_Campaign_NetworkSettings;
}

export const GoogleAdsSearchads360V0Resources__Campaign: Schema.Schema<GoogleAdsSearchads360V0Resources__Campaign> = Schema.suspend(() => Schema.Struct({
  maximizeConversionValue: Schema.optional(GoogleAdsSearchads360V0Common__MaximizeConversionValue),
  selectiveOptimization: Schema.optional(GoogleAdsSearchads360V0Resources_Campaign_SelectiveOptimization),
  maximizeConversions: Schema.optional(GoogleAdsSearchads360V0Common__MaximizeConversions),
  accessibleBiddingStrategy: Schema.optional(Schema.String),
  targetSpend: Schema.optional(GoogleAdsSearchads360V0Common__TargetSpend),
  adServingOptimizationStatus: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  frequencyCaps: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__FrequencyCapEntry)),
  excludedParentAssetFieldTypes: Schema.optional(Schema.Array(Schema.String)),
  manualCpc: Schema.optional(GoogleAdsSearchads360V0Common__ManualCpc),
  advertisingChannelType: Schema.optional(Schema.String),
  percentCpc: Schema.optional(GoogleAdsSearchads360V0Common__PercentCpc),
  endDate: Schema.optional(Schema.String),
  geoTargetTypeSetting: Schema.optional(GoogleAdsSearchads360V0Resources_Campaign_GeoTargetTypeSetting),
  campaignBudget: Schema.optional(Schema.String),
  manualCpm: Schema.optional(GoogleAdsSearchads360V0Common__ManualCpm),
  targetCpa: Schema.optional(GoogleAdsSearchads360V0Common__TargetCpa),
  targetImpressionShare: Schema.optional(GoogleAdsSearchads360V0Common__TargetImpressionShare),
  targetRoas: Schema.optional(GoogleAdsSearchads360V0Common__TargetRoas),
  optimizationGoalSetting: Schema.optional(GoogleAdsSearchads360V0Resources_Campaign_OptimizationGoalSetting),
  biddingStrategyType: Schema.optional(Schema.String),
  trackingSetting: Schema.optional(GoogleAdsSearchads360V0Resources_Campaign_TrackingSetting),
  resourceName: Schema.optional(Schema.String),
  urlCustomParameters: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__CustomParameter)),
  labels: Schema.optional(Schema.Array(Schema.String)),
  engineId: Schema.optional(Schema.String),
  effectiveLabels: Schema.optional(Schema.Array(Schema.String)),
  trackingUrlTemplate: Schema.optional(Schema.String),
  advertisingChannelSubType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  biddingStrategySystemStatus: Schema.optional(Schema.String),
  feedTypes: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  servingStatus: Schema.optional(Schema.String),
  urlExpansionOptOut: Schema.optional(Schema.Boolean),
  startDate: Schema.optional(Schema.String),
  biddingStrategy: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  finalUrlSuffix: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  realTimeBiddingSetting: Schema.optional(GoogleAdsSearchads360V0Common__RealTimeBiddingSetting),
  targetCpm: Schema.optional(GoogleAdsSearchads360V0Common__TargetCpm),
  manualCpa: Schema.optional(GoogleAdsSearchads360V0Common__ManualCpa),
  dynamicSearchAdsSetting: Schema.optional(GoogleAdsSearchads360V0Resources_Campaign_DynamicSearchAdsSetting),
  shoppingSetting: Schema.optional(GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting),
  networkSettings: Schema.optional(GoogleAdsSearchads360V0Resources_Campaign_NetworkSettings),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__Campaign" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__Campaign>;

export interface GoogleAdsSearchads360V0Resources__AdGroupBidModifier {
  /** The modifier for the bid when the criterion matches. The modifier must be in the range: 0.1 - 10.0. Use 0 to opt out of a Device type. */
  bidModifier?: number;
  /** Immutable. A device criterion. */
  device?: GoogleAdsSearchads360V0Common__DeviceInfo;
  /** Immutable. The resource name of the ad group bid modifier. Ad group bid modifier resource names have the form: `customers/{customer_id}/adGroupBidModifiers/{ad_group_id}~{criterion_id}` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupBidModifier: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupBidModifier> = Schema.suspend(() => Schema.Struct({
  bidModifier: Schema.optional(Schema.Number),
  device: Schema.optional(GoogleAdsSearchads360V0Common__DeviceInfo),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupBidModifier" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupBidModifier>;

export interface GoogleAdsSearchads360V0Resources__ShoppingPerformanceView {
  /** Output only. The resource name of the Shopping performance view. Shopping performance view resource names have the form: `customers/{customer_id}/shoppingPerformanceView` */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__ShoppingPerformanceView: Schema.Schema<GoogleAdsSearchads360V0Resources__ShoppingPerformanceView> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__ShoppingPerformanceView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__ShoppingPerformanceView>;

export interface GoogleAdsSearchads360V0Resources__AdGroupCriterionEffectiveLabel {
  /** Immutable. The ad group criterion to which the effective label is attached. */
  adGroupCriterion?: string;
  /** Immutable. The resource name of the ad group criterion effective label. Ad group criterion effective label resource names have the form: `customers/{owner_customer_id}/adGroupCriterionEffectiveLabels/{ad_group_id}~{criterion_id}~{label_id}` */
  resourceName?: string;
  /** Output only. The ID of the Customer which owns the effective label. */
  ownerCustomerId?: string;
  /** Immutable. The effective label assigned to the ad group criterion. */
  label?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupCriterionEffectiveLabel: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupCriterionEffectiveLabel> = Schema.suspend(() => Schema.Struct({
  adGroupCriterion: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  ownerCustomerId: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupCriterionEffectiveLabel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupCriterionEffectiveLabel>;

export interface GoogleAdsSearchads360V0Resources__AdGroupAssetSet {
  /** Immutable. The resource name of the ad group asset set. Ad group asset set resource names have the form: `customers/{customer_id}/adGroupAssetSets/{ad_group_id}~{asset_set_id}` */
  resourceName?: string;
  /** Output only. The status of the ad group asset set. Read-only. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | (string & {});
  /** Immutable. The ad group to which this asset set is linked. */
  adGroup?: string;
  /** Immutable. The asset set which is linked to the ad group. */
  assetSet?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupAssetSet: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAssetSet> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  adGroup: Schema.optional(Schema.String),
  assetSet: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupAssetSet" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAssetSet>;

export interface GoogleAdsSearchads360V0Common__AssetUsage {
  /** The served field type of the asset. */
  servedAssetFieldType?: "UNSPECIFIED" | "UNKNOWN" | "HEADLINE_1" | "HEADLINE_2" | "HEADLINE_3" | "DESCRIPTION_1" | "DESCRIPTION_2" | "HEADLINE" | "HEADLINE_IN_PORTRAIT" | "LONG_HEADLINE" | "DESCRIPTION" | "DESCRIPTION_IN_PORTRAIT" | "BUSINESS_NAME_IN_PORTRAIT" | "BUSINESS_NAME" | "MARKETING_IMAGE" | "MARKETING_IMAGE_IN_PORTRAIT" | "SQUARE_MARKETING_IMAGE" | "PORTRAIT_MARKETING_IMAGE" | "LOGO" | "LANDSCAPE_LOGO" | "CALL_TO_ACTION" | "YOU_TUBE_VIDEO" | "SITELINK" | "CALL" | "MOBILE_APP" | "CALLOUT" | "STRUCTURED_SNIPPET" | "PRICE" | "PROMOTION" | "AD_IMAGE" | "LEAD_FORM" | "BUSINESS_LOGO" | "DESCRIPTION_PREFIX" | (string & {});
  /** Resource name of the asset. */
  asset?: string;
}

export const GoogleAdsSearchads360V0Common__AssetUsage: Schema.Schema<GoogleAdsSearchads360V0Common__AssetUsage> = Schema.suspend(() => Schema.Struct({
  servedAssetFieldType: Schema.optional(Schema.String),
  asset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Common__AssetUsage" }) as any as Schema.Schema<GoogleAdsSearchads360V0Common__AssetUsage>;

export interface GoogleAdsSearchads360V0Resources__AssetGroupAssetCombinationData {
  /** Output only. Served assets. */
  assetCombinationServedAssets?: Array<GoogleAdsSearchads360V0Common__AssetUsage>;
}

export const GoogleAdsSearchads360V0Resources__AssetGroupAssetCombinationData: Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupAssetCombinationData> = Schema.suspend(() => Schema.Struct({
  assetCombinationServedAssets: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__AssetUsage)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AssetGroupAssetCombinationData" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupAssetCombinationData>;

export interface GoogleAdsSearchads360V0Resources__AssetGroupTopCombinationView {
  /** Output only. The top combinations of assets that served together. */
  assetGroupTopCombinations?: Array<GoogleAdsSearchads360V0Resources__AssetGroupAssetCombinationData>;
  /** Output only. The resource name of the asset group top combination view. AssetGroup Top Combination view resource names have the form: `"customers/{customer_id}/assetGroupTopCombinationViews/{asset_group_id}~{asset_combination_category}" */
  resourceName?: string;
}

export const GoogleAdsSearchads360V0Resources__AssetGroupTopCombinationView: Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupTopCombinationView> = Schema.suspend(() => Schema.Struct({
  assetGroupTopCombinations: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Resources__AssetGroupAssetCombinationData)),
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AssetGroupTopCombinationView" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AssetGroupTopCombinationView>;

export interface GoogleAdsSearchads360V0Resources__CampaignAsset {
  /** Immutable. The campaign to which the asset is linked. */
  campaign?: string;
  /** Output only. Status of the campaign asset. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | "PAUSED" | (string & {});
  /** Immutable. The resource name of the campaign asset. CampaignAsset resource names have the form: `customers/{customer_id}/campaignAssets/{campaign_id}~{asset_id}~{field_type}` */
  resourceName?: string;
  /** Immutable. The asset which is linked to the campaign. */
  asset?: string;
}

export const GoogleAdsSearchads360V0Resources__CampaignAsset: Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignAsset> = Schema.suspend(() => Schema.Struct({
  campaign: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  asset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__CampaignAsset" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__CampaignAsset>;

export interface GoogleAdsSearchads360V0Resources__Conversion {
  /** Output only. The Floodlight order ID provided by the advertiser for the conversion. */
  floodlightOrderId?: string;
  /** Output only. The timestamp of the visit that the conversion is attributed to. */
  conversionVisitDateTime?: string;
  /** Output only. Asset field type of the conversion event. */
  assetFieldType?: "UNSPECIFIED" | "UNKNOWN" | "HEADLINE" | "DESCRIPTION" | "MANDATORY_AD_TEXT" | "MARKETING_IMAGE" | "MEDIA_BUNDLE" | "YOUTUBE_VIDEO" | "BOOK_ON_GOOGLE" | "LEAD_FORM" | "PROMOTION" | "CALLOUT" | "STRUCTURED_SNIPPET" | "SITELINK" | "MOBILE_APP" | "HOTEL_CALLOUT" | "CALL" | "PRICE" | "LONG_HEADLINE" | "BUSINESS_NAME" | "SQUARE_MARKETING_IMAGE" | "PORTRAIT_MARKETING_IMAGE" | "LOGO" | "LANDSCAPE_LOGO" | "VIDEO" | "CALL_TO_ACTION_SELECTION" | "AD_IMAGE" | "BUSINESS_LOGO" | "HOTEL_PROPERTY" | "DISCOVERY_CAROUSEL_CARD" | "LONG_DESCRIPTION" | "CALL_TO_ACTION" | (string & {});
  /** Output only. The country (ISO-3166-format) registered for the inventory feed that contains the product clicked on. */
  productCountryCode?: string;
  /** Output only. The sales channel of the product that was clicked on: Online or Local. */
  productChannel?: "UNSPECIFIED" | "UNKNOWN" | "ONLINE" | "LOCAL" | (string & {});
  /** Output only. For offline conversions, this is an ID provided by advertisers. If an advertiser doesn't specify such an ID, Search Ads 360 generates one. For online conversions, this is equal to the id column or the floodlight_order_id column depending on the advertiser's Floodlight instructions. */
  advertiserConversionId?: string;
  /** Output only. The status of the conversion, either ENABLED or REMOVED.. */
  status?: "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | (string & {});
  /** Output only. The ID of the product clicked on. */
  productId?: string;
  /** Output only. The ID of the conversion */
  id?: string;
  /** Output only. The Search Ads 360 visit ID that the conversion is attributed to. */
  visitId?: string;
  /** Output only. The original, unchanged revenue associated with the Floodlight event (in the currency of the current report), before Floodlight currency instruction modifications. */
  floodlightOriginalRevenue?: string;
  /** Output only. The store in the Local Inventory Ad that was clicked on. This should match the store IDs used in your local products feed. */
  productStoreId?: string;
  /** Output only. The adjusted revenue in micros for the conversion event. This will always be in the currency of the serving account. */
  conversionRevenueMicros?: string;
  /** Output only. The resource name of the conversion. Conversion resource names have the form: `customers/{customer_id}/conversions/{ad_group_id}~{criterion_id}~{ds_conversion_id}` */
  resourceName?: string;
  /** Output only. Ad ID. A value of 0 indicates that the ad is unattributed. */
  adId?: string;
  /** Output only. The timestamp of the conversion event. */
  conversionDateTime?: string;
  /** Output only. ID of the asset which was interacted with during the conversion event. */
  assetId?: string;
  /** Output only. A unique string, for the visit that the conversion is attributed to, that is passed to the landing page as the click id URL parameter. */
  clickId?: string;
  /** Output only. The quantity of items recorded by the conversion, as determined by the qty url parameter. The advertiser is responsible for dynamically populating the parameter (such as number of items sold in the conversion), otherwise it defaults to 1. */
  conversionQuantity?: string;
  /** Output only. The timestamp of the last time the conversion was modified. */
  conversionLastModifiedDateTime?: string;
  /** Output only. The language (ISO-639-1) that has been set for the Merchant Center feed containing data about the product. */
  productLanguageCode?: string;
  /** Output only. Search Ads 360 criterion ID. A value of 0 indicates that the criterion is unattributed. */
  criterionId?: string;
  /** Output only. What the conversion is attributed to: Visit or Keyword+Ad. */
  attributionType?: "UNSPECIFIED" | "UNKNOWN" | "VISIT" | "CRITERION_AD" | (string & {});
  /** Output only. The Search Ads 360 inventory account ID containing the product that was clicked on. Search Ads 360 generates this ID when you link an inventory account in Search Ads 360. */
  merchantId?: string;
}

export const GoogleAdsSearchads360V0Resources__Conversion: Schema.Schema<GoogleAdsSearchads360V0Resources__Conversion> = Schema.suspend(() => Schema.Struct({
  floodlightOrderId: Schema.optional(Schema.String),
  conversionVisitDateTime: Schema.optional(Schema.String),
  assetFieldType: Schema.optional(Schema.String),
  productCountryCode: Schema.optional(Schema.String),
  productChannel: Schema.optional(Schema.String),
  advertiserConversionId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  visitId: Schema.optional(Schema.String),
  floodlightOriginalRevenue: Schema.optional(Schema.String),
  productStoreId: Schema.optional(Schema.String),
  conversionRevenueMicros: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  adId: Schema.optional(Schema.String),
  conversionDateTime: Schema.optional(Schema.String),
  assetId: Schema.optional(Schema.String),
  clickId: Schema.optional(Schema.String),
  conversionQuantity: Schema.optional(Schema.String),
  conversionLastModifiedDateTime: Schema.optional(Schema.String),
  productLanguageCode: Schema.optional(Schema.String),
  criterionId: Schema.optional(Schema.String),
  attributionType: Schema.optional(Schema.String),
  merchantId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__Conversion" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__Conversion>;

export interface GoogleAdsSearchads360V0Resources__AdGroupAdLabel {
  /** Immutable. The label assigned to the ad group ad. */
  label?: string;
  /** Immutable. The resource name of the ad group ad label. Ad group ad label resource names have the form: `customers/{owner_customer_id}/adGroupAdLabels/{ad_group_id}~{ad_id}~{label_id}` */
  resourceName?: string;
  /** Output only. The ID of the Customer which owns the label. */
  ownerCustomerId?: string;
  /** Immutable. The ad group ad to which the label is attached. */
  adGroupAd?: string;
}

export const GoogleAdsSearchads360V0Resources__AdGroupAdLabel: Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAdLabel> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  ownerCustomerId: Schema.optional(Schema.String),
  adGroupAd: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AdGroupAdLabel" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AdGroupAdLabel>;

export interface GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversions {
  /** Output only. The target cost per acquisition (CPA) option. This is the average amount that you would like to spend per acquisition. */
  targetCpa?: string;
  /** Output only. The target cost per acquisition (CPA) option. This is the average amount that you would like to spend per acquisition. */
  targetCpaMicros?: string;
}

export const GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversions: Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversions> = Schema.suspend(() => Schema.Struct({
  targetCpa: Schema.optional(Schema.String),
  targetCpaMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversions" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversions>;

export interface GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversionValue {
  /** Output only. The target return on ad spend (ROAS) option. If set, the bid strategy will maximize revenue while averaging the target return on ad spend. If the target ROAS is high, the bid strategy may not be able to spend the full budget. If the target ROAS is not set, the bid strategy will aim to achieve the highest possible ROAS for the budget. */
  targetRoas?: number;
}

export const GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversionValue: Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversionValue> = Schema.suspend(() => Schema.Struct({
  targetRoas: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversionValue" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversionValue>;

export interface GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetCpa {
  /** Output only. Average CPA target. This target should be greater than or equal to minimum billable unit based on the currency for the account. */
  targetCpaMicros?: string;
}

export const GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetCpa: Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetCpa> = Schema.suspend(() => Schema.Struct({
  targetCpaMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetCpa" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetCpa>;

export interface GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetImpressionShare {
  /** The chosen fraction of ads to be shown in the targeted location in micros. For example, 1% equals 10,000. */
  locationFractionMicros?: string;
  /** Output only. The targeted location on the search results page. */
  location?: "UNSPECIFIED" | "UNKNOWN" | "ANYWHERE_ON_PAGE" | "TOP_OF_PAGE" | "ABSOLUTE_TOP_OF_PAGE" | (string & {});
  /** Output only. The highest CPC bid the automated bidding system is permitted to specify. This is a required field entered by the advertiser that sets the ceiling and specified in local micros. */
  cpcBidCeilingMicros?: string;
}

export const GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetImpressionShare: Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetImpressionShare> = Schema.suspend(() => Schema.Struct({
  locationFractionMicros: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  cpcBidCeilingMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetImpressionShare" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetImpressionShare>;

export interface GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetSpend {
  /** Output only. Maximum bid limit that can be set by the bid strategy. The limit applies to all keywords managed by the strategy. */
  cpcBidCeilingMicros?: string;
  /** Output only. The spend target under which to maximize clicks. A TargetSpend bidder will attempt to spend the smaller of this value or the natural throttling spend amount. If not specified, the budget is used as the spend target. This field is deprecated and should no longer be used. See https://ads-developers.googleblog.com/2020/05/reminder-about-sunset-creation-of.html for details. */
  targetSpendMicros?: string;
}

export const GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetSpend: Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetSpend> = Schema.suspend(() => Schema.Struct({
  cpcBidCeilingMicros: Schema.optional(Schema.String),
  targetSpendMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetSpend" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetSpend>;

export interface GoogleAdsSearchads360V0Resources__AccessibleBiddingStrategy {
  /** Output only. descriptive_name of the Customer which owns the bidding strategy. */
  ownerDescriptiveName?: string;
  /** Output only. An automated bidding strategy to help get the most conversions for your campaigns while spending your budget. */
  maximizeConversions?: GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversions;
  /** Output only. An automated bidding strategy to help get the most conversion value for your campaigns while spending your budget. */
  maximizeConversionValue?: GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversionValue;
  /** Output only. The name of the bidding strategy. */
  name?: string;
  /** Output only. The resource name of the accessible bidding strategy. AccessibleBiddingStrategy resource names have the form: `customers/{customer_id}/accessibleBiddingStrategies/{bidding_strategy_id}` */
  resourceName?: string;
  /** Output only. The type of the bidding strategy. */
  type?: "UNSPECIFIED" | "UNKNOWN" | "COMMISSION" | "ENHANCED_CPC" | "INVALID" | "MANUAL_CPA" | "MANUAL_CPC" | "MANUAL_CPM" | "MANUAL_CPV" | "MAXIMIZE_CONVERSIONS" | "MAXIMIZE_CONVERSION_VALUE" | "PAGE_ONE_PROMOTED" | "PERCENT_CPC" | "TARGET_CPA" | "TARGET_CPM" | "TARGET_IMPRESSION_SHARE" | "TARGET_OUTRANK_SHARE" | "TARGET_ROAS" | "TARGET_SPEND" | (string & {});
  /** Output only. The ID of the bidding strategy. */
  id?: string;
  /** Output only. A bidding strategy that sets bids to help get as many conversions as possible at the target cost-per-acquisition (CPA) you set. */
  targetCpa?: GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetCpa;
  /** Output only. The ID of the Customer which owns the bidding strategy. */
  ownerCustomerId?: string;
  /** Output only. A bidding strategy that helps you maximize revenue while averaging a specific target Return On Ad Spend (ROAS). */
  targetRoas?: GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetRoas;
  /** Output only. A bidding strategy that automatically optimizes towards a chosen percentage of impressions. */
  targetImpressionShare?: GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetImpressionShare;
  /** Output only. A bid strategy that sets your bids to help get as many clicks as possible within your budget. */
  targetSpend?: GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetSpend;
}

export const GoogleAdsSearchads360V0Resources__AccessibleBiddingStrategy: Schema.Schema<GoogleAdsSearchads360V0Resources__AccessibleBiddingStrategy> = Schema.suspend(() => Schema.Struct({
  ownerDescriptiveName: Schema.optional(Schema.String),
  maximizeConversions: Schema.optional(GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversions),
  maximizeConversionValue: Schema.optional(GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_MaximizeConversionValue),
  name: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  targetCpa: Schema.optional(GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetCpa),
  ownerCustomerId: Schema.optional(Schema.String),
  targetRoas: Schema.optional(GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetRoas),
  targetImpressionShare: Schema.optional(GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetImpressionShare),
  targetSpend: Schema.optional(GoogleAdsSearchads360V0Resources_AccessibleBiddingStrategy_TargetSpend),
})).annotate({ identifier: "GoogleAdsSearchads360V0Resources__AccessibleBiddingStrategy" }) as any as Schema.Schema<GoogleAdsSearchads360V0Resources__AccessibleBiddingStrategy>;

export interface GoogleAdsSearchads360V0Services__SearchAds360Row {
  /** The age range view referenced in the query. */
  ageRangeView?: GoogleAdsSearchads360V0Resources__AgeRangeView;
  /** The keyword view referenced in the query. */
  keywordView?: GoogleAdsSearchads360V0Resources__KeywordView;
  /** The campaign audience view referenced in the query. */
  campaignAudienceView?: GoogleAdsSearchads360V0Resources__CampaignAudienceView;
  /** The criterion referenced in the query. */
  adGroupCriterion?: GoogleAdsSearchads360V0Resources__AdGroupCriterion;
  /** The product group view referenced in the query. */
  productGroupView?: GoogleAdsSearchads360V0Resources__ProductGroupView;
  /** The dynamic search ads search term view referenced in the query. */
  dynamicSearchAdsSearchTermView?: GoogleAdsSearchads360V0Resources__DynamicSearchAdsSearchTermView;
  /** The asset group asset referenced in the query. */
  assetGroupAsset?: GoogleAdsSearchads360V0Resources__AssetGroupAsset;
  /** The campaign budget referenced in the query. */
  campaignBudget?: GoogleAdsSearchads360V0Resources__CampaignBudget;
  /** The customer asset referenced in the query. */
  customerAsset?: GoogleAdsSearchads360V0Resources__CustomerAsset;
  /** The ad group referenced in the query. */
  adGroup?: GoogleAdsSearchads360V0Resources__AdGroup;
  /** The ad group asset referenced in the query. */
  adGroupAsset?: GoogleAdsSearchads360V0Resources__AdGroupAsset;
  /** The custom columns. */
  customColumns?: Array<GoogleAdsSearchads360V0Common__Value>;
  /** The CustomerManagerLink referenced in the query. */
  customerManagerLink?: GoogleAdsSearchads360V0Resources__CustomerManagerLink;
  /** The conversion custom variable referenced in the query. */
  conversionCustomVariable?: GoogleAdsSearchads360V0Resources__ConversionCustomVariable;
  /** The campaign asset set referenced in the query. */
  campaignAssetSet?: GoogleAdsSearchads360V0Resources__CampaignAssetSet;
  /** The asset group signal referenced in the query. */
  assetGroupSignal?: GoogleAdsSearchads360V0Resources__AssetGroupSignal;
  /** The ad group effective label referenced in the query. */
  adGroupEffectiveLabel?: GoogleAdsSearchads360V0Resources__AdGroupEffectiveLabel;
  /** The user list referenced in the query. */
  userList?: GoogleAdsSearchads360V0Resources__UserList;
  /** The label referenced in the query. */
  label?: GoogleAdsSearchads360V0Resources__Label;
  /** The Product Bidding Category referenced in the query. */
  productBiddingCategoryConstant?: GoogleAdsSearchads360V0Resources__ProductBiddingCategoryConstant;
  /** The Audience referenced in the query. */
  audience?: GoogleAdsSearchads360V0Resources__Audience;
  /** The bidding strategy referenced in the query. */
  biddingStrategy?: GoogleAdsSearchads360V0Resources__BiddingStrategy;
  /** The customer asset set referenced in the query. */
  customerAssetSet?: GoogleAdsSearchads360V0Resources__CustomerAssetSet;
  /** The language constant referenced in the query. */
  languageConstant?: GoogleAdsSearchads360V0Resources__LanguageConstant;
  /** The event level visit referenced in the query. */
  visit?: GoogleAdsSearchads360V0Resources__Visit;
  /** The conversion action referenced in the query. */
  conversionAction?: GoogleAdsSearchads360V0Resources__ConversionAction;
  /** The webpage view referenced in the query. */
  webpageView?: GoogleAdsSearchads360V0Resources__WebpageView;
  /** The user location view referenced in the query. */
  userLocationView?: GoogleAdsSearchads360V0Resources__UserLocationView;
  /** The customer referenced in the query. */
  customer?: GoogleAdsSearchads360V0Resources__Customer;
  /** The geo target constant referenced in the query. */
  geoTargetConstant?: GoogleAdsSearchads360V0Resources__GeoTargetConstant;
  /** The campaign criterion referenced in the query. */
  campaignCriterion?: GoogleAdsSearchads360V0Resources__CampaignCriterion;
  /** The ad group label referenced in the query. */
  adGroupLabel?: GoogleAdsSearchads360V0Resources__AdGroupLabel;
  /** The ad group ad effective label referenced in the query. */
  adGroupAdEffectiveLabel?: GoogleAdsSearchads360V0Resources__AdGroupAdEffectiveLabel;
  /** The asset set referenced in the query. */
  assetSet?: GoogleAdsSearchads360V0Resources__AssetSet;
  /** The ad referenced in the query. */
  adGroupAd?: GoogleAdsSearchads360V0Resources__AdGroupAd;
  /** The ad group criterion label referenced in the query. */
  adGroupCriterionLabel?: GoogleAdsSearchads360V0Resources__AdGroupCriterionLabel;
  /** The ad group audience view referenced in the query. */
  adGroupAudienceView?: GoogleAdsSearchads360V0Resources__AdGroupAudienceView;
  /** The gender view referenced in the query. */
  genderView?: GoogleAdsSearchads360V0Resources__GenderView;
  /** The cart data sales view referenced in the query. */
  cartDataSalesView?: GoogleAdsSearchads360V0Resources__CartDataSalesView;
  /** The asset set asset referenced in the query. */
  assetSetAsset?: GoogleAdsSearchads360V0Resources__AssetSetAsset;
  /** The segments. */
  segments?: GoogleAdsSearchads360V0Common__Segments;
  /** The asset referenced in the query. */
  asset?: GoogleAdsSearchads360V0Resources__Asset;
  /** The CustomerClient referenced in the query. */
  customerClient?: GoogleAdsSearchads360V0Resources__CustomerClient;
  /** The asset group referenced in the query. */
  assetGroup?: GoogleAdsSearchads360V0Resources__AssetGroup;
  /** The campaign referenced in the query. */
  campaign?: GoogleAdsSearchads360V0Resources__Campaign;
  /** The bid modifier referenced in the query. */
  adGroupBidModifier?: GoogleAdsSearchads360V0Resources__AdGroupBidModifier;
  /** The campaign effective label referenced in the query. */
  campaignEffectiveLabel?: GoogleAdsSearchads360V0Resources__CampaignEffectiveLabel;
  /** The shopping performance view referenced in the query. */
  shoppingPerformanceView?: GoogleAdsSearchads360V0Resources__ShoppingPerformanceView;
  /** The ad group criterion effective label referenced in the query. */
  adGroupCriterionEffectiveLabel?: GoogleAdsSearchads360V0Resources__AdGroupCriterionEffectiveLabel;
  /** The ad group asset set referenced in the query. */
  adGroupAssetSet?: GoogleAdsSearchads360V0Resources__AdGroupAssetSet;
  /** The asset group top combination view referenced in the query. */
  assetGroupTopCombinationView?: GoogleAdsSearchads360V0Resources__AssetGroupTopCombinationView;
  /** The campaign asset referenced in the query. */
  campaignAsset?: GoogleAdsSearchads360V0Resources__CampaignAsset;
  /** The event level conversion referenced in the query. */
  conversion?: GoogleAdsSearchads360V0Resources__Conversion;
  /** The metrics. */
  metrics?: GoogleAdsSearchads360V0Common__Metrics;
  /** The asset group listing group filter referenced in the query. */
  assetGroupListingGroupFilter?: GoogleAdsSearchads360V0Resources__AssetGroupListingGroupFilter;
  /** The ad group ad label referenced in the query. */
  adGroupAdLabel?: GoogleAdsSearchads360V0Resources__AdGroupAdLabel;
  /** The accessible bidding strategy referenced in the query. */
  accessibleBiddingStrategy?: GoogleAdsSearchads360V0Resources__AccessibleBiddingStrategy;
  /** The campaign label referenced in the query. */
  campaignLabel?: GoogleAdsSearchads360V0Resources__CampaignLabel;
  /** The location view referenced in the query. */
  locationView?: GoogleAdsSearchads360V0Resources__LocationView;
}

export const GoogleAdsSearchads360V0Services__SearchAds360Row: Schema.Schema<GoogleAdsSearchads360V0Services__SearchAds360Row> = Schema.suspend(() => Schema.Struct({
  ageRangeView: Schema.optional(GoogleAdsSearchads360V0Resources__AgeRangeView),
  keywordView: Schema.optional(GoogleAdsSearchads360V0Resources__KeywordView),
  campaignAudienceView: Schema.optional(GoogleAdsSearchads360V0Resources__CampaignAudienceView),
  adGroupCriterion: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupCriterion),
  productGroupView: Schema.optional(GoogleAdsSearchads360V0Resources__ProductGroupView),
  dynamicSearchAdsSearchTermView: Schema.optional(GoogleAdsSearchads360V0Resources__DynamicSearchAdsSearchTermView),
  assetGroupAsset: Schema.optional(GoogleAdsSearchads360V0Resources__AssetGroupAsset),
  campaignBudget: Schema.optional(GoogleAdsSearchads360V0Resources__CampaignBudget),
  customerAsset: Schema.optional(GoogleAdsSearchads360V0Resources__CustomerAsset),
  adGroup: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroup),
  adGroupAsset: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupAsset),
  customColumns: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Common__Value)),
  customerManagerLink: Schema.optional(GoogleAdsSearchads360V0Resources__CustomerManagerLink),
  conversionCustomVariable: Schema.optional(GoogleAdsSearchads360V0Resources__ConversionCustomVariable),
  campaignAssetSet: Schema.optional(GoogleAdsSearchads360V0Resources__CampaignAssetSet),
  assetGroupSignal: Schema.optional(GoogleAdsSearchads360V0Resources__AssetGroupSignal),
  adGroupEffectiveLabel: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupEffectiveLabel),
  userList: Schema.optional(GoogleAdsSearchads360V0Resources__UserList),
  label: Schema.optional(GoogleAdsSearchads360V0Resources__Label),
  productBiddingCategoryConstant: Schema.optional(GoogleAdsSearchads360V0Resources__ProductBiddingCategoryConstant),
  audience: Schema.optional(GoogleAdsSearchads360V0Resources__Audience),
  biddingStrategy: Schema.optional(GoogleAdsSearchads360V0Resources__BiddingStrategy),
  customerAssetSet: Schema.optional(GoogleAdsSearchads360V0Resources__CustomerAssetSet),
  languageConstant: Schema.optional(GoogleAdsSearchads360V0Resources__LanguageConstant),
  visit: Schema.optional(GoogleAdsSearchads360V0Resources__Visit),
  conversionAction: Schema.optional(GoogleAdsSearchads360V0Resources__ConversionAction),
  webpageView: Schema.optional(GoogleAdsSearchads360V0Resources__WebpageView),
  userLocationView: Schema.optional(GoogleAdsSearchads360V0Resources__UserLocationView),
  customer: Schema.optional(GoogleAdsSearchads360V0Resources__Customer),
  geoTargetConstant: Schema.optional(GoogleAdsSearchads360V0Resources__GeoTargetConstant),
  campaignCriterion: Schema.optional(GoogleAdsSearchads360V0Resources__CampaignCriterion),
  adGroupLabel: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupLabel),
  adGroupAdEffectiveLabel: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupAdEffectiveLabel),
  assetSet: Schema.optional(GoogleAdsSearchads360V0Resources__AssetSet),
  adGroupAd: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupAd),
  adGroupCriterionLabel: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupCriterionLabel),
  adGroupAudienceView: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupAudienceView),
  genderView: Schema.optional(GoogleAdsSearchads360V0Resources__GenderView),
  cartDataSalesView: Schema.optional(GoogleAdsSearchads360V0Resources__CartDataSalesView),
  assetSetAsset: Schema.optional(GoogleAdsSearchads360V0Resources__AssetSetAsset),
  segments: Schema.optional(GoogleAdsSearchads360V0Common__Segments),
  asset: Schema.optional(GoogleAdsSearchads360V0Resources__Asset),
  customerClient: Schema.optional(GoogleAdsSearchads360V0Resources__CustomerClient),
  assetGroup: Schema.optional(GoogleAdsSearchads360V0Resources__AssetGroup),
  campaign: Schema.optional(GoogleAdsSearchads360V0Resources__Campaign),
  adGroupBidModifier: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupBidModifier),
  campaignEffectiveLabel: Schema.optional(GoogleAdsSearchads360V0Resources__CampaignEffectiveLabel),
  shoppingPerformanceView: Schema.optional(GoogleAdsSearchads360V0Resources__ShoppingPerformanceView),
  adGroupCriterionEffectiveLabel: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupCriterionEffectiveLabel),
  adGroupAssetSet: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupAssetSet),
  assetGroupTopCombinationView: Schema.optional(GoogleAdsSearchads360V0Resources__AssetGroupTopCombinationView),
  campaignAsset: Schema.optional(GoogleAdsSearchads360V0Resources__CampaignAsset),
  conversion: Schema.optional(GoogleAdsSearchads360V0Resources__Conversion),
  metrics: Schema.optional(GoogleAdsSearchads360V0Common__Metrics),
  assetGroupListingGroupFilter: Schema.optional(GoogleAdsSearchads360V0Resources__AssetGroupListingGroupFilter),
  adGroupAdLabel: Schema.optional(GoogleAdsSearchads360V0Resources__AdGroupAdLabel),
  accessibleBiddingStrategy: Schema.optional(GoogleAdsSearchads360V0Resources__AccessibleBiddingStrategy),
  campaignLabel: Schema.optional(GoogleAdsSearchads360V0Resources__CampaignLabel),
  locationView: Schema.optional(GoogleAdsSearchads360V0Resources__LocationView),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__SearchAds360Row" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__SearchAds360Row>;

export interface GoogleAdsSearchads360V0Errors__SearchAds360Failure {
  /** The unique ID of the request that is used for debugging purposes. */
  requestId?: string;
  /** The list of errors that occurred. */
  errors?: Array<GoogleAdsSearchads360V0Errors__SearchAds360Error>;
}

export const GoogleAdsSearchads360V0Errors__SearchAds360Failure: Schema.Schema<GoogleAdsSearchads360V0Errors__SearchAds360Failure> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Errors__SearchAds360Error)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Errors__SearchAds360Failure" }) as any as Schema.Schema<GoogleAdsSearchads360V0Errors__SearchAds360Failure>;

export interface GoogleAdsSearchads360V0Services__ConversionCustomMetricHeader {
  /** The user defined name of the conversion custom metric. */
  name?: string;
  /** The conversion custom metric ID. */
  id?: string;
}

export const GoogleAdsSearchads360V0Services__ConversionCustomMetricHeader: Schema.Schema<GoogleAdsSearchads360V0Services__ConversionCustomMetricHeader> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__ConversionCustomMetricHeader" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__ConversionCustomMetricHeader>;

export interface GoogleAdsSearchads360V0Services__RawEventConversionDimensionHeader {
  /** The user defined name of the raw event dimension. */
  name?: string;
  /** The conversion custom variable ID. */
  id?: string;
}

export const GoogleAdsSearchads360V0Services__RawEventConversionDimensionHeader: Schema.Schema<GoogleAdsSearchads360V0Services__RawEventConversionDimensionHeader> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__RawEventConversionDimensionHeader" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__RawEventConversionDimensionHeader>;

export interface GoogleAdsSearchads360V0Services__SearchSearchAds360Request {
  /** Determines whether a summary row will be returned. By default, summary row is not returned. If requested, the summary row will be sent in a response by itself after all other query results are returned. */
  summaryRowSetting?: "UNSPECIFIED" | "UNKNOWN" | "NO_SUMMARY_ROW" | "SUMMARY_ROW_WITH_RESULTS" | "SUMMARY_ROW_ONLY" | (string & {});
  /** Required. The query string. */
  query?: string;
  /** If true, the request is validated but not executed. */
  validateOnly?: boolean;
  /** If true, the total number of results that match the query ignoring the LIMIT clause will be included in the response. Default is false. */
  returnTotalResultsCount?: boolean;
  /** Token of the page to retrieve. If not specified, the first page of results will be returned. Use the value obtained from `next_page_token` in the previous response in order to request the next page of results. */
  pageToken?: string;
  /** Number of elements to retrieve in a single page. When too large a page is requested, the server may decide to further limit the number of returned resources. */
  pageSize?: number;
}

export const GoogleAdsSearchads360V0Services__SearchSearchAds360Request: Schema.Schema<GoogleAdsSearchads360V0Services__SearchSearchAds360Request> = Schema.suspend(() => Schema.Struct({
  summaryRowSetting: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  validateOnly: Schema.optional(Schema.Boolean),
  returnTotalResultsCount: Schema.optional(Schema.Boolean),
  pageToken: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__SearchSearchAds360Request" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__SearchSearchAds360Request>;

export interface GoogleAdsSearchads360V0Services__SearchSearchAds360Response {
  /** The headers of the raw event conversion dimensions in the results. */
  rawEventConversionDimensionHeaders?: Array<GoogleAdsSearchads360V0Services__RawEventConversionDimensionHeader>;
  /** The headers of the conversion custom dimensions in the results. */
  conversionCustomDimensionHeaders?: Array<GoogleAdsSearchads360V0Services__ConversionCustomDimensionHeader>;
  /** FieldMask that represents what fields were requested by the user. */
  fieldMask?: string;
  /** The headers of the custom columns in the results. */
  customColumnHeaders?: Array<GoogleAdsSearchads360V0Services__CustomColumnHeader>;
  /** Pagination token used to retrieve the next page of results. Pass the content of this string as the `page_token` attribute of the next request. `next_page_token` is not returned for the last page. */
  nextPageToken?: string;
  /** The headers of the conversion custom metrics in the results. */
  conversionCustomMetricHeaders?: Array<GoogleAdsSearchads360V0Services__ConversionCustomMetricHeader>;
  /** The list of rows that matched the query. */
  results?: Array<GoogleAdsSearchads360V0Services__SearchAds360Row>;
  /** Summary row that contains summary of metrics in results. Summary of metrics means aggregation of metrics across all results, here aggregation could be sum, average, rate, etc. */
  summaryRow?: GoogleAdsSearchads360V0Services__SearchAds360Row;
  /** Total number of results that match the query ignoring the LIMIT clause. */
  totalResultsCount?: string;
  /** The headers of the raw event conversion metrics in the results. */
  rawEventConversionMetricHeaders?: Array<GoogleAdsSearchads360V0Services__RawEventConversionMetricHeader>;
}

export const GoogleAdsSearchads360V0Services__SearchSearchAds360Response: Schema.Schema<GoogleAdsSearchads360V0Services__SearchSearchAds360Response> = Schema.suspend(() => Schema.Struct({
  rawEventConversionDimensionHeaders: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Services__RawEventConversionDimensionHeader)),
  conversionCustomDimensionHeaders: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Services__ConversionCustomDimensionHeader)),
  fieldMask: Schema.optional(Schema.String),
  customColumnHeaders: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Services__CustomColumnHeader)),
  nextPageToken: Schema.optional(Schema.String),
  conversionCustomMetricHeaders: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Services__ConversionCustomMetricHeader)),
  results: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Services__SearchAds360Row)),
  summaryRow: Schema.optional(GoogleAdsSearchads360V0Services__SearchAds360Row),
  totalResultsCount: Schema.optional(Schema.String),
  rawEventConversionMetricHeaders: Schema.optional(Schema.Array(GoogleAdsSearchads360V0Services__RawEventConversionMetricHeader)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__SearchSearchAds360Response" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__SearchSearchAds360Response>;

export interface GoogleAdsSearchads360V0Services__ListAccessibleCustomersResponse {
  /** Resource name of customers directly accessible by the user authenticating the call. */
  resourceNames?: Array<string>;
}

export const GoogleAdsSearchads360V0Services__ListAccessibleCustomersResponse: Schema.Schema<GoogleAdsSearchads360V0Services__ListAccessibleCustomersResponse> = Schema.suspend(() => Schema.Struct({
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleAdsSearchads360V0Services__ListAccessibleCustomersResponse" }) as any as Schema.Schema<GoogleAdsSearchads360V0Services__ListAccessibleCustomersResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns just the requested field. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]() */
export interface GetSearchAds360FieldsRequest {
  /** Required. The resource name of the field to get. */
  resourceName: string;
}

export const GetSearchAds360FieldsRequest = Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
}).pipe(
  T.Http({ method: "GET", path: "v0/searchAds360Fields/{searchAds360FieldsId}" }),
  svc,
) as unknown as Schema.Schema<GetSearchAds360FieldsRequest>;

export type GetSearchAds360FieldsResponse = GoogleAdsSearchads360V0Resources__SearchAds360Field;
export const GetSearchAds360FieldsResponse = GoogleAdsSearchads360V0Resources__SearchAds360Field;

export type GetSearchAds360FieldsError = CommonErrors;

export const getSearchAds360Fields: API.OperationMethod<GetSearchAds360FieldsRequest, GetSearchAds360FieldsResponse, GetSearchAds360FieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSearchAds360FieldsRequest,
  output: GetSearchAds360FieldsResponse,
  errors: [],
}));

/** Returns all fields that match the search [query](/search-ads/reporting/concepts/field-service#use_a_query_to_get_field_details). List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QueryError]() [QuotaError]() [RequestError]() */
export interface SearchSearchAds360FieldsRequest {
  /** Request body */
  body?: GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsRequest;
}

export const SearchSearchAds360FieldsRequest = Schema.Struct({
  body: Schema.optional(GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v0/searchAds360Fields:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchSearchAds360FieldsRequest>;

export type SearchSearchAds360FieldsResponse = GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse;
export const SearchSearchAds360FieldsResponse = GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse;

export type SearchSearchAds360FieldsError = CommonErrors;

export const searchSearchAds360Fields: API.OperationMethod<SearchSearchAds360FieldsRequest, SearchSearchAds360FieldsResponse, SearchSearchAds360FieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchSearchAds360FieldsRequest,
  output: SearchSearchAds360FieldsResponse,
  errors: [],
}));

/** Returns resource names of customers directly accessible by the user authenticating the call. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]() */
export interface ListAccessibleCustomersCustomersRequest {
}

export const ListAccessibleCustomersCustomersRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v0/customers:listAccessibleCustomers" }),
  svc,
) as unknown as Schema.Schema<ListAccessibleCustomersCustomersRequest>;

export type ListAccessibleCustomersCustomersResponse = GoogleAdsSearchads360V0Services__ListAccessibleCustomersResponse;
export const ListAccessibleCustomersCustomersResponse = GoogleAdsSearchads360V0Services__ListAccessibleCustomersResponse;

export type ListAccessibleCustomersCustomersError = CommonErrors;

export const listAccessibleCustomersCustomers: API.OperationMethod<ListAccessibleCustomersCustomersRequest, ListAccessibleCustomersCustomersResponse, ListAccessibleCustomersCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAccessibleCustomersCustomersRequest,
  output: ListAccessibleCustomersCustomersResponse,
  errors: [],
}));

/** Returns all the custom columns associated with the customer in full detail. */
export interface ListCustomersCustomColumnsRequest {
  /** Required. The ID of the customer to apply the CustomColumn list operation to. */
  customerId: string;
}

export const ListCustomersCustomColumnsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
}).pipe(
  T.Http({ method: "GET", path: "v0/customers/{customersId}/customColumns" }),
  svc,
) as unknown as Schema.Schema<ListCustomersCustomColumnsRequest>;

export type ListCustomersCustomColumnsResponse = GoogleAdsSearchads360V0Services__ListCustomColumnsResponse;
export const ListCustomersCustomColumnsResponse = GoogleAdsSearchads360V0Services__ListCustomColumnsResponse;

export type ListCustomersCustomColumnsError = CommonErrors;

export const listCustomersCustomColumns: API.OperationMethod<ListCustomersCustomColumnsRequest, ListCustomersCustomColumnsResponse, ListCustomersCustomColumnsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListCustomersCustomColumnsRequest,
  output: ListCustomersCustomColumnsResponse,
  errors: [],
}));

/** Returns the requested custom column in full detail. */
export interface GetCustomersCustomColumnsRequest {
  /** Required. The resource name of the custom column to fetch. */
  resourceName: string;
}

export const GetCustomersCustomColumnsRequest = Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
}).pipe(
  T.Http({ method: "GET", path: "v0/customers/{customersId}/customColumns/{customColumnsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersCustomColumnsRequest>;

export type GetCustomersCustomColumnsResponse = GoogleAdsSearchads360V0Resources__CustomColumn;
export const GetCustomersCustomColumnsResponse = GoogleAdsSearchads360V0Resources__CustomColumn;

export type GetCustomersCustomColumnsError = CommonErrors;

export const getCustomersCustomColumns: API.OperationMethod<GetCustomersCustomColumnsRequest, GetCustomersCustomColumnsResponse, GetCustomersCustomColumnsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersCustomColumnsRequest,
  output: GetCustomersCustomColumnsResponse,
  errors: [],
}));

/** Returns all rows that match the search query. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QueryError]() [QuotaError]() [RequestError]() */
export interface SearchCustomersSearchAds360Request {
  /** Required. The ID of the customer being queried. */
  customerId: string;
  /** Request body */
  body?: GoogleAdsSearchads360V0Services__SearchSearchAds360Request;
}

export const SearchCustomersSearchAds360Request = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  body: Schema.optional(GoogleAdsSearchads360V0Services__SearchSearchAds360Request).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v0/customers/{customersId}/searchAds360:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchCustomersSearchAds360Request>;

export type SearchCustomersSearchAds360Response = GoogleAdsSearchads360V0Services__SearchSearchAds360Response;
export const SearchCustomersSearchAds360Response = GoogleAdsSearchads360V0Services__SearchSearchAds360Response;

export type SearchCustomersSearchAds360Error = CommonErrors;

export const searchCustomersSearchAds360: API.OperationMethod<SearchCustomersSearchAds360Request, SearchCustomersSearchAds360Response, SearchCustomersSearchAds360Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchCustomersSearchAds360Request,
  output: SearchCustomersSearchAds360Response,
  errors: [],
}));

