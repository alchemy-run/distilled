// ==========================================================================
// Ad Exchange Buyer API II (adexchangebuyer2 v2beta1)
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
  name: "adexchangebuyer2",
  version: "v2beta1",
  rootUrl: "https://adexchangebuyer.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface HtmlContent {
  /** The HTML snippet that displays the ad when inserted in the web page. */
  snippet?: string;
  /** The width of the HTML snippet in pixels. */
  width?: number;
  /** The height of the HTML snippet in pixels. */
  height?: number;
}

export const HtmlContent: Schema.Schema<HtmlContent> = Schema.suspend(() => Schema.Struct({
  snippet: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
})).annotate({ identifier: "HtmlContent" }) as any as Schema.Schema<HtmlContent>;

export interface VideoContent {
  /** The URL to fetch a video ad. */
  videoUrl?: string;
  /** The contents of a VAST document for a video ad. This document should conform to the VAST 2.0 or 3.0 standard. */
  videoVastXml?: string;
}

export const VideoContent: Schema.Schema<VideoContent> = Schema.suspend(() => Schema.Struct({
  videoUrl: Schema.optional(Schema.String),
  videoVastXml: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoContent" }) as any as Schema.Schema<VideoContent>;

export interface Image {
  /** The URL of the image. */
  url?: string;
  /** Image width in pixels. */
  width?: number;
  /** Image height in pixels. */
  height?: number;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
})).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface NativeContent {
  /** A short title for the ad. */
  headline?: string;
  /** A long description of the ad. */
  body?: string;
  /** A label for the button that the user is supposed to click. */
  callToAction?: string;
  /** The name of the advertiser or sponsor, to be displayed in the ad creative. */
  advertiserName?: string;
  /** A large image. */
  image?: Image;
  /** The URL to fetch a native video ad. */
  videoUrl?: string;
  /** A smaller image, for the advertiser's logo. */
  logo?: Image;
  /** The app icon, for app download ads. */
  appIcon?: Image;
  /** The app rating in the app store. Must be in the range [0-5]. */
  starRating?: number;
  /** The URL that the browser/SDK will load when the user clicks the ad. */
  clickLinkUrl?: string;
  /** The URL to use for click tracking. */
  clickTrackingUrl?: string;
  /** The price of the promoted app including currency info. */
  priceDisplayText?: string;
  /** The URL to the app store to purchase/download the promoted app. */
  storeUrl?: string;
}

export const NativeContent: Schema.Schema<NativeContent> = Schema.suspend(() => Schema.Struct({
  headline: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  callToAction: Schema.optional(Schema.String),
  advertiserName: Schema.optional(Schema.String),
  image: Schema.optional(Image),
  videoUrl: Schema.optional(Schema.String),
  logo: Schema.optional(Image),
  appIcon: Schema.optional(Image),
  starRating: Schema.optional(Schema.Number),
  clickLinkUrl: Schema.optional(Schema.String),
  clickTrackingUrl: Schema.optional(Schema.String),
  priceDisplayText: Schema.optional(Schema.String),
  storeUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "NativeContent" }) as any as Schema.Schema<NativeContent>;

export interface LocationContext {
  /** IDs representing the geo location for this context. Refer to the [geo-table.csv](https://storage.googleapis.com/adx-rtb-dictionaries/geo-table.csv) file for different geo criteria IDs. */
  geoCriteriaIds?: Array<number>;
}

export const LocationContext: Schema.Schema<LocationContext> = Schema.suspend(() => Schema.Struct({
  geoCriteriaIds: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "LocationContext" }) as any as Schema.Schema<LocationContext>;

export interface PlatformContext {
  /** The platforms this restriction applies to. */
  platforms?: Array<"DESKTOP" | "ANDROID" | "IOS" | (string & {})>;
}

export const PlatformContext: Schema.Schema<PlatformContext> = Schema.suspend(() => Schema.Struct({
  platforms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PlatformContext" }) as any as Schema.Schema<PlatformContext>;

export interface AuctionContext {
  /** The auction types this restriction applies to. */
  auctionTypes?: Array<"OPEN_AUCTION" | "DIRECT_DEALS" | (string & {})>;
}

export const AuctionContext: Schema.Schema<AuctionContext> = Schema.suspend(() => Schema.Struct({
  auctionTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuctionContext" }) as any as Schema.Schema<AuctionContext>;

export interface SecurityContext {
  /** The security types in this context. */
  securities?: Array<"INSECURE" | "SSL" | (string & {})>;
}

export const SecurityContext: Schema.Schema<SecurityContext> = Schema.suspend(() => Schema.Struct({
  securities: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SecurityContext" }) as any as Schema.Schema<SecurityContext>;

export interface AppContext {
  /** The app types this restriction applies to. */
  appTypes?: Array<"NATIVE" | "WEB" | (string & {})>;
}

export const AppContext: Schema.Schema<AppContext> = Schema.suspend(() => Schema.Struct({
  appTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AppContext" }) as any as Schema.Schema<AppContext>;

export interface ServingContext {
  /** Matches all contexts. */
  all?: "SIMPLE_CONTEXT" | (string & {});
  /** Matches impressions coming from users *or* publishers in a specific location. */
  location?: LocationContext;
  /** Matches impressions coming from a particular platform. */
  platform?: PlatformContext;
  /** Matches impressions for a particular auction type. */
  auctionType?: AuctionContext;
  /** Matches impressions for a particular security type. */
  securityType?: SecurityContext;
  /** Matches impressions for a particular app type. */
  appType?: AppContext;
}

export const ServingContext: Schema.Schema<ServingContext> = Schema.suspend(() => Schema.Struct({
  all: Schema.optional(Schema.String),
  location: Schema.optional(LocationContext),
  platform: Schema.optional(PlatformContext),
  auctionType: Schema.optional(AuctionContext),
  securityType: Schema.optional(SecurityContext),
  appType: Schema.optional(AppContext),
})).annotate({ identifier: "ServingContext" }) as any as Schema.Schema<ServingContext>;

export interface Disapproval {
  /** The categorized reason for disapproval. */
  reason?: "LENGTH_OF_IMAGE_ANIMATION" | "BROKEN_URL" | "MEDIA_NOT_FUNCTIONAL" | "INVALID_FOURTH_PARTY_CALL" | "INCORRECT_REMARKETING_DECLARATION" | "LANDING_PAGE_ERROR" | "AD_SIZE_DOES_NOT_MATCH_AD_SLOT" | "NO_BORDER" | "FOURTH_PARTY_BROWSER_COOKIES" | "LSO_OBJECTS" | "BLANK_CREATIVE" | "DESTINATION_URLS_UNDECLARED" | "PROBLEM_WITH_CLICK_MACRO" | "INCORRECT_AD_TECHNOLOGY_DECLARATION" | "INCORRECT_DESTINATION_URL_DECLARATION" | "EXPANDABLE_INCORRECT_DIRECTION" | "EXPANDABLE_DIRECTION_NOT_SUPPORTED" | "EXPANDABLE_INVALID_VENDOR" | "EXPANDABLE_FUNCTIONALITY" | "VIDEO_INVALID_VENDOR" | "VIDEO_UNSUPPORTED_LENGTH" | "VIDEO_UNSUPPORTED_FORMAT" | "VIDEO_FUNCTIONALITY" | "LANDING_PAGE_DISABLED" | "MALWARE_SUSPECTED" | "ADULT_IMAGE_OR_VIDEO" | "INACCURATE_AD_TEXT" | "COUNTERFEIT_DESIGNER_GOODS" | "POP_UP" | "INVALID_RTB_PROTOCOL_USAGE" | "RAW_IP_ADDRESS_IN_SNIPPET" | "UNACCEPTABLE_CONTENT_SOFTWARE" | "UNAUTHORIZED_COOKIE_ON_GOOGLE_DOMAIN" | "UNDECLARED_FLASH_OBJECTS" | "INVALID_SSL_DECLARATION" | "DIRECT_DOWNLOAD_IN_AD" | "MAXIMUM_DOWNLOAD_SIZE_EXCEEDED" | "DESTINATION_URL_SITE_NOT_CRAWLABLE" | "BAD_URL_LEGAL_DISAPPROVAL" | "PHARMA_GAMBLING_ALCOHOL_NOT_ALLOWED" | "DYNAMIC_DNS_AT_DESTINATION_URL" | "POOR_IMAGE_OR_VIDEO_QUALITY" | "UNACCEPTABLE_IMAGE_CONTENT" | "INCORRECT_IMAGE_LAYOUT" | "IRRELEVANT_IMAGE_OR_VIDEO" | "DESTINATION_SITE_DOES_NOT_ALLOW_GOING_BACK" | "MISLEADING_CLAIMS_IN_AD" | "RESTRICTED_PRODUCTS" | "UNACCEPTABLE_CONTENT" | "AUTOMATED_AD_CLICKING" | "INVALID_URL_PROTOCOL" | "UNDECLARED_RESTRICTED_CONTENT" | "INVALID_REMARKETING_LIST_USAGE" | "DESTINATION_SITE_NOT_CRAWLABLE_ROBOTS_TXT" | "CLICK_TO_DOWNLOAD_NOT_AN_APP" | "INACCURATE_REVIEW_EXTENSION" | "SEXUALLY_EXPLICIT_CONTENT" | "GAINING_AN_UNFAIR_ADVANTAGE" | "GAMING_THE_GOOGLE_NETWORK" | "DANGEROUS_PRODUCTS_KNIVES" | "DANGEROUS_PRODUCTS_EXPLOSIVES" | "DANGEROUS_PRODUCTS_GUNS" | "DANGEROUS_PRODUCTS_DRUGS" | "DANGEROUS_PRODUCTS_TOBACCO" | "DANGEROUS_PRODUCTS_WEAPONS" | "UNCLEAR_OR_IRRELEVANT_AD" | "PROFESSIONAL_STANDARDS" | "DYSFUNCTIONAL_PROMOTION" | "INVALID_INTEREST_BASED_AD" | "MISUSE_OF_PERSONAL_INFORMATION" | "OMISSION_OF_RELEVANT_INFORMATION" | "UNAVAILABLE_PROMOTIONS" | "MISLEADING_PROMOTIONS" | "INAPPROPRIATE_CONTENT" | "SENSITIVE_EVENTS" | "SHOCKING_CONTENT" | "ENABLING_DISHONEST_BEHAVIOR" | "TECHNICAL_REQUIREMENTS" | "RESTRICTED_POLITICAL_CONTENT" | "UNSUPPORTED_CONTENT" | "INVALID_BIDDING_METHOD" | "VIDEO_TOO_LONG" | "VIOLATES_JAPANESE_PHARMACY_LAW" | "UNACCREDITED_PET_PHARMACY" | "ABORTION" | "CONTRACEPTIVES" | "NEED_CERTIFICATES_TO_ADVERTISE_IN_CHINA" | "KCDSP_REGISTRATION" | "NOT_FAMILY_SAFE" | "CLINICAL_TRIAL_RECRUITMENT" | "MAXIMUM_NUMBER_OF_HTTP_CALLS_EXCEEDED" | "MAXIMUM_NUMBER_OF_COOKIES_EXCEEDED" | "PERSONAL_LOANS" | "UNSUPPORTED_FLASH_CONTENT" | "MISUSE_BY_OMID_SCRIPT" | "NON_WHITELISTED_OMID_VENDOR" | "DESTINATION_EXPERIENCE" | "UNSUPPORTED_LANGUAGE" | "NON_SSL_COMPLIANT" | "TEMPORARY_PAUSE" | "BAIL_BONDS" | "EXPERIMENTAL_MEDICAL_TREATMENT" | (string & {});
  /** Additional details about the reason for disapproval. */
  details?: Array<string>;
}

export const Disapproval: Schema.Schema<Disapproval> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Disapproval" }) as any as Schema.Schema<Disapproval>;

export interface ServingRestriction {
  /** The status of the creative in this context (for example, it has been explicitly disapproved or is pending review). */
  status?: "STATUS_UNSPECIFIED" | "DISAPPROVAL" | "PENDING_REVIEW" | (string & {});
  /** The contexts for the restriction. */
  contexts?: Array<ServingContext>;
  /** Any disapprovals bound to this restriction. Only present if status=DISAPPROVED. Can be used to filter the response of the creatives.list method. Deprecated; use disapproval field instead. */
  disapprovalReasons?: Array<Disapproval>;
  /** Disapproval bound to this restriction. Only present if status=DISAPPROVED. Can be used to filter the response of the creatives.list method. */
  disapproval?: Disapproval;
}

export const ServingRestriction: Schema.Schema<ServingRestriction> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  contexts: Schema.optional(Schema.Array(ServingContext)),
  disapprovalReasons: Schema.optional(Schema.Array(Disapproval)),
  disapproval: Schema.optional(Disapproval),
})).annotate({ identifier: "ServingRestriction" }) as any as Schema.Schema<ServingRestriction>;

export interface Correction {
  /** The type of correction that was applied to the creative. */
  type?: "CORRECTION_TYPE_UNSPECIFIED" | "VENDOR_IDS_ADDED" | "SSL_ATTRIBUTE_REMOVED" | "FLASH_FREE_ATTRIBUTE_REMOVED" | "FLASH_FREE_ATTRIBUTE_ADDED" | "REQUIRED_ATTRIBUTE_ADDED" | "REQUIRED_VENDOR_ADDED" | "SSL_ATTRIBUTE_ADDED" | "IN_BANNER_VIDEO_ATTRIBUTE_ADDED" | "MRAID_ATTRIBUTE_ADDED" | "FLASH_ATTRIBUTE_REMOVED" | "VIDEO_IN_SNIPPET_ATTRIBUTE_ADDED" | (string & {});
  /** Additional details about what was corrected. */
  details?: Array<string>;
  /** The contexts for the correction. */
  contexts?: Array<ServingContext>;
}

export const Correction: Schema.Schema<Correction> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.String)),
  contexts: Schema.optional(Schema.Array(ServingContext)),
})).annotate({ identifier: "Correction" }) as any as Schema.Schema<Correction>;

export interface AdTechnologyProviders {
  /** The detected ad technology provider IDs for this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/providers.csv for mapping of provider ID to provided name, a privacy policy URL, and a list of domains which can be attributed to the provider. If the creative contains provider IDs that are outside of those listed in the `BidRequest.adslot.consented_providers_settings.consented_providers` field on the (Google bid protocol)[https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto] and the `BidRequest.user.ext.consented_providers_settings.consented_providers` field on the (OpenRTB protocol)[https://developers.google.com/authorized-buyers/rtb/downloads/openrtb-adx-proto], and a bid is submitted with that creative for an impression that will serve to an EEA user, the bid will be filtered before the auction. */
  detectedProviderIds?: Array<string>;
  /** Whether the creative contains an unidentified ad technology provider. If true for a given creative, any bid submitted with that creative for an impression that will serve to an EEA user will be filtered before the auction. */
  hasUnidentifiedProvider?: boolean;
}

export const AdTechnologyProviders: Schema.Schema<AdTechnologyProviders> = Schema.suspend(() => Schema.Struct({
  detectedProviderIds: Schema.optional(Schema.Array(Schema.String)),
  hasUnidentifiedProvider: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdTechnologyProviders" }) as any as Schema.Schema<AdTechnologyProviders>;

export interface Creative {
  /** The account that this creative belongs to. Can be used to filter the response of the creatives.list method. */
  accountId?: string;
  /** The buyer-defined creative ID of this creative. Can be used to filter the response of the creatives.list method. */
  creativeId?: string;
  /** An HTML creative. */
  html?: HtmlContent;
  /** A video creative. */
  video?: VideoContent;
  /** A native creative. */
  native?: NativeContent;
  /** The agency ID for this creative. */
  agencyId?: string;
  /** The set of destination URLs for the creative. */
  clickThroughUrls?: Array<string>;
  /** The set of declared destination URLs for the creative. */
  declaredClickThroughUrls?: Array<string>;
  /** The set of URLs to be called to record an impression. */
  impressionTrackingUrls?: Array<string>;
  /** The link to AdChoices destination page. */
  adChoicesDestinationUrl?: string;
  /** All vendor IDs for the ads that may be shown from this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for possible values. */
  vendorIds?: Array<number>;
  /** All attributes for the ads that may be shown from this creative. Can be used to filter the response of the creatives.list method. */
  attributes?: Array<"ATTRIBUTE_UNSPECIFIED" | "IMAGE_RICH_MEDIA" | "ADOBE_FLASH_FLV" | "IS_TAGGED" | "IS_COOKIE_TARGETED" | "IS_USER_INTEREST_TARGETED" | "EXPANDING_DIRECTION_NONE" | "EXPANDING_DIRECTION_UP" | "EXPANDING_DIRECTION_DOWN" | "EXPANDING_DIRECTION_LEFT" | "EXPANDING_DIRECTION_RIGHT" | "EXPANDING_DIRECTION_UP_LEFT" | "EXPANDING_DIRECTION_UP_RIGHT" | "EXPANDING_DIRECTION_DOWN_LEFT" | "EXPANDING_DIRECTION_DOWN_RIGHT" | "CREATIVE_TYPE_HTML" | "CREATIVE_TYPE_VAST_VIDEO" | "EXPANDING_DIRECTION_UP_OR_DOWN" | "EXPANDING_DIRECTION_LEFT_OR_RIGHT" | "EXPANDING_DIRECTION_ANY_DIAGONAL" | "EXPANDING_ACTION_ROLLOVER_TO_EXPAND" | "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_MRAID" | "RICH_MEDIA_CAPABILITY_TYPE_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_HTML5" | "SKIPPABLE_INSTREAM_VIDEO" | "RICH_MEDIA_CAPABILITY_TYPE_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL" | "NON_SKIPPABLE_INSTREAM_VIDEO" | "NATIVE_ELIGIBILITY_ELIGIBLE" | "NON_VPAID" | "NATIVE_ELIGIBILITY_NOT_ELIGIBLE" | "ANY_INTERSTITIAL" | "NON_INTERSTITIAL" | "IN_BANNER_VIDEO" | "RENDERING_SIZELESS_ADX" | "OMSDK_1_0" | "RENDERING_PLAYABLE" | (string & {})>;
  /** All restricted categories for the ads that may be shown from this creative. */
  restrictedCategories?: Array<"NO_RESTRICTED_CATEGORIES" | "ALCOHOL" | (string & {})>;
  /** The name of the company being advertised in the creative. */
  advertiserName?: string;
  /** Output only. The top-level deals status of this creative. If disapproved, an entry for 'auctionType=DIRECT_DEALS' (or 'ALL') in serving_restrictions will also exist. Note that this may be nuanced with other contextual restrictions, in which case, it may be preferable to read from serving_restrictions directly. Can be used to filter the response of the creatives.list method. */
  dealsStatus?: "STATUS_UNSPECIFIED" | "NOT_CHECKED" | "CONDITIONALLY_APPROVED" | "APPROVED" | "DISAPPROVED" | "PENDING_REVIEW" | "STATUS_TYPE_UNSPECIFIED" | (string & {});
  /** Output only. The top-level open auction status of this creative. If disapproved, an entry for 'auctionType = OPEN_AUCTION' (or 'ALL') in serving_restrictions will also exist. Note that this may be nuanced with other contextual restrictions, in which case, it may be preferable to read from serving_restrictions directly. Can be used to filter the response of the creatives.list method. */
  openAuctionStatus?: "STATUS_UNSPECIFIED" | "NOT_CHECKED" | "CONDITIONALLY_APPROVED" | "APPROVED" | "DISAPPROVED" | "PENDING_REVIEW" | "STATUS_TYPE_UNSPECIFIED" | (string & {});
  /** Output only. The granular status of this ad in specific contexts. A context here relates to where something ultimately serves (for example, a physical location, a platform, an HTTPS versus HTTP request, or the type of auction). */
  servingRestrictions?: Array<ServingRestriction>;
  /** Output only. Detected advertiser IDs, if any. */
  detectedAdvertiserIds?: Array<string>;
  /** Output only. Detected product categories, if any. See the ad-product-categories.txt file in the technical documentation for a list of IDs. */
  detectedProductCategories?: Array<number>;
  /** Output only. The detected languages for this creative. The order is arbitrary. The codes are 2 or 5 characters and are documented at https://developers.google.com/adwords/api/docs/appendix/languagecodes. */
  detectedLanguages?: Array<string>;
  /** Output only. The detected domains for this creative. */
  detectedDomains?: Array<string>;
  /** Output only. Detected sensitive categories, if any. See the ad-sensitive-categories.txt file in the technical documentation for a list of IDs. You should use these IDs along with the excluded-sensitive-category field in the bid request to filter your bids. */
  detectedSensitiveCategories?: Array<number>;
  /** Output only. Shows any corrections that were applied to this creative. */
  corrections?: Array<Correction>;
  /** Output only. The detected ad technology providers. */
  adTechnologyProviders?: AdTechnologyProviders;
  /** Output only. The version of this creative. */
  version?: number;
  /** Output only. The last update timestamp of the creative through the API. */
  apiUpdateTime?: string;
}

export const Creative: Schema.Schema<Creative> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  creativeId: Schema.optional(Schema.String),
  html: Schema.optional(HtmlContent),
  video: Schema.optional(VideoContent),
  native: Schema.optional(NativeContent),
  agencyId: Schema.optional(Schema.String),
  clickThroughUrls: Schema.optional(Schema.Array(Schema.String)),
  declaredClickThroughUrls: Schema.optional(Schema.Array(Schema.String)),
  impressionTrackingUrls: Schema.optional(Schema.Array(Schema.String)),
  adChoicesDestinationUrl: Schema.optional(Schema.String),
  vendorIds: Schema.optional(Schema.Array(Schema.Number)),
  attributes: Schema.optional(Schema.Array(Schema.String)),
  restrictedCategories: Schema.optional(Schema.Array(Schema.String)),
  advertiserName: Schema.optional(Schema.String),
  dealsStatus: Schema.optional(Schema.String),
  openAuctionStatus: Schema.optional(Schema.String),
  servingRestrictions: Schema.optional(Schema.Array(ServingRestriction)),
  detectedAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
  detectedProductCategories: Schema.optional(Schema.Array(Schema.Number)),
  detectedLanguages: Schema.optional(Schema.Array(Schema.String)),
  detectedDomains: Schema.optional(Schema.Array(Schema.String)),
  detectedSensitiveCategories: Schema.optional(Schema.Array(Schema.Number)),
  corrections: Schema.optional(Schema.Array(Correction)),
  adTechnologyProviders: Schema.optional(AdTechnologyProviders),
  version: Schema.optional(Schema.Number),
  apiUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Creative" }) as any as Schema.Schema<Creative>;

export interface ListCreativesResponse {
  /** The list of creatives. */
  creatives?: Array<Creative>;
  /** A token to retrieve the next page of results. Pass this value in the ListCreativesRequest.page_token field in the subsequent call to `ListCreatives` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListCreativesResponse: Schema.Schema<ListCreativesResponse> = Schema.suspend(() => Schema.Struct({
  creatives: Schema.optional(Schema.Array(Creative)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCreativesResponse" }) as any as Schema.Schema<ListCreativesResponse>;

export interface CreativeDealAssociation {
  /** The account the creative belongs to. */
  accountId?: string;
  /** The ID of the creative associated with the deal. */
  creativeId?: string;
  /** The externalDealId for the deal associated with the creative. */
  dealsId?: string;
}

export const CreativeDealAssociation: Schema.Schema<CreativeDealAssociation> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  creativeId: Schema.optional(Schema.String),
  dealsId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeDealAssociation" }) as any as Schema.Schema<CreativeDealAssociation>;

export interface AddDealAssociationRequest {
  /** The association between a creative and a deal that should be added. */
  association?: CreativeDealAssociation;
}

export const AddDealAssociationRequest: Schema.Schema<AddDealAssociationRequest> = Schema.suspend(() => Schema.Struct({
  association: Schema.optional(CreativeDealAssociation),
})).annotate({ identifier: "AddDealAssociationRequest" }) as any as Schema.Schema<AddDealAssociationRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface RemoveDealAssociationRequest {
  /** The association between a creative and a deal that should be removed. */
  association?: CreativeDealAssociation;
}

export const RemoveDealAssociationRequest: Schema.Schema<RemoveDealAssociationRequest> = Schema.suspend(() => Schema.Struct({
  association: Schema.optional(CreativeDealAssociation),
})).annotate({ identifier: "RemoveDealAssociationRequest" }) as any as Schema.Schema<RemoveDealAssociationRequest>;

export interface ListDealAssociationsResponse {
  /** The list of associations. */
  associations?: Array<CreativeDealAssociation>;
  /** A token to retrieve the next page of results. Pass this value in the ListDealAssociationsRequest.page_token field in the subsequent call to 'ListDealAssociation' method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListDealAssociationsResponse: Schema.Schema<ListDealAssociationsResponse> = Schema.suspend(() => Schema.Struct({
  associations: Schema.optional(Schema.Array(CreativeDealAssociation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDealAssociationsResponse" }) as any as Schema.Schema<ListDealAssociationsResponse>;

export interface WatchCreativeRequest {
  /** The Pub/Sub topic to publish notifications to. This topic must already exist and must give permission to ad-exchange-buyside-reports@google.com to write to the topic. This should be the full resource name in "projects/{project_id}/topics/{topic_id}" format. */
  topic?: string;
}

export const WatchCreativeRequest: Schema.Schema<WatchCreativeRequest> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
})).annotate({ identifier: "WatchCreativeRequest" }) as any as Schema.Schema<WatchCreativeRequest>;

export interface StopWatchingCreativeRequest {
}

export const StopWatchingCreativeRequest: Schema.Schema<StopWatchingCreativeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopWatchingCreativeRequest" }) as any as Schema.Schema<StopWatchingCreativeRequest>;

export interface MetricValue {
  /** The expected value of the metric. */
  value?: string;
  /** The variance (for example, square of the standard deviation) of the metric value. If value is exact, variance is 0. Can be used to calculate margin of error as a percentage of value, using the following formula, where Z is the standard constant that depends on the preferred size of the confidence interval (for example, for 90% confidence interval, use Z = 1.645): marginOfError = 100 * Z * sqrt(variance) / value */
  variance?: string;
}

export const MetricValue: Schema.Schema<MetricValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  variance: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricValue" }) as any as Schema.Schema<MetricValue>;

export interface TimeInterval {
  /** The timestamp marking the start of the range (inclusive) for which data is included. */
  startTime?: string;
  /** The timestamp marking the end of the range (exclusive) for which data is included. */
  endTime?: string;
}

export const TimeInterval: Schema.Schema<TimeInterval> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeInterval" }) as any as Schema.Schema<TimeInterval>;

export interface RowDimensions {
  /** The time interval that this row represents. */
  timeInterval?: TimeInterval;
  /** The publisher identifier for this row, if a breakdown by [BreakdownDimension.PUBLISHER_IDENTIFIER](https://developers.google.com/authorized-buyers/apis/reference/rest/v2beta1/bidders.accounts.filterSets#FilterSet.BreakdownDimension) was requested. */
  publisherIdentifier?: string;
}

export const RowDimensions: Schema.Schema<RowDimensions> = Schema.suspend(() => Schema.Struct({
  timeInterval: Schema.optional(TimeInterval),
  publisherIdentifier: Schema.optional(Schema.String),
})).annotate({ identifier: "RowDimensions" }) as any as Schema.Schema<RowDimensions>;

export interface ImpressionMetricsRow {
  /** The number of impressions available to the buyer on Ad Exchange. In some cases this value may be unavailable. */
  availableImpressions?: MetricValue;
  /** The number of impressions that match the buyer's inventory pretargeting. */
  inventoryMatches?: MetricValue;
  /** The number of impressions for which Ad Exchange sent the buyer a bid request. */
  bidRequests?: MetricValue;
  /** The number of impressions for which the buyer successfully sent a response to Ad Exchange. */
  successfulResponses?: MetricValue;
  /** The number of impressions for which Ad Exchange received a response from the buyer that contained at least one applicable bid. */
  responsesWithBids?: MetricValue;
  /** The values of all dimensions associated with metric values in this row. */
  rowDimensions?: RowDimensions;
}

export const ImpressionMetricsRow: Schema.Schema<ImpressionMetricsRow> = Schema.suspend(() => Schema.Struct({
  availableImpressions: Schema.optional(MetricValue),
  inventoryMatches: Schema.optional(MetricValue),
  bidRequests: Schema.optional(MetricValue),
  successfulResponses: Schema.optional(MetricValue),
  responsesWithBids: Schema.optional(MetricValue),
  rowDimensions: Schema.optional(RowDimensions),
})).annotate({ identifier: "ImpressionMetricsRow" }) as any as Schema.Schema<ImpressionMetricsRow>;

export interface ListImpressionMetricsResponse {
  /** List of rows, each containing a set of impression metrics. */
  impressionMetricsRows?: Array<ImpressionMetricsRow>;
  /** A token to retrieve the next page of results. Pass this value in the ListImpressionMetricsRequest.pageToken field in the subsequent call to the impressionMetrics.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListImpressionMetricsResponse: Schema.Schema<ListImpressionMetricsResponse> = Schema.suspend(() => Schema.Struct({
  impressionMetricsRows: Schema.optional(Schema.Array(ImpressionMetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListImpressionMetricsResponse" }) as any as Schema.Schema<ListImpressionMetricsResponse>;

export interface BidMetricsRow {
  /** The number of bids that Ad Exchange received from the buyer. */
  bids?: MetricValue;
  /** The number of bids that were permitted to compete in the auction. */
  bidsInAuction?: MetricValue;
  /** The number of bids that won the auction. */
  impressionsWon?: MetricValue;
  /** The number of bids that won the auction and also won the mediation waterfall (if any). */
  reachedQueries?: MetricValue;
  /** The number of bids for which the buyer was billed. Also called valid impressions as invalid impressions are not billed. */
  billedImpressions?: MetricValue;
  /** The number of bids for which the corresponding impression was measurable for viewability (as defined by Active View). */
  measurableImpressions?: MetricValue;
  /** The number of bids for which the corresponding impression was viewable (as defined by Active View). */
  viewableImpressions?: MetricValue;
  /** The values of all dimensions associated with metric values in this row. */
  rowDimensions?: RowDimensions;
}

export const BidMetricsRow: Schema.Schema<BidMetricsRow> = Schema.suspend(() => Schema.Struct({
  bids: Schema.optional(MetricValue),
  bidsInAuction: Schema.optional(MetricValue),
  impressionsWon: Schema.optional(MetricValue),
  reachedQueries: Schema.optional(MetricValue),
  billedImpressions: Schema.optional(MetricValue),
  measurableImpressions: Schema.optional(MetricValue),
  viewableImpressions: Schema.optional(MetricValue),
  rowDimensions: Schema.optional(RowDimensions),
})).annotate({ identifier: "BidMetricsRow" }) as any as Schema.Schema<BidMetricsRow>;

export interface ListBidMetricsResponse {
  /** List of rows, each containing a set of bid metrics. */
  bidMetricsRows?: Array<BidMetricsRow>;
  /** A token to retrieve the next page of results. Pass this value in the ListBidMetricsRequest.pageToken field in the subsequent call to the bidMetrics.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListBidMetricsResponse: Schema.Schema<ListBidMetricsResponse> = Schema.suspend(() => Schema.Struct({
  bidMetricsRows: Schema.optional(Schema.Array(BidMetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBidMetricsResponse" }) as any as Schema.Schema<ListBidMetricsResponse>;

export interface CalloutStatusRow {
  /** The number of impressions for which there was a bid request or bid response with the specified callout status. */
  impressionCount?: MetricValue;
  /** The ID of the callout status. See [callout-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/callout-status-codes). */
  calloutStatusId?: number;
  /** The values of all dimensions associated with metric values in this row. */
  rowDimensions?: RowDimensions;
}

export const CalloutStatusRow: Schema.Schema<CalloutStatusRow> = Schema.suspend(() => Schema.Struct({
  impressionCount: Schema.optional(MetricValue),
  calloutStatusId: Schema.optional(Schema.Number),
  rowDimensions: Schema.optional(RowDimensions),
})).annotate({ identifier: "CalloutStatusRow" }) as any as Schema.Schema<CalloutStatusRow>;

export interface ListFilteredBidRequestsResponse {
  /** List of rows, with counts of filtered bid requests aggregated by callout status. */
  calloutStatusRows?: Array<CalloutStatusRow>;
  /** A token to retrieve the next page of results. Pass this value in the ListFilteredBidRequestsRequest.pageToken field in the subsequent call to the filteredBidRequests.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListFilteredBidRequestsResponse: Schema.Schema<ListFilteredBidRequestsResponse> = Schema.suspend(() => Schema.Struct({
  calloutStatusRows: Schema.optional(Schema.Array(CalloutStatusRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFilteredBidRequestsResponse" }) as any as Schema.Schema<ListFilteredBidRequestsResponse>;

export interface ListBidResponseErrorsResponse {
  /** List of rows, with counts of bid responses aggregated by callout status. */
  calloutStatusRows?: Array<CalloutStatusRow>;
  /** A token to retrieve the next page of results. Pass this value in the ListBidResponseErrorsRequest.pageToken field in the subsequent call to the bidResponseErrors.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListBidResponseErrorsResponse: Schema.Schema<ListBidResponseErrorsResponse> = Schema.suspend(() => Schema.Struct({
  calloutStatusRows: Schema.optional(Schema.Array(CalloutStatusRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBidResponseErrorsResponse" }) as any as Schema.Schema<ListBidResponseErrorsResponse>;

export interface BidResponseWithoutBidsStatusRow {
  /** The number of impressions for which there was a bid response with the specified status. */
  impressionCount?: MetricValue;
  /** The status specifying why the bid responses were considered to have no applicable bids. */
  status?: "STATUS_UNSPECIFIED" | "RESPONSES_WITHOUT_BIDS" | "RESPONSES_WITHOUT_BIDS_FOR_ACCOUNT" | "RESPONSES_WITHOUT_BIDS_FOR_DEAL" | (string & {});
  /** The values of all dimensions associated with metric values in this row. */
  rowDimensions?: RowDimensions;
}

export const BidResponseWithoutBidsStatusRow: Schema.Schema<BidResponseWithoutBidsStatusRow> = Schema.suspend(() => Schema.Struct({
  impressionCount: Schema.optional(MetricValue),
  status: Schema.optional(Schema.String),
  rowDimensions: Schema.optional(RowDimensions),
})).annotate({ identifier: "BidResponseWithoutBidsStatusRow" }) as any as Schema.Schema<BidResponseWithoutBidsStatusRow>;

export interface ListBidResponsesWithoutBidsResponse {
  /** List of rows, with counts of bid responses without bids aggregated by status. */
  bidResponseWithoutBidsStatusRows?: Array<BidResponseWithoutBidsStatusRow>;
  /** A token to retrieve the next page of results. Pass this value in the ListBidResponsesWithoutBidsRequest.pageToken field in the subsequent call to the bidResponsesWithoutBids.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListBidResponsesWithoutBidsResponse: Schema.Schema<ListBidResponsesWithoutBidsResponse> = Schema.suspend(() => Schema.Struct({
  bidResponseWithoutBidsStatusRows: Schema.optional(Schema.Array(BidResponseWithoutBidsStatusRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBidResponsesWithoutBidsResponse" }) as any as Schema.Schema<ListBidResponsesWithoutBidsResponse>;

export interface CreativeStatusRow {
  /** The number of bids with the specified status. */
  bidCount?: MetricValue;
  /** The ID of the creative status. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes). */
  creativeStatusId?: number;
  /** The values of all dimensions associated with metric values in this row. */
  rowDimensions?: RowDimensions;
}

export const CreativeStatusRow: Schema.Schema<CreativeStatusRow> = Schema.suspend(() => Schema.Struct({
  bidCount: Schema.optional(MetricValue),
  creativeStatusId: Schema.optional(Schema.Number),
  rowDimensions: Schema.optional(RowDimensions),
})).annotate({ identifier: "CreativeStatusRow" }) as any as Schema.Schema<CreativeStatusRow>;

export interface ListFilteredBidsResponse {
  /** List of rows, with counts of filtered bids aggregated by filtering reason (for example, creative status). */
  creativeStatusRows?: Array<CreativeStatusRow>;
  /** A token to retrieve the next page of results. Pass this value in the ListFilteredBidsRequest.pageToken field in the subsequent call to the filteredBids.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListFilteredBidsResponse: Schema.Schema<ListFilteredBidsResponse> = Schema.suspend(() => Schema.Struct({
  creativeStatusRows: Schema.optional(Schema.Array(CreativeStatusRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFilteredBidsResponse" }) as any as Schema.Schema<ListFilteredBidsResponse>;

export interface ListLosingBidsResponse {
  /** List of rows, with counts of losing bids aggregated by loss reason (for example, creative status). */
  creativeStatusRows?: Array<CreativeStatusRow>;
  /** A token to retrieve the next page of results. Pass this value in the ListLosingBidsRequest.pageToken field in the subsequent call to the losingBids.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListLosingBidsResponse: Schema.Schema<ListLosingBidsResponse> = Schema.suspend(() => Schema.Struct({
  creativeStatusRows: Schema.optional(Schema.Array(CreativeStatusRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLosingBidsResponse" }) as any as Schema.Schema<ListLosingBidsResponse>;

export interface NonBillableWinningBidStatusRow {
  /** The number of bids with the specified status. */
  bidCount?: MetricValue;
  /** The status specifying why the winning bids were not billed. */
  status?: "STATUS_UNSPECIFIED" | "AD_NOT_RENDERED" | "INVALID_IMPRESSION" | "FATAL_VAST_ERROR" | "LOST_IN_MEDIATION" | "OVERDELIVERED_IMPRESSION" | (string & {});
  /** The values of all dimensions associated with metric values in this row. */
  rowDimensions?: RowDimensions;
}

export const NonBillableWinningBidStatusRow: Schema.Schema<NonBillableWinningBidStatusRow> = Schema.suspend(() => Schema.Struct({
  bidCount: Schema.optional(MetricValue),
  status: Schema.optional(Schema.String),
  rowDimensions: Schema.optional(RowDimensions),
})).annotate({ identifier: "NonBillableWinningBidStatusRow" }) as any as Schema.Schema<NonBillableWinningBidStatusRow>;

export interface ListNonBillableWinningBidsResponse {
  /** List of rows, with counts of bids not billed aggregated by reason. */
  nonBillableWinningBidStatusRows?: Array<NonBillableWinningBidStatusRow>;
  /** A token to retrieve the next page of results. Pass this value in the ListNonBillableWinningBidsRequest.pageToken field in the subsequent call to the nonBillableWinningBids.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListNonBillableWinningBidsResponse: Schema.Schema<ListNonBillableWinningBidsResponse> = Schema.suspend(() => Schema.Struct({
  nonBillableWinningBidStatusRows: Schema.optional(Schema.Array(NonBillableWinningBidStatusRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNonBillableWinningBidsResponse" }) as any as Schema.Schema<ListNonBillableWinningBidsResponse>;

export interface FilteredBidDetailRow {
  /** The number of bids with the specified detail. */
  bidCount?: MetricValue;
  /** Note: this field will be deprecated, use "detail" field instead. When "detail" field represents an integer value, this field is populated as the same integer value "detail" field represents, otherwise this field will be 0. The ID of the detail. The associated value can be looked up in the dictionary file corresponding to the DetailType in the response message. */
  detailId?: number;
  /** The ID of the detail, can be numeric or text. The associated value can be looked up in the dictionary file corresponding to the DetailType in the response message. */
  detail?: string;
  /** The values of all dimensions associated with metric values in this row. */
  rowDimensions?: RowDimensions;
}

export const FilteredBidDetailRow: Schema.Schema<FilteredBidDetailRow> = Schema.suspend(() => Schema.Struct({
  bidCount: Schema.optional(MetricValue),
  detailId: Schema.optional(Schema.Number),
  detail: Schema.optional(Schema.String),
  rowDimensions: Schema.optional(RowDimensions),
})).annotate({ identifier: "FilteredBidDetailRow" }) as any as Schema.Schema<FilteredBidDetailRow>;

export interface ListCreativeStatusBreakdownByDetailResponse {
  /** List of rows, with counts of bids with a given creative status aggregated by detail. */
  filteredBidDetailRows?: Array<FilteredBidDetailRow>;
  /** The type of detail that the detail IDs represent. */
  detailType?: "DETAIL_TYPE_UNSPECIFIED" | "CREATIVE_ATTRIBUTE" | "VENDOR" | "SENSITIVE_CATEGORY" | "PRODUCT_CATEGORY" | "DISAPPROVAL_REASON" | "POLICY_TOPIC" | "ATP_VENDOR" | "VENDOR_DOMAIN" | "GVL_ID" | (string & {});
  /** A token to retrieve the next page of results. Pass this value in the ListCreativeStatusBreakdownByDetailRequest.pageToken field in the subsequent call to the filteredBids.details.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListCreativeStatusBreakdownByDetailResponse: Schema.Schema<ListCreativeStatusBreakdownByDetailResponse> = Schema.suspend(() => Schema.Struct({
  filteredBidDetailRows: Schema.optional(Schema.Array(FilteredBidDetailRow)),
  detailType: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCreativeStatusBreakdownByDetailResponse" }) as any as Schema.Schema<ListCreativeStatusBreakdownByDetailResponse>;

export interface FilteredBidCreativeRow {
  /** The number of bids with the specified creative. */
  bidCount?: MetricValue;
  /** The ID of the creative. */
  creativeId?: string;
  /** The values of all dimensions associated with metric values in this row. */
  rowDimensions?: RowDimensions;
}

export const FilteredBidCreativeRow: Schema.Schema<FilteredBidCreativeRow> = Schema.suspend(() => Schema.Struct({
  bidCount: Schema.optional(MetricValue),
  creativeId: Schema.optional(Schema.String),
  rowDimensions: Schema.optional(RowDimensions),
})).annotate({ identifier: "FilteredBidCreativeRow" }) as any as Schema.Schema<FilteredBidCreativeRow>;

export interface ListCreativeStatusBreakdownByCreativeResponse {
  /** List of rows, with counts of bids with a given creative status aggregated by creative. */
  filteredBidCreativeRows?: Array<FilteredBidCreativeRow>;
  /** A token to retrieve the next page of results. Pass this value in the ListCreativeStatusBreakdownByCreativeRequest.pageToken field in the subsequent call to the filteredBids.creatives.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListCreativeStatusBreakdownByCreativeResponse: Schema.Schema<ListCreativeStatusBreakdownByCreativeResponse> = Schema.suspend(() => Schema.Struct({
  filteredBidCreativeRows: Schema.optional(Schema.Array(FilteredBidCreativeRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCreativeStatusBreakdownByCreativeResponse" }) as any as Schema.Schema<ListCreativeStatusBreakdownByCreativeResponse>;

export interface Client {
  /** The globally-unique numerical ID of the client. The value of this field is ignored in create and update operations. */
  clientAccountId?: string;
  /** The role which is assigned to the client buyer. Each role implies a set of permissions granted to the client. Must be one of `CLIENT_DEAL_VIEWER`, `CLIENT_DEAL_NEGOTIATOR` or `CLIENT_DEAL_APPROVER`. */
  role?: "CLIENT_ROLE_UNSPECIFIED" | "CLIENT_DEAL_VIEWER" | "CLIENT_DEAL_NEGOTIATOR" | "CLIENT_DEAL_APPROVER" | (string & {});
  /** The status of the client buyer. */
  status?: "CLIENT_STATUS_UNSPECIFIED" | "DISABLED" | "ACTIVE" | (string & {});
  /** Name used to represent this client to publishers. You may have multiple clients that map to the same entity, but for each client the combination of `clientName` and entity must be unique. You can specify this field as empty. Maximum length of 255 characters is allowed. */
  clientName?: string;
  /** Whether the client buyer will be visible to sellers. */
  visibleToSeller?: boolean;
  /** An optional field for specifying the type of the client entity: `ADVERTISER`, `BRAND`, or `AGENCY`. */
  entityType?: "ENTITY_TYPE_UNSPECIFIED" | "ADVERTISER" | "BRAND" | "AGENCY" | "ENTITY_TYPE_UNCLASSIFIED" | (string & {});
  /** Numerical identifier of the client entity. The entity can be an advertiser, a brand, or an agency. This identifier is unique among all the entities with the same type. The value of this field is ignored if the entity type is not provided. A list of all known advertisers with their identifiers is available in the [advertisers.txt](https://storage.googleapis.com/adx-rtb-dictionaries/advertisers.txt) file. A list of all known brands with their identifiers is available in the [brands.txt](https://storage.googleapis.com/adx-rtb-dictionaries/brands.txt) file. A list of all known agencies with their identifiers is available in the [agencies.txt](https://storage.googleapis.com/adx-rtb-dictionaries/agencies.txt) file. */
  entityId?: string;
  /** The name of the entity. This field is automatically fetched based on the type and ID. The value of this field is ignored in create and update operations. */
  entityName?: string;
  /** Optional arbitrary unique identifier of this client buyer from the standpoint of its Ad Exchange sponsor buyer. This field can be used to associate a client buyer with the identifier in the namespace of its sponsor buyer, lookup client buyers by that identifier and verify whether an Ad Exchange counterpart of a given client buyer already exists. If present, must be unique among all the client buyers for its Ad Exchange sponsor buyer. */
  partnerClientId?: string;
}

export const Client: Schema.Schema<Client> = Schema.suspend(() => Schema.Struct({
  clientAccountId: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  clientName: Schema.optional(Schema.String),
  visibleToSeller: Schema.optional(Schema.Boolean),
  entityType: Schema.optional(Schema.String),
  entityId: Schema.optional(Schema.String),
  entityName: Schema.optional(Schema.String),
  partnerClientId: Schema.optional(Schema.String),
})).annotate({ identifier: "Client" }) as any as Schema.Schema<Client>;

export interface ListClientsResponse {
  /** The returned list of clients. */
  clients?: Array<Client>;
  /** A token to retrieve the next page of results. Pass this value in the ListClientsRequest.pageToken field in the subsequent call to the accounts.clients.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListClientsResponse: Schema.Schema<ListClientsResponse> = Schema.suspend(() => Schema.Struct({
  clients: Schema.optional(Schema.Array(Client)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListClientsResponse" }) as any as Schema.Schema<ListClientsResponse>;

export interface ClientUser {
  /** The unique numerical ID of the client user that has accepted an invitation. The value of this field is ignored in an update operation. */
  userId?: string;
  /** Numerical account ID of the client buyer with which the user is associated; the buyer must be a client of the current sponsor buyer. The value of this field is ignored in an update operation. */
  clientAccountId?: string;
  /** The status of the client user. */
  status?: "USER_STATUS_UNSPECIFIED" | "PENDING" | "ACTIVE" | "DISABLED" | (string & {});
  /** User's email address. The value of this field is ignored in an update operation. */
  email?: string;
}

export const ClientUser: Schema.Schema<ClientUser> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
  clientAccountId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "ClientUser" }) as any as Schema.Schema<ClientUser>;

export interface ListClientUsersResponse {
  /** The returned list of client users. */
  users?: Array<ClientUser>;
  /** A token to retrieve the next page of results. Pass this value in the ListClientUsersRequest.pageToken field in the subsequent call to the clients.invitations.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListClientUsersResponse: Schema.Schema<ListClientUsersResponse> = Schema.suspend(() => Schema.Struct({
  users: Schema.optional(Schema.Array(ClientUser)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListClientUsersResponse" }) as any as Schema.Schema<ListClientUsersResponse>;

export interface ClientUserInvitation {
  /** The unique numerical ID of the invitation that is sent to the user. The value of this field is ignored in create operations. */
  invitationId?: string;
  /** The email address to which the invitation is sent. Email addresses should be unique among all client users under each sponsor buyer. */
  email?: string;
  /** Numerical account ID of the client buyer that the invited user is associated with. The value of this field is ignored in create operations. */
  clientAccountId?: string;
}

export const ClientUserInvitation: Schema.Schema<ClientUserInvitation> = Schema.suspend(() => Schema.Struct({
  invitationId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  clientAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "ClientUserInvitation" }) as any as Schema.Schema<ClientUserInvitation>;

export interface ListClientUserInvitationsResponse {
  /** The returned list of client users. */
  invitations?: Array<ClientUserInvitation>;
  /** A token to retrieve the next page of results. Pass this value in the ListClientUserInvitationsRequest.pageToken field in the subsequent call to the clients.invitations.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListClientUserInvitationsResponse: Schema.Schema<ListClientUserInvitationsResponse> = Schema.suspend(() => Schema.Struct({
  invitations: Schema.optional(Schema.Array(ClientUserInvitation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListClientUserInvitationsResponse" }) as any as Schema.Schema<ListClientUserInvitationsResponse>;

export interface RelativeDateRange {
  /** The end date of the filter set, specified as the number of days before today, for example, for a range where the last date is today: 0. */
  offsetDays?: number;
  /** The number of days in the requested date range, for example, for a range spanning today: 1. For a range spanning the last 7 days: 7. */
  durationDays?: number;
}

export const RelativeDateRange: Schema.Schema<RelativeDateRange> = Schema.suspend(() => Schema.Struct({
  offsetDays: Schema.optional(Schema.Number),
  durationDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "RelativeDateRange" }) as any as Schema.Schema<RelativeDateRange>;

export interface Adexchangebuyer2_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Adexchangebuyer2_Date: Schema.Schema<Adexchangebuyer2_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Adexchangebuyer2_Date" }) as any as Schema.Schema<Adexchangebuyer2_Date>;

export interface AbsoluteDateRange {
  /** The start date of the range (inclusive). Must be within the 30 days leading up to current date, and must be equal to or before end_date. */
  startDate?: Adexchangebuyer2_Date;
  /** The end date of the range (inclusive). Must be within the 30 days leading up to current date, and must be equal to or after start_date. */
  endDate?: Adexchangebuyer2_Date;
}

export const AbsoluteDateRange: Schema.Schema<AbsoluteDateRange> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Adexchangebuyer2_Date),
  endDate: Schema.optional(Adexchangebuyer2_Date),
})).annotate({ identifier: "AbsoluteDateRange" }) as any as Schema.Schema<AbsoluteDateRange>;

export interface RealtimeTimeRange {
  /** The start timestamp of the real-time RTB metrics aggregation. */
  startTimestamp?: string;
}

export const RealtimeTimeRange: Schema.Schema<RealtimeTimeRange> = Schema.suspend(() => Schema.Struct({
  startTimestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "RealtimeTimeRange" }) as any as Schema.Schema<RealtimeTimeRange>;

export interface FilterSet {
  /** A user-defined name of the filter set. Filter set names must be unique globally and match one of the patterns: - `bidders/* /filterSets/*` (for accessing bidder-level troubleshooting data) - `bidders/* /accounts/* /filterSets/*` (for accessing account-level troubleshooting data) This field is required in create operations. */
  name?: string;
  /** A relative date range, defined by an offset from today and a duration. Interpreted relative to Pacific time zone. */
  relativeDateRange?: RelativeDateRange;
  /** An absolute date range, defined by a start date and an end date. Interpreted relative to Pacific time zone. */
  absoluteDateRange?: AbsoluteDateRange;
  /** An open-ended realtime time range, defined by the aggregation start timestamp. */
  realtimeTimeRange?: RealtimeTimeRange;
  /** The granularity of time intervals if a time series breakdown is preferred; optional. */
  timeSeriesGranularity?: "TIME_SERIES_GRANULARITY_UNSPECIFIED" | "HOURLY" | "DAILY" | (string & {});
  /** The ID of the creative on which to filter; optional. This field may be set only for a filter set that accesses account-level troubleshooting data, for example, one whose name matches the `bidders/* /accounts/* /filterSets/*` pattern. */
  creativeId?: string;
  /** The ID of the deal on which to filter; optional. This field may be set only for a filter set that accesses account-level troubleshooting data, for example, one whose name matches the `bidders/* /accounts/* /filterSets/*` pattern. */
  dealId?: string;
  /** Creative formats bidded on or allowed to bid on, can be empty. Although this field is a list, it can only be populated with a single item. A HTTP 400 bad request error will be returned in the response if you specify multiple items. */
  formats?: Array<"FORMAT_UNSPECIFIED" | "NATIVE_DISPLAY" | "NATIVE_VIDEO" | "NON_NATIVE_DISPLAY" | "NON_NATIVE_VIDEO" | (string & {})>;
  /** Creative format bidded on or allowed to bid on, can be empty. */
  format?: "FORMAT_UNSPECIFIED" | "NATIVE_DISPLAY" | "NATIVE_VIDEO" | "NON_NATIVE_DISPLAY" | "NON_NATIVE_VIDEO" | (string & {});
  /** The environment on which to filter; optional. */
  environment?: "ENVIRONMENT_UNSPECIFIED" | "WEB" | "APP" | (string & {});
  /** The list of platforms on which to filter; may be empty. The filters represented by multiple platforms are ORed together (for example, if non-empty, results must match any one of the platforms). */
  platforms?: Array<"PLATFORM_UNSPECIFIED" | "DESKTOP" | "TABLET" | "MOBILE" | (string & {})>;
  /** For Authorized Buyers only. The list of IDs of the seller (publisher) networks on which to filter; may be empty. The filters represented by multiple seller network IDs are ORed together (for example, if non-empty, results must match any one of the publisher networks). See [seller-network-ids](https://developers.google.com/authorized-buyers/rtb/downloads/seller-network-ids) file for the set of existing seller network IDs. */
  sellerNetworkIds?: Array<number>;
  /** For Open Bidding partners only. The list of publisher identifiers on which to filter; may be empty. The filters represented by multiple publisher identifiers are ORed together. */
  publisherIdentifiers?: Array<string>;
  /** The set of dimensions along which to break down the response; may be empty. If multiple dimensions are requested, the breakdown is along the Cartesian product of the requested dimensions. */
  breakdownDimensions?: Array<"BREAKDOWN_DIMENSION_UNSPECIFIED" | "PUBLISHER_IDENTIFIER" | (string & {})>;
}

export const FilterSet: Schema.Schema<FilterSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  relativeDateRange: Schema.optional(RelativeDateRange),
  absoluteDateRange: Schema.optional(AbsoluteDateRange),
  realtimeTimeRange: Schema.optional(RealtimeTimeRange),
  timeSeriesGranularity: Schema.optional(Schema.String),
  creativeId: Schema.optional(Schema.String),
  dealId: Schema.optional(Schema.String),
  formats: Schema.optional(Schema.Array(Schema.String)),
  format: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  platforms: Schema.optional(Schema.Array(Schema.String)),
  sellerNetworkIds: Schema.optional(Schema.Array(Schema.Number)),
  publisherIdentifiers: Schema.optional(Schema.Array(Schema.String)),
  breakdownDimensions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FilterSet" }) as any as Schema.Schema<FilterSet>;

export interface ListFilterSetsResponse {
  /** The filter sets belonging to the buyer. */
  filterSets?: Array<FilterSet>;
  /** A token to retrieve the next page of results. Pass this value in the ListFilterSetsRequest.pageToken field in the subsequent call to the accounts.filterSets.list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListFilterSetsResponse: Schema.Schema<ListFilterSetsResponse> = Schema.suspend(() => Schema.Struct({
  filterSets: Schema.optional(Schema.Array(FilterSet)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFilterSetsResponse" }) as any as Schema.Schema<ListFilterSetsResponse>;

export interface PrivateData {
  /** A buyer or seller specified reference ID. This can be queried in the list operations (max-length: 1024 unicode code units). */
  referenceId?: string;
}

export const PrivateData: Schema.Schema<PrivateData> = Schema.suspend(() => Schema.Struct({
  referenceId: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateData" }) as any as Schema.Schema<PrivateData>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface Price {
  /** The pricing type for the deal/product. (default: CPM) */
  pricingType?: "PRICING_TYPE_UNSPECIFIED" | "COST_PER_MILLE" | "COST_PER_DAY" | (string & {});
  /** The actual price with currency specified. */
  amount?: Money;
}

export const Price: Schema.Schema<Price> = Schema.suspend(() => Schema.Struct({
  pricingType: Schema.optional(Schema.String),
  amount: Schema.optional(Money),
})).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface Buyer {
  /** Authorized Buyers account ID of the buyer. */
  accountId?: string;
}

export const Buyer: Schema.Schema<Buyer> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
})).annotate({ identifier: "Buyer" }) as any as Schema.Schema<Buyer>;

export interface PricePerBuyer {
  /** The specified price. */
  price?: Price;
  /** The buyer who will pay this price. If unset, all buyers can pay this price (if the advertisers match, and there's no more specific rule matching the buyer). */
  buyer?: Buyer;
  /** The list of advertisers for this price when associated with this buyer. If empty, all advertisers with this buyer pay this price. */
  advertiserIds?: Array<string>;
}

export const PricePerBuyer: Schema.Schema<PricePerBuyer> = Schema.suspend(() => Schema.Struct({
  price: Schema.optional(Price),
  buyer: Schema.optional(Buyer),
  advertiserIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PricePerBuyer" }) as any as Schema.Schema<PricePerBuyer>;

export interface GuaranteedFixedPriceTerms {
  /** Count of guaranteed looks. Required for deal, optional for product. For CPD deals, buyer changes to guaranteed_looks will be ignored. */
  guaranteedLooks?: string;
  /** Guaranteed impressions as a percentage. This is the percentage of guaranteed looks that the buyer is guaranteeing to buy. */
  guaranteedImpressions?: string;
  /** Fixed price for the specified buyer. */
  fixedPrices?: Array<PricePerBuyer>;
  /** Daily minimum looks for CPD deal types. For CPD deals, buyer should negotiate on this field instead of guaranteed_looks. */
  minimumDailyLooks?: string;
  /** The reservation type for a Programmatic Guaranteed deal. This indicates whether the number of impressions is fixed, or a percent of available impressions. If not specified, the default reservation type is STANDARD. */
  reservationType?: "RESERVATION_TYPE_UNSPECIFIED" | "STANDARD" | "SPONSORSHIP" | (string & {});
  /** The lifetime impression cap for CPM sponsorship deals. The deal will stop serving when the cap is reached. */
  impressionCap?: string;
  /** For sponsorship deals, this is the percentage of the seller's eligible impressions that the deal will serve until the cap is reached. */
  percentShareOfVoice?: string;
}

export const GuaranteedFixedPriceTerms: Schema.Schema<GuaranteedFixedPriceTerms> = Schema.suspend(() => Schema.Struct({
  guaranteedLooks: Schema.optional(Schema.String),
  guaranteedImpressions: Schema.optional(Schema.String),
  fixedPrices: Schema.optional(Schema.Array(PricePerBuyer)),
  minimumDailyLooks: Schema.optional(Schema.String),
  reservationType: Schema.optional(Schema.String),
  impressionCap: Schema.optional(Schema.String),
  percentShareOfVoice: Schema.optional(Schema.String),
})).annotate({ identifier: "GuaranteedFixedPriceTerms" }) as any as Schema.Schema<GuaranteedFixedPriceTerms>;

export interface NonGuaranteedFixedPriceTerms {
  /** Fixed price for the specified buyer. */
  fixedPrices?: Array<PricePerBuyer>;
}

export const NonGuaranteedFixedPriceTerms: Schema.Schema<NonGuaranteedFixedPriceTerms> = Schema.suspend(() => Schema.Struct({
  fixedPrices: Schema.optional(Schema.Array(PricePerBuyer)),
})).annotate({ identifier: "NonGuaranteedFixedPriceTerms" }) as any as Schema.Schema<NonGuaranteedFixedPriceTerms>;

export interface NonGuaranteedAuctionTerms {
  /** Reserve price for the specified buyer. */
  reservePricesPerBuyer?: Array<PricePerBuyer>;
  /** True if open auction buyers are allowed to compete with invited buyers in this private auction. */
  autoOptimizePrivateAuction?: boolean;
}

export const NonGuaranteedAuctionTerms: Schema.Schema<NonGuaranteedAuctionTerms> = Schema.suspend(() => Schema.Struct({
  reservePricesPerBuyer: Schema.optional(Schema.Array(PricePerBuyer)),
  autoOptimizePrivateAuction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NonGuaranteedAuctionTerms" }) as any as Schema.Schema<NonGuaranteedAuctionTerms>;

export interface DealTerms {
  /** Publisher provided description for the terms. */
  description?: string;
  /** Visibility of the URL in bid requests. (default: BRANDED) */
  brandingType?: "BRANDING_TYPE_UNSPECIFIED" | "BRANDED" | "SEMI_TRANSPARENT" | (string & {});
  /** Non-binding estimate of the estimated gross spend for this deal. Can be set by buyer or seller. */
  estimatedGrossSpend?: Price;
  /** Non-binding estimate of the impressions served per day. Can be set by buyer or seller. */
  estimatedImpressionsPerDay?: string;
  /** The time zone name. For deals with Cost Per Day billing, defines the time zone used to mark the boundaries of a day. It should be an IANA TZ name, such as "America/Los_Angeles". For more information, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones. */
  sellerTimeZone?: string;
  /** The terms for guaranteed fixed price deals. */
  guaranteedFixedPriceTerms?: GuaranteedFixedPriceTerms;
  /** The terms for non-guaranteed fixed price deals. */
  nonGuaranteedFixedPriceTerms?: NonGuaranteedFixedPriceTerms;
  /** The terms for non-guaranteed auction deals. */
  nonGuaranteedAuctionTerms?: NonGuaranteedAuctionTerms;
}

export const DealTerms: Schema.Schema<DealTerms> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  brandingType: Schema.optional(Schema.String),
  estimatedGrossSpend: Schema.optional(Price),
  estimatedImpressionsPerDay: Schema.optional(Schema.String),
  sellerTimeZone: Schema.optional(Schema.String),
  guaranteedFixedPriceTerms: Schema.optional(GuaranteedFixedPriceTerms),
  nonGuaranteedFixedPriceTerms: Schema.optional(NonGuaranteedFixedPriceTerms),
  nonGuaranteedAuctionTerms: Schema.optional(NonGuaranteedAuctionTerms),
})).annotate({ identifier: "DealTerms" }) as any as Schema.Schema<DealTerms>;

export interface ContactInformation {
  /** Email address for the contact. */
  email?: string;
  /** The name of the contact. */
  name?: string;
}

export const ContactInformation: Schema.Schema<ContactInformation> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ContactInformation" }) as any as Schema.Schema<ContactInformation>;

export interface Size {
  /** The width of the creative */
  width?: number;
  /** The height of the creative. */
  height?: number;
}

export const Size: Schema.Schema<Size> = Schema.suspend(() => Schema.Struct({
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
})).annotate({ identifier: "Size" }) as any as Schema.Schema<Size>;

export interface CreativeSize {
  /** The creative size type. */
  creativeSizeType?: "CREATIVE_SIZE_TYPE_UNSPECIFIED" | "REGULAR" | "INTERSTITIAL" | "VIDEO" | "NATIVE" | (string & {});
  /** For regular or video creative size type, specifies the size of the creative */
  size?: Size;
  /** For video creatives specifies the sizes of companion ads (if present). Companion sizes may be filled in only when creative_size_type = VIDEO */
  companionSizes?: Array<Size>;
  /** The type of skippable ad for this creative. It will have a value only if creative_size_type = CreativeSizeType.VIDEO. */
  skippableAdType?: "SKIPPABLE_AD_TYPE_UNSPECIFIED" | "GENERIC" | "INSTREAM_SELECT" | "NOT_SKIPPABLE" | (string & {});
  /** Output only. The native template for this creative. It will have a value only if creative_size_type = CreativeSizeType.NATIVE. */
  nativeTemplate?: "UNKNOWN_NATIVE_TEMPLATE" | "NATIVE_CONTENT_AD" | "NATIVE_APP_INSTALL_AD" | "NATIVE_VIDEO_CONTENT_AD" | "NATIVE_VIDEO_APP_INSTALL_AD" | (string & {});
  /** What formats are allowed by the publisher. If this repeated field is empty then all formats are allowed. For example, if this field contains AllowedFormatType.AUDIO then the publisher only allows an audio ad (without any video). */
  allowedFormats?: Array<"UNKNOWN" | "AUDIO" | (string & {})>;
}

export const CreativeSize: Schema.Schema<CreativeSize> = Schema.suspend(() => Schema.Struct({
  creativeSizeType: Schema.optional(Schema.String),
  size: Schema.optional(Size),
  companionSizes: Schema.optional(Schema.Array(Size)),
  skippableAdType: Schema.optional(Schema.String),
  nativeTemplate: Schema.optional(Schema.String),
  allowedFormats: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CreativeSize" }) as any as Schema.Schema<CreativeSize>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface DayPart {
  /** The day of the week to target. If unspecified, applicable to all days. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** The starting time of day for the ad to show (minute level granularity). The start time is inclusive. This field is not available for filtering in PQL queries. */
  startTime?: TimeOfDay;
  /** The ending time of the day for the ad to show (minute level granularity). The end time is exclusive. This field is not available for filtering in PQL queries. */
  endTime?: TimeOfDay;
}

export const DayPart: Schema.Schema<DayPart> = Schema.suspend(() => Schema.Struct({
  dayOfWeek: Schema.optional(Schema.String),
  startTime: Schema.optional(TimeOfDay),
  endTime: Schema.optional(TimeOfDay),
})).annotate({ identifier: "DayPart" }) as any as Schema.Schema<DayPart>;

export interface DayPartTargeting {
  /** The timezone to use for interpreting the day part targeting. */
  timeZoneType?: "TIME_ZONE_SOURCE_UNSPECIFIED" | "PUBLISHER" | "USER" | (string & {});
  /** A list of day part targeting criterion. */
  dayParts?: Array<DayPart>;
}

export const DayPartTargeting: Schema.Schema<DayPartTargeting> = Schema.suspend(() => Schema.Struct({
  timeZoneType: Schema.optional(Schema.String),
  dayParts: Schema.optional(Schema.Array(DayPart)),
})).annotate({ identifier: "DayPartTargeting" }) as any as Schema.Schema<DayPartTargeting>;

export interface TargetingValue {
  /** The long value to include/exclude. */
  longValue?: string;
  /** The string value to include/exclude. */
  stringValue?: string;
  /** The creative size value to include/exclude. Filled in when key = GOOG_CREATIVE_SIZE */
  creativeSizeValue?: CreativeSize;
  /** The daypart targeting to include / exclude. Filled in when the key is GOOG_DAYPART_TARGETING. The definition of this targeting is derived from the structure used by Ad Manager. */
  dayPartTargetingValue?: DayPartTargeting;
}

export const TargetingValue: Schema.Schema<TargetingValue> = Schema.suspend(() => Schema.Struct({
  longValue: Schema.optional(Schema.String),
  stringValue: Schema.optional(Schema.String),
  creativeSizeValue: Schema.optional(CreativeSize),
  dayPartTargetingValue: Schema.optional(DayPartTargeting),
})).annotate({ identifier: "TargetingValue" }) as any as Schema.Schema<TargetingValue>;

export interface TargetingCriteria {
  /** The key representing the shared targeting criterion. Targeting criteria defined by Google ad servers will begin with GOOG_. Third parties may define their own keys. A list of permissible keys along with the acceptable values will be provided as part of the external documentation. */
  key?: string;
  /** The list of values to exclude from targeting. Each value is AND'd together. */
  exclusions?: Array<TargetingValue>;
  /** The list of value to include as part of the targeting. Each value is OR'd together. */
  inclusions?: Array<TargetingValue>;
}

export const TargetingCriteria: Schema.Schema<TargetingCriteria> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  exclusions: Schema.optional(Schema.Array(TargetingValue)),
  inclusions: Schema.optional(Schema.Array(TargetingValue)),
})).annotate({ identifier: "TargetingCriteria" }) as any as Schema.Schema<TargetingCriteria>;

export interface CriteriaTargeting {
  /** A list of numeric IDs to be included. */
  targetedCriteriaIds?: Array<string>;
  /** A list of numeric IDs to be excluded. */
  excludedCriteriaIds?: Array<string>;
}

export const CriteriaTargeting: Schema.Schema<CriteriaTargeting> = Schema.suspend(() => Schema.Struct({
  targetedCriteriaIds: Schema.optional(Schema.Array(Schema.String)),
  excludedCriteriaIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CriteriaTargeting" }) as any as Schema.Schema<CriteriaTargeting>;

export interface AdSize {
  /** The width of the ad slot in pixels. This field will be present only when size type is `PIXEL`. */
  width?: string;
  /** The height of the ad slot in pixels. This field will be present only when size type is `PIXEL`. */
  height?: string;
  /** The size type of the ad slot. */
  sizeType?: "SIZE_TYPE_UNSPECIFIED" | "PIXEL" | "INTERSTITIAL" | "NATIVE" | "FLUID" | (string & {});
}

export const AdSize: Schema.Schema<AdSize> = Schema.suspend(() => Schema.Struct({
  width: Schema.optional(Schema.String),
  height: Schema.optional(Schema.String),
  sizeType: Schema.optional(Schema.String),
})).annotate({ identifier: "AdSize" }) as any as Schema.Schema<AdSize>;

export interface InventorySizeTargeting {
  /** A list of inventory sizes to be included. */
  targetedInventorySizes?: Array<AdSize>;
  /** A list of inventory sizes to be excluded. */
  excludedInventorySizes?: Array<AdSize>;
}

export const InventorySizeTargeting: Schema.Schema<InventorySizeTargeting> = Schema.suspend(() => Schema.Struct({
  targetedInventorySizes: Schema.optional(Schema.Array(AdSize)),
  excludedInventorySizes: Schema.optional(Schema.Array(AdSize)),
})).annotate({ identifier: "InventorySizeTargeting" }) as any as Schema.Schema<InventorySizeTargeting>;

export interface OperatingSystemTargeting {
  /** IDs of operating systems to be included/excluded. */
  operatingSystemCriteria?: CriteriaTargeting;
  /** IDs of operating system versions to be included/excluded. */
  operatingSystemVersionCriteria?: CriteriaTargeting;
}

export const OperatingSystemTargeting: Schema.Schema<OperatingSystemTargeting> = Schema.suspend(() => Schema.Struct({
  operatingSystemCriteria: Schema.optional(CriteriaTargeting),
  operatingSystemVersionCriteria: Schema.optional(CriteriaTargeting),
})).annotate({ identifier: "OperatingSystemTargeting" }) as any as Schema.Schema<OperatingSystemTargeting>;

export interface TechnologyTargeting {
  /** IDs of device categories to be included/excluded. */
  deviceCategoryTargeting?: CriteriaTargeting;
  /** IDs of device capabilities to be included/excluded. */
  deviceCapabilityTargeting?: CriteriaTargeting;
  /** Operating system related targeting information. */
  operatingSystemTargeting?: OperatingSystemTargeting;
}

export const TechnologyTargeting: Schema.Schema<TechnologyTargeting> = Schema.suspend(() => Schema.Struct({
  deviceCategoryTargeting: Schema.optional(CriteriaTargeting),
  deviceCapabilityTargeting: Schema.optional(CriteriaTargeting),
  operatingSystemTargeting: Schema.optional(OperatingSystemTargeting),
})).annotate({ identifier: "TechnologyTargeting" }) as any as Schema.Schema<TechnologyTargeting>;

export interface UrlTargeting {
  /** A list of URLs to be included. */
  targetedUrls?: Array<string>;
  /** A list of URLs to be excluded. */
  excludedUrls?: Array<string>;
}

export const UrlTargeting: Schema.Schema<UrlTargeting> = Schema.suspend(() => Schema.Struct({
  targetedUrls: Schema.optional(Schema.Array(Schema.String)),
  excludedUrls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UrlTargeting" }) as any as Schema.Schema<UrlTargeting>;

export interface FirstPartyMobileApplicationTargeting {
  /** A list of application IDs to be included. */
  targetedAppIds?: Array<string>;
  /** A list of application IDs to be excluded. */
  excludedAppIds?: Array<string>;
}

export const FirstPartyMobileApplicationTargeting: Schema.Schema<FirstPartyMobileApplicationTargeting> = Schema.suspend(() => Schema.Struct({
  targetedAppIds: Schema.optional(Schema.Array(Schema.String)),
  excludedAppIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FirstPartyMobileApplicationTargeting" }) as any as Schema.Schema<FirstPartyMobileApplicationTargeting>;

export interface MobileApplicationTargeting {
  /** Publisher owned apps to be targeted or excluded by the publisher to display the ads in. */
  firstPartyTargeting?: FirstPartyMobileApplicationTargeting;
}

export const MobileApplicationTargeting: Schema.Schema<MobileApplicationTargeting> = Schema.suspend(() => Schema.Struct({
  firstPartyTargeting: Schema.optional(FirstPartyMobileApplicationTargeting),
})).annotate({ identifier: "MobileApplicationTargeting" }) as any as Schema.Schema<MobileApplicationTargeting>;

export interface PlacementTargeting {
  /** URLs to be included/excluded. */
  urlTargeting?: UrlTargeting;
  /** Mobile application targeting information in a deal. This doesn't apply to Auction Packages. */
  mobileApplicationTargeting?: MobileApplicationTargeting;
}

export const PlacementTargeting: Schema.Schema<PlacementTargeting> = Schema.suspend(() => Schema.Struct({
  urlTargeting: Schema.optional(UrlTargeting),
  mobileApplicationTargeting: Schema.optional(MobileApplicationTargeting),
})).annotate({ identifier: "PlacementTargeting" }) as any as Schema.Schema<PlacementTargeting>;

export interface VideoTargeting {
  /** A list of video positions to be included. When the included list is present, the excluded list must be empty. When the excluded list is present, the included list must be empty. */
  targetedPositionTypes?: Array<"POSITION_TYPE_UNSPECIFIED" | "PREROLL" | "MIDROLL" | "POSTROLL" | (string & {})>;
  /** A list of video positions to be excluded. Position types can either be included or excluded (XOR). */
  excludedPositionTypes?: Array<"POSITION_TYPE_UNSPECIFIED" | "PREROLL" | "MIDROLL" | "POSTROLL" | (string & {})>;
}

export const VideoTargeting: Schema.Schema<VideoTargeting> = Schema.suspend(() => Schema.Struct({
  targetedPositionTypes: Schema.optional(Schema.Array(Schema.String)),
  excludedPositionTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "VideoTargeting" }) as any as Schema.Schema<VideoTargeting>;

export interface MarketplaceTargeting {
  /** Geo criteria IDs to be included/excluded. */
  geoTargeting?: CriteriaTargeting;
  /** Inventory sizes to be included/excluded. */
  inventorySizeTargeting?: InventorySizeTargeting;
  /** Technology targeting information, for example, operating system, device category. */
  technologyTargeting?: TechnologyTargeting;
  /** Placement targeting information, for example, URL, mobile applications. */
  placementTargeting?: PlacementTargeting;
  /** Video targeting information. */
  videoTargeting?: VideoTargeting;
}

export const MarketplaceTargeting: Schema.Schema<MarketplaceTargeting> = Schema.suspend(() => Schema.Struct({
  geoTargeting: Schema.optional(CriteriaTargeting),
  inventorySizeTargeting: Schema.optional(InventorySizeTargeting),
  technologyTargeting: Schema.optional(TechnologyTargeting),
  placementTargeting: Schema.optional(PlacementTargeting),
  videoTargeting: Schema.optional(VideoTargeting),
})).annotate({ identifier: "MarketplaceTargeting" }) as any as Schema.Schema<MarketplaceTargeting>;

export interface CreativeSpecification {
  /** The size of the creative. */
  creativeSize?: AdSize;
  /** Companion sizes may be filled in only when this is a video creative. */
  creativeCompanionSizes?: Array<AdSize>;
}

export const CreativeSpecification: Schema.Schema<CreativeSpecification> = Schema.suspend(() => Schema.Struct({
  creativeSize: Schema.optional(AdSize),
  creativeCompanionSizes: Schema.optional(Schema.Array(AdSize)),
})).annotate({ identifier: "CreativeSpecification" }) as any as Schema.Schema<CreativeSpecification>;

export interface CreativeRestrictions {
  /** The format of the environment that the creatives will be displayed in. */
  creativeFormat?: "CREATIVE_FORMAT_UNSPECIFIED" | "DISPLAY" | "VIDEO" | (string & {});
  creativeSpecifications?: Array<CreativeSpecification>;
  /** Skippable video ads allow viewers to skip ads after 5 seconds. */
  skippableAdType?: "SKIPPABLE_AD_TYPE_UNSPECIFIED" | "SKIPPABLE" | "INSTREAM_SELECT" | "NOT_SKIPPABLE" | (string & {});
}

export const CreativeRestrictions: Schema.Schema<CreativeRestrictions> = Schema.suspend(() => Schema.Struct({
  creativeFormat: Schema.optional(Schema.String),
  creativeSpecifications: Schema.optional(Schema.Array(CreativeSpecification)),
  skippableAdType: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeRestrictions" }) as any as Schema.Schema<CreativeRestrictions>;

export interface DealPauseStatus {
  /** True, if the buyer has paused the deal unilaterally. */
  hasBuyerPaused?: boolean;
  /** True, if the seller has paused the deal unilaterally. */
  hasSellerPaused?: boolean;
  /** The role of the person who first paused this deal. */
  firstPausedBy?: "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER" | (string & {});
  /** The buyer's reason for pausing, if the buyer paused the deal. */
  buyerPauseReason?: string;
  /** The seller's reason for pausing, if the seller paused the deal. */
  sellerPauseReason?: string;
}

export const DealPauseStatus: Schema.Schema<DealPauseStatus> = Schema.suspend(() => Schema.Struct({
  hasBuyerPaused: Schema.optional(Schema.Boolean),
  hasSellerPaused: Schema.optional(Schema.Boolean),
  firstPausedBy: Schema.optional(Schema.String),
  buyerPauseReason: Schema.optional(Schema.String),
  sellerPauseReason: Schema.optional(Schema.String),
})).annotate({ identifier: "DealPauseStatus" }) as any as Schema.Schema<DealPauseStatus>;

export interface DealServingMetadata {
  /** Output only. Tracks which parties (if any) have paused a deal. */
  dealPauseStatus?: DealPauseStatus;
}

export const DealServingMetadata: Schema.Schema<DealServingMetadata> = Schema.suspend(() => Schema.Struct({
  dealPauseStatus: Schema.optional(DealPauseStatus),
})).annotate({ identifier: "DealServingMetadata" }) as any as Schema.Schema<DealServingMetadata>;

export interface FrequencyCap {
  /** The maximum number of impressions that can be served to a user within the specified time period. */
  maxImpressions?: number;
  /** The amount of time, in the units specified by time_unit_type. Defines the amount of time over which impressions per user are counted and capped. */
  numTimeUnits?: number;
  /** The time unit. Along with num_time_units defines the amount of time over which impressions per user are counted and capped. */
  timeUnitType?: "TIME_UNIT_TYPE_UNSPECIFIED" | "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH" | "LIFETIME" | "POD" | "STREAM" | (string & {});
}

export const FrequencyCap: Schema.Schema<FrequencyCap> = Schema.suspend(() => Schema.Struct({
  maxImpressions: Schema.optional(Schema.Number),
  numTimeUnits: Schema.optional(Schema.Number),
  timeUnitType: Schema.optional(Schema.String),
})).annotate({ identifier: "FrequencyCap" }) as any as Schema.Schema<FrequencyCap>;

export interface DeliveryControl {
  /** Output only. Specifies how the impression delivery will be paced. */
  deliveryRateType?: "DELIVERY_RATE_TYPE_UNSPECIFIED" | "EVENLY" | "FRONT_LOADED" | "AS_FAST_AS_POSSIBLE" | (string & {});
  /** Output only. Specifies any frequency caps. */
  frequencyCaps?: Array<FrequencyCap>;
  /** Output only. Specified the creative blocking levels to be applied. */
  creativeBlockingLevel?: "CREATIVE_BLOCKING_LEVEL_UNSPECIFIED" | "PUBLISHER_BLOCKING_RULES" | "ADX_POLICY_BLOCKING_ONLY" | (string & {});
}

export const DeliveryControl: Schema.Schema<DeliveryControl> = Schema.suspend(() => Schema.Struct({
  deliveryRateType: Schema.optional(Schema.String),
  frequencyCaps: Schema.optional(Schema.Array(FrequencyCap)),
  creativeBlockingLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliveryControl" }) as any as Schema.Schema<DeliveryControl>;

export interface Deal {
  /** Output only. A unique deal ID for the deal (server-assigned). */
  dealId?: string;
  /** Output only. ID of the proposal that this deal is part of. */
  proposalId?: string;
  /** Output only. The time of the deal creation. */
  createTime?: string;
  /** Output only. The time when the deal was last updated. */
  updateTime?: string;
  /** The product ID from which this deal was created. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error. */
  createProductId?: string;
  /** Optional. Revision number of the product that the deal was created from. If present on create, and the server `product_revision` has advanced since the passed-in `create_product_revision`, an `ABORTED` error will be returned. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error. */
  createProductRevision?: string;
  /** The name of the deal. */
  displayName?: string;
  /** Buyer private data (hidden from seller). */
  buyerPrivateData?: PrivateData;
  /** The negotiable terms of the deal. */
  dealTerms?: DealTerms;
  /** The web property code for the seller copied over from the product. */
  webPropertyCode?: string;
  /** Output only. Seller contact information for the deal. */
  sellerContacts?: Array<ContactInformation>;
  /** Optional. Proposed flight start time of the deal. This will generally be stored in the granularity of one second since deal serving starts at seconds boundary. Any time specified with more granularity (for example, in milliseconds) will be truncated towards the start of time in seconds. */
  availableStartTime?: string;
  /** Proposed flight end time of the deal. This will generally be stored in a granularity of a second. A value is not required for Private Auction deals or Preferred Deals. */
  availableEndTime?: string;
  /** Description for the deal terms. */
  description?: string;
  /** The shared targeting visible to buyers and sellers. Each shared targeting entity is AND'd together. */
  targetingCriterion?: Array<TargetingCriteria>;
  /** Output only. Specifies the subset of inventory targeted by the deal. */
  targeting?: MarketplaceTargeting;
  /** Output only. Restricitions about the creatives associated with the deal (for example, size) This is available for Programmatic Guaranteed/Preferred Deals in Ad Manager. */
  creativeRestrictions?: CreativeRestrictions;
  /** Output only. The external deal ID assigned to this deal once the deal is finalized. This is the deal ID that shows up in serving/reporting etc. */
  externalDealId?: string;
  /** The syndication product associated with the deal. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error. */
  syndicationProduct?: "SYNDICATION_PRODUCT_UNSPECIFIED" | "CONTENT" | "MOBILE" | "VIDEO" | "GAMES" | (string & {});
  /** Output only. Specifies the creative pre-approval policy. */
  creativePreApprovalPolicy?: "CREATIVE_PRE_APPROVAL_POLICY_UNSPECIFIED" | "SELLER_PRE_APPROVAL_REQUIRED" | "SELLER_PRE_APPROVAL_NOT_REQUIRED" | (string & {});
  /** Output only. Specifies whether the creative is safeFrame compatible. */
  creativeSafeFrameCompatibility?: "CREATIVE_SAFE_FRAME_COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE" | (string & {});
  /** Output only. Metadata about the serving status of this deal. */
  dealServingMetadata?: DealServingMetadata;
  /** Output only. Specifies the creative source for programmatic deals. PUBLISHER means creative is provided by seller and ADVERTISER means creative is provided by buyer. */
  programmaticCreativeSource?: "PROGRAMMATIC_CREATIVE_SOURCE_UNSPECIFIED" | "ADVERTISER" | "PUBLISHER" | (string & {});
  /** The set of fields around delivery control that are interesting for a buyer to see but are non-negotiable. These are set by the publisher. */
  deliveryControl?: DeliveryControl;
  /** Output only. True, if the buyside inventory setup is complete for this deal. */
  isSetupComplete?: boolean;
}

export const Deal: Schema.Schema<Deal> = Schema.suspend(() => Schema.Struct({
  dealId: Schema.optional(Schema.String),
  proposalId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createProductId: Schema.optional(Schema.String),
  createProductRevision: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  buyerPrivateData: Schema.optional(PrivateData),
  dealTerms: Schema.optional(DealTerms),
  webPropertyCode: Schema.optional(Schema.String),
  sellerContacts: Schema.optional(Schema.Array(ContactInformation)),
  availableStartTime: Schema.optional(Schema.String),
  availableEndTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  targetingCriterion: Schema.optional(Schema.Array(TargetingCriteria)),
  targeting: Schema.optional(MarketplaceTargeting),
  creativeRestrictions: Schema.optional(CreativeRestrictions),
  externalDealId: Schema.optional(Schema.String),
  syndicationProduct: Schema.optional(Schema.String),
  creativePreApprovalPolicy: Schema.optional(Schema.String),
  creativeSafeFrameCompatibility: Schema.optional(Schema.String),
  dealServingMetadata: Schema.optional(DealServingMetadata),
  programmaticCreativeSource: Schema.optional(Schema.String),
  deliveryControl: Schema.optional(DeliveryControl),
  isSetupComplete: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Deal" }) as any as Schema.Schema<Deal>;

export interface Seller {
  /** The unique ID for the seller. The seller fills in this field. The seller account ID is then available to buyer in the product. */
  accountId?: string;
  /** Output only. Ad manager network code for the seller. */
  subAccountId?: string;
}

export const Seller: Schema.Schema<Seller> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  subAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "Seller" }) as any as Schema.Schema<Seller>;

export interface Note {
  /** Output only. The revision number of the proposal when the note is created. */
  proposalRevision?: string;
  /** Output only. The unique ID for the note. */
  noteId?: string;
  /** Output only. The timestamp for when this note was created. */
  createTime?: string;
  /** Output only. The role of the person (buyer/seller) creating the note. */
  creatorRole?: "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER" | (string & {});
  /** The actual note to attach. (max-length: 1024 unicode code units) Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error. */
  note?: string;
}

export const Note: Schema.Schema<Note> = Schema.suspend(() => Schema.Struct({
  proposalRevision: Schema.optional(Schema.String),
  noteId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  creatorRole: Schema.optional(Schema.String),
  note: Schema.optional(Schema.String),
})).annotate({ identifier: "Note" }) as any as Schema.Schema<Note>;

export interface Proposal {
  /** Output only. The unique ID of the proposal. */
  proposalId?: string;
  /** Output only. The time when the proposal was last revised. */
  updateTime?: string;
  /** Output only. The revision number for the proposal. Each update to the proposal or the deal causes the proposal revision number to auto-increment. The buyer keeps track of the last revision number they know of and pass it in when making an update. If the head revision number on the server has since incremented, then an ABORTED error is returned during the update operation to let the buyer know that a subsequent update was made. */
  proposalRevision?: string;
  /** The deals associated with this proposal. For Private Auction proposals (whose deals have NonGuaranteedAuctionTerms), there will only be one deal. */
  deals?: Array<Deal>;
  /** Output only. Indicates whether the buyer/seller created the proposal. */
  originatorRole?: "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER" | (string & {});
  /** Reference to the seller on the proposal. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error. */
  seller?: Seller;
  /** Reference to the buyer on the proposal. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error. */
  buyer?: Buyer;
  /** Output only. Reference to the buyer that will get billed for this proposal. */
  billedBuyer?: Buyer;
  /** The name for the proposal. */
  displayName?: string;
  /** Output only. The current state of the proposal. */
  proposalState?: "PROPOSAL_STATE_UNSPECIFIED" | "PROPOSED" | "BUYER_ACCEPTED" | "SELLER_ACCEPTED" | "CANCELED" | "FINALIZED" | (string & {});
  /** Output only. True if the proposal is being renegotiated. */
  isRenegotiating?: boolean;
  /** Private data for buyer. (hidden from seller). */
  buyerPrivateData?: PrivateData;
  /** Output only. Contact information for the seller. */
  sellerContacts?: Array<ContactInformation>;
  /** Contact information for the buyer. */
  buyerContacts?: Array<ContactInformation>;
  /** Output only. Private auction ID if this proposal is a private auction proposal. */
  privateAuctionId?: string;
  /** Output only. True, if the buyside inventory setup is complete for this proposal. */
  isSetupComplete?: boolean;
  /** Output only. The role of the last user that either updated the proposal or left a comment. */
  lastUpdaterOrCommentorRole?: "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER" | (string & {});
  /** Output only. The notes associated with this proposal. */
  notes?: Array<Note>;
  /** Output only. The terms and conditions set by the publisher for this proposal. */
  termsAndConditions?: string;
}

export const Proposal: Schema.Schema<Proposal> = Schema.suspend(() => Schema.Struct({
  proposalId: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  proposalRevision: Schema.optional(Schema.String),
  deals: Schema.optional(Schema.Array(Deal)),
  originatorRole: Schema.optional(Schema.String),
  seller: Schema.optional(Seller),
  buyer: Schema.optional(Buyer),
  billedBuyer: Schema.optional(Buyer),
  displayName: Schema.optional(Schema.String),
  proposalState: Schema.optional(Schema.String),
  isRenegotiating: Schema.optional(Schema.Boolean),
  buyerPrivateData: Schema.optional(PrivateData),
  sellerContacts: Schema.optional(Schema.Array(ContactInformation)),
  buyerContacts: Schema.optional(Schema.Array(ContactInformation)),
  privateAuctionId: Schema.optional(Schema.String),
  isSetupComplete: Schema.optional(Schema.Boolean),
  lastUpdaterOrCommentorRole: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.Array(Note)),
  termsAndConditions: Schema.optional(Schema.String),
})).annotate({ identifier: "Proposal" }) as any as Schema.Schema<Proposal>;

export interface ListProposalsResponse {
  /** The list of proposals. */
  proposals?: Array<Proposal>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListProposalsResponse: Schema.Schema<ListProposalsResponse> = Schema.suspend(() => Schema.Struct({
  proposals: Schema.optional(Schema.Array(Proposal)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProposalsResponse" }) as any as Schema.Schema<ListProposalsResponse>;

export interface AddNoteRequest {
  /** Details of the note to add. */
  note?: Note;
}

export const AddNoteRequest: Schema.Schema<AddNoteRequest> = Schema.suspend(() => Schema.Struct({
  note: Schema.optional(Note),
})).annotate({ identifier: "AddNoteRequest" }) as any as Schema.Schema<AddNoteRequest>;

export interface CancelNegotiationRequest {
}

export const CancelNegotiationRequest: Schema.Schema<CancelNegotiationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelNegotiationRequest" }) as any as Schema.Schema<CancelNegotiationRequest>;

export interface AcceptProposalRequest {
  /** The last known client revision number of the proposal. */
  proposalRevision?: string;
}

export const AcceptProposalRequest: Schema.Schema<AcceptProposalRequest> = Schema.suspend(() => Schema.Struct({
  proposalRevision: Schema.optional(Schema.String),
})).annotate({ identifier: "AcceptProposalRequest" }) as any as Schema.Schema<AcceptProposalRequest>;

export interface CompleteSetupRequest {
}

export const CompleteSetupRequest: Schema.Schema<CompleteSetupRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CompleteSetupRequest" }) as any as Schema.Schema<CompleteSetupRequest>;

export interface PauseProposalRequest {
  /** The reason why the proposal is being paused. This human readable message will be displayed in the seller's UI. (Max length: 1000 unicode code units.) */
  reason?: string;
}

export const PauseProposalRequest: Schema.Schema<PauseProposalRequest> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "PauseProposalRequest" }) as any as Schema.Schema<PauseProposalRequest>;

export interface ResumeProposalRequest {
}

export const ResumeProposalRequest: Schema.Schema<ResumeProposalRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumeProposalRequest" }) as any as Schema.Schema<ResumeProposalRequest>;

export interface PauseProposalDealsRequest {
  /** The external_deal_id's of the deals to be paused. If empty, all the deals in the proposal will be paused. */
  externalDealIds?: Array<string>;
  /** The reason why the deals are being paused. This human readable message will be displayed in the seller's UI. (Max length: 1000 unicode code units.) */
  reason?: string;
}

export const PauseProposalDealsRequest: Schema.Schema<PauseProposalDealsRequest> = Schema.suspend(() => Schema.Struct({
  externalDealIds: Schema.optional(Schema.Array(Schema.String)),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "PauseProposalDealsRequest" }) as any as Schema.Schema<PauseProposalDealsRequest>;

export interface ResumeProposalDealsRequest {
  /** The external_deal_id's of the deals to resume. If empty, all the deals in the proposal will be resumed. */
  externalDealIds?: Array<string>;
}

export const ResumeProposalDealsRequest: Schema.Schema<ResumeProposalDealsRequest> = Schema.suspend(() => Schema.Struct({
  externalDealIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ResumeProposalDealsRequest" }) as any as Schema.Schema<ResumeProposalDealsRequest>;

export interface Product {
  /** The unique ID for the product. */
  productId?: string;
  /** Creation time. */
  createTime?: string;
  /** Time of last update. */
  updateTime?: string;
  /** Information about the seller that created this product. */
  seller?: Seller;
  /** An ID which can be used by the Publisher Profile API to get more information about the seller that created this product. */
  publisherProfileId?: string;
  /** The display name for this product as set by the seller. */
  displayName?: string;
  /** The negotiable terms of the deal. */
  terms?: DealTerms;
  /** Optional contact information for the creator of this product. */
  creatorContacts?: Array<ContactInformation>;
  /** Inventory availability dates. The start time will be truncated to seconds during serving. Thus, a field specified as 3:23:34.456 (HH:mm:ss.SSS) will be truncated to 3:23:34 when serving. */
  availableStartTime?: string;
  /** The proposed end time for the deal. The field will be truncated to the order of seconds during serving. */
  availableEndTime?: string;
  /** If the creator has already signed off on the product, then the buyer can finalize the deal by accepting the product as is. When copying to a proposal, if any of the terms are changed, then auto_finalize is automatically set to false. */
  hasCreatorSignedOff?: boolean;
  /** Targeting that is shared between the buyer and the seller. Each targeting criterion has a specified key and for each key there is a list of inclusion value or exclusion values. */
  targetingCriterion?: Array<TargetingCriteria>;
  /** The web-property code for the seller. This needs to be copied as is when adding a new deal to a proposal. */
  webPropertyCode?: string;
  /** The revision number of the product (auto-assigned by Marketplace). */
  productRevision?: string;
  /** The syndication product associated with the deal. */
  syndicationProduct?: "SYNDICATION_PRODUCT_UNSPECIFIED" | "CONTENT" | "MOBILE" | "VIDEO" | "GAMES" | (string & {});
}

export const Product: Schema.Schema<Product> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  seller: Schema.optional(Seller),
  publisherProfileId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  terms: Schema.optional(DealTerms),
  creatorContacts: Schema.optional(Schema.Array(ContactInformation)),
  availableStartTime: Schema.optional(Schema.String),
  availableEndTime: Schema.optional(Schema.String),
  hasCreatorSignedOff: Schema.optional(Schema.Boolean),
  targetingCriterion: Schema.optional(Schema.Array(TargetingCriteria)),
  webPropertyCode: Schema.optional(Schema.String),
  productRevision: Schema.optional(Schema.String),
  syndicationProduct: Schema.optional(Schema.String),
})).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface ListProductsResponse {
  /** The list of matching products at their head revision number. */
  products?: Array<Product>;
  /** List pagination support. */
  nextPageToken?: string;
}

export const ListProductsResponse: Schema.Schema<ListProductsResponse> = Schema.suspend(() => Schema.Struct({
  products: Schema.optional(Schema.Array(Product)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProductsResponse" }) as any as Schema.Schema<ListProductsResponse>;

export interface PublisherProfileMobileApplication {
  /** The external ID for the app from its app store. */
  externalAppId?: string;
  /** The name of the app. */
  name?: string;
  /** The app store the app belongs to. */
  appStore?: "APP_STORE_TYPE_UNSPECIFIED" | "APPLE_ITUNES" | "GOOGLE_PLAY" | "ROKU" | "AMAZON_FIRETV" | "PLAYSTATION" | "XBOX" | "SAMSUNG_TV" | "AMAZON" | "OPPO" | "SAMSUNG" | "VIVO" | "XIAOMI" | "LG_TV" | (string & {});
}

export const PublisherProfileMobileApplication: Schema.Schema<PublisherProfileMobileApplication> = Schema.suspend(() => Schema.Struct({
  externalAppId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  appStore: Schema.optional(Schema.String),
})).annotate({ identifier: "PublisherProfileMobileApplication" }) as any as Schema.Schema<PublisherProfileMobileApplication>;

export interface PublisherProfile {
  /** Unique ID for publisher profile. */
  publisherProfileId?: string;
  /** Seller of the publisher profile. */
  seller?: Seller;
  /** Name of the publisher profile. */
  displayName?: string;
  /** The list of domains represented in this publisher profile. Empty if this is a parent profile. These are top private domains, meaning that these will not contain a string like "photos.google.co.uk/123", but will instead contain "google.co.uk". */
  domains?: Array<string>;
  /** The list of apps represented in this publisher profile. Empty if this is a parent profile. */
  mobileApps?: Array<PublisherProfileMobileApplication>;
  /** A Google public URL to the logo for this publisher profile. The logo is stored as a PNG, JPG, or GIF image. */
  logoUrl?: string;
  /** Contact information for direct reservation deals. This is free text entered by the publisher and may include information like names, phone numbers and email addresses. */
  directDealsContact?: string;
  /** Contact information for programmatic deals. This is free text entered by the publisher and may include information like names, phone numbers and email addresses. */
  programmaticDealsContact?: string;
  /** URL to additional marketing and sales materials. */
  mediaKitUrl?: string;
  /** URL to a sample content page. */
  samplePageUrl?: string;
  /** URL to a publisher rate card. */
  rateCardInfoUrl?: string;
  /** URL to publisher's Google+ page. */
  googlePlusUrl?: string;
  /** Overview of the publisher. */
  overview?: string;
  /** Statement explaining what's unique about publisher's business, and why buyers should partner with the publisher. */
  buyerPitchStatement?: string;
  /** Up to three key metrics and rankings. Max 100 characters each. For example "#1 Mobile News Site for 20 Straight Months". */
  topHeadlines?: Array<string>;
  /** Description on the publisher's audience. */
  audienceDescription?: string;
  /** Indicates if this profile is the parent profile of the seller. A parent profile represents all the inventory from the seller, as opposed to child profile that is created to brand a portion of inventory. One seller should have only one parent publisher profile, and can have multiple child profiles. Publisher profiles for the same seller will have same value of field google.ads.adexchange.buyer.v2beta1.PublisherProfile.seller. See https://support.google.com/admanager/answer/6035806 for details. */
  isParent?: boolean;
}

export const PublisherProfile: Schema.Schema<PublisherProfile> = Schema.suspend(() => Schema.Struct({
  publisherProfileId: Schema.optional(Schema.String),
  seller: Schema.optional(Seller),
  displayName: Schema.optional(Schema.String),
  domains: Schema.optional(Schema.Array(Schema.String)),
  mobileApps: Schema.optional(Schema.Array(PublisherProfileMobileApplication)),
  logoUrl: Schema.optional(Schema.String),
  directDealsContact: Schema.optional(Schema.String),
  programmaticDealsContact: Schema.optional(Schema.String),
  mediaKitUrl: Schema.optional(Schema.String),
  samplePageUrl: Schema.optional(Schema.String),
  rateCardInfoUrl: Schema.optional(Schema.String),
  googlePlusUrl: Schema.optional(Schema.String),
  overview: Schema.optional(Schema.String),
  buyerPitchStatement: Schema.optional(Schema.String),
  topHeadlines: Schema.optional(Schema.Array(Schema.String)),
  audienceDescription: Schema.optional(Schema.String),
  isParent: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PublisherProfile" }) as any as Schema.Schema<PublisherProfile>;

export interface ListPublisherProfilesResponse {
  /** The list of matching publisher profiles. */
  publisherProfiles?: Array<PublisherProfile>;
  /** List pagination support */
  nextPageToken?: string;
}

export const ListPublisherProfilesResponse: Schema.Schema<ListPublisherProfilesResponse> = Schema.suspend(() => Schema.Struct({
  publisherProfiles: Schema.optional(Schema.Array(PublisherProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPublisherProfilesResponse" }) as any as Schema.Schema<ListPublisherProfilesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a creative. */
export interface CreateAccountsCreativesRequest {
  /** The account that this creative belongs to. Can be used to filter the response of the creatives.list method. */
  accountId: string;
  /** Indicates if multiple creatives can share an ID or not. Default is NO_DUPLICATES (one ID per creative). */
  duplicateIdMode?: "NO_DUPLICATES" | "FORCE_ENABLE_DUPLICATE_IDS" | (string & {});
  /** Request body */
  body?: Creative;
}

export const CreateAccountsCreativesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  duplicateIdMode: Schema.optional(Schema.String).pipe(T.HttpQuery("duplicateIdMode")),
  body: Schema.optional(Creative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/creatives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsCreativesRequest>;

export type CreateAccountsCreativesResponse = Creative;
export const CreateAccountsCreativesResponse = Creative;

export type CreateAccountsCreativesError = CommonErrors;

export const createAccountsCreatives: API.OperationMethod<CreateAccountsCreativesRequest, CreateAccountsCreativesResponse, CreateAccountsCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsCreativesRequest,
  output: CreateAccountsCreativesResponse,
  errors: [],
}));

/** Updates a creative. */
export interface UpdateAccountsCreativesRequest {
  /** The account that this creative belongs to. Can be used to filter the response of the creatives.list method. */
  accountId: string;
  /** The buyer-defined creative ID of this creative. Can be used to filter the response of the creatives.list method. */
  creativeId: string;
  /** Request body */
  body?: Creative;
}

export const UpdateAccountsCreativesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
  body: Schema.optional(Creative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2beta1/accounts/{accountId}/creatives/{creativeId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsCreativesRequest>;

export type UpdateAccountsCreativesResponse = Creative;
export const UpdateAccountsCreativesResponse = Creative;

export type UpdateAccountsCreativesError = CommonErrors;

export const updateAccountsCreatives: API.OperationMethod<UpdateAccountsCreativesRequest, UpdateAccountsCreativesResponse, UpdateAccountsCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsCreativesRequest,
  output: UpdateAccountsCreativesResponse,
  errors: [],
}));

/** Gets a creative. */
export interface GetAccountsCreativesRequest {
  /** The account the creative belongs to. */
  accountId: string;
  /** The ID of the creative to retrieve. */
  creativeId: string;
}

export const GetAccountsCreativesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/creatives/{creativeId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsCreativesRequest>;

export type GetAccountsCreativesResponse = Creative;
export const GetAccountsCreativesResponse = Creative;

export type GetAccountsCreativesError = CommonErrors;

export const getAccountsCreatives: API.OperationMethod<GetAccountsCreativesRequest, GetAccountsCreativesResponse, GetAccountsCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsCreativesRequest,
  output: GetAccountsCreativesResponse,
  errors: [],
}));

/** Lists creatives. */
export interface ListAccountsCreativesRequest {
  /** The account to list the creatives from. Specify "-" to list all creatives the current user has access to. */
  accountId: string;
  /** Requested page size. The server may return fewer creatives than requested (due to timeout constraint) even if more are available through another call. If unspecified, server will pick an appropriate default. Acceptable values are 1 to 1000, inclusive. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListCreativesResponse.next_page_token returned from the previous call to 'ListCreatives' method. */
  pageToken?: string;
  /** An optional query string to filter creatives. If no filter is specified, all active creatives will be returned. Supported queries are: - accountId=*account_id_string* - creativeId=*creative_id_string* - dealsStatus: {approved, conditionally_approved, disapproved, not_checked} - openAuctionStatus: {approved, conditionally_approved, disapproved, not_checked} - attribute: {a numeric attribute from the list of attributes} - disapprovalReason: {a reason from DisapprovalReason} Example: 'accountId=12345 AND (dealsStatus:disapproved AND disapprovalReason:unacceptable_content) OR attribute:47' */
  query?: string;
}

export const ListAccountsCreativesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/creatives" }),
  svc,
) as unknown as Schema.Schema<ListAccountsCreativesRequest>;

export type ListAccountsCreativesResponse = ListCreativesResponse;
export const ListAccountsCreativesResponse = ListCreativesResponse;

export type ListAccountsCreativesError = CommonErrors;

export const listAccountsCreatives = API.makePaginated(() => ({
  input: ListAccountsCreativesRequest,
  output: ListAccountsCreativesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Watches a creative. Will result in push notifications being sent to the topic when the creative changes status. */
export interface WatchAccountsCreativesRequest {
  /** The account of the creative to watch. */
  accountId: string;
  /** The creative ID to watch for status changes. Specify "-" to watch all creatives under the above account. If both creative-level and account-level notifications are sent, only a single notification will be sent to the creative-level notification topic. */
  creativeId: string;
  /** Request body */
  body?: WatchCreativeRequest;
}

export const WatchAccountsCreativesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
  body: Schema.optional(WatchCreativeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/creatives/{creativeId}:watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchAccountsCreativesRequest>;

export type WatchAccountsCreativesResponse = Empty;
export const WatchAccountsCreativesResponse = Empty;

export type WatchAccountsCreativesError = CommonErrors;

export const watchAccountsCreatives: API.OperationMethod<WatchAccountsCreativesRequest, WatchAccountsCreativesResponse, WatchAccountsCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchAccountsCreativesRequest,
  output: WatchAccountsCreativesResponse,
  errors: [],
}));

/** Stops watching a creative. Will stop push notifications being sent to the topics when the creative changes status. */
export interface StopWatchingAccountsCreativesRequest {
  /** The account of the creative to stop notifications for. */
  accountId: string;
  /** The creative ID of the creative to stop notifications for. Specify "-" to specify stopping account level notifications. */
  creativeId: string;
  /** Request body */
  body?: StopWatchingCreativeRequest;
}

export const StopWatchingAccountsCreativesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
  body: Schema.optional(StopWatchingCreativeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/creatives/{creativeId}:stopWatching", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopWatchingAccountsCreativesRequest>;

export type StopWatchingAccountsCreativesResponse = Empty;
export const StopWatchingAccountsCreativesResponse = Empty;

export type StopWatchingAccountsCreativesError = CommonErrors;

export const stopWatchingAccountsCreatives: API.OperationMethod<StopWatchingAccountsCreativesRequest, StopWatchingAccountsCreativesResponse, StopWatchingAccountsCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopWatchingAccountsCreativesRequest,
  output: StopWatchingAccountsCreativesResponse,
  errors: [],
}));

/** Associate an existing deal with a creative. */
export interface AddAccountsCreativesDealAssociationsRequest {
  /** The account the creative belongs to. */
  accountId: string;
  /** The ID of the creative associated with the deal. */
  creativeId: string;
  /** Request body */
  body?: AddDealAssociationRequest;
}

export const AddAccountsCreativesDealAssociationsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
  body: Schema.optional(AddDealAssociationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/creatives/{creativeId}/dealAssociations:add", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddAccountsCreativesDealAssociationsRequest>;

export type AddAccountsCreativesDealAssociationsResponse = Empty;
export const AddAccountsCreativesDealAssociationsResponse = Empty;

export type AddAccountsCreativesDealAssociationsError = CommonErrors;

export const addAccountsCreativesDealAssociations: API.OperationMethod<AddAccountsCreativesDealAssociationsRequest, AddAccountsCreativesDealAssociationsResponse, AddAccountsCreativesDealAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddAccountsCreativesDealAssociationsRequest,
  output: AddAccountsCreativesDealAssociationsResponse,
  errors: [],
}));

/** Remove the association between a deal and a creative. */
export interface RemoveAccountsCreativesDealAssociationsRequest {
  /** The account the creative belongs to. */
  accountId: string;
  /** The ID of the creative associated with the deal. */
  creativeId: string;
  /** Request body */
  body?: RemoveDealAssociationRequest;
}

export const RemoveAccountsCreativesDealAssociationsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
  body: Schema.optional(RemoveDealAssociationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/creatives/{creativeId}/dealAssociations:remove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveAccountsCreativesDealAssociationsRequest>;

export type RemoveAccountsCreativesDealAssociationsResponse = Empty;
export const RemoveAccountsCreativesDealAssociationsResponse = Empty;

export type RemoveAccountsCreativesDealAssociationsError = CommonErrors;

export const removeAccountsCreativesDealAssociations: API.OperationMethod<RemoveAccountsCreativesDealAssociationsRequest, RemoveAccountsCreativesDealAssociationsResponse, RemoveAccountsCreativesDealAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveAccountsCreativesDealAssociationsRequest,
  output: RemoveAccountsCreativesDealAssociationsResponse,
  errors: [],
}));

/** List all creative-deal associations. */
export interface ListAccountsCreativesDealAssociationsRequest {
  /** The account to list the associations from. Specify "-" to list all creatives the current user has access to. */
  accountId: string;
  /** The creative ID to list the associations from. Specify "-" to list all creatives under the above account. */
  creativeId: string;
  /** Requested page size. Server may return fewer associations than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListDealAssociationsResponse.next_page_token returned from the previous call to 'ListDealAssociations' method. */
  pageToken?: string;
  /** An optional query string to filter deal associations. If no filter is specified, all associations will be returned. Supported queries are: - accountId=*account_id_string* - creativeId=*creative_id_string* - dealsId=*deals_id_string* - dealsStatus:{approved, conditionally_approved, disapproved, not_checked} - openAuctionStatus:{approved, conditionally_approved, disapproved, not_checked} Example: 'dealsId=12345 AND dealsStatus:disapproved' */
  query?: string;
}

export const ListAccountsCreativesDealAssociationsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/creatives/{creativeId}/dealAssociations" }),
  svc,
) as unknown as Schema.Schema<ListAccountsCreativesDealAssociationsRequest>;

export type ListAccountsCreativesDealAssociationsResponse = ListDealAssociationsResponse;
export const ListAccountsCreativesDealAssociationsResponse = ListDealAssociationsResponse;

export type ListAccountsCreativesDealAssociationsError = CommonErrors;

export const listAccountsCreativesDealAssociations = API.makePaginated(() => ({
  input: ListAccountsCreativesDealAssociationsRequest,
  output: ListAccountsCreativesDealAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a client buyer with a given client account ID. */
export interface GetAccountsClientsRequest {
  /** Numerical account ID of the client's sponsor buyer. (required) */
  accountId: string;
  /** Numerical account ID of the client buyer to retrieve. (required) */
  clientAccountId: string;
}

export const GetAccountsClientsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  clientAccountId: Schema.String.pipe(T.HttpPath("clientAccountId")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/clients/{clientAccountId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsClientsRequest>;

export type GetAccountsClientsResponse = Client;
export const GetAccountsClientsResponse = Client;

export type GetAccountsClientsError = CommonErrors;

export const getAccountsClients: API.OperationMethod<GetAccountsClientsRequest, GetAccountsClientsResponse, GetAccountsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsClientsRequest,
  output: GetAccountsClientsResponse,
  errors: [],
}));

/** Lists all the clients for the current sponsor buyer. */
export interface ListAccountsClientsRequest {
  /** Unique numerical account ID of the sponsor buyer to list the clients for. */
  accountId: string;
  /** Requested page size. The server may return fewer clients than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListClientsResponse.nextPageToken returned from the previous call to the accounts.clients.list method. */
  pageToken?: string;
  /** Optional unique identifier (from the standpoint of an Ad Exchange sponsor buyer partner) of the client to return. If specified, at most one client will be returned in the response. */
  partnerClientId?: string;
}

export const ListAccountsClientsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  partnerClientId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerClientId")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/clients" }),
  svc,
) as unknown as Schema.Schema<ListAccountsClientsRequest>;

export type ListAccountsClientsResponse = ListClientsResponse;
export const ListAccountsClientsResponse = ListClientsResponse;

export type ListAccountsClientsError = CommonErrors;

export const listAccountsClients = API.makePaginated(() => ({
  input: ListAccountsClientsRequest,
  output: ListAccountsClientsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new client buyer. */
export interface CreateAccountsClientsRequest {
  /** Unique numerical account ID for the buyer of which the client buyer is a customer; the sponsor buyer to create a client for. (required) */
  accountId: string;
  /** Request body */
  body?: Client;
}

export const CreateAccountsClientsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Client).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/clients", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsClientsRequest>;

export type CreateAccountsClientsResponse = Client;
export const CreateAccountsClientsResponse = Client;

export type CreateAccountsClientsError = CommonErrors;

export const createAccountsClients: API.OperationMethod<CreateAccountsClientsRequest, CreateAccountsClientsResponse, CreateAccountsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsClientsRequest,
  output: CreateAccountsClientsResponse,
  errors: [],
}));

/** Updates an existing client buyer. */
export interface UpdateAccountsClientsRequest {
  /** Unique numerical account ID for the buyer of which the client buyer is a customer; the sponsor buyer to update a client for. (required) */
  accountId: string;
  /** Unique numerical account ID of the client to update. (required) */
  clientAccountId: string;
  /** Request body */
  body?: Client;
}

export const UpdateAccountsClientsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  clientAccountId: Schema.String.pipe(T.HttpPath("clientAccountId")),
  body: Schema.optional(Client).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2beta1/accounts/{accountId}/clients/{clientAccountId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsClientsRequest>;

export type UpdateAccountsClientsResponse = Client;
export const UpdateAccountsClientsResponse = Client;

export type UpdateAccountsClientsError = CommonErrors;

export const updateAccountsClients: API.OperationMethod<UpdateAccountsClientsRequest, UpdateAccountsClientsResponse, UpdateAccountsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsClientsRequest,
  output: UpdateAccountsClientsResponse,
  errors: [],
}));

/** Lists all the known client users for a specified sponsor buyer account ID. */
export interface ListAccountsClientsUsersRequest {
  /** Numerical account ID of the sponsor buyer of the client to list users for. (required) */
  accountId: string;
  /** The account ID of the client buyer to list users for. (required) You must specify either a string representation of a numerical account identifier or the `-` character to list all the client users for all the clients of a given sponsor buyer. */
  clientAccountId: string;
  /** Requested page size. The server may return fewer clients than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListClientUsersResponse.nextPageToken returned from the previous call to the accounts.clients.users.list method. */
  pageToken?: string;
}

export const ListAccountsClientsUsersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  clientAccountId: Schema.String.pipe(T.HttpPath("clientAccountId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/clients/{clientAccountId}/users" }),
  svc,
) as unknown as Schema.Schema<ListAccountsClientsUsersRequest>;

export type ListAccountsClientsUsersResponse = ListClientUsersResponse;
export const ListAccountsClientsUsersResponse = ListClientUsersResponse;

export type ListAccountsClientsUsersError = CommonErrors;

export const listAccountsClientsUsers = API.makePaginated(() => ({
  input: ListAccountsClientsUsersRequest,
  output: ListAccountsClientsUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing client user. Only the user status can be changed on update. */
export interface UpdateAccountsClientsUsersRequest {
  /** Numerical account ID of the client's sponsor buyer. (required) */
  accountId: string;
  /** Numerical account ID of the client buyer that the user to be retrieved is associated with. (required) */
  clientAccountId: string;
  /** Numerical identifier of the user to retrieve. (required) */
  userId: string;
  /** Request body */
  body?: ClientUser;
}

export const UpdateAccountsClientsUsersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  clientAccountId: Schema.String.pipe(T.HttpPath("clientAccountId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(ClientUser).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2beta1/accounts/{accountId}/clients/{clientAccountId}/users/{userId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsClientsUsersRequest>;

export type UpdateAccountsClientsUsersResponse = ClientUser;
export const UpdateAccountsClientsUsersResponse = ClientUser;

export type UpdateAccountsClientsUsersError = CommonErrors;

export const updateAccountsClientsUsers: API.OperationMethod<UpdateAccountsClientsUsersRequest, UpdateAccountsClientsUsersResponse, UpdateAccountsClientsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsClientsUsersRequest,
  output: UpdateAccountsClientsUsersResponse,
  errors: [],
}));

/** Retrieves an existing client user. */
export interface GetAccountsClientsUsersRequest {
  /** Numerical account ID of the client's sponsor buyer. (required) */
  accountId: string;
  /** Numerical account ID of the client buyer that the user to be retrieved is associated with. (required) */
  clientAccountId: string;
  /** Numerical identifier of the user to retrieve. (required) */
  userId: string;
}

export const GetAccountsClientsUsersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  clientAccountId: Schema.String.pipe(T.HttpPath("clientAccountId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/clients/{clientAccountId}/users/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsClientsUsersRequest>;

export type GetAccountsClientsUsersResponse = ClientUser;
export const GetAccountsClientsUsersResponse = ClientUser;

export type GetAccountsClientsUsersError = CommonErrors;

export const getAccountsClientsUsers: API.OperationMethod<GetAccountsClientsUsersRequest, GetAccountsClientsUsersResponse, GetAccountsClientsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsClientsUsersRequest,
  output: GetAccountsClientsUsersResponse,
  errors: [],
}));

/** Creates and sends out an email invitation to access an Ad Exchange client buyer account. */
export interface CreateAccountsClientsInvitationsRequest {
  /** Numerical account ID of the client's sponsor buyer. (required) */
  accountId: string;
  /** Numerical account ID of the client buyer that the user should be associated with. (required) */
  clientAccountId: string;
  /** Request body */
  body?: ClientUserInvitation;
}

export const CreateAccountsClientsInvitationsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  clientAccountId: Schema.String.pipe(T.HttpPath("clientAccountId")),
  body: Schema.optional(ClientUserInvitation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/clients/{clientAccountId}/invitations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsClientsInvitationsRequest>;

export type CreateAccountsClientsInvitationsResponse = ClientUserInvitation;
export const CreateAccountsClientsInvitationsResponse = ClientUserInvitation;

export type CreateAccountsClientsInvitationsError = CommonErrors;

export const createAccountsClientsInvitations: API.OperationMethod<CreateAccountsClientsInvitationsRequest, CreateAccountsClientsInvitationsResponse, CreateAccountsClientsInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsClientsInvitationsRequest,
  output: CreateAccountsClientsInvitationsResponse,
  errors: [],
}));

/** Retrieves an existing client user invitation. */
export interface GetAccountsClientsInvitationsRequest {
  /** Numerical account ID of the client's sponsor buyer. (required) */
  accountId: string;
  /** Numerical account ID of the client buyer that the user invitation to be retrieved is associated with. (required) */
  clientAccountId: string;
  /** Numerical identifier of the user invitation to retrieve. (required) */
  invitationId: string;
}

export const GetAccountsClientsInvitationsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  clientAccountId: Schema.String.pipe(T.HttpPath("clientAccountId")),
  invitationId: Schema.String.pipe(T.HttpPath("invitationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/clients/{clientAccountId}/invitations/{invitationId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsClientsInvitationsRequest>;

export type GetAccountsClientsInvitationsResponse = ClientUserInvitation;
export const GetAccountsClientsInvitationsResponse = ClientUserInvitation;

export type GetAccountsClientsInvitationsError = CommonErrors;

export const getAccountsClientsInvitations: API.OperationMethod<GetAccountsClientsInvitationsRequest, GetAccountsClientsInvitationsResponse, GetAccountsClientsInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsClientsInvitationsRequest,
  output: GetAccountsClientsInvitationsResponse,
  errors: [],
}));

/** Lists all the client users invitations for a client with a given account ID. */
export interface ListAccountsClientsInvitationsRequest {
  /** Numerical account ID of the client's sponsor buyer. (required) */
  accountId: string;
  /** Numerical account ID of the client buyer to list invitations for. (required) You must either specify a string representation of a numerical account identifier or the `-` character to list all the invitations for all the clients of a given sponsor buyer. */
  clientAccountId: string;
  /** Requested page size. Server may return fewer clients than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListClientUserInvitationsResponse.nextPageToken returned from the previous call to the clients.invitations.list method. */
  pageToken?: string;
}

export const ListAccountsClientsInvitationsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  clientAccountId: Schema.String.pipe(T.HttpPath("clientAccountId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/clients/{clientAccountId}/invitations" }),
  svc,
) as unknown as Schema.Schema<ListAccountsClientsInvitationsRequest>;

export type ListAccountsClientsInvitationsResponse = ListClientUserInvitationsResponse;
export const ListAccountsClientsInvitationsResponse = ListClientUserInvitationsResponse;

export type ListAccountsClientsInvitationsError = CommonErrors;

export const listAccountsClientsInvitations = API.makePaginated(() => ({
  input: ListAccountsClientsInvitationsRequest,
  output: ListAccountsClientsInvitationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a proposal given its ID. The proposal is returned at its head revision. */
export interface GetAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The unique ID of the proposal */
  proposalId: string;
}

export const GetAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/proposals/{proposalId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsProposalsRequest>;

export type GetAccountsProposalsResponse = Proposal;
export const GetAccountsProposalsResponse = Proposal;

export type GetAccountsProposalsError = CommonErrors;

export const getAccountsProposals: API.OperationMethod<GetAccountsProposalsRequest, GetAccountsProposalsResponse, GetAccountsProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsProposalsRequest,
  output: GetAccountsProposalsResponse,
  errors: [],
}));

/** Create the given proposal. Each created proposal and any deals it contains are assigned a unique ID by the server. */
export interface CreateAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** Request body */
  body?: Proposal;
}

export const CreateAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Proposal).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/proposals", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsProposalsRequest>;

export type CreateAccountsProposalsResponse = Proposal;
export const CreateAccountsProposalsResponse = Proposal;

export type CreateAccountsProposalsError = CommonErrors;

export const createAccountsProposals: API.OperationMethod<CreateAccountsProposalsRequest, CreateAccountsProposalsResponse, CreateAccountsProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsProposalsRequest,
  output: CreateAccountsProposalsResponse,
  errors: [],
}));

/** Update the given proposal at the client known revision number. If the server revision has advanced since the passed-in `proposal.proposal_revision`, an `ABORTED` error message will be returned. Only the buyer-modifiable fields of the proposal will be updated. Note that the deals in the proposal will be updated to match the passed-in copy. If a passed-in deal does not have a `deal_id`, the server will assign a new unique ID and create the deal. If passed-in deal has a `deal_id`, it will be updated to match the passed-in copy. Any existing deals not present in the passed-in proposal will be deleted. It is an error to pass in a deal with a `deal_id` not present at head. */
export interface UpdateAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The unique ID of the proposal. */
  proposalId: string;
  /** Request body */
  body?: Proposal;
}

export const UpdateAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(Proposal).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2beta1/accounts/{accountId}/proposals/{proposalId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsProposalsRequest>;

export type UpdateAccountsProposalsResponse = Proposal;
export const UpdateAccountsProposalsResponse = Proposal;

export type UpdateAccountsProposalsError = CommonErrors;

export const updateAccountsProposals: API.OperationMethod<UpdateAccountsProposalsRequest, UpdateAccountsProposalsResponse, UpdateAccountsProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsProposalsRequest,
  output: UpdateAccountsProposalsResponse,
  errors: [],
}));

/** List proposals. A filter expression (PQL query) may be specified to filter the results. To retrieve all finalized proposals, regardless if a proposal is being renegotiated, see the FinalizedProposals resource. Note that Bidder/ChildSeat relationships differ from the usual behavior. A Bidder account can only see its child seats' proposals by specifying the ChildSeat's accountId in the request path. */
export interface ListAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** An optional PQL filter query used to query for proposals. Nested repeated fields, such as proposal.deals.targetingCriterion, cannot be filtered. */
  filter?: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** The page token as returned from ListProposalsResponse. */
  pageToken?: string;
  /** Syntax the filter is written in. Current implementation defaults to PQL but in the future it will be LIST_FILTER. */
  filterSyntax?: "FILTER_SYNTAX_UNSPECIFIED" | "PQL" | "LIST_FILTER" | (string & {});
}

export const ListAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filterSyntax: Schema.optional(Schema.String).pipe(T.HttpQuery("filterSyntax")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/proposals" }),
  svc,
) as unknown as Schema.Schema<ListAccountsProposalsRequest>;

export type ListAccountsProposalsResponse = ListProposalsResponse;
export const ListAccountsProposalsResponse = ListProposalsResponse;

export type ListAccountsProposalsError = CommonErrors;

export const listAccountsProposals = API.makePaginated(() => ({
  input: ListAccountsProposalsRequest,
  output: ListAccountsProposalsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a new note and attach it to the proposal. The note is assigned a unique ID by the server. The proposal revision number will not increase when associated with a new note. */
export interface AddNoteAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The ID of the proposal to attach the note to. */
  proposalId: string;
  /** Request body */
  body?: AddNoteRequest;
}

export const AddNoteAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(AddNoteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/proposals/{proposalId}:addNote", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddNoteAccountsProposalsRequest>;

export type AddNoteAccountsProposalsResponse = Note;
export const AddNoteAccountsProposalsResponse = Note;

export type AddNoteAccountsProposalsError = CommonErrors;

export const addNoteAccountsProposals: API.OperationMethod<AddNoteAccountsProposalsRequest, AddNoteAccountsProposalsResponse, AddNoteAccountsProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddNoteAccountsProposalsRequest,
  output: AddNoteAccountsProposalsResponse,
  errors: [],
}));

/** Cancel an ongoing negotiation on a proposal. This does not cancel or end serving for the deals if the proposal has been finalized, but only cancels a negotiation unilaterally. */
export interface CancelNegotiationAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The ID of the proposal to cancel negotiation for. */
  proposalId: string;
  /** Request body */
  body?: CancelNegotiationRequest;
}

export const CancelNegotiationAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(CancelNegotiationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/proposals/{proposalId}:cancelNegotiation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelNegotiationAccountsProposalsRequest>;

export type CancelNegotiationAccountsProposalsResponse = Proposal;
export const CancelNegotiationAccountsProposalsResponse = Proposal;

export type CancelNegotiationAccountsProposalsError = CommonErrors;

export const cancelNegotiationAccountsProposals: API.OperationMethod<CancelNegotiationAccountsProposalsRequest, CancelNegotiationAccountsProposalsResponse, CancelNegotiationAccountsProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelNegotiationAccountsProposalsRequest,
  output: CancelNegotiationAccountsProposalsResponse,
  errors: [],
}));

/** Mark the proposal as accepted at the given revision number. If the number does not match the server's revision number an `ABORTED` error message will be returned. This call updates the proposal_state from `PROPOSED` to `BUYER_ACCEPTED`, or from `SELLER_ACCEPTED` to `FINALIZED`. Upon calling this endpoint, the buyer implicitly agrees to the terms and conditions optionally set within the proposal by the publisher. */
export interface AcceptAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The ID of the proposal to accept. */
  proposalId: string;
  /** Request body */
  body?: AcceptProposalRequest;
}

export const AcceptAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(AcceptProposalRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/proposals/{proposalId}:accept", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcceptAccountsProposalsRequest>;

export type AcceptAccountsProposalsResponse = Proposal;
export const AcceptAccountsProposalsResponse = Proposal;

export type AcceptAccountsProposalsError = CommonErrors;

export const acceptAccountsProposals: API.OperationMethod<AcceptAccountsProposalsRequest, AcceptAccountsProposalsResponse, AcceptAccountsProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcceptAccountsProposalsRequest,
  output: AcceptAccountsProposalsResponse,
  errors: [],
}));

/** You can opt-in to manually update proposals to indicate that setup is complete. By default, proposal setup is automatically completed after their deals are finalized. Contact your Technical Account Manager to opt in. Buyers can call this method when the proposal has been finalized, and all the required creatives have been uploaded using the Creatives API. This call updates the `is_setup_completed` field on the deals in the proposal, and notifies the seller. The server then advances the revision number of the most recent proposal. To mark an individual deal as ready to serve, call `buyers.finalizedDeals.setReadyToServe` in the Marketplace API. */
export interface CompleteSetupAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The ID of the proposal to mark as setup completed. */
  proposalId: string;
  /** Request body */
  body?: CompleteSetupRequest;
}

export const CompleteSetupAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(CompleteSetupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/proposals/{proposalId}:completeSetup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteSetupAccountsProposalsRequest>;

export type CompleteSetupAccountsProposalsResponse = Proposal;
export const CompleteSetupAccountsProposalsResponse = Proposal;

export type CompleteSetupAccountsProposalsError = CommonErrors;

export const completeSetupAccountsProposals: API.OperationMethod<CompleteSetupAccountsProposalsRequest, CompleteSetupAccountsProposalsResponse, CompleteSetupAccountsProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteSetupAccountsProposalsRequest,
  output: CompleteSetupAccountsProposalsResponse,
  errors: [],
}));

