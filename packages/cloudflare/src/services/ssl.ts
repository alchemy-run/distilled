/**
 * Cloudflare SSL API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service ssl
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Analyze
// =============================================================================

export interface CreateAnalyzeRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest i */
  bundleMethod?: "ubiquitous" | "optimal" | "force";
  /** Body param: The zone's SSL certificate or certificate and the intermediate(s). */
  certificate?: string;
}

export const CreateAnalyzeRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  bundleMethod: Schema.optional(
    Schema.Literals(["ubiquitous", "optimal", "force"]),
  ),
  certificate: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    bundleMethod: "bundle_method",
    certificate: "certificate",
  }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/ssl/analyze" }),
) as unknown as Schema.Schema<CreateAnalyzeRequest>;

export type CreateAnalyzeResponse = unknown;

export const CreateAnalyzeResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown.pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateAnalyzeResponse>;

export type CreateAnalyzeError = DefaultErrors;

export const createAnalyze: API.OperationMethod<
  CreateAnalyzeRequest,
  CreateAnalyzeResponse,
  CreateAnalyzeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAnalyzeRequest,
  output: CreateAnalyzeResponse,
  errors: [],
}));

// =============================================================================
// CertificatePack
// =============================================================================

export interface GetCertificatePackRequest {
  certificatePackId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetCertificatePackRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificatePackId: Schema.String.pipe(T.HttpPath("certificatePackId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/ssl/certificate_packs/{certificatePackId}",
    }),
  ) as unknown as Schema.Schema<GetCertificatePackRequest>;

export interface GetCertificatePackResponse {
  /** Identifier. */
  id: string;
  /** Array of certificates in this pack. */
  certificates: {
    id: string;
    hosts: string[];
    status: string;
    bundleMethod?: string | null;
    expiresOn?: string | null;
    geoRestrictions?: {
      label?: "us" | "eu" | "highest_security" | null;
    } | null;
    issuer?: string | null;
    modifiedOn?: string | null;
    priority?: number | null;
    signature?: string | null;
    uploadedOn?: string | null;
    zoneId?: string | null;
  }[];
  /** Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty. */
  hosts: string[];
  /** Status of certificate pack. */
  status:
    | "initializing"
    | "pending_validation"
    | "deleted"
    | "pending_issuance"
    | "pending_deployment"
    | "pending_deletion"
    | "pending_expiration"
    | "expired"
    | "active"
    | "initializing_timed_out"
    | "validation_timed_out"
    | "issuance_timed_out"
    | "deployment_timed_out"
    | "deletion_timed_out"
    | "pending_cleanup"
    | "staging_deployment"
    | "staging_active"
    | "deactivating"
    | "inactive"
    | "backup_issued"
    | "holding_deployment";
  /** Type of certificate pack. */
  type:
    | "mh_custom"
    | "managed_hostname"
    | "sni_custom"
    | "universal"
    | "advanced"
    | "total_tls"
    | "keyless"
    | "legacy_custom";
  /** Certificate Authority selected for the order. For information on any certificate authority specific details or restrictions [see this page for more details.](https://developers.cloudflare.com/ssl/refe */
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com" | null;
  /** Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true. */
  cloudflareBranding?: boolean | null;
  /** Identifier of the primary certificate in a pack. */
  primaryCertificate?: string | null;
  /** Domain validation errors that have been received by the certificate authority (CA). */
  validationErrors?: { message?: string | null }[] | null;
  /** Validation Method selected for the order. */
  validationMethod?: "txt" | "http" | "email" | null;
  /** Certificates' validation records. */
  validationRecords?:
    | {
        emails?: string[] | null;
        httpBody?: string | null;
        httpUrl?: string | null;
        txtName?: string | null;
        txtValue?: string | null;
      }[]
    | null;
  /** Validity Days selected for the order. */
  validityDays?: "14" | "30" | "90" | "365" | null;
}

