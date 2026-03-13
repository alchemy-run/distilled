/**
 * Cloudflare MAGIC-TRANSIT API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service magic-transit
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// App
// =============================================================================

export interface ListAppsRequest {
  /** Identifier */
  accountId: string;
}

export const ListAppsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/apps" }),
) as unknown as Schema.Schema<ListAppsRequest>;

export interface ListAppsResponse {
  result: (
    | {
        accountAppId: string;
        hostnames?: string[] | null;
        ipSubnets?: string[] | null;
        name?: string | null;
        type?: string | null;
      }
    | {
        managedAppId: string;
        hostnames?: string[] | null;
        ipSubnets?: string[] | null;
        name?: string | null;
        type?: string | null;
      }
  )[];
}

export const ListAppsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Union([
      Schema.Struct({
        accountAppId: Schema.String,
        hostnames: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ipSubnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountAppId: "account_app_id",
          hostnames: "hostnames",
          ipSubnets: "ip_subnets",
          name: "name",
          type: "type",
        }),
      ),
      Schema.Struct({
        managedAppId: Schema.String,
        hostnames: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ipSubnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          managedAppId: "managed_app_id",
          hostnames: "hostnames",
          ipSubnets: "ip_subnets",
          name: "name",
          type: "type",
        }),
      ),
    ]),
  ),
}) as unknown as Schema.Schema<ListAppsResponse>;

export type ListAppsError = DefaultErrors;

export const listApps: API.PaginatedOperationMethod<
  ListAppsRequest,
  ListAppsResponse,
  ListAppsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListAppsRequest,
  ) => stream.Stream<
    ListAppsResponse,
    ListAppsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListAppsRequest,
  ) => stream.Stream<
    | {
        accountAppId: string;
        hostnames?: string[] | null;
        ipSubnets?: string[] | null;
        name?: string | null;
        type?: string | null;
      }
    | {
        managedAppId: string;
        hostnames?: string[] | null;
        ipSubnets?: string[] | null;
        name?: string | null;
        type?: string | null;
      },
    ListAppsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAppsRequest,
  output: ListAppsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateAppRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: Display name for the app. */
  name: string;
  /** Body param: Category of the app. */
  type: string;
  /** Body param: FQDNs to associate with traffic decisions. */
  hostnames?: string[];
  /** Body param: IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[];
}

export const CreateAppRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  type: Schema.String,
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    type: "type",
    hostnames: "hostnames",
    ipSubnets: "ip_subnets",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/magic/apps" }),
) as unknown as Schema.Schema<CreateAppRequest>;

export interface CreateAppResponse {
  /** Magic account app ID. */
  accountAppId: string;
  /** FQDNs to associate with traffic decisions. */
  hostnames?: string[] | null;
  /** IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[] | null;
  /** Display name for the app. */
  name?: string | null;
  /** Category of the app. */
  type?: string | null;
}

export const CreateAppResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountAppId: Schema.String,
  hostnames: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  ipSubnets: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  type: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      accountAppId: "account_app_id",
      hostnames: "hostnames",
      ipSubnets: "ip_subnets",
      name: "name",
      type: "type",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateAppResponse>;

export type CreateAppError = DefaultErrors;

export const createApp: API.OperationMethod<
  CreateAppRequest,
  CreateAppResponse,
  CreateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAppRequest,
  output: CreateAppResponse,
  errors: [],
}));

export interface UpdateAppRequest {
  accountAppId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: FQDNs to associate with traffic decisions. */
  hostnames?: string[];
  /** Body param: IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[];
  /** Body param: Display name for the app. */
  name?: string;
  /** Body param: Category of the app. */
  type?: string;
}

export const UpdateAppRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountAppId: Schema.String.pipe(T.HttpPath("accountAppId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    hostnames: "hostnames",
    ipSubnets: "ip_subnets",
    name: "name",
    type: "type",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/apps/{accountAppId}",
  }),
) as unknown as Schema.Schema<UpdateAppRequest>;

export interface UpdateAppResponse {
  /** Magic account app ID. */
  accountAppId: string;
  /** FQDNs to associate with traffic decisions. */
  hostnames?: string[] | null;
  /** IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[] | null;
  /** Display name for the app. */
  name?: string | null;
  /** Category of the app. */
  type?: string | null;
}

export const UpdateAppResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountAppId: Schema.String,
  hostnames: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  ipSubnets: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  type: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      accountAppId: "account_app_id",
      hostnames: "hostnames",
      ipSubnets: "ip_subnets",
      name: "name",
      type: "type",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateAppResponse>;

export type UpdateAppError = DefaultErrors;

export const updateApp: API.OperationMethod<
  UpdateAppRequest,
  UpdateAppResponse,
  UpdateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAppRequest,
  output: UpdateAppResponse,
  errors: [],
}));

export interface PatchAppRequest {
  accountAppId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: FQDNs to associate with traffic decisions. */
  hostnames?: string[];
  /** Body param: IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[];
  /** Body param: Display name for the app. */
  name?: string;
  /** Body param: Category of the app. */
  type?: string;
}

export const PatchAppRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountAppId: Schema.String.pipe(T.HttpPath("accountAppId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    hostnames: "hostnames",
    ipSubnets: "ip_subnets",
    name: "name",
    type: "type",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/apps/{accountAppId}",
  }),
) as unknown as Schema.Schema<PatchAppRequest>;

export interface PatchAppResponse {
  /** Magic account app ID. */
  accountAppId: string;
  /** FQDNs to associate with traffic decisions. */
  hostnames?: string[] | null;
  /** IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[] | null;
  /** Display name for the app. */
  name?: string | null;
  /** Category of the app. */
  type?: string | null;
}

export const PatchAppResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountAppId: Schema.String,
  hostnames: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  ipSubnets: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  type: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      accountAppId: "account_app_id",
      hostnames: "hostnames",
      ipSubnets: "ip_subnets",
      name: "name",
      type: "type",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<PatchAppResponse>;

export type PatchAppError = DefaultErrors;

export const patchApp: API.OperationMethod<
  PatchAppRequest,
  PatchAppResponse,
  PatchAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAppRequest,
  output: PatchAppResponse,
  errors: [],
}));

export interface DeleteAppRequest {
  accountAppId: string;
  /** Identifier */
  accountId: string;
}

export const DeleteAppRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountAppId: Schema.String.pipe(T.HttpPath("accountAppId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/apps/{accountAppId}",
  }),
) as unknown as Schema.Schema<DeleteAppRequest>;

export interface DeleteAppResponse {
  /** Magic account app ID. */
  accountAppId: string;
  /** FQDNs to associate with traffic decisions. */
  hostnames?: string[] | null;
  /** IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[] | null;
  /** Display name for the app. */
  name?: string | null;
  /** Category of the app. */
  type?: string | null;
}

export const DeleteAppResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountAppId: Schema.String,
  hostnames: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  ipSubnets: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  type: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      accountAppId: "account_app_id",
      hostnames: "hostnames",
      ipSubnets: "ip_subnets",
      name: "name",
      type: "type",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteAppResponse>;

export type DeleteAppError = DefaultErrors;

export const deleteApp: API.OperationMethod<
  DeleteAppRequest,
  DeleteAppResponse,
  DeleteAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAppRequest,
  output: DeleteAppResponse,
  errors: [],
}));

// =============================================================================
// CfInterconnect
// =============================================================================

export interface GetCfInterconnectRequest {
  cfInterconnectId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the response body will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
}

export const GetCfInterconnectRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cfInterconnectId: Schema.String.pipe(T.HttpPath("cfInterconnectId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/magic/cf_interconnects/{cfInterconnectId}",
    }),
  ) as unknown as Schema.Schema<GetCfInterconnectRequest>;

export interface GetCfInterconnectResponse {
  interconnect?: {
    id?: string | null;
    automaticReturnRouting?: boolean | null;
    coloName?: string | null;
    createdOn?: string | null;
    description?: string | null;
    gre?: { cloudflareEndpoint?: string | null } | null;
    healthCheck?: unknown | null;
    interfaceAddress?: string | null;
    interfaceAddress6?: string | null;
    modifiedOn?: string | null;
    mtu?: number | null;
    name?: string | null;
  } | null;
}

export const GetCfInterconnectResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    interconnect: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          automaticReturnRouting: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          coloName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          gre: Schema.optional(
            Schema.Union([
              Schema.Struct({
                cloudflareEndpoint: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  cloudflareEndpoint: "cloudflare_endpoint",
                }),
              ),
              Schema.Null,
            ]),
          ),
          healthCheck: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          interfaceAddress: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          interfaceAddress6: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            automaticReturnRouting: "automatic_return_routing",
            coloName: "colo_name",
            createdOn: "created_on",
            description: "description",
            gre: "gre",
            healthCheck: "health_check",
            interfaceAddress: "interface_address",
            interfaceAddress6: "interface_address6",
            modifiedOn: "modified_on",
            mtu: "mtu",
            name: "name",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetCfInterconnectResponse>;

export type GetCfInterconnectError = DefaultErrors;

export const getCfInterconnect: API.OperationMethod<
  GetCfInterconnectRequest,
  GetCfInterconnectResponse,
  GetCfInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCfInterconnectRequest,
  output: GetCfInterconnectResponse,
  errors: [],
}));

export interface ListCfInterconnectsRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the response body will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
}

export const ListCfInterconnectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/magic/cf_interconnects",
    }),
  ) as unknown as Schema.Schema<ListCfInterconnectsRequest>;

export interface ListCfInterconnectsResponse {
  interconnects?:
    | {
        id?: string | null;
        automaticReturnRouting?: boolean | null;
        coloName?: string | null;
        createdOn?: string | null;
        description?: string | null;
        gre?: { cloudflareEndpoint?: string | null } | null;
        healthCheck?: unknown | null;
        interfaceAddress?: string | null;
        interfaceAddress6?: string | null;
        modifiedOn?: string | null;
        mtu?: number | null;
        name?: string | null;
      }[]
    | null;
}

export const ListCfInterconnectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    interconnects: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            automaticReturnRouting: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            coloName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            createdOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            description: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            gre: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  cloudflareEndpoint: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    cloudflareEndpoint: "cloudflare_endpoint",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            healthCheck: Schema.optional(
              Schema.Union([Schema.Unknown, Schema.Null]),
            ),
            interfaceAddress: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            interfaceAddress6: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            modifiedOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              automaticReturnRouting: "automatic_return_routing",
              coloName: "colo_name",
              createdOn: "created_on",
              description: "description",
              gre: "gre",
              healthCheck: "health_check",
              interfaceAddress: "interface_address",
              interfaceAddress6: "interface_address6",
              modifiedOn: "modified_on",
              mtu: "mtu",
              name: "name",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ListCfInterconnectsResponse>;

export type ListCfInterconnectsError = DefaultErrors;

export const listCfInterconnects: API.OperationMethod<
  ListCfInterconnectsRequest,
  ListCfInterconnectsResponse,
  ListCfInterconnectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListCfInterconnectsRequest,
  output: ListCfInterconnectsResponse,
  errors: [],
}));

export interface PutCfInterconnectRequest {
  cfInterconnectId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the request and response bodies will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
  /** Body param: True if automatic stateful return routing should be enabled for a tunnel, false otherwise. */
  automaticReturnRouting?: boolean;
  /** Body param: An optional description of the interconnect. */
  description?: string;
  /** Body param: The configuration specific to GRE interconnects. */
  gre?: { cloudflareEndpoint?: string };
  /** Body param: */
  healthCheck?: unknown;
  /** Body param: A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172 */
  interfaceAddress?: string;
  /** Body param: A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 i */
  interfaceAddress6?: string;
  /** Body param: The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576. */
  mtu?: number;
}

export const PutCfInterconnectRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cfInterconnectId: Schema.String.pipe(T.HttpPath("cfInterconnectId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
    automaticReturnRouting: Schema.optional(Schema.Boolean),
    description: Schema.optional(Schema.String),
    gre: Schema.optional(
      Schema.Struct({
        cloudflareEndpoint: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ cloudflareEndpoint: "cloudflare_endpoint" })),
    ),
    healthCheck: Schema.optional(Schema.Unknown),
    interfaceAddress: Schema.optional(Schema.String),
    interfaceAddress6: Schema.optional(Schema.String),
    mtu: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      automaticReturnRouting: "automatic_return_routing",
      description: "description",
      gre: "gre",
      healthCheck: "health_check",
      interfaceAddress: "interface_address",
      interfaceAddress6: "interface_address6",
      mtu: "mtu",
    }),
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/magic/cf_interconnects/{cfInterconnectId}",
    }),
  ) as unknown as Schema.Schema<PutCfInterconnectRequest>;

export interface PutCfInterconnectResponse {
  modified?: boolean | null;
  modifiedInterconnect?: {
    id?: string | null;
    automaticReturnRouting?: boolean | null;
    coloName?: string | null;
    createdOn?: string | null;
    description?: string | null;
    gre?: { cloudflareEndpoint?: string | null } | null;
    healthCheck?: unknown | null;
    interfaceAddress?: string | null;
    interfaceAddress6?: string | null;
    modifiedOn?: string | null;
    mtu?: number | null;
    name?: string | null;
  } | null;
}

export const PutCfInterconnectResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    modified: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    modifiedInterconnect: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          automaticReturnRouting: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          coloName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          gre: Schema.optional(
            Schema.Union([
              Schema.Struct({
                cloudflareEndpoint: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  cloudflareEndpoint: "cloudflare_endpoint",
                }),
              ),
              Schema.Null,
            ]),
          ),
          healthCheck: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          interfaceAddress: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          interfaceAddress6: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            automaticReturnRouting: "automatic_return_routing",
            coloName: "colo_name",
            createdOn: "created_on",
            description: "description",
            gre: "gre",
            healthCheck: "health_check",
            interfaceAddress: "interface_address",
            interfaceAddress6: "interface_address6",
            modifiedOn: "modified_on",
            mtu: "mtu",
            name: "name",
          }),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        modified: "modified",
        modifiedInterconnect: "modified_interconnect",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PutCfInterconnectResponse>;

export type PutCfInterconnectError = DefaultErrors;

export const putCfInterconnect: API.OperationMethod<
  PutCfInterconnectRequest,
  PutCfInterconnectResponse,
  PutCfInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutCfInterconnectRequest,
  output: PutCfInterconnectResponse,
  errors: [],
}));

// =============================================================================
// Connector
// =============================================================================

export interface GetConnectorRequest {
  connectorId: string;
  /** Account identifier */
  accountId: string;
}

export const GetConnectorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/connectors/{connectorId}",
  }),
) as unknown as Schema.Schema<GetConnectorRequest>;

export interface GetConnectorResponse {
  id: string;
  activated: boolean;
  interruptWindowDurationHours: number;
  interruptWindowHourOfDay: number;
  lastUpdated: string;
  notes: string;
  timezone: string;
  device?: { id: string; serialNumber?: string | null } | null;
  lastHeartbeat?: string | null;
  lastSeenVersion?: string | null;
  licenseKey?: string | null;
}

export const GetConnectorResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  activated: Schema.Boolean,
  interruptWindowDurationHours: Schema.Number,
  interruptWindowHourOfDay: Schema.Number,
  lastUpdated: Schema.String,
  notes: Schema.String,
  timezone: Schema.String,
  device: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.String,
        serialNumber: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(Schema.encodeKeys({ id: "id", serialNumber: "serial_number" })),
      Schema.Null,
    ]),
  ),
  lastHeartbeat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  lastSeenVersion: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  licenseKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      activated: "activated",
      interruptWindowDurationHours: "interrupt_window_duration_hours",
      interruptWindowHourOfDay: "interrupt_window_hour_of_day",
      lastUpdated: "last_updated",
      notes: "notes",
      timezone: "timezone",
      device: "device",
      lastHeartbeat: "last_heartbeat",
      lastSeenVersion: "last_seen_version",
      licenseKey: "license_key",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetConnectorResponse>;

export type GetConnectorError = DefaultErrors;

export const getConnector: API.OperationMethod<
  GetConnectorRequest,
  GetConnectorResponse,
  GetConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConnectorRequest,
  output: GetConnectorResponse,
  errors: [],
}));

export interface ListConnectorsRequest {
  /** Account identifier */
  accountId: string;
}

export const ListConnectorsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/connectors" }),
) as unknown as Schema.Schema<ListConnectorsRequest>;

export interface ListConnectorsResponse {
  result: {
    id: string;
    activated: boolean;
    interruptWindowDurationHours: number;
    interruptWindowHourOfDay: number;
    lastUpdated: string;
    notes: string;
    timezone: string;
    device?: { id: string; serialNumber?: string | null } | null;
    lastHeartbeat?: string | null;
    lastSeenVersion?: string | null;
    licenseKey?: string | null;
  }[];
}

export const ListConnectorsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        activated: Schema.Boolean,
        interruptWindowDurationHours: Schema.Number,
        interruptWindowHourOfDay: Schema.Number,
        lastUpdated: Schema.String,
        notes: Schema.String,
        timezone: Schema.String,
        device: Schema.optional(
          Schema.Union([
            Schema.Struct({
              id: Schema.String,
              serialNumber: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({ id: "id", serialNumber: "serial_number" }),
            ),
            Schema.Null,
          ]),
        ),
        lastHeartbeat: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        lastSeenVersion: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        licenseKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          activated: "activated",
          interruptWindowDurationHours: "interrupt_window_duration_hours",
          interruptWindowHourOfDay: "interrupt_window_hour_of_day",
          lastUpdated: "last_updated",
          notes: "notes",
          timezone: "timezone",
          device: "device",
          lastHeartbeat: "last_heartbeat",
          lastSeenVersion: "last_seen_version",
          licenseKey: "license_key",
        }),
      ),
    ),
  },
) as unknown as Schema.Schema<ListConnectorsResponse>;

export type ListConnectorsError = DefaultErrors;

export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListConnectorsRequest,
  ) => stream.Stream<
    ListConnectorsResponse,
    ListConnectorsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListConnectorsRequest,
  ) => stream.Stream<
    {
      id: string;
      activated: boolean;
      interruptWindowDurationHours: number;
      interruptWindowHourOfDay: number;
      lastUpdated: string;
      notes: string;
      timezone: string;
      device?: { id: string; serialNumber?: string | null } | null;
      lastHeartbeat?: string | null;
      lastSeenVersion?: string | null;
      licenseKey?: string | null;
    },
    ListConnectorsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListConnectorsRequest,
  output: ListConnectorsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateConnectorRequest {
  /** Path param: Account identifier */
  accountId: string;
  /** Body param: Exactly one of id, serial_number, or provision_license must be provided. */
  device: { id?: string; provisionLicense?: boolean; serialNumber?: string };
  /** Body param: */
  activated?: boolean;
  /** Body param: */
  interruptWindowDurationHours?: number;
  /** Body param: */
  interruptWindowHourOfDay?: number;
  /** Body param: */
  notes?: string;
  /** Body param: */
  timezone?: string;
}

export const CreateConnectorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    device: Schema.Struct({
      id: Schema.optional(Schema.String),
      provisionLicense: Schema.optional(Schema.Boolean),
      serialNumber: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        provisionLicense: "provision_license",
        serialNumber: "serial_number",
      }),
    ),
    activated: Schema.optional(Schema.Boolean),
    interruptWindowDurationHours: Schema.optional(Schema.Number),
    interruptWindowHourOfDay: Schema.optional(Schema.Number),
    notes: Schema.optional(Schema.String),
    timezone: Schema.optional(Schema.String),
  },
).pipe(
  Schema.encodeKeys({
    device: "device",
    activated: "activated",
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    notes: "notes",
    timezone: "timezone",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/magic/connectors" }),
) as unknown as Schema.Schema<CreateConnectorRequest>;

export interface CreateConnectorResponse {
  id: string;
  activated: boolean;
  interruptWindowDurationHours: number;
  interruptWindowHourOfDay: number;
  lastUpdated: string;
  notes: string;
  timezone: string;
  device?: { id: string; serialNumber?: string | null } | null;
  lastHeartbeat?: string | null;
  lastSeenVersion?: string | null;
  licenseKey?: string | null;
}

export const CreateConnectorResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    activated: Schema.Boolean,
    interruptWindowDurationHours: Schema.Number,
    interruptWindowHourOfDay: Schema.Number,
    lastUpdated: Schema.String,
    notes: Schema.String,
    timezone: Schema.String,
    device: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          serialNumber: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(Schema.encodeKeys({ id: "id", serialNumber: "serial_number" })),
        Schema.Null,
      ]),
    ),
    lastHeartbeat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastSeenVersion: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    licenseKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        activated: "activated",
        interruptWindowDurationHours: "interrupt_window_duration_hours",
        interruptWindowHourOfDay: "interrupt_window_hour_of_day",
        lastUpdated: "last_updated",
        notes: "notes",
        timezone: "timezone",
        device: "device",
        lastHeartbeat: "last_heartbeat",
        lastSeenVersion: "last_seen_version",
        licenseKey: "license_key",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateConnectorResponse>;

export type CreateConnectorError = DefaultErrors;

export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateConnectorRequest,
  output: CreateConnectorResponse,
  errors: [],
}));

export interface UpdateConnectorRequest {
  connectorId: string;
  /** Path param: Account identifier */
  accountId: string;
  /** Body param: */
  activated?: boolean;
  /** Body param: */
  interruptWindowDurationHours?: number;
  /** Body param: */
  interruptWindowHourOfDay?: number;
  /** Body param: */
  notes?: string;
  /** Body param: When true, regenerate license key for the connector. */
  provisionLicense?: boolean;
  /** Body param: */
  timezone?: string;
}

export const UpdateConnectorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    activated: Schema.optional(Schema.Boolean),
    interruptWindowDurationHours: Schema.optional(Schema.Number),
    interruptWindowHourOfDay: Schema.optional(Schema.Number),
    notes: Schema.optional(Schema.String),
    provisionLicense: Schema.optional(Schema.Boolean),
    timezone: Schema.optional(Schema.String),
  },
).pipe(
  Schema.encodeKeys({
    activated: "activated",
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    notes: "notes",
    provisionLicense: "provision_license",
    timezone: "timezone",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/connectors/{connectorId}",
  }),
) as unknown as Schema.Schema<UpdateConnectorRequest>;

export interface UpdateConnectorResponse {
  id: string;
  activated: boolean;
  interruptWindowDurationHours: number;
  interruptWindowHourOfDay: number;
  lastUpdated: string;
  notes: string;
  timezone: string;
  device?: { id: string; serialNumber?: string | null } | null;
  lastHeartbeat?: string | null;
  lastSeenVersion?: string | null;
  licenseKey?: string | null;
}

export const UpdateConnectorResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    activated: Schema.Boolean,
    interruptWindowDurationHours: Schema.Number,
    interruptWindowHourOfDay: Schema.Number,
    lastUpdated: Schema.String,
    notes: Schema.String,
    timezone: Schema.String,
    device: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          serialNumber: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(Schema.encodeKeys({ id: "id", serialNumber: "serial_number" })),
        Schema.Null,
      ]),
    ),
    lastHeartbeat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastSeenVersion: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    licenseKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        activated: "activated",
        interruptWindowDurationHours: "interrupt_window_duration_hours",
        interruptWindowHourOfDay: "interrupt_window_hour_of_day",
        lastUpdated: "last_updated",
        notes: "notes",
        timezone: "timezone",
        device: "device",
        lastHeartbeat: "last_heartbeat",
        lastSeenVersion: "last_seen_version",
        licenseKey: "license_key",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<UpdateConnectorResponse>;

export type UpdateConnectorError = DefaultErrors;

export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest,
  UpdateConnectorResponse,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConnectorRequest,
  output: UpdateConnectorResponse,
  errors: [],
}));

export interface PatchConnectorRequest {
  connectorId: string;
  /** Path param: Account identifier */
  accountId: string;
  /** Body param: */
  activated?: boolean;
  /** Body param: */
  interruptWindowDurationHours?: number;
  /** Body param: */
  interruptWindowHourOfDay?: number;
  /** Body param: */
  notes?: string;
  /** Body param: When true, regenerate license key for the connector. */
  provisionLicense?: boolean;
  /** Body param: */
  timezone?: string;
}

export const PatchConnectorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  activated: Schema.optional(Schema.Boolean),
  interruptWindowDurationHours: Schema.optional(Schema.Number),
  interruptWindowHourOfDay: Schema.optional(Schema.Number),
  notes: Schema.optional(Schema.String),
  provisionLicense: Schema.optional(Schema.Boolean),
  timezone: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    activated: "activated",
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    notes: "notes",
    provisionLicense: "provision_license",
    timezone: "timezone",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/connectors/{connectorId}",
  }),
) as unknown as Schema.Schema<PatchConnectorRequest>;

export interface PatchConnectorResponse {
  id: string;
  activated: boolean;
  interruptWindowDurationHours: number;
  interruptWindowHourOfDay: number;
  lastUpdated: string;
  notes: string;
  timezone: string;
  device?: { id: string; serialNumber?: string | null } | null;
  lastHeartbeat?: string | null;
  lastSeenVersion?: string | null;
  licenseKey?: string | null;
}

export const PatchConnectorResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    activated: Schema.Boolean,
    interruptWindowDurationHours: Schema.Number,
    interruptWindowHourOfDay: Schema.Number,
    lastUpdated: Schema.String,
    notes: Schema.String,
    timezone: Schema.String,
    device: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          serialNumber: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(Schema.encodeKeys({ id: "id", serialNumber: "serial_number" })),
        Schema.Null,
      ]),
    ),
    lastHeartbeat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastSeenVersion: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    licenseKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  },
)
  .pipe(
    Schema.encodeKeys({
      id: "id",
      activated: "activated",
      interruptWindowDurationHours: "interrupt_window_duration_hours",
      interruptWindowHourOfDay: "interrupt_window_hour_of_day",
      lastUpdated: "last_updated",
      notes: "notes",
      timezone: "timezone",
      device: "device",
      lastHeartbeat: "last_heartbeat",
      lastSeenVersion: "last_seen_version",
      licenseKey: "license_key",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchConnectorResponse>;

export type PatchConnectorError = DefaultErrors;

export const patchConnector: API.OperationMethod<
  PatchConnectorRequest,
  PatchConnectorResponse,
  PatchConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchConnectorRequest,
  output: PatchConnectorResponse,
  errors: [],
}));

export interface DeleteConnectorRequest {
  connectorId: string;
  /** Account identifier */
  accountId: string;
}

export const DeleteConnectorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/connectors/{connectorId}",
  }),
) as unknown as Schema.Schema<DeleteConnectorRequest>;

export interface DeleteConnectorResponse {
  id: string;
  activated: boolean;
  interruptWindowDurationHours: number;
  interruptWindowHourOfDay: number;
  lastUpdated: string;
  notes: string;
  timezone: string;
  device?: { id: string; serialNumber?: string | null } | null;
  lastHeartbeat?: string | null;
  lastSeenVersion?: string | null;
  licenseKey?: string | null;
}

export const DeleteConnectorResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    activated: Schema.Boolean,
    interruptWindowDurationHours: Schema.Number,
    interruptWindowHourOfDay: Schema.Number,
    lastUpdated: Schema.String,
    notes: Schema.String,
    timezone: Schema.String,
    device: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          serialNumber: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(Schema.encodeKeys({ id: "id", serialNumber: "serial_number" })),
        Schema.Null,
      ]),
    ),
    lastHeartbeat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastSeenVersion: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    licenseKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        activated: "activated",
        interruptWindowDurationHours: "interrupt_window_duration_hours",
        interruptWindowHourOfDay: "interrupt_window_hour_of_day",
        lastUpdated: "last_updated",
        notes: "notes",
        timezone: "timezone",
        device: "device",
        lastHeartbeat: "last_heartbeat",
        lastSeenVersion: "last_seen_version",
        licenseKey: "license_key",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteConnectorResponse>;

export type DeleteConnectorError = DefaultErrors;

export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConnectorRequest,
  output: DeleteConnectorResponse,
  errors: [],
}));

// =============================================================================
// ConnectorEvent
// =============================================================================

export interface GetConnectorEventRequest {
  connectorId: string;
  eventT: number;
  eventN: number;
  /** Account identifier */
  accountId: string;
}

export const GetConnectorEventRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
    eventT: Schema.Number.pipe(T.HttpPath("eventT")),
    eventN: Schema.Number.pipe(T.HttpPath("eventN")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/magic/connectors/{connectorId}/telemetry/events/{eventT}.{eventN}",
    }),
  ) as unknown as Schema.Schema<GetConnectorEventRequest>;

export interface GetConnectorEventResponse {
  e:
    | { k: "Init" }
    | { k: "Leave" }
    | { k: "StartAttestation" }
    | { k: "FinishAttestationSuccess" }
    | { k: "FinishAttestationFailure" }
    | { k: "StartRotateCryptKey" }
    | { k: "FinishRotateCryptKeySuccess" }
    | { k: "FinishRotateCryptKeyFailure" }
    | { k: "StartRotatePki" }
    | { k: "FinishRotatePkiSuccess" }
    | { k: "FinishRotatePkiFailure" }
    | { k: "StartUpgrade"; url: string }
    | { k: "FinishUpgradeSuccess" }
    | { k: "FinishUpgradeFailure" }
    | { k: "Reconcile" }
    | { k: "ConfigureCloudflaredTunnel" };
  /** Sequence number, used to order events with the same timestamp */
  n: number;
  /** Time the Event was recorded (seconds since the Unix epoch) */
  t: number;
}

export const GetConnectorEventResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    e: Schema.Union([
      Schema.Struct({
        k: Schema.Literal("Init"),
      }),
      Schema.Struct({
        k: Schema.Literal("Leave"),
      }),
      Schema.Struct({
        k: Schema.Literal("StartAttestation"),
      }),
      Schema.Struct({
        k: Schema.Literal("FinishAttestationSuccess"),
      }),
      Schema.Struct({
        k: Schema.Literal("FinishAttestationFailure"),
      }),
      Schema.Struct({
        k: Schema.Literal("StartRotateCryptKey"),
      }),
      Schema.Struct({
        k: Schema.Literal("FinishRotateCryptKeySuccess"),
      }),
      Schema.Struct({
        k: Schema.Literal("FinishRotateCryptKeyFailure"),
      }),
      Schema.Struct({
        k: Schema.Literal("StartRotatePki"),
      }),
      Schema.Struct({
        k: Schema.Literal("FinishRotatePkiSuccess"),
      }),
      Schema.Struct({
        k: Schema.Literal("FinishRotatePkiFailure"),
      }),
      Schema.Struct({
        k: Schema.Literal("StartUpgrade"),
        url: Schema.String,
      }),
      Schema.Struct({
        k: Schema.Literal("FinishUpgradeSuccess"),
      }),
      Schema.Struct({
        k: Schema.Literal("FinishUpgradeFailure"),
      }),
      Schema.Struct({
        k: Schema.Literal("Reconcile"),
      }),
      Schema.Struct({
        k: Schema.Literal("ConfigureCloudflaredTunnel"),
      }),
    ]),
    n: Schema.Number,
    t: Schema.Number,
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetConnectorEventResponse>;

export type GetConnectorEventError = DefaultErrors;

export const getConnectorEvent: API.OperationMethod<
  GetConnectorEventRequest,
  GetConnectorEventResponse,
  GetConnectorEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConnectorEventRequest,
  output: GetConnectorEventResponse,
  errors: [],
}));

export interface ListConnectorEventsRequest {
  connectorId: string;
  /** Path param: Account identifier */
  accountId: string;
  /** Query param: */
  from: number;
  /** Query param: */
  to: number;
  /** Query param: */
  cursor?: string;
  /** Query param: Filter by event kind */
  k?: string;
  /** Query param: */
  limit?: number;
}

export const ListConnectorEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    from: Schema.Number.pipe(T.HttpQuery("from")),
    to: Schema.Number.pipe(T.HttpQuery("to")),
    cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
    k: Schema.optional(Schema.String).pipe(T.HttpQuery("k")),
    limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/magic/connectors/{connectorId}/telemetry/events",
    }),
  ) as unknown as Schema.Schema<ListConnectorEventsRequest>;

export interface ListConnectorEventsResponse {
  count: number;
  items: { a: number; k: string; n: number; t: number }[];
  cursor?: string | null;
}

export const ListConnectorEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    count: Schema.Number,
    items: Schema.Array(
      Schema.Struct({
        a: Schema.Number,
        k: Schema.String,
        n: Schema.Number,
        t: Schema.Number,
      }),
    ),
    cursor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ListConnectorEventsResponse>;

export type ListConnectorEventsError = DefaultErrors;

export const listConnectorEvents: API.OperationMethod<
  ListConnectorEventsRequest,
  ListConnectorEventsResponse,
  ListConnectorEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListConnectorEventsRequest,
  output: ListConnectorEventsResponse,
  errors: [],
}));

// =============================================================================
// ConnectorEventLatest
// =============================================================================

export interface ListConnectorEventLatestsRequest {
  connectorId: string;
  /** Account identifier */
  accountId: string;
}

export const ListConnectorEventLatestsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/magic/connectors/{connectorId}/telemetry/events/latest",
    }),
  ) as unknown as Schema.Schema<ListConnectorEventLatestsRequest>;

export interface ListConnectorEventLatestsResponse {
  count: number;
  items: {
    e:
      | { k: "Init" }
      | { k: "Leave" }
      | { k: "StartAttestation" }
      | { k: "FinishAttestationSuccess" }
      | { k: "FinishAttestationFailure" }
      | { k: "StartRotateCryptKey" }
      | { k: "FinishRotateCryptKeySuccess" }
      | { k: "FinishRotateCryptKeyFailure" }
      | { k: "StartRotatePki" }
      | { k: "FinishRotatePkiSuccess" }
      | { k: "FinishRotatePkiFailure" }
      | { k: "StartUpgrade"; url: string }
      | { k: "FinishUpgradeSuccess" }
      | { k: "FinishUpgradeFailure" }
      | { k: "Reconcile" }
      | { k: "ConfigureCloudflaredTunnel" };
    n: number;
    t: number;
  }[];
}

