import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetReportingReportRunsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/reporting/report_runs",
      contentType: "form-urlencoded",
    }),
  );
export type GetReportingReportRunsInput =
  typeof GetReportingReportRunsInput.Type;

// Output Schema
export const GetReportingReportRunsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetReportingReportRunsOutput =
  typeof GetReportingReportRunsOutput.Type;

// The operation
/**
 * List all Report Runs
 *
 * <p>Returns a list of Report Runs, with the most recent appearing first.</p>
 *
 * @param created - Only return Report Runs that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetReportingReportRuns = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetReportingReportRunsInput,
    outputSchema: GetReportingReportRunsOutput,
  }),
);
