/**
 * Cloudflare SPECTRUM API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service spectrum
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
// AnalyticAggregateCurrent
// =============================================================================

export interface GetAnalyticAggregateCurrentRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Comma-delimited list of Spectrum Application Id(s). If provided, the response will be limited to Spectrum Application Id(s) that match. */
  appID?: string;
  /** Query param: Co-location identifier. */
  coloName?: string;
}

export const GetAnalyticAggregateCurrentRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  appID: Schema.optional(Schema.String).pipe(T.HttpQuery("appID")),
  coloName: Schema.optional(Schema.String).pipe(T.HttpQuery("colo_name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/spectrum/analytics/aggregate/current",
  }),
) as unknown as Schema.Schema<GetAnalyticAggregateCurrentRequest>;

export type GetAnalyticAggregateCurrentResponse = {
  appID: string;
  bytesEgress: number;
  bytesIngress: number;
  connections: number;
  durationAvg: number;
}[];

export const GetAnalyticAggregateCurrentResponse = Schema.Array(
  Schema.Struct({
    appID: Schema.String,
    bytesEgress: Schema.Number,
    bytesIngress: Schema.Number,
    connections: Schema.Number,
    durationAvg: Schema.Number,
  }),
) as unknown as Schema.Schema<GetAnalyticAggregateCurrentResponse>;

export const getAnalyticAggregateCurrent: API.OperationMethod<
  GetAnalyticAggregateCurrentRequest,
  GetAnalyticAggregateCurrentResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAnalyticAggregateCurrentRequest,
  output: GetAnalyticAggregateCurrentResponse,
  errors: [],
}));

// =============================================================================
// AnalyticEventBytime
// =============================================================================

export interface GetAnalyticEventBytimeRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Used to select time series resolution. */
  timeDelta:
    | "year"
    | "quarter"
    | "month"
    | "week"
    | "day"
    | "hour"
    | "dekaminute"
    | "minute";
  /** Query param: Can be used to break down the data by given attributes. Options are:  | Dimension | Name                          | Example                                                    | | -------- */
  dimensions?: ("event" | "appID" | "coloName" | "ipVersion")[];
  /** Query param: Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined usin */
  filters?: string;
  /** Query param: One or more metrics to compute. Options are:  | Metric         | Name                                | Example | Unit                  | | -------------- | ------------------------------- */
  metrics?: (
    | "count"
    | "bytesIngress"
    | "bytesEgress"
    | "durationAvg"
    | "durationMedian"
    | "duration90th"
    | "duration99th"
  )[];
  /** Query param: Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified. */
  since?: string;
  /** Query param: The sort order for the result set; sort fields must be included in `metrics` or `dimensions`. */
  sort?: string[];
  /** Query param: End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified. */
  until?: string;
}

export const GetAnalyticEventBytimeRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  timeDelta: Schema.Literals([
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "dekaminute",
    "minute",
  ]).pipe(T.HttpQuery("time_delta")),
  dimensions: Schema.optional(
    Schema.Array(Schema.Literals(["event", "appID", "coloName", "ipVersion"])),
  ).pipe(T.HttpQuery("dimensions")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  metrics: Schema.optional(
    Schema.Array(
      Schema.Literals([
        "count",
        "bytesIngress",
        "bytesEgress",
        "durationAvg",
        "durationMedian",
        "duration90th",
        "duration99th",
      ]),
    ),
  ).pipe(T.HttpQuery("metrics")),
  since: Schema.optional(Schema.String).pipe(T.HttpQuery("since")),
  sort: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sort")),
  until: Schema.optional(Schema.String).pipe(T.HttpQuery("until")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/spectrum/analytics/events/bytime",
  }),
) as unknown as Schema.Schema<GetAnalyticEventBytimeRequest>;

export interface GetAnalyticEventBytimeResponse {
  /** List of columns returned by the analytics query. */
  data: { dimensions?: string[]; metrics?: number[] | number[][] }[];
  /** Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing. */
  dataLag: number;
  /** Maximum result for each selected metrics across all data. */
  max: Record<string, unknown>;
  /** Minimum result for each selected metrics across all data. */
  min: Record<string, unknown>;
  query: {
    dimensions?: ("event" | "appID" | "coloName" | "ipVersion")[];
    filters?: string;
    limit?: number;
    metrics?: (
      | "count"
      | "bytesIngress"
      | "bytesEgress"
      | "durationAvg"
      | "durationMedian"
      | "duration90th"
      | "duration99th"
    )[];
    since?: string;
    sort?: string[];
    until?: string;
  };
  /** Total number of rows in the result. */
  rows: number;
  /** Total result for each selected metrics across all data. */
  totals: Record<string, unknown>;
  /** List of time interval buckets: [start, end] */
  timeIntervals?: string[][];
}