export const ListConnectorEventLatestsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    count: Schema.Number,
    items: Schema.Array(
      Schema.Struct({
        e: Schema.Union([
          Schema.Struct({
            k: Schema.Literal("Init"),
          }),
          Schema.Struct({
            k: Schema.Literal("Leave"),
          }),
          Schema.Struct({
            k: Schema.Literal("StartAttestation"),
          }),
          Schema.Struct({
            k: Schema.Literal("FinishAttestationSuccess"),
          }),
          Schema.Struct({
            k: Schema.Literal("FinishAttestationFailure"),
          }),
          Schema.Struct({
            k: Schema.Literal("StartRotateCryptKey"),
          }),
          Schema.Struct({
            k: Schema.Literal("FinishRotateCryptKeySuccess"),
          }),
          Schema.Struct({
            k: Schema.Literal("FinishRotateCryptKeyFailure"),
          }),
          Schema.Struct({
            k: Schema.Literal("StartRotatePki"),
          }),
          Schema.Struct({
            k: Schema.Literal("FinishRotatePkiSuccess"),
          }),
          Schema.Struct({
            k: Schema.Literal("FinishRotatePkiFailure"),
          }),
          Schema.Struct({
            k: Schema.Literal("StartUpgrade"),
            url: Schema.String,
          }),
          Schema.Struct({
            k: Schema.Literal("FinishUpgradeSuccess"),
          }),
          Schema.Struct({
            k: Schema.Literal("FinishUpgradeFailure"),
          }),
          Schema.Struct({
            k: Schema.Literal("Reconcile"),
          }),
          Schema.Struct({
            k: Schema.Literal("ConfigureCloudflaredTunnel"),
          }),
        ]),
        n: Schema.Number,
        t: Schema.Number,
      }),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ListConnectorEventLatestsResponse>;

export type ListConnectorEventLatestsError = DefaultErrors;

export const listConnectorEventLatests: API.OperationMethod<
  ListConnectorEventLatestsRequest,
  ListConnectorEventLatestsResponse,
  ListConnectorEventLatestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListConnectorEventLatestsRequest,
  output: ListConnectorEventLatestsResponse,
  errors: [],
}));

// =============================================================================
// ConnectorSnapshot
// =============================================================================

export interface GetConnectorSnapshotRequest {
  connectorId: string;
  snapshotT: number;
  /** Account identifier */
  accountId: string;
}

export const GetConnectorSnapshotRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
    snapshotT: Schema.Number.pipe(T.HttpPath("snapshotT")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/magic/connectors/{connectorId}/telemetry/snapshots/{snapshotT}",
    }),
  ) as unknown as Schema.Schema<GetConnectorSnapshotRequest>;

export interface GetConnectorSnapshotResponse {
  /** Count of failures to reclaim space */
  countReclaimFailures: number;
  /** Count of reclaimed paths */
  countReclaimedPaths: number;
  /** Count of failed snapshot recordings */
  countRecordFailed: number;
  /** Count of failed snapshot transmissions */
  countTransmitFailures: number;
  /** Time the Snapshot was recorded (seconds since the Unix epoch) */
  t: number;
  /** Version */
  v: string;
  bonds?: { name: string; status: string }[] | null;
  /** Count of processors/cores */
  cpuCount?: number | null;
  /** Percentage of time over a 10 second window that tasks were stalled */
  cpuPressure_10s?: number | null;
  /** Percentage of time over a 5 minute window that tasks were stalled */
  cpuPressure_300s?: number | null;
  /** Percentage of time over a 1 minute window that tasks were stalled */
  cpuPressure_60s?: number | null;
  /** Total stall time (microseconds) */
  cpuPressureTotalUs?: number | null;
  /** Time spent running a virtual CPU or guest OS (milliseconds) */
  cpuTimeGuestMs?: number | null;
  /** Time spent running a niced guest (milliseconds) */
  cpuTimeGuestNiceMs?: number | null;
  /** Time spent in idle state (milliseconds) */
  cpuTimeIdleMs?: number | null;
  /** Time spent wait for I/O to complete (milliseconds) */
  cpuTimeIowaitMs?: number | null;
  /** Time spent servicing interrupts (milliseconds) */
  cpuTimeIrqMs?: number | null;
  /** Time spent in low-priority user mode (milliseconds) */
  cpuTimeNiceMs?: number | null;
  /** Time spent servicing softirqs (milliseconds) */
  cpuTimeSoftirqMs?: number | null;
  /** Time stolen (milliseconds) */
  cpuTimeStealMs?: number | null;
  /** Time spent in system mode (milliseconds) */
  cpuTimeSystemMs?: number | null;
  /** Time spent in user mode (milliseconds) */
  cpuTimeUserMs?: number | null;
  dhcpLeases?:
    | {
        clientId: string;
        expiryTime: number;
        hostname: string;
        interfaceName: string;
        ipAddress: string;
        macAddress: string;
        connectorId?: string | null;
      }[]
    | null;
  disks?:
    | {
        inProgress: number;
        major: number;
        merged: number;
        minor: number;
        name: string;
        reads: number;
        sectorsRead: number;
        sectorsWritten: number;
        timeInProgressMs: number;
        timeReadingMs: number;
        timeWritingMs: number;
        weightedTimeInProgressMs: number;
        writes: number;
        writesMerged: number;
        connectorId?: string | null;
        discards?: number | null;
        discardsMerged?: number | null;
        flushes?: number | null;
        sectorsDiscarded?: number | null;
        timeDiscardingMs?: number | null;
        timeFlushingMs?: number | null;
      }[]
    | null;
  /** Name of high availability state */
  haState?: string | null;
  /** Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault) */
  haValue?: number | null;
  interfaces?:
    | {
        name: string;
        operstate: string;
        connectorId?: string | null;
        ipAddresses?:
          | {
              interfaceName: string;
              ipAddress: string;
              connectorId?: string | null;
            }[]
          | null;
        speed?: number | null;
      }[]
    | null;
  /** Percentage of time over a 10 second window that all tasks were stalled */
  ioPressureFull_10s?: number | null;
  /** Percentage of time over a 5 minute window that all tasks were stalled */
  ioPressureFull_300s?: number | null;
  /** Percentage of time over a 1 minute window that all tasks were stalled */
  ioPressureFull_60s?: number | null;
  /** Total stall time (microseconds) */
  ioPressureFullTotalUs?: number | null;
  /** Percentage of time over a 10 second window that some tasks were stalled */
  ioPressureSome_10s?: number | null;
  /** Percentage of time over a 3 minute window that some tasks were stalled */
  ioPressureSome_300s?: number | null;
  /** Percentage of time over a 1 minute window that some tasks were stalled */
  ioPressureSome_60s?: number | null;
  /** Total stall time (microseconds) */
  ioPressureSomeTotalUs?: number | null;
  /** Boot time (seconds since Unix epoch) */
  kernelBtime?: number | null;
  /** Number of context switches that the system underwent */
  kernelCtxt?: number | null;
  /** Number of forks since boot */
  kernelProcesses?: number | null;
  /** Number of processes blocked waiting for I/O */
  kernelProcessesBlocked?: number | null;
  /** Number of processes in runnable state */
  kernelProcessesRunning?: number | null;
  /** The fifteen-minute load average */
  loadAverage_15m?: number | null;
  /** The one-minute load average */
  loadAverage_1m?: number | null;
  /** The five-minute load average */
  loadAverage_5m?: number | null;
  /** Number of currently runnable kernel scheduling entities */
  loadAverageCur?: number | null;
  /** Number of kernel scheduling entities that currently exist on the system */
  loadAverageMax?: number | null;
  /** Memory that has been used more recently */
  memoryActiveBytes?: number | null;
  /** Non-file backed huge pages mapped into user-space page tables */
  memoryAnonHugepagesBytes?: number | null;
  /** Non-file backed pages mapped into user-space page tables */
  memoryAnonPagesBytes?: number | null;
  /** Estimate of how much memory is available for starting new applications */
  memoryAvailableBytes?: number | null;
  /** Memory used for block device bounce buffers */
  memoryBounceBytes?: number | null;
  /** Relatively temporary storage for raw disk blocks */
  memoryBuffersBytes?: number | null;
  /** In-memory cache for files read from the disk */
  memoryCachedBytes?: number | null;
  /** Free CMA (Contiguous Memory Allocator) pages */
  memoryCmaFreeBytes?: number | null;
  /** Total CMA (Contiguous Memory Allocator) pages */
  memoryCmaTotalBytes?: number | null;
  /** Total amount of memory currently available to be allocated on the system */
  memoryCommitLimitBytes?: number | null;
  /** Amount of memory presently allocated on the system */
  memoryCommittedAsBytes?: number | null;
  /** Memory which is waiting to get written back to the disk */
  memoryDirtyBytes?: number | null;
  /** The sum of LowFree and HighFree */
  memoryFreeBytes?: number | null;
  /** Amount of free highmem */
  memoryHighFreeBytes?: number | null;
  /** Total amount of highmem */
  memoryHighTotalBytes?: number | null;
  /** The number of huge pages in the pool that are not yet allocated */
  memoryHugepagesFree?: number | null;
  /** Number of huge pages for which a commitment has been made, but no allocation has yet been made */
  memoryHugepagesRsvd?: number | null;
  /** Number of huge pages in the pool above the threshold */
  memoryHugepagesSurp?: number | null;
  /** The size of the pool of huge pages */
  memoryHugepagesTotal?: number | null;
  /** The size of huge pages */
  memoryHugepagesizeBytes?: number | null;
  /** Memory which has been less recently used */
  memoryInactiveBytes?: number | null;
  /** Kernel allocations that the kernel will attempt to reclaim under memory pressure */
  memoryKReclaimableBytes?: number | null;
  /** Amount of memory allocated to kernel stacks */
  memoryKernelStackBytes?: number | null;
  /** Amount of free lowmem */
  memoryLowFreeBytes?: number | null;
  /** Total amount of lowmem */
  memoryLowTotalBytes?: number | null;
  /** Files which have been mapped into memory */
  memoryMappedBytes?: number | null;
  /** Amount of memory dedicated to the lowest level of page tables */
  memoryPageTablesBytes?: number | null;
  /** Memory allocated to the per-cpu alloctor used to back per-cpu allocations */
  memoryPerCpuBytes?: number | null;
  /** Percentage of time over a 10 second window that all tasks were stalled */
  memoryPressureFull_10s?: number | null;
  /** Percentage of time over a 5 minute window that all tasks were stalled */
  memoryPressureFull_300s?: number | null;
  /** Percentage of time over a 1 minute window that all tasks were stalled */
  memoryPressureFull_60s?: number | null;
  /** Total stall time (microseconds) */
  memoryPressureFullTotalUs?: number | null;
  /** Percentage of time over a 10 second window that some tasks were stalled */
  memoryPressureSome_10s?: number | null;
  /** Percentage of time over a 5 minute window that some tasks were stalled */
  memoryPressureSome_300s?: number | null;
  /** Percentage of time over a 1 minute window that some tasks were stalled */
  memoryPressureSome_60s?: number | null;
  /** Total stall time (microseconds) */
  memoryPressureSomeTotalUs?: number | null;
  /** Part of slab that can be reclaimed on memory pressure */
  memorySReclaimableBytes?: number | null;
  /** Part of slab that cannot be reclaimed on memory pressure */
  memorySUnreclaimBytes?: number | null;
  /** Amount of memory dedicated to the lowest level of page tables */
  memorySecondaryPageTablesBytes?: number | null;
  /** Amount of memory consumed by tmpfs */
  memoryShmemBytes?: number | null;
  /** Memory used by shmem and tmpfs, allocated with huge pages */
  memoryShmemHugepagesBytes?: number | null;
  /** Shared memory mapped into user space with huge pages */
  memoryShmemPmdMappedBytes?: number | null;
  /** In-kernel data structures cache */
  memorySlabBytes?: number | null;
  /** Memory swapped out and back in while still in swap file */
  memorySwapCachedBytes?: number | null;
  /** Amount of swap space that is currently unused */
  memorySwapFreeBytes?: number | null;
  /** Total amount of swap space available */
  memorySwapTotalBytes?: number | null;
  /** Total usable RAM */
  memoryTotalBytes?: number | null;
  /** Largest contiguous block of vmalloc area which is free */
  memoryVmallocChunkBytes?: number | null;
  /** Total size of vmalloc memory area */
  memoryVmallocTotalBytes?: number | null;
  /** Amount of vmalloc area which is used */
  memoryVmallocUsedBytes?: number | null;
  /** Memory which is actively being written back to the disk */
  memoryWritebackBytes?: number | null;
  /** Memory used by FUSE for temporary writeback buffers */
  memoryWritebackTmpBytes?: number | null;
  /** Memory consumed by the zswap backend, compressed */
  memoryZSwapBytes?: number | null;
  /** Amount of anonymous memory stored in zswap, uncompressed */
  memoryZSwappedBytes?: number | null;
  mounts?:
    | {
        fileSystem: string;
        kind: string;
        mountPoint: string;
        name: string;
        availableBytes?: number | null;
        connectorId?: string | null;
        isReadOnly?: boolean | null;
        isRemovable?: boolean | null;
        totalBytes?: number | null;
      }[]
    | null;
  netdevs?:
    | {
        name: string;
        recvBytes: number;
        recvCompressed: number;
        recvDrop: number;
        recvErrs: number;
        recvFifo: number;
        recvFrame: number;
        recvMulticast: number;
        recvPackets: number;
        sentBytes: number;
        sentCarrier: number;
        sentColls: number;
        sentCompressed: number;
        sentDrop: number;
        sentErrs: number;
        sentFifo: number;
        sentPackets: number;
        connectorId?: string | null;
      }[]
    | null;
  /** Number of ICMP Address Mask Reply messages received */
  snmpIcmpInAddrMaskReps?: number | null;
  /** Number of ICMP Address Mask Request messages received */
  snmpIcmpInAddrMasks?: number | null;
  /** Number of ICMP messages received with bad checksums */
  snmpIcmpInCsumErrors?: number | null;
  /** Number of ICMP Destination Unreachable messages received */
  snmpIcmpInDestUnreachs?: number | null;
  /** Number of ICMP Echo Reply messages received */
  snmpIcmpInEchoReps?: number | null;
  /** Number of ICMP Echo (request) messages received */
  snmpIcmpInEchos?: number | null;
  /** Number of ICMP messages received with ICMP-specific errors */
  snmpIcmpInErrors?: number | null;
  /** Number of ICMP messages received */
  snmpIcmpInMsgs?: number | null;
  /** Number of ICMP Parameter Problem messages received */
  snmpIcmpInParmProbs?: number | null;
  /** Number of ICMP Redirect messages received */
  snmpIcmpInRedirects?: number | null;
  /** Number of ICMP Source Quench messages received */
  snmpIcmpInSrcQuenchs?: number | null;
  /** Number of ICMP Time Exceeded messages received */
  snmpIcmpInTimeExcds?: number | null;
  /** Number of ICMP Address Mask Request messages received */
  snmpIcmpInTimestampReps?: number | null;
  /** Number of ICMP Timestamp (request) messages received */
  snmpIcmpInTimestamps?: number | null;
  /** Number of ICMP Address Mask Reply messages sent */
  snmpIcmpOutAddrMaskReps?: number | null;
  /** Number of ICMP Address Mask Request messages sent */
  snmpIcmpOutAddrMasks?: number | null;
  /** Number of ICMP Destination Unreachable messages sent */
  snmpIcmpOutDestUnreachs?: number | null;
  /** Number of ICMP Echo Reply messages sent */
  snmpIcmpOutEchoReps?: number | null;
  /** Number of ICMP Echo (request) messages sent */
  snmpIcmpOutEchos?: number | null;
  /** Number of ICMP messages which this entity did not send due to ICMP-specific errors */
  snmpIcmpOutErrors?: number | null;
  /** Number of ICMP messages attempted to send */
  snmpIcmpOutMsgs?: number | null;
  /** Number of ICMP Parameter Problem messages sent */
  snmpIcmpOutParmProbs?: number | null;
  /** Number of ICMP Redirect messages sent */
  snmpIcmpOutRedirects?: number | null;
  /** Number of ICMP Source Quench messages sent */
  snmpIcmpOutSrcQuenchs?: number | null;
  /** Number of ICMP Time Exceeded messages sent */
  snmpIcmpOutTimeExcds?: number | null;
  /** Number of ICMP Timestamp Reply messages sent */
  snmpIcmpOutTimestampReps?: number | null;
  /** Number of ICMP Timestamp (request) messages sent */
  snmpIcmpOutTimestamps?: number | null;
  /** Default value of the Time-To-Live field of the IP header */
  snmpIpDefaultTtl?: number | null;
  /** Number of datagrams forwarded to their final destination */
  snmpIpForwDatagrams?: number | null;
  /** Set when acting as an IP gateway */
  snmpIpForwardingEnabled?: boolean | null;
  /** Number of datagrams generated by fragmentation */
  snmpIpFragCreates?: number | null;
  /** Number of datagrams discarded because fragmentation failed */
  snmpIpFragFails?: number | null;
  /** Number of datagrams successfully fragmented */
  snmpIpFragOks?: number | null;
  /** Number of input datagrams discarded due to errors in the IP address */
  snmpIpInAddrErrors?: number | null;
  /** Number of input datagrams successfully delivered to IP user-protocols */
  snmpIpInDelivers?: number | null;
  /** Number of input datagrams otherwise discarded */
  snmpIpInDiscards?: number | null;
  /** Number of input datagrams discarded due to errors in the IP header */
  snmpIpInHdrErrors?: number | null;
  /** Number of input datagrams received from interfaces */
  snmpIpInReceives?: number | null;
  /** Number of input datagrams discarded due unknown or unsupported protocol */
  snmpIpInUnknownProtos?: number | null;
  /** Number of output datagrams otherwise discarded */
  snmpIpOutDiscards?: number | null;
  /** Number of output datagrams discarded because no route matched */
  snmpIpOutNoRoutes?: number | null;
  /** Number of datagrams supplied for transmission */
  snmpIpOutRequests?: number | null;
  /** Number of failures detected by the reassembly algorithm */
  snmpIpReasmFails?: number | null;
  /** Number of datagrams successfully reassembled */
  snmpIpReasmOks?: number | null;
  /** Number of fragments received which needed to be reassembled */
  snmpIpReasmReqds?: number | null;
  /** Number of seconds fragments are held while awaiting reassembly */
  snmpIpReasmTimeout?: number | null;
  /** Number of times TCP transitions to SYN-SENT from CLOSED */
  snmpTcpActiveOpens?: number | null;
  /** Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD */
  snmpTcpAttemptFails?: number | null;
  /** Number of TCP connections in ESTABLISHED or CLOSE-WAIT */
  snmpTcpCurrEstab?: number | null;
  /** Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT */
  snmpTcpEstabResets?: number | null;
  /** Number of TCP segments received with checksum errors */
  snmpTcpInCsumErrors?: number | null;
  /** Number of TCP segments received in error */
  snmpTcpInErrs?: number | null;
  /** Number of TCP segments received */
  snmpTcpInSegs?: number | null;
  /** Limit on the total number of TCP connections */
  snmpTcpMaxConn?: number | null;
  /** Number of TCP segments sent with RST flag */
  snmpTcpOutRsts?: number | null;
  /** Number of TCP segments sent */
  snmpTcpOutSegs?: number | null;
  /** Number of times TCP transitions to SYN-RCVD from LISTEN */
  snmpTcpPassiveOpens?: number | null;
  /** Number of TCP segments retransmitted */
  snmpTcpRetransSegs?: number | null;
  /** Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds) */
  snmpTcpRtoMax?: number | null;
  /** Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds) */
  snmpTcpRtoMin?: number | null;
  /** Number of UDP datagrams delivered to UDP applications */
  snmpUdpInDatagrams?: number | null;
  /** Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port */
  snmpUdpInErrors?: number | null;
  /** Number of UDP datagrams received for which there was not application at the destination port */
  snmpUdpNoPorts?: number | null;
  /** Number of UDP datagrams sent */
  snmpUdpOutDatagrams?: number | null;
  /** Boottime of the system (seconds since the Unix epoch) */
  systemBootTimeS?: number | null;
  thermals?:
    | {
        label: string;
        connectorId?: string | null;
        criticalCelcius?: number | null;
        currentCelcius?: number | null;
        maxCelcius?: number | null;
      }[]
    | null;
  tunnels?:
    | {
        healthState: string;
        healthValue: number;
        interfaceName: string;
        tunnelId: string;
        connectorId?: string | null;
        probedMtu?: number | null;
      }[]
    | null;
  /** Sum of how much time each core has spent idle */
  uptimeIdleMs?: number | null;
  /** Uptime of the system, including time spent in suspend */
  uptimeTotalMs?: number | null;
}

export const GetConnectorSnapshotResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    countReclaimFailures: Schema.Number,
    countReclaimedPaths: Schema.Number,
    countRecordFailed: Schema.Number,
    countTransmitFailures: Schema.Number,
    t: Schema.Number,
    v: Schema.String,
    bonds: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            status: Schema.String,
          }),
        ),
        Schema.Null,
      ]),
    ),
    cpuCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    cpuPressure_10s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    cpuPressure_300s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    cpuPressure_60s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    cpuPressureTotalUs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    cpuTimeGuestMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    cpuTimeGuestNiceMs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    cpuTimeIdleMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    cpuTimeIowaitMs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    cpuTimeIrqMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    cpuTimeNiceMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    cpuTimeSoftirqMs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    cpuTimeStealMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    cpuTimeSystemMs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    cpuTimeUserMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    dhcpLeases: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            clientId: Schema.String,
            expiryTime: Schema.Number,
            hostname: Schema.String,
            interfaceName: Schema.String,
            ipAddress: Schema.String,
            macAddress: Schema.String,
            connectorId: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              clientId: "client_id",
              expiryTime: "expiry_time",
              hostname: "hostname",
              interfaceName: "interface_name",
              ipAddress: "ip_address",
              macAddress: "mac_address",
              connectorId: "connector_id",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    disks: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            inProgress: Schema.Number,
            major: Schema.Number,
            merged: Schema.Number,
            minor: Schema.Number,
            name: Schema.String,
            reads: Schema.Number,
            sectorsRead: Schema.Number,
            sectorsWritten: Schema.Number,
            timeInProgressMs: Schema.Number,
            timeReadingMs: Schema.Number,
            timeWritingMs: Schema.Number,
            weightedTimeInProgressMs: Schema.Number,
            writes: Schema.Number,
            writesMerged: Schema.Number,
            connectorId: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            discards: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            discardsMerged: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            flushes: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            sectorsDiscarded: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            timeDiscardingMs: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            timeFlushingMs: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              inProgress: "in_progress",
              major: "major",
              merged: "merged",
              minor: "minor",
              name: "name",
              reads: "reads",
              sectorsRead: "sectors_read",
              sectorsWritten: "sectors_written",
              timeInProgressMs: "time_in_progress_ms",
              timeReadingMs: "time_reading_ms",
              timeWritingMs: "time_writing_ms",
              weightedTimeInProgressMs: "weighted_time_in_progress_ms",
              writes: "writes",
              writesMerged: "writes_merged",
              connectorId: "connector_id",
              discards: "discards",
              discardsMerged: "discards_merged",
              flushes: "flushes",
              sectorsDiscarded: "sectors_discarded",
              timeDiscardingMs: "time_discarding_ms",
              timeFlushingMs: "time_flushing_ms",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    haState: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    haValue: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    interfaces: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            operstate: Schema.String,
            connectorId: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            ipAddresses: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    interfaceName: Schema.String,
                    ipAddress: Schema.String,
                    connectorId: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      interfaceName: "interface_name",
                      ipAddress: "ip_address",
                      connectorId: "connector_id",
                    }),
                  ),
                ),
                Schema.Null,
              ]),
            ),
            speed: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              operstate: "operstate",
              connectorId: "connector_id",
              ipAddresses: "ip_addresses",
              speed: "speed",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    ioPressureFull_10s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    ioPressureFull_300s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    ioPressureFull_60s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    ioPressureFullTotalUs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    ioPressureSome_10s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    ioPressureSome_300s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    ioPressureSome_60s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    ioPressureSomeTotalUs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    kernelBtime: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    kernelCtxt: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    kernelProcesses: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    kernelProcessesBlocked: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    kernelProcessesRunning: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    loadAverage_15m: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    loadAverage_1m: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    loadAverage_5m: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    loadAverageCur: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    loadAverageMax: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    memoryActiveBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryAnonHugepagesBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryAnonPagesBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryAvailableBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryBounceBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryBuffersBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryCachedBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryCmaFreeBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryCmaTotalBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryCommitLimitBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryCommittedAsBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryDirtyBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryFreeBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryHighFreeBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryHighTotalBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryHugepagesFree: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryHugepagesRsvd: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryHugepagesSurp: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryHugepagesTotal: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryHugepagesizeBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryInactiveBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryKReclaimableBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryKernelStackBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryLowFreeBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryLowTotalBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryMappedBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPageTablesBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPerCpuBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPressureFull_10s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPressureFull_300s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPressureFull_60s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPressureFullTotalUs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPressureSome_10s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPressureSome_300s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPressureSome_60s: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryPressureSomeTotalUs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memorySReclaimableBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memorySUnreclaimBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memorySecondaryPageTablesBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryShmemBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryShmemHugepagesBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryShmemPmdMappedBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memorySlabBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memorySwapCachedBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memorySwapFreeBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memorySwapTotalBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryTotalBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryVmallocChunkBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryVmallocTotalBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryVmallocUsedBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryWritebackBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryWritebackTmpBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryZSwapBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    memoryZSwappedBytes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    mounts: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            fileSystem: Schema.String,
            kind: Schema.String,
            mountPoint: Schema.String,
            name: Schema.String,
            availableBytes: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            connectorId: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            isReadOnly: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            isRemovable: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            totalBytes: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              fileSystem: "file_system",
              kind: "kind",
              mountPoint: "mount_point",
              name: "name",
              availableBytes: "available_bytes",
              connectorId: "connector_id",
              isReadOnly: "is_read_only",
              isRemovable: "is_removable",
              totalBytes: "total_bytes",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    netdevs: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            recvBytes: Schema.Number,
            recvCompressed: Schema.Number,
            recvDrop: Schema.Number,
            recvErrs: Schema.Number,
            recvFifo: Schema.Number,
            recvFrame: Schema.Number,
            recvMulticast: Schema.Number,
            recvPackets: Schema.Number,
            sentBytes: Schema.Number,
            sentCarrier: Schema.Number,
            sentColls: Schema.Number,
            sentCompressed: Schema.Number,
            sentDrop: Schema.Number,
            sentErrs: Schema.Number,
            sentFifo: Schema.Number,
            sentPackets: Schema.Number,
            connectorId: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              recvBytes: "recv_bytes",
              recvCompressed: "recv_compressed",
              recvDrop: "recv_drop",
              recvErrs: "recv_errs",
              recvFifo: "recv_fifo",
              recvFrame: "recv_frame",
              recvMulticast: "recv_multicast",
              recvPackets: "recv_packets",
              sentBytes: "sent_bytes",
              sentCarrier: "sent_carrier",
              sentColls: "sent_colls",
              sentCompressed: "sent_compressed",
              sentDrop: "sent_drop",
              sentErrs: "sent_errs",
              sentFifo: "sent_fifo",
              sentPackets: "sent_packets",
              connectorId: "connector_id",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    snmpIcmpInAddrMaskReps: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInAddrMasks: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInCsumErrors: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInDestUnreachs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInEchoReps: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInEchos: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInErrors: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInMsgs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpIcmpInParmProbs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInRedirects: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInSrcQuenchs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInTimeExcds: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInTimestampReps: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpInTimestamps: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutAddrMaskReps: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutAddrMasks: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutDestUnreachs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutEchoReps: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutEchos: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutErrors: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutMsgs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutParmProbs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutRedirects: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutSrcQuenchs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutTimeExcds: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutTimestampReps: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIcmpOutTimestamps: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpDefaultTtl: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpForwDatagrams: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpForwardingEnabled: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    snmpIpFragCreates: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpFragFails: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpFragOks: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpIpInAddrErrors: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpInDelivers: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpInDiscards: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpInHdrErrors: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpInReceives: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpInUnknownProtos: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpOutDiscards: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpOutNoRoutes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpOutRequests: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpReasmFails: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpReasmOks: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpIpReasmReqds: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpIpReasmTimeout: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpTcpActiveOpens: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpTcpAttemptFails: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpTcpCurrEstab: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpTcpEstabResets: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpTcpInCsumErrors: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpTcpInErrs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpTcpInSegs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpTcpMaxConn: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpTcpOutRsts: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpTcpOutSegs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpTcpPassiveOpens: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpTcpRetransSegs: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpTcpRtoMax: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpTcpRtoMin: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpUdpInDatagrams: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpUdpInErrors: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    snmpUdpNoPorts: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    snmpUdpOutDatagrams: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    systemBootTimeS: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    thermals: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            label: Schema.String,
            connectorId: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            criticalCelcius: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            currentCelcius: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            maxCelcius: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              label: "label",
              connectorId: "connector_id",
              criticalCelcius: "critical_celcius",
              currentCelcius: "current_celcius",
              maxCelcius: "max_celcius",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    tunnels: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            healthState: Schema.String,
            healthValue: Schema.Number,
            interfaceName: Schema.String,
            tunnelId: Schema.String,
            connectorId: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            probedMtu: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              healthState: "health_state",
              healthValue: "health_value",
              interfaceName: "interface_name",
              tunnelId: "tunnel_id",
              connectorId: "connector_id",
              probedMtu: "probed_mtu",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    uptimeIdleMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    uptimeTotalMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        countReclaimFailures: "count_reclaim_failures",
        countReclaimedPaths: "count_reclaimed_paths",
        countRecordFailed: "count_record_failed",
        countTransmitFailures: "count_transmit_failures",
        t: "t",
        v: "v",
        bonds: "bonds",
        cpuCount: "cpu_count",
        cpuPressure_10s: "cpu_pressure_10s",
        cpuPressure_300s: "cpu_pressure_300s",
        cpuPressure_60s: "cpu_pressure_60s",
        cpuPressureTotalUs: "cpu_pressure_total_us",
        cpuTimeGuestMs: "cpu_time_guest_ms",
        cpuTimeGuestNiceMs: "cpu_time_guest_nice_ms",
        cpuTimeIdleMs: "cpu_time_idle_ms",
        cpuTimeIowaitMs: "cpu_time_iowait_ms",
        cpuTimeIrqMs: "cpu_time_irq_ms",
        cpuTimeNiceMs: "cpu_time_nice_ms",
        cpuTimeSoftirqMs: "cpu_time_softirq_ms",
        cpuTimeStealMs: "cpu_time_steal_ms",
        cpuTimeSystemMs: "cpu_time_system_ms",
        cpuTimeUserMs: "cpu_time_user_ms",
        dhcpLeases: "dhcp_leases",
        disks: "disks",
        haState: "ha_state",
        haValue: "ha_value",
        interfaces: "interfaces",
        ioPressureFull_10s: "io_pressure_full_10s",
        ioPressureFull_300s: "io_pressure_full_300s",
        ioPressureFull_60s: "io_pressure_full_60s",
        ioPressureFullTotalUs: "io_pressure_full_total_us",
        ioPressureSome_10s: "io_pressure_some_10s",
        ioPressureSome_300s: "io_pressure_some_300s",
        ioPressureSome_60s: "io_pressure_some_60s",
        ioPressureSomeTotalUs: "io_pressure_some_total_us",
        kernelBtime: "kernel_btime",
        kernelCtxt: "kernel_ctxt",
        kernelProcesses: "kernel_processes",
        kernelProcessesBlocked: "kernel_processes_blocked",
        kernelProcessesRunning: "kernel_processes_running",
        loadAverage_15m: "load_average_15m",
        loadAverage_1m: "load_average_1m",
        loadAverage_5m: "load_average_5m",
        loadAverageCur: "load_average_cur",
        loadAverageMax: "load_average_max",
        memoryActiveBytes: "memory_active_bytes",
        memoryAnonHugepagesBytes: "memory_anon_hugepages_bytes",
        memoryAnonPagesBytes: "memory_anon_pages_bytes",
        memoryAvailableBytes: "memory_available_bytes",
        memoryBounceBytes: "memory_bounce_bytes",
        memoryBuffersBytes: "memory_buffers_bytes",
        memoryCachedBytes: "memory_cached_bytes",
        memoryCmaFreeBytes: "memory_cma_free_bytes",
        memoryCmaTotalBytes: "memory_cma_total_bytes",
        memoryCommitLimitBytes: "memory_commit_limit_bytes",
        memoryCommittedAsBytes: "memory_committed_as_bytes",
        memoryDirtyBytes: "memory_dirty_bytes",
        memoryFreeBytes: "memory_free_bytes",
        memoryHighFreeBytes: "memory_high_free_bytes",
        memoryHighTotalBytes: "memory_high_total_bytes",
        memoryHugepagesFree: "memory_hugepages_free",
        memoryHugepagesRsvd: "memory_hugepages_rsvd",
        memoryHugepagesSurp: "memory_hugepages_surp",
        memoryHugepagesTotal: "memory_hugepages_total",
        memoryHugepagesizeBytes: "memory_hugepagesize_bytes",
        memoryInactiveBytes: "memory_inactive_bytes",
        memoryKReclaimableBytes: "memory_k_reclaimable_bytes",
        memoryKernelStackBytes: "memory_kernel_stack_bytes",
        memoryLowFreeBytes: "memory_low_free_bytes",
        memoryLowTotalBytes: "memory_low_total_bytes",
        memoryMappedBytes: "memory_mapped_bytes",
        memoryPageTablesBytes: "memory_page_tables_bytes",
        memoryPerCpuBytes: "memory_per_cpu_bytes",
        memoryPressureFull_10s: "memory_pressure_full_10s",
        memoryPressureFull_300s: "memory_pressure_full_300s",
        memoryPressureFull_60s: "memory_pressure_full_60s",
        memoryPressureFullTotalUs: "memory_pressure_full_total_us",
        memoryPressureSome_10s: "memory_pressure_some_10s",
        memoryPressureSome_300s: "memory_pressure_some_300s",
        memoryPressureSome_60s: "memory_pressure_some_60s",
        memoryPressureSomeTotalUs: "memory_pressure_some_total_us",
        memorySReclaimableBytes: "memory_s_reclaimable_bytes",
        memorySUnreclaimBytes: "memory_s_unreclaim_bytes",
        memorySecondaryPageTablesBytes: "memory_secondary_page_tables_bytes",
        memoryShmemBytes: "memory_shmem_bytes",
        memoryShmemHugepagesBytes: "memory_shmem_hugepages_bytes",
        memoryShmemPmdMappedBytes: "memory_shmem_pmd_mapped_bytes",
        memorySlabBytes: "memory_slab_bytes",
        memorySwapCachedBytes: "memory_swap_cached_bytes",
        memorySwapFreeBytes: "memory_swap_free_bytes",
        memorySwapTotalBytes: "memory_swap_total_bytes",
        memoryTotalBytes: "memory_total_bytes",
        memoryVmallocChunkBytes: "memory_vmalloc_chunk_bytes",
        memoryVmallocTotalBytes: "memory_vmalloc_total_bytes",
        memoryVmallocUsedBytes: "memory_vmalloc_used_bytes",
        memoryWritebackBytes: "memory_writeback_bytes",
        memoryWritebackTmpBytes: "memory_writeback_tmp_bytes",
        memoryZSwapBytes: "memory_z_swap_bytes",
        memoryZSwappedBytes: "memory_z_swapped_bytes",
        mounts: "mounts",
        netdevs: "netdevs",
        snmpIcmpInAddrMaskReps: "snmp_icmp_in_addr_mask_reps",
        snmpIcmpInAddrMasks: "snmp_icmp_in_addr_masks",
        snmpIcmpInCsumErrors: "snmp_icmp_in_csum_errors",
        snmpIcmpInDestUnreachs: "snmp_icmp_in_dest_unreachs",
        snmpIcmpInEchoReps: "snmp_icmp_in_echo_reps",
        snmpIcmpInEchos: "snmp_icmp_in_echos",
        snmpIcmpInErrors: "snmp_icmp_in_errors",
        snmpIcmpInMsgs: "snmp_icmp_in_msgs",
        snmpIcmpInParmProbs: "snmp_icmp_in_parm_probs",
        snmpIcmpInRedirects: "snmp_icmp_in_redirects",
        snmpIcmpInSrcQuenchs: "snmp_icmp_in_src_quenchs",
        snmpIcmpInTimeExcds: "snmp_icmp_in_time_excds",
        snmpIcmpInTimestampReps: "snmp_icmp_in_timestamp_reps",
        snmpIcmpInTimestamps: "snmp_icmp_in_timestamps",
        snmpIcmpOutAddrMaskReps: "snmp_icmp_out_addr_mask_reps",
        snmpIcmpOutAddrMasks: "snmp_icmp_out_addr_masks",
        snmpIcmpOutDestUnreachs: "snmp_icmp_out_dest_unreachs",
        snmpIcmpOutEchoReps: "snmp_icmp_out_echo_reps",
        snmpIcmpOutEchos: "snmp_icmp_out_echos",
        snmpIcmpOutErrors: "snmp_icmp_out_errors",
        snmpIcmpOutMsgs: "snmp_icmp_out_msgs",
        snmpIcmpOutParmProbs: "snmp_icmp_out_parm_probs",
        snmpIcmpOutRedirects: "snmp_icmp_out_redirects",
        snmpIcmpOutSrcQuenchs: "snmp_icmp_out_src_quenchs",
        snmpIcmpOutTimeExcds: "snmp_icmp_out_time_excds",
        snmpIcmpOutTimestampReps: "snmp_icmp_out_timestamp_reps",
        snmpIcmpOutTimestamps: "snmp_icmp_out_timestamps",
        snmpIpDefaultTtl: "snmp_ip_default_ttl",
        snmpIpForwDatagrams: "snmp_ip_forw_datagrams",
        snmpIpForwardingEnabled: "snmp_ip_forwarding_enabled",
        snmpIpFragCreates: "snmp_ip_frag_creates",
        snmpIpFragFails: "snmp_ip_frag_fails",
        snmpIpFragOks: "snmp_ip_frag_oks",
        snmpIpInAddrErrors: "snmp_ip_in_addr_errors",
        snmpIpInDelivers: "snmp_ip_in_delivers",
        snmpIpInDiscards: "snmp_ip_in_discards",
        snmpIpInHdrErrors: "snmp_ip_in_hdr_errors",
        snmpIpInReceives: "snmp_ip_in_receives",
        snmpIpInUnknownProtos: "snmp_ip_in_unknown_protos",
        snmpIpOutDiscards: "snmp_ip_out_discards",
        snmpIpOutNoRoutes: "snmp_ip_out_no_routes",
        snmpIpOutRequests: "snmp_ip_out_requests",
        snmpIpReasmFails: "snmp_ip_reasm_fails",
        snmpIpReasmOks: "snmp_ip_reasm_oks",
        snmpIpReasmReqds: "snmp_ip_reasm_reqds",
        snmpIpReasmTimeout: "snmp_ip_reasm_timeout",
        snmpTcpActiveOpens: "snmp_tcp_active_opens",
        snmpTcpAttemptFails: "snmp_tcp_attempt_fails",
        snmpTcpCurrEstab: "snmp_tcp_curr_estab",
        snmpTcpEstabResets: "snmp_tcp_estab_resets",
        snmpTcpInCsumErrors: "snmp_tcp_in_csum_errors",
        snmpTcpInErrs: "snmp_tcp_in_errs",
        snmpTcpInSegs: "snmp_tcp_in_segs",
        snmpTcpMaxConn: "snmp_tcp_max_conn",
        snmpTcpOutRsts: "snmp_tcp_out_rsts",
        snmpTcpOutSegs: "snmp_tcp_out_segs",
        snmpTcpPassiveOpens: "snmp_tcp_passive_opens",
        snmpTcpRetransSegs: "snmp_tcp_retrans_segs",
        snmpTcpRtoMax: "snmp_tcp_rto_max",
        snmpTcpRtoMin: "snmp_tcp_rto_min",
        snmpUdpInDatagrams: "snmp_udp_in_datagrams",
        snmpUdpInErrors: "snmp_udp_in_errors",
        snmpUdpNoPorts: "snmp_udp_no_ports",
        snmpUdpOutDatagrams: "snmp_udp_out_datagrams",
        systemBootTimeS: "system_boot_time_s",
        thermals: "thermals",
        tunnels: "tunnels",
        uptimeIdleMs: "uptime_idle_ms",
        uptimeTotalMs: "uptime_total_ms",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetConnectorSnapshotResponse>;

export type GetConnectorSnapshotError = DefaultErrors;

export const getConnectorSnapshot: API.OperationMethod<
  GetConnectorSnapshotRequest,
  GetConnectorSnapshotResponse,
  GetConnectorSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConnectorSnapshotRequest,
  output: GetConnectorSnapshotResponse,
  errors: [],
}));

export interface ListConnectorSnapshotsRequest {
  connectorId: string;
  /** Path param: Account identifier */
  accountId: string;
  /** Query param: */
  from: number;
  /** Query param: */
  to: number;
  /** Query param: */
  cursor?: string;
  /** Query param: */
  limit?: number;
}

export const ListConnectorSnapshotsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    from: Schema.Number.pipe(T.HttpQuery("from")),
    to: Schema.Number.pipe(T.HttpQuery("to")),
    cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
    limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/magic/connectors/{connectorId}/telemetry/snapshots",
    }),
  ) as unknown as Schema.Schema<ListConnectorSnapshotsRequest>;

export interface ListConnectorSnapshotsResponse {
  count: number;
  items: { a: number; t: number }[];
  cursor?: string | null;
}

export const ListConnectorSnapshotsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    count: Schema.Number,
    items: Schema.Array(
      Schema.Struct({
        a: Schema.Number,
        t: Schema.Number,
      }),
    ),
    cursor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ListConnectorSnapshotsResponse>;

export type ListConnectorSnapshotsError = DefaultErrors;

export const listConnectorSnapshots: API.OperationMethod<
  ListConnectorSnapshotsRequest,
  ListConnectorSnapshotsResponse,
  ListConnectorSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListConnectorSnapshotsRequest,
  output: ListConnectorSnapshotsResponse,
  errors: [],
}));

// =============================================================================
// ConnectorSnapshotLatest
// =============================================================================

export interface ListConnectorSnapshotLatestsRequest {
  connectorId: string;
  /** Account identifier */
  accountId: string;
}

export const ListConnectorSnapshotLatestsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/magic/connectors/{connectorId}/telemetry/snapshots/latest",
    }),
  ) as unknown as Schema.Schema<ListConnectorSnapshotLatestsRequest>;

export interface ListConnectorSnapshotLatestsResponse {
  count: number;
  items: {
    countReclaimFailures: number;
    countReclaimedPaths: number;
    countRecordFailed: number;
    countTransmitFailures: number;
    t: number;
    v: string;
    bonds?: { name: string; status: string }[] | null;
    cpuCount?: number | null;
    cpuPressure_10s?: number | null;
    cpuPressure_300s?: number | null;
    cpuPressure_60s?: number | null;
    cpuPressureTotalUs?: number | null;
    cpuTimeGuestMs?: number | null;
    cpuTimeGuestNiceMs?: number | null;
    cpuTimeIdleMs?: number | null;
    cpuTimeIowaitMs?: number | null;
    cpuTimeIrqMs?: number | null;
    cpuTimeNiceMs?: number | null;
    cpuTimeSoftirqMs?: number | null;
    cpuTimeStealMs?: number | null;
    cpuTimeSystemMs?: number | null;
    cpuTimeUserMs?: number | null;
    dhcpLeases?:
      | {
          clientId: string;
          expiryTime: number;
          hostname: string;
          interfaceName: string;
          ipAddress: string;
          macAddress: string;
          connectorId?: string | null;
        }[]
      | null;
    disks?:
      | {
          inProgress: number;
          major: number;
          merged: number;
          minor: number;
          name: string;
          reads: number;
          sectorsRead: number;
          sectorsWritten: number;
          timeInProgressMs: number;
          timeReadingMs: number;
          timeWritingMs: number;
          weightedTimeInProgressMs: number;
          writes: number;
          writesMerged: number;
          connectorId?: string | null;
          discards?: number | null;
          discardsMerged?: number | null;
          flushes?: number | null;
          sectorsDiscarded?: number | null;
          timeDiscardingMs?: number | null;
          timeFlushingMs?: number | null;
        }[]
      | null;
    haState?: string | null;
    haValue?: number | null;
    interfaces?:
      | {
          name: string;
          operstate: string;
          connectorId?: string | null;
          ipAddresses?:
            | {
                interfaceName: string;
                ipAddress: string;
                connectorId?: string | null;
              }[]
            | null;
          speed?: number | null;
        }[]
      | null;
    ioPressureFull_10s?: number | null;
    ioPressureFull_300s?: number | null;
    ioPressureFull_60s?: number | null;
    ioPressureFullTotalUs?: number | null;
    ioPressureSome_10s?: number | null;
    ioPressureSome_300s?: number | null;
    ioPressureSome_60s?: number | null;
    ioPressureSomeTotalUs?: number | null;
    kernelBtime?: number | null;
    kernelCtxt?: number | null;
    kernelProcesses?: number | null;
    kernelProcessesBlocked?: number | null;
    kernelProcessesRunning?: number | null;
    loadAverage_15m?: number | null;
    loadAverage_1m?: number | null;
    loadAverage_5m?: number | null;
    loadAverageCur?: number | null;
    loadAverageMax?: number | null;
    memoryActiveBytes?: number | null;
    memoryAnonHugepagesBytes?: number | null;
    memoryAnonPagesBytes?: number | null;
    memoryAvailableBytes?: number | null;
    memoryBounceBytes?: number | null;
    memoryBuffersBytes?: number | null;
    memoryCachedBytes?: number | null;
    memoryCmaFreeBytes?: number | null;
    memoryCmaTotalBytes?: number | null;
    memoryCommitLimitBytes?: number | null;
    memoryCommittedAsBytes?: number | null;
    memoryDirtyBytes?: number | null;
    memoryFreeBytes?: number | null;
    memoryHighFreeBytes?: number | null;
    memoryHighTotalBytes?: number | null;
    memoryHugepagesFree?: number | null;
    memoryHugepagesRsvd?: number | null;
    memoryHugepagesSurp?: number | null;
    memoryHugepagesTotal?: number | null;
    memoryHugepagesizeBytes?: number | null;
    memoryInactiveBytes?: number | null;
    memoryKReclaimableBytes?: number | null;
    memoryKernelStackBytes?: number | null;
    memoryLowFreeBytes?: number | null;
    memoryLowTotalBytes?: number | null;
    memoryMappedBytes?: number | null;
    memoryPageTablesBytes?: number | null;
    memoryPerCpuBytes?: number | null;
    memoryPressureFull_10s?: number | null;
    memoryPressureFull_300s?: number | null;
    memoryPressureFull_60s?: number | null;
    memoryPressureFullTotalUs?: number | null;
    memoryPressureSome_10s?: number | null;
    memoryPressureSome_300s?: number | null;
    memoryPressureSome_60s?: number | null;
    memoryPressureSomeTotalUs?: number | null;
    memorySReclaimableBytes?: number | null;
    memorySUnreclaimBytes?: number | null;
    memorySecondaryPageTablesBytes?: number | null;
    memoryShmemBytes?: number | null;
    memoryShmemHugepagesBytes?: number | null;
    memoryShmemPmdMappedBytes?: number | null;
    memorySlabBytes?: number | null;
    memorySwapCachedBytes?: number | null;
    memorySwapFreeBytes?: number | null;
    memorySwapTotalBytes?: number | null;
    memoryTotalBytes?: number | null;
    memoryVmallocChunkBytes?: number | null;
    memoryVmallocTotalBytes?: number | null;
    memoryVmallocUsedBytes?: number | null;
    memoryWritebackBytes?: number | null;
    memoryWritebackTmpBytes?: number | null;
    memoryZSwapBytes?: number | null;
    memoryZSwappedBytes?: number | null;
    mounts?:
      | {
          fileSystem: string;
          kind: string;
          mountPoint: string;
          name: string;
          availableBytes?: number | null;
          connectorId?: string | null;
          isReadOnly?: boolean | null;
          isRemovable?: boolean | null;
          totalBytes?: number | null;
        }[]
      | null;
    netdevs?:
      | {
          name: string;
          recvBytes: number;
          recvCompressed: number;
          recvDrop: number;
          recvErrs: number;
          recvFifo: number;
          recvFrame: number;
          recvMulticast: number;
          recvPackets: number;
          sentBytes: number;
          sentCarrier: number;
          sentColls: number;
          sentCompressed: number;
          sentDrop: number;
          sentErrs: number;
          sentFifo: number;
          sentPackets: number;
          connectorId?: string | null;
        }[]
      | null;
    snmpIcmpInAddrMaskReps?: number | null;
    snmpIcmpInAddrMasks?: number | null;
    snmpIcmpInCsumErrors?: number | null;
    snmpIcmpInDestUnreachs?: number | null;
    snmpIcmpInEchoReps?: number | null;
    snmpIcmpInEchos?: number | null;
    snmpIcmpInErrors?: number | null;
    snmpIcmpInMsgs?: number | null;
    snmpIcmpInParmProbs?: number | null;
    snmpIcmpInRedirects?: number | null;
    snmpIcmpInSrcQuenchs?: number | null;
    snmpIcmpInTimeExcds?: number | null;
    snmpIcmpInTimestampReps?: number | null;
    snmpIcmpInTimestamps?: number | null;
    snmpIcmpOutAddrMaskReps?: number | null;
    snmpIcmpOutAddrMasks?: number | null;
    snmpIcmpOutDestUnreachs?: number | null;
    snmpIcmpOutEchoReps?: number | null;
    snmpIcmpOutEchos?: number | null;
    snmpIcmpOutErrors?: number | null;
    snmpIcmpOutMsgs?: number | null;
    snmpIcmpOutParmProbs?: number | null;
    snmpIcmpOutRedirects?: number | null;
    snmpIcmpOutSrcQuenchs?: number | null;
    snmpIcmpOutTimeExcds?: number | null;
    snmpIcmpOutTimestampReps?: number | null;
    snmpIcmpOutTimestamps?: number | null;
    snmpIpDefaultTtl?: number | null;
    snmpIpForwDatagrams?: number | null;
    snmpIpForwardingEnabled?: boolean | null;
    snmpIpFragCreates?: number | null;
    snmpIpFragFails?: number | null;
    snmpIpFragOks?: number | null;
    snmpIpInAddrErrors?: number | null;
    snmpIpInDelivers?: number | null;
    snmpIpInDiscards?: number | null;
    snmpIpInHdrErrors?: number | null;
    snmpIpInReceives?: number | null;
    snmpIpInUnknownProtos?: number | null;
    snmpIpOutDiscards?: number | null;
    snmpIpOutNoRoutes?: number | null;
    snmpIpOutRequests?: number | null;
    snmpIpReasmFails?: number | null;
    snmpIpReasmOks?: number | null;
    snmpIpReasmReqds?: number | null;
    snmpIpReasmTimeout?: number | null;
    snmpTcpActiveOpens?: number | null;
    snmpTcpAttemptFails?: number | null;
    snmpTcpCurrEstab?: number | null;
    snmpTcpEstabResets?: number | null;
    snmpTcpInCsumErrors?: number | null;
    snmpTcpInErrs?: number | null;
    snmpTcpInSegs?: number | null;
    snmpTcpMaxConn?: number | null;
    snmpTcpOutRsts?: number | null;
    snmpTcpOutSegs?: number | null;
    snmpTcpPassiveOpens?: number | null;
    snmpTcpRetransSegs?: number | null;
    snmpTcpRtoMax?: number | null;
    snmpTcpRtoMin?: number | null;
    snmpUdpInDatagrams?: number | null;
    snmpUdpInErrors?: number | null;
    snmpUdpNoPorts?: number | null;
    snmpUdpOutDatagrams?: number | null;
    systemBootTimeS?: number | null;
    thermals?:
      | {
          label: string;
          connectorId?: string | null;
          criticalCelcius?: number | null;
          currentCelcius?: number | null;
          maxCelcius?: number | null;
        }[]
      | null;
    tunnels?:
      | {
          healthState: string;
          healthValue: number;
          interfaceName: string;
          tunnelId: string;
          connectorId?: string | null;
          probedMtu?: number | null;
        }[]
      | null;
    uptimeIdleMs?: number | null;
    uptimeTotalMs?: number | null;
  }[];
}

export const ListConnectorSnapshotLatestsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    count: Schema.Number,
    items: Schema.Array(
      Schema.Struct({
        countReclaimFailures: Schema.Number,
        countReclaimedPaths: Schema.Number,
        countRecordFailed: Schema.Number,
        countTransmitFailures: Schema.Number,
        t: Schema.Number,
        v: Schema.String,
        bonds: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                name: Schema.String,
                status: Schema.String,
              }),
            ),
            Schema.Null,
          ]),
        ),
        cpuCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        cpuPressure_10s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuPressure_300s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuPressure_60s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuPressureTotalUs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeGuestMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeGuestNiceMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeIdleMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeIowaitMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeIrqMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeNiceMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeSoftirqMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeStealMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeSystemMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        cpuTimeUserMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        dhcpLeases: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                clientId: Schema.String,
                expiryTime: Schema.Number,
                hostname: Schema.String,
                interfaceName: Schema.String,
                ipAddress: Schema.String,
                macAddress: Schema.String,
                connectorId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  clientId: "client_id",
                  expiryTime: "expiry_time",
                  hostname: "hostname",
                  interfaceName: "interface_name",
                  ipAddress: "ip_address",
                  macAddress: "mac_address",
                  connectorId: "connector_id",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        disks: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                inProgress: Schema.Number,
                major: Schema.Number,
                merged: Schema.Number,
                minor: Schema.Number,
                name: Schema.String,
                reads: Schema.Number,
                sectorsRead: Schema.Number,
                sectorsWritten: Schema.Number,
                timeInProgressMs: Schema.Number,
                timeReadingMs: Schema.Number,
                timeWritingMs: Schema.Number,
                weightedTimeInProgressMs: Schema.Number,
                writes: Schema.Number,
                writesMerged: Schema.Number,
                connectorId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                discards: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                discardsMerged: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                flushes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                sectorsDiscarded: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                timeDiscardingMs: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                timeFlushingMs: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  inProgress: "in_progress",
                  major: "major",
                  merged: "merged",
                  minor: "minor",
                  name: "name",
                  reads: "reads",
                  sectorsRead: "sectors_read",
                  sectorsWritten: "sectors_written",
                  timeInProgressMs: "time_in_progress_ms",
                  timeReadingMs: "time_reading_ms",
                  timeWritingMs: "time_writing_ms",
                  weightedTimeInProgressMs: "weighted_time_in_progress_ms",
                  writes: "writes",
                  writesMerged: "writes_merged",
                  connectorId: "connector_id",
                  discards: "discards",
                  discardsMerged: "discards_merged",
                  flushes: "flushes",
                  sectorsDiscarded: "sectors_discarded",
                  timeDiscardingMs: "time_discarding_ms",
                  timeFlushingMs: "time_flushing_ms",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        haState: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        haValue: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        interfaces: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                name: Schema.String,
                operstate: Schema.String,
                connectorId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                ipAddresses: Schema.optional(
                  Schema.Union([
                    Schema.Array(
                      Schema.Struct({
                        interfaceName: Schema.String,
                        ipAddress: Schema.String,
                        connectorId: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }).pipe(
                        Schema.encodeKeys({
                          interfaceName: "interface_name",
                          ipAddress: "ip_address",
                          connectorId: "connector_id",
                        }),
                      ),
                    ),
                    Schema.Null,
                  ]),
                ),
                speed: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  operstate: "operstate",
                  connectorId: "connector_id",
                  ipAddresses: "ip_addresses",
                  speed: "speed",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        ioPressureFull_10s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        ioPressureFull_300s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        ioPressureFull_60s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        ioPressureFullTotalUs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        ioPressureSome_10s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        ioPressureSome_300s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        ioPressureSome_60s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        ioPressureSomeTotalUs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        kernelBtime: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        kernelCtxt: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        kernelProcesses: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        kernelProcessesBlocked: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        kernelProcessesRunning: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        loadAverage_15m: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        loadAverage_1m: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        loadAverage_5m: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        loadAverageCur: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        loadAverageMax: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryActiveBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryAnonHugepagesBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryAnonPagesBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryAvailableBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryBounceBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryBuffersBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryCachedBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryCmaFreeBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryCmaTotalBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryCommitLimitBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryCommittedAsBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryDirtyBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryFreeBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryHighFreeBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryHighTotalBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryHugepagesFree: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryHugepagesRsvd: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryHugepagesSurp: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryHugepagesTotal: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryHugepagesizeBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryInactiveBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryKReclaimableBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryKernelStackBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryLowFreeBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryLowTotalBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryMappedBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPageTablesBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPerCpuBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPressureFull_10s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPressureFull_300s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPressureFull_60s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPressureFullTotalUs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPressureSome_10s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPressureSome_300s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPressureSome_60s: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryPressureSomeTotalUs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memorySReclaimableBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memorySUnreclaimBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memorySecondaryPageTablesBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryShmemBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryShmemHugepagesBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryShmemPmdMappedBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memorySlabBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memorySwapCachedBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memorySwapFreeBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memorySwapTotalBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryTotalBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryVmallocChunkBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryVmallocTotalBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryVmallocUsedBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryWritebackBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryWritebackTmpBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryZSwapBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        memoryZSwappedBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        mounts: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                fileSystem: Schema.String,
                kind: Schema.String,
                mountPoint: Schema.String,
                name: Schema.String,
                availableBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                connectorId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                isReadOnly: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                isRemovable: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                totalBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  fileSystem: "file_system",
                  kind: "kind",
                  mountPoint: "mount_point",
                  name: "name",
                  availableBytes: "available_bytes",
                  connectorId: "connector_id",
                  isReadOnly: "is_read_only",
                  isRemovable: "is_removable",
                  totalBytes: "total_bytes",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        netdevs: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                name: Schema.String,
                recvBytes: Schema.Number,
                recvCompressed: Schema.Number,
                recvDrop: Schema.Number,
                recvErrs: Schema.Number,
                recvFifo: Schema.Number,
                recvFrame: Schema.Number,
                recvMulticast: Schema.Number,
                recvPackets: Schema.Number,
                sentBytes: Schema.Number,
                sentCarrier: Schema.Number,
                sentColls: Schema.Number,
                sentCompressed: Schema.Number,
                sentDrop: Schema.Number,
                sentErrs: Schema.Number,
                sentFifo: Schema.Number,
                sentPackets: Schema.Number,
                connectorId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  recvBytes: "recv_bytes",
                  recvCompressed: "recv_compressed",
                  recvDrop: "recv_drop",
                  recvErrs: "recv_errs",
                  recvFifo: "recv_fifo",
                  recvFrame: "recv_frame",
                  recvMulticast: "recv_multicast",
                  recvPackets: "recv_packets",
                  sentBytes: "sent_bytes",
                  sentCarrier: "sent_carrier",
                  sentColls: "sent_colls",
                  sentCompressed: "sent_compressed",
                  sentDrop: "sent_drop",
                  sentErrs: "sent_errs",
                  sentFifo: "sent_fifo",
                  sentPackets: "sent_packets",
                  connectorId: "connector_id",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        snmpIcmpInAddrMaskReps: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInAddrMasks: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInCsumErrors: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInDestUnreachs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInEchoReps: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInEchos: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInErrors: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInMsgs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInParmProbs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInRedirects: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInSrcQuenchs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInTimeExcds: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInTimestampReps: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpInTimestamps: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutAddrMaskReps: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutAddrMasks: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutDestUnreachs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutEchoReps: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutEchos: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutErrors: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutMsgs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutParmProbs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutRedirects: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutSrcQuenchs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutTimeExcds: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutTimestampReps: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIcmpOutTimestamps: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpDefaultTtl: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpForwDatagrams: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpForwardingEnabled: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        snmpIpFragCreates: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpFragFails: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpFragOks: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpInAddrErrors: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpInDelivers: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpInDiscards: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpInHdrErrors: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpInReceives: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpInUnknownProtos: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpOutDiscards: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpOutNoRoutes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpOutRequests: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpReasmFails: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpReasmOks: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpReasmReqds: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpIpReasmTimeout: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpActiveOpens: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpAttemptFails: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpCurrEstab: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpEstabResets: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpInCsumErrors: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpInErrs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpInSegs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpMaxConn: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpOutRsts: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpOutSegs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpPassiveOpens: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpRetransSegs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpRtoMax: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpTcpRtoMin: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpUdpInDatagrams: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpUdpInErrors: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpUdpNoPorts: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        snmpUdpOutDatagrams: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        systemBootTimeS: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        thermals: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                label: Schema.String,
                connectorId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                criticalCelcius: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                currentCelcius: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                maxCelcius: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  label: "label",
                  connectorId: "connector_id",
                  criticalCelcius: "critical_celcius",
                  currentCelcius: "current_celcius",
                  maxCelcius: "max_celcius",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        tunnels: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                healthState: Schema.String,
                healthValue: Schema.Number,
                interfaceName: Schema.String,
                tunnelId: Schema.String,
                connectorId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                probedMtu: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  healthState: "health_state",
                  healthValue: "health_value",
                  interfaceName: "interface_name",
                  tunnelId: "tunnel_id",
                  connectorId: "connector_id",
                  probedMtu: "probed_mtu",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        uptimeIdleMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        uptimeTotalMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          countReclaimFailures: "count_reclaim_failures",
          countReclaimedPaths: "count_reclaimed_paths",
          countRecordFailed: "count_record_failed",
          countTransmitFailures: "count_transmit_failures",
          t: "t",
          v: "v",
          bonds: "bonds",
          cpuCount: "cpu_count",
          cpuPressure_10s: "cpu_pressure_10s",
          cpuPressure_300s: "cpu_pressure_300s",
          cpuPressure_60s: "cpu_pressure_60s",
          cpuPressureTotalUs: "cpu_pressure_total_us",
          cpuTimeGuestMs: "cpu_time_guest_ms",
          cpuTimeGuestNiceMs: "cpu_time_guest_nice_ms",
          cpuTimeIdleMs: "cpu_time_idle_ms",
          cpuTimeIowaitMs: "cpu_time_iowait_ms",
          cpuTimeIrqMs: "cpu_time_irq_ms",
          cpuTimeNiceMs: "cpu_time_nice_ms",
          cpuTimeSoftirqMs: "cpu_time_softirq_ms",
          cpuTimeStealMs: "cpu_time_steal_ms",
          cpuTimeSystemMs: "cpu_time_system_ms",
          cpuTimeUserMs: "cpu_time_user_ms",
          dhcpLeases: "dhcp_leases",
          disks: "disks",
          haState: "ha_state",
          haValue: "ha_value",
          interfaces: "interfaces",
          ioPressureFull_10s: "io_pressure_full_10s",
          ioPressureFull_300s: "io_pressure_full_300s",
          ioPressureFull_60s: "io_pressure_full_60s",
          ioPressureFullTotalUs: "io_pressure_full_total_us",
          ioPressureSome_10s: "io_pressure_some_10s",
          ioPressureSome_300s: "io_pressure_some_300s",
          ioPressureSome_60s: "io_pressure_some_60s",
          ioPressureSomeTotalUs: "io_pressure_some_total_us",
          kernelBtime: "kernel_btime",
          kernelCtxt: "kernel_ctxt",
          kernelProcesses: "kernel_processes",
          kernelProcessesBlocked: "kernel_processes_blocked",
          kernelProcessesRunning: "kernel_processes_running",
          loadAverage_15m: "load_average_15m",
          loadAverage_1m: "load_average_1m",
          loadAverage_5m: "load_average_5m",
          loadAverageCur: "load_average_cur",
          loadAverageMax: "load_average_max",
          memoryActiveBytes: "memory_active_bytes",
          memoryAnonHugepagesBytes: "memory_anon_hugepages_bytes",
          memoryAnonPagesBytes: "memory_anon_pages_bytes",
          memoryAvailableBytes: "memory_available_bytes",
          memoryBounceBytes: "memory_bounce_bytes",
          memoryBuffersBytes: "memory_buffers_bytes",
          memoryCachedBytes: "memory_cached_bytes",
          memoryCmaFreeBytes: "memory_cma_free_bytes",
          memoryCmaTotalBytes: "memory_cma_total_bytes",
          memoryCommitLimitBytes: "memory_commit_limit_bytes",
          memoryCommittedAsBytes: "memory_committed_as_bytes",
          memoryDirtyBytes: "memory_dirty_bytes",
          memoryFreeBytes: "memory_free_bytes",
          memoryHighFreeBytes: "memory_high_free_bytes",
          memoryHighTotalBytes: "memory_high_total_bytes",
          memoryHugepagesFree: "memory_hugepages_free",
          memoryHugepagesRsvd: "memory_hugepages_rsvd",
          memoryHugepagesSurp: "memory_hugepages_surp",
          memoryHugepagesTotal: "memory_hugepages_total",
          memoryHugepagesizeBytes: "memory_hugepagesize_bytes",
          memoryInactiveBytes: "memory_inactive_bytes",
          memoryKReclaimableBytes: "memory_k_reclaimable_bytes",
          memoryKernelStackBytes: "memory_kernel_stack_bytes",
          memoryLowFreeBytes: "memory_low_free_bytes",
          memoryLowTotalBytes: "memory_low_total_bytes",
          memoryMappedBytes: "memory_mapped_bytes",
          memoryPageTablesBytes: "memory_page_tables_bytes",
          memoryPerCpuBytes: "memory_per_cpu_bytes",
          memoryPressureFull_10s: "memory_pressure_full_10s",
          memoryPressureFull_300s: "memory_pressure_full_300s",
          memoryPressureFull_60s: "memory_pressure_full_60s",
          memoryPressureFullTotalUs: "memory_pressure_full_total_us",
          memoryPressureSome_10s: "memory_pressure_some_10s",
          memoryPressureSome_300s: "memory_pressure_some_300s",
          memoryPressureSome_60s: "memory_pressure_some_60s",
          memoryPressureSomeTotalUs: "memory_pressure_some_total_us",
          memorySReclaimableBytes: "memory_s_reclaimable_bytes",
          memorySUnreclaimBytes: "memory_s_unreclaim_bytes",
          memorySecondaryPageTablesBytes: "memory_secondary_page_tables_bytes",
          memoryShmemBytes: "memory_shmem_bytes",
          memoryShmemHugepagesBytes: "memory_shmem_hugepages_bytes",
          memoryShmemPmdMappedBytes: "memory_shmem_pmd_mapped_bytes",
          memorySlabBytes: "memory_slab_bytes",
          memorySwapCachedBytes: "memory_swap_cached_bytes",
          memorySwapFreeBytes: "memory_swap_free_bytes",
          memorySwapTotalBytes: "memory_swap_total_bytes",
          memoryTotalBytes: "memory_total_bytes",
          memoryVmallocChunkBytes: "memory_vmalloc_chunk_bytes",
          memoryVmallocTotalBytes: "memory_vmalloc_total_bytes",
          memoryVmallocUsedBytes: "memory_vmalloc_used_bytes",
          memoryWritebackBytes: "memory_writeback_bytes",
          memoryWritebackTmpBytes: "memory_writeback_tmp_bytes",
          memoryZSwapBytes: "memory_z_swap_bytes",
          memoryZSwappedBytes: "memory_z_swapped_bytes",
          mounts: "mounts",
          netdevs: "netdevs",
          snmpIcmpInAddrMaskReps: "snmp_icmp_in_addr_mask_reps",
          snmpIcmpInAddrMasks: "snmp_icmp_in_addr_masks",
          snmpIcmpInCsumErrors: "snmp_icmp_in_csum_errors",
          snmpIcmpInDestUnreachs: "snmp_icmp_in_dest_unreachs",
          snmpIcmpInEchoReps: "snmp_icmp_in_echo_reps",
          snmpIcmpInEchos: "snmp_icmp_in_echos",
          snmpIcmpInErrors: "snmp_icmp_in_errors",
          snmpIcmpInMsgs: "snmp_icmp_in_msgs",
          snmpIcmpInParmProbs: "snmp_icmp_in_parm_probs",
          snmpIcmpInRedirects: "snmp_icmp_in_redirects",
          snmpIcmpInSrcQuenchs: "snmp_icmp_in_src_quenchs",
          snmpIcmpInTimeExcds: "snmp_icmp_in_time_excds",
          snmpIcmpInTimestampReps: "snmp_icmp_in_timestamp_reps",
          snmpIcmpInTimestamps: "snmp_icmp_in_timestamps",
          snmpIcmpOutAddrMaskReps: "snmp_icmp_out_addr_mask_reps",
          snmpIcmpOutAddrMasks: "snmp_icmp_out_addr_masks",
          snmpIcmpOutDestUnreachs: "snmp_icmp_out_dest_unreachs",
          snmpIcmpOutEchoReps: "snmp_icmp_out_echo_reps",
          snmpIcmpOutEchos: "snmp_icmp_out_echos",
          snmpIcmpOutErrors: "snmp_icmp_out_errors",
          snmpIcmpOutMsgs: "snmp_icmp_out_msgs",
          snmpIcmpOutParmProbs: "snmp_icmp_out_parm_probs",
          snmpIcmpOutRedirects: "snmp_icmp_out_redirects",
          snmpIcmpOutSrcQuenchs: "snmp_icmp_out_src_quenchs",
          snmpIcmpOutTimeExcds: "snmp_icmp_out_time_excds",
          snmpIcmpOutTimestampReps: "snmp_icmp_out_timestamp_reps",
          snmpIcmpOutTimestamps: "snmp_icmp_out_timestamps",
          snmpIpDefaultTtl: "snmp_ip_default_ttl",
          snmpIpForwDatagrams: "snmp_ip_forw_datagrams",
          snmpIpForwardingEnabled: "snmp_ip_forwarding_enabled",
          snmpIpFragCreates: "snmp_ip_frag_creates",
          snmpIpFragFails: "snmp_ip_frag_fails",
          snmpIpFragOks: "snmp_ip_frag_oks",
          snmpIpInAddrErrors: "snmp_ip_in_addr_errors",
          snmpIpInDelivers: "snmp_ip_in_delivers",
          snmpIpInDiscards: "snmp_ip_in_discards",
          snmpIpInHdrErrors: "snmp_ip_in_hdr_errors",
          snmpIpInReceives: "snmp_ip_in_receives",
          snmpIpInUnknownProtos: "snmp_ip_in_unknown_protos",
          snmpIpOutDiscards: "snmp_ip_out_discards",
          snmpIpOutNoRoutes: "snmp_ip_out_no_routes",
          snmpIpOutRequests: "snmp_ip_out_requests",
          snmpIpReasmFails: "snmp_ip_reasm_fails",
          snmpIpReasmOks: "snmp_ip_reasm_oks",
          snmpIpReasmReqds: "snmp_ip_reasm_reqds",
          snmpIpReasmTimeout: "snmp_ip_reasm_timeout",
          snmpTcpActiveOpens: "snmp_tcp_active_opens",
          snmpTcpAttemptFails: "snmp_tcp_attempt_fails",
          snmpTcpCurrEstab: "snmp_tcp_curr_estab",
          snmpTcpEstabResets: "snmp_tcp_estab_resets",
          snmpTcpInCsumErrors: "snmp_tcp_in_csum_errors",
          snmpTcpInErrs: "snmp_tcp_in_errs",
          snmpTcpInSegs: "snmp_tcp_in_segs",
          snmpTcpMaxConn: "snmp_tcp_max_conn",
          snmpTcpOutRsts: "snmp_tcp_out_rsts",
          snmpTcpOutSegs: "snmp_tcp_out_segs",
          snmpTcpPassiveOpens: "snmp_tcp_passive_opens",
          snmpTcpRetransSegs: "snmp_tcp_retrans_segs",
          snmpTcpRtoMax: "snmp_tcp_rto_max",
          snmpTcpRtoMin: "snmp_tcp_rto_min",
          snmpUdpInDatagrams: "snmp_udp_in_datagrams",
          snmpUdpInErrors: "snmp_udp_in_errors",
          snmpUdpNoPorts: "snmp_udp_no_ports",
          snmpUdpOutDatagrams: "snmp_udp_out_datagrams",
          systemBootTimeS: "system_boot_time_s",
          thermals: "thermals",
          tunnels: "tunnels",
          uptimeIdleMs: "uptime_idle_ms",
          uptimeTotalMs: "uptime_total_ms",
        }),
      ),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ListConnectorSnapshotLatestsResponse>;

