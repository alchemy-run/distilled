/**
 * Azure Carbon API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CarbonServiceQueryCarbonEmissionDataAvailableDateRangeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Carbon/queryCarbonEmissionDataAvailableDateRange",
    }),
  );
export type CarbonServiceQueryCarbonEmissionDataAvailableDateRangeInput =
  typeof CarbonServiceQueryCarbonEmissionDataAvailableDateRangeInput.Type;

// Output Schema
export const CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    startDate: Schema.String,
    endDate: Schema.String,
  });
export type CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOutput =
  typeof CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOutput.Type;

// The operation
/**
 * API for query carbon emission data available date range
 *
 * @param api-version - The API version to use for this operation.
 */
export const CarbonServiceQueryCarbonEmissionDataAvailableDateRange =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CarbonServiceQueryCarbonEmissionDataAvailableDateRangeInput,
    outputSchema: CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOutput,
  }));
// Input Schema
export const CarbonServiceQueryCarbonEmissionReportsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Carbon/carbonEmissionReports",
    }),
  );
export type CarbonServiceQueryCarbonEmissionReportsInput =
  typeof CarbonServiceQueryCarbonEmissionReportsInput.Type;

// Output Schema
export const CarbonServiceQueryCarbonEmissionReportsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        dataType: Schema.Literals([
          "OverallSummaryData",
          "MonthlySummaryData",
          "TopItemsSummaryData",
          "ResourceTopItemsSummaryData",
          "ResourceGroupTopItemsSummaryData",
          "TopItemsMonthlySummaryData",
          "ResourceTopItemsMonthlySummaryData",
          "ResourceGroupTopItemsMonthlySummaryData",
          "ItemDetailsData",
          "ResourceItemDetailsData",
          "ResourceGroupItemDetailsData",
        ]),
        latestMonthEmissions: Schema.Number,
        previousMonthEmissions: Schema.Number,
        monthOverMonthEmissionsChangeRatio: Schema.optional(Schema.Number),
        monthlyEmissionsChangeValue: Schema.optional(Schema.Number),
      }),
    ),
    skipToken: Schema.optional(Schema.String),
    subscriptionAccessDecisionList: Schema.optional(
      Schema.Array(
        Schema.Struct({
          subscriptionId: Schema.String,
          decision: Schema.Literals(["Allowed", "Denied"]),
          denialReason: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type CarbonServiceQueryCarbonEmissionReportsOutput =
  typeof CarbonServiceQueryCarbonEmissionReportsOutput.Type;

// The operation
/**
 * API for Carbon Emissions Reports
 *
 * @param api-version - The API version to use for this operation.
 */
export const CarbonServiceQueryCarbonEmissionReports =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CarbonServiceQueryCarbonEmissionReportsInput,
    outputSchema: CarbonServiceQueryCarbonEmissionReportsOutput,
  }));
