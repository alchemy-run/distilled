/**
 * Cloudflare KEYLESS-CERTIFICATES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service keyless-certificates
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
// KeylessCertificate
// =============================================================================

export interface GetKeylessCertificateRequest {
  keylessCertificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetKeylessCertificateRequest = Schema.Struct({
  keylessCertificateId: Schema.String.pipe(T.HttpPath("keylessCertificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/keyless_certificates/{keylessCertificateId}",
  }),
) as unknown as Schema.Schema<GetKeylessCertificateRequest>;

export interface GetKeylessCertificateResponse {
  /** Keyless certificate identifier tag. */
  id: string;
  /** When the Keyless SSL was created. */
  createdOn: string;
  /** Whether or not the Keyless SSL is on or off. */
  enabled: boolean;
  /** The keyless SSL name. */
  host: string;
  /** When the Keyless SSL was last modified. */
  modifiedOn: string;
  /** The keyless SSL name. */
  name: string;
  /** Available permissions for the Keyless SSL for the current user requesting the item. */
  permissions: string[];
  /** The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server. */
  port: number;
  /** Status of the Keyless SSL. */
  status: "active" | "deleted";
  /** Configuration for using Keyless SSL through a Cloudflare Tunnel */
  tunnel?: { privateIp: string; vnetId: string };
}

export const GetKeylessCertificateResponse = Schema.Struct({
  id: Schema.String,
  createdOn: Schema.String,
  enabled: Schema.Boolean,
  host: Schema.String,
  modifiedOn: Schema.String,
  name: Schema.String,
  permissions: Schema.Array(Schema.String),
  port: Schema.Number,
  status: Schema.Literals(["active", "deleted"]),
  tunnel: Schema.optional(
    Schema.Struct({
      privateIp: Schema.String,
      vnetId: Schema.String,
    }).pipe(Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" })),
  ),
}).pipe(
  Schema.encodeKeys({ createdOn: "created_on", modifiedOn: "modified_on" }),
) as unknown as Schema.Schema<GetKeylessCertificateResponse>;

export const getKeylessCertificate: (
  input: GetKeylessCertificateRequest,
) => Effect.Effect<
  GetKeylessCertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetKeylessCertificateRequest,
  output: GetKeylessCertificateResponse,
  errors: [],
}));

export interface ListKeylessCertificatesRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListKeylessCertificatesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/keyless_certificates" }),
) as unknown as Schema.Schema<ListKeylessCertificatesRequest>;

export type ListKeylessCertificatesResponse = {
  id: string;
  createdOn: string;
  enabled: boolean;
  host: string;
  modifiedOn: string;
  name: string;
  permissions: string[];
  port: number;
  status: "active" | "deleted";
  tunnel?: { privateIp: string; vnetId: string };
}[];

export const ListKeylessCertificatesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    enabled: Schema.Boolean,
    host: Schema.String,
    modifiedOn: Schema.String,
    name: Schema.String,
    permissions: Schema.Array(Schema.String),
    port: Schema.Number,
    status: Schema.Literals(["active", "deleted"]),
    tunnel: Schema.optional(
      Schema.Struct({
        privateIp: Schema.String,
        vnetId: Schema.String,
      }).pipe(
        Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({ createdOn: "created_on", modifiedOn: "modified_on" }),
  ),
) as unknown as Schema.Schema<ListKeylessCertificatesResponse>;

export const listKeylessCertificates: (
  input: ListKeylessCertificatesRequest,
) => Effect.Effect<
  ListKeylessCertificatesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListKeylessCertificatesRequest,
  output: ListKeylessCertificatesResponse,
  errors: [],
}));

export interface CreateKeylessCertificateRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The zone's SSL certificate or SSL certificate and intermediate(s). */
  certificate: string;
  /** Body param: The keyless SSL name. */
  host: string;
  /** Body param: The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server. */
  port: number;
  /** Body param: A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest i */
  bundleMethod?: "ubiquitous" | "optimal" | "force";
  /** Body param: The keyless SSL name. */
  name?: string;
  /** Body param: Configuration for using Keyless SSL through a Cloudflare Tunnel */
  tunnel?: { privateIp: string; vnetId: string };
}

