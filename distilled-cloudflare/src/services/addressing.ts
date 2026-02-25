/**
 * Cloudflare ADDRESSING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service addressing
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
// Errors
// =============================================================================

export class AddressMapNotFound extends Schema.TaggedErrorClass<AddressMapNotFound>()(
  "AddressMapNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(AddressMapNotFound, [
  { code: 1000 },
  { code: 1000, message: { includes: "not_found" } },
]);

export class BgpPrefixNotFound extends Schema.TaggedErrorClass<BgpPrefixNotFound>()(
  "BgpPrefixNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(BgpPrefixNotFound, [{ code: 1002 }]);

export class BindingNotFound extends Schema.TaggedErrorClass<BindingNotFound>()(
  "BindingNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(BindingNotFound, [{ code: 1002 }]);

export class DelegationNotFound extends Schema.TaggedErrorClass<DelegationNotFound>()(
  "DelegationNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(DelegationNotFound, [{ code: 1000 }]);

export class FeatureNotEnabled extends Schema.TaggedErrorClass<FeatureNotEnabled>()(
  "FeatureNotEnabled",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(FeatureNotEnabled, [
  { code: 1002, message: { includes: "address_maps_not_enabled" } },
]);

export class InvalidAccountId extends Schema.TaggedErrorClass<InvalidAccountId>()(
  "InvalidAccountId",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidAccountId, [
  { code: 7003, message: { includes: "Could not route" } },
]);

export class InvalidHostname extends Schema.TaggedErrorClass<InvalidHostname>()(
  "InvalidHostname",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidHostname, [
  { code: 1002, message: { includes: "forbidden" } },
]);

export class InvalidLoaForm extends Schema.TaggedErrorClass<InvalidLoaForm>()(
  "InvalidLoaForm",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidLoaForm, [
  { code: 1001, message: { includes: "invalid_loa_form" } },
]);

export class InvalidNetworkCidr extends Schema.TaggedErrorClass<InvalidNetworkCidr>()(
  "InvalidNetworkCidr",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidNetworkCidr, [
  { code: 1001, message: { includes: "invalid_network_cidr" } },
]);

export class InvalidZoneId extends Schema.TaggedErrorClass<InvalidZoneId>()(
  "InvalidZoneId",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidZoneId, [
  { code: 7003, message: { includes: "Could not route" } },
]);

export class IrrEntryNotFound extends Schema.TaggedErrorClass<IrrEntryNotFound>()(
  "IrrEntryNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(IrrEntryNotFound, [
  { code: 1003, message: { includes: "irr_entry_not_found" } },
]);

export class LoaDocumentNotFound extends Schema.TaggedErrorClass<LoaDocumentNotFound>()(
  "LoaDocumentNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(LoaDocumentNotFound, [{ code: 1000 }]);

export class MethodNotAllowed extends Schema.TaggedErrorClass<MethodNotAllowed>()(
  "MethodNotAllowed",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MethodNotAllowed, [
  { code: 10405, message: { includes: "not allowed" } },
  { code: 10000, message: { includes: "not allowed" } },
]);

export class MissingAccountId extends Schema.TaggedErrorClass<MissingAccountId>()(
  "MissingAccountId",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MissingAccountId, [{ code: 1001 }]);

export class NonexistentAccountPrefix extends Schema.TaggedErrorClass<NonexistentAccountPrefix>()(
  "NonexistentAccountPrefix",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(NonexistentAccountPrefix, [{ code: 1003 }]);

export class PrefixNotFound extends Schema.TaggedErrorClass<PrefixNotFound>()(
  "PrefixNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(PrefixNotFound, [
  { code: 1000 },
  { code: 1000, message: { includes: "not_found" } },
]);

export class RegionalHostnameEmpty extends Schema.TaggedErrorClass<RegionalHostnameEmpty>()(
  "RegionalHostnameEmpty",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(RegionalHostnameEmpty, [
  { code: 1000, message: { includes: "not_found" } },
]);

export class RegionalHostnameNotFound extends Schema.TaggedErrorClass<RegionalHostnameNotFound>()(
  "RegionalHostnameNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(RegionalHostnameNotFound, [
  { code: 1002, message: { includes: "forbidden" } },
]);

export class UnsupportedBindingConfiguration extends Schema.TaggedErrorClass<UnsupportedBindingConfiguration>()(
  "UnsupportedBindingConfiguration",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(UnsupportedBindingConfiguration, [{ code: 1003 }]);

// =============================================================================
// AddressMap
// =============================================================================

export interface GetAddressMapRequest {
  addressMapId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const GetAddressMapRequest = Schema.Struct({
  addressMapId: Schema.String.pipe(T.HttpPath("addressMapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/address_maps/{addressMapId}",
  }),
) as unknown as Schema.Schema<GetAddressMapRequest>;

export interface GetAddressMapResponse {
  /** Identifier of an Address Map. */
  id?: string;
  /** If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps. */
  canDelete?: boolean;
  /** If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps. */
  canModifyIps?: boolean;
  createdAt?: string;
  /** If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it */
  defaultSni?: string | null;
  /** An optional description field which may be used to describe the types of IPs or zones on the map. */
  description?: string | null;
  /** Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled. */
  enabled?: boolean | null;
  /** The set of IPs on the Address Map. */
  ips?: unknown;
  /** Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership. */
  memberships?: {
    canDelete?: boolean;
    createdAt?: string;
    identifier?: string;
    kind?: "zone" | "account";
  }[];
  modifiedAt?: string;
}

export const GetAddressMapResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  canDelete: Schema.optional(Schema.Boolean),
  canModifyIps: Schema.optional(Schema.Boolean),
  createdAt: Schema.optional(Schema.String),
  defaultSni: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  ips: Schema.optional(Schema.Unknown),
  memberships: Schema.optional(
    Schema.Array(
      Schema.Struct({
        canDelete: Schema.optional(Schema.Boolean),
        createdAt: Schema.optional(Schema.String),
        identifier: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.Literals(["zone", "account"])),
      }).pipe(
        Schema.encodeKeys({ canDelete: "can_delete", createdAt: "created_at" }),
      ),
    ),
  ),
  modifiedAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    canDelete: "can_delete",
    canModifyIps: "can_modify_ips",
    createdAt: "created_at",
    defaultSni: "default_sni",
    modifiedAt: "modified_at",
  }),
) as unknown as Schema.Schema<GetAddressMapResponse>;

export const getAddressMap: (
  input: GetAddressMapRequest,
) => Effect.Effect<
  GetAddressMapResponse,
  CommonErrors | AddressMapNotFound | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAddressMapRequest,
  output: GetAddressMapResponse,
  errors: [AddressMapNotFound, InvalidAccountId],
}));

export interface ListAddressMapsRequest {
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const ListAddressMapsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/address_maps",
  }),
) as unknown as Schema.Schema<ListAddressMapsRequest>;

export type ListAddressMapsResponse = {
  id?: string;
  canDelete?: boolean;
  canModifyIps?: boolean;
  createdAt?: string;
  defaultSni?: string | null;
  description?: string | null;
  enabled?: boolean | null;
  modifiedAt?: string;
}[];

export const ListAddressMapsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    canDelete: Schema.optional(Schema.Boolean),
    canModifyIps: Schema.optional(Schema.Boolean),
    createdAt: Schema.optional(Schema.String),
    defaultSni: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    modifiedAt: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      canDelete: "can_delete",
      canModifyIps: "can_modify_ips",
      createdAt: "created_at",
      defaultSni: "default_sni",
      modifiedAt: "modified_at",
    }),
  ),
) as unknown as Schema.Schema<ListAddressMapsResponse>;

export const listAddressMaps: (
  input: ListAddressMapsRequest,
) => Effect.Effect<
  ListAddressMapsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAddressMapsRequest,
  output: ListAddressMapsResponse,
  errors: [],
}));

export interface CreateAddressMapRequest {
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: An optional description field which may be used to describe the types of IPs or zones on the map. */
  description?: string | null;
  /** Body param: Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled. */
  enabled?: boolean | null;
  /** Body param: */
  ips?: string[];
  /** Body param: Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership. */
  memberships?: { identifier?: string; kind?: "zone" | "account" }[];
}

export const CreateAddressMapRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  ips: Schema.optional(Schema.Array(Schema.String)),
  memberships: Schema.optional(
    Schema.Array(
      Schema.Struct({
        identifier: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.Literals(["zone", "account"])),
      }),
    ),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/addressing/address_maps",
  }),
) as unknown as Schema.Schema<CreateAddressMapRequest>;

