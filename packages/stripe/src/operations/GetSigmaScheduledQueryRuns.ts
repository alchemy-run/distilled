import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSigmaScheduledQueryRunsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/sigma/scheduled_query_runs",
      contentType: "form-urlencoded",
    }),
  );
export type GetSigmaScheduledQueryRunsInput =
  typeof GetSigmaScheduledQueryRunsInput.Type;

// Output Schema
export const GetSigmaScheduledQueryRunsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        created: Schema.Number,
        data_load_time: Schema.Number,
        error: Schema.optional(
          Schema.Struct({
            message: Schema.String,
          }),
        ),
        file: Schema.Unknown,
        id: Schema.String,
        livemode: Schema.Boolean,
        object: Schema.Literals(["scheduled_query_run"]),
        result_available_until: Schema.Number,
        sql: Schema.String,
        status: Schema.String,
        title: Schema.String,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetSigmaScheduledQueryRunsOutput =
  typeof GetSigmaScheduledQueryRunsOutput.Type;

// The operation
/**
 * List all scheduled query runs
 *
 * <p>Returns a list of scheduled query runs.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetSigmaScheduledQueryRuns = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetSigmaScheduledQueryRunsInput,
    outputSchema: GetSigmaScheduledQueryRunsOutput,
  }),
);
