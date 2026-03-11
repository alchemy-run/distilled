import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectLogsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  sql: Schema.optional(Schema.String),
  iso_timestamp_start: Schema.optional(Schema.String),
  iso_timestamp_end: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/projects/{ref}/analytics/endpoints/logs.all",
  }),
);
export type V1GetProjectLogsInput = typeof V1GetProjectLogsInput.Type;

// Output Schema
export const V1GetProjectLogsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    result: Schema.optional(Schema.Array(Schema.Unknown)),
    error: Schema.optional(Schema.Unknown),
  },
);
export type V1GetProjectLogsOutput = typeof V1GetProjectLogsOutput.Type;

// The operation
/**
 * Gets project's logs
 *
 * Executes a SQL query on the project's logs.
 * Either the `iso_timestamp_start` and `iso_timestamp_end` parameters must be provided.
 * If both are not provided, only the last 1 minute of logs will be queried.
 * The timestamp range must be no more than 24 hours and is rounded to the nearest minute. If the range is more than 24 hours, a validation error will be thrown.
 * Note: Unless the `sql` parameter is provided, only edge_logs will be queried. See the [log query docs](/docs/guides/telemetry/logs?queryGroups=product&product=postgres&queryGroups=source&source=edge_logs#querying-with-the-logs-explorer:~:text=logs%20from%20the-,Sources,-drop%2Ddown%3A) for all available sources.
 *
 * @param ref - Project ref
 * @param sql - Custom SQL query to execute on the logs. See [querying logs](/docs/guides/telemetry/logs?queryGroups=product&product=postgres&queryGroups=source&source=edge_logs#querying-with-the-logs-explorer) for more details.
 */
export const v1GetProjectLogs = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetProjectLogsInput,
  outputSchema: V1GetProjectLogsOutput,
}));
