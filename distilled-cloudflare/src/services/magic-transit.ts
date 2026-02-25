/**
 * Cloudflare MAGIC-TRANSIT API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service magic-transit
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
// App
// =============================================================================

export interface ListAppsRequest {
  /** Identifier */
  accountId: string;
}

export const ListAppsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/apps" }),
) as unknown as Schema.Schema<ListAppsRequest>;

export type ListAppsResponse = (
  | {
      accountAppId: string;
      hostnames?: string[];
      ipSubnets?: string[];
      name?: string;
      type?: string;
    }
  | {
      managedAppId: string;
      hostnames?: string[];
      ipSubnets?: string[];
      name?: string;
      type?: string;
    }
)[];

export const ListAppsResponse = Schema.Array(
  Schema.Union([
    Schema.Struct({
      accountAppId: Schema.String,
      hostnames: Schema.optional(Schema.Array(Schema.String)),
      ipSubnets: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        accountAppId: "account_app_id",
        ipSubnets: "ip_subnets",
      }),
    ),
    Schema.Struct({
      managedAppId: Schema.String,
      hostnames: Schema.optional(Schema.Array(Schema.String)),
      ipSubnets: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        managedAppId: "managed_app_id",
        ipSubnets: "ip_subnets",
      }),
    ),
  ]),
) as unknown as Schema.Schema<ListAppsResponse>;

export const listApps: (
  input: ListAppsRequest,
) => Effect.Effect<
  ListAppsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAppsRequest,
  output: ListAppsResponse,
  errors: [],
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

export const CreateAppRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  type: Schema.String,
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({ ipSubnets: "ip_subnets" }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/magic/apps" }),
) as unknown as Schema.Schema<CreateAppRequest>;

export interface CreateAppResponse {
  /** Magic account app ID. */
  accountAppId: string;
  /** FQDNs to associate with traffic decisions. */
  hostnames?: string[];
  /** IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[];
  /** Display name for the app. */
  name?: string;
  /** Category of the app. */
  type?: string;
}

export const CreateAppResponse = Schema.Struct({
  accountAppId: Schema.String,
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    accountAppId: "account_app_id",
    ipSubnets: "ip_subnets",
  }),
) as unknown as Schema.Schema<CreateAppResponse>;

export const createApp: (
  input: CreateAppRequest,
) => Effect.Effect<
  CreateAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateAppRequest = Schema.Struct({
  accountAppId: Schema.String.pipe(T.HttpPath("accountAppId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ ipSubnets: "ip_subnets" }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/apps/{accountAppId}",
  }),
) as unknown as Schema.Schema<UpdateAppRequest>;

export interface UpdateAppResponse {
  /** Magic account app ID. */
  accountAppId: string;
  /** FQDNs to associate with traffic decisions. */
  hostnames?: string[];
  /** IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[];
  /** Display name for the app. */
  name?: string;
  /** Category of the app. */
  type?: string;
}

export const UpdateAppResponse = Schema.Struct({
  accountAppId: Schema.String,
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    accountAppId: "account_app_id",
    ipSubnets: "ip_subnets",
  }),
) as unknown as Schema.Schema<UpdateAppResponse>;

export const updateApp: (
  input: UpdateAppRequest,
) => Effect.Effect<
  UpdateAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PatchAppRequest = Schema.Struct({
  accountAppId: Schema.String.pipe(T.HttpPath("accountAppId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ ipSubnets: "ip_subnets" }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/apps/{accountAppId}",
  }),
) as unknown as Schema.Schema<PatchAppRequest>;

export interface PatchAppResponse {
  /** Magic account app ID. */
  accountAppId: string;
  /** FQDNs to associate with traffic decisions. */
  hostnames?: string[];
  /** IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[];
  /** Display name for the app. */
  name?: string;
  /** Category of the app. */
  type?: string;
}

export const PatchAppResponse = Schema.Struct({
  accountAppId: Schema.String,
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    accountAppId: "account_app_id",
    ipSubnets: "ip_subnets",
  }),
) as unknown as Schema.Schema<PatchAppResponse>;

export const patchApp: (
  input: PatchAppRequest,
) => Effect.Effect<
  PatchAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAppRequest,
  output: PatchAppResponse,
  errors: [],
}));

export interface DeleteAppRequest {
  accountAppId: string;
  /** Identifier */
  accountId: string;
}

export const DeleteAppRequest = Schema.Struct({
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
  hostnames?: string[];
  /** IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported) */
  ipSubnets?: string[];
  /** Display name for the app. */
  name?: string;
  /** Category of the app. */
  type?: string;
}

export const DeleteAppResponse = Schema.Struct({
  accountAppId: Schema.String,
  hostnames: Schema.optional(Schema.Array(Schema.String)),
  ipSubnets: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    accountAppId: "account_app_id",
    ipSubnets: "ip_subnets",
  }),
) as unknown as Schema.Schema<DeleteAppResponse>;

export const deleteApp: (
  input: DeleteAppRequest,
) => Effect.Effect<
  DeleteAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetCfInterconnectRequest = Schema.Struct({
  cfInterconnectId: Schema.String.pipe(T.HttpPath("cfInterconnectId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cf_interconnects/{cfInterconnectId}",
  }),
) as unknown as Schema.Schema<GetCfInterconnectRequest>;

export interface GetCfInterconnectResponse {
  interconnect?: {
    id?: string;
    automaticReturnRouting?: boolean;
    coloName?: string;
    createdOn?: string;
    description?: string;
    gre?: { cloudflareEndpoint?: string };
    healthCheck?: unknown;
    interfaceAddress?: string;
    interfaceAddress6?: string;
    modifiedOn?: string;
    mtu?: number;
    name?: string;
  };
}

export const GetCfInterconnectResponse = Schema.Struct({
  interconnect: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      automaticReturnRouting: Schema.optional(Schema.Boolean),
      coloName: Schema.optional(Schema.String),
      createdOn: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      gre: Schema.optional(
        Schema.Struct({
          cloudflareEndpoint: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({ cloudflareEndpoint: "cloudflare_endpoint" }),
        ),
      ),
      healthCheck: Schema.optional(Schema.Unknown),
      interfaceAddress: Schema.optional(Schema.String),
      interfaceAddress6: Schema.optional(Schema.String),
      modifiedOn: Schema.optional(Schema.String),
      mtu: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        automaticReturnRouting: "automatic_return_routing",
        coloName: "colo_name",
        createdOn: "created_on",
        healthCheck: "health_check",
        interfaceAddress: "interface_address",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
      }),
    ),
  ),
}) as unknown as Schema.Schema<GetCfInterconnectResponse>;

export const getCfInterconnect: (
  input: GetCfInterconnectRequest,
) => Effect.Effect<
  GetCfInterconnectResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListCfInterconnectsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cf_interconnects",
  }),
) as unknown as Schema.Schema<ListCfInterconnectsRequest>;

export interface ListCfInterconnectsResponse {
  interconnects?: {
    id?: string;
    automaticReturnRouting?: boolean;
    coloName?: string;
    createdOn?: string;
    description?: string;
    gre?: { cloudflareEndpoint?: string };
    healthCheck?: unknown;
    interfaceAddress?: string;
    interfaceAddress6?: string;
    modifiedOn?: string;
    mtu?: number;
    name?: string;
  }[];
}

export const ListCfInterconnectsResponse = Schema.Struct({
  interconnects: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        automaticReturnRouting: Schema.optional(Schema.Boolean),
        coloName: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        gre: Schema.optional(
          Schema.Struct({
            cloudflareEndpoint: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({ cloudflareEndpoint: "cloudflare_endpoint" }),
          ),
        ),
        healthCheck: Schema.optional(Schema.Unknown),
        interfaceAddress: Schema.optional(Schema.String),
        interfaceAddress6: Schema.optional(Schema.String),
        modifiedOn: Schema.optional(Schema.String),
        mtu: Schema.optional(Schema.Number),
        name: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          automaticReturnRouting: "automatic_return_routing",
          coloName: "colo_name",
          createdOn: "created_on",
          healthCheck: "health_check",
          interfaceAddress: "interface_address",
          interfaceAddress6: "interface_address6",
          modifiedOn: "modified_on",
        }),
      ),
    ),
  ),
}) as unknown as Schema.Schema<ListCfInterconnectsResponse>;

export const listCfInterconnects: (
  input: ListCfInterconnectsRequest,
) => Effect.Effect<
  ListCfInterconnectsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PutCfInterconnectRequest = Schema.Struct({
  cfInterconnectId: Schema.String.pipe(T.HttpPath("cfInterconnectId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
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
    healthCheck: "health_check",
    interfaceAddress: "interface_address",
    interfaceAddress6: "interface_address6",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/cf_interconnects/{cfInterconnectId}",
  }),
) as unknown as Schema.Schema<PutCfInterconnectRequest>;

export interface PutCfInterconnectResponse {
  modified?: boolean;
  modifiedInterconnect?: {
    id?: string;
    automaticReturnRouting?: boolean;
    coloName?: string;
    createdOn?: string;
    description?: string;
    gre?: { cloudflareEndpoint?: string };
    healthCheck?: unknown;
    interfaceAddress?: string;
    interfaceAddress6?: string;
    modifiedOn?: string;
    mtu?: number;
    name?: string;
  };
}

export const PutCfInterconnectResponse = Schema.Struct({
  modified: Schema.optional(Schema.Boolean),
  modifiedInterconnect: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      automaticReturnRouting: Schema.optional(Schema.Boolean),
      coloName: Schema.optional(Schema.String),
      createdOn: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      gre: Schema.optional(
        Schema.Struct({
          cloudflareEndpoint: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({ cloudflareEndpoint: "cloudflare_endpoint" }),
        ),
      ),
      healthCheck: Schema.optional(Schema.Unknown),
      interfaceAddress: Schema.optional(Schema.String),
      interfaceAddress6: Schema.optional(Schema.String),
      modifiedOn: Schema.optional(Schema.String),
      mtu: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        automaticReturnRouting: "automatic_return_routing",
        coloName: "colo_name",
        createdOn: "created_on",
        healthCheck: "health_check",
        interfaceAddress: "interface_address",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ modifiedInterconnect: "modified_interconnect" }),
) as unknown as Schema.Schema<PutCfInterconnectResponse>;

export const putCfInterconnect: (
  input: PutCfInterconnectRequest,
) => Effect.Effect<
  PutCfInterconnectResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetConnectorRequest = Schema.Struct({
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
  device?: { id: string; serialNumber?: string };
  lastHeartbeat?: string;
  lastSeenVersion?: string;
  licenseKey?: string;
}

export const GetConnectorResponse = Schema.Struct({
  id: Schema.String,
  activated: Schema.Boolean,
  interruptWindowDurationHours: Schema.Number,
  interruptWindowHourOfDay: Schema.Number,
  lastUpdated: Schema.String,
  notes: Schema.String,
  timezone: Schema.String,
  device: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      serialNumber: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ serialNumber: "serial_number" })),
  ),
  lastHeartbeat: Schema.optional(Schema.String),
  lastSeenVersion: Schema.optional(Schema.String),
  licenseKey: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    lastUpdated: "last_updated",
    lastHeartbeat: "last_heartbeat",
    lastSeenVersion: "last_seen_version",
    licenseKey: "license_key",
  }),
) as unknown as Schema.Schema<GetConnectorResponse>;

export const getConnector: (
  input: GetConnectorRequest,
) => Effect.Effect<
  GetConnectorResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetConnectorRequest,
  output: GetConnectorResponse,
  errors: [],
}));

export interface ListConnectorsRequest {
  /** Account identifier */
  accountId: string;
}

export const ListConnectorsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/connectors" }),
) as unknown as Schema.Schema<ListConnectorsRequest>;

export type ListConnectorsResponse = {
  id: string;
  activated: boolean;
  interruptWindowDurationHours: number;
  interruptWindowHourOfDay: number;
  lastUpdated: string;
  notes: string;
  timezone: string;
  device?: { id: string; serialNumber?: string };
  lastHeartbeat?: string;
  lastSeenVersion?: string;
  licenseKey?: string;
}[];

export const ListConnectorsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    activated: Schema.Boolean,
    interruptWindowDurationHours: Schema.Number,
    interruptWindowHourOfDay: Schema.Number,
    lastUpdated: Schema.String,
    notes: Schema.String,
    timezone: Schema.String,
    device: Schema.optional(
      Schema.Struct({
        id: Schema.String,
        serialNumber: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ serialNumber: "serial_number" })),
    ),
    lastHeartbeat: Schema.optional(Schema.String),
    lastSeenVersion: Schema.optional(Schema.String),
    licenseKey: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      interruptWindowDurationHours: "interrupt_window_duration_hours",
      interruptWindowHourOfDay: "interrupt_window_hour_of_day",
      lastUpdated: "last_updated",
      lastHeartbeat: "last_heartbeat",
      lastSeenVersion: "last_seen_version",
      licenseKey: "license_key",
    }),
  ),
) as unknown as Schema.Schema<ListConnectorsResponse>;

export const listConnectors: (
  input: ListConnectorsRequest,
) => Effect.Effect<
  ListConnectorsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListConnectorsRequest,
  output: ListConnectorsResponse,
  errors: [],
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

export const CreateConnectorRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  device: Schema.Struct({
    id: Schema.optional(Schema.String),
    provisionLicense: Schema.optional(Schema.Boolean),
    serialNumber: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      provisionLicense: "provision_license",
      serialNumber: "serial_number",
    }),
  ),
  activated: Schema.optional(Schema.Boolean),
  interruptWindowDurationHours: Schema.optional(Schema.Number),
  interruptWindowHourOfDay: Schema.optional(Schema.Number),
  notes: Schema.optional(Schema.String),
  timezone: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
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
  device?: { id: string; serialNumber?: string };
  lastHeartbeat?: string;
  lastSeenVersion?: string;
  licenseKey?: string;
}

export const CreateConnectorResponse = Schema.Struct({
  id: Schema.String,
  activated: Schema.Boolean,
  interruptWindowDurationHours: Schema.Number,
  interruptWindowHourOfDay: Schema.Number,
  lastUpdated: Schema.String,
  notes: Schema.String,
  timezone: Schema.String,
  device: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      serialNumber: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ serialNumber: "serial_number" })),
  ),
  lastHeartbeat: Schema.optional(Schema.String),
  lastSeenVersion: Schema.optional(Schema.String),
  licenseKey: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    lastUpdated: "last_updated",
    lastHeartbeat: "last_heartbeat",
    lastSeenVersion: "last_seen_version",
    licenseKey: "license_key",
  }),
) as unknown as Schema.Schema<CreateConnectorResponse>;

export const createConnector: (
  input: CreateConnectorRequest,
) => Effect.Effect<
  CreateConnectorResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateConnectorRequest = Schema.Struct({
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
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    provisionLicense: "provision_license",
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
  device?: { id: string; serialNumber?: string };
  lastHeartbeat?: string;
  lastSeenVersion?: string;
  licenseKey?: string;
}

export const UpdateConnectorResponse = Schema.Struct({
  id: Schema.String,
  activated: Schema.Boolean,
  interruptWindowDurationHours: Schema.Number,
  interruptWindowHourOfDay: Schema.Number,
  lastUpdated: Schema.String,
  notes: Schema.String,
  timezone: Schema.String,
  device: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      serialNumber: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ serialNumber: "serial_number" })),
  ),
  lastHeartbeat: Schema.optional(Schema.String),
  lastSeenVersion: Schema.optional(Schema.String),
  licenseKey: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    lastUpdated: "last_updated",
    lastHeartbeat: "last_heartbeat",
    lastSeenVersion: "last_seen_version",
    licenseKey: "license_key",
  }),
) as unknown as Schema.Schema<UpdateConnectorResponse>;

export const updateConnector: (
  input: UpdateConnectorRequest,
) => Effect.Effect<
  UpdateConnectorResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PatchConnectorRequest = Schema.Struct({
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
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    provisionLicense: "provision_license",
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
  device?: { id: string; serialNumber?: string };
  lastHeartbeat?: string;
  lastSeenVersion?: string;
  licenseKey?: string;
}

export const PatchConnectorResponse = Schema.Struct({
  id: Schema.String,
  activated: Schema.Boolean,
  interruptWindowDurationHours: Schema.Number,
  interruptWindowHourOfDay: Schema.Number,
  lastUpdated: Schema.String,
  notes: Schema.String,
  timezone: Schema.String,
  device: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      serialNumber: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ serialNumber: "serial_number" })),
  ),
  lastHeartbeat: Schema.optional(Schema.String),
  lastSeenVersion: Schema.optional(Schema.String),
  licenseKey: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    lastUpdated: "last_updated",
    lastHeartbeat: "last_heartbeat",
    lastSeenVersion: "last_seen_version",
    licenseKey: "license_key",
  }),
) as unknown as Schema.Schema<PatchConnectorResponse>;

export const patchConnector: (
  input: PatchConnectorRequest,
) => Effect.Effect<
  PatchConnectorResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchConnectorRequest,
  output: PatchConnectorResponse,
  errors: [],
}));

export interface DeleteConnectorRequest {
  connectorId: string;
  /** Account identifier */
  accountId: string;
}

export const DeleteConnectorRequest = Schema.Struct({
  connectorId: Schema.String.pipe(T.HttpPath("connectorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
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
  device?: { id: string; serialNumber?: string };
  lastHeartbeat?: string;
  lastSeenVersion?: string;
  licenseKey?: string;
}

export const DeleteConnectorResponse = Schema.Struct({
  id: Schema.String,
  activated: Schema.Boolean,
  interruptWindowDurationHours: Schema.Number,
  interruptWindowHourOfDay: Schema.Number,
  lastUpdated: Schema.String,
  notes: Schema.String,
  timezone: Schema.String,
  device: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      serialNumber: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ serialNumber: "serial_number" })),
  ),
  lastHeartbeat: Schema.optional(Schema.String),
  lastSeenVersion: Schema.optional(Schema.String),
  licenseKey: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    interruptWindowDurationHours: "interrupt_window_duration_hours",
    interruptWindowHourOfDay: "interrupt_window_hour_of_day",
    lastUpdated: "last_updated",
    lastHeartbeat: "last_heartbeat",
    lastSeenVersion: "last_seen_version",
    licenseKey: "license_key",
  }),
) as unknown as Schema.Schema<DeleteConnectorResponse>;

