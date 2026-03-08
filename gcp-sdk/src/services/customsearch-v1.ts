// ==========================================================================
// Custom Search API (customsearch v1)
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
  name: "customsearch",
  version: "v1",
  rootUrl: "https://customsearch.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Promotion {
  /** An abridged version of this search's result URL, e.g. www.example.com. */
  displayLink?: string;
  /** The title of the promotion. */
  title?: string;
  /** Image belonging to a promotion. */
  image?: { source?: string; width?: number; height?: number };
  /** The title of the promotion, in HTML. */
  htmlTitle?: string;
  /** An array of block objects for this promotion. */
  bodyLines?: Array<{ title?: string; url?: string; htmlTitle?: string; link?: string }>;
  /** The URL of the promotion. */
  link?: string;
}

export const Promotion: Schema.Schema<Promotion> = Schema.suspend(() => Schema.Struct({
  displayLink: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  image: Schema.optional(Schema.Struct({ source: Schema.optional(Schema.String), width: Schema.optional(Schema.Number), height: Schema.optional(Schema.Number) })),
  htmlTitle: Schema.optional(Schema.String),
  bodyLines: Schema.optional(Schema.Array(Schema.Struct({ title: Schema.optional(Schema.String), url: Schema.optional(Schema.String), htmlTitle: Schema.optional(Schema.String), link: Schema.optional(Schema.String) }))),
  link: Schema.optional(Schema.String),
})).annotate({ identifier: "Promotion" }) as any as Schema.Schema<Promotion>;

export interface Result {
  /** The full URL to which the search result is pointing, e.g. http://www.example.com/foo/bar. */
  link?: string;
  /** An abridged version of this search result’s URL, e.g. www.example.com. */
  displayLink?: string;
  /** The snippet of the search result, in plain text. */
  snippet?: string;
  /** The MIME type of the search result. */
  mime?: string;
  /** The file format of the search result. */
  fileFormat?: string;
  /** The HTML-formatted URL displayed after the snippet for each search result. */
  htmlFormattedUrl?: string;
  /** The title of the search result, in plain text. */
  title?: string;
  /** The URL displayed after the snippet for each search result. */
  formattedUrl?: string;
  /** A unique identifier for the type of current object. For this API, it is `customsearch#result.` */
  kind?: string;
  /** Indicates the ID of Google's cached version of the search result. */
  cacheId?: string;
  /** Encapsulates all information about refinement labels. */
  labels?: Array<{ name?: string; label_with_op?: string; displayName?: string }>;
  /** Contains [PageMap](https://developers.google.com/custom-search/docs/structured_data#pagemaps) information for this search result. */
  pagemap?: Record<string, unknown>;
  /** Image belonging to a custom search result. */
  image?: { thumbnailLink?: string; contextLink?: string; thumbnailHeight?: number; thumbnailWidth?: number; width?: number; byteSize?: number; height?: number };
  /** The snippet of the search result, in HTML. */
  htmlSnippet?: string;
  /** The title of the search result, in HTML. */
  htmlTitle?: string;
}

export const Result: Schema.Schema<Result> = Schema.suspend(() => Schema.Struct({
  link: Schema.optional(Schema.String),
  displayLink: Schema.optional(Schema.String),
  snippet: Schema.optional(Schema.String),
  mime: Schema.optional(Schema.String),
  fileFormat: Schema.optional(Schema.String),
  htmlFormattedUrl: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  formattedUrl: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  cacheId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(Schema.Struct({ name: Schema.optional(Schema.String), label_with_op: Schema.optional(Schema.String), displayName: Schema.optional(Schema.String) }))),
  pagemap: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  image: Schema.optional(Schema.Struct({ thumbnailLink: Schema.optional(Schema.String), contextLink: Schema.optional(Schema.String), thumbnailHeight: Schema.optional(Schema.Number), thumbnailWidth: Schema.optional(Schema.Number), width: Schema.optional(Schema.Number), byteSize: Schema.optional(Schema.Number), height: Schema.optional(Schema.Number) })),
  htmlSnippet: Schema.optional(Schema.String),
  htmlTitle: Schema.optional(Schema.String),
})).annotate({ identifier: "Result" }) as any as Schema.Schema<Result>;

