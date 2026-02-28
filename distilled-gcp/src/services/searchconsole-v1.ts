// ==========================================================================
// Google Search Console API (searchconsole v1)
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
  name: "searchconsole",
  version: "v1",
  rootUrl: "https://searchconsole.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface InspectUrlIndexRequest {
  /** Required. URL to inspect. Must be under the property specified in "site_url". */
  inspectionUrl?: string;
  /** Required. The URL of the property as defined in Search Console. **Examples:** `http://www.example.com/` for a URL-prefix property, or `sc-domain:example.com` for a Domain property. */
  siteUrl?: string;
  /** Optional. An [IETF BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) language code representing the requested language for translated issue messages, e.g. "en-US", "or "de-CH". Default value is "en-US". */
  languageCode?: string;
}

export const InspectUrlIndexRequest: Schema.Schema<InspectUrlIndexRequest> = Schema.suspend(() => Schema.Struct({
  inspectionUrl: Schema.optional(Schema.String),
  siteUrl: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "InspectUrlIndexRequest" }) as any as Schema.Schema<InspectUrlIndexRequest>;

export interface IndexStatusInspectionResult {
  /** High level verdict about whether the URL *is* indexed (indexed status), or *can be* indexed (live inspection). */
  verdict?: "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL" | (string & {});
  /** Could Google find and index the page. More details about page indexing appear in 'indexing_state'. */
  coverageState?: string;
  /** Whether or not the page is blocked to Google by a robots.txt rule. */
  robotsTxtState?: "ROBOTS_TXT_STATE_UNSPECIFIED" | "ALLOWED" | "DISALLOWED" | (string & {});
  /** Whether or not the page blocks indexing through a noindex rule. */
  indexingState?: "INDEXING_STATE_UNSPECIFIED" | "INDEXING_ALLOWED" | "BLOCKED_BY_META_TAG" | "BLOCKED_BY_HTTP_HEADER" | "BLOCKED_BY_ROBOTS_TXT" | (string & {});
  /** Last time this URL was crawled by Google using the [primary crawler](https://support.google.com/webmasters/answer/7440203#primary_crawler). Absent if the URL was never crawled successfully. */
  lastCrawlTime?: string;
  /** Whether or not Google could retrieve the page from your server. Equivalent to ["page fetch"](https://support.google.com/webmasters/answer/9012289#index_coverage) in the URL inspection report. */
  pageFetchState?: "PAGE_FETCH_STATE_UNSPECIFIED" | "SUCCESSFUL" | "SOFT_404" | "BLOCKED_ROBOTS_TXT" | "NOT_FOUND" | "ACCESS_DENIED" | "SERVER_ERROR" | "REDIRECT_ERROR" | "ACCESS_FORBIDDEN" | "BLOCKED_4XX" | "INTERNAL_CRAWL_ERROR" | "INVALID_URL" | (string & {});
  /** The URL of the page that Google selected as canonical. If the page was not indexed, this field is absent. */
  googleCanonical?: string;
  /** The URL that your page or site [declares as canonical](https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls?#define-canonical). If you did not declare a canonical URL, this field is absent. */
  userCanonical?: string;
  /** Any sitemaps that this URL was listed in, as known by Google. Not guaranteed to be an exhaustive list, especially if Google did not discover this URL through a sitemap. Absent if no sitemaps were found. */
  sitemap?: Array<string>;
  /** URLs that link to the inspected URL, directly and indirectly. */
  referringUrls?: Array<string>;
  /** Primary crawler that was used by Google to crawl your site. */
  crawledAs?: "CRAWLING_USER_AGENT_UNSPECIFIED" | "DESKTOP" | "MOBILE" | (string & {});
}

export const IndexStatusInspectionResult: Schema.Schema<IndexStatusInspectionResult> = Schema.suspend(() => Schema.Struct({
  verdict: Schema.optional(Schema.String),
  coverageState: Schema.optional(Schema.String),
  robotsTxtState: Schema.optional(Schema.String),
  indexingState: Schema.optional(Schema.String),
  lastCrawlTime: Schema.optional(Schema.String),
  pageFetchState: Schema.optional(Schema.String),
  googleCanonical: Schema.optional(Schema.String),
  userCanonical: Schema.optional(Schema.String),
  sitemap: Schema.optional(Schema.Array(Schema.String)),
  referringUrls: Schema.optional(Schema.Array(Schema.String)),
  crawledAs: Schema.optional(Schema.String),
})).annotate({ identifier: "IndexStatusInspectionResult" }) as any as Schema.Schema<IndexStatusInspectionResult>;

export interface AmpIssue {
  /** Brief description of this issue. */
  issueMessage?: string;
  /** Severity of this issue: WARNING or ERROR. */
  severity?: "SEVERITY_UNSPECIFIED" | "WARNING" | "ERROR" | (string & {});
}

export const AmpIssue: Schema.Schema<AmpIssue> = Schema.suspend(() => Schema.Struct({
  issueMessage: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "AmpIssue" }) as any as Schema.Schema<AmpIssue>;

export interface AmpInspectionResult {
  /** The status of the most severe error on the page. If a page has both warnings and errors, the page status is error. Error status means the page cannot be shown in Search results. */
  verdict?: "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL" | (string & {});
  /** URL of the AMP that was inspected. If the submitted URL is a desktop page that refers to an AMP version, the AMP version will be inspected. */
  ampUrl?: string;
  /** Whether or not the page is blocked to Google by a robots.txt rule. */
  robotsTxtState?: "ROBOTS_TXT_STATE_UNSPECIFIED" | "ALLOWED" | "DISALLOWED" | (string & {});
  /** Whether or not the page blocks indexing through a noindex rule. */
  indexingState?: "AMP_INDEXING_STATE_UNSPECIFIED" | "AMP_INDEXING_ALLOWED" | "BLOCKED_DUE_TO_NOINDEX" | "BLOCKED_DUE_TO_EXPIRED_UNAVAILABLE_AFTER" | (string & {});
  /** Index status of the AMP URL. */
  ampIndexStatusVerdict?: "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL" | (string & {});
  /** Last time this AMP version was crawled by Google. Absent if the URL was never crawled successfully. */
  lastCrawlTime?: string;
  /** Whether or not Google could fetch the AMP. */
  pageFetchState?: "PAGE_FETCH_STATE_UNSPECIFIED" | "SUCCESSFUL" | "SOFT_404" | "BLOCKED_ROBOTS_TXT" | "NOT_FOUND" | "ACCESS_DENIED" | "SERVER_ERROR" | "REDIRECT_ERROR" | "ACCESS_FORBIDDEN" | "BLOCKED_4XX" | "INTERNAL_CRAWL_ERROR" | "INVALID_URL" | (string & {});
  /** A list of zero or more AMP issues found for the inspected URL. */
  issues?: Array<AmpIssue>;
}

export const AmpInspectionResult: Schema.Schema<AmpInspectionResult> = Schema.suspend(() => Schema.Struct({
  verdict: Schema.optional(Schema.String),
  ampUrl: Schema.optional(Schema.String),
  robotsTxtState: Schema.optional(Schema.String),
  indexingState: Schema.optional(Schema.String),
  ampIndexStatusVerdict: Schema.optional(Schema.String),
  lastCrawlTime: Schema.optional(Schema.String),
  pageFetchState: Schema.optional(Schema.String),
  issues: Schema.optional(Schema.Array(AmpIssue)),
})).annotate({ identifier: "AmpInspectionResult" }) as any as Schema.Schema<AmpInspectionResult>;

export interface MobileUsabilityIssue {
  /** Mobile-usability issue type. */
  issueType?: "MOBILE_USABILITY_ISSUE_TYPE_UNSPECIFIED" | "USES_INCOMPATIBLE_PLUGINS" | "CONFIGURE_VIEWPORT" | "FIXED_WIDTH_VIEWPORT" | "SIZE_CONTENT_TO_VIEWPORT" | "USE_LEGIBLE_FONT_SIZES" | "TAP_TARGETS_TOO_CLOSE" | (string & {});
  /** Not returned; reserved for future use. */
  severity?: "SEVERITY_UNSPECIFIED" | "WARNING" | "ERROR" | (string & {});
  /** Additional information regarding the issue. */
  message?: string;
}

export const MobileUsabilityIssue: Schema.Schema<MobileUsabilityIssue> = Schema.suspend(() => Schema.Struct({
  issueType: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "MobileUsabilityIssue" }) as any as Schema.Schema<MobileUsabilityIssue>;

export interface MobileUsabilityInspectionResult {
  /** High-level mobile-usability inspection result for this URL. */
  verdict?: "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL" | (string & {});
  /** A list of zero or more mobile-usability issues detected for this URL. */
  issues?: Array<MobileUsabilityIssue>;
}

export const MobileUsabilityInspectionResult: Schema.Schema<MobileUsabilityInspectionResult> = Schema.suspend(() => Schema.Struct({
  verdict: Schema.optional(Schema.String),
  issues: Schema.optional(Schema.Array(MobileUsabilityIssue)),
})).annotate({ identifier: "MobileUsabilityInspectionResult" }) as any as Schema.Schema<MobileUsabilityInspectionResult>;

export interface RichResultsIssue {
  /** Rich Results issue type. */
  issueMessage?: string;
  /** Severity of this issue: WARNING, or ERROR. Items with an issue of status ERROR cannot appear with rich result features in Google Search results. */
  severity?: "SEVERITY_UNSPECIFIED" | "WARNING" | "ERROR" | (string & {});
}

export const RichResultsIssue: Schema.Schema<RichResultsIssue> = Schema.suspend(() => Schema.Struct({
  issueMessage: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "RichResultsIssue" }) as any as Schema.Schema<RichResultsIssue>;

export interface Item {
  /** The user-provided name of this item. */
  name?: string;
  /** A list of zero or more rich result issues found for this instance. */
  issues?: Array<RichResultsIssue>;
}

export const Item: Schema.Schema<Item> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  issues: Schema.optional(Schema.Array(RichResultsIssue)),
})).annotate({ identifier: "Item" }) as any as Schema.Schema<Item>;

export interface DetectedItems {
  /** Rich Results type */
  richResultType?: string;
  /** List of Rich Results items. */
  items?: Array<Item>;
}

export const DetectedItems: Schema.Schema<DetectedItems> = Schema.suspend(() => Schema.Struct({
  richResultType: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Item)),
})).annotate({ identifier: "DetectedItems" }) as any as Schema.Schema<DetectedItems>;

