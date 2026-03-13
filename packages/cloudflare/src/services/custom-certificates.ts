/**
 * Cloudflare CUSTOM-CERTIFICATES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service custom-certificates
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// CustomCertificate
// =============================================================================

export interface GetCustomCertificateRequest {
  customCertificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetCustomCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customCertificateId: Schema.String.pipe(T.HttpPath("customCertificateId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/custom_certificates/{customCertificateId}",
    }),
  ) as unknown as Schema.Schema<GetCustomCertificateRequest>;

export interface GetCustomCertificateResponse {
  /** Identifier. */
  id: string;
  /** A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates */
  bundleMethod: "ubiquitous" | "optimal" | "force";
  /** When the certificate from the authority expires. */
  expiresOn: string;
  hosts: string[];
  /** The certificate authority that issued the certificate. */
  issuer: string;
  /** When the certificate was last modified. */
  modifiedOn: string;
  /** The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom' certificates, but 'legacy_custom' certificates will always */
  priority: number;
  /** The type of hash used for the certificate. */
  signature: string;
  /** Status of the zone's custom SSL. */
  status: "active" | "expired" | "deleted" | "pending" | "initializing";
  /** When the certificate was uploaded to Cloudflare. */
  uploadedOn: string;
  /** Identifier. */
  zoneId: string;
  /** Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency whil */
  geoRestrictions?: { label?: "us" | "eu" | "highest_security" | null } | null;
  keylessServer?: unknown | null;
  /** Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency whil */
  policy?: string | null;
}