export interface CreateAddressMapResponse {
  /** Identifier of an Address Map. */
  id?: string;
  /** If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps. */
  canDelete?: boolean;
  /** If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps. */
  canModifyIps?: boolean;
  createdAt?: string;
  /** If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it */
  defaultSni?: string | null;
  /** An optional description field which may be used to describe the types of IPs or zones on the map. */
  description?: string | null;
  /** Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled. */
  enabled?: boolean | null;
  /** The set of IPs on the Address Map. */
  ips?: unknown;
  /** Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership. */
  memberships?: {
    canDelete?: boolean;
    createdAt?: string;
    identifier?: string;
    kind?: "zone" | "account";
  }[];
  modifiedAt?: string;
}

export const CreateAddressMapResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  canDelete: Schema.optional(Schema.Boolean),
  canModifyIps: Schema.optional(Schema.Boolean),
  createdAt: Schema.optional(Schema.String),
  defaultSni: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  ips: Schema.optional(Schema.Unknown),
  memberships: Schema.optional(
    Schema.Array(
      Schema.Struct({
        canDelete: Schema.optional(Schema.Boolean),
        createdAt: Schema.optional(Schema.String),
        identifier: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.Literals(["zone", "account"])),
      }).pipe(
        Schema.encodeKeys({ canDelete: "can_delete", createdAt: "created_at" }),
      ),
    ),
  ),
  modifiedAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    canDelete: "can_delete",
    canModifyIps: "can_modify_ips",
    createdAt: "created_at",
    defaultSni: "default_sni",
    modifiedAt: "modified_at",
  }),
) as unknown as Schema.Schema<CreateAddressMapResponse>;

export const createAddressMap: (
  input: CreateAddressMapRequest,
) => Effect.Effect<
  CreateAddressMapResponse,
  CommonErrors | FeatureNotEnabled | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAddressMapRequest,
  output: CreateAddressMapResponse,
  errors: [FeatureNotEnabled, InvalidAccountId],
}));

export interface PatchAddressMapRequest {
  addressMapId: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client withou */
  defaultSni?: string | null;
  /** Body param: An optional description field which may be used to describe the types of IPs or zones on the map. */
  description?: string | null;
  /** Body param: Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled. */
  enabled?: boolean | null;
}

export const PatchAddressMapRequest = Schema.Struct({
  addressMapId: Schema.String.pipe(T.HttpPath("addressMapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  defaultSni: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}).pipe(
  Schema.encodeKeys({ defaultSni: "default_sni" }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/addressing/address_maps/{addressMapId}",
  }),
) as unknown as Schema.Schema<PatchAddressMapRequest>;

export interface PatchAddressMapResponse {
  /** Identifier of an Address Map. */
  id?: string;
  /** If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps. */
  canDelete?: boolean;
  /** If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps. */
  canModifyIps?: boolean;
  createdAt?: string;
  /** If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it */
  defaultSni?: string | null;
  /** An optional description field which may be used to describe the types of IPs or zones on the map. */
  description?: string | null;
  /** Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled. */
  enabled?: boolean | null;
  modifiedAt?: string;
}

export const PatchAddressMapResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  canDelete: Schema.optional(Schema.Boolean),
  canModifyIps: Schema.optional(Schema.Boolean),
  createdAt: Schema.optional(Schema.String),
  defaultSni: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  modifiedAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    canDelete: "can_delete",
    canModifyIps: "can_modify_ips",
    createdAt: "created_at",
    defaultSni: "default_sni",
    modifiedAt: "modified_at",
  }),
) as unknown as Schema.Schema<PatchAddressMapResponse>;

export const patchAddressMap: (
  input: PatchAddressMapRequest,
) => Effect.Effect<
  PatchAddressMapResponse,
  CommonErrors | MethodNotAllowed | FeatureNotEnabled | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAddressMapRequest,
  output: PatchAddressMapResponse,
  errors: [MethodNotAllowed, FeatureNotEnabled, InvalidAccountId],
}));

export interface DeleteAddressMapRequest {
  addressMapId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const DeleteAddressMapRequest = Schema.Struct({
  addressMapId: Schema.String.pipe(T.HttpPath("addressMapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/addressing/address_maps/{addressMapId}",
  }),
) as unknown as Schema.Schema<DeleteAddressMapRequest>;

export interface DeleteAddressMapResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
  resultInfo?: {
    count?: number;
    page?: number;
    perPage?: number;
    totalCount?: number;
  };
}

export const DeleteAddressMapResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
  resultInfo: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      page: Schema.optional(Schema.Number),
      perPage: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ perPage: "per_page", totalCount: "total_count" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ resultInfo: "result_info" }),
) as unknown as Schema.Schema<DeleteAddressMapResponse>;

export const deleteAddressMap: (
  input: DeleteAddressMapRequest,
) => Effect.Effect<
  DeleteAddressMapResponse,
  | CommonErrors
  | MethodNotAllowed
  | FeatureNotEnabled
  | InvalidAccountId
  | AddressMapNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAddressMapRequest,
  output: DeleteAddressMapResponse,
  errors: [
    MethodNotAllowed,
    FeatureNotEnabled,
    InvalidAccountId,
    AddressMapNotFound,
  ],
}));

// =============================================================================
// AddressMapAccount
// =============================================================================

export interface PutAddressMapAccountRequest {
  addressMapId: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: */
  body: unknown;
}

export const PutAddressMapAccountRequest = Schema.Struct({
  addressMapId: Schema.String.pipe(T.HttpPath("addressMapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/addressing/address_maps/{addressMapId}/accounts/{account_id}",
  }),
) as unknown as Schema.Schema<PutAddressMapAccountRequest>;

export interface PutAddressMapAccountResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
  resultInfo?: {
    count?: number;
    page?: number;
    perPage?: number;
    totalCount?: number;
  };
}

export const PutAddressMapAccountResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
  resultInfo: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      page: Schema.optional(Schema.Number),
      perPage: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ perPage: "per_page", totalCount: "total_count" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ resultInfo: "result_info" }),
) as unknown as Schema.Schema<PutAddressMapAccountResponse>;

export const putAddressMapAccount: (
  input: PutAddressMapAccountRequest,
) => Effect.Effect<
  PutAddressMapAccountResponse,
  CommonErrors | MethodNotAllowed | FeatureNotEnabled | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutAddressMapAccountRequest,
  output: PutAddressMapAccountResponse,
  errors: [MethodNotAllowed, FeatureNotEnabled, InvalidAccountId],
}));

export interface DeleteAddressMapAccountRequest {
  addressMapId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const DeleteAddressMapAccountRequest = Schema.Struct({
  addressMapId: Schema.String.pipe(T.HttpPath("addressMapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/addressing/address_maps/{addressMapId}/accounts/{account_id}",
  }),
) as unknown as Schema.Schema<DeleteAddressMapAccountRequest>;

export interface DeleteAddressMapAccountResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
  resultInfo?: {
    count?: number;
    page?: number;
    perPage?: number;
    totalCount?: number;
  };
}

export const DeleteAddressMapAccountResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
  resultInfo: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      page: Schema.optional(Schema.Number),
      perPage: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ perPage: "per_page", totalCount: "total_count" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ resultInfo: "result_info" }),
) as unknown as Schema.Schema<DeleteAddressMapAccountResponse>;

export const deleteAddressMapAccount: (
  input: DeleteAddressMapAccountRequest,
) => Effect.Effect<
  DeleteAddressMapAccountResponse,
  CommonErrors | MethodNotAllowed | FeatureNotEnabled | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAddressMapAccountRequest,
  output: DeleteAddressMapAccountResponse,
  errors: [MethodNotAllowed, FeatureNotEnabled, InvalidAccountId],
}));

// =============================================================================
// AddressMapIp
// =============================================================================

export interface PutAddressMapIpRequest {
  addressMapId: string;
  ipAddress: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: */
  body: unknown;
}

export const PutAddressMapIpRequest = Schema.Struct({
  addressMapId: Schema.String.pipe(T.HttpPath("addressMapId")),
  ipAddress: Schema.String.pipe(T.HttpPath("ipAddress")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/addressing/address_maps/{addressMapId}/ips/{ipAddress}",
  }),
) as unknown as Schema.Schema<PutAddressMapIpRequest>;

export interface PutAddressMapIpResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
  resultInfo?: {
    count?: number;
    page?: number;
    perPage?: number;
    totalCount?: number;
  };
}

