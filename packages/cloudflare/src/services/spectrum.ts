/**
 * Cloudflare SPECTRUM API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service spectrum
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

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

export const GetAnalyticAggregateCurrentRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const GetAnalyticAggregateCurrentResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      appID: Schema.String,
      bytesEgress: Schema.Number,
      bytesIngress: Schema.Number,
      connections: Schema.Number,
      durationAvg: Schema.Number,
    }),
  ).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetAnalyticAggregateCurrentResponse>;

export type GetAnalyticAggregateCurrentError = DefaultErrors;

export const getAnalyticAggregateCurrent: API.OperationMethod<
  GetAnalyticAggregateCurrentRequest,
  GetAnalyticAggregateCurrentResponse,
  GetAnalyticAggregateCurrentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetAnalyticEventBytimeRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      Schema.Array(
        Schema.Literals(["event", "appID", "coloName", "ipVersion"]),
      ),
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
    sort: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("sort"),
    ),
    until: Schema.optional(Schema.String).pipe(T.HttpQuery("until")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/spectrum/analytics/events/bytime",
    }),
  ) as unknown as Schema.Schema<GetAnalyticEventBytimeRequest>;

export interface GetAnalyticEventBytimeResponse {
  /** List of columns returned by the analytics query. */
  data: {
    dimensions?: string[] | null;
    metrics?: number[] | number[][] | null;
  }[];
  /** Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing. */
  dataLag: number;
  /** Maximum result for each selected metrics across all data. */
  max: Record<string, unknown>;
  /** Minimum result for each selected metrics across all data. */
  min: Record<string, unknown>;
  query: {
    dimensions?: ("event" | "appID" | "coloName" | "ipVersion")[] | null;
    filters?: string | null;
    limit?: number | null;
    metrics?:
      | (
          | "count"
          | "bytesIngress"
          | "bytesEgress"
          | "durationAvg"
          | "durationMedian"
          | "duration90th"
          | "duration99th"
        )[]
      | null;
    since?: string | null;
    sort?: string[] | null;
    until?: string | null;
  };
  /** Total number of rows in the result. */
  rows: number;
  /** Total result for each selected metrics across all data. */
  totals: Record<string, unknown>;
  /** List of time interval buckets: [start, end] */
  timeIntervals?: string[][] | null;
}

export const GetAnalyticEventBytimeResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        dimensions: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        metrics: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Array(Schema.Number),
              Schema.Array(Schema.Array(Schema.Number)),
            ]),
            Schema.Null,
          ]),
        ),
      }),
    ),
    dataLag: Schema.Number,
    max: Schema.Struct({}),
    min: Schema.Struct({}),
    query: Schema.Struct({
      dimensions: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Literals(["event", "appID", "coloName", "ipVersion"]),
          ),
          Schema.Null,
        ]),
      ),
      filters: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      limit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      metrics: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      since: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      sort: Schema.optional(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      until: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
    rows: Schema.Number,
    totals: Schema.Struct({}),
    timeIntervals: Schema.optional(
      Schema.Union([Schema.Array(Schema.Array(Schema.String)), Schema.Null]),
    ),
  })
    .pipe(
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
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetAnalyticEventBytimeResponse>;

export type GetAnalyticEventBytimeError = DefaultErrors;

export const getAnalyticEventBytime: API.OperationMethod<
  GetAnalyticEventBytimeRequest,
  GetAnalyticEventBytimeResponse,
  GetAnalyticEventBytimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetAnalyticEventSummaryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    dimensions: Schema.optional(
      Schema.Array(
        Schema.Literals(["event", "appID", "coloName", "ipVersion"]),
      ),
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
    sort: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("sort"),
    ),
    until: Schema.optional(Schema.String).pipe(T.HttpQuery("until")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/spectrum/analytics/events/summary",
    }),
  ) as unknown as Schema.Schema<GetAnalyticEventSummaryRequest>;

