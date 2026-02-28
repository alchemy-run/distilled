// ==========================================================================
// Real-time Bidding API (realtimebidding v1)
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
  name: "realtimebidding",
  version: "v1",
  rootUrl: "https://realtimebidding.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Bidder {
  /** Output only. Name of the bidder resource that must follow the pattern `bidders/{bidderAccountId}`, where `{bidderAccountId}` is the account ID of the bidder whose information is to be received. One can get their account ID on the Authorized Buyers or Open Bidding UI, or by contacting their Google account manager. */
  name?: string;
  /** Output only. The base URL used in cookie match requests. Refer to https://developers.google.com/authorized-buyers/rtb/cookie-guide for further information. */
  cookieMatchingUrl?: string;
  /** Output only. The buyer's network ID used for cookie matching. This ID corresponds to the `google_nid` parameter in the URL used in cookie match requests. Refer to https://developers.google.com/authorized-buyers/rtb/cookie-guide for further information. */
  cookieMatchingNetworkId?: string;
  /** Output only. An option to bypass pretargeting for private auctions and preferred deals. When true, bid requests from these nonguaranteed deals will always be sent. When false, bid requests will be subject to regular pretargeting configurations. Programmatic Guaranteed deals will always be sent to the bidder, regardless of the value for this option. Auction packages are not impacted by this value and are subject to the regular pretargeting configurations. */
  bypassNonguaranteedDealsPretargeting?: boolean;
  /** Output only. The billing ID for the deals pretargeting config. This billing ID is sent on the bid request for guaranteed and nonguaranteed deals matched in pretargeting. */
  dealsBillingId?: string;
}

export const Bidder: Schema.Schema<Bidder> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  cookieMatchingUrl: Schema.optional(Schema.String),
  cookieMatchingNetworkId: Schema.optional(Schema.String),
  bypassNonguaranteedDealsPretargeting: Schema.optional(Schema.Boolean),
  dealsBillingId: Schema.optional(Schema.String),
})).annotate({ identifier: "Bidder" }) as any as Schema.Schema<Bidder>;

export interface ListBiddersResponse {
  /** List of bidders. */
  bidders?: Array<Bidder>;
  /** A token which can be passed to a subsequent call to the `ListBidders` method to retrieve the next page of results in ListBiddersRequest.pageToken. */
  nextPageToken?: string;
}