export interface Search {
  /** Metadata and refinements associated with the given search engine, including: * The name of the search engine that was used for the query. * A set of [facet objects](https://developers.google.com/custom-search/docs/refinements#create) (refinements) you can use for refining a search. */
  context?: Record<string, unknown>;
  /** Metadata about a search operation. */
  searchInformation?: { totalResults?: string; formattedTotalResults?: string; searchTime?: number; formattedSearchTime?: string };
  /** The current set of custom search results. */
  items?: Array<Result>;
  /** Query metadata for the previous, current, and next pages of results. */
  queries?: { request?: Array<{ inputEncoding?: string; startPage?: number; googleHost?: string; imgSize?: string; startIndex?: number; exactTerms?: string; imgType?: string; hl?: string; linkSite?: string; rights?: string; siteSearchFilter?: string; count?: number; fileType?: string; cr?: string; disableCnTwTranslation?: string; orTerms?: string; cx?: string; safe?: string; excludeTerms?: string; lowRange?: string; dateRestrict?: string; gl?: string; title?: string; sort?: string; hq?: string; imgColorType?: string; imgDominantColor?: string; outputEncoding?: string; language?: string; totalResults?: string; searchTerms?: string; searchType?: string; relatedSite?: string; highRange?: string; filter?: string; siteSearch?: string }>; previousPage?: Array<{ count?: number; cx?: string; cr?: string; disableCnTwTranslation?: string; orTerms?: string; fileType?: string; excludeTerms?: string; safe?: string; imgSize?: string; startPage?: number; googleHost?: string; inputEncoding?: string; hl?: string; imgType?: string; exactTerms?: string; startIndex?: number; rights?: string; linkSite?: string; siteSearchFilter?: string; highRange?: string; relatedSite?: string; siteSearch?: string; filter?: string; dateRestrict?: string; lowRange?: string; sort?: string; hq?: string; imgColorType?: string; imgDominantColor?: string; title?: string; gl?: string; language?: string; outputEncoding?: string; searchType?: string; searchTerms?: string; totalResults?: string }>; nextPage?: Array<{ count?: number; fileType?: string; cr?: string; disableCnTwTranslation?: string; orTerms?: string; cx?: string; safe?: string; excludeTerms?: string; inputEncoding?: string; startPage?: number; googleHost?: string; imgSize?: string; startIndex?: number; exactTerms?: string; imgType?: string; hl?: string; linkSite?: string; rights?: string; siteSearchFilter?: string; relatedSite?: string; highRange?: string; filter?: string; siteSearch?: string; lowRange?: string; dateRestrict?: string; gl?: string; title?: string; sort?: string; hq?: string; imgColorType?: string; imgDominantColor?: string; outputEncoding?: string; language?: string; totalResults?: string; searchTerms?: string; searchType?: string }> };
  /** The set of [promotions](https://developers.google.com/custom-search/docs/promotions). Present only if the custom search engine's configuration files define any promotions for the given query. */
  promotions?: Array<Promotion>;
  /** OpenSearch template and URL. */
  url?: { type?: string; template?: string };
  /** Unique identifier for the type of current object. For this API, it is customsearch#search. */
  kind?: string;
  /** Spell correction information for a query. */
  spelling?: { htmlCorrectedQuery?: string; correctedQuery?: string };
}