export const PutAddressMapIpResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
  resultInfo: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      page: Schema.optional(Schema.Number),
      perPage: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ perPage: "per_page", totalCount: "total_count" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ resultInfo: "result_info" }),
) as unknown as Schema.Schema<PutAddressMapIpResponse>;

export const putAddressMapIp: (
  input: PutAddressMapIpRequest,
) => Effect.Effect<
  PutAddressMapIpResponse,
  | CommonErrors
  | MethodNotAllowed
  | FeatureNotEnabled
  | InvalidAccountId
  | AddressMapNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutAddressMapIpRequest,
  output: PutAddressMapIpResponse,
  errors: [
    MethodNotAllowed,
    FeatureNotEnabled,
    InvalidAccountId,
    AddressMapNotFound,
  ],
}));

export interface DeleteAddressMapIpRequest {
  addressMapId: string;
  ipAddress: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const DeleteAddressMapIpRequest = Schema.Struct({
  addressMapId: Schema.String.pipe(T.HttpPath("addressMapId")),
  ipAddress: Schema.String.pipe(T.HttpPath("ipAddress")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/addressing/address_maps/{addressMapId}/ips/{ipAddress}",
  }),
) as unknown as Schema.Schema<DeleteAddressMapIpRequest>;

export interface DeleteAddressMapIpResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
  resultInfo?: {
    count?: number;
    page?: number;
    perPage?: number;
    totalCount?: number;
  };
}

export const DeleteAddressMapIpResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
  resultInfo: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      page: Schema.optional(Schema.Number),
      perPage: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ perPage: "per_page", totalCount: "total_count" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ resultInfo: "result_info" }),
) as unknown as Schema.Schema<DeleteAddressMapIpResponse>;

export const deleteAddressMapIp: (
  input: DeleteAddressMapIpRequest,
) => Effect.Effect<
  DeleteAddressMapIpResponse,
  | CommonErrors
  | MethodNotAllowed
  | FeatureNotEnabled
  | InvalidAccountId
  | AddressMapNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAddressMapIpRequest,
  output: DeleteAddressMapIpResponse,
  errors: [
    MethodNotAllowed,
    FeatureNotEnabled,
    InvalidAccountId,
    AddressMapNotFound,
  ],
}));

// =============================================================================
// AddressMapZone
// =============================================================================

export interface PutAddressMapZoneRequest {
  addressMapId: string;
  /** Path param: Identifier of a zone. */
  zoneId: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: */
  body: unknown;
}

export const PutAddressMapZoneRequest = Schema.Struct({
  addressMapId: Schema.String.pipe(T.HttpPath("addressMapId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/addressing/address_maps/{addressMapId}/zones/{zone_id}",
  }),
) as unknown as Schema.Schema<PutAddressMapZoneRequest>;

export interface PutAddressMapZoneResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
  resultInfo?: {
    count?: number;
    page?: number;
    perPage?: number;
    totalCount?: number;
  };
}

export const PutAddressMapZoneResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
  resultInfo: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      page: Schema.optional(Schema.Number),
      perPage: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ perPage: "per_page", totalCount: "total_count" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ resultInfo: "result_info" }),
) as unknown as Schema.Schema<PutAddressMapZoneResponse>;

export const putAddressMapZone: (
  input: PutAddressMapZoneRequest,
) => Effect.Effect<
  PutAddressMapZoneResponse,
  CommonErrors | MethodNotAllowed | FeatureNotEnabled | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutAddressMapZoneRequest,
  output: PutAddressMapZoneResponse,
  errors: [MethodNotAllowed, FeatureNotEnabled, InvalidAccountId],
}));

export interface DeleteAddressMapZoneRequest {
  addressMapId: string;
  /** Identifier of a zone. */
  zoneId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const DeleteAddressMapZoneRequest = Schema.Struct({
  addressMapId: Schema.String.pipe(T.HttpPath("addressMapId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/addressing/address_maps/{addressMapId}/zones/{zone_id}",
  }),
) as unknown as Schema.Schema<DeleteAddressMapZoneRequest>;

export interface DeleteAddressMapZoneResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
  resultInfo?: {
    count?: number;
    page?: number;
    perPage?: number;
    totalCount?: number;
  };
}

export const DeleteAddressMapZoneResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
  resultInfo: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      page: Schema.optional(Schema.Number),
      perPage: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ perPage: "per_page", totalCount: "total_count" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ resultInfo: "result_info" }),
) as unknown as Schema.Schema<DeleteAddressMapZoneResponse>;

export const deleteAddressMapZone: (
  input: DeleteAddressMapZoneRequest,
) => Effect.Effect<
  DeleteAddressMapZoneResponse,
  CommonErrors | MethodNotAllowed | FeatureNotEnabled | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAddressMapZoneRequest,
  output: DeleteAddressMapZoneResponse,
  errors: [MethodNotAllowed, FeatureNotEnabled, InvalidAccountId],
}));

// =============================================================================
// LoaDocument
// =============================================================================

export interface GetLoaDocumentRequest {
  loaDocumentId: string | null;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const GetLoaDocumentRequest = Schema.Struct({
  loaDocumentId: Schema.Union([Schema.String, Schema.Null]).pipe(
    T.HttpPath("loaDocumentId"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/loa_documents/{loaDocumentId}/download",
  }),
) as unknown as Schema.Schema<GetLoaDocumentRequest>;

export type GetLoaDocumentResponse = unknown;

export const GetLoaDocumentResponse =
  Schema.Unknown as unknown as Schema.Schema<GetLoaDocumentResponse>;

export const getLoaDocument: (
  input: GetLoaDocumentRequest,
) => Effect.Effect<
  GetLoaDocumentResponse,
  CommonErrors | LoaDocumentNotFound | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLoaDocumentRequest,
  output: GetLoaDocumentResponse,
  errors: [LoaDocumentNotFound, InvalidAccountId],
}));

export interface CreateLoaDocumentRequest {
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: LOA document to upload. */
  loaDocument: string;
}

export const CreateLoaDocumentRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  loaDocument: Schema.String,
}).pipe(
  Schema.encodeKeys({ loaDocument: "loa_document" }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/addressing/loa_documents",
  }),
) as unknown as Schema.Schema<CreateLoaDocumentRequest>;

export interface CreateLoaDocumentResponse {
  /** Identifier for the uploaded LOA document. */
  id?: string | null;
  /** Identifier of a Cloudflare account. */
  accountId?: string;
  /** Whether the LOA has been auto-generated for the prefix owner by Cloudflare. */
  autoGenerated?: boolean;
  created?: string;
  /** Name of LOA document. Max file size 10MB, and supported filetype is pdf. */
  filename?: string;
  /** File size of the uploaded LOA document. */
  sizeBytes?: number;
  /** Whether the LOA has been verified by Cloudflare staff. */
  verified?: boolean;
  /** Timestamp of the moment the LOA was marked as validated. */
  verifiedAt?: string | null;
}

export const CreateLoaDocumentResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  accountId: Schema.optional(Schema.String),
  autoGenerated: Schema.optional(Schema.Boolean),
  created: Schema.optional(Schema.String),
  filename: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.Number),
  verified: Schema.optional(Schema.Boolean),
  verifiedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    autoGenerated: "auto_generated",
    sizeBytes: "size_bytes",
    verifiedAt: "verified_at",
  }),
) as unknown as Schema.Schema<CreateLoaDocumentResponse>;

export const createLoaDocument: (
  input: CreateLoaDocumentRequest,
) => Effect.Effect<
  CreateLoaDocumentResponse,
  CommonErrors | InvalidAccountId | InvalidLoaForm,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLoaDocumentRequest,
  output: CreateLoaDocumentResponse,
  errors: [InvalidAccountId, InvalidLoaForm],
}));

// =============================================================================
// Prefix
// =============================================================================

export interface GetPrefixRequest {
  prefixId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const GetPrefixRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}",
  }),
) as unknown as Schema.Schema<GetPrefixRequest>;

export interface GetPrefixResponse {
  /** Identifier of an IP Prefix. */
  id?: string;
  /** Identifier of a Cloudflare account. */
  accountId?: string;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  advertised?: boolean | null;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  advertisedModifiedAt?: string | null;
  /** Approval state of the prefix (P = pending, V = active). */
  approved?: string;
  /** Autonomous System Number (ASN) the prefix will be advertised under. */
  asn?: number;
  /** IP Prefix in Classless Inter-Domain Routing format. */
  cidr?: string;
  createdAt?: string;
  /** Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner. */
  delegateLoaCreation?: boolean;
  /** Description of the prefix. */
  description?: string;
  /** State of one kind of validation for an IP prefix. */
  irrValidationState?: string;
  /** Identifier for the uploaded LOA document. */
  loaDocumentId?: string | null;
  modifiedAt?: string;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  onDemandEnabled?: boolean;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  onDemandLocked?: boolean;
  /** State of one kind of validation for an IP prefix. */
  ownershipValidationState?: string;
  /** Token provided to demonstrate ownership of the prefix. */
  ownershipValidationToken?: string;
  /** State of one kind of validation for an IP prefix. */
  rpkiValidationState?: string;
}

