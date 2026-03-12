/**
 * Cloudflare MTLS-CERTIFICATES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service mtls-certificates
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Association
// =============================================================================

export interface GetAssociationRequest {
  mtlsCertificateId: string;
  /** Identifier. */
  accountId: string;
}

export const GetAssociationRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  mtlsCertificateId: Schema.String.pipe(T.HttpPath("mtlsCertificateId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/mtls_certificates/{mtlsCertificateId}/associations",
  }),
) as unknown as Schema.Schema<GetAssociationRequest>;

export interface GetAssociationResponse {
  result: { service?: string | null; status?: string | null }[];
}

export const GetAssociationResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    result: Schema.Array(
      Schema.Struct({
        service: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
    ),
  },
) as unknown as Schema.Schema<GetAssociationResponse>;

export type GetAssociationError = DefaultErrors;

export const getAssociation: API.PaginatedOperationMethod<
  GetAssociationRequest,
  GetAssociationResponse,
  GetAssociationError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: GetAssociationRequest,
  ) => stream.Stream<
    GetAssociationResponse,
    GetAssociationError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: GetAssociationRequest,
  ) => stream.Stream<
    { service?: string | null; status?: string | null },
    GetAssociationError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetAssociationRequest,
  output: GetAssociationResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// MtlsCertificate
// =============================================================================

export interface GetMtlsCertificateRequest {
  mtlsCertificateId: string;
  /** Identifier. */
  accountId: string;
}

export const GetMtlsCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** Indicates whether the certificate is a CA or leaf certificate. */
  ca?: boolean | null;
  /** The uploaded root CA certificate. */
  certificates?: string | null;
  /** When the certificate expires. */
  expiresOn?: string | null;
  /** The certificate authority that issued the certificate. */
  issuer?: string | null;
  /** Optional unique name for the certificate. Only used for human readability. */
  name?: string | null;
  /** The certificate serial number. */
  serialNumber?: string | null;
  /** The type of hash used for the certificate. */
  signature?: string | null;
  /** This is the time the certificate was uploaded. */
  uploadedOn?: string | null;
}

export const GetMtlsCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    ca: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    certificates: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        ca: "ca",
        certificates: "certificates",
        expiresOn: "expires_on",
        issuer: "issuer",
        name: "name",
        serialNumber: "serial_number",
        signature: "signature",
        uploadedOn: "uploaded_on",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetMtlsCertificateResponse>;

export type GetMtlsCertificateError = DefaultErrors;

export const getMtlsCertificate: API.OperationMethod<
  GetMtlsCertificateRequest,
  GetMtlsCertificateResponse,
  GetMtlsCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMtlsCertificateRequest,
  output: GetMtlsCertificateResponse,
  errors: [],
}));

export interface ListMtlsCertificatesRequest {
  /** Identifier. */
  accountId: string;
}

export const ListMtlsCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/mtls_certificates" }),
  ) as unknown as Schema.Schema<ListMtlsCertificatesRequest>;

export interface ListMtlsCertificatesResponse {
  result: {
    id?: string | null;
    ca?: boolean | null;
    certificates?: string | null;
    expiresOn?: string | null;
    issuer?: string | null;
    name?: string | null;
    serialNumber?: string | null;
    signature?: string | null;
    uploadedOn?: string | null;
  }[];
}

export const ListMtlsCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        ca: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        certificates: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        serialNumber: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          ca: "ca",
          certificates: "certificates",
          expiresOn: "expires_on",
          issuer: "issuer",
          name: "name",
          serialNumber: "serial_number",
          signature: "signature",
          uploadedOn: "uploaded_on",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<ListMtlsCertificatesResponse>;

export type ListMtlsCertificatesError = DefaultErrors;

