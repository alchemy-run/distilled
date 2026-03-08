/**
 * Cloudflare CUSTOM-PAGES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service custom-pages
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// CustomPage
// =============================================================================

export interface GetCustomPageRequest {
  identifier:
    | "1000_errors"
    | "500_errors"
    | "basic_challenge"
    | "country_challenge"
    | "ip_block"
    | "managed_challenge"
    | "ratelimit_block"
    | "under_attack"
    | "waf_block"
    | "waf_challenge";
}

export const GetCustomPageRequest = Schema.Struct({
  identifier: Schema.Literals([
    "1000_errors",
    "500_errors",
    "basic_challenge",
    "country_challenge",
    "ip_block",
    "managed_challenge",
    "ratelimit_block",
    "under_attack",
    "waf_block",
    "waf_challenge",
  ]).pipe(T.HttpPath("identifier")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/custom_pages/{identifier}",
  }),
) as unknown as Schema.Schema<GetCustomPageRequest>;

export interface GetCustomPageResponse {
  id?: string;
  createdOn?: string;
  description?: string;
  modifiedOn?: string;
  previewTarget?: string;
  requiredTokens?: string[];
  /** The custom page state. */
  state?: "default" | "customized";
  /** The URL associated with the custom page. */
  url?: string;
}

export const GetCustomPageResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  previewTarget: Schema.optional(Schema.String),
  requiredTokens: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.Literals(["default", "customized"])),
  url: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    description: "description",
    modifiedOn: "modified_on",
    previewTarget: "preview_target",
    requiredTokens: "required_tokens",
    state: "state",
    url: "url",
  }),
) as unknown as Schema.Schema<GetCustomPageResponse>;

export type GetCustomPageError = DefaultErrors;

export const getCustomPage: API.OperationMethod<
  GetCustomPageRequest,
  GetCustomPageResponse,
  GetCustomPageError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCustomPageRequest,
  output: GetCustomPageResponse,
  errors: [],
}));

export interface ListCustomPagesRequest {}

export const ListCustomPagesRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/custom_pages",
  }),
) as unknown as Schema.Schema<ListCustomPagesRequest>;

export type ListCustomPagesResponse = {
  id?: string;
  createdOn?: string;
  description?: string;
  modifiedOn?: string;
  previewTarget?: string;
  requiredTokens?: string[];
  state?: "default" | "customized";
  url?: string;
}[];

export const ListCustomPagesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    previewTarget: Schema.optional(Schema.String),
    requiredTokens: Schema.optional(Schema.Array(Schema.String)),
    state: Schema.optional(Schema.Literals(["default", "customized"])),
    url: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      description: "description",
      modifiedOn: "modified_on",
      previewTarget: "preview_target",
      requiredTokens: "required_tokens",
      state: "state",
      url: "url",
    }),
  ),
) as unknown as Schema.Schema<ListCustomPagesResponse>;

export type ListCustomPagesError = DefaultErrors;

export const listCustomPages: API.OperationMethod<
  ListCustomPagesRequest,
  ListCustomPagesResponse,
  ListCustomPagesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCustomPagesRequest,
  output: ListCustomPagesResponse,
  errors: [],
}));

export interface PutCustomPageRequest {
  identifier:
    | "1000_errors"
    | "500_errors"
    | "basic_challenge"
    | "country_challenge"
    | "ip_block"
    | "managed_challenge"
    | "ratelimit_block"
    | "under_attack"
    | "waf_block"
    | "waf_challenge";
  /** Path param: The Account ID to use for this endpoint. Mutually exclusive with the Zone ID. */
  accountId?: string;
  /** Path param: The Zone ID to use for this endpoint. Mutually exclusive with the Account ID. */
  zoneId?: string;
  /** Body param: The custom page state. */
  state: "default" | "customized";
  /** Body param: The URL associated with the custom page. */
  url: string;
}

export const PutCustomPageRequest = Schema.Struct({
  identifier: Schema.Literals([
    "1000_errors",
    "500_errors",
    "basic_challenge",
    "country_challenge",
    "ip_block",
    "managed_challenge",
    "ratelimit_block",
    "under_attack",
    "waf_block",
    "waf_challenge",
  ]).pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  state: Schema.Literals(["default", "customized"]),
  url: Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/{accountOrZone}/{accountOrZoneId}/custom_pages/{identifier}",
  }),
) as unknown as Schema.Schema<PutCustomPageRequest>;

export interface PutCustomPageResponse {
  id?: string;
  createdOn?: string;
  description?: string;
  modifiedOn?: string;
  previewTarget?: string;
  requiredTokens?: string[];
  /** The custom page state. */
  state?: "default" | "customized";
  /** The URL associated with the custom page. */
  url?: string;
}

export const PutCustomPageResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  previewTarget: Schema.optional(Schema.String),
  requiredTokens: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.Literals(["default", "customized"])),
  url: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    description: "description",
    modifiedOn: "modified_on",
    previewTarget: "preview_target",
    requiredTokens: "required_tokens",
    state: "state",
    url: "url",
  }),
) as unknown as Schema.Schema<PutCustomPageResponse>;

export type PutCustomPageError = DefaultErrors;

export const putCustomPage: API.OperationMethod<
  PutCustomPageRequest,
  PutCustomPageResponse,
  PutCustomPageError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PutCustomPageRequest,
  output: PutCustomPageResponse,
  errors: [],
}));
