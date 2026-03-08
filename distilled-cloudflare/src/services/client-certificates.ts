/**
 * Cloudflare CLIENT-CERTIFICATES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service client-certificates
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
// ClientCertificate
// =============================================================================

export interface GetClientCertificateRequest {
  clientCertificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetClientCertificateRequest = Schema.Struct({
  clientCertificateId: Schema.String.pipe(T.HttpPath("clientCertificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/client_certificates/{clientCertificateId}",
  }),
) as unknown as Schema.Schema<GetClientCertificateRequest>;

export interface GetClientCertificateResponse {
  /** Identifier. */
  id?: string;
  /** The Client Certificate PEM */
  certificate?: string;
  /** Certificate Authority used to issue the Client Certificate */
  certificateAuthority?: { id?: string | null; name?: string | null };
  /** Common Name of the Client Certificate */
  commonName?: string;
  /** Country, provided by the CSR */
  country?: string;
  /** The Certificate Signing Request (CSR). Must be newline-encoded. */
  csr?: string;
  /** Date that the Client Certificate expires */
  expiresOn?: string;
  /** Unique identifier of the Client Certificate */
  fingerprintSha256?: string;
  /** Date that the Client Certificate was issued by the Certificate Authority */
  issuedOn?: string;
  /** Location, provided by the CSR */
  location?: string;
  /** Organization, provided by the CSR */
  organization?: string;
  /** Organizational Unit, provided by the CSR */
  organizationalUnit?: string;
  /** The serial number on the created Client Certificate. */
  serialNumber?: string;
  /** The type of hash used for the Client Certificate.. */
  signature?: string;
  /** Subject Key Identifier */
  ski?: string;
  /** State, provided by the CSR */
  state?: string;
  /** Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transitions */
  status?: "active" | "pending_reactivation" | "pending_revocation" | "revoked";
  /** The number of days the Client Certificate will be valid after the issued_on date */
  validityDays?: number;
}

export const GetClientCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificateAuthority: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  commonName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  csr: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  fingerprintSha256: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  issuedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  location: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organization: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizationalUnit: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  ski: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  state: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "active",
        "pending_reactivation",
        "pending_revocation",
        "revoked",
      ]),
      Schema.Null,
    ]),
  ),
  validityDays: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    certificateAuthority: "certificate_authority",
    commonName: "common_name",
    country: "country",
    csr: "csr",
    expiresOn: "expires_on",
    fingerprintSha256: "fingerprint_sha256",
    issuedOn: "issued_on",
    location: "location",
    organization: "organization",
    organizationalUnit: "organizational_unit",
    serialNumber: "serial_number",
    signature: "signature",
    ski: "ski",
    state: "state",
    status: "status",
    validityDays: "validity_days",
  }),
) as unknown as Schema.Schema<GetClientCertificateResponse>;

export type GetClientCertificateError = CommonErrors;

export const getClientCertificate: API.OperationMethod<
  GetClientCertificateRequest,
  GetClientCertificateResponse,
  GetClientCertificateError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetClientCertificateRequest,
  output: GetClientCertificateResponse,
  errors: [],
}));

export interface ListClientCertificatesRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Limit to the number of records returned. */
  limit?: number;
  /** Query param: Offset the results */
  offset?: number;
  /** Query param: Client Certitifcate Status to filter results by. */
  status?:
    | "all"
    | "active"
    | "pending_reactivation"
    | "pending_revocation"
    | "revoked";
}

export const ListClientCertificatesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  offset: Schema.optional(Schema.Number).pipe(T.HttpQuery("offset")),
  status: Schema.optional(
    Schema.Literals([
      "all",
      "active",
      "pending_reactivation",
      "pending_revocation",
      "revoked",
    ]),
  ).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/client_certificates" }),
) as unknown as Schema.Schema<ListClientCertificatesRequest>;

export type ListClientCertificatesResponse = {
  id?: string | null;
  certificate?: string | null;
  certificateAuthority?: { id?: string | null; name?: string | null } | null;
  commonName?: string | null;
  country?: string | null;
  csr?: string | null;
  expiresOn?: string | null;
  fingerprintSha256?: string | null;
  issuedOn?: string | null;
  location?: string | null;
  organization?: string | null;
  organizationalUnit?: string | null;
  serialNumber?: string | null;
  signature?: string | null;
  ski?: string | null;
  state?: string | null;
  status?:
    | "active"
    | "pending_reactivation"
    | "pending_revocation"
    | "revoked"
    | null;
  validityDays?: number | null;
}[];