export interface RichResultsInspectionResult {
  /** High-level rich results inspection result for this URL. */
  verdict?: "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL" | (string & {});
  /** A list of zero or more rich results detected on this page. Rich results that cannot even be parsed due to syntactic issues will not be listed here. */
  detectedItems?: Array<DetectedItems>;
}

export const RichResultsInspectionResult: Schema.Schema<RichResultsInspectionResult> = Schema.suspend(() => Schema.Struct({
  verdict: Schema.optional(Schema.String),
  detectedItems: Schema.optional(Schema.Array(DetectedItems)),
})).annotate({ identifier: "RichResultsInspectionResult" }) as any as Schema.Schema<RichResultsInspectionResult>;

export interface UrlInspectionResult {
  /** Link to Search Console URL inspection. */
  inspectionResultLink?: string;
  /** Result of the index status analysis. */
  indexStatusResult?: IndexStatusInspectionResult;
  /** Result of the AMP analysis. Absent if the page is not an AMP page. */
  ampResult?: AmpInspectionResult;
  /** Result of the Mobile usability analysis. */
  mobileUsabilityResult?: MobileUsabilityInspectionResult;
  /** Result of the Rich Results analysis. Absent if there are no rich results found. */
  richResultsResult?: RichResultsInspectionResult;
}

