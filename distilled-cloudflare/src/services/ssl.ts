/**
 * Cloudflare SSL API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service ssl
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

export const CreateAnalyzeRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<CreateAnalyzeResponse>;

export type CreateAnalyzeError = CommonErrors;

export const createAnalyze: API.OperationMethod<
  CreateAnalyzeRequest,
  CreateAnalyzeResponse,
  CreateAnalyzeError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetCertificatePackRequest = Schema.Struct({
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
    bundleMethod?: string;
    expiresOn?: string;
    geoRestrictions?: { label?: "us" | "eu" | "highest_security" };
    issuer?: string;
    modifiedOn?: string;
    priority?: number;
    signature?: string;
    uploadedOn?: string;
    zoneId?: string;
  }[];
  /** Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty. */
  hosts: string[];
  /** Status of certificate pack. */
  status:
    | "active"
    | "initializing"
    | "pending_validation"
    | "deleted"
    | "pending_issuance"
    | "pending_deployment"
    | "pending_deletion"
    | "pending_expiration"
    | "expired"
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
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com";
  /** Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true. */
  cloudflareBranding?: boolean;
  /** Identifier of the primary certificate in a pack. */
  primaryCertificate?: string;
  /** Domain validation errors that have been received by the certificate authority (CA). */
  validationErrors?: { message?: string }[];
  /** Validation Method selected for the order. */
  validationMethod?: "txt" | "http" | "email";
  /** Certificates' validation records. */
  validationRecords?: {
    emails?: string[];
    httpBody?: string;
    httpUrl?: string;
    txtName?: string;
    txtValue?: string;
  }[];
  /** Validity Days selected for the order. */
  validityDays?: "14" | "30" | "90" | "365";
}

