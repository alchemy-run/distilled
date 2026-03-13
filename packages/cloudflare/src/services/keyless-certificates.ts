/**
 * Cloudflare KEYLESS-CERTIFICATES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service keyless-certificates
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// KeylessCertificate
// =============================================================================

export interface GetKeylessCertificateRequest {
  keylessCertificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetKeylessCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keylessCertificateId: Schema.String.pipe(
      T.HttpPath("keylessCertificateId"),
    ),
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
  tunnel?: { privateIp: string; vnetId: string } | null;
}

export const GetKeylessCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      Schema.Union([
        Schema.Struct({
          privateIp: Schema.String,
          vnetId: Schema.String,
        }).pipe(
          Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" }),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        enabled: "enabled",
        host: "host",
        modifiedOn: "modified_on",
        name: "name",
        permissions: "permissions",
        port: "port",
        status: "status",
        tunnel: "tunnel",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetKeylessCertificateResponse>;

export type GetKeylessCertificateError = DefaultErrors;

export const getKeylessCertificate: API.OperationMethod<
  GetKeylessCertificateRequest,
  GetKeylessCertificateResponse,
  GetKeylessCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKeylessCertificateRequest,
  output: GetKeylessCertificateResponse,
  errors: [],
}));

export interface ListKeylessCertificatesRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListKeylessCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/zones/{zone_id}/keyless_certificates" }),
  ) as unknown as Schema.Schema<ListKeylessCertificatesRequest>;

export interface ListKeylessCertificatesResponse {
  result: {
    id: string;
    createdOn: string;
    enabled: boolean;
    host: string;
    modifiedOn: string;
    name: string;
    permissions: string[];
    port: number;
    status: "active" | "deleted";
    tunnel?: { privateIp: string; vnetId: string } | null;
  }[];
}

export const ListKeylessCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
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
          Schema.Union([
            Schema.Struct({
              privateIp: Schema.String,
              vnetId: Schema.String,
            }).pipe(
              Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" }),
            ),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          createdOn: "created_on",
          enabled: "enabled",
          host: "host",
          modifiedOn: "modified_on",
          name: "name",
          permissions: "permissions",
          port: "port",
          status: "status",
          tunnel: "tunnel",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<ListKeylessCertificatesResponse>;

export type ListKeylessCertificatesError = DefaultErrors;

export const listKeylessCertificates: API.PaginatedOperationMethod<
  ListKeylessCertificatesRequest,
  ListKeylessCertificatesResponse,
  ListKeylessCertificatesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListKeylessCertificatesRequest,
  ) => stream.Stream<
    ListKeylessCertificatesResponse,
    ListKeylessCertificatesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListKeylessCertificatesRequest) => stream.Stream<
    {
      id: string;
      createdOn: string;
      enabled: boolean;
      host: string;
      modifiedOn: string;
      name: string;
      permissions: string[];
      port: number;
      status: "active" | "deleted";
      tunnel?: { privateIp: string; vnetId: string } | null;
    },
    ListKeylessCertificatesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListKeylessCertificatesRequest,
  output: ListKeylessCertificatesResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
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

export const CreateKeylessCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      }).pipe(
        Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      certificate: "certificate",
      host: "host",
      port: "port",
      bundleMethod: "bundle_method",
      name: "name",
      tunnel: "tunnel",
    }),
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
  tunnel?: { privateIp: string; vnetId: string } | null;
}

export const CreateKeylessCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      Schema.Union([
        Schema.Struct({
          privateIp: Schema.String,
          vnetId: Schema.String,
        }).pipe(
          Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" }),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        enabled: "enabled",
        host: "host",
        modifiedOn: "modified_on",
        name: "name",
        permissions: "permissions",
        port: "port",
        status: "status",
        tunnel: "tunnel",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateKeylessCertificateResponse>;

export type CreateKeylessCertificateError = DefaultErrors;

export const createKeylessCertificate: API.OperationMethod<
  CreateKeylessCertificateRequest,
  CreateKeylessCertificateResponse,
  CreateKeylessCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchKeylessCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keylessCertificateId: Schema.String.pipe(
      T.HttpPath("keylessCertificateId"),
    ),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    enabled: Schema.optional(Schema.Boolean),
    host: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    port: Schema.optional(Schema.Number),
    tunnel: Schema.optional(
      Schema.Struct({
        privateIp: Schema.String,
        vnetId: Schema.String,
      }).pipe(
        Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" }),
      ),
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
  tunnel?: { privateIp: string; vnetId: string } | null;
}

export const PatchKeylessCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      Schema.Union([
        Schema.Struct({
          privateIp: Schema.String,
          vnetId: Schema.String,
        }).pipe(
          Schema.encodeKeys({ privateIp: "private_ip", vnetId: "vnet_id" }),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        enabled: "enabled",
        host: "host",
        modifiedOn: "modified_on",
        name: "name",
        permissions: "permissions",
        port: "port",
        status: "status",
        tunnel: "tunnel",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PatchKeylessCertificateResponse>;

export type PatchKeylessCertificateError = DefaultErrors;

export const patchKeylessCertificate: API.OperationMethod<
  PatchKeylessCertificateRequest,
  PatchKeylessCertificateResponse,
  PatchKeylessCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchKeylessCertificateRequest,
  output: PatchKeylessCertificateResponse,
  errors: [],
}));

export interface DeleteKeylessCertificateRequest {
  keylessCertificateId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteKeylessCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keylessCertificateId: Schema.String.pipe(
      T.HttpPath("keylessCertificateId"),
    ),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/zones/{zone_id}/keyless_certificates/{keylessCertificateId}",
    }),
  ) as unknown as Schema.Schema<DeleteKeylessCertificateRequest>;

export interface DeleteKeylessCertificateResponse {
  /** Identifier. */
  id?: string | null;
}

export const DeleteKeylessCertificateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteKeylessCertificateResponse>;

export type DeleteKeylessCertificateError = DefaultErrors;

export const deleteKeylessCertificate: API.OperationMethod<
  DeleteKeylessCertificateRequest,
  DeleteKeylessCertificateResponse,
  DeleteKeylessCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteKeylessCertificateRequest,
  output: DeleteKeylessCertificateResponse,
  errors: [],
}));
