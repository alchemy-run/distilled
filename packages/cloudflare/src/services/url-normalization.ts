/**
 * Cloudflare URL-NORMALIZATION API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service url-normalization
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// URLNormalization
// =============================================================================

export interface GetURLNormalizationRequest {
  /** The unique ID of the zone. */
  zoneId: string;
}

export const GetURLNormalizationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/zones/{zone_id}/url_normalization" }),
  ) as unknown as Schema.Schema<GetURLNormalizationRequest>;

export interface GetURLNormalizationResponse {
  /** The scope of the URL normalization. */
  scope: "incoming" | "both" | "none";
  /** The type of URL normalization performed by Cloudflare. */
  type: "cloudflare" | "rfc3986";
}

export const GetURLNormalizationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.Literals(["incoming", "both", "none"]),
    type: Schema.Literals(["cloudflare", "rfc3986"]),
  }) as unknown as Schema.Schema<GetURLNormalizationResponse>;

export type GetURLNormalizationError = DefaultErrors;

export const getURLNormalization: API.OperationMethod<
  GetURLNormalizationRequest,
  GetURLNormalizationResponse,
  GetURLNormalizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetURLNormalizationRequest,
  output: GetURLNormalizationResponse,
  errors: [],
}));

export interface PutURLNormalizationRequest {
  /** Path param: The unique ID of the zone. */
  zoneId: string;
  /** Body param: The scope of the URL normalization. */
  scope: "incoming" | "both" | "none";
  /** Body param: The type of URL normalization performed by Cloudflare. */
  type: "cloudflare" | "rfc3986";
}

export const PutURLNormalizationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    scope: Schema.Literals(["incoming", "both", "none"]),
    type: Schema.Literals(["cloudflare", "rfc3986"]),
  }).pipe(
    T.Http({ method: "PUT", path: "/zones/{zone_id}/url_normalization" }),
  ) as unknown as Schema.Schema<PutURLNormalizationRequest>;

export interface PutURLNormalizationResponse {
  /** The scope of the URL normalization. */
  scope: "incoming" | "both" | "none";
  /** The type of URL normalization performed by Cloudflare. */
  type: "cloudflare" | "rfc3986";
}

export const PutURLNormalizationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.Literals(["incoming", "both", "none"]),
    type: Schema.Literals(["cloudflare", "rfc3986"]),
  }) as unknown as Schema.Schema<PutURLNormalizationResponse>;

export type PutURLNormalizationError = DefaultErrors;

export const putURLNormalization: API.OperationMethod<
  PutURLNormalizationRequest,
  PutURLNormalizationResponse,
  PutURLNormalizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutURLNormalizationRequest,
  output: PutURLNormalizationResponse,
  errors: [],
}));

export interface DeleteURLNormalizationRequest {
  /** The unique ID of the zone. */
  zoneId: string;
}

export const DeleteURLNormalizationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "/zones/{zone_id}/url_normalization" }),
  ) as unknown as Schema.Schema<DeleteURLNormalizationRequest>;

export type DeleteURLNormalizationResponse = unknown;

export const DeleteURLNormalizationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteURLNormalizationResponse>;

export type DeleteURLNormalizationError = DefaultErrors;

export const deleteURLNormalization: API.OperationMethod<
  DeleteURLNormalizationRequest,
  DeleteURLNormalizationResponse,
  DeleteURLNormalizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteURLNormalizationRequest,
  output: DeleteURLNormalizationResponse,
  errors: [],
}));