export const Search: Schema.Schema<Search> = Schema.suspend(() => Schema.Struct({
  context: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  searchInformation: Schema.optional(Schema.Struct({ totalResults: Schema.optional(Schema.String), formattedTotalResults: Schema.optional(Schema.String), searchTime: Schema.optional(Schema.Number), formattedSearchTime: Schema.optional(Schema.String) })),
  items: Schema.optional(Schema.Array(Result)),
  queries: Schema.optional(Schema.Struct({ request: Schema.optional(Schema.Array(Schema.Struct({ inputEncoding: Schema.optional(Schema.String), startPage: Schema.optional(Schema.Number), googleHost: Schema.optional(Schema.String), imgSize: Schema.optional(Schema.String), startIndex: Schema.optional(Schema.Number), exactTerms: Schema.optional(Schema.String), imgType: Schema.optional(Schema.String), hl: Schema.optional(Schema.String), linkSite: Schema.optional(Schema.String), rights: Schema.optional(Schema.String), siteSearchFilter: Schema.optional(Schema.String), count: Schema.optional(Schema.Number), fileType: Schema.optional(Schema.String), cr: Schema.optional(Schema.String), disableCnTwTranslation: Schema.optional(Schema.String), orTerms: Schema.optional(Schema.String), cx: Schema.optional(Schema.String), safe: Schema.optional(Schema.String), excludeTerms: Schema.optional(Schema.String), lowRange: Schema.optional(Schema.String), dateRestrict: Schema.optional(Schema.String), gl: Schema.optional(Schema.String), title: Schema.optional(Schema.String), sort: Schema.optional(Schema.String), hq: Schema.optional(Schema.String), imgColorType: Schema.optional(Schema.String), imgDominantColor: Schema.optional(Schema.String), outputEncoding: Schema.optional(Schema.String), language: Schema.optional(Schema.String), totalResults: Schema.optional(Schema.String), searchTerms: Schema.optional(Schema.String), searchType: Schema.optional(Schema.String), relatedSite: Schema.optional(Schema.String), highRange: Schema.optional(Schema.String), filter: Schema.optional(Schema.String), siteSearch: Schema.optional(Schema.String) }))), previousPage: Schema.optional(Schema.Array(Schema.Struct({ count: Schema.optional(Schema.Number), cx: Schema.optional(Schema.String), cr: Schema.optional(Schema.String), disableCnTwTranslation: Schema.optional(Schema.String), orTerms: Schema.optional(Schema.String), fileType: Schema.optional(Schema.String), excludeTerms: Schema.optional(Schema.String), safe: Schema.optional(Schema.String), imgSize: Schema.optional(Schema.String), startPage: Schema.optional(Schema.Number), googleHost: Schema.optional(Schema.String), inputEncoding: Schema.optional(Schema.String), hl: Schema.optional(Schema.String), imgType: Schema.optional(Schema.String), exactTerms: Schema.optional(Schema.String), startIndex: Schema.optional(Schema.Number), rights: Schema.optional(Schema.String), linkSite: Schema.optional(Schema.String), siteSearchFilter: Schema.optional(Schema.String), highRange: Schema.optional(Schema.String), relatedSite: Schema.optional(Schema.String), siteSearch: Schema.optional(Schema.String), filter: Schema.optional(Schema.String), dateRestrict: Schema.optional(Schema.String), lowRange: Schema.optional(Schema.String), sort: Schema.optional(Schema.String), hq: Schema.optional(Schema.String), imgColorType: Schema.optional(Schema.String), imgDominantColor: Schema.optional(Schema.String), title: Schema.optional(Schema.String), gl: Schema.optional(Schema.String), language: Schema.optional(Schema.String), outputEncoding: Schema.optional(Schema.String), searchType: Schema.optional(Schema.String), searchTerms: Schema.optional(Schema.String), totalResults: Schema.optional(Schema.String) }))), nextPage: Schema.optional(Schema.Array(Schema.Struct({ count: Schema.optional(Schema.Number), fileType: Schema.optional(Schema.String), cr: Schema.optional(Schema.String), disableCnTwTranslation: Schema.optional(Schema.String), orTerms: Schema.optional(Schema.String), cx: Schema.optional(Schema.String), safe: Schema.optional(Schema.String), excludeTerms: Schema.optional(Schema.String), inputEncoding: Schema.optional(Schema.String), startPage: Schema.optional(Schema.Number), googleHost: Schema.optional(Schema.String), imgSize: Schema.optional(Schema.String), startIndex: Schema.optional(Schema.Number), exactTerms: Schema.optional(Schema.String), imgType: Schema.optional(Schema.String), hl: Schema.optional(Schema.String), linkSite: Schema.optional(Schema.String), rights: Schema.optional(Schema.String), siteSearchFilter: Schema.optional(Schema.String), relatedSite: Schema.optional(Schema.String), highRange: Schema.optional(Schema.String), filter: Schema.optional(Schema.String), siteSearch: Schema.optional(Schema.String), lowRange: Schema.optional(Schema.String), dateRestrict: Schema.optional(Schema.String), gl: Schema.optional(Schema.String), title: Schema.optional(Schema.String), sort: Schema.optional(Schema.String), hq: Schema.optional(Schema.String), imgColorType: Schema.optional(Schema.String), imgDominantColor: Schema.optional(Schema.String), outputEncoding: Schema.optional(Schema.String), language: Schema.optional(Schema.String), totalResults: Schema.optional(Schema.String), searchTerms: Schema.optional(Schema.String), searchType: Schema.optional(Schema.String) }))) })),
  promotions: Schema.optional(Schema.Array(Promotion)),
  url: Schema.optional(Schema.Struct({ type: Schema.optional(Schema.String), template: Schema.optional(Schema.String) })),
  kind: Schema.optional(Schema.String),
  spelling: Schema.optional(Schema.Struct({ htmlCorrectedQuery: Schema.optional(Schema.String), correctedQuery: Schema.optional(Schema.String) })),
})).annotate({ identifier: "Search" }) as any as Schema.Schema<Search>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListCseRequest {
  /** Enables or disables [Simplified and Traditional Chinese Search](https://developers.google.com/custom-search/docs/json_api_reference#chineseSearch). The default value for this parameter is 0 (zero), meaning that the feature is enabled. Supported values are: * `1`: Disabled * `0`: Enabled (default) */
  c2coff?: string;
  /** Specifies the search type: `image`. If unspecified, results are limited to webpages. Acceptable values are: * `"image"`: custom image search. */
  searchType?: "searchTypeUndefined" | "image" | (string & {});
  /** Optional. Maximum length of snippet text, in characters, to be returned with results. Note: this feature is limited to specific engines. * Valid values are integers between 161 and 1000, inclusive. */
  snippetLength?: number;
  /** Appends the specified query terms to the query, as if they were combined with a logical AND operator. */
  hq?: string;
  /** Returns black and white, grayscale, transparent, or color images. Acceptable values are: * `"color"` * `"gray"` * `"mono"`: black and white * `"trans"`: transparent background */
  imgColorType?: "imgColorTypeUndefined" | "mono" | "gray" | "color" | "trans" | (string & {});
  /** Returns images of a specific dominant color. Acceptable values are: * `"black"` * `"blue"` * `"brown"` * `"gray"` * `"green"` * `"orange"` * `"pink"` * `"purple"` * `"red"` * `"teal"` * `"white"` * `"yellow"` */
  imgDominantColor?: "imgDominantColorUndefined" | "black" | "blue" | "brown" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "white" | "yellow" | (string & {});
  /** The sort expression to apply to the results. The sort parameter specifies that the results be sorted according to the specified expression i.e. sort by date. [Example: sort=date](https://developers.google.com/custom-search/docs/structured_search#sort-by-attribute). */
  sort?: string;
  /** Geolocation of end user. * The `gl` parameter value is a two-letter country code. The `gl` parameter boosts search results whose country of origin matches the parameter value. See the [Country Codes](https://developers.google.com/custom-search/docs/json_api_reference#countryCodes) page for a list of valid values. * Specifying a `gl` parameter value should lead to more relevant results. This is particularly true for international customers and, even more specifically, for customers in English- speaking countries other than the United States. */
  gl?: string;
  /** Restricts results to URLs based on date. Supported values include: * `d[number]`: requests results from the specified number of past days. * `w[number]`: requests results from the specified number of past weeks. * `m[number]`: requests results from the specified number of past months. * `y[number]`: requests results from the specified number of past years. */
  dateRestrict?: string;
  /** Specifies the starting value for a search range. Use `lowRange` and `highRange` to append an inclusive search range of `lowRange...highRange` to the query. */
  lowRange?: string;
  /** Number of search results to return. * Valid values are integers between 1 and 10, inclusive. */
  num?: number;
  /** Query */
  q?: string;
  /** Specifies a given site which should always be included or excluded from results (see `siteSearchFilter` parameter, below). */
  siteSearch?: string;
  /** Controls turning on or off the duplicate content filter. * See [Automatic Filtering](https://developers.google.com/custom-search/docs/json_api_reference#automaticFiltering) for more information about Google's search results filters. Note that host crowding filtering applies only to multi-site searches. * By default, Google applies filtering to all search results to improve the quality of those results. Acceptable values are: * `0`: Turns off duplicate content filter. * `1`: Turns on duplicate content filter. */
  filter?: string;
  /** The index of the first result to return. The default number of results per page is 10, so `&start=11` would start at the top of the second page of results. **Note**: The JSON API will never return more than 100 results, even if more than 100 documents match the query, so setting the sum of `start + num` to a number greater than 100 will produce an error. Also note that the maximum value for `num` is 10. */
  start?: number;
  /** **Deprecated**. Use the `gl` parameter for a similar effect. The local Google domain (for example, google.com, google.de, or google.fr) to use to perform the search. */
  googlehost?: string;
  /** Specifies the ending value for a search range. * Use `lowRange` and `highRange` to append an inclusive search range of `lowRange...highRange` to the query. */
  highRange?: string;
  /** Deprecated. */
  relatedSite?: string;
  /** Controls whether to include or exclude results from the site named in the `siteSearch` parameter. Acceptable values are: * `"e"`: exclude * `"i"`: include */
  siteSearchFilter?: "siteSearchFilterUndefined" | "e" | "i" | (string & {});
  /** Filters based on licensing. Supported values include: `cc_publicdomain`, `cc_attribute`, `cc_sharealike`, `cc_noncommercial`, `cc_nonderived` and combinations of these. See [typical combinations](https://wiki.creativecommons.org/wiki/CC_Search_integration). */
  rights?: string;
  /** Specifies that all search results should contain a link to a particular URL. */
  linkSite?: string;
  /** Optional. Enables routing of Programmable Search Engine requests to an alternate search handler. */
  enableAlternateSearchHandler?: boolean;
  /** Sets the user interface language. * Explicitly setting this parameter improves the performance and the quality of your search results. * See the [Interface Languages](https://developers.google.com/custom-search/docs/json_api_reference#wsInterfaceLanguages) section of [Internationalizing Queries and Results Presentation](https://developers.google.com/custom-search/docs/json_api_reference#wsInternationalizing) for more information, and [Supported Interface Languages](https://developers.google.com/custom-search/docs/json_api_reference#interfaceLanguages) for a list of supported languages. */
  hl?: string;
  /** Returns images of a type. Acceptable values are: * `"clipart"` * `"face"` * `"lineart"` * `"stock"` * `"photo"` * `"animated"` */
  imgType?: "imgTypeUndefined" | "clipart" | "face" | "lineart" | "stock" | "photo" | "animated" | (string & {});
  /** Identifies a phrase that all documents in the search results must contain. */
  exactTerms?: string;
  /** Returns images of a specified size. Acceptable values are: * `"huge"` * `"icon"` * `"large"` * `"medium"` * `"small"` * `"xlarge"` * `"xxlarge"` */
  imgSize?: "imgSizeUndefined" | "HUGE" | "ICON" | "LARGE" | "MEDIUM" | "SMALL" | "XLARGE" | "XXLARGE" | (string & {});
  /** Identifies a word or phrase that should not appear in any documents in the search results. */
  excludeTerms?: string;
  /** Search safety level. Acceptable values are: * `"active"`: Enables SafeSearch filtering. * `"off"`: Disables SafeSearch filtering. (default) */
  safe?: "safeUndefined" | "active" | "high" | "medium" | "off" | (string & {});
  /** The Programmable Search Engine ID to use for this request. */
  cx?: string;
  /** Restricts search results to documents originating in a particular country. You may use [Boolean operators](https://developers.google.com/custom-search/docs/json_api_reference#booleanOperators) in the cr parameter's value. Google Search determines the country of a document by analyzing: * the top-level domain (TLD) of the document's URL * the geographic location of the Web server's IP address See the [Country Parameter Values](https://developers.google.com/custom-search/docs/json_api_reference#countryCollections) page for a list of valid values for this parameter. */
  cr?: string;
  /** Restricts the search to documents written in a particular language (e.g., `lr=lang_ja`). Acceptable values are: * `"lang_ar"`: Arabic * `"lang_bg"`: Bulgarian * `"lang_ca"`: Catalan * `"lang_cs"`: Czech * `"lang_da"`: Danish * `"lang_de"`: German * `"lang_el"`: Greek * `"lang_en"`: English * `"lang_es"`: Spanish * `"lang_et"`: Estonian * `"lang_fi"`: Finnish * `"lang_fr"`: French * `"lang_hr"`: Croatian * `"lang_hu"`: Hungarian * `"lang_id"`: Indonesian * `"lang_is"`: Icelandic * `"lang_it"`: Italian * `"lang_iw"`: Hebrew * `"lang_ja"`: Japanese * `"lang_ko"`: Korean * `"lang_lt"`: Lithuanian * `"lang_lv"`: Latvian * `"lang_nl"`: Dutch * `"lang_no"`: Norwegian * `"lang_pl"`: Polish * `"lang_pt"`: Portuguese * `"lang_ro"`: Romanian * `"lang_ru"`: Russian * `"lang_sk"`: Slovak * `"lang_sl"`: Slovenian * `"lang_sr"`: Serbian * `"lang_sv"`: Swedish * `"lang_tr"`: Turkish * `"lang_zh-CN"`: Chinese (Simplified) * `"lang_zh-TW"`: Chinese (Traditional) */
  lr?: string;
  /** Provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. */
  orTerms?: string;
  /** Restricts results to files of a specified extension. A list of file types indexable by Google can be found in Search Console [Help Center](https://support.google.com/webmasters/answer/35287). */
  fileType?: string;
}

