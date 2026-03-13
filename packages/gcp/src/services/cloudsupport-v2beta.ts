// ==========================================================================
// Google Cloud Support API (cloudsupport v2beta)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "cloudsupport",
  version: "v2beta",
  rootUrl: "https://cloudsupport.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Actor {
  /** Output only. Whether the actor is a Google support actor. */
  googleSupport?: boolean;
  /** Output only. The username of the actor. It may look like an email or other format provided by the identity provider. If not provided, it is inferred from the credentials supplied. When a name is provided, a username must also be provided. If the user is a Google Support agent, this will not be set. */
  username?: string;
  /** The name to display for the actor. If not provided, it is inferred from credentials supplied during case creation. When an email is provided, a display name must also be provided. This will be obfuscated if the user is a Google Support agent. */
  displayName?: string;
  /** The email address of the actor. If not provided, it is inferred from the credentials supplied during case creation. When a name is provided, an email must also be provided. If the user is a Google Support agent, this is obfuscated. This field is deprecated. Use `username` instead. */
  email?: string;
}

export const Actor: Schema.Schema<Actor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      googleSupport: Schema.optional(Schema.Boolean),
      username: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Actor" }) as any as Schema.Schema<Actor>;

export interface CloseCaseRequest {}

export const CloseCaseRequest: Schema.Schema<CloseCaseRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CloseCaseRequest",
  }) as any as Schema.Schema<CloseCaseRequest>;

export interface Product {
  /** The product line of the Product. */
  productLine?:
    | "PRODUCT_LINE_UNSPECIFIED"
    | "GOOGLE_CLOUD"
    | "GOOGLE_MAPS"
    | (string & {});
}

export const Product: Schema.Schema<Product> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      productLine: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface ObjectId {
  /** # gdata.* are outside protos with mising documentation */
  bucketName?: string;
  /** # gdata.* are outside protos with mising documentation */
  generation?: string;
  /** # gdata.* are outside protos with mising documentation */
  objectName?: string;
}

export const ObjectId: Schema.Schema<ObjectId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bucketName: Schema.optional(Schema.String),
      generation: Schema.optional(Schema.String),
      objectName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ObjectId" }) as any as Schema.Schema<ObjectId>;

export interface Blobstore2Info {
  /** # gdata.* are outside protos with mising documentation */
  blobId?: string;
  /** # gdata.* are outside protos with mising documentation */
  downloadExternalReadToken?: string;
  /** # gdata.* are outside protos with mising documentation */
  uploadFragmentListCreationInfo?: string;
  /** # gdata.* are outside protos with mising documentation */
  blobGeneration?: string;
  /** # gdata.* are outside protos with mising documentation */
  readToken?: string;
  /** # gdata.* are outside protos with mising documentation */
  downloadReadHandle?: string;
  /** # gdata.* are outside protos with mising documentation */
  uploadMetadataContainer?: string;
}

export const Blobstore2Info: Schema.Schema<Blobstore2Info> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      blobId: Schema.optional(Schema.String),
      downloadExternalReadToken: Schema.optional(Schema.String),
      uploadFragmentListCreationInfo: Schema.optional(Schema.String),
      blobGeneration: Schema.optional(Schema.String),
      readToken: Schema.optional(Schema.String),
      downloadReadHandle: Schema.optional(Schema.String),
      uploadMetadataContainer: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Blobstore2Info",
  }) as any as Schema.Schema<Blobstore2Info>;

export interface CompositeMedia {
  /** # gdata.* are outside protos with mising documentation */
  crc32cHash?: number;
  /** # gdata.* are outside protos with mising documentation */
  md5Hash?: string;
  /** # gdata.* are outside protos with mising documentation */
  path?: string;
  /** # gdata.* are outside protos with mising documentation */
  blobRef?: string;
  /** # gdata.* are outside protos with mising documentation */
  inline?: string;
  /** # gdata.* are outside protos with mising documentation */
  cosmoBinaryReference?: string;
  /** # gdata.* are outside protos with mising documentation */
  length?: string;
  /** # gdata.* are outside protos with mising documentation */
  objectId?: ObjectId;
  /** # gdata.* are outside protos with mising documentation */
  blobstore2Info?: Blobstore2Info;
  /** # gdata.* are outside protos with mising documentation */
  referenceType?:
    | "PATH"
    | "BLOB_REF"
    | "INLINE"
    | "BIGSTORE_REF"
    | "COSMO_BINARY_REFERENCE"
    | (string & {});
  /** # gdata.* are outside protos with mising documentation */
  sha1Hash?: string;
}

export const CompositeMedia: Schema.Schema<CompositeMedia> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      crc32cHash: Schema.optional(Schema.Number),
      md5Hash: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      blobRef: Schema.optional(Schema.String),
      inline: Schema.optional(Schema.String),
      cosmoBinaryReference: Schema.optional(Schema.String),
      length: Schema.optional(Schema.String),
      objectId: Schema.optional(ObjectId),
      blobstore2Info: Schema.optional(Blobstore2Info),
      referenceType: Schema.optional(Schema.String),
      sha1Hash: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CompositeMedia",
  }) as any as Schema.Schema<CompositeMedia>;

export interface DiffChecksumsResponse {
  /** # gdata.* are outside protos with mising documentation */
  objectLocation?: CompositeMedia;
  /** # gdata.* are outside protos with mising documentation */
  checksumsLocation?: CompositeMedia;
  /** # gdata.* are outside protos with mising documentation */
  chunkSizeBytes?: string;
  /** # gdata.* are outside protos with mising documentation */
  objectSizeBytes?: string;
  /** # gdata.* are outside protos with mising documentation */
  objectVersion?: string;
}

export const DiffChecksumsResponse: Schema.Schema<DiffChecksumsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectLocation: Schema.optional(CompositeMedia),
      checksumsLocation: Schema.optional(CompositeMedia),
      chunkSizeBytes: Schema.optional(Schema.String),
      objectSizeBytes: Schema.optional(Schema.String),
      objectVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiffChecksumsResponse",
  }) as any as Schema.Schema<DiffChecksumsResponse>;

