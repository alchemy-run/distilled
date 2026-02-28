// ==========================================================================
// Google Play Grouping API (playgrouping v1alpha1)
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
  name: "playgrouping",
  version: "v1alpha1",
  rootUrl: "https://playgrouping.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface VerifyTokenRequest {
  /** Required. Persona represented by the token. Format: personas/{persona} */
  persona?: string;
}

export const VerifyTokenRequest: Schema.Schema<VerifyTokenRequest> = Schema.suspend(() => Schema.Struct({
  persona: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyTokenRequest" }) as any as Schema.Schema<VerifyTokenRequest>;

export interface VerifyTokenResponse {
}

export const VerifyTokenResponse: Schema.Schema<VerifyTokenResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "VerifyTokenResponse" }) as any as Schema.Schema<VerifyTokenResponse>;

export interface Tag {
  /** A boolean value of the tag. */
  booleanValue?: boolean;
  /** A string value of the tag. */
  stringValue?: string;
  /** A signed 64-bit integer value of the tag. */
  int64Value?: string;
  /** A time value of the tag. */
  timeValue?: string;
  /** Required. Key for the tag. */
  key?: string;
}

export const Tag: Schema.Schema<Tag> = Schema.suspend(() => Schema.Struct({
  booleanValue: Schema.optional(Schema.Boolean),
  stringValue: Schema.optional(Schema.String),
  int64Value: Schema.optional(Schema.String),
  timeValue: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "Tag" }) as any as Schema.Schema<Tag>;

export interface CreateOrUpdateTagsRequest {
  /** Tags to be inserted or updated. */
  tags?: Array<Tag>;
}

export const CreateOrUpdateTagsRequest: Schema.Schema<CreateOrUpdateTagsRequest> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Array(Tag)),
})).annotate({ identifier: "CreateOrUpdateTagsRequest" }) as any as Schema.Schema<CreateOrUpdateTagsRequest>;

export interface CreateOrUpdateTagsResponse {
  /** All requested tags are returned, including pre-existing ones. */
  tags?: Array<Tag>;
}

export const CreateOrUpdateTagsResponse: Schema.Schema<CreateOrUpdateTagsResponse> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Array(Tag)),
})).annotate({ identifier: "CreateOrUpdateTagsResponse" }) as any as Schema.Schema<CreateOrUpdateTagsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Verify an API token by asserting the app and persona it belongs to. The verification is a protection against client-side attacks and will fail if the contents of the token don't match the provided values. A token must be verified before it can be used to manipulate user tags. */
export interface VerifyAppsTokensRequest {
  /** Required. App the token belongs to. Format: apps/{package_name} */
  appPackage: string;
  /** Required. The token to be verified. Format: tokens/{token} */
  token: string;
  /** Request body */
  body?: VerifyTokenRequest;
}

export const VerifyAppsTokensRequest = Schema.Struct({
  appPackage: Schema.String.pipe(T.HttpPath("appPackage")),
  token: Schema.String.pipe(T.HttpPath("token")),
  body: Schema.optional(VerifyTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/apps/{appsId}/tokens/{tokensId}:verify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyAppsTokensRequest>;

export type VerifyAppsTokensResponse = VerifyTokenResponse;
export const VerifyAppsTokensResponse = VerifyTokenResponse;

export type VerifyAppsTokensError = CommonErrors;

export const verifyAppsTokens: API.OperationMethod<VerifyAppsTokensRequest, VerifyAppsTokensResponse, VerifyAppsTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyAppsTokensRequest,
  output: VerifyAppsTokensResponse,
  errors: [],
}));

/** Create or update tags for the user and app that are represented by the given token. */
export interface CreateOrUpdateAppsTokensTagsRequest {
  /** Required. App whose tags are being manipulated. Format: apps/{package_name} */
  appPackage: string;
  /** Required. Token for which the tags are being inserted or updated. Format: tokens/{token} */
  token: string;
  /** Request body */
  body?: CreateOrUpdateTagsRequest;
}

export const CreateOrUpdateAppsTokensTagsRequest = Schema.Struct({
  appPackage: Schema.String.pipe(T.HttpPath("appPackage")),
  token: Schema.String.pipe(T.HttpPath("token")),
  body: Schema.optional(CreateOrUpdateTagsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/apps/{appsId}/tokens/{tokensId}/tags:createOrUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrUpdateAppsTokensTagsRequest>;

export type CreateOrUpdateAppsTokensTagsResponse = CreateOrUpdateTagsResponse;
export const CreateOrUpdateAppsTokensTagsResponse = CreateOrUpdateTagsResponse;

export type CreateOrUpdateAppsTokensTagsError = CommonErrors;

export const createOrUpdateAppsTokensTags: API.OperationMethod<CreateOrUpdateAppsTokensTagsRequest, CreateOrUpdateAppsTokensTagsResponse, CreateOrUpdateAppsTokensTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrUpdateAppsTokensTagsRequest,
  output: CreateOrUpdateAppsTokensTagsResponse,
  errors: [],
}));