export const UrlInspectionResult: Schema.Schema<UrlInspectionResult> = Schema.suspend(() => Schema.Struct({
  inspectionResultLink: Schema.optional(Schema.String),
  indexStatusResult: Schema.optional(IndexStatusInspectionResult),
  ampResult: Schema.optional(AmpInspectionResult),
  mobileUsabilityResult: Schema.optional(MobileUsabilityInspectionResult),
  richResultsResult: Schema.optional(RichResultsInspectionResult),
})).annotate({ identifier: "UrlInspectionResult" }) as any as Schema.Schema<UrlInspectionResult>;

export interface InspectUrlIndexResponse {
  /** URL inspection results. */
  inspectionResult?: UrlInspectionResult;
}

export const InspectUrlIndexResponse: Schema.Schema<InspectUrlIndexResponse> = Schema.suspend(() => Schema.Struct({
  inspectionResult: Schema.optional(UrlInspectionResult),
})).annotate({ identifier: "InspectUrlIndexResponse" }) as any as Schema.Schema<InspectUrlIndexResponse>;

export interface ApiDimensionFilter {
  dimension?: "QUERY" | "PAGE" | "COUNTRY" | "DEVICE" | "SEARCH_APPEARANCE" | (string & {});
  operator?: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_CONTAINS" | "INCLUDING_REGEX" | "EXCLUDING_REGEX" | (string & {});
  expression?: string;
}

export const ApiDimensionFilter: Schema.Schema<ApiDimensionFilter> = Schema.suspend(() => Schema.Struct({
  dimension: Schema.optional(Schema.String),
  operator: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
})).annotate({ identifier: "ApiDimensionFilter" }) as any as Schema.Schema<ApiDimensionFilter>;

export interface ApiDimensionFilterGroup {
  groupType?: "AND" | (string & {});
  filters?: Array<ApiDimensionFilter>;
}

export const ApiDimensionFilterGroup: Schema.Schema<ApiDimensionFilterGroup> = Schema.suspend(() => Schema.Struct({
  groupType: Schema.optional(Schema.String),
  filters: Schema.optional(Schema.Array(ApiDimensionFilter)),
})).annotate({ identifier: "ApiDimensionFilterGroup" }) as any as Schema.Schema<ApiDimensionFilterGroup>;