export interface DiffDownloadResponse {
  /** # gdata.* are outside protos with mising documentation */
  objectLocation?: CompositeMedia;
}

export const DiffDownloadResponse: Schema.Schema<DiffDownloadResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectLocation: Schema.optional(CompositeMedia),
    }),
  ).annotate({
    identifier: "DiffDownloadResponse",
  }) as any as Schema.Schema<DiffDownloadResponse>;

export interface ContentTypeInfo {
  /** # gdata.* are outside protos with mising documentation */
  bestGuess?: string;
  /** # gdata.* are outside protos with mising documentation */
  fromHeader?: string;
  /** # gdata.* are outside protos with mising documentation */
  fromUrlPath?: string;
  /** # gdata.* are outside protos with mising documentation */
  fromFileName?: string;
  /** # gdata.* are outside protos with mising documentation */
  fromBytes?: string;
}

export const ContentTypeInfo: Schema.Schema<ContentTypeInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bestGuess: Schema.optional(Schema.String),
      fromHeader: Schema.optional(Schema.String),
      fromUrlPath: Schema.optional(Schema.String),
      fromFileName: Schema.optional(Schema.String),
      fromBytes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentTypeInfo",
  }) as any as Schema.Schema<ContentTypeInfo>;

export interface DownloadParameters {
  /** # gdata.* are outside protos with mising documentation */
  allowGzipCompression?: boolean;
  /** # gdata.* are outside protos with mising documentation */
  ignoreRange?: boolean;
}

export const DownloadParameters: Schema.Schema<DownloadParameters> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowGzipCompression: Schema.optional(Schema.Boolean),
      ignoreRange: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DownloadParameters",
  }) as any as Schema.Schema<DownloadParameters>;

export interface DiffVersionResponse {
  /** # gdata.* are outside protos with mising documentation */
  objectVersion?: string;
  /** # gdata.* are outside protos with mising documentation */
  objectSizeBytes?: string;
}

export const DiffVersionResponse: Schema.Schema<DiffVersionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectVersion: Schema.optional(Schema.String),
      objectSizeBytes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiffVersionResponse",
  }) as any as Schema.Schema<DiffVersionResponse>;

export interface DiffUploadResponse {
  /** # gdata.* are outside protos with mising documentation */
  objectVersion?: string;
  /** # gdata.* are outside protos with mising documentation */
  originalObject?: CompositeMedia;
}

export const DiffUploadResponse: Schema.Schema<DiffUploadResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectVersion: Schema.optional(Schema.String),
      originalObject: Schema.optional(CompositeMedia),
    }),
  ).annotate({
    identifier: "DiffUploadResponse",
  }) as any as Schema.Schema<DiffUploadResponse>;

export interface DiffUploadRequest {
  /** # gdata.* are outside protos with mising documentation */
  objectVersion?: string;
  /** # gdata.* are outside protos with mising documentation */
  checksumsInfo?: CompositeMedia;
  /** # gdata.* are outside protos with mising documentation */
  objectInfo?: CompositeMedia;
}

export const DiffUploadRequest: Schema.Schema<DiffUploadRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectVersion: Schema.optional(Schema.String),
      checksumsInfo: Schema.optional(CompositeMedia),
      objectInfo: Schema.optional(CompositeMedia),
    }),
  ).annotate({
    identifier: "DiffUploadRequest",
  }) as any as Schema.Schema<DiffUploadRequest>;

export interface Media {
  /** # gdata.* are outside protos with mising documentation */
  compositeMedia?: Array<CompositeMedia>;
  /** # gdata.* are outside protos with mising documentation */
  filename?: string;
  /** # gdata.* are outside protos with mising documentation */
  algorithm?: string;
  /** # gdata.* are outside protos with mising documentation */
  blobRef?: string;
  /** # gdata.* are outside protos with mising documentation */
  inline?: string;
  /** # gdata.* are outside protos with mising documentation */
  objectId?: ObjectId;
  /** # gdata.* are outside protos with mising documentation */
  isPotentialRetry?: boolean;
  /** # gdata.* are outside protos with mising documentation */
  timestamp?: string;
  /** # gdata.* are outside protos with mising documentation */
  referenceType?:
    | "PATH"
    | "BLOB_REF"
    | "INLINE"
    | "GET_MEDIA"
    | "COMPOSITE_MEDIA"
    | "BIGSTORE_REF"
    | "DIFF_VERSION_RESPONSE"
    | "DIFF_CHECKSUMS_RESPONSE"
    | "DIFF_DOWNLOAD_RESPONSE"
    | "DIFF_UPLOAD_REQUEST"
    | "DIFF_UPLOAD_RESPONSE"
    | "COSMO_BINARY_REFERENCE"
    | "ARBITRARY_BYTES"
    | (string & {});
  /** # gdata.* are outside protos with mising documentation */
  sha1Hash?: string;
  /** # gdata.* are outside protos with mising documentation */
  contentType?: string;
  /** # gdata.* are outside protos with mising documentation */
  diffChecksumsResponse?: DiffChecksumsResponse;
  /** # gdata.* are outside protos with mising documentation */
  sha256Hash?: string;
  /** # gdata.* are outside protos with mising documentation */
  diffDownloadResponse?: DiffDownloadResponse;
  /** # gdata.* are outside protos with mising documentation */
  token?: string;
  /** # gdata.* are outside protos with mising documentation */
  mediaId?: string;
  /** # gdata.* are outside protos with mising documentation */
  contentTypeInfo?: ContentTypeInfo;
  /** # gdata.* are outside protos with mising documentation */
  downloadParameters?: DownloadParameters;
  /** # gdata.* are outside protos with mising documentation */
  blobstore2Info?: Blobstore2Info;
  /** # gdata.* are outside protos with mising documentation */
  hashVerified?: boolean;
  /** # gdata.* are outside protos with mising documentation */
  hash?: string;
  /** # gdata.* are outside protos with mising documentation */
  crc32cHash?: number;
  /** # gdata.* are outside protos with mising documentation */
  diffVersionResponse?: DiffVersionResponse;
  /** # gdata.* are outside protos with mising documentation */
  md5Hash?: string;
  /** # gdata.* are outside protos with mising documentation */
  path?: string;
  /** # gdata.* are outside protos with mising documentation */
  cosmoBinaryReference?: string;
  /** # gdata.* are outside protos with mising documentation */
  length?: string;
  /** # gdata.* are outside protos with mising documentation */
  bigstoreObjectRef?: string;
  /** # gdata.* are outside protos with mising documentation */
  diffUploadResponse?: DiffUploadResponse;
  /** # gdata.* are outside protos with mising documentation */
  diffUploadRequest?: DiffUploadRequest;
}

