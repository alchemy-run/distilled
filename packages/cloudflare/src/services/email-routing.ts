/**
 * Cloudflare EMAIL-ROUTING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service email-routing
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Address
// =============================================================================

export interface GetAddressRequest {
  destinationAddressIdentifier: string;
  /** Identifier. */
  accountId: string;
}

export const GetAddressRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  destinationAddressIdentifier: Schema.String.pipe(
    T.HttpPath("destinationAddressIdentifier"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/email/routing/addresses/{destinationAddressIdentifier}",
  }),
) as unknown as Schema.Schema<GetAddressRequest>;

export interface GetAddressResponse {
  /** Destination address identifier. */
  id?: string | null;
  /** The date and time the destination address has been created. */
  created?: string | null;
  /** The contact email address of the user. */
  email?: string | null;
  /** The date and time the destination address was last modified. */
  modified?: string | null;
  /** @deprecated Destination address tag. (Deprecated, replaced by destination address identifier) */
  tag?: string | null;
  /** The date and time the destination address has been verified. Null means not verified yet. */
  verified?: string | null;
}

export const GetAddressResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  verified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetAddressResponse>;

export type GetAddressError = DefaultErrors;

export const getAddress: API.OperationMethod<
  GetAddressRequest,
  GetAddressResponse,
  GetAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAddressRequest,
  output: GetAddressResponse,
  errors: [],
}));

export interface ListAddressesRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Sorts results in an ascending or descending order. */
  direction?: "asc" | "desc";
  /** Query param: Filter by verified destination addresses. */
  verified?: true | false;
}

export const ListAddressesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  verified: Schema.optional(Schema.Literals([true, false])).pipe(
    T.HttpQuery("verified"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/email/routing/addresses",
  }),
) as unknown as Schema.Schema<ListAddressesRequest>;

export interface ListAddressesResponse {
  result: {
    id?: string | null;
    created?: string | null;
    email?: string | null;
    modified?: string | null;
    tag?: string | null;
    verified?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListAddressesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      verified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
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
) as unknown as Schema.Schema<ListAddressesResponse>;

export type ListAddressesError = DefaultErrors;

export const listAddresses: API.PaginatedOperationMethod<
  ListAddressesRequest,
  ListAddressesResponse,
  ListAddressesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListAddressesRequest,
  ) => stream.Stream<
    ListAddressesResponse,
    ListAddressesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListAddressesRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      created?: string | null;
      email?: string | null;
      modified?: string | null;
      tag?: string | null;
      verified?: string | null;
    },
    ListAddressesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAddressesRequest,
  output: ListAddressesResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateAddressRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The contact email address of the user. */
  email: string;
}

export const CreateAddressRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  email: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/email/routing/addresses",
  }),
) as unknown as Schema.Schema<CreateAddressRequest>;

export interface CreateAddressResponse {
  /** Destination address identifier. */
  id?: string | null;
  /** The date and time the destination address has been created. */
  created?: string | null;
  /** The contact email address of the user. */
  email?: string | null;
  /** The date and time the destination address was last modified. */
  modified?: string | null;
  /** @deprecated Destination address tag. (Deprecated, replaced by destination address identifier) */
  tag?: string | null;
  /** The date and time the destination address has been verified. Null means not verified yet. */
  verified?: string | null;
}

export const CreateAddressResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  verified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<CreateAddressResponse>;

export type CreateAddressError = DefaultErrors;

export const createAddress: API.OperationMethod<
  CreateAddressRequest,
  CreateAddressResponse,
  CreateAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAddressRequest,
  output: CreateAddressResponse,
  errors: [],
}));

export interface DeleteAddressRequest {
  destinationAddressIdentifier: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteAddressRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  destinationAddressIdentifier: Schema.String.pipe(
    T.HttpPath("destinationAddressIdentifier"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/email/routing/addresses/{destinationAddressIdentifier}",
  }),
) as unknown as Schema.Schema<DeleteAddressRequest>;