export const GetAnalyticEventBytimeResponse = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      dimensions: Schema.optional(Schema.Array(Schema.String)),
      metrics: Schema.optional(
        Schema.Union([
          Schema.Array(Schema.Number),
          Schema.Array(Schema.Array(Schema.Number)),
        ]),
      ),
    }),
  ),
  dataLag: Schema.Number,
  max: Schema.Struct({}),
  min: Schema.Struct({}),
  query: Schema.Struct({
    dimensions: Schema.optional(
      Schema.Array(
        Schema.Literals(["event", "appID", "coloName", "ipVersion"]),
      ),
    ),
    filters: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    metrics: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "count",
          "bytesIngress",
          "bytesEgress",
          "durationAvg",
          "durationMedian",
          "duration90th",
          "duration99th",
        ]),
      ),
    ),
    since: Schema.optional(Schema.String),
    sort: Schema.optional(Schema.Array(Schema.String)),
    until: Schema.optional(Schema.String),
  }),
  rows: Schema.Number,
  totals: Schema.Struct({}),
  timeIntervals: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
}).pipe(
  Schema.encodeKeys({
    data: "data",
    dataLag: "data_lag",
    max: "max",
    min: "min",
    query: "query",
    rows: "rows",
    totals: "totals",
    timeIntervals: "time_intervals",
  }),
) as unknown as Schema.Schema<GetAnalyticEventBytimeResponse>;

export const getAnalyticEventBytime: API.OperationMethod<
  GetAnalyticEventBytimeRequest,
  GetAnalyticEventBytimeResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAnalyticEventBytimeRequest,
  output: GetAnalyticEventBytimeResponse,
  errors: [],
}));

// =============================================================================
// AnalyticEventSummary
// =============================================================================

export interface GetAnalyticEventSummaryRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Can be used to break down the data by given attributes. Options are:  | Dimension | Name                          | Example                                                    | | -------- */
  dimensions?: ("event" | "appID" | "coloName" | "ipVersion")[];
  /** Query param: Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined usin */
  filters?: string;
  /** Query param: One or more metrics to compute. Options are:  | Metric         | Name                                | Example | Unit                  | | -------------- | ------------------------------- */
  metrics?: (
    | "count"
    | "bytesIngress"
    | "bytesEgress"
    | "durationAvg"
    | "durationMedian"
    | "duration90th"
    | "duration99th"
  )[];
  /** Query param: Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified. */
  since?: string;
  /** Query param: The sort order for the result set; sort fields must be included in `metrics` or `dimensions`. */
  sort?: string[];
  /** Query param: End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified. */
  until?: string;
}

export const GetAnalyticEventSummaryRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  dimensions: Schema.optional(
    Schema.Array(Schema.Literals(["event", "appID", "coloName", "ipVersion"])),
  ).pipe(T.HttpQuery("dimensions")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  metrics: Schema.optional(
    Schema.Array(
      Schema.Literals([
        "count",
        "bytesIngress",
        "bytesEgress",
        "durationAvg",
        "durationMedian",
        "duration90th",
        "duration99th",
      ]),
    ),
  ).pipe(T.HttpQuery("metrics")),
  since: Schema.optional(Schema.String).pipe(T.HttpQuery("since")),
  sort: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sort")),
  until: Schema.optional(Schema.String).pipe(T.HttpQuery("until")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/spectrum/analytics/events/summary",
  }),
) as unknown as Schema.Schema<GetAnalyticEventSummaryRequest>;

export interface GetAnalyticEventSummaryResponse {
  /** List of columns returned by the analytics query. */
  data: { dimensions?: string[]; metrics?: number[] | number[][] }[];
  /** Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing. */
  dataLag: number;
  /** Maximum result for each selected metrics across all data. */
  max: Record<string, unknown>;
  /** Minimum result for each selected metrics across all data. */
  min: Record<string, unknown>;
  query: {
    dimensions?: ("event" | "appID" | "coloName" | "ipVersion")[];
    filters?: string;
    limit?: number;
    metrics?: (
      | "count"
      | "bytesIngress"
      | "bytesEgress"
      | "durationAvg"
      | "durationMedian"
      | "duration90th"
      | "duration99th"
    )[];
    since?: string;
    sort?: string[];
    until?: string;
  };
  /** Total number of rows in the result. */
  rows: number;
  /** Total result for each selected metrics across all data. */
  totals: Record<string, unknown>;
  /** List of time interval buckets: [start, end] */
  timeIntervals?: string[][];
}

