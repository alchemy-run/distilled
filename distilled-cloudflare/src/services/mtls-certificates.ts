/**
 * Cloudflare MTLS-CERTIFICATES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service mtls-certificates
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
// Association
// =============================================================================

export interface GetAssociationRequest {
  mtlsCertificateId: string;
  /** Identifier. */
  accountId: string;
}

export const GetAssociationRequest = Schema.Struct({
  mtlsCertificateId: Schema.String.pipe(T.HttpPath("mtlsCertificateId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/mtls_certificates/{mtlsCertificateId}/associations",
  }),
) as unknown as Schema.Schema<GetAssociationRequest>;

export type GetAssociationResponse = { service?: string; status?: string }[];

export const GetAssociationResponse = Schema.Array(
  Schema.Struct({
    service: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<GetAssociationResponse>;

export const getAssociation: (
  input: GetAssociationRequest,
) => Effect.Effect<
  GetAssociationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAssociationRequest,
  output: GetAssociationResponse,
  errors: [],
}));

// =============================================================================
// MtlsCertificate
// =============================================================================

export interface GetMtlsCertificateRequest {
  mtlsCertificateId: string;
  /** Identifier. */
  accountId: string;
}

export const GetMtlsCertificateRequest = Schema.Struct({
  mtlsCertificateId: Schema.String.pipe(T.HttpPath("mtlsCertificateId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/mtls_certificates/{mtlsCertificateId}",
  }),
) as unknown as Schema.Schema<GetMtlsCertificateRequest>;

export interface GetMtlsCertificateResponse {
  /** Identifier. */
  id?: string;
  /** Indicates whether the certificate is a CA or leaf certificate. */
  ca?: boolean;
  /** The uploaded root CA certificate. */
  certificates?: string;
  /** When the certificate expires. */
  expiresOn?: string;
  /** The certificate authority that issued the certificate. */
  issuer?: string;
  /** Optional unique name for the certificate. Only used for human readability. */
  name?: string;
  /** The certificate serial number. */
  serialNumber?: string;
  /** The type of hash used for the certificate. */
  signature?: string;
  /** This is the time the certificate was uploaded. */
  uploadedOn?: string;
}

export const GetMtlsCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  ca: Schema.optional(Schema.Boolean),
  certificates: Schema.optional(Schema.String),
  expiresOn: Schema.optional(Schema.String),
  issuer: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  uploadedOn: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    expiresOn: "expires_on",
    serialNumber: "serial_number",
    uploadedOn: "uploaded_on",
  }),
) as unknown as Schema.Schema<GetMtlsCertificateResponse>;

export const getMtlsCertificate: (
  input: GetMtlsCertificateRequest,
) => Effect.Effect<
  GetMtlsCertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMtlsCertificateRequest,
  output: GetMtlsCertificateResponse,
  errors: [],
}));

export interface ListMtlsCertificatesRequest {
  /** Identifier. */
  accountId: string;
}

export const ListMtlsCertificatesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/mtls_certificates" }),
) as unknown as Schema.Schema<ListMtlsCertificatesRequest>;

export type ListMtlsCertificatesResponse = {
  id?: string;
  ca?: boolean;
  certificates?: string;
  expiresOn?: string;
  issuer?: string;
  name?: string;
  serialNumber?: string;
  signature?: string;
  uploadedOn?: string;
}[];

export const ListMtlsCertificatesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    ca: Schema.optional(Schema.Boolean),
    certificates: Schema.optional(Schema.String),
    expiresOn: Schema.optional(Schema.String),
    issuer: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    serialNumber: Schema.optional(Schema.String),
    signature: Schema.optional(Schema.String),
    uploadedOn: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      expiresOn: "expires_on",
      serialNumber: "serial_number",
      uploadedOn: "uploaded_on",
    }),
  ),
) as unknown as Schema.Schema<ListMtlsCertificatesResponse>;

export const listMtlsCertificates: (
  input: ListMtlsCertificatesRequest,
) => Effect.Effect<
  ListMtlsCertificatesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListMtlsCertificatesRequest,
  output: ListMtlsCertificatesResponse,
  errors: [],
}));