export const ListBiddersResponse: Schema.Schema<ListBiddersResponse> = Schema.suspend(() => Schema.Struct({
  bidders: Schema.optional(Schema.Array(Bidder)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBiddersResponse" }) as any as Schema.Schema<ListBiddersResponse>;

export interface Endpoint {
  /** Output only. Name of the endpoint resource that must follow the pattern `bidders/{bidderAccountId}/endpoints/{endpointId}`, where {bidderAccountId} is the account ID of the bidder who operates this endpoint, and {endpointId} is a unique ID assigned by the server. */
  name?: string;
  /** Output only. The URL that bid requests should be sent to. */
  url?: string;
  /** The maximum number of queries per second allowed to be sent to this server. */
  maximumQps?: string;
  /** The trading location that bid requests should be sent from. See https://developers.google.com/authorized-buyers/rtb/peer-guide#trading-locations for further information. */
  tradingLocation?: "TRADING_LOCATION_UNSPECIFIED" | "US_WEST" | "US_EAST" | "EUROPE" | "ASIA" | (string & {});
  /** The protocol that the bidder endpoint is using. */
  bidProtocol?: "BID_PROTOCOL_UNSPECIFIED" | "GOOGLE_RTB" | "OPENRTB_JSON" | "OPENRTB_PROTOBUF" | (string & {});
}

export const Endpoint: Schema.Schema<Endpoint> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  maximumQps: Schema.optional(Schema.String),
  tradingLocation: Schema.optional(Schema.String),
  bidProtocol: Schema.optional(Schema.String),
})).annotate({ identifier: "Endpoint" }) as any as Schema.Schema<Endpoint>;

export interface ListEndpointsResponse {
  /** List of bidder endpoints. */
  endpoints?: Array<Endpoint>;
  /** A token which can be passed to a subsequent call to the `ListEndpoints` method to retrieve the next page of results in ListEndpointsRequest.pageToken. */
  nextPageToken?: string;
}

export const ListEndpointsResponse: Schema.Schema<ListEndpointsResponse> = Schema.suspend(() => Schema.Struct({
  endpoints: Schema.optional(Schema.Array(Endpoint)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEndpointsResponse" }) as any as Schema.Schema<ListEndpointsResponse>;

export interface Buyer {
  /** Output only. Name of the buyer resource that must follow the pattern `buyers/{buyerAccountId}`, where `{buyerAccountId}` is the account ID of the buyer account whose information is to be received. One can get their account ID on the Authorized Buyers or Open Bidding UI, or by contacting their Google account manager. */
  name?: string;
  /** Output only. The diplay name associated with this buyer account, as visible to sellers. */
  displayName?: string;
  /** Output only. The name of the bidder resource that is responsible for receiving bidding traffic for this account. The bidder name must follow the pattern `bidders/{bidderAccountId}`, where `{bidderAccountId}` is the account ID of the bidder receiving traffic for this buyer. */
  bidder?: string;
  /** Output only. The number of creatives that this buyer submitted through the API or bid with in the last 30 days. This is counted against the maximum number of active creatives. */
  activeCreativeCount?: string;
  /** Output only. The maximum number of active creatives that this buyer can have. */
  maximumActiveCreativeCount?: string;
  /** Output only. A list of billing IDs associated with this account. These IDs appear on: 1. A bid request, to signal which buyers are eligible to bid on a given opportunity, and which pretargeting configurations were matched for each eligible buyer. 2. The bid response, to attribute a winning impression to a specific account for billing, reporting, policy and publisher block enforcement. */
  billingIds?: Array<string>;
}

export const Buyer: Schema.Schema<Buyer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  bidder: Schema.optional(Schema.String),
  activeCreativeCount: Schema.optional(Schema.String),
  maximumActiveCreativeCount: Schema.optional(Schema.String),
  billingIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Buyer" }) as any as Schema.Schema<Buyer>;

export interface ListBuyersResponse {
  /** List of buyers. */
  buyers?: Array<Buyer>;
  /** A token which can be passed to a subsequent call to the `ListBuyers` method to retrieve the next page of results in ListBuyersRequest.pageToken. */
  nextPageToken?: string;
}

export const ListBuyersResponse: Schema.Schema<ListBuyersResponse> = Schema.suspend(() => Schema.Struct({
  buyers: Schema.optional(Schema.Array(Buyer)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBuyersResponse" }) as any as Schema.Schema<ListBuyersResponse>;

export interface HtmlContent {
  /** The HTML snippet that displays the ad when inserted in the web page. */
  snippet?: string;
  /** The width of the HTML snippet in pixels. Can be used to filter the response of the creatives.list method. */
  width?: number;
  /** The height of the HTML snippet in pixels. Can be used to filter the response of the creatives.list method. */
  height?: number;
}

export const HtmlContent: Schema.Schema<HtmlContent> = Schema.suspend(() => Schema.Struct({
  snippet: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
})).annotate({ identifier: "HtmlContent" }) as any as Schema.Schema<HtmlContent>;

export interface MediaFile {
  /** The MIME type of this media file. Can be used to filter the response of the creatives.list method. */
  mimeType?: "VIDEO_MIME_TYPE_UNSPECIFIED" | "MIME_VIDEO_XFLV" | "MIME_VIDEO_WEBM" | "MIME_VIDEO_MP4" | "MIME_VIDEO_OGG" | "MIME_VIDEO_YT_HOSTED" | "MIME_VIDEO_X_MS_WMV" | "MIME_VIDEO_3GPP" | "MIME_VIDEO_MOV" | "MIME_APPLICATION_SWF" | "MIME_APPLICATION_SURVEY" | "MIME_APPLICATION_JAVASCRIPT" | "MIME_APPLICATION_SILVERLIGHT" | "MIME_APPLICATION_MPEGURL" | "MIME_APPLICATION_MPEGDASH" | "MIME_AUDIO_MP4A" | "MIME_AUDIO_MP3" | "MIME_AUDIO_OGG" | (string & {});
  /** Bitrate of the video file, in Kbps. Can be used to filter the response of the creatives.list method. */
  bitrate?: string;
}

export const MediaFile: Schema.Schema<MediaFile> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  bitrate: Schema.optional(Schema.String),
})).annotate({ identifier: "MediaFile" }) as any as Schema.Schema<MediaFile>;

export interface VideoMetadata {
  /** Is this a valid VAST ad? Can be used to filter the response of the creatives.list method. */
  isValidVast?: boolean;
  /** Is this a VPAID ad? Can be used to filter the response of the creatives.list method. */
  isVpaid?: boolean;
  /** The minimum duration that the user has to watch before being able to skip this ad. If the field is not set, the ad is not skippable. If the field is set, the ad is skippable. Can be used to filter the response of the creatives.list method. */
  skipOffset?: string;
  /** The duration of the ad. Can be used to filter the response of the creatives.list method. */
  duration?: string;
  /** The maximum VAST version across all wrapped VAST documents. Can be used to filter the response of the creatives.list method. */
  vastVersion?: "VAST_VERSION_UNSPECIFIED" | "VAST_VERSION_1_0" | "VAST_VERSION_2_0" | "VAST_VERSION_3_0" | "VAST_VERSION_4_0" | (string & {});
  /** The list of all media files declared in the VAST. If there are multiple VASTs in a wrapper chain, this includes the media files from the deepest one in the chain. */
  mediaFiles?: Array<MediaFile>;
}

export const VideoMetadata: Schema.Schema<VideoMetadata> = Schema.suspend(() => Schema.Struct({
  isValidVast: Schema.optional(Schema.Boolean),
  isVpaid: Schema.optional(Schema.Boolean),
  skipOffset: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  vastVersion: Schema.optional(Schema.String),
  mediaFiles: Schema.optional(Schema.Array(MediaFile)),
})).annotate({ identifier: "VideoMetadata" }) as any as Schema.Schema<VideoMetadata>;

export interface VideoContent {
  /** The URL to fetch a video ad. The URL should return an XML response that conforms to the VAST 2.0, 3.0 or 4.x standard. */
  videoUrl?: string;
  /** The contents of a VAST document for a video ad. This document should conform to the VAST 2.0, 3.0, or 4.x standard. */
  videoVastXml?: string;
  /** Output only. Video metadata. */
  videoMetadata?: VideoMetadata;
}

export const VideoContent: Schema.Schema<VideoContent> = Schema.suspend(() => Schema.Struct({
  videoUrl: Schema.optional(Schema.String),
  videoVastXml: Schema.optional(Schema.String),
  videoMetadata: Schema.optional(VideoMetadata),
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
  /** The contents of a VAST document for a native video ad. */
  videoVastXml?: string;
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
}

export const NativeContent: Schema.Schema<NativeContent> = Schema.suspend(() => Schema.Struct({
  headline: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  callToAction: Schema.optional(Schema.String),
  advertiserName: Schema.optional(Schema.String),
  image: Schema.optional(Image),
  videoUrl: Schema.optional(Schema.String),
  videoVastXml: Schema.optional(Schema.String),
  logo: Schema.optional(Image),
  appIcon: Schema.optional(Image),
  starRating: Schema.optional(Schema.Number),
  clickLinkUrl: Schema.optional(Schema.String),
  clickTrackingUrl: Schema.optional(Schema.String),
  priceDisplayText: Schema.optional(Schema.String),
})).annotate({ identifier: "NativeContent" }) as any as Schema.Schema<NativeContent>;

export interface AdvertiserAndBrand {
  /** See https://storage.googleapis.com/adx-rtb-dictionaries/advertisers.txt for the list of possible values. Can be used to filter the response of the creatives.list method. */
  advertiserId?: string;
  /** Advertiser name. Can be used to filter the response of the creatives.list method. */
  advertiserName?: string;
  /** Detected brand ID or zero if no brand has been detected. See https://storage.googleapis.com/adx-rtb-dictionaries/brands.txt for the list of possible values. Can be used to filter the response of the creatives.list method. */
  brandId?: string;
  /** Brand name. Can be used to filter the response of the creatives.list method. */
  brandName?: string;
}

export const AdvertiserAndBrand: Schema.Schema<AdvertiserAndBrand> = Schema.suspend(() => Schema.Struct({
  advertiserId: Schema.optional(Schema.String),
  advertiserName: Schema.optional(Schema.String),
  brandId: Schema.optional(Schema.String),
  brandName: Schema.optional(Schema.String),
})).annotate({ identifier: "AdvertiserAndBrand" }) as any as Schema.Schema<AdvertiserAndBrand>;

export interface AdTechnologyProviders {
  /** The detected [Google Ad Tech Providers (ATP)](https://support.google.com/admanager/answer/9012903) for this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/providers.csv for mapping of provider ID to provided name, a privacy policy URL, and a list of domains which can be attributed to the provider. */
  detectedProviderIds?: Array<string>;
  /** The detected IAB Global Vendor List (GVL) IDs for this creative. See the IAB Global Vendor List at https://vendor-list.consensu.org/v2/vendor-list.json for details about the vendors. */
  detectedGvlIds?: Array<string>;
  /** Domains of detected unidentified ad technology providers (if any). You must ensure that the creatives used in bids placed for inventory that will serve to EEA or UK users does not contain unidentified ad technology providers. Google reserves the right to filter non-compliant bids. */
  unidentifiedProviderDomains?: Array<string>;
}

export const AdTechnologyProviders: Schema.Schema<AdTechnologyProviders> = Schema.suspend(() => Schema.Struct({
  detectedProviderIds: Schema.optional(Schema.Array(Schema.String)),
  detectedGvlIds: Schema.optional(Schema.Array(Schema.String)),
  unidentifiedProviderDomains: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdTechnologyProviders" }) as any as Schema.Schema<AdTechnologyProviders>;

export interface DestinationNotWorkingEvidence {
  /** DNS lookup errors. */
  dnsError?: "DNS_ERROR_UNSPECIFIED" | "ERROR_DNS" | "GOOGLE_CRAWLER_DNS_ISSUE" | (string & {});
  /** HTTP error code (for example, 404 or 5xx) */
  httpError?: number;
  /** Page was crawled successfully, but was detected as either a page with no content or an error page. */
  invalidPage?: "INVALID_PAGE_UNSPECIFIED" | "EMPTY_OR_ERROR_PAGE" | (string & {});
  /** HTTP redirect chain error. */
  redirectionError?: "REDIRECTION_ERROR_UNSPECIFIED" | "TOO_MANY_REDIRECTS" | "INVALID_REDIRECT" | "EMPTY_REDIRECT" | "REDIRECT_ERROR_UNKNOWN" | (string & {});
  /** Rejected because of malformed URLs or invalid requests. */
  urlRejected?: "URL_REJECTED_UNSPECIFIED" | "BAD_REQUEST" | "MALFORMED_URL" | "URL_REJECTED_UNKNOWN" | (string & {});
  /** The full non-working URL. */
  expandedUrl?: string;
  /** Platform of the non-working URL. */
  platform?: "PLATFORM_UNSPECIFIED" | "PERSONAL_COMPUTER" | "ANDROID" | "IOS" | (string & {});
  /** Approximate time when the ad destination was last checked. */
  lastCheckTime?: string;
}

export const DestinationNotWorkingEvidence: Schema.Schema<DestinationNotWorkingEvidence> = Schema.suspend(() => Schema.Struct({
  dnsError: Schema.optional(Schema.String),
  httpError: Schema.optional(Schema.Number),
  invalidPage: Schema.optional(Schema.String),
  redirectionError: Schema.optional(Schema.String),
  urlRejected: Schema.optional(Schema.String),
  expandedUrl: Schema.optional(Schema.String),
  platform: Schema.optional(Schema.String),
  lastCheckTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DestinationNotWorkingEvidence" }) as any as Schema.Schema<DestinationNotWorkingEvidence>;

export interface DestinationNotCrawlableEvidence {
  /** Destination URL that was attempted to be crawled. */
  crawledUrl?: string;
  /** Reason of destination not crawlable. */
  reason?: "REASON_UNSPECIFIED" | "UNREACHABLE_ROBOTS" | "TIMEOUT_ROBOTS" | "ROBOTED_DENIED" | "UNKNOWN" | (string & {});
  /** Approximate time of the crawl. */
  crawlTime?: string;
}

export const DestinationNotCrawlableEvidence: Schema.Schema<DestinationNotCrawlableEvidence> = Schema.suspend(() => Schema.Struct({
  crawledUrl: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  crawlTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DestinationNotCrawlableEvidence" }) as any as Schema.Schema<DestinationNotCrawlableEvidence>;

export interface HttpCallEvidence {
  /** URLs of HTTP calls made by the creative. */
  urls?: Array<string>;
}

export const HttpCallEvidence: Schema.Schema<HttpCallEvidence> = Schema.suspend(() => Schema.Struct({
  urls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "HttpCallEvidence" }) as any as Schema.Schema<HttpCallEvidence>;

export interface DomainCalls {
  /** The domain name. */
  domain?: string;
  /** Number of HTTP calls made to the domain. */
  httpCallCount?: number;
}

export const DomainCalls: Schema.Schema<DomainCalls> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  httpCallCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "DomainCalls" }) as any as Schema.Schema<DomainCalls>;

export interface DomainCallEvidence {
  /** The total number of HTTP calls made by the creative, including but not limited to the number of calls in the top_http_call_domains. */
  totalHttpCallCount?: number;
  /** Breakdown of the most frequent domains called through HTTP by the creative. */
  topHttpCallDomains?: Array<DomainCalls>;
}

export const DomainCallEvidence: Schema.Schema<DomainCallEvidence> = Schema.suspend(() => Schema.Struct({
  totalHttpCallCount: Schema.optional(Schema.Number),
  topHttpCallDomains: Schema.optional(Schema.Array(DomainCalls)),
})).annotate({ identifier: "DomainCallEvidence" }) as any as Schema.Schema<DomainCallEvidence>;

export interface HttpCookieEvidence {
  /** Names of cookies that violate Google policies. For TOO_MANY_COOKIES policy, this will be the cookie names of top domains with the largest number of cookies. For other policies, this will be all the cookie names that violate the policy. */
  cookieNames?: Array<string>;
  /** The largest number of cookies set by a creative. If this field is set, cookie_names above will be set to the cookie names of top domains with the largest number of cookies. This field will only be set for TOO_MANY_COOKIES policy. */
  maxCookieCount?: number;
}

export const HttpCookieEvidence: Schema.Schema<HttpCookieEvidence> = Schema.suspend(() => Schema.Struct({
  cookieNames: Schema.optional(Schema.Array(Schema.String)),
  maxCookieCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "HttpCookieEvidence" }) as any as Schema.Schema<HttpCookieEvidence>;

export interface DestinationUrlEvidence {
  /** The full landing page URL of the destination. */
  destinationUrl?: string;
}

export const DestinationUrlEvidence: Schema.Schema<DestinationUrlEvidence> = Schema.suspend(() => Schema.Struct({
  destinationUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "DestinationUrlEvidence" }) as any as Schema.Schema<DestinationUrlEvidence>;

export interface UrlDownloadSize {
  /** The normalized URL with query parameters and fragment removed. */
  normalizedUrl?: string;
  /** Download size of the URL in kilobytes. */
  downloadSizeKb?: number;
}

export const UrlDownloadSize: Schema.Schema<UrlDownloadSize> = Schema.suspend(() => Schema.Struct({
  normalizedUrl: Schema.optional(Schema.String),
  downloadSizeKb: Schema.optional(Schema.Number),
})).annotate({ identifier: "UrlDownloadSize" }) as any as Schema.Schema<UrlDownloadSize>;

export interface DownloadSizeEvidence {
  /** Total download size (in kilobytes) for all the resources in the creative. */
  totalDownloadSizeKb?: number;
  /** Download size broken down by URLs with the top download size. */
  topUrlDownloadSizeBreakdowns?: Array<UrlDownloadSize>;
}

export const DownloadSizeEvidence: Schema.Schema<DownloadSizeEvidence> = Schema.suspend(() => Schema.Struct({
  totalDownloadSizeKb: Schema.optional(Schema.Number),
  topUrlDownloadSizeBreakdowns: Schema.optional(Schema.Array(UrlDownloadSize)),
})).annotate({ identifier: "DownloadSizeEvidence" }) as any as Schema.Schema<DownloadSizeEvidence>;

export interface PolicyTopicEvidence {
  /** The creative's destination URL did not function properly or was incorrectly set up. */
  destinationNotWorking?: DestinationNotWorkingEvidence;
  /** The creative's destination URL was not crawlable by Google. */
  destinationNotCrawlable?: DestinationNotCrawlableEvidence;
  /** HTTP calls made by the creative that resulted in policy violations. */
  httpCall?: HttpCallEvidence;
  /** Number of HTTP calls made by the creative, broken down by domain. */
  domainCall?: DomainCallEvidence;
  /** Evidence for HTTP cookie-related policy violations. */
  httpCookie?: HttpCookieEvidence;
  /** URL of the actual landing page. */
  destinationUrl?: DestinationUrlEvidence;
  /** Total download size and URL-level download size breakdown for resources in a creative. */
  downloadSize?: DownloadSizeEvidence;
}

export const PolicyTopicEvidence: Schema.Schema<PolicyTopicEvidence> = Schema.suspend(() => Schema.Struct({
  destinationNotWorking: Schema.optional(DestinationNotWorkingEvidence),
  destinationNotCrawlable: Schema.optional(DestinationNotCrawlableEvidence),
  httpCall: Schema.optional(HttpCallEvidence),
  domainCall: Schema.optional(DomainCallEvidence),
  httpCookie: Schema.optional(HttpCookieEvidence),
  destinationUrl: Schema.optional(DestinationUrlEvidence),
  downloadSize: Schema.optional(DownloadSizeEvidence),
})).annotate({ identifier: "PolicyTopicEvidence" }) as any as Schema.Schema<PolicyTopicEvidence>;

export interface PolicyTopicEntry {
  /** Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method */
  policyTopic?: string;
  /** URL of the help center article describing this policy topic. */
  helpCenterUrl?: string;
  /** Pieces of evidence associated with this policy topic entry. */
  evidences?: Array<PolicyTopicEvidence>;
  /** Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776 */
  missingCertificate?: boolean;
}

export const PolicyTopicEntry: Schema.Schema<PolicyTopicEntry> = Schema.suspend(() => Schema.Struct({
  policyTopic: Schema.optional(Schema.String),
  helpCenterUrl: Schema.optional(Schema.String),
  evidences: Schema.optional(Schema.Array(PolicyTopicEvidence)),
  missingCertificate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PolicyTopicEntry" }) as any as Schema.Schema<PolicyTopicEntry>;

export interface PolicyCompliance {
  /** Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method. */
  status?: "STATUS_UNSPECIFIED" | "PENDING_REVIEW" | "DISAPPROVED" | "APPROVED" | "CERTIFICATE_REQUIRED" | (string & {});
  /** Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED. */
  topics?: Array<PolicyTopicEntry>;
}

export const PolicyCompliance: Schema.Schema<PolicyCompliance> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  topics: Schema.optional(Schema.Array(PolicyTopicEntry)),
})).annotate({ identifier: "PolicyCompliance" }) as any as Schema.Schema<PolicyCompliance>;

export interface CreativeServingDecision {
  /** The set of detected destination URLs for the creative. Can be used to filter the response of the creatives.list method. */
  detectedClickThroughUrls?: Array<string>;
  /** Detected advertisers and brands. */
  detectedAdvertisers?: Array<AdvertiserAndBrand>;
  /** Detected product categories, if any. See the ad-product-categories.txt file in the technical documentation for a list of IDs. Can be used to filter the response of the creatives.list method. */
  detectedProductCategories?: Array<number>;
  /** The detected languages for this creative. The order is arbitrary. The codes are 2 or 5 characters and are documented at https://developers.google.com/adwords/api/docs/appendix/languagecodes. Can be used to filter the response of the creatives.list method. */
  detectedLanguages?: Array<string>;
  /** The detected domains for this creative. */
  detectedDomains?: Array<string>;
  /** Detected sensitive categories, if any. Can be used to filter the response of the creatives.list method. See the ad-sensitive-categories.txt file in the technical documentation for a list of IDs. You should use these IDs along with the excluded-sensitive-category field in the bid request to filter your bids. */
  detectedSensitiveCategories?: Array<number>;
  /** Publisher-excludable attributes that were detected for this creative. Can be used to filter the response of the creatives.list method. If the `excluded_attribute` field of a [bid request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto) contains one of the attributes that were declared or detected for a given creative, and a bid is submitted with that creative, the bid will be filtered before the auction. */
  detectedAttributes?: Array<"ATTRIBUTE_UNSPECIFIED" | "IMAGE_RICH_MEDIA" | "ADOBE_FLASH_FLV" | "IS_TAGGED" | "IS_COOKIE_TARGETED" | "IS_USER_INTEREST_TARGETED" | "EXPANDING_DIRECTION_NONE" | "EXPANDING_DIRECTION_UP" | "EXPANDING_DIRECTION_DOWN" | "EXPANDING_DIRECTION_LEFT" | "EXPANDING_DIRECTION_RIGHT" | "EXPANDING_DIRECTION_UP_LEFT" | "EXPANDING_DIRECTION_UP_RIGHT" | "EXPANDING_DIRECTION_DOWN_LEFT" | "EXPANDING_DIRECTION_DOWN_RIGHT" | "CREATIVE_TYPE_HTML" | "CREATIVE_TYPE_VAST_VIDEO" | "EXPANDING_DIRECTION_UP_OR_DOWN" | "EXPANDING_DIRECTION_LEFT_OR_RIGHT" | "EXPANDING_DIRECTION_ANY_DIAGONAL" | "EXPANDING_ACTION_ROLLOVER_TO_EXPAND" | "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_MRAID" | "RICH_MEDIA_CAPABILITY_TYPE_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_HTML5" | "SKIPPABLE_INSTREAM_VIDEO" | "RICH_MEDIA_CAPABILITY_TYPE_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL" | "NON_SKIPPABLE_INSTREAM_VIDEO" | "NATIVE_ELIGIBILITY_ELIGIBLE" | "NON_VPAID" | "NATIVE_ELIGIBILITY_NOT_ELIGIBLE" | "ANY_INTERSTITIAL" | "NON_INTERSTITIAL" | "IN_BANNER_VIDEO" | "RENDERING_SIZELESS_ADX" | "OMSDK_1_0" | "RENDERING_PLAYABLE" | (string & {})>;
  /** IDs of the ad technology vendors that were detected to be used by this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for possible values. Can be used to filter the response of the creatives.list method. If the `allowed_vendor_type` field of a [bid request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto) does not contain one of the vendor type IDs that were declared or detected for a given creative, and a bid is submitted with that creative, the bid will be filtered before the auction. */
  detectedVendorIds?: Array<number>;
  /** The detected ad technology providers. */
  adTechnologyProviders?: AdTechnologyProviders;
  /** The last time the creative status was updated. Can be used to filter the response of the creatives.list method. */
  lastStatusUpdate?: string;
  /** Policy compliance of this creative when bidding on Programmatic Guaranteed and Preferred Deals (outside of Russia and China). */
  dealsPolicyCompliance?: PolicyCompliance;
  /** Policy compliance of this creative when bidding in open auction, private auction, or auction packages (outside of Russia and China). */
  networkPolicyCompliance?: PolicyCompliance;
  /** Policy compliance of this creative when bidding in Open Bidding (outside of Russia and China). For the list of platform policies, see: https://support.google.com/platformspolicy/answer/3013851. */
  platformPolicyCompliance?: PolicyCompliance;
  /** The policy compliance of this creative in China. When approved or disapproved, this applies to both deals and open auction in China. When pending review, this creative is allowed to serve for deals but not for open auction. */
  chinaPolicyCompliance?: PolicyCompliance;
  /** The policy compliance of this creative in Russia. When approved or disapproved, this applies to both deals and open auction in Russia. When pending review, this creative is allowed to serve for deals but not for open auction. */
  russiaPolicyCompliance?: PolicyCompliance;
  /** Output only. The taxonomy in which the detected_categories field is expressed. */
  detectedCategoriesTaxonomy?: "AD_CATEGORY_TAXONOMY_UNSPECIFIED" | "GOOGLE_AD_CATEGORY_TAXONOMY" | "IAB_CONTENT_1_0" | (string & {});
  /** Output only. IDs of the detected categories. The taxonomy in which the categories are expressed is specified by the detected_categories_taxonomy field. Use this in conjunction with BidRequest.bcat to avoid bidding on impressions where a given ad category is blocked, or to troubleshoot filtered bids. Can be used to filter the response of the creatives.list method. */
  detectedCategories?: Array<string>;
}

export const CreativeServingDecision: Schema.Schema<CreativeServingDecision> = Schema.suspend(() => Schema.Struct({
  detectedClickThroughUrls: Schema.optional(Schema.Array(Schema.String)),
  detectedAdvertisers: Schema.optional(Schema.Array(AdvertiserAndBrand)),
  detectedProductCategories: Schema.optional(Schema.Array(Schema.Number)),
  detectedLanguages: Schema.optional(Schema.Array(Schema.String)),
  detectedDomains: Schema.optional(Schema.Array(Schema.String)),
  detectedSensitiveCategories: Schema.optional(Schema.Array(Schema.Number)),
  detectedAttributes: Schema.optional(Schema.Array(Schema.String)),
  detectedVendorIds: Schema.optional(Schema.Array(Schema.Number)),
  adTechnologyProviders: Schema.optional(AdTechnologyProviders),
  lastStatusUpdate: Schema.optional(Schema.String),
  dealsPolicyCompliance: Schema.optional(PolicyCompliance),
  networkPolicyCompliance: Schema.optional(PolicyCompliance),
  platformPolicyCompliance: Schema.optional(PolicyCompliance),
  chinaPolicyCompliance: Schema.optional(PolicyCompliance),
  russiaPolicyCompliance: Schema.optional(PolicyCompliance),
  detectedCategoriesTaxonomy: Schema.optional(Schema.String),
  detectedCategories: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CreativeServingDecision" }) as any as Schema.Schema<CreativeServingDecision>;

export interface Creative {
  /** Output only. Name of the creative. Follows the pattern `buyers/{buyer}/creatives/{creative}`, where `{buyer}` represents the account ID of the buyer who owns the creative, and `{creative}` is the buyer-specific creative ID that references this creative in the bid response. */
  name?: string;
  /** Output only. ID of the buyer account that this creative is owned by. Can be used to filter the response of the creatives.list method with equality and inequality check. */
  accountId?: string;
  /** Buyer-specific creative ID that references this creative in bid responses. This field is Ignored in update operations. Can be used to filter the response of the creatives.list method. The maximum length of the creative ID is 128 bytes. */
  creativeId?: string;
  /** An HTML creative. */
  html?: HtmlContent;
  /** A video creative. */
  video?: VideoContent;
  /** A native creative. */
  native?: NativeContent;
  /** Experimental field that can be used during the [FLEDGE Origin Trial](/authorized-buyers/rtb/fledge-origin-trial). The URL to fetch an interest group ad used in [TURTLEDOVE on-device auction](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups"). This should be unique among all creatives for a given `accountId`. This URL should be the same as the URL returned by [generateBid()](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#32-on-device-bidding). */
  renderUrl?: string;
  /** Output only. The format of this creative. Can be used to filter the response of the creatives.list method. */
  creativeFormat?: "CREATIVE_FORMAT_UNSPECIFIED" | "HTML" | "VIDEO" | "NATIVE" | (string & {});
  /** The agency ID for this creative. */
  agencyId?: string;
  /** The set of declared destination URLs for the creative. Can be used to filter the response of the creatives.list method. */
  declaredClickThroughUrls?: Array<string>;
  /** The set of URLs to be called to record an impression. */
  impressionTrackingUrls?: Array<string>;
  /** The link to AdChoices destination page. This is only supported for native ads. */
  adChoicesDestinationUrl?: string;
  /** All restricted categories for the ads that may be shown from this creative. */
  restrictedCategories?: Array<"RESTRICTED_CATEGORY_UNSPECIFIED" | "ALCOHOL" | (string & {})>;
  /** All declared attributes for the ads that may be shown from this creative. Can be used to filter the response of the creatives.list method. If the `excluded_attribute` field of a [bid request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto") contains one of the attributes that were declared or detected for a given creative, and a bid is submitted with that creative, the bid will be filtered before the auction. */
  declaredAttributes?: Array<"ATTRIBUTE_UNSPECIFIED" | "IMAGE_RICH_MEDIA" | "ADOBE_FLASH_FLV" | "IS_TAGGED" | "IS_COOKIE_TARGETED" | "IS_USER_INTEREST_TARGETED" | "EXPANDING_DIRECTION_NONE" | "EXPANDING_DIRECTION_UP" | "EXPANDING_DIRECTION_DOWN" | "EXPANDING_DIRECTION_LEFT" | "EXPANDING_DIRECTION_RIGHT" | "EXPANDING_DIRECTION_UP_LEFT" | "EXPANDING_DIRECTION_UP_RIGHT" | "EXPANDING_DIRECTION_DOWN_LEFT" | "EXPANDING_DIRECTION_DOWN_RIGHT" | "CREATIVE_TYPE_HTML" | "CREATIVE_TYPE_VAST_VIDEO" | "EXPANDING_DIRECTION_UP_OR_DOWN" | "EXPANDING_DIRECTION_LEFT_OR_RIGHT" | "EXPANDING_DIRECTION_ANY_DIAGONAL" | "EXPANDING_ACTION_ROLLOVER_TO_EXPAND" | "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_MRAID" | "RICH_MEDIA_CAPABILITY_TYPE_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_HTML5" | "SKIPPABLE_INSTREAM_VIDEO" | "RICH_MEDIA_CAPABILITY_TYPE_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL" | "NON_SKIPPABLE_INSTREAM_VIDEO" | "NATIVE_ELIGIBILITY_ELIGIBLE" | "NON_VPAID" | "NATIVE_ELIGIBILITY_NOT_ELIGIBLE" | "ANY_INTERSTITIAL" | "NON_INTERSTITIAL" | "IN_BANNER_VIDEO" | "RENDERING_SIZELESS_ADX" | "OMSDK_1_0" | "RENDERING_PLAYABLE" | (string & {})>;
  /** IDs for the declared ad technology vendors that may be used by this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for possible values. Can be used to filter the response of the creatives.list method. */
  declaredVendorIds?: Array<number>;
  /** All declared restricted categories for the ads that may be shown from this creative. Can be used to filter the response of the creatives.list method. */
  declaredRestrictedCategories?: Array<"RESTRICTED_CATEGORY_UNSPECIFIED" | "ALCOHOL" | (string & {})>;
  /** The name of the company being advertised in the creative. Can be used to filter the response of the creatives.list method. */
  advertiserName?: string;
  /** Output only. The version of the creative. Version for a new creative is 1 and it increments during subsequent creative updates. */
  version?: number;
  /** Output only. The last update timestamp of the creative through the API. */
  apiUpdateTime?: string;
  /** Output only. IDs of all of the deals with which this creative has been used in bidding. Can be used to filter the response of the creatives.list method. */
  dealIds?: Array<string>;
  /** Output only. Top level status and detected attributes of a creative (for example domain, language, advertiser, product category, etc.) that affect whether (status) and where (context) a creative will be allowed to serve. */
  creativeServingDecision?: CreativeServingDecision;
}

export const Creative: Schema.Schema<Creative> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  creativeId: Schema.optional(Schema.String),
  html: Schema.optional(HtmlContent),
  video: Schema.optional(VideoContent),
  native: Schema.optional(NativeContent),
  renderUrl: Schema.optional(Schema.String),
  creativeFormat: Schema.optional(Schema.String),
  agencyId: Schema.optional(Schema.String),
  declaredClickThroughUrls: Schema.optional(Schema.Array(Schema.String)),
  impressionTrackingUrls: Schema.optional(Schema.Array(Schema.String)),
  adChoicesDestinationUrl: Schema.optional(Schema.String),
  restrictedCategories: Schema.optional(Schema.Array(Schema.String)),
  declaredAttributes: Schema.optional(Schema.Array(Schema.String)),
  declaredVendorIds: Schema.optional(Schema.Array(Schema.Number)),
  declaredRestrictedCategories: Schema.optional(Schema.Array(Schema.String)),
  advertiserName: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  apiUpdateTime: Schema.optional(Schema.String),
  dealIds: Schema.optional(Schema.Array(Schema.String)),
  creativeServingDecision: Schema.optional(CreativeServingDecision),
})).annotate({ identifier: "Creative" }) as any as Schema.Schema<Creative>;

export interface ListCreativesResponse {
  /** The list of creatives. */
  creatives?: Array<Creative>;
  /** A token to retrieve the next page of results. Pass this value in the ListCreativesRequest.pageToken field in the subsequent call to the `ListCreatives` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListCreativesResponse: Schema.Schema<ListCreativesResponse> = Schema.suspend(() => Schema.Struct({
  creatives: Schema.optional(Schema.Array(Creative)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCreativesResponse" }) as any as Schema.Schema<ListCreativesResponse>;

export interface WatchCreativesRequest {
}

export const WatchCreativesRequest: Schema.Schema<WatchCreativesRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "WatchCreativesRequest" }) as any as Schema.Schema<WatchCreativesRequest>;

export interface WatchCreativesResponse {
  /** The Pub/Sub topic that will be used to publish creative serving status notifications. This would be of the format `projects/{project_id}/topics/{topic_id}`. */
  topic?: string;
  /** The Pub/Sub subscription that can be used to pull creative status notifications. This would be of the format `projects/{project_id}/subscriptions/{subscription_id}`. Subscription is created with pull delivery. All service accounts belonging to the bidder will have read access to this subscription. Subscriptions that are inactive for more than 90 days will be disabled. Use watchCreatives to re-enable the subscription. */
  subscription?: string;
}

export const WatchCreativesResponse: Schema.Schema<WatchCreativesResponse> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  subscription: Schema.optional(Schema.String),
})).annotate({ identifier: "WatchCreativesResponse" }) as any as Schema.Schema<WatchCreativesResponse>;

export interface NumericTargetingDimension {
  /** The IDs included in a configuration. */
  includedIds?: Array<string>;
  /** The IDs excluded in a configuration. */
  excludedIds?: Array<string>;
}

export const NumericTargetingDimension: Schema.Schema<NumericTargetingDimension> = Schema.suspend(() => Schema.Struct({
  includedIds: Schema.optional(Schema.Array(Schema.String)),
  excludedIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NumericTargetingDimension" }) as any as Schema.Schema<NumericTargetingDimension>;

export interface CreativeDimensions {
  /** The width of the creative in pixels. */
  width?: string;
  /** The height of the creative in pixels. */
  height?: string;
}

export const CreativeDimensions: Schema.Schema<CreativeDimensions> = Schema.suspend(() => Schema.Struct({
  width: Schema.optional(Schema.String),
  height: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeDimensions" }) as any as Schema.Schema<CreativeDimensions>;

export interface StringTargetingDimension {
  /** How the items in this list should be targeted. */
  targetingMode?: "TARGETING_MODE_UNSPECIFIED" | "INCLUSIVE" | "EXCLUSIVE" | (string & {});
  /** The values specified. */
  values?: Array<string>;
}

export const StringTargetingDimension: Schema.Schema<StringTargetingDimension> = Schema.suspend(() => Schema.Struct({
  targetingMode: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "StringTargetingDimension" }) as any as Schema.Schema<StringTargetingDimension>;

export interface AppTargeting {
  /** Targeted app IDs. App IDs can refer to those found in an app store or ones that are not published in an app store. A maximum of 30,000 app IDs can be targeted. */
  mobileAppTargeting?: StringTargetingDimension;
  /** Lists of included and excluded mobile app categories as defined in https://developers.google.com/adwords/api/docs/appendix/mobileappcategories.csv. */
  mobileAppCategoryTargeting?: NumericTargetingDimension;
}

export const AppTargeting: Schema.Schema<AppTargeting> = Schema.suspend(() => Schema.Struct({
  mobileAppTargeting: Schema.optional(StringTargetingDimension),
  mobileAppCategoryTargeting: Schema.optional(NumericTargetingDimension),
})).annotate({ identifier: "AppTargeting" }) as any as Schema.Schema<AppTargeting>;

export interface PretargetingConfig {
  /** Output only. Name of the pretargeting configuration that must follow the pattern `bidders/{bidder_account_id}/pretargetingConfigs/{config_id}` */
  name?: string;
  /** The diplay name associated with this configuration. This name must be unique among all the pretargeting configurations a bidder has. */
  displayName?: string;
  /** Output only. The identifier that corresponds to this pretargeting configuration that helps buyers track and attribute their spend across their own arbitrary divisions. If a bid request matches more than one configuration, the buyer chooses which billing_id to attribute each of their bids. */
  billingId?: string;
  /** Output only. The state of this pretargeting configuration. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "SUSPENDED" | (string & {});
  /** Creative formats included by this configuration. Only bid requests eligible for at least one of the specified creative formats will be sent. An unset value will allow all bid requests to be sent, regardless of format. */
  includedFormats?: Array<"CREATIVE_FORMAT_UNSPECIFIED" | "HTML" | "VAST" | "NATIVE" | (string & {})>;
  /** The maximum QPS threshold for this configuration. The bidder should receive no more than this number of bid requests matching this configuration per second across all their bidding endpoints among all trading locations. Further information available at https://developers.google.com/authorized-buyers/rtb/peer-guide */
  maximumQps?: string;
  /** The geos included or excluded in this configuration defined in https://storage.googleapis.com/adx-rtb-dictionaries/geo-table.csv */
  geoTargeting?: NumericTargetingDimension;
  /** Output only. Existing included or excluded geos that are invalid. Previously targeted geos may become invalid due to privacy restrictions. */
  invalidGeoIds?: Array<string>;
  /** The remarketing lists included or excluded in this configuration as defined in UserList. */
  userListTargeting?: NumericTargetingDimension;
  /** The interstitial targeting specified for this configuration. The unset value will allow bid requests to be sent regardless of whether they are for interstitials or not. */
  interstitialTargeting?: "INTERSTITIAL_TARGETING_UNSPECIFIED" | "ONLY_INTERSTITIAL_REQUESTS" | "ONLY_NON_INTERSTITIAL_REQUESTS" | (string & {});
  /** Targeting modes included by this configuration. A bid request must allow all the specified targeting modes. An unset value allows all bid requests to be sent, regardless of which targeting modes they allow. */
  allowedUserTargetingModes?: Array<"USER_TARGETING_MODE_UNSPECIFIED" | "REMARKETING_ADS" | "INTEREST_BASED_TARGETING" | (string & {})>;
  /** The sensitive content category label IDs excluded in this configuration. Bid requests for inventory with any of the specified content label IDs will not be sent. Refer to this file https://storage.googleapis.com/adx-rtb-dictionaries/content-labels.txt for category IDs. */
  excludedContentLabelIds?: Array<string>;
  /** User identifier types included in this configuration. At least one of the user identifier types specified in this list must be available for the bid request to be sent. */
  includedUserIdTypes?: Array<"USER_ID_TYPE_UNSPECIFIED" | "HOSTED_MATCH_DATA" | "GOOGLE_COOKIE" | "DEVICE_ID" | "PUBLISHER_PROVIDED_ID" | "PUBLISHER_FIRST_PARTY_ID" | (string & {})>;
  /** The languages included in this configuration, represented by their language code. See https://developers.google.com/adwords/api/docs/appendix/languagecodes. */
  includedLanguages?: Array<string>;
  /** The mobile operating systems included in this configuration as defined in https://storage.googleapis.com/adx-rtb-dictionaries/mobile-os.csv */
  includedMobileOperatingSystemIds?: Array<string>;
  /** The verticals included or excluded in this configuration as defined in https://developers.google.com/authorized-buyers/rtb/downloads/publisher-verticals */
  verticalTargeting?: NumericTargetingDimension;
  /** The platforms included by this configration. Bid requests for devices with the specified platform types will be sent. An unset value allows all bid requests to be sent, regardless of platform. */
  includedPlatforms?: Array<"PLATFORM_UNSPECIFIED" | "PERSONAL_COMPUTER" | "PHONE" | "TABLET" | "CONNECTED_TV" | (string & {})>;
  /** Creative dimensions included by this configuration. Only bid requests eligible for at least one of the specified creative dimensions will be sent. An unset value allows all bid requests to be sent, regardless of creative dimension. */
  includedCreativeDimensions?: Array<CreativeDimensions>;
  /** Environments that are being included. Bid requests will not be sent for a given environment if it is not included. Further restrictions can be applied to included environments to target only a subset of its inventory. An unset value includes all environments. */
  includedEnvironments?: Array<"ENVIRONMENT_UNSPECIFIED" | "APP" | "WEB" | (string & {})>;
  /** Targeting on a subset of site inventory. If WEB is listed in included_environments, the specified targeting is applied. A maximum of 50,000 site URLs can be targeted. An unset value for targeting allows all web-based bid requests to be sent. Sites can either be targeting positively (bid requests will be sent only if the destination site is listed in the targeting dimension) or negatively (bid requests will be sent only if the destination site is not listed in the pretargeting configuration). */
  webTargeting?: StringTargetingDimension;
  /** Targeting on a subset of app inventory. If APP is listed in targeted_environments, the specified targeting is applied. A maximum of 30,000 app IDs can be targeted. An unset value for targeting allows all app-based bid requests to be sent. Apps can either be targeting positively (bid requests will be sent only if the destination app is listed in the targeting dimension) or negatively (bid requests will be sent only if the destination app is not listed in the targeting dimension). */
  appTargeting?: AppTargeting;
  /** Targeting on a subset of publisher inventory. Publishers can either be targeted positively (bid requests will be sent only if the publisher is listed in the targeting dimension) or negatively (bid requests will be sent only if the publisher is not listed in the targeting dimension). A maximum of 10,000 publisher IDs can be targeted. Publisher IDs are found in [ads.txt](https://iabtechlab.com/ads-txt/) / [app-ads.txt](https://iabtechlab.com/app-ads-txt/) and in bid requests in the `BidRequest.publisher_id` field on the [Google RTB protocol](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto) or the `BidRequest.site.publisher.id` / `BidRequest.app.publisher.id` field on the [OpenRTB protocol](https://developers.google.com/authorized-buyers/rtb/downloads/openrtb-adx-proto). Publisher IDs will be returned in the order that they were entered. */
  publisherTargeting?: StringTargetingDimension;
  /** The targeted minimum viewability decile, ranging in values [0, 10]. A value of 5 means that the configuration will only match adslots for which we predict at least 50% viewability. Values > 10 will be rounded down to 10. An unset value or a value of 0 indicates that bid requests will be sent regardless of viewability. */
  minimumViewabilityDecile?: number;
}

export const PretargetingConfig: Schema.Schema<PretargetingConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  billingId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  includedFormats: Schema.optional(Schema.Array(Schema.String)),
  maximumQps: Schema.optional(Schema.String),
  geoTargeting: Schema.optional(NumericTargetingDimension),
  invalidGeoIds: Schema.optional(Schema.Array(Schema.String)),
  userListTargeting: Schema.optional(NumericTargetingDimension),
  interstitialTargeting: Schema.optional(Schema.String),
  allowedUserTargetingModes: Schema.optional(Schema.Array(Schema.String)),
  excludedContentLabelIds: Schema.optional(Schema.Array(Schema.String)),
  includedUserIdTypes: Schema.optional(Schema.Array(Schema.String)),
  includedLanguages: Schema.optional(Schema.Array(Schema.String)),
  includedMobileOperatingSystemIds: Schema.optional(Schema.Array(Schema.String)),
  verticalTargeting: Schema.optional(NumericTargetingDimension),
  includedPlatforms: Schema.optional(Schema.Array(Schema.String)),
  includedCreativeDimensions: Schema.optional(Schema.Array(CreativeDimensions)),
  includedEnvironments: Schema.optional(Schema.Array(Schema.String)),
  webTargeting: Schema.optional(StringTargetingDimension),
  appTargeting: Schema.optional(AppTargeting),
  publisherTargeting: Schema.optional(StringTargetingDimension),
  minimumViewabilityDecile: Schema.optional(Schema.Number),
})).annotate({ identifier: "PretargetingConfig" }) as any as Schema.Schema<PretargetingConfig>;

export interface ListPretargetingConfigsResponse {
  /** List of pretargeting configurations. */
  pretargetingConfigs?: Array<PretargetingConfig>;
  /** A token which can be passed to a subsequent call to the `ListPretargetingConfigs` method to retrieve the next page of results in ListPretargetingConfigsRequest.pageToken. */
  nextPageToken?: string;
}

export const ListPretargetingConfigsResponse: Schema.Schema<ListPretargetingConfigsResponse> = Schema.suspend(() => Schema.Struct({
  pretargetingConfigs: Schema.optional(Schema.Array(PretargetingConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPretargetingConfigsResponse" }) as any as Schema.Schema<ListPretargetingConfigsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ActivatePretargetingConfigRequest {
}

export const ActivatePretargetingConfigRequest: Schema.Schema<ActivatePretargetingConfigRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ActivatePretargetingConfigRequest" }) as any as Schema.Schema<ActivatePretargetingConfigRequest>;

export interface SuspendPretargetingConfigRequest {
}

export const SuspendPretargetingConfigRequest: Schema.Schema<SuspendPretargetingConfigRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SuspendPretargetingConfigRequest" }) as any as Schema.Schema<SuspendPretargetingConfigRequest>;

export interface AddTargetedSitesRequest {
  /** A list of site URLs to target in the pretargeting configuration. These values will be added to the list of targeted URLs in PretargetingConfig.webTargeting.values. */
  sites?: Array<string>;
  /** Required. The targeting mode that should be applied to the list of site URLs. If there are existing targeted sites, must be equal to the existing PretargetingConfig.webTargeting.targetingMode or a 400 bad request error will be returned. */
  targetingMode?: "TARGETING_MODE_UNSPECIFIED" | "INCLUSIVE" | "EXCLUSIVE" | (string & {});
}

export const AddTargetedSitesRequest: Schema.Schema<AddTargetedSitesRequest> = Schema.suspend(() => Schema.Struct({
  sites: Schema.optional(Schema.Array(Schema.String)),
  targetingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "AddTargetedSitesRequest" }) as any as Schema.Schema<AddTargetedSitesRequest>;

export interface RemoveTargetedSitesRequest {
  /** A list of site URLs to stop targeting in the pretargeting configuration. These values will be removed from the list of targeted URLs in PretargetingConfig.webTargeting.values. */
  sites?: Array<string>;
}

export const RemoveTargetedSitesRequest: Schema.Schema<RemoveTargetedSitesRequest> = Schema.suspend(() => Schema.Struct({
  sites: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RemoveTargetedSitesRequest" }) as any as Schema.Schema<RemoveTargetedSitesRequest>;

export interface AddTargetedAppsRequest {
  /** A list of app IDs to target in the pretargeting configuration. These values will be added to the list of targeted app IDs in PretargetingConfig.appTargeting.mobileAppTargeting.values. */
  appIds?: Array<string>;
  /** Required. The targeting mode that should be applied to the list of app IDs. If there are existing targeted app IDs, must be equal to the existing PretargetingConfig.appTargeting.mobileAppTargeting.targetingMode or a 400 bad request error will be returned. */
  targetingMode?: "TARGETING_MODE_UNSPECIFIED" | "INCLUSIVE" | "EXCLUSIVE" | (string & {});
}

export const AddTargetedAppsRequest: Schema.Schema<AddTargetedAppsRequest> = Schema.suspend(() => Schema.Struct({
  appIds: Schema.optional(Schema.Array(Schema.String)),
  targetingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "AddTargetedAppsRequest" }) as any as Schema.Schema<AddTargetedAppsRequest>;

export interface RemoveTargetedAppsRequest {
  /** A list of app IDs to stop targeting in the pretargeting configuration. These values will be removed from the list of targeted app IDs in PretargetingConfig.appTargeting.mobileAppTargeting.values. */
  appIds?: Array<string>;
}

export const RemoveTargetedAppsRequest: Schema.Schema<RemoveTargetedAppsRequest> = Schema.suspend(() => Schema.Struct({
  appIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RemoveTargetedAppsRequest" }) as any as Schema.Schema<RemoveTargetedAppsRequest>;

export interface AddTargetedPublishersRequest {
  /** A list of publisher IDs to target in the pretargeting configuration. These values will be added to the list of targeted publisher IDs in PretargetingConfig.publisherTargeting.values. Publishers are identified by their publisher ID from ads.txt / app-ads.txt. See https://iabtechlab.com/ads-txt/ and https://iabtechlab.com/app-ads-txt/ for more details. */
  publisherIds?: Array<string>;
  /** Required. The targeting mode that should be applied to the list of publisher IDs. If are existing publisher IDs, must be equal to the existing PretargetingConfig.publisherTargeting.targetingMode or a 400 bad request error will be returned. */
  targetingMode?: "TARGETING_MODE_UNSPECIFIED" | "INCLUSIVE" | "EXCLUSIVE" | (string & {});
}

export const AddTargetedPublishersRequest: Schema.Schema<AddTargetedPublishersRequest> = Schema.suspend(() => Schema.Struct({
  publisherIds: Schema.optional(Schema.Array(Schema.String)),
  targetingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "AddTargetedPublishersRequest" }) as any as Schema.Schema<AddTargetedPublishersRequest>;

export interface RemoveTargetedPublishersRequest {
  /** A list of publisher IDs to stop targeting in the pretargeting configuration. These values will be removed from the list of targeted publisher IDs in PretargetingConfig.publisherTargeting.values. Publishers are identified by their publisher ID from ads.txt / app-ads.txt. See https://iabtechlab.com/ads-txt/ and https://iabtechlab.com/app-ads-txt/ for more details. */
  publisherIds?: Array<string>;
}

export const RemoveTargetedPublishersRequest: Schema.Schema<RemoveTargetedPublishersRequest> = Schema.suspend(() => Schema.Struct({
  publisherIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RemoveTargetedPublishersRequest" }) as any as Schema.Schema<RemoveTargetedPublishersRequest>;

export interface PublisherConnection {
  /** Output only. Name of the publisher connection. This follows the pattern `bidders/{bidder}/publisherConnections/{publisher}`, where `{bidder}` represents the account ID of the bidder, and `{publisher}` is the ads.txt/app-ads.txt publisher ID. */
  name?: string;
  /** Output only. Whether the publisher is an Ad Manager or AdMob publisher. */
  publisherPlatform?: "PUBLISHER_PLATFORM_UNSPECIFIED" | "GOOGLE_AD_MANAGER" | "ADMOB" | (string & {});
  /** Output only. Publisher display name. */
  displayName?: string;
  /** Whether the publisher has been approved by the bidder. */
  biddingState?: "STATE_UNSPECIFIED" | "PENDING" | "REJECTED" | "APPROVED" | (string & {});
  /** Output only. The time at which the publisher initiated a connection with the bidder (irrespective of if or when the bidder approves it). This is subsequently updated if the publisher revokes and re-initiates the connection. */
  createTime?: string;
}

export const PublisherConnection: Schema.Schema<PublisherConnection> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  publisherPlatform: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  biddingState: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PublisherConnection" }) as any as Schema.Schema<PublisherConnection>;

export interface ListPublisherConnectionsResponse {
  /** The list of publisher connections. */
  publisherConnections?: Array<PublisherConnection>;
  /** A token to retrieve the next page of results. Pass this value in the ListPublisherConnectionsRequest.pageToken field in the subsequent call to the `ListPublisherConnections` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListPublisherConnectionsResponse: Schema.Schema<ListPublisherConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  publisherConnections: Schema.optional(Schema.Array(PublisherConnection)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPublisherConnectionsResponse" }) as any as Schema.Schema<ListPublisherConnectionsResponse>;

export interface BatchApprovePublisherConnectionsRequest {
  /** Required. The names of the publishers with which connections will be approved. In the pattern `bidders/{bidder}/publisherConnections/{publisher}` where `{bidder}` is the account ID of the bidder, and `{publisher}` is the ads.txt/app-ads.txt publisher ID. */
  names?: Array<string>;
}

export const BatchApprovePublisherConnectionsRequest: Schema.Schema<BatchApprovePublisherConnectionsRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchApprovePublisherConnectionsRequest" }) as any as Schema.Schema<BatchApprovePublisherConnectionsRequest>;

export interface BatchApprovePublisherConnectionsResponse {
  /** The publisher connections that have been approved. */
  publisherConnections?: Array<PublisherConnection>;
}

export const BatchApprovePublisherConnectionsResponse: Schema.Schema<BatchApprovePublisherConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  publisherConnections: Schema.optional(Schema.Array(PublisherConnection)),
})).annotate({ identifier: "BatchApprovePublisherConnectionsResponse" }) as any as Schema.Schema<BatchApprovePublisherConnectionsResponse>;

export interface BatchRejectPublisherConnectionsRequest {
  /** Required. The names of the publishers with whom connection will be rejected. In the pattern `bidders/{bidder}/publisherConnections/{publisher}` where `{bidder}` is the account ID of the bidder, and `{publisher}` is the ads.txt/app-ads.txt publisher ID. */
  names?: Array<string>;
}

export const BatchRejectPublisherConnectionsRequest: Schema.Schema<BatchRejectPublisherConnectionsRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchRejectPublisherConnectionsRequest" }) as any as Schema.Schema<BatchRejectPublisherConnectionsRequest>;

export interface BatchRejectPublisherConnectionsResponse {
  /** The publisher connections that have been rejected. */
  publisherConnections?: Array<PublisherConnection>;
}

export const BatchRejectPublisherConnectionsResponse: Schema.Schema<BatchRejectPublisherConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  publisherConnections: Schema.optional(Schema.Array(PublisherConnection)),
})).annotate({ identifier: "BatchRejectPublisherConnectionsResponse" }) as any as Schema.Schema<BatchRejectPublisherConnectionsResponse>;

export interface Realtimebidding_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Realtimebidding_Date: Schema.Schema<Realtimebidding_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Realtimebidding_Date" }) as any as Schema.Schema<Realtimebidding_Date>;

export interface UrlRestriction {
  /** Required. The URL to use for applying the restriction on the user list. */
  url?: string;
  /** The restriction type for the specified URL. */
  restrictionType?: "RESTRICTION_TYPE_UNSPECIFIED" | "CONTAINS" | "EQUALS" | "STARTS_WITH" | "ENDS_WITH" | "DOES_NOT_EQUAL" | "DOES_NOT_CONTAIN" | "DOES_NOT_START_WITH" | "DOES_NOT_END_WITH" | (string & {});
  /** Start date (if specified) of the URL restriction. */
  startDate?: Realtimebidding_Date;
  /** End date (if specified) of the URL restriction. End date should be later than the start date for the date range to be valid. */
  endDate?: Realtimebidding_Date;
}

export const UrlRestriction: Schema.Schema<UrlRestriction> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  restrictionType: Schema.optional(Schema.String),
  startDate: Schema.optional(Realtimebidding_Date),
  endDate: Schema.optional(Realtimebidding_Date),
})).annotate({ identifier: "UrlRestriction" }) as any as Schema.Schema<UrlRestriction>;

export interface UserList {
  /** Output only. Name of the user list that must follow the pattern `buyers/{buyer}/userLists/{user_list}`, where `{buyer}` represents the account ID of the buyer who owns the user list. For a bidder accessing user lists on behalf of a child seat buyer, `{buyer}` represents the account ID of the child seat buyer. `{user_list}` is an int64 identifier assigned by Google to uniquely identify a user list. */
  name?: string;
  /** Required. Display name of the user list. This must be unique across all user lists for a given account. */
  displayName?: string;
  /** The description for the user list. */
  description?: string;
  /** Output only. The status of the user list. A new user list starts out as open. */
  status?: "STATUS_UNSPECIFIED" | "OPEN" | "CLOSED" | (string & {});
  /** Required. Deprecated. This will be removed in October 2023. For more information, see the release notes: https://developers.google.com/authorized-buyers/apis/relnotes#real-time-bidding-api The URL restriction for the user list. */
  urlRestriction?: UrlRestriction;
  /** Required. The number of days a user's cookie stays on the user list. The field must be between 0 and 540 inclusive. */
  membershipDurationDays?: string;
}

export const UserList: Schema.Schema<UserList> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  urlRestriction: Schema.optional(UrlRestriction),
  membershipDurationDays: Schema.optional(Schema.String),
})).annotate({ identifier: "UserList" }) as any as Schema.Schema<UserList>;

export interface ListUserListsResponse {
  /** List of user lists from the search. */
  userLists?: Array<UserList>;
  /** The continuation page token to send back to the server in a subsequent request. Due to a currently known issue, it is recommended that the caller keep invoking the list method until the time a next page token is not returned, even if the result set is empty. */
  nextPageToken?: string;
}

export const ListUserListsResponse: Schema.Schema<ListUserListsResponse> = Schema.suspend(() => Schema.Struct({
  userLists: Schema.optional(Schema.Array(UserList)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUserListsResponse" }) as any as Schema.Schema<ListUserListsResponse>;

export interface OpenUserListRequest {
}

export const OpenUserListRequest: Schema.Schema<OpenUserListRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OpenUserListRequest" }) as any as Schema.Schema<OpenUserListRequest>;

export interface CloseUserListRequest {
}

export const CloseUserListRequest: Schema.Schema<CloseUserListRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CloseUserListRequest" }) as any as Schema.Schema<CloseUserListRequest>;

export interface GetRemarketingTagResponse {
  /** An HTML tag that can be placed on the advertiser's page to add users to a user list. For more information and code samples on using snippets on your website, refer to [Tag your site for remarketing](https://support.google.com/google-ads/answer/2476688). */
  snippet?: string;
}

export const GetRemarketingTagResponse: Schema.Schema<GetRemarketingTagResponse> = Schema.suspend(() => Schema.Struct({
  snippet: Schema.optional(Schema.String),
})).annotate({ identifier: "GetRemarketingTagResponse" }) as any as Schema.Schema<GetRemarketingTagResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets a bidder account by its name. */
export interface GetBiddersRequest {
  /** Required. Name of the bidder to get. Format: `bidders/{bidderAccountId}` */
  name: string;
}

export const GetBiddersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}" }),
  svc,
) as unknown as Schema.Schema<GetBiddersRequest>;

export type GetBiddersResponse = Bidder;
export const GetBiddersResponse = Bidder;

export type GetBiddersError = CommonErrors;

export const getBidders: API.OperationMethod<GetBiddersRequest, GetBiddersResponse, GetBiddersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBiddersRequest,
  output: GetBiddersResponse,
  errors: [],
}));

/** Lists all the bidder accounts that belong to the caller. */
export interface ListBiddersRequest {
  /** The maximum number of bidders to return. If unspecified, at most 100 bidders will be returned. The maximum value is 500; values above 500 will be coerced to 500. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. This value is received from a previous `ListBidders` call in ListBiddersResponse.nextPageToken. */
  pageToken?: string;
}

export const ListBiddersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders" }),
  svc,
) as unknown as Schema.Schema<ListBiddersRequest>;

export type ListBiddersResponse_Op = ListBiddersResponse;
export const ListBiddersResponse_Op = ListBiddersResponse;

export type ListBiddersError = CommonErrors;

export const listBidders = API.makePaginated(() => ({
  input: ListBiddersRequest,
  output: ListBiddersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a bidder endpoint by its name. */
export interface GetBiddersEndpointsRequest {
  /** Required. Name of the bidder endpoint to get. Format: `bidders/{bidderAccountId}/endpoints/{endpointId}` */
  name: string;
}

export const GetBiddersEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}/endpoints/{endpointsId}" }),
  svc,
) as unknown as Schema.Schema<GetBiddersEndpointsRequest>;

export type GetBiddersEndpointsResponse = Endpoint;
export const GetBiddersEndpointsResponse = Endpoint;

export type GetBiddersEndpointsError = CommonErrors;

export const getBiddersEndpoints: API.OperationMethod<GetBiddersEndpointsRequest, GetBiddersEndpointsResponse, GetBiddersEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBiddersEndpointsRequest,
  output: GetBiddersEndpointsResponse,
  errors: [],
}));

/** Lists all the bidder's endpoints. */
export interface ListBiddersEndpointsRequest {
  /** Required. Name of the bidder whose endpoints will be listed. Format: `bidders/{bidderAccountId}` */
  parent: string;
  /** The maximum number of endpoints to return. If unspecified, at most 100 endpoints will be returned. The maximum value is 500; values above 500 will be coerced to 500. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. This value is received from a previous `ListEndpoints` call in ListEndpointsResponse.nextPageToken. */
  pageToken?: string;
}

export const ListBiddersEndpointsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}/endpoints" }),
  svc,
) as unknown as Schema.Schema<ListBiddersEndpointsRequest>;

export type ListBiddersEndpointsResponse = ListEndpointsResponse;
export const ListBiddersEndpointsResponse = ListEndpointsResponse;

export type ListBiddersEndpointsError = CommonErrors;

export const listBiddersEndpoints = API.makePaginated(() => ({
  input: ListBiddersEndpointsRequest,
  output: ListBiddersEndpointsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a bidder's endpoint. */
export interface PatchBiddersEndpointsRequest {
  /** Output only. Name of the endpoint resource that must follow the pattern `bidders/{bidderAccountId}/endpoints/{endpointId}`, where {bidderAccountId} is the account ID of the bidder who operates this endpoint, and {endpointId} is a unique ID assigned by the server. */
  name: string;
  /** Field mask to use for partial in-place updates. */
  updateMask?: string;
  /** Request body */
  body?: Endpoint;
}

export const PatchBiddersEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Endpoint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/bidders/{biddersId}/endpoints/{endpointsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBiddersEndpointsRequest>;

export type PatchBiddersEndpointsResponse = Endpoint;
export const PatchBiddersEndpointsResponse = Endpoint;

export type PatchBiddersEndpointsError = CommonErrors;

export const patchBiddersEndpoints: API.OperationMethod<PatchBiddersEndpointsRequest, PatchBiddersEndpointsResponse, PatchBiddersEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBiddersEndpointsRequest,
  output: PatchBiddersEndpointsResponse,
  errors: [],
}));

/** Lists creatives as they are at the time of the initial request. This call may take multiple hours to complete. For large, paginated requests, this method returns a snapshot of creatives at the time of request for the first page. `lastStatusUpdate` and `creativeServingDecision` may be outdated for creatives on sequential pages. We recommend [Google Cloud Pub/Sub](//cloud.google.com/pubsub/docs/overview) to view the latest status. */
export interface ListBiddersCreativesRequest {
  /** Required. Name of the parent buyer that owns the creatives. The pattern for this resource is either `buyers/{buyerAccountId}` or `bidders/{bidderAccountId}`. For `buyers/{buyerAccountId}`, the `buyerAccountId` can be one of the following: 1. The ID of the buyer that is accessing their own creatives. 2. The ID of the child seat buyer under a bidder account. So for listing creatives pertaining to the child seat buyer (`456`) under bidder account (`123`), you would use the pattern: `buyers/456`. 3. The ID of the bidder itself. So for listing creatives pertaining to bidder (`123`), you would use `buyers/123`. If you want to access all creatives pertaining to both the bidder and all of its child seat accounts, you would use `bidders/{bidderAccountId}`, for example, for all creatives pertaining to bidder (`123`), use `bidders/123`. */
  parent: string;
  /** Requested page size. The server may return fewer creatives than requested (due to timeout constraint) even if more are available through another call. If unspecified, server will pick an appropriate default. Acceptable values are 1 to 1000, inclusive. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListCreativesResponse.nextPageToken returned from the previous call to the 'ListCreatives' method. Page tokens for continued pages are valid for up to five hours, counting from the call to 'ListCreatives' for the first page. */
  pageToken?: string;
  /** Query string to filter creatives. If no filter is specified, all active creatives will be returned. Example: 'accountId=12345 AND (dealsStatus:DISAPPROVED AND disapprovalReason:UNACCEPTABLE_CONTENT) OR declaredAttributes:IS_COOKIE_TARGETED' */
  filter?: string;
  /** Controls the amount of information included in the response. By default only creativeServingDecision is included. To retrieve the entire creative resource (including the declared fields and the creative content) specify the view as "FULL". */
  view?: "CREATIVE_VIEW_UNSPECIFIED" | "SERVING_DECISION_ONLY" | "FULL" | (string & {});
}

export const ListBiddersCreativesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}/creatives" }),
  svc,
) as unknown as Schema.Schema<ListBiddersCreativesRequest>;

export type ListBiddersCreativesResponse = ListCreativesResponse;
export const ListBiddersCreativesResponse = ListCreativesResponse;

export type ListBiddersCreativesError = CommonErrors;

export const listBiddersCreatives = API.makePaginated(() => ({
  input: ListBiddersCreativesRequest,
  output: ListBiddersCreativesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Watches all creatives pertaining to a bidder. It is sufficient to invoke this endpoint once per bidder. A Pub/Sub topic will be created and notifications will be pushed to the topic when any of the bidder's creatives change status. All of the bidder's service accounts will have access to read from the topic. Subsequent invocations of this method will return the existing Pub/Sub configuration. */
export interface WatchBiddersCreativesRequest {
  /** Required. To watch all creatives pertaining to the bidder and all its child seat accounts, the bidder must follow the pattern `bidders/{bidderAccountId}`. */
  parent: string;
  /** Request body */
  body?: WatchCreativesRequest;
}

export const WatchBiddersCreativesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(WatchCreativesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/creatives:watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchBiddersCreativesRequest>;

export type WatchBiddersCreativesResponse = WatchCreativesResponse;
export const WatchBiddersCreativesResponse = WatchCreativesResponse;

export type WatchBiddersCreativesError = CommonErrors;

export const watchBiddersCreatives: API.OperationMethod<WatchBiddersCreativesRequest, WatchBiddersCreativesResponse, WatchBiddersCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchBiddersCreativesRequest,
  output: WatchBiddersCreativesResponse,
  errors: [],
}));

/** Lists all pretargeting configurations for a single bidder. */
export interface ListBiddersPretargetingConfigsRequest {
  /** Required. Name of the bidder whose pretargeting configurations will be listed. Format: bidders/{bidderAccountId} */
  parent: string;
  /** The maximum number of pretargeting configurations to return. If unspecified, at most 10 pretargeting configurations will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. This value is received from a previous `ListPretargetingConfigs` call in ListPretargetingConfigsResponse.nextPageToken. */
  pageToken?: string;
}

export const ListBiddersPretargetingConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}/pretargetingConfigs" }),
  svc,
) as unknown as Schema.Schema<ListBiddersPretargetingConfigsRequest>;

export type ListBiddersPretargetingConfigsResponse = ListPretargetingConfigsResponse;
export const ListBiddersPretargetingConfigsResponse = ListPretargetingConfigsResponse;

export type ListBiddersPretargetingConfigsError = CommonErrors;

export const listBiddersPretargetingConfigs = API.makePaginated(() => ({
  input: ListBiddersPretargetingConfigsRequest,
  output: ListBiddersPretargetingConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a pretargeting configuration. */
export interface GetBiddersPretargetingConfigsRequest {
  /** Required. Name of the pretargeting configuration to get. Format: bidders/{bidderAccountId}/pretargetingConfigs/{configId} */
  name: string;
}

export const GetBiddersPretargetingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetBiddersPretargetingConfigsRequest>;

export type GetBiddersPretargetingConfigsResponse = PretargetingConfig;
export const GetBiddersPretargetingConfigsResponse = PretargetingConfig;

export type GetBiddersPretargetingConfigsError = CommonErrors;

export const getBiddersPretargetingConfigs: API.OperationMethod<GetBiddersPretargetingConfigsRequest, GetBiddersPretargetingConfigsResponse, GetBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBiddersPretargetingConfigsRequest,
  output: GetBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Creates a pretargeting configuration. A pretargeting configuration's state (PretargetingConfig.state) is active upon creation, and it will start to affect traffic shortly after. A bidder may create a maximum of 10 pretargeting configurations. Attempts to exceed this maximum results in a 400 bad request error. */
export interface CreateBiddersPretargetingConfigsRequest {
  /** Required. Name of the bidder to create the pretargeting configuration for. Format: bidders/{bidderAccountId} */
  parent: string;
  /** Request body */
  body?: PretargetingConfig;
}

export const CreateBiddersPretargetingConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PretargetingConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/pretargetingConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBiddersPretargetingConfigsRequest>;

export type CreateBiddersPretargetingConfigsResponse = PretargetingConfig;
export const CreateBiddersPretargetingConfigsResponse = PretargetingConfig;

export type CreateBiddersPretargetingConfigsError = CommonErrors;

export const createBiddersPretargetingConfigs: API.OperationMethod<CreateBiddersPretargetingConfigsRequest, CreateBiddersPretargetingConfigsResponse, CreateBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBiddersPretargetingConfigsRequest,
  output: CreateBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Updates a pretargeting configuration. */
export interface PatchBiddersPretargetingConfigsRequest {
  /** Output only. Name of the pretargeting configuration that must follow the pattern `bidders/{bidder_account_id}/pretargetingConfigs/{config_id}` */
  name: string;
  /** Field mask to use for partial in-place updates. */
  updateMask?: string;
  /** Request body */
  body?: PretargetingConfig;
}

export const PatchBiddersPretargetingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(PretargetingConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBiddersPretargetingConfigsRequest>;

export type PatchBiddersPretargetingConfigsResponse = PretargetingConfig;
export const PatchBiddersPretargetingConfigsResponse = PretargetingConfig;

export type PatchBiddersPretargetingConfigsError = CommonErrors;

export const patchBiddersPretargetingConfigs: API.OperationMethod<PatchBiddersPretargetingConfigsRequest, PatchBiddersPretargetingConfigsResponse, PatchBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBiddersPretargetingConfigsRequest,
  output: PatchBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Deletes a pretargeting configuration. */
export interface DeleteBiddersPretargetingConfigsRequest {
  /** Required. The name of the pretargeting configuration to delete. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId} */
  name: string;
}

export const DeleteBiddersPretargetingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBiddersPretargetingConfigsRequest>;

export type DeleteBiddersPretargetingConfigsResponse = Empty;
export const DeleteBiddersPretargetingConfigsResponse = Empty;

export type DeleteBiddersPretargetingConfigsError = CommonErrors;

export const deleteBiddersPretargetingConfigs: API.OperationMethod<DeleteBiddersPretargetingConfigsRequest, DeleteBiddersPretargetingConfigsResponse, DeleteBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBiddersPretargetingConfigsRequest,
  output: DeleteBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Activates a pretargeting configuration. */
export interface ActivateBiddersPretargetingConfigsRequest {
  /** Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId} */
  name: string;
  /** Request body */
  body?: ActivatePretargetingConfigRequest;
}

export const ActivateBiddersPretargetingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ActivatePretargetingConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateBiddersPretargetingConfigsRequest>;

export type ActivateBiddersPretargetingConfigsResponse = PretargetingConfig;
export const ActivateBiddersPretargetingConfigsResponse = PretargetingConfig;

export type ActivateBiddersPretargetingConfigsError = CommonErrors;

export const activateBiddersPretargetingConfigs: API.OperationMethod<ActivateBiddersPretargetingConfigsRequest, ActivateBiddersPretargetingConfigsResponse, ActivateBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateBiddersPretargetingConfigsRequest,
  output: ActivateBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Suspends a pretargeting configuration. */
export interface SuspendBiddersPretargetingConfigsRequest {
  /** Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId} */
  name: string;
  /** Request body */
  body?: SuspendPretargetingConfigRequest;
}

export const SuspendBiddersPretargetingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SuspendPretargetingConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}:suspend", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuspendBiddersPretargetingConfigsRequest>;

export type SuspendBiddersPretargetingConfigsResponse = PretargetingConfig;
export const SuspendBiddersPretargetingConfigsResponse = PretargetingConfig;

export type SuspendBiddersPretargetingConfigsError = CommonErrors;

export const suspendBiddersPretargetingConfigs: API.OperationMethod<SuspendBiddersPretargetingConfigsRequest, SuspendBiddersPretargetingConfigsResponse, SuspendBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuspendBiddersPretargetingConfigsRequest,
  output: SuspendBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Adds targeted sites to the pretargeting configuration. */
export interface AddTargetedSitesBiddersPretargetingConfigsRequest {
  /** Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId} */
  pretargetingConfig: string;
  /** Request body */
  body?: AddTargetedSitesRequest;
}

export const AddTargetedSitesBiddersPretargetingConfigsRequest = Schema.Struct({
  pretargetingConfig: Schema.String.pipe(T.HttpPath("pretargetingConfig")),
  body: Schema.optional(AddTargetedSitesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}:addTargetedSites", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddTargetedSitesBiddersPretargetingConfigsRequest>;

export type AddTargetedSitesBiddersPretargetingConfigsResponse = PretargetingConfig;
export const AddTargetedSitesBiddersPretargetingConfigsResponse = PretargetingConfig;

export type AddTargetedSitesBiddersPretargetingConfigsError = CommonErrors;

export const addTargetedSitesBiddersPretargetingConfigs: API.OperationMethod<AddTargetedSitesBiddersPretargetingConfigsRequest, AddTargetedSitesBiddersPretargetingConfigsResponse, AddTargetedSitesBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddTargetedSitesBiddersPretargetingConfigsRequest,
  output: AddTargetedSitesBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Removes targeted sites from the pretargeting configuration. */
export interface RemoveTargetedSitesBiddersPretargetingConfigsRequest {
  /** Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId} */
  pretargetingConfig: string;
  /** Request body */
  body?: RemoveTargetedSitesRequest;
}

export const RemoveTargetedSitesBiddersPretargetingConfigsRequest = Schema.Struct({
  pretargetingConfig: Schema.String.pipe(T.HttpPath("pretargetingConfig")),
  body: Schema.optional(RemoveTargetedSitesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}:removeTargetedSites", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveTargetedSitesBiddersPretargetingConfigsRequest>;

export type RemoveTargetedSitesBiddersPretargetingConfigsResponse = PretargetingConfig;
export const RemoveTargetedSitesBiddersPretargetingConfigsResponse = PretargetingConfig;

export type RemoveTargetedSitesBiddersPretargetingConfigsError = CommonErrors;

export const removeTargetedSitesBiddersPretargetingConfigs: API.OperationMethod<RemoveTargetedSitesBiddersPretargetingConfigsRequest, RemoveTargetedSitesBiddersPretargetingConfigsResponse, RemoveTargetedSitesBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveTargetedSitesBiddersPretargetingConfigsRequest,
  output: RemoveTargetedSitesBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Adds targeted apps to the pretargeting configuration. */
export interface AddTargetedAppsBiddersPretargetingConfigsRequest {
  /** Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId} */
  pretargetingConfig: string;
  /** Request body */
  body?: AddTargetedAppsRequest;
}

export const AddTargetedAppsBiddersPretargetingConfigsRequest = Schema.Struct({
  pretargetingConfig: Schema.String.pipe(T.HttpPath("pretargetingConfig")),
  body: Schema.optional(AddTargetedAppsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}:addTargetedApps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddTargetedAppsBiddersPretargetingConfigsRequest>;

export type AddTargetedAppsBiddersPretargetingConfigsResponse = PretargetingConfig;
export const AddTargetedAppsBiddersPretargetingConfigsResponse = PretargetingConfig;

export type AddTargetedAppsBiddersPretargetingConfigsError = CommonErrors;

export const addTargetedAppsBiddersPretargetingConfigs: API.OperationMethod<AddTargetedAppsBiddersPretargetingConfigsRequest, AddTargetedAppsBiddersPretargetingConfigsResponse, AddTargetedAppsBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddTargetedAppsBiddersPretargetingConfigsRequest,
  output: AddTargetedAppsBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Removes targeted apps from the pretargeting configuration. */
export interface RemoveTargetedAppsBiddersPretargetingConfigsRequest {
  /** Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId} */
  pretargetingConfig: string;
  /** Request body */
  body?: RemoveTargetedAppsRequest;
}

export const RemoveTargetedAppsBiddersPretargetingConfigsRequest = Schema.Struct({
  pretargetingConfig: Schema.String.pipe(T.HttpPath("pretargetingConfig")),
  body: Schema.optional(RemoveTargetedAppsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}:removeTargetedApps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveTargetedAppsBiddersPretargetingConfigsRequest>;

export type RemoveTargetedAppsBiddersPretargetingConfigsResponse = PretargetingConfig;
export const RemoveTargetedAppsBiddersPretargetingConfigsResponse = PretargetingConfig;

export type RemoveTargetedAppsBiddersPretargetingConfigsError = CommonErrors;

export const removeTargetedAppsBiddersPretargetingConfigs: API.OperationMethod<RemoveTargetedAppsBiddersPretargetingConfigsRequest, RemoveTargetedAppsBiddersPretargetingConfigsResponse, RemoveTargetedAppsBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveTargetedAppsBiddersPretargetingConfigsRequest,
  output: RemoveTargetedAppsBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Adds targeted publishers to the pretargeting config. */
export interface AddTargetedPublishersBiddersPretargetingConfigsRequest {
  /** Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId} */
  pretargetingConfig: string;
  /** Request body */
  body?: AddTargetedPublishersRequest;
}

export const AddTargetedPublishersBiddersPretargetingConfigsRequest = Schema.Struct({
  pretargetingConfig: Schema.String.pipe(T.HttpPath("pretargetingConfig")),
  body: Schema.optional(AddTargetedPublishersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}:addTargetedPublishers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddTargetedPublishersBiddersPretargetingConfigsRequest>;

export type AddTargetedPublishersBiddersPretargetingConfigsResponse = PretargetingConfig;
export const AddTargetedPublishersBiddersPretargetingConfigsResponse = PretargetingConfig;

export type AddTargetedPublishersBiddersPretargetingConfigsError = CommonErrors;

export const addTargetedPublishersBiddersPretargetingConfigs: API.OperationMethod<AddTargetedPublishersBiddersPretargetingConfigsRequest, AddTargetedPublishersBiddersPretargetingConfigsResponse, AddTargetedPublishersBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddTargetedPublishersBiddersPretargetingConfigsRequest,
  output: AddTargetedPublishersBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Removes targeted publishers from the pretargeting config. */
export interface RemoveTargetedPublishersBiddersPretargetingConfigsRequest {
  /** Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId} */
  pretargetingConfig: string;
  /** Request body */
  body?: RemoveTargetedPublishersRequest;
}

export const RemoveTargetedPublishersBiddersPretargetingConfigsRequest = Schema.Struct({
  pretargetingConfig: Schema.String.pipe(T.HttpPath("pretargetingConfig")),
  body: Schema.optional(RemoveTargetedPublishersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/pretargetingConfigs/{pretargetingConfigsId}:removeTargetedPublishers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveTargetedPublishersBiddersPretargetingConfigsRequest>;

export type RemoveTargetedPublishersBiddersPretargetingConfigsResponse = PretargetingConfig;
export const RemoveTargetedPublishersBiddersPretargetingConfigsResponse = PretargetingConfig;

export type RemoveTargetedPublishersBiddersPretargetingConfigsError = CommonErrors;

export const removeTargetedPublishersBiddersPretargetingConfigs: API.OperationMethod<RemoveTargetedPublishersBiddersPretargetingConfigsRequest, RemoveTargetedPublishersBiddersPretargetingConfigsResponse, RemoveTargetedPublishersBiddersPretargetingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveTargetedPublishersBiddersPretargetingConfigsRequest,
  output: RemoveTargetedPublishersBiddersPretargetingConfigsResponse,
  errors: [],
}));

/** Lists publisher connections for a given bidder. */
export interface ListBiddersPublisherConnectionsRequest {
  /** Required. Name of the bidder for which publishers have initiated connections. The pattern for this resource is `bidders/{bidder}` where `{bidder}` represents the account ID of the bidder. */
  parent: string;
  /** Requested page size. The server may return fewer results than requested (due to timeout constraint) even if more are available through another call. If unspecified, the server will pick an appropriate default. Acceptable values are 1 to 5000, inclusive. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListPublisherConnectionsResponse.nextPageToken returned from the previous call to the 'ListPublisherConnections' method. */
  pageToken?: string;
  /** Query string to filter publisher connections. Connections can be filtered by `displayName`, `publisherPlatform`, and `biddingState`. If no filter is specified, all publisher connections will be returned. Example: 'displayName="Great Publisher*" AND publisherPlatform=ADMOB AND biddingState != PENDING' See https://google.aip.dev/160 for more information about filtering syntax. */
  filter?: string;
  /** Order specification by which results should be sorted. If no sort order is specified, the results will be returned in alphabetic order based on the publisher's publisher code. Results can be sorted by `createTime`. Example: 'createTime DESC'. */
  orderBy?: string;
}

export const ListBiddersPublisherConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}/publisherConnections" }),
  svc,
) as unknown as Schema.Schema<ListBiddersPublisherConnectionsRequest>;

export type ListBiddersPublisherConnectionsResponse = ListPublisherConnectionsResponse;
export const ListBiddersPublisherConnectionsResponse = ListPublisherConnectionsResponse;

export type ListBiddersPublisherConnectionsError = CommonErrors;

export const listBiddersPublisherConnections = API.makePaginated(() => ({
  input: ListBiddersPublisherConnectionsRequest,
  output: ListBiddersPublisherConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a publisher connection. */
export interface GetBiddersPublisherConnectionsRequest {
  /** Required. Name of the publisher whose connection information is to be retrieved. In the pattern `bidders/{bidder}/publisherConnections/{publisher}` where `{bidder}` is the account ID of the bidder, and `{publisher}` is the ads.txt/app-ads.txt publisher ID. See publisherConnection.name. */
  name: string;
}

export const GetBiddersPublisherConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}/publisherConnections/{publisherConnectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetBiddersPublisherConnectionsRequest>;

export type GetBiddersPublisherConnectionsResponse = PublisherConnection;
export const GetBiddersPublisherConnectionsResponse = PublisherConnection;

export type GetBiddersPublisherConnectionsError = CommonErrors;

export const getBiddersPublisherConnections: API.OperationMethod<GetBiddersPublisherConnectionsRequest, GetBiddersPublisherConnectionsResponse, GetBiddersPublisherConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBiddersPublisherConnectionsRequest,
  output: GetBiddersPublisherConnectionsResponse,
  errors: [],
}));

/** Batch approves multiple publisher connections. */
export interface BatchApproveBiddersPublisherConnectionsRequest {
  /** Required. The bidder for whom publisher connections will be approved. Format: `bidders/{bidder}` where `{bidder}` is the account ID of the bidder. */
  parent: string;
  /** Request body */
  body?: BatchApprovePublisherConnectionsRequest;
}

export const BatchApproveBiddersPublisherConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchApprovePublisherConnectionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/publisherConnections:batchApprove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchApproveBiddersPublisherConnectionsRequest>;

export type BatchApproveBiddersPublisherConnectionsResponse = BatchApprovePublisherConnectionsResponse;
export const BatchApproveBiddersPublisherConnectionsResponse = BatchApprovePublisherConnectionsResponse;

export type BatchApproveBiddersPublisherConnectionsError = CommonErrors;

export const batchApproveBiddersPublisherConnections: API.OperationMethod<BatchApproveBiddersPublisherConnectionsRequest, BatchApproveBiddersPublisherConnectionsResponse, BatchApproveBiddersPublisherConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchApproveBiddersPublisherConnectionsRequest,
  output: BatchApproveBiddersPublisherConnectionsResponse,
  errors: [],
}));

/** Batch rejects multiple publisher connections. */
export interface BatchRejectBiddersPublisherConnectionsRequest {
  /** Required. The bidder for whom publisher connections will be rejected. Format: `bidders/{bidder}` where `{bidder}` is the account ID of the bidder. */
  parent: string;
  /** Request body */
  body?: BatchRejectPublisherConnectionsRequest;
}

export const BatchRejectBiddersPublisherConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchRejectPublisherConnectionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/publisherConnections:batchReject", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchRejectBiddersPublisherConnectionsRequest>;

export type BatchRejectBiddersPublisherConnectionsResponse = BatchRejectPublisherConnectionsResponse;
export const BatchRejectBiddersPublisherConnectionsResponse = BatchRejectPublisherConnectionsResponse;

export type BatchRejectBiddersPublisherConnectionsError = CommonErrors;

export const batchRejectBiddersPublisherConnections: API.OperationMethod<BatchRejectBiddersPublisherConnectionsRequest, BatchRejectBiddersPublisherConnectionsResponse, BatchRejectBiddersPublisherConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchRejectBiddersPublisherConnectionsRequest,
  output: BatchRejectBiddersPublisherConnectionsResponse,
  errors: [],
}));

/** Gets a buyer account by its name. */
export interface GetBuyersRequest {
  /** Required. Name of the buyer to get. Format: `buyers/{buyerId}` */
  name: string;
}

export const GetBuyersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersRequest>;

export type GetBuyersResponse = Buyer;
export const GetBuyersResponse = Buyer;

export type GetBuyersError = CommonErrors;

export const getBuyers: API.OperationMethod<GetBuyersRequest, GetBuyersResponse, GetBuyersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersRequest,
  output: GetBuyersResponse,
  errors: [],
}));

/** Lists all buyer account information the calling buyer user or service account is permissioned to manage. */
export interface ListBuyersRequest {
  /** The maximum number of buyers to return. If unspecified, at most 100 buyers will be returned. The maximum value is 500; values above 500 will be coerced to 500. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. This value is received from a previous `ListBuyers` call in ListBuyersResponse.nextPageToken. */
  pageToken?: string;
}

export const ListBuyersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers" }),
  svc,
) as unknown as Schema.Schema<ListBuyersRequest>;

export type ListBuyersResponse_Op = ListBuyersResponse;
export const ListBuyersResponse_Op = ListBuyersResponse;

export type ListBuyersError = CommonErrors;

export const listBuyers = API.makePaginated(() => ({
  input: ListBuyersRequest,
  output: ListBuyersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** This has been sunset as of October 2023, and will return an error response if called. For more information, see the release notes: https://developers.google.com/authorized-buyers/apis/relnotes#real-time-bidding-api Gets remarketing tag for a buyer. A remarketing tag is a piece of JavaScript code that can be placed on a web page. When a user visits a page containing a remarketing tag, Google adds the user to a user list. */
export interface GetRemarketingTagBuyersRequest {
  /** Required. To fetch the remarketing tag for an account, the name must follow the pattern `buyers/{accountId}`, where `{accountId}` represents the ID of the buyer that owns the remarketing tag. For a bidder accessing the remarketing tag on behalf of a child seat buyer, `{accountId}` should represent the ID of the child seat buyer. To fetch the remarketing tag for a specific user list, the name must follow the pattern `buyers/{accountId}/userLists/{userListId}`. See UserList.name. */
  name: string;
}

export const GetRemarketingTagBuyersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}:getRemarketingTag" }),
  svc,
) as unknown as Schema.Schema<GetRemarketingTagBuyersRequest>;

export type GetRemarketingTagBuyersResponse = GetRemarketingTagResponse;
export const GetRemarketingTagBuyersResponse = GetRemarketingTagResponse;

export type GetRemarketingTagBuyersError = CommonErrors;

export const getRemarketingTagBuyers: API.OperationMethod<GetRemarketingTagBuyersRequest, GetRemarketingTagBuyersResponse, GetRemarketingTagBuyersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRemarketingTagBuyersRequest,
  output: GetRemarketingTagBuyersResponse,
  errors: [],
}));

/** Lists creatives as they are at the time of the initial request. This call may take multiple hours to complete. For large, paginated requests, this method returns a snapshot of creatives at the time of request for the first page. `lastStatusUpdate` and `creativeServingDecision` may be outdated for creatives on sequential pages. We recommend [Google Cloud Pub/Sub](//cloud.google.com/pubsub/docs/overview) to view the latest status. */
export interface ListBuyersCreativesRequest {
  /** Required. Name of the parent buyer that owns the creatives. The pattern for this resource is either `buyers/{buyerAccountId}` or `bidders/{bidderAccountId}`. For `buyers/{buyerAccountId}`, the `buyerAccountId` can be one of the following: 1. The ID of the buyer that is accessing their own creatives. 2. The ID of the child seat buyer under a bidder account. So for listing creatives pertaining to the child seat buyer (`456`) under bidder account (`123`), you would use the pattern: `buyers/456`. 3. The ID of the bidder itself. So for listing creatives pertaining to bidder (`123`), you would use `buyers/123`. If you want to access all creatives pertaining to both the bidder and all of its child seat accounts, you would use `bidders/{bidderAccountId}`, for example, for all creatives pertaining to bidder (`123`), use `bidders/123`. */
  parent: string;
  /** Requested page size. The server may return fewer creatives than requested (due to timeout constraint) even if more are available through another call. If unspecified, server will pick an appropriate default. Acceptable values are 1 to 1000, inclusive. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListCreativesResponse.nextPageToken returned from the previous call to the 'ListCreatives' method. Page tokens for continued pages are valid for up to five hours, counting from the call to 'ListCreatives' for the first page. */
  pageToken?: string;
  /** Query string to filter creatives. If no filter is specified, all active creatives will be returned. Example: 'accountId=12345 AND (dealsStatus:DISAPPROVED AND disapprovalReason:UNACCEPTABLE_CONTENT) OR declaredAttributes:IS_COOKIE_TARGETED' */
  filter?: string;
  /** Controls the amount of information included in the response. By default only creativeServingDecision is included. To retrieve the entire creative resource (including the declared fields and the creative content) specify the view as "FULL". */
  view?: "CREATIVE_VIEW_UNSPECIFIED" | "SERVING_DECISION_ONLY" | "FULL" | (string & {});
}

export const ListBuyersCreativesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/creatives" }),
  svc,
) as unknown as Schema.Schema<ListBuyersCreativesRequest>;

export type ListBuyersCreativesResponse = ListCreativesResponse;
export const ListBuyersCreativesResponse = ListCreativesResponse;

export type ListBuyersCreativesError = CommonErrors;

export const listBuyersCreatives = API.makePaginated(() => ({
  input: ListBuyersCreativesRequest,
  output: ListBuyersCreativesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a creative. */
export interface GetBuyersCreativesRequest {
  /** Required. Name of the creative to retrieve. See creative.name. */
  name: string;
  /** Controls the amount of information included in the response. By default only creativeServingDecision is included. To retrieve the entire creative resource (including the declared fields and the creative content) specify the view as "FULL". */
  view?: "CREATIVE_VIEW_UNSPECIFIED" | "SERVING_DECISION_ONLY" | "FULL" | (string & {});
}

export const GetBuyersCreativesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/creatives/{creativesId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersCreativesRequest>;

export type GetBuyersCreativesResponse = Creative;
export const GetBuyersCreativesResponse = Creative;

export type GetBuyersCreativesError = CommonErrors;

export const getBuyersCreatives: API.OperationMethod<GetBuyersCreativesRequest, GetBuyersCreativesResponse, GetBuyersCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersCreativesRequest,
  output: GetBuyersCreativesResponse,
  errors: [],
}));

/** Creates a creative. */
export interface CreateBuyersCreativesRequest {
  /** Required. The name of the parent buyer that the new creative belongs to that must follow the pattern `buyers/{buyerAccountId}`, where `{buyerAccountId}` represents the account ID of the buyer who owns a creative. For a bidder accessing creatives on behalf of a child seat buyer, `{buyerAccountId}` should represent the account ID of the child seat buyer. */
  parent: string;
  /** Request body */
  body?: Creative;
}

export const CreateBuyersCreativesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Creative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/creatives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBuyersCreativesRequest>;

export type CreateBuyersCreativesResponse = Creative;
export const CreateBuyersCreativesResponse = Creative;

export type CreateBuyersCreativesError = CommonErrors;

export const createBuyersCreatives: API.OperationMethod<CreateBuyersCreativesRequest, CreateBuyersCreativesResponse, CreateBuyersCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBuyersCreativesRequest,
  output: CreateBuyersCreativesResponse,
  errors: [],
}));

/** Updates a creative. */
export interface PatchBuyersCreativesRequest {
  /** Output only. Name of the creative. Follows the pattern `buyers/{buyer}/creatives/{creative}`, where `{buyer}` represents the account ID of the buyer who owns the creative, and `{creative}` is the buyer-specific creative ID that references this creative in the bid response. */
  name: string;
  /** Field mask to use for partial in-place updates. */
  updateMask?: string;
  /** Request body */
  body?: Creative;
}

export const PatchBuyersCreativesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Creative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/buyers/{buyersId}/creatives/{creativesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBuyersCreativesRequest>;

export type PatchBuyersCreativesResponse = Creative;
export const PatchBuyersCreativesResponse = Creative;

export type PatchBuyersCreativesError = CommonErrors;

export const patchBuyersCreatives: API.OperationMethod<PatchBuyersCreativesRequest, PatchBuyersCreativesResponse, PatchBuyersCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBuyersCreativesRequest,
  output: PatchBuyersCreativesResponse,
  errors: [],
}));

/** Gets a user list by its name. */
export interface GetBuyersUserListsRequest {
  /** Required. The name of the user list to be retrieved. See UserList.name. */
  name: string;
}

export const GetBuyersUserListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/userLists/{userListsId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersUserListsRequest>;

export type GetBuyersUserListsResponse = UserList;
export const GetBuyersUserListsResponse = UserList;

export type GetBuyersUserListsError = CommonErrors;

export const getBuyersUserLists: API.OperationMethod<GetBuyersUserListsRequest, GetBuyersUserListsResponse, GetBuyersUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersUserListsRequest,
  output: GetBuyersUserListsResponse,
  errors: [],
}));

/** Lists the user lists visible to the current user. */
export interface ListBuyersUserListsRequest {
  /** Required. The name of the parent buyer for the user lists to be returned that must follow the pattern `buyers/{buyerAccountId}`, where `{buyerAccountId}` represents the account ID of the buyer who owns user lists. For a bidder accessing user lists on behalf of a child seat buyer , `{buyerAccountId}` should represent the account ID of the child seat buyer. */
  parent: string;
  /** The number of results to return per page. */
  pageSize?: number;
  /** Continuation page token as received from a previous response. */
  pageToken?: string;
}

export const ListBuyersUserListsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/userLists" }),
  svc,
) as unknown as Schema.Schema<ListBuyersUserListsRequest>;

export type ListBuyersUserListsResponse = ListUserListsResponse;
export const ListBuyersUserListsResponse = ListUserListsResponse;

export type ListBuyersUserListsError = CommonErrors;

export const listBuyersUserLists = API.makePaginated(() => ({
  input: ListBuyersUserListsRequest,
  output: ListBuyersUserListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new user list. */
export interface CreateBuyersUserListsRequest {
  /** Required. The name of the parent buyer of the user list to be retrieved, which must follow the pattern `buyers/{buyerAccountId}`, where `{buyerAccountId}` represents the account ID of the buyer who owns the user list. For a bidder accessing user lists on behalf of a child seat buyer, `{buyerAccountId}` should represent the account ID of the child seat buyer. */
  parent: string;
  /** Request body */
  body?: UserList;
}

export const CreateBuyersUserListsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UserList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/userLists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBuyersUserListsRequest>;

export type CreateBuyersUserListsResponse = UserList;
export const CreateBuyersUserListsResponse = UserList;

export type CreateBuyersUserListsError = CommonErrors;

export const createBuyersUserLists: API.OperationMethod<CreateBuyersUserListsRequest, CreateBuyersUserListsResponse, CreateBuyersUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBuyersUserListsRequest,
  output: CreateBuyersUserListsResponse,
  errors: [],
}));

/** Updates the given user list. Only user lists with URLRestrictions can be updated. */
export interface UpdateBuyersUserListsRequest {
  /** Output only. Name of the user list that must follow the pattern `buyers/{buyer}/userLists/{user_list}`, where `{buyer}` represents the account ID of the buyer who owns the user list. For a bidder accessing user lists on behalf of a child seat buyer, `{buyer}` represents the account ID of the child seat buyer. `{user_list}` is an int64 identifier assigned by Google to uniquely identify a user list. */
  name: string;
  /** Request body */
  body?: UserList;
}

export const UpdateBuyersUserListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UserList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/buyers/{buyersId}/userLists/{userListsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateBuyersUserListsRequest>;

export type UpdateBuyersUserListsResponse = UserList;
export const UpdateBuyersUserListsResponse = UserList;

export type UpdateBuyersUserListsError = CommonErrors;

export const updateBuyersUserLists: API.OperationMethod<UpdateBuyersUserListsRequest, UpdateBuyersUserListsResponse, UpdateBuyersUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateBuyersUserListsRequest,
  output: UpdateBuyersUserListsResponse,
  errors: [],
}));

/** Changes the status of a user list to OPEN. This allows new users to be added to the user list. */
export interface OpenBuyersUserListsRequest {
  /** Required. The name of the user list to open. See UserList.name */
  name: string;
  /** Request body */
  body?: OpenUserListRequest;
}

export const OpenBuyersUserListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(OpenUserListRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/userLists/{userListsId}:open", hasBody: true }),
  svc,
) as unknown as Schema.Schema<OpenBuyersUserListsRequest>;

export type OpenBuyersUserListsResponse = UserList;
export const OpenBuyersUserListsResponse = UserList;

export type OpenBuyersUserListsError = CommonErrors;

export const openBuyersUserLists: API.OperationMethod<OpenBuyersUserListsRequest, OpenBuyersUserListsResponse, OpenBuyersUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: OpenBuyersUserListsRequest,
  output: OpenBuyersUserListsResponse,
  errors: [],
}));

/** Changes the status of a user list to CLOSED. This prevents new users from being added to the user list. */
export interface CloseBuyersUserListsRequest {
  /** Required. The name of the user list to close. See UserList.name */
  name: string;
  /** Request body */
  body?: CloseUserListRequest;
}

export const CloseBuyersUserListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CloseUserListRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/userLists/{userListsId}:close", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CloseBuyersUserListsRequest>;

export type CloseBuyersUserListsResponse = UserList;
export const CloseBuyersUserListsResponse = UserList;

export type CloseBuyersUserListsError = CommonErrors;

export const closeBuyersUserLists: API.OperationMethod<CloseBuyersUserListsRequest, CloseBuyersUserListsResponse, CloseBuyersUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CloseBuyersUserListsRequest,
  output: CloseBuyersUserListsResponse,
  errors: [],
}));