export const Media: Schema.Schema<Media> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      compositeMedia: Schema.optional(Schema.Array(CompositeMedia)),
      filename: Schema.optional(Schema.String),
      algorithm: Schema.optional(Schema.String),
      blobRef: Schema.optional(Schema.String),
      inline: Schema.optional(Schema.String),
      objectId: Schema.optional(ObjectId),
      isPotentialRetry: Schema.optional(Schema.Boolean),
      timestamp: Schema.optional(Schema.String),
      referenceType: Schema.optional(Schema.String),
      sha1Hash: Schema.optional(Schema.String),
      contentType: Schema.optional(Schema.String),
      diffChecksumsResponse: Schema.optional(DiffChecksumsResponse),
      sha256Hash: Schema.optional(Schema.String),
      diffDownloadResponse: Schema.optional(DiffDownloadResponse),
      token: Schema.optional(Schema.String),
      mediaId: Schema.optional(Schema.String),
      contentTypeInfo: Schema.optional(ContentTypeInfo),
      downloadParameters: Schema.optional(DownloadParameters),
      blobstore2Info: Schema.optional(Blobstore2Info),
      hashVerified: Schema.optional(Schema.Boolean),
      hash: Schema.optional(Schema.String),
      crc32cHash: Schema.optional(Schema.Number),
      diffVersionResponse: Schema.optional(DiffVersionResponse),
      md5Hash: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      cosmoBinaryReference: Schema.optional(Schema.String),
      length: Schema.optional(Schema.String),
      bigstoreObjectRef: Schema.optional(Schema.String),
      diffUploadResponse: Schema.optional(DiffUploadResponse),
      diffUploadRequest: Schema.optional(DiffUploadRequest),
    }),
  ).annotate({ identifier: "Media" }) as any as Schema.Schema<Media>;

export interface CaseClassification {
  /** A display name for the classification. The display name is not static and can change. To uniquely and consistently identify classifications, use the `CaseClassification.id` field. */
  displayName?: string;
  /** The full product the classification corresponds to. */
  product?: Product;
  /** The unique ID for a classification. Must be specified for case creation. To retrieve valid classification IDs for case creation, use `caseClassifications.search`. Classification IDs returned by `caseClassifications.search` are guaranteed to be valid for at least 6 months. If a given classification is deactiveated, it will immediately stop being returned. After 6 months, `case.create` requests using the classification ID will fail. */
  id?: string;
}

export const CaseClassification: Schema.Schema<CaseClassification> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      product: Schema.optional(Product),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CaseClassification",
  }) as any as Schema.Schema<CaseClassification>;

export interface Case {
  /** Output only. The time this case was last updated. */
  updateTime?: string;
  /** The user who created the case. Note: The name and email will be obfuscated if the case was created by Google Support. */
  creator?: Actor;
  /** Whether the case is currently escalated. */
  escalated?: boolean;
  /** The email addresses to receive updates on this case. */
  subscriberEmailAddresses?: Array<string>;
  /** Whether this case was created for internal API testing and should not be acted on by the support team. */
  testCase?: boolean;
  /** The timezone of the user who created the support case. It should be in a format IANA recognizes: https://www.iana.org/time-zones. There is no additional validation done by the API. */
  timeZone?: string;
  /** The language the user has requested to receive support in. This should be a BCP 47 language code (e.g., `"en"`, `"zh-CN"`, `"zh-TW"`, `"ja"`, `"ko"`). If no language or an unsupported language is specified, this field defaults to English (en). Language selection during case creation may affect your available support options. For a list of supported languages and their support working hours, see: https://cloud.google.com/support/docs/language-working-hours */
  languageCode?: string;
  /** The priority of this case. */
  priority?:
    | "PRIORITY_UNSPECIFIED"
    | "P0"
    | "P1"
    | "P2"
    | "P3"
    | "P4"
    | (string & {});
  /** Identifier. The resource name for the case. */
  name?: string;
  /** REMOVED. The severity of this case. Use priority instead. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "S0"
    | "S1"
    | "S2"
    | "S3"
    | "S4"
    | (string & {});
  /** The short summary of the issue reported in this case. */
  displayName?: string;
  /** Output only. The time this case was created. */
  createTime?: string;
  /** A user-supplied email address to send case update notifications for. This should only be used in BYOID flows, where we cannot infer the user's email address directly from their EUCs. */
  contactEmail?: string;
  /** The issue classification applicable to this case. */
  classification?: CaseClassification;
  /** Output only. The current status of the support case. */
  state?:
    | "STATE_UNSPECIFIED"
    | "NEW"
    | "IN_PROGRESS_GOOGLE_SUPPORT"
    | "ACTION_REQUIRED"
    | "SOLUTION_PROVIDED"
    | "CLOSED"
    | (string & {});
  /** A broad description of the issue. */
  description?: string;
}