/** Update the given proposal to pause serving. This method will set the `DealServingMetadata.DealPauseStatus.has_buyer_paused` bit to true for all deals in the proposal. It is a no-op to pause an already-paused proposal. It is an error to call PauseProposal for a proposal that is not finalized or renegotiating. */
export interface PauseAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The ID of the proposal to pause. */
  proposalId: string;
  /** Request body */
  body?: PauseProposalRequest;
}

export const PauseAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(PauseProposalRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/proposals/{proposalId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseAccountsProposalsRequest>;

export type PauseAccountsProposalsResponse = Proposal;
export const PauseAccountsProposalsResponse = Proposal;

export type PauseAccountsProposalsError = CommonErrors;

export const pauseAccountsProposals: API.OperationMethod<PauseAccountsProposalsRequest, PauseAccountsProposalsResponse, PauseAccountsProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseAccountsProposalsRequest,
  output: PauseAccountsProposalsResponse,
  errors: [],
}));

/** Update the given proposal to resume serving. This method will set the `DealServingMetadata.DealPauseStatus.has_buyer_paused` bit to false for all deals in the proposal. Note that if the `has_seller_paused` bit is also set, serving will not resume until the seller also resumes. It is a no-op to resume an already-running proposal. It is an error to call ResumeProposal for a proposal that is not finalized or renegotiating. */
export interface ResumeAccountsProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The ID of the proposal to resume. */
  proposalId: string;
  /** Request body */
  body?: ResumeProposalRequest;
}