export const ListCseRequest = Schema.Struct({
  c2coff: Schema.optional(Schema.String).pipe(T.HttpQuery("c2coff")),
  searchType: Schema.optional(Schema.String).pipe(T.HttpQuery("searchType")),
  snippetLength: Schema.optional(Schema.Number).pipe(T.HttpQuery("snippetLength")),
  hq: Schema.optional(Schema.String).pipe(T.HttpQuery("hq")),
  imgColorType: Schema.optional(Schema.String).pipe(T.HttpQuery("imgColorType")),
  imgDominantColor: Schema.optional(Schema.String).pipe(T.HttpQuery("imgDominantColor")),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  gl: Schema.optional(Schema.String).pipe(T.HttpQuery("gl")),
  dateRestrict: Schema.optional(Schema.String).pipe(T.HttpQuery("dateRestrict")),
  lowRange: Schema.optional(Schema.String).pipe(T.HttpQuery("lowRange")),
  num: Schema.optional(Schema.Number).pipe(T.HttpQuery("num")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  siteSearch: Schema.optional(Schema.String).pipe(T.HttpQuery("siteSearch")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  start: Schema.optional(Schema.Number).pipe(T.HttpQuery("start")),
  googlehost: Schema.optional(Schema.String).pipe(T.HttpQuery("googlehost")),
  highRange: Schema.optional(Schema.String).pipe(T.HttpQuery("highRange")),
  relatedSite: Schema.optional(Schema.String).pipe(T.HttpQuery("relatedSite")),
  siteSearchFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("siteSearchFilter")),
  rights: Schema.optional(Schema.String).pipe(T.HttpQuery("rights")),
  linkSite: Schema.optional(Schema.String).pipe(T.HttpQuery("linkSite")),
  enableAlternateSearchHandler: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enableAlternateSearchHandler")),
  hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
  imgType: Schema.optional(Schema.String).pipe(T.HttpQuery("imgType")),
  exactTerms: Schema.optional(Schema.String).pipe(T.HttpQuery("exactTerms")),
  imgSize: Schema.optional(Schema.String).pipe(T.HttpQuery("imgSize")),
  excludeTerms: Schema.optional(Schema.String).pipe(T.HttpQuery("excludeTerms")),
  safe: Schema.optional(Schema.String).pipe(T.HttpQuery("safe")),
  cx: Schema.optional(Schema.String).pipe(T.HttpQuery("cx")),
  cr: Schema.optional(Schema.String).pipe(T.HttpQuery("cr")),
  lr: Schema.optional(Schema.String).pipe(T.HttpQuery("lr")),
  orTerms: Schema.optional(Schema.String).pipe(T.HttpQuery("orTerms")),
  fileType: Schema.optional(Schema.String).pipe(T.HttpQuery("fileType")),
}).pipe(
  T.Http({ method: "GET", path: "customsearch/v1" }),
  svc,
) as unknown as Schema.Schema<ListCseRequest>;

export type ListCseResponse = Search;
export const ListCseResponse = Search;

export type ListCseError = DefaultErrors;

/** Returns metadata about the search performed, metadata about the engine used for the search, and the search results. */
export const listCse: API.OperationMethod<ListCseRequest, ListCseResponse, ListCseError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListCseRequest,
  output: ListCseResponse,
  errors: [],
}));

