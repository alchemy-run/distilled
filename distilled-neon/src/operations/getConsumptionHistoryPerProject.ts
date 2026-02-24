import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetConsumptionHistoryPerProjectInput = Schema.Struct({
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  project_ids: Schema.optional(Schema.String),
  from: Schema.String,
  to: Schema.String,
  granularity: Schema.String,
  org_id: Schema.optional(Schema.String),
  include_v1_metrics: Schema.optional(Schema.Boolean),
  metrics: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/consumption_history/projects" }));
export type GetConsumptionHistoryPerProjectInput =
  typeof GetConsumptionHistoryPerProjectInput.Type;

// Output Schema
export const GetConsumptionHistoryPerProjectOutput = Schema.Struct({
  projects: Schema.Array(
    Schema.Struct({
      project_id: Schema.String,
      periods: Schema.Array(
        Schema.Struct({
          period_id: Schema.String,
          period_plan: Schema.String,
          period_start: Schema.String,
          period_end: Schema.optional(Schema.String),
          consumption: Schema.Array(
            Schema.Struct({
              timeframe_start: Schema.String,
              timeframe_end: Schema.String,
              active_time_seconds: Schema.Number,
              compute_time_seconds: Schema.Number,
              written_data_bytes: Schema.Number,
              synthetic_storage_size_bytes: Schema.Number,
              data_storage_bytes_hour: Schema.optional(Schema.Number),
              logical_size_bytes: Schema.optional(Schema.Number),
              logical_size_bytes_hour: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    }),
  ),
  pagination: Schema.optional(
    Schema.Struct({
      cursor: Schema.String,
    }),
  ),
});
export type GetConsumptionHistoryPerProjectOutput =
  typeof GetConsumptionHistoryPerProjectOutput.Type;

// The operation
/**
 * Retrieve project consumption metrics
 *
 * Retrieves consumption metrics for Scale, Business, and Enterprise plan projects. History begins at the time of upgrade.
 * Results are ordered by time in ascending order (oldest to newest).
 * Issuing a call to this API does not wake a project's compute endpoint.
 *
 * @param cursor - Specify the cursor value from the previous response to get the next batch of projects.
 * @param limit - Specify a value from 1 to 100 to limit number of projects in the response.
 * @param project_ids - Specify a list of project IDs to filter the response.
If omitted, the response will contain all projects.
A list of project IDs can be specified as an array of parameter values or as a comma-separated list in a single parameter value.
- As an array of parameter values: `project_ids=cold-poetry-09157238%20&project_ids=quiet-snow-71788278`
- As a comma-separated list in a single parameter value: `project_ids=cold-poetry-09157238,quiet-snow-71788278`

 * @param from - Specify the start `date-time` for the consumption period.
The `date-time` value is rounded according to the specified `granularity`.
For example, `2024-03-15T15:30:00Z` for `daily` granularity will be rounded to `2024-03-15T00:00:00Z`.
The specified `date-time` value must respect the specified `granularity`:
- For `hourly`, consumption metrics are limited to the last 168 hours.
- For `daily`, consumption metrics are limited to the last 60 days.
- For `monthly`, consumption metrics are limited to the last year.

The consumption history is available starting from `March 1, 2024, at 00:00:00 UTC`.

 * @param to - Specify the end `date-time` for the consumption period.
The `date-time` value is rounded according to the specified granularity.
For example, `2024-03-15T15:30:00Z` for `daily` granularity will be rounded to `2024-03-15T00:00:00Z`.
The specified `date-time` value must respect the specified `granularity`:
- For `hourly`, consumption metrics are limited to the last 168 hours.
- For `daily`, consumption metrics are limited to the last 60 days.
- For `monthly`, consumption metrics are limited to the last year.

 * @param granularity - Specify the granularity of consumption metrics.
Hourly, daily, and monthly metrics are available for the last 168 hours, 60 days,
and 1 year, respectively.

 * @param org_id - Specify the organization for which the project consumption metrics should be returned.
If this parameter is not provided, the endpoint will return the metrics for the
authenticated user's projects.

 * @param include_v1_metrics - The field is deprecated. Please use `metrics` instead.
If `metrics` is specified, this field is ignored.
Include metrics utilized in previous pricing models.
- **data_storage_bytes_hour**: The sum of the maximum observed storage values for each hour,
  which never decreases.

 * @param metrics - Specify a list of metrics to include in the response.
If omitted, active_time, compute_time, written_data, synthetic_storage_size are returned.
Possible values:
- `active_time_seconds`
- `compute_time_seconds`
- `written_data_bytes`
- `synthetic_storage_size_bytes`
- `data_storage_bytes_hour`
- `logical_size_bytes`
- `logical_size_bytes_hour`

A list of metrics can be specified as an array of parameter values or as a comma-separated list in a single parameter value.
- As an array of parameter values: `metrics=cpu_seconds&metrics=ram_bytes`
- As a comma-separated list in a single parameter value: `metrics=cpu_seconds,ram_bytes`

 */
export const getConsumptionHistoryPerProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetConsumptionHistoryPerProjectInput,
    outputSchema: GetConsumptionHistoryPerProjectOutput,
  }));