export const GetPrefixResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  advertised: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  advertisedModifiedAt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  approved: Schema.optional(Schema.String),
  asn: Schema.optional(Schema.Number),
  cidr: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  delegateLoaCreation: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  irrValidationState: Schema.optional(Schema.String),
  loaDocumentId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedAt: Schema.optional(Schema.String),
  onDemandEnabled: Schema.optional(Schema.Boolean),
  onDemandLocked: Schema.optional(Schema.Boolean),
  ownershipValidationState: Schema.optional(Schema.String),
  ownershipValidationToken: Schema.optional(Schema.String),
  rpkiValidationState: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    advertisedModifiedAt: "advertised_modified_at",
    createdAt: "created_at",
    delegateLoaCreation: "delegate_loa_creation",
    irrValidationState: "irr_validation_state",
    loaDocumentId: "loa_document_id",
    modifiedAt: "modified_at",
    onDemandEnabled: "on_demand_enabled",
    onDemandLocked: "on_demand_locked",
    ownershipValidationState: "ownership_validation_state",
    ownershipValidationToken: "ownership_validation_token",
    rpkiValidationState: "rpki_validation_state",
  }),
) as unknown as Schema.Schema<GetPrefixResponse>;

export const getPrefix: (
  input: GetPrefixRequest,
) => Effect.Effect<
  GetPrefixResponse,
  CommonErrors | PrefixNotFound | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPrefixRequest,
  output: GetPrefixResponse,
  errors: [PrefixNotFound, InvalidAccountId],
}));

export interface ListPrefixesRequest {
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const ListPrefixesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/addressing/prefixes" }),
) as unknown as Schema.Schema<ListPrefixesRequest>;

export type ListPrefixesResponse = {
  id?: string;
  accountId?: string;
  advertised?: boolean | null;
  advertisedModifiedAt?: string | null;
  approved?: string;
  asn?: number;
  cidr?: string;
  createdAt?: string;
  delegateLoaCreation?: boolean;
  description?: string;
  irrValidationState?: string;
  loaDocumentId?: string | null;
  modifiedAt?: string;
  onDemandEnabled?: boolean;
  onDemandLocked?: boolean;
  ownershipValidationState?: string;
  ownershipValidationToken?: string;
  rpkiValidationState?: string;
}[];

export const ListPrefixesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
    advertised: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    advertisedModifiedAt: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    approved: Schema.optional(Schema.String),
    asn: Schema.optional(Schema.Number),
    cidr: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    delegateLoaCreation: Schema.optional(Schema.Boolean),
    description: Schema.optional(Schema.String),
    irrValidationState: Schema.optional(Schema.String),
    loaDocumentId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedAt: Schema.optional(Schema.String),
    onDemandEnabled: Schema.optional(Schema.Boolean),
    onDemandLocked: Schema.optional(Schema.Boolean),
    ownershipValidationState: Schema.optional(Schema.String),
    ownershipValidationToken: Schema.optional(Schema.String),
    rpkiValidationState: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      accountId: "account_id",
      advertisedModifiedAt: "advertised_modified_at",
      createdAt: "created_at",
      delegateLoaCreation: "delegate_loa_creation",
      irrValidationState: "irr_validation_state",
      loaDocumentId: "loa_document_id",
      modifiedAt: "modified_at",
      onDemandEnabled: "on_demand_enabled",
      onDemandLocked: "on_demand_locked",
      ownershipValidationState: "ownership_validation_state",
      ownershipValidationToken: "ownership_validation_token",
      rpkiValidationState: "rpki_validation_state",
    }),
  ),
) as unknown as Schema.Schema<ListPrefixesResponse>;

export const listPrefixes: (
  input: ListPrefixesRequest,
) => Effect.Effect<
  ListPrefixesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPrefixesRequest,
  output: ListPrefixesResponse,
  errors: [],
}));

export interface CreatePrefixRequest {
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: Autonomous System Number (ASN) the prefix will be advertised under. */
  asn: number;
  /** Body param: IP Prefix in Classless Inter-Domain Routing format. */
  cidr: string;
  /** Body param: Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner. */
  delegateLoaCreation?: boolean;
  /** Body param: Description of the prefix. */
  description?: string;
  /** Body param: Identifier for the uploaded LOA document. */
  loaDocumentId?: string | null;
}

export const CreatePrefixRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  asn: Schema.Number,
  cidr: Schema.String,
  delegateLoaCreation: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  loaDocumentId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    delegateLoaCreation: "delegate_loa_creation",
    loaDocumentId: "loa_document_id",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/addressing/prefixes",
  }),
) as unknown as Schema.Schema<CreatePrefixRequest>;

export interface CreatePrefixResponse {
  /** Identifier of an IP Prefix. */
  id?: string;
  /** Identifier of a Cloudflare account. */
  accountId?: string;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  advertised?: boolean | null;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  advertisedModifiedAt?: string | null;
  /** Approval state of the prefix (P = pending, V = active). */
  approved?: string;
  /** Autonomous System Number (ASN) the prefix will be advertised under. */
  asn?: number;
  /** IP Prefix in Classless Inter-Domain Routing format. */
  cidr?: string;
  createdAt?: string;
  /** Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner. */
  delegateLoaCreation?: boolean;
  /** Description of the prefix. */
  description?: string;
  /** State of one kind of validation for an IP prefix. */
  irrValidationState?: string;
  /** Identifier for the uploaded LOA document. */
  loaDocumentId?: string | null;
  modifiedAt?: string;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  onDemandEnabled?: boolean;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  onDemandLocked?: boolean;
  /** State of one kind of validation for an IP prefix. */
  ownershipValidationState?: string;
  /** Token provided to demonstrate ownership of the prefix. */
  ownershipValidationToken?: string;
  /** State of one kind of validation for an IP prefix. */
  rpkiValidationState?: string;
}

export const CreatePrefixResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  advertised: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  advertisedModifiedAt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  approved: Schema.optional(Schema.String),
  asn: Schema.optional(Schema.Number),
  cidr: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  delegateLoaCreation: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  irrValidationState: Schema.optional(Schema.String),
  loaDocumentId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedAt: Schema.optional(Schema.String),
  onDemandEnabled: Schema.optional(Schema.Boolean),
  onDemandLocked: Schema.optional(Schema.Boolean),
  ownershipValidationState: Schema.optional(Schema.String),
  ownershipValidationToken: Schema.optional(Schema.String),
  rpkiValidationState: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    advertisedModifiedAt: "advertised_modified_at",
    createdAt: "created_at",
    delegateLoaCreation: "delegate_loa_creation",
    irrValidationState: "irr_validation_state",
    loaDocumentId: "loa_document_id",
    modifiedAt: "modified_at",
    onDemandEnabled: "on_demand_enabled",
    onDemandLocked: "on_demand_locked",
    ownershipValidationState: "ownership_validation_state",
    ownershipValidationToken: "ownership_validation_token",
    rpkiValidationState: "rpki_validation_state",
  }),
) as unknown as Schema.Schema<CreatePrefixResponse>;

export const createPrefix: (
  input: CreatePrefixRequest,
) => Effect.Effect<
  CreatePrefixResponse,
  CommonErrors | InvalidAccountId | InvalidNetworkCidr | IrrEntryNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePrefixRequest,
  output: CreatePrefixResponse,
  errors: [InvalidAccountId, InvalidNetworkCidr, IrrEntryNotFound],
}));

export interface PatchPrefixRequest {
  prefixId: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: Description of the prefix. */
  description: string;
}

export const PatchPrefixRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  description: Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}",
  }),
) as unknown as Schema.Schema<PatchPrefixRequest>;