export interface GetAnalyticEventSummaryResponse {
  /** List of columns returned by the analytics query. */
  data: {
    dimensions?: string[] | null;
    metrics?: number[] | number[][] | null;
  }[];
  /** Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing. */
  dataLag: number;
  /** Maximum result for each selected metrics across all data. */
  max: Record<string, unknown>;
  /** Minimum result for each selected metrics across all data. */
  min: Record<string, unknown>;
  query: {
    dimensions?: ("event" | "appID" | "coloName" | "ipVersion")[] | null;
    filters?: string | null;
    limit?: number | null;
    metrics?:
      | (
          | "count"
          | "bytesIngress"
          | "bytesEgress"
          | "durationAvg"
          | "durationMedian"
          | "duration90th"
          | "duration99th"
        )[]
      | null;
    since?: string | null;
    sort?: string[] | null;
    until?: string | null;
  };
  /** Total number of rows in the result. */
  rows: number;
  /** Total result for each selected metrics across all data. */
  totals: Record<string, unknown>;
  /** List of time interval buckets: [start, end] */
  timeIntervals?: string[][] | null;
}

export const GetAnalyticEventSummaryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        dimensions: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        metrics: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Array(Schema.Number),
              Schema.Array(Schema.Array(Schema.Number)),
            ]),
            Schema.Null,
          ]),
        ),
      }),
    ),
    dataLag: Schema.Number,
    max: Schema.Struct({}),
    min: Schema.Struct({}),
    query: Schema.Struct({
      dimensions: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Literals(["event", "appID", "coloName", "ipVersion"]),
          ),
          Schema.Null,
        ]),
      ),
      filters: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      limit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      metrics: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      since: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      sort: Schema.optional(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      until: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
    rows: Schema.Number,
    totals: Schema.Struct({}),
    timeIntervals: Schema.optional(
      Schema.Union([Schema.Array(Schema.Array(Schema.String)), Schema.Null]),
    ),
  })
    .pipe(
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
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetAnalyticEventSummaryResponse>;

export type GetAnalyticEventSummaryError = DefaultErrors;

export const getAnalyticEventSummary: API.OperationMethod<
  GetAnalyticEventSummaryRequest,
  GetAnalyticEventSummaryResponse,
  GetAnalyticEventSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetAppRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      argoSmartRouting?: boolean | null;
      edgeIps?: unknown | null;
      ipFirewall?: boolean | null;
      originDirect?: string[] | null;
      originDns?: unknown | null;
      originPort?: string | number | null;
      proxyProtocol?: "off" | "v1" | "v2" | "simple" | null;
      tls?: "off" | "flexible" | "full" | "strict" | null;
    }
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      originDirect?: string[] | null;
    };

export const GetAppResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    dns: Schema.Unknown,
    modifiedOn: Schema.String,
    protocol: Schema.String,
    trafficType: Schema.Literals(["direct", "http", "https"]),
    argoSmartRouting: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    edgeIps: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    ipFirewall: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    originDirect: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    originDns: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    originPort: Schema.optional(
      Schema.Union([Schema.Union([Schema.String, Schema.Number]), Schema.Null]),
    ),
    proxyProtocol: Schema.optional(
      Schema.Union([
        Schema.Literals(["off", "v1", "v2", "simple"]),
        Schema.Null,
      ]),
    ),
    tls: Schema.optional(
      Schema.Union([
        Schema.Literals(["off", "flexible", "full", "strict"]),
        Schema.Null,
      ]),
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
    originDirect: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
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
]).pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetAppResponse>;

export type GetAppError = DefaultErrors;