export const CreateKeylessCertificateRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  certificate: Schema.String,
  host: Schema.String,
  port: Schema.Number,
  bundleMethod: Schema.optional(
    Schema.Literals(["ubiquitous", "optimal", "force"]),
  ),
  name: Schema.optional(Schema.String),
  tunnel: Schema.optional(
    Schema.Struct({
      privateIp: Schema.String,
      vnetId: Schema.String,
    }).pipe(Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" })),
  ),
}).pipe(
  Schema.encodeKeys({ bundleMethod: "bundle_method" }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/keyless_certificates" }),
) as unknown as Schema.Schema<CreateKeylessCertificateRequest>;

export interface CreateKeylessCertificateResponse {
  /** Keyless certificate identifier tag. */
  id: string;
  /** When the Keyless SSL was created. */
  createdOn: string;
  /** Whether or not the Keyless SSL is on or off. */
  enabled: boolean;
  /** The keyless SSL name. */
  host: string;
  /** When the Keyless SSL was last modified. */
  modifiedOn: string;
  /** The keyless SSL name. */
  name: string;
  /** Available permissions for the Keyless SSL for the current user requesting the item. */
  permissions: string[];
  /** The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server. */
  port: number;
  /** Status of the Keyless SSL. */
  status: "active" | "deleted";
  /** Configuration for using Keyless SSL through a Cloudflare Tunnel */
  tunnel?: { privateIp: string; vnetId: string };
}

export const CreateKeylessCertificateResponse = Schema.Struct({
  id: Schema.String,
  createdOn: Schema.String,
  enabled: Schema.Boolean,
  host: Schema.String,
  modifiedOn: Schema.String,
  name: Schema.String,
  permissions: Schema.Array(Schema.String),
  port: Schema.Number,
  status: Schema.Literals(["active", "deleted"]),
  tunnel: Schema.optional(
    Schema.Struct({
      privateIp: Schema.String,
      vnetId: Schema.String,
    }).pipe(Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" })),
  ),
}).pipe(
  Schema.encodeKeys({ createdOn: "created_on", modifiedOn: "modified_on" }),
) as unknown as Schema.Schema<CreateKeylessCertificateResponse>;

export const createKeylessCertificate: (
  input: CreateKeylessCertificateRequest,
) => Effect.Effect<
  CreateKeylessCertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateKeylessCertificateRequest,
  output: CreateKeylessCertificateResponse,
  errors: [],
}));

export interface PatchKeylessCertificateRequest {
  keylessCertificateId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** @deprecated Body param: Whether or not the Keyless SSL is on or off. */
  enabled?: boolean;
  /** Body param: The keyless SSL name. */
  host?: string;
  /** Body param: The keyless SSL name. */
  name?: string;
  /** Body param: The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server. */
  port?: number;
  /** Body param: Configuration for using Keyless SSL through a Cloudflare Tunnel */
  tunnel?: { privateIp: string; vnetId: string };
}

export const PatchKeylessCertificateRequest = Schema.Struct({
  keylessCertificateId: Schema.String.pipe(T.HttpPath("keylessCertificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.optional(Schema.Boolean),
  host: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  tunnel: Schema.optional(
    Schema.Struct({
      privateIp: Schema.String,
      vnetId: Schema.String,
    }).pipe(Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" })),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/keyless_certificates/{keylessCertificateId}",
  }),
) as unknown as Schema.Schema<PatchKeylessCertificateRequest>;

export interface PatchKeylessCertificateResponse {
  /** Keyless certificate identifier tag. */
  id: string;
  /** When the Keyless SSL was created. */
  createdOn: string;
  /** Whether or not the Keyless SSL is on or off. */
  enabled: boolean;
  /** The keyless SSL name. */
  host: string;
  /** When the Keyless SSL was last modified. */
  modifiedOn: string;
  /** The keyless SSL name. */
  name: string;
  /** Available permissions for the Keyless SSL for the current user requesting the item. */
  permissions: string[];
  /** The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server. */
  port: number;
  /** Status of the Keyless SSL. */
  status: "active" | "deleted";
  /** Configuration for using Keyless SSL through a Cloudflare Tunnel */
  tunnel?: { privateIp: string; vnetId: string };
}

export const PatchKeylessCertificateResponse = Schema.Struct({
  id: Schema.String,
  createdOn: Schema.String,
  enabled: Schema.Boolean,
  host: Schema.String,
  modifiedOn: Schema.String,
  name: Schema.String,
  permissions: Schema.Array(Schema.String),
  port: Schema.Number,
  status: Schema.Literals(["active", "deleted"]),
  tunnel: Schema.optional(
    Schema.Struct({
      privateIp: Schema.String,
      vnetId: Schema.String,
    }).pipe(Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" })),
  ),
}).pipe(
  Schema.encodeKeys({ createdOn: "created_on", modifiedOn: "modified_on" }),
) as unknown as Schema.Schema<PatchKeylessCertificateResponse>;

export const patchKeylessCertificate: (
  input: PatchKeylessCertificateRequest,
) => Effect.Effect<
  PatchKeylessCertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchKeylessCertificateRequest,
  output: PatchKeylessCertificateResponse,
  errors: [],
}));

export interface DeleteKeylessCertificateRequest {
  keylessCertificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteKeylessCertificateRequest = Schema.Struct({
  keylessCertificateId: Schema.String.pipe(T.HttpPath("keylessCertificateId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/keyless_certificates/{keylessCertificateId}",
  }),
) as unknown as Schema.Schema<DeleteKeylessCertificateRequest>;

export interface DeleteKeylessCertificateResponse {
  /** Identifier. */
  id?: string;
}

export const DeleteKeylessCertificateResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteKeylessCertificateResponse>;

export const deleteKeylessCertificate: (
  input: DeleteKeylessCertificateRequest,
) => Effect.Effect<
  DeleteKeylessCertificateResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteKeylessCertificateRequest,
  output: DeleteKeylessCertificateResponse,
  errors: [],
}));