export interface PatchPrefixResponse {
  /** Identifier of an IP Prefix. */
  id?: string;
  /** Identifier of a Cloudflare account. */
  accountId?: string;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  advertised?: boolean | null;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  advertisedModifiedAt?: string | null;
  /** Approval state of the prefix (P = pending, V = active). */
  approved?: string;
  /** Autonomous System Number (ASN) the prefix will be advertised under. */
  asn?: number;
  /** IP Prefix in Classless Inter-Domain Routing format. */
  cidr?: string;
  createdAt?: string;
  /** Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner. */
  delegateLoaCreation?: boolean;
  /** Description of the prefix. */
  description?: string;
  /** State of one kind of validation for an IP prefix. */
  irrValidationState?: string;
  /** Identifier for the uploaded LOA document. */
  loaDocumentId?: string | null;
  modifiedAt?: string;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  onDemandEnabled?: boolean;
  /** @deprecated Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BG */
  onDemandLocked?: boolean;
  /** State of one kind of validation for an IP prefix. */
  ownershipValidationState?: string;
  /** Token provided to demonstrate ownership of the prefix. */
  ownershipValidationToken?: string;
  /** State of one kind of validation for an IP prefix. */
  rpkiValidationState?: string;
}

export const PatchPrefixResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  advertised: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  advertisedModifiedAt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  approved: Schema.optional(Schema.String),
  asn: Schema.optional(Schema.Number),
  cidr: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  delegateLoaCreation: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  irrValidationState: Schema.optional(Schema.String),
  loaDocumentId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedAt: Schema.optional(Schema.String),
  onDemandEnabled: Schema.optional(Schema.Boolean),
  onDemandLocked: Schema.optional(Schema.Boolean),
  ownershipValidationState: Schema.optional(Schema.String),
  ownershipValidationToken: Schema.optional(Schema.String),
  rpkiValidationState: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    advertisedModifiedAt: "advertised_modified_at",
    createdAt: "created_at",
    delegateLoaCreation: "delegate_loa_creation",
    irrValidationState: "irr_validation_state",
    loaDocumentId: "loa_document_id",
    modifiedAt: "modified_at",
    onDemandEnabled: "on_demand_enabled",
    onDemandLocked: "on_demand_locked",
    ownershipValidationState: "ownership_validation_state",
    ownershipValidationToken: "ownership_validation_token",
    rpkiValidationState: "rpki_validation_state",
  }),
) as unknown as Schema.Schema<PatchPrefixResponse>;

export const patchPrefix: (
  input: PatchPrefixRequest,
) => Effect.Effect<
  PatchPrefixResponse,
  CommonErrors | MethodNotAllowed | PrefixNotFound | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPrefixRequest,
  output: PatchPrefixResponse,
  errors: [MethodNotAllowed, PrefixNotFound, InvalidAccountId],
}));

export interface DeletePrefixRequest {
  prefixId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const DeletePrefixRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}",
  }),
) as unknown as Schema.Schema<DeletePrefixRequest>;

export interface DeletePrefixResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeletePrefixResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeletePrefixResponse>;

export const deletePrefix: (
  input: DeletePrefixRequest,
) => Effect.Effect<
  DeletePrefixResponse,
  CommonErrors | MethodNotAllowed | PrefixNotFound | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePrefixRequest,
  output: DeletePrefixResponse,
  errors: [MethodNotAllowed, PrefixNotFound, InvalidAccountId],
}));

// =============================================================================
// PrefixAdvertisementStatus
// =============================================================================

export interface GetPrefixAdvertisementStatusRequest {
  prefixId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const GetPrefixAdvertisementStatusRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bgp/status",
  }),
) as unknown as Schema.Schema<GetPrefixAdvertisementStatusRequest>;

export interface GetPrefixAdvertisementStatusResponse {
  /** Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If `false`, the BGP route is withdrawn. */
  advertised?: boolean;
  /** Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled. */
  advertisedModifiedAt?: string | null;
}

export const GetPrefixAdvertisementStatusResponse = Schema.Struct({
  advertised: Schema.optional(Schema.Boolean),
  advertisedModifiedAt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
}).pipe(
  Schema.encodeKeys({ advertisedModifiedAt: "advertised_modified_at" }),
) as unknown as Schema.Schema<GetPrefixAdvertisementStatusResponse>;

export const getPrefixAdvertisementStatus: (
  input: GetPrefixAdvertisementStatusRequest,
) => Effect.Effect<
  GetPrefixAdvertisementStatusResponse,
  CommonErrors | PrefixNotFound | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPrefixAdvertisementStatusRequest,
  output: GetPrefixAdvertisementStatusResponse,
  errors: [PrefixNotFound, InvalidAccountId],
}));

export interface PatchPrefixAdvertisementStatusRequest {
  prefixId: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If `false`, the BGP route is withdrawn. */
  advertised: boolean;
}

export const PatchPrefixAdvertisementStatusRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  advertised: Schema.Boolean,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bgp/status",
  }),
) as unknown as Schema.Schema<PatchPrefixAdvertisementStatusRequest>;

export interface PatchPrefixAdvertisementStatusResponse {
  /** Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If `false`, the BGP route is withdrawn. */
  advertised?: boolean;
  /** Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled. */
  advertisedModifiedAt?: string | null;
}

export const PatchPrefixAdvertisementStatusResponse = Schema.Struct({
  advertised: Schema.optional(Schema.Boolean),
  advertisedModifiedAt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
}).pipe(
  Schema.encodeKeys({ advertisedModifiedAt: "advertised_modified_at" }),
) as unknown as Schema.Schema<PatchPrefixAdvertisementStatusResponse>;

export const patchPrefixAdvertisementStatus: (
  input: PatchPrefixAdvertisementStatusRequest,
) => Effect.Effect<
  PatchPrefixAdvertisementStatusResponse,
  CommonErrors | PrefixNotFound | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPrefixAdvertisementStatusRequest,
  output: PatchPrefixAdvertisementStatusResponse,
  errors: [PrefixNotFound, InvalidAccountId],
}));

// =============================================================================
// PrefixBgpPrefix
// =============================================================================

export interface GetPrefixBgpPrefixRequest {
  prefixId: string;
  bgpPrefixId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const GetPrefixBgpPrefixRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  bgpPrefixId: Schema.String.pipe(T.HttpPath("bgpPrefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bgp/prefixes/{bgpPrefixId}",
  }),
) as unknown as Schema.Schema<GetPrefixBgpPrefixRequest>;

export interface GetPrefixBgpPrefixResponse {
  /** Identifier of BGP Prefix. */
  id?: string;
  /** Autonomous System Number (ASN) the prefix will be advertised under. */
  asn?: number | null;
  /** Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute */
  asnPrependCount?: number;
  /** Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there */
  autoAdvertiseWithdraw?: boolean;
  bgpSignalOpts?: { enabled?: boolean; modifiedAt?: string | null };
  /** IP Prefix in Classless Inter-Domain Routing format. */
  cidr?: string;
  createdAt?: string;
  modifiedAt?: string;
  onDemand?: {
    advertised?: boolean | null;
    advertisedModifiedAt?: string | null;
    onDemandEnabled?: boolean;
    onDemandLocked?: boolean;
  };
}

export const GetPrefixBgpPrefixResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  asn: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  asnPrependCount: Schema.optional(Schema.Number),
  autoAdvertiseWithdraw: Schema.optional(Schema.Boolean),
  bgpSignalOpts: Schema.optional(
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      modifiedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(Schema.encodeKeys({ modifiedAt: "modified_at" })),
  ),
  cidr: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  modifiedAt: Schema.optional(Schema.String),
  onDemand: Schema.optional(
    Schema.Struct({
      advertised: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      advertisedModifiedAt: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      onDemandEnabled: Schema.optional(Schema.Boolean),
      onDemandLocked: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        advertisedModifiedAt: "advertised_modified_at",
        onDemandEnabled: "on_demand_enabled",
        onDemandLocked: "on_demand_locked",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    asnPrependCount: "asn_prepend_count",
    autoAdvertiseWithdraw: "auto_advertise_withdraw",
    bgpSignalOpts: "bgp_signal_opts",
    createdAt: "created_at",
    modifiedAt: "modified_at",
    onDemand: "on_demand",
  }),
) as unknown as Schema.Schema<GetPrefixBgpPrefixResponse>;

export const getPrefixBgpPrefix: (
  input: GetPrefixBgpPrefixRequest,
) => Effect.Effect<
  GetPrefixBgpPrefixResponse,
  CommonErrors | BgpPrefixNotFound | InvalidAccountId | PrefixNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPrefixBgpPrefixRequest,
  output: GetPrefixBgpPrefixResponse,
  errors: [BgpPrefixNotFound, InvalidAccountId, PrefixNotFound],
}));

export interface ListPrefixBgpPrefixesRequest {
  prefixId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const ListPrefixBgpPrefixesRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bgp/prefixes",
  }),
) as unknown as Schema.Schema<ListPrefixBgpPrefixesRequest>;