export const GetCertificatePackResponse = Schema.Struct({
  id: Schema.String,
  certificates: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      hosts: Schema.Array(Schema.String),
      status: Schema.String,
      bundleMethod: Schema.optional(Schema.String),
      expiresOn: Schema.optional(Schema.String),
      geoRestrictions: Schema.optional(
        Schema.Struct({
          label: Schema.optional(
            Schema.Literals(["us", "eu", "highest_security"]),
          ),
        }),
      ),
      issuer: Schema.optional(Schema.String),
      modifiedOn: Schema.optional(Schema.String),
      priority: Schema.optional(Schema.Number),
      signature: Schema.optional(Schema.String),
      uploadedOn: Schema.optional(Schema.String),
      zoneId: Schema.optional(Schema.String),
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
    "active",
    "initializing",
    "pending_validation",
    "deleted",
    "pending_issuance",
    "pending_deployment",
    "pending_deletion",
    "pending_expiration",
    "expired",
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
    Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
  ),
  cloudflareBranding: Schema.optional(Schema.Boolean),
  primaryCertificate: Schema.optional(Schema.String),
  validationErrors: Schema.optional(
    Schema.Array(
      Schema.Struct({
        message: Schema.optional(Schema.String),
      }),
    ),
  ),
  validationMethod: Schema.optional(Schema.Literals(["txt", "http", "email"])),
  validationRecords: Schema.optional(
    Schema.Array(
      Schema.Struct({
        emails: Schema.optional(Schema.Array(Schema.String)),
        httpBody: Schema.optional(Schema.String),
        httpUrl: Schema.optional(Schema.String),
        txtName: Schema.optional(Schema.String),
        txtValue: Schema.optional(Schema.String),
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
  ),
  validityDays: Schema.optional(Schema.Literals(["14", "30", "90", "365"])),
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
) as unknown as Schema.Schema<GetCertificatePackResponse>;

export type GetCertificatePackError = CommonErrors;

export const getCertificatePack: API.OperationMethod<
  GetCertificatePackRequest,
  GetCertificatePackResponse,
  GetCertificatePackError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListCertificatePacksRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  status: Schema.optional(Schema.Literal("all")).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/certificate_packs" }),
) as unknown as Schema.Schema<ListCertificatePacksRequest>;

export type ListCertificatePacksResponse = {
  id: string;
  certificates: {
    id: string;
    hosts: string[];
    status: string;
    bundleMethod?: string;
    expiresOn?: string;
    geoRestrictions?: { label?: "us" | "eu" | "highest_security" };
    issuer?: string;
    modifiedOn?: string;
    priority?: number;
    signature?: string;
    uploadedOn?: string;
    zoneId?: string;
  }[];
  hosts: string[];
  status:
    | "active"
    | "initializing"
    | "pending_validation"
    | "deleted"
    | "pending_issuance"
    | "pending_deployment"
    | "pending_deletion"
    | "pending_expiration"
    | "expired"
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
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com";
  cloudflareBranding?: boolean;
  primaryCertificate?: string;
  validationErrors?: { message?: string }[];
  validationMethod?: "txt" | "http" | "email";
  validationRecords?: {
    emails?: string[];
    httpBody?: string;
    httpUrl?: string;
    txtName?: string;
    txtValue?: string;
  }[];
  validityDays?: "14" | "30" | "90" | "365";
}[];

export const ListCertificatePacksResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    certificates: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        hosts: Schema.Array(Schema.String),
        status: Schema.String,
        bundleMethod: Schema.optional(Schema.String),
        expiresOn: Schema.optional(Schema.String),
        geoRestrictions: Schema.optional(
          Schema.Struct({
            label: Schema.optional(
              Schema.Literals(["us", "eu", "highest_security"]),
            ),
          }),
        ),
        issuer: Schema.optional(Schema.String),
        modifiedOn: Schema.optional(Schema.String),
        priority: Schema.optional(Schema.Number),
        signature: Schema.optional(Schema.String),
        uploadedOn: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
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
      "active",
      "initializing",
      "pending_validation",
      "deleted",
      "pending_issuance",
      "pending_deployment",
      "pending_deletion",
      "pending_expiration",
      "expired",
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
      Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
    ),
    cloudflareBranding: Schema.optional(Schema.Boolean),
    primaryCertificate: Schema.optional(Schema.String),
    validationErrors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          message: Schema.optional(Schema.String),
        }),
      ),
    ),
    validationMethod: Schema.optional(
      Schema.Literals(["txt", "http", "email"]),
    ),
    validationRecords: Schema.optional(
      Schema.Array(
        Schema.Struct({
          emails: Schema.optional(Schema.Array(Schema.String)),
          httpBody: Schema.optional(Schema.String),
          httpUrl: Schema.optional(Schema.String),
          txtName: Schema.optional(Schema.String),
          txtValue: Schema.optional(Schema.String),
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
    ),
    validityDays: Schema.optional(Schema.Literals(["14", "30", "90", "365"])),
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
) as unknown as Schema.Schema<ListCertificatePacksResponse>;

export type ListCertificatePacksError = CommonErrors;

export const listCertificatePacks: API.OperationMethod<
  ListCertificatePacksRequest,
  ListCertificatePacksResponse,
  ListCertificatePacksError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCertificatePacksRequest,
  output: ListCertificatePacksResponse,
  errors: [],
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

export const CreateCertificatePackRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  certificateAuthority: Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
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
    bundleMethod?: string;
    expiresOn?: string;
    geoRestrictions?: { label?: "us" | "eu" | "highest_security" };
    issuer?: string;
    modifiedOn?: string;
    priority?: number;
    signature?: string;
    uploadedOn?: string;
    zoneId?: string;
  }[];
  /** Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty. */
  hosts: string[];
  /** Status of certificate pack. */
  status:
    | "active"
    | "initializing"
    | "pending_validation"
    | "deleted"
    | "pending_issuance"
    | "pending_deployment"
    | "pending_deletion"
    | "pending_expiration"
    | "expired"
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
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com";
  /** Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true. */
  cloudflareBranding?: boolean;
  /** Identifier of the primary certificate in a pack. */
  primaryCertificate?: string;
  /** Domain validation errors that have been received by the certificate authority (CA). */
  validationErrors?: { message?: string }[];
  /** Validation Method selected for the order. */
  validationMethod?: "txt" | "http" | "email";
  /** Certificates' validation records. */
  validationRecords?: {
    emails?: string[];
    httpBody?: string;
    httpUrl?: string;
    txtName?: string;
    txtValue?: string;
  }[];
  /** Validity Days selected for the order. */
  validityDays?: "14" | "30" | "90" | "365";
}