export const GetCertificatePackResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    certificates: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        hosts: Schema.Array(Schema.String),
        status: Schema.String,
        bundleMethod: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
        issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          hosts: "hosts",
          status: "status",
          bundleMethod: "bundle_method",
          expiresOn: "expires_on",
          geoRestrictions: "geo_restrictions",
          issuer: "issuer",
          modifiedOn: "modified_on",
          priority: "priority",
          signature: "signature",
          uploadedOn: "uploaded_on",
          zoneId: "zone_id",
        }),
      ),
    ),
    hosts: Schema.Array(Schema.String),
    status: Schema.Literals([
      "initializing",
      "pending_validation",
      "deleted",
      "pending_issuance",
      "pending_deployment",
      "pending_deletion",
      "pending_expiration",
      "expired",
      "active",
      "initializing_timed_out",
      "validation_timed_out",
      "issuance_timed_out",
      "deployment_timed_out",
      "deletion_timed_out",
      "pending_cleanup",
      "staging_deployment",
      "staging_active",
      "deactivating",
      "inactive",
      "backup_issued",
      "holding_deployment",
    ]),
    type: Schema.Literals([
      "mh_custom",
      "managed_hostname",
      "sni_custom",
      "universal",
      "advanced",
      "total_tls",
      "keyless",
      "legacy_custom",
    ]),
    certificateAuthority: Schema.optional(
      Schema.Union([
        Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
        Schema.Null,
      ]),
    ),
    cloudflareBranding: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    primaryCertificate: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    validationErrors: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            message: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
    validationMethod: Schema.optional(
      Schema.Union([Schema.Literals(["txt", "http", "email"]), Schema.Null]),
    ),
    validationRecords: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            emails: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            httpBody: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            httpUrl: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            txtName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            txtValue: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              emails: "emails",
              httpBody: "http_body",
              httpUrl: "http_url",
              txtName: "txt_name",
              txtValue: "txt_value",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    validityDays: Schema.optional(
      Schema.Union([Schema.Literals(["14", "30", "90", "365"]), Schema.Null]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        certificates: "certificates",
        hosts: "hosts",
        status: "status",
        type: "type",
        certificateAuthority: "certificate_authority",
        cloudflareBranding: "cloudflare_branding",
        primaryCertificate: "primary_certificate",
        validationErrors: "validation_errors",
        validationMethod: "validation_method",
        validationRecords: "validation_records",
        validityDays: "validity_days",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetCertificatePackResponse>;

export type GetCertificatePackError = DefaultErrors;

export const getCertificatePack: API.OperationMethod<
  GetCertificatePackRequest,
  GetCertificatePackResponse,
  GetCertificatePackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCertificatePackRequest,
  output: GetCertificatePackResponse,
  errors: [],
}));

export interface ListCertificatePacksRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Include Certificate Packs of all statuses, not just active ones. */
  status?: "all";
}

export const ListCertificatePacksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    status: Schema.optional(Schema.Literal("all")).pipe(T.HttpQuery("status")),
  }).pipe(
    T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/certificate_packs" }),
  ) as unknown as Schema.Schema<ListCertificatePacksRequest>;

export interface ListCertificatePacksResponse {
  result: {
    id: string;
    certificates: {
      id: string;
      hosts: string[];
      status: string;
      bundleMethod?: string | null;
      expiresOn?: string | null;
      geoRestrictions?: {
        label?: "us" | "eu" | "highest_security" | null;
      } | null;
      issuer?: string | null;
      modifiedOn?: string | null;
      priority?: number | null;
      signature?: string | null;
      uploadedOn?: string | null;
      zoneId?: string | null;
    }[];
    hosts: string[];
    status:
      | "initializing"
      | "pending_validation"
      | "deleted"
      | "pending_issuance"
      | "pending_deployment"
      | "pending_deletion"
      | "pending_expiration"
      | "expired"
      | "active"
      | "initializing_timed_out"
      | "validation_timed_out"
      | "issuance_timed_out"
      | "deployment_timed_out"
      | "deletion_timed_out"
      | "pending_cleanup"
      | "staging_deployment"
      | "staging_active"
      | "deactivating"
      | "inactive"
      | "backup_issued"
      | "holding_deployment";
    type:
      | "mh_custom"
      | "managed_hostname"
      | "sni_custom"
      | "universal"
      | "advanced"
      | "total_tls"
      | "keyless"
      | "legacy_custom";
    certificateAuthority?: "google" | "lets_encrypt" | "ssl_com" | null;
    cloudflareBranding?: boolean | null;
    primaryCertificate?: string | null;
    validationErrors?: { message?: string | null }[] | null;
    validationMethod?: "txt" | "http" | "email" | null;
    validationRecords?:
      | {
          emails?: string[] | null;
          httpBody?: string | null;
          httpUrl?: string | null;
          txtName?: string | null;
          txtValue?: string | null;
        }[]
      | null;
    validityDays?: "14" | "30" | "90" | "365" | null;
  }[];
}