export const Case: Schema.Schema<Case> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updateTime: Schema.optional(Schema.String),
      creator: Schema.optional(Actor),
      escalated: Schema.optional(Schema.Boolean),
      subscriberEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
      testCase: Schema.optional(Schema.Boolean),
      timeZone: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      priority: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      contactEmail: Schema.optional(Schema.String),
      classification: Schema.optional(CaseClassification),
      state: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Case" }) as any as Schema.Schema<Case>;

export interface ListCasesResponse {
  /** The list of cases associated with the parent after any filters have been applied. */
  cases?: Array<Case>;
  /** A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `cases.list` requests. If unspecified, there are no more results to retrieve. */
  nextPageToken?: string;
}

export const ListCasesResponse: Schema.Schema<ListCasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cases: Schema.optional(Schema.Array(Case)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCasesResponse",
  }) as any as Schema.Schema<ListCasesResponse>;

export interface TextContent {
  /** Content in this field should be rendered and interpreted as-is. */
  plainText?: string;
}

export const TextContent: Schema.Schema<TextContent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      plainText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TextContent",
  }) as any as Schema.Schema<TextContent>;

export interface EmailMessage {
  /** Output only. The full email message body. A best-effort attempt is made to remove extraneous reply threads. */
  bodyContent?: TextContent;
  /** Output only. Email addresses the email was sent to. */
  recipientEmailAddresses?: Array<string>;
  /** Output only. The user or Google Support agent that created this email message. This is inferred from the headers on the email message. */
  actor?: Actor;
  /** Output only. Email addresses CCed on the email. */
  ccEmailAddresses?: Array<string>;
  /** Identifier. Resource name for the email message. */
  name?: string;
  /** Output only. Time when this email message object was created. */
  createTime?: string;
  /** Output only. Subject of the email. */
  subject?: string;
}

export const EmailMessage: Schema.Schema<EmailMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bodyContent: Schema.optional(TextContent),
      recipientEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
      actor: Schema.optional(Actor),
      ccEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      subject: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EmailMessage",
  }) as any as Schema.Schema<EmailMessage>;

export interface Comment {
  /** The full comment body. Maximum of 12800 characters. */
  body?: string;
  /** Output only. DEPRECATED. DO NOT USE. A duplicate of the `body` field. This field is only present for legacy reasons. */
  plainTextBody?: string;
  /** Output only. Identifier. The resource name of the comment. */
  name?: string;
  /** Output only. The time when the comment was created. */
  createTime?: string;
  /** Output only. The user or Google Support agent who created the comment. */
  creator?: Actor;
}

export const Comment: Schema.Schema<Comment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      body: Schema.optional(Schema.String),
      plainTextBody: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      creator: Schema.optional(Actor),
    }),
  ).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface SearchCasesResponse {
  /** The list of cases associated with the parent after any filters have been applied. */
  cases?: Array<Case>;
  /** A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `cases.search` requests. If unspecified, there are no more results to retrieve. */
  nextPageToken?: string;
}

export const SearchCasesResponse: Schema.Schema<SearchCasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cases: Schema.optional(Schema.Array(Case)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchCasesResponse",
  }) as any as Schema.Schema<SearchCasesResponse>;

export interface Attachment {
  /** Output only. The user who uploaded the attachment. Note, the name and email will be obfuscated if the attachment was uploaded by Google support. */
  creator?: Actor;
  /** Output only. The size of the attachment in bytes. */
  sizeBytes?: string;
  /** Output only. Identifier. The resource name of the attachment. */
  name?: string;
  /** Output only. The time at which the attachment was created. */
  createTime?: string;
  /** Output only. The MIME type of the attachment (e.g. text/plain). */
  mimeType?: string;
  /** The filename of the attachment (e.g. `"graph.jpg"`). */
  filename?: string;
}

export const Attachment: Schema.Schema<Attachment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creator: Schema.optional(Actor),
      sizeBytes: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      mimeType: Schema.optional(Schema.String),
      filename: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Attachment" }) as any as Schema.Schema<Attachment>;

export interface CreateAttachmentRequest {
  /** Required. The attachment to be created. */
  attachment?: Attachment;
}

export const CreateAttachmentRequest: Schema.Schema<CreateAttachmentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attachment: Schema.optional(Attachment),
    }),
  ).annotate({
    identifier: "CreateAttachmentRequest",
  }) as any as Schema.Schema<CreateAttachmentRequest>;

export interface ListAttachmentsResponse {
  /** The list of attachments associated with a case. */
  attachments?: Array<Attachment>;
  /** A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `cases.attachments.list` requests. If unspecified, there are no more results to retrieve. */
  nextPageToken?: string;
}

export const ListAttachmentsResponse: Schema.Schema<ListAttachmentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attachments: Schema.optional(Schema.Array(Attachment)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAttachmentsResponse",
  }) as any as Schema.Schema<ListAttachmentsResponse>;

export interface Escalation {
  /** Required. The reason why the Case is being escalated. */
  reason?:
    | "REASON_UNSPECIFIED"
    | "RESOLUTION_TIME"
    | "TECHNICAL_EXPERTISE"
    | "BUSINESS_IMPACT"
    | (string & {});
  /** Required. A free text description to accompany the `reason` field above. Provides additional context on why the case is being escalated. */
  justification?: string;
}

export const Escalation: Schema.Schema<Escalation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      justification: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Escalation" }) as any as Schema.Schema<Escalation>;

export interface EscalateCaseRequest {
  /** The escalation information to be sent with the escalation request. */
  escalation?: Escalation;
}

export const EscalateCaseRequest: Schema.Schema<EscalateCaseRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      escalation: Schema.optional(Escalation),
    }),
  ).annotate({
    identifier: "EscalateCaseRequest",
  }) as any as Schema.Schema<EscalateCaseRequest>;

export interface FeedItem {
  /** Output only. An attachment attached to the case. */
  attachment?: Attachment;
  /** Output only. A comment added to the case. */
  comment?: Comment;
  /** Output only. A deleted attachment that used to be associated with the support case. */
  deletedAttachment?: Attachment;
  /** Output only. Time corresponding to the event of this item. */
  eventTime?: string;
  /** Output only. An email message received in reply to the case. */
  emailMessage?: EmailMessage;
}

