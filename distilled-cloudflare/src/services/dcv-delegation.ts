/**
 * Cloudflare DCV-DELEGATION API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service dcv-delegation
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// DCVDelegation
// =============================================================================

export interface GetDCVDelegationRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetDCVDelegationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/dcv_delegation/uuid" }),
) as unknown as Schema.Schema<GetDCVDelegationRequest>;

export interface GetDCVDelegationResponse {
  /** The DCV Delegation unique identifier. */
  uuid?: string;
}

export const GetDCVDelegationResponse = Schema.Struct({
  uuid: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetDCVDelegationResponse>;

export type GetDCVDelegationError = CommonErrors;

export const getDCVDelegation: API.OperationMethod<
  GetDCVDelegationRequest,
  GetDCVDelegationResponse,
  GetDCVDelegationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDCVDelegationRequest,
  output: GetDCVDelegationResponse,
  errors: [],
}));