export interface SearchAnalyticsQueryRequest {
  /** [Required] Start date of the requested date range, in YYYY-MM-DD format, in PST time (UTC - 8:00). Must be less than or equal to the end date. This value is included in the range. */
  startDate?: string;
  /** [Required] End date of the requested date range, in YYYY-MM-DD format, in PST (UTC - 8:00). Must be greater than or equal to the start date. This value is included in the range. */
  endDate?: string;
  /** [Optional] Zero or more dimensions to group results by. Dimensions are the group-by values in the Search Analytics page. Dimensions are combined to create a unique row key for each row. Results are grouped in the order that you supply these dimensions. */
  dimensions?: Array<"DATE" | "QUERY" | "PAGE" | "COUNTRY" | "DEVICE" | "SEARCH_APPEARANCE" | "HOUR" | (string & {})>;
  /** [Optional; Default is \"web\"] The search type to filter for. */
  searchType?: "WEB" | "IMAGE" | "VIDEO" | "NEWS" | "DISCOVER" | "GOOGLE_NEWS" | (string & {});
  /** Optional. [Optional; Default is \"web\"] Type of report: search type, or either Discover or Gnews. */
  type?: "WEB" | "IMAGE" | "VIDEO" | "NEWS" | "DISCOVER" | "GOOGLE_NEWS" | (string & {});
  /** [Optional] Zero or more filters to apply to the dimension grouping values; for example, 'query contains \"buy\"' to see only data where the query string contains the substring \"buy\" (not case-sensitive). You can filter by a dimension without grouping by it. */
  dimensionFilterGroups?: Array<ApiDimensionFilterGroup>;
  /** [Optional; Default is \"auto\"] How data is aggregated. If aggregated by property, all data for the same property is aggregated; if aggregated by page, all data is aggregated by canonical URI. If you filter or group by page, choose AUTO; otherwise you can aggregate either by property or by page, depending on how you want your data calculated; see the help documentation to learn how data is calculated differently by site versus by page. **Note:** If you group or filter by page, you cannot aggregate by property. If you specify any value other than AUTO, the aggregation type in the result will match the requested type, or if you request an invalid type, you will get an error. The API will never change your aggregation type if the requested type is invalid. */
  aggregationType?: "AUTO" | "BY_PROPERTY" | "BY_PAGE" | "BY_NEWS_SHOWCASE_PANEL" | (string & {});
  /** [Optional; Default is 1000] The maximum number of rows to return. Must be a number from 1 to 25,000 (inclusive). */
  rowLimit?: number;
  /** [Optional; Default is 0] Zero-based index of the first row in the response. Must be a non-negative number. */
  startRow?: number;
  /** The data state to be fetched, can be full or all, the latter including full and partial data. */
  dataState?: "DATA_STATE_UNSPECIFIED" | "FINAL" | "ALL" | "HOURLY_ALL" | (string & {});
}

export const SearchAnalyticsQueryRequest: Schema.Schema<SearchAnalyticsQueryRequest> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  searchType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  dimensionFilterGroups: Schema.optional(Schema.Array(ApiDimensionFilterGroup)),
  aggregationType: Schema.optional(Schema.String),
  rowLimit: Schema.optional(Schema.Number),
  startRow: Schema.optional(Schema.Number),
  dataState: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchAnalyticsQueryRequest" }) as any as Schema.Schema<SearchAnalyticsQueryRequest>;

export interface ApiDataRow {
  keys?: Array<string>;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

export const ApiDataRow: Schema.Schema<ApiDataRow> = Schema.suspend(() => Schema.Struct({
  keys: Schema.optional(Schema.Array(Schema.String)),
  clicks: Schema.optional(Schema.Number),
  impressions: Schema.optional(Schema.Number),
  ctr: Schema.optional(Schema.Number),
  position: Schema.optional(Schema.Number),
})).annotate({ identifier: "ApiDataRow" }) as any as Schema.Schema<ApiDataRow>;

export interface Metadata {
  /** The first date for which the data is still being collected and processed, presented in `YYYY-MM-DD` format (ISO-8601 extended local date format). This field is populated only when the request's `dataState` is "`all`", data is grouped by "`DATE`", and the requested date range contains incomplete data points. All values after the `first_incomplete_date` may still change noticeably. */
  firstIncompleteDate?: string;
  /** The first hour for which the data is still being collected and processed, presented in `YYYY-MM-DDThh:mm:ss[+|-]hh:mm` format (ISO-8601 extended offset date-time format). This field is populated only when the request's `dataState` is "`hourly_all`", data is grouped by "`HOUR`" and the requested date range contains incomplete data points. All values after the `first_incomplete_hour` may still change noticeably. */
  firstIncompleteHour?: string;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  firstIncompleteDate: Schema.optional(Schema.String),
  firstIncompleteHour: Schema.optional(Schema.String),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface SearchAnalyticsQueryResponse {
  /** A list of rows grouped by the key values in the order given in the query. */
  rows?: Array<ApiDataRow>;
  /** How the results were aggregated. */
  responseAggregationType?: "AUTO" | "BY_PROPERTY" | "BY_PAGE" | "BY_NEWS_SHOWCASE_PANEL" | (string & {});
  /** An object that may be returned with your query results, providing context about the state of the data. See details in Metadata object documentation. */
  metadata?: Metadata;
}

export const SearchAnalyticsQueryResponse: Schema.Schema<SearchAnalyticsQueryResponse> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(ApiDataRow)),
  responseAggregationType: Schema.optional(Schema.String),
  metadata: Schema.optional(Metadata),
})).annotate({ identifier: "SearchAnalyticsQueryResponse" }) as any as Schema.Schema<SearchAnalyticsQueryResponse>;