export const GetAnalyticEventSummaryResponse = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      dimensions: Schema.optional(Schema.Array(Schema.String)),
      metrics: Schema.optional(
        Schema.Union([
          Schema.Array(Schema.Number),
          Schema.Array(Schema.Array(Schema.Number)),
        ]),
      ),
    }),
  ),
  dataLag: Schema.Number,
  max: Schema.Struct({}),
  min: Schema.Struct({}),
  query: Schema.Struct({
    dimensions: Schema.optional(
      Schema.Array(
        Schema.Literals(["event", "appID", "coloName", "ipVersion"]),
      ),
    ),
    filters: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    metrics: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "count",
          "bytesIngress",
          "bytesEgress",
          "durationAvg",
          "durationMedian",
          "duration90th",
          "duration99th",
        ]),
      ),
    ),
    since: Schema.optional(Schema.String),
    sort: Schema.optional(Schema.Array(Schema.String)),
    until: Schema.optional(Schema.String),
  }),
  rows: Schema.Number,
  totals: Schema.Struct({}),
  timeIntervals: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
}).pipe(
  Schema.encodeKeys({
    data: "data",
    dataLag: "data_lag",
    max: "max",
    min: "min",
    query: "query",
    rows: "rows",
    totals: "totals",
    timeIntervals: "time_intervals",
  }),
) as unknown as Schema.Schema<GetAnalyticEventSummaryResponse>;

export const getAnalyticEventSummary: API.OperationMethod<
  GetAnalyticEventSummaryRequest,
  GetAnalyticEventSummaryResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAnalyticEventSummaryRequest,
  output: GetAnalyticEventSummaryResponse,
  errors: [],
}));

// =============================================================================
// App
// =============================================================================

export interface GetAppRequest {
  appId: string;
  /** Zone identifier. */
  zoneId: string;
}

export const GetAppRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/spectrum/apps/{appId}" }),
) as unknown as Schema.Schema<GetAppRequest>;

export type GetAppResponse =
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      trafficType: "direct" | "http" | "https";
      argoSmartRouting?: boolean;
      edgeIps?: unknown;
      ipFirewall?: boolean;
      originDirect?: string[];
      originDns?: unknown;
      originPort?: string | number;
      proxyProtocol?: "off" | "v1" | "v2" | "simple";
      tls?: "off" | "flexible" | "full" | "strict";
    }
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      originDirect?: string[];
    };

export const GetAppResponse = Schema.Union([
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    dns: Schema.Unknown,
    modifiedOn: Schema.String,
    protocol: Schema.String,
    trafficType: Schema.Literals(["direct", "http", "https"]),
    argoSmartRouting: Schema.optional(Schema.Boolean),
    edgeIps: Schema.optional(Schema.Unknown),
    ipFirewall: Schema.optional(Schema.Boolean),
    originDirect: Schema.optional(Schema.Array(Schema.String)),
    originDns: Schema.optional(Schema.Unknown),
    originPort: Schema.optional(Schema.Union([Schema.String, Schema.Number])),
    proxyProtocol: Schema.optional(
      Schema.Literals(["off", "v1", "v2", "simple"]),
    ),
    tls: Schema.optional(
      Schema.Literals(["off", "flexible", "full", "strict"]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      dns: "dns",
      modifiedOn: "modified_on",
      protocol: "protocol",
      trafficType: "traffic_type",
      argoSmartRouting: "argo_smart_routing",
      edgeIps: "edge_ips",
      ipFirewall: "ip_firewall",
      originDirect: "origin_direct",
      originDns: "origin_dns",
      originPort: "origin_port",
      proxyProtocol: "proxy_protocol",
      tls: "tls",
    }),
  ),
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    dns: Schema.Unknown,
    modifiedOn: Schema.String,
    protocol: Schema.String,
    originDirect: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      dns: "dns",
      modifiedOn: "modified_on",
      protocol: "protocol",
      originDirect: "origin_direct",
    }),
  ),
]) as unknown as Schema.Schema<GetAppResponse>;

