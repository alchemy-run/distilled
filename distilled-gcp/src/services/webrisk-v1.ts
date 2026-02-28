// ==========================================================================
// Web Risk API (webrisk v1)
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
  name: "webrisk",
  version: "v1",
  rootUrl: "https://webrisk.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** Matches the `/v1/{project-name}/operations/{operation-id}` pattern. */
  name?: string;
  /** Contains a `SubmitUriMetadata` object. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleLongrunningCancelOperationRequest {
}

export const GoogleLongrunningCancelOperationRequest: Schema.Schema<GoogleLongrunningCancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleLongrunningCancelOperationRequest" }) as any as Schema.Schema<GoogleLongrunningCancelOperationRequest>;

export interface GoogleCloudWebriskV1RawHashes {
  /** The number of bytes for each prefix encoded below. This field can be anywhere from 4 (shortest prefix) to 32 (full SHA256 hash). In practice this is almost always 4, except in exceptional circumstances. */
  prefixSize?: number;
  /** The hashes, in binary format, concatenated into one long string. Hashes are sorted in lexicographic order. For JSON API users, hashes are base64-encoded. */
  rawHashes?: string;
}

export const GoogleCloudWebriskV1RawHashes: Schema.Schema<GoogleCloudWebriskV1RawHashes> = Schema.suspend(() => Schema.Struct({
  prefixSize: Schema.optional(Schema.Number),
  rawHashes: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudWebriskV1RawHashes" }) as any as Schema.Schema<GoogleCloudWebriskV1RawHashes>;

export interface GoogleCloudWebriskV1RiceDeltaEncoding {
  /** The offset of the first entry in the encoded data, or, if only a single integer was encoded, that single integer's value. If the field is empty or missing, assume zero. */
  firstValue?: string;
  /** The Golomb-Rice parameter, which is a number between 2 and 28. This field is missing (that is, zero) if `num_entries` is zero. */
  riceParameter?: number;
  /** The number of entries that are delta encoded in the encoded data. If only a single integer was encoded, this will be zero and the single value will be stored in `first_value`. */
  entryCount?: number;
  /** The encoded deltas that are encoded using the Golomb-Rice coder. */
  encodedData?: string;
}

export const GoogleCloudWebriskV1RiceDeltaEncoding: Schema.Schema<GoogleCloudWebriskV1RiceDeltaEncoding> = Schema.suspend(() => Schema.Struct({
  firstValue: Schema.optional(Schema.String),
  riceParameter: Schema.optional(Schema.Number),
  entryCount: Schema.optional(Schema.Number),
  encodedData: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudWebriskV1RiceDeltaEncoding" }) as any as Schema.Schema<GoogleCloudWebriskV1RiceDeltaEncoding>;

export interface GoogleCloudWebriskV1ThreatEntryAdditions {
  /** The raw SHA256-formatted entries. Repeated to allow returning sets of hashes with different prefix sizes. */
  rawHashes?: Array<GoogleCloudWebriskV1RawHashes>;
  /** The encoded 4-byte prefixes of SHA256-formatted entries, using a Golomb-Rice encoding. The hashes are converted to uint32, sorted in ascending order, then delta encoded and stored as encoded_data. */
  riceHashes?: GoogleCloudWebriskV1RiceDeltaEncoding;
}

export const GoogleCloudWebriskV1ThreatEntryAdditions: Schema.Schema<GoogleCloudWebriskV1ThreatEntryAdditions> = Schema.suspend(() => Schema.Struct({
  rawHashes: Schema.optional(Schema.Array(GoogleCloudWebriskV1RawHashes)),
  riceHashes: Schema.optional(GoogleCloudWebriskV1RiceDeltaEncoding),
})).annotate({ identifier: "GoogleCloudWebriskV1ThreatEntryAdditions" }) as any as Schema.Schema<GoogleCloudWebriskV1ThreatEntryAdditions>;

export interface GoogleCloudWebriskV1RawIndices {
  /** The indices to remove from a lexicographically-sorted local list. */
  indices?: Array<number>;
}

export const GoogleCloudWebriskV1RawIndices: Schema.Schema<GoogleCloudWebriskV1RawIndices> = Schema.suspend(() => Schema.Struct({
  indices: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudWebriskV1RawIndices" }) as any as Schema.Schema<GoogleCloudWebriskV1RawIndices>;

export interface GoogleCloudWebriskV1ThreatEntryRemovals {
  /** The raw removal indices for a local list. */
  rawIndices?: GoogleCloudWebriskV1RawIndices;
  /** The encoded local, lexicographically-sorted list indices, using a Golomb-Rice encoding. Used for sending compressed removal indices. The removal indices (uint32) are sorted in ascending order, then delta encoded and stored as encoded_data. */
  riceIndices?: GoogleCloudWebriskV1RiceDeltaEncoding;
}

export const GoogleCloudWebriskV1ThreatEntryRemovals: Schema.Schema<GoogleCloudWebriskV1ThreatEntryRemovals> = Schema.suspend(() => Schema.Struct({
  rawIndices: Schema.optional(GoogleCloudWebriskV1RawIndices),
  riceIndices: Schema.optional(GoogleCloudWebriskV1RiceDeltaEncoding),
})).annotate({ identifier: "GoogleCloudWebriskV1ThreatEntryRemovals" }) as any as Schema.Schema<GoogleCloudWebriskV1ThreatEntryRemovals>;

export interface GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum {
  /** The SHA256 hash of the client state; that is, of the sorted list of all hashes present in the database. */
  sha256?: string;
}

export const GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum: Schema.Schema<GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum> = Schema.suspend(() => Schema.Struct({
  sha256: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum" }) as any as Schema.Schema<GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum>;

export interface GoogleCloudWebriskV1ComputeThreatListDiffResponse {
  /** The type of response. This may indicate that an action must be taken by the client when the response is received. */
  responseType?: "RESPONSE_TYPE_UNSPECIFIED" | "DIFF" | "RESET" | (string & {});
  /** A set of entries to add to a local threat type's list. */
  additions?: GoogleCloudWebriskV1ThreatEntryAdditions;
  /** A set of entries to remove from a local threat type's list. This field may be empty. */
  removals?: GoogleCloudWebriskV1ThreatEntryRemovals;
  /** The new opaque client version token. This should be retained by the client and passed into the next call of ComputeThreatListDiff as 'version_token'. A separate version token should be stored and used for each threatList. */
  newVersionToken?: string;
  /** The expected SHA256 hash of the client state; that is, of the sorted list of all hashes present in the database after applying the provided diff. If the client state doesn't match the expected state, the client must discard this diff and retry later. */
  checksum?: GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum;
  /** The soonest the client should wait before issuing any diff request. Querying sooner is unlikely to produce a meaningful diff. Waiting longer is acceptable considering the use case. If this field is not set clients may update as soon as they want. */
  recommendedNextDiff?: string;
}

export const GoogleCloudWebriskV1ComputeThreatListDiffResponse: Schema.Schema<GoogleCloudWebriskV1ComputeThreatListDiffResponse> = Schema.suspend(() => Schema.Struct({
  responseType: Schema.optional(Schema.String),
  additions: Schema.optional(GoogleCloudWebriskV1ThreatEntryAdditions),
  removals: Schema.optional(GoogleCloudWebriskV1ThreatEntryRemovals),
  newVersionToken: Schema.optional(Schema.String),
  checksum: Schema.optional(GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum),
  recommendedNextDiff: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudWebriskV1ComputeThreatListDiffResponse" }) as any as Schema.Schema<GoogleCloudWebriskV1ComputeThreatListDiffResponse>;

export interface GoogleCloudWebriskV1SearchUrisResponseThreatUri {
  /** The ThreatList this threat belongs to. */
  threatTypes?: Array<"THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE" | (string & {})>;
  /** The cache lifetime for the returned match. Clients must not cache this response past this timestamp to avoid false positives. */
  expireTime?: string;
}

export const GoogleCloudWebriskV1SearchUrisResponseThreatUri: Schema.Schema<GoogleCloudWebriskV1SearchUrisResponseThreatUri> = Schema.suspend(() => Schema.Struct({
  threatTypes: Schema.optional(Schema.Array(Schema.String)),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudWebriskV1SearchUrisResponseThreatUri" }) as any as Schema.Schema<GoogleCloudWebriskV1SearchUrisResponseThreatUri>;

export interface GoogleCloudWebriskV1SearchUrisResponse {
  /** The threat list matches. This might be empty if the URI is on no list. */
  threat?: GoogleCloudWebriskV1SearchUrisResponseThreatUri;
}

export const GoogleCloudWebriskV1SearchUrisResponse: Schema.Schema<GoogleCloudWebriskV1SearchUrisResponse> = Schema.suspend(() => Schema.Struct({
  threat: Schema.optional(GoogleCloudWebriskV1SearchUrisResponseThreatUri),
})).annotate({ identifier: "GoogleCloudWebriskV1SearchUrisResponse" }) as any as Schema.Schema<GoogleCloudWebriskV1SearchUrisResponse>;

export interface GoogleCloudWebriskV1SearchHashesResponseThreatHash {
  /** The ThreatList this threat belongs to. This must contain at least one entry. */
  threatTypes?: Array<"THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE" | (string & {})>;
  /** A 32 byte SHA256 hash. This field is in binary format. For JSON requests, hashes are base64-encoded. */
  hash?: string;
  /** The cache lifetime for the returned match. Clients must not cache this response past this timestamp to avoid false positives. */
  expireTime?: string;
}

export const GoogleCloudWebriskV1SearchHashesResponseThreatHash: Schema.Schema<GoogleCloudWebriskV1SearchHashesResponseThreatHash> = Schema.suspend(() => Schema.Struct({
  threatTypes: Schema.optional(Schema.Array(Schema.String)),
  hash: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudWebriskV1SearchHashesResponseThreatHash" }) as any as Schema.Schema<GoogleCloudWebriskV1SearchHashesResponseThreatHash>;

export interface GoogleCloudWebriskV1SearchHashesResponse {
  /** The full hashes that matched the requested prefixes. The hash will be populated in the key. */
  threats?: Array<GoogleCloudWebriskV1SearchHashesResponseThreatHash>;
  /** For requested entities that did not match the threat list, how long to cache the response until. */
  negativeExpireTime?: string;
}

export const GoogleCloudWebriskV1SearchHashesResponse: Schema.Schema<GoogleCloudWebriskV1SearchHashesResponse> = Schema.suspend(() => Schema.Struct({
  threats: Schema.optional(Schema.Array(GoogleCloudWebriskV1SearchHashesResponseThreatHash)),
  negativeExpireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudWebriskV1SearchHashesResponse" }) as any as Schema.Schema<GoogleCloudWebriskV1SearchHashesResponse>;

export interface GoogleCloudWebriskV1Submission {
  /** Required. The URI that is being reported for malicious content to be analyzed. */
  uri?: string;
}

export const GoogleCloudWebriskV1Submission: Schema.Schema<GoogleCloudWebriskV1Submission> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudWebriskV1Submission" }) as any as Schema.Schema<GoogleCloudWebriskV1Submission>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsOperationsRequest>;

export type ListProjectsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsOperationsError = CommonErrors;

export const listProjectsOperations = API.makePaginated(() => ({
  input: ListProjectsOperationsRequest,
  output: ListProjectsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsOperationsError = CommonErrors;

export const getProjectsOperations: API.OperationMethod<GetProjectsOperationsRequest, GetProjectsOperationsResponse, GetProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsOperationsRequest>;

export type DeleteProjectsOperationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsOperationsResponse = GoogleProtobufEmpty;

export type DeleteProjectsOperationsError = CommonErrors;

export const deleteProjectsOperations: API.OperationMethod<DeleteProjectsOperationsRequest, DeleteProjectsOperationsResponse, DeleteProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsOperationsRequest,
  output: DeleteProjectsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsOperationsRequest>;

export type CancelProjectsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsOperationsResponse = GoogleProtobufEmpty;

export type CancelProjectsOperationsError = CommonErrors;

export const cancelProjectsOperations: API.OperationMethod<CancelProjectsOperationsRequest, CancelProjectsOperationsResponse, CancelProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsOperationsRequest,
  output: CancelProjectsOperationsResponse,
  errors: [],
}));

/** Creates a Submission of a URI suspected of containing phishing content to be reviewed. If the result verifies the existence of malicious phishing content, the site will be added to the [Google's Social Engineering lists](https://support.google.com/webmasters/answer/6350487/) in order to protect users that could get exposed to this threat in the future. Only allowlisted projects can use this method during Early Access. Please reach out to Sales or your customer engineer to obtain access. */
export interface CreateProjectsSubmissionsRequest {
  /** Required. The name of the project that is making the submission. This string is in the format "projects/{project_number}". */
  parent: string;
  /** Request body */
  body?: GoogleCloudWebriskV1Submission;
}

export const CreateProjectsSubmissionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudWebriskV1Submission).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/submissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsSubmissionsRequest>;

export type CreateProjectsSubmissionsResponse = GoogleCloudWebriskV1Submission;
export const CreateProjectsSubmissionsResponse = GoogleCloudWebriskV1Submission;

export type CreateProjectsSubmissionsError = CommonErrors;

export const createProjectsSubmissions: API.OperationMethod<CreateProjectsSubmissionsRequest, CreateProjectsSubmissionsResponse, CreateProjectsSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsSubmissionsRequest,
  output: CreateProjectsSubmissionsResponse,
  errors: [],
}));

/** Gets the most recent threat list diffs. These diffs should be applied to a local database of hashes to keep it up-to-date. If the local database is empty or excessively out-of-date, a complete snapshot of the database will be returned. This Method only updates a single ThreatList at a time. To update multiple ThreatList databases, this method needs to be called once for each list. */
export interface ComputeDiffThreatListsRequest {
  /** Required. The threat list to update. Only a single ThreatType should be specified per request. If you want to handle multiple ThreatTypes, you must make one request per ThreatType. */
  threatType?: "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE" | (string & {});
  /** The current version token of the client for the requested list (the client version that was received from the last successful diff). If the client does not have a version token (this is the first time calling ComputeThreatListDiff), this may be left empty and a full database snapshot will be returned. */
  versionToken?: string;
  /** The maximum size in number of entries. The diff will not contain more entries than this value. This should be a power of 2 between 2**10 and 2**20. If zero, no diff size limit is set. */
  "constraints.maxDiffEntries"?: number;
  /** Sets the maximum number of entries that the client is willing to have in the local database. This should be a power of 2 between 2**10 and 2**20. If zero, no database size limit is set. */
  "constraints.maxDatabaseEntries"?: number;
  /** The compression types supported by the client. */
  "constraints.supportedCompressions"?: "COMPRESSION_TYPE_UNSPECIFIED" | "RAW" | "RICE" | (string & {})[];
}

export const ComputeDiffThreatListsRequest = Schema.Struct({
  threatType: Schema.optional(Schema.String).pipe(T.HttpQuery("threatType")),
  versionToken: Schema.optional(Schema.String).pipe(T.HttpQuery("versionToken")),
  "constraints.maxDiffEntries": Schema.optional(Schema.Number).pipe(T.HttpQuery("constraints.maxDiffEntries")),
  "constraints.maxDatabaseEntries": Schema.optional(Schema.Number).pipe(T.HttpQuery("constraints.maxDatabaseEntries")),
  "constraints.supportedCompressions": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("constraints.supportedCompressions")),
}).pipe(
  T.Http({ method: "GET", path: "v1/threatLists:computeDiff" }),
  svc,
) as unknown as Schema.Schema<ComputeDiffThreatListsRequest>;

export type ComputeDiffThreatListsResponse = GoogleCloudWebriskV1ComputeThreatListDiffResponse;
export const ComputeDiffThreatListsResponse = GoogleCloudWebriskV1ComputeThreatListDiffResponse;

export type ComputeDiffThreatListsError = CommonErrors;

export const computeDiffThreatLists: API.OperationMethod<ComputeDiffThreatListsRequest, ComputeDiffThreatListsResponse, ComputeDiffThreatListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComputeDiffThreatListsRequest,
  output: ComputeDiffThreatListsResponse,
  errors: [],
}));

/** This method is used to check whether a URI is on a given threatList. Multiple threatLists may be searched in a single query. The response will list all requested threatLists the URI was found to match. If the URI is not found on any of the requested ThreatList an empty response will be returned. */
export interface SearchUrisRequest {
  /** Required. The URI to be checked for matches. */
  uri?: string;
  /** Required. The ThreatLists to search in. Multiple ThreatLists may be specified. */
  threatTypes?: "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE" | (string & {})[];
}

export const SearchUrisRequest = Schema.Struct({
  uri: Schema.optional(Schema.String).pipe(T.HttpQuery("uri")),
  threatTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("threatTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/uris:search" }),
  svc,
) as unknown as Schema.Schema<SearchUrisRequest>;

export type SearchUrisResponse = GoogleCloudWebriskV1SearchUrisResponse;
export const SearchUrisResponse = GoogleCloudWebriskV1SearchUrisResponse;

export type SearchUrisError = CommonErrors;

export const searchUris: API.OperationMethod<SearchUrisRequest, SearchUrisResponse, SearchUrisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchUrisRequest,
  output: SearchUrisResponse,
  errors: [],
}));

/** Gets the full hashes that match the requested hash prefix. This is used after a hash prefix is looked up in a threatList and there is a match. The client side threatList only holds partial hashes so the client must query this method to determine if there is a full hash match of a threat. */
export interface SearchHashesRequest {
  /** A hash prefix, consisting of the most significant 4-32 bytes of a SHA256 hash. For JSON requests, this field is base64-encoded. Note that if this parameter is provided by a URI, it must be encoded using the web safe base64 variant (RFC 4648). */
  hashPrefix?: string;
  /** Required. The ThreatLists to search in. Multiple ThreatLists may be specified. */
  threatTypes?: "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE" | (string & {})[];
}

export const SearchHashesRequest = Schema.Struct({
  hashPrefix: Schema.optional(Schema.String).pipe(T.HttpQuery("hashPrefix")),
  threatTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("threatTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/hashes:search" }),
  svc,
) as unknown as Schema.Schema<SearchHashesRequest>;

export type SearchHashesResponse = GoogleCloudWebriskV1SearchHashesResponse;
export const SearchHashesResponse = GoogleCloudWebriskV1SearchHashesResponse;

export type SearchHashesError = CommonErrors;

export const searchHashes: API.OperationMethod<SearchHashesRequest, SearchHashesResponse, SearchHashesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchHashesRequest,
  output: SearchHashesResponse,
  errors: [],
}));