export interface RunMobileFriendlyTestRequest {
  /** URL for inspection. */
  url?: string;
  /** Whether or not screenshot is requested. Default is false. */
  requestScreenshot?: boolean;
}

export const RunMobileFriendlyTestRequest: Schema.Schema<RunMobileFriendlyTestRequest> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  requestScreenshot: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RunMobileFriendlyTestRequest" }) as any as Schema.Schema<RunMobileFriendlyTestRequest>;

export interface TestStatus {
  /** Status of the test. */
  status?: "TEST_STATUS_UNSPECIFIED" | "COMPLETE" | "INTERNAL_ERROR" | "PAGE_UNREACHABLE" | (string & {});
  /** Error details if applicable. */
  details?: string;
}

export const TestStatus: Schema.Schema<TestStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "TestStatus" }) as any as Schema.Schema<TestStatus>;

export interface MobileFriendlyIssue {
  /** Rule violated. */
  rule?: "MOBILE_FRIENDLY_RULE_UNSPECIFIED" | "USES_INCOMPATIBLE_PLUGINS" | "CONFIGURE_VIEWPORT" | "FIXED_WIDTH_VIEWPORT" | "SIZE_CONTENT_TO_VIEWPORT" | "USE_LEGIBLE_FONT_SIZES" | "TAP_TARGETS_TOO_CLOSE" | (string & {});
}

export const MobileFriendlyIssue: Schema.Schema<MobileFriendlyIssue> = Schema.suspend(() => Schema.Struct({
  rule: Schema.optional(Schema.String),
})).annotate({ identifier: "MobileFriendlyIssue" }) as any as Schema.Schema<MobileFriendlyIssue>;

export interface BlockedResource {
  /** URL of the blocked resource. */
  url?: string;
}

export const BlockedResource: Schema.Schema<BlockedResource> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "BlockedResource" }) as any as Schema.Schema<BlockedResource>;

export interface ResourceIssue {
  /** Describes a blocked resource issue. */
  blockedResource?: BlockedResource;
}

export const ResourceIssue: Schema.Schema<ResourceIssue> = Schema.suspend(() => Schema.Struct({
  blockedResource: Schema.optional(BlockedResource),
})).annotate({ identifier: "ResourceIssue" }) as any as Schema.Schema<ResourceIssue>;

export interface Image {
  /** Image data in format determined by the mime type. Currently, the format will always be "image/png", but this might change in the future. */
  data?: string;
  /** The mime-type of the image data. */
  mimeType?: string;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface RunMobileFriendlyTestResponse {
  /** Final state of the test, can be either complete or an error. */
  testStatus?: TestStatus;
  /** Test verdict, whether the page is mobile friendly or not. */
  mobileFriendliness?: "MOBILE_FRIENDLY_TEST_RESULT_UNSPECIFIED" | "MOBILE_FRIENDLY" | "NOT_MOBILE_FRIENDLY" | (string & {});
  /** List of mobile-usability issues. */
  mobileFriendlyIssues?: Array<MobileFriendlyIssue>;
  /** Information about embedded resources issues. */
  resourceIssues?: Array<ResourceIssue>;
  /** Screenshot of the requested URL. */
  screenshot?: Image;
}

export const RunMobileFriendlyTestResponse: Schema.Schema<RunMobileFriendlyTestResponse> = Schema.suspend(() => Schema.Struct({
  testStatus: Schema.optional(TestStatus),
  mobileFriendliness: Schema.optional(Schema.String),
  mobileFriendlyIssues: Schema.optional(Schema.Array(MobileFriendlyIssue)),
  resourceIssues: Schema.optional(Schema.Array(ResourceIssue)),
  screenshot: Schema.optional(Image),
})).annotate({ identifier: "RunMobileFriendlyTestResponse" }) as any as Schema.Schema<RunMobileFriendlyTestResponse>;

export interface WmxSitemapContent {
  /** The specific type of content in this sitemap. For example: `web`. */
  type?: "WEB" | "IMAGE" | "VIDEO" | "NEWS" | "MOBILE" | "ANDROID_APP" | "PATTERN" | "IOS_APP" | "DATA_FEED_ELEMENT" | (string & {});
  /** The number of URLs in the sitemap (of the content type). */
  submitted?: string;
  /** *Deprecated; do not use.* */
  indexed?: string;
}

export const WmxSitemapContent: Schema.Schema<WmxSitemapContent> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  submitted: Schema.optional(Schema.String),
  indexed: Schema.optional(Schema.String),
})).annotate({ identifier: "WmxSitemapContent" }) as any as Schema.Schema<WmxSitemapContent>;