export const getApp: API.OperationMethod<
  GetAppRequest,
  GetAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAppRequest,
  output: GetAppResponse,
  errors: [],
}));

export interface ListAppsRequest {
  /** Path param: Zone identifier. */
  zoneId: string;
  /** Query param: Sets the direction by which results are ordered. */
  direction?: "asc" | "desc";
  /** Query param: Application field by which results are ordered. */
  order?: "protocol" | "app_id" | "created_on" | "modified_on" | "dns";
}

export const ListAppsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  order: Schema.optional(
    Schema.Literals(["protocol", "app_id", "created_on", "modified_on", "dns"]),
  ).pipe(T.HttpQuery("order")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/spectrum/apps" }),
) as unknown as Schema.Schema<ListAppsRequest>;

export type ListAppsResponse = (
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      trafficType: "direct" | "http" | "https";
      argoSmartRouting?: boolean;
      edgeIps?: unknown;
      ipFirewall?: boolean;
      originDirect?: string[];
      originDns?: unknown;
      originPort?: string | number;
      proxyProtocol?: "off" | "v1" | "v2" | "simple";
      tls?: "off" | "flexible" | "full" | "strict";
    }
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      originDirect?: string[];
    }
)[];

export const ListAppsResponse = Schema.Array(
  Schema.Union([
    Schema.Struct({
      id: Schema.String,
      createdOn: Schema.String,
      dns: Schema.Unknown,
      modifiedOn: Schema.String,
      protocol: Schema.String,
      trafficType: Schema.Literals(["direct", "http", "https"]),
      argoSmartRouting: Schema.optional(Schema.Boolean),
      edgeIps: Schema.optional(Schema.Unknown),
      ipFirewall: Schema.optional(Schema.Boolean),
      originDirect: Schema.optional(Schema.Array(Schema.String)),
      originDns: Schema.optional(Schema.Unknown),
      originPort: Schema.optional(Schema.Union([Schema.String, Schema.Number])),
      proxyProtocol: Schema.optional(
        Schema.Literals(["off", "v1", "v2", "simple"]),
      ),
      tls: Schema.optional(
        Schema.Literals(["off", "flexible", "full", "strict"]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        dns: "dns",
        modifiedOn: "modified_on",
        protocol: "protocol",
        trafficType: "traffic_type",
        argoSmartRouting: "argo_smart_routing",
        edgeIps: "edge_ips",
        ipFirewall: "ip_firewall",
        originDirect: "origin_direct",
        originDns: "origin_dns",
        originPort: "origin_port",
        proxyProtocol: "proxy_protocol",
        tls: "tls",
      }),
    ),
    Schema.Struct({
      id: Schema.String,
      createdOn: Schema.String,
      dns: Schema.Unknown,
      modifiedOn: Schema.String,
      protocol: Schema.String,
      originDirect: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        dns: "dns",
        modifiedOn: "modified_on",
        protocol: "protocol",
        originDirect: "origin_direct",
      }),
    ),
  ]),
) as unknown as Schema.Schema<ListAppsResponse>;

export const listApps: API.OperationMethod<
  ListAppsRequest,
  ListAppsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAppsRequest,
  output: ListAppsResponse,
  errors: [],
}));

export interface CreateAppRequest {
  /** Path param: Zone identifier. */
  zoneId: string;
  /** Body param: The name and type of DNS record for the Spectrum application. */
  dns: unknown;
  /** Body param: The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`. */
  protocol: string;
  /** Body param: Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol */
  trafficType: "direct" | "http" | "https";
  /** Body param: Enables Argo Smart Routing for this application. Notes: Only available for TCP applications with traffic_type set to "direct". */
  argoSmartRouting?: boolean;
  /** Body param: The anycast edge IP configuration for the hostname of this application. */
  edgeIps?: unknown;
  /** Body param: Enables IP Access Rules for this application. Notes: Only available for TCP applications. */
  ipFirewall?: boolean;
  /** Body param: List of origin IP addresses. Array may contain multiple IP addresses for load balancing. */
  originDirect?: string[];
  /** Body param: The name and type of DNS record for the Spectrum application. */
  originDns?: unknown;
  /** Body param: The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of */
  originPort?: string | number;
  /** Body param: Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Proto */
  proxyProtocol?: "off" | "v1" | "v2" | "simple";
  /** Body param: The type of TLS termination associated with the application. */
  tls?: "off" | "flexible" | "full" | "strict";
}