export const deleteConnector: (
  input: DeleteConnectorRequest,
) => Effect.Effect<
  DeleteConnectorResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetConnectorEventRequest = Schema.Struct({
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

export const GetConnectorEventResponse = Schema.Struct({
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
}) as unknown as Schema.Schema<GetConnectorEventResponse>;

export const getConnectorEvent: (
  input: GetConnectorEventRequest,
) => Effect.Effect<
  GetConnectorEventResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListConnectorEventsRequest = Schema.Struct({
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
  cursor?: string;
}

export const ListConnectorEventsResponse = Schema.Struct({
  count: Schema.Number,
  items: Schema.Array(
    Schema.Struct({
      a: Schema.Number,
      k: Schema.String,
      n: Schema.Number,
      t: Schema.Number,
    }),
  ),
  cursor: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<ListConnectorEventsResponse>;

export const listConnectorEvents: (
  input: ListConnectorEventsRequest,
) => Effect.Effect<
  ListConnectorEventsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListConnectorEventLatestsRequest = Schema.Struct({
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

export const ListConnectorEventLatestsResponse = Schema.Struct({
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
}) as unknown as Schema.Schema<ListConnectorEventLatestsResponse>;

export const listConnectorEventLatests: (
  input: ListConnectorEventLatestsRequest,
) => Effect.Effect<
  ListConnectorEventLatestsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetConnectorSnapshotRequest = Schema.Struct({
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
  bonds?: { name: string; status: string }[];
  /** Count of processors/cores */
  cpuCount?: number;
  /** Percentage of time over a 10 second window that tasks were stalled */
  cpuPressure_10s?: number;
  /** Percentage of time over a 5 minute window that tasks were stalled */
  cpuPressure_300s?: number;
  /** Percentage of time over a 1 minute window that tasks were stalled */
  cpuPressure_60s?: number;
  /** Total stall time (microseconds) */
  cpuPressureTotalUs?: number;
  /** Time spent running a virtual CPU or guest OS (milliseconds) */
  cpuTimeGuestMs?: number;
  /** Time spent running a niced guest (milliseconds) */
  cpuTimeGuestNiceMs?: number;
  /** Time spent in idle state (milliseconds) */
  cpuTimeIdleMs?: number;
  /** Time spent wait for I/O to complete (milliseconds) */
  cpuTimeIowaitMs?: number;
  /** Time spent servicing interrupts (milliseconds) */
  cpuTimeIrqMs?: number;
  /** Time spent in low-priority user mode (milliseconds) */
  cpuTimeNiceMs?: number;
  /** Time spent servicing softirqs (milliseconds) */
  cpuTimeSoftirqMs?: number;
  /** Time stolen (milliseconds) */
  cpuTimeStealMs?: number;
  /** Time spent in system mode (milliseconds) */
  cpuTimeSystemMs?: number;
  /** Time spent in user mode (milliseconds) */
  cpuTimeUserMs?: number;
  dhcpLeases?: {
    clientId: string;
    expiryTime: number;
    hostname: string;
    interfaceName: string;
    ipAddress: string;
    macAddress: string;
    connectorId?: string;
  }[];
  disks?: {
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
    connectorId?: string;
    discards?: number;
    discardsMerged?: number;
    flushes?: number;
    sectorsDiscarded?: number;
    timeDiscardingMs?: number;
    timeFlushingMs?: number;
  }[];
  /** Name of high availability state */
  haState?: string;
  /** Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault) */
  haValue?: number;
  interfaces?: {
    name: string;
    operstate: string;
    connectorId?: string;
    ipAddresses?: {
      interfaceName: string;
      ipAddress: string;
      connectorId?: string;
    }[];
    speed?: number;
  }[];
  /** Percentage of time over a 10 second window that all tasks were stalled */
  ioPressureFull_10s?: number;
  /** Percentage of time over a 5 minute window that all tasks were stalled */
  ioPressureFull_300s?: number;
  /** Percentage of time over a 1 minute window that all tasks were stalled */
  ioPressureFull_60s?: number;
  /** Total stall time (microseconds) */
  ioPressureFullTotalUs?: number;
  /** Percentage of time over a 10 second window that some tasks were stalled */
  ioPressureSome_10s?: number;
  /** Percentage of time over a 3 minute window that some tasks were stalled */
  ioPressureSome_300s?: number;
  /** Percentage of time over a 1 minute window that some tasks were stalled */
  ioPressureSome_60s?: number;
  /** Total stall time (microseconds) */
  ioPressureSomeTotalUs?: number;
  /** Boot time (seconds since Unix epoch) */
  kernelBtime?: number;
  /** Number of context switches that the system underwent */
  kernelCtxt?: number;
  /** Number of forks since boot */
  kernelProcesses?: number;
  /** Number of processes blocked waiting for I/O */
  kernelProcessesBlocked?: number;
  /** Number of processes in runnable state */
  kernelProcessesRunning?: number;
  /** The fifteen-minute load average */
  loadAverage_15m?: number;
  /** The one-minute load average */
  loadAverage_1m?: number;
  /** The five-minute load average */
  loadAverage_5m?: number;
  /** Number of currently runnable kernel scheduling entities */
  loadAverageCur?: number;
  /** Number of kernel scheduling entities that currently exist on the system */
  loadAverageMax?: number;
  /** Memory that has been used more recently */
  memoryActiveBytes?: number;
  /** Non-file backed huge pages mapped into user-space page tables */
  memoryAnonHugepagesBytes?: number;
  /** Non-file backed pages mapped into user-space page tables */
  memoryAnonPagesBytes?: number;
  /** Estimate of how much memory is available for starting new applications */
  memoryAvailableBytes?: number;
  /** Memory used for block device bounce buffers */
  memoryBounceBytes?: number;
  /** Relatively temporary storage for raw disk blocks */
  memoryBuffersBytes?: number;
  /** In-memory cache for files read from the disk */
  memoryCachedBytes?: number;
  /** Free CMA (Contiguous Memory Allocator) pages */
  memoryCmaFreeBytes?: number;
  /** Total CMA (Contiguous Memory Allocator) pages */
  memoryCmaTotalBytes?: number;
  /** Total amount of memory currently available to be allocated on the system */
  memoryCommitLimitBytes?: number;
  /** Amount of memory presently allocated on the system */
  memoryCommittedAsBytes?: number;
  /** Memory which is waiting to get written back to the disk */
  memoryDirtyBytes?: number;
  /** The sum of LowFree and HighFree */
  memoryFreeBytes?: number;
  /** Amount of free highmem */
  memoryHighFreeBytes?: number;
  /** Total amount of highmem */
  memoryHighTotalBytes?: number;
  /** The number of huge pages in the pool that are not yet allocated */
  memoryHugepagesFree?: number;
  /** Number of huge pages for which a commitment has been made, but no allocation has yet been made */
  memoryHugepagesRsvd?: number;
  /** Number of huge pages in the pool above the threshold */
  memoryHugepagesSurp?: number;
  /** The size of the pool of huge pages */
  memoryHugepagesTotal?: number;
  /** The size of huge pages */
  memoryHugepagesizeBytes?: number;
  /** Memory which has been less recently used */
  memoryInactiveBytes?: number;
  /** Kernel allocations that the kernel will attempt to reclaim under memory pressure */
  memoryKReclaimableBytes?: number;
  /** Amount of memory allocated to kernel stacks */
  memoryKernelStackBytes?: number;
  /** Amount of free lowmem */
  memoryLowFreeBytes?: number;
  /** Total amount of lowmem */
  memoryLowTotalBytes?: number;
  /** Files which have been mapped into memory */
  memoryMappedBytes?: number;
  /** Amount of memory dedicated to the lowest level of page tables */
  memoryPageTablesBytes?: number;
  /** Memory allocated to the per-cpu alloctor used to back per-cpu allocations */
  memoryPerCpuBytes?: number;
  /** Percentage of time over a 10 second window that all tasks were stalled */
  memoryPressureFull_10s?: number;
  /** Percentage of time over a 5 minute window that all tasks were stalled */
  memoryPressureFull_300s?: number;
  /** Percentage of time over a 1 minute window that all tasks were stalled */
  memoryPressureFull_60s?: number;
  /** Total stall time (microseconds) */
  memoryPressureFullTotalUs?: number;
  /** Percentage of time over a 10 second window that some tasks were stalled */
  memoryPressureSome_10s?: number;
  /** Percentage of time over a 5 minute window that some tasks were stalled */
  memoryPressureSome_300s?: number;
  /** Percentage of time over a 1 minute window that some tasks were stalled */
  memoryPressureSome_60s?: number;
  /** Total stall time (microseconds) */
  memoryPressureSomeTotalUs?: number;
  /** Part of slab that can be reclaimed on memory pressure */
  memorySReclaimableBytes?: number;
  /** Part of slab that cannot be reclaimed on memory pressure */
  memorySUnreclaimBytes?: number;
  /** Amount of memory dedicated to the lowest level of page tables */
  memorySecondaryPageTablesBytes?: number;
  /** Amount of memory consumed by tmpfs */
  memoryShmemBytes?: number;
  /** Memory used by shmem and tmpfs, allocated with huge pages */
  memoryShmemHugepagesBytes?: number;
  /** Shared memory mapped into user space with huge pages */
  memoryShmemPmdMappedBytes?: number;
  /** In-kernel data structures cache */
  memorySlabBytes?: number;
  /** Memory swapped out and back in while still in swap file */
  memorySwapCachedBytes?: number;
  /** Amount of swap space that is currently unused */
  memorySwapFreeBytes?: number;
  /** Total amount of swap space available */
  memorySwapTotalBytes?: number;
  /** Total usable RAM */
  memoryTotalBytes?: number;
  /** Largest contiguous block of vmalloc area which is free */
  memoryVmallocChunkBytes?: number;
  /** Total size of vmalloc memory area */
  memoryVmallocTotalBytes?: number;
  /** Amount of vmalloc area which is used */
  memoryVmallocUsedBytes?: number;
  /** Memory which is actively being written back to the disk */
  memoryWritebackBytes?: number;
  /** Memory used by FUSE for temporary writeback buffers */
  memoryWritebackTmpBytes?: number;
  /** Memory consumed by the zswap backend, compressed */
  memoryZSwapBytes?: number;
  /** Amount of anonymous memory stored in zswap, uncompressed */
  memoryZSwappedBytes?: number;
  mounts?: {
    fileSystem: string;
    kind: string;
    mountPoint: string;
    name: string;
    availableBytes?: number;
    connectorId?: string;
    isReadOnly?: boolean;
    isRemovable?: boolean;
    totalBytes?: number;
  }[];
  netdevs?: {
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
    connectorId?: string;
  }[];
  /** Number of ICMP Address Mask Reply messages received */
  snmpIcmpInAddrMaskReps?: number;
  /** Number of ICMP Address Mask Request messages received */
  snmpIcmpInAddrMasks?: number;
  /** Number of ICMP messages received with bad checksums */
  snmpIcmpInCsumErrors?: number;
  /** Number of ICMP Destination Unreachable messages received */
  snmpIcmpInDestUnreachs?: number;
  /** Number of ICMP Echo Reply messages received */
  snmpIcmpInEchoReps?: number;
  /** Number of ICMP Echo (request) messages received */
  snmpIcmpInEchos?: number;
  /** Number of ICMP messages received with ICMP-specific errors */
  snmpIcmpInErrors?: number;
  /** Number of ICMP messages received */
  snmpIcmpInMsgs?: number;
  /** Number of ICMP Parameter Problem messages received */
  snmpIcmpInParmProbs?: number;
  /** Number of ICMP Redirect messages received */
  snmpIcmpInRedirects?: number;
  /** Number of ICMP Source Quench messages received */
  snmpIcmpInSrcQuenchs?: number;
  /** Number of ICMP Time Exceeded messages received */
  snmpIcmpInTimeExcds?: number;
  /** Number of ICMP Address Mask Request messages received */
  snmpIcmpInTimestampReps?: number;
  /** Number of ICMP Timestamp (request) messages received */
  snmpIcmpInTimestamps?: number;
  /** Number of ICMP Address Mask Reply messages sent */
  snmpIcmpOutAddrMaskReps?: number;
  /** Number of ICMP Address Mask Request messages sent */
  snmpIcmpOutAddrMasks?: number;
  /** Number of ICMP Destination Unreachable messages sent */
  snmpIcmpOutDestUnreachs?: number;
  /** Number of ICMP Echo Reply messages sent */
  snmpIcmpOutEchoReps?: number;
  /** Number of ICMP Echo (request) messages sent */
  snmpIcmpOutEchos?: number;
  /** Number of ICMP messages which this entity did not send due to ICMP-specific errors */
  snmpIcmpOutErrors?: number;
  /** Number of ICMP messages attempted to send */
  snmpIcmpOutMsgs?: number;
  /** Number of ICMP Parameter Problem messages sent */
  snmpIcmpOutParmProbs?: number;
  /** Number of ICMP Redirect messages sent */
  snmpIcmpOutRedirects?: number;
  /** Number of ICMP Source Quench messages sent */
  snmpIcmpOutSrcQuenchs?: number;
  /** Number of ICMP Time Exceeded messages sent */
  snmpIcmpOutTimeExcds?: number;
  /** Number of ICMP Timestamp Reply messages sent */
  snmpIcmpOutTimestampReps?: number;
  /** Number of ICMP Timestamp (request) messages sent */
  snmpIcmpOutTimestamps?: number;
  /** Default value of the Time-To-Live field of the IP header */
  snmpIpDefaultTtl?: number;
  /** Number of datagrams forwarded to their final destination */
  snmpIpForwDatagrams?: number;
  /** Set when acting as an IP gateway */
  snmpIpForwardingEnabled?: boolean;
  /** Number of datagrams generated by fragmentation */
  snmpIpFragCreates?: number;
  /** Number of datagrams discarded because fragmentation failed */
  snmpIpFragFails?: number;
  /** Number of datagrams successfully fragmented */
  snmpIpFragOks?: number;
  /** Number of input datagrams discarded due to errors in the IP address */
  snmpIpInAddrErrors?: number;
  /** Number of input datagrams successfully delivered to IP user-protocols */
  snmpIpInDelivers?: number;
  /** Number of input datagrams otherwise discarded */
  snmpIpInDiscards?: number;
  /** Number of input datagrams discarded due to errors in the IP header */
  snmpIpInHdrErrors?: number;
  /** Number of input datagrams received from interfaces */
  snmpIpInReceives?: number;
  /** Number of input datagrams discarded due unknown or unsupported protocol */
  snmpIpInUnknownProtos?: number;
  /** Number of output datagrams otherwise discarded */
  snmpIpOutDiscards?: number;
  /** Number of output datagrams discarded because no route matched */
  snmpIpOutNoRoutes?: number;
  /** Number of datagrams supplied for transmission */
  snmpIpOutRequests?: number;
  /** Number of failures detected by the reassembly algorithm */
  snmpIpReasmFails?: number;
  /** Number of datagrams successfully reassembled */
  snmpIpReasmOks?: number;
  /** Number of fragments received which needed to be reassembled */
  snmpIpReasmReqds?: number;
  /** Number of seconds fragments are held while awaiting reassembly */
  snmpIpReasmTimeout?: number;
  /** Number of times TCP transitions to SYN-SENT from CLOSED */
  snmpTcpActiveOpens?: number;
  /** Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD */
  snmpTcpAttemptFails?: number;
  /** Number of TCP connections in ESTABLISHED or CLOSE-WAIT */
  snmpTcpCurrEstab?: number;
  /** Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT */
  snmpTcpEstabResets?: number;
  /** Number of TCP segments received with checksum errors */
  snmpTcpInCsumErrors?: number;
  /** Number of TCP segments received in error */
  snmpTcpInErrs?: number;
  /** Number of TCP segments received */
  snmpTcpInSegs?: number;
  /** Limit on the total number of TCP connections */
  snmpTcpMaxConn?: number;
  /** Number of TCP segments sent with RST flag */
  snmpTcpOutRsts?: number;
  /** Number of TCP segments sent */
  snmpTcpOutSegs?: number;
  /** Number of times TCP transitions to SYN-RCVD from LISTEN */
  snmpTcpPassiveOpens?: number;
  /** Number of TCP segments retransmitted */
  snmpTcpRetransSegs?: number;
  /** Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds) */
  snmpTcpRtoMax?: number;
  /** Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds) */
  snmpTcpRtoMin?: number;
  /** Number of UDP datagrams delivered to UDP applications */
  snmpUdpInDatagrams?: number;
  /** Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port */
  snmpUdpInErrors?: number;
  /** Number of UDP datagrams received for which there was not application at the destination port */
  snmpUdpNoPorts?: number;
  /** Number of UDP datagrams sent */
  snmpUdpOutDatagrams?: number;
  /** Boottime of the system (seconds since the Unix epoch) */
  systemBootTimeS?: number;
  thermals?: {
    label: string;
    connectorId?: string;
    criticalCelcius?: number;
    currentCelcius?: number;
    maxCelcius?: number;
  }[];
  tunnels?: {
    healthState: string;
    healthValue: number;
    interfaceName: string;
    tunnelId: string;
    connectorId?: string;
    probedMtu?: number;
  }[];
  /** Sum of how much time each core has spent idle */
  uptimeIdleMs?: number;
  /** Uptime of the system, including time spent in suspend */
  uptimeTotalMs?: number;
}

export const GetConnectorSnapshotResponse = Schema.Struct({
  countReclaimFailures: Schema.Number,
  countReclaimedPaths: Schema.Number,
  countRecordFailed: Schema.Number,
  countTransmitFailures: Schema.Number,
  t: Schema.Number,
  v: Schema.String,
  bonds: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.String,
        status: Schema.String,
      }),
    ),
  ),
  cpuCount: Schema.optional(Schema.Number),
  cpuPressure_10s: Schema.optional(Schema.Number),
  cpuPressure_300s: Schema.optional(Schema.Number),
  cpuPressure_60s: Schema.optional(Schema.Number),
  cpuPressureTotalUs: Schema.optional(Schema.Number),
  cpuTimeGuestMs: Schema.optional(Schema.Number),
  cpuTimeGuestNiceMs: Schema.optional(Schema.Number),
  cpuTimeIdleMs: Schema.optional(Schema.Number),
  cpuTimeIowaitMs: Schema.optional(Schema.Number),
  cpuTimeIrqMs: Schema.optional(Schema.Number),
  cpuTimeNiceMs: Schema.optional(Schema.Number),
  cpuTimeSoftirqMs: Schema.optional(Schema.Number),
  cpuTimeStealMs: Schema.optional(Schema.Number),
  cpuTimeSystemMs: Schema.optional(Schema.Number),
  cpuTimeUserMs: Schema.optional(Schema.Number),
  dhcpLeases: Schema.optional(
    Schema.Array(
      Schema.Struct({
        clientId: Schema.String,
        expiryTime: Schema.Number,
        hostname: Schema.String,
        interfaceName: Schema.String,
        ipAddress: Schema.String,
        macAddress: Schema.String,
        connectorId: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          clientId: "client_id",
          expiryTime: "expiry_time",
          interfaceName: "interface_name",
          ipAddress: "ip_address",
          macAddress: "mac_address",
          connectorId: "connector_id",
        }),
      ),
    ),
  ),
  disks: Schema.optional(
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
        connectorId: Schema.optional(Schema.String),
        discards: Schema.optional(Schema.Number),
        discardsMerged: Schema.optional(Schema.Number),
        flushes: Schema.optional(Schema.Number),
        sectorsDiscarded: Schema.optional(Schema.Number),
        timeDiscardingMs: Schema.optional(Schema.Number),
        timeFlushingMs: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          inProgress: "in_progress",
          sectorsRead: "sectors_read",
          sectorsWritten: "sectors_written",
          timeInProgressMs: "time_in_progress_ms",
          timeReadingMs: "time_reading_ms",
          timeWritingMs: "time_writing_ms",
          weightedTimeInProgressMs: "weighted_time_in_progress_ms",
          writesMerged: "writes_merged",
          connectorId: "connector_id",
          discardsMerged: "discards_merged",
          sectorsDiscarded: "sectors_discarded",
          timeDiscardingMs: "time_discarding_ms",
          timeFlushingMs: "time_flushing_ms",
        }),
      ),
    ),
  ),
  haState: Schema.optional(Schema.String),
  haValue: Schema.optional(Schema.Number),
  interfaces: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.String,
        operstate: Schema.String,
        connectorId: Schema.optional(Schema.String),
        ipAddresses: Schema.optional(
          Schema.Array(
            Schema.Struct({
              interfaceName: Schema.String,
              ipAddress: Schema.String,
              connectorId: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                interfaceName: "interface_name",
                ipAddress: "ip_address",
                connectorId: "connector_id",
              }),
            ),
          ),
        ),
        speed: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          connectorId: "connector_id",
          ipAddresses: "ip_addresses",
        }),
      ),
    ),
  ),
  ioPressureFull_10s: Schema.optional(Schema.Number),
  ioPressureFull_300s: Schema.optional(Schema.Number),
  ioPressureFull_60s: Schema.optional(Schema.Number),
  ioPressureFullTotalUs: Schema.optional(Schema.Number),
  ioPressureSome_10s: Schema.optional(Schema.Number),
  ioPressureSome_300s: Schema.optional(Schema.Number),
  ioPressureSome_60s: Schema.optional(Schema.Number),
  ioPressureSomeTotalUs: Schema.optional(Schema.Number),
  kernelBtime: Schema.optional(Schema.Number),
  kernelCtxt: Schema.optional(Schema.Number),
  kernelProcesses: Schema.optional(Schema.Number),
  kernelProcessesBlocked: Schema.optional(Schema.Number),
  kernelProcessesRunning: Schema.optional(Schema.Number),
  loadAverage_15m: Schema.optional(Schema.Number),
  loadAverage_1m: Schema.optional(Schema.Number),
  loadAverage_5m: Schema.optional(Schema.Number),
  loadAverageCur: Schema.optional(Schema.Number),
  loadAverageMax: Schema.optional(Schema.Number),
  memoryActiveBytes: Schema.optional(Schema.Number),
  memoryAnonHugepagesBytes: Schema.optional(Schema.Number),
  memoryAnonPagesBytes: Schema.optional(Schema.Number),
  memoryAvailableBytes: Schema.optional(Schema.Number),
  memoryBounceBytes: Schema.optional(Schema.Number),
  memoryBuffersBytes: Schema.optional(Schema.Number),
  memoryCachedBytes: Schema.optional(Schema.Number),
  memoryCmaFreeBytes: Schema.optional(Schema.Number),
  memoryCmaTotalBytes: Schema.optional(Schema.Number),
  memoryCommitLimitBytes: Schema.optional(Schema.Number),
  memoryCommittedAsBytes: Schema.optional(Schema.Number),
  memoryDirtyBytes: Schema.optional(Schema.Number),
  memoryFreeBytes: Schema.optional(Schema.Number),
  memoryHighFreeBytes: Schema.optional(Schema.Number),
  memoryHighTotalBytes: Schema.optional(Schema.Number),
  memoryHugepagesFree: Schema.optional(Schema.Number),
  memoryHugepagesRsvd: Schema.optional(Schema.Number),
  memoryHugepagesSurp: Schema.optional(Schema.Number),
  memoryHugepagesTotal: Schema.optional(Schema.Number),
  memoryHugepagesizeBytes: Schema.optional(Schema.Number),
  memoryInactiveBytes: Schema.optional(Schema.Number),
  memoryKReclaimableBytes: Schema.optional(Schema.Number),
  memoryKernelStackBytes: Schema.optional(Schema.Number),
  memoryLowFreeBytes: Schema.optional(Schema.Number),
  memoryLowTotalBytes: Schema.optional(Schema.Number),
  memoryMappedBytes: Schema.optional(Schema.Number),
  memoryPageTablesBytes: Schema.optional(Schema.Number),
  memoryPerCpuBytes: Schema.optional(Schema.Number),
  memoryPressureFull_10s: Schema.optional(Schema.Number),
  memoryPressureFull_300s: Schema.optional(Schema.Number),
  memoryPressureFull_60s: Schema.optional(Schema.Number),
  memoryPressureFullTotalUs: Schema.optional(Schema.Number),
  memoryPressureSome_10s: Schema.optional(Schema.Number),
  memoryPressureSome_300s: Schema.optional(Schema.Number),
  memoryPressureSome_60s: Schema.optional(Schema.Number),
  memoryPressureSomeTotalUs: Schema.optional(Schema.Number),
  memorySReclaimableBytes: Schema.optional(Schema.Number),
  memorySUnreclaimBytes: Schema.optional(Schema.Number),
  memorySecondaryPageTablesBytes: Schema.optional(Schema.Number),
  memoryShmemBytes: Schema.optional(Schema.Number),
  memoryShmemHugepagesBytes: Schema.optional(Schema.Number),
  memoryShmemPmdMappedBytes: Schema.optional(Schema.Number),
  memorySlabBytes: Schema.optional(Schema.Number),
  memorySwapCachedBytes: Schema.optional(Schema.Number),
  memorySwapFreeBytes: Schema.optional(Schema.Number),
  memorySwapTotalBytes: Schema.optional(Schema.Number),
  memoryTotalBytes: Schema.optional(Schema.Number),
  memoryVmallocChunkBytes: Schema.optional(Schema.Number),
  memoryVmallocTotalBytes: Schema.optional(Schema.Number),
  memoryVmallocUsedBytes: Schema.optional(Schema.Number),
  memoryWritebackBytes: Schema.optional(Schema.Number),
  memoryWritebackTmpBytes: Schema.optional(Schema.Number),
  memoryZSwapBytes: Schema.optional(Schema.Number),
  memoryZSwappedBytes: Schema.optional(Schema.Number),
  mounts: Schema.optional(
    Schema.Array(
      Schema.Struct({
        fileSystem: Schema.String,
        kind: Schema.String,
        mountPoint: Schema.String,
        name: Schema.String,
        availableBytes: Schema.optional(Schema.Number),
        connectorId: Schema.optional(Schema.String),
        isReadOnly: Schema.optional(Schema.Boolean),
        isRemovable: Schema.optional(Schema.Boolean),
        totalBytes: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          fileSystem: "file_system",
          mountPoint: "mount_point",
          availableBytes: "available_bytes",
          connectorId: "connector_id",
          isReadOnly: "is_read_only",
          isRemovable: "is_removable",
          totalBytes: "total_bytes",
        }),
      ),
    ),
  ),
  netdevs: Schema.optional(
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
        connectorId: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
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
  ),
  snmpIcmpInAddrMaskReps: Schema.optional(Schema.Number),
  snmpIcmpInAddrMasks: Schema.optional(Schema.Number),
  snmpIcmpInCsumErrors: Schema.optional(Schema.Number),
  snmpIcmpInDestUnreachs: Schema.optional(Schema.Number),
  snmpIcmpInEchoReps: Schema.optional(Schema.Number),
  snmpIcmpInEchos: Schema.optional(Schema.Number),
  snmpIcmpInErrors: Schema.optional(Schema.Number),
  snmpIcmpInMsgs: Schema.optional(Schema.Number),
  snmpIcmpInParmProbs: Schema.optional(Schema.Number),
  snmpIcmpInRedirects: Schema.optional(Schema.Number),
  snmpIcmpInSrcQuenchs: Schema.optional(Schema.Number),
  snmpIcmpInTimeExcds: Schema.optional(Schema.Number),
  snmpIcmpInTimestampReps: Schema.optional(Schema.Number),
  snmpIcmpInTimestamps: Schema.optional(Schema.Number),
  snmpIcmpOutAddrMaskReps: Schema.optional(Schema.Number),
  snmpIcmpOutAddrMasks: Schema.optional(Schema.Number),
  snmpIcmpOutDestUnreachs: Schema.optional(Schema.Number),
  snmpIcmpOutEchoReps: Schema.optional(Schema.Number),
  snmpIcmpOutEchos: Schema.optional(Schema.Number),
  snmpIcmpOutErrors: Schema.optional(Schema.Number),
  snmpIcmpOutMsgs: Schema.optional(Schema.Number),
  snmpIcmpOutParmProbs: Schema.optional(Schema.Number),
  snmpIcmpOutRedirects: Schema.optional(Schema.Number),
  snmpIcmpOutSrcQuenchs: Schema.optional(Schema.Number),
  snmpIcmpOutTimeExcds: Schema.optional(Schema.Number),
  snmpIcmpOutTimestampReps: Schema.optional(Schema.Number),
  snmpIcmpOutTimestamps: Schema.optional(Schema.Number),
  snmpIpDefaultTtl: Schema.optional(Schema.Number),
  snmpIpForwDatagrams: Schema.optional(Schema.Number),
  snmpIpForwardingEnabled: Schema.optional(Schema.Boolean),
  snmpIpFragCreates: Schema.optional(Schema.Number),
  snmpIpFragFails: Schema.optional(Schema.Number),
  snmpIpFragOks: Schema.optional(Schema.Number),
  snmpIpInAddrErrors: Schema.optional(Schema.Number),
  snmpIpInDelivers: Schema.optional(Schema.Number),
  snmpIpInDiscards: Schema.optional(Schema.Number),
  snmpIpInHdrErrors: Schema.optional(Schema.Number),
  snmpIpInReceives: Schema.optional(Schema.Number),
  snmpIpInUnknownProtos: Schema.optional(Schema.Number),
  snmpIpOutDiscards: Schema.optional(Schema.Number),
  snmpIpOutNoRoutes: Schema.optional(Schema.Number),
  snmpIpOutRequests: Schema.optional(Schema.Number),
  snmpIpReasmFails: Schema.optional(Schema.Number),
  snmpIpReasmOks: Schema.optional(Schema.Number),
  snmpIpReasmReqds: Schema.optional(Schema.Number),
  snmpIpReasmTimeout: Schema.optional(Schema.Number),
  snmpTcpActiveOpens: Schema.optional(Schema.Number),
  snmpTcpAttemptFails: Schema.optional(Schema.Number),
  snmpTcpCurrEstab: Schema.optional(Schema.Number),
  snmpTcpEstabResets: Schema.optional(Schema.Number),
  snmpTcpInCsumErrors: Schema.optional(Schema.Number),
  snmpTcpInErrs: Schema.optional(Schema.Number),
  snmpTcpInSegs: Schema.optional(Schema.Number),
  snmpTcpMaxConn: Schema.optional(Schema.Number),
  snmpTcpOutRsts: Schema.optional(Schema.Number),
  snmpTcpOutSegs: Schema.optional(Schema.Number),
  snmpTcpPassiveOpens: Schema.optional(Schema.Number),
  snmpTcpRetransSegs: Schema.optional(Schema.Number),
  snmpTcpRtoMax: Schema.optional(Schema.Number),
  snmpTcpRtoMin: Schema.optional(Schema.Number),
  snmpUdpInDatagrams: Schema.optional(Schema.Number),
  snmpUdpInErrors: Schema.optional(Schema.Number),
  snmpUdpNoPorts: Schema.optional(Schema.Number),
  snmpUdpOutDatagrams: Schema.optional(Schema.Number),
  systemBootTimeS: Schema.optional(Schema.Number),
  thermals: Schema.optional(
    Schema.Array(
      Schema.Struct({
        label: Schema.String,
        connectorId: Schema.optional(Schema.String),
        criticalCelcius: Schema.optional(Schema.Number),
        currentCelcius: Schema.optional(Schema.Number),
        maxCelcius: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          connectorId: "connector_id",
          criticalCelcius: "critical_celcius",
          currentCelcius: "current_celcius",
          maxCelcius: "max_celcius",
        }),
      ),
    ),
  ),
  tunnels: Schema.optional(
    Schema.Array(
      Schema.Struct({
        healthState: Schema.String,
        healthValue: Schema.Number,
        interfaceName: Schema.String,
        tunnelId: Schema.String,
        connectorId: Schema.optional(Schema.String),
        probedMtu: Schema.optional(Schema.Number),
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
  ),
  uptimeIdleMs: Schema.optional(Schema.Number),
  uptimeTotalMs: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    countReclaimFailures: "count_reclaim_failures",
    countReclaimedPaths: "count_reclaimed_paths",
    countRecordFailed: "count_record_failed",
    countTransmitFailures: "count_transmit_failures",
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
    haState: "ha_state",
    haValue: "ha_value",
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
    uptimeIdleMs: "uptime_idle_ms",
    uptimeTotalMs: "uptime_total_ms",
  }),
) as unknown as Schema.Schema<GetConnectorSnapshotResponse>;