export const CreateCertificatePackResponse = Schema.Struct({
  id: Schema.String,
  certificates: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      hosts: Schema.Array(Schema.String),
      status: Schema.String,
      bundleMethod: Schema.optional(Schema.String),
      expiresOn: Schema.optional(Schema.String),
      geoRestrictions: Schema.optional(
        Schema.Struct({
          label: Schema.optional(
            Schema.Literals(["us", "eu", "highest_security"]),
          ),
        }),
      ),
      issuer: Schema.optional(Schema.String),
      modifiedOn: Schema.optional(Schema.String),
      priority: Schema.optional(Schema.Number),
      signature: Schema.optional(Schema.String),
      uploadedOn: Schema.optional(Schema.String),
      zoneId: Schema.optional(Schema.String),
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
    "active",
    "initializing",
    "pending_validation",
    "deleted",
    "pending_issuance",
    "pending_deployment",
    "pending_deletion",
    "pending_expiration",
    "expired",
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
    Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
  ),
  cloudflareBranding: Schema.optional(Schema.Boolean),
  primaryCertificate: Schema.optional(Schema.String),
  validationErrors: Schema.optional(
    Schema.Array(
      Schema.Struct({
        message: Schema.optional(Schema.String),
      }),
    ),
  ),
  validationMethod: Schema.optional(Schema.Literals(["txt", "http", "email"])),
  validationRecords: Schema.optional(
    Schema.Array(
      Schema.Struct({
        emails: Schema.optional(Schema.Array(Schema.String)),
        httpBody: Schema.optional(Schema.String),
        httpUrl: Schema.optional(Schema.String),
        txtName: Schema.optional(Schema.String),
        txtValue: Schema.optional(Schema.String),
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
  ),
  validityDays: Schema.optional(Schema.Literals(["14", "30", "90", "365"])),
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
) as unknown as Schema.Schema<CreateCertificatePackResponse>;

export type CreateCertificatePackError = CommonErrors;

export const createCertificatePack: API.OperationMethod<
  CreateCertificatePackRequest,
  CreateCertificatePackResponse,
  CreateCertificatePackError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PatchCertificatePackRequest = Schema.Struct({
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
    bundleMethod?: string;
    expiresOn?: string;
    geoRestrictions?: { label?: "us" | "eu" | "highest_security" };
    issuer?: string;
    modifiedOn?: string;
    priority?: number;
    signature?: string;
    uploadedOn?: string;
    zoneId?: string;
  }[];
  /** Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty. */
  hosts: string[];
  /** Status of certificate pack. */
  status:
    | "active"
    | "initializing"
    | "pending_validation"
    | "deleted"
    | "pending_issuance"
    | "pending_deployment"
    | "pending_deletion"
    | "pending_expiration"
    | "expired"
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
  certificateAuthority?: "google" | "lets_encrypt" | "ssl_com";
  /** Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true. */
  cloudflareBranding?: boolean;
  /** Identifier of the primary certificate in a pack. */
  primaryCertificate?: string;
  /** Domain validation errors that have been received by the certificate authority (CA). */
  validationErrors?: { message?: string }[];
  /** Validation Method selected for the order. */
  validationMethod?: "txt" | "http" | "email";
  /** Certificates' validation records. */
  validationRecords?: {
    emails?: string[];
    httpBody?: string;
    httpUrl?: string;
    txtName?: string;
    txtValue?: string;
  }[];
  /** Validity Days selected for the order. */
  validityDays?: "14" | "30" | "90" | "365";
}

export const PatchCertificatePackResponse = Schema.Struct({
  id: Schema.String,
  certificates: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      hosts: Schema.Array(Schema.String),
      status: Schema.String,
      bundleMethod: Schema.optional(Schema.String),
      expiresOn: Schema.optional(Schema.String),
      geoRestrictions: Schema.optional(
        Schema.Struct({
          label: Schema.optional(
            Schema.Literals(["us", "eu", "highest_security"]),
          ),
        }),
      ),
      issuer: Schema.optional(Schema.String),
      modifiedOn: Schema.optional(Schema.String),
      priority: Schema.optional(Schema.Number),
      signature: Schema.optional(Schema.String),
      uploadedOn: Schema.optional(Schema.String),
      zoneId: Schema.optional(Schema.String),
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
    "active",
    "initializing",
    "pending_validation",
    "deleted",
    "pending_issuance",
    "pending_deployment",
    "pending_deletion",
    "pending_expiration",
    "expired",
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
    Schema.Literals(["google", "lets_encrypt", "ssl_com"]),
  ),
  cloudflareBranding: Schema.optional(Schema.Boolean),
  primaryCertificate: Schema.optional(Schema.String),
  validationErrors: Schema.optional(
    Schema.Array(
      Schema.Struct({
        message: Schema.optional(Schema.String),
      }),
    ),
  ),
  validationMethod: Schema.optional(Schema.Literals(["txt", "http", "email"])),
  validationRecords: Schema.optional(
    Schema.Array(
      Schema.Struct({
        emails: Schema.optional(Schema.Array(Schema.String)),
        httpBody: Schema.optional(Schema.String),
        httpUrl: Schema.optional(Schema.String),
        txtName: Schema.optional(Schema.String),
        txtValue: Schema.optional(Schema.String),
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
  ),
  validityDays: Schema.optional(Schema.Literals(["14", "30", "90", "365"])),
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
) as unknown as Schema.Schema<PatchCertificatePackResponse>;

export type PatchCertificatePackError = CommonErrors;

export const patchCertificatePack: API.OperationMethod<
  PatchCertificatePackRequest,
  PatchCertificatePackResponse,
  PatchCertificatePackError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchCertificatePackRequest,
  output: PatchCertificatePackResponse,
  errors: [],
}));

export interface DeleteCertificatePackRequest {
  certificatePackId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteCertificatePackRequest = Schema.Struct({
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
  id?: string;
}

export const DeleteCertificatePackResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteCertificatePackResponse>;

export type DeleteCertificatePackError = CommonErrors;

export const deleteCertificatePack: API.OperationMethod<
  DeleteCertificatePackRequest,
  DeleteCertificatePackResponse,
  DeleteCertificatePackError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetCertificatePackQuotaRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/ssl/certificate_packs/quota",
  }),
) as unknown as Schema.Schema<GetCertificatePackQuotaRequest>;

export interface GetCertificatePackQuotaResponse {
  advanced?: { allocated?: number; used?: number };
}

export const GetCertificatePackQuotaResponse = Schema.Struct({
  advanced: Schema.optional(
    Schema.Struct({
      allocated: Schema.optional(Schema.Number),
      used: Schema.optional(Schema.Number),
    }),
  ),
}) as unknown as Schema.Schema<GetCertificatePackQuotaResponse>;

export type GetCertificatePackQuotaError = CommonErrors;

export const getCertificatePackQuota: API.OperationMethod<
  GetCertificatePackQuotaRequest,
  GetCertificatePackQuotaResponse,
  GetCertificatePackQuotaError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetRecommendationRequest = Schema.Struct({
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

export const GetRecommendationResponse = Schema.Struct({
  id: Schema.String,
  editable: Schema.Boolean,
  modifiedOn: Schema.String,
  value: Schema.Literals(["auto", "custom"]),
  nextScheduledScan: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    editable: "editable",
    modifiedOn: "modified_on",
    value: "value",
    nextScheduledScan: "next_scheduled_scan",
  }),
) as unknown as Schema.Schema<GetRecommendationResponse>;

export type GetRecommendationError = CommonErrors;

export const getRecommendation: API.OperationMethod<
  GetRecommendationRequest,
  GetRecommendationResponse,
  GetRecommendationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetUniversalSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/universal/settings" }),
) as unknown as Schema.Schema<GetUniversalSettingRequest>;

export interface GetUniversalSettingResponse {
  /** Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advan */
  enabled?: boolean;
}

export const GetUniversalSettingResponse = Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetUniversalSettingResponse>;

export type GetUniversalSettingError = CommonErrors;

export const getUniversalSetting: API.OperationMethod<
  GetUniversalSettingRequest,
  GetUniversalSettingResponse,
  GetUniversalSettingError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PatchUniversalSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/ssl/universal/settings" }),
) as unknown as Schema.Schema<PatchUniversalSettingRequest>;

export interface PatchUniversalSettingResponse {
  /** Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advan */
  enabled?: boolean;
}

export const PatchUniversalSettingResponse = Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<PatchUniversalSettingResponse>;

export type PatchUniversalSettingError = CommonErrors;

export const patchUniversalSetting: API.OperationMethod<
  PatchUniversalSettingRequest,
  PatchUniversalSettingResponse,
  PatchUniversalSettingError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetVerificationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  retry: Schema.optional(Schema.Literal(true)).pipe(T.HttpQuery("retry")),
}).pipe(
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
  brandCheck?: boolean;
  certPackUuid?: string;
  signature?: "ECDSAWithSHA256" | "SHA1WithRSA" | "SHA256WithRSA";
  validationMethod?: "http" | "txt" | "cname";
  verificationInfo?: {
    recordName?: "record_name" | "http_url" | "cname" | "txt_name";
    recordTarget?: "record_value" | "http_body" | "cname_target" | "txt_value";
  };
  verificationStatus?: boolean;
  verificationType?: "cname" | "meta tag";
}[];

