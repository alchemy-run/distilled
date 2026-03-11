import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetReportingReportRunsReportRunInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    report_run: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/reporting/report_runs/{report_run}",
      contentType: "form-urlencoded",
    }),
  );
export type GetReportingReportRunsReportRunInput =
  typeof GetReportingReportRunsReportRunInput.Type;

// Output Schema
export const GetReportingReportRunsReportRunOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    error: Schema.NullOr(Schema.String),
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["reporting.report_run"]),
    parameters: Schema.Struct({
      columns: Schema.optional(Schema.Array(Schema.String)),
      connected_account: Schema.optional(Schema.String),
      currency: Schema.optional(Schema.String),
      interval_end: Schema.optional(Schema.Number),
      interval_start: Schema.optional(Schema.Number),
      payout: Schema.optional(Schema.String),
      reporting_category: Schema.optional(Schema.String),
      timezone: Schema.optional(Schema.String),
    }),
    report_type: Schema.String,
    result: Schema.Unknown,
    status: Schema.String,
    succeeded_at: Schema.NullOr(Schema.Number),
  });
export type GetReportingReportRunsReportRunOutput =
  typeof GetReportingReportRunsReportRunOutput.Type;

// The operation
/**
 * Retrieve a Report Run
 *
 * <p>Retrieves the details of an existing Report Run.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetReportingReportRunsReportRun =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetReportingReportRunsReportRunInput,
    outputSchema: GetReportingReportRunsReportRunOutput,
  }));