export const getConnectorSnapshot: (
  input: GetConnectorSnapshotRequest,
) => Effect.Effect<
  GetConnectorSnapshotResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListConnectorSnapshotsRequest = Schema.Struct({
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
  cursor?: string;
}

export const ListConnectorSnapshotsResponse = Schema.Struct({
  count: Schema.Number,
  items: Schema.Array(
    Schema.Struct({
      a: Schema.Number,
      t: Schema.Number,
    }),
  ),
  cursor: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<ListConnectorSnapshotsResponse>;

export const listConnectorSnapshots: (
  input: ListConnectorSnapshotsRequest,
) => Effect.Effect<
  ListConnectorSnapshotsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListConnectorSnapshotLatestsRequest = Schema.Struct({
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
    bonds?: { name: string; status: string }[];
    cpuCount?: number;
    cpuPressure_10s?: number;
    cpuPressure_300s?: number;
    cpuPressure_60s?: number;
    cpuPressureTotalUs?: number;
    cpuTimeGuestMs?: number;
    cpuTimeGuestNiceMs?: number;
    cpuTimeIdleMs?: number;
    cpuTimeIowaitMs?: number;
    cpuTimeIrqMs?: number;
    cpuTimeNiceMs?: number;
    cpuTimeSoftirqMs?: number;
    cpuTimeStealMs?: number;
    cpuTimeSystemMs?: number;
    cpuTimeUserMs?: number;
    dhcpLeases?: {
      clientId: string;
      expiryTime: number;
      hostname: string;
      interfaceName: string;
      ipAddress: string;
      macAddress: string;
      connectorId?: string;
    }[];
    disks?: {
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
      connectorId?: string;
      discards?: number;
      discardsMerged?: number;
      flushes?: number;
      sectorsDiscarded?: number;
      timeDiscardingMs?: number;
      timeFlushingMs?: number;
    }[];
    haState?: string;
    haValue?: number;
    interfaces?: {
      name: string;
      operstate: string;
      connectorId?: string;
      ipAddresses?: {
        interfaceName: string;
        ipAddress: string;
        connectorId?: string;
      }[];
      speed?: number;
    }[];
    ioPressureFull_10s?: number;
    ioPressureFull_300s?: number;
    ioPressureFull_60s?: number;
    ioPressureFullTotalUs?: number;
    ioPressureSome_10s?: number;
    ioPressureSome_300s?: number;
    ioPressureSome_60s?: number;
    ioPressureSomeTotalUs?: number;
    kernelBtime?: number;
    kernelCtxt?: number;
    kernelProcesses?: number;
    kernelProcessesBlocked?: number;
    kernelProcessesRunning?: number;
    loadAverage_15m?: number;
    loadAverage_1m?: number;
    loadAverage_5m?: number;
    loadAverageCur?: number;
    loadAverageMax?: number;
    memoryActiveBytes?: number;
    memoryAnonHugepagesBytes?: number;
    memoryAnonPagesBytes?: number;
    memoryAvailableBytes?: number;
    memoryBounceBytes?: number;
    memoryBuffersBytes?: number;
    memoryCachedBytes?: number;
    memoryCmaFreeBytes?: number;
    memoryCmaTotalBytes?: number;
    memoryCommitLimitBytes?: number;
    memoryCommittedAsBytes?: number;
    memoryDirtyBytes?: number;
    memoryFreeBytes?: number;
    memoryHighFreeBytes?: number;
    memoryHighTotalBytes?: number;
    memoryHugepagesFree?: number;
    memoryHugepagesRsvd?: number;
    memoryHugepagesSurp?: number;
    memoryHugepagesTotal?: number;
    memoryHugepagesizeBytes?: number;
    memoryInactiveBytes?: number;
    memoryKReclaimableBytes?: number;
    memoryKernelStackBytes?: number;
    memoryLowFreeBytes?: number;
    memoryLowTotalBytes?: number;
    memoryMappedBytes?: number;
    memoryPageTablesBytes?: number;
    memoryPerCpuBytes?: number;
    memoryPressureFull_10s?: number;
    memoryPressureFull_300s?: number;
    memoryPressureFull_60s?: number;
    memoryPressureFullTotalUs?: number;
    memoryPressureSome_10s?: number;
    memoryPressureSome_300s?: number;
    memoryPressureSome_60s?: number;
    memoryPressureSomeTotalUs?: number;
    memorySReclaimableBytes?: number;
    memorySUnreclaimBytes?: number;
    memorySecondaryPageTablesBytes?: number;
    memoryShmemBytes?: number;
    memoryShmemHugepagesBytes?: number;
    memoryShmemPmdMappedBytes?: number;
    memorySlabBytes?: number;
    memorySwapCachedBytes?: number;
    memorySwapFreeBytes?: number;
    memorySwapTotalBytes?: number;
    memoryTotalBytes?: number;
    memoryVmallocChunkBytes?: number;
    memoryVmallocTotalBytes?: number;
    memoryVmallocUsedBytes?: number;
    memoryWritebackBytes?: number;
    memoryWritebackTmpBytes?: number;
    memoryZSwapBytes?: number;
    memoryZSwappedBytes?: number;
    mounts?: {
      fileSystem: string;
      kind: string;
      mountPoint: string;
      name: string;
      availableBytes?: number;
      connectorId?: string;
      isReadOnly?: boolean;
      isRemovable?: boolean;
      totalBytes?: number;
    }[];
    netdevs?: {
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
      connectorId?: string;
    }[];
    snmpIcmpInAddrMaskReps?: number;
    snmpIcmpInAddrMasks?: number;
    snmpIcmpInCsumErrors?: number;
    snmpIcmpInDestUnreachs?: number;
    snmpIcmpInEchoReps?: number;
    snmpIcmpInEchos?: number;
    snmpIcmpInErrors?: number;
    snmpIcmpInMsgs?: number;
    snmpIcmpInParmProbs?: number;
    snmpIcmpInRedirects?: number;
    snmpIcmpInSrcQuenchs?: number;
    snmpIcmpInTimeExcds?: number;
    snmpIcmpInTimestampReps?: number;
    snmpIcmpInTimestamps?: number;
    snmpIcmpOutAddrMaskReps?: number;
    snmpIcmpOutAddrMasks?: number;
    snmpIcmpOutDestUnreachs?: number;
    snmpIcmpOutEchoReps?: number;
    snmpIcmpOutEchos?: number;
    snmpIcmpOutErrors?: number;
    snmpIcmpOutMsgs?: number;
    snmpIcmpOutParmProbs?: number;
    snmpIcmpOutRedirects?: number;
    snmpIcmpOutSrcQuenchs?: number;
    snmpIcmpOutTimeExcds?: number;
    snmpIcmpOutTimestampReps?: number;
    snmpIcmpOutTimestamps?: number;
    snmpIpDefaultTtl?: number;
    snmpIpForwDatagrams?: number;
    snmpIpForwardingEnabled?: boolean;
    snmpIpFragCreates?: number;
    snmpIpFragFails?: number;
    snmpIpFragOks?: number;
    snmpIpInAddrErrors?: number;
    snmpIpInDelivers?: number;
    snmpIpInDiscards?: number;
    snmpIpInHdrErrors?: number;
    snmpIpInReceives?: number;
    snmpIpInUnknownProtos?: number;
    snmpIpOutDiscards?: number;
    snmpIpOutNoRoutes?: number;
    snmpIpOutRequests?: number;
    snmpIpReasmFails?: number;
    snmpIpReasmOks?: number;
    snmpIpReasmReqds?: number;
    snmpIpReasmTimeout?: number;
    snmpTcpActiveOpens?: number;
    snmpTcpAttemptFails?: number;
    snmpTcpCurrEstab?: number;
    snmpTcpEstabResets?: number;
    snmpTcpInCsumErrors?: number;
    snmpTcpInErrs?: number;
    snmpTcpInSegs?: number;
    snmpTcpMaxConn?: number;
    snmpTcpOutRsts?: number;
    snmpTcpOutSegs?: number;
    snmpTcpPassiveOpens?: number;
    snmpTcpRetransSegs?: number;
    snmpTcpRtoMax?: number;
    snmpTcpRtoMin?: number;
    snmpUdpInDatagrams?: number;
    snmpUdpInErrors?: number;
    snmpUdpNoPorts?: number;
    snmpUdpOutDatagrams?: number;
    systemBootTimeS?: number;
    thermals?: {
      label: string;
      connectorId?: string;
      criticalCelcius?: number;
      currentCelcius?: number;
      maxCelcius?: number;
    }[];
    tunnels?: {
      healthState: string;
      healthValue: number;
      interfaceName: string;
      tunnelId: string;
      connectorId?: string;
      probedMtu?: number;
    }[];
    uptimeIdleMs?: number;
    uptimeTotalMs?: number;
  }[];
}

export const ListConnectorSnapshotLatestsResponse = Schema.Struct({
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
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            status: Schema.String,
          }),
        ),
      ),
      cpuCount: Schema.optional(Schema.Number),
      cpuPressure_10s: Schema.optional(Schema.Number),
      cpuPressure_300s: Schema.optional(Schema.Number),
      cpuPressure_60s: Schema.optional(Schema.Number),
      cpuPressureTotalUs: Schema.optional(Schema.Number),
      cpuTimeGuestMs: Schema.optional(Schema.Number),
      cpuTimeGuestNiceMs: Schema.optional(Schema.Number),
      cpuTimeIdleMs: Schema.optional(Schema.Number),
      cpuTimeIowaitMs: Schema.optional(Schema.Number),
      cpuTimeIrqMs: Schema.optional(Schema.Number),
      cpuTimeNiceMs: Schema.optional(Schema.Number),
      cpuTimeSoftirqMs: Schema.optional(Schema.Number),
      cpuTimeStealMs: Schema.optional(Schema.Number),
      cpuTimeSystemMs: Schema.optional(Schema.Number),
      cpuTimeUserMs: Schema.optional(Schema.Number),
      dhcpLeases: Schema.optional(
        Schema.Array(
          Schema.Struct({
            clientId: Schema.String,
            expiryTime: Schema.Number,
            hostname: Schema.String,
            interfaceName: Schema.String,
            ipAddress: Schema.String,
            macAddress: Schema.String,
            connectorId: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              clientId: "client_id",
              expiryTime: "expiry_time",
              interfaceName: "interface_name",
              ipAddress: "ip_address",
              macAddress: "mac_address",
              connectorId: "connector_id",
            }),
          ),
        ),
      ),
      disks: Schema.optional(
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
            connectorId: Schema.optional(Schema.String),
            discards: Schema.optional(Schema.Number),
            discardsMerged: Schema.optional(Schema.Number),
            flushes: Schema.optional(Schema.Number),
            sectorsDiscarded: Schema.optional(Schema.Number),
            timeDiscardingMs: Schema.optional(Schema.Number),
            timeFlushingMs: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              inProgress: "in_progress",
              sectorsRead: "sectors_read",
              sectorsWritten: "sectors_written",
              timeInProgressMs: "time_in_progress_ms",
              timeReadingMs: "time_reading_ms",
              timeWritingMs: "time_writing_ms",
              weightedTimeInProgressMs: "weighted_time_in_progress_ms",
              writesMerged: "writes_merged",
              connectorId: "connector_id",
              discardsMerged: "discards_merged",
              sectorsDiscarded: "sectors_discarded",
              timeDiscardingMs: "time_discarding_ms",
              timeFlushingMs: "time_flushing_ms",
            }),
          ),
        ),
      ),
      haState: Schema.optional(Schema.String),
      haValue: Schema.optional(Schema.Number),
      interfaces: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            operstate: Schema.String,
            connectorId: Schema.optional(Schema.String),
            ipAddresses: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  interfaceName: Schema.String,
                  ipAddress: Schema.String,
                  connectorId: Schema.optional(Schema.String),
                }).pipe(
                  Schema.encodeKeys({
                    interfaceName: "interface_name",
                    ipAddress: "ip_address",
                    connectorId: "connector_id",
                  }),
                ),
              ),
            ),
            speed: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              connectorId: "connector_id",
              ipAddresses: "ip_addresses",
            }),
          ),
        ),
      ),
      ioPressureFull_10s: Schema.optional(Schema.Number),
      ioPressureFull_300s: Schema.optional(Schema.Number),
      ioPressureFull_60s: Schema.optional(Schema.Number),
      ioPressureFullTotalUs: Schema.optional(Schema.Number),
      ioPressureSome_10s: Schema.optional(Schema.Number),
      ioPressureSome_300s: Schema.optional(Schema.Number),
      ioPressureSome_60s: Schema.optional(Schema.Number),
      ioPressureSomeTotalUs: Schema.optional(Schema.Number),
      kernelBtime: Schema.optional(Schema.Number),
      kernelCtxt: Schema.optional(Schema.Number),
      kernelProcesses: Schema.optional(Schema.Number),
      kernelProcessesBlocked: Schema.optional(Schema.Number),
      kernelProcessesRunning: Schema.optional(Schema.Number),
      loadAverage_15m: Schema.optional(Schema.Number),
      loadAverage_1m: Schema.optional(Schema.Number),
      loadAverage_5m: Schema.optional(Schema.Number),
      loadAverageCur: Schema.optional(Schema.Number),
      loadAverageMax: Schema.optional(Schema.Number),
      memoryActiveBytes: Schema.optional(Schema.Number),
      memoryAnonHugepagesBytes: Schema.optional(Schema.Number),
      memoryAnonPagesBytes: Schema.optional(Schema.Number),
      memoryAvailableBytes: Schema.optional(Schema.Number),
      memoryBounceBytes: Schema.optional(Schema.Number),
      memoryBuffersBytes: Schema.optional(Schema.Number),
      memoryCachedBytes: Schema.optional(Schema.Number),
      memoryCmaFreeBytes: Schema.optional(Schema.Number),
      memoryCmaTotalBytes: Schema.optional(Schema.Number),
      memoryCommitLimitBytes: Schema.optional(Schema.Number),
      memoryCommittedAsBytes: Schema.optional(Schema.Number),
      memoryDirtyBytes: Schema.optional(Schema.Number),
      memoryFreeBytes: Schema.optional(Schema.Number),
      memoryHighFreeBytes: Schema.optional(Schema.Number),
      memoryHighTotalBytes: Schema.optional(Schema.Number),
      memoryHugepagesFree: Schema.optional(Schema.Number),
      memoryHugepagesRsvd: Schema.optional(Schema.Number),
      memoryHugepagesSurp: Schema.optional(Schema.Number),
      memoryHugepagesTotal: Schema.optional(Schema.Number),
      memoryHugepagesizeBytes: Schema.optional(Schema.Number),
      memoryInactiveBytes: Schema.optional(Schema.Number),
      memoryKReclaimableBytes: Schema.optional(Schema.Number),
      memoryKernelStackBytes: Schema.optional(Schema.Number),
      memoryLowFreeBytes: Schema.optional(Schema.Number),
      memoryLowTotalBytes: Schema.optional(Schema.Number),
      memoryMappedBytes: Schema.optional(Schema.Number),
      memoryPageTablesBytes: Schema.optional(Schema.Number),
      memoryPerCpuBytes: Schema.optional(Schema.Number),
      memoryPressureFull_10s: Schema.optional(Schema.Number),
      memoryPressureFull_300s: Schema.optional(Schema.Number),
      memoryPressureFull_60s: Schema.optional(Schema.Number),
      memoryPressureFullTotalUs: Schema.optional(Schema.Number),
      memoryPressureSome_10s: Schema.optional(Schema.Number),
      memoryPressureSome_300s: Schema.optional(Schema.Number),
      memoryPressureSome_60s: Schema.optional(Schema.Number),
      memoryPressureSomeTotalUs: Schema.optional(Schema.Number),
      memorySReclaimableBytes: Schema.optional(Schema.Number),
      memorySUnreclaimBytes: Schema.optional(Schema.Number),
      memorySecondaryPageTablesBytes: Schema.optional(Schema.Number),
      memoryShmemBytes: Schema.optional(Schema.Number),
      memoryShmemHugepagesBytes: Schema.optional(Schema.Number),
      memoryShmemPmdMappedBytes: Schema.optional(Schema.Number),
      memorySlabBytes: Schema.optional(Schema.Number),
      memorySwapCachedBytes: Schema.optional(Schema.Number),
      memorySwapFreeBytes: Schema.optional(Schema.Number),
      memorySwapTotalBytes: Schema.optional(Schema.Number),
      memoryTotalBytes: Schema.optional(Schema.Number),
      memoryVmallocChunkBytes: Schema.optional(Schema.Number),
      memoryVmallocTotalBytes: Schema.optional(Schema.Number),
      memoryVmallocUsedBytes: Schema.optional(Schema.Number),
      memoryWritebackBytes: Schema.optional(Schema.Number),
      memoryWritebackTmpBytes: Schema.optional(Schema.Number),
      memoryZSwapBytes: Schema.optional(Schema.Number),
      memoryZSwappedBytes: Schema.optional(Schema.Number),
      mounts: Schema.optional(
        Schema.Array(
          Schema.Struct({
            fileSystem: Schema.String,
            kind: Schema.String,
            mountPoint: Schema.String,
            name: Schema.String,
            availableBytes: Schema.optional(Schema.Number),
            connectorId: Schema.optional(Schema.String),
            isReadOnly: Schema.optional(Schema.Boolean),
            isRemovable: Schema.optional(Schema.Boolean),
            totalBytes: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              fileSystem: "file_system",
              mountPoint: "mount_point",
              availableBytes: "available_bytes",
              connectorId: "connector_id",
              isReadOnly: "is_read_only",
              isRemovable: "is_removable",
              totalBytes: "total_bytes",
            }),
          ),
        ),
      ),
      netdevs: Schema.optional(
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
            connectorId: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
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
      ),
      snmpIcmpInAddrMaskReps: Schema.optional(Schema.Number),
      snmpIcmpInAddrMasks: Schema.optional(Schema.Number),
      snmpIcmpInCsumErrors: Schema.optional(Schema.Number),
      snmpIcmpInDestUnreachs: Schema.optional(Schema.Number),
      snmpIcmpInEchoReps: Schema.optional(Schema.Number),
      snmpIcmpInEchos: Schema.optional(Schema.Number),
      snmpIcmpInErrors: Schema.optional(Schema.Number),
      snmpIcmpInMsgs: Schema.optional(Schema.Number),
      snmpIcmpInParmProbs: Schema.optional(Schema.Number),
      snmpIcmpInRedirects: Schema.optional(Schema.Number),
      snmpIcmpInSrcQuenchs: Schema.optional(Schema.Number),
      snmpIcmpInTimeExcds: Schema.optional(Schema.Number),
      snmpIcmpInTimestampReps: Schema.optional(Schema.Number),
      snmpIcmpInTimestamps: Schema.optional(Schema.Number),
      snmpIcmpOutAddrMaskReps: Schema.optional(Schema.Number),
      snmpIcmpOutAddrMasks: Schema.optional(Schema.Number),
      snmpIcmpOutDestUnreachs: Schema.optional(Schema.Number),
      snmpIcmpOutEchoReps: Schema.optional(Schema.Number),
      snmpIcmpOutEchos: Schema.optional(Schema.Number),
      snmpIcmpOutErrors: Schema.optional(Schema.Number),
      snmpIcmpOutMsgs: Schema.optional(Schema.Number),
      snmpIcmpOutParmProbs: Schema.optional(Schema.Number),
      snmpIcmpOutRedirects: Schema.optional(Schema.Number),
      snmpIcmpOutSrcQuenchs: Schema.optional(Schema.Number),
      snmpIcmpOutTimeExcds: Schema.optional(Schema.Number),
      snmpIcmpOutTimestampReps: Schema.optional(Schema.Number),
      snmpIcmpOutTimestamps: Schema.optional(Schema.Number),
      snmpIpDefaultTtl: Schema.optional(Schema.Number),
      snmpIpForwDatagrams: Schema.optional(Schema.Number),
      snmpIpForwardingEnabled: Schema.optional(Schema.Boolean),
      snmpIpFragCreates: Schema.optional(Schema.Number),
      snmpIpFragFails: Schema.optional(Schema.Number),
      snmpIpFragOks: Schema.optional(Schema.Number),
      snmpIpInAddrErrors: Schema.optional(Schema.Number),
      snmpIpInDelivers: Schema.optional(Schema.Number),
      snmpIpInDiscards: Schema.optional(Schema.Number),
      snmpIpInHdrErrors: Schema.optional(Schema.Number),
      snmpIpInReceives: Schema.optional(Schema.Number),
      snmpIpInUnknownProtos: Schema.optional(Schema.Number),
      snmpIpOutDiscards: Schema.optional(Schema.Number),
      snmpIpOutNoRoutes: Schema.optional(Schema.Number),
      snmpIpOutRequests: Schema.optional(Schema.Number),
      snmpIpReasmFails: Schema.optional(Schema.Number),
      snmpIpReasmOks: Schema.optional(Schema.Number),
      snmpIpReasmReqds: Schema.optional(Schema.Number),
      snmpIpReasmTimeout: Schema.optional(Schema.Number),
      snmpTcpActiveOpens: Schema.optional(Schema.Number),
      snmpTcpAttemptFails: Schema.optional(Schema.Number),
      snmpTcpCurrEstab: Schema.optional(Schema.Number),
      snmpTcpEstabResets: Schema.optional(Schema.Number),
      snmpTcpInCsumErrors: Schema.optional(Schema.Number),
      snmpTcpInErrs: Schema.optional(Schema.Number),
      snmpTcpInSegs: Schema.optional(Schema.Number),
      snmpTcpMaxConn: Schema.optional(Schema.Number),
      snmpTcpOutRsts: Schema.optional(Schema.Number),
      snmpTcpOutSegs: Schema.optional(Schema.Number),
      snmpTcpPassiveOpens: Schema.optional(Schema.Number),
      snmpTcpRetransSegs: Schema.optional(Schema.Number),
      snmpTcpRtoMax: Schema.optional(Schema.Number),
      snmpTcpRtoMin: Schema.optional(Schema.Number),
      snmpUdpInDatagrams: Schema.optional(Schema.Number),
      snmpUdpInErrors: Schema.optional(Schema.Number),
      snmpUdpNoPorts: Schema.optional(Schema.Number),
      snmpUdpOutDatagrams: Schema.optional(Schema.Number),
      systemBootTimeS: Schema.optional(Schema.Number),
      thermals: Schema.optional(
        Schema.Array(
          Schema.Struct({
            label: Schema.String,
            connectorId: Schema.optional(Schema.String),
            criticalCelcius: Schema.optional(Schema.Number),
            currentCelcius: Schema.optional(Schema.Number),
            maxCelcius: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              connectorId: "connector_id",
              criticalCelcius: "critical_celcius",
              currentCelcius: "current_celcius",
              maxCelcius: "max_celcius",
            }),
          ),
        ),
      ),
      tunnels: Schema.optional(
        Schema.Array(
          Schema.Struct({
            healthState: Schema.String,
            healthValue: Schema.Number,
            interfaceName: Schema.String,
            tunnelId: Schema.String,
            connectorId: Schema.optional(Schema.String),
            probedMtu: Schema.optional(Schema.Number),
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
      ),
      uptimeIdleMs: Schema.optional(Schema.Number),
      uptimeTotalMs: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        countReclaimFailures: "count_reclaim_failures",
        countReclaimedPaths: "count_reclaimed_paths",
        countRecordFailed: "count_record_failed",
        countTransmitFailures: "count_transmit_failures",
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
        haState: "ha_state",
        haValue: "ha_value",
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
        uptimeIdleMs: "uptime_idle_ms",
        uptimeTotalMs: "uptime_total_ms",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListConnectorSnapshotLatestsResponse>;

export const listConnectorSnapshotLatests: (
  input: ListConnectorSnapshotLatestsRequest,
) => Effect.Effect<
  ListConnectorSnapshotLatestsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PskGenerateIpsecTunnelRequest = Schema.Struct({
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
  ipsecTunnelId?: string;
  /** A randomly generated or provided string for use in the IPsec tunnel. */
  psk?: string;
  /** The PSK metadata that includes when the PSK was generated. */
  pskMetadata?: { lastGeneratedOn?: string };
}

export const PskGenerateIpsecTunnelResponse = Schema.Struct({
  ipsecTunnelId: Schema.optional(Schema.String),
  psk: Schema.optional(Schema.String),
  pskMetadata: Schema.optional(
    Schema.Struct({
      lastGeneratedOn: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ lastGeneratedOn: "last_generated_on" })),
  ),
}).pipe(
  Schema.encodeKeys({
    ipsecTunnelId: "ipsec_tunnel_id",
    pskMetadata: "psk_metadata",
  }),
) as unknown as Schema.Schema<PskGenerateIpsecTunnelResponse>;

export const pskGenerateIpsecTunnel: (
  input: PskGenerateIpsecTunnelRequest,
) => Effect.Effect<
  PskGenerateIpsecTunnelResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetGreTunnelRequest = Schema.Struct({
  greTunnelId: Schema.String.pipe(T.HttpPath("greTunnelId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
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
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    mtu?: number;
    ttl?: number;
  };
}

export const GetGreTunnelResponse = Schema.Struct({
  greTunnel: Schema.optional(
    Schema.Struct({
      id: Schema.String,
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
      bgpStatus: Schema.optional(
        Schema.Struct({
          state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
          tcpEstablished: Schema.Boolean,
          updatedAt: Schema.String,
          bgpState: Schema.optional(Schema.String),
          cfSpeakerIp: Schema.optional(Schema.String),
          cfSpeakerPort: Schema.optional(Schema.Number),
          customerSpeakerIp: Schema.optional(Schema.String),
          customerSpeakerPort: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            tcpEstablished: "tcp_established",
            updatedAt: "updated_at",
            bgpState: "bgp_state",
            cfSpeakerIp: "cf_speaker_ip",
            cfSpeakerPort: "cf_speaker_port",
            customerSpeakerIp: "customer_speaker_ip",
            customerSpeakerPort: "customer_speaker_port",
          }),
        ),
      ),
      createdOn: Schema.optional(Schema.String),
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
      modifiedOn: Schema.optional(Schema.String),
      mtu: Schema.optional(Schema.Number),
      ttl: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        cloudflareGreEndpoint: "cloudflare_gre_endpoint",
        customerGreEndpoint: "customer_gre_endpoint",
        interfaceAddress: "interface_address",
        automaticReturnRouting: "automatic_return_routing",
        bgpStatus: "bgp_status",
        createdOn: "created_on",
        healthCheck: "health_check",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ greTunnel: "gre_tunnel" }),
) as unknown as Schema.Schema<GetGreTunnelResponse>;

export const getGreTunnel: (
  input: GetGreTunnelRequest,
) => Effect.Effect<
  GetGreTunnelResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListGreTunnelsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/gre_tunnels" }),
) as unknown as Schema.Schema<ListGreTunnelsRequest>;

export interface ListGreTunnelsResponse {
  greTunnels?: {
    id: string;
    cloudflareGreEndpoint: string;
    customerGreEndpoint: string;
    interfaceAddress: string;
    name: string;
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    mtu?: number;
    ttl?: number;
  }[];
}

export const ListGreTunnelsResponse = Schema.Struct({
  greTunnels: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
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
        bgpStatus: Schema.optional(
          Schema.Struct({
            state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
            tcpEstablished: Schema.Boolean,
            updatedAt: Schema.String,
            bgpState: Schema.optional(Schema.String),
            cfSpeakerIp: Schema.optional(Schema.String),
            cfSpeakerPort: Schema.optional(Schema.Number),
            customerSpeakerIp: Schema.optional(Schema.String),
            customerSpeakerPort: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              tcpEstablished: "tcp_established",
              updatedAt: "updated_at",
              bgpState: "bgp_state",
              cfSpeakerIp: "cf_speaker_ip",
              cfSpeakerPort: "cf_speaker_port",
              customerSpeakerIp: "customer_speaker_ip",
              customerSpeakerPort: "customer_speaker_port",
            }),
          ),
        ),
        createdOn: Schema.optional(Schema.String),
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
        modifiedOn: Schema.optional(Schema.String),
        mtu: Schema.optional(Schema.Number),
        ttl: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          cloudflareGreEndpoint: "cloudflare_gre_endpoint",
          customerGreEndpoint: "customer_gre_endpoint",
          interfaceAddress: "interface_address",
          automaticReturnRouting: "automatic_return_routing",
          bgpStatus: "bgp_status",
          createdOn: "created_on",
          healthCheck: "health_check",
          interfaceAddress6: "interface_address6",
          modifiedOn: "modified_on",
        }),
      ),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ greTunnels: "gre_tunnels" }),
) as unknown as Schema.Schema<ListGreTunnelsResponse>;