export const ListClientCertificatesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    certificateAuthority: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    commonName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    csr: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    fingerprintSha256: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    issuedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    location: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    organization: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    organizationalUnit: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    ski: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    state: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "active",
          "pending_reactivation",
          "pending_revocation",
          "revoked",
        ]),
        Schema.Null,
      ]),
    ),
    validityDays: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      certificate: "certificate",
      certificateAuthority: "certificate_authority",
      commonName: "common_name",
      country: "country",
      csr: "csr",
      expiresOn: "expires_on",
      fingerprintSha256: "fingerprint_sha256",
      issuedOn: "issued_on",
      location: "location",
      organization: "organization",
      organizationalUnit: "organizational_unit",
      serialNumber: "serial_number",
      signature: "signature",
      ski: "ski",
      state: "state",
      status: "status",
      validityDays: "validity_days",
    }),
  ),
) as unknown as Schema.Schema<ListClientCertificatesResponse>;

export type ListClientCertificatesError = CommonErrors;

export const listClientCertificates: API.OperationMethod<
  ListClientCertificatesRequest,
  ListClientCertificatesResponse,
  ListClientCertificatesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListClientCertificatesRequest,
  output: ListClientCertificatesResponse,
  errors: [],
}));

export interface CreateClientCertificateRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The Certificate Signing Request (CSR). Must be newline-encoded. */
  csr: string;
  /** Body param: The number of days the Client Certificate will be valid after the issued_on date */
  validityDays: number;
}

export const CreateClientCertificateRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  csr: Schema.String,
  validityDays: Schema.Number,
}).pipe(
  Schema.encodeKeys({ csr: "csr", validityDays: "validity_days" }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/client_certificates" }),
) as unknown as Schema.Schema<CreateClientCertificateRequest>;

export interface CreateClientCertificateResponse {
  /** Identifier. */
  id?: string;
  /** The Client Certificate PEM */
  certificate?: string;
  /** Certificate Authority used to issue the Client Certificate */
  certificateAuthority?: { id?: string | null; name?: string | null };
  /** Common Name of the Client Certificate */
  commonName?: string;
  /** Country, provided by the CSR */
  country?: string;
  /** The Certificate Signing Request (CSR). Must be newline-encoded. */
  csr?: string;
  /** Date that the Client Certificate expires */
  expiresOn?: string;
  /** Unique identifier of the Client Certificate */
  fingerprintSha256?: string;
  /** Date that the Client Certificate was issued by the Certificate Authority */
  issuedOn?: string;
  /** Location, provided by the CSR */
  location?: string;
  /** Organization, provided by the CSR */
  organization?: string;
  /** Organizational Unit, provided by the CSR */
  organizationalUnit?: string;
  /** The serial number on the created Client Certificate. */
  serialNumber?: string;
  /** The type of hash used for the Client Certificate.. */
  signature?: string;
  /** Subject Key Identifier */
  ski?: string;
  /** State, provided by the CSR */
  state?: string;
  /** Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transitions */
  status?: "active" | "pending_reactivation" | "pending_revocation" | "revoked";
  /** The number of days the Client Certificate will be valid after the issued_on date */
  validityDays?: number;
}

export const CreateClientCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificateAuthority: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  commonName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  csr: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  fingerprintSha256: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  issuedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  location: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organization: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizationalUnit: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  ski: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  state: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "active",
        "pending_reactivation",
        "pending_revocation",
        "revoked",
      ]),
      Schema.Null,
    ]),
  ),
  validityDays: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    certificateAuthority: "certificate_authority",
    commonName: "common_name",
    country: "country",
    csr: "csr",
    expiresOn: "expires_on",
    fingerprintSha256: "fingerprint_sha256",
    issuedOn: "issued_on",
    location: "location",
    organization: "organization",
    organizationalUnit: "organizational_unit",
    serialNumber: "serial_number",
    signature: "signature",
    ski: "ski",
    state: "state",
    status: "status",
    validityDays: "validity_days",
  }),
) as unknown as Schema.Schema<CreateClientCertificateResponse>;

export type CreateClientCertificateError = CommonErrors;

export const createClientCertificate: API.OperationMethod<
  CreateClientCertificateRequest,
  CreateClientCertificateResponse,
  CreateClientCertificateError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateClientCertificateRequest,
  output: CreateClientCertificateResponse,
  errors: [],
}));

export interface PatchClientCertificateRequest {
  clientCertificateId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  reactivate?: boolean;
}