export const CreateAppRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  dns: Schema.Unknown,
  protocol: Schema.String,
  trafficType: Schema.Literals(["direct", "http", "https"]),
  argoSmartRouting: Schema.optional(Schema.Boolean),
  edgeIps: Schema.optional(Schema.Unknown),
  ipFirewall: Schema.optional(Schema.Boolean),
  originDirect: Schema.optional(Schema.Array(Schema.String)),
  originDns: Schema.optional(Schema.Unknown),
  originPort: Schema.optional(Schema.Union([Schema.String, Schema.Number])),
  proxyProtocol: Schema.optional(
    Schema.Literals(["off", "v1", "v2", "simple"]),
  ),
  tls: Schema.optional(Schema.Literals(["off", "flexible", "full", "strict"])),
}).pipe(
  Schema.encodeKeys({
    dns: "dns",
    protocol: "protocol",
    trafficType: "traffic_type",
    argoSmartRouting: "argo_smart_routing",
    edgeIps: "edge_ips",
    ipFirewall: "ip_firewall",
    originDirect: "origin_direct",
    originDns: "origin_dns",
    originPort: "origin_port",
    proxyProtocol: "proxy_protocol",
    tls: "tls",
  }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/spectrum/apps" }),
) as unknown as Schema.Schema<CreateAppRequest>;

export type CreateAppResponse =
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      trafficType: "direct" | "http" | "https";
      argoSmartRouting?: boolean;
      edgeIps?: unknown;
      ipFirewall?: boolean;
      originDirect?: string[];
      originDns?: unknown;
      originPort?: string | number;
      proxyProtocol?: "off" | "v1" | "v2" | "simple";
      tls?: "off" | "flexible" | "full" | "strict";
    }
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      originDirect?: string[];
    };

export const CreateAppResponse = Schema.Union([
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    dns: Schema.Unknown,
    modifiedOn: Schema.String,
    protocol: Schema.String,
    trafficType: Schema.Literals(["direct", "http", "https"]),
    argoSmartRouting: Schema.optional(Schema.Boolean),
    edgeIps: Schema.optional(Schema.Unknown),
    ipFirewall: Schema.optional(Schema.Boolean),
    originDirect: Schema.optional(Schema.Array(Schema.String)),
    originDns: Schema.optional(Schema.Unknown),
    originPort: Schema.optional(Schema.Union([Schema.String, Schema.Number])),
    proxyProtocol: Schema.optional(
      Schema.Literals(["off", "v1", "v2", "simple"]),
    ),
    tls: Schema.optional(
      Schema.Literals(["off", "flexible", "full", "strict"]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      dns: "dns",
      modifiedOn: "modified_on",
      protocol: "protocol",
      trafficType: "traffic_type",
      argoSmartRouting: "argo_smart_routing",
      edgeIps: "edge_ips",
      ipFirewall: "ip_firewall",
      originDirect: "origin_direct",
      originDns: "origin_dns",
      originPort: "origin_port",
      proxyProtocol: "proxy_protocol",
      tls: "tls",
    }),
  ),
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    dns: Schema.Unknown,
    modifiedOn: Schema.String,
    protocol: Schema.String,
    originDirect: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      dns: "dns",
      modifiedOn: "modified_on",
      protocol: "protocol",
      originDirect: "origin_direct",
    }),
  ),
]) as unknown as Schema.Schema<CreateAppResponse>;

export const createApp: API.OperationMethod<
  CreateAppRequest,
  CreateAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAppRequest,
  output: CreateAppResponse,
  errors: [],
}));

export interface UpdateAppRequest {
  appId: string;
  /** Path param: Zone identifier. */
  zoneId: string;
  /** Body param: The name and type of DNS record for the Spectrum application. */
  dns: unknown;
  /** Body param: The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`. */
  protocol: string;
  /** Body param: Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol */
  trafficType: "direct" | "http" | "https";
  /** Body param: Enables Argo Smart Routing for this application. Notes: Only available for TCP applications with traffic_type set to "direct". */
  argoSmartRouting?: boolean;
  /** Body param: The anycast edge IP configuration for the hostname of this application. */
  edgeIps?: unknown;
  /** Body param: Enables IP Access Rules for this application. Notes: Only available for TCP applications. */
  ipFirewall?: boolean;
  /** Body param: List of origin IP addresses. Array may contain multiple IP addresses for load balancing. */
  originDirect?: string[];
  /** Body param: The name and type of DNS record for the Spectrum application. */
  originDns?: unknown;
  /** Body param: The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of */
  originPort?: string | number;
  /** Body param: Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Proto */
  proxyProtocol?: "off" | "v1" | "v2" | "simple";
  /** Body param: The type of TLS termination associated with the application. */
  tls?: "off" | "flexible" | "full" | "strict";
}

