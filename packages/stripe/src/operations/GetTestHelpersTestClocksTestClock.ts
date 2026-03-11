import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTestHelpersTestClocksTestClockInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    test_clock: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/test_helpers/test_clocks/{test_clock}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTestHelpersTestClocksTestClockInput =
  typeof GetTestHelpersTestClocksTestClockInput.Type;

// Output Schema
export const GetTestHelpersTestClocksTestClockOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    deletes_after: Schema.Number,
    frozen_time: Schema.Number,
    id: Schema.String,
    livemode: Schema.Boolean,
    name: Schema.NullOr(Schema.String),
    object: Schema.Literals(["test_helpers.test_clock"]),
    status: Schema.Literals(["advancing", "internal_failure", "ready"]),
    status_details: Schema.Struct({
      advancing: Schema.optional(
        Schema.Struct({
          target_frozen_time: Schema.Number,
        }),
      ),
    }),
  });
export type GetTestHelpersTestClocksTestClockOutput =
  typeof GetTestHelpersTestClocksTestClockOutput.Type;

// The operation
/**
 * Retrieve a test clock
 *
 * <p>Retrieves a test clock.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTestHelpersTestClocksTestClock =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTestHelpersTestClocksTestClockInput,
    outputSchema: GetTestHelpersTestClocksTestClockOutput,
  }));