export const ResumeAccountsProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(ResumeProposalRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/proposals/{proposalId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeAccountsProposalsRequest>;

export type ResumeAccountsProposalsResponse = Proposal;
export const ResumeAccountsProposalsResponse = Proposal;

export type ResumeAccountsProposalsError = CommonErrors;

export const resumeAccountsProposals: API.OperationMethod<ResumeAccountsProposalsRequest, ResumeAccountsProposalsResponse, ResumeAccountsProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeAccountsProposalsRequest,
  output: ResumeAccountsProposalsResponse,
  errors: [],
}));

/** List finalized proposals, regardless if a proposal is being renegotiated. A filter expression (PQL query) may be specified to filter the results. The notes will not be returned. */
export interface ListAccountsFinalizedProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** An optional PQL filter query used to query for proposals. Nested repeated fields, such as proposal.deals.targetingCriterion, cannot be filtered. */
  filter?: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** The page token as returned from ListProposalsResponse. */
  pageToken?: string;
  /** Syntax the filter is written in. Current implementation defaults to PQL but in the future it will be LIST_FILTER. */
  filterSyntax?: "FILTER_SYNTAX_UNSPECIFIED" | "PQL" | "LIST_FILTER" | (string & {});
}

export const ListAccountsFinalizedProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filterSyntax: Schema.optional(Schema.String).pipe(T.HttpQuery("filterSyntax")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/finalizedProposals" }),
  svc,
) as unknown as Schema.Schema<ListAccountsFinalizedProposalsRequest>;