export interface WmxSitemap {
  /** The url of the sitemap. */
  path?: string;
  /** Date & time in which this sitemap was submitted. Date format is in RFC 3339 format (yyyy-mm-dd). */
  lastSubmitted?: string;
  /** If true, the sitemap has not been processed. */
  isPending?: boolean;
  /** If true, the sitemap is a collection of sitemaps. */
  isSitemapsIndex?: boolean;
  /** The type of the sitemap. For example: `rssFeed`. */
  type?: "NOT_SITEMAP" | "URL_LIST" | "SITEMAP" | "RSS_FEED" | "ATOM_FEED" | "PATTERN_SITEMAP" | "OCEANFRONT" | (string & {});
  /** Date & time in which this sitemap was last downloaded. Date format is in RFC 3339 format (yyyy-mm-dd). */
  lastDownloaded?: string;
  /** Number of warnings for the sitemap. These are generally non-critical issues with URLs in the sitemaps. */
  warnings?: string;
  /** Number of errors in the sitemap. These are issues with the sitemap itself that need to be fixed before it can be processed correctly. */
  errors?: string;
  /** The various content types in the sitemap. */
  contents?: Array<WmxSitemapContent>;
}

export const WmxSitemap: Schema.Schema<WmxSitemap> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  lastSubmitted: Schema.optional(Schema.String),
  isPending: Schema.optional(Schema.Boolean),
  isSitemapsIndex: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  lastDownloaded: Schema.optional(Schema.String),
  warnings: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.String),
  contents: Schema.optional(Schema.Array(WmxSitemapContent)),
})).annotate({ identifier: "WmxSitemap" }) as any as Schema.Schema<WmxSitemap>;

export interface SitemapsListResponse {
  /** Contains detailed information about a specific URL submitted as a [sitemap](https://support.google.com/webmasters/answer/156184). */
  sitemap?: Array<WmxSitemap>;
}

export const SitemapsListResponse: Schema.Schema<SitemapsListResponse> = Schema.suspend(() => Schema.Struct({
  sitemap: Schema.optional(Schema.Array(WmxSitemap)),
})).annotate({ identifier: "SitemapsListResponse" }) as any as Schema.Schema<SitemapsListResponse>;

export interface WmxSite {
  /** The URL of the site. */
  siteUrl?: string;
  /** The user's permission level for the site. */
  permissionLevel?: "SITE_PERMISSION_LEVEL_UNSPECIFIED" | "SITE_OWNER" | "SITE_FULL_USER" | "SITE_RESTRICTED_USER" | "SITE_UNVERIFIED_USER" | (string & {});
}