export const listGreTunnels: (
  input: ListGreTunnelsRequest,
) => Effect.Effect<
  ListGreTunnelsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreateGreTunnelRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
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
}).pipe(
  Schema.encodeKeys({
    cloudflareGreEndpoint: "cloudflare_gre_endpoint",
    customerGreEndpoint: "customer_gre_endpoint",
    interfaceAddress: "interface_address",
    automaticReturnRouting: "automatic_return_routing",
    healthCheck: "health_check",
    interfaceAddress6: "interface_address6",
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
  automaticReturnRouting?: boolean;
  bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
  bgpStatus?: {
    state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
    tcpEstablished: boolean;
    updatedAt: string;
    bgpState?: string;
    cfSpeakerIp?: string;
    cfSpeakerPort?: number;
    customerSpeakerIp?: string;
    customerSpeakerPort?: number;
  };
  /** The date and time the tunnel was created. */
  createdOn?: string;
  /** An optional description of the GRE tunnel. */
  description?: string;
  healthCheck?: {
    direction?: "unidirectional" | "bidirectional";
    enabled?: boolean;
    rate?: "low" | "mid" | "high";
    target?: { saved?: string } | string;
    type?: "reply" | "request";
  };
  /** A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1: */
  interfaceAddress6?: string;
  /** The date and time the tunnel was last modified. */
  modifiedOn?: string;
  /** Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576. */
  mtu?: number;
  /** Time To Live (TTL) in number of hops of the GRE tunnel. */
  ttl?: number;
}

export const CreateGreTunnelResponse = Schema.Struct({
  id: Schema.String,
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
  bgpStatus: Schema.optional(
    Schema.Struct({
      state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
      tcpEstablished: Schema.Boolean,
      updatedAt: Schema.String,
      bgpState: Schema.optional(Schema.String),
      cfSpeakerIp: Schema.optional(Schema.String),
      cfSpeakerPort: Schema.optional(Schema.Number),
      customerSpeakerIp: Schema.optional(Schema.String),
      customerSpeakerPort: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        tcpEstablished: "tcp_established",
        updatedAt: "updated_at",
        bgpState: "bgp_state",
        cfSpeakerIp: "cf_speaker_ip",
        cfSpeakerPort: "cf_speaker_port",
        customerSpeakerIp: "customer_speaker_ip",
        customerSpeakerPort: "customer_speaker_port",
      }),
    ),
  ),
  createdOn: Schema.optional(Schema.String),
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
  modifiedOn: Schema.optional(Schema.String),
  mtu: Schema.optional(Schema.Number),
  ttl: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    cloudflareGreEndpoint: "cloudflare_gre_endpoint",
    customerGreEndpoint: "customer_gre_endpoint",
    interfaceAddress: "interface_address",
    automaticReturnRouting: "automatic_return_routing",
    bgpStatus: "bgp_status",
    createdOn: "created_on",
    healthCheck: "health_check",
    interfaceAddress6: "interface_address6",
    modifiedOn: "modified_on",
  }),
) as unknown as Schema.Schema<CreateGreTunnelResponse>;