export const getApp: API.OperationMethod<
  GetAppRequest,
  GetAppResponse,
  GetAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListAppsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export interface ListAppsResponse {
  result: (
    | {
        id: string;
        createdOn: string;
        dns: unknown;
        modifiedOn: string;
        protocol: string;
        trafficType: "direct" | "http" | "https";
        argoSmartRouting?: boolean | null;
        edgeIps?: unknown | null;
        ipFirewall?: boolean | null;
        originDirect?: string[] | null;
        originDns?: unknown | null;
        originPort?: string | number | null;
        proxyProtocol?: "off" | "v1" | "v2" | "simple" | null;
        tls?: "off" | "flexible" | "full" | "strict" | null;
      }
    | {
        id: string;
        createdOn: string;
        dns: unknown;
        modifiedOn: string;
        protocol: string;
        originDirect?: string[] | null;
      }
  )[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListAppsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Union([
      Schema.Struct({
        id: Schema.String,
        createdOn: Schema.String,
        dns: Schema.Unknown,
        modifiedOn: Schema.String,
        protocol: Schema.String,
        trafficType: Schema.Literals(["direct", "http", "https"]),
        argoSmartRouting: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        edgeIps: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ipFirewall: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        originDirect: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        originDns: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        originPort: Schema.optional(
          Schema.Union([
            Schema.Union([Schema.String, Schema.Number]),
            Schema.Null,
          ]),
        ),
        proxyProtocol: Schema.optional(
          Schema.Union([
            Schema.Literals(["off", "v1", "v2", "simple"]),
            Schema.Null,
          ]),
        ),
        tls: Schema.optional(
          Schema.Union([
            Schema.Literals(["off", "flexible", "full", "strict"]),
            Schema.Null,
          ]),
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
        originDirect: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
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
) as unknown as Schema.Schema<ListAppsResponse>;

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
        id: string;
        createdOn: string;
        dns: unknown;
        modifiedOn: string;
        protocol: string;
        trafficType: "direct" | "http" | "https";
        argoSmartRouting?: boolean | null;
        edgeIps?: unknown | null;
        ipFirewall?: boolean | null;
        originDirect?: string[] | null;
        originDns?: unknown | null;
        originPort?: string | number | null;
        proxyProtocol?: "off" | "v1" | "v2" | "simple" | null;
        tls?: "off" | "flexible" | "full" | "strict" | null;
      }
    | {
        id: string;
        createdOn: string;
        dns: unknown;
        modifiedOn: string;
        protocol: string;
        originDirect?: string[] | null;
      },
    ListAppsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAppsRequest,
  output: ListAppsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
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

export const CreateAppRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      argoSmartRouting?: boolean | null;
      edgeIps?: unknown | null;
      ipFirewall?: boolean | null;
      originDirect?: string[] | null;
      originDns?: unknown | null;
      originPort?: string | number | null;
      proxyProtocol?: "off" | "v1" | "v2" | "simple" | null;
      tls?: "off" | "flexible" | "full" | "strict" | null;
    }
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      originDirect?: string[] | null;
    };

export const CreateAppResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    dns: Schema.Unknown,
    modifiedOn: Schema.String,
    protocol: Schema.String,
    trafficType: Schema.Literals(["direct", "http", "https"]),
    argoSmartRouting: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    edgeIps: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    ipFirewall: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    originDirect: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    originDns: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    originPort: Schema.optional(
      Schema.Union([Schema.Union([Schema.String, Schema.Number]), Schema.Null]),
    ),
    proxyProtocol: Schema.optional(
      Schema.Union([
        Schema.Literals(["off", "v1", "v2", "simple"]),
        Schema.Null,
      ]),
    ),
    tls: Schema.optional(
      Schema.Union([
        Schema.Literals(["off", "flexible", "full", "strict"]),
        Schema.Null,
      ]),
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
    originDirect: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
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
]).pipe(
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

export const UpdateAppRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      argoSmartRouting?: boolean | null;
      edgeIps?: unknown | null;
      ipFirewall?: boolean | null;
      originDirect?: string[] | null;
      originDns?: unknown | null;
      originPort?: string | number | null;
      proxyProtocol?: "off" | "v1" | "v2" | "simple" | null;
      tls?: "off" | "flexible" | "full" | "strict" | null;
    }
  | {
      id: string;
      createdOn: string;
      dns: unknown;
      modifiedOn: string;
      protocol: string;
      originDirect?: string[] | null;
    };

export const UpdateAppResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    dns: Schema.Unknown,
    modifiedOn: Schema.String,
    protocol: Schema.String,
    trafficType: Schema.Literals(["direct", "http", "https"]),
    argoSmartRouting: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    edgeIps: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    ipFirewall: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    originDirect: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    originDns: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    originPort: Schema.optional(
      Schema.Union([Schema.Union([Schema.String, Schema.Number]), Schema.Null]),
    ),
    proxyProtocol: Schema.optional(
      Schema.Union([
        Schema.Literals(["off", "v1", "v2", "simple"]),
        Schema.Null,
      ]),
    ),
    tls: Schema.optional(
      Schema.Union([
        Schema.Literals(["off", "flexible", "full", "strict"]),
        Schema.Null,
      ]),
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
    originDirect: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
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
]).pipe(
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

export interface DeleteAppRequest {
  appId: string;
  /** Zone identifier. */
  zoneId: string;
}

export const DeleteAppRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/spectrum/apps/{appId}" }),
) as unknown as Schema.Schema<DeleteAppRequest>;

export interface DeleteAppResponse {
  /** Identifier. */
  id: string;
}

export const DeleteAppResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
}).pipe(
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