export const WmxSite: Schema.Schema<WmxSite> = Schema.suspend(() => Schema.Struct({
  siteUrl: Schema.optional(Schema.String),
  permissionLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "WmxSite" }) as any as Schema.Schema<WmxSite>;

export interface SitesListResponse {
  /** Contains permission level information about a Search Console site. For more information, see [Permissions in Search Console](https://support.google.com/webmasters/answer/2451999). */
  siteEntry?: Array<WmxSite>;
}

export const SitesListResponse: Schema.Schema<SitesListResponse> = Schema.suspend(() => Schema.Struct({
  siteEntry: Schema.optional(Schema.Array(WmxSite)),
})).annotate({ identifier: "SitesListResponse" }) as any as Schema.Schema<SitesListResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Index inspection. */
export interface InspectUrlInspectionIndexRequest {
  /** Request body */
  body?: InspectUrlIndexRequest;
}

export const InspectUrlInspectionIndexRequest = Schema.Struct({
  body: Schema.optional(InspectUrlIndexRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/urlInspection/index:inspect", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InspectUrlInspectionIndexRequest>;

export type InspectUrlInspectionIndexResponse = InspectUrlIndexResponse;
export const InspectUrlInspectionIndexResponse = InspectUrlIndexResponse;

export type InspectUrlInspectionIndexError = CommonErrors;

export const inspectUrlInspectionIndex: API.OperationMethod<InspectUrlInspectionIndexRequest, InspectUrlInspectionIndexResponse, InspectUrlInspectionIndexError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InspectUrlInspectionIndexRequest,
  output: InspectUrlInspectionIndexResponse,
  errors: [],
}));

/** Query your data with filters and parameters that you define. Returns zero or more rows grouped by the row keys that you define. You must define a date range of one or more days. When date is one of the group by values, any days without data are omitted from the result list. If you need to know which days have data, issue a broad date range query grouped by date for any metric, and see which day rows are returned. */
export interface QuerySearchanalyticsRequest {
  /** The site's URL, including protocol. For example: `http://www.example.com/`. */
  siteUrl: string;
  /** Request body */
  body?: SearchAnalyticsQueryRequest;
}

export const QuerySearchanalyticsRequest = Schema.Struct({
  siteUrl: Schema.String.pipe(T.HttpPath("siteUrl")),
  body: Schema.optional(SearchAnalyticsQueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "webmasters/v3/sites/{siteUrl}/searchAnalytics/query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QuerySearchanalyticsRequest>;

export type QuerySearchanalyticsResponse = SearchAnalyticsQueryResponse;
export const QuerySearchanalyticsResponse = SearchAnalyticsQueryResponse;

export type QuerySearchanalyticsError = CommonErrors;

export const querySearchanalytics: API.OperationMethod<QuerySearchanalyticsRequest, QuerySearchanalyticsResponse, QuerySearchanalyticsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QuerySearchanalyticsRequest,
  output: QuerySearchanalyticsResponse,
  errors: [],
}));

/** Runs Mobile-Friendly Test for a given URL. */
export interface RunUrlTestingToolsMobileFriendlyTestRequest {
  /** Request body */
  body?: RunMobileFriendlyTestRequest;
}

export const RunUrlTestingToolsMobileFriendlyTestRequest = Schema.Struct({
  body: Schema.optional(RunMobileFriendlyTestRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/urlTestingTools/mobileFriendlyTest:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunUrlTestingToolsMobileFriendlyTestRequest>;

export type RunUrlTestingToolsMobileFriendlyTestResponse = RunMobileFriendlyTestResponse;
export const RunUrlTestingToolsMobileFriendlyTestResponse = RunMobileFriendlyTestResponse;

export type RunUrlTestingToolsMobileFriendlyTestError = CommonErrors;

export const runUrlTestingToolsMobileFriendlyTest: API.OperationMethod<RunUrlTestingToolsMobileFriendlyTestRequest, RunUrlTestingToolsMobileFriendlyTestResponse, RunUrlTestingToolsMobileFriendlyTestError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunUrlTestingToolsMobileFriendlyTestRequest,
  output: RunUrlTestingToolsMobileFriendlyTestResponse,
  errors: [],
}));

/** Deletes a sitemap from the Sitemaps report. Does not stop Google from crawling this sitemap or the URLs that were previously crawled in the deleted sitemap. */
export interface DeleteSitemapsRequest {
  /** The site's URL, including protocol. For example: `http://www.example.com/`. */
  siteUrl: string;
  /** The URL of the actual sitemap. For example: `http://www.example.com/sitemap.xml`. */
  feedpath: string;
}

export const DeleteSitemapsRequest = Schema.Struct({
  siteUrl: Schema.String.pipe(T.HttpPath("siteUrl")),
  feedpath: Schema.String.pipe(T.HttpPath("feedpath")),
}).pipe(
  T.Http({ method: "DELETE", path: "webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}" }),
  svc,
) as unknown as Schema.Schema<DeleteSitemapsRequest>;

export interface DeleteSitemapsResponse {}
export const DeleteSitemapsResponse: Schema.Schema<DeleteSitemapsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteSitemapsResponse>;

export type DeleteSitemapsError = CommonErrors;

export const deleteSitemaps: API.OperationMethod<DeleteSitemapsRequest, DeleteSitemapsResponse, DeleteSitemapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSitemapsRequest,
  output: DeleteSitemapsResponse,
  errors: [],
}));

/** Retrieves information about a specific sitemap. */
export interface GetSitemapsRequest {
  /** The site's URL, including protocol. For example: `http://www.example.com/`. */
  siteUrl: string;
  /** The URL of the actual sitemap. For example: `http://www.example.com/sitemap.xml`. */
  feedpath: string;
}

export const GetSitemapsRequest = Schema.Struct({
  siteUrl: Schema.String.pipe(T.HttpPath("siteUrl")),
  feedpath: Schema.String.pipe(T.HttpPath("feedpath")),
}).pipe(
  T.Http({ method: "GET", path: "webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}" }),
  svc,
) as unknown as Schema.Schema<GetSitemapsRequest>;

export type GetSitemapsResponse = WmxSitemap;
export const GetSitemapsResponse = WmxSitemap;

export type GetSitemapsError = CommonErrors;

export const getSitemaps: API.OperationMethod<GetSitemapsRequest, GetSitemapsResponse, GetSitemapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSitemapsRequest,
  output: GetSitemapsResponse,
  errors: [],
}));

/** Lists the [sitemaps-entries](/webmaster-tools/v3/sitemaps) submitted for this site, or included in the sitemap index file (if `sitemapIndex` is specified in the request). */
export interface ListSitemapsRequest {
  /** The site's URL, including protocol. For example: `http://www.example.com/`. */
  siteUrl: string;
  /** A URL of a site's sitemap index. For example: `http://www.example.com/sitemapindex.xml`. */
  sitemapIndex?: string;
}

export const ListSitemapsRequest = Schema.Struct({
  siteUrl: Schema.String.pipe(T.HttpPath("siteUrl")),
  sitemapIndex: Schema.optional(Schema.String).pipe(T.HttpQuery("sitemapIndex")),
}).pipe(
  T.Http({ method: "GET", path: "webmasters/v3/sites/{siteUrl}/sitemaps" }),
  svc,
) as unknown as Schema.Schema<ListSitemapsRequest>;