export const ListCertificatePacksResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        certificates: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            hosts: Schema.Array(Schema.String),
            status: Schema.String,
            bundleMethod: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            expiresOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
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
            issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            modifiedOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            priority: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            signature: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            uploadedOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              hosts: "hosts",
              status: "status",
              bundleMethod: "bundle_method",
              expiresOn: "expires_on",
              geoRestrictions: "geo_restrictions",
              issuer: "issuer",
              modifiedOn: "modified_on",
              priority: "priority",
              signature: "signature",
              uploadedOn: "uploaded_on",
              zoneId: "zone_id",
            }),
          ),
        ),
        hosts: Schema.Array(Schema.String),
        status: Schema.Literals([
          "initializing",
          "pending_validation",
          "deleted",
          "pending_issuance",
          "pending_deployment",
          "pending_deletion",
          "pending_expiration",
          "expired",
          "active",
          "initializing_timed_out",
          "validation_timed_out",
          "issuance_timed_out",
          "deployment_timed_out",
          "deletion_timed_out",
          "pending_cleanup",
          "staging_deployment",
          "staging_active",
          "deactivating",
          "inactive",
          "backup_issued",
          "holding_deployment",
        ]),
        type: Schema.Literals([
          "mh_custom",
          "managed_hostname",
          "sni_custom",
          "universal",
          "advanced",
          "total_tls",
          "keyless",
          "legacy_custom",
        ]),
        certificateAuthority: Schema.optional(
          Schema.Union([
            Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
            Schema.Null,
          ]),
        ),
        cloudflareBranding: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        primaryCertificate: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        validationErrors: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                message: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
            ),
            Schema.Null,
          ]),
        ),
        validationMethod: Schema.optional(
          Schema.Union([
            Schema.Literals(["txt", "http", "email"]),
            Schema.Null,
          ]),
        ),
        validationRecords: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                emails: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                httpBody: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                httpUrl: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                txtName: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                txtValue: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  emails: "emails",
                  httpBody: "http_body",
                  httpUrl: "http_url",
                  txtName: "txt_name",
                  txtValue: "txt_value",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        validityDays: Schema.optional(
          Schema.Union([
            Schema.Literals(["14", "30", "90", "365"]),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          certificates: "certificates",
          hosts: "hosts",
          status: "status",
          type: "type",
          certificateAuthority: "certificate_authority",
          cloudflareBranding: "cloudflare_branding",
          primaryCertificate: "primary_certificate",
          validationErrors: "validation_errors",
          validationMethod: "validation_method",
          validationRecords: "validation_records",
          validityDays: "validity_days",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<ListCertificatePacksResponse>;

export type ListCertificatePacksError = DefaultErrors;

export const listCertificatePacks: API.PaginatedOperationMethod<
  ListCertificatePacksRequest,
  ListCertificatePacksResponse,
  ListCertificatePacksError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListCertificatePacksRequest,
  ) => stream.Stream<
    ListCertificatePacksResponse,
    ListCertificatePacksError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListCertificatePacksRequest,
  ) => stream.Stream<
    {
      id: string;
      certificates: {
        id: string;
        hosts: string[];
        status: string;
        bundleMethod?: string | null;
        expiresOn?: string | null;
        geoRestrictions?: {
          label?: "us" | "eu" | "highest_security" | null;
        } | null;
        issuer?: string | null;
        modifiedOn?: string | null;
        priority?: number | null;
        signature?: string | null;
        uploadedOn?: string | null;
        zoneId?: string | null;
      }[];
      hosts: string[];
      status:
        | "initializing"
        | "pending_validation"
        | "deleted"
        | "pending_issuance"
        | "pending_deployment"
        | "pending_deletion"
        | "pending_expiration"
        | "expired"
        | "active"
        | "initializing_timed_out"
        | "validation_timed_out"
        | "issuance_timed_out"
        | "deployment_timed_out"
        | "deletion_timed_out"
        | "pending_cleanup"
        | "staging_deployment"
        | "staging_active"
        | "deactivating"
        | "inactive"
        | "backup_issued"
        | "holding_deployment";
      type:
        | "mh_custom"
        | "managed_hostname"
        | "sni_custom"
        | "universal"
        | "advanced"
        | "total_tls"
        | "keyless"
        | "legacy_custom";
      certificateAuthority?: "google" | "lets_encrypt" | "ssl_com" | null;
      cloudflareBranding?: boolean | null;
      primaryCertificate?: string | null;
      validationErrors?: { message?: string | null }[] | null;
      validationMethod?: "txt" | "http" | "email" | null;
      validationRecords?:
        | {
            emails?: string[] | null;
            httpBody?: string | null;
            httpUrl?: string | null;
            txtName?: string | null;
            txtValue?: string | null;
          }[]
        | null;
      validityDays?: "14" | "30" | "90" | "365" | null;
    },
    ListCertificatePacksError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCertificatePacksRequest,
  output: ListCertificatePacksResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateCertificatePackRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Certificate Authority selected for the order. For information on any certificate authority specific details or restrictions [see this page for more details.](https://developers.cloudflare. */
  certificateAuthority: "google" | "lets_encrypt" | "ssl_com";
  /** Body param: Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty. */
  hosts: string[];
  /** Body param: Type of certificate pack. */
  type: "advanced";
  /** Body param: Validation Method selected for the order. */
  validationMethod: "txt" | "http" | "email";
  /** Body param: Validity Days selected for the order. */
  validityDays: "14" | "30" | "90" | "365";
  /** Body param: Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true. */
  cloudflareBranding?: boolean;
}

export const CreateCertificatePackRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    certificateAuthority: Schema.Literals([
      "google",
      "lets_encrypt",
      "ssl_com",
    ]),
    hosts: Schema.Array(Schema.String),
    type: Schema.Literal("advanced"),
    validationMethod: Schema.Literals(["txt", "http", "email"]),
    validityDays: Schema.Literals(["14", "30", "90", "365"]),
    cloudflareBranding: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      certificateAuthority: "certificate_authority",
      hosts: "hosts",
      type: "type",
      validationMethod: "validation_method",
      validityDays: "validity_days",
      cloudflareBranding: "cloudflare_branding",
    }),
    T.Http({
      method: "POST",
      path: "/zones/{zone_id}/ssl/certificate_packs/order",
    }),
  ) as unknown as Schema.Schema<CreateCertificatePackRequest>;

