/**
 * Cloudflare ACM API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service acm
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

export const GetTotalTlRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/acm/total_tls" }),
) as unknown as Schema.Schema<GetTotalTlRequest>;

export interface GetTotalTlResponse {
  /** The Certificate Authority that Total TLS certificates will be issued through. */
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com";
  /** If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone. */
  enabled?: boolean;
  /** The validity period in days for the certificates ordered via Total TLS. */
  validityPeriod?: number;
}

export const GetTotalTlResponse = Schema.Struct({
  certificateAuthority: Schema.optional(
    Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
  ),
  enabled: Schema.optional(Schema.Boolean),
  validityPeriod: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    certificateAuthority: "certificate_authority",
    validityPeriod: "validity_period",
  }),
) as unknown as Schema.Schema<GetTotalTlResponse>;

export const getTotalTl: (
  input: GetTotalTlRequest,
) => Effect.Effect<
  GetTotalTlResponse,
  CommonErrors | InvalidObjectIdentifier | AdvancedCertificateManagerRequired,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreateTotalTlRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.Boolean,
  certificateAuthority: Schema.optional(
    Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
  ),
}).pipe(
  Schema.encodeKeys({ certificateAuthority: "certificate_authority" }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/acm/total_tls" }),
) as unknown as Schema.Schema<CreateTotalTlRequest>;

export interface CreateTotalTlResponse {
  /** The Certificate Authority that Total TLS certificates will be issued through. */
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com";
  /** If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone. */
  enabled?: boolean;
  /** The validity period in days for the certificates ordered via Total TLS. */
  validityPeriod?: number;
}

export const CreateTotalTlResponse = Schema.Struct({
  certificateAuthority: Schema.optional(
    Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
  ),
  enabled: Schema.optional(Schema.Boolean),
  validityPeriod: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    certificateAuthority: "certificate_authority",
    validityPeriod: "validity_period",
  }),
) as unknown as Schema.Schema<CreateTotalTlResponse>;

export const createTotalTl: (
  input: CreateTotalTlRequest,
) => Effect.Effect<
  CreateTotalTlResponse,
  | CommonErrors
  | InvalidObjectIdentifier
  | AdvancedCertificateManagerRequired
  | NoStateChange
  | PreviousJobInProgress,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTotalTlRequest,
  output: CreateTotalTlResponse,
  errors: [
    InvalidObjectIdentifier,
    AdvancedCertificateManagerRequired,
    NoStateChange,
    PreviousJobInProgress,
  ],
}));