export interface DeleteAddressResponse {
  /** Destination address identifier. */
  id?: string | null;
  /** The date and time the destination address has been created. */
  created?: string | null;
  /** The contact email address of the user. */
  email?: string | null;
  /** The date and time the destination address was last modified. */
  modified?: string | null;
  /** @deprecated Destination address tag. (Deprecated, replaced by destination address identifier) */
  tag?: string | null;
  /** The date and time the destination address has been verified. Null means not verified yet. */
  verified?: string | null;
}

export const DeleteAddressResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  verified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<DeleteAddressResponse>;

export type DeleteAddressError = DefaultErrors;

export const deleteAddress: API.OperationMethod<
  DeleteAddressRequest,
  DeleteAddressResponse,
  DeleteAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAddressRequest,
  output: DeleteAddressResponse,
  errors: [],
}));

// =============================================================================
// Dns
// =============================================================================

export interface GetDnsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Domain of your zone. */
  subdomain?: string;
}

export const GetDnsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  subdomain: Schema.optional(Schema.String).pipe(T.HttpQuery("subdomain")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/email/routing/dns" }),
) as unknown as Schema.Schema<GetDnsRequest>;

export type GetDnsResponse =
  | {
      errors: {
        code: number;
        message: string;
        documentationUrl?: string | null;
        source?: { pointer?: string | null } | null;
      }[];
      messages: {
        code: number;
        message: string;
        documentationUrl?: string | null;
        source?: { pointer?: string | null } | null;
      }[];
      success: true;
      result?: {
        errors?: { code?: string | null; missing?: unknown | null }[] | null;
        record?: unknown[] | null;
      } | null;
      resultInfo?: {
        count?: number | null;
        page?: number | null;
        perPage?: number | null;
        totalCount?: number | null;
      } | null;
    }
  | {
      errors: {
        code: number;
        message: string;
        documentationUrl?: string | null;
        source?: { pointer?: string | null } | null;
      }[];
      messages: {
        code: number;
        message: string;
        documentationUrl?: string | null;
        source?: { pointer?: string | null } | null;
      }[];
      success: true;
      result?: unknown[] | null;
      resultInfo?: {
        count?: number | null;
        page?: number | null;
        perPage?: number | null;
        totalCount?: number | null;
      } | null;
    };

export const GetDnsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
    result: Schema.optional(
      Schema.Union([
        Schema.Struct({
          errors: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  code: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  missing: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
          record: Schema.optional(
            Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    resultInfo: Schema.optional(
      Schema.Union([
        Schema.Struct({
          count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          totalCount: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            count: "count",
            page: "page",
            perPage: "per_page",
            totalCount: "total_count",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      errors: "errors",
      messages: "messages",
      success: "success",
      result: "result",
      resultInfo: "result_info",
    }),
  ),
  Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
    result: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    resultInfo: Schema.optional(
      Schema.Union([
        Schema.Struct({
          count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          totalCount: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            count: "count",
            page: "page",
            perPage: "per_page",
            totalCount: "total_count",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      errors: "errors",
      messages: "messages",
      success: "success",
      result: "result",
      resultInfo: "result_info",
    }),
  ),
]) as unknown as Schema.Schema<GetDnsResponse>;

export type GetDnsError = DefaultErrors;

export const getDns: API.OperationMethod<
  GetDnsRequest,
  GetDnsResponse,
  GetDnsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDnsRequest,
  output: GetDnsResponse,
  errors: [],
}));

export interface CreateDnsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Domain of your zone. */
  name?: string;
}

export const CreateDnsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  name: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/email/routing/dns" }),
) as unknown as Schema.Schema<CreateDnsRequest>;

export type CreateDnsResponse = unknown;

export const CreateDnsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<CreateDnsResponse>;

export type CreateDnsError = DefaultErrors;

export const createDns: API.OperationMethod<
  CreateDnsRequest,
  CreateDnsResponse,
  CreateDnsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDnsRequest,
  output: CreateDnsResponse,
  errors: [],
}));

export interface PatchDnsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Domain of your zone. */
  name?: string;
}

export const PatchDnsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  name: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/email/routing/dns" }),
) as unknown as Schema.Schema<PatchDnsRequest>;

export type PatchDnsResponse = unknown;

export const PatchDnsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<PatchDnsResponse>;

export type PatchDnsError = DefaultErrors;