export interface CreateCertificatePackResponse {
  /** Identifier. */
  id: string;
  /** Array of certificates in this pack. */
  certificates: {
    id: string;
    hosts: string[];
    status: string;
    bundleMethod?: string | null;
    expiresOn?: string | null;
    geoRestrictions?: {
      label?: "us" | "eu" | "highest_security" | null;
    } | null;
    issuer?: string | null;
    modifiedOn?: string | null;
    priority?: number | null;
    signature?: string | null;
    uploadedOn?: string | null;
    zoneId?: string | null;
  }[];
  /** Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty. */
  hosts: string[];
  /** Status of certificate pack. */
  status:
    | "initializing"
    | "pending_validation"
    | "deleted"
    | "pending_issuance"
    | "pending_deployment"
    | "pending_deletion"
    | "pending_expiration"
    | "expired"
    | "active"
    | "initializing_timed_out"
    | "validation_timed_out"
    | "issuance_timed_out"
    | "deployment_timed_out"
    | "deletion_timed_out"
    | "pending_cleanup"
    | "staging_deployment"
    | "staging_active"
    | "deactivating"
    | "inactive"
    | "backup_issued"
    | "holding_deployment";
  /** Type of certificate pack. */
  type:
    | "mh_custom"
    | "managed_hostname"
    | "sni_custom"
    | "universal"
    | "advanced"
    | "total_tls"
    | "keyless"
    | "legacy_custom";
  /** Certificate Authority selected for the order. For information on any certificate authority specific details or restrictions [see this page for more details.](https://developers.cloudflare.com/ssl/refe */
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com" | null;
  /** Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true. */
  cloudflareBranding?: boolean | null;
  /** Identifier of the primary certificate in a pack. */
  primaryCertificate?: string | null;
  /** Domain validation errors that have been received by the certificate authority (CA). */
  validationErrors?: { message?: string | null }[] | null;
  /** Validation Method selected for the order. */
  validationMethod?: "txt" | "http" | "email" | null;
  /** Certificates' validation records. */
  validationRecords?:
    | {
        emails?: string[] | null;
        httpBody?: string | null;
        httpUrl?: string | null;
        txtName?: string | null;
        txtValue?: string | null;
      }[]
    | null;
  /** Validity Days selected for the order. */
  validityDays?: "14" | "30" | "90" | "365" | null;
}