export const createGreTunnel: (
  input: CreateGreTunnelRequest,
) => Effect.Effect<
  CreateGreTunnelResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateGreTunnelRequest = Schema.Struct({
  greTunnelId: Schema.String.pipe(T.HttpPath("greTunnelId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
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
}).pipe(
  Schema.encodeKeys({
    cloudflareGreEndpoint: "cloudflare_gre_endpoint",
    customerGreEndpoint: "customer_gre_endpoint",
    interfaceAddress: "interface_address",
    automaticReturnRouting: "automatic_return_routing",
    healthCheck: "health_check",
    interfaceAddress6: "interface_address6",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/gre_tunnels/{greTunnelId}",
  }),
) as unknown as Schema.Schema<UpdateGreTunnelRequest>;

export interface UpdateGreTunnelResponse {
  modified?: boolean;
  modifiedGreTunnel?: {
    id: string;
    cloudflareGreEndpoint: string;
    customerGreEndpoint: string;
    interfaceAddress: string;
    name: string;
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    mtu?: number;
    ttl?: number;
  };
}

export const UpdateGreTunnelResponse = Schema.Struct({
  modified: Schema.optional(Schema.Boolean),
  modifiedGreTunnel: Schema.optional(
    Schema.Struct({
      id: Schema.String,
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
      bgpStatus: Schema.optional(
        Schema.Struct({
          state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
          tcpEstablished: Schema.Boolean,
          updatedAt: Schema.String,
          bgpState: Schema.optional(Schema.String),
          cfSpeakerIp: Schema.optional(Schema.String),
          cfSpeakerPort: Schema.optional(Schema.Number),
          customerSpeakerIp: Schema.optional(Schema.String),
          customerSpeakerPort: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            tcpEstablished: "tcp_established",
            updatedAt: "updated_at",
            bgpState: "bgp_state",
            cfSpeakerIp: "cf_speaker_ip",
            cfSpeakerPort: "cf_speaker_port",
            customerSpeakerIp: "customer_speaker_ip",
            customerSpeakerPort: "customer_speaker_port",
          }),
        ),
      ),
      createdOn: Schema.optional(Schema.String),
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
      modifiedOn: Schema.optional(Schema.String),
      mtu: Schema.optional(Schema.Number),
      ttl: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        cloudflareGreEndpoint: "cloudflare_gre_endpoint",
        customerGreEndpoint: "customer_gre_endpoint",
        interfaceAddress: "interface_address",
        automaticReturnRouting: "automatic_return_routing",
        bgpStatus: "bgp_status",
        createdOn: "created_on",
        healthCheck: "health_check",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ modifiedGreTunnel: "modified_gre_tunnel" }),
) as unknown as Schema.Schema<UpdateGreTunnelResponse>;

export const updateGreTunnel: (
  input: UpdateGreTunnelRequest,
) => Effect.Effect<
  UpdateGreTunnelResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DeleteGreTunnelRequest = Schema.Struct({
  greTunnelId: Schema.String.pipe(T.HttpPath("greTunnelId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/gre_tunnels/{greTunnelId}",
  }),
) as unknown as Schema.Schema<DeleteGreTunnelRequest>;

export interface DeleteGreTunnelResponse {
  deleted?: boolean;
  deletedGreTunnel?: {
    id: string;
    cloudflareGreEndpoint: string;
    customerGreEndpoint: string;
    interfaceAddress: string;
    name: string;
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    mtu?: number;
    ttl?: number;
  };
}

export const DeleteGreTunnelResponse = Schema.Struct({
  deleted: Schema.optional(Schema.Boolean),
  deletedGreTunnel: Schema.optional(
    Schema.Struct({
      id: Schema.String,
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
      bgpStatus: Schema.optional(
        Schema.Struct({
          state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
          tcpEstablished: Schema.Boolean,
          updatedAt: Schema.String,
          bgpState: Schema.optional(Schema.String),
          cfSpeakerIp: Schema.optional(Schema.String),
          cfSpeakerPort: Schema.optional(Schema.Number),
          customerSpeakerIp: Schema.optional(Schema.String),
          customerSpeakerPort: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            tcpEstablished: "tcp_established",
            updatedAt: "updated_at",
            bgpState: "bgp_state",
            cfSpeakerIp: "cf_speaker_ip",
            cfSpeakerPort: "cf_speaker_port",
            customerSpeakerIp: "customer_speaker_ip",
            customerSpeakerPort: "customer_speaker_port",
          }),
        ),
      ),
      createdOn: Schema.optional(Schema.String),
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
      modifiedOn: Schema.optional(Schema.String),
      mtu: Schema.optional(Schema.Number),
      ttl: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        cloudflareGreEndpoint: "cloudflare_gre_endpoint",
        customerGreEndpoint: "customer_gre_endpoint",
        interfaceAddress: "interface_address",
        automaticReturnRouting: "automatic_return_routing",
        bgpStatus: "bgp_status",
        createdOn: "created_on",
        healthCheck: "health_check",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ deletedGreTunnel: "deleted_gre_tunnel" }),
) as unknown as Schema.Schema<DeleteGreTunnelResponse>;

export const deleteGreTunnel: (
  input: DeleteGreTunnelRequest,
) => Effect.Effect<
  DeleteGreTunnelResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetIpsecTunnelRequest = Schema.Struct({
  ipsecTunnelId: Schema.String.pipe(T.HttpPath("ipsecTunnelId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
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
    allowNullCipher?: boolean;
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    customRemoteIdentities?: { fqdnId?: string };
    customerEndpoint?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    pskMetadata?: unknown;
    replayProtection?: boolean;
  };
}

export const GetIpsecTunnelResponse = Schema.Struct({
  ipsecTunnel: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      cloudflareEndpoint: Schema.String,
      interfaceAddress: Schema.String,
      name: Schema.String,
      allowNullCipher: Schema.optional(Schema.Boolean),
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
      bgpStatus: Schema.optional(
        Schema.Struct({
          state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
          tcpEstablished: Schema.Boolean,
          updatedAt: Schema.String,
          bgpState: Schema.optional(Schema.String),
          cfSpeakerIp: Schema.optional(Schema.String),
          cfSpeakerPort: Schema.optional(Schema.Number),
          customerSpeakerIp: Schema.optional(Schema.String),
          customerSpeakerPort: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            tcpEstablished: "tcp_established",
            updatedAt: "updated_at",
            bgpState: "bgp_state",
            cfSpeakerIp: "cf_speaker_ip",
            cfSpeakerPort: "cf_speaker_port",
            customerSpeakerIp: "customer_speaker_ip",
            customerSpeakerPort: "customer_speaker_port",
          }),
        ),
      ),
      createdOn: Schema.optional(Schema.String),
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
      modifiedOn: Schema.optional(Schema.String),
      pskMetadata: Schema.optional(Schema.Unknown),
      replayProtection: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        cloudflareEndpoint: "cloudflare_endpoint",
        interfaceAddress: "interface_address",
        allowNullCipher: "allow_null_cipher",
        automaticReturnRouting: "automatic_return_routing",
        bgpStatus: "bgp_status",
        createdOn: "created_on",
        customRemoteIdentities: "custom_remote_identities",
        customerEndpoint: "customer_endpoint",
        healthCheck: "health_check",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
        pskMetadata: "psk_metadata",
        replayProtection: "replay_protection",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ ipsecTunnel: "ipsec_tunnel" }),
) as unknown as Schema.Schema<GetIpsecTunnelResponse>;

export const getIpsecTunnel: (
  input: GetIpsecTunnelRequest,
) => Effect.Effect<
  GetIpsecTunnelResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListIpsecTunnelsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/ipsec_tunnels" }),
) as unknown as Schema.Schema<ListIpsecTunnelsRequest>;

export interface ListIpsecTunnelsResponse {
  ipsecTunnels?: {
    id: string;
    cloudflareEndpoint: string;
    interfaceAddress: string;
    name: string;
    allowNullCipher?: boolean;
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    customRemoteIdentities?: { fqdnId?: string };
    customerEndpoint?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    pskMetadata?: unknown;
    replayProtection?: boolean;
  }[];
}

export const ListIpsecTunnelsResponse = Schema.Struct({
  ipsecTunnels: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        cloudflareEndpoint: Schema.String,
        interfaceAddress: Schema.String,
        name: Schema.String,
        allowNullCipher: Schema.optional(Schema.Boolean),
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
        bgpStatus: Schema.optional(
          Schema.Struct({
            state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
            tcpEstablished: Schema.Boolean,
            updatedAt: Schema.String,
            bgpState: Schema.optional(Schema.String),
            cfSpeakerIp: Schema.optional(Schema.String),
            cfSpeakerPort: Schema.optional(Schema.Number),
            customerSpeakerIp: Schema.optional(Schema.String),
            customerSpeakerPort: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              tcpEstablished: "tcp_established",
              updatedAt: "updated_at",
              bgpState: "bgp_state",
              cfSpeakerIp: "cf_speaker_ip",
              cfSpeakerPort: "cf_speaker_port",
              customerSpeakerIp: "customer_speaker_ip",
              customerSpeakerPort: "customer_speaker_port",
            }),
          ),
        ),
        createdOn: Schema.optional(Schema.String),
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
        modifiedOn: Schema.optional(Schema.String),
        pskMetadata: Schema.optional(Schema.Unknown),
        replayProtection: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          cloudflareEndpoint: "cloudflare_endpoint",
          interfaceAddress: "interface_address",
          allowNullCipher: "allow_null_cipher",
          automaticReturnRouting: "automatic_return_routing",
          bgpStatus: "bgp_status",
          createdOn: "created_on",
          customRemoteIdentities: "custom_remote_identities",
          customerEndpoint: "customer_endpoint",
          healthCheck: "health_check",
          interfaceAddress6: "interface_address6",
          modifiedOn: "modified_on",
          pskMetadata: "psk_metadata",
          replayProtection: "replay_protection",
        }),
      ),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ ipsecTunnels: "ipsec_tunnels" }),
) as unknown as Schema.Schema<ListIpsecTunnelsResponse>;

export const listIpsecTunnels: (
  input: ListIpsecTunnelsRequest,
) => Effect.Effect<
  ListIpsecTunnelsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreateIpsecTunnelRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
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
    automaticReturnRouting: "automatic_return_routing",
    customRemoteIdentities: "custom_remote_identities",
    customerEndpoint: "customer_endpoint",
    healthCheck: "health_check",
    interfaceAddress6: "interface_address6",
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
  allowNullCipher?: boolean;
  /** True if automatic stateful return routing should be enabled for a tunnel, false otherwise. */
  automaticReturnRouting?: boolean;
  bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
  bgpStatus?: {
    state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
    tcpEstablished: boolean;
    updatedAt: string;
    bgpState?: string;
    cfSpeakerIp?: string;
    cfSpeakerPort?: number;
    customerSpeakerIp?: string;
    customerSpeakerPort?: number;
  };
  /** The date and time the tunnel was created. */
  createdOn?: string;
  customRemoteIdentities?: { fqdnId?: string };
  /** The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work. */
  customerEndpoint?: string;
  /** An optional description forthe IPsec tunnel. */
  description?: string;
  healthCheck?: {
    direction?: "unidirectional" | "bidirectional";
    enabled?: boolean;
    rate?: "low" | "mid" | "high";
    target?: { saved?: string } | string;
    type?: "reply" | "request";
  };
  /** A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1: */
  interfaceAddress6?: string;
  /** The date and time the tunnel was last modified. */
  modifiedOn?: string;
  /** The PSK metadata that includes when the PSK was generated. */
  pskMetadata?: { lastGeneratedOn?: string };
  /** If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction. */
  replayProtection?: boolean;
}

export const CreateIpsecTunnelResponse = Schema.Struct({
  id: Schema.String,
  cloudflareEndpoint: Schema.String,
  interfaceAddress: Schema.String,
  name: Schema.String,
  allowNullCipher: Schema.optional(Schema.Boolean),
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
  bgpStatus: Schema.optional(
    Schema.Struct({
      state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
      tcpEstablished: Schema.Boolean,
      updatedAt: Schema.String,
      bgpState: Schema.optional(Schema.String),
      cfSpeakerIp: Schema.optional(Schema.String),
      cfSpeakerPort: Schema.optional(Schema.Number),
      customerSpeakerIp: Schema.optional(Schema.String),
      customerSpeakerPort: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        tcpEstablished: "tcp_established",
        updatedAt: "updated_at",
        bgpState: "bgp_state",
        cfSpeakerIp: "cf_speaker_ip",
        cfSpeakerPort: "cf_speaker_port",
        customerSpeakerIp: "customer_speaker_ip",
        customerSpeakerPort: "customer_speaker_port",
      }),
    ),
  ),
  createdOn: Schema.optional(Schema.String),
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
  modifiedOn: Schema.optional(Schema.String),
  pskMetadata: Schema.optional(
    Schema.Struct({
      lastGeneratedOn: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ lastGeneratedOn: "last_generated_on" })),
  ),
  replayProtection: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    cloudflareEndpoint: "cloudflare_endpoint",
    interfaceAddress: "interface_address",
    allowNullCipher: "allow_null_cipher",
    automaticReturnRouting: "automatic_return_routing",
    bgpStatus: "bgp_status",
    createdOn: "created_on",
    customRemoteIdentities: "custom_remote_identities",
    customerEndpoint: "customer_endpoint",
    healthCheck: "health_check",
    interfaceAddress6: "interface_address6",
    modifiedOn: "modified_on",
    pskMetadata: "psk_metadata",
    replayProtection: "replay_protection",
  }),
) as unknown as Schema.Schema<CreateIpsecTunnelResponse>;

