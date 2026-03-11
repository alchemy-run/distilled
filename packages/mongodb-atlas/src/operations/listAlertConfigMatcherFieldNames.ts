import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListAlertConfigMatcherFieldNamesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/alertConfigs/matchers/fieldNames",
    }),
  );
export type ListAlertConfigMatcherFieldNamesInput =
  typeof ListAlertConfigMatcherFieldNamesInput.Type;

// Output Schema
export const ListAlertConfigMatcherFieldNamesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListAlertConfigMatcherFieldNamesOutput =
  typeof ListAlertConfigMatcherFieldNamesOutput.Type;

// The operation
/**
 * Return All Alert Configuration Matchers Field Names
 *
 * Get all field names that the `matchers.fieldName` parameter accepts when you create or update an Alert Configuration. You can successfully call this endpoint with any assigned role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const listAlertConfigMatcherFieldNames =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAlertConfigMatcherFieldNamesInput,
    outputSchema: ListAlertConfigMatcherFieldNamesOutput,
  }));