export type ListPrefixBgpPrefixesResponse = {
  id?: string;
  asn?: number | null;
  asnPrependCount?: number;
  autoAdvertiseWithdraw?: boolean;
  bgpSignalOpts?: { enabled?: boolean; modifiedAt?: string | null };
  cidr?: string;
  createdAt?: string;
  modifiedAt?: string;
  onDemand?: {
    advertised?: boolean | null;
    advertisedModifiedAt?: string | null;
    onDemandEnabled?: boolean;
    onDemandLocked?: boolean;
  };
}[];

export const ListPrefixBgpPrefixesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    asn: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    asnPrependCount: Schema.optional(Schema.Number),
    autoAdvertiseWithdraw: Schema.optional(Schema.Boolean),
    bgpSignalOpts: Schema.optional(
      Schema.Struct({
        enabled: Schema.optional(Schema.Boolean),
        modifiedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(Schema.encodeKeys({ modifiedAt: "modified_at" })),
    ),
    cidr: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    modifiedAt: Schema.optional(Schema.String),
    onDemand: Schema.optional(
      Schema.Struct({
        advertised: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        advertisedModifiedAt: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        onDemandEnabled: Schema.optional(Schema.Boolean),
        onDemandLocked: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          advertisedModifiedAt: "advertised_modified_at",
          onDemandEnabled: "on_demand_enabled",
          onDemandLocked: "on_demand_locked",
        }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      asnPrependCount: "asn_prepend_count",
      autoAdvertiseWithdraw: "auto_advertise_withdraw",
      bgpSignalOpts: "bgp_signal_opts",
      createdAt: "created_at",
      modifiedAt: "modified_at",
      onDemand: "on_demand",
    }),
  ),
) as unknown as Schema.Schema<ListPrefixBgpPrefixesResponse>;

export const listPrefixBgpPrefixes: (
  input: ListPrefixBgpPrefixesRequest,
) => Effect.Effect<
  ListPrefixBgpPrefixesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPrefixBgpPrefixesRequest,
  output: ListPrefixBgpPrefixesResponse,
  errors: [],
}));

export interface CreatePrefixBgpPrefixRequest {
  prefixId: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: IP Prefix in Classless Inter-Domain Routing format. */
  cidr: string;
}

export const CreatePrefixBgpPrefixRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  cidr: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bgp/prefixes",
  }),
) as unknown as Schema.Schema<CreatePrefixBgpPrefixRequest>;

export interface CreatePrefixBgpPrefixResponse {
  /** Identifier of BGP Prefix. */
  id?: string;
  /** Autonomous System Number (ASN) the prefix will be advertised under. */
  asn?: number | null;
  /** Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute */
  asnPrependCount?: number;
  /** Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there */
  autoAdvertiseWithdraw?: boolean;
  bgpSignalOpts?: { enabled?: boolean; modifiedAt?: string | null };
  /** IP Prefix in Classless Inter-Domain Routing format. */
  cidr?: string;
  createdAt?: string;
  modifiedAt?: string;
  onDemand?: {
    advertised?: boolean | null;
    advertisedModifiedAt?: string | null;
    onDemandEnabled?: boolean;
    onDemandLocked?: boolean;
  };
}

export const CreatePrefixBgpPrefixResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  asn: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  asnPrependCount: Schema.optional(Schema.Number),
  autoAdvertiseWithdraw: Schema.optional(Schema.Boolean),
  bgpSignalOpts: Schema.optional(
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      modifiedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(Schema.encodeKeys({ modifiedAt: "modified_at" })),
  ),
  cidr: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  modifiedAt: Schema.optional(Schema.String),
  onDemand: Schema.optional(
    Schema.Struct({
      advertised: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      advertisedModifiedAt: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      onDemandEnabled: Schema.optional(Schema.Boolean),
      onDemandLocked: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        advertisedModifiedAt: "advertised_modified_at",
        onDemandEnabled: "on_demand_enabled",
        onDemandLocked: "on_demand_locked",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    asnPrependCount: "asn_prepend_count",
    autoAdvertiseWithdraw: "auto_advertise_withdraw",
    bgpSignalOpts: "bgp_signal_opts",
    createdAt: "created_at",
    modifiedAt: "modified_at",
    onDemand: "on_demand",
  }),
) as unknown as Schema.Schema<CreatePrefixBgpPrefixResponse>;

export const createPrefixBgpPrefix: (
  input: CreatePrefixBgpPrefixRequest,
) => Effect.Effect<
  CreatePrefixBgpPrefixResponse,
  | CommonErrors
  | NonexistentAccountPrefix
  | InvalidAccountId
  | InvalidNetworkCidr,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePrefixBgpPrefixRequest,
  output: CreatePrefixBgpPrefixResponse,
  errors: [NonexistentAccountPrefix, InvalidAccountId, InvalidNetworkCidr],
}));

export interface PatchPrefixBgpPrefixRequest {
  prefixId: string;
  bgpPrefixId: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute */
  asnPrependCount?: number;
  /** Body param: Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefi */
  autoAdvertiseWithdraw?: boolean;
  /** Body param: */
  onDemand?: { advertised?: boolean };
}

export const PatchPrefixBgpPrefixRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  bgpPrefixId: Schema.String.pipe(T.HttpPath("bgpPrefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  asnPrependCount: Schema.optional(Schema.Number),
  autoAdvertiseWithdraw: Schema.optional(Schema.Boolean),
  onDemand: Schema.optional(
    Schema.Struct({
      advertised: Schema.optional(Schema.Boolean),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    asnPrependCount: "asn_prepend_count",
    autoAdvertiseWithdraw: "auto_advertise_withdraw",
    onDemand: "on_demand",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bgp/prefixes/{bgpPrefixId}",
  }),
) as unknown as Schema.Schema<PatchPrefixBgpPrefixRequest>;

export interface PatchPrefixBgpPrefixResponse {
  /** Identifier of BGP Prefix. */
  id?: string;
  /** Autonomous System Number (ASN) the prefix will be advertised under. */
  asn?: number | null;
  /** Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute */
  asnPrependCount?: number;
  /** Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there */
  autoAdvertiseWithdraw?: boolean;
  bgpSignalOpts?: { enabled?: boolean; modifiedAt?: string | null };
  /** IP Prefix in Classless Inter-Domain Routing format. */
  cidr?: string;
  createdAt?: string;
  modifiedAt?: string;
  onDemand?: {
    advertised?: boolean | null;
    advertisedModifiedAt?: string | null;
    onDemandEnabled?: boolean;
    onDemandLocked?: boolean;
  };
}

export const PatchPrefixBgpPrefixResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  asn: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  asnPrependCount: Schema.optional(Schema.Number),
  autoAdvertiseWithdraw: Schema.optional(Schema.Boolean),
  bgpSignalOpts: Schema.optional(
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      modifiedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(Schema.encodeKeys({ modifiedAt: "modified_at" })),
  ),
  cidr: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  modifiedAt: Schema.optional(Schema.String),
  onDemand: Schema.optional(
    Schema.Struct({
      advertised: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      advertisedModifiedAt: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      onDemandEnabled: Schema.optional(Schema.Boolean),
      onDemandLocked: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        advertisedModifiedAt: "advertised_modified_at",
        onDemandEnabled: "on_demand_enabled",
        onDemandLocked: "on_demand_locked",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    asnPrependCount: "asn_prepend_count",
    autoAdvertiseWithdraw: "auto_advertise_withdraw",
    bgpSignalOpts: "bgp_signal_opts",
    createdAt: "created_at",
    modifiedAt: "modified_at",
    onDemand: "on_demand",
  }),
) as unknown as Schema.Schema<PatchPrefixBgpPrefixResponse>;

export const patchPrefixBgpPrefix: (
  input: PatchPrefixBgpPrefixRequest,
) => Effect.Effect<
  PatchPrefixBgpPrefixResponse,
  CommonErrors | BgpPrefixNotFound | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPrefixBgpPrefixRequest,
  output: PatchPrefixBgpPrefixResponse,
  errors: [BgpPrefixNotFound, InvalidAccountId],
}));

// =============================================================================
// PrefixDelegation
// =============================================================================

export interface ListPrefixDelegationsRequest {
  prefixId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const ListPrefixDelegationsRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/delegations",
  }),
) as unknown as Schema.Schema<ListPrefixDelegationsRequest>;

export type ListPrefixDelegationsResponse = {
  id?: string;
  cidr?: string;
  createdAt?: string;
  delegatedAccountId?: string;
  modifiedAt?: string;
  parentPrefixId?: string;
}[];