export const createIpsecTunnel: (
  input: CreateIpsecTunnelRequest,
) => Effect.Effect<
  CreateIpsecTunnelResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateIpsecTunnelRequest = Schema.Struct({
  ipsecTunnelId: Schema.String.pipe(T.HttpPath("ipsecTunnelId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
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
    automaticReturnRouting: "automatic_return_routing",
    customRemoteIdentities: "custom_remote_identities",
    customerEndpoint: "customer_endpoint",
    healthCheck: "health_check",
    interfaceAddress6: "interface_address6",
    replayProtection: "replay_protection",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/ipsec_tunnels/{ipsecTunnelId}",
  }),
) as unknown as Schema.Schema<UpdateIpsecTunnelRequest>;

export interface UpdateIpsecTunnelResponse {
  modified?: boolean;
  modifiedIpsecTunnel?: {
    id: string;
    cloudflareEndpoint: string;
    interfaceAddress: string;
    name: string;
    allowNullCipher?: boolean;
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    customRemoteIdentities?: { fqdnId?: string };
    customerEndpoint?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    pskMetadata?: unknown;
    replayProtection?: boolean;
  };
}

export const UpdateIpsecTunnelResponse = Schema.Struct({
  modified: Schema.optional(Schema.Boolean),
  modifiedIpsecTunnel: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      cloudflareEndpoint: Schema.String,
      interfaceAddress: Schema.String,
      name: Schema.String,
      allowNullCipher: Schema.optional(Schema.Boolean),
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
      bgpStatus: Schema.optional(
        Schema.Struct({
          state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
          tcpEstablished: Schema.Boolean,
          updatedAt: Schema.String,
          bgpState: Schema.optional(Schema.String),
          cfSpeakerIp: Schema.optional(Schema.String),
          cfSpeakerPort: Schema.optional(Schema.Number),
          customerSpeakerIp: Schema.optional(Schema.String),
          customerSpeakerPort: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            tcpEstablished: "tcp_established",
            updatedAt: "updated_at",
            bgpState: "bgp_state",
            cfSpeakerIp: "cf_speaker_ip",
            cfSpeakerPort: "cf_speaker_port",
            customerSpeakerIp: "customer_speaker_ip",
            customerSpeakerPort: "customer_speaker_port",
          }),
        ),
      ),
      createdOn: Schema.optional(Schema.String),
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
      modifiedOn: Schema.optional(Schema.String),
      pskMetadata: Schema.optional(Schema.Unknown),
      replayProtection: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        cloudflareEndpoint: "cloudflare_endpoint",
        interfaceAddress: "interface_address",
        allowNullCipher: "allow_null_cipher",
        automaticReturnRouting: "automatic_return_routing",
        bgpStatus: "bgp_status",
        createdOn: "created_on",
        customRemoteIdentities: "custom_remote_identities",
        customerEndpoint: "customer_endpoint",
        healthCheck: "health_check",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
        pskMetadata: "psk_metadata",
        replayProtection: "replay_protection",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ modifiedIpsecTunnel: "modified_ipsec_tunnel" }),
) as unknown as Schema.Schema<UpdateIpsecTunnelResponse>;

export const updateIpsecTunnel: (
  input: UpdateIpsecTunnelRequest,
) => Effect.Effect<
  UpdateIpsecTunnelResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DeleteIpsecTunnelRequest = Schema.Struct({
  ipsecTunnelId: Schema.String.pipe(T.HttpPath("ipsecTunnelId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/ipsec_tunnels/{ipsecTunnelId}",
  }),
) as unknown as Schema.Schema<DeleteIpsecTunnelRequest>;

export interface DeleteIpsecTunnelResponse {
  deleted?: boolean;
  deletedIpsecTunnel?: {
    id: string;
    cloudflareEndpoint: string;
    interfaceAddress: string;
    name: string;
    allowNullCipher?: boolean;
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    customRemoteIdentities?: { fqdnId?: string };
    customerEndpoint?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    pskMetadata?: unknown;
    replayProtection?: boolean;
  };
}

export const DeleteIpsecTunnelResponse = Schema.Struct({
  deleted: Schema.optional(Schema.Boolean),
  deletedIpsecTunnel: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      cloudflareEndpoint: Schema.String,
      interfaceAddress: Schema.String,
      name: Schema.String,
      allowNullCipher: Schema.optional(Schema.Boolean),
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
      bgpStatus: Schema.optional(
        Schema.Struct({
          state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
          tcpEstablished: Schema.Boolean,
          updatedAt: Schema.String,
          bgpState: Schema.optional(Schema.String),
          cfSpeakerIp: Schema.optional(Schema.String),
          cfSpeakerPort: Schema.optional(Schema.Number),
          customerSpeakerIp: Schema.optional(Schema.String),
          customerSpeakerPort: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            tcpEstablished: "tcp_established",
            updatedAt: "updated_at",
            bgpState: "bgp_state",
            cfSpeakerIp: "cf_speaker_ip",
            cfSpeakerPort: "cf_speaker_port",
            customerSpeakerIp: "customer_speaker_ip",
            customerSpeakerPort: "customer_speaker_port",
          }),
        ),
      ),
      createdOn: Schema.optional(Schema.String),
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
      modifiedOn: Schema.optional(Schema.String),
      pskMetadata: Schema.optional(Schema.Unknown),
      replayProtection: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        cloudflareEndpoint: "cloudflare_endpoint",
        interfaceAddress: "interface_address",
        allowNullCipher: "allow_null_cipher",
        automaticReturnRouting: "automatic_return_routing",
        bgpStatus: "bgp_status",
        createdOn: "created_on",
        customRemoteIdentities: "custom_remote_identities",
        customerEndpoint: "customer_endpoint",
        healthCheck: "health_check",
        interfaceAddress6: "interface_address6",
        modifiedOn: "modified_on",
        pskMetadata: "psk_metadata",
        replayProtection: "replay_protection",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ deletedIpsecTunnel: "deleted_ipsec_tunnel" }),
) as unknown as Schema.Schema<DeleteIpsecTunnelResponse>;

export const deleteIpsecTunnel: (
  input: DeleteIpsecTunnelRequest,
) => Effect.Effect<
  DeleteIpsecTunnelResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetPcapRequest = Schema.Struct({
  pcapId: Schema.String.pipe(T.HttpPath("pcapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pcaps/{pcapId}" }),
) as unknown as Schema.Schema<GetPcapRequest>;

export type GetPcapResponse =
  | {
      id?: string;
      filterV1?: {
        destinationAddress?: string;
        destinationPort?: number;
        protocol?: number;
        sourceAddress?: string;
        sourcePort?: number;
      };
      offsetTime?: string;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed";
      submitted?: string;
      system?: "magic-transit";
      timeLimit?: number;
      type?: "simple" | "full";
    }
  | {
      id?: string;
      byteLimit?: number;
      coloName?: string;
      destinationConf?: string;
      errorMessage?: string;
      filterV1?: unknown;
      packetsCaptured?: number;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed";
      stopRequested?: string;
      submitted?: string;
      system?: "magic-transit";
      timeLimit?: number;
      type?: "simple" | "full";
    };

export const GetPcapResponse = Schema.Union([
  Schema.Struct({
    id: Schema.optional(Schema.String),
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
          sourceAddress: "source_address",
          sourcePort: "source_port",
        }),
      ),
    ),
    offsetTime: Schema.optional(Schema.String),
    status: Schema.optional(
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
    ),
    submitted: Schema.optional(Schema.String),
    system: Schema.optional(Schema.Literal("magic-transit")),
    timeLimit: Schema.optional(Schema.Number),
    type: Schema.optional(Schema.Literals(["simple", "full"])),
  }).pipe(
    Schema.encodeKeys({
      filterV1: "filter_v1",
      offsetTime: "offset_time",
      timeLimit: "time_limit",
    }),
  ),
  Schema.Struct({
    id: Schema.optional(Schema.String),
    byteLimit: Schema.optional(Schema.Number),
    coloName: Schema.optional(Schema.String),
    destinationConf: Schema.optional(Schema.String),
    errorMessage: Schema.optional(Schema.String),
    filterV1: Schema.optional(Schema.Unknown),
    packetsCaptured: Schema.optional(Schema.Number),
    status: Schema.optional(
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
    ),
    stopRequested: Schema.optional(Schema.String),
    submitted: Schema.optional(Schema.String),
    system: Schema.optional(Schema.Literal("magic-transit")),
    timeLimit: Schema.optional(Schema.Number),
    type: Schema.optional(Schema.Literals(["simple", "full"])),
  }).pipe(
    Schema.encodeKeys({
      byteLimit: "byte_limit",
      coloName: "colo_name",
      destinationConf: "destination_conf",
      errorMessage: "error_message",
      filterV1: "filter_v1",
      packetsCaptured: "packets_captured",
      stopRequested: "stop_requested",
      timeLimit: "time_limit",
    }),
  ),
]) as unknown as Schema.Schema<GetPcapResponse>;

export const getPcap: (
  input: GetPcapRequest,
) => Effect.Effect<
  GetPcapResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPcapRequest,
  output: GetPcapResponse,
  errors: [],
}));

export interface ListPcapsRequest {
  /** Identifier. */
  accountId: string;
}

export const ListPcapsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pcaps" }),
) as unknown as Schema.Schema<ListPcapsRequest>;

export type ListPcapsResponse = (
  | {
      id?: string;
      filterV1?: {
        destinationAddress?: string;
        destinationPort?: number;
        protocol?: number;
        sourceAddress?: string;
        sourcePort?: number;
      };
      offsetTime?: string;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed";
      submitted?: string;
      system?: "magic-transit";
      timeLimit?: number;
      type?: "simple" | "full";
    }
  | {
      id?: string;
      byteLimit?: number;
      coloName?: string;
      destinationConf?: string;
      errorMessage?: string;
      filterV1?: unknown;
      packetsCaptured?: number;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed";
      stopRequested?: string;
      submitted?: string;
      system?: "magic-transit";
      timeLimit?: number;
      type?: "simple" | "full";
    }
)[];

export const ListPcapsResponse = Schema.Array(
  Schema.Union([
    Schema.Struct({
      id: Schema.optional(Schema.String),
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
            sourceAddress: "source_address",
            sourcePort: "source_port",
          }),
        ),
      ),
      offsetTime: Schema.optional(Schema.String),
      status: Schema.optional(
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
      ),
      submitted: Schema.optional(Schema.String),
      system: Schema.optional(Schema.Literal("magic-transit")),
      timeLimit: Schema.optional(Schema.Number),
      type: Schema.optional(Schema.Literals(["simple", "full"])),
    }).pipe(
      Schema.encodeKeys({
        filterV1: "filter_v1",
        offsetTime: "offset_time",
        timeLimit: "time_limit",
      }),
    ),
    Schema.Struct({
      id: Schema.optional(Schema.String),
      byteLimit: Schema.optional(Schema.Number),
      coloName: Schema.optional(Schema.String),
      destinationConf: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
      filterV1: Schema.optional(Schema.Unknown),
      packetsCaptured: Schema.optional(Schema.Number),
      status: Schema.optional(
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
      ),
      stopRequested: Schema.optional(Schema.String),
      submitted: Schema.optional(Schema.String),
      system: Schema.optional(Schema.Literal("magic-transit")),
      timeLimit: Schema.optional(Schema.Number),
      type: Schema.optional(Schema.Literals(["simple", "full"])),
    }).pipe(
      Schema.encodeKeys({
        byteLimit: "byte_limit",
        coloName: "colo_name",
        destinationConf: "destination_conf",
        errorMessage: "error_message",
        filterV1: "filter_v1",
        packetsCaptured: "packets_captured",
        stopRequested: "stop_requested",
        timeLimit: "time_limit",
      }),
    ),
  ]),
) as unknown as Schema.Schema<ListPcapsResponse>;

export const listPcaps: (
  input: ListPcapsRequest,
) => Effect.Effect<
  ListPcapsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPcapsRequest,
  output: ListPcapsResponse,
  errors: [],
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

export const CreatePcapRequest = Schema.Struct({
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
        sourceAddress: "source_address",
        sourcePort: "source_port",
      }),
    ),
  ),
  offsetTime: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    packetLimit: "packet_limit",
    timeLimit: "time_limit",
    filterV1: "filter_v1",
    offsetTime: "offset_time",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/pcaps" }),
) as unknown as Schema.Schema<CreatePcapRequest>;

export type CreatePcapResponse =
  | {
      id?: string;
      filterV1?: {
        destinationAddress?: string;
        destinationPort?: number;
        protocol?: number;
        sourceAddress?: string;
        sourcePort?: number;
      };
      offsetTime?: string;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed";
      submitted?: string;
      system?: "magic-transit";
      timeLimit?: number;
      type?: "simple" | "full";
    }
  | {
      id?: string;
      byteLimit?: number;
      coloName?: string;
      destinationConf?: string;
      errorMessage?: string;
      filterV1?: unknown;
      packetsCaptured?: number;
      status?:
        | "unknown"
        | "success"
        | "pending"
        | "running"
        | "conversion_pending"
        | "conversion_running"
        | "complete"
        | "failed";
      stopRequested?: string;
      submitted?: string;
      system?: "magic-transit";
      timeLimit?: number;
      type?: "simple" | "full";
    };

export const CreatePcapResponse = Schema.Union([
  Schema.Struct({
    id: Schema.optional(Schema.String),
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
          sourceAddress: "source_address",
          sourcePort: "source_port",
        }),
      ),
    ),
    offsetTime: Schema.optional(Schema.String),
    status: Schema.optional(
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
    ),
    submitted: Schema.optional(Schema.String),
    system: Schema.optional(Schema.Literal("magic-transit")),
    timeLimit: Schema.optional(Schema.Number),
    type: Schema.optional(Schema.Literals(["simple", "full"])),
  }).pipe(
    Schema.encodeKeys({
      filterV1: "filter_v1",
      offsetTime: "offset_time",
      timeLimit: "time_limit",
    }),
  ),
  Schema.Struct({
    id: Schema.optional(Schema.String),
    byteLimit: Schema.optional(Schema.Number),
    coloName: Schema.optional(Schema.String),
    destinationConf: Schema.optional(Schema.String),
    errorMessage: Schema.optional(Schema.String),
    filterV1: Schema.optional(Schema.Unknown),
    packetsCaptured: Schema.optional(Schema.Number),
    status: Schema.optional(
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
    ),
    stopRequested: Schema.optional(Schema.String),
    submitted: Schema.optional(Schema.String),
    system: Schema.optional(Schema.Literal("magic-transit")),
    timeLimit: Schema.optional(Schema.Number),
    type: Schema.optional(Schema.Literals(["simple", "full"])),
  }).pipe(
    Schema.encodeKeys({
      byteLimit: "byte_limit",
      coloName: "colo_name",
      destinationConf: "destination_conf",
      errorMessage: "error_message",
      filterV1: "filter_v1",
      packetsCaptured: "packets_captured",
      stopRequested: "stop_requested",
      timeLimit: "time_limit",
    }),
  ),
]) as unknown as Schema.Schema<CreatePcapResponse>;

export const createPcap: (
  input: CreatePcapRequest,
) => Effect.Effect<
  CreatePcapResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePcapRequest,
  output: CreatePcapResponse,
  errors: [],
}));

export interface StopPcapRequest {
  pcapId: string;
  /** Identifier. */
  accountId: string;
}

export const StopPcapRequest = Schema.Struct({
  pcapId: Schema.String.pipe(T.HttpPath("pcapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/pcaps/{pcapId}/stop" }),
) as unknown as Schema.Schema<StopPcapRequest>;

export type StopPcapResponse = unknown;

export const StopPcapResponse =
  Schema.Unknown as unknown as Schema.Schema<StopPcapResponse>;

export const stopPcap: (
  input: StopPcapRequest,
) => Effect.Effect<
  StopPcapResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetPcapDownloadRequest = Schema.Struct({
  pcapId: Schema.String.pipe(T.HttpPath("pcapId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pcaps/{pcapId}/download",
  }),
) as unknown as Schema.Schema<GetPcapDownloadRequest>;

export type GetPcapDownloadResponse = unknown;

export const GetPcapDownloadResponse =
  Schema.Unknown as unknown as Schema.Schema<GetPcapDownloadResponse>;

export const getPcapDownload: (
  input: GetPcapDownloadRequest,
) => Effect.Effect<
  GetPcapDownloadResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetPcapOwnershipRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pcaps/ownership" }),
) as unknown as Schema.Schema<GetPcapOwnershipRequest>;

export type GetPcapOwnershipResponse = {
  id: string;
  destinationConf: string;
  filename: string;
  status: "pending" | "success" | "failed";
  submitted: string;
  validated?: string;
}[];

export const GetPcapOwnershipResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    destinationConf: Schema.String,
    filename: Schema.String,
    status: Schema.Literals(["pending", "success", "failed"]),
    submitted: Schema.String,
    validated: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ destinationConf: "destination_conf" })),
) as unknown as Schema.Schema<GetPcapOwnershipResponse>;

export const getPcapOwnership: (
  input: GetPcapOwnershipRequest,
) => Effect.Effect<
  GetPcapOwnershipResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPcapOwnershipRequest,
  output: GetPcapOwnershipResponse,
  errors: [],
}));

export interface CreatePcapOwnershipRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The full URI for the bucket. This field only applies to `full` packet captures. */
  destinationConf: string;
}

export const CreatePcapOwnershipRequest = Schema.Struct({
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
  validated?: string;
}

export const CreatePcapOwnershipResponse = Schema.Struct({
  id: Schema.String,
  destinationConf: Schema.String,
  filename: Schema.String,
  status: Schema.Literals(["pending", "success", "failed"]),
  submitted: Schema.String,
  validated: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ destinationConf: "destination_conf" }),
) as unknown as Schema.Schema<CreatePcapOwnershipResponse>;

export const createPcapOwnership: (
  input: CreatePcapOwnershipRequest,
) => Effect.Effect<
  CreatePcapOwnershipResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePcapOwnershipRequest,
  output: CreatePcapOwnershipResponse,
  errors: [],
}));

export interface DeletePcapOwnershipRequest {
  ownershipId: string;
  /** Identifier. */
  accountId: string;
}

export const DeletePcapOwnershipRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<DeletePcapOwnershipResponse>;

export const deletePcapOwnership: (
  input: DeletePcapOwnershipRequest,
) => Effect.Effect<
  DeletePcapOwnershipResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ValidatePcapOwnershipRequest = Schema.Struct({
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
  validated?: string;
}

export const ValidatePcapOwnershipResponse = Schema.Struct({
  id: Schema.String,
  destinationConf: Schema.String,
  filename: Schema.String,
  status: Schema.Literals(["pending", "success", "failed"]),
  submitted: Schema.String,
  validated: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ destinationConf: "destination_conf" }),
) as unknown as Schema.Schema<ValidatePcapOwnershipResponse>;

export const validatePcapOwnership: (
  input: ValidatePcapOwnershipRequest,
) => Effect.Effect<
  ValidatePcapOwnershipResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkPutCfInterconnectsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/cf_interconnects",
  }),
) as unknown as Schema.Schema<BulkPutCfInterconnectsRequest>;

export interface BulkPutCfInterconnectsResponse {
  modified?: boolean;
  modifiedInterconnects?: {
    id?: string;
    automaticReturnRouting?: boolean;
    coloName?: string;
    createdOn?: string;
    description?: string;
    gre?: { cloudflareEndpoint?: string };
    healthCheck?: unknown;
    interfaceAddress?: string;
    interfaceAddress6?: string;
    modifiedOn?: string;
    mtu?: number;
    name?: string;
  }[];
}