export type ListConnectorSnapshotLatestsError = DefaultErrors;

export const listConnectorSnapshotLatests: API.OperationMethod<
  ListConnectorSnapshotLatestsRequest,
  ListConnectorSnapshotLatestsResponse,
  ListConnectorSnapshotLatestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListConnectorSnapshotLatestsRequest,
  output: ListConnectorSnapshotLatestsResponse,
  errors: [],
}));

// =============================================================================
// GenerateIpsecTunnel
// =============================================================================

export interface PskGenerateIpsecTunnelRequest {
  ipsecTunnelId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  body: unknown;
}

export const PskGenerateIpsecTunnelRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ipsecTunnelId: Schema.String.pipe(T.HttpPath("ipsecTunnelId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.Unknown.pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/magic/ipsec_tunnels/{ipsecTunnelId}/psk_generate",
    }),
  ) as unknown as Schema.Schema<PskGenerateIpsecTunnelRequest>;

export interface PskGenerateIpsecTunnelResponse {
  /** Identifier */
  ipsecTunnelId?: string | null;
  /** A randomly generated or provided string for use in the IPsec tunnel. */
  psk?: string | null;
  /** The PSK metadata that includes when the PSK was generated. */
  pskMetadata?: { lastGeneratedOn?: string | null } | null;
}

export const PskGenerateIpsecTunnelResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ipsecTunnelId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    psk: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    pskMetadata: Schema.optional(
      Schema.Union([
        Schema.Struct({
          lastGeneratedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(Schema.encodeKeys({ lastGeneratedOn: "last_generated_on" })),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        ipsecTunnelId: "ipsec_tunnel_id",
        psk: "psk",
        pskMetadata: "psk_metadata",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PskGenerateIpsecTunnelResponse>;

export type PskGenerateIpsecTunnelError = DefaultErrors;

export const pskGenerateIpsecTunnel: API.OperationMethod<
  PskGenerateIpsecTunnelRequest,
  PskGenerateIpsecTunnelResponse,
  PskGenerateIpsecTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PskGenerateIpsecTunnelRequest,
  output: PskGenerateIpsecTunnelResponse,
  errors: [],
}));

// =============================================================================
// GreTunnel
// =============================================================================

export interface GetGreTunnelRequest {
  greTunnelId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the response body will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
}

export const GetGreTunnelRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  greTunnelId: Schema.String.pipe(T.HttpPath("greTunnelId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("x-magic-new-hc-target"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/gre_tunnels/{greTunnelId}",
  }),
) as unknown as Schema.Schema<GetGreTunnelRequest>;

export interface GetGreTunnelResponse {
  greTunnel?: {
    id: string;
    cloudflareGreEndpoint: string;
    customerGreEndpoint: string;
    interfaceAddress: string;
    name: string;
    automaticReturnRouting?: boolean | null;
    bgp?: {
      customerAsn: number;
      extraPrefixes?: string[] | null;
      md5Key?: string | null;
    } | null;
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string | null;
      cfSpeakerIp?: string | null;
      cfSpeakerPort?: number | null;
      customerSpeakerIp?: string | null;
      customerSpeakerPort?: number | null;
    } | null;
    createdOn?: string | null;
    description?: string | null;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional" | null;
      enabled?: boolean | null;
      rate?: "low" | "mid" | "high" | null;
      target?: { saved?: string | null } | string | null;
      type?: "reply" | "request" | null;
    } | null;
    interfaceAddress6?: string | null;
    modifiedOn?: string | null;
    mtu?: number | null;
    ttl?: number | null;
  } | null;
}

export const GetGreTunnelResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  greTunnel: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.String,
        cloudflareGreEndpoint: Schema.String,
        customerGreEndpoint: Schema.String,
        interfaceAddress: Schema.String,
        name: Schema.String,
        automaticReturnRouting: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        bgp: Schema.optional(
          Schema.Union([
            Schema.Struct({
              customerAsn: Schema.Number,
              extraPrefixes: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              md5Key: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                customerAsn: "customer_asn",
                extraPrefixes: "extra_prefixes",
                md5Key: "md5_key",
              }),
            ),
            Schema.Null,
          ]),
        ),
        bgpStatus: Schema.optional(
          Schema.Union([
            Schema.Struct({
              state: Schema.Literals([
                "BGP_DOWN",
                "BGP_UP",
                "BGP_ESTABLISHING",
              ]),
              tcpEstablished: Schema.Boolean,
              updatedAt: Schema.String,
              bgpState: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              cfSpeakerIp: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              cfSpeakerPort: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              customerSpeakerIp: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              customerSpeakerPort: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                state: "state",
                tcpEstablished: "tcp_established",
                updatedAt: "updated_at",
                bgpState: "bgp_state",
                cfSpeakerIp: "cf_speaker_ip",
                cfSpeakerPort: "cf_speaker_port",
                customerSpeakerIp: "customer_speaker_ip",
                customerSpeakerPort: "customer_speaker_port",
              }),
            ),
            Schema.Null,
          ]),
        ),
        createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        healthCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              direction: Schema.optional(
                Schema.Union([
                  Schema.Literals(["unidirectional", "bidirectional"]),
                  Schema.Null,
                ]),
              ),
              enabled: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              rate: Schema.optional(
                Schema.Union([
                  Schema.Literals(["low", "mid", "high"]),
                  Schema.Null,
                ]),
              ),
              target: Schema.optional(
                Schema.Union([
                  Schema.Union([
                    Schema.Struct({
                      saved: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }),
                    Schema.String,
                  ]),
                  Schema.Null,
                ]),
              ),
              type: Schema.optional(
                Schema.Union([
                  Schema.Literals(["reply", "request"]),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        interfaceAddress6: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          cloudflareGreEndpoint: "cloudflare_gre_endpoint",
          customerGreEndpoint: "customer_gre_endpoint",
          interfaceAddress: "interface_address",
          name: "name",
          automaticReturnRouting: "automatic_return_routing",
          bgp: "bgp",
          bgpStatus: "bgp_status",
          createdOn: "created_on",
          description: "description",
          healthCheck: "health_check",
          interfaceAddress6: "interface_address6",
          modifiedOn: "modified_on",
          mtu: "mtu",
          ttl: "ttl",
        }),
      ),
      Schema.Null,
    ]),
  ),
})
  .pipe(Schema.encodeKeys({ greTunnel: "gre_tunnel" }))
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetGreTunnelResponse>;

export type GetGreTunnelError = DefaultErrors;

export const getGreTunnel: API.OperationMethod<
  GetGreTunnelRequest,
  GetGreTunnelResponse,
  GetGreTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetGreTunnelRequest,
  output: GetGreTunnelResponse,
  errors: [],
}));

export interface ListGreTunnelsRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the response body will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
}

export const ListGreTunnelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("x-magic-new-hc-target"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/gre_tunnels" }),
) as unknown as Schema.Schema<ListGreTunnelsRequest>;

export interface ListGreTunnelsResponse {
  greTunnels?:
    | {
        id: string;
        cloudflareGreEndpoint: string;
        customerGreEndpoint: string;
        interfaceAddress: string;
        name: string;
        automaticReturnRouting?: boolean | null;
        bgp?: {
          customerAsn: number;
          extraPrefixes?: string[] | null;
          md5Key?: string | null;
        } | null;
        bgpStatus?: {
          state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
          tcpEstablished: boolean;
          updatedAt: string;
          bgpState?: string | null;
          cfSpeakerIp?: string | null;
          cfSpeakerPort?: number | null;
          customerSpeakerIp?: string | null;
          customerSpeakerPort?: number | null;
        } | null;
        createdOn?: string | null;
        description?: string | null;
        healthCheck?: {
          direction?: "unidirectional" | "bidirectional" | null;
          enabled?: boolean | null;
          rate?: "low" | "mid" | "high" | null;
          target?: { saved?: string | null } | string | null;
          type?: "reply" | "request" | null;
        } | null;
        interfaceAddress6?: string | null;
        modifiedOn?: string | null;
        mtu?: number | null;
        ttl?: number | null;
      }[]
    | null;
}

export const ListGreTunnelsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    greTunnels: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            cloudflareGreEndpoint: Schema.String,
            customerGreEndpoint: Schema.String,
            interfaceAddress: Schema.String,
            name: Schema.String,
            automaticReturnRouting: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            bgp: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  customerAsn: Schema.Number,
                  extraPrefixes: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  md5Key: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    customerAsn: "customer_asn",
                    extraPrefixes: "extra_prefixes",
                    md5Key: "md5_key",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            bgpStatus: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  state: Schema.Literals([
                    "BGP_DOWN",
                    "BGP_UP",
                    "BGP_ESTABLISHING",
                  ]),
                  tcpEstablished: Schema.Boolean,
                  updatedAt: Schema.String,
                  bgpState: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  cfSpeakerIp: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  cfSpeakerPort: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  customerSpeakerIp: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  customerSpeakerPort: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    state: "state",
                    tcpEstablished: "tcp_established",
                    updatedAt: "updated_at",
                    bgpState: "bgp_state",
                    cfSpeakerIp: "cf_speaker_ip",
                    cfSpeakerPort: "cf_speaker_port",
                    customerSpeakerIp: "customer_speaker_ip",
                    customerSpeakerPort: "customer_speaker_port",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            createdOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            description: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            healthCheck: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  direction: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["unidirectional", "bidirectional"]),
                      Schema.Null,
                    ]),
                  ),
                  enabled: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  rate: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["low", "mid", "high"]),
                      Schema.Null,
                    ]),
                  ),
                  target: Schema.optional(
                    Schema.Union([
                      Schema.Union([
                        Schema.Struct({
                          saved: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                        }),
                        Schema.String,
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  type: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["reply", "request"]),
                      Schema.Null,
                    ]),
                  ),
                }),
                Schema.Null,
              ]),
            ),
            interfaceAddress6: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            modifiedOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              cloudflareGreEndpoint: "cloudflare_gre_endpoint",
              customerGreEndpoint: "customer_gre_endpoint",
              interfaceAddress: "interface_address",
              name: "name",
              automaticReturnRouting: "automatic_return_routing",
              bgp: "bgp",
              bgpStatus: "bgp_status",
              createdOn: "created_on",
              description: "description",
              healthCheck: "health_check",
              interfaceAddress6: "interface_address6",
              modifiedOn: "modified_on",
              mtu: "mtu",
              ttl: "ttl",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  },
)
  .pipe(Schema.encodeKeys({ greTunnels: "gre_tunnels" }))
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ListGreTunnelsResponse>;

export type ListGreTunnelsError = DefaultErrors;

export const listGreTunnels: API.OperationMethod<
  ListGreTunnelsRequest,
  ListGreTunnelsResponse,
  ListGreTunnelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListGreTunnelsRequest,
  output: ListGreTunnelsResponse,
  errors: [],
}));

export interface CreateGreTunnelRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the request and response bodies will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
  /** Body param: The IP address assigned to the Cloudflare side of the GRE tunnel. */
  cloudflareGreEndpoint: string;
  /** Body param: The IP address assigned to the customer side of the GRE tunnel. */
  customerGreEndpoint: string;
  /** Body param: A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172 */
  interfaceAddress: string;
  /** Body param: The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel. */
  name: string;
  /** Body param: True if automatic stateful return routing should be enabled for a tunnel, false otherwise. */
  automaticReturnRouting?: boolean;
  /** Body param: */
  bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
  /** Body param: An optional description of the GRE tunnel. */
  description?: string;
  /** Body param: */
  healthCheck?: {
    direction?: "unidirectional" | "bidirectional";
    enabled?: boolean;
    rate?: "low" | "mid" | "high";
    target?: { saved?: string } | string;
    type?: "reply" | "request";
  };
  /** Body param: A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 i */
  interfaceAddress6?: string;
  /** Body param: Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576. */
  mtu?: number;
  /** Body param: Time To Live (TTL) in number of hops of the GRE tunnel. */
  ttl?: number;
}

export const CreateGreTunnelRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
    cloudflareGreEndpoint: Schema.String,
    customerGreEndpoint: Schema.String,
    interfaceAddress: Schema.String,
    name: Schema.String,
    automaticReturnRouting: Schema.optional(Schema.Boolean),
    bgp: Schema.optional(
      Schema.Struct({
        customerAsn: Schema.Number,
        extraPrefixes: Schema.optional(Schema.Array(Schema.String)),
        md5Key: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          customerAsn: "customer_asn",
          extraPrefixes: "extra_prefixes",
          md5Key: "md5_key",
        }),
      ),
    ),
    description: Schema.optional(Schema.String),
    healthCheck: Schema.optional(
      Schema.Struct({
        direction: Schema.optional(
          Schema.Literals(["unidirectional", "bidirectional"]),
        ),
        enabled: Schema.optional(Schema.Boolean),
        rate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
        target: Schema.optional(
          Schema.Union([
            Schema.Struct({
              saved: Schema.optional(Schema.String),
            }),
            Schema.String,
          ]),
        ),
        type: Schema.optional(Schema.Literals(["reply", "request"])),
      }),
    ),
    interfaceAddress6: Schema.optional(Schema.String),
    mtu: Schema.optional(Schema.Number),
    ttl: Schema.optional(Schema.Number),
  },
).pipe(
  Schema.encodeKeys({
    cloudflareGreEndpoint: "cloudflare_gre_endpoint",
    customerGreEndpoint: "customer_gre_endpoint",
    interfaceAddress: "interface_address",
    name: "name",
    automaticReturnRouting: "automatic_return_routing",
    bgp: "bgp",
    description: "description",
    healthCheck: "health_check",
    interfaceAddress6: "interface_address6",
    mtu: "mtu",
    ttl: "ttl",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/magic/gre_tunnels" }),
) as unknown as Schema.Schema<CreateGreTunnelRequest>;

export interface CreateGreTunnelResponse {
  /** Identifier */
  id: string;
  /** The IP address assigned to the Cloudflare side of the GRE tunnel. */
  cloudflareGreEndpoint: string;
  /** The IP address assigned to the customer side of the GRE tunnel. */
  customerGreEndpoint: string;
  /** A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, */
  interfaceAddress: string;
  /** The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel. */
  name: string;
  /** True if automatic stateful return routing should be enabled for a tunnel, false otherwise. */
  automaticReturnRouting?: boolean | null;
  bgp?: {
    customerAsn: number;
    extraPrefixes?: string[] | null;
    md5Key?: string | null;
  } | null;
  bgpStatus?: {
    state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
    tcpEstablished: boolean;
    updatedAt: string;
    bgpState?: string | null;
    cfSpeakerIp?: string | null;
    cfSpeakerPort?: number | null;
    customerSpeakerIp?: string | null;
    customerSpeakerPort?: number | null;
  } | null;
  /** The date and time the tunnel was created. */
  createdOn?: string | null;
  /** An optional description of the GRE tunnel. */
  description?: string | null;
  healthCheck?: {
    direction?: "unidirectional" | "bidirectional" | null;
    enabled?: boolean | null;
    rate?: "low" | "mid" | "high" | null;
    target?: { saved?: string | null } | string | null;
    type?: "reply" | "request" | null;
  } | null;
  /** A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1: */
  interfaceAddress6?: string | null;
  /** The date and time the tunnel was last modified. */
  modifiedOn?: string | null;
  /** Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576. */
  mtu?: number | null;
  /** Time To Live (TTL) in number of hops of the GRE tunnel. */
  ttl?: number | null;
}

export const CreateGreTunnelResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    cloudflareGreEndpoint: Schema.String,
    customerGreEndpoint: Schema.String,
    interfaceAddress: Schema.String,
    name: Schema.String,
    automaticReturnRouting: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    bgp: Schema.optional(
      Schema.Union([
        Schema.Struct({
          customerAsn: Schema.Number,
          extraPrefixes: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          md5Key: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            customerAsn: "customer_asn",
            extraPrefixes: "extra_prefixes",
            md5Key: "md5_key",
          }),
        ),
        Schema.Null,
      ]),
    ),
    bgpStatus: Schema.optional(
      Schema.Union([
        Schema.Struct({
          state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
          tcpEstablished: Schema.Boolean,
          updatedAt: Schema.String,
          bgpState: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          cfSpeakerIp: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          cfSpeakerPort: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          customerSpeakerIp: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          customerSpeakerPort: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            state: "state",
            tcpEstablished: "tcp_established",
            updatedAt: "updated_at",
            bgpState: "bgp_state",
            cfSpeakerIp: "cf_speaker_ip",
            cfSpeakerPort: "cf_speaker_port",
            customerSpeakerIp: "customer_speaker_ip",
            customerSpeakerPort: "customer_speaker_port",
          }),
        ),
        Schema.Null,
      ]),
    ),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    healthCheck: Schema.optional(
      Schema.Union([
        Schema.Struct({
          direction: Schema.optional(
            Schema.Union([
              Schema.Literals(["unidirectional", "bidirectional"]),
              Schema.Null,
            ]),
          ),
          enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
          rate: Schema.optional(
            Schema.Union([
              Schema.Literals(["low", "mid", "high"]),
              Schema.Null,
            ]),
          ),
          target: Schema.optional(
            Schema.Union([
              Schema.Union([
                Schema.Struct({
                  saved: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }),
                Schema.String,
              ]),
              Schema.Null,
            ]),
          ),
          type: Schema.optional(
            Schema.Union([Schema.Literals(["reply", "request"]), Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    interfaceAddress6: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        cloudflareGreEndpoint: "cloudflare_gre_endpoint",
        customerGreEndpoint: "customer_gre_endpoint",
        interfaceAddress: "interface_address",
        name: "name",
        automaticReturnRouting: "automatic_return_routing",
        bgp: "bgp",
        bgpStatus: "bgp_status",
        createdOn: "created_on",
        description: "description",
        healthCheck: "health_check",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
        mtu: "mtu",
        ttl: "ttl",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateGreTunnelResponse>;

export type CreateGreTunnelError = DefaultErrors;

export const createGreTunnel: API.OperationMethod<
  CreateGreTunnelRequest,
  CreateGreTunnelResponse,
  CreateGreTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateGreTunnelRequest,
  output: CreateGreTunnelResponse,
  errors: [],
}));

export interface UpdateGreTunnelRequest {
  greTunnelId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the request and response bodies will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
  /** Body param: The IP address assigned to the Cloudflare side of the GRE tunnel. */
  cloudflareGreEndpoint: string;
  /** Body param: The IP address assigned to the customer side of the GRE tunnel. */
  customerGreEndpoint: string;
  /** Body param: A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172 */
  interfaceAddress: string;
  /** Body param: The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel. */
  name: string;
  /** Body param: True if automatic stateful return routing should be enabled for a tunnel, false otherwise. */
  automaticReturnRouting?: boolean;
  /** Body param: An optional description of the GRE tunnel. */
  description?: string;
  /** Body param: */
  healthCheck?: {
    direction?: "unidirectional" | "bidirectional";
    enabled?: boolean;
    rate?: "low" | "mid" | "high";
    target?: { saved?: string } | string;
    type?: "reply" | "request";
  };
  /** Body param: A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 i */
  interfaceAddress6?: string;
  /** Body param: Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576. */
  mtu?: number;
  /** Body param: Time To Live (TTL) in number of hops of the GRE tunnel. */
  ttl?: number;
}

export const UpdateGreTunnelRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    greTunnelId: Schema.String.pipe(T.HttpPath("greTunnelId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
    cloudflareGreEndpoint: Schema.String,
    customerGreEndpoint: Schema.String,
    interfaceAddress: Schema.String,
    name: Schema.String,
    automaticReturnRouting: Schema.optional(Schema.Boolean),
    description: Schema.optional(Schema.String),
    healthCheck: Schema.optional(
      Schema.Struct({
        direction: Schema.optional(
          Schema.Literals(["unidirectional", "bidirectional"]),
        ),
        enabled: Schema.optional(Schema.Boolean),
        rate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
        target: Schema.optional(
          Schema.Union([
            Schema.Struct({
              saved: Schema.optional(Schema.String),
            }),
            Schema.String,
          ]),
        ),
        type: Schema.optional(Schema.Literals(["reply", "request"])),
      }),
    ),
    interfaceAddress6: Schema.optional(Schema.String),
    mtu: Schema.optional(Schema.Number),
    ttl: Schema.optional(Schema.Number),
  },
).pipe(
  Schema.encodeKeys({
    cloudflareGreEndpoint: "cloudflare_gre_endpoint",
    customerGreEndpoint: "customer_gre_endpoint",
    interfaceAddress: "interface_address",
    name: "name",
    automaticReturnRouting: "automatic_return_routing",
    description: "description",
    healthCheck: "health_check",
    interfaceAddress6: "interface_address6",
    mtu: "mtu",
    ttl: "ttl",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/gre_tunnels/{greTunnelId}",
  }),
) as unknown as Schema.Schema<UpdateGreTunnelRequest>;

export interface UpdateGreTunnelResponse {
  modified?: boolean | null;
  modifiedGreTunnel?: {
    id: string;
    cloudflareGreEndpoint: string;
    customerGreEndpoint: string;
    interfaceAddress: string;
    name: string;
    automaticReturnRouting?: boolean | null;
    bgp?: {
      customerAsn: number;
      extraPrefixes?: string[] | null;
      md5Key?: string | null;
    } | null;
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string | null;
      cfSpeakerIp?: string | null;
      cfSpeakerPort?: number | null;
      customerSpeakerIp?: string | null;
      customerSpeakerPort?: number | null;
    } | null;
    createdOn?: string | null;
    description?: string | null;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional" | null;
      enabled?: boolean | null;
      rate?: "low" | "mid" | "high" | null;
      target?: { saved?: string | null } | string | null;
      type?: "reply" | "request" | null;
    } | null;
    interfaceAddress6?: string | null;
    modifiedOn?: string | null;
    mtu?: number | null;
    ttl?: number | null;
  } | null;
}

export const UpdateGreTunnelResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    modified: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    modifiedGreTunnel: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          cloudflareGreEndpoint: Schema.String,
          customerGreEndpoint: Schema.String,
          interfaceAddress: Schema.String,
          name: Schema.String,
          automaticReturnRouting: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          bgp: Schema.optional(
            Schema.Union([
              Schema.Struct({
                customerAsn: Schema.Number,
                extraPrefixes: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                md5Key: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  customerAsn: "customer_asn",
                  extraPrefixes: "extra_prefixes",
                  md5Key: "md5_key",
                }),
              ),
              Schema.Null,
            ]),
          ),
          bgpStatus: Schema.optional(
            Schema.Union([
              Schema.Struct({
                state: Schema.Literals([
                  "BGP_DOWN",
                  "BGP_UP",
                  "BGP_ESTABLISHING",
                ]),
                tcpEstablished: Schema.Boolean,
                updatedAt: Schema.String,
                bgpState: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                customerSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                customerSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  state: "state",
                  tcpEstablished: "tcp_established",
                  updatedAt: "updated_at",
                  bgpState: "bgp_state",
                  cfSpeakerIp: "cf_speaker_ip",
                  cfSpeakerPort: "cf_speaker_port",
                  customerSpeakerIp: "customer_speaker_ip",
                  customerSpeakerPort: "customer_speaker_port",
                }),
              ),
              Schema.Null,
            ]),
          ),
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          healthCheck: Schema.optional(
            Schema.Union([
              Schema.Struct({
                direction: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["unidirectional", "bidirectional"]),
                    Schema.Null,
                  ]),
                ),
                enabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                rate: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["low", "mid", "high"]),
                    Schema.Null,
                  ]),
                ),
                target: Schema.optional(
                  Schema.Union([
                    Schema.Union([
                      Schema.Struct({
                        saved: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                      Schema.String,
                    ]),
                    Schema.Null,
                  ]),
                ),
                type: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["reply", "request"]),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          interfaceAddress6: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            cloudflareGreEndpoint: "cloudflare_gre_endpoint",
            customerGreEndpoint: "customer_gre_endpoint",
            interfaceAddress: "interface_address",
            name: "name",
            automaticReturnRouting: "automatic_return_routing",
            bgp: "bgp",
            bgpStatus: "bgp_status",
            createdOn: "created_on",
            description: "description",
            healthCheck: "health_check",
            interfaceAddress6: "interface_address6",
            modifiedOn: "modified_on",
            mtu: "mtu",
            ttl: "ttl",
          }),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        modified: "modified",
        modifiedGreTunnel: "modified_gre_tunnel",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<UpdateGreTunnelResponse>;

export type UpdateGreTunnelError = DefaultErrors;

export const updateGreTunnel: API.OperationMethod<
  UpdateGreTunnelRequest,
  UpdateGreTunnelResponse,
  UpdateGreTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateGreTunnelRequest,
  output: UpdateGreTunnelResponse,
  errors: [],
}));

export interface DeleteGreTunnelRequest {
  greTunnelId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the response body will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
}

export const DeleteGreTunnelRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    greTunnelId: Schema.String.pipe(T.HttpPath("greTunnelId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/gre_tunnels/{greTunnelId}",
  }),
) as unknown as Schema.Schema<DeleteGreTunnelRequest>;

export interface DeleteGreTunnelResponse {
  deleted?: boolean | null;
  deletedGreTunnel?: {
    id: string;
    cloudflareGreEndpoint: string;
    customerGreEndpoint: string;
    interfaceAddress: string;
    name: string;
    automaticReturnRouting?: boolean | null;
    bgp?: {
      customerAsn: number;
      extraPrefixes?: string[] | null;
      md5Key?: string | null;
    } | null;
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string | null;
      cfSpeakerIp?: string | null;
      cfSpeakerPort?: number | null;
      customerSpeakerIp?: string | null;
      customerSpeakerPort?: number | null;
    } | null;
    createdOn?: string | null;
    description?: string | null;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional" | null;
      enabled?: boolean | null;
      rate?: "low" | "mid" | "high" | null;
      target?: { saved?: string | null } | string | null;
      type?: "reply" | "request" | null;
    } | null;
    interfaceAddress6?: string | null;
    modifiedOn?: string | null;
    mtu?: number | null;
    ttl?: number | null;
  } | null;
}

export const DeleteGreTunnelResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    deletedGreTunnel: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          cloudflareGreEndpoint: Schema.String,
          customerGreEndpoint: Schema.String,
          interfaceAddress: Schema.String,
          name: Schema.String,
          automaticReturnRouting: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          bgp: Schema.optional(
            Schema.Union([
              Schema.Struct({
                customerAsn: Schema.Number,
                extraPrefixes: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                md5Key: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  customerAsn: "customer_asn",
                  extraPrefixes: "extra_prefixes",
                  md5Key: "md5_key",
                }),
              ),
              Schema.Null,
            ]),
          ),
          bgpStatus: Schema.optional(
            Schema.Union([
              Schema.Struct({
                state: Schema.Literals([
                  "BGP_DOWN",
                  "BGP_UP",
                  "BGP_ESTABLISHING",
                ]),
                tcpEstablished: Schema.Boolean,
                updatedAt: Schema.String,
                bgpState: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                customerSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                customerSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  state: "state",
                  tcpEstablished: "tcp_established",
                  updatedAt: "updated_at",
                  bgpState: "bgp_state",
                  cfSpeakerIp: "cf_speaker_ip",
                  cfSpeakerPort: "cf_speaker_port",
                  customerSpeakerIp: "customer_speaker_ip",
                  customerSpeakerPort: "customer_speaker_port",
                }),
              ),
              Schema.Null,
            ]),
          ),
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          healthCheck: Schema.optional(
            Schema.Union([
              Schema.Struct({
                direction: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["unidirectional", "bidirectional"]),
                    Schema.Null,
                  ]),
                ),
                enabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                rate: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["low", "mid", "high"]),
                    Schema.Null,
                  ]),
                ),
                target: Schema.optional(
                  Schema.Union([
                    Schema.Union([
                      Schema.Struct({
                        saved: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                      Schema.String,
                    ]),
                    Schema.Null,
                  ]),
                ),
                type: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["reply", "request"]),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          interfaceAddress6: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            cloudflareGreEndpoint: "cloudflare_gre_endpoint",
            customerGreEndpoint: "customer_gre_endpoint",
            interfaceAddress: "interface_address",
            name: "name",
            automaticReturnRouting: "automatic_return_routing",
            bgp: "bgp",
            bgpStatus: "bgp_status",
            createdOn: "created_on",
            description: "description",
            healthCheck: "health_check",
            interfaceAddress6: "interface_address6",
            modifiedOn: "modified_on",
            mtu: "mtu",
            ttl: "ttl",
          }),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        deleted: "deleted",
        deletedGreTunnel: "deleted_gre_tunnel",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteGreTunnelResponse>;

export type DeleteGreTunnelError = DefaultErrors;

export const deleteGreTunnel: API.OperationMethod<
  DeleteGreTunnelRequest,
  DeleteGreTunnelResponse,
  DeleteGreTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteGreTunnelRequest,
  output: DeleteGreTunnelResponse,
  errors: [],
}));

// =============================================================================
// IpsecTunnel
// =============================================================================

export interface GetIpsecTunnelRequest {
  ipsecTunnelId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the response body will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
}

export const GetIpsecTunnelRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ipsecTunnelId: Schema.String.pipe(T.HttpPath("ipsecTunnelId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("x-magic-new-hc-target"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/ipsec_tunnels/{ipsecTunnelId}",
  }),
) as unknown as Schema.Schema<GetIpsecTunnelRequest>;

export interface GetIpsecTunnelResponse {
  ipsecTunnel?: {
    id: string;
    cloudflareEndpoint: string;
    interfaceAddress: string;
    name: string;
    allowNullCipher?: boolean | null;
    automaticReturnRouting?: boolean | null;
    bgp?: {
      customerAsn: number;
      extraPrefixes?: string[] | null;
      md5Key?: string | null;
    } | null;
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string | null;
      cfSpeakerIp?: string | null;
      cfSpeakerPort?: number | null;
      customerSpeakerIp?: string | null;
      customerSpeakerPort?: number | null;
    } | null;
    createdOn?: string | null;
    customRemoteIdentities?: { fqdnId?: string | null } | null;
    customerEndpoint?: string | null;
    description?: string | null;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional" | null;
      enabled?: boolean | null;
      rate?: "low" | "mid" | "high" | null;
      target?: { saved?: string | null } | string | null;
      type?: "reply" | "request" | null;
    } | null;
    interfaceAddress6?: string | null;
    modifiedOn?: string | null;
    pskMetadata?: unknown | null;
    replayProtection?: boolean | null;
  } | null;
}

