/**
 * Cloudflare ORIGIN-CA-CERTIFICATES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service origin-ca-certificates
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
// OriginCACertificate
// =============================================================================

export interface GetOriginCACertificateRequest {
  certificateId: string;
}

export const GetOriginCACertificateRequest = Schema.Struct({
  certificateId: Schema.String.pipe(T.HttpPath("certificateId")),
}).pipe(
  T.Http({ method: "GET", path: "/certificates/{certificateId}" }),
) as unknown as Schema.Schema<GetOriginCACertificateRequest>;

export interface GetOriginCACertificateResponse {
  /** The Certificate Signing Request (CSR). Must be newline-encoded. */
  csr: string;
  /** Array of hostnames or wildcard names (e.g., \ .example.com) bound to the certificate. */
  hostnames: string[];
  /** Signature type desired on certificate ("origin-rsa" (rsa), "origin-ecc" (ecdsa), or "keyless-certificate" (for Keyless SSL servers). */
  requestType: "origin-rsa" | "origin-ecc" | "keyless-certificate";
  /** The number of days for which the certificate should be valid. */
  requestedValidity: "7" | "30" | "90" | "365" | "730" | "1095" | "5475";
  /** Identifier. */
  id?: string;
  /** The Origin CA certificate. Will be newline-encoded. */
  certificate?: string;
  /** When the certificate will expire. */
  expiresOn?: string;
}

export const GetOriginCACertificateResponse = Schema.Struct({
  csr: Schema.String,
  hostnames: Schema.Array(Schema.String),
  requestType: Schema.Literals([
    "origin-rsa",
    "origin-ecc",
    "keyless-certificate",
  ]),
  requestedValidity: Schema.Literals([
    "7",
    "30",
    "90",
    "365",
    "730",
    "1095",
    "5475",
  ]),
  id: Schema.optional(Schema.String),
  certificate: Schema.optional(Schema.String),
  expiresOn: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    requestType: "request_type",
    requestedValidity: "requested_validity",
    expiresOn: "expires_on",
  }),
) as unknown as Schema.Schema<GetOriginCACertificateResponse>;

export const getOriginCACertificate: (
  input: GetOriginCACertificateRequest,
) => Effect.Effect<
  GetOriginCACertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOriginCACertificateRequest,
  output: GetOriginCACertificateResponse,
  errors: [],
}));

export interface ListOriginCACertificatesRequest {
  /** Identifier. */
  zoneId: string;
  /** Limit to the number of records returned. */
  limit?: number;
  /** Offset the results */
  offset?: number;
}

export const ListOriginCACertificatesRequest = Schema.Struct({
  zoneId: Schema.String,
  limit: Schema.optional(Schema.Number),
  offset: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({ zoneId: "zone_id" }),
  T.Http({ method: "GET", path: "/certificates" }),
) as unknown as Schema.Schema<ListOriginCACertificatesRequest>;

export type ListOriginCACertificatesResponse = {
  csr: string;
  hostnames: string[];
  requestType: "origin-rsa" | "origin-ecc" | "keyless-certificate";
  requestedValidity: "7" | "30" | "90" | "365" | "730" | "1095" | "5475";
  id?: string;
  certificate?: string;
  expiresOn?: string;
}[];

export const ListOriginCACertificatesResponse = Schema.Array(
  Schema.Struct({
    csr: Schema.String,
    hostnames: Schema.Array(Schema.String),
    requestType: Schema.Literals([
      "origin-rsa",
      "origin-ecc",
      "keyless-certificate",
    ]),
    requestedValidity: Schema.Literals([
      "7",
      "30",
      "90",
      "365",
      "730",
      "1095",
      "5475",
    ]),
    id: Schema.optional(Schema.String),
    certificate: Schema.optional(Schema.String),
    expiresOn: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      requestType: "request_type",
      requestedValidity: "requested_validity",
      expiresOn: "expires_on",
    }),
  ),
) as unknown as Schema.Schema<ListOriginCACertificatesResponse>;

export const listOriginCACertificates: (
  input: ListOriginCACertificatesRequest,
) => Effect.Effect<
  ListOriginCACertificatesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOriginCACertificatesRequest,
  output: ListOriginCACertificatesResponse,
  errors: [],
}));