export const patchDns: API.OperationMethod<
  PatchDnsRequest,
  PatchDnsResponse,
  PatchDnsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchDnsRequest,
  output: PatchDnsResponse,
  errors: [],
}));

export interface DeleteDnsRequest {
  /** Identifier. */
  zoneId: string;
}

export const DeleteDnsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/email/routing/dns" }),
) as unknown as Schema.Schema<DeleteDnsRequest>;

export interface DeleteDnsResponse {
  result: {
    content?: string | null;
    name?: string | null;
    priority?: number | null;
    ttl?: number | "1" | null;
    type?:
      | "A"
      | "AAAA"
      | "CNAME"
      | "HTTPS"
      | "TXT"
      | "SRV"
      | "LOC"
      | "MX"
      | "NS"
      | "CERT"
      | "DNSKEY"
      | "DS"
      | "NAPTR"
      | "SMIMEA"
      | "SSHFP"
      | "SVCB"
      | "TLSA"
      | "URI"
      | null;
  }[];
}

export const DeleteDnsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      content: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      ttl: Schema.optional(
        Schema.Union([
          Schema.Union([Schema.Number, Schema.Literal("1")]),
          Schema.Null,
        ]),
      ),
      type: Schema.optional(
        Schema.Union([
          Schema.Literals([
            "A",
            "AAAA",
            "CNAME",
            "HTTPS",
            "TXT",
            "SRV",
            "LOC",
            "MX",
            "NS",
            "CERT",
            "DNSKEY",
            "DS",
            "NAPTR",
            "SMIMEA",
            "SSHFP",
            "SVCB",
            "TLSA",
            "URI",
          ]),
          Schema.Null,
        ]),
      ),
    }),
  ),
}) as unknown as Schema.Schema<DeleteDnsResponse>;

export type DeleteDnsError = DefaultErrors;

export const deleteDns: API.PaginatedOperationMethod<
  DeleteDnsRequest,
  DeleteDnsResponse,
  DeleteDnsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: DeleteDnsRequest,
  ) => stream.Stream<
    DeleteDnsResponse,
    DeleteDnsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: DeleteDnsRequest,
  ) => stream.Stream<
    {
      content?: string | null;
      name?: string | null;
      priority?: number | null;
      ttl?: number | "1" | null;
      type?:
        | "A"
        | "AAAA"
        | "CNAME"
        | "HTTPS"
        | "TXT"
        | "SRV"
        | "LOC"
        | "MX"
        | "NS"
        | "CERT"
        | "DNSKEY"
        | "DS"
        | "NAPTR"
        | "SMIMEA"
        | "SSHFP"
        | "SVCB"
        | "TLSA"
        | "URI"
        | null;
    },
    DeleteDnsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DeleteDnsRequest,
  output: DeleteDnsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// EmailRouting
// =============================================================================

export interface GetEmailRoutingRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetEmailRoutingRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  },
).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/email/routing" }),
) as unknown as Schema.Schema<GetEmailRoutingRequest>;

export interface GetEmailRoutingResponse {
  /** Email Routing settings identifier. */
  id: string;
  /** State of the zone settings for Email Routing. */
  enabled: true | false;
  /** Domain of your zone. */
  name: string;
  /** The date and time the settings have been created. */
  created?: string | null;
  /** The date and time the settings have been modified. */
  modified?: string | null;
  /** Flag to check if the user skipped the configuration wizard. */
  skipWizard?: true | false | null;
  /** Show the state of your account, and the type or configuration error. */
  status?:
    | "ready"
    | "unconfigured"
    | "misconfigured"
    | "misconfigured/locked"
    | "unlocked"
    | null;
  /** @deprecated Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier) */
  tag?: string | null;
}

export const GetEmailRoutingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    enabled: Schema.Literals([true, false]),
    name: Schema.String,
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    skipWizard: Schema.optional(
      Schema.Union([Schema.Literals([true, false]), Schema.Null]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "ready",
          "unconfigured",
          "misconfigured",
          "misconfigured/locked",
          "unlocked",
        ]),
        Schema.Null,
      ]),
    ),
    tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        enabled: "enabled",
        name: "name",
        created: "created",
        modified: "modified",
        skipWizard: "skip_wizard",
        status: "status",
        tag: "tag",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetEmailRoutingResponse>;

