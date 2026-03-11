/**
 * Cloudflare CERTIFICATE-AUTHORITIES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service certificate-authorities
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// HostnameAssociation
// =============================================================================

export interface GetHostnameAssociationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: The UUID to match against for a certificate that was uploaded to the mTLS Certificate Management endpoint. If no mtls_certificate_id is given, the results will be the hostnames associated */
  mtlsCertificateId?: string;
}

export const GetHostnameAssociationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    mtlsCertificateId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("mtls_certificate_id"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/certificate_authorities/hostname_associations",
    }),
  ) as unknown as Schema.Schema<GetHostnameAssociationRequest>;

export interface GetHostnameAssociationResponse {
  hostnames?: string[] | null;
}

export const GetHostnameAssociationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hostnames: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  }) as unknown as Schema.Schema<GetHostnameAssociationResponse>;

export type GetHostnameAssociationError = DefaultErrors;

export const getHostnameAssociation: API.OperationMethod<
  GetHostnameAssociationRequest,
  GetHostnameAssociationResponse,
  GetHostnameAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetHostnameAssociationRequest,
  output: GetHostnameAssociationResponse,
  errors: [],
}));

export interface PutHostnameAssociationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  hostnames?: string[];
  /** Body param: The UUID for a certificate that was uploaded to the mTLS Certificate Management endpoint. If no mtls_certificate_id is given, the hostnames will be associated to your active Cloudflare Man */
  mtlsCertificateId?: string;
}

export const PutHostnameAssociationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    hostnames: Schema.optional(Schema.Array(Schema.String)),
    mtlsCertificateId: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      hostnames: "hostnames",
      mtlsCertificateId: "mtls_certificate_id",
    }),
    T.Http({
      method: "PUT",
      path: "/zones/{zone_id}/certificate_authorities/hostname_associations",
    }),
  ) as unknown as Schema.Schema<PutHostnameAssociationRequest>;

export interface PutHostnameAssociationResponse {
  hostnames?: string[] | null;
}

export const PutHostnameAssociationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hostnames: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  }) as unknown as Schema.Schema<PutHostnameAssociationResponse>;

export type PutHostnameAssociationError = DefaultErrors;

export const putHostnameAssociation: API.OperationMethod<
  PutHostnameAssociationRequest,
  PutHostnameAssociationResponse,
  PutHostnameAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutHostnameAssociationRequest,
  output: PutHostnameAssociationResponse,
  errors: [],
}));