/** This has been sunset as of October 2023, and will return an error response if called. For more information, see the release notes: https://developers.google.com/authorized-buyers/apis/relnotes#real-time-bidding-api Gets remarketing tag for a buyer. A remarketing tag is a piece of JavaScript code that can be placed on a web page. When a user visits a page containing a remarketing tag, Google adds the user to a user list. */
export interface GetRemarketingTagBuyersUserListsRequest {
  /** Required. To fetch the remarketing tag for an account, the name must follow the pattern `buyers/{accountId}`, where `{accountId}` represents the ID of the buyer that owns the remarketing tag. For a bidder accessing the remarketing tag on behalf of a child seat buyer, `{accountId}` should represent the ID of the child seat buyer. To fetch the remarketing tag for a specific user list, the name must follow the pattern `buyers/{accountId}/userLists/{userListId}`. See UserList.name. */
  name: string;
}

export const GetRemarketingTagBuyersUserListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/userLists/{userListsId}:getRemarketingTag" }),
  svc,
) as unknown as Schema.Schema<GetRemarketingTagBuyersUserListsRequest>;

export type GetRemarketingTagBuyersUserListsResponse = GetRemarketingTagResponse;
export const GetRemarketingTagBuyersUserListsResponse = GetRemarketingTagResponse;

export type GetRemarketingTagBuyersUserListsError = CommonErrors;

export const getRemarketingTagBuyersUserLists: API.OperationMethod<GetRemarketingTagBuyersUserListsRequest, GetRemarketingTagBuyersUserListsResponse, GetRemarketingTagBuyersUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRemarketingTagBuyersUserListsRequest,
  output: GetRemarketingTagBuyersUserListsResponse,
  errors: [],
}));