export const GetCustomCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    bundleMethod: Schema.Literals(["ubiquitous", "optimal", "force"]),
    expiresOn: Schema.String,
    hosts: Schema.Array(Schema.String),
    issuer: Schema.String,
    modifiedOn: Schema.String,
    priority: Schema.Number,
    signature: Schema.String,
    status: Schema.Literals([
      "active",
      "expired",
      "deleted",
      "pending",
      "initializing",
    ]),
    uploadedOn: Schema.String,
    zoneId: Schema.String,
    geoRestrictions: Schema.optional(
      Schema.Union([
        Schema.Struct({
          label: Schema.optional(
            Schema.Union([
              Schema.Literals(["us", "eu", "highest_security"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    keylessServer: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    policy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        bundleMethod: "bundle_method",
        expiresOn: "expires_on",
        hosts: "hosts",
        issuer: "issuer",
        modifiedOn: "modified_on",
        priority: "priority",
        signature: "signature",
        status: "status",
        uploadedOn: "uploaded_on",
        zoneId: "zone_id",
        geoRestrictions: "geo_restrictions",
        keylessServer: "keyless_server",
        policy: "policy",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetCustomCertificateResponse>;

export type GetCustomCertificateError = DefaultErrors;

export const getCustomCertificate: API.OperationMethod<
  GetCustomCertificateRequest,
  GetCustomCertificateResponse,
  GetCustomCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCustomCertificateRequest,
  output: GetCustomCertificateResponse,
  errors: [],
}));

export interface ListCustomCertificatesRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Whether to match all search requirements or at least one (any). */
  match?: "any" | "all";
  /** Query param: Status of the zone's custom SSL. */
  status?: "active" | "expired" | "deleted" | "pending" | "initializing";
}

export const ListCustomCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    match: Schema.optional(Schema.Literals(["any", "all"])).pipe(
      T.HttpQuery("match"),
    ),
    status: Schema.optional(
      Schema.Literals([
        "active",
        "expired",
        "deleted",
        "pending",
        "initializing",
      ]),
    ).pipe(T.HttpQuery("status")),
  }).pipe(
    T.Http({ method: "GET", path: "/zones/{zone_id}/custom_certificates" }),
  ) as unknown as Schema.Schema<ListCustomCertificatesRequest>;

export interface ListCustomCertificatesResponse {
  result: {
    id: string;
    bundleMethod: "ubiquitous" | "optimal" | "force";
    expiresOn: string;
    hosts: string[];
    issuer: string;
    modifiedOn: string;
    priority: number;
    signature: string;
    status: "active" | "expired" | "deleted" | "pending" | "initializing";
    uploadedOn: string;
    zoneId: string;
    geoRestrictions?: {
      label?: "us" | "eu" | "highest_security" | null;
    } | null;
    keylessServer?: unknown | null;
    policy?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListCustomCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        bundleMethod: Schema.Literals(["ubiquitous", "optimal", "force"]),
        expiresOn: Schema.String,
        hosts: Schema.Array(Schema.String),
        issuer: Schema.String,
        modifiedOn: Schema.String,
        priority: Schema.Number,
        signature: Schema.String,
        status: Schema.Literals([
          "active",
          "expired",
          "deleted",
          "pending",
          "initializing",
        ]),
        uploadedOn: Schema.String,
        zoneId: Schema.String,
        geoRestrictions: Schema.optional(
          Schema.Union([
            Schema.Struct({
              label: Schema.optional(
                Schema.Union([
                  Schema.Literals(["us", "eu", "highest_security"]),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        keylessServer: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        policy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          bundleMethod: "bundle_method",
          expiresOn: "expires_on",
          hosts: "hosts",
          issuer: "issuer",
          modifiedOn: "modified_on",
          priority: "priority",
          signature: "signature",
          status: "status",
          uploadedOn: "uploaded_on",
          zoneId: "zone_id",
          geoRestrictions: "geo_restrictions",
          keylessServer: "keyless_server",
          policy: "policy",
        }),
      ),
    ),
    resultInfo: Schema.Struct({
      count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        count: "count",
        page: "page",
        perPage: "per_page",
        totalCount: "total_count",
      }),
    ),
  }).pipe(
    Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
  ) as unknown as Schema.Schema<ListCustomCertificatesResponse>;

export type ListCustomCertificatesError = DefaultErrors;

export const listCustomCertificates: API.PaginatedOperationMethod<
  ListCustomCertificatesRequest,
  ListCustomCertificatesResponse,
  ListCustomCertificatesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListCustomCertificatesRequest,
  ) => stream.Stream<
    ListCustomCertificatesResponse,
    ListCustomCertificatesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListCustomCertificatesRequest) => stream.Stream<
    {
      id: string;
      bundleMethod: "ubiquitous" | "optimal" | "force";
      expiresOn: string;
      hosts: string[];
      issuer: string;
      modifiedOn: string;
      priority: number;
      signature: string;
      status: "active" | "expired" | "deleted" | "pending" | "initializing";
      uploadedOn: string;
      zoneId: string;
      geoRestrictions?: {
        label?: "us" | "eu" | "highest_security" | null;
      } | null;
      keylessServer?: unknown | null;
      policy?: string | null;
    },
    ListCustomCertificatesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomCertificatesRequest,
  output: ListCustomCertificatesResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateCustomCertificateRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The zone's SSL certificate or certificate and the intermediate(s). */
  certificate: string;
  /** Body param: The zone's private key. */
  privateKey: string;
  /** Body param: A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest i */
  bundleMethod?: "ubiquitous" | "optimal" | "force";
  /** Body param: Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some  */
  geoRestrictions?: { label?: "us" | "eu" | "highest_security" };
  /** Body param: Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some  */
  policy?: string;
  /** Body param: The type 'legacy_custom' enables support for legacy clients which do not include SNI in the TLS handshake. */
  type?: "legacy_custom" | "sni_custom";
}

export const CreateCustomCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    certificate: Schema.String,
    privateKey: Schema.String,
    bundleMethod: Schema.optional(
      Schema.Literals(["ubiquitous", "optimal", "force"]),
    ),
    geoRestrictions: Schema.optional(
      Schema.Struct({
        label: Schema.optional(
          Schema.Literals(["us", "eu", "highest_security"]),
        ),
      }),
    ),
    policy: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Literals(["legacy_custom", "sni_custom"])),
  }).pipe(
    Schema.encodeKeys({
      certificate: "certificate",
      privateKey: "private_key",
      bundleMethod: "bundle_method",
      geoRestrictions: "geo_restrictions",
      policy: "policy",
      type: "type",
    }),
    T.Http({ method: "POST", path: "/zones/{zone_id}/custom_certificates" }),
  ) as unknown as Schema.Schema<CreateCustomCertificateRequest>;

export interface CreateCustomCertificateResponse {
  /** Identifier. */
  id: string;
  /** A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates */
  bundleMethod: "ubiquitous" | "optimal" | "force";
  /** When the certificate from the authority expires. */
  expiresOn: string;
  hosts: string[];
  /** The certificate authority that issued the certificate. */
  issuer: string;
  /** When the certificate was last modified. */
  modifiedOn: string;
  /** The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom' certificates, but 'legacy_custom' certificates will always */
  priority: number;
  /** The type of hash used for the certificate. */
  signature: string;
  /** Status of the zone's custom SSL. */
  status: "active" | "expired" | "deleted" | "pending" | "initializing";
  /** When the certificate was uploaded to Cloudflare. */
  uploadedOn: string;
  /** Identifier. */
  zoneId: string;
  /** Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency whil */
  geoRestrictions?: { label?: "us" | "eu" | "highest_security" | null } | null;
  keylessServer?: unknown | null;
  /** Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency whil */
  policy?: string | null;
}

export const CreateCustomCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    bundleMethod: Schema.Literals(["ubiquitous", "optimal", "force"]),
    expiresOn: Schema.String,
    hosts: Schema.Array(Schema.String),
    issuer: Schema.String,
    modifiedOn: Schema.String,
    priority: Schema.Number,
    signature: Schema.String,
    status: Schema.Literals([
      "active",
      "expired",
      "deleted",
      "pending",
      "initializing",
    ]),
    uploadedOn: Schema.String,
    zoneId: Schema.String,
    geoRestrictions: Schema.optional(
      Schema.Union([
        Schema.Struct({
          label: Schema.optional(
            Schema.Union([
              Schema.Literals(["us", "eu", "highest_security"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    keylessServer: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    policy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        bundleMethod: "bundle_method",
        expiresOn: "expires_on",
        hosts: "hosts",
        issuer: "issuer",
        modifiedOn: "modified_on",
        priority: "priority",
        signature: "signature",
        status: "status",
        uploadedOn: "uploaded_on",
        zoneId: "zone_id",
        geoRestrictions: "geo_restrictions",
        keylessServer: "keyless_server",
        policy: "policy",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateCustomCertificateResponse>;

export type CreateCustomCertificateError = DefaultErrors;

export const createCustomCertificate: API.OperationMethod<
  CreateCustomCertificateRequest,
  CreateCustomCertificateResponse,
  CreateCustomCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCustomCertificateRequest,
  output: CreateCustomCertificateResponse,
  errors: [],
}));

export interface PatchCustomCertificateRequest {
  customCertificateId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest i */
  bundleMethod?: "ubiquitous" | "optimal" | "force";
  /** Body param: The zone's SSL certificate or certificate and the intermediate(s). */
  certificate?: string;
  /** Body param: Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some  */
  geoRestrictions?: { label?: "us" | "eu" | "highest_security" };
  /** Body param: Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some  */
  policy?: string;
  /** Body param: The zone's private key. */
  privateKey?: string;
}

export const PatchCustomCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customCertificateId: Schema.String.pipe(T.HttpPath("customCertificateId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    bundleMethod: Schema.optional(
      Schema.Literals(["ubiquitous", "optimal", "force"]),
    ),
    certificate: Schema.optional(Schema.String),
    geoRestrictions: Schema.optional(
      Schema.Struct({
        label: Schema.optional(
          Schema.Literals(["us", "eu", "highest_security"]),
        ),
      }),
    ),
    policy: Schema.optional(Schema.String),
    privateKey: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      bundleMethod: "bundle_method",
      certificate: "certificate",
      geoRestrictions: "geo_restrictions",
      policy: "policy",
      privateKey: "private_key",
    }),
    T.Http({
      method: "PATCH",
      path: "/zones/{zone_id}/custom_certificates/{customCertificateId}",
    }),
  ) as unknown as Schema.Schema<PatchCustomCertificateRequest>;

export interface PatchCustomCertificateResponse {
  /** Identifier. */
  id: string;
  /** A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates */
  bundleMethod: "ubiquitous" | "optimal" | "force";
  /** When the certificate from the authority expires. */
  expiresOn: string;
  hosts: string[];
  /** The certificate authority that issued the certificate. */
  issuer: string;
  /** When the certificate was last modified. */
  modifiedOn: string;
  /** The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom' certificates, but 'legacy_custom' certificates will always */
  priority: number;
  /** The type of hash used for the certificate. */
  signature: string;
  /** Status of the zone's custom SSL. */
  status: "active" | "expired" | "deleted" | "pending" | "initializing";
  /** When the certificate was uploaded to Cloudflare. */
  uploadedOn: string;
  /** Identifier. */
  zoneId: string;
  /** Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency whil */
  geoRestrictions?: { label?: "us" | "eu" | "highest_security" | null } | null;
  keylessServer?: unknown | null;
  /** Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency whil */
  policy?: string | null;
}

export const PatchCustomCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    bundleMethod: Schema.Literals(["ubiquitous", "optimal", "force"]),
    expiresOn: Schema.String,
    hosts: Schema.Array(Schema.String),
    issuer: Schema.String,
    modifiedOn: Schema.String,
    priority: Schema.Number,
    signature: Schema.String,
    status: Schema.Literals([
      "active",
      "expired",
      "deleted",
      "pending",
      "initializing",
    ]),
    uploadedOn: Schema.String,
    zoneId: Schema.String,
    geoRestrictions: Schema.optional(
      Schema.Union([
        Schema.Struct({
          label: Schema.optional(
            Schema.Union([
              Schema.Literals(["us", "eu", "highest_security"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    keylessServer: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    policy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        bundleMethod: "bundle_method",
        expiresOn: "expires_on",
        hosts: "hosts",
        issuer: "issuer",
        modifiedOn: "modified_on",
        priority: "priority",
        signature: "signature",
        status: "status",
        uploadedOn: "uploaded_on",
        zoneId: "zone_id",
        geoRestrictions: "geo_restrictions",
        keylessServer: "keyless_server",
        policy: "policy",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PatchCustomCertificateResponse>;

export type PatchCustomCertificateError = DefaultErrors;

export const patchCustomCertificate: API.OperationMethod<
  PatchCustomCertificateRequest,
  PatchCustomCertificateResponse,
  PatchCustomCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCustomCertificateRequest,
  output: PatchCustomCertificateResponse,
  errors: [],
}));

export interface DeleteCustomCertificateRequest {
  customCertificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteCustomCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customCertificateId: Schema.String.pipe(T.HttpPath("customCertificateId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/zones/{zone_id}/custom_certificates/{customCertificateId}",
    }),
  ) as unknown as Schema.Schema<DeleteCustomCertificateRequest>;

export interface DeleteCustomCertificateResponse {
  /** Identifier. */
  id?: string | null;
}

export const DeleteCustomCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteCustomCertificateResponse>;

export type DeleteCustomCertificateError = DefaultErrors;

export const deleteCustomCertificate: API.OperationMethod<
  DeleteCustomCertificateRequest,
  DeleteCustomCertificateResponse,
  DeleteCustomCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCustomCertificateRequest,
  output: DeleteCustomCertificateResponse,
  errors: [],
}));

// =============================================================================
// Prioritize
// =============================================================================

export interface PutPrioritizeRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Array of ordered certificates. */
  certificates: { id?: string; priority?: number }[];
}

export const PutPrioritizeRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  certificates: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      priority: Schema.optional(Schema.Number),
    }),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/custom_certificates/prioritize",
  }),
) as unknown as Schema.Schema<PutPrioritizeRequest>;

export type PutPrioritizeResponse = unknown;

export const PutPrioritizeResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<PutPrioritizeResponse>;

export type PutPrioritizeError = DefaultErrors;

export const putPrioritize: API.OperationMethod<
  PutPrioritizeRequest,
  PutPrioritizeResponse,
  PutPrioritizeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutPrioritizeRequest,
  output: PutPrioritizeResponse,
  errors: [],
}));
