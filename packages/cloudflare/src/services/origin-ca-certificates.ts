/**
 * Cloudflare ORIGIN-CA-CERTIFICATES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service origin-ca-certificates
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// OriginCACertificate
// =============================================================================

export interface GetOriginCACertificateRequest {
  certificateId: string;
}

export const GetOriginCACertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** The Origin CA certificate. Will be newline-encoded. */
  certificate?: string | null;
  /** When the certificate will expire. */
  expiresOn?: string | null;
}

export const GetOriginCACertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      csr: "csr",
      hostnames: "hostnames",
      requestType: "request_type",
      requestedValidity: "requested_validity",
      id: "id",
      certificate: "certificate",
      expiresOn: "expires_on",
    }),
  ) as unknown as Schema.Schema<GetOriginCACertificateResponse>;

export type GetOriginCACertificateError = DefaultErrors;

export const getOriginCACertificate: API.OperationMethod<
  GetOriginCACertificateRequest,
  GetOriginCACertificateResponse,
  GetOriginCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListOriginCACertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String,
    limit: Schema.optional(Schema.Number),
    offset: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({ zoneId: "zone_id", limit: "limit", offset: "offset" }),
    T.Http({ method: "GET", path: "/certificates" }),
  ) as unknown as Schema.Schema<ListOriginCACertificatesRequest>;

export type ListOriginCACertificatesResponse = {
  csr: string;
  hostnames: string[];
  requestType: "origin-rsa" | "origin-ecc" | "keyless-certificate";
  requestedValidity: "7" | "30" | "90" | "365" | "730" | "1095" | "5475";
  id?: string | null;
  certificate?: string | null;
  expiresOn?: string | null;
}[];

export const ListOriginCACertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
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
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        csr: "csr",
        hostnames: "hostnames",
        requestType: "request_type",
        requestedValidity: "requested_validity",
        id: "id",
        certificate: "certificate",
        expiresOn: "expires_on",
      }),
    ),
  ) as unknown as Schema.Schema<ListOriginCACertificatesResponse>;

export type ListOriginCACertificatesError = DefaultErrors;

export const listOriginCACertificates: API.OperationMethod<
  ListOriginCACertificatesRequest,
  ListOriginCACertificatesResponse,
  ListOriginCACertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateOriginCACertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      csr: "csr",
      hostnames: "hostnames",
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
  id?: string | null;
  /** The Origin CA certificate. Will be newline-encoded. */
  certificate?: string | null;
  /** When the certificate will expire. */
  expiresOn?: string | null;
}

export const CreateOriginCACertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      csr: "csr",
      hostnames: "hostnames",
      requestType: "request_type",
      requestedValidity: "requested_validity",
      id: "id",
      certificate: "certificate",
      expiresOn: "expires_on",
    }),
  ) as unknown as Schema.Schema<CreateOriginCACertificateResponse>;

export type CreateOriginCACertificateError = DefaultErrors;

export const createOriginCACertificate: API.OperationMethod<
  CreateOriginCACertificateRequest,
  CreateOriginCACertificateResponse,
  CreateOriginCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateOriginCACertificateRequest,
  output: CreateOriginCACertificateResponse,
  errors: [],
}));

export interface DeleteOriginCACertificateRequest {
  certificateId: string;
}

export const DeleteOriginCACertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificateId: Schema.String.pipe(T.HttpPath("certificateId")),
  }).pipe(
    T.Http({ method: "DELETE", path: "/certificates/{certificateId}" }),
  ) as unknown as Schema.Schema<DeleteOriginCACertificateRequest>;

export interface DeleteOriginCACertificateResponse {
  /** Identifier. */
  id?: string | null;
  /** When the certificate was revoked. */
  revokedAt?: string | null;
}

export const DeleteOriginCACertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    revokedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({ id: "id", revokedAt: "revoked_at" }),
  ) as unknown as Schema.Schema<DeleteOriginCACertificateResponse>;

export type DeleteOriginCACertificateError = DefaultErrors;

export const deleteOriginCACertificate: API.OperationMethod<
  DeleteOriginCACertificateRequest,
  DeleteOriginCACertificateResponse,
  DeleteOriginCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteOriginCACertificateRequest,
  output: DeleteOriginCACertificateResponse,
  errors: [],
}));