export type ListAccountsFinalizedProposalsResponse = ListProposalsResponse;
export const ListAccountsFinalizedProposalsResponse = ListProposalsResponse;

export type ListAccountsFinalizedProposalsError = CommonErrors;

export const listAccountsFinalizedProposals = API.makePaginated(() => ({
  input: ListAccountsFinalizedProposalsRequest,
  output: ListAccountsFinalizedProposalsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update given deals to pause serving. This method will set the `DealServingMetadata.DealPauseStatus.has_buyer_paused` bit to true for all listed deals in the request. Currently, this method only applies to PG and PD deals. For PA deals, call accounts.proposals.pause endpoint. It is a no-op to pause already-paused deals. It is an error to call PauseProposalDeals for deals which are not part of the proposal of proposal_id or which are not finalized or renegotiating. */
export interface PauseAccountsFinalizedProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The proposal_id of the proposal containing the deals. */
  proposalId: string;
  /** Request body */
  body?: PauseProposalDealsRequest;
}

export const PauseAccountsFinalizedProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(PauseProposalDealsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/finalizedProposals/{proposalId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseAccountsFinalizedProposalsRequest>;

export type PauseAccountsFinalizedProposalsResponse = Proposal;
export const PauseAccountsFinalizedProposalsResponse = Proposal;

export type PauseAccountsFinalizedProposalsError = CommonErrors;

export const pauseAccountsFinalizedProposals: API.OperationMethod<PauseAccountsFinalizedProposalsRequest, PauseAccountsFinalizedProposalsResponse, PauseAccountsFinalizedProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseAccountsFinalizedProposalsRequest,
  output: PauseAccountsFinalizedProposalsResponse,
  errors: [],
}));

/** Update given deals to resume serving. This method will set the `DealServingMetadata.DealPauseStatus.has_buyer_paused` bit to false for all listed deals in the request. Currently, this method only applies to PG and PD deals. For PA deals, call accounts.proposals.resume endpoint. It is a no-op to resume running deals or deals paused by the other party. It is an error to call ResumeProposalDeals for deals which are not part of the proposal of proposal_id or which are not finalized or renegotiating. */
export interface ResumeAccountsFinalizedProposalsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The proposal_id of the proposal containing the deals. */
  proposalId: string;
  /** Request body */
  body?: ResumeProposalDealsRequest;
}

export const ResumeAccountsFinalizedProposalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  proposalId: Schema.String.pipe(T.HttpPath("proposalId")),
  body: Schema.optional(ResumeProposalDealsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/accounts/{accountId}/finalizedProposals/{proposalId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeAccountsFinalizedProposalsRequest>;

export type ResumeAccountsFinalizedProposalsResponse = Proposal;
export const ResumeAccountsFinalizedProposalsResponse = Proposal;

export type ResumeAccountsFinalizedProposalsError = CommonErrors;

export const resumeAccountsFinalizedProposals: API.OperationMethod<ResumeAccountsFinalizedProposalsRequest, ResumeAccountsFinalizedProposalsResponse, ResumeAccountsFinalizedProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeAccountsFinalizedProposalsRequest,
  output: ResumeAccountsFinalizedProposalsResponse,
  errors: [],
}));

/** Gets the requested product by ID. */
export interface GetAccountsProductsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The ID for the product to get the head revision for. */
  productId: string;
}

export const GetAccountsProductsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/products/{productId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsProductsRequest>;

export type GetAccountsProductsResponse = Product;
export const GetAccountsProductsResponse = Product;

export type GetAccountsProductsError = CommonErrors;

export const getAccountsProducts: API.OperationMethod<GetAccountsProductsRequest, GetAccountsProductsResponse, GetAccountsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsProductsRequest,
  output: GetAccountsProductsResponse,
  errors: [],
}));