export type GetEmailRoutingError = DefaultErrors;

export const getEmailRouting: API.OperationMethod<
  GetEmailRoutingRequest,
  GetEmailRoutingResponse,
  GetEmailRoutingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEmailRoutingRequest,
  output: GetEmailRoutingResponse,
  errors: [],
}));

export interface EnableEmailRoutingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  body: unknown;
}

export const EnableEmailRoutingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    body: Schema.Unknown.pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "/zones/{zone_id}/email/routing/enable" }),
  ) as unknown as Schema.Schema<EnableEmailRoutingRequest>;

export interface EnableEmailRoutingResponse {
  /** Email Routing settings identifier. */
  id: string;
  /** State of the zone settings for Email Routing. */
  enabled: true | false;
  /** Domain of your zone. */
  name: string;
  /** The date and time the settings have been created. */
  created?: string | null;
  /** The date and time the settings have been modified. */
  modified?: string | null;
  /** Flag to check if the user skipped the configuration wizard. */
  skipWizard?: true | false | null;
  /** Show the state of your account, and the type or configuration error. */
  status?:
    | "ready"
    | "unconfigured"
    | "misconfigured"
    | "misconfigured/locked"
    | "unlocked"
    | null;
  /** @deprecated Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier) */
  tag?: string | null;
}

export const EnableEmailRoutingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    enabled: Schema.Literals([true, false]),
    name: Schema.String,
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    skipWizard: Schema.optional(
      Schema.Union([Schema.Literals([true, false]), Schema.Null]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "ready",
          "unconfigured",
          "misconfigured",
          "misconfigured/locked",
          "unlocked",
        ]),
        Schema.Null,
      ]),
    ),
    tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        enabled: "enabled",
        name: "name",
        created: "created",
        modified: "modified",
        skipWizard: "skip_wizard",
        status: "status",
        tag: "tag",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<EnableEmailRoutingResponse>;

export type EnableEmailRoutingError = DefaultErrors;

export const enableEmailRouting: API.OperationMethod<
  EnableEmailRoutingRequest,
  EnableEmailRoutingResponse,
  EnableEmailRoutingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableEmailRoutingRequest,
  output: EnableEmailRoutingResponse,
  errors: [],
}));

export interface DisableEmailRoutingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  body: unknown;
}

export const DisableEmailRoutingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    body: Schema.Unknown.pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "/zones/{zone_id}/email/routing/disable" }),
  ) as unknown as Schema.Schema<DisableEmailRoutingRequest>;

export interface DisableEmailRoutingResponse {
  /** Email Routing settings identifier. */
  id: string;
  /** State of the zone settings for Email Routing. */
  enabled: true | false;
  /** Domain of your zone. */
  name: string;
  /** The date and time the settings have been created. */
  created?: string | null;
  /** The date and time the settings have been modified. */
  modified?: string | null;
  /** Flag to check if the user skipped the configuration wizard. */
  skipWizard?: true | false | null;
  /** Show the state of your account, and the type or configuration error. */
  status?:
    | "ready"
    | "unconfigured"
    | "misconfigured"
    | "misconfigured/locked"
    | "unlocked"
    | null;
  /** @deprecated Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier) */
  tag?: string | null;
}

export const DisableEmailRoutingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    enabled: Schema.Literals([true, false]),
    name: Schema.String,
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    skipWizard: Schema.optional(
      Schema.Union([Schema.Literals([true, false]), Schema.Null]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "ready",
          "unconfigured",
          "misconfigured",
          "misconfigured/locked",
          "unlocked",
        ]),
        Schema.Null,
      ]),
    ),
    tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        enabled: "enabled",
        name: "name",
        created: "created",
        modified: "modified",
        skipWizard: "skip_wizard",
        status: "status",
        tag: "tag",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DisableEmailRoutingResponse>;

export type DisableEmailRoutingError = DefaultErrors;

export const disableEmailRouting: API.OperationMethod<
  DisableEmailRoutingRequest,
  DisableEmailRoutingResponse,
  DisableEmailRoutingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableEmailRoutingRequest,
  output: DisableEmailRoutingResponse,
  errors: [],
}));

