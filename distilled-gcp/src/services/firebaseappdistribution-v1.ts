// ==========================================================================
// Firebase App Distribution API (firebaseappdistribution v1)
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
  name: "firebaseappdistribution",
  version: "v1",
  rootUrl: "https://firebaseappdistribution.googleapis.com/",
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
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
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

export interface GoogleLongrunningWaitOperationRequest {
  /** The maximum duration to wait before timing out. If left blank, the wait will be at most the time permitted by the underlying HTTP/RPC protocol. If RPC context deadline is also specified, the shorter one will be used. */
  timeout?: string;
}

export const GoogleLongrunningWaitOperationRequest: Schema.Schema<GoogleLongrunningWaitOperationRequest> = Schema.suspend(() => Schema.Struct({
  timeout: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleLongrunningWaitOperationRequest" }) as any as Schema.Schema<GoogleLongrunningWaitOperationRequest>;

export interface GoogleFirebaseAppdistroV1TestCertificate {
  /** Hex string of SHA1 hash of the test certificate used to resign the AAB */
  hashSha1?: string;
  /** Hex string of SHA256 hash of the test certificate used to resign the AAB */
  hashSha256?: string;
  /** Hex string of MD5 hash of the test certificate used to resign the AAB */
  hashMd5?: string;
}

export const GoogleFirebaseAppdistroV1TestCertificate: Schema.Schema<GoogleFirebaseAppdistroV1TestCertificate> = Schema.suspend(() => Schema.Struct({
  hashSha1: Schema.optional(Schema.String),
  hashSha256: Schema.optional(Schema.String),
  hashMd5: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1TestCertificate" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1TestCertificate>;

export interface GoogleFirebaseAppdistroV1AabInfo {
  /** The name of the `AabInfo` resource. Format: `projects/{project_number}/apps/{app}/aabInfo` */
  name?: string;
  /** App bundle integration state. Only valid for android apps. */
  integrationState?: "AAB_INTEGRATION_STATE_UNSPECIFIED" | "INTEGRATED" | "PLAY_ACCOUNT_NOT_LINKED" | "NO_APP_WITH_GIVEN_BUNDLE_ID_IN_PLAY_ACCOUNT" | "APP_NOT_PUBLISHED" | "AAB_STATE_UNAVAILABLE" | "PLAY_IAS_TERMS_NOT_ACCEPTED" | (string & {});
  /** App bundle test certificate generated for the app. Set after the first app bundle is uploaded for this app. */
  testCertificate?: GoogleFirebaseAppdistroV1TestCertificate;
}

export const GoogleFirebaseAppdistroV1AabInfo: Schema.Schema<GoogleFirebaseAppdistroV1AabInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  integrationState: Schema.optional(Schema.String),
  testCertificate: Schema.optional(GoogleFirebaseAppdistroV1TestCertificate),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1AabInfo" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1AabInfo>;

export interface GdataObjectId {
  /** The name of the bucket to which this object belongs. */
  bucketName?: string;
  /** The name of the object. */
  objectName?: string;
  /** Generation of the object. Generations are monotonically increasing across writes, allowing them to be be compared to determine which generation is newer. If this is omitted in a request, then you are requesting the live object. See http://go/bigstore-versions */
  generation?: string;
}

export const GdataObjectId: Schema.Schema<GdataObjectId> = Schema.suspend(() => Schema.Struct({
  bucketName: Schema.optional(Schema.String),
  objectName: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataObjectId" }) as any as Schema.Schema<GdataObjectId>;

export interface GdataBlobstore2Info {
  /** The blob id, e.g., /blobstore/prod/playground/scotty */
  blobId?: string;
  /** The blob generation id. */
  blobGeneration?: string;
  /** The blob read token. Needed to read blobs that have not been replicated. Might not be available until the final call. */
  readToken?: string;
  /** Metadata passed from Blobstore -> Scotty for a new GCS upload. This is a signed, serialized blobstore2.BlobMetadataContainer proto which must never be consumed outside of Bigstore, and is not applicable to non-GCS media uploads. */
  uploadMetadataContainer?: string;
  /** Read handle passed from Bigstore -> Scotty for a GCS download. This is a signed, serialized blobstore2.ReadHandle proto which must never be set outside of Bigstore, and is not applicable to non-GCS media downloads. */
  downloadReadHandle?: string;
  /** A serialized External Read Token passed from Bigstore -> Scotty for a GCS download. This field must never be consumed outside of Bigstore, and is not applicable to non-GCS media uploads. */
  downloadExternalReadToken?: string;
  /** A serialized Object Fragment List Creation Info passed from Bigstore -> Scotty for a GCS upload. This field must never be consumed outside of Bigstore, and is not applicable to non-GCS media uploads. */
  uploadFragmentListCreationInfo?: string;
}

export const GdataBlobstore2Info: Schema.Schema<GdataBlobstore2Info> = Schema.suspend(() => Schema.Struct({
  blobId: Schema.optional(Schema.String),
  blobGeneration: Schema.optional(Schema.String),
  readToken: Schema.optional(Schema.String),
  uploadMetadataContainer: Schema.optional(Schema.String),
  downloadReadHandle: Schema.optional(Schema.String),
  downloadExternalReadToken: Schema.optional(Schema.String),
  uploadFragmentListCreationInfo: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataBlobstore2Info" }) as any as Schema.Schema<GdataBlobstore2Info>;

export interface GdataCompositeMedia {
  /** Size of the data, in bytes */
  length?: string;
  /** Describes what the field reference contains. */
  referenceType?: "PATH" | "BLOB_REF" | "INLINE" | "BIGSTORE_REF" | "COSMO_BINARY_REFERENCE" | (string & {});
  /** Path to the data, set if reference_type is PATH */
  path?: string;
  /** Blobstore v1 reference, set if reference_type is BLOBSTORE_REF This should be the byte representation of a blobstore.BlobRef. Since Blobstore is deprecating v1, use blobstore2_info instead. For now, any v2 blob will also be represented in this field as v1 BlobRef. */
  blobRef?: string;
  /** Media data, set if reference_type is INLINE */
  inline?: string;
  /** Reference to a TI Blob, set if reference_type is BIGSTORE_REF. */
  objectId?: GdataObjectId;
  /** Blobstore v2 info, set if reference_type is BLOBSTORE_REF and it refers to a v2 blob. */
  blobstore2Info?: GdataBlobstore2Info;
  /** A binary data reference for a media download. Serves as a technology-agnostic binary reference in some Google infrastructure. This value is a serialized storage_cosmo.BinaryReference proto. Storing it as bytes is a hack to get around the fact that the cosmo proto (as well as others it includes) doesn't support JavaScript. This prevents us from including the actual type of this field. */
  cosmoBinaryReference?: string;
  /** crc32.c hash for the payload. */
  crc32cHash?: number;
  /** MD5 hash for the payload. */
  md5Hash?: string;
  /** SHA-1 hash for the payload. */
  sha1Hash?: string;
}

export const GdataCompositeMedia: Schema.Schema<GdataCompositeMedia> = Schema.suspend(() => Schema.Struct({
  length: Schema.optional(Schema.String),
  referenceType: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  blobRef: Schema.optional(Schema.String),
  inline: Schema.optional(Schema.String),
  objectId: Schema.optional(GdataObjectId),
  blobstore2Info: Schema.optional(GdataBlobstore2Info),
  cosmoBinaryReference: Schema.optional(Schema.String),
  crc32cHash: Schema.optional(Schema.Number),
  md5Hash: Schema.optional(Schema.String),
  sha1Hash: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataCompositeMedia" }) as any as Schema.Schema<GdataCompositeMedia>;

export interface GdataDiffVersionResponse {
  /** The version of the object stored at the server. */
  objectVersion?: string;
  /** The total size of the server object. */
  objectSizeBytes?: string;
}

export const GdataDiffVersionResponse: Schema.Schema<GdataDiffVersionResponse> = Schema.suspend(() => Schema.Struct({
  objectVersion: Schema.optional(Schema.String),
  objectSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataDiffVersionResponse" }) as any as Schema.Schema<GdataDiffVersionResponse>;

export interface GdataDiffChecksumsResponse {
  /** The object version of the object the checksums are being returned for. */
  objectVersion?: string;
  /** The total size of the server object. */
  objectSizeBytes?: string;
  /** The chunk size of checksums. Must be a multiple of 256KB. */
  chunkSizeBytes?: string;
  /** Exactly one of these fields must be populated. If checksums_location is filled, the server will return the corresponding contents to the user. If object_location is filled, the server will calculate the checksums based on the content there and return that to the user. For details on the format of the checksums, see http://go/scotty-diff-protocol. */
  checksumsLocation?: GdataCompositeMedia;
  /** If set, calculate the checksums based on the contents and return them to the caller. */
  objectLocation?: GdataCompositeMedia;
}

export const GdataDiffChecksumsResponse: Schema.Schema<GdataDiffChecksumsResponse> = Schema.suspend(() => Schema.Struct({
  objectVersion: Schema.optional(Schema.String),
  objectSizeBytes: Schema.optional(Schema.String),
  chunkSizeBytes: Schema.optional(Schema.String),
  checksumsLocation: Schema.optional(GdataCompositeMedia),
  objectLocation: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffChecksumsResponse" }) as any as Schema.Schema<GdataDiffChecksumsResponse>;

export interface GdataDiffDownloadResponse {
  /** The original object location. */
  objectLocation?: GdataCompositeMedia;
}

export const GdataDiffDownloadResponse: Schema.Schema<GdataDiffDownloadResponse> = Schema.suspend(() => Schema.Struct({
  objectLocation: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffDownloadResponse" }) as any as Schema.Schema<GdataDiffDownloadResponse>;

export interface GdataDiffUploadRequest {
  /** The object version of the object that is the base version the incoming diff script will be applied to. This field will always be filled in. */
  objectVersion?: string;
  /** The location of the new object. Agents must clone the object located here, as the upload server will delete the contents once a response is received. */
  objectInfo?: GdataCompositeMedia;
  /** The location of the checksums for the new object. Agents must clone the object located here, as the upload server will delete the contents once a response is received. For details on the format of the checksums, see http://go/scotty-diff-protocol. */
  checksumsInfo?: GdataCompositeMedia;
}

export const GdataDiffUploadRequest: Schema.Schema<GdataDiffUploadRequest> = Schema.suspend(() => Schema.Struct({
  objectVersion: Schema.optional(Schema.String),
  objectInfo: Schema.optional(GdataCompositeMedia),
  checksumsInfo: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffUploadRequest" }) as any as Schema.Schema<GdataDiffUploadRequest>;

export interface GdataDiffUploadResponse {
  /** The object version of the object at the server. Must be included in the end notification response. The version in the end notification response must correspond to the new version of the object that is now stored at the server, after the upload. */
  objectVersion?: string;
  /** The location of the original file for a diff upload request. Must be filled in if responding to an upload start notification. */
  originalObject?: GdataCompositeMedia;
}

export const GdataDiffUploadResponse: Schema.Schema<GdataDiffUploadResponse> = Schema.suspend(() => Schema.Struct({
  objectVersion: Schema.optional(Schema.String),
  originalObject: Schema.optional(GdataCompositeMedia),
})).annotate({ identifier: "GdataDiffUploadResponse" }) as any as Schema.Schema<GdataDiffUploadResponse>;

export interface GdataContentTypeInfo {
  /** Scotty's best guess of what the content type of the file is. */
  bestGuess?: string;
  /** The content type of the file as specified in the request headers, multipart headers, or RUPIO start request. */
  fromHeader?: string;
  /** The content type of the file derived from the file extension of the original file name used by the client. */
  fromFileName?: string;
  /** The content type of the file derived from the file extension of the URL path. The URL path is assumed to represent a file name (which is typically only true for agents that are providing a REST API). */
  fromUrlPath?: string;
  /** The content type of the file derived by looking at specific bytes (i.e. "magic bytes") of the actual file. */
  fromBytes?: string;
}

export const GdataContentTypeInfo: Schema.Schema<GdataContentTypeInfo> = Schema.suspend(() => Schema.Struct({
  bestGuess: Schema.optional(Schema.String),
  fromHeader: Schema.optional(Schema.String),
  fromFileName: Schema.optional(Schema.String),
  fromUrlPath: Schema.optional(Schema.String),
  fromBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GdataContentTypeInfo" }) as any as Schema.Schema<GdataContentTypeInfo>;

export interface GdataDownloadParameters {
  /** A boolean to be returned in the response to Scotty. Allows/disallows gzip encoding of the payload content when the server thinks it's advantageous (hence, does not guarantee compression) which allows Scotty to GZip the response to the client. */
  allowGzipCompression?: boolean;
  /** Determining whether or not Apiary should skip the inclusion of any Content-Range header on its response to Scotty. */
  ignoreRange?: boolean;
}

export const GdataDownloadParameters: Schema.Schema<GdataDownloadParameters> = Schema.suspend(() => Schema.Struct({
  allowGzipCompression: Schema.optional(Schema.Boolean),
  ignoreRange: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GdataDownloadParameters" }) as any as Schema.Schema<GdataDownloadParameters>;

export interface GdataMedia {
  /** MIME type of the data */
  contentType?: string;
  /** Time at which the media data was last updated, in milliseconds since UNIX epoch */
  timestamp?: string;
  /** A unique fingerprint/version id for the media data */
  token?: string;
  /** Size of the data, in bytes */
  length?: string;
  /** Original file name */
  filename?: string;
  /** Describes what the field reference contains. */
  referenceType?: "PATH" | "BLOB_REF" | "INLINE" | "GET_MEDIA" | "COMPOSITE_MEDIA" | "BIGSTORE_REF" | "DIFF_VERSION_RESPONSE" | "DIFF_CHECKSUMS_RESPONSE" | "DIFF_DOWNLOAD_RESPONSE" | "DIFF_UPLOAD_REQUEST" | "DIFF_UPLOAD_RESPONSE" | "COSMO_BINARY_REFERENCE" | "ARBITRARY_BYTES" | (string & {});
  /** Path to the data, set if reference_type is PATH */
  path?: string;
  /** Blobstore v1 reference, set if reference_type is BLOBSTORE_REF This should be the byte representation of a blobstore.BlobRef. Since Blobstore is deprecating v1, use blobstore2_info instead. For now, any v2 blob will also be represented in this field as v1 BlobRef. */
  blobRef?: string;
  /** Media data, set if reference_type is INLINE */
  inline?: string;
  /** Media id to forward to the operation GetMedia. Can be set if reference_type is GET_MEDIA. */
  mediaId?: string;
  /** Deprecated, use one of explicit hash type fields instead. These two hash related fields will only be populated on Scotty based media uploads and will contain the content of the hash group in the NotificationRequest: http://cs/#google3/blobstore2/api/scotty/service/proto/upload_listener.proto&q=class:Hash Hex encoded hash value of the uploaded media. */
  hash?: string;
  /** Deprecated, use one of explicit hash type fields instead. Algorithm used for calculating the hash. As of 2011/01/21, "MD5" is the only possible value for this field. New values may be added at any time. */
  algorithm?: string;
  /** A composite media composed of one or more media objects, set if reference_type is COMPOSITE_MEDIA. The media length field must be set to the sum of the lengths of all composite media objects. Note: All composite media must have length specified. */
  compositeMedia?: Array<GdataCompositeMedia>;
  /** Use object_id instead. */
  bigstoreObjectRef?: string;
  /** Reference to a TI Blob, set if reference_type is BIGSTORE_REF. */
  objectId?: GdataObjectId;
  /** Blobstore v2 info, set if reference_type is BLOBSTORE_REF and it refers to a v2 blob. */
  blobstore2Info?: GdataBlobstore2Info;
  /** Set if reference_type is DIFF_VERSION_RESPONSE. */
  diffVersionResponse?: GdataDiffVersionResponse;
  /** Set if reference_type is DIFF_CHECKSUMS_RESPONSE. */
  diffChecksumsResponse?: GdataDiffChecksumsResponse;
  /** Set if reference_type is DIFF_DOWNLOAD_RESPONSE. */
  diffDownloadResponse?: GdataDiffDownloadResponse;
  /** Set if reference_type is DIFF_UPLOAD_REQUEST. */
  diffUploadRequest?: GdataDiffUploadRequest;
  /** Set if reference_type is DIFF_UPLOAD_RESPONSE. */
  diffUploadResponse?: GdataDiffUploadResponse;
  /** Extended content type information provided for Scotty uploads. */
  contentTypeInfo?: GdataContentTypeInfo;
  /** Parameters for a media download. */
  downloadParameters?: GdataDownloadParameters;
  /** For Scotty Uploads: Scotty-provided hashes for uploads For Scotty Downloads: (WARNING: DO NOT USE WITHOUT PERMISSION FROM THE SCOTTY TEAM.) A Hash provided by the agent to be used to verify the data being downloaded. Currently only supported for inline payloads. Further, only crc32c_hash is currently supported. */
  crc32cHash?: number;
  /** Scotty-provided MD5 hash for an upload. */
  md5Hash?: string;
  /** Scotty-provided SHA1 hash for an upload. */
  sha1Hash?: string;
  /** Scotty-provided SHA256 hash for an upload. */
  sha256Hash?: string;
  /** |is_potential_retry| is set false only when Scotty is certain that it has not sent the request before. When a client resumes an upload, this field must be set true in agent calls, because Scotty cannot be certain that it has never sent the request before due to potential failure in the session state persistence. */
  isPotentialRetry?: boolean;
  /** A binary data reference for a media download. Serves as a technology-agnostic binary reference in some Google infrastructure. This value is a serialized storage_cosmo.BinaryReference proto. Storing it as bytes is a hack to get around the fact that the cosmo proto (as well as others it includes) doesn't support JavaScript. This prevents us from including the actual type of this field. */
  cosmoBinaryReference?: string;
  /** For Scotty uploads only. If a user sends a hash code and the backend has requested that Scotty verify the upload against the client hash, Scotty will perform the check on behalf of the backend and will reject it if the hashes don't match. This is set to true if Scotty performed this verification. */
  hashVerified?: boolean;
}

export const GdataMedia: Schema.Schema<GdataMedia> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  length: Schema.optional(Schema.String),
  filename: Schema.optional(Schema.String),
  referenceType: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  blobRef: Schema.optional(Schema.String),
  inline: Schema.optional(Schema.String),
  mediaId: Schema.optional(Schema.String),
  hash: Schema.optional(Schema.String),
  algorithm: Schema.optional(Schema.String),
  compositeMedia: Schema.optional(Schema.Array(GdataCompositeMedia)),
  bigstoreObjectRef: Schema.optional(Schema.String),
  objectId: Schema.optional(GdataObjectId),
  blobstore2Info: Schema.optional(GdataBlobstore2Info),
  diffVersionResponse: Schema.optional(GdataDiffVersionResponse),
  diffChecksumsResponse: Schema.optional(GdataDiffChecksumsResponse),
  diffDownloadResponse: Schema.optional(GdataDiffDownloadResponse),
  diffUploadRequest: Schema.optional(GdataDiffUploadRequest),
  diffUploadResponse: Schema.optional(GdataDiffUploadResponse),
  contentTypeInfo: Schema.optional(GdataContentTypeInfo),
  downloadParameters: Schema.optional(GdataDownloadParameters),
  crc32cHash: Schema.optional(Schema.Number),
  md5Hash: Schema.optional(Schema.String),
  sha1Hash: Schema.optional(Schema.String),
  sha256Hash: Schema.optional(Schema.String),
  isPotentialRetry: Schema.optional(Schema.Boolean),
  cosmoBinaryReference: Schema.optional(Schema.String),
  hashVerified: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GdataMedia" }) as any as Schema.Schema<GdataMedia>;

export interface GoogleFirebaseAppdistroV1UploadReleaseRequest {
  /** Binary to upload */
  blob?: GdataMedia;
}

export const GoogleFirebaseAppdistroV1UploadReleaseRequest: Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseRequest> = Schema.suspend(() => Schema.Struct({
  blob: Schema.optional(GdataMedia),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1UploadReleaseRequest" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseRequest>;

export interface GoogleFirebaseAppdistroV1ReleaseNotes {
  /** The text of the release notes. */
  text?: string;
}

export const GoogleFirebaseAppdistroV1ReleaseNotes: Schema.Schema<GoogleFirebaseAppdistroV1ReleaseNotes> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1ReleaseNotes" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1ReleaseNotes>;

export interface GoogleFirebaseAppdistroV1Release {
  /** The name of the release resource. Format: `projects/{project_number}/apps/{app}/releases/{release}` */
  name?: string;
  /** Notes of the release. */
  releaseNotes?: GoogleFirebaseAppdistroV1ReleaseNotes;
  /** Output only. Display version of the release. For an Android release, the display version is the `versionName`. For an iOS release, the display version is the `CFBundleShortVersionString`. */
  displayVersion?: string;
  /** Output only. Build version of the release. For an Android release, the build version is the `versionCode`. For an iOS release, the build version is the `CFBundleVersion`. */
  buildVersion?: string;
  /** Output only. The time the release was created. */
  createTime?: string;
  /** Output only. The time the release was last updated. */
  updateTime?: string;
  /** Output only. The time the release will expire. */
  expireTime?: string;
  /** Output only. A link to the Firebase console displaying a single release. */
  firebaseConsoleUri?: string;
  /** Output only. A link to the release in the tester web clip or Android app that lets testers (which were granted access to the app) view release notes and install the app onto their devices. */
  testingUri?: string;
  /** Output only. A signed link (which expires in one hour) to directly download the app binary (IPA/APK/AAB) file. */
  binaryDownloadUri?: string;
}

export const GoogleFirebaseAppdistroV1Release: Schema.Schema<GoogleFirebaseAppdistroV1Release> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  releaseNotes: Schema.optional(GoogleFirebaseAppdistroV1ReleaseNotes),
  displayVersion: Schema.optional(Schema.String),
  buildVersion: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  firebaseConsoleUri: Schema.optional(Schema.String),
  testingUri: Schema.optional(Schema.String),
  binaryDownloadUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1Release" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1Release>;

export interface GoogleFirebaseAppdistroV1ListReleasesResponse {
  /** The releases */
  releases?: Array<GoogleFirebaseAppdistroV1Release>;
  /** A short-lived token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppdistroV1ListReleasesResponse: Schema.Schema<GoogleFirebaseAppdistroV1ListReleasesResponse> = Schema.suspend(() => Schema.Struct({
  releases: Schema.optional(Schema.Array(GoogleFirebaseAppdistroV1Release)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1ListReleasesResponse" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1ListReleasesResponse>;

export interface GoogleFirebaseAppdistroV1DistributeReleaseRequest {
  /** Optional. A list of tester email addresses to be given access to this release. A combined maximum of 999 `testerEmails` and `groupAliases` can be specified in a single request. */
  testerEmails?: Array<string>;
  /** Optional. A list of group aliases (IDs) to be given access to this release. A combined maximum of 999 `testerEmails` and `groupAliases` can be specified in a single request. */
  groupAliases?: Array<string>;
}

export const GoogleFirebaseAppdistroV1DistributeReleaseRequest: Schema.Schema<GoogleFirebaseAppdistroV1DistributeReleaseRequest> = Schema.suspend(() => Schema.Struct({
  testerEmails: Schema.optional(Schema.Array(Schema.String)),
  groupAliases: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1DistributeReleaseRequest" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1DistributeReleaseRequest>;

export interface GoogleFirebaseAppdistroV1DistributeReleaseResponse {
}

export const GoogleFirebaseAppdistroV1DistributeReleaseResponse: Schema.Schema<GoogleFirebaseAppdistroV1DistributeReleaseResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirebaseAppdistroV1DistributeReleaseResponse" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1DistributeReleaseResponse>;

export interface GoogleFirebaseAppdistroV1BatchAddTestersRequest {
  /** Required. The email addresses of the tester resources to create. A maximum of 999 and a minimum of 1 tester can be created in a batch. */
  emails?: Array<string>;
}

export const GoogleFirebaseAppdistroV1BatchAddTestersRequest: Schema.Schema<GoogleFirebaseAppdistroV1BatchAddTestersRequest> = Schema.suspend(() => Schema.Struct({
  emails: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1BatchAddTestersRequest" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1BatchAddTestersRequest>;

export interface GoogleFirebaseAppdistroV1Tester {
  /** The name of the tester resource. Format: `projects/{project_number}/testers/{email_address}` */
  name?: string;
  /** The name of the tester associated with the Google account used to accept the tester invitation. */
  displayName?: string;
  /** The resource names of the groups this tester belongs to. */
  groups?: Array<string>;
  /** Output only. The time the tester was last active. This is the most recent time the tester installed one of the apps. If they've never installed one or if the release no longer exists, this is the time the tester was added to the project. */
  lastActivityTime?: string;
}

export const GoogleFirebaseAppdistroV1Tester: Schema.Schema<GoogleFirebaseAppdistroV1Tester> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  groups: Schema.optional(Schema.Array(Schema.String)),
  lastActivityTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1Tester" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1Tester>;

export interface GoogleFirebaseAppdistroV1BatchAddTestersResponse {
  /** The testers which are created and/or already exist */
  testers?: Array<GoogleFirebaseAppdistroV1Tester>;
}

export const GoogleFirebaseAppdistroV1BatchAddTestersResponse: Schema.Schema<GoogleFirebaseAppdistroV1BatchAddTestersResponse> = Schema.suspend(() => Schema.Struct({
  testers: Schema.optional(Schema.Array(GoogleFirebaseAppdistroV1Tester)),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1BatchAddTestersResponse" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1BatchAddTestersResponse>;

export interface GoogleFirebaseAppdistroV1BatchRemoveTestersRequest {
  /** Required. The email addresses of the tester resources to removed. A maximum of 999 and a minimum of 1 testers can be deleted in a batch. */
  emails?: Array<string>;
}

export const GoogleFirebaseAppdistroV1BatchRemoveTestersRequest: Schema.Schema<GoogleFirebaseAppdistroV1BatchRemoveTestersRequest> = Schema.suspend(() => Schema.Struct({
  emails: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1BatchRemoveTestersRequest" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1BatchRemoveTestersRequest>;

export interface GoogleFirebaseAppdistroV1BatchRemoveTestersResponse {
  /** List of deleted tester emails */
  emails?: Array<string>;
}

export const GoogleFirebaseAppdistroV1BatchRemoveTestersResponse: Schema.Schema<GoogleFirebaseAppdistroV1BatchRemoveTestersResponse> = Schema.suspend(() => Schema.Struct({
  emails: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1BatchRemoveTestersResponse" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1BatchRemoveTestersResponse>;

export interface GoogleFirebaseAppdistroV1ListTestersResponse {
  /** The testers listed. */
  testers?: Array<GoogleFirebaseAppdistroV1Tester>;
  /** A short-lived token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppdistroV1ListTestersResponse: Schema.Schema<GoogleFirebaseAppdistroV1ListTestersResponse> = Schema.suspend(() => Schema.Struct({
  testers: Schema.optional(Schema.Array(GoogleFirebaseAppdistroV1Tester)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1ListTestersResponse" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1ListTestersResponse>;

export interface GoogleFirebaseAppdistroV1BatchDeleteReleasesRequest {
  /** Required. The names of the release resources to delete. Format: `projects/{project_number}/apps/{app}/releases/{release}` A maximum of 100 releases can be deleted per request. */
  names?: Array<string>;
}

export const GoogleFirebaseAppdistroV1BatchDeleteReleasesRequest: Schema.Schema<GoogleFirebaseAppdistroV1BatchDeleteReleasesRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1BatchDeleteReleasesRequest" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1BatchDeleteReleasesRequest>;

export interface GoogleFirebaseAppdistroV1Group {
  /** The name of the group resource. Format: `projects/{project_number}/groups/{group_alias}` */
  name?: string;
  /** Required. The display name of the group. */
  displayName?: string;
  /** Output only. The number of testers who are members of this group. */
  testerCount?: number;
  /** Output only. The number of releases this group is permitted to access. */
  releaseCount?: number;
  /** Output only. The number of invite links for this group. */
  inviteLinkCount?: number;
}

export const GoogleFirebaseAppdistroV1Group: Schema.Schema<GoogleFirebaseAppdistroV1Group> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  testerCount: Schema.optional(Schema.Number),
  releaseCount: Schema.optional(Schema.Number),
  inviteLinkCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1Group" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1Group>;

export interface GoogleFirebaseAppdistroV1ListGroupsResponse {
  /** The groups listed. */
  groups?: Array<GoogleFirebaseAppdistroV1Group>;
  /** A short-lived token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppdistroV1ListGroupsResponse: Schema.Schema<GoogleFirebaseAppdistroV1ListGroupsResponse> = Schema.suspend(() => Schema.Struct({
  groups: Schema.optional(Schema.Array(GoogleFirebaseAppdistroV1Group)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1ListGroupsResponse" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1ListGroupsResponse>;

export interface GoogleFirebaseAppdistroV1BatchJoinGroupRequest {
  /** Required. The emails of the testers to be added to the group. A maximum of 999 and a minimum of 1 tester can be created in a batch. */
  emails?: Array<string>;
  /** Indicates whether to create tester resources based on `emails` if they don't exist yet. */
  createMissingTesters?: boolean;
}

export const GoogleFirebaseAppdistroV1BatchJoinGroupRequest: Schema.Schema<GoogleFirebaseAppdistroV1BatchJoinGroupRequest> = Schema.suspend(() => Schema.Struct({
  emails: Schema.optional(Schema.Array(Schema.String)),
  createMissingTesters: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1BatchJoinGroupRequest" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1BatchJoinGroupRequest>;

export interface GoogleFirebaseAppdistroV1BatchLeaveGroupRequest {
  /** Required. The email addresses of the testers to be removed from the group. A maximum of 999 and a minimum of 1 testers can be removed in a batch. */
  emails?: Array<string>;
}

export const GoogleFirebaseAppdistroV1BatchLeaveGroupRequest: Schema.Schema<GoogleFirebaseAppdistroV1BatchLeaveGroupRequest> = Schema.suspend(() => Schema.Struct({
  emails: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1BatchLeaveGroupRequest" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1BatchLeaveGroupRequest>;

export interface GoogleFirebaseAppdistroV1FeedbackReport {
  /** The name of the feedback report resource. Format: `projects/{project_number}/apps/{app}/releases/{release}/feedbackReports/{feedback_report}` */
  name?: string;
  /** Output only. The resource name of the tester who submitted the feedback report. */
  tester?: string;
  /** Output only. The text of the feedback report. */
  text?: string;
  /** Output only. A signed link (which expires in one hour) that lets you directly download the screenshot. */
  screenshotUri?: string;
  /** Output only. A link to the Firebase console displaying the feedback report. */
  firebaseConsoleUri?: string;
  /** Output only. The time when the feedback report was created. */
  createTime?: string;
}

export const GoogleFirebaseAppdistroV1FeedbackReport: Schema.Schema<GoogleFirebaseAppdistroV1FeedbackReport> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tester: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  screenshotUri: Schema.optional(Schema.String),
  firebaseConsoleUri: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1FeedbackReport" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1FeedbackReport>;

export interface GoogleFirebaseAppdistroV1ListFeedbackReportsResponse {
  /** The feedback reports */
  feedbackReports?: Array<GoogleFirebaseAppdistroV1FeedbackReport>;
  /** A short-lived token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppdistroV1ListFeedbackReportsResponse: Schema.Schema<GoogleFirebaseAppdistroV1ListFeedbackReportsResponse> = Schema.suspend(() => Schema.Struct({
  feedbackReports: Schema.optional(Schema.Array(GoogleFirebaseAppdistroV1FeedbackReport)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1ListFeedbackReportsResponse" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1ListFeedbackReportsResponse>;

export interface GoogleFirebaseAppdistroV1UploadReleaseMetadata {
}

export const GoogleFirebaseAppdistroV1UploadReleaseMetadata: Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirebaseAppdistroV1UploadReleaseMetadata" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseMetadata>;

export interface GoogleFirebaseAppdistroV1UploadReleaseResponse {
  /** Result of upload release. */
  result?: "UPLOAD_RELEASE_RESULT_UNSPECIFIED" | "RELEASE_CREATED" | "RELEASE_UPDATED" | "RELEASE_UNMODIFIED" | (string & {});
  /** Release associated with the uploaded binary. */
  release?: GoogleFirebaseAppdistroV1Release;
}

export const GoogleFirebaseAppdistroV1UploadReleaseResponse: Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(Schema.String),
  release: Schema.optional(GoogleFirebaseAppdistroV1Release),
})).annotate({ identifier: "GoogleFirebaseAppdistroV1UploadReleaseResponse" }) as any as Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets Android App Bundle (AAB) information for a Firebase app. */
export interface GetAabInfoProjectsAppsRequest {
  /** Required. The name of the `AabInfo` resource to retrieve. Format: `projects/{project_number}/apps/{app}/aabInfo` */
  name: string;
}

export const GetAabInfoProjectsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/aabInfo" }),
  svc,
) as unknown as Schema.Schema<GetAabInfoProjectsAppsRequest>;

export type GetAabInfoProjectsAppsResponse = GoogleFirebaseAppdistroV1AabInfo;
export const GetAabInfoProjectsAppsResponse = GoogleFirebaseAppdistroV1AabInfo;

export type GetAabInfoProjectsAppsError = CommonErrors;

export const getAabInfoProjectsApps: API.OperationMethod<GetAabInfoProjectsAppsRequest, GetAabInfoProjectsAppsResponse, GetAabInfoProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAabInfoProjectsAppsRequest,
  output: GetAabInfoProjectsAppsResponse,
  errors: [],
}));

/** Gets a release. */
export interface GetProjectsAppsReleasesRequest {
  /** Required. The name of the release resource to retrieve. Format: projects/{project_number}/apps/{app}/releases/{release} */
  name: string;
}

export const GetProjectsAppsReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsReleasesRequest>;

export type GetProjectsAppsReleasesResponse = GoogleFirebaseAppdistroV1Release;
export const GetProjectsAppsReleasesResponse = GoogleFirebaseAppdistroV1Release;

export type GetProjectsAppsReleasesError = CommonErrors;

export const getProjectsAppsReleases: API.OperationMethod<GetProjectsAppsReleasesRequest, GetProjectsAppsReleasesResponse, GetProjectsAppsReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsReleasesRequest,
  output: GetProjectsAppsReleasesResponse,
  errors: [],
}));

/** Lists releases. By default, sorts by `createTime` in descending order. */
export interface ListProjectsAppsReleasesRequest {
  /** Required. The name of the app resource, which is the parent of the release resources. Format: `projects/{project_number}/apps/{app}` */
  parent: string;
  /** Optional. The maximum number of releases to return. The service may return fewer than this value. The valid range is [1-100]; If unspecified (0), at most 25 releases are returned. Values above 100 are coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListReleases` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReleases` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The fields used to order releases. Supported fields: - `createTime` To specify descending order for a field, append a "desc" suffix, for example, `createTime desc`. If this parameter is not set, releases are ordered by `createTime` in descending order. */
  orderBy?: string;
  /** Optional. The expression to filter releases listed in the response. To learn more about filtering, refer to [Google's AIP-160 standard](http://aip.dev/160). Supported fields: - `releaseNotes.text` supports `=` (can contain a wildcard character (`*`) at the beginning or end of the string) - `createTime` supports `<`, `<=`, `>` and `>=`, and expects an RFC-3339 formatted string Examples: - `createTime <= "2021-09-08T00:00:00+04:00"` - `releaseNotes.text="fixes" AND createTime >= "2021-09-08T00:00:00.0Z"` - `releaseNotes.text="*v1.0.0-rc*"` */
  filter?: string;
}

export const ListProjectsAppsReleasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/releases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAppsReleasesRequest>;

export type ListProjectsAppsReleasesResponse = GoogleFirebaseAppdistroV1ListReleasesResponse;
export const ListProjectsAppsReleasesResponse = GoogleFirebaseAppdistroV1ListReleasesResponse;

export type ListProjectsAppsReleasesError = CommonErrors;

export const listProjectsAppsReleases = API.makePaginated(() => ({
  input: ListProjectsAppsReleasesRequest,
  output: ListProjectsAppsReleasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a release. */
export interface PatchProjectsAppsReleasesRequest {
  /** The name of the release resource. Format: `projects/{project_number}/apps/{app}/releases/{release}` */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1Release;
}

export const PatchProjectsAppsReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppdistroV1Release).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAppsReleasesRequest>;

export type PatchProjectsAppsReleasesResponse = GoogleFirebaseAppdistroV1Release;
export const PatchProjectsAppsReleasesResponse = GoogleFirebaseAppdistroV1Release;

export type PatchProjectsAppsReleasesError = CommonErrors;

export const patchProjectsAppsReleases: API.OperationMethod<PatchProjectsAppsReleasesRequest, PatchProjectsAppsReleasesResponse, PatchProjectsAppsReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAppsReleasesRequest,
  output: PatchProjectsAppsReleasesResponse,
  errors: [],
}));

/** Distributes a release to testers. This call does the following: 1. Creates testers for the specified emails, if none exist. 2. Adds the testers and groups to the release. 3. Sends new testers an invitation email. 4. Sends existing testers a new release email. The request will fail with a `INVALID_ARGUMENT` if it contains a group that doesn't exist. */
export interface DistributeProjectsAppsReleasesRequest {
  /** Required. The name of the release resource to distribute. Format: `projects/{project_number}/apps/{app}/releases/{release}` */
  name: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1DistributeReleaseRequest;
}

export const DistributeProjectsAppsReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirebaseAppdistroV1DistributeReleaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}:distribute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DistributeProjectsAppsReleasesRequest>;

export type DistributeProjectsAppsReleasesResponse = GoogleFirebaseAppdistroV1DistributeReleaseResponse;
export const DistributeProjectsAppsReleasesResponse = GoogleFirebaseAppdistroV1DistributeReleaseResponse;

export type DistributeProjectsAppsReleasesError = CommonErrors;

export const distributeProjectsAppsReleases: API.OperationMethod<DistributeProjectsAppsReleasesRequest, DistributeProjectsAppsReleasesResponse, DistributeProjectsAppsReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DistributeProjectsAppsReleasesRequest,
  output: DistributeProjectsAppsReleasesResponse,
  errors: [],
}));

/** Deletes releases. A maximum of 100 releases can be deleted per request. */
export interface BatchDeleteProjectsAppsReleasesRequest {
  /** Required. The name of the app resource, which is the parent of the release resources. Format: `projects/{project_number}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1BatchDeleteReleasesRequest;
}

export const BatchDeleteProjectsAppsReleasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirebaseAppdistroV1BatchDeleteReleasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}/releases:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsAppsReleasesRequest>;

export type BatchDeleteProjectsAppsReleasesResponse = GoogleProtobufEmpty;
export const BatchDeleteProjectsAppsReleasesResponse = GoogleProtobufEmpty;

export type BatchDeleteProjectsAppsReleasesError = CommonErrors;

export const batchDeleteProjectsAppsReleases: API.OperationMethod<BatchDeleteProjectsAppsReleasesRequest, BatchDeleteProjectsAppsReleasesResponse, BatchDeleteProjectsAppsReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsAppsReleasesRequest,
  output: BatchDeleteProjectsAppsReleasesResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsAppsReleasesOperationsRequest {
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

export const ListProjectsAppsReleasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAppsReleasesOperationsRequest>;

export type ListProjectsAppsReleasesOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsAppsReleasesOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsAppsReleasesOperationsError = CommonErrors;

export const listProjectsAppsReleasesOperations = API.makePaginated(() => ({
  input: ListProjectsAppsReleasesOperationsRequest,
  output: ListProjectsAppsReleasesOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsAppsReleasesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsAppsReleasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsReleasesOperationsRequest>;

export type GetProjectsAppsReleasesOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsAppsReleasesOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsAppsReleasesOperationsError = CommonErrors;

export const getProjectsAppsReleasesOperations: API.OperationMethod<GetProjectsAppsReleasesOperationsRequest, GetProjectsAppsReleasesOperationsResponse, GetProjectsAppsReleasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsReleasesOperationsRequest,
  output: GetProjectsAppsReleasesOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsAppsReleasesOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsAppsReleasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAppsReleasesOperationsRequest>;

export type DeleteProjectsAppsReleasesOperationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsAppsReleasesOperationsResponse = GoogleProtobufEmpty;

export type DeleteProjectsAppsReleasesOperationsError = CommonErrors;

export const deleteProjectsAppsReleasesOperations: API.OperationMethod<DeleteProjectsAppsReleasesOperationsRequest, DeleteProjectsAppsReleasesOperationsResponse, DeleteProjectsAppsReleasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAppsReleasesOperationsRequest,
  output: DeleteProjectsAppsReleasesOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsAppsReleasesOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelProjectsAppsReleasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsAppsReleasesOperationsRequest>;

export type CancelProjectsAppsReleasesOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsAppsReleasesOperationsResponse = GoogleProtobufEmpty;

export type CancelProjectsAppsReleasesOperationsError = CommonErrors;

export const cancelProjectsAppsReleasesOperations: API.OperationMethod<CancelProjectsAppsReleasesOperationsRequest, CancelProjectsAppsReleasesOperationsResponse, CancelProjectsAppsReleasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsAppsReleasesOperationsRequest,
  output: CancelProjectsAppsReleasesOperationsResponse,
  errors: [],
}));

/** Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done. */
export interface WaitProjectsAppsReleasesOperationsRequest {
  /** The name of the operation resource to wait on. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningWaitOperationRequest;
}

export const WaitProjectsAppsReleasesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningWaitOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/operations/{operationsId}:wait", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WaitProjectsAppsReleasesOperationsRequest>;

export type WaitProjectsAppsReleasesOperationsResponse = GoogleLongrunningOperation;
export const WaitProjectsAppsReleasesOperationsResponse = GoogleLongrunningOperation;

export type WaitProjectsAppsReleasesOperationsError = CommonErrors;

export const waitProjectsAppsReleasesOperations: API.OperationMethod<WaitProjectsAppsReleasesOperationsRequest, WaitProjectsAppsReleasesOperationsResponse, WaitProjectsAppsReleasesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WaitProjectsAppsReleasesOperationsRequest,
  output: WaitProjectsAppsReleasesOperationsResponse,
  errors: [],
}));

/** Gets a feedback report. */
export interface GetProjectsAppsReleasesFeedbackReportsRequest {
  /** Required. The name of the feedback report to retrieve. Format: projects/{project_number}/apps/{app}/releases/{release}/feedbackReports/{feedback_report} */
  name: string;
}

export const GetProjectsAppsReleasesFeedbackReportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/feedbackReports/{feedbackReportsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsReleasesFeedbackReportsRequest>;

export type GetProjectsAppsReleasesFeedbackReportsResponse = GoogleFirebaseAppdistroV1FeedbackReport;
export const GetProjectsAppsReleasesFeedbackReportsResponse = GoogleFirebaseAppdistroV1FeedbackReport;

export type GetProjectsAppsReleasesFeedbackReportsError = CommonErrors;

export const getProjectsAppsReleasesFeedbackReports: API.OperationMethod<GetProjectsAppsReleasesFeedbackReportsRequest, GetProjectsAppsReleasesFeedbackReportsResponse, GetProjectsAppsReleasesFeedbackReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsReleasesFeedbackReportsRequest,
  output: GetProjectsAppsReleasesFeedbackReportsResponse,
  errors: [],
}));

/** Lists feedback reports. By default, sorts by `createTime` in descending order. */
export interface ListProjectsAppsReleasesFeedbackReportsRequest {
  /** Required. The name of the release resource, which is the parent of the feedback report resources. Format: `projects/{project_number}/apps/{app}/releases/{release}` */
  parent: string;
  /** Output only. The maximum number of feedback reports to return. The service may return fewer than this value. The valid range is [1-100]; If unspecified (0), at most 25 feedback reports are returned. Values above 100 are coerced to 100. */
  pageSize?: number;
  /** Output only. A page token, received from a previous `ListFeedbackReports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFeedbackReports` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsAppsReleasesFeedbackReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/feedbackReports" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAppsReleasesFeedbackReportsRequest>;

export type ListProjectsAppsReleasesFeedbackReportsResponse = GoogleFirebaseAppdistroV1ListFeedbackReportsResponse;
export const ListProjectsAppsReleasesFeedbackReportsResponse = GoogleFirebaseAppdistroV1ListFeedbackReportsResponse;

export type ListProjectsAppsReleasesFeedbackReportsError = CommonErrors;

export const listProjectsAppsReleasesFeedbackReports = API.makePaginated(() => ({
  input: ListProjectsAppsReleasesFeedbackReportsRequest,
  output: ListProjectsAppsReleasesFeedbackReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a feedback report. */
export interface DeleteProjectsAppsReleasesFeedbackReportsRequest {
  /** Required. The name of the feedback report to delete. Format: projects/{project_number}/apps/{app}/releases/{release}/feedbackReports/{feedback_report} */
  name: string;
}

export const DeleteProjectsAppsReleasesFeedbackReportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/feedbackReports/{feedbackReportsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAppsReleasesFeedbackReportsRequest>;

export type DeleteProjectsAppsReleasesFeedbackReportsResponse = GoogleProtobufEmpty;
export const DeleteProjectsAppsReleasesFeedbackReportsResponse = GoogleProtobufEmpty;

export type DeleteProjectsAppsReleasesFeedbackReportsError = CommonErrors;

export const deleteProjectsAppsReleasesFeedbackReports: API.OperationMethod<DeleteProjectsAppsReleasesFeedbackReportsRequest, DeleteProjectsAppsReleasesFeedbackReportsResponse, DeleteProjectsAppsReleasesFeedbackReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAppsReleasesFeedbackReportsRequest,
  output: DeleteProjectsAppsReleasesFeedbackReportsResponse,
  errors: [],
}));

/** Batch adds testers. This call adds testers for the specified emails if they don't already exist. Returns all testers specified in the request, including newly created and previously existing testers. This action is idempotent. */
export interface BatchAddProjectsTestersRequest {
  /** Required. The name of the project resource. Format: `projects/{project_number}` */
  project: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1BatchAddTestersRequest;
}

export const BatchAddProjectsTestersRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  body: Schema.optional(GoogleFirebaseAppdistroV1BatchAddTestersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/testers:batchAdd", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchAddProjectsTestersRequest>;

export type BatchAddProjectsTestersResponse = GoogleFirebaseAppdistroV1BatchAddTestersResponse;
export const BatchAddProjectsTestersResponse = GoogleFirebaseAppdistroV1BatchAddTestersResponse;

export type BatchAddProjectsTestersError = CommonErrors;

export const batchAddProjectsTesters: API.OperationMethod<BatchAddProjectsTestersRequest, BatchAddProjectsTestersResponse, BatchAddProjectsTestersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchAddProjectsTestersRequest,
  output: BatchAddProjectsTestersResponse,
  errors: [],
}));

/** Batch removes testers. If found, this call deletes testers for the specified emails. Returns all deleted testers. */
export interface BatchRemoveProjectsTestersRequest {
  /** Required. The name of the project resource. Format: `projects/{project_number}` */
  project: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1BatchRemoveTestersRequest;
}

export const BatchRemoveProjectsTestersRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  body: Schema.optional(GoogleFirebaseAppdistroV1BatchRemoveTestersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/testers:batchRemove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchRemoveProjectsTestersRequest>;

export type BatchRemoveProjectsTestersResponse = GoogleFirebaseAppdistroV1BatchRemoveTestersResponse;
export const BatchRemoveProjectsTestersResponse = GoogleFirebaseAppdistroV1BatchRemoveTestersResponse;

export type BatchRemoveProjectsTestersError = CommonErrors;

export const batchRemoveProjectsTesters: API.OperationMethod<BatchRemoveProjectsTestersRequest, BatchRemoveProjectsTestersResponse, BatchRemoveProjectsTestersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchRemoveProjectsTestersRequest,
  output: BatchRemoveProjectsTestersResponse,
  errors: [],
}));

/** Lists testers and their resource ids. */
export interface ListProjectsTestersRequest {
  /** Required. The name of the project resource, which is the parent of the tester resources. Format: `projects/{project_number}` */
  parent: string;
  /** Optional. The maximum number of testers to return. The service may return fewer than this value. The valid range is [1-1000]; If unspecified (0), at most 10 testers are returned. Values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListTesters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTesters` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The expression to filter testers listed in the response. To learn more about filtering, refer to [Google's AIP-160 standard](http://aip.dev/160). Supported fields: - `name` - `displayName` - `groups` Example: - `name = "projects/-/testers/*@example.com"` - `displayName = "Joe Sixpack"` - `groups = "projects/* /groups/qa-team"` */
  filter?: string;
}

export const ListProjectsTestersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/testers" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTestersRequest>;

export type ListProjectsTestersResponse = GoogleFirebaseAppdistroV1ListTestersResponse;
export const ListProjectsTestersResponse = GoogleFirebaseAppdistroV1ListTestersResponse;

export type ListProjectsTestersError = CommonErrors;

export const listProjectsTesters = API.makePaginated(() => ({
  input: ListProjectsTestersRequest,
  output: ListProjectsTestersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update a tester. If the testers joins a group they gain access to all releases that the group has access to. */
export interface PatchProjectsTestersRequest {
  /** The name of the tester resource. Format: `projects/{project_number}/testers/{email_address}` */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1Tester;
}

export const PatchProjectsTestersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppdistroV1Tester).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/testers/{testersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTestersRequest>;

export type PatchProjectsTestersResponse = GoogleFirebaseAppdistroV1Tester;
export const PatchProjectsTestersResponse = GoogleFirebaseAppdistroV1Tester;

export type PatchProjectsTestersError = CommonErrors;

export const patchProjectsTesters: API.OperationMethod<PatchProjectsTestersRequest, PatchProjectsTestersResponse, PatchProjectsTestersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsTestersRequest,
  output: PatchProjectsTestersResponse,
  errors: [],
}));

/** Get a group. */
export interface GetProjectsGroupsRequest {
  /** Required. The name of the group resource to retrieve. Format: `projects/{project_number}/groups/{group_alias}` */
  name: string;
}

export const GetProjectsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsGroupsRequest>;

export type GetProjectsGroupsResponse = GoogleFirebaseAppdistroV1Group;
export const GetProjectsGroupsResponse = GoogleFirebaseAppdistroV1Group;

export type GetProjectsGroupsError = CommonErrors;

export const getProjectsGroups: API.OperationMethod<GetProjectsGroupsRequest, GetProjectsGroupsResponse, GetProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsGroupsRequest,
  output: GetProjectsGroupsResponse,
  errors: [],
}));

/** List groups. */
export interface ListProjectsGroupsRequest {
  /** Required. The name of the project resource, which is the parent of the group resources. Format: `projects/{project_number}` */
  parent: string;
  /** Optional. The maximum number of groups to return. The service may return fewer than this value. The valid range is [1-1000]; If unspecified (0), at most 25 groups are returned. Values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListGroups` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/groups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsGroupsRequest>;

export type ListProjectsGroupsResponse = GoogleFirebaseAppdistroV1ListGroupsResponse;
export const ListProjectsGroupsResponse = GoogleFirebaseAppdistroV1ListGroupsResponse;

export type ListProjectsGroupsError = CommonErrors;

export const listProjectsGroups = API.makePaginated(() => ({
  input: ListProjectsGroupsRequest,
  output: ListProjectsGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a group. */
export interface CreateProjectsGroupsRequest {
  /** Required. The name of the project resource, which is the parent of the group resource. Format: `projects/{project_number}` */
  parent: string;
  /** Optional. The "alias" to use for the group, which will become the final component of the group's resource name. This value must be unique per project. The field is named `groupId` to comply with AIP guidance for user-specified IDs. This value should be 4-63 characters, and valid characters are `/a-z-/`. If not set, it will be generated based on the display name. */
  groupId?: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1Group;
}

export const CreateProjectsGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  groupId: Schema.optional(Schema.String).pipe(T.HttpQuery("groupId")),
  body: Schema.optional(GoogleFirebaseAppdistroV1Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/groups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsGroupsRequest>;

export type CreateProjectsGroupsResponse = GoogleFirebaseAppdistroV1Group;
export const CreateProjectsGroupsResponse = GoogleFirebaseAppdistroV1Group;

export type CreateProjectsGroupsError = CommonErrors;

export const createProjectsGroups: API.OperationMethod<CreateProjectsGroupsRequest, CreateProjectsGroupsResponse, CreateProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsGroupsRequest,
  output: CreateProjectsGroupsResponse,
  errors: [],
}));

/** Update a group. */
export interface PatchProjectsGroupsRequest {
  /** The name of the group resource. Format: `projects/{project_number}/groups/{group_alias}` */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1Group;
}

export const PatchProjectsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppdistroV1Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/groups/{groupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsGroupsRequest>;

export type PatchProjectsGroupsResponse = GoogleFirebaseAppdistroV1Group;
export const PatchProjectsGroupsResponse = GoogleFirebaseAppdistroV1Group;

export type PatchProjectsGroupsError = CommonErrors;

export const patchProjectsGroups: API.OperationMethod<PatchProjectsGroupsRequest, PatchProjectsGroupsResponse, PatchProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsGroupsRequest,
  output: PatchProjectsGroupsResponse,
  errors: [],
}));

/** Delete a group. */
export interface DeleteProjectsGroupsRequest {
  /** Required. The name of the group resource. Format: `projects/{project_number}/groups/{group_alias}` */
  name: string;
}

export const DeleteProjectsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsGroupsRequest>;

export type DeleteProjectsGroupsResponse = GoogleProtobufEmpty;
export const DeleteProjectsGroupsResponse = GoogleProtobufEmpty;

export type DeleteProjectsGroupsError = CommonErrors;

export const deleteProjectsGroups: API.OperationMethod<DeleteProjectsGroupsRequest, DeleteProjectsGroupsResponse, DeleteProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsGroupsRequest,
  output: DeleteProjectsGroupsResponse,
  errors: [],
}));

/** Batch adds members to a group. The testers will gain access to all releases that the groups have access to. */
export interface BatchJoinProjectsGroupsRequest {
  /** Required. The name of the group resource to which testers are added. Format: `projects/{project_number}/groups/{group_alias}` */
  group: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1BatchJoinGroupRequest;
}

export const BatchJoinProjectsGroupsRequest = Schema.Struct({
  group: Schema.String.pipe(T.HttpPath("group")),
  body: Schema.optional(GoogleFirebaseAppdistroV1BatchJoinGroupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/groups/{groupsId}:batchJoin", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchJoinProjectsGroupsRequest>;

export type BatchJoinProjectsGroupsResponse = GoogleProtobufEmpty;
export const BatchJoinProjectsGroupsResponse = GoogleProtobufEmpty;

export type BatchJoinProjectsGroupsError = CommonErrors;

export const batchJoinProjectsGroups: API.OperationMethod<BatchJoinProjectsGroupsRequest, BatchJoinProjectsGroupsResponse, BatchJoinProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchJoinProjectsGroupsRequest,
  output: BatchJoinProjectsGroupsResponse,
  errors: [],
}));

/** Batch removed members from a group. The testers will lose access to all releases that the groups have access to. */
export interface BatchLeaveProjectsGroupsRequest {
  /** Required. The name of the group resource from which testers are removed. Format: `projects/{project_number}/groups/{group_alias}` */
  group: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1BatchLeaveGroupRequest;
}

export const BatchLeaveProjectsGroupsRequest = Schema.Struct({
  group: Schema.String.pipe(T.HttpPath("group")),
  body: Schema.optional(GoogleFirebaseAppdistroV1BatchLeaveGroupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/groups/{groupsId}:batchLeave", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchLeaveProjectsGroupsRequest>;

export type BatchLeaveProjectsGroupsResponse = GoogleProtobufEmpty;
export const BatchLeaveProjectsGroupsResponse = GoogleProtobufEmpty;

export type BatchLeaveProjectsGroupsError = CommonErrors;

export const batchLeaveProjectsGroups: API.OperationMethod<BatchLeaveProjectsGroupsRequest, BatchLeaveProjectsGroupsResponse, BatchLeaveProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchLeaveProjectsGroupsRequest,
  output: BatchLeaveProjectsGroupsResponse,
  errors: [],
}));

/** Uploads a binary. Uploading a binary can result in a new release being created, an update to an existing release, or a no-op if a release with the same binary already exists. */
export interface UploadMediaRequest {
  /** Required. The name of the app resource. Format: `projects/{project_number}/apps/{app}` */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1UploadReleaseRequest;
}

export const UploadMediaRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppdistroV1UploadReleaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}/releases:upload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse = GoogleLongrunningOperation;
export const UploadMediaResponse = GoogleLongrunningOperation;

export type UploadMediaError = CommonErrors;

export const uploadMedia: API.OperationMethod<UploadMediaRequest, UploadMediaResponse, UploadMediaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadMediaRequest,
  output: UploadMediaResponse,
  errors: [],
}));