export const ListPrefixDelegationsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    cidr: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    delegatedAccountId: Schema.optional(Schema.String),
    modifiedAt: Schema.optional(Schema.String),
    parentPrefixId: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      createdAt: "created_at",
      delegatedAccountId: "delegated_account_id",
      modifiedAt: "modified_at",
      parentPrefixId: "parent_prefix_id",
    }),
  ),
) as unknown as Schema.Schema<ListPrefixDelegationsResponse>;

export const listPrefixDelegations: (
  input: ListPrefixDelegationsRequest,
) => Effect.Effect<
  ListPrefixDelegationsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPrefixDelegationsRequest,
  output: ListPrefixDelegationsResponse,
  errors: [],
}));

export interface CreatePrefixDelegationRequest {
  prefixId: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: IP Prefix in Classless Inter-Domain Routing format. */
  cidr: string;
  /** Body param: Account identifier for the account to which prefix is being delegated. */
  delegatedAccountId: string;
}

export const CreatePrefixDelegationRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  cidr: Schema.String,
  delegatedAccountId: Schema.String,
}).pipe(
  Schema.encodeKeys({ delegatedAccountId: "delegated_account_id" }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/delegations",
  }),
) as unknown as Schema.Schema<CreatePrefixDelegationRequest>;

export interface CreatePrefixDelegationResponse {
  /** Identifier of a Delegation. */
  id?: string;
  /** IP Prefix in Classless Inter-Domain Routing format. */
  cidr?: string;
  createdAt?: string;
  /** Account identifier for the account to which prefix is being delegated. */
  delegatedAccountId?: string;
  modifiedAt?: string;
  /** Identifier of an IP Prefix. */
  parentPrefixId?: string;
}

export const CreatePrefixDelegationResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  cidr: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  delegatedAccountId: Schema.optional(Schema.String),
  modifiedAt: Schema.optional(Schema.String),
  parentPrefixId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    createdAt: "created_at",
    delegatedAccountId: "delegated_account_id",
    modifiedAt: "modified_at",
    parentPrefixId: "parent_prefix_id",
  }),
) as unknown as Schema.Schema<CreatePrefixDelegationResponse>;

export const createPrefixDelegation: (
  input: CreatePrefixDelegationRequest,
) => Effect.Effect<
  CreatePrefixDelegationResponse,
  CommonErrors | PrefixNotFound | MissingAccountId | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePrefixDelegationRequest,
  output: CreatePrefixDelegationResponse,
  errors: [PrefixNotFound, MissingAccountId, InvalidAccountId],
}));

export interface DeletePrefixDelegationRequest {
  prefixId: string;
  delegationId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const DeletePrefixDelegationRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  delegationId: Schema.String.pipe(T.HttpPath("delegationId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/delegations/{delegationId}",
  }),
) as unknown as Schema.Schema<DeletePrefixDelegationRequest>;

export interface DeletePrefixDelegationResponse {
  /** Identifier of a Delegation. */
  id?: string;
}

export const DeletePrefixDelegationResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeletePrefixDelegationResponse>;

export const deletePrefixDelegation: (
  input: DeletePrefixDelegationRequest,
) => Effect.Effect<
  DeletePrefixDelegationResponse,
  CommonErrors | DelegationNotFound | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePrefixDelegationRequest,
  output: DeletePrefixDelegationResponse,
  errors: [DelegationNotFound, InvalidAccountId],
}));

// =============================================================================
// PrefixServiceBinding
// =============================================================================

export interface GetPrefixServiceBindingRequest {
  prefixId: string;
  bindingId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const GetPrefixServiceBindingRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  bindingId: Schema.String.pipe(T.HttpPath("bindingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bindings/{bindingId}",
  }),
) as unknown as Schema.Schema<GetPrefixServiceBindingRequest>;

export interface GetPrefixServiceBindingResponse {
  /** Identifier of a Service Binding. */
  id?: string;
  /** IP Prefix in Classless Inter-Domain Routing format. */
  cidr?: string;
  /** Status of a Service Binding's deployment to the Cloudflare network */
  provisioning?: { state?: "provisioning" | "active" };
  /** Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the  List Services  endpoint. */
  serviceId?: string;
  /** Name of a service running on the Cloudflare network */
  serviceName?: string;
}

export const GetPrefixServiceBindingResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  cidr: Schema.optional(Schema.String),
  provisioning: Schema.optional(
    Schema.Struct({
      state: Schema.optional(Schema.Literals(["provisioning", "active"])),
    }),
  ),
  serviceId: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ serviceId: "service_id", serviceName: "service_name" }),
) as unknown as Schema.Schema<GetPrefixServiceBindingResponse>;

export const getPrefixServiceBinding: (
  input: GetPrefixServiceBindingRequest,
) => Effect.Effect<
  GetPrefixServiceBindingResponse,
  CommonErrors | BindingNotFound | InvalidAccountId | PrefixNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPrefixServiceBindingRequest,
  output: GetPrefixServiceBindingResponse,
  errors: [BindingNotFound, InvalidAccountId, PrefixNotFound],
}));

export interface ListPrefixServiceBindingsRequest {
  prefixId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const ListPrefixServiceBindingsRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bindings",
  }),
) as unknown as Schema.Schema<ListPrefixServiceBindingsRequest>;

export type ListPrefixServiceBindingsResponse = {
  id?: string;
  cidr?: string;
  provisioning?: { state?: "provisioning" | "active" };
  serviceId?: string;
  serviceName?: string;
}[];

export const ListPrefixServiceBindingsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    cidr: Schema.optional(Schema.String),
    provisioning: Schema.optional(
      Schema.Struct({
        state: Schema.optional(Schema.Literals(["provisioning", "active"])),
      }),
    ),
    serviceId: Schema.optional(Schema.String),
    serviceName: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({ serviceId: "service_id", serviceName: "service_name" }),
  ),
) as unknown as Schema.Schema<ListPrefixServiceBindingsResponse>;

export const listPrefixServiceBindings: (
  input: ListPrefixServiceBindingsRequest,
) => Effect.Effect<
  ListPrefixServiceBindingsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPrefixServiceBindingsRequest,
  output: ListPrefixServiceBindingsResponse,
  errors: [],
}));

export interface CreatePrefixServiceBindingRequest {
  prefixId: string;
  /** Path param: Identifier of a Cloudflare account. */
  accountId: string;
  /** Body param: IP Prefix in Classless Inter-Domain Routing format. */
  cidr: string;
  /** Body param: Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the  List Services  endpoint. */
  serviceId: string;
}

export const CreatePrefixServiceBindingRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  cidr: Schema.String,
  serviceId: Schema.String,
}).pipe(
  Schema.encodeKeys({ serviceId: "service_id" }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bindings",
  }),
) as unknown as Schema.Schema<CreatePrefixServiceBindingRequest>;

export interface CreatePrefixServiceBindingResponse {
  /** Identifier of a Service Binding. */
  id?: string;
  /** IP Prefix in Classless Inter-Domain Routing format. */
  cidr?: string;
  /** Status of a Service Binding's deployment to the Cloudflare network */
  provisioning?: { state?: "provisioning" | "active" };
  /** Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the  List Services  endpoint. */
  serviceId?: string;
  /** Name of a service running on the Cloudflare network */
  serviceName?: string;
}

export const CreatePrefixServiceBindingResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  cidr: Schema.optional(Schema.String),
  provisioning: Schema.optional(
    Schema.Struct({
      state: Schema.optional(Schema.Literals(["provisioning", "active"])),
    }),
  ),
  serviceId: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ serviceId: "service_id", serviceName: "service_name" }),
) as unknown as Schema.Schema<CreatePrefixServiceBindingResponse>;

export const createPrefixServiceBinding: (
  input: CreatePrefixServiceBindingRequest,
) => Effect.Effect<
  CreatePrefixServiceBindingResponse,
  CommonErrors | UnsupportedBindingConfiguration | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePrefixServiceBindingRequest,
  output: CreatePrefixServiceBindingResponse,
  errors: [UnsupportedBindingConfiguration, InvalidAccountId],
}));

