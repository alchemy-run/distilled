import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersTestClocksTestClockAdvanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    test_clock: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    frozen_time: Schema.Number,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/test_clocks/{test_clock}/advance",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersTestClocksTestClockAdvanceInput =
  typeof PostTestHelpersTestClocksTestClockAdvanceInput.Type;

// Output Schema
export const PostTestHelpersTestClocksTestClockAdvanceOutput =
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
export type PostTestHelpersTestClocksTestClockAdvanceOutput =
  typeof PostTestHelpersTestClocksTestClockAdvanceOutput.Type;

// The operation
/**
 * Advance a test clock
 *
 * <p>Starts advancing a test clock to a specified time in the future. Advancement is done when status changes to <code>Ready</code>.</p>
 */
export const PostTestHelpersTestClocksTestClockAdvance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTestHelpersTestClocksTestClockAdvanceInput,
    outputSchema: PostTestHelpersTestClocksTestClockAdvanceOutput,
  }));