// =============================================================================
// Rule
// =============================================================================

export interface GetRuleRequest {
  ruleIdentifier: string;
  /** Identifier. */
  zoneId: string;
}

export const GetRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ruleIdentifier: Schema.String.pipe(T.HttpPath("ruleIdentifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/email/routing/rules/{ruleIdentifier}",
  }),
) as unknown as Schema.Schema<GetRuleRequest>;

export interface GetRuleResponse {
  /** Routing rule identifier. */
  id?: string | null;
  /** List actions patterns. */
  actions?:
    | { type: "drop" | "forward" | "worker"; value?: string[] | null }[]
    | null;
  /** Routing rule status. */
  enabled?: true | false | null;
  /** Matching patterns to forward to your actions. */
  matchers?:
    | { type: "all" | "literal"; field?: "to" | null; value?: string | null }[]
    | null;
  /** Routing rule name. */
  name?: string | null;
  /** Priority of the routing rule. */
  priority?: number | null;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string | null;
}

export const GetRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  actions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["drop", "forward", "worker"]),
          value: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
        }),
      ),
      Schema.Null,
    ]),
  ),
  enabled: Schema.optional(
    Schema.Union([Schema.Literals([true, false]), Schema.Null]),
  ),
  matchers: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["all", "literal"]),
          field: Schema.optional(
            Schema.Union([Schema.Literal("to"), Schema.Null]),
          ),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetRuleResponse>;

export type GetRuleError = DefaultErrors;

export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRuleRequest,
  output: GetRuleResponse,
  errors: [],
}));

export interface ListRulesRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Filter by enabled routing rules. */
  enabled?: true | false;
}

export const ListRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.optional(Schema.Literals([true, false])).pipe(
    T.HttpQuery("enabled"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/email/routing/rules" }),
) as unknown as Schema.Schema<ListRulesRequest>;

export interface ListRulesResponse {
  result: {
    id?: string | null;
    actions?:
      | { type: "drop" | "forward" | "worker"; value?: string[] | null }[]
      | null;
    enabled?: true | false | null;
    matchers?:
      | {
          type: "all" | "literal";
          field?: "to" | null;
          value?: string | null;
        }[]
      | null;
    name?: string | null;
    priority?: number | null;
    tag?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      actions: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              type: Schema.Literals(["drop", "forward", "worker"]),
              value: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }),
          ),
          Schema.Null,
        ]),
      ),
      enabled: Schema.optional(
        Schema.Union([Schema.Literals([true, false]), Schema.Null]),
      ),
      matchers: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              type: Schema.Literals(["all", "literal"]),
              field: Schema.optional(
                Schema.Union([Schema.Literal("to"), Schema.Null]),
              ),
              value: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
          ),
          Schema.Null,
        ]),
      ),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
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
) as unknown as Schema.Schema<ListRulesResponse>;

export type ListRulesError = DefaultErrors;

export const listRules: API.PaginatedOperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListRulesRequest,
  ) => stream.Stream<
    ListRulesResponse,
    ListRulesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListRulesRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      actions?:
        | { type: "drop" | "forward" | "worker"; value?: string[] | null }[]
        | null;
      enabled?: true | false | null;
      matchers?:
        | {
            type: "all" | "literal";
            field?: "to" | null;
            value?: string | null;
          }[]
        | null;
      name?: string | null;
      priority?: number | null;
      tag?: string | null;
    },
    ListRulesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateRuleRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: List actions patterns. */
  actions: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Body param: Matching patterns to forward to your actions. */
  matchers: { type: "all" | "literal"; field?: "to"; value?: string }[];
  /** Body param: Routing rule status. */
  enabled?: true | false;
  /** Body param: Routing rule name. */
  name?: string;
  /** Body param: Priority of the routing rule. */
  priority?: number;
}

export const CreateRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  actions: Schema.Array(
    Schema.Struct({
      type: Schema.Literals(["drop", "forward", "worker"]),
      value: Schema.optional(Schema.Array(Schema.String)),
    }),
  ),
  matchers: Schema.Array(
    Schema.Struct({
      type: Schema.Literals(["all", "literal"]),
      field: Schema.optional(Schema.Literal("to")),
      value: Schema.optional(Schema.String),
    }),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/email/routing/rules" }),
) as unknown as Schema.Schema<CreateRuleRequest>;