export const FeedItem: Schema.Schema<FeedItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attachment: Schema.optional(Attachment),
      comment: Schema.optional(Comment),
      deletedAttachment: Schema.optional(Attachment),
      eventTime: Schema.optional(Schema.String),
      emailMessage: Schema.optional(EmailMessage),
    }),
  ).annotate({ identifier: "FeedItem" }) as any as Schema.Schema<FeedItem>;

export interface ShowFeedResponse {
  /** The list of feed items associated with the given Case. */
  feedItems?: Array<FeedItem>;
  /** A token to retrieve the next page of results. This should be set in the `page_token` field of subsequent `ShowFeedRequests`. If unspecified, there are no more results to retrieve. */
  nextPageToken?: string;
}

export const ShowFeedResponse: Schema.Schema<ShowFeedResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      feedItems: Schema.optional(Schema.Array(FeedItem)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShowFeedResponse",
  }) as any as Schema.Schema<ShowFeedResponse>;

export interface ListCommentsResponse {
  /** List of the comments associated with the case. */
  comments?: Array<Comment>;
  /** A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `cases.comments.list` requests. If unspecified, there are no more results to retrieve. */
  nextPageToken?: string;
}

export const ListCommentsResponse: Schema.Schema<ListCommentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      comments: Schema.optional(Schema.Array(Comment)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCommentsResponse",
  }) as any as Schema.Schema<ListCommentsResponse>;

export interface SearchCaseClassificationsResponse {
  /** The classifications retrieved. */
  caseClassifications?: Array<CaseClassification>;
  /** A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `caseClassifications.list` requests. If unspecified, there are no more results to retrieve. */
  nextPageToken?: string;
}

export const SearchCaseClassificationsResponse: Schema.Schema<SearchCaseClassificationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      caseClassifications: Schema.optional(Schema.Array(CaseClassification)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchCaseClassificationsResponse",
  }) as any as Schema.Schema<SearchCaseClassificationsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface DownloadMediaRequest {
  /** The name of the file attachment to download. */
  name: string;
}

export const DownloadMediaRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}/attachments/{attachmentsId}:download",
  }),
  svc,
) as unknown as Schema.Schema<DownloadMediaRequest>;

export type DownloadMediaResponse = Media;
export const DownloadMediaResponse = /*@__PURE__*/ /*#__PURE__*/ Media;

export type DownloadMediaError = DefaultErrors;

/** Download a file attached to a case. When this endpoint is called, no "response body" will be returned. Instead, the attachment's blob will be returned. Note: HTTP requests must append "?alt=media" to the URL. EXAMPLES: cURL: ```shell name="projects/some-project/cases/43594844/attachments/0674M00000WijAnZAJ" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$name:download?alt=media" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.media().download( name="projects/some-project/cases/43595344/attachments/0684M00000Pw6pHQAR" ) request.uri = request.uri.split("?")[0] + "?alt=media" print(request.execute()) ``` */
export const downloadMedia: API.OperationMethod<
  DownloadMediaRequest,
  DownloadMediaResponse,
  DownloadMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DownloadMediaRequest,
  output: DownloadMediaResponse,
  errors: [],
}));

export interface UploadMediaRequest {
  /** Required. The name of the case or Cloud resource to which the attachment should be attached. */
  parent: string;
  /** Request body */
  body?: CreateAttachmentRequest;
}

export const UploadMediaRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateAttachmentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}/attachments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse = Attachment;
export const UploadMediaResponse = /*@__PURE__*/ /*#__PURE__*/ Attachment;

export type UploadMediaError = DefaultErrors;

/** Create a file attachment on a case or Cloud resource. The attachment must have the following fields set: `filename`. EXAMPLES: cURL: ```shell echo "This text is in a file I'm uploading using CSAPI." \ > "./example_file.txt" case="projects/some-project/cases/43594844" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --data-binary @"./example_file.txt" \ "https://cloudsupport.googleapis.com/upload/v2beta/$case/attachments?attachment.filename=uploaded_via_curl.txt" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) file_path = "./example_file.txt" with open(file_path, "w") as file: file.write( "This text is inside a file I'm going to upload using the Cloud Support API.", ) request = supportApiService.media().upload( parent="projects/some-project/cases/43595344", media_body=file_path ) request.uri = request.uri.split("?")[0] + "?attachment.filename=uploaded_via_python.txt" print(request.execute()) ``` */
export const uploadMedia: API.OperationMethod<
  UploadMediaRequest,
  UploadMediaResponse,
  UploadMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UploadMediaRequest,
  output: UploadMediaResponse,
  errors: [],
}));

export interface CreateCasesRequest {
  /** Required. The name of the parent under which the case should be created. */
  parent: string;
  /** Request body */
  body?: Case;
}

export const CreateCasesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Case).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2beta/{v2betaId}/{v2betaId1}/cases",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateCasesRequest>;

export type CreateCasesResponse = Case;
export const CreateCasesResponse = /*@__PURE__*/ /*#__PURE__*/ Case;

export type CreateCasesError = DefaultErrors;

/** Create a new case and associate it with a parent. It must have the following fields set: `display_name`, `description`, `classification`, and `priority`. If you're just testing the API and don't want to route your case to an agent, set `testCase=true`. EXAMPLES: cURL: ```shell parent="projects/some-project" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header 'Content-Type: application/json' \ --data '{ "display_name": "Test case created by me.", "description": "a random test case, feel free to close", "classification": { "id": "100IK2AKCLHMGRJ9CDGMOCGP8DM6UTB4BT262T31BT1M2T31DHNMENPO6KS36CPJ786L2TBFEHGN6NPI64R3CDHN8880G08I1H3MURR7DHII0GRCDTQM8" }, "time_zone": "-07:00", "subscriber_email_addresses": [ "foo@domain.com", "bar@domain.com" ], "testCase": true, "priority": "P3" }' \ "https://cloudsupport.googleapis.com/v2/$parent/cases" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().create( parent="projects/some-project", body={ "displayName": "A Test Case", "description": "This is a test case.", "testCase": True, "priority": "P2", "classification": { "id": "100IK2AKCLHMGRJ9CDGMOCGP8DM6UTB4BT262T31BT1M2T31DHNMENPO6KS36CPJ786L2TBFEHGN6NPI64R3CDHN8880G08I1H3MURR7DHII0GRCDTQM8" }, }, ) print(request.execute()) ``` */
export const createCases: API.OperationMethod<
  CreateCasesRequest,
  CreateCasesResponse,
  CreateCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCasesRequest,
  output: CreateCasesResponse,
  errors: [],
}));

