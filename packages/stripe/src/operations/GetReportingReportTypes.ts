import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetReportingReportTypesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/reporting/report_types",
      contentType: "form-urlencoded",
    }),
  );
export type GetReportingReportTypesInput =
  typeof GetReportingReportTypesInput.Type;

// Output Schema
export const GetReportingReportTypesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        data_available_end: Schema.Number,
        data_available_start: Schema.Number,
        default_columns: Schema.NullOr(Schema.Array(Schema.String)),
        id: Schema.String,
        livemode: Schema.Boolean,
        name: Schema.String,
        object: Schema.Literals(["reporting.report_type"]),
        updated: Schema.Number,
        version: Schema.Number,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetReportingReportTypesOutput =
  typeof GetReportingReportTypesOutput.Type;

// The operation
/**
 * List all Report Types
 *
 * <p>Returns a full list of Report Types.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetReportingReportTypes = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetReportingReportTypesInput,
    outputSchema: GetReportingReportTypesOutput,
  }),
);
