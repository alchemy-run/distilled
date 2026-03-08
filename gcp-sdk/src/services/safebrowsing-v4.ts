// ==========================================================================
// Safe Browsing API (safebrowsing v4)
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
  name: "safebrowsing",
  version: "v4",
  rootUrl: "https://safebrowsing.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleSecuritySafebrowsingV4ClientInfo {
  /** A client ID that (hopefully) uniquely identifies the client implementation of the Safe Browsing API. */
  clientId?: string;
  /** The version of the client implementation. */
  clientVersion?: string;
}

export const GoogleSecuritySafebrowsingV4ClientInfo: Schema.Schema<GoogleSecuritySafebrowsingV4ClientInfo> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ClientInfo" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ClientInfo>;

export interface GoogleSecuritySafebrowsingV4ThreatEntry {
  /** A hash prefix, consisting of the most significant 4-32 bytes of a SHA256 hash. This field is in binary format. For JSON requests, hashes are base64-encoded. */
  hash?: string;
  /** A URL. */
  url?: string;
  /** The digest of an executable in SHA256 format. The API supports both binary and hex digests. For JSON requests, digests are base64-encoded. */
  digest?: string;
}

export const GoogleSecuritySafebrowsingV4ThreatEntry: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatEntry> = Schema.suspend(() => Schema.Struct({
  hash: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatEntry" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatEntry>;

export interface GoogleSecuritySafebrowsingV4ThreatInfo {
  /** The threat types to be checked. */
  threatTypes?: Array<"THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS" | (string & {})>;
  /** The platform types to be checked. */
  platformTypes?: Array<"PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME" | (string & {})>;
  /** The entry types to be checked. */
  threatEntryTypes?: Array<"THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT" | (string & {})>;
  /** The threat entries to be checked. */
  threatEntries?: Array<GoogleSecuritySafebrowsingV4ThreatEntry>;
}

export const GoogleSecuritySafebrowsingV4ThreatInfo: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatInfo> = Schema.suspend(() => Schema.Struct({
  threatTypes: Schema.optional(Schema.Array(Schema.String)),
  platformTypes: Schema.optional(Schema.Array(Schema.String)),
  threatEntryTypes: Schema.optional(Schema.Array(Schema.String)),
  threatEntries: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4ThreatEntry)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatInfo" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatInfo>;

export interface GoogleSecuritySafebrowsingV4FindThreatMatchesRequest {
  /** The client metadata. */
  client?: GoogleSecuritySafebrowsingV4ClientInfo;
  /** The lists and entries to be checked for matches. */
  threatInfo?: GoogleSecuritySafebrowsingV4ThreatInfo;
}

export const GoogleSecuritySafebrowsingV4FindThreatMatchesRequest: Schema.Schema<GoogleSecuritySafebrowsingV4FindThreatMatchesRequest> = Schema.suspend(() => Schema.Struct({
  client: Schema.optional(GoogleSecuritySafebrowsingV4ClientInfo),
  threatInfo: Schema.optional(GoogleSecuritySafebrowsingV4ThreatInfo),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4FindThreatMatchesRequest" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4FindThreatMatchesRequest>;

export interface GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry {
  /** The metadata entry key. For JSON requests, the key is base64-encoded. */
  key?: string;
  /** The metadata entry value. For JSON requests, the value is base64-encoded. */
  value?: string;
}

export const GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry>;

export interface GoogleSecuritySafebrowsingV4ThreatEntryMetadata {
  /** The metadata entries. */
  entries?: Array<GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry>;
}

export const GoogleSecuritySafebrowsingV4ThreatEntryMetadata: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatEntryMetadata> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatEntryMetadata" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatEntryMetadata>;

export interface GoogleSecuritySafebrowsingV4ThreatMatch {
  /** The threat type matching this threat. */
  threatType?: "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS" | (string & {});
  /** The platform type matching this threat. */
  platformType?: "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME" | (string & {});
  /** The threat entry type matching this threat. */
  threatEntryType?: "THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT" | (string & {});
  /** The threat matching this threat. */
  threat?: GoogleSecuritySafebrowsingV4ThreatEntry;
  /** Optional metadata associated with this threat. */
  threatEntryMetadata?: GoogleSecuritySafebrowsingV4ThreatEntryMetadata;
  /** The cache lifetime for the returned match. Clients must not cache this response for more than this duration to avoid false positives. */
  cacheDuration?: string;
}

export const GoogleSecuritySafebrowsingV4ThreatMatch: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatMatch> = Schema.suspend(() => Schema.Struct({
  threatType: Schema.optional(Schema.String),
  platformType: Schema.optional(Schema.String),
  threatEntryType: Schema.optional(Schema.String),
  threat: Schema.optional(GoogleSecuritySafebrowsingV4ThreatEntry),
  threatEntryMetadata: Schema.optional(GoogleSecuritySafebrowsingV4ThreatEntryMetadata),
  cacheDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatMatch" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatMatch>;

export interface GoogleSecuritySafebrowsingV4FindThreatMatchesResponse {
  /** The threat list matches. */
  matches?: Array<GoogleSecuritySafebrowsingV4ThreatMatch>;
}

export const GoogleSecuritySafebrowsingV4FindThreatMatchesResponse: Schema.Schema<GoogleSecuritySafebrowsingV4FindThreatMatchesResponse> = Schema.suspend(() => Schema.Struct({
  matches: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4ThreatMatch)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4FindThreatMatchesResponse" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4FindThreatMatchesResponse>;

export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequestConstraints {
  /** The maximum size in number of entries. The update will not contain more entries than this value. This should be a power of 2 between 2**10 and 2**20. If zero, no update size limit is set. */
  maxUpdateEntries?: number;
  /** Sets the maximum number of entries that the client is willing to have in the local database for the specified list. This should be a power of 2 between 2**10 and 2**20. If zero, no database size limit is set. */
  maxDatabaseEntries?: number;
  /** Requests the list for a specific geographic location. If not set the server may pick that value based on the user's IP address. Expects ISO 3166-1 alpha-2 format. */
  region?: string;
  /** The compression types supported by the client. */
  supportedCompressions?: Array<"COMPRESSION_TYPE_UNSPECIFIED" | "RAW" | "RICE" | (string & {})>;
  /** Requests the lists for a specific language. Expects ISO 639 alpha-2 format. */
  language?: string;
  /** A client's physical location, expressed as a ISO 31166-1 alpha-2 region code. */
  deviceLocation?: string;
}

export const GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequestConstraints: Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequestConstraints> = Schema.suspend(() => Schema.Struct({
  maxUpdateEntries: Schema.optional(Schema.Number),
  maxDatabaseEntries: Schema.optional(Schema.Number),
  region: Schema.optional(Schema.String),
  supportedCompressions: Schema.optional(Schema.Array(Schema.String)),
  language: Schema.optional(Schema.String),
  deviceLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequestConstraints" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequestConstraints>;

export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest {
  /** The type of threat posed by entries present in the list. */
  threatType?: "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS" | (string & {});
  /** The type of platform at risk by entries present in the list. */
  platformType?: "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME" | (string & {});
  /** The types of entries present in the list. */
  threatEntryType?: "THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT" | (string & {});
  /** The current state of the client for the requested list (the encrypted client state that was received from the last successful list update). */
  state?: string;
  /** The constraints associated with this request. */
  constraints?: GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequestConstraints;
}

export const GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest: Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest> = Schema.suspend(() => Schema.Struct({
  threatType: Schema.optional(Schema.String),
  platformType: Schema.optional(Schema.String),
  threatEntryType: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  constraints: Schema.optional(GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequestConstraints),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest>;

export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest {
  /** The client metadata. */
  client?: GoogleSecuritySafebrowsingV4ClientInfo;
  /** The requested threat list updates. */
  listUpdateRequests?: Array<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest>;
}

export const GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest: Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest> = Schema.suspend(() => Schema.Struct({
  client: Schema.optional(GoogleSecuritySafebrowsingV4ClientInfo),
  listUpdateRequests: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest>;

export interface GoogleSecuritySafebrowsingV4RawHashes {
  /** The number of bytes for each prefix encoded below. This field can be anywhere from 4 (shortest prefix) to 32 (full SHA256 hash). */
  prefixSize?: number;
  /** The hashes, in binary format, concatenated into one long string. Hashes are sorted in lexicographic order. For JSON API users, hashes are base64-encoded. */
  rawHashes?: string;
}

export const GoogleSecuritySafebrowsingV4RawHashes: Schema.Schema<GoogleSecuritySafebrowsingV4RawHashes> = Schema.suspend(() => Schema.Struct({
  prefixSize: Schema.optional(Schema.Number),
  rawHashes: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4RawHashes" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4RawHashes>;

export interface GoogleSecuritySafebrowsingV4RawIndices {
  /** The indices to remove from a lexicographically-sorted local list. */
  indices?: Array<number>;
}

export const GoogleSecuritySafebrowsingV4RawIndices: Schema.Schema<GoogleSecuritySafebrowsingV4RawIndices> = Schema.suspend(() => Schema.Struct({
  indices: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4RawIndices" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4RawIndices>;

export interface GoogleSecuritySafebrowsingV4RiceDeltaEncoding {
  /** The offset of the first entry in the encoded data, or, if only a single integer was encoded, that single integer's value. If the field is empty or missing, assume zero. */
  firstValue?: string;
  /** The Golomb-Rice parameter, which is a number between 2 and 28. This field is missing (that is, zero) if `num_entries` is zero. */
  riceParameter?: number;
  /** The number of entries that are delta encoded in the encoded data. If only a single integer was encoded, this will be zero and the single value will be stored in `first_value`. */
  numEntries?: number;
  /** The encoded deltas that are encoded using the Golomb-Rice coder. */
  encodedData?: string;
}

export const GoogleSecuritySafebrowsingV4RiceDeltaEncoding: Schema.Schema<GoogleSecuritySafebrowsingV4RiceDeltaEncoding> = Schema.suspend(() => Schema.Struct({
  firstValue: Schema.optional(Schema.String),
  riceParameter: Schema.optional(Schema.Number),
  numEntries: Schema.optional(Schema.Number),
  encodedData: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4RiceDeltaEncoding" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4RiceDeltaEncoding>;

export interface GoogleSecuritySafebrowsingV4ThreatEntrySet {
  /** The compression type for the entries in this set. */
  compressionType?: "COMPRESSION_TYPE_UNSPECIFIED" | "RAW" | "RICE" | (string & {});
  /** The raw SHA256-formatted entries. */
  rawHashes?: GoogleSecuritySafebrowsingV4RawHashes;
  /** The raw removal indices for a local list. */
  rawIndices?: GoogleSecuritySafebrowsingV4RawIndices;
  /** The encoded 4-byte prefixes of SHA256-formatted entries, using a Golomb-Rice encoding. The hashes are converted to uint32, sorted in ascending order, then delta encoded and stored as encoded_data. */
  riceHashes?: GoogleSecuritySafebrowsingV4RiceDeltaEncoding;
  /** The encoded local, lexicographically-sorted list indices, using a Golomb-Rice encoding. Used for sending compressed removal indices. The removal indices (uint32) are sorted in ascending order, then delta encoded and stored as encoded_data. */
  riceIndices?: GoogleSecuritySafebrowsingV4RiceDeltaEncoding;
}

export const GoogleSecuritySafebrowsingV4ThreatEntrySet: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatEntrySet> = Schema.suspend(() => Schema.Struct({
  compressionType: Schema.optional(Schema.String),
  rawHashes: Schema.optional(GoogleSecuritySafebrowsingV4RawHashes),
  rawIndices: Schema.optional(GoogleSecuritySafebrowsingV4RawIndices),
  riceHashes: Schema.optional(GoogleSecuritySafebrowsingV4RiceDeltaEncoding),
  riceIndices: Schema.optional(GoogleSecuritySafebrowsingV4RiceDeltaEncoding),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatEntrySet" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatEntrySet>;

export interface GoogleSecuritySafebrowsingV4Checksum {
  /** The SHA256 hash of the client state; that is, of the sorted list of all hashes present in the database. */
  sha256?: string;
}

export const GoogleSecuritySafebrowsingV4Checksum: Schema.Schema<GoogleSecuritySafebrowsingV4Checksum> = Schema.suspend(() => Schema.Struct({
  sha256: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4Checksum" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4Checksum>;

export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse {
  /** The threat type for which data is returned. */
  threatType?: "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS" | (string & {});
  /** The format of the threats. */
  threatEntryType?: "THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT" | (string & {});
  /** The platform type for which data is returned. */
  platformType?: "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME" | (string & {});
  /** The type of response. This may indicate that an action is required by the client when the response is received. */
  responseType?: "RESPONSE_TYPE_UNSPECIFIED" | "PARTIAL_UPDATE" | "FULL_UPDATE" | (string & {});
  /** A set of entries to add to a local threat type's list. Repeated to allow for a combination of compressed and raw data to be sent in a single response. */
  additions?: Array<GoogleSecuritySafebrowsingV4ThreatEntrySet>;
  /** A set of entries to remove from a local threat type's list. In practice, this field is empty or contains exactly one ThreatEntrySet. */
  removals?: Array<GoogleSecuritySafebrowsingV4ThreatEntrySet>;
  /** The new client state, in encrypted format. Opaque to clients. */
  newClientState?: string;
  /** The expected SHA256 hash of the client state; that is, of the sorted list of all hashes present in the database after applying the provided update. If the client state doesn't match the expected state, the client must disregard this update and retry later. */
  checksum?: GoogleSecuritySafebrowsingV4Checksum;
}

export const GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse: Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse> = Schema.suspend(() => Schema.Struct({
  threatType: Schema.optional(Schema.String),
  threatEntryType: Schema.optional(Schema.String),
  platformType: Schema.optional(Schema.String),
  responseType: Schema.optional(Schema.String),
  additions: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4ThreatEntrySet)),
  removals: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4ThreatEntrySet)),
  newClientState: Schema.optional(Schema.String),
  checksum: Schema.optional(GoogleSecuritySafebrowsingV4Checksum),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse>;

export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse {
  /** The list updates requested by the clients. The number of responses here may be less than the number of requests sent by clients. This is the case, for example, if the server has no updates for a particular list. */
  listUpdateResponses?: Array<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse>;
  /** The minimum duration the client must wait before issuing any update request. If this field is not set clients may update as soon as they want. */
  minimumWaitDuration?: string;
}

export const GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse: Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse> = Schema.suspend(() => Schema.Struct({
  listUpdateResponses: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse)),
  minimumWaitDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse>;

export interface GoogleSecuritySafebrowsingV4FindFullHashesRequest {
  /** The client metadata. */
  client?: GoogleSecuritySafebrowsingV4ClientInfo;
  /** The current client states for each of the client's local threat lists. */
  clientStates?: Array<string>;
  /** The lists and hashes to be checked. */
  threatInfo?: GoogleSecuritySafebrowsingV4ThreatInfo;
  /** Client metadata associated with callers of higher-level APIs built on top of the client's implementation. */
  apiClient?: GoogleSecuritySafebrowsingV4ClientInfo;
}

export const GoogleSecuritySafebrowsingV4FindFullHashesRequest: Schema.Schema<GoogleSecuritySafebrowsingV4FindFullHashesRequest> = Schema.suspend(() => Schema.Struct({
  client: Schema.optional(GoogleSecuritySafebrowsingV4ClientInfo),
  clientStates: Schema.optional(Schema.Array(Schema.String)),
  threatInfo: Schema.optional(GoogleSecuritySafebrowsingV4ThreatInfo),
  apiClient: Schema.optional(GoogleSecuritySafebrowsingV4ClientInfo),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4FindFullHashesRequest" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4FindFullHashesRequest>;

export interface GoogleSecuritySafebrowsingV4FindFullHashesResponse {
  /** The full hashes that matched the requested prefixes. */
  matches?: Array<GoogleSecuritySafebrowsingV4ThreatMatch>;
  /** The minimum duration the client must wait before issuing any find hashes request. If this field is not set, clients can issue a request as soon as they want. */
  minimumWaitDuration?: string;
  /** For requested entities that did not match the threat list, how long to cache the response. */
  negativeCacheDuration?: string;
}

export const GoogleSecuritySafebrowsingV4FindFullHashesResponse: Schema.Schema<GoogleSecuritySafebrowsingV4FindFullHashesResponse> = Schema.suspend(() => Schema.Struct({
  matches: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4ThreatMatch)),
  minimumWaitDuration: Schema.optional(Schema.String),
  negativeCacheDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4FindFullHashesResponse" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4FindFullHashesResponse>;

export interface GoogleSecuritySafebrowsingV4ThreatHitThreatSource {
  /** The URL of the resource. */
  url?: string;
  /** The type of source reported. */
  type?: "THREAT_SOURCE_TYPE_UNSPECIFIED" | "MATCHING_URL" | "TAB_URL" | "TAB_REDIRECT" | "TAB_RESOURCE" | (string & {});
  /** The remote IP of the resource in ASCII format. Either IPv4 or IPv6. */
  remoteIp?: string;
  /** Referrer of the resource. Only set if the referrer is available. */
  referrer?: string;
}

export const GoogleSecuritySafebrowsingV4ThreatHitThreatSource: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatHitThreatSource> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  remoteIp: Schema.optional(Schema.String),
  referrer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatHitThreatSource" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatHitThreatSource>;

export interface GoogleSecuritySafebrowsingV4ThreatHitUserInfo {
  /** The UN M.49 region code associated with the user's location. */
  regionCode?: string;
  /** Unique user identifier defined by the client. */
  userId?: string;
}

export const GoogleSecuritySafebrowsingV4ThreatHitUserInfo: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatHitUserInfo> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatHitUserInfo" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatHitUserInfo>;

export interface GoogleSecuritySafebrowsingV4ThreatHit {
  /** The threat type reported. */
  threatType?: "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS" | (string & {});
  /** The platform type reported. */
  platformType?: "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME" | (string & {});
  /** The threat entry responsible for the hit. Full hash should be reported for hash-based hits. */
  entry?: GoogleSecuritySafebrowsingV4ThreatEntry;
  /** The resources related to the threat hit. */
  resources?: Array<GoogleSecuritySafebrowsingV4ThreatHitThreatSource>;
  /** Client-reported identification. */
  clientInfo?: GoogleSecuritySafebrowsingV4ClientInfo;
  /** Details about the user that encountered the threat. */
  userInfo?: GoogleSecuritySafebrowsingV4ThreatHitUserInfo;
}

export const GoogleSecuritySafebrowsingV4ThreatHit: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatHit> = Schema.suspend(() => Schema.Struct({
  threatType: Schema.optional(Schema.String),
  platformType: Schema.optional(Schema.String),
  entry: Schema.optional(GoogleSecuritySafebrowsingV4ThreatEntry),
  resources: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4ThreatHitThreatSource)),
  clientInfo: Schema.optional(GoogleSecuritySafebrowsingV4ClientInfo),
  userInfo: Schema.optional(GoogleSecuritySafebrowsingV4ThreatHitUserInfo),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatHit" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatHit>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleSecuritySafebrowsingV4ThreatListDescriptor {
  /** The threat type posed by the list's entries. */
  threatType?: "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS" | (string & {});
  /** The platform type targeted by the list's entries. */
  platformType?: "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME" | (string & {});
  /** The entry types contained in the list. */
  threatEntryType?: "THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT" | (string & {});
}

export const GoogleSecuritySafebrowsingV4ThreatListDescriptor: Schema.Schema<GoogleSecuritySafebrowsingV4ThreatListDescriptor> = Schema.suspend(() => Schema.Struct({
  threatType: Schema.optional(Schema.String),
  platformType: Schema.optional(Schema.String),
  threatEntryType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ThreatListDescriptor" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ThreatListDescriptor>;

export interface GoogleSecuritySafebrowsingV4ListThreatListsResponse {
  /** The lists available for download by the client. */
  threatLists?: Array<GoogleSecuritySafebrowsingV4ThreatListDescriptor>;
}

export const GoogleSecuritySafebrowsingV4ListThreatListsResponse: Schema.Schema<GoogleSecuritySafebrowsingV4ListThreatListsResponse> = Schema.suspend(() => Schema.Struct({
  threatLists: Schema.optional(Schema.Array(GoogleSecuritySafebrowsingV4ThreatListDescriptor)),
})).annotate({ identifier: "GoogleSecuritySafebrowsingV4ListThreatListsResponse" }) as any as Schema.Schema<GoogleSecuritySafebrowsingV4ListThreatListsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface FindThreatMatchesRequest {
  /** Request body */
  body?: GoogleSecuritySafebrowsingV4FindThreatMatchesRequest;
}

export const FindThreatMatchesRequest = Schema.Struct({
  body: Schema.optional(GoogleSecuritySafebrowsingV4FindThreatMatchesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/threatMatches:find", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FindThreatMatchesRequest>;

export type FindThreatMatchesResponse = GoogleSecuritySafebrowsingV4FindThreatMatchesResponse;
export const FindThreatMatchesResponse = GoogleSecuritySafebrowsingV4FindThreatMatchesResponse;

export type FindThreatMatchesError = DefaultErrors;

/** Finds the threat entries that match the Safe Browsing lists. */
export const findThreatMatches: API.OperationMethod<FindThreatMatchesRequest, FindThreatMatchesResponse, FindThreatMatchesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: FindThreatMatchesRequest,
  output: FindThreatMatchesResponse,
  errors: [],
}));

export interface FetchThreatListUpdatesRequest {
  /** Request body */
  body?: GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest;
}

export const FetchThreatListUpdatesRequest = Schema.Struct({
  body: Schema.optional(GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/threatListUpdates:fetch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchThreatListUpdatesRequest>;

export type FetchThreatListUpdatesResponse = GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse;
export const FetchThreatListUpdatesResponse = GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse;

export type FetchThreatListUpdatesError = DefaultErrors;

/** Fetches the most recent threat list updates. A client can request updates for multiple lists at once. */
export const fetchThreatListUpdates: API.OperationMethod<FetchThreatListUpdatesRequest, FetchThreatListUpdatesResponse, FetchThreatListUpdatesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: FetchThreatListUpdatesRequest,
  output: FetchThreatListUpdatesResponse,
  errors: [],
}));

export interface GetEncodedUpdatesRequest {
  /** A serialized FetchThreatListUpdatesRequest proto. */
  encodedRequest: string;
  /** A client ID that uniquely identifies the client implementation of the Safe Browsing API. */
  clientId?: string;
  /** The version of the client implementation. */
  clientVersion?: string;
}

export const GetEncodedUpdatesRequest = Schema.Struct({
  encodedRequest: Schema.String.pipe(T.HttpPath("encodedRequest")),
  clientId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientId")),
  clientVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("clientVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v4/encodedUpdates/{encodedRequest}" }),
  svc,
) as unknown as Schema.Schema<GetEncodedUpdatesRequest>;

export type GetEncodedUpdatesResponse = GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse;
export const GetEncodedUpdatesResponse = GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse;

export type GetEncodedUpdatesError = DefaultErrors;

export const getEncodedUpdates: API.OperationMethod<GetEncodedUpdatesRequest, GetEncodedUpdatesResponse, GetEncodedUpdatesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetEncodedUpdatesRequest,
  output: GetEncodedUpdatesResponse,
  errors: [],
}));

export interface FindFullHashesRequest {
  /** Request body */
  body?: GoogleSecuritySafebrowsingV4FindFullHashesRequest;
}

export const FindFullHashesRequest = Schema.Struct({
  body: Schema.optional(GoogleSecuritySafebrowsingV4FindFullHashesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/fullHashes:find", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FindFullHashesRequest>;

export type FindFullHashesResponse = GoogleSecuritySafebrowsingV4FindFullHashesResponse;
export const FindFullHashesResponse = GoogleSecuritySafebrowsingV4FindFullHashesResponse;

export type FindFullHashesError = DefaultErrors;

/** Finds the full hashes that match the requested hash prefixes. */
export const findFullHashes: API.OperationMethod<FindFullHashesRequest, FindFullHashesResponse, FindFullHashesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: FindFullHashesRequest,
  output: FindFullHashesResponse,
  errors: [],
}));

export interface GetEncodedFullHashesRequest {
  /** A serialized FindFullHashesRequest proto. */
  encodedRequest: string;
  /** A client ID that (hopefully) uniquely identifies the client implementation of the Safe Browsing API. */
  clientId?: string;
  /** The version of the client implementation. */
  clientVersion?: string;
}

export const GetEncodedFullHashesRequest = Schema.Struct({
  encodedRequest: Schema.String.pipe(T.HttpPath("encodedRequest")),
  clientId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientId")),
  clientVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("clientVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v4/encodedFullHashes/{encodedRequest}" }),
  svc,
) as unknown as Schema.Schema<GetEncodedFullHashesRequest>;

export type GetEncodedFullHashesResponse = GoogleSecuritySafebrowsingV4FindFullHashesResponse;
export const GetEncodedFullHashesResponse = GoogleSecuritySafebrowsingV4FindFullHashesResponse;

export type GetEncodedFullHashesError = DefaultErrors;

export const getEncodedFullHashes: API.OperationMethod<GetEncodedFullHashesRequest, GetEncodedFullHashesResponse, GetEncodedFullHashesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetEncodedFullHashesRequest,
  output: GetEncodedFullHashesResponse,
  errors: [],
}));

export interface CreateThreatHitsRequest {
  /** Request body */
  body?: GoogleSecuritySafebrowsingV4ThreatHit;
}

export const CreateThreatHitsRequest = Schema.Struct({
  body: Schema.optional(GoogleSecuritySafebrowsingV4ThreatHit).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/threatHits", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateThreatHitsRequest>;

export type CreateThreatHitsResponse = GoogleProtobufEmpty;
export const CreateThreatHitsResponse = GoogleProtobufEmpty;

export type CreateThreatHitsError = DefaultErrors;

/** Reports a Safe Browsing threat list hit to Google. Only projects with TRUSTED_REPORTER visibility can use this method. */
export const createThreatHits: API.OperationMethod<CreateThreatHitsRequest, CreateThreatHitsResponse, CreateThreatHitsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateThreatHitsRequest,
  output: CreateThreatHitsResponse,
  errors: [],
}));

export interface ListThreatListsRequest {
}

export const ListThreatListsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v4/threatLists" }),
  svc,
) as unknown as Schema.Schema<ListThreatListsRequest>;

export type ListThreatListsResponse = GoogleSecuritySafebrowsingV4ListThreatListsResponse;
export const ListThreatListsResponse = GoogleSecuritySafebrowsingV4ListThreatListsResponse;

export type ListThreatListsError = DefaultErrors;

/** Lists the Safe Browsing threat lists available for download. */
export const listThreatLists: API.OperationMethod<ListThreatListsRequest, ListThreatListsResponse, ListThreatListsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListThreatListsRequest,
  output: ListThreatListsResponse,
  errors: [],
}));