export interface EscalateCasesRequest {
  /** Required. The name of the case to be escalated. */
  name: string;
  /** Request body */
  body?: EscalateCaseRequest;
}

export const EscalateCasesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EscalateCaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}:escalate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<EscalateCasesRequest>;

export type EscalateCasesResponse = Case;
export const EscalateCasesResponse = /*@__PURE__*/ /*#__PURE__*/ Case;

export type EscalateCasesError = DefaultErrors;

/** Escalate a case, starting the Google Cloud Support escalation management process. This operation is only available for some support services. Go to https://cloud.google.com/support and look for 'Technical support escalations' in the feature list to find out which ones let you do that. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43595344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header "Content-Type: application/json" \ --data '{ "escalation": { "reason": "BUSINESS_IMPACT", "justification": "This is a test escalation." } }' \ "https://cloudsupport.googleapis.com/v2/$case:escalate" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().escalate( name="projects/some-project/cases/43595344", body={ "escalation": { "reason": "BUSINESS_IMPACT", "justification": "This is a test escalation.", }, }, ) print(request.execute()) ``` */
export const escalateCases: API.OperationMethod<
  EscalateCasesRequest,
  EscalateCasesResponse,
  EscalateCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EscalateCasesRequest,
  output: EscalateCasesResponse,
  errors: [],
}));

export interface ShowFeedCasesRequest {
  /** Required. The resource name of the case for which feed items should be listed. */
  parent: string;
  /** Optional. Field to order feed items by, followed by `asc` or `desc` postfix. The only valid field is `creation_time`. This list is case-insensitive, default sorting order is ascending, and the redundant space characters are insignificant. Example: `creation_time desc` */
  orderBy?: string;
  /** Optional. The maximum number of feed items fetched with each request. */
  pageSize?: number;
  /** Optional. A token identifying the page of results to return. If unspecified, it retrieves the first page. */
  pageToken?: string;
}

export const ShowFeedCasesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}:showFeed",
  }),
  svc,
) as unknown as Schema.Schema<ShowFeedCasesRequest>;

export type ShowFeedCasesResponse = ShowFeedResponse;
export const ShowFeedCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ShowFeedResponse;

export type ShowFeedCasesError = DefaultErrors;

/** Show items in the feed of this case, including case emails, attachments, and comments. */
export const showFeedCases: API.PaginatedOperationMethod<
  ShowFeedCasesRequest,
  ShowFeedCasesResponse,
  ShowFeedCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ShowFeedCasesRequest,
  output: ShowFeedCasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListCasesRequest {
  /** The maximum number of cases fetched with each request. Defaults to 10. */
  pageSize?: number;
  /** The product line to request cases for. If unspecified, only Google Cloud cases will be returned. */
  productLine?:
    | "PRODUCT_LINE_UNSPECIFIED"
    | "GOOGLE_CLOUD"
    | "GOOGLE_MAPS"
    | (string & {});
  /** Required. The name of a parent to list cases under. */
  parent: string;
  /** A token identifying the page of results to return. If unspecified, the first page is retrieved. */
  pageToken?: string;
  /** An expression used to filter cases. If it's an empty string, then no filtering happens. Otherwise, the endpoint returns the cases that match the filter. Expressions use the following fields separated by `AND` and specified with `=`: - `state`: Can be `OPEN` or `CLOSED`. - `priority`: Can be `P0`, `P1`, `P2`, `P3`, or `P4`. You can specify multiple values for priority using the `OR` operator. For example, `priority=P1 OR priority=P2`. - `creator.email`: The email address of the case creator. EXAMPLES: - `state=CLOSED` - `state=OPEN AND creator.email="tester@example.com"` - `state=OPEN AND (priority=P0 OR priority=P1)` */
  filter?: string;
}

export const ListCasesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  productLine: Schema.optional(Schema.String).pipe(T.HttpQuery("productLine")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta/{v2betaId}/{v2betaId1}/cases" }),
  svc,
) as unknown as Schema.Schema<ListCasesRequest>;

export type ListCasesResponse_Op = ListCasesResponse;
export const ListCasesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListCasesResponse;

export type ListCasesError = DefaultErrors;

/** Retrieve all cases under a parent, but not its children. For example, listing cases under an organization only returns the cases that are directly parented by that organization. To retrieve cases under an organization and its projects, use `cases.search`. EXAMPLES: cURL: ```shell parent="projects/some-project" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$parent/cases" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().list(parent="projects/some-project") print(request.execute()) ``` */
export const listCases: API.PaginatedOperationMethod<
  ListCasesRequest,
  ListCasesResponse_Op,
  ListCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCasesRequest,
  output: ListCasesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CloseCasesRequest {
  /** Required. The name of the case to close. */
  name: string;
  /** Request body */
  body?: CloseCaseRequest;
}

export const CloseCasesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CloseCaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}:close",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CloseCasesRequest>;

export type CloseCasesResponse = Case;
export const CloseCasesResponse = /*@__PURE__*/ /*#__PURE__*/ Case;

export type CloseCasesError = DefaultErrors;