export const GetVerificationResponse = Schema.Array(
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
    brandCheck: Schema.optional(Schema.Boolean),
    certPackUuid: Schema.optional(Schema.String),
    signature: Schema.optional(
      Schema.Literals(["ECDSAWithSHA256", "SHA1WithRSA", "SHA256WithRSA"]),
    ),
    validationMethod: Schema.optional(
      Schema.Literals(["http", "txt", "cname"]),
    ),
    verificationInfo: Schema.optional(
      Schema.Struct({
        recordName: Schema.optional(
          Schema.Literals(["record_name", "http_url", "cname", "txt_name"]),
        ),
        recordTarget: Schema.optional(
          Schema.Literals([
            "record_value",
            "http_body",
            "cname_target",
            "txt_value",
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          recordName: "record_name",
          recordTarget: "record_target",
        }),
      ),
    ),
    verificationStatus: Schema.optional(Schema.Boolean),
    verificationType: Schema.optional(Schema.Literals(["cname", "meta tag"])),
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
) as unknown as Schema.Schema<GetVerificationResponse>;

export type GetVerificationError = CommonErrors;

export const getVerification: API.OperationMethod<
  GetVerificationRequest,
  GetVerificationResponse,
  GetVerificationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PatchVerificationRequest = Schema.Struct({
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
  status?: string;
  /** Desired validation method. */
  validationMethod?: "http" | "cname" | "txt" | "email";
}

export const PatchVerificationResponse = Schema.Struct({
  status: Schema.optional(Schema.String),
  validationMethod: Schema.optional(
    Schema.Literals(["http", "cname", "txt", "email"]),
  ),
}).pipe(
  Schema.encodeKeys({
    status: "status",
    validationMethod: "validation_method",
  }),
) as unknown as Schema.Schema<PatchVerificationResponse>;

export type PatchVerificationError = CommonErrors;

export const patchVerification: API.OperationMethod<
  PatchVerificationRequest,
  PatchVerificationResponse,
  PatchVerificationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchVerificationRequest,
  output: PatchVerificationResponse,
  errors: [],
}));
