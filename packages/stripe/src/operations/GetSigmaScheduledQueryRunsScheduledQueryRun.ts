import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSigmaScheduledQueryRunsScheduledQueryRunInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scheduled_query_run: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/sigma/scheduled_query_runs/{scheduled_query_run}",
      contentType: "form-urlencoded",
    }),
  );
export type GetSigmaScheduledQueryRunsScheduledQueryRunInput =
  typeof GetSigmaScheduledQueryRunsScheduledQueryRunInput.Type;

// Output Schema
export const GetSigmaScheduledQueryRunsScheduledQueryRunOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetSigmaScheduledQueryRunsScheduledQueryRunOutput =
  typeof GetSigmaScheduledQueryRunsScheduledQueryRunOutput.Type;

// The operation
/**
 * Retrieve a scheduled query run
 *
 * <p>Retrieves the details of an scheduled query run.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetSigmaScheduledQueryRunsScheduledQueryRun =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetSigmaScheduledQueryRunsScheduledQueryRunInput,
    outputSchema: GetSigmaScheduledQueryRunsScheduledQueryRunOutput,
  }));