export const CreateCertificatePackResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    certificates: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        hosts: Schema.Array(Schema.String),
        status: Schema.String,
        bundleMethod: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
        issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          hosts: "hosts",
          status: "status",
          bundleMethod: "bundle_method",
          expiresOn: "expires_on",
          geoRestrictions: "geo_restrictions",
          issuer: "issuer",
          modifiedOn: "modified_on",
          priority: "priority",
          signature: "signature",
          uploadedOn: "uploaded_on",
          zoneId: "zone_id",
        }),
      ),
    ),
    hosts: Schema.Array(Schema.String),
    status: Schema.Literals([
      "initializing",
      "pending_validation",
      "deleted",
      "pending_issuance",
      "pending_deployment",
      "pending_deletion",
      "pending_expiration",
      "expired",
      "active",
      "initializing_timed_out",
      "validation_timed_out",
      "issuance_timed_out",
      "deployment_timed_out",
      "deletion_timed_out",
      "pending_cleanup",
      "staging_deployment",
      "staging_active",
      "deactivating",
      "inactive",
      "backup_issued",
      "holding_deployment",
    ]),
    type: Schema.Literals([
      "mh_custom",
      "managed_hostname",
      "sni_custom",
      "universal",
      "advanced",
      "total_tls",
      "keyless",
      "legacy_custom",
    ]),
    certificateAuthority: Schema.optional(
      Schema.Union([
        Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
        Schema.Null,
      ]),
    ),
    cloudflareBranding: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    primaryCertificate: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    validationErrors: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            message: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
    validationMethod: Schema.optional(
      Schema.Union([Schema.Literals(["txt", "http", "email"]), Schema.Null]),
    ),
    validationRecords: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            emails: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            httpBody: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            httpUrl: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            txtName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            txtValue: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              emails: "emails",
              httpBody: "http_body",
              httpUrl: "http_url",
              txtName: "txt_name",
              txtValue: "txt_value",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    validityDays: Schema.optional(
      Schema.Union([Schema.Literals(["14", "30", "90", "365"]), Schema.Null]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        certificates: "certificates",
        hosts: "hosts",
        status: "status",
        type: "type",
        certificateAuthority: "certificate_authority",
        cloudflareBranding: "cloudflare_branding",
        primaryCertificate: "primary_certificate",
        validationErrors: "validation_errors",
        validationMethod: "validation_method",
        validationRecords: "validation_records",
        validityDays: "validity_days",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateCertificatePackResponse>;

export type CreateCertificatePackError = DefaultErrors;

export const createCertificatePack: API.OperationMethod<
  CreateCertificatePackRequest,
  CreateCertificatePackResponse,
  CreateCertificatePackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCertificatePackRequest,
  output: CreateCertificatePackResponse,
  errors: [],
}));

export interface PatchCertificatePackRequest {
  certificatePackId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true. */
  cloudflareBranding?: boolean;
}