export type ListSitemapsResponse = SitemapsListResponse;
export const ListSitemapsResponse = SitemapsListResponse;

export type ListSitemapsError = CommonErrors;

export const listSitemaps: API.OperationMethod<ListSitemapsRequest, ListSitemapsResponse, ListSitemapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListSitemapsRequest,
  output: ListSitemapsResponse,
  errors: [],
}));

/** Submits a sitemap for a site. */
export interface SubmitSitemapsRequest {
  /** The site's URL, including protocol. For example: `http://www.example.com/`. */
  siteUrl: string;
  /** The URL of the actual sitemap. For example: `http://www.example.com/sitemap.xml`. */
  feedpath: string;
}

export const SubmitSitemapsRequest = Schema.Struct({
  siteUrl: Schema.String.pipe(T.HttpPath("siteUrl")),
  feedpath: Schema.String.pipe(T.HttpPath("feedpath")),
}).pipe(
  T.Http({ method: "PUT", path: "webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubmitSitemapsRequest>;

export interface SubmitSitemapsResponse {}
export const SubmitSitemapsResponse: Schema.Schema<SubmitSitemapsResponse> = Schema.Struct({}) as any as Schema.Schema<SubmitSitemapsResponse>;

export type SubmitSitemapsError = CommonErrors;

export const submitSitemaps: API.OperationMethod<SubmitSitemapsRequest, SubmitSitemapsResponse, SubmitSitemapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubmitSitemapsRequest,
  output: SubmitSitemapsResponse,
  errors: [],
}));

/** Removes a site from the set of the user's Search Console sites. */
export interface DeleteSitesRequest {
  /** The URI of the property as defined in Search Console. **Examples:** `http://www.example.com/` or `sc-domain:example.com`. */
  siteUrl: string;
}

export const DeleteSitesRequest = Schema.Struct({
  siteUrl: Schema.String.pipe(T.HttpPath("siteUrl")),
}).pipe(
  T.Http({ method: "DELETE", path: "webmasters/v3/sites/{siteUrl}" }),
  svc,
) as unknown as Schema.Schema<DeleteSitesRequest>;

export interface DeleteSitesResponse {}
export const DeleteSitesResponse: Schema.Schema<DeleteSitesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteSitesResponse>;

export type DeleteSitesError = CommonErrors;

export const deleteSites: API.OperationMethod<DeleteSitesRequest, DeleteSitesResponse, DeleteSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSitesRequest,
  output: DeleteSitesResponse,
  errors: [],
}));

/** Retrieves information about specific site. */
export interface GetSitesRequest {
  /** The URI of the property as defined in Search Console. **Examples:** `http://www.example.com/` or `sc-domain:example.com`. */
  siteUrl: string;
}

export const GetSitesRequest = Schema.Struct({
  siteUrl: Schema.String.pipe(T.HttpPath("siteUrl")),
}).pipe(
  T.Http({ method: "GET", path: "webmasters/v3/sites/{siteUrl}" }),
  svc,
) as unknown as Schema.Schema<GetSitesRequest>;

export type GetSitesResponse = WmxSite;
export const GetSitesResponse = WmxSite;

export type GetSitesError = CommonErrors;

export const getSites: API.OperationMethod<GetSitesRequest, GetSitesResponse, GetSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSitesRequest,
  output: GetSitesResponse,
  errors: [],
}));

/** Lists the user's Search Console sites. */
export interface ListSitesRequest {
}

export const ListSitesRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "webmasters/v3/sites" }),
  svc,
) as unknown as Schema.Schema<ListSitesRequest>;

export type ListSitesResponse = SitesListResponse;
export const ListSitesResponse = SitesListResponse;

export type ListSitesError = CommonErrors;

export const listSites: API.OperationMethod<ListSitesRequest, ListSitesResponse, ListSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListSitesRequest,
  output: ListSitesResponse,
  errors: [],
}));

/** Adds a site to the set of the user's sites in Search Console. */
export interface AddSitesRequest {
  /** The URL of the site to add. */
  siteUrl: string;
}

export const AddSitesRequest = Schema.Struct({
  siteUrl: Schema.String.pipe(T.HttpPath("siteUrl")),
}).pipe(
  T.Http({ method: "PUT", path: "webmasters/v3/sites/{siteUrl}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddSitesRequest>;

export interface AddSitesResponse {}
export const AddSitesResponse: Schema.Schema<AddSitesResponse> = Schema.Struct({}) as any as Schema.Schema<AddSitesResponse>;

export type AddSitesError = CommonErrors;

export const addSites: API.OperationMethod<AddSitesRequest, AddSitesResponse, AddSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddSitesRequest,
  output: AddSitesResponse,
  errors: [],
}));