export const GetIpsecTunnelResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ipsecTunnel: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          cloudflareEndpoint: Schema.String,
          interfaceAddress: Schema.String,
          name: Schema.String,
          allowNullCipher: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          automaticReturnRouting: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          bgp: Schema.optional(
            Schema.Union([
              Schema.Struct({
                customerAsn: Schema.Number,
                extraPrefixes: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                md5Key: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  customerAsn: "customer_asn",
                  extraPrefixes: "extra_prefixes",
                  md5Key: "md5_key",
                }),
              ),
              Schema.Null,
            ]),
          ),
          bgpStatus: Schema.optional(
            Schema.Union([
              Schema.Struct({
                state: Schema.Literals([
                  "BGP_DOWN",
                  "BGP_UP",
                  "BGP_ESTABLISHING",
                ]),
                tcpEstablished: Schema.Boolean,
                updatedAt: Schema.String,
                bgpState: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                customerSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                customerSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  state: "state",
                  tcpEstablished: "tcp_established",
                  updatedAt: "updated_at",
                  bgpState: "bgp_state",
                  cfSpeakerIp: "cf_speaker_ip",
                  cfSpeakerPort: "cf_speaker_port",
                  customerSpeakerIp: "customer_speaker_ip",
                  customerSpeakerPort: "customer_speaker_port",
                }),
              ),
              Schema.Null,
            ]),
          ),
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          customRemoteIdentities: Schema.optional(
            Schema.Union([
              Schema.Struct({
                fqdnId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ fqdnId: "fqdn_id" })),
              Schema.Null,
            ]),
          ),
          customerEndpoint: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          healthCheck: Schema.optional(
            Schema.Union([
              Schema.Struct({
                direction: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["unidirectional", "bidirectional"]),
                    Schema.Null,
                  ]),
                ),
                enabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                rate: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["low", "mid", "high"]),
                    Schema.Null,
                  ]),
                ),
                target: Schema.optional(
                  Schema.Union([
                    Schema.Union([
                      Schema.Struct({
                        saved: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                      Schema.String,
                    ]),
                    Schema.Null,
                  ]),
                ),
                type: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["reply", "request"]),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          interfaceAddress6: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          pskMetadata: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          replayProtection: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            cloudflareEndpoint: "cloudflare_endpoint",
            interfaceAddress: "interface_address",
            name: "name",
            allowNullCipher: "allow_null_cipher",
            automaticReturnRouting: "automatic_return_routing",
            bgp: "bgp",
            bgpStatus: "bgp_status",
            createdOn: "created_on",
            customRemoteIdentities: "custom_remote_identities",
            customerEndpoint: "customer_endpoint",
            description: "description",
            healthCheck: "health_check",
            interfaceAddress6: "interface_address6",
            modifiedOn: "modified_on",
            pskMetadata: "psk_metadata",
            replayProtection: "replay_protection",
          }),
        ),
        Schema.Null,
      ]),
    ),
  },
)
  .pipe(Schema.encodeKeys({ ipsecTunnel: "ipsec_tunnel" }))
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetIpsecTunnelResponse>;

export type GetIpsecTunnelError = DefaultErrors;

export const getIpsecTunnel: API.OperationMethod<
  GetIpsecTunnelRequest,
  GetIpsecTunnelResponse,
  GetIpsecTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIpsecTunnelRequest,
  output: GetIpsecTunnelResponse,
  errors: [],
}));

export interface ListIpsecTunnelsRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the response body will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
}

export const ListIpsecTunnelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/magic/ipsec_tunnels",
    }),
  ) as unknown as Schema.Schema<ListIpsecTunnelsRequest>;

export interface ListIpsecTunnelsResponse {
  ipsecTunnels?:
    | {
        id: string;
        cloudflareEndpoint: string;
        interfaceAddress: string;
        name: string;
        allowNullCipher?: boolean | null;
        automaticReturnRouting?: boolean | null;
        bgp?: {
          customerAsn: number;
          extraPrefixes?: string[] | null;
          md5Key?: string | null;
        } | null;
        bgpStatus?: {
          state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
          tcpEstablished: boolean;
          updatedAt: string;
          bgpState?: string | null;
          cfSpeakerIp?: string | null;
          cfSpeakerPort?: number | null;
          customerSpeakerIp?: string | null;
          customerSpeakerPort?: number | null;
        } | null;
        createdOn?: string | null;
        customRemoteIdentities?: { fqdnId?: string | null } | null;
        customerEndpoint?: string | null;
        description?: string | null;
        healthCheck?: {
          direction?: "unidirectional" | "bidirectional" | null;
          enabled?: boolean | null;
          rate?: "low" | "mid" | "high" | null;
          target?: { saved?: string | null } | string | null;
          type?: "reply" | "request" | null;
        } | null;
        interfaceAddress6?: string | null;
        modifiedOn?: string | null;
        pskMetadata?: unknown | null;
        replayProtection?: boolean | null;
      }[]
    | null;
}

export const ListIpsecTunnelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ipsecTunnels: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            cloudflareEndpoint: Schema.String,
            interfaceAddress: Schema.String,
            name: Schema.String,
            allowNullCipher: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            automaticReturnRouting: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            bgp: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  customerAsn: Schema.Number,
                  extraPrefixes: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  md5Key: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    customerAsn: "customer_asn",
                    extraPrefixes: "extra_prefixes",
                    md5Key: "md5_key",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            bgpStatus: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  state: Schema.Literals([
                    "BGP_DOWN",
                    "BGP_UP",
                    "BGP_ESTABLISHING",
                  ]),
                  tcpEstablished: Schema.Boolean,
                  updatedAt: Schema.String,
                  bgpState: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  cfSpeakerIp: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  cfSpeakerPort: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  customerSpeakerIp: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  customerSpeakerPort: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    state: "state",
                    tcpEstablished: "tcp_established",
                    updatedAt: "updated_at",
                    bgpState: "bgp_state",
                    cfSpeakerIp: "cf_speaker_ip",
                    cfSpeakerPort: "cf_speaker_port",
                    customerSpeakerIp: "customer_speaker_ip",
                    customerSpeakerPort: "customer_speaker_port",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            createdOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            customRemoteIdentities: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  fqdnId: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(Schema.encodeKeys({ fqdnId: "fqdn_id" })),
                Schema.Null,
              ]),
            ),
            customerEndpoint: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            description: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            healthCheck: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  direction: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["unidirectional", "bidirectional"]),
                      Schema.Null,
                    ]),
                  ),
                  enabled: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  rate: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["low", "mid", "high"]),
                      Schema.Null,
                    ]),
                  ),
                  target: Schema.optional(
                    Schema.Union([
                      Schema.Union([
                        Schema.Struct({
                          saved: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                        }),
                        Schema.String,
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  type: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["reply", "request"]),
                      Schema.Null,
                    ]),
                  ),
                }),
                Schema.Null,
              ]),
            ),
            interfaceAddress6: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            modifiedOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            pskMetadata: Schema.optional(
              Schema.Union([Schema.Unknown, Schema.Null]),
            ),
            replayProtection: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              cloudflareEndpoint: "cloudflare_endpoint",
              interfaceAddress: "interface_address",
              name: "name",
              allowNullCipher: "allow_null_cipher",
              automaticReturnRouting: "automatic_return_routing",
              bgp: "bgp",
              bgpStatus: "bgp_status",
              createdOn: "created_on",
              customRemoteIdentities: "custom_remote_identities",
              customerEndpoint: "customer_endpoint",
              description: "description",
              healthCheck: "health_check",
              interfaceAddress6: "interface_address6",
              modifiedOn: "modified_on",
              pskMetadata: "psk_metadata",
              replayProtection: "replay_protection",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(Schema.encodeKeys({ ipsecTunnels: "ipsec_tunnels" }))
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<ListIpsecTunnelsResponse>;

export type ListIpsecTunnelsError = DefaultErrors;

export const listIpsecTunnels: API.OperationMethod<
  ListIpsecTunnelsRequest,
  ListIpsecTunnelsResponse,
  ListIpsecTunnelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListIpsecTunnelsRequest,
  output: ListIpsecTunnelsResponse,
  errors: [],
}));

export interface CreateIpsecTunnelRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the request and response bodies will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
  /** Body param: The IP address assigned to the Cloudflare side of the IPsec tunnel. */
  cloudflareEndpoint: string;
  /** Body param: A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172 */
  interfaceAddress: string;
  /** Body param: The name of the IPsec tunnel. The name cannot share a name with other tunnels. */
  name: string;
  /** Body param: True if automatic stateful return routing should be enabled for a tunnel, false otherwise. */
  automaticReturnRouting?: boolean;
  /** Body param: */
  bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
  /** Body param: */
  customRemoteIdentities?: { fqdnId?: string };
  /** Body param: The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work. */
  customerEndpoint?: string;
  /** Body param: An optional description forthe IPsec tunnel. */
  description?: string;
  /** Body param: */
  healthCheck?: {
    direction?: "unidirectional" | "bidirectional";
    enabled?: boolean;
    rate?: "low" | "mid" | "high";
    target?: { saved?: string } | string;
    type?: "reply" | "request";
  };
  /** Body param: A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 i */
  interfaceAddress6?: string;
  /** Body param: A randomly generated or provided string for use in the IPsec tunnel. */
  psk?: string;
  /** Body param: If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction. */
  replayProtection?: boolean;
}

export const CreateIpsecTunnelRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
    cloudflareEndpoint: Schema.String,
    interfaceAddress: Schema.String,
    name: Schema.String,
    automaticReturnRouting: Schema.optional(Schema.Boolean),
    bgp: Schema.optional(
      Schema.Struct({
        customerAsn: Schema.Number,
        extraPrefixes: Schema.optional(Schema.Array(Schema.String)),
        md5Key: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          customerAsn: "customer_asn",
          extraPrefixes: "extra_prefixes",
          md5Key: "md5_key",
        }),
      ),
    ),
    customRemoteIdentities: Schema.optional(
      Schema.Struct({
        fqdnId: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ fqdnId: "fqdn_id" })),
    ),
    customerEndpoint: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    healthCheck: Schema.optional(
      Schema.Struct({
        direction: Schema.optional(
          Schema.Literals(["unidirectional", "bidirectional"]),
        ),
        enabled: Schema.optional(Schema.Boolean),
        rate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
        target: Schema.optional(
          Schema.Union([
            Schema.Struct({
              saved: Schema.optional(Schema.String),
            }),
            Schema.String,
          ]),
        ),
        type: Schema.optional(Schema.Literals(["reply", "request"])),
      }),
    ),
    interfaceAddress6: Schema.optional(Schema.String),
    psk: Schema.optional(Schema.String),
    replayProtection: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      cloudflareEndpoint: "cloudflare_endpoint",
      interfaceAddress: "interface_address",
      name: "name",
      automaticReturnRouting: "automatic_return_routing",
      bgp: "bgp",
      customRemoteIdentities: "custom_remote_identities",
      customerEndpoint: "customer_endpoint",
      description: "description",
      healthCheck: "health_check",
      interfaceAddress6: "interface_address6",
      psk: "psk",
      replayProtection: "replay_protection",
    }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/magic/ipsec_tunnels",
    }),
  ) as unknown as Schema.Schema<CreateIpsecTunnelRequest>;

export interface CreateIpsecTunnelResponse {
  /** Identifier */
  id: string;
  /** The IP address assigned to the Cloudflare side of the IPsec tunnel. */
  cloudflareEndpoint: string;
  /** A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, */
  interfaceAddress: string;
  /** The name of the IPsec tunnel. The name cannot share a name with other tunnels. */
  name: string;
  /** When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2). */
  allowNullCipher?: boolean | null;
  /** True if automatic stateful return routing should be enabled for a tunnel, false otherwise. */
  automaticReturnRouting?: boolean | null;
  bgp?: {
    customerAsn: number;
    extraPrefixes?: string[] | null;
    md5Key?: string | null;
  } | null;
  bgpStatus?: {
    state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
    tcpEstablished: boolean;
    updatedAt: string;
    bgpState?: string | null;
    cfSpeakerIp?: string | null;
    cfSpeakerPort?: number | null;
    customerSpeakerIp?: string | null;
    customerSpeakerPort?: number | null;
  } | null;
  /** The date and time the tunnel was created. */
  createdOn?: string | null;
  customRemoteIdentities?: { fqdnId?: string | null } | null;
  /** The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work. */
  customerEndpoint?: string | null;
  /** An optional description forthe IPsec tunnel. */
  description?: string | null;
  healthCheck?: {
    direction?: "unidirectional" | "bidirectional" | null;
    enabled?: boolean | null;
    rate?: "low" | "mid" | "high" | null;
    target?: { saved?: string | null } | string | null;
    type?: "reply" | "request" | null;
  } | null;
  /** A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1: */
  interfaceAddress6?: string | null;
  /** The date and time the tunnel was last modified. */
  modifiedOn?: string | null;
  /** The PSK metadata that includes when the PSK was generated. */
  pskMetadata?: { lastGeneratedOn?: string | null } | null;
  /** If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction. */
  replayProtection?: boolean | null;
}

export const CreateIpsecTunnelResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    cloudflareEndpoint: Schema.String,
    interfaceAddress: Schema.String,
    name: Schema.String,
    allowNullCipher: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    automaticReturnRouting: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    bgp: Schema.optional(
      Schema.Union([
        Schema.Struct({
          customerAsn: Schema.Number,
          extraPrefixes: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          md5Key: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            customerAsn: "customer_asn",
            extraPrefixes: "extra_prefixes",
            md5Key: "md5_key",
          }),
        ),
        Schema.Null,
      ]),
    ),
    bgpStatus: Schema.optional(
      Schema.Union([
        Schema.Struct({
          state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
          tcpEstablished: Schema.Boolean,
          updatedAt: Schema.String,
          bgpState: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          cfSpeakerIp: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          cfSpeakerPort: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          customerSpeakerIp: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          customerSpeakerPort: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            state: "state",
            tcpEstablished: "tcp_established",
            updatedAt: "updated_at",
            bgpState: "bgp_state",
            cfSpeakerIp: "cf_speaker_ip",
            cfSpeakerPort: "cf_speaker_port",
            customerSpeakerIp: "customer_speaker_ip",
            customerSpeakerPort: "customer_speaker_port",
          }),
        ),
        Schema.Null,
      ]),
    ),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    customRemoteIdentities: Schema.optional(
      Schema.Union([
        Schema.Struct({
          fqdnId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }).pipe(Schema.encodeKeys({ fqdnId: "fqdn_id" })),
        Schema.Null,
      ]),
    ),
    customerEndpoint: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    healthCheck: Schema.optional(
      Schema.Union([
        Schema.Struct({
          direction: Schema.optional(
            Schema.Union([
              Schema.Literals(["unidirectional", "bidirectional"]),
              Schema.Null,
            ]),
          ),
          enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
          rate: Schema.optional(
            Schema.Union([
              Schema.Literals(["low", "mid", "high"]),
              Schema.Null,
            ]),
          ),
          target: Schema.optional(
            Schema.Union([
              Schema.Union([
                Schema.Struct({
                  saved: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }),
                Schema.String,
              ]),
              Schema.Null,
            ]),
          ),
          type: Schema.optional(
            Schema.Union([Schema.Literals(["reply", "request"]), Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    interfaceAddress6: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    pskMetadata: Schema.optional(
      Schema.Union([
        Schema.Struct({
          lastGeneratedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(Schema.encodeKeys({ lastGeneratedOn: "last_generated_on" })),
        Schema.Null,
      ]),
    ),
    replayProtection: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        cloudflareEndpoint: "cloudflare_endpoint",
        interfaceAddress: "interface_address",
        name: "name",
        allowNullCipher: "allow_null_cipher",
        automaticReturnRouting: "automatic_return_routing",
        bgp: "bgp",
        bgpStatus: "bgp_status",
        createdOn: "created_on",
        customRemoteIdentities: "custom_remote_identities",
        customerEndpoint: "customer_endpoint",
        description: "description",
        healthCheck: "health_check",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
        pskMetadata: "psk_metadata",
        replayProtection: "replay_protection",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateIpsecTunnelResponse>;

export type CreateIpsecTunnelError = DefaultErrors;

export const createIpsecTunnel: API.OperationMethod<
  CreateIpsecTunnelRequest,
  CreateIpsecTunnelResponse,
  CreateIpsecTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateIpsecTunnelRequest,
  output: CreateIpsecTunnelResponse,
  errors: [],
}));

export interface UpdateIpsecTunnelRequest {
  ipsecTunnelId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the request and response bodies will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
  /** Body param: The IP address assigned to the Cloudflare side of the IPsec tunnel. */
  cloudflareEndpoint: string;
  /** Body param: A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172 */
  interfaceAddress: string;
  /** Body param: The name of the IPsec tunnel. The name cannot share a name with other tunnels. */
  name: string;
  /** Body param: True if automatic stateful return routing should be enabled for a tunnel, false otherwise. */
  automaticReturnRouting?: boolean;
  /** Body param: */
  bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
  /** Body param: */
  customRemoteIdentities?: { fqdnId?: string };
  /** Body param: The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work. */
  customerEndpoint?: string;
  /** Body param: An optional description forthe IPsec tunnel. */
  description?: string;
  /** Body param: */
  healthCheck?: {
    direction?: "unidirectional" | "bidirectional";
    enabled?: boolean;
    rate?: "low" | "mid" | "high";
    target?: { saved?: string } | string;
    type?: "reply" | "request";
  };
  /** Body param: A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 i */
  interfaceAddress6?: string;
  /** Body param: A randomly generated or provided string for use in the IPsec tunnel. */
  psk?: string;
  /** Body param: If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction. */
  replayProtection?: boolean;
}

export const UpdateIpsecTunnelRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ipsecTunnelId: Schema.String.pipe(T.HttpPath("ipsecTunnelId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
    cloudflareEndpoint: Schema.String,
    interfaceAddress: Schema.String,
    name: Schema.String,
    automaticReturnRouting: Schema.optional(Schema.Boolean),
    bgp: Schema.optional(
      Schema.Struct({
        customerAsn: Schema.Number,
        extraPrefixes: Schema.optional(Schema.Array(Schema.String)),
        md5Key: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          customerAsn: "customer_asn",
          extraPrefixes: "extra_prefixes",
          md5Key: "md5_key",
        }),
      ),
    ),
    customRemoteIdentities: Schema.optional(
      Schema.Struct({
        fqdnId: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ fqdnId: "fqdn_id" })),
    ),
    customerEndpoint: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    healthCheck: Schema.optional(
      Schema.Struct({
        direction: Schema.optional(
          Schema.Literals(["unidirectional", "bidirectional"]),
        ),
        enabled: Schema.optional(Schema.Boolean),
        rate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
        target: Schema.optional(
          Schema.Union([
            Schema.Struct({
              saved: Schema.optional(Schema.String),
            }),
            Schema.String,
          ]),
        ),
        type: Schema.optional(Schema.Literals(["reply", "request"])),
      }),
    ),
    interfaceAddress6: Schema.optional(Schema.String),
    psk: Schema.optional(Schema.String),
    replayProtection: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      cloudflareEndpoint: "cloudflare_endpoint",
      interfaceAddress: "interface_address",
      name: "name",
      automaticReturnRouting: "automatic_return_routing",
      bgp: "bgp",
      customRemoteIdentities: "custom_remote_identities",
      customerEndpoint: "customer_endpoint",
      description: "description",
      healthCheck: "health_check",
      interfaceAddress6: "interface_address6",
      psk: "psk",
      replayProtection: "replay_protection",
    }),
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/magic/ipsec_tunnels/{ipsecTunnelId}",
    }),
  ) as unknown as Schema.Schema<UpdateIpsecTunnelRequest>;

export interface UpdateIpsecTunnelResponse {
  modified?: boolean | null;
  modifiedIpsecTunnel?: {
    id: string;
    cloudflareEndpoint: string;
    interfaceAddress: string;
    name: string;
    allowNullCipher?: boolean | null;
    automaticReturnRouting?: boolean | null;
    bgp?: {
      customerAsn: number;
      extraPrefixes?: string[] | null;
      md5Key?: string | null;
    } | null;
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string | null;
      cfSpeakerIp?: string | null;
      cfSpeakerPort?: number | null;
      customerSpeakerIp?: string | null;
      customerSpeakerPort?: number | null;
    } | null;
    createdOn?: string | null;
    customRemoteIdentities?: { fqdnId?: string | null } | null;
    customerEndpoint?: string | null;
    description?: string | null;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional" | null;
      enabled?: boolean | null;
      rate?: "low" | "mid" | "high" | null;
      target?: { saved?: string | null } | string | null;
      type?: "reply" | "request" | null;
    } | null;
    interfaceAddress6?: string | null;
    modifiedOn?: string | null;
    pskMetadata?: unknown | null;
    replayProtection?: boolean | null;
  } | null;
}

export const UpdateIpsecTunnelResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    modified: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    modifiedIpsecTunnel: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          cloudflareEndpoint: Schema.String,
          interfaceAddress: Schema.String,
          name: Schema.String,
          allowNullCipher: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          automaticReturnRouting: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          bgp: Schema.optional(
            Schema.Union([
              Schema.Struct({
                customerAsn: Schema.Number,
                extraPrefixes: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                md5Key: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  customerAsn: "customer_asn",
                  extraPrefixes: "extra_prefixes",
                  md5Key: "md5_key",
                }),
              ),
              Schema.Null,
            ]),
          ),
          bgpStatus: Schema.optional(
            Schema.Union([
              Schema.Struct({
                state: Schema.Literals([
                  "BGP_DOWN",
                  "BGP_UP",
                  "BGP_ESTABLISHING",
                ]),
                tcpEstablished: Schema.Boolean,
                updatedAt: Schema.String,
                bgpState: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                customerSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                customerSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  state: "state",
                  tcpEstablished: "tcp_established",
                  updatedAt: "updated_at",
                  bgpState: "bgp_state",
                  cfSpeakerIp: "cf_speaker_ip",
                  cfSpeakerPort: "cf_speaker_port",
                  customerSpeakerIp: "customer_speaker_ip",
                  customerSpeakerPort: "customer_speaker_port",
                }),
              ),
              Schema.Null,
            ]),
          ),
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          customRemoteIdentities: Schema.optional(
            Schema.Union([
              Schema.Struct({
                fqdnId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ fqdnId: "fqdn_id" })),
              Schema.Null,
            ]),
          ),
          customerEndpoint: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          healthCheck: Schema.optional(
            Schema.Union([
              Schema.Struct({
                direction: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["unidirectional", "bidirectional"]),
                    Schema.Null,
                  ]),
                ),
                enabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                rate: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["low", "mid", "high"]),
                    Schema.Null,
                  ]),
                ),
                target: Schema.optional(
                  Schema.Union([
                    Schema.Union([
                      Schema.Struct({
                        saved: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                      Schema.String,
                    ]),
                    Schema.Null,
                  ]),
                ),
                type: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["reply", "request"]),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          interfaceAddress6: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          pskMetadata: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          replayProtection: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            cloudflareEndpoint: "cloudflare_endpoint",
            interfaceAddress: "interface_address",
            name: "name",
            allowNullCipher: "allow_null_cipher",
            automaticReturnRouting: "automatic_return_routing",
            bgp: "bgp",
            bgpStatus: "bgp_status",
            createdOn: "created_on",
            customRemoteIdentities: "custom_remote_identities",
            customerEndpoint: "customer_endpoint",
            description: "description",
            healthCheck: "health_check",
            interfaceAddress6: "interface_address6",
            modifiedOn: "modified_on",
            pskMetadata: "psk_metadata",
            replayProtection: "replay_protection",
          }),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        modified: "modified",
        modifiedIpsecTunnel: "modified_ipsec_tunnel",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<UpdateIpsecTunnelResponse>;

export type UpdateIpsecTunnelError = DefaultErrors;

export const updateIpsecTunnel: API.OperationMethod<
  UpdateIpsecTunnelRequest,
  UpdateIpsecTunnelResponse,
  UpdateIpsecTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateIpsecTunnelRequest,
  output: UpdateIpsecTunnelResponse,
  errors: [],
}));

export interface DeleteIpsecTunnelRequest {
  ipsecTunnelId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the response body will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
}

export const DeleteIpsecTunnelRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ipsecTunnelId: Schema.String.pipe(T.HttpPath("ipsecTunnelId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/magic/ipsec_tunnels/{ipsecTunnelId}",
    }),
  ) as unknown as Schema.Schema<DeleteIpsecTunnelRequest>;

export interface DeleteIpsecTunnelResponse {
  deleted?: boolean | null;
  deletedIpsecTunnel?: {
    id: string;
    cloudflareEndpoint: string;
    interfaceAddress: string;
    name: string;
    allowNullCipher?: boolean | null;
    automaticReturnRouting?: boolean | null;
    bgp?: {
      customerAsn: number;
      extraPrefixes?: string[] | null;
      md5Key?: string | null;
    } | null;
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string | null;
      cfSpeakerIp?: string | null;
      cfSpeakerPort?: number | null;
      customerSpeakerIp?: string | null;
      customerSpeakerPort?: number | null;
    } | null;
    createdOn?: string | null;
    customRemoteIdentities?: { fqdnId?: string | null } | null;
    customerEndpoint?: string | null;
    description?: string | null;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional" | null;
      enabled?: boolean | null;
      rate?: "low" | "mid" | "high" | null;
      target?: { saved?: string | null } | string | null;
      type?: "reply" | "request" | null;
    } | null;
    interfaceAddress6?: string | null;
    modifiedOn?: string | null;
    pskMetadata?: unknown | null;
    replayProtection?: boolean | null;
  } | null;
}

export const DeleteIpsecTunnelResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    deletedIpsecTunnel: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          cloudflareEndpoint: Schema.String,
          interfaceAddress: Schema.String,
          name: Schema.String,
          allowNullCipher: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          automaticReturnRouting: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          bgp: Schema.optional(
            Schema.Union([
              Schema.Struct({
                customerAsn: Schema.Number,
                extraPrefixes: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                md5Key: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  customerAsn: "customer_asn",
                  extraPrefixes: "extra_prefixes",
                  md5Key: "md5_key",
                }),
              ),
              Schema.Null,
            ]),
          ),
          bgpStatus: Schema.optional(
            Schema.Union([
              Schema.Struct({
                state: Schema.Literals([
                  "BGP_DOWN",
                  "BGP_UP",
                  "BGP_ESTABLISHING",
                ]),
                tcpEstablished: Schema.Boolean,
                updatedAt: Schema.String,
                bgpState: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                cfSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                customerSpeakerIp: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                customerSpeakerPort: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  state: "state",
                  tcpEstablished: "tcp_established",
                  updatedAt: "updated_at",
                  bgpState: "bgp_state",
                  cfSpeakerIp: "cf_speaker_ip",
                  cfSpeakerPort: "cf_speaker_port",
                  customerSpeakerIp: "customer_speaker_ip",
                  customerSpeakerPort: "customer_speaker_port",
                }),
              ),
              Schema.Null,
            ]),
          ),
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          customRemoteIdentities: Schema.optional(
            Schema.Union([
              Schema.Struct({
                fqdnId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ fqdnId: "fqdn_id" })),
              Schema.Null,
            ]),
          ),
          customerEndpoint: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          healthCheck: Schema.optional(
            Schema.Union([
              Schema.Struct({
                direction: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["unidirectional", "bidirectional"]),
                    Schema.Null,
                  ]),
                ),
                enabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                rate: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["low", "mid", "high"]),
                    Schema.Null,
                  ]),
                ),
                target: Schema.optional(
                  Schema.Union([
                    Schema.Union([
                      Schema.Struct({
                        saved: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                      Schema.String,
                    ]),
                    Schema.Null,
                  ]),
                ),
                type: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["reply", "request"]),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          interfaceAddress6: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          pskMetadata: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          replayProtection: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            cloudflareEndpoint: "cloudflare_endpoint",
            interfaceAddress: "interface_address",
            name: "name",
            allowNullCipher: "allow_null_cipher",
            automaticReturnRouting: "automatic_return_routing",
            bgp: "bgp",
            bgpStatus: "bgp_status",
            createdOn: "created_on",
            customRemoteIdentities: "custom_remote_identities",
            customerEndpoint: "customer_endpoint",
            description: "description",
            healthCheck: "health_check",
            interfaceAddress6: "interface_address6",
            modifiedOn: "modified_on",
            pskMetadata: "psk_metadata",
            replayProtection: "replay_protection",
          }),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        deleted: "deleted",
        deletedIpsecTunnel: "deleted_ipsec_tunnel",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteIpsecTunnelResponse>;

export type DeleteIpsecTunnelError = DefaultErrors;

export const deleteIpsecTunnel: API.OperationMethod<
  DeleteIpsecTunnelRequest,
  DeleteIpsecTunnelResponse,
  DeleteIpsecTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteIpsecTunnelRequest,
  output: DeleteIpsecTunnelResponse,
  errors: [],
}));

// =============================================================================
// Pcap
// =============================================================================

export interface GetPcapRequest {
  pcapId: string;
  /** Identifier. */
  accountId: string;
}

export const GetPcapRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pcapId: Schema.String.pipe(T.HttpPath("pcapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pcaps/{pcapId}" }),
) as unknown as Schema.Schema<GetPcapRequest>;

export type GetPcapResponse =
  | {
      id?: string | null;
      filterV1?: {
        destinationAddress?: string | null;
        destinationPort?: number | null;
        protocol?: number | null;
        sourceAddress?: string | null;
        sourcePort?: number | null;
      } | null;
      offsetTime?: string | null;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed"
        | null;
      submitted?: string | null;
      system?: "magic-transit" | null;
      timeLimit?: number | null;
      type?: "simple" | "full" | null;
    }
  | {
      id?: string | null;
      byteLimit?: number | null;
      coloName?: string | null;
      destinationConf?: string | null;
      errorMessage?: string | null;
      filterV1?: unknown | null;
      packetsCaptured?: number | null;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed"
        | null;
      stopRequested?: string | null;
      submitted?: string | null;
      system?: "magic-transit" | null;
      timeLimit?: number | null;
      type?: "simple" | "full" | null;
    };

export const GetPcapResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filterV1: Schema.optional(
      Schema.Union([
        Schema.Struct({
          destinationAddress: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          destinationPort: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          protocol: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          sourceAddress: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          sourcePort: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            destinationAddress: "destination_address",
            destinationPort: "destination_port",
            protocol: "protocol",
            sourceAddress: "source_address",
            sourcePort: "source_port",
          }),
        ),
        Schema.Null,
      ]),
    ),
    offsetTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "unknown",
          "success",
          "pending",
          "running",
          "conversion_pending",
          "conversion_running",
          "complete",
          "failed",
        ]),
        Schema.Null,
      ]),
    ),
    submitted: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    system: Schema.optional(
      Schema.Union([Schema.Literal("magic-transit"), Schema.Null]),
    ),
    timeLimit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    type: Schema.optional(
      Schema.Union([Schema.Literals(["simple", "full"]), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      filterV1: "filter_v1",
      offsetTime: "offset_time",
      status: "status",
      submitted: "submitted",
      system: "system",
      timeLimit: "time_limit",
      type: "type",
    }),
  ),
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    byteLimit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    coloName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    destinationConf: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    errorMessage: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filterV1: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    packetsCaptured: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "unknown",
          "success",
          "pending",
          "running",
          "conversion_pending",
          "conversion_running",
          "complete",
          "failed",
        ]),
        Schema.Null,
      ]),
    ),
    stopRequested: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    submitted: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    system: Schema.optional(
      Schema.Union([Schema.Literal("magic-transit"), Schema.Null]),
    ),
    timeLimit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    type: Schema.optional(
      Schema.Union([Schema.Literals(["simple", "full"]), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      byteLimit: "byte_limit",
      coloName: "colo_name",
      destinationConf: "destination_conf",
      errorMessage: "error_message",
      filterV1: "filter_v1",
      packetsCaptured: "packets_captured",
      status: "status",
      stopRequested: "stop_requested",
      submitted: "submitted",
      system: "system",
      timeLimit: "time_limit",
      type: "type",
    }),
  ),
]).pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetPcapResponse>;

export type GetPcapError = DefaultErrors;

export const getPcap: API.OperationMethod<
  GetPcapRequest,
  GetPcapResponse,
  GetPcapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPcapRequest,
  output: GetPcapResponse,
  errors: [],
}));

export interface ListPcapsRequest {
  /** Identifier. */
  accountId: string;
}

export const ListPcapsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pcaps" }),
) as unknown as Schema.Schema<ListPcapsRequest>;

export interface ListPcapsResponse {
  result: (
    | {
        id?: string | null;
        filterV1?: {
          destinationAddress?: string | null;
          destinationPort?: number | null;
          protocol?: number | null;
          sourceAddress?: string | null;
          sourcePort?: number | null;
        } | null;
        offsetTime?: string | null;
        status?:
          | "unknown"
          | "success"
          | "pending"
          | "running"
          | "conversion_pending"
          | "conversion_running"
          | "complete"
          | "failed"
          | null;
        submitted?: string | null;
        system?: "magic-transit" | null;
        timeLimit?: number | null;
        type?: "simple" | "full" | null;
      }
    | {
        id?: string | null;
        byteLimit?: number | null;
        coloName?: string | null;
        destinationConf?: string | null;
        errorMessage?: string | null;
        filterV1?: unknown | null;
        packetsCaptured?: number | null;
        status?:
          | "unknown"
          | "success"
          | "pending"
          | "running"
          | "conversion_pending"
          | "conversion_running"
          | "complete"
          | "failed"
          | null;
        stopRequested?: string | null;
        submitted?: string | null;
        system?: "magic-transit" | null;
        timeLimit?: number | null;
        type?: "simple" | "full" | null;
      }
  )[];
}