export const UpdateAppRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  dns: Schema.Unknown,
  protocol: Schema.String,
  trafficType: Schema.Literals(["direct", "http", "https"]),
  argoSmartRouting: Schema.optional(Schema.Boolean),
  edgeIps: Schema.optional(Schema.Unknown),
  ipFirewall: Schema.optional(Schema.Boolean),
  originDirect: Schema.optional(Schema.Array(Schema.String)),
  originDns: Schema.optional(Schema.Unknown),
  originPort: Schema.optional(Schema.Union([Schema.String, Schema.Number])),
  proxyProtocol: Schema.optional(
    Schema.Literals(["off", "v1", "v2", "simple"]),
  ),
  tls: Schema.optional(Schema.Literals(["off", "flexible", "full", "strict"])),
}).pipe(
  Schema.encodeKeys({
    dns: "dns",
    protocol: "protocol",
    trafficType: "traffic_type",
    argoSmartRouting: "argo_smart_routing",
    edgeIps: "edge_ips",
    ipFirewall: "ip_firewall",
    originDirect: "origin_direct",
    originDns: "origin_dns",
    originPort: "origin_port",
    proxyProtocol: "proxy_protocol",
    tls: "tls",
  }),
  T.Http({ method: "PUT", path: "/zones/{zone_id}/spectrum/apps/{appId}" }),
) as unknown as Schema.Schema<UpdateAppRequest>;

export type UpdateAppResponse =
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      trafficType: "direct" | "http" | "https";
      argoSmartRouting?: boolean;
      edgeIps?: unknown;
      ipFirewall?: boolean;
      originDirect?: string[];
      originDns?: unknown;
      originPort?: string | number;
      proxyProtocol?: "off" | "v1" | "v2" | "simple";
      tls?: "off" | "flexible" | "full" | "strict";
    }
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      originDirect?: string[];
    };

export const UpdateAppResponse = Schema.Union([
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    dns: Schema.Unknown,
    modifiedOn: Schema.String,
    protocol: Schema.String,
    trafficType: Schema.Literals(["direct", "http", "https"]),
    argoSmartRouting: Schema.optional(Schema.Boolean),
    edgeIps: Schema.optional(Schema.Unknown),
    ipFirewall: Schema.optional(Schema.Boolean),
    originDirect: Schema.optional(Schema.Array(Schema.String)),
    originDns: Schema.optional(Schema.Unknown),
    originPort: Schema.optional(Schema.Union([Schema.String, Schema.Number])),
    proxyProtocol: Schema.optional(
      Schema.Literals(["off", "v1", "v2", "simple"]),
    ),
    tls: Schema.optional(
      Schema.Literals(["off", "flexible", "full", "strict"]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      dns: "dns",
      modifiedOn: "modified_on",
      protocol: "protocol",
      trafficType: "traffic_type",
      argoSmartRouting: "argo_smart_routing",
      edgeIps: "edge_ips",
      ipFirewall: "ip_firewall",
      originDirect: "origin_direct",
      originDns: "origin_dns",
      originPort: "origin_port",
      proxyProtocol: "proxy_protocol",
      tls: "tls",
    }),
  ),
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    dns: Schema.Unknown,
    modifiedOn: Schema.String,
    protocol: Schema.String,
    originDirect: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      dns: "dns",
      modifiedOn: "modified_on",
      protocol: "protocol",
      originDirect: "origin_direct",
    }),
  ),
]) as unknown as Schema.Schema<UpdateAppResponse>;

export const updateApp: API.OperationMethod<
  UpdateAppRequest,
  UpdateAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAppRequest,
  output: UpdateAppResponse,
  errors: [],
}));

export interface DeleteAppRequest {
  appId: string;
  /** Zone identifier. */
  zoneId: string;
}

export const DeleteAppRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/spectrum/apps/{appId}" }),
) as unknown as Schema.Schema<DeleteAppRequest>;

export interface DeleteAppResponse {
  /** Identifier. */
  id: string;
}

export const DeleteAppResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteAppResponse>;

export const deleteApp: API.OperationMethod<
  DeleteAppRequest,
  DeleteAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAppRequest,
  output: DeleteAppResponse,
  errors: [],
}));
