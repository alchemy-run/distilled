// ==========================================================================
// Cloud Trace API (cloudtrace v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "cloudtrace",
  version: "v1",
  rootUrl: "https://cloudtrace.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface TraceSpan {
  /** Identifier for the span. Must be a 64-bit integer other than 0 and unique within a trace. For example, `2205310701640571284`. */
  spanId?: string;
  /** Distinguishes between spans generated in a particular context. For example, two spans with the same name may be distinguished using `RPC_CLIENT` and `RPC_SERVER` to identify queueing latency associated with the span. */
  kind?: "SPAN_KIND_UNSPECIFIED" | "RPC_SERVER" | "RPC_CLIENT" | (string & {});
  /** Name of the span. Must be less than 128 bytes. The span name is sanitized and displayed in the Trace tool in the Google Cloud Platform Console. The name may be a method name or some other per-call site name. For the same executable and the same call point, a best practice is to use a consistent name, which makes it easier to correlate cross-trace spans. */
  name?: string;
  /** Start time of the span in seconds and nanoseconds from the UNIX epoch. */
  startTime?: string;
  /** End time of the span in seconds and nanoseconds from the UNIX epoch. */
  endTime?: string;
  /** Optional. ID of the parent span, if any. */
  parentSpanId?: string;
  /** Collection of labels associated with the span. Label keys must be less than 128 bytes. Label values must be less than 16 KiB. Some keys might have predefined meaning, and you can also create your own. For more information, see [Cloud Trace labels](https://cloud.google.com/trace/docs/trace-labels). */
  labels?: Record<string, string>;
}

export const TraceSpan: Schema.Schema<TraceSpan> = Schema.suspend(() =>
  Schema.Struct({
    spanId: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    parentSpanId: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
).annotate({ identifier: "TraceSpan" }) as any as Schema.Schema<TraceSpan>;

export interface Trace {
  /** Project ID of the Cloud project where the trace data is stored. */
  projectId?: string;
  /** Globally unique identifier for the trace. This identifier is a 128-bit numeric value formatted as a 32-byte hex string. For example, `382d4f4c6b7bb2f4a972559d9085001d`. The numeric value should not be zero. */
  traceId?: string;
  /** Collection of spans in the trace. */
  spans?: Array<TraceSpan>;
}

export const Trace: Schema.Schema<Trace> = Schema.suspend(() =>
  Schema.Struct({
    projectId: Schema.optional(Schema.String),
    traceId: Schema.optional(Schema.String),
    spans: Schema.optional(Schema.Array(TraceSpan)),
  }),
).annotate({ identifier: "Trace" }) as any as Schema.Schema<Trace>;

export interface ListTracesResponse {
  /** List of trace records as specified by the view parameter. */
  traces?: Array<Trace>;
  /** If defined, indicates that there are more traces that match the request and that this value should be passed to the next request to continue retrieving additional traces. */
  nextPageToken?: string;
}

export const ListTracesResponse: Schema.Schema<ListTracesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      traces: Schema.optional(Schema.Array(Trace)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListTracesResponse",
  }) as any as Schema.Schema<ListTracesResponse>;

export interface Traces {
  /** List of traces. */
  traces?: Array<Trace>;
}

export const Traces: Schema.Schema<Traces> = Schema.suspend(() =>
  Schema.Struct({
    traces: Schema.optional(Schema.Array(Trace)),
  }),
).annotate({ identifier: "Traces" }) as any as Schema.Schema<Traces>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

export interface PatchTracesProjectsRequest {
  /** Required. ID of the Cloud project where the trace data is stored. */
  projectId: string;
  /** Request body */
  body?: Traces;
}

export const PatchTracesProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(Traces).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectId}/traces",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchTracesProjectsRequest>;

export type PatchTracesProjectsResponse = Empty;
export const PatchTracesProjectsResponse = Empty;

export type PatchTracesProjectsError = DefaultErrors;

/** Sends trace spans to Cloud Trace. Spans cannot be updated. If the trace ID and span ID already exist, an additional copy of the span will be stored. */
export const patchTracesProjects: API.OperationMethod<
  PatchTracesProjectsRequest,
  PatchTracesProjectsResponse,
  PatchTracesProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchTracesProjectsRequest,
  output: PatchTracesProjectsResponse,
  errors: [],
}));

export interface ListProjectsTracesRequest {
  /** Required. ID of the Cloud project where the trace data is stored. */
  projectId: string;
  /** Optional. Type of data returned for traces in the list. Default is `MINIMAL`. */
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "MINIMAL"
    | "ROOTSPAN"
    | "COMPLETE"
    | (string & {});
  /** Optional. Maximum number of traces to return. If not specified or <= 0, the implementation selects a reasonable value. The implementation may return fewer traces than the requested page size. */
  pageSize?: number;
  /** Token identifying the page of results to return. If provided, use the value of the `next_page_token` field from a previous request. */
  pageToken?: string;
  /** Start of the time interval (inclusive) during which the trace data was collected from the application. */
  startTime?: string;
  /** End of the time interval (inclusive) during which the trace data was collected from the application. */
  endTime?: string;
  /** Optional. A filter against properties of the trace. See [filter syntax documentation](https://cloud.google.com/trace/docs/trace-filters) for details. */
  filter?: string;
  /** Optional. Field used to sort the returned traces. Can be one of the following: * `trace_id` * `name` (`name` field of root span in the trace) * `duration` (difference between `end_time` and `start_time` fields of the root span) * `start` (`start_time` field of the root span) Descending order can be specified by appending `desc` to the sort field (for example, `name desc`). Only one sort field is permitted. */
  orderBy?: string;
}

export const ListProjectsTracesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectId}/traces" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTracesRequest>;

export type ListProjectsTracesResponse = ListTracesResponse;
export const ListProjectsTracesResponse = ListTracesResponse;

export type ListProjectsTracesError = DefaultErrors;

/** Returns a list of traces that match the specified filter conditions. */
export const listProjectsTraces: API.PaginatedOperationMethod<
  ListProjectsTracesRequest,
  ListProjectsTracesResponse,
  ListProjectsTracesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsTracesRequest,
  output: ListProjectsTracesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsTracesRequest {
  /** Required. ID of the Cloud project where the trace data is stored. */
  projectId: string;
  /** Required. ID of the trace to return. */
  traceId: string;
}

export const GetProjectsTracesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  traceId: Schema.String.pipe(T.HttpPath("traceId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectId}/traces/{traceId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsTracesRequest>;

export type GetProjectsTracesResponse = Trace;
export const GetProjectsTracesResponse = Trace;

export type GetProjectsTracesError = DefaultErrors;

/** Gets a single trace by its ID. */
export const getProjectsTraces: API.OperationMethod<
  GetProjectsTracesRequest,
  GetProjectsTracesResponse,
  GetProjectsTracesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsTracesRequest,
  output: GetProjectsTracesResponse,
  errors: [],
}));
