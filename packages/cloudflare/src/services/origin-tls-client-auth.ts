/**
 * Cloudflare ORIGIN-TLS-CLIENT-AUTH API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service origin-tls-client-auth
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// Hostname
// =============================================================================

export interface GetHostnameRequest {
  hostname: string;
  /** Identifier. */
  zoneId: string;
}

export const GetHostnameRequest = Schema.Struct({
  hostname: Schema.String.pipe(T.HttpPath("hostname")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/origin_tls_client_auth/hostnames/{hostname}",
  }),
) as unknown as Schema.Schema<GetHostnameRequest>;

export interface GetHostnameResponse {
  /** Identifier. */
  certId?: string | null;
  /** Status of the certificate or the association. */
  certStatus?:
    | "initializing"
    | "pending_deployment"
    | "pending_deletion"
    | "active"
    | "deleted"
    | "deployment_timed_out"
    | "deletion_timed_out"
    | null;
  /** The time when the certificate was updated. */
  certUpdatedAt?: string | null;
  /** The time when the certificate was uploaded. */
  certUploadedOn?: string | null;
  /** The hostname certificate. */
  certificate?: string | null;
  /** The time when the certificate was created. */
  createdAt?: string | null;
  /** Indicates whether hostname-level authenticated origin pulls is enabled. A null value voids the association. */
  enabled?: boolean | null;
  /** The date when the certificate expires. */
  expiresOn?: string | null;
  /** The hostname on the origin for which the client certificate uploaded will be used. */
  hostname?: string | null;
  /** The certificate authority that issued the certificate. */
  issuer?: string | null;
  /** The serial number on the uploaded certificate. */
  serialNumber?: string | null;
  /** The type of hash used for the certificate. */
  signature?: string | null;
  /** Status of the certificate or the association. */
  status?:
    | "initializing"
    | "pending_deployment"
    | "pending_deletion"
    | "active"
    | "deleted"
    | "deployment_timed_out"
    | "deletion_timed_out"
    | null;
  /** The time when the certificate was updated. */
  updatedAt?: string | null;
}

export const GetHostnameResponse = Schema.Struct({
  certId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certStatus: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "initializing",
        "pending_deployment",
        "pending_deletion",
        "active",
        "deleted",
        "deployment_timed_out",
        "deletion_timed_out",
      ]),
      Schema.Null,
    ]),
  ),
  certUpdatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certUploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  hostname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "initializing",
        "pending_deployment",
        "pending_deletion",
        "active",
        "deleted",
        "deployment_timed_out",
        "deletion_timed_out",
      ]),
      Schema.Null,
    ]),
  ),
  updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    certId: "cert_id",
    certStatus: "cert_status",
    certUpdatedAt: "cert_updated_at",
    certUploadedOn: "cert_uploaded_on",
    certificate: "certificate",
    createdAt: "created_at",
    enabled: "enabled",
    expiresOn: "expires_on",
    hostname: "hostname",
    issuer: "issuer",
    serialNumber: "serial_number",
    signature: "signature",
    status: "status",
    updatedAt: "updated_at",
  }),
) as unknown as Schema.Schema<GetHostnameResponse>;

export type GetHostnameError = DefaultErrors;

export const getHostname: API.OperationMethod<
  GetHostnameRequest,
  GetHostnameResponse,
  GetHostnameError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetHostnameRequest,
  output: GetHostnameResponse,
  errors: [],
}));

export interface PutHostnameRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  config: { certId?: string; enabled?: boolean | null; hostname?: string }[];
}

export const PutHostnameRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  config: Schema.Array(
    Schema.Struct({
      certId: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      hostname: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        certId: "cert_id",
        enabled: "enabled",
        hostname: "hostname",
      }),
    ),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/origin_tls_client_auth/hostnames",
  }),
) as unknown as Schema.Schema<PutHostnameRequest>;

export type PutHostnameResponse = {
  id?: string | null;
  certId?: string | null;
  certificate?: string | null;
  enabled?: boolean | null;
  hostname?: string | null;
  privateKey?: string | null;
}[];

export const PutHostnameResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    certId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    hostname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    privateKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      certId: "cert_id",
      certificate: "certificate",
      enabled: "enabled",
      hostname: "hostname",
      privateKey: "private_key",
    }),
  ),
) as unknown as Schema.Schema<PutHostnameResponse>;

export type PutHostnameError = DefaultErrors;

export const putHostname: API.OperationMethod<
  PutHostnameRequest,
  PutHostnameResponse,
  PutHostnameError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PutHostnameRequest,
  output: PutHostnameResponse,
  errors: [],
}));

