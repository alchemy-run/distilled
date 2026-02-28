// ==========================================================================
// Safe Browsing API (safebrowsing v5)
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
  name: "safebrowsing",
  version: "v5",
  rootUrl: "https://safebrowsing.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleSecuritySafebrowsingV5FullHashFullHashDetail {
  /** The type of threat. This field will never be empty. */
  threatType?: "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | (string & {});
  /** Unordered list. Additional attributes about those full hashes. This may be empty. */
  attributes?: Array<"THREAT_ATTRIBUTE_UNSPECIFIED" | "CANARY" | "FRAME_ONLY" | (string & {})>;
}

export const GoogleSecuritySafebrowsingV5FullHashFullHashDetail: Schema.Schema<GoogleSecuritySafebrowsingV5FullHashFullHashDetail> = Schema.suspend(() => Schema.Struct({
  threatType: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5FullHashFullHashDetail" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5FullHashFullHashDetail>;

export interface GoogleSecuritySafebrowsingV5FullHash {
  /** The matching full hash. This is the SHA256 hash. The length will be exactly 32 bytes. */
  fullHash?: string;
  /** Unordered list. A repeated field identifying the details relevant to this full hash. */
  fullHashDetails?: Array<GoogleSecuritySafebrowsingV5FullHashFullHashDetail>;
}

export const GoogleSecuritySafebrowsingV5FullHash: Schema.Schema<GoogleSecuritySafebrowsingV5FullHash> = Schema.suspend(() => Schema.Struct({
  fullHash: Schema.optional(Schema.String),
  fullHashDetails: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV5FullHashFullHashDetail)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5FullHash" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5FullHash>;

export interface GoogleSecuritySafebrowsingV5SearchHashesResponse {
  /** Unordered list. The unordered list of full hashes found. */
  fullHashes?: Array<GoogleSecuritySafebrowsingV5FullHash>;
  /** The client-side cache duration. The client MUST add this duration to the current time to determine the expiration time. The expiration time then applies to every hash prefix queried by the client in the request, regardless of how many full hashes are returned in the response. Even if the server returns no full hashes for a particular hash prefix, this fact MUST also be cached by the client. If and only if the field `full_hashes` is empty, the client MAY increase the `cache_duration` to determine a new expiration that is later than that specified by the server. In any case, the increased cache duration must not be longer than 24 hours. Important: the client MUST NOT assume that the server will return the same cache duration for all responses. The server MAY choose different cache durations for different responses depending on the situation. */
  cacheDuration?: string;
}

export const GoogleSecuritySafebrowsingV5SearchHashesResponse: Schema.Schema<GoogleSecuritySafebrowsingV5SearchHashesResponse> = Schema.suspend(() => Schema.Struct({
  fullHashes: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV5FullHash)),
  cacheDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5SearchHashesResponse" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5SearchHashesResponse>;

export interface GoogleSecuritySafebrowsingV5ThreatUrl {
  /** The requested URL that was matched by one or more threats. */
  url?: string;
  /** Unordered list. The unordered list of threat that the URL is classified as. */
  threatTypes?: Array<"THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | (string & {})>;
}

export const GoogleSecuritySafebrowsingV5ThreatUrl: Schema.Schema<GoogleSecuritySafebrowsingV5ThreatUrl> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  threatTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5ThreatUrl" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5ThreatUrl>;

export interface GoogleSecuritySafebrowsingV5SearchUrlsResponse {
  /** Unordered list. The unordered list of threat matches found. Each entry contains a URL and the threat types that were found matching that URL. The list size can be greater than the number of URLs in the request as the all expressions of the URL would've been considered. */
  threats?: Array<GoogleSecuritySafebrowsingV5ThreatUrl>;
  /** The client-side cache duration. The client MUST add this duration to the current time to determine the expiration time. The expiration time then applies to every URL queried by the client in the request, regardless of how many URLs are returned in the response. Even if the server returns no matches for a particular URL, this fact MUST also be cached by the client. If and only if the field `threats` is empty, the client MAY increase the `cache_duration` to determine a new expiration that is later than that specified by the server. In any case, the increased cache duration must not be longer than 24 hours. Important: the client MUST NOT assume that the server will return the same cache duration for all responses. The server MAY choose different cache durations for different responses depending on the situation. */
  cacheDuration?: string;
}

export const GoogleSecuritySafebrowsingV5SearchUrlsResponse: Schema.Schema<GoogleSecuritySafebrowsingV5SearchUrlsResponse> = Schema.suspend(() => Schema.Struct({
  threats: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV5ThreatUrl)),
  cacheDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5SearchUrlsResponse" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5SearchUrlsResponse>;

export interface GoogleSecuritySafebrowsingV5RiceDeltaEncoded32Bit {
  /** The first entry in the encoded data (hashes or indices), or, if only a single hash prefix or index was encoded, that entry's value. If the field is empty, the entry is zero. */
  firstValue?: number;
  /** The Golomb-Rice parameter. This parameter is guaranteed to be between 3 and 30, inclusive. */
  riceParameter?: number;
  /** The number of entries that are delta encoded in the encoded data. If only a single integer was encoded, this will be zero and the single value will be stored in `first_value`. */
  entriesCount?: number;
  /** The encoded deltas that are encoded using the Golomb-Rice coder. */
  encodedData?: string;
}

export const GoogleSecuritySafebrowsingV5RiceDeltaEncoded32Bit: Schema.Schema<GoogleSecuritySafebrowsingV5RiceDeltaEncoded32Bit> = Schema.suspend(() => Schema.Struct({
  firstValue: Schema.optional(Schema.Number),
  riceParameter: Schema.optional(Schema.Number),
  entriesCount: Schema.optional(Schema.Number),
  encodedData: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5RiceDeltaEncoded32Bit" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5RiceDeltaEncoded32Bit>;

export interface GoogleSecuritySafebrowsingV5RiceDeltaEncoded64Bit {
  /** The first entry in the encoded data (hashes), or, if only a single hash prefix was encoded, that entry's value. If the field is empty, the entry is zero. */
  firstValue?: string;
  /** The Golomb-Rice parameter. This parameter is guaranteed to be between 35 and 62, inclusive. */
  riceParameter?: number;
  /** The number of entries that are delta encoded in the encoded data. If only a single integer was encoded, this will be zero and the single value will be stored in `first_value`. */
  entriesCount?: number;
  /** The encoded deltas that are encoded using the Golomb-Rice coder. */
  encodedData?: string;
}

export const GoogleSecuritySafebrowsingV5RiceDeltaEncoded64Bit: Schema.Schema<GoogleSecuritySafebrowsingV5RiceDeltaEncoded64Bit> = Schema.suspend(() => Schema.Struct({
  firstValue: Schema.optional(Schema.String),
  riceParameter: Schema.optional(Schema.Number),
  entriesCount: Schema.optional(Schema.Number),
  encodedData: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5RiceDeltaEncoded64Bit" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5RiceDeltaEncoded64Bit>;

export interface GoogleSecuritySafebrowsingV5RiceDeltaEncoded128Bit {
  /** The upper 64 bits of the first entry in the encoded data (hashes). If the field is empty, the upper 64 bits are all zero. */
  firstValueHi?: string;
  /** The lower 64 bits of the first entry in the encoded data (hashes). If the field is empty, the lower 64 bits are all zero. */
  firstValueLo?: string;
  /** The Golomb-Rice parameter. This parameter is guaranteed to be between 99 and 126, inclusive. */
  riceParameter?: number;
  /** The number of entries that are delta encoded in the encoded data. If only a single integer was encoded, this will be zero and the single value will be stored in `first_value`. */
  entriesCount?: number;
  /** The encoded deltas that are encoded using the Golomb-Rice coder. */
  encodedData?: string;
}

export const GoogleSecuritySafebrowsingV5RiceDeltaEncoded128Bit: Schema.Schema<GoogleSecuritySafebrowsingV5RiceDeltaEncoded128Bit> = Schema.suspend(() => Schema.Struct({
  firstValueHi: Schema.optional(Schema.String),
  firstValueLo: Schema.optional(Schema.String),
  riceParameter: Schema.optional(Schema.Number),
  entriesCount: Schema.optional(Schema.Number),
  encodedData: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5RiceDeltaEncoded128Bit" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5RiceDeltaEncoded128Bit>;

export interface GoogleSecuritySafebrowsingV5RiceDeltaEncoded256Bit {
  /** The first 64 bits of the first entry in the encoded data (hashes). If the field is empty, the first 64 bits are all zero. */
  firstValueFirstPart?: string;
  /** The 65 through 128th bits of the first entry in the encoded data (hashes). If the field is empty, the 65 through 128th bits are all zero. */
  firstValueSecondPart?: string;
  /** The 129 through 192th bits of the first entry in the encoded data (hashes). If the field is empty, the 129 through 192th bits are all zero. */
  firstValueThirdPart?: string;
  /** The last 64 bits of the first entry in the encoded data (hashes). If the field is empty, the last 64 bits are all zero. */
  firstValueFourthPart?: string;
  /** The Golomb-Rice parameter. This parameter is guaranteed to be between 227 and 254, inclusive. */
  riceParameter?: number;
  /** The number of entries that are delta encoded in the encoded data. If only a single integer was encoded, this will be zero and the single value will be stored in `first_value`. */
  entriesCount?: number;
  /** The encoded deltas that are encoded using the Golomb-Rice coder. */
  encodedData?: string;
}

export const GoogleSecuritySafebrowsingV5RiceDeltaEncoded256Bit: Schema.Schema<GoogleSecuritySafebrowsingV5RiceDeltaEncoded256Bit> = Schema.suspend(() => Schema.Struct({
  firstValueFirstPart: Schema.optional(Schema.String),
  firstValueSecondPart: Schema.optional(Schema.String),
  firstValueThirdPart: Schema.optional(Schema.String),
  firstValueFourthPart: Schema.optional(Schema.String),
  riceParameter: Schema.optional(Schema.Number),
  entriesCount: Schema.optional(Schema.Number),
  encodedData: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5RiceDeltaEncoded256Bit" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5RiceDeltaEncoded256Bit>;

export interface GoogleSecuritySafebrowsingV5HashListMetadata {
  /** Unordered list. If not empty, this specifies that the hash list is a kind of threat list, and this enumerates the kind of threats associated with hashes or hash prefixes in this hash list. May be empty if the entry does not represent a threat, i.e. in the case that it represents a likely safe type. */
  threatTypes?: Array<"THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | (string & {})>;
  /** Unordered list. If not empty, this specifies that the hash list represents a list of likely safe hashes, and this enumerates the ways they are considered likely safe. This field is mutually exclusive with the threat_types field. */
  likelySafeTypes?: Array<"LIKELY_SAFE_TYPE_UNSPECIFIED" | "GENERAL_BROWSING" | "CSD" | "DOWNLOAD" | (string & {})>;
  /** A human-readable description about this list. Written in English. */
  description?: string;
  /** The supported hash length for this hash list. Each hash list will support exactly one length. If a different hash length is introduced for the same set of threat types or safe types, it will be introduced as a separate list with a distinct name and respective hash length set. */
  hashLength?: "HASH_LENGTH_UNSPECIFIED" | "FOUR_BYTES" | "EIGHT_BYTES" | "SIXTEEN_BYTES" | "THIRTY_TWO_BYTES" | (string & {});
}

export const GoogleSecuritySafebrowsingV5HashListMetadata: Schema.Schema<GoogleSecuritySafebrowsingV5HashListMetadata> = Schema.suspend(() => Schema.Struct({
  threatTypes: Schema.optional(Schema.Array(Schema.String)),
  likelySafeTypes: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  hashLength: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5HashListMetadata" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5HashListMetadata>;

export interface GoogleSecuritySafebrowsingV5HashList {
  /** The 4-byte additions. */
  additionsFourBytes?: GoogleSecuritySafebrowsingV5RiceDeltaEncoded32Bit;
  /** The 8-byte additions. */
  additionsEightBytes?: GoogleSecuritySafebrowsingV5RiceDeltaEncoded64Bit;
  /** The 16-byte additions. */
  additionsSixteenBytes?: GoogleSecuritySafebrowsingV5RiceDeltaEncoded128Bit;
  /** The 32-byte additions. */
  additionsThirtyTwoBytes?: GoogleSecuritySafebrowsingV5RiceDeltaEncoded256Bit;
  /** The name of the hash list. Note that the Global Cache is also just a hash list and can be referred to here. */
  name?: string;
  /** The version of the hash list. The client MUST NOT manipulate those bytes. */
  version?: string;
  /** When true, this is a partial diff containing additions and removals based on what the client already has. When false, this is the complete hash list. When false, the client MUST delete any locally stored version for this hash list. This means that either the version possessed by the client is seriously out-of-date or the client data is believed to be corrupt. The `compressed_removals` field will be empty. When true, the client MUST apply an incremental update by applying removals and then additions. */
  partialUpdate?: boolean;
  /** The Rice-delta encoded version of removal indices. Since each hash list definitely has less than 2^32 entries, the indices are treated as 32-bit integers and encoded. */
  compressedRemovals?: GoogleSecuritySafebrowsingV5RiceDeltaEncoded32Bit;
  /** Clients should wait at least this long to get the hash list again. If omitted or zero, clients SHOULD fetch immediately because it indicates that the server has an additional update to be sent to the client, but could not due to the client-specified constraints. */
  minimumWaitDuration?: string;
  /** The sorted list of all hashes, hashed again with SHA256. This is the checksum for the sorted list of all hashes present in the database after applying the provided update. In the case that no updates were provided, the server will omit this field to indicate that the client should use the existing checksum. */
  sha256Checksum?: string;
  /** Metadata about the hash list. This is not populated by the `GetHashList` method, but this is populated by the `ListHashLists` method. */
  metadata?: GoogleSecuritySafebrowsingV5HashListMetadata;
}

export const GoogleSecuritySafebrowsingV5HashList: Schema.Schema<GoogleSecuritySafebrowsingV5HashList> = Schema.suspend(() => Schema.Struct({
  additionsFourBytes: Schema.optional(GoogleSecuritySafebrowsingV5RiceDeltaEncoded32Bit),
  additionsEightBytes: Schema.optional(GoogleSecuritySafebrowsingV5RiceDeltaEncoded64Bit),
  additionsSixteenBytes: Schema.optional(GoogleSecuritySafebrowsingV5RiceDeltaEncoded128Bit),
  additionsThirtyTwoBytes: Schema.optional(GoogleSecuritySafebrowsingV5RiceDeltaEncoded256Bit),
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  partialUpdate: Schema.optional(Schema.Boolean),
  compressedRemovals: Schema.optional(GoogleSecuritySafebrowsingV5RiceDeltaEncoded32Bit),
  minimumWaitDuration: Schema.optional(Schema.String),
  sha256Checksum: Schema.optional(Schema.String),
  metadata: Schema.optional(GoogleSecuritySafebrowsingV5HashListMetadata),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5HashList" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5HashList>;

export interface GoogleSecuritySafebrowsingV5ListHashListsResponse {
  /** The hash lists in an arbitrary order. Only metadata about the hash lists will be included, not the contents. */
  hashLists?: Array<GoogleSecuritySafebrowsingV5HashList>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleSecuritySafebrowsingV5ListHashListsResponse: Schema.Schema<GoogleSecuritySafebrowsingV5ListHashListsResponse> = Schema.suspend(() => Schema.Struct({
  hashLists: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV5HashList)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5ListHashListsResponse" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5ListHashListsResponse>;

export interface GoogleSecuritySafebrowsingV5BatchGetHashListsResponse {
  /** The hash lists in the same order given in the request. */
  hashLists?: Array<GoogleSecuritySafebrowsingV5HashList>;
}

export const GoogleSecuritySafebrowsingV5BatchGetHashListsResponse: Schema.Schema<GoogleSecuritySafebrowsingV5BatchGetHashListsResponse> = Schema.suspend(() => Schema.Struct({
  hashLists: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV5HashList)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV5BatchGetHashListsResponse" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV5BatchGetHashListsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Searches for full hashes matching the specified prefixes. This is a custom method as defined by https://google.aip.dev/136 (the custom method refers to this method having a custom name within Google's general API development nomenclature; it does not refer to using a custom HTTP method). */
export interface SearchHashesRequest {
  /** Required. The hash prefixes to be looked up. Clients MUST NOT send more than 1000 hash prefixes. However, following the URL processing procedure, clients SHOULD NOT need to send more than 30 hash prefixes. Currently each hash prefix is required to be exactly 4 bytes long. This MAY be relaxed in the future. */
  hashPrefixes?: string[];
}

export const SearchHashesRequest = Schema.Struct({
  hashPrefixes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("hashPrefixes")),
}).pipe(
  T.Http({ method: "GET", path: "v5/hashes:search" }),
  svc,
) as unknown as Schema.Schema<SearchHashesRequest>;

export type SearchHashesResponse = GoogleSecuritySafebrowsingV5SearchHashesResponse;
export const SearchHashesResponse = GoogleSecuritySafebrowsingV5SearchHashesResponse;

export type SearchHashesError = CommonErrors;

export const searchHashes: API.OperationMethod<SearchHashesRequest, SearchHashesResponse, SearchHashesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchHashesRequest,
  output: SearchHashesResponse,
  errors: [],
}));

/** Searches for URLs matching known threats. Each URL and it's host-suffix and path-prefix expressions (up to a limited depth) are checked. This means that the response may contain URLs that were not included in the request, but are expressions of the requested URLs. */
export interface SearchUrlsRequest {
  /** Required. The URLs to be looked up. Clients MUST NOT send more than 50 URLs. */
  urls?: string[];
}

export const SearchUrlsRequest = Schema.Struct({
  urls: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("urls")),
}).pipe(
  T.Http({ method: "GET", path: "v5/urls:search" }),
  svc,
) as unknown as Schema.Schema<SearchUrlsRequest>;

export type SearchUrlsResponse = GoogleSecuritySafebrowsingV5SearchUrlsResponse;
export const SearchUrlsResponse = GoogleSecuritySafebrowsingV5SearchUrlsResponse;

export type SearchUrlsError = CommonErrors;

export const searchUrls: API.OperationMethod<SearchUrlsRequest, SearchUrlsResponse, SearchUrlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchUrlsRequest,
  output: SearchUrlsResponse,
  errors: [],
}));

/** Gets the latest contents of a hash list. A hash list may either by a threat list or a non-threat list such as the Global Cache. This is a standard Get method as defined by https://google.aip.dev/131 and the HTTP method is also GET. */
export interface GetHashListRequest {
  /** Required. The name of this particular hash list. It may be a threat list, or it may be the Global Cache. */
  name: string;
  /** The version of the hash list that the client already has. If this is the first time the client is fetching the hash list, this field MUST be left empty. Otherwise, the client SHOULD supply the version previously received from the server. The client MUST NOT manipulate those bytes. **What's new in V5**: in V4 of the API, this was called `states`; it is now renamed to `version` for clarity. */
  version?: string;
  /** The maximum size in number of entries. The update will not contain more entries than this value, but it is possible that the update will contain fewer entries than this value. This MUST be at least 1024. If omitted or zero, no update size limit is set. */
  "sizeConstraints.maxUpdateEntries"?: number;
  /** Sets the maximum number of entries that the client is willing to have in the local database for the list. (The server MAY cause the client to store less than this number of entries.) If omitted or zero, no database size limit is set. */
  "sizeConstraints.maxDatabaseEntries"?: number;
}

export const GetHashListRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  version: Schema.optional(Schema.String).pipe(T.HttpQuery("version")),
  "sizeConstraints.maxUpdateEntries": Schema.optional(Schema.Number).pipe(T.HttpQuery("sizeConstraints.maxUpdateEntries")),
  "sizeConstraints.maxDatabaseEntries": Schema.optional(Schema.Number).pipe(T.HttpQuery("sizeConstraints.maxDatabaseEntries")),
}).pipe(
  T.Http({ method: "GET", path: "v5/hashList/{name}" }),
  svc,
) as unknown as Schema.Schema<GetHashListRequest>;

export type GetHashListResponse = GoogleSecuritySafebrowsingV5HashList;
export const GetHashListResponse = GoogleSecuritySafebrowsingV5HashList;

export type GetHashListError = CommonErrors;

export const getHashList: API.OperationMethod<GetHashListRequest, GetHashListResponse, GetHashListError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetHashListRequest,
  output: GetHashListResponse,
  errors: [],
}));

/** Lists hash lists. In the V5 API, Google will never remove a hash list that has ever been returned by this method. This enables clients to skip using this method and simply hard-code all hash lists they need. This is a standard List method as defined by https://google.aip.dev/132 and the HTTP method is GET. */
export interface ListHashListsRequest {
  /** The maximum number of hash lists to return. The service may return fewer than this value. If unspecified, the server will choose a page size, which may be larger than the number of hash lists so that pagination is not necessary. */
  pageSize?: number;
  /** A page token, received from a previous `ListHashLists` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListHashListsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v5/hashLists" }),
  svc,
) as unknown as Schema.Schema<ListHashListsRequest>;

export type ListHashListsResponse = GoogleSecuritySafebrowsingV5ListHashListsResponse;
export const ListHashListsResponse = GoogleSecuritySafebrowsingV5ListHashListsResponse;

export type ListHashListsError = CommonErrors;

export const listHashLists = API.makePaginated(() => ({
  input: ListHashListsRequest,
  output: ListHashListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets multiple hash lists at once. It is very common for a client to need to get multiple hash lists. Using this method is preferred over using the regular Get method multiple times. This is a standard batch Get method as defined by https://google.aip.dev/231 and the HTTP method is also GET. */
export interface BatchGetHashListsRequest {
  /** Required. The names of the particular hash lists. The list MAY be a threat list, or it may be the Global Cache. The names MUST NOT contain duplicates; if they did, the client will get an error. */
  names?: string[];
  /** The versions of the hash list that the client already has. If this is the first time the client is fetching the hash lists, the field should be left empty. Otherwise, the client should supply the versions previously received from the server. The client MUST NOT manipulate those bytes. The client need not send the versions in the same order as the corresponding list names. The client may send fewer or more versions in a request than there are names. However the client MUST NOT send multiple versions that correspond to the same name; if it did, the client will get an error. Historical note: in V4 of the API, this was called `states`; it is now renamed to `version` for clarity. */
  version?: string[];
  /** The maximum size in number of entries. The update will not contain more entries than this value, but it is possible that the update will contain fewer entries than this value. This MUST be at least 1024. If omitted or zero, no update size limit is set. */
  "sizeConstraints.maxUpdateEntries"?: number;
  /** Sets the maximum number of entries that the client is willing to have in the local database for the list. (The server MAY cause the client to store less than this number of entries.) If omitted or zero, no database size limit is set. */
  "sizeConstraints.maxDatabaseEntries"?: number;
}

export const BatchGetHashListsRequest = Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
  version: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("version")),
  "sizeConstraints.maxUpdateEntries": Schema.optional(Schema.Number).pipe(T.HttpQuery("sizeConstraints.maxUpdateEntries")),
  "sizeConstraints.maxDatabaseEntries": Schema.optional(Schema.Number).pipe(T.HttpQuery("sizeConstraints.maxDatabaseEntries")),
}).pipe(
  T.Http({ method: "GET", path: "v5/hashLists:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetHashListsRequest>;

export type BatchGetHashListsResponse = GoogleSecuritySafebrowsingV5BatchGetHashListsResponse;
export const BatchGetHashListsResponse = GoogleSecuritySafebrowsingV5BatchGetHashListsResponse;

export type BatchGetHashListsError = CommonErrors;

export const batchGetHashLists: API.OperationMethod<BatchGetHashListsRequest, BatchGetHashListsResponse, BatchGetHashListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetHashListsRequest,
  output: BatchGetHashListsResponse,
  errors: [],
}));

