/**
 * Cloudflare CUSTOM-NAMESERVERS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service custom-nameservers
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// CustomNameserver
// =============================================================================

export interface GetCustomNameserverRequest {
  /** Account identifier tag. */
  accountId: string;
}

export const GetCustomNameserverRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/custom_ns" }),
  ) as unknown as Schema.Schema<GetCustomNameserverRequest>;

export interface GetCustomNameserverResponse {
  result: {
    dnsRecords: { type?: "A" | "AAAA" | null; value?: string | null }[];
    nsName: string;
    status: "moved" | "pending" | "verified";
    zoneTag: string;
    nsSet?: number | null;
  }[];
}

export const GetCustomNameserverResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        dnsRecords: Schema.Array(
          Schema.Struct({
            type: Schema.optional(
              Schema.Union([Schema.Literals(["A", "AAAA"]), Schema.Null]),
            ),
            value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        nsName: Schema.String,
        status: Schema.Literals(["moved", "pending", "verified"]),
        zoneTag: Schema.String,
        nsSet: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          dnsRecords: "dns_records",
          nsName: "ns_name",
          status: "status",
          zoneTag: "zone_tag",
          nsSet: "ns_set",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<GetCustomNameserverResponse>;

export type GetCustomNameserverError = DefaultErrors;

export const getCustomNameserver: API.PaginatedOperationMethod<
  GetCustomNameserverRequest,
  GetCustomNameserverResponse,
  GetCustomNameserverError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: GetCustomNameserverRequest,
  ) => stream.Stream<
    GetCustomNameserverResponse,
    GetCustomNameserverError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: GetCustomNameserverRequest,
  ) => stream.Stream<
    {
      dnsRecords: { type?: "A" | "AAAA" | null; value?: string | null }[];
      nsName: string;
      status: "moved" | "pending" | "verified";
      zoneTag: string;
      nsSet?: number | null;
    },
    GetCustomNameserverError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetCustomNameserverRequest,
  output: GetCustomNameserverResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateCustomNameserverRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: The FQDN of the name server. */
  nsName: string;
  /** Body param: The number of the set that this name server belongs to. */
  nsSet?: number;
}

export const CreateCustomNameserverRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    nsName: Schema.String,
    nsSet: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({ nsName: "ns_name", nsSet: "ns_set" }),
    T.Http({ method: "POST", path: "/accounts/{account_id}/custom_ns" }),
  ) as unknown as Schema.Schema<CreateCustomNameserverRequest>;

export interface CreateCustomNameserverResponse {
  /** A and AAAA records associated with the nameserver. */
  dnsRecords: { type?: "A" | "AAAA" | null; value?: string | null }[];
  /** The FQDN of the name server. */
  nsName: string;
  /** @deprecated Verification status of the nameserver. */
  status: "moved" | "pending" | "verified";
  /** Identifier. */
  zoneTag: string;
  /** The number of the set that this name server belongs to. */
  nsSet?: number | null;
}

export const CreateCustomNameserverResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dnsRecords: Schema.Array(
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literals(["A", "AAAA"]), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
    ),
    nsName: Schema.String,
    status: Schema.Literals(["moved", "pending", "verified"]),
    zoneTag: Schema.String,
    nsSet: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        dnsRecords: "dns_records",
        nsName: "ns_name",
        status: "status",
        zoneTag: "zone_tag",
        nsSet: "ns_set",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateCustomNameserverResponse>;

export type CreateCustomNameserverError = DefaultErrors;

export const createCustomNameserver: API.OperationMethod<
  CreateCustomNameserverRequest,
  CreateCustomNameserverResponse,
  CreateCustomNameserverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCustomNameserverRequest,
  output: CreateCustomNameserverResponse,
  errors: [],
}));

export interface DeleteCustomNameserverRequest {
  customNSId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteCustomNameserverRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customNSId: Schema.String.pipe(T.HttpPath("customNSId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/custom_ns/{customNSId}",
    }),
  ) as unknown as Schema.Schema<DeleteCustomNameserverRequest>;

export interface DeleteCustomNameserverResponse {
  result: string[];
}

export const DeleteCustomNameserverResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(Schema.String),
  }) as unknown as Schema.Schema<DeleteCustomNameserverResponse>;

export type DeleteCustomNameserverError = DefaultErrors;

export const deleteCustomNameserver: API.PaginatedOperationMethod<
  DeleteCustomNameserverRequest,
  DeleteCustomNameserverResponse,
  DeleteCustomNameserverError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: DeleteCustomNameserverRequest,
  ) => stream.Stream<
    DeleteCustomNameserverResponse,
    DeleteCustomNameserverError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: DeleteCustomNameserverRequest,
  ) => stream.Stream<
    string,
    DeleteCustomNameserverError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DeleteCustomNameserverRequest,
  output: DeleteCustomNameserverResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));