export interface CreateMtlsCertificateRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Indicates whether the certificate is a CA or leaf certificate. */
  ca: boolean;
  /** Body param: The uploaded root CA certificate. */
  certificates: string;
  /** Body param: Optional unique name for the certificate. Only used for human readability. */
  name?: string;
  /** Body param: The private key for the certificate. This field is only needed for specific use cases such as using a custom certificate with Zero Trust's block page. */
  privateKey?: string;
}

export const CreateMtlsCertificateRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  ca: Schema.Boolean,
  certificates: Schema.String,
  name: Schema.optional(Schema.String),
  privateKey: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ privateKey: "private_key" }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/mtls_certificates" }),
) as unknown as Schema.Schema<CreateMtlsCertificateRequest>;

export interface CreateMtlsCertificateResponse {
  /** Identifier. */
  id?: string;
  /** Indicates whether the certificate is a CA or leaf certificate. */
  ca?: boolean;
  /** The uploaded root CA certificate. */
  certificates?: string;
  /** When the certificate expires. */
  expiresOn?: string;
  /** The certificate authority that issued the certificate. */
  issuer?: string;
  /** Optional unique name for the certificate. Only used for human readability. */
  name?: string;
  /** The certificate serial number. */
  serialNumber?: string;
  /** The type of hash used for the certificate. */
  signature?: string;
  /** This is the time the certificate was updated. */
  updatedAt?: string;
  /** This is the time the certificate was uploaded. */
  uploadedOn?: string;
}

export const CreateMtlsCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  ca: Schema.optional(Schema.Boolean),
  certificates: Schema.optional(Schema.String),
  expiresOn: Schema.optional(Schema.String),
  issuer: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
  uploadedOn: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    expiresOn: "expires_on",
    serialNumber: "serial_number",
    updatedAt: "updated_at",
    uploadedOn: "uploaded_on",
  }),
) as unknown as Schema.Schema<CreateMtlsCertificateResponse>;

export const createMtlsCertificate: (
  input: CreateMtlsCertificateRequest,
) => Effect.Effect<
  CreateMtlsCertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateMtlsCertificateRequest,
  output: CreateMtlsCertificateResponse,
  errors: [],
}));

export interface DeleteMtlsCertificateRequest {
  mtlsCertificateId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteMtlsCertificateRequest = Schema.Struct({
  mtlsCertificateId: Schema.String.pipe(T.HttpPath("mtlsCertificateId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/mtls_certificates/{mtlsCertificateId}",
  }),
) as unknown as Schema.Schema<DeleteMtlsCertificateRequest>;

export interface DeleteMtlsCertificateResponse {
  /** Identifier. */
  id?: string;
  /** Indicates whether the certificate is a CA or leaf certificate. */
  ca?: boolean;
  /** The uploaded root CA certificate. */
  certificates?: string;
  /** When the certificate expires. */
  expiresOn?: string;
  /** The certificate authority that issued the certificate. */
  issuer?: string;
  /** Optional unique name for the certificate. Only used for human readability. */
  name?: string;
  /** The certificate serial number. */
  serialNumber?: string;
  /** The type of hash used for the certificate. */
  signature?: string;
  /** This is the time the certificate was uploaded. */
  uploadedOn?: string;
}

export const DeleteMtlsCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  ca: Schema.optional(Schema.Boolean),
  certificates: Schema.optional(Schema.String),
  expiresOn: Schema.optional(Schema.String),
  issuer: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  uploadedOn: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    expiresOn: "expires_on",
    serialNumber: "serial_number",
    uploadedOn: "uploaded_on",
  }),
) as unknown as Schema.Schema<DeleteMtlsCertificateResponse>;

export const deleteMtlsCertificate: (
  input: DeleteMtlsCertificateRequest,
) => Effect.Effect<
  DeleteMtlsCertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteMtlsCertificateRequest,
  output: DeleteMtlsCertificateResponse,
  errors: [],
}));