export const PatchClientCertificateRequest = Schema.Struct({
  clientCertificateId: Schema.String.pipe(T.HttpPath("clientCertificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  reactivate: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/client_certificates/{clientCertificateId}",
  }),
) as unknown as Schema.Schema<PatchClientCertificateRequest>;

export interface PatchClientCertificateResponse {
  /** Identifier. */
  id?: string;
  /** The Client Certificate PEM */
  certificate?: string;
  /** Certificate Authority used to issue the Client Certificate */
  certificateAuthority?: { id?: string | null; name?: string | null };
  /** Common Name of the Client Certificate */
  commonName?: string;
  /** Country, provided by the CSR */
  country?: string;
  /** The Certificate Signing Request (CSR). Must be newline-encoded. */
  csr?: string;
  /** Date that the Client Certificate expires */
  expiresOn?: string;
  /** Unique identifier of the Client Certificate */
  fingerprintSha256?: string;
  /** Date that the Client Certificate was issued by the Certificate Authority */
  issuedOn?: string;
  /** Location, provided by the CSR */
  location?: string;
  /** Organization, provided by the CSR */
  organization?: string;
  /** Organizational Unit, provided by the CSR */
  organizationalUnit?: string;
  /** The serial number on the created Client Certificate. */
  serialNumber?: string;
  /** The type of hash used for the Client Certificate.. */
  signature?: string;
  /** Subject Key Identifier */
  ski?: string;
  /** State, provided by the CSR */
  state?: string;
  /** Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transitions */
  status?: "active" | "pending_reactivation" | "pending_revocation" | "revoked";
  /** The number of days the Client Certificate will be valid after the issued_on date */
  validityDays?: number;
}

export const PatchClientCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificateAuthority: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  commonName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  csr: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  fingerprintSha256: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  issuedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  location: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organization: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizationalUnit: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  ski: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  state: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "active",
        "pending_reactivation",
        "pending_revocation",
        "revoked",
      ]),
      Schema.Null,
    ]),
  ),
  validityDays: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    certificateAuthority: "certificate_authority",
    commonName: "common_name",
    country: "country",
    csr: "csr",
    expiresOn: "expires_on",
    fingerprintSha256: "fingerprint_sha256",
    issuedOn: "issued_on",
    location: "location",
    organization: "organization",
    organizationalUnit: "organizational_unit",
    serialNumber: "serial_number",
    signature: "signature",
    ski: "ski",
    state: "state",
    status: "status",
    validityDays: "validity_days",
  }),
) as unknown as Schema.Schema<PatchClientCertificateResponse>;

export type PatchClientCertificateError = CommonErrors;

export const patchClientCertificate: API.OperationMethod<
  PatchClientCertificateRequest,
  PatchClientCertificateResponse,
  PatchClientCertificateError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchClientCertificateRequest,
  output: PatchClientCertificateResponse,
  errors: [],
}));

export interface DeleteClientCertificateRequest {
  clientCertificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteClientCertificateRequest = Schema.Struct({
  clientCertificateId: Schema.String.pipe(T.HttpPath("clientCertificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/client_certificates/{clientCertificateId}",
  }),
) as unknown as Schema.Schema<DeleteClientCertificateRequest>;

export interface DeleteClientCertificateResponse {
  /** Identifier. */
  id?: string;
  /** The Client Certificate PEM */
  certificate?: string;
  /** Certificate Authority used to issue the Client Certificate */
  certificateAuthority?: { id?: string | null; name?: string | null };
  /** Common Name of the Client Certificate */
  commonName?: string;
  /** Country, provided by the CSR */
  country?: string;
  /** The Certificate Signing Request (CSR). Must be newline-encoded. */
  csr?: string;
  /** Date that the Client Certificate expires */
  expiresOn?: string;
  /** Unique identifier of the Client Certificate */
  fingerprintSha256?: string;
  /** Date that the Client Certificate was issued by the Certificate Authority */
  issuedOn?: string;
  /** Location, provided by the CSR */
  location?: string;
  /** Organization, provided by the CSR */
  organization?: string;
  /** Organizational Unit, provided by the CSR */
  organizationalUnit?: string;
  /** The serial number on the created Client Certificate. */
  serialNumber?: string;
  /** The type of hash used for the Client Certificate.. */
  signature?: string;
  /** Subject Key Identifier */
  ski?: string;
  /** State, provided by the CSR */
  state?: string;
  /** Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transitions */
  status?: "active" | "pending_reactivation" | "pending_revocation" | "revoked";
  /** The number of days the Client Certificate will be valid after the issued_on date */
  validityDays?: number;
}

export const DeleteClientCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificateAuthority: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  commonName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  csr: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  fingerprintSha256: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  issuedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  location: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organization: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizationalUnit: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  ski: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  state: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "active",
        "pending_reactivation",
        "pending_revocation",
        "revoked",
      ]),
      Schema.Null,
    ]),
  ),
  validityDays: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    certificateAuthority: "certificate_authority",
    commonName: "common_name",
    country: "country",
    csr: "csr",
    expiresOn: "expires_on",
    fingerprintSha256: "fingerprint_sha256",
    issuedOn: "issued_on",
    location: "location",
    organization: "organization",
    organizationalUnit: "organizational_unit",
    serialNumber: "serial_number",
    signature: "signature",
    ski: "ski",
    state: "state",
    status: "status",
    validityDays: "validity_days",
  }),
) as unknown as Schema.Schema<DeleteClientCertificateResponse>;

export type DeleteClientCertificateError = CommonErrors;

export const deleteClientCertificate: API.OperationMethod<
  DeleteClientCertificateRequest,
  DeleteClientCertificateResponse,
  DeleteClientCertificateError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteClientCertificateRequest,
  output: DeleteClientCertificateResponse,
  errors: [],
}));