// =============================================================================
// HostnameCertificate
// =============================================================================

export interface GetHostnameCertificateRequest {
  certificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetHostnameCertificateRequest = Schema.Struct({
  certificateId: Schema.String.pipe(T.HttpPath("certificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/origin_tls_client_auth/hostnames/certificates/{certificateId}",
  }),
) as unknown as Schema.Schema<GetHostnameCertificateRequest>;

export interface GetHostnameCertificateResponse {
  /** Identifier. */
  id?: string | null;
  /** The hostname certificate. */
  certificate?: string | null;
  /** The date when the certificate expires. */
  expiresOn?: string | null;
  /** The certificate authority that issued the certificate. */
  issuer?: string | null;
  /** The serial number on the uploaded certificate. */
  serialNumber?: string | null;
  /** The type of hash used for the certificate. */
  signature?: string | null;
  /** Status of the certificate or the association. */
  status?:
    | "initializing"
    | "pending_deployment"
    | "pending_deletion"
    | "active"
    | "deleted"
    | "deployment_timed_out"
    | "deletion_timed_out"
    | null;
  /** The time when the certificate was uploaded. */
  uploadedOn?: string | null;
}

export const GetHostnameCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "initializing",
        "pending_deployment",
        "pending_deletion",
        "active",
        "deleted",
        "deployment_timed_out",
        "deletion_timed_out",
      ]),
      Schema.Null,
    ]),
  ),
  uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    expiresOn: "expires_on",
    issuer: "issuer",
    serialNumber: "serial_number",
    signature: "signature",
    status: "status",
    uploadedOn: "uploaded_on",
  }),
) as unknown as Schema.Schema<GetHostnameCertificateResponse>;

export type GetHostnameCertificateError = DefaultErrors;

export const getHostnameCertificate: API.OperationMethod<
  GetHostnameCertificateRequest,
  GetHostnameCertificateResponse,
  GetHostnameCertificateError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetHostnameCertificateRequest,
  output: GetHostnameCertificateResponse,
  errors: [],
}));

export interface ListHostnameCertificatesRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListHostnameCertificatesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/origin_tls_client_auth/hostnames/certificates",
  }),
) as unknown as Schema.Schema<ListHostnameCertificatesRequest>;

export type ListHostnameCertificatesResponse = {
  id?: string | null;
  certId?: string | null;
  certificate?: string | null;
  enabled?: boolean | null;
  hostname?: string | null;
  privateKey?: string | null;
}[];

export const ListHostnameCertificatesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    certId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    hostname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    privateKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      certId: "cert_id",
      certificate: "certificate",
      enabled: "enabled",
      hostname: "hostname",
      privateKey: "private_key",
    }),
  ),
) as unknown as Schema.Schema<ListHostnameCertificatesResponse>;

export type ListHostnameCertificatesError = DefaultErrors;

export const listHostnameCertificates: API.OperationMethod<
  ListHostnameCertificatesRequest,
  ListHostnameCertificatesResponse,
  ListHostnameCertificatesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListHostnameCertificatesRequest,
  output: ListHostnameCertificatesResponse,
  errors: [],
}));

export interface CreateHostnameCertificateRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The hostname certificate. */
  certificate: string;
  /** Body param: The hostname certificate's private key. */
  privateKey: string;
}

export const CreateHostnameCertificateRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  certificate: Schema.String,
  privateKey: Schema.String,
}).pipe(
  Schema.encodeKeys({ certificate: "certificate", privateKey: "private_key" }),
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/origin_tls_client_auth/hostnames/certificates",
  }),
) as unknown as Schema.Schema<CreateHostnameCertificateRequest>;

export interface CreateHostnameCertificateResponse {
  /** Identifier. */
  id?: string | null;
  /** The hostname certificate. */
  certificate?: string | null;
  /** The date when the certificate expires. */
  expiresOn?: string | null;
  /** The certificate authority that issued the certificate. */
  issuer?: string | null;
  /** The serial number on the uploaded certificate. */
  serialNumber?: string | null;
  /** The type of hash used for the certificate. */
  signature?: string | null;
  /** Status of the certificate or the association. */
  status?:
    | "initializing"
    | "pending_deployment"
    | "pending_deletion"
    | "active"
    | "deleted"
    | "deployment_timed_out"
    | "deletion_timed_out"
    | null;
  /** The time when the certificate was uploaded. */
  uploadedOn?: string | null;
}

