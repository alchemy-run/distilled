// ==========================================================================
// Accelerated Mobile Pages (AMP) URL API (acceleratedmobilepageurl v1)
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
  name: "acceleratedmobilepageurl",
  version: "v1",
  rootUrl: "https://acceleratedmobilepageurl.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface BatchGetAmpUrlsRequest {
  /** List of URLs to look up for the paired AMP URLs. The URLs are case-sensitive. Up to 50 URLs per lookup (see [Usage Limits](/amp/cache/reference/limits)). */
  urls?: Array<string>;
  /** The lookup_strategy being requested. */
  lookupStrategy?: "FETCH_LIVE_DOC" | "IN_INDEX_DOC" | (string & {});
}

export const BatchGetAmpUrlsRequest: Schema.Schema<BatchGetAmpUrlsRequest> = Schema.suspend(() => Schema.Struct({
  urls: Schema.optional(Schema.Array(Schema.String)),
  lookupStrategy: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchGetAmpUrlsRequest" }) as any as Schema.Schema<BatchGetAmpUrlsRequest>;

export interface AmpUrl {
  /** The original non-AMP URL. */
  originalUrl?: string;
  /** The AMP URL pointing to the publisher's web server. */
  ampUrl?: string;
  /** The [AMP Cache URL](/amp/cache/overview#amp-cache-url-format) pointing to the cached document in the Google AMP Cache. */
  cdnAmpUrl?: string;
}

export const AmpUrl: Schema.Schema<AmpUrl> = Schema.suspend(() => Schema.Struct({
  originalUrl: Schema.optional(Schema.String),
  ampUrl: Schema.optional(Schema.String),
  cdnAmpUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "AmpUrl" }) as any as Schema.Schema<AmpUrl>;

export interface AmpUrlError {
  /** The error code of an API call. */
  errorCode?: "ERROR_CODE_UNSPECIFIED" | "INPUT_URL_NOT_FOUND" | "NO_AMP_URL" | "APPLICATION_ERROR" | "URL_IS_VALID_AMP" | "URL_IS_INVALID_AMP" | (string & {});
  /** An optional descriptive error message. */
  errorMessage?: string;
  /** The original non-AMP URL. */
  originalUrl?: string;
}

export const AmpUrlError: Schema.Schema<AmpUrlError> = Schema.suspend(() => Schema.Struct({
  errorCode: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  originalUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "AmpUrlError" }) as any as Schema.Schema<AmpUrlError>;

export interface BatchGetAmpUrlsResponse {
  /** For each URL in BatchAmpUrlsRequest, the URL response. The response might not be in the same order as URLs in the batch request. If BatchAmpUrlsRequest contains duplicate URLs, AmpUrl is generated only once. */
  ampUrls?: Array<AmpUrl>;
  /** The errors for requested URLs that have no AMP URL. */
  urlErrors?: Array<AmpUrlError>;
}

export const BatchGetAmpUrlsResponse: Schema.Schema<BatchGetAmpUrlsResponse> = Schema.suspend(() => Schema.Struct({
  ampUrls: Schema.optional(Schema.Array(AmpUrl)),
  urlErrors: Schema.optional(Schema.Array(AmpUrlError)),
})).annotate({ identifier: "BatchGetAmpUrlsResponse" }) as any as Schema.Schema<BatchGetAmpUrlsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns AMP URL(s) and equivalent [AMP Cache URL(s)](/amp/cache/overview#amp-cache-url-format). */
export interface BatchGetAmpUrlsRequest_Op {
  /** Request body */
  body?: BatchGetAmpUrlsRequest;
}

export const BatchGetAmpUrlsRequest_Op = Schema.Struct({
  body: Schema.optional(BatchGetAmpUrlsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/ampUrls:batchGet", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchGetAmpUrlsRequest_Op>;

export type BatchGetAmpUrlsResponse_Op = BatchGetAmpUrlsResponse;
export const BatchGetAmpUrlsResponse_Op = BatchGetAmpUrlsResponse;

export type BatchGetAmpUrlsError = CommonErrors;

export const batchGetAmpUrls: API.OperationMethod<BatchGetAmpUrlsRequest_Op, BatchGetAmpUrlsResponse_Op, BatchGetAmpUrlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetAmpUrlsRequest_Op,
  output: BatchGetAmpUrlsResponse_Op,
  errors: [],
}));