export interface CreateOriginCACertificateRequest {
  /** The Certificate Signing Request (CSR). Must be newline-encoded. */
  csr: string;
  /** Array of hostnames or wildcard names (e.g., \ .example.com) bound to the certificate. */
  hostnames: string[];
  /** Signature type desired on certificate ("origin-rsa" (rsa), "origin-ecc" (ecdsa), or "keyless-certificate" (for Keyless SSL servers). */
  requestType: "origin-rsa" | "origin-ecc" | "keyless-certificate";
  /** The number of days for which the certificate should be valid. */
  requestedValidity?: "7" | "30" | "90" | "365" | "730" | "1095" | "5475";
}

export const CreateOriginCACertificateRequest = Schema.Struct({
  csr: Schema.String,
  hostnames: Schema.Array(Schema.String),
  requestType: Schema.Literals([
    "origin-rsa",
    "origin-ecc",
    "keyless-certificate",
  ]),
  requestedValidity: Schema.optional(
    Schema.Literals(["7", "30", "90", "365", "730", "1095", "5475"]),
  ),
}).pipe(
  Schema.encodeKeys({
    requestType: "request_type",
    requestedValidity: "requested_validity",
  }),
  T.Http({ method: "POST", path: "/certificates" }),
) as unknown as Schema.Schema<CreateOriginCACertificateRequest>;

export interface CreateOriginCACertificateResponse {
  /** The Certificate Signing Request (CSR). Must be newline-encoded. */
  csr: string;
  /** Array of hostnames or wildcard names (e.g., \ .example.com) bound to the certificate. */
  hostnames: string[];
  /** Signature type desired on certificate ("origin-rsa" (rsa), "origin-ecc" (ecdsa), or "keyless-certificate" (for Keyless SSL servers). */
  requestType: "origin-rsa" | "origin-ecc" | "keyless-certificate";
  /** The number of days for which the certificate should be valid. */
  requestedValidity: "7" | "30" | "90" | "365" | "730" | "1095" | "5475";
  /** Identifier. */
  id?: string;
  /** The Origin CA certificate. Will be newline-encoded. */
  certificate?: string;
  /** When the certificate will expire. */
  expiresOn?: string;
}

export const CreateOriginCACertificateResponse = Schema.Struct({
  csr: Schema.String,
  hostnames: Schema.Array(Schema.String),
  requestType: Schema.Literals([
    "origin-rsa",
    "origin-ecc",
    "keyless-certificate",
  ]),
  requestedValidity: Schema.Literals([
    "7",
    "30",
    "90",
    "365",
    "730",
    "1095",
    "5475",
  ]),
  id: Schema.optional(Schema.String),
  certificate: Schema.optional(Schema.String),
  expiresOn: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    requestType: "request_type",
    requestedValidity: "requested_validity",
    expiresOn: "expires_on",
  }),
) as unknown as Schema.Schema<CreateOriginCACertificateResponse>;

export const createOriginCACertificate: (
  input: CreateOriginCACertificateRequest,
) => Effect.Effect<
  CreateOriginCACertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateOriginCACertificateRequest,
  output: CreateOriginCACertificateResponse,
  errors: [],
}));

export interface DeleteOriginCACertificateRequest {
  certificateId: string;
}

export const DeleteOriginCACertificateRequest = Schema.Struct({
  certificateId: Schema.String.pipe(T.HttpPath("certificateId")),
}).pipe(
  T.Http({ method: "DELETE", path: "/certificates/{certificateId}" }),
) as unknown as Schema.Schema<DeleteOriginCACertificateRequest>;

export interface DeleteOriginCACertificateResponse {
  /** Identifier. */
  id?: string;
  /** When the certificate was revoked. */
  revokedAt?: string;
}

export const DeleteOriginCACertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  revokedAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ revokedAt: "revoked_at" }),
) as unknown as Schema.Schema<DeleteOriginCACertificateResponse>;

export const deleteOriginCACertificate: (
  input: DeleteOriginCACertificateRequest,
) => Effect.Effect<
  DeleteOriginCACertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteOriginCACertificateRequest,
  output: DeleteOriginCACertificateResponse,
  errors: [],
}));