export interface DeletePrefixServiceBindingRequest {
  prefixId: string;
  bindingId: string;
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const DeletePrefixServiceBindingRequest = Schema.Struct({
  prefixId: Schema.String.pipe(T.HttpPath("prefixId")),
  bindingId: Schema.String.pipe(T.HttpPath("bindingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/addressing/prefixes/{prefixId}/bindings/{bindingId}",
  }),
) as unknown as Schema.Schema<DeletePrefixServiceBindingRequest>;

export interface DeletePrefixServiceBindingResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeletePrefixServiceBindingResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeletePrefixServiceBindingResponse>;

export const deletePrefixServiceBinding: (
  input: DeletePrefixServiceBindingRequest,
) => Effect.Effect<
  DeletePrefixServiceBindingResponse,
  CommonErrors | BindingNotFound | InvalidAccountId | PrefixNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePrefixServiceBindingRequest,
  output: DeletePrefixServiceBindingResponse,
  errors: [BindingNotFound, InvalidAccountId, PrefixNotFound],
}));

// =============================================================================
// RegionalHostname
// =============================================================================

export interface GetRegionalHostnameRequest {
  hostname: string;
  /** Identifier. */
  zoneId: string;
}

export const GetRegionalHostnameRequest = Schema.Struct({
  hostname: Schema.String.pipe(T.HttpPath("hostname")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/addressing/regional_hostnames/{hostname}",
  }),
) as unknown as Schema.Schema<GetRegionalHostnameRequest>;

export interface GetRegionalHostnameResponse {
  /** When the regional hostname was created */
  createdOn: string;
  /** DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g ` .example.com` */
  hostname: string;
  /** Identifying key for the region */
  regionKey: string;
  /** Configure which routing method to use for the regional hostname */
  routing?: string;
}

export const GetRegionalHostnameResponse = Schema.Struct({
  createdOn: Schema.String,
  hostname: Schema.String,
  regionKey: Schema.String,
  routing: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ createdOn: "created_on", regionKey: "region_key" }),
) as unknown as Schema.Schema<GetRegionalHostnameResponse>;

export const getRegionalHostname: (
  input: GetRegionalHostnameRequest,
) => Effect.Effect<
  GetRegionalHostnameResponse,
  | CommonErrors
  | InvalidZoneId
  | RegionalHostnameNotFound
  | RegionalHostnameEmpty,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRegionalHostnameRequest,
  output: GetRegionalHostnameResponse,
  errors: [InvalidZoneId, RegionalHostnameNotFound, RegionalHostnameEmpty],
}));

export interface ListRegionalHostnamesRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListRegionalHostnamesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/addressing/regional_hostnames",
  }),
) as unknown as Schema.Schema<ListRegionalHostnamesRequest>;

export type ListRegionalHostnamesResponse = {
  createdOn: string;
  hostname: string;
  regionKey: string;
  routing?: string;
}[];

export const ListRegionalHostnamesResponse = Schema.Array(
  Schema.Struct({
    createdOn: Schema.String,
    hostname: Schema.String,
    regionKey: Schema.String,
    routing: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({ createdOn: "created_on", regionKey: "region_key" }),
  ),
) as unknown as Schema.Schema<ListRegionalHostnamesResponse>;

export const listRegionalHostnames: (
  input: ListRegionalHostnamesRequest,
) => Effect.Effect<
  ListRegionalHostnamesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRegionalHostnamesRequest,
  output: ListRegionalHostnamesResponse,
  errors: [],
}));

export interface CreateRegionalHostnameRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g ` .example.com` */
  hostname: string;
  /** Body param: Identifying key for the region */
  regionKey: string;
  /** Body param: Configure which routing method to use for the regional hostname */
  routing?: string;
}

export const CreateRegionalHostnameRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  hostname: Schema.String,
  regionKey: Schema.String,
  routing: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ regionKey: "region_key" }),
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/addressing/regional_hostnames",
  }),
) as unknown as Schema.Schema<CreateRegionalHostnameRequest>;

export interface CreateRegionalHostnameResponse {
  /** When the regional hostname was created */
  createdOn: string;
  /** DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g ` .example.com` */
  hostname: string;
  /** Identifying key for the region */
  regionKey: string;
  /** Configure which routing method to use for the regional hostname */
  routing?: string;
}

export const CreateRegionalHostnameResponse = Schema.Struct({
  createdOn: Schema.String,
  hostname: Schema.String,
  regionKey: Schema.String,
  routing: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ createdOn: "created_on", regionKey: "region_key" }),
) as unknown as Schema.Schema<CreateRegionalHostnameResponse>;

export const createRegionalHostname: (
  input: CreateRegionalHostnameRequest,
) => Effect.Effect<
  CreateRegionalHostnameResponse,
  CommonErrors | InvalidZoneId | InvalidHostname | RegionalHostnameEmpty,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateRegionalHostnameRequest,
  output: CreateRegionalHostnameResponse,
  errors: [InvalidZoneId, InvalidHostname, RegionalHostnameEmpty],
}));

export interface PatchRegionalHostnameRequest {
  hostname: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Identifying key for the region */
  regionKey: string;
}

export const PatchRegionalHostnameRequest = Schema.Struct({
  hostname: Schema.String.pipe(T.HttpPath("hostname")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  regionKey: Schema.String,
}).pipe(
  Schema.encodeKeys({ regionKey: "region_key" }),
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/addressing/regional_hostnames/{hostname}",
  }),
) as unknown as Schema.Schema<PatchRegionalHostnameRequest>;

export interface PatchRegionalHostnameResponse {
  /** When the regional hostname was created */
  createdOn: string;
  /** DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g ` .example.com` */
  hostname: string;
  /** Identifying key for the region */
  regionKey: string;
  /** Configure which routing method to use for the regional hostname */
  routing?: string;
}

export const PatchRegionalHostnameResponse = Schema.Struct({
  createdOn: Schema.String,
  hostname: Schema.String,
  regionKey: Schema.String,
  routing: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ createdOn: "created_on", regionKey: "region_key" }),
) as unknown as Schema.Schema<PatchRegionalHostnameResponse>;

export const patchRegionalHostname: (
  input: PatchRegionalHostnameRequest,
) => Effect.Effect<
  PatchRegionalHostnameResponse,
  | CommonErrors
  | InvalidZoneId
  | RegionalHostnameNotFound
  | RegionalHostnameEmpty,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchRegionalHostnameRequest,
  output: PatchRegionalHostnameResponse,
  errors: [InvalidZoneId, RegionalHostnameNotFound, RegionalHostnameEmpty],
}));

export interface DeleteRegionalHostnameRequest {
  hostname: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteRegionalHostnameRequest = Schema.Struct({
  hostname: Schema.String.pipe(T.HttpPath("hostname")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/addressing/regional_hostnames/{hostname}",
  }),
) as unknown as Schema.Schema<DeleteRegionalHostnameRequest>;

export interface DeleteRegionalHostnameResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteRegionalHostnameResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeleteRegionalHostnameResponse>;

export const deleteRegionalHostname: (
  input: DeleteRegionalHostnameRequest,
) => Effect.Effect<
  DeleteRegionalHostnameResponse,
  | CommonErrors
  | MethodNotAllowed
  | InvalidZoneId
  | RegionalHostnameNotFound
  | RegionalHostnameEmpty,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteRegionalHostnameRequest,
  output: DeleteRegionalHostnameResponse,
  errors: [
    MethodNotAllowed,
    InvalidZoneId,
    RegionalHostnameNotFound,
    RegionalHostnameEmpty,
  ],
}));

// =============================================================================
// RegionalHostnameRegion
// =============================================================================

export interface ListRegionalHostnameRegionsRequest {
  /** Identifier. */
  accountId: string;
}

export const ListRegionalHostnameRegionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/addressing/regional_hostnames/regions",
  }),
) as unknown as Schema.Schema<ListRegionalHostnameRegionsRequest>;

export type ListRegionalHostnameRegionsResponse = {
  key?: string;
  label?: string;
}[];

export const ListRegionalHostnameRegionsResponse = Schema.Array(
  Schema.Struct({
    key: Schema.optional(Schema.String),
    label: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<ListRegionalHostnameRegionsResponse>;

export const listRegionalHostnameRegions: (
  input: ListRegionalHostnameRegionsRequest,
) => Effect.Effect<
  ListRegionalHostnameRegionsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRegionalHostnameRegionsRequest,
  output: ListRegionalHostnameRegionsResponse,
  errors: [],
}));

// =============================================================================
// Service
// =============================================================================

export interface ListServicesRequest {
  /** Identifier of a Cloudflare account. */
  accountId: string;
}

export const ListServicesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/addressing/services" }),
) as unknown as Schema.Schema<ListServicesRequest>;

export type ListServicesResponse = { id?: string; name?: string }[];

export const ListServicesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<ListServicesResponse>;

export const listServices: (
  input: ListServicesRequest,
) => Effect.Effect<
  ListServicesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse,
  errors: [],
}));