export const listMtlsCertificates: API.PaginatedOperationMethod<
  ListMtlsCertificatesRequest,
  ListMtlsCertificatesResponse,
  ListMtlsCertificatesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListMtlsCertificatesRequest,
  ) => stream.Stream<
    ListMtlsCertificatesResponse,
    ListMtlsCertificatesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListMtlsCertificatesRequest) => stream.Stream<
    {
      id?: string | null;
      ca?: boolean | null;
      certificates?: string | null;
      expiresOn?: string | null;
      issuer?: string | null;
      name?: string | null;
      serialNumber?: string | null;
      signature?: string | null;
      uploadedOn?: string | null;
    },
    ListMtlsCertificatesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMtlsCertificatesRequest,
  output: ListMtlsCertificatesResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
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

export const CreateMtlsCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    ca: Schema.Boolean,
    certificates: Schema.String,
    name: Schema.optional(Schema.String),
    privateKey: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      ca: "ca",
      certificates: "certificates",
      name: "name",
      privateKey: "private_key",
    }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/mtls_certificates",
    }),
  ) as unknown as Schema.Schema<CreateMtlsCertificateRequest>;

export interface CreateMtlsCertificateResponse {
  /** Identifier. */
  id?: string | null;
  /** Indicates whether the certificate is a CA or leaf certificate. */
  ca?: boolean | null;
  /** The uploaded root CA certificate. */
  certificates?: string | null;
  /** When the certificate expires. */
  expiresOn?: string | null;
  /** The certificate authority that issued the certificate. */
  issuer?: string | null;
  /** Optional unique name for the certificate. Only used for human readability. */
  name?: string | null;
  /** The certificate serial number. */
  serialNumber?: string | null;
  /** The type of hash used for the certificate. */
  signature?: string | null;
  /** This is the time the certificate was updated. */
  updatedAt?: string | null;
  /** This is the time the certificate was uploaded. */
  uploadedOn?: string | null;
}

export const CreateMtlsCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    ca: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    certificates: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        ca: "ca",
        certificates: "certificates",
        expiresOn: "expires_on",
        issuer: "issuer",
        name: "name",
        serialNumber: "serial_number",
        signature: "signature",
        updatedAt: "updated_at",
        uploadedOn: "uploaded_on",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateMtlsCertificateResponse>;

export type CreateMtlsCertificateError = DefaultErrors;

export const createMtlsCertificate: API.OperationMethod<
  CreateMtlsCertificateRequest,
  CreateMtlsCertificateResponse,
  CreateMtlsCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMtlsCertificateRequest,
  output: CreateMtlsCertificateResponse,
  errors: [],
}));

export interface DeleteMtlsCertificateRequest {
  mtlsCertificateId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteMtlsCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** Indicates whether the certificate is a CA or leaf certificate. */
  ca?: boolean | null;
  /** The uploaded root CA certificate. */
  certificates?: string | null;
  /** When the certificate expires. */
  expiresOn?: string | null;
  /** The certificate authority that issued the certificate. */
  issuer?: string | null;
  /** Optional unique name for the certificate. Only used for human readability. */
  name?: string | null;
  /** The certificate serial number. */
  serialNumber?: string | null;
  /** The type of hash used for the certificate. */
  signature?: string | null;
  /** This is the time the certificate was uploaded. */
  uploadedOn?: string | null;
}

export const DeleteMtlsCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    ca: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    certificates: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    serialNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        ca: "ca",
        certificates: "certificates",
        expiresOn: "expires_on",
        issuer: "issuer",
        name: "name",
        serialNumber: "serial_number",
        signature: "signature",
        uploadedOn: "uploaded_on",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteMtlsCertificateResponse>;

export type DeleteMtlsCertificateError = DefaultErrors;

export const deleteMtlsCertificate: API.OperationMethod<
  DeleteMtlsCertificateRequest,
  DeleteMtlsCertificateResponse,
  DeleteMtlsCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMtlsCertificateRequest,
  output: DeleteMtlsCertificateResponse,
  errors: [],
}));