export interface CreateRuleResponse {
  /** Routing rule identifier. */
  id?: string | null;
  /** List actions patterns. */
  actions?:
    | { type: "drop" | "forward" | "worker"; value?: string[] | null }[]
    | null;
  /** Routing rule status. */
  enabled?: true | false | null;
  /** Matching patterns to forward to your actions. */
  matchers?:
    | { type: "all" | "literal"; field?: "to" | null; value?: string | null }[]
    | null;
  /** Routing rule name. */
  name?: string | null;
  /** Priority of the routing rule. */
  priority?: number | null;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string | null;
}

export const CreateRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  actions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["drop", "forward", "worker"]),
          value: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
        }),
      ),
      Schema.Null,
    ]),
  ),
  enabled: Schema.optional(
    Schema.Union([Schema.Literals([true, false]), Schema.Null]),
  ),
  matchers: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["all", "literal"]),
          field: Schema.optional(
            Schema.Union([Schema.Literal("to"), Schema.Null]),
          ),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<CreateRuleResponse>;

export type CreateRuleError = DefaultErrors;

export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRuleRequest,
  output: CreateRuleResponse,
  errors: [],
}));

export interface UpdateRuleRequest {
  ruleIdentifier: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: List actions patterns. */
  actions: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Body param: Matching patterns to forward to your actions. */
  matchers: { type: "all" | "literal"; field?: "to"; value?: string }[];
  /** Body param: Routing rule status. */
  enabled?: true | false;
  /** Body param: Routing rule name. */
  name?: string;
  /** Body param: Priority of the routing rule. */
  priority?: number;
}

export const UpdateRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ruleIdentifier: Schema.String.pipe(T.HttpPath("ruleIdentifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  actions: Schema.Array(
    Schema.Struct({
      type: Schema.Literals(["drop", "forward", "worker"]),
      value: Schema.optional(Schema.Array(Schema.String)),
    }),
  ),
  matchers: Schema.Array(
    Schema.Struct({
      type: Schema.Literals(["all", "literal"]),
      field: Schema.optional(Schema.Literal("to")),
      value: Schema.optional(Schema.String),
    }),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/email/routing/rules/{ruleIdentifier}",
  }),
) as unknown as Schema.Schema<UpdateRuleRequest>;

export interface UpdateRuleResponse {
  /** Routing rule identifier. */
  id?: string | null;
  /** List actions patterns. */
  actions?:
    | { type: "drop" | "forward" | "worker"; value?: string[] | null }[]
    | null;
  /** Routing rule status. */
  enabled?: true | false | null;
  /** Matching patterns to forward to your actions. */
  matchers?:
    | { type: "all" | "literal"; field?: "to" | null; value?: string | null }[]
    | null;
  /** Routing rule name. */
  name?: string | null;
  /** Priority of the routing rule. */
  priority?: number | null;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string | null;
}

export const UpdateRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  actions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["drop", "forward", "worker"]),
          value: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
        }),
      ),
      Schema.Null,
    ]),
  ),
  enabled: Schema.optional(
    Schema.Union([Schema.Literals([true, false]), Schema.Null]),
  ),
  matchers: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["all", "literal"]),
          field: Schema.optional(
            Schema.Union([Schema.Literal("to"), Schema.Null]),
          ),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<UpdateRuleResponse>;

export type UpdateRuleError = DefaultErrors;

export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRuleRequest,
  output: UpdateRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  ruleIdentifier: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ruleIdentifier: Schema.String.pipe(T.HttpPath("ruleIdentifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/email/routing/rules/{ruleIdentifier}",
  }),
) as unknown as Schema.Schema<DeleteRuleRequest>;

export interface DeleteRuleResponse {
  /** Routing rule identifier. */
  id?: string | null;
  /** List actions patterns. */
  actions?:
    | { type: "drop" | "forward" | "worker"; value?: string[] | null }[]
    | null;
  /** Routing rule status. */
  enabled?: true | false | null;
  /** Matching patterns to forward to your actions. */
  matchers?:
    | { type: "all" | "literal"; field?: "to" | null; value?: string | null }[]
    | null;
  /** Routing rule name. */
  name?: string | null;
  /** Priority of the routing rule. */
  priority?: number | null;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string | null;
}