export const ListPcapsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        filterV1: Schema.optional(
          Schema.Union([
            Schema.Struct({
              destinationAddress: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              destinationPort: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              protocol: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              sourceAddress: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              sourcePort: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                destinationAddress: "destination_address",
                destinationPort: "destination_port",
                protocol: "protocol",
                sourceAddress: "source_address",
                sourcePort: "source_port",
              }),
            ),
            Schema.Null,
          ]),
        ),
        offsetTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        status: Schema.optional(
          Schema.Union([
            Schema.Literals([
              "unknown",
              "success",
              "pending",
              "running",
              "conversion_pending",
              "conversion_running",
              "complete",
              "failed",
            ]),
            Schema.Null,
          ]),
        ),
        submitted: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        system: Schema.optional(
          Schema.Union([Schema.Literal("magic-transit"), Schema.Null]),
        ),
        timeLimit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        type: Schema.optional(
          Schema.Union([Schema.Literals(["simple", "full"]), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          filterV1: "filter_v1",
          offsetTime: "offset_time",
          status: "status",
          submitted: "submitted",
          system: "system",
          timeLimit: "time_limit",
          type: "type",
        }),
      ),
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        byteLimit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        coloName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        destinationConf: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        errorMessage: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        filterV1: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        packetsCaptured: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        status: Schema.optional(
          Schema.Union([
            Schema.Literals([
              "unknown",
              "success",
              "pending",
              "running",
              "conversion_pending",
              "conversion_running",
              "complete",
              "failed",
            ]),
            Schema.Null,
          ]),
        ),
        stopRequested: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        submitted: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        system: Schema.optional(
          Schema.Union([Schema.Literal("magic-transit"), Schema.Null]),
        ),
        timeLimit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        type: Schema.optional(
          Schema.Union([Schema.Literals(["simple", "full"]), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          byteLimit: "byte_limit",
          coloName: "colo_name",
          destinationConf: "destination_conf",
          errorMessage: "error_message",
          filterV1: "filter_v1",
          packetsCaptured: "packets_captured",
          status: "status",
          stopRequested: "stop_requested",
          submitted: "submitted",
          system: "system",
          timeLimit: "time_limit",
          type: "type",
        }),
      ),
    ]),
  ),
}) as unknown as Schema.Schema<ListPcapsResponse>;

export type ListPcapsError = DefaultErrors;

export const listPcaps: API.PaginatedOperationMethod<
  ListPcapsRequest,
  ListPcapsResponse,
  ListPcapsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListPcapsRequest,
  ) => stream.Stream<
    ListPcapsResponse,
    ListPcapsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListPcapsRequest,
  ) => stream.Stream<
    | {
        id?: string | null;
        filterV1?: {
          destinationAddress?: string | null;
          destinationPort?: number | null;
          protocol?: number | null;
          sourceAddress?: string | null;
          sourcePort?: number | null;
        } | null;
        offsetTime?: string | null;
        status?:
          | "unknown"
          | "success"
          | "pending"
          | "running"
          | "conversion_pending"
          | "conversion_running"
          | "complete"
          | "failed"
          | null;
        submitted?: string | null;
        system?: "magic-transit" | null;
        timeLimit?: number | null;
        type?: "simple" | "full" | null;
      }
    | {
        id?: string | null;
        byteLimit?: number | null;
        coloName?: string | null;
        destinationConf?: string | null;
        errorMessage?: string | null;
        filterV1?: unknown | null;
        packetsCaptured?: number | null;
        status?:
          | "unknown"
          | "success"
          | "pending"
          | "running"
          | "conversion_pending"
          | "conversion_running"
          | "complete"
          | "failed"
          | null;
        stopRequested?: string | null;
        submitted?: string | null;
        system?: "magic-transit" | null;
        timeLimit?: number | null;
        type?: "simple" | "full" | null;
      },
    ListPcapsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPcapsRequest,
  output: ListPcapsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreatePcapRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The limit of packets contained in a packet capture. */
  packetLimit: number;
  /** Body param: The system used to collect packet captures. */
  system: "magic-transit";
  /** Body param: The packet capture duration in seconds. */
  timeLimit: number;
  /** Body param: The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets. */
  type: "simple" | "full";
  /** Body param: The packet capture filter. When this field is empty, all packets are captured. */
  filterV1?: {
    destinationAddress?: string;
    destinationPort?: number;
    protocol?: number;
    sourceAddress?: string;
    sourcePort?: number;
  };
  /** Body param: The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request. */
  offsetTime?: string;
}

export const CreatePcapRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  packetLimit: Schema.Number,
  system: Schema.Literal("magic-transit"),
  timeLimit: Schema.Number,
  type: Schema.Literals(["simple", "full"]),
  filterV1: Schema.optional(
    Schema.Struct({
      destinationAddress: Schema.optional(Schema.String),
      destinationPort: Schema.optional(Schema.Number),
      protocol: Schema.optional(Schema.Number),
      sourceAddress: Schema.optional(Schema.String),
      sourcePort: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        destinationAddress: "destination_address",
        destinationPort: "destination_port",
        protocol: "protocol",
        sourceAddress: "source_address",
        sourcePort: "source_port",
      }),
    ),
  ),
  offsetTime: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    packetLimit: "packet_limit",
    system: "system",
    timeLimit: "time_limit",
    type: "type",
    filterV1: "filter_v1",
    offsetTime: "offset_time",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/pcaps" }),
) as unknown as Schema.Schema<CreatePcapRequest>;

export type CreatePcapResponse =
  | {
      id?: string | null;
      filterV1?: {
        destinationAddress?: string | null;
        destinationPort?: number | null;
        protocol?: number | null;
        sourceAddress?: string | null;
        sourcePort?: number | null;
      } | null;
      offsetTime?: string | null;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed"
        | null;
      submitted?: string | null;
      system?: "magic-transit" | null;
      timeLimit?: number | null;
      type?: "simple" | "full" | null;
    }
  | {
      id?: string | null;
      byteLimit?: number | null;
      coloName?: string | null;
      destinationConf?: string | null;
      errorMessage?: string | null;
      filterV1?: unknown | null;
      packetsCaptured?: number | null;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed"
        | null;
      stopRequested?: string | null;
      submitted?: string | null;
      system?: "magic-transit" | null;
      timeLimit?: number | null;
      type?: "simple" | "full" | null;
    };

export const CreatePcapResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filterV1: Schema.optional(
      Schema.Union([
        Schema.Struct({
          destinationAddress: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          destinationPort: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          protocol: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          sourceAddress: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          sourcePort: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            destinationAddress: "destination_address",
            destinationPort: "destination_port",
            protocol: "protocol",
            sourceAddress: "source_address",
            sourcePort: "source_port",
          }),
        ),
        Schema.Null,
      ]),
    ),
    offsetTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "unknown",
          "success",
          "pending",
          "running",
          "conversion_pending",
          "conversion_running",
          "complete",
          "failed",
        ]),
        Schema.Null,
      ]),
    ),
    submitted: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    system: Schema.optional(
      Schema.Union([Schema.Literal("magic-transit"), Schema.Null]),
    ),
    timeLimit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    type: Schema.optional(
      Schema.Union([Schema.Literals(["simple", "full"]), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      filterV1: "filter_v1",
      offsetTime: "offset_time",
      status: "status",
      submitted: "submitted",
      system: "system",
      timeLimit: "time_limit",
      type: "type",
    }),
  ),
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    byteLimit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    coloName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    destinationConf: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    errorMessage: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filterV1: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    packetsCaptured: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "unknown",
          "success",
          "pending",
          "running",
          "conversion_pending",
          "conversion_running",
          "complete",
          "failed",
        ]),
        Schema.Null,
      ]),
    ),
    stopRequested: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    submitted: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    system: Schema.optional(
      Schema.Union([Schema.Literal("magic-transit"), Schema.Null]),
    ),
    timeLimit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    type: Schema.optional(
      Schema.Union([Schema.Literals(["simple", "full"]), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      byteLimit: "byte_limit",
      coloName: "colo_name",
      destinationConf: "destination_conf",
      errorMessage: "error_message",
      filterV1: "filter_v1",
      packetsCaptured: "packets_captured",
      status: "status",
      stopRequested: "stop_requested",
      submitted: "submitted",
      system: "system",
      timeLimit: "time_limit",
      type: "type",
    }),
  ),
]).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<CreatePcapResponse>;

export type CreatePcapError = DefaultErrors;

export const createPcap: API.OperationMethod<
  CreatePcapRequest,
  CreatePcapResponse,
  CreatePcapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePcapRequest,
  output: CreatePcapResponse,
  errors: [],
}));

export interface StopPcapRequest {
  pcapId: string;
  /** Identifier. */
  accountId: string;
}

export const StopPcapRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pcapId: Schema.String.pipe(T.HttpPath("pcapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/pcaps/{pcapId}/stop" }),
) as unknown as Schema.Schema<StopPcapRequest>;

export type StopPcapResponse = unknown;

export const StopPcapResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<StopPcapResponse>;

export type StopPcapError = DefaultErrors;

export const stopPcap: API.OperationMethod<
  StopPcapRequest,
  StopPcapResponse,
  StopPcapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopPcapRequest,
  output: StopPcapResponse,
  errors: [],
}));

// =============================================================================
// PcapDownload
// =============================================================================

export interface GetPcapDownloadRequest {
  pcapId: string;
  /** Identifier. */
  accountId: string;
}

export const GetPcapDownloadRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    pcapId: Schema.String.pipe(T.HttpPath("pcapId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pcaps/{pcapId}/download",
  }),
) as unknown as Schema.Schema<GetPcapDownloadRequest>;

export type GetPcapDownloadResponse = unknown;

export const GetPcapDownloadResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetPcapDownloadResponse>;

export type GetPcapDownloadError = DefaultErrors;

export const getPcapDownload: API.OperationMethod<
  GetPcapDownloadRequest,
  GetPcapDownloadResponse,
  GetPcapDownloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPcapDownloadRequest,
  output: GetPcapDownloadResponse,
  errors: [],
}));

// =============================================================================
// PcapOwnership
// =============================================================================

export interface GetPcapOwnershipRequest {
  /** Identifier. */
  accountId: string;
}

export const GetPcapOwnershipRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/pcaps/ownership" }),
  ) as unknown as Schema.Schema<GetPcapOwnershipRequest>;

export interface GetPcapOwnershipResponse {
  result: {
    id: string;
    destinationConf: string;
    filename: string;
    status: "pending" | "success" | "failed";
    submitted: string;
    validated?: string | null;
  }[];
}

export const GetPcapOwnershipResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        destinationConf: Schema.String,
        filename: Schema.String,
        status: Schema.Literals(["pending", "success", "failed"]),
        submitted: Schema.String,
        validated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          destinationConf: "destination_conf",
          filename: "filename",
          status: "status",
          submitted: "submitted",
          validated: "validated",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<GetPcapOwnershipResponse>;

export type GetPcapOwnershipError = DefaultErrors;

export const getPcapOwnership: API.PaginatedOperationMethod<
  GetPcapOwnershipRequest,
  GetPcapOwnershipResponse,
  GetPcapOwnershipError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: GetPcapOwnershipRequest,
  ) => stream.Stream<
    GetPcapOwnershipResponse,
    GetPcapOwnershipError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: GetPcapOwnershipRequest,
  ) => stream.Stream<
    {
      id: string;
      destinationConf: string;
      filename: string;
      status: "pending" | "success" | "failed";
      submitted: string;
      validated?: string | null;
    },
    GetPcapOwnershipError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetPcapOwnershipRequest,
  output: GetPcapOwnershipResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreatePcapOwnershipRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The full URI for the bucket. This field only applies to `full` packet captures. */
  destinationConf: string;
}

export const CreatePcapOwnershipRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    destinationConf: Schema.String,
  }).pipe(
    Schema.encodeKeys({ destinationConf: "destination_conf" }),
    T.Http({ method: "POST", path: "/accounts/{account_id}/pcaps/ownership" }),
  ) as unknown as Schema.Schema<CreatePcapOwnershipRequest>;

export interface CreatePcapOwnershipResponse {
  /** The bucket ID associated with the packet captures API. */
  id: string;
  /** The full URI for the bucket. This field only applies to `full` packet captures. */
  destinationConf: string;
  /** The ownership challenge filename stored in the bucket. */
  filename: string;
  /** The status of the ownership challenge. Can be pending, success or failed. */
  status: "pending" | "success" | "failed";
  /** The RFC 3339 timestamp when the bucket was added to packet captures API. */
  submitted: string;
  /** The RFC 3339 timestamp when the bucket was validated. */
  validated?: string | null;
}

export const CreatePcapOwnershipResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    destinationConf: Schema.String,
    filename: Schema.String,
    status: Schema.Literals(["pending", "success", "failed"]),
    submitted: Schema.String,
    validated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        destinationConf: "destination_conf",
        filename: "filename",
        status: "status",
        submitted: "submitted",
        validated: "validated",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreatePcapOwnershipResponse>;

export type CreatePcapOwnershipError = DefaultErrors;

export const createPcapOwnership: API.OperationMethod<
  CreatePcapOwnershipRequest,
  CreatePcapOwnershipResponse,
  CreatePcapOwnershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePcapOwnershipRequest,
  output: CreatePcapOwnershipResponse,
  errors: [],
}));

export interface DeletePcapOwnershipRequest {
  ownershipId: string;
  /** Identifier. */
  accountId: string;
}

export const DeletePcapOwnershipRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ownershipId: Schema.String.pipe(T.HttpPath("ownershipId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/pcaps/ownership/{ownershipId}",
    }),
  ) as unknown as Schema.Schema<DeletePcapOwnershipRequest>;

export type DeletePcapOwnershipResponse = unknown;

export const DeletePcapOwnershipResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeletePcapOwnershipResponse>;

export type DeletePcapOwnershipError = DefaultErrors;

export const deletePcapOwnership: API.OperationMethod<
  DeletePcapOwnershipRequest,
  DeletePcapOwnershipResponse,
  DeletePcapOwnershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePcapOwnershipRequest,
  output: DeletePcapOwnershipResponse,
  errors: [],
}));

export interface ValidatePcapOwnershipRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The full URI for the bucket. This field only applies to `full` packet captures. */
  destinationConf: string;
  /** Body param: The ownership challenge filename stored in the bucket. */
  ownershipChallenge: string;
}

export const ValidatePcapOwnershipRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    destinationConf: Schema.String,
    ownershipChallenge: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      destinationConf: "destination_conf",
      ownershipChallenge: "ownership_challenge",
    }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/pcaps/ownership/validate",
    }),
  ) as unknown as Schema.Schema<ValidatePcapOwnershipRequest>;

export interface ValidatePcapOwnershipResponse {
  /** The bucket ID associated with the packet captures API. */
  id: string;
  /** The full URI for the bucket. This field only applies to `full` packet captures. */
  destinationConf: string;
  /** The ownership challenge filename stored in the bucket. */
  filename: string;
  /** The status of the ownership challenge. Can be pending, success or failed. */
  status: "pending" | "success" | "failed";
  /** The RFC 3339 timestamp when the bucket was added to packet captures API. */
  submitted: string;
  /** The RFC 3339 timestamp when the bucket was validated. */
  validated?: string | null;
}

export const ValidatePcapOwnershipResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    destinationConf: Schema.String,
    filename: Schema.String,
    status: Schema.Literals(["pending", "success", "failed"]),
    submitted: Schema.String,
    validated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        destinationConf: "destination_conf",
        filename: "filename",
        status: "status",
        submitted: "submitted",
        validated: "validated",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<ValidatePcapOwnershipResponse>;

export type ValidatePcapOwnershipError = DefaultErrors;

export const validatePcapOwnership: API.OperationMethod<
  ValidatePcapOwnershipRequest,
  ValidatePcapOwnershipResponse,
  ValidatePcapOwnershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ValidatePcapOwnershipRequest,
  output: ValidatePcapOwnershipResponse,
  errors: [],
}));

// =============================================================================
// PutCfInterconnect
// =============================================================================

export interface BulkPutCfInterconnectsRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the request and response bodies will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
  /** Body param: */
  body: unknown;
}

export const BulkPutCfInterconnectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
    body: Schema.Unknown.pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/magic/cf_interconnects",
    }),
  ) as unknown as Schema.Schema<BulkPutCfInterconnectsRequest>;

export interface BulkPutCfInterconnectsResponse {
  modified?: boolean | null;
  modifiedInterconnects?:
    | {
        id?: string | null;
        automaticReturnRouting?: boolean | null;
        coloName?: string | null;
        createdOn?: string | null;
        description?: string | null;
        gre?: { cloudflareEndpoint?: string | null } | null;
        healthCheck?: unknown | null;
        interfaceAddress?: string | null;
        interfaceAddress6?: string | null;
        modifiedOn?: string | null;
        mtu?: number | null;
        name?: string | null;
      }[]
    | null;
}

export const BulkPutCfInterconnectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    modified: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    modifiedInterconnects: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            automaticReturnRouting: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            coloName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            createdOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            description: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            gre: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  cloudflareEndpoint: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    cloudflareEndpoint: "cloudflare_endpoint",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            healthCheck: Schema.optional(
              Schema.Union([Schema.Unknown, Schema.Null]),
            ),
            interfaceAddress: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            interfaceAddress6: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            modifiedOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              automaticReturnRouting: "automatic_return_routing",
              coloName: "colo_name",
              createdOn: "created_on",
              description: "description",
              gre: "gre",
              healthCheck: "health_check",
              interfaceAddress: "interface_address",
              interfaceAddress6: "interface_address6",
              modifiedOn: "modified_on",
              mtu: "mtu",
              name: "name",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        modified: "modified",
        modifiedInterconnects: "modified_interconnects",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<BulkPutCfInterconnectsResponse>;

export type BulkPutCfInterconnectsError = DefaultErrors;

export const bulkPutCfInterconnects: API.OperationMethod<
  BulkPutCfInterconnectsRequest,
  BulkPutCfInterconnectsResponse,
  BulkPutCfInterconnectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkPutCfInterconnectsRequest,
  output: BulkPutCfInterconnectsResponse,
  errors: [],
}));

// =============================================================================
// PutGreTunnel
// =============================================================================

export interface BulkPutGreTunnelsRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the request and response bodies will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
  /** Body param: */
  body: unknown;
}

export const BulkPutGreTunnelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
    body: Schema.Unknown.pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "PUT", path: "/accounts/{account_id}/magic/gre_tunnels" }),
  ) as unknown as Schema.Schema<BulkPutGreTunnelsRequest>;

export interface BulkPutGreTunnelsResponse {
  modified?: boolean | null;
  modifiedGreTunnels?:
    | {
        id: string;
        cloudflareGreEndpoint: string;
        customerGreEndpoint: string;
        interfaceAddress: string;
        name: string;
        automaticReturnRouting?: boolean | null;
        bgp?: {
          customerAsn: number;
          extraPrefixes?: string[] | null;
          md5Key?: string | null;
        } | null;
        bgpStatus?: {
          state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
          tcpEstablished: boolean;
          updatedAt: string;
          bgpState?: string | null;
          cfSpeakerIp?: string | null;
          cfSpeakerPort?: number | null;
          customerSpeakerIp?: string | null;
          customerSpeakerPort?: number | null;
        } | null;
        createdOn?: string | null;
        description?: string | null;
        healthCheck?: {
          direction?: "unidirectional" | "bidirectional" | null;
          enabled?: boolean | null;
          rate?: "low" | "mid" | "high" | null;
          target?: { saved?: string | null } | string | null;
          type?: "reply" | "request" | null;
        } | null;
        interfaceAddress6?: string | null;
        modifiedOn?: string | null;
        mtu?: number | null;
        ttl?: number | null;
      }[]
    | null;
}

export const BulkPutGreTunnelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    modified: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    modifiedGreTunnels: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            cloudflareGreEndpoint: Schema.String,
            customerGreEndpoint: Schema.String,
            interfaceAddress: Schema.String,
            name: Schema.String,
            automaticReturnRouting: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            bgp: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  customerAsn: Schema.Number,
                  extraPrefixes: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  md5Key: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    customerAsn: "customer_asn",
                    extraPrefixes: "extra_prefixes",
                    md5Key: "md5_key",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            bgpStatus: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  state: Schema.Literals([
                    "BGP_DOWN",
                    "BGP_UP",
                    "BGP_ESTABLISHING",
                  ]),
                  tcpEstablished: Schema.Boolean,
                  updatedAt: Schema.String,
                  bgpState: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  cfSpeakerIp: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  cfSpeakerPort: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  customerSpeakerIp: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  customerSpeakerPort: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    state: "state",
                    tcpEstablished: "tcp_established",
                    updatedAt: "updated_at",
                    bgpState: "bgp_state",
                    cfSpeakerIp: "cf_speaker_ip",
                    cfSpeakerPort: "cf_speaker_port",
                    customerSpeakerIp: "customer_speaker_ip",
                    customerSpeakerPort: "customer_speaker_port",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            createdOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            description: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            healthCheck: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  direction: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["unidirectional", "bidirectional"]),
                      Schema.Null,
                    ]),
                  ),
                  enabled: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  rate: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["low", "mid", "high"]),
                      Schema.Null,
                    ]),
                  ),
                  target: Schema.optional(
                    Schema.Union([
                      Schema.Union([
                        Schema.Struct({
                          saved: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                        }),
                        Schema.String,
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  type: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["reply", "request"]),
                      Schema.Null,
                    ]),
                  ),
                }),
                Schema.Null,
              ]),
            ),
            interfaceAddress6: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            modifiedOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            mtu: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              cloudflareGreEndpoint: "cloudflare_gre_endpoint",
              customerGreEndpoint: "customer_gre_endpoint",
              interfaceAddress: "interface_address",
              name: "name",
              automaticReturnRouting: "automatic_return_routing",
              bgp: "bgp",
              bgpStatus: "bgp_status",
              createdOn: "created_on",
              description: "description",
              healthCheck: "health_check",
              interfaceAddress6: "interface_address6",
              modifiedOn: "modified_on",
              mtu: "mtu",
              ttl: "ttl",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        modified: "modified",
        modifiedGreTunnels: "modified_gre_tunnels",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<BulkPutGreTunnelsResponse>;

export type BulkPutGreTunnelsError = DefaultErrors;

export const bulkPutGreTunnels: API.OperationMethod<
  BulkPutGreTunnelsRequest,
  BulkPutGreTunnelsResponse,
  BulkPutGreTunnelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkPutGreTunnelsRequest,
  output: BulkPutGreTunnelsResponse,
  errors: [],
}));

// =============================================================================
// PutIpsecTunnel
// =============================================================================

export interface BulkPutIpsecTunnelsRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the request and response bodies will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
  /** Body param: */
  body: unknown;
}

export const BulkPutIpsecTunnelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
      T.HttpHeader("x-magic-new-hc-target"),
    ),
    body: Schema.Unknown.pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/magic/ipsec_tunnels",
    }),
  ) as unknown as Schema.Schema<BulkPutIpsecTunnelsRequest>;

export interface BulkPutIpsecTunnelsResponse {
  modified?: boolean | null;
  modifiedIpsecTunnels?:
    | {
        id: string;
        cloudflareEndpoint: string;
        interfaceAddress: string;
        name: string;
        allowNullCipher?: boolean | null;
        automaticReturnRouting?: boolean | null;
        bgp?: {
          customerAsn: number;
          extraPrefixes?: string[] | null;
          md5Key?: string | null;
        } | null;
        bgpStatus?: {
          state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
          tcpEstablished: boolean;
          updatedAt: string;
          bgpState?: string | null;
          cfSpeakerIp?: string | null;
          cfSpeakerPort?: number | null;
          customerSpeakerIp?: string | null;
          customerSpeakerPort?: number | null;
        } | null;
        createdOn?: string | null;
        customRemoteIdentities?: { fqdnId?: string | null } | null;
        customerEndpoint?: string | null;
        description?: string | null;
        healthCheck?: {
          direction?: "unidirectional" | "bidirectional" | null;
          enabled?: boolean | null;
          rate?: "low" | "mid" | "high" | null;
          target?: { saved?: string | null } | string | null;
          type?: "reply" | "request" | null;
        } | null;
        interfaceAddress6?: string | null;
        modifiedOn?: string | null;
        pskMetadata?: unknown | null;
        replayProtection?: boolean | null;
      }[]
    | null;
}

export const BulkPutIpsecTunnelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    modified: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    modifiedIpsecTunnels: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            cloudflareEndpoint: Schema.String,
            interfaceAddress: Schema.String,
            name: Schema.String,
            allowNullCipher: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            automaticReturnRouting: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            bgp: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  customerAsn: Schema.Number,
                  extraPrefixes: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  md5Key: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    customerAsn: "customer_asn",
                    extraPrefixes: "extra_prefixes",
                    md5Key: "md5_key",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            bgpStatus: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  state: Schema.Literals([
                    "BGP_DOWN",
                    "BGP_UP",
                    "BGP_ESTABLISHING",
                  ]),
                  tcpEstablished: Schema.Boolean,
                  updatedAt: Schema.String,
                  bgpState: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  cfSpeakerIp: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  cfSpeakerPort: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  customerSpeakerIp: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  customerSpeakerPort: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    state: "state",
                    tcpEstablished: "tcp_established",
                    updatedAt: "updated_at",
                    bgpState: "bgp_state",
                    cfSpeakerIp: "cf_speaker_ip",
                    cfSpeakerPort: "cf_speaker_port",
                    customerSpeakerIp: "customer_speaker_ip",
                    customerSpeakerPort: "customer_speaker_port",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            createdOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            customRemoteIdentities: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  fqdnId: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(Schema.encodeKeys({ fqdnId: "fqdn_id" })),
                Schema.Null,
              ]),
            ),
            customerEndpoint: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            description: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            healthCheck: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  direction: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["unidirectional", "bidirectional"]),
                      Schema.Null,
                    ]),
                  ),
                  enabled: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  rate: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["low", "mid", "high"]),
                      Schema.Null,
                    ]),
                  ),
                  target: Schema.optional(
                    Schema.Union([
                      Schema.Union([
                        Schema.Struct({
                          saved: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                        }),
                        Schema.String,
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  type: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["reply", "request"]),
                      Schema.Null,
                    ]),
                  ),
                }),
                Schema.Null,
              ]),
            ),
            interfaceAddress6: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            modifiedOn: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            pskMetadata: Schema.optional(
              Schema.Union([Schema.Unknown, Schema.Null]),
            ),
            replayProtection: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              cloudflareEndpoint: "cloudflare_endpoint",
              interfaceAddress: "interface_address",
              name: "name",
              allowNullCipher: "allow_null_cipher",
              automaticReturnRouting: "automatic_return_routing",
              bgp: "bgp",
              bgpStatus: "bgp_status",
              createdOn: "created_on",
              customRemoteIdentities: "custom_remote_identities",
              customerEndpoint: "customer_endpoint",
              description: "description",
              healthCheck: "health_check",
              interfaceAddress6: "interface_address6",
              modifiedOn: "modified_on",
              pskMetadata: "psk_metadata",
              replayProtection: "replay_protection",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        modified: "modified",
        modifiedIpsecTunnels: "modified_ipsec_tunnels",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<BulkPutIpsecTunnelsResponse>;

export type BulkPutIpsecTunnelsError = DefaultErrors;

export const bulkPutIpsecTunnels: API.OperationMethod<
  BulkPutIpsecTunnelsRequest,
  BulkPutIpsecTunnelsResponse,
  BulkPutIpsecTunnelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkPutIpsecTunnelsRequest,
  output: BulkPutIpsecTunnelsResponse,
  errors: [],
}));

// =============================================================================
// PutRoute
// =============================================================================

export interface BulkPutRoutesRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  routes: {
    id: string;
    nexthop: string;
    prefix: string;
    priority: number;
    description?: string;
    scope?: unknown;
    weight?: number;
  }[];
}

export const BulkPutRoutesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  routes: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      nexthop: Schema.String,
      prefix: Schema.String,
      priority: Schema.Number,
      description: Schema.optional(Schema.String),
      scope: Schema.optional(Schema.Unknown),
      weight: Schema.optional(Schema.Number),
    }),
  ),
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/magic/routes" }),
) as unknown as Schema.Schema<BulkPutRoutesRequest>;

export interface BulkPutRoutesResponse {
  modified?: boolean | null;
  modifiedRoutes?:
    | {
        id: string;
        nexthop: string;
        prefix: string;
        priority: number;
        createdOn?: string | null;
        description?: string | null;
        modifiedOn?: string | null;
        scope?: unknown | null;
        weight?: number | null;
      }[]
    | null;
}

export const BulkPutRoutesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  modified: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  modifiedRoutes: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.String,
          nexthop: Schema.String,
          prefix: Schema.String,
          priority: Schema.Number,
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          scope: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          weight: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            nexthop: "nexthop",
            prefix: "prefix",
            priority: "priority",
            createdOn: "created_on",
            description: "description",
            modifiedOn: "modified_on",
            scope: "scope",
            weight: "weight",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      modified: "modified",
      modifiedRoutes: "modified_routes",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<BulkPutRoutesResponse>;

export type BulkPutRoutesError = DefaultErrors;

export const bulkPutRoutes: API.OperationMethod<
  BulkPutRoutesRequest,
  BulkPutRoutesResponse,
  BulkPutRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkPutRoutesRequest,
  output: BulkPutRoutesResponse,
  errors: [],
}));

// =============================================================================
// Route
// =============================================================================

export interface GetRouteRequest {
  routeId: string;
  /** Identifier */
  accountId: string;
}

export const GetRouteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  routeId: Schema.String.pipe(T.HttpPath("routeId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/routes/{routeId}",
  }),
) as unknown as Schema.Schema<GetRouteRequest>;

export interface GetRouteResponse {
  route?: {
    id: string;
    nexthop: string;
    prefix: string;
    priority: number;
    createdOn?: string | null;
    description?: string | null;
    modifiedOn?: string | null;
    scope?: unknown | null;
    weight?: number | null;
  } | null;
}

export const GetRouteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  route: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.String,
        nexthop: Schema.String,
        prefix: Schema.String,
        priority: Schema.Number,
        createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        scope: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        weight: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          nexthop: "nexthop",
          prefix: "prefix",
          priority: "priority",
          createdOn: "created_on",
          description: "description",
          modifiedOn: "modified_on",
          scope: "scope",
          weight: "weight",
        }),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetRouteResponse>;

export type GetRouteError = DefaultErrors;

export const getRoute: API.OperationMethod<
  GetRouteRequest,
  GetRouteResponse,
  GetRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouteRequest,
  output: GetRouteResponse,
  errors: [],
}));

export interface ListRoutesRequest {
  /** Identifier */
  accountId: string;
}

export const ListRoutesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/routes" }),
) as unknown as Schema.Schema<ListRoutesRequest>;

export interface ListRoutesResponse {
  routes?:
    | {
        id: string;
        nexthop: string;
        prefix: string;
        priority: number;
        createdOn?: string | null;
        description?: string | null;
        modifiedOn?: string | null;
        scope?: unknown | null;
        weight?: number | null;
      }[]
    | null;
}

export const ListRoutesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  routes: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.String,
          nexthop: Schema.String,
          prefix: Schema.String,
          priority: Schema.Number,
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          scope: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          weight: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            nexthop: "nexthop",
            prefix: "prefix",
            priority: "priority",
            createdOn: "created_on",
            description: "description",
            modifiedOn: "modified_on",
            scope: "scope",
            weight: "weight",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<ListRoutesResponse>;

export type ListRoutesError = DefaultErrors;

export const listRoutes: API.OperationMethod<
  ListRoutesRequest,
  ListRoutesResponse,
  ListRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListRoutesRequest,
  output: ListRoutesResponse,
  errors: [],
}));

export interface CreateRouteRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The next-hop IP Address for the static route. */
  nexthop: string;
  /** Body param: IP Prefix in Classless Inter-Domain Routing format. */
  prefix: string;
  /** Body param: Priority of the static route. */
  priority: number;
  /** Body param: An optional human provided description of the static route. */
  description?: string;
  /** Body param: Used only for ECMP routes. */
  scope?: { coloNames?: string[]; coloRegions?: string[] };
  /** Body param: Optional weight of the ECMP scope - if provided. */
  weight?: number;
}

export const CreateRouteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  nexthop: Schema.String,
  prefix: Schema.String,
  priority: Schema.Number,
  description: Schema.optional(Schema.String),
  scope: Schema.optional(
    Schema.Struct({
      coloNames: Schema.optional(Schema.Array(Schema.String)),
      coloRegions: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        coloNames: "colo_names",
        coloRegions: "colo_regions",
      }),
    ),
  ),
  weight: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/magic/routes" }),
) as unknown as Schema.Schema<CreateRouteRequest>;

export interface CreateRouteResponse {
  /** Identifier */
  id: string;
  /** The next-hop IP Address for the static route. */
  nexthop: string;
  /** IP Prefix in Classless Inter-Domain Routing format. */
  prefix: string;
  /** Priority of the static route. */
  priority: number;
  /** When the route was created. */
  createdOn?: string | null;
  /** An optional human provided description of the static route. */
  description?: string | null;
  /** When the route was last modified. */
  modifiedOn?: string | null;
  /** Used only for ECMP routes. */
  scope?: { coloNames?: string[] | null; coloRegions?: string[] | null } | null;
  /** Optional weight of the ECMP scope - if provided. */
  weight?: number | null;
}

export const CreateRouteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  nexthop: Schema.String,
  prefix: Schema.String,
  priority: Schema.Number,
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  scope: Schema.optional(
    Schema.Union([
      Schema.Struct({
        coloNames: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        coloRegions: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          coloNames: "colo_names",
          coloRegions: "colo_regions",
        }),
      ),
      Schema.Null,
    ]),
  ),
  weight: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      nexthop: "nexthop",
      prefix: "prefix",
      priority: "priority",
      createdOn: "created_on",
      description: "description",
      modifiedOn: "modified_on",
      scope: "scope",
      weight: "weight",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateRouteResponse>;

export type CreateRouteError = DefaultErrors;

export const createRoute: API.OperationMethod<
  CreateRouteRequest,
  CreateRouteResponse,
  CreateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRouteRequest,
  output: CreateRouteResponse,
  errors: [],
}));