/** List all products visible to the buyer (optionally filtered by the specified PQL query). */
export interface ListAccountsProductsRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** An optional PQL query used to query for products. See https://developers.google.com/ad-manager/docs/pqlreference for documentation about PQL and examples. Nested repeated fields, such as product.targetingCriterion.inclusions, cannot be filtered. */
  filter?: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** The page token as returned from ListProductsResponse. */
  pageToken?: string;
}

export const ListAccountsProductsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/products" }),
  svc,
) as unknown as Schema.Schema<ListAccountsProductsRequest>;

export type ListAccountsProductsResponse = ListProductsResponse;
export const ListAccountsProductsResponse = ListProductsResponse;

export type ListAccountsProductsError = CommonErrors;

export const listAccountsProducts = API.makePaginated(() => ({
  input: ListAccountsProductsRequest,
  output: ListAccountsProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the requested publisher profile by id. */
export interface GetAccountsPublisherProfilesRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** The id for the publisher profile to get. */
  publisherProfileId: string;
}

export const GetAccountsPublisherProfilesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  publisherProfileId: Schema.String.pipe(T.HttpPath("publisherProfileId")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/publisherProfiles/{publisherProfileId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsPublisherProfilesRequest>;

export type GetAccountsPublisherProfilesResponse = PublisherProfile;
export const GetAccountsPublisherProfilesResponse = PublisherProfile;

export type GetAccountsPublisherProfilesError = CommonErrors;

export const getAccountsPublisherProfiles: API.OperationMethod<GetAccountsPublisherProfilesRequest, GetAccountsPublisherProfilesResponse, GetAccountsPublisherProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsPublisherProfilesRequest,
  output: GetAccountsPublisherProfilesResponse,
  errors: [],
}));

/** List all publisher profiles visible to the buyer */
export interface ListAccountsPublisherProfilesRequest {
  /** Account ID of the buyer. */
  accountId: string;
  /** Specify the number of results to include per page. */
  pageSize?: number;
  /** The page token as return from ListPublisherProfilesResponse. */
  pageToken?: string;
}

export const ListAccountsPublisherProfilesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/accounts/{accountId}/publisherProfiles" }),
  svc,
) as unknown as Schema.Schema<ListAccountsPublisherProfilesRequest>;

