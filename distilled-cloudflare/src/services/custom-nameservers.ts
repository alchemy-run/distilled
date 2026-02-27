/**
 * Cloudflare CUSTOM-NAMESERVERS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service custom-nameservers
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
// CustomNameserver
// =============================================================================

export interface GetCustomNameserverRequest {
  /** Account identifier tag. */
  accountId: string;
}

export const GetCustomNameserverRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/custom_ns" }),
) as unknown as Schema.Schema<GetCustomNameserverRequest>;

export type GetCustomNameserverResponse = {
  dnsRecords: { type?: "A" | "AAAA"; value?: string }[];
  nsName: string;
  status: "moved" | "pending" | "verified";
  zoneTag: string;
  nsSet?: number;
}[];

export const GetCustomNameserverResponse = Schema.Array(
  Schema.Struct({
    dnsRecords: Schema.Array(
      Schema.Struct({
        type: Schema.optional(Schema.Literals(["A", "AAAA"])),
        value: Schema.optional(Schema.String),
      }),
    ),
    nsName: Schema.String,
    status: Schema.Literals(["moved", "pending", "verified"]),
    zoneTag: Schema.String,
    nsSet: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      dnsRecords: "dns_records",
      nsName: "ns_name",
      status: "status",
      zoneTag: "zone_tag",
      nsSet: "ns_set",
    }),
  ),
) as unknown as Schema.Schema<GetCustomNameserverResponse>;

export type GetCustomNameserverError = CommonErrors;

export const getCustomNameserver: API.OperationMethod<
  GetCustomNameserverRequest,
  GetCustomNameserverResponse,
  GetCustomNameserverError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCustomNameserverRequest,
  output: GetCustomNameserverResponse,
  errors: [],
}));

export interface CreateCustomNameserverRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: The FQDN of the name server. */
  nsName: string;
  /** Body param: The number of the set that this name server belongs to. */
  nsSet?: number;
}

export const CreateCustomNameserverRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  nsName: Schema.String,
  nsSet: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({ nsName: "ns_name", nsSet: "ns_set" }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/custom_ns" }),
) as unknown as Schema.Schema<CreateCustomNameserverRequest>;

export interface CreateCustomNameserverResponse {
  /** A and AAAA records associated with the nameserver. */
  dnsRecords: { type?: "A" | "AAAA"; value?: string }[];
  /** The FQDN of the name server. */
  nsName: string;
  /** @deprecated Verification status of the nameserver. */
  status: "moved" | "pending" | "verified";
  /** Identifier. */
  zoneTag: string;
  /** The number of the set that this name server belongs to. */
  nsSet?: number;
}

export const CreateCustomNameserverResponse = Schema.Struct({
  dnsRecords: Schema.Array(
    Schema.Struct({
      type: Schema.optional(Schema.Literals(["A", "AAAA"])),
      value: Schema.optional(Schema.String),
    }),
  ),
  nsName: Schema.String,
  status: Schema.Literals(["moved", "pending", "verified"]),
  zoneTag: Schema.String,
  nsSet: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    dnsRecords: "dns_records",
    nsName: "ns_name",
    status: "status",
    zoneTag: "zone_tag",
    nsSet: "ns_set",
  }),
) as unknown as Schema.Schema<CreateCustomNameserverResponse>;

export type CreateCustomNameserverError = CommonErrors;

export const createCustomNameserver: API.OperationMethod<
  CreateCustomNameserverRequest,
  CreateCustomNameserverResponse,
  CreateCustomNameserverError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCustomNameserverRequest,
  output: CreateCustomNameserverResponse,
  errors: [],
}));

export interface DeleteCustomNameserverRequest {
  customNSId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteCustomNameserverRequest = Schema.Struct({
  customNSId: Schema.String.pipe(T.HttpPath("customNSId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/custom_ns/{customNSId}",
  }),
) as unknown as Schema.Schema<DeleteCustomNameserverRequest>;

export type DeleteCustomNameserverResponse = string[];

export const DeleteCustomNameserverResponse = Schema.Array(
  Schema.String,
) as unknown as Schema.Schema<DeleteCustomNameserverResponse>;

export type DeleteCustomNameserverError = CommonErrors;

export const deleteCustomNameserver: API.OperationMethod<
  DeleteCustomNameserverRequest,
  DeleteCustomNameserverResponse,
  DeleteCustomNameserverError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCustomNameserverRequest,
  output: DeleteCustomNameserverResponse,
  errors: [],
}));