/** Close a case. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43595344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case:close" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().close( name="projects/some-project/cases/43595344" ) print(request.execute()) ``` */
export const closeCases: API.OperationMethod<
  CloseCasesRequest,
  CloseCasesResponse,
  CloseCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CloseCasesRequest,
  output: CloseCasesResponse,
  errors: [],
}));

export interface GetCasesRequest {
  /** Required. The full name of a case to be retrieved. */
  name: string;
}

export const GetCasesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetCasesRequest>;

export type GetCasesResponse = Case;
export const GetCasesResponse = /*@__PURE__*/ /*#__PURE__*/ Case;

export type GetCasesError = DefaultErrors;

/** Retrieve a case. EXAMPLES: cURL: ```shell case="projects/some-project/cases/16033687" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().get( name="projects/some-project/cases/43595344", ) print(request.execute()) ``` */
export const getCases: API.OperationMethod<
  GetCasesRequest,
  GetCasesResponse,
  GetCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCasesRequest,
  output: GetCasesResponse,
  errors: [],
}));

export interface SearchCasesRequest {
  /** The name of the parent resource to search for cases under. */
  parent?: string;
  /** The maximum number of cases fetched with each request. The default page size is 10. */
  pageSize?: number;
  /** A token identifying the page of results to return. If unspecified, the first page is retrieved. */
  pageToken?: string;
  /** An expression used to filter cases. Expressions use the following fields separated by `AND` and specified with `=`: - `organization`: An organization name in the form `organizations/`. - `project`: A project name in the form `projects/`. - `state`: Can be `OPEN` or `CLOSED`. - `priority`: Can be `P0`, `P1`, `P2`, `P3`, or `P4`. You can specify multiple values for priority using the `OR` operator. For example, `priority=P1 OR priority=P2`. - `creator.email`: The email address of the case creator. You must specify either `organization` or `project`. To search across `displayName`, `description`, and comments, use a global restriction with no keyword or operator. For example, `"my search"`. To search only cases updated after a certain date, use `update_time` restricted with that particular date, time, and timezone in ISO datetime format. For example, `update_time>"2020-01-01T00:00:00-05:00"`. `update_time` only supports the greater than operator (`>`). Examples: - `organization="organizations/123456789"` - `project="projects/my-project-id"` - `project="projects/123456789"` - `organization="organizations/123456789" AND state=CLOSED` - `project="projects/my-project-id" AND creator.email="tester@example.com"` - `project="projects/my-project-id" AND (priority=P0 OR priority=P1)` */
  query?: string;
}

export const SearchCasesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta/cases:search" }),
  svc,
) as unknown as Schema.Schema<SearchCasesRequest>;

export type SearchCasesResponse_Op = SearchCasesResponse;
export const SearchCasesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ SearchCasesResponse;

export type SearchCasesError = DefaultErrors;

/** Search for cases using a query. EXAMPLES: cURL: ```shell parent="projects/some-project" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$parent/cases:search" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().search( parent="projects/some-project", query="state=OPEN" ) print(request.execute()) ``` */
export const searchCases: API.PaginatedOperationMethod<
  SearchCasesRequest,
  SearchCasesResponse_Op,
  SearchCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchCasesRequest,
  output: SearchCasesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchCasesRequest {
  /** A list of attributes of the case that should be updated. Supported values are `priority`, `display_name`, and `subscriber_email_addresses`. If no fields are specified, all supported fields are updated. Be careful - if you do not provide a field mask, then you might accidentally clear some fields. For example, if you leave the field mask empty and do not provide a value for `subscriber_email_addresses`, then `subscriber_email_addresses` is updated to empty. */
  updateMask?: string;
  /** Identifier. The resource name for the case. */
  name: string;
  /** Request body */
  body?: Case;
}

export const PatchCasesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Case).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchCasesRequest>;

export type PatchCasesResponse = Case;
export const PatchCasesResponse = /*@__PURE__*/ /*#__PURE__*/ Case;

export type PatchCasesError = DefaultErrors;

/** Update a case. Only some fields can be updated. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43595344" curl \ --request PATCH \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header "Content-Type: application/json" \ --data '{ "priority": "P1" }' \ "https://cloudsupport.googleapis.com/v2/$case?updateMask=priority" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().patch( name="projects/some-project/cases/43112854", body={ "displayName": "This is Now a New Title", "priority": "P2", }, ) print(request.execute()) ``` */
export const patchCases: API.OperationMethod<
  PatchCasesRequest,
  PatchCasesResponse,
  PatchCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCasesRequest,
  output: PatchCasesResponse,
  errors: [],
}));

export interface ListCasesAttachmentsRequest {
  /** Required. The name of the case for which attachments should be listed. */
  parent: string;
  /** The maximum number of attachments fetched with each request. If not provided, the default is 10. The maximum page size that will be returned is 100. The size of each page can be smaller than the requested page size and can include zero. For example, you could request 100 attachments on one page, receive 0, and then on the next page, receive 90. */
  pageSize?: number;
  /** A token identifying the page of results to return. If unspecified, the first page is retrieved. */
  pageToken?: string;
}

export const ListCasesAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}/attachments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCasesAttachmentsRequest>;

export type ListCasesAttachmentsResponse = ListAttachmentsResponse;
export const ListCasesAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAttachmentsResponse;

export type ListCasesAttachmentsError = DefaultErrors;

/** List all the attachments associated with a support case. EXAMPLES: cURL: ```shell case="projects/some-project/cases/23598314" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case/attachments" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = ( supportApiService.cases() .attachments() .list(parent="projects/some-project/cases/43595344") ) print(request.execute()) ``` */
export const listCasesAttachments: API.PaginatedOperationMethod<
  ListCasesAttachmentsRequest,
  ListCasesAttachmentsResponse,
  ListCasesAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCasesAttachmentsRequest,
  output: ListCasesAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCasesAttachmentsRequest {
  /** Required. The name of the attachment to get. */
  name: string;
}