export const BulkPutCfInterconnectsResponse = Schema.Struct({
  modified: Schema.optional(Schema.Boolean),
  modifiedInterconnects: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        automaticReturnRouting: Schema.optional(Schema.Boolean),
        coloName: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        gre: Schema.optional(
          Schema.Struct({
            cloudflareEndpoint: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({ cloudflareEndpoint: "cloudflare_endpoint" }),
          ),
        ),
        healthCheck: Schema.optional(Schema.Unknown),
        interfaceAddress: Schema.optional(Schema.String),
        interfaceAddress6: Schema.optional(Schema.String),
        modifiedOn: Schema.optional(Schema.String),
        mtu: Schema.optional(Schema.Number),
        name: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          automaticReturnRouting: "automatic_return_routing",
          coloName: "colo_name",
          createdOn: "created_on",
          healthCheck: "health_check",
          interfaceAddress: "interface_address",
          interfaceAddress6: "interface_address6",
          modifiedOn: "modified_on",
        }),
      ),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ modifiedInterconnects: "modified_interconnects" }),
) as unknown as Schema.Schema<BulkPutCfInterconnectsResponse>;

export const bulkPutCfInterconnects: (
  input: BulkPutCfInterconnectsRequest,
) => Effect.Effect<
  BulkPutCfInterconnectsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkPutGreTunnelsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/magic/gre_tunnels" }),
) as unknown as Schema.Schema<BulkPutGreTunnelsRequest>;

export interface BulkPutGreTunnelsResponse {
  modified?: boolean;
  modifiedGreTunnels?: {
    id: string;
    cloudflareGreEndpoint: string;
    customerGreEndpoint: string;
    interfaceAddress: string;
    name: string;
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    mtu?: number;
    ttl?: number;
  }[];
}

export const BulkPutGreTunnelsResponse = Schema.Struct({
  modified: Schema.optional(Schema.Boolean),
  modifiedGreTunnels: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
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
        bgpStatus: Schema.optional(
          Schema.Struct({
            state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
            tcpEstablished: Schema.Boolean,
            updatedAt: Schema.String,
            bgpState: Schema.optional(Schema.String),
            cfSpeakerIp: Schema.optional(Schema.String),
            cfSpeakerPort: Schema.optional(Schema.Number),
            customerSpeakerIp: Schema.optional(Schema.String),
            customerSpeakerPort: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              tcpEstablished: "tcp_established",
              updatedAt: "updated_at",
              bgpState: "bgp_state",
              cfSpeakerIp: "cf_speaker_ip",
              cfSpeakerPort: "cf_speaker_port",
              customerSpeakerIp: "customer_speaker_ip",
              customerSpeakerPort: "customer_speaker_port",
            }),
          ),
        ),
        createdOn: Schema.optional(Schema.String),
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
        modifiedOn: Schema.optional(Schema.String),
        mtu: Schema.optional(Schema.Number),
        ttl: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          cloudflareGreEndpoint: "cloudflare_gre_endpoint",
          customerGreEndpoint: "customer_gre_endpoint",
          interfaceAddress: "interface_address",
          automaticReturnRouting: "automatic_return_routing",
          bgpStatus: "bgp_status",
          createdOn: "created_on",
          healthCheck: "health_check",
          interfaceAddress6: "interface_address6",
          modifiedOn: "modified_on",
        }),
      ),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ modifiedGreTunnels: "modified_gre_tunnels" }),
) as unknown as Schema.Schema<BulkPutGreTunnelsResponse>;

export const bulkPutGreTunnels: (
  input: BulkPutGreTunnelsRequest,
) => Effect.Effect<
  BulkPutGreTunnelsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkPutIpsecTunnelsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/magic/ipsec_tunnels" }),
) as unknown as Schema.Schema<BulkPutIpsecTunnelsRequest>;

export interface BulkPutIpsecTunnelsResponse {
  modified?: boolean;
  modifiedIpsecTunnels?: {
    id: string;
    cloudflareEndpoint: string;
    interfaceAddress: string;
    name: string;
    allowNullCipher?: boolean;
    automaticReturnRouting?: boolean;
    bgp?: { customerAsn: number; extraPrefixes?: string[]; md5Key?: string };
    bgpStatus?: {
      state: "BGP_DOWN" | "BGP_UP" | "BGP_ESTABLISHING";
      tcpEstablished: boolean;
      updatedAt: string;
      bgpState?: string;
      cfSpeakerIp?: string;
      cfSpeakerPort?: number;
      customerSpeakerIp?: string;
      customerSpeakerPort?: number;
    };
    createdOn?: string;
    customRemoteIdentities?: { fqdnId?: string };
    customerEndpoint?: string;
    description?: string;
    healthCheck?: {
      direction?: "unidirectional" | "bidirectional";
      enabled?: boolean;
      rate?: "low" | "mid" | "high";
      target?: { saved?: string } | string;
      type?: "reply" | "request";
    };
    interfaceAddress6?: string;
    modifiedOn?: string;
    pskMetadata?: unknown;
    replayProtection?: boolean;
  }[];
}

export const BulkPutIpsecTunnelsResponse = Schema.Struct({
  modified: Schema.optional(Schema.Boolean),
  modifiedIpsecTunnels: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        cloudflareEndpoint: Schema.String,
        interfaceAddress: Schema.String,
        name: Schema.String,
        allowNullCipher: Schema.optional(Schema.Boolean),
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
        bgpStatus: Schema.optional(
          Schema.Struct({
            state: Schema.Literals(["BGP_DOWN", "BGP_UP", "BGP_ESTABLISHING"]),
            tcpEstablished: Schema.Boolean,
            updatedAt: Schema.String,
            bgpState: Schema.optional(Schema.String),
            cfSpeakerIp: Schema.optional(Schema.String),
            cfSpeakerPort: Schema.optional(Schema.Number),
            customerSpeakerIp: Schema.optional(Schema.String),
            customerSpeakerPort: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              tcpEstablished: "tcp_established",
              updatedAt: "updated_at",
              bgpState: "bgp_state",
              cfSpeakerIp: "cf_speaker_ip",
              cfSpeakerPort: "cf_speaker_port",
              customerSpeakerIp: "customer_speaker_ip",
              customerSpeakerPort: "customer_speaker_port",
            }),
          ),
        ),
        createdOn: Schema.optional(Schema.String),
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
        modifiedOn: Schema.optional(Schema.String),
        pskMetadata: Schema.optional(Schema.Unknown),
        replayProtection: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          cloudflareEndpoint: "cloudflare_endpoint",
          interfaceAddress: "interface_address",
          allowNullCipher: "allow_null_cipher",
          automaticReturnRouting: "automatic_return_routing",
          bgpStatus: "bgp_status",
          createdOn: "created_on",
          customRemoteIdentities: "custom_remote_identities",
          customerEndpoint: "customer_endpoint",
          healthCheck: "health_check",
          interfaceAddress6: "interface_address6",
          modifiedOn: "modified_on",
          pskMetadata: "psk_metadata",
          replayProtection: "replay_protection",
        }),
      ),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ modifiedIpsecTunnels: "modified_ipsec_tunnels" }),
) as unknown as Schema.Schema<BulkPutIpsecTunnelsResponse>;

export const bulkPutIpsecTunnels: (
  input: BulkPutIpsecTunnelsRequest,
) => Effect.Effect<
  BulkPutIpsecTunnelsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const BulkPutRoutesRequest = Schema.Struct({
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
  modified?: boolean;
  modifiedRoutes?: {
    id: string;
    nexthop: string;
    prefix: string;
    priority: number;
    createdOn?: string;
    description?: string;
    modifiedOn?: string;
    scope?: unknown;
    weight?: number;
  }[];
}

export const BulkPutRoutesResponse = Schema.Struct({
  modified: Schema.optional(Schema.Boolean),
  modifiedRoutes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        nexthop: Schema.String,
        prefix: Schema.String,
        priority: Schema.Number,
        createdOn: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        modifiedOn: Schema.optional(Schema.String),
        scope: Schema.optional(Schema.Unknown),
        weight: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          createdOn: "created_on",
          modifiedOn: "modified_on",
        }),
      ),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ modifiedRoutes: "modified_routes" }),
) as unknown as Schema.Schema<BulkPutRoutesResponse>;

export const bulkPutRoutes: (
  input: BulkPutRoutesRequest,
) => Effect.Effect<
  BulkPutRoutesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetRouteRequest = Schema.Struct({
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
    createdOn?: string;
    description?: string;
    modifiedOn?: string;
    scope?: unknown;
    weight?: number;
  };
}

export const GetRouteResponse = Schema.Struct({
  route: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      nexthop: Schema.String,
      prefix: Schema.String,
      priority: Schema.Number,
      createdOn: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      modifiedOn: Schema.optional(Schema.String),
      scope: Schema.optional(Schema.Unknown),
      weight: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ createdOn: "created_on", modifiedOn: "modified_on" }),
    ),
  ),
}) as unknown as Schema.Schema<GetRouteResponse>;

export const getRoute: (
  input: GetRouteRequest,
) => Effect.Effect<
  GetRouteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRouteRequest,
  output: GetRouteResponse,
  errors: [],
}));

export interface ListRoutesRequest {
  /** Identifier */
  accountId: string;
}

export const ListRoutesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/routes" }),
) as unknown as Schema.Schema<ListRoutesRequest>;

export interface ListRoutesResponse {
  routes?: {
    id: string;
    nexthop: string;
    prefix: string;
    priority: number;
    createdOn?: string;
    description?: string;
    modifiedOn?: string;
    scope?: unknown;
    weight?: number;
  }[];
}

export const ListRoutesResponse = Schema.Struct({
  routes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        nexthop: Schema.String,
        prefix: Schema.String,
        priority: Schema.Number,
        createdOn: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        modifiedOn: Schema.optional(Schema.String),
        scope: Schema.optional(Schema.Unknown),
        weight: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          createdOn: "created_on",
          modifiedOn: "modified_on",
        }),
      ),
    ),
  ),
}) as unknown as Schema.Schema<ListRoutesResponse>;

export const listRoutes: (
  input: ListRoutesRequest,
) => Effect.Effect<
  ListRoutesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreateRouteRequest = Schema.Struct({
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
  createdOn?: string;
  /** An optional human provided description of the static route. */
  description?: string;
  /** When the route was last modified. */
  modifiedOn?: string;
  /** Used only for ECMP routes. */
  scope?: { coloNames?: string[]; coloRegions?: string[] };
  /** Optional weight of the ECMP scope - if provided. */
  weight?: number;
}

export const CreateRouteResponse = Schema.Struct({
  id: Schema.String,
  nexthop: Schema.String,
  prefix: Schema.String,
  priority: Schema.Number,
  createdOn: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
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
  Schema.encodeKeys({ createdOn: "created_on", modifiedOn: "modified_on" }),
) as unknown as Schema.Schema<CreateRouteResponse>;

export const createRoute: (
  input: CreateRouteRequest,
) => Effect.Effect<
  CreateRouteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateRouteRequest = Schema.Struct({
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
  modified?: boolean;
  modifiedRoute?: {
    id: string;
    nexthop: string;
    prefix: string;
    priority: number;
    createdOn?: string;
    description?: string;
    modifiedOn?: string;
    scope?: unknown;
    weight?: number;
  };
}

export const UpdateRouteResponse = Schema.Struct({
  modified: Schema.optional(Schema.Boolean),
  modifiedRoute: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      nexthop: Schema.String,
      prefix: Schema.String,
      priority: Schema.Number,
      createdOn: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      modifiedOn: Schema.optional(Schema.String),
      scope: Schema.optional(Schema.Unknown),
      weight: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ createdOn: "created_on", modifiedOn: "modified_on" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ modifiedRoute: "modified_route" }),
) as unknown as Schema.Schema<UpdateRouteResponse>;

export const updateRoute: (
  input: UpdateRouteRequest,
) => Effect.Effect<
  UpdateRouteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateRouteRequest,
  output: UpdateRouteResponse,
  errors: [],
}));

export interface DeleteRouteRequest {
  routeId: string;
  /** Identifier */
  accountId: string;
}

export const DeleteRouteRequest = Schema.Struct({
  routeId: Schema.String.pipe(T.HttpPath("routeId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/routes/{routeId}",
  }),
) as unknown as Schema.Schema<DeleteRouteRequest>;

export interface DeleteRouteResponse {
  deleted?: boolean;
  deletedRoute?: {
    id: string;
    nexthop: string;
    prefix: string;
    priority: number;
    createdOn?: string;
    description?: string;
    modifiedOn?: string;
    scope?: unknown;
    weight?: number;
  };
}

export const DeleteRouteResponse = Schema.Struct({
  deleted: Schema.optional(Schema.Boolean),
  deletedRoute: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      nexthop: Schema.String,
      prefix: Schema.String,
      priority: Schema.Number,
      createdOn: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      modifiedOn: Schema.optional(Schema.String),
      scope: Schema.optional(Schema.Unknown),
      weight: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ createdOn: "created_on", modifiedOn: "modified_on" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ deletedRoute: "deleted_route" }),
) as unknown as Schema.Schema<DeleteRouteResponse>;

export const deleteRoute: (
  input: DeleteRouteRequest,
) => Effect.Effect<
  DeleteRouteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteRouteRequest,
  output: DeleteRouteResponse,
  errors: [],
}));

export interface EmptyRouteRequest {
  /** Identifier */
  accountId: string;
}

export const EmptyRouteRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/magic/routes" }),
) as unknown as Schema.Schema<EmptyRouteRequest>;

export interface EmptyRouteResponse {
  deleted?: boolean;
  deletedRoutes?: {
    id: string;
    nexthop: string;
    prefix: string;
    priority: number;
    createdOn?: string;
    description?: string;
    modifiedOn?: string;
    scope?: unknown;
    weight?: number;
  }[];
}

export const EmptyRouteResponse = Schema.Struct({
  deleted: Schema.optional(Schema.Boolean),
  deletedRoutes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        nexthop: Schema.String,
        prefix: Schema.String,
        priority: Schema.Number,
        createdOn: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        modifiedOn: Schema.optional(Schema.String),
        scope: Schema.optional(Schema.Unknown),
        weight: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          createdOn: "created_on",
          modifiedOn: "modified_on",
        }),
      ),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ deletedRoutes: "deleted_routes" }),
) as unknown as Schema.Schema<EmptyRouteResponse>;

export const emptyRoute: (
  input: EmptyRouteRequest,
) => Effect.Effect<
  EmptyRouteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetSiteRequest = Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  xMagicNewHcTarget: Schema.optional(Schema.Boolean).pipe(
    T.HttpHeader("'x-magic-new-hc-target'"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}",
  }),
) as unknown as Schema.Schema<GetSiteRequest>;

export interface GetSiteResponse {
  /** Identifier */
  id?: string;
  /** Magic Connector identifier tag. */
  connectorId?: string;
  description?: string;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string; lon?: string };
  /** The name of the site. */
  name?: string;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string;
}

export const GetSiteResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  connectorId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  haMode: Schema.optional(Schema.Boolean),
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
    haMode: "ha_mode",
    secondaryConnectorId: "secondary_connector_id",
  }),
) as unknown as Schema.Schema<GetSiteResponse>;

export const getSite: (
  input: GetSiteRequest,
) => Effect.Effect<
  GetSiteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListSitesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  connectorid: Schema.optional(Schema.String).pipe(T.HttpQuery("connectorid")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/sites" }),
) as unknown as Schema.Schema<ListSitesRequest>;

export type ListSitesResponse = {
  id?: string;
  connectorId?: string;
  description?: string;
  haMode?: boolean;
  location?: { lat?: string; lon?: string };
  name?: string;
  secondaryConnectorId?: string;
}[];

export const ListSitesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    connectorId: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    haMode: Schema.optional(Schema.Boolean),
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
      haMode: "ha_mode",
      secondaryConnectorId: "secondary_connector_id",
    }),
  ),
) as unknown as Schema.Schema<ListSitesResponse>;

export const listSites: (
  input: ListSitesRequest,
) => Effect.Effect<
  ListSitesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSitesRequest,
  output: ListSitesResponse,
  errors: [],
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

export const CreateSiteRequest = Schema.Struct({
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
    connectorId: "connector_id",
    haMode: "ha_mode",
    secondaryConnectorId: "secondary_connector_id",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/magic/sites" }),
) as unknown as Schema.Schema<CreateSiteRequest>;

export interface CreateSiteResponse {
  /** Identifier */
  id?: string;
  /** Magic Connector identifier tag. */
  connectorId?: string;
  description?: string;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string; lon?: string };
  /** The name of the site. */
  name?: string;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string;
}

export const CreateSiteResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  connectorId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  haMode: Schema.optional(Schema.Boolean),
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
    haMode: "ha_mode",
    secondaryConnectorId: "secondary_connector_id",
  }),
) as unknown as Schema.Schema<CreateSiteResponse>;

export const createSite: (
  input: CreateSiteRequest,
) => Effect.Effect<
  CreateSiteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateSiteRequest = Schema.Struct({
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
    secondaryConnectorId: "secondary_connector_id",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/sites/{siteId}",
  }),
) as unknown as Schema.Schema<UpdateSiteRequest>;

export interface UpdateSiteResponse {
  /** Identifier */
  id?: string;
  /** Magic Connector identifier tag. */
  connectorId?: string;
  description?: string;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string; lon?: string };
  /** The name of the site. */
  name?: string;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string;
}

export const UpdateSiteResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  connectorId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  haMode: Schema.optional(Schema.Boolean),
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
    haMode: "ha_mode",
    secondaryConnectorId: "secondary_connector_id",
  }),
) as unknown as Schema.Schema<UpdateSiteResponse>;

export const updateSite: (
  input: UpdateSiteRequest,
) => Effect.Effect<
  UpdateSiteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PatchSiteRequest = Schema.Struct({
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
    secondaryConnectorId: "secondary_connector_id",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/sites/{siteId}",
  }),
) as unknown as Schema.Schema<PatchSiteRequest>;

export interface PatchSiteResponse {
  /** Identifier */
  id?: string;
  /** Magic Connector identifier tag. */
  connectorId?: string;
  description?: string;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string; lon?: string };
  /** The name of the site. */
  name?: string;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string;
}

export const PatchSiteResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  connectorId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  haMode: Schema.optional(Schema.Boolean),
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
    haMode: "ha_mode",
    secondaryConnectorId: "secondary_connector_id",
  }),
) as unknown as Schema.Schema<PatchSiteResponse>;

export const patchSite: (
  input: PatchSiteRequest,
) => Effect.Effect<
  PatchSiteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSiteRequest,
  output: PatchSiteResponse,
  errors: [],
}));

export interface DeleteSiteRequest {
  siteId: string;
  /** Identifier */
  accountId: string;
}

export const DeleteSiteRequest = Schema.Struct({
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
  id?: string;
  /** Magic Connector identifier tag. */
  connectorId?: string;
  description?: string;
  /** Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode. */
  haMode?: boolean;
  /** Location of site in latitude and longitude. */
  location?: { lat?: string; lon?: string };
  /** The name of the site. */
  name?: string;
  /** Magic Connector identifier tag. Used when high availability mode is on. */
  secondaryConnectorId?: string;
}

export const DeleteSiteResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  connectorId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  haMode: Schema.optional(Schema.Boolean),
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
    haMode: "ha_mode",
    secondaryConnectorId: "secondary_connector_id",
  }),
) as unknown as Schema.Schema<DeleteSiteResponse>;

export const deleteSite: (
  input: DeleteSiteRequest,
) => Effect.Effect<
  DeleteSiteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetSiteAclRequest = Schema.Struct({
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
  id?: string;
  /** Description for the ACL. */
  description?: string;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean;
  lan_1?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  lan_2?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** The name of the ACL. */
  name?: string;
  protocols?: ("tcp" | "udp" | "icmp")[];
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean;
}

export const GetSiteAclResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
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
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ forwardLocally: "forward_locally" }),
) as unknown as Schema.Schema<GetSiteAclResponse>;