export const DeleteRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  actions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["drop", "forward", "worker"]),
          value: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
        }),
      ),
      Schema.Null,
    ]),
  ),
  enabled: Schema.optional(
    Schema.Union([Schema.Literals([true, false]), Schema.Null]),
  ),
  matchers: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["all", "literal"]),
          field: Schema.optional(
            Schema.Union([Schema.Literal("to"), Schema.Null]),
          ),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<DeleteRuleResponse>;

export type DeleteRuleError = DefaultErrors;

export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [],
}));

// =============================================================================
// RuleCatchAll
// =============================================================================

export interface GetRuleCatchAllRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetRuleCatchAllRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/email/routing/rules/catch_all",
  }),
) as unknown as Schema.Schema<GetRuleCatchAllRequest>;

export interface GetRuleCatchAllResponse {
  /** Routing rule identifier. */
  id?: string | null;
  /** List actions for the catch-all routing rule. */
  actions?:
    | { type: "drop" | "forward" | "worker"; value?: string[] | null }[]
    | null;
  /** Routing rule status. */
  enabled?: true | false | null;
  /** List of matchers for the catch-all routing rule. */
  matchers?: { type: "all" }[] | null;
  /** Routing rule name. */
  name?: string | null;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string | null;
}

export const GetRuleCatchAllResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    actions: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            type: Schema.Literals(["drop", "forward", "worker"]),
            value: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
    enabled: Schema.optional(
      Schema.Union([Schema.Literals([true, false]), Schema.Null]),
    ),
    matchers: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            type: Schema.Literal("all"),
          }),
        ),
        Schema.Null,
      ]),
    ),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetRuleCatchAllResponse>;

export type GetRuleCatchAllError = DefaultErrors;

export const getRuleCatchAll: API.OperationMethod<
  GetRuleCatchAllRequest,
  GetRuleCatchAllResponse,
  GetRuleCatchAllError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRuleCatchAllRequest,
  output: GetRuleCatchAllResponse,
  errors: [],
}));

export interface PutRuleCatchAllRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: List actions for the catch-all routing rule. */
  actions: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Body param: List of matchers for the catch-all routing rule. */
  matchers: { type: "all" }[];
  /** Body param: Routing rule status. */
  enabled?: true | false;
  /** Body param: Routing rule name. */
  name?: string;
}

export const PutRuleCatchAllRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    actions: Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["drop", "forward", "worker"]),
        value: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    matchers: Schema.Array(
      Schema.Struct({
        type: Schema.Literal("all"),
      }),
    ),
    enabled: Schema.optional(Schema.Literals([true, false])),
    name: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/email/routing/rules/catch_all",
  }),
) as unknown as Schema.Schema<PutRuleCatchAllRequest>;

export interface PutRuleCatchAllResponse {
  /** Routing rule identifier. */
  id?: string | null;
  /** List actions for the catch-all routing rule. */
  actions?:
    | { type: "drop" | "forward" | "worker"; value?: string[] | null }[]
    | null;
  /** Routing rule status. */
  enabled?: true | false | null;
  /** List of matchers for the catch-all routing rule. */
  matchers?: { type: "all" }[] | null;
  /** Routing rule name. */
  name?: string | null;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string | null;
}

export const PutRuleCatchAllResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    actions: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            type: Schema.Literals(["drop", "forward", "worker"]),
            value: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
    enabled: Schema.optional(
      Schema.Union([Schema.Literals([true, false]), Schema.Null]),
    ),
    matchers: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            type: Schema.Literal("all"),
          }),
        ),
        Schema.Null,
      ]),
    ),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PutRuleCatchAllResponse>;

export type PutRuleCatchAllError = DefaultErrors;

export const putRuleCatchAll: API.OperationMethod<
  PutRuleCatchAllRequest,
  PutRuleCatchAllResponse,
  PutRuleCatchAllError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutRuleCatchAllRequest,
  output: PutRuleCatchAllResponse,
  errors: [],
}));