export const CreateHostnameCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "initializing",
        "pending_deployment",
        "pending_deletion",
        "active",
        "deleted",
        "deployment_timed_out",
        "deletion_timed_out",
      ]),
      Schema.Null,
    ]),
  ),
  uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    expiresOn: "expires_on",
    issuer: "issuer",
    serialNumber: "serial_number",
    signature: "signature",
    status: "status",
    uploadedOn: "uploaded_on",
  }),
) as unknown as Schema.Schema<CreateHostnameCertificateResponse>;

export type CreateHostnameCertificateError = DefaultErrors;

export const createHostnameCertificate: API.OperationMethod<
  CreateHostnameCertificateRequest,
  CreateHostnameCertificateResponse,
  CreateHostnameCertificateError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateHostnameCertificateRequest,
  output: CreateHostnameCertificateResponse,
  errors: [],
}));

export interface DeleteHostnameCertificateRequest {
  certificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteHostnameCertificateRequest = Schema.Struct({
  certificateId: Schema.String.pipe(T.HttpPath("certificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/origin_tls_client_auth/hostnames/certificates/{certificateId}",
  }),
) as unknown as Schema.Schema<DeleteHostnameCertificateRequest>;

export interface DeleteHostnameCertificateResponse {
  /** Identifier. */
  id?: string | null;
  /** The hostname certificate. */
  certificate?: string | null;
  /** The date when the certificate expires. */
  expiresOn?: string | null;
  /** The certificate authority that issued the certificate. */
  issuer?: string | null;
  /** The serial number on the uploaded certificate. */
  serialNumber?: string | null;
  /** The type of hash used for the certificate. */
  signature?: string | null;
  /** Status of the certificate or the association. */
  status?:
    | "initializing"
    | "pending_deployment"
    | "pending_deletion"
    | "active"
    | "deleted"
    | "deployment_timed_out"
    | "deletion_timed_out"
    | null;
  /** The time when the certificate was uploaded. */
  uploadedOn?: string | null;
}

export const DeleteHostnameCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "initializing",
        "pending_deployment",
        "pending_deletion",
        "active",
        "deleted",
        "deployment_timed_out",
        "deletion_timed_out",
      ]),
      Schema.Null,
    ]),
  ),
  uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    expiresOn: "expires_on",
    issuer: "issuer",
    serialNumber: "serial_number",
    signature: "signature",
    status: "status",
    uploadedOn: "uploaded_on",
  }),
) as unknown as Schema.Schema<DeleteHostnameCertificateResponse>;

export type DeleteHostnameCertificateError = DefaultErrors;

export const deleteHostnameCertificate: API.OperationMethod<
  DeleteHostnameCertificateRequest,
  DeleteHostnameCertificateResponse,
  DeleteHostnameCertificateError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteHostnameCertificateRequest,
  output: DeleteHostnameCertificateResponse,
  errors: [],
}));

// =============================================================================
// OriginTlsClientAuth
// =============================================================================

export interface GetOriginTlsClientAuthRequest {
  certificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetOriginTlsClientAuthRequest = Schema.Struct({
  certificateId: Schema.String.pipe(T.HttpPath("certificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/origin_tls_client_auth/{certificateId}",
  }),
) as unknown as Schema.Schema<GetOriginTlsClientAuthRequest>;

export interface GetOriginTlsClientAuthResponse {
  /** Identifier. */
  id?: string | null;
  /** The zone's leaf certificate. */
  certificate?: string | null;
  /** Indicates whether zone-level authenticated origin pulls is enabled. */
  enabled?: boolean | null;
  /** The zone's private key. */
  privateKey?: string | null;
}

export const GetOriginTlsClientAuthResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  privateKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    enabled: "enabled",
    privateKey: "private_key",
  }),
) as unknown as Schema.Schema<GetOriginTlsClientAuthResponse>;

export type GetOriginTlsClientAuthError = DefaultErrors;

export const getOriginTlsClientAuth: API.OperationMethod<
  GetOriginTlsClientAuthRequest,
  GetOriginTlsClientAuthResponse,
  GetOriginTlsClientAuthError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOriginTlsClientAuthRequest,
  output: GetOriginTlsClientAuthResponse,
  errors: [],
}));

export interface ListOriginTlsClientAuthsRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListOriginTlsClientAuthsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/origin_tls_client_auth" }),
) as unknown as Schema.Schema<ListOriginTlsClientAuthsRequest>;

export type ListOriginTlsClientAuthsResponse = {
  id?: string | null;
  certificate?: string | null;
  enabled?: boolean | null;
  privateKey?: string | null;
}[];

export const ListOriginTlsClientAuthsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    privateKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      certificate: "certificate",
      enabled: "enabled",
      privateKey: "private_key",
    }),
  ),
) as unknown as Schema.Schema<ListOriginTlsClientAuthsResponse>;

export type ListOriginTlsClientAuthsError = DefaultErrors;