export interface ListCseSiterestrictRequest {
  /** Restricts search results to documents originating in a particular country. You may use [Boolean operators](https://developers.google.com/custom-search/docs/json_api_reference#booleanOperators) in the cr parameter's value. Google Search determines the country of a document by analyzing: * the top-level domain (TLD) of the document's URL * the geographic location of the Web server's IP address See the [Country Parameter Values](https://developers.google.com/custom-search/docs/json_api_reference#countryCollections) page for a list of valid values for this parameter. */
  cr?: string;
  /** Restricts the search to documents written in a particular language (e.g., `lr=lang_ja`). Acceptable values are: * `"lang_ar"`: Arabic * `"lang_bg"`: Bulgarian * `"lang_ca"`: Catalan * `"lang_cs"`: Czech * `"lang_da"`: Danish * `"lang_de"`: German * `"lang_el"`: Greek * `"lang_en"`: English * `"lang_es"`: Spanish * `"lang_et"`: Estonian * `"lang_fi"`: Finnish * `"lang_fr"`: French * `"lang_hr"`: Croatian * `"lang_hu"`: Hungarian * `"lang_id"`: Indonesian * `"lang_is"`: Icelandic * `"lang_it"`: Italian * `"lang_iw"`: Hebrew * `"lang_ja"`: Japanese * `"lang_ko"`: Korean * `"lang_lt"`: Lithuanian * `"lang_lv"`: Latvian * `"lang_nl"`: Dutch * `"lang_no"`: Norwegian * `"lang_pl"`: Polish * `"lang_pt"`: Portuguese * `"lang_ro"`: Romanian * `"lang_ru"`: Russian * `"lang_sk"`: Slovak * `"lang_sl"`: Slovenian * `"lang_sr"`: Serbian * `"lang_sv"`: Swedish * `"lang_tr"`: Turkish * `"lang_zh-CN"`: Chinese (Simplified) * `"lang_zh-TW"`: Chinese (Traditional) */
  lr?: string;
  /** Provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. */
  orTerms?: string;
  /** The Programmable Search Engine ID to use for this request. */
  cx?: string;
  /** Restricts results to files of a specified extension. A list of file types indexable by Google can be found in Search Console [Help Center](https://support.google.com/webmasters/answer/35287). */
  fileType?: string;
  /** Search safety level. Acceptable values are: * `"active"`: Enables SafeSearch filtering. * `"off"`: Disables SafeSearch filtering. (default) */
  safe?: "safeUndefined" | "active" | "high" | "medium" | "off" | (string & {});
  /** Identifies a word or phrase that should not appear in any documents in the search results. */
  excludeTerms?: string;
  /** Returns images of a specified size. Acceptable values are: * `"huge"` * `"icon"` * `"large"` * `"medium"` * `"small"` * `"xlarge"` * `"xxlarge"` */
  imgSize?: "imgSizeUndefined" | "HUGE" | "ICON" | "LARGE" | "MEDIUM" | "SMALL" | "XLARGE" | "XXLARGE" | (string & {});
  /** Returns images of a type. Acceptable values are: * `"clipart"` * `"face"` * `"lineart"` * `"stock"` * `"photo"` * `"animated"` */
  imgType?: "imgTypeUndefined" | "clipart" | "face" | "lineart" | "stock" | "photo" | "animated" | (string & {});
  /** Sets the user interface language. * Explicitly setting this parameter improves the performance and the quality of your search results. * See the [Interface Languages](https://developers.google.com/custom-search/docs/json_api_reference#wsInterfaceLanguages) section of [Internationalizing Queries and Results Presentation](https://developers.google.com/custom-search/docs/json_api_reference#wsInternationalizing) for more information, and [Supported Interface Languages](https://developers.google.com/custom-search/docs/json_api_reference#interfaceLanguages) for a list of supported languages. */
  hl?: string;
  /** Identifies a phrase that all documents in the search results must contain. */
  exactTerms?: string;
  /** Specifies that all search results should contain a link to a particular URL. */
  linkSite?: string;
  /** Filters based on licensing. Supported values include: `cc_publicdomain`, `cc_attribute`, `cc_sharealike`, `cc_noncommercial`, `cc_nonderived` and combinations of these. See [typical combinations](https://wiki.creativecommons.org/wiki/CC_Search_integration). */
  rights?: string;
  /** Optional. Enables routing of Programmable Search Engine requests to an alternate search handler. */
  enableAlternateSearchHandler?: boolean;
  /** Controls whether to include or exclude results from the site named in the `siteSearch` parameter. Acceptable values are: * `"e"`: exclude * `"i"`: include */
  siteSearchFilter?: "siteSearchFilterUndefined" | "e" | "i" | (string & {});
  /** Specifies the ending value for a search range. * Use `lowRange` and `highRange` to append an inclusive search range of `lowRange...highRange` to the query. */
  highRange?: string;
  /** Deprecated. */
  relatedSite?: string;
  /** **Deprecated**. Use the `gl` parameter for a similar effect. The local Google domain (for example, google.com, google.de, or google.fr) to use to perform the search. */
  googlehost?: string;
  /** Number of search results to return. * Valid values are integers between 1 and 10, inclusive. */
  num?: number;
  /** Query */
  q?: string;
  /** Specifies a given site which should always be included or excluded from results (see `siteSearchFilter` parameter, below). */
  siteSearch?: string;
  /** Controls turning on or off the duplicate content filter. * See [Automatic Filtering](https://developers.google.com/custom-search/docs/json_api_reference#automaticFiltering) for more information about Google's search results filters. Note that host crowding filtering applies only to multi-site searches. * By default, Google applies filtering to all search results to improve the quality of those results. Acceptable values are: * `0`: Turns off duplicate content filter. * `1`: Turns on duplicate content filter. */
  filter?: string;
  /** The index of the first result to return. The default number of results per page is 10, so `&start=11` would start at the top of the second page of results. **Note**: The JSON API will never return more than 100 results, even if more than 100 documents match the query, so setting the sum of `start + num` to a number greater than 100 will produce an error. Also note that the maximum value for `num` is 10. */
  start?: number;
  /** Specifies the starting value for a search range. Use `lowRange` and `highRange` to append an inclusive search range of `lowRange...highRange` to the query. */
  lowRange?: string;
  /** Restricts results to URLs based on date. Supported values include: * `d[number]`: requests results from the specified number of past days. * `w[number]`: requests results from the specified number of past weeks. * `m[number]`: requests results from the specified number of past months. * `y[number]`: requests results from the specified number of past years. */
  dateRestrict?: string;
  /** Appends the specified query terms to the query, as if they were combined with a logical AND operator. */
  hq?: string;
  /** Returns black and white, grayscale, transparent, or color images. Acceptable values are: * `"color"` * `"gray"` * `"mono"`: black and white * `"trans"`: transparent background */
  imgColorType?: "imgColorTypeUndefined" | "mono" | "gray" | "color" | "trans" | (string & {});
  /** Returns images of a specific dominant color. Acceptable values are: * `"black"` * `"blue"` * `"brown"` * `"gray"` * `"green"` * `"orange"` * `"pink"` * `"purple"` * `"red"` * `"teal"` * `"white"` * `"yellow"` */
  imgDominantColor?: "imgDominantColorUndefined" | "black" | "blue" | "brown" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "teal" | "white" | "yellow" | (string & {});
  /** The sort expression to apply to the results. The sort parameter specifies that the results be sorted according to the specified expression i.e. sort by date. [Example: sort=date](https://developers.google.com/custom-search/docs/structured_search#sort-by-attribute). */
  sort?: string;
  /** Geolocation of end user. * The `gl` parameter value is a two-letter country code. The `gl` parameter boosts search results whose country of origin matches the parameter value. See the [Country Codes](https://developers.google.com/custom-search/docs/json_api_reference#countryCodes) page for a list of valid values. * Specifying a `gl` parameter value should lead to more relevant results. This is particularly true for international customers and, even more specifically, for customers in English- speaking countries other than the United States. */
  gl?: string;
  /** Optional. Maximum length of snippet text, in characters, to be returned with results. Note: this feature is limited to specific engines. * Valid values are integers between 161 and 1000, inclusive. */
  snippetLength?: number;
  /** Specifies the search type: `image`. If unspecified, results are limited to webpages. Acceptable values are: * `"image"`: custom image search. */
  searchType?: "searchTypeUndefined" | "image" | (string & {});
  /** Enables or disables [Simplified and Traditional Chinese Search](https://developers.google.com/custom-search/docs/json_api_reference#chineseSearch). The default value for this parameter is 0 (zero), meaning that the feature is enabled. Supported values are: * `1`: Disabled * `0`: Enabled (default) */
  c2coff?: string;
}