export const PatchCertificatePackRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificatePackId: Schema.String.pipe(T.HttpPath("certificatePackId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    cloudflareBranding: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({ cloudflareBranding: "cloudflare_branding" }),
    T.Http({
      method: "PATCH",
      path: "/zones/{zone_id}/ssl/certificate_packs/{certificatePackId}",
    }),
  ) as unknown as Schema.Schema<PatchCertificatePackRequest>;

export interface PatchCertificatePackResponse {
  /** Identifier. */
  id: string;
  /** Array of certificates in this pack. */
  certificates: {
    id: string;
    hosts: string[];
    status: string;
    bundleMethod?: string | null;
    expiresOn?: string | null;
    geoRestrictions?: {
      label?: "us" | "eu" | "highest_security" | null;
    } | null;
    issuer?: string | null;
    modifiedOn?: string | null;
    priority?: number | null;
    signature?: string | null;
    uploadedOn?: string | null;
    zoneId?: string | null;
  }[];
  /** Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty. */
  hosts: string[];
  /** Status of certificate pack. */
  status:
    | "initializing"
    | "pending_validation"
    | "deleted"
    | "pending_issuance"
    | "pending_deployment"
    | "pending_deletion"
    | "pending_expiration"
    | "expired"
    | "active"
    | "initializing_timed_out"
    | "validation_timed_out"
    | "issuance_timed_out"
    | "deployment_timed_out"
    | "deletion_timed_out"
    | "pending_cleanup"
    | "staging_deployment"
    | "staging_active"
    | "deactivating"
    | "inactive"
    | "backup_issued"
    | "holding_deployment";
  /** Type of certificate pack. */
  type:
    | "mh_custom"
    | "managed_hostname"
    | "sni_custom"
    | "universal"
    | "advanced"
    | "total_tls"
    | "keyless"
    | "legacy_custom";
  /** Certificate Authority selected for the order. For information on any certificate authority specific details or restrictions [see this page for more details.](https://developers.cloudflare.com/ssl/refe */
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com" | null;
  /** Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true. */
  cloudflareBranding?: boolean | null;
  /** Identifier of the primary certificate in a pack. */
  primaryCertificate?: string | null;
  /** Domain validation errors that have been received by the certificate authority (CA). */
  validationErrors?: { message?: string | null }[] | null;
  /** Validation Method selected for the order. */
  validationMethod?: "txt" | "http" | "email" | null;
  /** Certificates' validation records. */
  validationRecords?:
    | {
        emails?: string[] | null;
        httpBody?: string | null;
        httpUrl?: string | null;
        txtName?: string | null;
        txtValue?: string | null;
      }[]
    | null;
  /** Validity Days selected for the order. */
  validityDays?: "14" | "30" | "90" | "365" | null;
}

export const PatchCertificatePackResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    certificates: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        hosts: Schema.Array(Schema.String),
        status: Schema.String,
        bundleMethod: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
        issuer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        signature: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        uploadedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          hosts: "hosts",
          status: "status",
          bundleMethod: "bundle_method",
          expiresOn: "expires_on",
          geoRestrictions: "geo_restrictions",
          issuer: "issuer",
          modifiedOn: "modified_on",
          priority: "priority",
          signature: "signature",
          uploadedOn: "uploaded_on",
          zoneId: "zone_id",
        }),
      ),
    ),
    hosts: Schema.Array(Schema.String),
    status: Schema.Literals([
      "initializing",
      "pending_validation",
      "deleted",
      "pending_issuance",
      "pending_deployment",
      "pending_deletion",
      "pending_expiration",
      "expired",
      "active",
      "initializing_timed_out",
      "validation_timed_out",
      "issuance_timed_out",
      "deployment_timed_out",
      "deletion_timed_out",
      "pending_cleanup",
      "staging_deployment",
      "staging_active",
      "deactivating",
      "inactive",
      "backup_issued",
      "holding_deployment",
    ]),
    type: Schema.Literals([
      "mh_custom",
      "managed_hostname",
      "sni_custom",
      "universal",
      "advanced",
      "total_tls",
      "keyless",
      "legacy_custom",
    ]),
    certificateAuthority: Schema.optional(
      Schema.Union([
        Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
        Schema.Null,
      ]),
    ),
    cloudflareBranding: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    primaryCertificate: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    validationErrors: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            message: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
    validationMethod: Schema.optional(
      Schema.Union([Schema.Literals(["txt", "http", "email"]), Schema.Null]),
    ),
    validationRecords: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            emails: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            httpBody: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            httpUrl: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            txtName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            txtValue: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              emails: "emails",
              httpBody: "http_body",
              httpUrl: "http_url",
              txtName: "txt_name",
              txtValue: "txt_value",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    validityDays: Schema.optional(
      Schema.Union([Schema.Literals(["14", "30", "90", "365"]), Schema.Null]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        certificates: "certificates",
        hosts: "hosts",
        status: "status",
        type: "type",
        certificateAuthority: "certificate_authority",
        cloudflareBranding: "cloudflare_branding",
        primaryCertificate: "primary_certificate",
        validationErrors: "validation_errors",
        validationMethod: "validation_method",
        validationRecords: "validation_records",
        validityDays: "validity_days",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PatchCertificatePackResponse>;

export type PatchCertificatePackError = DefaultErrors;

export const patchCertificatePack: API.OperationMethod<
  PatchCertificatePackRequest,
  PatchCertificatePackResponse,
  PatchCertificatePackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCertificatePackRequest,
  output: PatchCertificatePackResponse,
  errors: [],
}));

