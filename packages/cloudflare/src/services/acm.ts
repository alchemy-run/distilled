/**
 * Cloudflare ACM API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service acm
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Errors
// =============================================================================

export class AdvancedCertificateManagerRequired extends Schema.TaggedErrorClass<AdvancedCertificateManagerRequired>()(
  "AdvancedCertificateManagerRequired",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(AdvancedCertificateManagerRequired, [{ code: 1450 }]);

export class InvalidObjectIdentifier extends Schema.TaggedErrorClass<InvalidObjectIdentifier>()(
  "InvalidObjectIdentifier",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidObjectIdentifier, [{ code: 7003 }]);

export class NoStateChange extends Schema.TaggedErrorClass<NoStateChange>()(
  "NoStateChange",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(NoStateChange, [{ code: 1467 }]);

export class PreviousJobInProgress extends Schema.TaggedErrorClass<PreviousJobInProgress>()(
  "PreviousJobInProgress",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(PreviousJobInProgress, [{ code: 1482 }]);

// =============================================================================
// TotalTl
// =============================================================================

export interface GetTotalTlRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetTotalTlRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/acm/total_tls" }),
) as unknown as Schema.Schema<GetTotalTlRequest>;

export interface GetTotalTlResponse {
  /** The Certificate Authority that Total TLS certificates will be issued through. */
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com" | null;
  /** If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone. */
  enabled?: boolean | null;
  /** The validity period in days for the certificates ordered via Total TLS. */
  validityPeriod?: number | null;
}

export const GetTotalTlResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  certificateAuthority: Schema.optional(
    Schema.Union([
      Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
      Schema.Null,
    ]),
  ),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  validityPeriod: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    certificateAuthority: "certificate_authority",
    enabled: "enabled",
    validityPeriod: "validity_period",
  }),
) as unknown as Schema.Schema<GetTotalTlResponse>;

export type GetTotalTlError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | AdvancedCertificateManagerRequired;

export const getTotalTl: API.OperationMethod<
  GetTotalTlRequest,
  GetTotalTlResponse,
  GetTotalTlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetTotalTlRequest,
  output: GetTotalTlResponse,
  errors: [InvalidObjectIdentifier, AdvancedCertificateManagerRequired],
}));

export interface CreateTotalTlRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone. */
  enabled: boolean;
  /** Body param: The Certificate Authority that Total TLS certificates will be issued through. */
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com";
}

export const CreateTotalTlRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.Boolean,
  certificateAuthority: Schema.optional(
    Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
  ),
}).pipe(
  Schema.encodeKeys({
    enabled: "enabled",
    certificateAuthority: "certificate_authority",
  }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/acm/total_tls" }),
) as unknown as Schema.Schema<CreateTotalTlRequest>;

export interface CreateTotalTlResponse {
  /** The Certificate Authority that Total TLS certificates will be issued through. */
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com" | null;
  /** If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone. */
  enabled?: boolean | null;
  /** The validity period in days for the certificates ordered via Total TLS. */
  validityPeriod?: number | null;
}

export const CreateTotalTlResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  certificateAuthority: Schema.optional(
    Schema.Union([
      Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
      Schema.Null,
    ]),
  ),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  validityPeriod: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    certificateAuthority: "certificate_authority",
    enabled: "enabled",
    validityPeriod: "validity_period",
  }),
) as unknown as Schema.Schema<CreateTotalTlResponse>;

export type CreateTotalTlError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | AdvancedCertificateManagerRequired
  | NoStateChange
  | PreviousJobInProgress;

export const createTotalTl: API.OperationMethod<
  CreateTotalTlRequest,
  CreateTotalTlResponse,
  CreateTotalTlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTotalTlRequest,
  output: CreateTotalTlResponse,
  errors: [
    InvalidObjectIdentifier,
    AdvancedCertificateManagerRequired,
    NoStateChange,
    PreviousJobInProgress,
  ],
}));