export const getSiteAcl: (
  input: GetSiteAclRequest,
) => Effect.Effect<
  GetSiteAclResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSiteAclRequest,
  output: GetSiteAclResponse,
  errors: [],
}));

export interface ListSiteAclsRequest {
  siteId: string;
  /** Identifier */
  accountId: string;
}

export const ListSiteAclsRequest = Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls",
  }),
) as unknown as Schema.Schema<ListSiteAclsRequest>;

export type ListSiteAclsResponse = {
  id?: string;
  description?: string;
  forwardLocally?: boolean;
  lan_1?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  lan_2?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  name?: string;
  protocols?: ("tcp" | "udp" | "icmp")[];
  unidirectional?: boolean;
}[];

export const ListSiteAclsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
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
        }),
      ),
    ),
    name: Schema.optional(Schema.String),
    protocols: Schema.optional(
      Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
    ),
    unidirectional: Schema.optional(Schema.Boolean),
  }).pipe(Schema.encodeKeys({ forwardLocally: "forward_locally" })),
) as unknown as Schema.Schema<ListSiteAclsResponse>;

export const listSiteAcls: (
  input: ListSiteAclsRequest,
) => Effect.Effect<
  ListSiteAclsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSiteAclsRequest,
  output: ListSiteAclsResponse,
  errors: [],
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

export const CreateSiteAclRequest = Schema.Struct({
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
  Schema.encodeKeys({ forwardLocally: "forward_locally" }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls",
  }),
) as unknown as Schema.Schema<CreateSiteAclRequest>;

export interface CreateSiteAclResponse {
  /** Identifier */
  id?: string;
  /** Description for the ACL. */
  description?: string;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean;
  lan_1?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  lan_2?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** The name of the ACL. */
  name?: string;
  protocols?: ("tcp" | "udp" | "icmp")[];
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean;
}

export const CreateSiteAclResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
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
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ forwardLocally: "forward_locally" }),
) as unknown as Schema.Schema<CreateSiteAclResponse>;

export const createSiteAcl: (
  input: CreateSiteAclRequest,
) => Effect.Effect<
  CreateSiteAclResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateSiteAclRequest = Schema.Struct({
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
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ forwardLocally: "forward_locally" }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls/{aclId}",
  }),
) as unknown as Schema.Schema<UpdateSiteAclRequest>;

export interface UpdateSiteAclResponse {
  /** Identifier */
  id?: string;
  /** Description for the ACL. */
  description?: string;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean;
  lan_1?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  lan_2?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** The name of the ACL. */
  name?: string;
  protocols?: ("tcp" | "udp" | "icmp")[];
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean;
}

export const UpdateSiteAclResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
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
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ forwardLocally: "forward_locally" }),
) as unknown as Schema.Schema<UpdateSiteAclResponse>;

export const updateSiteAcl: (
  input: UpdateSiteAclRequest,
) => Effect.Effect<
  UpdateSiteAclResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PatchSiteAclRequest = Schema.Struct({
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
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ forwardLocally: "forward_locally" }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/sites/{siteId}/acls/{aclId}",
  }),
) as unknown as Schema.Schema<PatchSiteAclRequest>;

export interface PatchSiteAclResponse {
  /** Identifier */
  id?: string;
  /** Description for the ACL. */
  description?: string;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean;
  lan_1?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  lan_2?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** The name of the ACL. */
  name?: string;
  protocols?: ("tcp" | "udp" | "icmp")[];
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean;
}

export const PatchSiteAclResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
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
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ forwardLocally: "forward_locally" }),
) as unknown as Schema.Schema<PatchSiteAclResponse>;

export const patchSiteAcl: (
  input: PatchSiteAclRequest,
) => Effect.Effect<
  PatchSiteAclResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DeleteSiteAclRequest = Schema.Struct({
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
  id?: string;
  /** Description for the ACL. */
  description?: string;
  /** The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. I */
  forwardLocally?: boolean;
  lan_1?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  lan_2?: {
    lanId: string;
    lanName?: string;
    portRanges?: string[];
    ports?: number[];
    subnets?: string[];
  };
  /** The name of the ACL. */
  name?: string;
  protocols?: ("tcp" | "udp" | "icmp")[];
  /** The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not include */
  unidirectional?: boolean;
}

export const DeleteSiteAclResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
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
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  protocols: Schema.optional(
    Schema.Array(Schema.Literals(["tcp", "udp", "icmp"])),
  ),
  unidirectional: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ forwardLocally: "forward_locally" }),
) as unknown as Schema.Schema<DeleteSiteAclResponse>;

export const deleteSiteAcl: (
  input: DeleteSiteAclRequest,
) => Effect.Effect<
  DeleteSiteAclResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetSiteLanRequest = Schema.Struct({
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
  id?: string;
  /** mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link. */
  haLink?: boolean;
  name?: string;
  nat?: { staticPrefix?: string };
  physport?: number;
  routedSubnets?: {
    nextHop: string;
    prefix: string;
    nat?: { staticPrefix?: string };
  }[];
  /** Identifier */
  siteId?: string;
  /** If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary a */
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
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const GetSiteLanResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  haLink: Schema.optional(Schema.Boolean),
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
      }).pipe(Schema.encodeKeys({ nextHop: "next_hop" })),
    ),
  ),
  siteId: Schema.optional(Schema.String),
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
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
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
    haLink: "ha_link",
    routedSubnets: "routed_subnets",
    siteId: "site_id",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
) as unknown as Schema.Schema<GetSiteLanResponse>;

export const getSiteLan: (
  input: GetSiteLanRequest,
) => Effect.Effect<
  GetSiteLanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSiteLanRequest,
  output: GetSiteLanResponse,
  errors: [],
}));

export interface ListSiteLansRequest {
  siteId: string;
  /** Identifier */
  accountId: string;
}

export const ListSiteLansRequest = Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/lans",
  }),
) as unknown as Schema.Schema<ListSiteLansRequest>;

export type ListSiteLansResponse = {
  id?: string;
  haLink?: boolean;
  name?: string;
  nat?: { staticPrefix?: string };
  physport?: number;
  routedSubnets?: {
    nextHop: string;
    prefix: string;
    nat?: { staticPrefix?: string };
  }[];
  siteId?: string;
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
  vlanTag?: number;
}[];

export const ListSiteLansResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    haLink: Schema.optional(Schema.Boolean),
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
        }).pipe(Schema.encodeKeys({ nextHop: "next_hop" })),
      ),
    ),
    siteId: Schema.optional(Schema.String),
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
            }),
          ),
        ),
        secondaryAddress: Schema.optional(Schema.String),
        virtualAddress: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
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
      haLink: "ha_link",
      routedSubnets: "routed_subnets",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  ),
) as unknown as Schema.Schema<ListSiteLansResponse>;

export const listSiteLans: (
  input: ListSiteLansRequest,
) => Effect.Effect<
  ListSiteLansResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSiteLansRequest,
  output: ListSiteLansResponse,
  errors: [],
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

export const CreateSiteLanRequest = Schema.Struct({
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
      }).pipe(Schema.encodeKeys({ nextHop: "next_hop" })),
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
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
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
    haLink: "ha_link",
    routedSubnets: "routed_subnets",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/lans",
  }),
) as unknown as Schema.Schema<CreateSiteLanRequest>;

export type CreateSiteLanResponse = {
  id?: string;
  haLink?: boolean;
  name?: string;
  nat?: { staticPrefix?: string };
  physport?: number;
  routedSubnets?: {
    nextHop: string;
    prefix: string;
    nat?: { staticPrefix?: string };
  }[];
  siteId?: string;
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
  vlanTag?: number;
}[];

export const CreateSiteLanResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    haLink: Schema.optional(Schema.Boolean),
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
        }).pipe(Schema.encodeKeys({ nextHop: "next_hop" })),
      ),
    ),
    siteId: Schema.optional(Schema.String),
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
            }),
          ),
        ),
        secondaryAddress: Schema.optional(Schema.String),
        virtualAddress: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
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
      haLink: "ha_link",
      routedSubnets: "routed_subnets",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  ),
) as unknown as Schema.Schema<CreateSiteLanResponse>;

export const createSiteLan: (
  input: CreateSiteLanRequest,
) => Effect.Effect<
  CreateSiteLanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSiteLanRequest,
  output: CreateSiteLanResponse,
  errors: [],
}));

export interface PutSiteLanRequest {
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

export const PutSiteLanRequest = Schema.Struct({
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
      }).pipe(Schema.encodeKeys({ nextHop: "next_hop" })),
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
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
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
    routedSubnets: "routed_subnets",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/sites/{siteId}/lans/{lanId}",
  }),
) as unknown as Schema.Schema<PutSiteLanRequest>;

export interface PutSiteLanResponse {
  /** Identifier */
  id?: string;
  /** mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link. */
  haLink?: boolean;
  name?: string;
  nat?: { staticPrefix?: string };
  physport?: number;
  routedSubnets?: {
    nextHop: string;
    prefix: string;
    nat?: { staticPrefix?: string };
  }[];
  /** Identifier */
  siteId?: string;
  /** If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary a */
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
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const PutSiteLanResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  haLink: Schema.optional(Schema.Boolean),
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
      }).pipe(Schema.encodeKeys({ nextHop: "next_hop" })),
    ),
  ),
  siteId: Schema.optional(Schema.String),
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
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
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
    haLink: "ha_link",
    routedSubnets: "routed_subnets",
    siteId: "site_id",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
) as unknown as Schema.Schema<PutSiteLanResponse>;

export const putSiteLan: (
  input: PutSiteLanRequest,
) => Effect.Effect<
  PutSiteLanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSiteLanRequest,
  output: PutSiteLanResponse,
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

export const PatchSiteLanRequest = Schema.Struct({
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
      }).pipe(Schema.encodeKeys({ nextHop: "next_hop" })),
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
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
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
  id?: string;
  /** mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link. */
  haLink?: boolean;
  name?: string;
  nat?: { staticPrefix?: string };
  physport?: number;
  routedSubnets?: {
    nextHop: string;
    prefix: string;
    nat?: { staticPrefix?: string };
  }[];
  /** Identifier */
  siteId?: string;
  /** If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary a */
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
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const PatchSiteLanResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  haLink: Schema.optional(Schema.Boolean),
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
      }).pipe(Schema.encodeKeys({ nextHop: "next_hop" })),
    ),
  ),
  siteId: Schema.optional(Schema.String),
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
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
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
    haLink: "ha_link",
    routedSubnets: "routed_subnets",
    siteId: "site_id",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
) as unknown as Schema.Schema<PatchSiteLanResponse>;

export const patchSiteLan: (
  input: PatchSiteLanRequest,
) => Effect.Effect<
  PatchSiteLanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DeleteSiteLanRequest = Schema.Struct({
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
  id?: string;
  /** mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link. */
  haLink?: boolean;
  name?: string;
  nat?: { staticPrefix?: string };
  physport?: number;
  routedSubnets?: {
    nextHop: string;
    prefix: string;
    nat?: { staticPrefix?: string };
  }[];
  /** Identifier */
  siteId?: string;
  /** If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary a */
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
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const DeleteSiteLanResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  haLink: Schema.optional(Schema.Boolean),
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
      }).pipe(Schema.encodeKeys({ nextHop: "next_hop" })),
    ),
  ),
  siteId: Schema.optional(Schema.String),
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
          }),
        ),
      ),
      secondaryAddress: Schema.optional(Schema.String),
      virtualAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
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
    haLink: "ha_link",
    routedSubnets: "routed_subnets",
    siteId: "site_id",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
) as unknown as Schema.Schema<DeleteSiteLanResponse>;

export const deleteSiteLan: (
  input: DeleteSiteLanRequest,
) => Effect.Effect<
  DeleteSiteLanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetSiteWanRequest = Schema.Struct({
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
  id?: string;
  /** Magic WAN health check rate for tunnels created on this link. The default value is `mid`. */
  healthCheckRate?: "low" | "mid" | "high";
  name?: string;
  physport?: number;
  /** Priority of WAN for traffic loadbalancing. */
  priority?: number;
  /** Identifier */
  siteId?: string;
  /** (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string;
  };
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const GetSiteWanResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  healthCheckRate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
  name: Schema.optional(Schema.String),
  physport: Schema.optional(Schema.Number),
  priority: Schema.optional(Schema.Number),
  siteId: Schema.optional(Schema.String),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      gatewayAddress: Schema.String,
      secondaryAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    healthCheckRate: "health_check_rate",
    siteId: "site_id",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
) as unknown as Schema.Schema<GetSiteWanResponse>;

export const getSiteWan: (
  input: GetSiteWanRequest,
) => Effect.Effect<
  GetSiteWanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSiteWanRequest,
  output: GetSiteWanResponse,
  errors: [],
}));

export interface ListSiteWansRequest {
  siteId: string;
  /** Identifier */
  accountId: string;
}

export const ListSiteWansRequest = Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/wans",
  }),
) as unknown as Schema.Schema<ListSiteWansRequest>;

export type ListSiteWansResponse = {
  id?: string;
  healthCheckRate?: "low" | "mid" | "high";
  name?: string;
  physport?: number;
  priority?: number;
  siteId?: string;
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string;
  };
  vlanTag?: number;
}[];

export const ListSiteWansResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    healthCheckRate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
    name: Schema.optional(Schema.String),
    physport: Schema.optional(Schema.Number),
    priority: Schema.optional(Schema.Number),
    siteId: Schema.optional(Schema.String),
    staticAddressing: Schema.optional(
      Schema.Struct({
        address: Schema.String,
        gatewayAddress: Schema.String,
        secondaryAddress: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          gatewayAddress: "gateway_address",
          secondaryAddress: "secondary_address",
        }),
      ),
    ),
    vlanTag: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      healthCheckRate: "health_check_rate",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  ),
) as unknown as Schema.Schema<ListSiteWansResponse>;

export const listSiteWans: (
  input: ListSiteWansRequest,
) => Effect.Effect<
  ListSiteWansResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSiteWansRequest,
  output: ListSiteWansResponse,
  errors: [],
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

export const CreateSiteWanRequest = Schema.Struct({
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
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/sites/{siteId}/wans",
  }),
) as unknown as Schema.Schema<CreateSiteWanRequest>;

export type CreateSiteWanResponse = {
  id?: string;
  healthCheckRate?: "low" | "mid" | "high";
  name?: string;
  physport?: number;
  priority?: number;
  siteId?: string;
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string;
  };
  vlanTag?: number;
}[];

export const CreateSiteWanResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    healthCheckRate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
    name: Schema.optional(Schema.String),
    physport: Schema.optional(Schema.Number),
    priority: Schema.optional(Schema.Number),
    siteId: Schema.optional(Schema.String),
    staticAddressing: Schema.optional(
      Schema.Struct({
        address: Schema.String,
        gatewayAddress: Schema.String,
        secondaryAddress: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          gatewayAddress: "gateway_address",
          secondaryAddress: "secondary_address",
        }),
      ),
    ),
    vlanTag: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      healthCheckRate: "health_check_rate",
      siteId: "site_id",
      staticAddressing: "static_addressing",
      vlanTag: "vlan_tag",
    }),
  ),
) as unknown as Schema.Schema<CreateSiteWanResponse>;

export const createSiteWan: (
  input: CreateSiteWanRequest,
) => Effect.Effect<
  CreateSiteWanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSiteWanRequest,
  output: CreateSiteWanResponse,
  errors: [],
}));

export interface PutSiteWanRequest {
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

export const PutSiteWanRequest = Schema.Struct({
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
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/sites/{siteId}/wans/{wanId}",
  }),
) as unknown as Schema.Schema<PutSiteWanRequest>;

export interface PutSiteWanResponse {
  /** Identifier */
  id?: string;
  /** Magic WAN health check rate for tunnels created on this link. The default value is `mid`. */
  healthCheckRate?: "low" | "mid" | "high";
  name?: string;
  physport?: number;
  /** Priority of WAN for traffic loadbalancing. */
  priority?: number;
  /** Identifier */
  siteId?: string;
  /** (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string;
  };
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const PutSiteWanResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  healthCheckRate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
  name: Schema.optional(Schema.String),
  physport: Schema.optional(Schema.Number),
  priority: Schema.optional(Schema.Number),
  siteId: Schema.optional(Schema.String),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      gatewayAddress: Schema.String,
      secondaryAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    healthCheckRate: "health_check_rate",
    siteId: "site_id",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
) as unknown as Schema.Schema<PutSiteWanResponse>;

export const putSiteWan: (
  input: PutSiteWanRequest,
) => Effect.Effect<
  PutSiteWanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSiteWanRequest,
  output: PutSiteWanResponse,
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

export const PatchSiteWanRequest = Schema.Struct({
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
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
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
  id?: string;
  /** Magic WAN health check rate for tunnels created on this link. The default value is `mid`. */
  healthCheckRate?: "low" | "mid" | "high";
  name?: string;
  physport?: number;
  /** Priority of WAN for traffic loadbalancing. */
  priority?: number;
  /** Identifier */
  siteId?: string;
  /** (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string;
  };
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const PatchSiteWanResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  healthCheckRate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
  name: Schema.optional(Schema.String),
  physport: Schema.optional(Schema.Number),
  priority: Schema.optional(Schema.Number),
  siteId: Schema.optional(Schema.String),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      gatewayAddress: Schema.String,
      secondaryAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    healthCheckRate: "health_check_rate",
    siteId: "site_id",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
) as unknown as Schema.Schema<PatchSiteWanResponse>;

export const patchSiteWan: (
  input: PatchSiteWanRequest,
) => Effect.Effect<
  PatchSiteWanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DeleteSiteWanRequest = Schema.Struct({
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
  id?: string;
  /** Magic WAN health check rate for tunnels created on this link. The default value is `mid`. */
  healthCheckRate?: "low" | "mid" | "high";
  name?: string;
  physport?: number;
  /** Priority of WAN for traffic loadbalancing. */
  priority?: number;
  /** Identifier */
  siteId?: string;
  /** (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode. */
  staticAddressing?: {
    address: string;
    gatewayAddress: string;
    secondaryAddress?: string;
  };
  /** VLAN ID. Use zero for untagged. */
  vlanTag?: number;
}

export const DeleteSiteWanResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  healthCheckRate: Schema.optional(Schema.Literals(["low", "mid", "high"])),
  name: Schema.optional(Schema.String),
  physport: Schema.optional(Schema.Number),
  priority: Schema.optional(Schema.Number),
  siteId: Schema.optional(Schema.String),
  staticAddressing: Schema.optional(
    Schema.Struct({
      address: Schema.String,
      gatewayAddress: Schema.String,
      secondaryAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        gatewayAddress: "gateway_address",
        secondaryAddress: "secondary_address",
      }),
    ),
  ),
  vlanTag: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    healthCheckRate: "health_check_rate",
    siteId: "site_id",
    staticAddressing: "static_addressing",
    vlanTag: "vlan_tag",
  }),
) as unknown as Schema.Schema<DeleteSiteWanResponse>;

export const deleteSiteWan: (
  input: DeleteSiteWanRequest,
) => Effect.Effect<
  DeleteSiteWanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSiteWanRequest,
  output: DeleteSiteWanResponse,
  errors: [],
}));