export const GetCasesAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}/attachments/{attachmentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCasesAttachmentsRequest>;

export type GetCasesAttachmentsResponse = Attachment;
export const GetCasesAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Attachment;

export type GetCasesAttachmentsError = DefaultErrors;

/** Retrieve an attachment associated with a support case. EXAMPLES: cURL: ```shell attachment="projects/some-project/cases/23598314/attachments/0684M00000P3h1fQAB" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$attachment" ``` Python: ```python import googleapiclient.discovery api_version = "v2beta" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = ( supportApiService.cases() .attachments() .get(name="projects/some-project/cases/43595344/attachments/0684M00000P3h1fQAB") ) print(request.execute()) ``` */
export const getCasesAttachments: API.OperationMethod<
  GetCasesAttachmentsRequest,
  GetCasesAttachmentsResponse,
  GetCasesAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCasesAttachmentsRequest,
  output: GetCasesAttachmentsResponse,
  errors: [],
}));

export interface GetCasesCommentsRequest {
  /** Required. The name of the comment to retrieve. */
  name: string;
}

export const GetCasesCommentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}/comments/{commentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCasesCommentsRequest>;

export type GetCasesCommentsResponse = Comment;
export const GetCasesCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type GetCasesCommentsError = DefaultErrors;

/** Retrieve a comment. EXAMPLES: cURL: ```shell comment="projects/some-project/cases/43595344/comments/234567890" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$comment" ``` Python: ```python import googleapiclient.discovery api_version = "v2beta" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().comments().get( name="projects/some-project/cases/43595344/comments/234567890", ) print(request.execute()) ``` */
export const getCasesComments: API.OperationMethod<
  GetCasesCommentsRequest,
  GetCasesCommentsResponse,
  GetCasesCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCasesCommentsRequest,
  output: GetCasesCommentsResponse,
  errors: [],
}));

export interface ListCasesCommentsRequest {
  /** Required. The name of the case for which to list comments. */
  parent: string;
  /** The maximum number of comments to fetch. Defaults to 10. */
  pageSize?: number;
  /** A token identifying the page of results to return. If unspecified, the first page is returned. */
  pageToken?: string;
}

export const ListCasesCommentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}/comments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCasesCommentsRequest>;

export type ListCasesCommentsResponse = ListCommentsResponse;
export const ListCasesCommentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCommentsResponse;

export type ListCasesCommentsError = DefaultErrors;

/** List all the comments associated with a case. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43595344" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case/comments" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = ( supportApiService.cases() .comments() .list(parent="projects/some-project/cases/43595344") ) print(request.execute()) ``` */
export const listCasesComments: API.PaginatedOperationMethod<
  ListCasesCommentsRequest,
  ListCasesCommentsResponse,
  ListCasesCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCasesCommentsRequest,
  output: ListCasesCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateCasesCommentsRequest {
  /** Required. The name of the case to which the comment should be added. */
  parent: string;
  /** Request body */
  body?: Comment;
}

export const CreateCasesCommentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Comment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2beta/{v2betaId}/{v2betaId1}/cases/{casesId}/comments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCasesCommentsRequest>;

export type CreateCasesCommentsResponse = Comment;
export const CreateCasesCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type CreateCasesCommentsError = DefaultErrors;

/** Add a new comment to a case. The comment must have the following fields set: `body`. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43591344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header 'Content-Type: application/json' \ --data '{ "body": "This is a test comment." }' \ "https://cloudsupport.googleapis.com/v2/$case/comments" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = ( supportApiService.cases() .comments() .create( parent="projects/some-project/cases/43595344", body={"body": "This is a test comment."}, ) ) print(request.execute()) ``` */
export const createCasesComments: API.OperationMethod<
  CreateCasesCommentsRequest,
  CreateCasesCommentsResponse,
  CreateCasesCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCasesCommentsRequest,
  output: CreateCasesCommentsResponse,
  errors: [],
}));

export interface SearchCaseClassificationsRequest {
  /** The maximum number of classifications fetched with each request. */
  pageSize?: number;
  /** A token identifying the page of results to return. If unspecified, the first page is retrieved. */
  pageToken?: string;
  /** The product line of the Product. */
  "product.productLine"?:
    | "PRODUCT_LINE_UNSPECIFIED"
    | "GOOGLE_CLOUD"
    | "GOOGLE_MAPS"
    | (string & {});
  /** An expression used to filter case classifications. If it's an empty string, then no filtering happens. Otherwise, case classifications will be returned that match the filter. */
  query?: string;
}

export const SearchCaseClassificationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    "product.productLine": Schema.optional(Schema.String).pipe(
      T.HttpQuery("product.productLine"),
    ),
    query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  }).pipe(
    T.Http({ method: "GET", path: "v2beta/caseClassifications:search" }),
    svc,
  ) as unknown as Schema.Schema<SearchCaseClassificationsRequest>;

export type SearchCaseClassificationsResponse_Op =
  SearchCaseClassificationsResponse;
export const SearchCaseClassificationsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ SearchCaseClassificationsResponse;

export type SearchCaseClassificationsError = DefaultErrors;

/** Retrieve valid classifications to use when creating a support case. Classifications are hierarchical. Each classification is a string containing all levels of the hierarchy separated by `" > "`. For example, `"Technical Issue > Compute > Compute Engine"`. Classification IDs returned by this endpoint are valid for at least six months. When a classification is deactivated, this endpoint immediately stops returning it. After six months, `case.create` requests using the classification will fail. EXAMPLES: cURL: ```shell curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ 'https://cloudsupport.googleapis.com/v2/caseClassifications:search?query=display_name:"*Compute%20Engine*"' ``` Python: ```python import googleapiclient.discovery supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version="v2", discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version=v2", ) request = supportApiService.caseClassifications().search( query='display_name:"*Compute Engine*"' ) print(request.execute()) ``` */
export const searchCaseClassifications: API.PaginatedOperationMethod<
  SearchCaseClassificationsRequest,
  SearchCaseClassificationsResponse_Op,
  SearchCaseClassificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchCaseClassificationsRequest,
  output: SearchCaseClassificationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