export const listOriginTlsClientAuths: API.OperationMethod<
  ListOriginTlsClientAuthsRequest,
  ListOriginTlsClientAuthsResponse,
  ListOriginTlsClientAuthsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOriginTlsClientAuthsRequest,
  output: ListOriginTlsClientAuthsResponse,
  errors: [],
}));

export interface CreateOriginTlsClientAuthRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The zone's leaf certificate. */
  certificate: string;
  /** Body param: The zone's private key. */
  privateKey: string;
}

export const CreateOriginTlsClientAuthRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  certificate: Schema.String,
  privateKey: Schema.String,
}).pipe(
  Schema.encodeKeys({ certificate: "certificate", privateKey: "private_key" }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/origin_tls_client_auth" }),
) as unknown as Schema.Schema<CreateOriginTlsClientAuthRequest>;

export interface CreateOriginTlsClientAuthResponse {
  /** Identifier. */
  id?: string | null;
  /** The zone's leaf certificate. */
  certificate?: string | null;
  /** Indicates whether zone-level authenticated origin pulls is enabled. */
  enabled?: boolean | null;
  /** The zone's private key. */
  privateKey?: string | null;
}

export const CreateOriginTlsClientAuthResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  privateKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    enabled: "enabled",
    privateKey: "private_key",
  }),
) as unknown as Schema.Schema<CreateOriginTlsClientAuthResponse>;

export type CreateOriginTlsClientAuthError = DefaultErrors;

export const createOriginTlsClientAuth: API.OperationMethod<
  CreateOriginTlsClientAuthRequest,
  CreateOriginTlsClientAuthResponse,
  CreateOriginTlsClientAuthError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateOriginTlsClientAuthRequest,
  output: CreateOriginTlsClientAuthResponse,
  errors: [],
}));

export interface DeleteOriginTlsClientAuthRequest {
  certificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteOriginTlsClientAuthRequest = Schema.Struct({
  certificateId: Schema.String.pipe(T.HttpPath("certificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/origin_tls_client_auth/{certificateId}",
  }),
) as unknown as Schema.Schema<DeleteOriginTlsClientAuthRequest>;

export interface DeleteOriginTlsClientAuthResponse {
  /** Identifier. */
  id?: string | null;
  /** The zone's leaf certificate. */
  certificate?: string | null;
  /** Indicates whether zone-level authenticated origin pulls is enabled. */
  enabled?: boolean | null;
  /** The zone's private key. */
  privateKey?: string | null;
}

export const DeleteOriginTlsClientAuthResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  certificate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  privateKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    certificate: "certificate",
    enabled: "enabled",
    privateKey: "private_key",
  }),
) as unknown as Schema.Schema<DeleteOriginTlsClientAuthResponse>;

export type DeleteOriginTlsClientAuthError = DefaultErrors;

export const deleteOriginTlsClientAuth: API.OperationMethod<
  DeleteOriginTlsClientAuthRequest,
  DeleteOriginTlsClientAuthResponse,
  DeleteOriginTlsClientAuthError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteOriginTlsClientAuthRequest,
  output: DeleteOriginTlsClientAuthResponse,
  errors: [],
}));

// =============================================================================
// Setting
// =============================================================================

export interface GetSettingRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/origin_tls_client_auth/settings",
  }),
) as unknown as Schema.Schema<GetSettingRequest>;

export interface GetSettingResponse {
  /** Indicates whether zone-level authenticated origin pulls is enabled. */
  enabled?: boolean | null;
}

export const GetSettingResponse = Schema.Struct({
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}) as unknown as Schema.Schema<GetSettingResponse>;

export type GetSettingError = DefaultErrors;

export const getSetting: API.OperationMethod<
  GetSettingRequest,
  GetSettingResponse,
  GetSettingError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettingRequest,
  output: GetSettingResponse,
  errors: [],
}));

export interface PutSettingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Indicates whether zone-level authenticated origin pulls is enabled. */
  enabled: boolean;
}

export const PutSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.Boolean,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/origin_tls_client_auth/settings",
  }),
) as unknown as Schema.Schema<PutSettingRequest>;

export interface PutSettingResponse {
  /** Indicates whether zone-level authenticated origin pulls is enabled. */
  enabled?: boolean | null;
}

export const PutSettingResponse = Schema.Struct({
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}) as unknown as Schema.Schema<PutSettingResponse>;

export type PutSettingError = DefaultErrors;

export const putSetting: API.OperationMethod<
  PutSettingRequest,
  PutSettingResponse,
  PutSettingError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSettingRequest,
  output: PutSettingResponse,
  errors: [],
}));