export interface UpdateRouteRequest {
  routeId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The next-hop IP Address for the static route. */
  nexthop: string;
  /** Body param: IP Prefix in Classless Inter-Domain Routing format. */
  prefix: string;
  /** Body param: Priority of the static route. */
  priority: number;
  /** Body param: An optional human provided description of the static route. */
  description?: string;
  /** Body param: Used only for ECMP routes. */
  scope?: { coloNames?: string[]; coloRegions?: string[] };
  /** Body param: Optional weight of the ECMP scope - if provided. */
  weight?: number;
}

export const UpdateRouteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  routeId: Schema.String.pipe(T.HttpPath("routeId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  nexthop: Schema.String,
  prefix: Schema.String,
  priority: Schema.Number,
  description: Schema.optional(Schema.String),
  scope: Schema.optional(
    Schema.Struct({
      coloNames: Schema.optional(Schema.Array(Schema.String)),
      coloRegions: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        coloNames: "colo_names",
        coloRegions: "colo_regions",
      }),
    ),
  ),
  weight: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/routes/{routeId}",
  }),
) as unknown as Schema.Schema<UpdateRouteRequest>;

export interface UpdateRouteResponse {
  modified?: boolean | null;
  modifiedRoute?: {
    id: string;
    nexthop: string;
    prefix: string;
    priority: number;
    createdOn?: string | null;
    description?: string | null;
    modifiedOn?: string | null;
    scope?: unknown | null;
    weight?: number | null;
  } | null;
}

export const UpdateRouteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  modified: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  modifiedRoute: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.String,
        nexthop: Schema.String,
        prefix: Schema.String,
        priority: Schema.Number,
        createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        scope: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        weight: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          nexthop: "nexthop",
          prefix: "prefix",
          priority: "priority",
          createdOn: "created_on",
          description: "description",
          modifiedOn: "modified_on",
          scope: "scope",
          weight: "weight",
        }),
      ),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      modified: "modified",
      modifiedRoute: "modified_route",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateRouteResponse>;

export type UpdateRouteError = DefaultErrors;

export const updateRoute: API.OperationMethod<
  UpdateRouteRequest,
  UpdateRouteResponse,
  UpdateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRouteRequest,
  output: UpdateRouteResponse,
  errors: [],
}));

export interface DeleteRouteRequest {
  routeId: string;
  /** Identifier */
  accountId: string;
}

export const DeleteRouteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  routeId: Schema.String.pipe(T.HttpPath("routeId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/routes/{routeId}",
  }),
) as unknown as Schema.Schema<DeleteRouteRequest>;

export interface DeleteRouteResponse {
  deleted?: boolean | null;
  deletedRoute?: {
    id: string;
    nexthop: string;
    prefix: string;
    priority: number;
    createdOn?: string | null;
    description?: string | null;
    modifiedOn?: string | null;
    scope?: unknown | null;
    weight?: number | null;
  } | null;
}

export const DeleteRouteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  deleted: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  deletedRoute: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.String,
        nexthop: Schema.String,
        prefix: Schema.String,
        priority: Schema.Number,
        createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        scope: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        weight: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          nexthop: "nexthop",
          prefix: "prefix",
          priority: "priority",
          createdOn: "created_on",
          description: "description",
          modifiedOn: "modified_on",
          scope: "scope",
          weight: "weight",
        }),
      ),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({ deleted: "deleted", deletedRoute: "deleted_route" }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteRouteResponse>;

export type DeleteRouteError = DefaultErrors;

export const deleteRoute: API.OperationMethod<
  DeleteRouteRequest,
  DeleteRouteResponse,
  DeleteRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouteRequest,
  output: DeleteRouteResponse,
  errors: [],
}));

export interface EmptyRouteRequest {
  /** Identifier */
  accountId: string;
}

export const EmptyRouteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/magic/routes" }),
) as unknown as Schema.Schema<EmptyRouteRequest>;

export interface EmptyRouteResponse {
  deleted?: boolean | null;
  deletedRoutes?:
    | {
        id: string;
        nexthop: string;
        prefix: string;
        priority: number;
        createdOn?: string | null;
        description?: string | null;
        modifiedOn?: string | null;
        scope?: unknown | null;
        weight?: number | null;
      }[]
    | null;
}

export const EmptyRouteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  deleted: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  deletedRoutes: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.String,
          nexthop: Schema.String,
          prefix: Schema.String,
          priority: Schema.Number,
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          scope: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          weight: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            nexthop: "nexthop",
            prefix: "prefix",
            priority: "priority",
            createdOn: "created_on",
            description: "description",
            modifiedOn: "modified_on",
            scope: "scope",
            weight: "weight",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({ deleted: "deleted", deletedRoutes: "deleted_routes" }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<EmptyRouteResponse>;

export type EmptyRouteError = DefaultErrors;

export const emptyRoute: API.OperationMethod<
  EmptyRouteRequest,
  EmptyRouteResponse,
  EmptyRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EmptyRouteRequest,
  output: EmptyRouteResponse,
  errors: [],
}));

// =============================================================================
// Site
// =============================================================================

export interface GetSiteRequest {
  siteId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Header param: If true, the health check target in the response body will be presented using the new object format. Defaults to false. */
  xMagicNewHcTarget?: boolean;
}

export const GetSiteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("x-magic-new-hc-target"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}",
  }),
) as unknown as Schema.Schema<GetSiteRequest>;

export interface GetSiteResponse {
  /** Identifier */
  id?: string | null;
  /** Magic Connector identifier tag. */
  connectorId?: string | null;
  description?: string | null;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean | null;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string | null; lon?: string | null } | null;
  /** The name of the site. */
  name?: string | null;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string | null;
}

export const GetSiteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  haMode: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  location: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lon: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  secondaryConnectorId: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      connectorId: "connector_id",
      description: "description",
      haMode: "ha_mode",
      location: "location",
      name: "name",
      secondaryConnectorId: "secondary_connector_id",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetSiteResponse>;

export type GetSiteError = DefaultErrors;

export const getSite: API.OperationMethod<
  GetSiteRequest,
  GetSiteResponse,
  GetSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSiteRequest,
  output: GetSiteResponse,
  errors: [],
}));

export interface ListSitesRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Query param: Identifier */
  connectorid?: string;
}

export const ListSitesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  connectorid: Schema.optional(Schema.String).pipe(T.HttpQuery("connectorid")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/sites" }),
) as unknown as Schema.Schema<ListSitesRequest>;

export interface ListSitesResponse {
  result: {
    id?: string | null;
    connectorId?: string | null;
    description?: string | null;
    haMode?: boolean | null;
    location?: { lat?: string | null; lon?: string | null } | null;
    name?: string | null;
    secondaryConnectorId?: string | null;
  }[];
}

export const ListSitesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      connectorId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      haMode: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      location: Schema.optional(
        Schema.Union([
          Schema.Struct({
            lat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            lon: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
          Schema.Null,
        ]),
      ),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      secondaryConnectorId: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        connectorId: "connector_id",
        description: "description",
        haMode: "ha_mode",
        location: "location",
        name: "name",
        secondaryConnectorId: "secondary_connector_id",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListSitesResponse>;

export type ListSitesError = DefaultErrors;

export const listSites: API.PaginatedOperationMethod<
  ListSitesRequest,
  ListSitesResponse,
  ListSitesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSitesRequest,
  ) => stream.Stream<
    ListSitesResponse,
    ListSitesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListSitesRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      connectorId?: string | null;
      description?: string | null;
      haMode?: boolean | null;
      location?: { lat?: string | null; lon?: string | null } | null;
      name?: string | null;
      secondaryConnectorId?: string | null;
    },
    ListSitesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSitesRequest,
  output: ListSitesResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateSiteRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The name of the site. */
  name: string;
  /** Body param: Magic Connector identifier tag. */
  connectorId?: string;
  /** Body param: */
  description?: string;
  /** Body param: Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean;
  /** Body param: Location of site in latitude and longitude. */
  location?: { lat?: string; lon?: string };
  /** Body param: Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string;
}

export const CreateSiteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  connectorId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  haMode: Schema.optional(Schema.Boolean),
  location: Schema.optional(
    Schema.Struct({
      lat: Schema.optional(Schema.String),
      lon: Schema.optional(Schema.String),
    }),
  ),
  secondaryConnectorId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    connectorId: "connector_id",
    description: "description",
    haMode: "ha_mode",
    location: "location",
    secondaryConnectorId: "secondary_connector_id",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/magic/sites" }),
) as unknown as Schema.Schema<CreateSiteRequest>;

export interface CreateSiteResponse {
  /** Identifier */
  id?: string | null;
  /** Magic Connector identifier tag. */
  connectorId?: string | null;
  description?: string | null;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean | null;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string | null; lon?: string | null } | null;
  /** The name of the site. */
  name?: string | null;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string | null;
}

export const CreateSiteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  haMode: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  location: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lon: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  secondaryConnectorId: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      connectorId: "connector_id",
      description: "description",
      haMode: "ha_mode",
      location: "location",
      name: "name",
      secondaryConnectorId: "secondary_connector_id",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateSiteResponse>;

export type CreateSiteError = DefaultErrors;

export const createSite: API.OperationMethod<
  CreateSiteRequest,
  CreateSiteResponse,
  CreateSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSiteRequest,
  output: CreateSiteResponse,
  errors: [],
}));

export interface UpdateSiteRequest {
  siteId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: Magic Connector identifier tag. */
  connectorId?: string;
  /** Body param: */
  description?: string;
  /** Body param: Location of site in latitude and longitude. */
  location?: { lat?: string; lon?: string };
  /** Body param: The name of the site. */
  name?: string;
  /** Body param: Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string;
}

export const UpdateSiteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  connectorId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(
    Schema.Struct({
      lat: Schema.optional(Schema.String),
      lon: Schema.optional(Schema.String),
    }),
  ),
  name: Schema.optional(Schema.String),
  secondaryConnectorId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    connectorId: "connector_id",
    description: "description",
    location: "location",
    name: "name",
    secondaryConnectorId: "secondary_connector_id",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/sites/{siteId}",
  }),
) as unknown as Schema.Schema<UpdateSiteRequest>;

export interface UpdateSiteResponse {
  /** Identifier */
  id?: string | null;
  /** Magic Connector identifier tag. */
  connectorId?: string | null;
  description?: string | null;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean | null;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string | null; lon?: string | null } | null;
  /** The name of the site. */
  name?: string | null;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string | null;
}

export const UpdateSiteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  haMode: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  location: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lon: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  secondaryConnectorId: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      connectorId: "connector_id",
      description: "description",
      haMode: "ha_mode",
      location: "location",
      name: "name",
      secondaryConnectorId: "secondary_connector_id",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateSiteResponse>;

export type UpdateSiteError = DefaultErrors;

export const updateSite: API.OperationMethod<
  UpdateSiteRequest,
  UpdateSiteResponse,
  UpdateSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSiteRequest,
  output: UpdateSiteResponse,
  errors: [],
}));

export interface PatchSiteRequest {
  siteId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: Magic Connector identifier tag. */
  connectorId?: string;
  /** Body param: */
  description?: string;
  /** Body param: Location of site in latitude and longitude. */
  location?: { lat?: string; lon?: string };
  /** Body param: The name of the site. */
  name?: string;
  /** Body param: Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string;
}

export const PatchSiteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  connectorId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(
    Schema.Struct({
      lat: Schema.optional(Schema.String),
      lon: Schema.optional(Schema.String),
    }),
  ),
  name: Schema.optional(Schema.String),
  secondaryConnectorId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    connectorId: "connector_id",
    description: "description",
    location: "location",
    name: "name",
    secondaryConnectorId: "secondary_connector_id",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/sites/{siteId}",
  }),
) as unknown as Schema.Schema<PatchSiteRequest>;

export interface PatchSiteResponse {
  /** Identifier */
  id?: string | null;
  /** Magic Connector identifier tag. */
  connectorId?: string | null;
  description?: string | null;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean | null;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string | null; lon?: string | null } | null;
  /** The name of the site. */
  name?: string | null;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string | null;
}

export const PatchSiteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  haMode: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  location: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lon: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  secondaryConnectorId: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      connectorId: "connector_id",
      description: "description",
      haMode: "ha_mode",
      location: "location",
      name: "name",
      secondaryConnectorId: "secondary_connector_id",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchSiteResponse>;

export type PatchSiteError = DefaultErrors;

export const patchSite: API.OperationMethod<
  PatchSiteRequest,
  PatchSiteResponse,
  PatchSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSiteRequest,
  output: PatchSiteResponse,
  errors: [],
}));

export interface DeleteSiteRequest {
  siteId: string;
  /** Identifier */
  accountId: string;
}

export const DeleteSiteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/sites/{siteId}",
  }),
) as unknown as Schema.Schema<DeleteSiteRequest>;

export interface DeleteSiteResponse {
  /** Identifier */
  id?: string | null;
  /** Magic Connector identifier tag. */
  connectorId?: string | null;
  description?: string | null;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean | null;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string | null; lon?: string | null } | null;
  /** The name of the site. */
  name?: string | null;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string | null;
}

export const DeleteSiteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  haMode: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  location: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lon: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  secondaryConnectorId: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      connectorId: "connector_id",
      description: "description",
      haMode: "ha_mode",
      location: "location",
      name: "name",
      secondaryConnectorId: "secondary_connector_id",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteSiteResponse>;

export type DeleteSiteError = DefaultErrors;

export const deleteSite: API.OperationMethod<
  DeleteSiteRequest,
  DeleteSiteResponse,
  DeleteSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSiteRequest,
  output: DeleteSiteResponse,
  errors: [],
}));

// =============================================================================
// SiteAcl
// =============================================================================

export interface GetSiteAclRequest {
  siteId: string;
  aclId: string;
  /** Identifier */
  accountId: string;
}

export const GetSiteAclRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  aclId: Schema.String.pipe(T.HttpPath("aclId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls/{aclId}",
  }),
) as unknown as Schema.Schema<GetSiteAclRequest>;

export interface GetSiteAclResponse {
  /** Identifier */
  id?: string | null;
  /** Description for the ACL. */
  description?: string | null;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean | null;
  lan_1?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  lan_2?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  /** The name of the ACL. */
  name?: string | null;
  protocols?: ("tcp" | "udp" | "icmp")[] | null;
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean | null;
}

export const GetSiteAclResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  forwardLocally: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  lan_1: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  lan_2: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  protocols: Schema.optional(
    Schema.Union([
      Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
      Schema.Null,
    ]),
  ),
  unidirectional: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      description: "description",
      forwardLocally: "forward_locally",
      lan_1: "lan_1",
      lan_2: "lan_2",
      name: "name",
      protocols: "protocols",
      unidirectional: "unidirectional",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetSiteAclResponse>;

export type GetSiteAclError = DefaultErrors;

export const getSiteAcl: API.OperationMethod<
  GetSiteAclRequest,
  GetSiteAclResponse,
  GetSiteAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSiteAclRequest,
  output: GetSiteAclResponse,
  errors: [],
}));

export interface ListSiteAclsRequest {
  siteId: string;
  /** Identifier */
  accountId: string;
}

export const ListSiteAclsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls",
  }),
) as unknown as Schema.Schema<ListSiteAclsRequest>;

export interface ListSiteAclsResponse {
  result: {
    id?: string | null;
    description?: string | null;
    forwardLocally?: boolean | null;
    lan_1?: {
      lanId: string;
      lanName?: string | null;
      portRanges?: string[] | null;
      ports?: number[] | null;
      subnets?: string[] | null;
    } | null;
    lan_2?: {
      lanId: string;
      lanName?: string | null;
      portRanges?: string[] | null;
      ports?: number[] | null;
      subnets?: string[] | null;
    } | null;
    name?: string | null;
    protocols?: ("tcp" | "udp" | "icmp")[] | null;
    unidirectional?: boolean | null;
  }[];
}

export const ListSiteAclsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      forwardLocally: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      lan_1: Schema.optional(
        Schema.Union([
          Schema.Struct({
            lanId: Schema.String,
            lanName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            portRanges: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            ports: Schema.optional(
              Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
            ),
            subnets: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              lanId: "lan_id",
              lanName: "lan_name",
              portRanges: "port_ranges",
              ports: "ports",
              subnets: "subnets",
            }),
          ),
          Schema.Null,
        ]),
      ),
      lan_2: Schema.optional(
        Schema.Union([
          Schema.Struct({
            lanId: Schema.String,
            lanName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            portRanges: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            ports: Schema.optional(
              Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
            ),
            subnets: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              lanId: "lan_id",
              lanName: "lan_name",
              portRanges: "port_ranges",
              ports: "ports",
              subnets: "subnets",
            }),
          ),
          Schema.Null,
        ]),
      ),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      protocols: Schema.optional(
        Schema.Union([
          Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
          Schema.Null,
        ]),
      ),
      unidirectional: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        description: "description",
        forwardLocally: "forward_locally",
        lan_1: "lan_1",
        lan_2: "lan_2",
        name: "name",
        protocols: "protocols",
        unidirectional: "unidirectional",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListSiteAclsResponse>;

export type ListSiteAclsError = DefaultErrors;

export const listSiteAcls: API.PaginatedOperationMethod<
  ListSiteAclsRequest,
  ListSiteAclsResponse,
  ListSiteAclsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSiteAclsRequest,
  ) => stream.Stream<
    ListSiteAclsResponse,
    ListSiteAclsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListSiteAclsRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      description?: string | null;
      forwardLocally?: boolean | null;
      lan_1?: {
        lanId: string;
        lanName?: string | null;
        portRanges?: string[] | null;
        ports?: number[] | null;
        subnets?: string[] | null;
      } | null;
      lan_2?: {
        lanId: string;
        lanName?: string | null;
        portRanges?: string[] | null;
        ports?: number[] | null;
        subnets?: string[] | null;
      } | null;
      name?: string | null;
      protocols?: ("tcp" | "udp" | "icmp")[] | null;
      unidirectional?: boolean | null;
    },
    ListSiteAclsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSiteAclsRequest,
  output: ListSiteAclsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateSiteAclRequest {
  siteId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  lan_1: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** Body param: */
  lan_2: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** Body param: The name of the ACL. */
  name: string;
  /** Body param: Description for the ACL. */
  description?: string;
  /** Body param: The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic  */
  forwardLocally?: boolean;
  /** Body param: */
  protocols?: ("tcp" | "udp" | "icmp")[];
  /** Body param: The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If */
  unidirectional?: boolean;
}

export const CreateSiteAclRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  lan_1: Schema.Struct({
    lanId: Schema.String,
    lanName: Schema.optional(Schema.String),
    portRanges: Schema.optional(Schema.Array(Schema.String)),
    ports: Schema.optional(Schema.Array(Schema.Number)),
    subnets: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    Schema.encodeKeys({
      lanId: "lan_id",
      lanName: "lan_name",
      portRanges: "port_ranges",
      ports: "ports",
      subnets: "subnets",
    }),
  ),
  lan_2: Schema.Struct({
    lanId: Schema.String,
    lanName: Schema.optional(Schema.String),
    portRanges: Schema.optional(Schema.Array(Schema.String)),
    ports: Schema.optional(Schema.Array(Schema.Number)),
    subnets: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    Schema.encodeKeys({
      lanId: "lan_id",
      lanName: "lan_name",
      portRanges: "port_ranges",
      ports: "ports",
      subnets: "subnets",
    }),
  ),
  name: Schema.String,
  description: Schema.optional(Schema.String),
  forwardLocally: Schema.optional(Schema.Boolean),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    lan_1: "lan_1",
    lan_2: "lan_2",
    name: "name",
    description: "description",
    forwardLocally: "forward_locally",
    protocols: "protocols",
    unidirectional: "unidirectional",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls",
  }),
) as unknown as Schema.Schema<CreateSiteAclRequest>;

export interface CreateSiteAclResponse {
  /** Identifier */
  id?: string | null;
  /** Description for the ACL. */
  description?: string | null;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean | null;
  lan_1?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  lan_2?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  /** The name of the ACL. */
  name?: string | null;
  protocols?: ("tcp" | "udp" | "icmp")[] | null;
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean | null;
}

export const CreateSiteAclResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  forwardLocally: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  lan_1: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  lan_2: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  protocols: Schema.optional(
    Schema.Union([
      Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
      Schema.Null,
    ]),
  ),
  unidirectional: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      description: "description",
      forwardLocally: "forward_locally",
      lan_1: "lan_1",
      lan_2: "lan_2",
      name: "name",
      protocols: "protocols",
      unidirectional: "unidirectional",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateSiteAclResponse>;

export type CreateSiteAclError = DefaultErrors;

export const createSiteAcl: API.OperationMethod<
  CreateSiteAclRequest,
  CreateSiteAclResponse,
  CreateSiteAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSiteAclRequest,
  output: CreateSiteAclResponse,
  errors: [],
}));

export interface UpdateSiteAclRequest {
  siteId: string;
  aclId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: Description for the ACL. */
  description?: string;
  /** Body param: The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic  */
  forwardLocally?: boolean;
  /** Body param: */
  lan_1?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** Body param: */
  lan_2?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** Body param: The name of the ACL. */
  name?: string;
  /** Body param: */
  protocols?: ("tcp" | "udp" | "icmp")[];
  /** Body param: The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If */
  unidirectional?: boolean;
}

export const UpdateSiteAclRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  aclId: Schema.String.pipe(T.HttpPath("aclId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  description: Schema.optional(Schema.String),
  forwardLocally: Schema.optional(Schema.Boolean),
  lan_1: Schema.optional(
    Schema.Struct({
      lanId: Schema.String,
      lanName: Schema.optional(Schema.String),
      portRanges: Schema.optional(Schema.Array(Schema.String)),
      ports: Schema.optional(Schema.Array(Schema.Number)),
      subnets: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        lanId: "lan_id",
        lanName: "lan_name",
        portRanges: "port_ranges",
        ports: "ports",
        subnets: "subnets",
      }),
    ),
  ),
  lan_2: Schema.optional(
    Schema.Struct({
      lanId: Schema.String,
      lanName: Schema.optional(Schema.String),
      portRanges: Schema.optional(Schema.Array(Schema.String)),
      ports: Schema.optional(Schema.Array(Schema.Number)),
      subnets: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        lanId: "lan_id",
        lanName: "lan_name",
        portRanges: "port_ranges",
        ports: "ports",
        subnets: "subnets",
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    description: "description",
    forwardLocally: "forward_locally",
    lan_1: "lan_1",
    lan_2: "lan_2",
    name: "name",
    protocols: "protocols",
    unidirectional: "unidirectional",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls/{aclId}",
  }),
) as unknown as Schema.Schema<UpdateSiteAclRequest>;

export interface UpdateSiteAclResponse {
  /** Identifier */
  id?: string | null;
  /** Description for the ACL. */
  description?: string | null;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean | null;
  lan_1?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  lan_2?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  /** The name of the ACL. */
  name?: string | null;
  protocols?: ("tcp" | "udp" | "icmp")[] | null;
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean | null;
}

export const UpdateSiteAclResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  forwardLocally: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  lan_1: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  lan_2: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  protocols: Schema.optional(
    Schema.Union([
      Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
      Schema.Null,
    ]),
  ),
  unidirectional: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      description: "description",
      forwardLocally: "forward_locally",
      lan_1: "lan_1",
      lan_2: "lan_2",
      name: "name",
      protocols: "protocols",
      unidirectional: "unidirectional",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateSiteAclResponse>;

export type UpdateSiteAclError = DefaultErrors;

export const updateSiteAcl: API.OperationMethod<
  UpdateSiteAclRequest,
  UpdateSiteAclResponse,
  UpdateSiteAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSiteAclRequest,
  output: UpdateSiteAclResponse,
  errors: [],
}));

export interface PatchSiteAclRequest {
  siteId: string;
  aclId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: Description for the ACL. */
  description?: string;
  /** Body param: The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic  */
  forwardLocally?: boolean;
  /** Body param: */
  lan_1?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** Body param: */
  lan_2?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** Body param: The name of the ACL. */
  name?: string;
  /** Body param: */
  protocols?: ("tcp" | "udp" | "icmp")[];
  /** Body param: The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If */
  unidirectional?: boolean;
}

export const PatchSiteAclRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  aclId: Schema.String.pipe(T.HttpPath("aclId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  description: Schema.optional(Schema.String),
  forwardLocally: Schema.optional(Schema.Boolean),
  lan_1: Schema.optional(
    Schema.Struct({
      lanId: Schema.String,
      lanName: Schema.optional(Schema.String),
      portRanges: Schema.optional(Schema.Array(Schema.String)),
      ports: Schema.optional(Schema.Array(Schema.Number)),
      subnets: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        lanId: "lan_id",
        lanName: "lan_name",
        portRanges: "port_ranges",
        ports: "ports",
        subnets: "subnets",
      }),
    ),
  ),
  lan_2: Schema.optional(
    Schema.Struct({
      lanId: Schema.String,
      lanName: Schema.optional(Schema.String),
      portRanges: Schema.optional(Schema.Array(Schema.String)),
      ports: Schema.optional(Schema.Array(Schema.Number)),
      subnets: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        lanId: "lan_id",
        lanName: "lan_name",
        portRanges: "port_ranges",
        ports: "ports",
        subnets: "subnets",
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    description: "description",
    forwardLocally: "forward_locally",
    lan_1: "lan_1",
    lan_2: "lan_2",
    name: "name",
    protocols: "protocols",
    unidirectional: "unidirectional",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls/{aclId}",
  }),
) as unknown as Schema.Schema<PatchSiteAclRequest>;

export interface PatchSiteAclResponse {
  /** Identifier */
  id?: string | null;
  /** Description for the ACL. */
  description?: string | null;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean | null;
  lan_1?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  lan_2?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  /** The name of the ACL. */
  name?: string | null;
  protocols?: ("tcp" | "udp" | "icmp")[] | null;
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean | null;
}

export const PatchSiteAclResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  forwardLocally: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  lan_1: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  lan_2: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  protocols: Schema.optional(
    Schema.Union([
      Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
      Schema.Null,
    ]),
  ),
  unidirectional: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      description: "description",
      forwardLocally: "forward_locally",
      lan_1: "lan_1",
      lan_2: "lan_2",
      name: "name",
      protocols: "protocols",
      unidirectional: "unidirectional",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchSiteAclResponse>;

export type PatchSiteAclError = DefaultErrors;

export const patchSiteAcl: API.OperationMethod<
  PatchSiteAclRequest,
  PatchSiteAclResponse,
  PatchSiteAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSiteAclRequest,
  output: PatchSiteAclResponse,
  errors: [],
}));

export interface DeleteSiteAclRequest {
  siteId: string;
  aclId: string;
  /** Identifier */
  accountId: string;
}

export const DeleteSiteAclRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  aclId: Schema.String.pipe(T.HttpPath("aclId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls/{aclId}",
  }),
) as unknown as Schema.Schema<DeleteSiteAclRequest>;

export interface DeleteSiteAclResponse {
  /** Identifier */
  id?: string | null;
  /** Description for the ACL. */
  description?: string | null;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean | null;
  lan_1?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  lan_2?: {
    lanId: string;
    lanName?: string | null;
    portRanges?: string[] | null;
    ports?: number[] | null;
    subnets?: string[] | null;
  } | null;
  /** The name of the ACL. */
  name?: string | null;
  protocols?: ("tcp" | "udp" | "icmp")[] | null;
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean | null;
}

export const DeleteSiteAclResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  forwardLocally: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  lan_1: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  lan_2: Schema.optional(
    Schema.Union([
      Schema.Struct({
        lanId: Schema.String,
        lanName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        portRanges: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        ports: Schema.optional(
          Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
        ),
        subnets: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          lanId: "lan_id",
          lanName: "lan_name",
          portRanges: "port_ranges",
          ports: "ports",
          subnets: "subnets",
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  protocols: Schema.optional(
    Schema.Union([
      Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
      Schema.Null,
    ]),
  ),
  unidirectional: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      description: "description",
      forwardLocally: "forward_locally",
      lan_1: "lan_1",
      lan_2: "lan_2",
      name: "name",
      protocols: "protocols",
      unidirectional: "unidirectional",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteSiteAclResponse>;

export type DeleteSiteAclError = DefaultErrors;

export const deleteSiteAcl: API.OperationMethod<
  DeleteSiteAclRequest,
  DeleteSiteAclResponse,
  DeleteSiteAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSiteAclRequest,
  output: DeleteSiteAclResponse,
  errors: [],
}));

// =============================================================================
// SiteLan
// =============================================================================

export interface GetSiteLanRequest {
  siteId: string;
  lanId: string;
  /** Identifier */
  accountId: string;
}

export const GetSiteLanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  lanId: Schema.String.pipe(T.HttpPath("lanId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/lans/{lanId}",
  }),
) as unknown as Schema.Schema<GetSiteLanRequest>;

export interface GetSiteLanResponse {
  /** Identifier */
  id?: string | null;
  /** mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link. */
  haLink?: boolean | null;
  name?: string | null;
  nat?: { staticPrefix?: string | null } | null;
  physport?: number | null;
  routedSubnets?:
    | {
        nextHop: string;
        prefix: string;
        nat?: { staticPrefix?: string | null } | null;
      }[]
    | null;
  /** Identifier */
  siteId?: string | null;
  /** If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary a */
  staticAddressing?: {
    address: string;
    dhcpRelay?: { serverAddresses?: string[] | null } | null;
    dhcpServer?: {
      dhcpPoolEnd?: string | null;
      dhcpPoolStart?: string | null;
      dnsServer?: string | null;
      dnsServers?: string[] | null;
      reservations?: Record<string, unknown> | null;
    } | null;
    secondaryAddress?: string | null;
    virtualAddress?: string | null;
  } | null;
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number | null;
}

export const GetSiteLanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  haLink: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  nat: Schema.optional(
    Schema.Union([
      Schema.Struct({
        staticPrefix: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
      Schema.Null,
    ]),
  ),
  physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  routedSubnets: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          nextHop: Schema.String,
          prefix: Schema.String,
          nat: Schema.optional(
            Schema.Union([
              Schema.Struct({
                staticPrefix: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            nextHop: "next_hop",
            prefix: "prefix",
            nat: "nat",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  staticAddressing: Schema.optional(
    Schema.Union([
      Schema.Struct({
        address: Schema.String,
        dhcpRelay: Schema.optional(
          Schema.Union([
            Schema.Struct({
              serverAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }).pipe(Schema.encodeKeys({ serverAddresses: "server_addresses" })),
            Schema.Null,
          ]),
        ),
        dhcpServer: Schema.optional(
          Schema.Union([
            Schema.Struct({
              dhcpPoolEnd: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dhcpPoolStart: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dnsServer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dnsServers: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              reservations: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                dhcpPoolEnd: "dhcp_pool_end",
                dhcpPoolStart: "dhcp_pool_start",
                dnsServer: "dns_server",
                dnsServers: "dns_servers",
                reservations: "reservations",
              }),
            ),
            Schema.Null,
          ]),
        ),
        secondaryAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        virtualAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          address: "address",
          dhcpRelay: "dhcp_relay",
          dhcpServer: "dhcp_server",
          secondaryAddress: "secondary_address",
          virtualAddress: "virtual_address",
        }),
      ),
      Schema.Null,
    ]),
  ),
  vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      haLink: "ha_link",
      name: "name",
      nat: "nat",
      physport: "physport",
      routedSubnets: "routed_subnets",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetSiteLanResponse>;

export type GetSiteLanError = DefaultErrors;

export const getSiteLan: API.OperationMethod<
  GetSiteLanRequest,
  GetSiteLanResponse,
  GetSiteLanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSiteLanRequest,
  output: GetSiteLanResponse,
  errors: [],
}));

export interface ListSiteLansRequest {
  siteId: string;
  /** Identifier */
  accountId: string;
}

export const ListSiteLansRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/lans",
  }),
) as unknown as Schema.Schema<ListSiteLansRequest>;

export interface ListSiteLansResponse {
  result: {
    id?: string | null;
    haLink?: boolean | null;
    name?: string | null;
    nat?: { staticPrefix?: string | null } | null;
    physport?: number | null;
    routedSubnets?:
      | {
          nextHop: string;
          prefix: string;
          nat?: { staticPrefix?: string | null } | null;
        }[]
      | null;
    siteId?: string | null;
    staticAddressing?: {
      address: string;
      dhcpRelay?: { serverAddresses?: string[] | null } | null;
      dhcpServer?: {
        dhcpPoolEnd?: string | null;
        dhcpPoolStart?: string | null;
        dnsServer?: string | null;
        dnsServers?: string[] | null;
        reservations?: Record<string, unknown> | null;
      } | null;
      secondaryAddress?: string | null;
      virtualAddress?: string | null;
    } | null;
    vlanTag?: number | null;
  }[];
}

export const ListSiteLansResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      haLink: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      nat: Schema.optional(
        Schema.Union([
          Schema.Struct({
            staticPrefix: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
          Schema.Null,
        ]),
      ),
      physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      routedSubnets: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              nextHop: Schema.String,
              prefix: Schema.String,
              nat: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    staticPrefix: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                nextHop: "next_hop",
                prefix: "prefix",
                nat: "nat",
              }),
            ),
          ),
          Schema.Null,
        ]),
      ),
      siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      staticAddressing: Schema.optional(
        Schema.Union([
          Schema.Struct({
            address: Schema.String,
            dhcpRelay: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  serverAddresses: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({ serverAddresses: "server_addresses" }),
                ),
                Schema.Null,
              ]),
            ),
            dhcpServer: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  dhcpPoolEnd: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  dhcpPoolStart: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  dnsServer: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  dnsServers: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  reservations: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    dhcpPoolEnd: "dhcp_pool_end",
                    dhcpPoolStart: "dhcp_pool_start",
                    dnsServer: "dns_server",
                    dnsServers: "dns_servers",
                    reservations: "reservations",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            secondaryAddress: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            virtualAddress: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              address: "address",
              dhcpRelay: "dhcp_relay",
              dhcpServer: "dhcp_server",
              secondaryAddress: "secondary_address",
              virtualAddress: "virtual_address",
            }),
          ),
          Schema.Null,
        ]),
      ),
      vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        haLink: "ha_link",
        name: "name",
        nat: "nat",
        physport: "physport",
        routedSubnets: "routed_subnets",
        siteId: "site_id",
        staticAddressing: "static_addressing",
        vlanTag: "vlan_tag",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListSiteLansResponse>;

export type ListSiteLansError = DefaultErrors;