export type ListAccountsPublisherProfilesResponse = ListPublisherProfilesResponse;
export const ListAccountsPublisherProfilesResponse = ListPublisherProfilesResponse;

export type ListAccountsPublisherProfilesError = CommonErrors;

export const listAccountsPublisherProfiles = API.makePaginated(() => ({
  input: ListAccountsPublisherProfilesRequest,
  output: ListAccountsPublisherProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates the specified filter set for the account with the given account ID. */
export interface CreateBiddersAccountsFilterSetsRequest {
  /** Name of the owner (bidder or account) of the filter set to be created. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456` */
  ownerName: string;
  /** Whether the filter set is transient, or should be persisted indefinitely. By default, filter sets are not transient. If transient, it will be available for at least 1 hour after creation. */
  isTransient?: boolean;
  /** Request body */
  body?: FilterSet;
}

export const CreateBiddersAccountsFilterSetsRequest = Schema.Struct({
  ownerName: Schema.String.pipe(T.HttpPath("ownerName")),
  isTransient: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("isTransient")),
  body: Schema.optional(FilterSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBiddersAccountsFilterSetsRequest>;

export type CreateBiddersAccountsFilterSetsResponse = FilterSet;
export const CreateBiddersAccountsFilterSetsResponse = FilterSet;

export type CreateBiddersAccountsFilterSetsError = CommonErrors;

export const createBiddersAccountsFilterSets: API.OperationMethod<CreateBiddersAccountsFilterSetsRequest, CreateBiddersAccountsFilterSetsResponse, CreateBiddersAccountsFilterSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBiddersAccountsFilterSetsRequest,
  output: CreateBiddersAccountsFilterSetsResponse,
  errors: [],
}));

/** Retrieves the requested filter set for the account with the given account ID. */
export interface GetBiddersAccountsFilterSetsRequest {
  /** Full name of the resource being requested. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  name: string;
}

export const GetBiddersAccountsFilterSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}" }),
  svc,
) as unknown as Schema.Schema<GetBiddersAccountsFilterSetsRequest>;

export type GetBiddersAccountsFilterSetsResponse = FilterSet;
export const GetBiddersAccountsFilterSetsResponse = FilterSet;

export type GetBiddersAccountsFilterSetsError = CommonErrors;

export const getBiddersAccountsFilterSets: API.OperationMethod<GetBiddersAccountsFilterSetsRequest, GetBiddersAccountsFilterSetsResponse, GetBiddersAccountsFilterSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBiddersAccountsFilterSetsRequest,
  output: GetBiddersAccountsFilterSetsResponse,
  errors: [],
}));

/** Lists all filter sets for the account with the given account ID. */
export interface ListBiddersAccountsFilterSetsRequest {
  /** Name of the owner (bidder or account) of the filter sets to be listed. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456` */
  ownerName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListFilterSetsResponse.nextPageToken returned from the previous call to the accounts.filterSets.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsRequest = Schema.Struct({
  ownerName: Schema.String.pipe(T.HttpPath("ownerName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsRequest>;

export type ListBiddersAccountsFilterSetsResponse = ListFilterSetsResponse;
export const ListBiddersAccountsFilterSetsResponse = ListFilterSetsResponse;

export type ListBiddersAccountsFilterSetsError = CommonErrors;

export const listBiddersAccountsFilterSets = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsRequest,
  output: ListBiddersAccountsFilterSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the requested filter set from the account with the given account ID. */
export interface DeleteBiddersAccountsFilterSetsRequest {
  /** Full name of the resource to delete. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  name: string;
}

export const DeleteBiddersAccountsFilterSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBiddersAccountsFilterSetsRequest>;

export type DeleteBiddersAccountsFilterSetsResponse = Empty;
export const DeleteBiddersAccountsFilterSetsResponse = Empty;

export type DeleteBiddersAccountsFilterSetsError = CommonErrors;

export const deleteBiddersAccountsFilterSets: API.OperationMethod<DeleteBiddersAccountsFilterSetsRequest, DeleteBiddersAccountsFilterSetsResponse, DeleteBiddersAccountsFilterSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBiddersAccountsFilterSetsRequest,
  output: DeleteBiddersAccountsFilterSetsResponse,
  errors: [],
}));

/** Lists all metrics that are measured in terms of number of impressions. */
export interface ListBiddersAccountsFilterSetsImpressionMetricsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListImpressionMetricsResponse.nextPageToken returned from the previous call to the impressionMetrics.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsImpressionMetricsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/impressionMetrics" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsImpressionMetricsRequest>;

export type ListBiddersAccountsFilterSetsImpressionMetricsResponse = ListImpressionMetricsResponse;
export const ListBiddersAccountsFilterSetsImpressionMetricsResponse = ListImpressionMetricsResponse;

export type ListBiddersAccountsFilterSetsImpressionMetricsError = CommonErrors;

export const listBiddersAccountsFilterSetsImpressionMetrics = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsImpressionMetricsRequest,
  output: ListBiddersAccountsFilterSetsImpressionMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all metrics that are measured in terms of number of bids. */
export interface ListBiddersAccountsFilterSetsBidMetricsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBidMetricsResponse.nextPageToken returned from the previous call to the bidMetrics.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsBidMetricsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/bidMetrics" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsBidMetricsRequest>;

export type ListBiddersAccountsFilterSetsBidMetricsResponse = ListBidMetricsResponse;
export const ListBiddersAccountsFilterSetsBidMetricsResponse = ListBidMetricsResponse;

export type ListBiddersAccountsFilterSetsBidMetricsError = CommonErrors;

export const listBiddersAccountsFilterSetsBidMetrics = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsBidMetricsRequest,
  output: ListBiddersAccountsFilterSetsBidMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons that caused a bid request not to be sent for an impression, with the number of bid requests not sent for each reason. */
export interface ListBiddersAccountsFilterSetsFilteredBidRequestsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListFilteredBidRequestsResponse.nextPageToken returned from the previous call to the filteredBidRequests.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsFilteredBidRequestsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/filteredBidRequests" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsFilteredBidRequestsRequest>;

export type ListBiddersAccountsFilterSetsFilteredBidRequestsResponse = ListFilteredBidRequestsResponse;
export const ListBiddersAccountsFilterSetsFilteredBidRequestsResponse = ListFilteredBidRequestsResponse;

export type ListBiddersAccountsFilterSetsFilteredBidRequestsError = CommonErrors;

export const listBiddersAccountsFilterSetsFilteredBidRequests = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsFilteredBidRequestsRequest,
  output: ListBiddersAccountsFilterSetsFilteredBidRequestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all errors that occurred in bid responses, with the number of bid responses affected for each reason. */
export interface ListBiddersAccountsFilterSetsBidResponseErrorsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBidResponseErrorsResponse.nextPageToken returned from the previous call to the bidResponseErrors.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsBidResponseErrorsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/bidResponseErrors" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsBidResponseErrorsRequest>;

export type ListBiddersAccountsFilterSetsBidResponseErrorsResponse = ListBidResponseErrorsResponse;
export const ListBiddersAccountsFilterSetsBidResponseErrorsResponse = ListBidResponseErrorsResponse;

export type ListBiddersAccountsFilterSetsBidResponseErrorsError = CommonErrors;

export const listBiddersAccountsFilterSetsBidResponseErrors = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsBidResponseErrorsRequest,
  output: ListBiddersAccountsFilterSetsBidResponseErrorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which bid responses were considered to have no applicable bids, with the number of bid responses affected for each reason. */
export interface ListBiddersAccountsFilterSetsBidResponsesWithoutBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBidResponsesWithoutBidsResponse.nextPageToken returned from the previous call to the bidResponsesWithoutBids.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsBidResponsesWithoutBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/bidResponsesWithoutBids" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsBidResponsesWithoutBidsRequest>;

export type ListBiddersAccountsFilterSetsBidResponsesWithoutBidsResponse = ListBidResponsesWithoutBidsResponse;
export const ListBiddersAccountsFilterSetsBidResponsesWithoutBidsResponse = ListBidResponsesWithoutBidsResponse;

export type ListBiddersAccountsFilterSetsBidResponsesWithoutBidsError = CommonErrors;

export const listBiddersAccountsFilterSetsBidResponsesWithoutBids = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsBidResponsesWithoutBidsRequest,
  output: ListBiddersAccountsFilterSetsBidResponsesWithoutBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which bids were filtered, with the number of bids filtered for each reason. */
export interface ListBiddersAccountsFilterSetsFilteredBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListFilteredBidsResponse.nextPageToken returned from the previous call to the filteredBids.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsFilteredBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/filteredBids" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsFilteredBidsRequest>;

export type ListBiddersAccountsFilterSetsFilteredBidsResponse = ListFilteredBidsResponse;
export const ListBiddersAccountsFilterSetsFilteredBidsResponse = ListFilteredBidsResponse;

export type ListBiddersAccountsFilterSetsFilteredBidsError = CommonErrors;

export const listBiddersAccountsFilterSetsFilteredBids = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsFilteredBidsRequest,
  output: ListBiddersAccountsFilterSetsFilteredBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all details associated with a specific reason for which bids were filtered, with the number of bids filtered for each detail. */
export interface ListBiddersAccountsFilterSetsFilteredBidsDetailsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** The ID of the creative status for which to retrieve a breakdown by detail. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes). Details are only available for statuses 10, 14, 15, 17, 18, 19, 86, and 87. */
  creativeStatusId: number;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListCreativeStatusBreakdownByDetailResponse.nextPageToken returned from the previous call to the filteredBids.details.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsFilteredBidsDetailsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  creativeStatusId: Schema.Number.pipe(T.HttpPath("creativeStatusId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/filteredBids/{creativeStatusId}/details" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsFilteredBidsDetailsRequest>;

export type ListBiddersAccountsFilterSetsFilteredBidsDetailsResponse = ListCreativeStatusBreakdownByDetailResponse;
export const ListBiddersAccountsFilterSetsFilteredBidsDetailsResponse = ListCreativeStatusBreakdownByDetailResponse;

export type ListBiddersAccountsFilterSetsFilteredBidsDetailsError = CommonErrors;

export const listBiddersAccountsFilterSetsFilteredBidsDetails = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsFilteredBidsDetailsRequest,
  output: ListBiddersAccountsFilterSetsFilteredBidsDetailsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all creatives associated with a specific reason for which bids were filtered, with the number of bids filtered for each creative. */
export interface ListBiddersAccountsFilterSetsFilteredBidsCreativesRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** The ID of the creative status for which to retrieve a breakdown by creative. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes). */
  creativeStatusId: number;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListCreativeStatusBreakdownByCreativeResponse.nextPageToken returned from the previous call to the filteredBids.creatives.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsFilteredBidsCreativesRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  creativeStatusId: Schema.Number.pipe(T.HttpPath("creativeStatusId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/filteredBids/{creativeStatusId}/creatives" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsFilteredBidsCreativesRequest>;

export type ListBiddersAccountsFilterSetsFilteredBidsCreativesResponse = ListCreativeStatusBreakdownByCreativeResponse;
export const ListBiddersAccountsFilterSetsFilteredBidsCreativesResponse = ListCreativeStatusBreakdownByCreativeResponse;

export type ListBiddersAccountsFilterSetsFilteredBidsCreativesError = CommonErrors;

export const listBiddersAccountsFilterSetsFilteredBidsCreatives = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsFilteredBidsCreativesRequest,
  output: ListBiddersAccountsFilterSetsFilteredBidsCreativesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which bids lost in the auction, with the number of bids that lost for each reason. */
export interface ListBiddersAccountsFilterSetsLosingBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListLosingBidsResponse.nextPageToken returned from the previous call to the losingBids.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsLosingBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/losingBids" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsLosingBidsRequest>;

export type ListBiddersAccountsFilterSetsLosingBidsResponse = ListLosingBidsResponse;
export const ListBiddersAccountsFilterSetsLosingBidsResponse = ListLosingBidsResponse;

export type ListBiddersAccountsFilterSetsLosingBidsError = CommonErrors;

export const listBiddersAccountsFilterSetsLosingBids = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsLosingBidsRequest,
  output: ListBiddersAccountsFilterSetsLosingBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which winning bids were not billable, with the number of bids not billed for each reason. */
export interface ListBiddersAccountsFilterSetsNonBillableWinningBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListNonBillableWinningBidsResponse.nextPageToken returned from the previous call to the nonBillableWinningBids.list method. */
  pageToken?: string;
}

export const ListBiddersAccountsFilterSetsNonBillableWinningBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/accounts/{accountsId}/filterSets/{filterSetsId}/nonBillableWinningBids" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAccountsFilterSetsNonBillableWinningBidsRequest>;

export type ListBiddersAccountsFilterSetsNonBillableWinningBidsResponse = ListNonBillableWinningBidsResponse;
export const ListBiddersAccountsFilterSetsNonBillableWinningBidsResponse = ListNonBillableWinningBidsResponse;

export type ListBiddersAccountsFilterSetsNonBillableWinningBidsError = CommonErrors;

export const listBiddersAccountsFilterSetsNonBillableWinningBids = API.makePaginated(() => ({
  input: ListBiddersAccountsFilterSetsNonBillableWinningBidsRequest,
  output: ListBiddersAccountsFilterSetsNonBillableWinningBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates the specified filter set for the account with the given account ID. */
export interface CreateBiddersFilterSetsRequest {
  /** Name of the owner (bidder or account) of the filter set to be created. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456` */
  ownerName: string;
  /** Whether the filter set is transient, or should be persisted indefinitely. By default, filter sets are not transient. If transient, it will be available for at least 1 hour after creation. */
  isTransient?: boolean;
  /** Request body */
  body?: FilterSet;
}

export const CreateBiddersFilterSetsRequest = Schema.Struct({
  ownerName: Schema.String.pipe(T.HttpPath("ownerName")),
  isTransient: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("isTransient")),
  body: Schema.optional(FilterSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/bidders/{biddersId}/filterSets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBiddersFilterSetsRequest>;

export type CreateBiddersFilterSetsResponse = FilterSet;
export const CreateBiddersFilterSetsResponse = FilterSet;

export type CreateBiddersFilterSetsError = CommonErrors;

export const createBiddersFilterSets: API.OperationMethod<CreateBiddersFilterSetsRequest, CreateBiddersFilterSetsResponse, CreateBiddersFilterSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBiddersFilterSetsRequest,
  output: CreateBiddersFilterSetsResponse,
  errors: [],
}));

/** Retrieves the requested filter set for the account with the given account ID. */
export interface GetBiddersFilterSetsRequest {
  /** Full name of the resource being requested. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  name: string;
}

export const GetBiddersFilterSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}" }),
  svc,
) as unknown as Schema.Schema<GetBiddersFilterSetsRequest>;

export type GetBiddersFilterSetsResponse = FilterSet;
export const GetBiddersFilterSetsResponse = FilterSet;

export type GetBiddersFilterSetsError = CommonErrors;

export const getBiddersFilterSets: API.OperationMethod<GetBiddersFilterSetsRequest, GetBiddersFilterSetsResponse, GetBiddersFilterSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBiddersFilterSetsRequest,
  output: GetBiddersFilterSetsResponse,
  errors: [],
}));

/** Lists all filter sets for the account with the given account ID. */
export interface ListBiddersFilterSetsRequest {
  /** Name of the owner (bidder or account) of the filter sets to be listed. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456` */
  ownerName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListFilterSetsResponse.nextPageToken returned from the previous call to the accounts.filterSets.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsRequest = Schema.Struct({
  ownerName: Schema.String.pipe(T.HttpPath("ownerName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsRequest>;

export type ListBiddersFilterSetsResponse = ListFilterSetsResponse;
export const ListBiddersFilterSetsResponse = ListFilterSetsResponse;

export type ListBiddersFilterSetsError = CommonErrors;

export const listBiddersFilterSets = API.makePaginated(() => ({
  input: ListBiddersFilterSetsRequest,
  output: ListBiddersFilterSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the requested filter set from the account with the given account ID. */
export interface DeleteBiddersFilterSetsRequest {
  /** Full name of the resource to delete. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  name: string;
}

export const DeleteBiddersFilterSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBiddersFilterSetsRequest>;

export type DeleteBiddersFilterSetsResponse = Empty;
export const DeleteBiddersFilterSetsResponse = Empty;

export type DeleteBiddersFilterSetsError = CommonErrors;

export const deleteBiddersFilterSets: API.OperationMethod<DeleteBiddersFilterSetsRequest, DeleteBiddersFilterSetsResponse, DeleteBiddersFilterSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBiddersFilterSetsRequest,
  output: DeleteBiddersFilterSetsResponse,
  errors: [],
}));

/** Lists all metrics that are measured in terms of number of impressions. */
export interface ListBiddersFilterSetsImpressionMetricsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListImpressionMetricsResponse.nextPageToken returned from the previous call to the impressionMetrics.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsImpressionMetricsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/impressionMetrics" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsImpressionMetricsRequest>;

export type ListBiddersFilterSetsImpressionMetricsResponse = ListImpressionMetricsResponse;
export const ListBiddersFilterSetsImpressionMetricsResponse = ListImpressionMetricsResponse;

export type ListBiddersFilterSetsImpressionMetricsError = CommonErrors;

export const listBiddersFilterSetsImpressionMetrics = API.makePaginated(() => ({
  input: ListBiddersFilterSetsImpressionMetricsRequest,
  output: ListBiddersFilterSetsImpressionMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all metrics that are measured in terms of number of bids. */
export interface ListBiddersFilterSetsBidMetricsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBidMetricsResponse.nextPageToken returned from the previous call to the bidMetrics.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsBidMetricsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/bidMetrics" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsBidMetricsRequest>;

export type ListBiddersFilterSetsBidMetricsResponse = ListBidMetricsResponse;
export const ListBiddersFilterSetsBidMetricsResponse = ListBidMetricsResponse;

export type ListBiddersFilterSetsBidMetricsError = CommonErrors;

export const listBiddersFilterSetsBidMetrics = API.makePaginated(() => ({
  input: ListBiddersFilterSetsBidMetricsRequest,
  output: ListBiddersFilterSetsBidMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons that caused a bid request not to be sent for an impression, with the number of bid requests not sent for each reason. */
export interface ListBiddersFilterSetsFilteredBidRequestsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListFilteredBidRequestsResponse.nextPageToken returned from the previous call to the filteredBidRequests.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsFilteredBidRequestsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/filteredBidRequests" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsFilteredBidRequestsRequest>;

export type ListBiddersFilterSetsFilteredBidRequestsResponse = ListFilteredBidRequestsResponse;
export const ListBiddersFilterSetsFilteredBidRequestsResponse = ListFilteredBidRequestsResponse;

export type ListBiddersFilterSetsFilteredBidRequestsError = CommonErrors;

export const listBiddersFilterSetsFilteredBidRequests = API.makePaginated(() => ({
  input: ListBiddersFilterSetsFilteredBidRequestsRequest,
  output: ListBiddersFilterSetsFilteredBidRequestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all errors that occurred in bid responses, with the number of bid responses affected for each reason. */
export interface ListBiddersFilterSetsBidResponseErrorsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBidResponseErrorsResponse.nextPageToken returned from the previous call to the bidResponseErrors.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsBidResponseErrorsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/bidResponseErrors" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsBidResponseErrorsRequest>;

export type ListBiddersFilterSetsBidResponseErrorsResponse = ListBidResponseErrorsResponse;
export const ListBiddersFilterSetsBidResponseErrorsResponse = ListBidResponseErrorsResponse;

export type ListBiddersFilterSetsBidResponseErrorsError = CommonErrors;

export const listBiddersFilterSetsBidResponseErrors = API.makePaginated(() => ({
  input: ListBiddersFilterSetsBidResponseErrorsRequest,
  output: ListBiddersFilterSetsBidResponseErrorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which bid responses were considered to have no applicable bids, with the number of bid responses affected for each reason. */
export interface ListBiddersFilterSetsBidResponsesWithoutBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBidResponsesWithoutBidsResponse.nextPageToken returned from the previous call to the bidResponsesWithoutBids.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsBidResponsesWithoutBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/bidResponsesWithoutBids" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsBidResponsesWithoutBidsRequest>;

export type ListBiddersFilterSetsBidResponsesWithoutBidsResponse = ListBidResponsesWithoutBidsResponse;
export const ListBiddersFilterSetsBidResponsesWithoutBidsResponse = ListBidResponsesWithoutBidsResponse;

export type ListBiddersFilterSetsBidResponsesWithoutBidsError = CommonErrors;

export const listBiddersFilterSetsBidResponsesWithoutBids = API.makePaginated(() => ({
  input: ListBiddersFilterSetsBidResponsesWithoutBidsRequest,
  output: ListBiddersFilterSetsBidResponsesWithoutBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which bids were filtered, with the number of bids filtered for each reason. */
export interface ListBiddersFilterSetsFilteredBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListFilteredBidsResponse.nextPageToken returned from the previous call to the filteredBids.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsFilteredBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/filteredBids" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsFilteredBidsRequest>;

export type ListBiddersFilterSetsFilteredBidsResponse = ListFilteredBidsResponse;
export const ListBiddersFilterSetsFilteredBidsResponse = ListFilteredBidsResponse;

export type ListBiddersFilterSetsFilteredBidsError = CommonErrors;

export const listBiddersFilterSetsFilteredBids = API.makePaginated(() => ({
  input: ListBiddersFilterSetsFilteredBidsRequest,
  output: ListBiddersFilterSetsFilteredBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all details associated with a specific reason for which bids were filtered, with the number of bids filtered for each detail. */
export interface ListBiddersFilterSetsFilteredBidsDetailsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** The ID of the creative status for which to retrieve a breakdown by detail. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes). Details are only available for statuses 10, 14, 15, 17, 18, 19, 86, and 87. */
  creativeStatusId: number;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListCreativeStatusBreakdownByDetailResponse.nextPageToken returned from the previous call to the filteredBids.details.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsFilteredBidsDetailsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  creativeStatusId: Schema.Number.pipe(T.HttpPath("creativeStatusId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/filteredBids/{creativeStatusId}/details" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsFilteredBidsDetailsRequest>;

export type ListBiddersFilterSetsFilteredBidsDetailsResponse = ListCreativeStatusBreakdownByDetailResponse;
export const ListBiddersFilterSetsFilteredBidsDetailsResponse = ListCreativeStatusBreakdownByDetailResponse;

export type ListBiddersFilterSetsFilteredBidsDetailsError = CommonErrors;

export const listBiddersFilterSetsFilteredBidsDetails = API.makePaginated(() => ({
  input: ListBiddersFilterSetsFilteredBidsDetailsRequest,
  output: ListBiddersFilterSetsFilteredBidsDetailsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all creatives associated with a specific reason for which bids were filtered, with the number of bids filtered for each creative. */
export interface ListBiddersFilterSetsFilteredBidsCreativesRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** The ID of the creative status for which to retrieve a breakdown by creative. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes). */
  creativeStatusId: number;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListCreativeStatusBreakdownByCreativeResponse.nextPageToken returned from the previous call to the filteredBids.creatives.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsFilteredBidsCreativesRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  creativeStatusId: Schema.Number.pipe(T.HttpPath("creativeStatusId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/filteredBids/{creativeStatusId}/creatives" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsFilteredBidsCreativesRequest>;

export type ListBiddersFilterSetsFilteredBidsCreativesResponse = ListCreativeStatusBreakdownByCreativeResponse;
export const ListBiddersFilterSetsFilteredBidsCreativesResponse = ListCreativeStatusBreakdownByCreativeResponse;

export type ListBiddersFilterSetsFilteredBidsCreativesError = CommonErrors;

export const listBiddersFilterSetsFilteredBidsCreatives = API.makePaginated(() => ({
  input: ListBiddersFilterSetsFilteredBidsCreativesRequest,
  output: ListBiddersFilterSetsFilteredBidsCreativesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which bids lost in the auction, with the number of bids that lost for each reason. */
export interface ListBiddersFilterSetsLosingBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListLosingBidsResponse.nextPageToken returned from the previous call to the losingBids.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsLosingBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/losingBids" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsLosingBidsRequest>;

export type ListBiddersFilterSetsLosingBidsResponse = ListLosingBidsResponse;
export const ListBiddersFilterSetsLosingBidsResponse = ListLosingBidsResponse;

export type ListBiddersFilterSetsLosingBidsError = CommonErrors;

export const listBiddersFilterSetsLosingBids = API.makePaginated(() => ({
  input: ListBiddersFilterSetsLosingBidsRequest,
  output: ListBiddersFilterSetsLosingBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which winning bids were not billable, with the number of bids not billed for each reason. */
export interface ListBiddersFilterSetsNonBillableWinningBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListNonBillableWinningBidsResponse.nextPageToken returned from the previous call to the nonBillableWinningBids.list method. */
  pageToken?: string;
}

export const ListBiddersFilterSetsNonBillableWinningBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/bidders/{biddersId}/filterSets/{filterSetsId}/nonBillableWinningBids" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFilterSetsNonBillableWinningBidsRequest>;

export type ListBiddersFilterSetsNonBillableWinningBidsResponse = ListNonBillableWinningBidsResponse;
export const ListBiddersFilterSetsNonBillableWinningBidsResponse = ListNonBillableWinningBidsResponse;

export type ListBiddersFilterSetsNonBillableWinningBidsError = CommonErrors;

export const listBiddersFilterSetsNonBillableWinningBids = API.makePaginated(() => ({
  input: ListBiddersFilterSetsNonBillableWinningBidsRequest,
  output: ListBiddersFilterSetsNonBillableWinningBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates the specified filter set for the account with the given account ID. */
export interface CreateBuyersFilterSetsRequest {
  /** Name of the owner (bidder or account) of the filter set to be created. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456` */
  ownerName: string;
  /** Whether the filter set is transient, or should be persisted indefinitely. By default, filter sets are not transient. If transient, it will be available for at least 1 hour after creation. */
  isTransient?: boolean;
  /** Request body */
  body?: FilterSet;
}

export const CreateBuyersFilterSetsRequest = Schema.Struct({
  ownerName: Schema.String.pipe(T.HttpPath("ownerName")),
  isTransient: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("isTransient")),
  body: Schema.optional(FilterSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/buyers/{buyersId}/filterSets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBuyersFilterSetsRequest>;

export type CreateBuyersFilterSetsResponse = FilterSet;
export const CreateBuyersFilterSetsResponse = FilterSet;

export type CreateBuyersFilterSetsError = CommonErrors;

export const createBuyersFilterSets: API.OperationMethod<CreateBuyersFilterSetsRequest, CreateBuyersFilterSetsResponse, CreateBuyersFilterSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBuyersFilterSetsRequest,
  output: CreateBuyersFilterSetsResponse,
  errors: [],
}));

/** Retrieves the requested filter set for the account with the given account ID. */
export interface GetBuyersFilterSetsRequest {
  /** Full name of the resource being requested. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  name: string;
}

export const GetBuyersFilterSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersFilterSetsRequest>;

export type GetBuyersFilterSetsResponse = FilterSet;
export const GetBuyersFilterSetsResponse = FilterSet;

export type GetBuyersFilterSetsError = CommonErrors;

export const getBuyersFilterSets: API.OperationMethod<GetBuyersFilterSetsRequest, GetBuyersFilterSetsResponse, GetBuyersFilterSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersFilterSetsRequest,
  output: GetBuyersFilterSetsResponse,
  errors: [],
}));

/** Lists all filter sets for the account with the given account ID. */
export interface ListBuyersFilterSetsRequest {
  /** Name of the owner (bidder or account) of the filter sets to be listed. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456` */
  ownerName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListFilterSetsResponse.nextPageToken returned from the previous call to the accounts.filterSets.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsRequest = Schema.Struct({
  ownerName: Schema.String.pipe(T.HttpPath("ownerName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsRequest>;

export type ListBuyersFilterSetsResponse = ListFilterSetsResponse;
export const ListBuyersFilterSetsResponse = ListFilterSetsResponse;

export type ListBuyersFilterSetsError = CommonErrors;

export const listBuyersFilterSets = API.makePaginated(() => ({
  input: ListBuyersFilterSetsRequest,
  output: ListBuyersFilterSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the requested filter set from the account with the given account ID. */
export interface DeleteBuyersFilterSetsRequest {
  /** Full name of the resource to delete. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  name: string;
}

export const DeleteBuyersFilterSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBuyersFilterSetsRequest>;

export type DeleteBuyersFilterSetsResponse = Empty;
export const DeleteBuyersFilterSetsResponse = Empty;

export type DeleteBuyersFilterSetsError = CommonErrors;

export const deleteBuyersFilterSets: API.OperationMethod<DeleteBuyersFilterSetsRequest, DeleteBuyersFilterSetsResponse, DeleteBuyersFilterSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBuyersFilterSetsRequest,
  output: DeleteBuyersFilterSetsResponse,
  errors: [],
}));

/** Lists all metrics that are measured in terms of number of impressions. */
export interface ListBuyersFilterSetsImpressionMetricsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListImpressionMetricsResponse.nextPageToken returned from the previous call to the impressionMetrics.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsImpressionMetricsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/impressionMetrics" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsImpressionMetricsRequest>;

export type ListBuyersFilterSetsImpressionMetricsResponse = ListImpressionMetricsResponse;
export const ListBuyersFilterSetsImpressionMetricsResponse = ListImpressionMetricsResponse;

export type ListBuyersFilterSetsImpressionMetricsError = CommonErrors;

export const listBuyersFilterSetsImpressionMetrics = API.makePaginated(() => ({
  input: ListBuyersFilterSetsImpressionMetricsRequest,
  output: ListBuyersFilterSetsImpressionMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all metrics that are measured in terms of number of bids. */
export interface ListBuyersFilterSetsBidMetricsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBidMetricsResponse.nextPageToken returned from the previous call to the bidMetrics.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsBidMetricsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/bidMetrics" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsBidMetricsRequest>;

export type ListBuyersFilterSetsBidMetricsResponse = ListBidMetricsResponse;
export const ListBuyersFilterSetsBidMetricsResponse = ListBidMetricsResponse;

export type ListBuyersFilterSetsBidMetricsError = CommonErrors;

export const listBuyersFilterSetsBidMetrics = API.makePaginated(() => ({
  input: ListBuyersFilterSetsBidMetricsRequest,
  output: ListBuyersFilterSetsBidMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons that caused a bid request not to be sent for an impression, with the number of bid requests not sent for each reason. */
export interface ListBuyersFilterSetsFilteredBidRequestsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListFilteredBidRequestsResponse.nextPageToken returned from the previous call to the filteredBidRequests.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsFilteredBidRequestsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/filteredBidRequests" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsFilteredBidRequestsRequest>;

export type ListBuyersFilterSetsFilteredBidRequestsResponse = ListFilteredBidRequestsResponse;
export const ListBuyersFilterSetsFilteredBidRequestsResponse = ListFilteredBidRequestsResponse;

export type ListBuyersFilterSetsFilteredBidRequestsError = CommonErrors;

export const listBuyersFilterSetsFilteredBidRequests = API.makePaginated(() => ({
  input: ListBuyersFilterSetsFilteredBidRequestsRequest,
  output: ListBuyersFilterSetsFilteredBidRequestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all errors that occurred in bid responses, with the number of bid responses affected for each reason. */
export interface ListBuyersFilterSetsBidResponseErrorsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBidResponseErrorsResponse.nextPageToken returned from the previous call to the bidResponseErrors.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsBidResponseErrorsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/bidResponseErrors" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsBidResponseErrorsRequest>;

export type ListBuyersFilterSetsBidResponseErrorsResponse = ListBidResponseErrorsResponse;
export const ListBuyersFilterSetsBidResponseErrorsResponse = ListBidResponseErrorsResponse;

export type ListBuyersFilterSetsBidResponseErrorsError = CommonErrors;

export const listBuyersFilterSetsBidResponseErrors = API.makePaginated(() => ({
  input: ListBuyersFilterSetsBidResponseErrorsRequest,
  output: ListBuyersFilterSetsBidResponseErrorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which bid responses were considered to have no applicable bids, with the number of bid responses affected for each reason. */
export interface ListBuyersFilterSetsBidResponsesWithoutBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBidResponsesWithoutBidsResponse.nextPageToken returned from the previous call to the bidResponsesWithoutBids.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsBidResponsesWithoutBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/bidResponsesWithoutBids" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsBidResponsesWithoutBidsRequest>;

export type ListBuyersFilterSetsBidResponsesWithoutBidsResponse = ListBidResponsesWithoutBidsResponse;
export const ListBuyersFilterSetsBidResponsesWithoutBidsResponse = ListBidResponsesWithoutBidsResponse;

export type ListBuyersFilterSetsBidResponsesWithoutBidsError = CommonErrors;

export const listBuyersFilterSetsBidResponsesWithoutBids = API.makePaginated(() => ({
  input: ListBuyersFilterSetsBidResponsesWithoutBidsRequest,
  output: ListBuyersFilterSetsBidResponsesWithoutBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which bids were filtered, with the number of bids filtered for each reason. */
export interface ListBuyersFilterSetsFilteredBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListFilteredBidsResponse.nextPageToken returned from the previous call to the filteredBids.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsFilteredBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/filteredBids" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsFilteredBidsRequest>;

export type ListBuyersFilterSetsFilteredBidsResponse = ListFilteredBidsResponse;
export const ListBuyersFilterSetsFilteredBidsResponse = ListFilteredBidsResponse;

export type ListBuyersFilterSetsFilteredBidsError = CommonErrors;

export const listBuyersFilterSetsFilteredBids = API.makePaginated(() => ({
  input: ListBuyersFilterSetsFilteredBidsRequest,
  output: ListBuyersFilterSetsFilteredBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all details associated with a specific reason for which bids were filtered, with the number of bids filtered for each detail. */
export interface ListBuyersFilterSetsFilteredBidsDetailsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** The ID of the creative status for which to retrieve a breakdown by detail. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes). Details are only available for statuses 10, 14, 15, 17, 18, 19, 86, and 87. */
  creativeStatusId: number;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListCreativeStatusBreakdownByDetailResponse.nextPageToken returned from the previous call to the filteredBids.details.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsFilteredBidsDetailsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  creativeStatusId: Schema.Number.pipe(T.HttpPath("creativeStatusId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/filteredBids/{creativeStatusId}/details" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsFilteredBidsDetailsRequest>;

export type ListBuyersFilterSetsFilteredBidsDetailsResponse = ListCreativeStatusBreakdownByDetailResponse;
export const ListBuyersFilterSetsFilteredBidsDetailsResponse = ListCreativeStatusBreakdownByDetailResponse;

export type ListBuyersFilterSetsFilteredBidsDetailsError = CommonErrors;

export const listBuyersFilterSetsFilteredBidsDetails = API.makePaginated(() => ({
  input: ListBuyersFilterSetsFilteredBidsDetailsRequest,
  output: ListBuyersFilterSetsFilteredBidsDetailsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all creatives associated with a specific reason for which bids were filtered, with the number of bids filtered for each creative. */
export interface ListBuyersFilterSetsFilteredBidsCreativesRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** The ID of the creative status for which to retrieve a breakdown by creative. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes). */
  creativeStatusId: number;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListCreativeStatusBreakdownByCreativeResponse.nextPageToken returned from the previous call to the filteredBids.creatives.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsFilteredBidsCreativesRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  creativeStatusId: Schema.Number.pipe(T.HttpPath("creativeStatusId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/filteredBids/{creativeStatusId}/creatives" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsFilteredBidsCreativesRequest>;

export type ListBuyersFilterSetsFilteredBidsCreativesResponse = ListCreativeStatusBreakdownByCreativeResponse;
export const ListBuyersFilterSetsFilteredBidsCreativesResponse = ListCreativeStatusBreakdownByCreativeResponse;

export type ListBuyersFilterSetsFilteredBidsCreativesError = CommonErrors;

export const listBuyersFilterSetsFilteredBidsCreatives = API.makePaginated(() => ({
  input: ListBuyersFilterSetsFilteredBidsCreativesRequest,
  output: ListBuyersFilterSetsFilteredBidsCreativesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which bids lost in the auction, with the number of bids that lost for each reason. */
export interface ListBuyersFilterSetsLosingBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListLosingBidsResponse.nextPageToken returned from the previous call to the losingBids.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsLosingBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/losingBids" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsLosingBidsRequest>;

export type ListBuyersFilterSetsLosingBidsResponse = ListLosingBidsResponse;
export const ListBuyersFilterSetsLosingBidsResponse = ListLosingBidsResponse;

export type ListBuyersFilterSetsLosingBidsError = CommonErrors;

export const listBuyersFilterSetsLosingBids = API.makePaginated(() => ({
  input: ListBuyersFilterSetsLosingBidsRequest,
  output: ListBuyersFilterSetsLosingBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all reasons for which winning bids were not billable, with the number of bids not billed for each reason. */
export interface ListBuyersFilterSetsNonBillableWinningBidsRequest {
  /** Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc` */
  filterSetName: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListNonBillableWinningBidsResponse.nextPageToken returned from the previous call to the nonBillableWinningBids.list method. */
  pageToken?: string;
}

export const ListBuyersFilterSetsNonBillableWinningBidsRequest = Schema.Struct({
  filterSetName: Schema.String.pipe(T.HttpPath("filterSetName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/buyers/{buyersId}/filterSets/{filterSetsId}/nonBillableWinningBids" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFilterSetsNonBillableWinningBidsRequest>;

export type ListBuyersFilterSetsNonBillableWinningBidsResponse = ListNonBillableWinningBidsResponse;
export const ListBuyersFilterSetsNonBillableWinningBidsResponse = ListNonBillableWinningBidsResponse;

export type ListBuyersFilterSetsNonBillableWinningBidsError = CommonErrors;

export const listBuyersFilterSetsNonBillableWinningBids = API.makePaginated(() => ({
  input: ListBuyersFilterSetsNonBillableWinningBidsRequest,
  output: ListBuyersFilterSetsNonBillableWinningBidsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