export interface DeleteCertificatePackRequest {
  certificatePackId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteCertificatePackRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificatePackId: Schema.String.pipe(T.HttpPath("certificatePackId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/zones/{zone_id}/ssl/certificate_packs/{certificatePackId}",
    }),
  ) as unknown as Schema.Schema<DeleteCertificatePackRequest>;

export interface DeleteCertificatePackResponse {
  /** Identifier. */
  id?: string | null;
}

export const DeleteCertificatePackResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteCertificatePackResponse>;

export type DeleteCertificatePackError = DefaultErrors;

export const deleteCertificatePack: API.OperationMethod<
  DeleteCertificatePackRequest,
  DeleteCertificatePackResponse,
  DeleteCertificatePackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCertificatePackRequest,
  output: DeleteCertificatePackResponse,
  errors: [],
}));

// =============================================================================
// CertificatePackQuota
// =============================================================================

export interface GetCertificatePackQuotaRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetCertificatePackQuotaRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/ssl/certificate_packs/quota",
    }),
  ) as unknown as Schema.Schema<GetCertificatePackQuotaRequest>;

export interface GetCertificatePackQuotaResponse {
  advanced?: { allocated?: number | null; used?: number | null } | null;
}

export const GetCertificatePackQuotaResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advanced: Schema.optional(
      Schema.Union([
        Schema.Struct({
          allocated: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          used: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetCertificatePackQuotaResponse>;

export type GetCertificatePackQuotaError = DefaultErrors;

export const getCertificatePackQuota: API.OperationMethod<
  GetCertificatePackQuotaRequest,
  GetCertificatePackQuotaResponse,
  GetCertificatePackQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCertificatePackQuotaRequest,
  output: GetCertificatePackQuotaResponse,
  errors: [],
}));

// =============================================================================
// Recommendation
// =============================================================================

export interface GetRecommendationRequest {
  zoneId: string;
}

export const GetRecommendationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/recommendation" }),
  ) as unknown as Schema.Schema<GetRecommendationRequest>;

export interface GetRecommendationResponse {
  id: string;
  /** Whether this setting can be updated or not. */
  editable: boolean;
  /** Last time this setting was modified. */
  modifiedOn: string;
  /** Current setting of the automatic SSL/TLS. */
  value: "auto" | "custom";
  /** Next time this zone will be scanned by the Automatic SSL/TLS. */
  nextScheduledScan?: string | null;
}

export const GetRecommendationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    editable: Schema.Boolean,
    modifiedOn: Schema.String,
    value: Schema.Literals(["auto", "custom"]),
    nextScheduledScan: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        editable: "editable",
        modifiedOn: "modified_on",
        value: "value",
        nextScheduledScan: "next_scheduled_scan",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetRecommendationResponse>;

export type GetRecommendationError = DefaultErrors;

export const getRecommendation: API.OperationMethod<
  GetRecommendationRequest,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRecommendationRequest,
  output: GetRecommendationResponse,
  errors: [],
}));

// =============================================================================
// UniversalSetting
// =============================================================================

export interface GetUniversalSettingRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetUniversalSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/universal/settings" }),
  ) as unknown as Schema.Schema<GetUniversalSettingRequest>;

export interface GetUniversalSettingResponse {
  /** Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advan */
  enabled?: boolean | null;
}

export const GetUniversalSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetUniversalSettingResponse>;

export type GetUniversalSettingError = DefaultErrors;

export const getUniversalSetting: API.OperationMethod<
  GetUniversalSettingRequest,
  GetUniversalSettingResponse,
  GetUniversalSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUniversalSettingRequest,
  output: GetUniversalSettingResponse,
  errors: [],
}));

export interface PatchUniversalSettingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there  */
  enabled?: boolean;
}

export const PatchUniversalSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    enabled: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/zones/{zone_id}/ssl/universal/settings",
    }),
  ) as unknown as Schema.Schema<PatchUniversalSettingRequest>;

export interface PatchUniversalSettingResponse {
  /** Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advan */
  enabled?: boolean | null;
}

export const PatchUniversalSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchUniversalSettingResponse>;

export type PatchUniversalSettingError = DefaultErrors;

export const patchUniversalSetting: API.OperationMethod<
  PatchUniversalSettingRequest,
  PatchUniversalSettingResponse,
  PatchUniversalSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchUniversalSettingRequest,
  output: PatchUniversalSettingResponse,
  errors: [],
}));