export const listSiteLans: API.PaginatedOperationMethod<
  ListSiteLansRequest,
  ListSiteLansResponse,
  ListSiteLansError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSiteLansRequest,
  ) => stream.Stream<
    ListSiteLansResponse,
    ListSiteLansError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListSiteLansRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      haLink?: boolean | null;
      name?: string | null;
      nat?: { staticPrefix?: string | null } | null;
      physport?: number | null;
      routedSubnets?:
        | {
            nextHop: string;
            prefix: string;
            nat?: { staticPrefix?: string | null } | null;
          }[]
        | null;
      siteId?: string | null;
      staticAddressing?: {
        address: string;
        dhcpRelay?: { serverAddresses?: string[] | null } | null;
        dhcpServer?: {
          dhcpPoolEnd?: string | null;
          dhcpPoolStart?: string | null;
          dnsServer?: string | null;
          dnsServers?: string[] | null;
          reservations?: Record<string, unknown> | null;
        } | null;
        secondaryAddress?: string | null;
        virtualAddress?: string | null;
      } | null;
      vlanTag?: number | null;
    },
    ListSiteLansError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSiteLansRequest,
  output: ListSiteLansResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateSiteLanRequest {
  siteId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  physport: number;
  /** Body param: mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link. */
  haLink?: boolean;
  /** Body param: */
  name?: string;
  /** Body param: */
  nat?: { staticPrefix?: string };
  /** Body param: */
  routedSubnets?: {
    nextHop: string;
    prefix: string;
    nat?: { staticPrefix?: string };
  }[];
  /** Body param: If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with */
  staticAddressing?: {
    address: string;
    dhcpRelay?: { serverAddresses?: string[] };
    dhcpServer?: {
      dhcpPoolEnd?: string;
      dhcpPoolStart?: string;
      dnsServer?: string;
      dnsServers?: string[];
      reservations?: Record<string, unknown>;
    };
    secondaryAddress?: string;
    virtualAddress?: string;
  };
  /** Body param: VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const CreateSiteLanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  physport: Schema.Number,
  haLink: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  nat: Schema.optional(
    Schema.Struct({
      staticPrefix: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
  ),
  routedSubnets: Schema.optional(
    Schema.Array(
      Schema.Struct({
        nextHop: Schema.String,
        prefix: Schema.String,
        nat: Schema.optional(
          Schema.Struct({
            staticPrefix: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
        ),
      }).pipe(
        Schema.encodeKeys({
          nextHop: "next_hop",
          prefix: "prefix",
          nat: "nat",
        }),
      ),
    ),
  ),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      dhcpRelay: Schema.optional(
        Schema.Struct({
          serverAddresses: Schema.optional(Schema.Array(Schema.String)),
        }).pipe(Schema.encodeKeys({ serverAddresses: "server_addresses" })),
      ),
      dhcpServer: Schema.optional(
        Schema.Struct({
          dhcpPoolEnd: Schema.optional(Schema.String),
          dhcpPoolStart: Schema.optional(Schema.String),
          dnsServer: Schema.optional(Schema.String),
          dnsServers: Schema.optional(Schema.Array(Schema.String)),
          reservations: Schema.optional(Schema.Struct({})),
        }).pipe(
          Schema.encodeKeys({
            dhcpPoolEnd: "dhcp_pool_end",
            dhcpPoolStart: "dhcp_pool_start",
            dnsServer: "dns_server",
            dnsServers: "dns_servers",
            reservations: "reservations",
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        address: "address",
        dhcpRelay: "dhcp_relay",
        dhcpServer: "dhcp_server",
        secondaryAddress: "secondary_address",
        virtualAddress: "virtual_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    physport: "physport",
    haLink: "ha_link",
    name: "name",
    nat: "nat",
    routedSubnets: "routed_subnets",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/sites/{siteId}/lans",
  }),
) as unknown as Schema.Schema<CreateSiteLanRequest>;

export interface CreateSiteLanResponse {
  result: {
    id?: string | null;
    haLink?: boolean | null;
    name?: string | null;
    nat?: { staticPrefix?: string | null } | null;
    physport?: number | null;
    routedSubnets?:
      | {
          nextHop: string;
          prefix: string;
          nat?: { staticPrefix?: string | null } | null;
        }[]
      | null;
    siteId?: string | null;
    staticAddressing?: {
      address: string;
      dhcpRelay?: { serverAddresses?: string[] | null } | null;
      dhcpServer?: {
        dhcpPoolEnd?: string | null;
        dhcpPoolStart?: string | null;
        dnsServer?: string | null;
        dnsServers?: string[] | null;
        reservations?: Record<string, unknown> | null;
      } | null;
      secondaryAddress?: string | null;
      virtualAddress?: string | null;
    } | null;
    vlanTag?: number | null;
  }[];
}

export const CreateSiteLanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      haLink: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      nat: Schema.optional(
        Schema.Union([
          Schema.Struct({
            staticPrefix: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
          Schema.Null,
        ]),
      ),
      physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      routedSubnets: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              nextHop: Schema.String,
              prefix: Schema.String,
              nat: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    staticPrefix: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                nextHop: "next_hop",
                prefix: "prefix",
                nat: "nat",
              }),
            ),
          ),
          Schema.Null,
        ]),
      ),
      siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      staticAddressing: Schema.optional(
        Schema.Union([
          Schema.Struct({
            address: Schema.String,
            dhcpRelay: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  serverAddresses: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({ serverAddresses: "server_addresses" }),
                ),
                Schema.Null,
              ]),
            ),
            dhcpServer: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  dhcpPoolEnd: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  dhcpPoolStart: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  dnsServer: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  dnsServers: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  reservations: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    dhcpPoolEnd: "dhcp_pool_end",
                    dhcpPoolStart: "dhcp_pool_start",
                    dnsServer: "dns_server",
                    dnsServers: "dns_servers",
                    reservations: "reservations",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            secondaryAddress: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            virtualAddress: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              address: "address",
              dhcpRelay: "dhcp_relay",
              dhcpServer: "dhcp_server",
              secondaryAddress: "secondary_address",
              virtualAddress: "virtual_address",
            }),
          ),
          Schema.Null,
        ]),
      ),
      vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        haLink: "ha_link",
        name: "name",
        nat: "nat",
        physport: "physport",
        routedSubnets: "routed_subnets",
        siteId: "site_id",
        staticAddressing: "static_addressing",
        vlanTag: "vlan_tag",
      }),
    ),
  ),
}) as unknown as Schema.Schema<CreateSiteLanResponse>;

export type CreateSiteLanError = DefaultErrors;

export const createSiteLan: API.PaginatedOperationMethod<
  CreateSiteLanRequest,
  CreateSiteLanResponse,
  CreateSiteLanError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: CreateSiteLanRequest,
  ) => stream.Stream<
    CreateSiteLanResponse,
    CreateSiteLanError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: CreateSiteLanRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      haLink?: boolean | null;
      name?: string | null;
      nat?: { staticPrefix?: string | null } | null;
      physport?: number | null;
      routedSubnets?:
        | {
            nextHop: string;
            prefix: string;
            nat?: { staticPrefix?: string | null } | null;
          }[]
        | null;
      siteId?: string | null;
      staticAddressing?: {
        address: string;
        dhcpRelay?: { serverAddresses?: string[] | null } | null;
        dhcpServer?: {
          dhcpPoolEnd?: string | null;
          dhcpPoolStart?: string | null;
          dnsServer?: string | null;
          dnsServers?: string[] | null;
          reservations?: Record<string, unknown> | null;
        } | null;
        secondaryAddress?: string | null;
        virtualAddress?: string | null;
      } | null;
      vlanTag?: number | null;
    },
    CreateSiteLanError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: CreateSiteLanRequest,
  output: CreateSiteLanResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface UpdateSiteLanRequest {
  siteId: string;
  lanId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  name?: string;
  /** Body param: */
  nat?: { staticPrefix?: string };
  /** Body param: */
  physport?: number;
  /** Body param: */
  routedSubnets?: {
    nextHop: string;
    prefix: string;
    nat?: { staticPrefix?: string };
  }[];
  /** Body param: If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with */
  staticAddressing?: {
    address: string;
    dhcpRelay?: { serverAddresses?: string[] };
    dhcpServer?: {
      dhcpPoolEnd?: string;
      dhcpPoolStart?: string;
      dnsServer?: string;
      dnsServers?: string[];
      reservations?: Record<string, unknown>;
    };
    secondaryAddress?: string;
    virtualAddress?: string;
  };
  /** Body param: VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const UpdateSiteLanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  lanId: Schema.String.pipe(T.HttpPath("lanId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String),
  nat: Schema.optional(
    Schema.Struct({
      staticPrefix: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
  ),
  physport: Schema.optional(Schema.Number),
  routedSubnets: Schema.optional(
    Schema.Array(
      Schema.Struct({
        nextHop: Schema.String,
        prefix: Schema.String,
        nat: Schema.optional(
          Schema.Struct({
            staticPrefix: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
        ),
      }).pipe(
        Schema.encodeKeys({
          nextHop: "next_hop",
          prefix: "prefix",
          nat: "nat",
        }),
      ),
    ),
  ),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      dhcpRelay: Schema.optional(
        Schema.Struct({
          serverAddresses: Schema.optional(Schema.Array(Schema.String)),
        }).pipe(Schema.encodeKeys({ serverAddresses: "server_addresses" })),
      ),
      dhcpServer: Schema.optional(
        Schema.Struct({
          dhcpPoolEnd: Schema.optional(Schema.String),
          dhcpPoolStart: Schema.optional(Schema.String),
          dnsServer: Schema.optional(Schema.String),
          dnsServers: Schema.optional(Schema.Array(Schema.String)),
          reservations: Schema.optional(Schema.Struct({})),
        }).pipe(
          Schema.encodeKeys({
            dhcpPoolEnd: "dhcp_pool_end",
            dhcpPoolStart: "dhcp_pool_start",
            dnsServer: "dns_server",
            dnsServers: "dns_servers",
            reservations: "reservations",
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        address: "address",
        dhcpRelay: "dhcp_relay",
        dhcpServer: "dhcp_server",
        secondaryAddress: "secondary_address",
        virtualAddress: "virtual_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    nat: "nat",
    physport: "physport",
    routedSubnets: "routed_subnets",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/sites/{siteId}/lans/{lanId}",
  }),
) as unknown as Schema.Schema<UpdateSiteLanRequest>;

export interface UpdateSiteLanResponse {
  /** Identifier */
  id?: string | null;
  /** mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link. */
  haLink?: boolean | null;
  name?: string | null;
  nat?: { staticPrefix?: string | null } | null;
  physport?: number | null;
  routedSubnets?:
    | {
        nextHop: string;
        prefix: string;
        nat?: { staticPrefix?: string | null } | null;
      }[]
    | null;
  /** Identifier */
  siteId?: string | null;
  /** If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary a */
  staticAddressing?: {
    address: string;
    dhcpRelay?: { serverAddresses?: string[] | null } | null;
    dhcpServer?: {
      dhcpPoolEnd?: string | null;
      dhcpPoolStart?: string | null;
      dnsServer?: string | null;
      dnsServers?: string[] | null;
      reservations?: Record<string, unknown> | null;
    } | null;
    secondaryAddress?: string | null;
    virtualAddress?: string | null;
  } | null;
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number | null;
}

export const UpdateSiteLanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  haLink: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  nat: Schema.optional(
    Schema.Union([
      Schema.Struct({
        staticPrefix: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
      Schema.Null,
    ]),
  ),
  physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  routedSubnets: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          nextHop: Schema.String,
          prefix: Schema.String,
          nat: Schema.optional(
            Schema.Union([
              Schema.Struct({
                staticPrefix: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            nextHop: "next_hop",
            prefix: "prefix",
            nat: "nat",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  staticAddressing: Schema.optional(
    Schema.Union([
      Schema.Struct({
        address: Schema.String,
        dhcpRelay: Schema.optional(
          Schema.Union([
            Schema.Struct({
              serverAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }).pipe(Schema.encodeKeys({ serverAddresses: "server_addresses" })),
            Schema.Null,
          ]),
        ),
        dhcpServer: Schema.optional(
          Schema.Union([
            Schema.Struct({
              dhcpPoolEnd: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dhcpPoolStart: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dnsServer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dnsServers: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              reservations: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                dhcpPoolEnd: "dhcp_pool_end",
                dhcpPoolStart: "dhcp_pool_start",
                dnsServer: "dns_server",
                dnsServers: "dns_servers",
                reservations: "reservations",
              }),
            ),
            Schema.Null,
          ]),
        ),
        secondaryAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        virtualAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          address: "address",
          dhcpRelay: "dhcp_relay",
          dhcpServer: "dhcp_server",
          secondaryAddress: "secondary_address",
          virtualAddress: "virtual_address",
        }),
      ),
      Schema.Null,
    ]),
  ),
  vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      haLink: "ha_link",
      name: "name",
      nat: "nat",
      physport: "physport",
      routedSubnets: "routed_subnets",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateSiteLanResponse>;

export type UpdateSiteLanError = DefaultErrors;

export const updateSiteLan: API.OperationMethod<
  UpdateSiteLanRequest,
  UpdateSiteLanResponse,
  UpdateSiteLanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSiteLanRequest,
  output: UpdateSiteLanResponse,
  errors: [],
}));

export interface PatchSiteLanRequest {
  siteId: string;
  lanId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  name?: string;
  /** Body param: */
  nat?: { staticPrefix?: string };
  /** Body param: */
  physport?: number;
  /** Body param: */
  routedSubnets?: {
    nextHop: string;
    prefix: string;
    nat?: { staticPrefix?: string };
  }[];
  /** Body param: If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with */
  staticAddressing?: {
    address: string;
    dhcpRelay?: { serverAddresses?: string[] };
    dhcpServer?: {
      dhcpPoolEnd?: string;
      dhcpPoolStart?: string;
      dnsServer?: string;
      dnsServers?: string[];
      reservations?: Record<string, unknown>;
    };
    secondaryAddress?: string;
    virtualAddress?: string;
  };
  /** Body param: VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const PatchSiteLanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  lanId: Schema.String.pipe(T.HttpPath("lanId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String),
  nat: Schema.optional(
    Schema.Struct({
      staticPrefix: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
  ),
  physport: Schema.optional(Schema.Number),
  routedSubnets: Schema.optional(
    Schema.Array(
      Schema.Struct({
        nextHop: Schema.String,
        prefix: Schema.String,
        nat: Schema.optional(
          Schema.Struct({
            staticPrefix: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
        ),
      }).pipe(
        Schema.encodeKeys({
          nextHop: "next_hop",
          prefix: "prefix",
          nat: "nat",
        }),
      ),
    ),
  ),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      dhcpRelay: Schema.optional(
        Schema.Struct({
          serverAddresses: Schema.optional(Schema.Array(Schema.String)),
        }).pipe(Schema.encodeKeys({ serverAddresses: "server_addresses" })),
      ),
      dhcpServer: Schema.optional(
        Schema.Struct({
          dhcpPoolEnd: Schema.optional(Schema.String),
          dhcpPoolStart: Schema.optional(Schema.String),
          dnsServer: Schema.optional(Schema.String),
          dnsServers: Schema.optional(Schema.Array(Schema.String)),
          reservations: Schema.optional(Schema.Struct({})),
        }).pipe(
          Schema.encodeKeys({
            dhcpPoolEnd: "dhcp_pool_end",
            dhcpPoolStart: "dhcp_pool_start",
            dnsServer: "dns_server",
            dnsServers: "dns_servers",
            reservations: "reservations",
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        address: "address",
        dhcpRelay: "dhcp_relay",
        dhcpServer: "dhcp_server",
        secondaryAddress: "secondary_address",
        virtualAddress: "virtual_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    nat: "nat",
    physport: "physport",
    routedSubnets: "routed_subnets",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/sites/{siteId}/lans/{lanId}",
  }),
) as unknown as Schema.Schema<PatchSiteLanRequest>;

export interface PatchSiteLanResponse {
  /** Identifier */
  id?: string | null;
  /** mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link. */
  haLink?: boolean | null;
  name?: string | null;
  nat?: { staticPrefix?: string | null } | null;
  physport?: number | null;
  routedSubnets?:
    | {
        nextHop: string;
        prefix: string;
        nat?: { staticPrefix?: string | null } | null;
      }[]
    | null;
  /** Identifier */
  siteId?: string | null;
  /** If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary a */
  staticAddressing?: {
    address: string;
    dhcpRelay?: { serverAddresses?: string[] | null } | null;
    dhcpServer?: {
      dhcpPoolEnd?: string | null;
      dhcpPoolStart?: string | null;
      dnsServer?: string | null;
      dnsServers?: string[] | null;
      reservations?: Record<string, unknown> | null;
    } | null;
    secondaryAddress?: string | null;
    virtualAddress?: string | null;
  } | null;
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number | null;
}

export const PatchSiteLanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  haLink: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  nat: Schema.optional(
    Schema.Union([
      Schema.Struct({
        staticPrefix: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
      Schema.Null,
    ]),
  ),
  physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  routedSubnets: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          nextHop: Schema.String,
          prefix: Schema.String,
          nat: Schema.optional(
            Schema.Union([
              Schema.Struct({
                staticPrefix: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            nextHop: "next_hop",
            prefix: "prefix",
            nat: "nat",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  staticAddressing: Schema.optional(
    Schema.Union([
      Schema.Struct({
        address: Schema.String,
        dhcpRelay: Schema.optional(
          Schema.Union([
            Schema.Struct({
              serverAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }).pipe(Schema.encodeKeys({ serverAddresses: "server_addresses" })),
            Schema.Null,
          ]),
        ),
        dhcpServer: Schema.optional(
          Schema.Union([
            Schema.Struct({
              dhcpPoolEnd: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dhcpPoolStart: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dnsServer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dnsServers: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              reservations: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                dhcpPoolEnd: "dhcp_pool_end",
                dhcpPoolStart: "dhcp_pool_start",
                dnsServer: "dns_server",
                dnsServers: "dns_servers",
                reservations: "reservations",
              }),
            ),
            Schema.Null,
          ]),
        ),
        secondaryAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        virtualAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          address: "address",
          dhcpRelay: "dhcp_relay",
          dhcpServer: "dhcp_server",
          secondaryAddress: "secondary_address",
          virtualAddress: "virtual_address",
        }),
      ),
      Schema.Null,
    ]),
  ),
  vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      haLink: "ha_link",
      name: "name",
      nat: "nat",
      physport: "physport",
      routedSubnets: "routed_subnets",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchSiteLanResponse>;

export type PatchSiteLanError = DefaultErrors;

export const patchSiteLan: API.OperationMethod<
  PatchSiteLanRequest,
  PatchSiteLanResponse,
  PatchSiteLanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSiteLanRequest,
  output: PatchSiteLanResponse,
  errors: [],
}));

export interface DeleteSiteLanRequest {
  siteId: string;
  lanId: string;
  /** Identifier */
  accountId: string;
}

export const DeleteSiteLanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  lanId: Schema.String.pipe(T.HttpPath("lanId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/sites/{siteId}/lans/{lanId}",
  }),
) as unknown as Schema.Schema<DeleteSiteLanRequest>;

export interface DeleteSiteLanResponse {
  /** Identifier */
  id?: string | null;
  /** mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link. */
  haLink?: boolean | null;
  name?: string | null;
  nat?: { staticPrefix?: string | null } | null;
  physport?: number | null;
  routedSubnets?:
    | {
        nextHop: string;
        prefix: string;
        nat?: { staticPrefix?: string | null } | null;
      }[]
    | null;
  /** Identifier */
  siteId?: string | null;
  /** If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary a */
  staticAddressing?: {
    address: string;
    dhcpRelay?: { serverAddresses?: string[] | null } | null;
    dhcpServer?: {
      dhcpPoolEnd?: string | null;
      dhcpPoolStart?: string | null;
      dnsServer?: string | null;
      dnsServers?: string[] | null;
      reservations?: Record<string, unknown> | null;
    } | null;
    secondaryAddress?: string | null;
    virtualAddress?: string | null;
  } | null;
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number | null;
}

export const DeleteSiteLanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  haLink: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  nat: Schema.optional(
    Schema.Union([
      Schema.Struct({
        staticPrefix: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
      Schema.Null,
    ]),
  ),
  physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  routedSubnets: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          nextHop: Schema.String,
          prefix: Schema.String,
          nat: Schema.optional(
            Schema.Union([
              Schema.Struct({
                staticPrefix: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ staticPrefix: "static_prefix" })),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            nextHop: "next_hop",
            prefix: "prefix",
            nat: "nat",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  staticAddressing: Schema.optional(
    Schema.Union([
      Schema.Struct({
        address: Schema.String,
        dhcpRelay: Schema.optional(
          Schema.Union([
            Schema.Struct({
              serverAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }).pipe(Schema.encodeKeys({ serverAddresses: "server_addresses" })),
            Schema.Null,
          ]),
        ),
        dhcpServer: Schema.optional(
          Schema.Union([
            Schema.Struct({
              dhcpPoolEnd: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dhcpPoolStart: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dnsServer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              dnsServers: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              reservations: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                dhcpPoolEnd: "dhcp_pool_end",
                dhcpPoolStart: "dhcp_pool_start",
                dnsServer: "dns_server",
                dnsServers: "dns_servers",
                reservations: "reservations",
              }),
            ),
            Schema.Null,
          ]),
        ),
        secondaryAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        virtualAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          address: "address",
          dhcpRelay: "dhcp_relay",
          dhcpServer: "dhcp_server",
          secondaryAddress: "secondary_address",
          virtualAddress: "virtual_address",
        }),
      ),
      Schema.Null,
    ]),
  ),
  vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      haLink: "ha_link",
      name: "name",
      nat: "nat",
      physport: "physport",
      routedSubnets: "routed_subnets",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteSiteLanResponse>;

export type DeleteSiteLanError = DefaultErrors;

export const deleteSiteLan: API.OperationMethod<
  DeleteSiteLanRequest,
  DeleteSiteLanResponse,
  DeleteSiteLanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSiteLanRequest,
  output: DeleteSiteLanResponse,
  errors: [],
}));

// =============================================================================
// SiteWan
// =============================================================================

export interface GetSiteWanRequest {
  siteId: string;
  wanId: string;
  /** Identifier */
  accountId: string;
}

export const GetSiteWanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  wanId: Schema.String.pipe(T.HttpPath("wanId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/wans/{wanId}",
  }),
) as unknown as Schema.Schema<GetSiteWanRequest>;

export interface GetSiteWanResponse {
  /** Identifier */
  id?: string | null;
  /** Magic WAN health check rate for tunnels created on this link. The default value is `mid`. */
  healthCheckRate?: "low" | "mid" | "high" | null;
  name?: string | null;
  physport?: number | null;
  /** Priority of WAN for traffic loadbalancing. */
  priority?: number | null;
  /** Identifier */
  siteId?: string | null;
  /** (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string | null;
  } | null;
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number | null;
}

export const GetSiteWanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  healthCheckRate: Schema.optional(
    Schema.Union([Schema.Literals(["low", "mid", "high"]), Schema.Null]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  staticAddressing: Schema.optional(
    Schema.Union([
      Schema.Struct({
        address: Schema.String,
        gatewayAddress: Schema.String,
        secondaryAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          address: "address",
          gatewayAddress: "gateway_address",
          secondaryAddress: "secondary_address",
        }),
      ),
      Schema.Null,
    ]),
  ),
  vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      healthCheckRate: "health_check_rate",
      name: "name",
      physport: "physport",
      priority: "priority",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetSiteWanResponse>;

export type GetSiteWanError = DefaultErrors;

export const getSiteWan: API.OperationMethod<
  GetSiteWanRequest,
  GetSiteWanResponse,
  GetSiteWanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSiteWanRequest,
  output: GetSiteWanResponse,
  errors: [],
}));

export interface ListSiteWansRequest {
  siteId: string;
  /** Identifier */
  accountId: string;
}

export const ListSiteWansRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/wans",
  }),
) as unknown as Schema.Schema<ListSiteWansRequest>;

export interface ListSiteWansResponse {
  result: {
    id?: string | null;
    healthCheckRate?: "low" | "mid" | "high" | null;
    name?: string | null;
    physport?: number | null;
    priority?: number | null;
    siteId?: string | null;
    staticAddressing?: {
      address: string;
      gatewayAddress: string;
      secondaryAddress?: string | null;
    } | null;
    vlanTag?: number | null;
  }[];
}

export const ListSiteWansResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      healthCheckRate: Schema.optional(
        Schema.Union([Schema.Literals(["low", "mid", "high"]), Schema.Null]),
      ),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      staticAddressing: Schema.optional(
        Schema.Union([
          Schema.Struct({
            address: Schema.String,
            gatewayAddress: Schema.String,
            secondaryAddress: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              address: "address",
              gatewayAddress: "gateway_address",
              secondaryAddress: "secondary_address",
            }),
          ),
          Schema.Null,
        ]),
      ),
      vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        healthCheckRate: "health_check_rate",
        name: "name",
        physport: "physport",
        priority: "priority",
        siteId: "site_id",
        staticAddressing: "static_addressing",
        vlanTag: "vlan_tag",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListSiteWansResponse>;

export type ListSiteWansError = DefaultErrors;

export const listSiteWans: API.PaginatedOperationMethod<
  ListSiteWansRequest,
  ListSiteWansResponse,
  ListSiteWansError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSiteWansRequest,
  ) => stream.Stream<
    ListSiteWansResponse,
    ListSiteWansError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListSiteWansRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      healthCheckRate?: "low" | "mid" | "high" | null;
      name?: string | null;
      physport?: number | null;
      priority?: number | null;
      siteId?: string | null;
      staticAddressing?: {
        address: string;
        gatewayAddress: string;
        secondaryAddress?: string | null;
      } | null;
      vlanTag?: number | null;
    },
    ListSiteWansError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSiteWansRequest,
  output: ListSiteWansResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateSiteWanRequest {
  siteId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  physport: number;
  /** Body param: */
  name?: string;
  /** Body param: */
  priority?: number;
  /** Body param: (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string;
  };
  /** Body param: VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const CreateSiteWanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  physport: Schema.Number,
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      gatewayAddress: Schema.String,
      secondaryAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        address: "address",
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    physport: "physport",
    name: "name",
    priority: "priority",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/sites/{siteId}/wans",
  }),
) as unknown as Schema.Schema<CreateSiteWanRequest>;

export interface CreateSiteWanResponse {
  result: {
    id?: string | null;
    healthCheckRate?: "low" | "mid" | "high" | null;
    name?: string | null;
    physport?: number | null;
    priority?: number | null;
    siteId?: string | null;
    staticAddressing?: {
      address: string;
      gatewayAddress: string;
      secondaryAddress?: string | null;
    } | null;
    vlanTag?: number | null;
  }[];
}

export const CreateSiteWanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      healthCheckRate: Schema.optional(
        Schema.Union([Schema.Literals(["low", "mid", "high"]), Schema.Null]),
      ),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      staticAddressing: Schema.optional(
        Schema.Union([
          Schema.Struct({
            address: Schema.String,
            gatewayAddress: Schema.String,
            secondaryAddress: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              address: "address",
              gatewayAddress: "gateway_address",
              secondaryAddress: "secondary_address",
            }),
          ),
          Schema.Null,
        ]),
      ),
      vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        healthCheckRate: "health_check_rate",
        name: "name",
        physport: "physport",
        priority: "priority",
        siteId: "site_id",
        staticAddressing: "static_addressing",
        vlanTag: "vlan_tag",
      }),
    ),
  ),
}) as unknown as Schema.Schema<CreateSiteWanResponse>;

export type CreateSiteWanError = DefaultErrors;

export const createSiteWan: API.PaginatedOperationMethod<
  CreateSiteWanRequest,
  CreateSiteWanResponse,
  CreateSiteWanError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: CreateSiteWanRequest,
  ) => stream.Stream<
    CreateSiteWanResponse,
    CreateSiteWanError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: CreateSiteWanRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      healthCheckRate?: "low" | "mid" | "high" | null;
      name?: string | null;
      physport?: number | null;
      priority?: number | null;
      siteId?: string | null;
      staticAddressing?: {
        address: string;
        gatewayAddress: string;
        secondaryAddress?: string | null;
      } | null;
      vlanTag?: number | null;
    },
    CreateSiteWanError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: CreateSiteWanRequest,
  output: CreateSiteWanResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface UpdateSiteWanRequest {
  siteId: string;
  wanId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  name?: string;
  /** Body param: */
  physport?: number;
  /** Body param: */
  priority?: number;
  /** Body param: (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string;
  };
  /** Body param: VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const UpdateSiteWanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  wanId: Schema.String.pipe(T.HttpPath("wanId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String),
  physport: Schema.optional(Schema.Number),
  priority: Schema.optional(Schema.Number),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      gatewayAddress: Schema.String,
      secondaryAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        address: "address",
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    physport: "physport",
    priority: "priority",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/sites/{siteId}/wans/{wanId}",
  }),
) as unknown as Schema.Schema<UpdateSiteWanRequest>;

export interface UpdateSiteWanResponse {
  /** Identifier */
  id?: string | null;
  /** Magic WAN health check rate for tunnels created on this link. The default value is `mid`. */
  healthCheckRate?: "low" | "mid" | "high" | null;
  name?: string | null;
  physport?: number | null;
  /** Priority of WAN for traffic loadbalancing. */
  priority?: number | null;
  /** Identifier */
  siteId?: string | null;
  /** (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string | null;
  } | null;
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number | null;
}

export const UpdateSiteWanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  healthCheckRate: Schema.optional(
    Schema.Union([Schema.Literals(["low", "mid", "high"]), Schema.Null]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  staticAddressing: Schema.optional(
    Schema.Union([
      Schema.Struct({
        address: Schema.String,
        gatewayAddress: Schema.String,
        secondaryAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          address: "address",
          gatewayAddress: "gateway_address",
          secondaryAddress: "secondary_address",
        }),
      ),
      Schema.Null,
    ]),
  ),
  vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      healthCheckRate: "health_check_rate",
      name: "name",
      physport: "physport",
      priority: "priority",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateSiteWanResponse>;

export type UpdateSiteWanError = DefaultErrors;

export const updateSiteWan: API.OperationMethod<
  UpdateSiteWanRequest,
  UpdateSiteWanResponse,
  UpdateSiteWanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSiteWanRequest,
  output: UpdateSiteWanResponse,
  errors: [],
}));

export interface PatchSiteWanRequest {
  siteId: string;
  wanId: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  name?: string;
  /** Body param: */
  physport?: number;
  /** Body param: */
  priority?: number;
  /** Body param: (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string;
  };
  /** Body param: VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const PatchSiteWanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  wanId: Schema.String.pipe(T.HttpPath("wanId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String),
  physport: Schema.optional(Schema.Number),
  priority: Schema.optional(Schema.Number),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      gatewayAddress: Schema.String,
      secondaryAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        address: "address",
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    physport: "physport",
    priority: "priority",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/sites/{siteId}/wans/{wanId}",
  }),
) as unknown as Schema.Schema<PatchSiteWanRequest>;

export interface PatchSiteWanResponse {
  /** Identifier */
  id?: string | null;
  /** Magic WAN health check rate for tunnels created on this link. The default value is `mid`. */
  healthCheckRate?: "low" | "mid" | "high" | null;
  name?: string | null;
  physport?: number | null;
  /** Priority of WAN for traffic loadbalancing. */
  priority?: number | null;
  /** Identifier */
  siteId?: string | null;
  /** (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string | null;
  } | null;
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number | null;
}

export const PatchSiteWanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  healthCheckRate: Schema.optional(
    Schema.Union([Schema.Literals(["low", "mid", "high"]), Schema.Null]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  staticAddressing: Schema.optional(
    Schema.Union([
      Schema.Struct({
        address: Schema.String,
        gatewayAddress: Schema.String,
        secondaryAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          address: "address",
          gatewayAddress: "gateway_address",
          secondaryAddress: "secondary_address",
        }),
      ),
      Schema.Null,
    ]),
  ),
  vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      healthCheckRate: "health_check_rate",
      name: "name",
      physport: "physport",
      priority: "priority",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchSiteWanResponse>;

export type PatchSiteWanError = DefaultErrors;

export const patchSiteWan: API.OperationMethod<
  PatchSiteWanRequest,
  PatchSiteWanResponse,
  PatchSiteWanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSiteWanRequest,
  output: PatchSiteWanResponse,
  errors: [],
}));

export interface DeleteSiteWanRequest {
  siteId: string;
  wanId: string;
  /** Identifier */
  accountId: string;
}

export const DeleteSiteWanRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  wanId: Schema.String.pipe(T.HttpPath("wanId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/sites/{siteId}/wans/{wanId}",
  }),
) as unknown as Schema.Schema<DeleteSiteWanRequest>;

export interface DeleteSiteWanResponse {
  /** Identifier */
  id?: string | null;
  /** Magic WAN health check rate for tunnels created on this link. The default value is `mid`. */
  healthCheckRate?: "low" | "mid" | "high" | null;
  name?: string | null;
  physport?: number | null;
  /** Priority of WAN for traffic loadbalancing. */
  priority?: number | null;
  /** Identifier */
  siteId?: string | null;
  /** (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string | null;
  } | null;
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number | null;
}

export const DeleteSiteWanResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  healthCheckRate: Schema.optional(
    Schema.Union([Schema.Literals(["low", "mid", "high"]), Schema.Null]),
  ),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  physport: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  siteId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  staticAddressing: Schema.optional(
    Schema.Union([
      Schema.Struct({
        address: Schema.String,
        gatewayAddress: Schema.String,
        secondaryAddress: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          address: "address",
          gatewayAddress: "gateway_address",
          secondaryAddress: "secondary_address",
        }),
      ),
      Schema.Null,
    ]),
  ),
  vlanTag: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      healthCheckRate: "health_check_rate",
      name: "name",
      physport: "physport",
      priority: "priority",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteSiteWanResponse>;

export type DeleteSiteWanError = DefaultErrors;

export const deleteSiteWan: API.OperationMethod<
  DeleteSiteWanRequest,
  DeleteSiteWanResponse,
  DeleteSiteWanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSiteWanRequest,
  output: DeleteSiteWanResponse,
  errors: [],
}));