export const ListCseSiterestrictRequest = Schema.Struct({
  cr: Schema.optional(Schema.String).pipe(T.HttpQuery("cr")),
  lr: Schema.optional(Schema.String).pipe(T.HttpQuery("lr")),
  orTerms: Schema.optional(Schema.String).pipe(T.HttpQuery("orTerms")),
  cx: Schema.optional(Schema.String).pipe(T.HttpQuery("cx")),
  fileType: Schema.optional(Schema.String).pipe(T.HttpQuery("fileType")),
  safe: Schema.optional(Schema.String).pipe(T.HttpQuery("safe")),
  excludeTerms: Schema.optional(Schema.String).pipe(T.HttpQuery("excludeTerms")),
  imgSize: Schema.optional(Schema.String).pipe(T.HttpQuery("imgSize")),
  imgType: Schema.optional(Schema.String).pipe(T.HttpQuery("imgType")),
  hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
  exactTerms: Schema.optional(Schema.String).pipe(T.HttpQuery("exactTerms")),
  linkSite: Schema.optional(Schema.String).pipe(T.HttpQuery("linkSite")),
  rights: Schema.optional(Schema.String).pipe(T.HttpQuery("rights")),
  enableAlternateSearchHandler: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enableAlternateSearchHandler")),
  siteSearchFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("siteSearchFilter")),
  highRange: Schema.optional(Schema.String).pipe(T.HttpQuery("highRange")),
  relatedSite: Schema.optional(Schema.String).pipe(T.HttpQuery("relatedSite")),
  googlehost: Schema.optional(Schema.String).pipe(T.HttpQuery("googlehost")),
  num: Schema.optional(Schema.Number).pipe(T.HttpQuery("num")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  siteSearch: Schema.optional(Schema.String).pipe(T.HttpQuery("siteSearch")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  start: Schema.optional(Schema.Number).pipe(T.HttpQuery("start")),
  lowRange: Schema.optional(Schema.String).pipe(T.HttpQuery("lowRange")),
  dateRestrict: Schema.optional(Schema.String).pipe(T.HttpQuery("dateRestrict")),
  hq: Schema.optional(Schema.String).pipe(T.HttpQuery("hq")),
  imgColorType: Schema.optional(Schema.String).pipe(T.HttpQuery("imgColorType")),
  imgDominantColor: Schema.optional(Schema.String).pipe(T.HttpQuery("imgDominantColor")),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  gl: Schema.optional(Schema.String).pipe(T.HttpQuery("gl")),
  snippetLength: Schema.optional(Schema.Number).pipe(T.HttpQuery("snippetLength")),
  searchType: Schema.optional(Schema.String).pipe(T.HttpQuery("searchType")),
  c2coff: Schema.optional(Schema.String).pipe(T.HttpQuery("c2coff")),
}).pipe(
  T.Http({ method: "GET", path: "customsearch/v1/siterestrict" }),
  svc,
) as unknown as Schema.Schema<ListCseSiterestrictRequest>;

export type ListCseSiterestrictResponse = Search;
export const ListCseSiterestrictResponse = Search;

export type ListCseSiterestrictError = DefaultErrors;

/** Returns metadata about the search performed, metadata about the engine used for the search, and the search results. Uses a small set of url patterns. */
export const listCseSiterestrict: API.OperationMethod<ListCseSiterestrictRequest, ListCseSiterestrictResponse, ListCseSiterestrictError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListCseSiterestrictRequest,
  output: ListCseSiterestrictResponse,
  errors: [],
}));