// =============================================================================
// Verification
// =============================================================================

export interface GetVerificationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Immediately retry SSL Verification. */
  retry?: true;
}

export const GetVerificationRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    retry: Schema.optional(Schema.Literal(true)).pipe(T.HttpQuery("retry")),
  },
).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/verification" }),
) as unknown as Schema.Schema<GetVerificationRequest>;

export type GetVerificationResponse = {
  certificateStatus:
    | "initializing"
    | "authorizing"
    | "active"
    | "expired"
    | "issuing"
    | "timing_out"
    | "pending_deployment";
  brandCheck?: boolean | null;
  certPackUuid?: string | null;
  signature?: "ECDSAWithSHA256" | "SHA1WithRSA" | "SHA256WithRSA" | null;
  validationMethod?: "http" | "cname" | "txt" | null;
  verificationInfo?: {
    recordName?: "record_name" | "http_url" | "cname" | "txt_name" | null;
    recordTarget?:
      | "record_value"
      | "http_body"
      | "cname_target"
      | "txt_value"
      | null;
  } | null;
  verificationStatus?: boolean | null;
  verificationType?: "cname" | "meta tag" | null;
}[];

export const GetVerificationResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    certificateStatus: Schema.Literals([
      "initializing",
      "authorizing",
      "active",
      "expired",
      "issuing",
      "timing_out",
      "pending_deployment",
    ]),
    brandCheck: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    certPackUuid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    signature: Schema.optional(
      Schema.Union([
        Schema.Literals(["ECDSAWithSHA256", "SHA1WithRSA", "SHA256WithRSA"]),
        Schema.Null,
      ]),
    ),
    validationMethod: Schema.optional(
      Schema.Union([Schema.Literals(["http", "cname", "txt"]), Schema.Null]),
    ),
    verificationInfo: Schema.optional(
      Schema.Union([
        Schema.Struct({
          recordName: Schema.optional(
            Schema.Union([
              Schema.Literals(["record_name", "http_url", "cname", "txt_name"]),
              Schema.Null,
            ]),
          ),
          recordTarget: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "record_value",
                "http_body",
                "cname_target",
                "txt_value",
              ]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            recordName: "record_name",
            recordTarget: "record_target",
          }),
        ),
        Schema.Null,
      ]),
    ),
    verificationStatus: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    verificationType: Schema.optional(
      Schema.Union([Schema.Literals(["cname", "meta tag"]), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      certificateStatus: "certificate_status",
      brandCheck: "brand_check",
      certPackUuid: "cert_pack_uuid",
      signature: "signature",
      validationMethod: "validation_method",
      verificationInfo: "verification_info",
      verificationStatus: "verification_status",
      verificationType: "verification_type",
    }),
  ),
).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetVerificationResponse>;

export type GetVerificationError = DefaultErrors;

export const getVerification: API.OperationMethod<
  GetVerificationRequest,
  GetVerificationResponse,
  GetVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVerificationRequest,
  output: GetVerificationResponse,
  errors: [],
}));

export interface PatchVerificationRequest {
  certificatePackId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Desired validation method. */
  validationMethod: "http" | "cname" | "txt" | "email";
}

export const PatchVerificationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificatePackId: Schema.String.pipe(T.HttpPath("certificatePackId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    validationMethod: Schema.Literals(["http", "cname", "txt", "email"]),
  }).pipe(
    Schema.encodeKeys({ validationMethod: "validation_method" }),
    T.Http({
      method: "PATCH",
      path: "/zones/{zone_id}/ssl/verification/{certificatePackId}",
    }),
  ) as unknown as Schema.Schema<PatchVerificationRequest>;

export interface PatchVerificationResponse {
  /** Result status. */
  status?: string | null;
  /** Desired validation method. */
  validationMethod?: "http" | "cname" | "txt" | "email" | null;
}

export const PatchVerificationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    validationMethod: Schema.optional(
      Schema.Union([
        Schema.Literals(["http", "cname", "txt", "email"]),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        status: "status",
        validationMethod: "validation_method",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PatchVerificationResponse>;

export type PatchVerificationError = DefaultErrors;

export const patchVerification: API.OperationMethod<
  PatchVerificationRequest,
  PatchVerificationResponse,
  PatchVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchVerificationRequest,
  output: PatchVerificationResponse,
  errors: [],
}));
