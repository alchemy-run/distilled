import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetConsumptionHistoryPerProjectV2Input = Schema.Struct({
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  project_ids: Schema.optional(Schema.String),
  from: Schema.String,
  to: Schema.String,
  granularity: Schema.String,
  org_id: Schema.String,
  metrics: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/consumption_history/v2/projects" }));
export type GetConsumptionHistoryPerProjectV2Input =
  typeof GetConsumptionHistoryPerProjectV2Input.Type;

// Output Schema
export const GetConsumptionHistoryPerProjectV2Output = Schema.Struct({
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
              timeframe_start: Schema.optional(Schema.String),
              timeframe_end: Schema.optional(Schema.String),
              metrics: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    metric_name: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
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
export type GetConsumptionHistoryPerProjectV2Output =
  typeof GetConsumptionHistoryPerProjectV2Output.Type;

// The operation
/**
 * Retrieve project consumption metrics
 *
 * Retrieves consumption metrics for Launch, Scale, Agent, and Enterprise plan projects. History begins at the time of upgrade.
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

 * @param metrics - Specify a list of metrics to include in the response.
Possible values:
- `compute_unit_seconds`
- `root_branch_bytes_month`
- `child_branch_bytes_month`
- `instant_restore_bytes_month`
- `public_network_transfer_bytes`
- `private_network_transfer_bytes`
- `extra_branches_month`

A list of metrics can be specified as an array of parameter values or as a comma-separated list in a single parameter value.
- As an array of parameter values: `metrics=compute_unit_seconds&metrics=extra_branches_month`
- As a comma-separated list in a single parameter value: `metrics=compute_unit_seconds,extra_branches_month`

 */
export const getConsumptionHistoryPerProjectV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetConsumptionHistoryPerProjectV2Input,
    outputSchema: GetConsumptionHistoryPerProjectV2Output,
  }));
